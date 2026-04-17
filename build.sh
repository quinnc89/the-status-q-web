#!/bin/sh
# Generates config.js from Vercel environment variables at deploy time
printf "window.SUPABASE_URL = '%s';\nwindow.SUPABASE_ANON_KEY = '%s';\n" \
  "$SUPABASE_URL" "$SUPABASE_SERVICE_ROLE_KEY" > config.js
