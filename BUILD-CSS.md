# Rebuilding tailwind.css

The site used to load Tailwind from `cdn.tailwindcss.com`, which compiled the CSS
in every visitor's browser on every page load. It is now a static file.

Whenever you change a class in `index.html`, rebuild:

    npx tailwindcss -c tailwind.config.js -i tailwind-input.css -o tailwind.css --minify

Commit the regenerated `tailwind.css` along with your HTML change.

If a class only ever appears inside a JavaScript string, add it to the `safelist`
array in `tailwind.config.js`, otherwise the compiler will not see it and the
style will silently go missing.
