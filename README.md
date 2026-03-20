# MedPathFinder

Static HTML/CSS/JS site.

Canonical site entry:
- The root-level `index.html`, `app.js`, and `style.css` are the single source of truth.
- Duplicate static files under `public/` were removed to keep the repo aligned to one entry point.

Current migration status as of 2026-03-20:
- No Firebase SDK usage was found in the app code.
- The only Firebase-specific parts in this repository were hosting and local MCP/debug files.
- Firebase-specific project files were removed to prepare this repo for a different hosting platform.

Remaining work for Antigravity:
- Install or expose the `antigravity` CLI in this environment.
- Add the Antigravity project/config files required for deployment.
- Point Antigravity at the static site entry point you want to publish, likely `/home/user/medpathfinder`.
