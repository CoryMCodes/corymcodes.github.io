# CoryMCodes

Personal engineering site and devlog for Cory Musick.

This repo powers `corymusick.github.io`, a content-first GitHub Pages site focused on practical systems engineering, Rails infrastructure, AI-assisted developer tooling, and the process of building SeederKit in public.

The goal is not AI-generated content for its own sake. The goal is to turn real engineering work into useful architecture notes, implementation journals, debugging stories, and technical writeups that show the reasoning behind the system.

## Site Direction

This site should feel like an engineering lab notebook from a systems-focused product engineer:

- professional bio and engineering philosophy
- resume and project pages
- featured work, especially SeederKit
- technical devlog posts about architecture and implementation decisions
- practical notes on Rails, AI orchestration, deterministic workflows, validation, schema-aware systems, and developer tooling

## SeederKit Devlog

SeederKit is the main source of technical material for the blog. Posts should draw from real implementation work in:

```txt
~/code/seeder_kit/
```

Good post topics include:

- why seed data tooling is broken
- scenario generation vs. fake data generation
- designing deterministic AI workflows
- why AI should not generate arbitrary Ruby
- building schema-aware orchestration systems
- extracting Rails domain graphs dynamically
- designing a scenario DSL
- validating structured AI outputs
- orchestrating multi-stage AI pipelines
- rollback-safe scenario execution

## Writing Workflow

Use the `engineering-devlog` Codex skill for architecture-focused posts:

```txt
Use the engineering-devlog skill.

Generate a devlog post about SeederKit's SchemaReader service.
Focus on schema introspection, orchestration boundaries, tradeoffs, and lessons learned.
Reference implementation details from ~/code/seeder_kit/.
```

The skill should help shape messy notes, diffs, implementation details, and debugging context into a polished technical post. Cory remains the engineer and editor; Codex is the writing assistant.

When drafting posts:

- emphasize engineering judgment over AI novelty
- document tradeoffs and constraints
- include implementation details when they clarify the design
- keep examples generic and safe to publish
- remove secrets, API keys, credentials, private company information, sensitive customer data, and proprietary/internal business logic
- include workflow context only when it improves transparency or reproducibility

## Local Development

```bash
bundle install
bundle exec tailwindcss -c tailwind.config.js -i _tailwind/app.css -o assets/css/app.css --minify
bundle exec jekyll serve
```

Then visit:

```txt
http://localhost:4000
```

## Adding Posts

Posts go in `_posts/` with the naming convention `YYYY-MM-DD-title.md`. Each post needs front matter:

```yaml
---
layout: post
title: "Your Title"
date: YYYY-MM-DD HH:MM:SS -0500
summary: "A brief technical summary for the index page."
tags: [rails, ai, architecture]
---
```

Use timestamps in `date` when publishing multiple posts on the same day so Jekyll ordering stays predictable.

## CSS

GitHub Pages serves the committed stylesheet at `assets/css/app.css`. Tailwind source lives in `_tailwind/app.css`.

After changing Tailwind classes or source styles, rebuild the committed stylesheet:

```bash
bundle exec tailwindcss -c tailwind.config.js -i _tailwind/app.css -o assets/css/app.css --minify
```

## Philosophy

Build in public.

Document real engineering.

Share reusable implementation patterns.

Focus on systems thinking over hype.
