const fs = require('fs');
fs.writeFileSync(
  'config.js',
  `window.SUPABASE_URL = '${process.env.SUPABASE_URL}';\nwindow.SUPABASE_ANON_KEY = '${process.env.SUPABASE_SERVICE_ROLE_KEY}';\n`
);
