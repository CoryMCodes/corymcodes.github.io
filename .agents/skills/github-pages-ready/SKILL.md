---
name: github-pages-ready
description: Build and validate the CoryMCodes Jekyll site for GitHub Pages before a push or deploy, including Tailwind CSS, Vite JavaScript, Jekyll output, generated asset checks, and git review.
---

# GitHub Pages Ready

Use this skill when preparing this repository for a GitHub Pages push or deploy.

The goal is to leave the site in a deploy-ready state with generated assets committed or ready to commit.

## When to Use

Use this skill when the user asks to:

- build everything before pushing
- prepare the site for GitHub Pages
- verify the site before deploy
- get the app ready to commit, push, or publish
- refresh generated CSS or JavaScript assets
- run the pre-deploy checklist

## Repository Assumptions

This site is a Jekyll GitHub Pages repository.

Important source files:

- Tailwind source: `_tailwind/app.css`
- Tailwind config: `tailwind.config.js`
- Built CSS served by GitHub Pages: `assets/css/app.css`
- Vite source: `src/javascript/application.js`
- Stimulus controllers: `src/javascript/controllers/`
- Built JavaScript served by GitHub Pages: `assets/js/app.js`
- Jekyll config: `_config.yml`

GitHub Pages serves committed static assets. Do not assume GitHub Pages will compile Tailwind or Vite source files.

## Workflow

1. Inspect the current state:

   ```bash
   git status --short
   ```

2. Install dependencies only when needed:

   ```bash
   bundle check
   npm install
   ```

   If dependency installation fails because of network restrictions, request escalation.

3. Rebuild committed CSS:

   ```bash
   bundle exec tailwindcss -c tailwind.config.js -i _tailwind/app.css -o assets/css/app.css --minify
   ```

4. Rebuild committed JavaScript:

   ```bash
   npm run build:js
   ```

5. Clean and rebuild Jekyll:

   ```bash
   bundle exec jekyll clean
   bundle exec jekyll build
   ```

6. Verify generated output:

   ```bash
   find _site -maxdepth 3 -type f
   rg "assets/css/app.css|assets/js/app.js|importmap|cdn.jsdelivr|src/javascript" _site _layouts assets src
   ```

   Expected:

   - `_site/assets/css/app.css` exists
   - `_site/assets/js/app.js` exists
   - generated pages reference `/assets/css/app.css`
   - generated pages reference `/assets/js/app.js`
   - no stale import map or CDN Hotwire scripts remain
   - `src/javascript` is not copied into `_site`

7. Review git changes:

   ```bash
   git status --short
   git diff --stat
   git diff
   ```

8. Report the result:

   - commands run
   - build status
   - files changed
   - anything that must be committed for GitHub Pages
   - whether the repo is ready to push

## Safety Rules

- Do not commit or push unless the user explicitly asks.
- Do not run destructive git commands.
- Do not revert unrelated user changes.
- Preserve dirty worktree changes unless they directly block the build.
- Remove generated scratch folders such as `.playwright-mcp/` if they appear.
- Never publish secrets, API keys, credentials, private company data, sensitive customer data, or proprietary/internal business logic.

## Optional Browser Check

If a local Jekyll server is already running, open `http://127.0.0.1:4000/` and verify:

- the homepage loads
- CSS is applied
- the Vite bundle is requested
- basic Stimulus behavior still works, especially theme toggle and mobile nav

If no server is running, do not start one unless the user asks or the task requires browser verification.
