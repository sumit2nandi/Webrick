# Webrick Technologies

A responsive, static company website built with HTML, CSS, and vanilla JavaScript. No build step or runtime dependencies.

## Run locally

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Open `http://localhost:3000`. Deploy the site files (`index.html`, `styles.css`, `script.js`, and `assets/`) to any static host.

## Before publishing

- Update `contactEmail` in `script.js` to a verified business inbox. The current address is a placeholder, not a verified contact.
- The contact form opens an email draft in the visitor’s mail app; it does not submit to a server. For direct delivery, connect a form service or a backend.
- Fonts are self-hosted in `assets/fonts/`, with their open-source licenses included. No external requests are required.

## Features

Responsive layouts, mobile navigation, service preselection, native form validation, reduced-motion support, and original CSS illustrations (no image assets required).
