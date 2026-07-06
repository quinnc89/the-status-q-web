const fs = require('fs');
// config.js is client-facing — it must only ever contain the PUBLIC anon key, never the service_role key.
const url = process.env.SUPABASE_URL || 'https://qmhcgtpacrbthqnucmre.supabase.co';
const anon = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaGNndHBhY3JidGhxbnVjbXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MzI2OTMsImV4cCI6MjA4NzIwODY5M30.5315M2SypKGBbyJTNM099suq6jywEciVR21OC_ytL1I';
fs.writeFileSync('config.js', `window.SUPABASE_URL = '${url}';\nwindow.SUPABASE_ANON_KEY = '${anon}';\n`);
