#!/usr/bin/env node
/*
 * preflight-ci.js — the part of the gate that runs INSIDE the Vercel build.
 *
 * Why this exists separately from preflight.js:
 *   preflight.js is the full gate, but it needs a real browser, which is too heavy
 *   to install on every Vercel build. This is everything that needs NO browser and
 *   NO Python, so it can live in vercel.json's buildCommand and block a deploy at
 *   the platform level.
 *
 * That matters because a rule only in a workflow file is a rule that gets skipped.
 * Typing `vercel --prod` by hand bypasses deploy.bat entirely. It cannot bypass this.
 *
 * Wire it up in vercel.json:
 *   { "buildCommand": "node preflight-ci.js && node build.js" }
 *   or for a static project with no build:
 *   { "buildCommand": "node preflight-ci.js" }
 *
 * It does NOT replace the local gate. The accessibility audit, the PDF checks and
 * the live verification still run through deploy.bat. This is the floor, not the bar.
 *
 * Exit codes: 0 clean · 1 blocked
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const fails = [], warns = [];
const F = m => fails.push(m);
const W = m => warns.push(m);

const SKIP = /^(node_modules|\.git|\.next|\.vercel|_internal|_preview-working-files|_archived|_to_delete)$/i;
const walk = (d, o = []) => {
  let ents; try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch (_) { return o; }
  for (const e of ents) {
    if (e.isDirectory()) { if (!SKIP.test(e.name)) walk(path.join(d, e.name), o); }
    else o.push(path.join(d, e.name));
  }
  return o;
};
const rel = f => path.relative(ROOT, f).split(path.sep).join('/');

const files = walk(ROOT);
const isInternal = p => /(^|\/)_internal(\/|$)/i.test(rel(p)) || /-internal\.[a-z0-9]+$/i.test(p);

// Don't scan the gate itself. The page filter matches .js, so without this the
// scanner reads its own source and reports its own detection patterns as
// violations: the banned word list, the "ada compliant" and "fully accessible"
// strings, the builder-metadata names, and the dashes in the [—–] regex below.
// Four false failures, every deploy, forever. Caught 2026-07-30 on the preview
// site; same bug lived here. Keep this in sync with preview-site/preflight-ci.js.
const isGate = f => path.resolve(f) === path.resolve(__filename);
const pages = files.filter(f => /\.(html?|jsx?|tsx?)$/i.test(f) && !isInternal(f) && !isGate(f));
const texts = pages.map(f => ({ f, s: fs.readFileSync(f, 'utf8') }));
const blob = texts.map(x => x.s).join('\n');

console.log('\n============================================');
console.log('  preflight-ci   (in-build gate, no browser)');
console.log('  ' + ROOT);
console.log('  ' + pages.length + ' source file(s)');
console.log('============================================');

// ---- Ghost Protocol: dashes in copy ----
const stripNonCopy = s => s
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/[^\n]*$/gm, '')
  .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, '')
  .replace(/(?<=\d)[—–](?=\d)/g, '');
for (const { f, s } of texts) {
  const clean = stripNonCopy(s);
  const n = (clean.match(/[—–]/g) || []).length;
  if (n) {
    const sample = (clean.match(/.{0,44}[—–].{0,44}/) || [''])[0].replace(/\s+/g, ' ').trim();
    F('Ghost Protocol: ' + n + ' em or en dash(es) in the copy of ' + rel(f) + '. e.g. "' + sample + '"');
  }
}

// ---- banned words ----
const BANNED = ['delve', 'tapestry', 'unleash', 'elevate', 'game-changer', 'revolutionary',
  'streamline', 'robust', 'leverage'];
const hits = BANNED.filter(w => new RegExp('\\b' + w + '\\b', 'i').test(blob));
if (hits.length) F('Ghost Protocol banned words in copy: ' + hits.join(', '));

// ---- never claim ADA compliance ----
if (/ada[- ]compliant|ada compliance|ada certified|fully accessible|100% accessible|wcag certified/i.test(blob)) {
  F('The site claims ADA compliance or full accessibility. No such certification exists for a '
    + 'private commercial site. Say "built to WCAG 2.1 Level AA, verified [date]".');
}

// ---- leftover AI or builder metadata ----
if (/Built with Lovable|Made with Lovable|v0\.dev|generator" content="Emergent|Trybloom/i.test(blob)) {
  F('AI or site-builder metadata is still present. Strip it before shipping.');
}

// ---- trackers with no privacy policy ----
const TRACKERS = [[/clarity\.ms|window\.clarity/i, 'Microsoft Clarity'], [/hotjar/i, 'Hotjar'],
  [/fullstory/i, 'FullStory'], [/googletagmanager|gtag\(/i, 'Google Analytics'],
  [/connect\.facebook\.net|fbq\(/i, 'Meta Pixel'], [/mouseflow|luckyorange|smartlook/i, 'a session recorder']];
const found = TRACKERS.filter(([re]) => re.test(blob)).map(([, n]) => n);
const hasPrivacy = /privacy[- ]?policy|href=["'][^"']*privacy/i.test(blob);
if (found.length && !hasPrivacy) {
  F('Loads ' + found.join(', ') + ' but links no privacy policy. Add the policy page or drop the script.');
}

// ---- internal files sitting in the deploy root unexcluded ----
const internalPresent = files.filter(isInternal);
if (internalPresent.length) {
  const ig = ['.vercelignore', '.gitignore'].map(n => path.join(ROOT, n)).find(p => fs.existsSync(p));
  const ignored = ig && /_internal|_preview-working-files/.test(fs.readFileSync(ig, 'utf8'));
  if (!ignored) {
    F(internalPresent.length + ' internal file(s) are in the deploy root with nothing excluding them, '
      + 'so they will be published at a guessable URL. Add "_internal/" to .vercelignore.');
  }
}

// ---- working files that should never ship ----
const working = files.filter(f => /-backup\.|-ORIGINAL-|-FIXED\.html$|preflight-log\.txt$|deploy-log\.txt$/i.test(path.basename(f)));
if (working.length) {
  const ig = path.join(ROOT, '.vercelignore');
  const covered = fs.existsSync(ig) && /-backup|ORIGINAL|FIXED|log\.txt/i.test(fs.readFileSync(ig, 'utf8'));
  if (!covered) {
    W(working.length + ' working file(s) in the deploy root. Confirm .vercelignore covers them:');
    working.slice(0, 5).forEach(f => W('    ' + rel(f)));
  }
}

// ---- every page needs a lang and a title ----
for (const { f, s } of texts.filter(x => /\.html?$/i.test(x.f))) {
  if (!/<html[^>]+lang=/i.test(s)) F(rel(f) + ' has no lang attribute on the html element.');
  if (!/<title[^>]*>\s*\S/i.test(s)) F(rel(f) + ' has no page title.');
}

// ---- verdict ----
console.log('');
if (warns.length) { console.log('WARNINGS (' + warns.length + ')'); warns.forEach(w => console.log('  ' + w)); console.log(''); }
if (fails.length) {
  console.log('BLOCKED (' + fails.length + ')');
  fails.forEach(f => console.log('  ' + f));
  console.log('\nThis deploy is stopped by preflight-ci, inside the Vercel build.');
  console.log('Fix the above, then deploy again. Run the full local gate first:');
  console.log('  node Operations/scripts/preflight.js <folder>');
  console.log('============================================');
  process.exit(1);
}
console.log('preflight-ci PASSED. The browser-based checks still run locally,');
console.log('through deploy.bat. This gate is the floor, not the bar.');
console.log('============================================');
process.exit(0);
