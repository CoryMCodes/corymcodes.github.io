---
layout: default
title: Projects
nav: projects
permalink: /projects/
---

<section class="shell py-14 lg:py-20">
  <div class="max-w-3xl">
    <p class="eyebrow">Projects</p>
    <h1 class="mt-4 text-5xl font-semibold tracking-tight">Tools and experiments focused on developer productivity, AI orchestration, and practical automation.</h1>
  </div>

  <div class="mt-10 grid gap-6">
    <article class="surface rounded-2xl p-8">
      <div class="grid gap-8 md:grid-cols-[96px_1fr] md:items-start">
        <div class="flex h-20 w-20 items-center justify-center rounded-xl border border-accent/50 bg-accent/10 text-accentHover">
          <svg viewBox="0 0 24 24" class="h-12 w-12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 2 3.5 6.75v10.5L12 22l8.5-4.75V6.75L12 2Z"></path>
            <path d="M12 12 3.5 6.75"></path>
            <path d="M12 12v10"></path>
            <path d="m12 12 8.5-5.25"></path>
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-semibold">SeederKit</h2>
          <p class="mt-3 max-w-3xl leading-7 text-textSecondary">AI-assisted seed data generation for Rails applications with deterministic execution, schema awareness, and scenario-based planning.</p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span class="tag-muted">Rails</span>
            <span class="tag-muted">Ruby</span>
            <span class="tag-muted">OpenAI</span>
            <span class="tag-muted">GraphQL</span>
            <span class="tag-muted">PostgreSQL</span>
          </div>
          <div class="mt-6 flex flex-wrap gap-4 font-mono text-sm">
            <a class="text-accentHover hover:text-textPrimary" href="/projects/seederkit/">Project Notes &rarr;</a>
            <a class="text-accentHover hover:text-textPrimary" href="https://github.com/corymcodes/seeder_kit">GitHub &rarr;</a>
          </div>
        </div>
      </div>
    </article>

    <article class="surface rounded-2xl p-8">
      <div class="grid gap-8 md:grid-cols-[96px_1fr] md:items-start">
        <div class="flex h-20 w-20 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-400/10 text-emerald-300">
          <svg viewBox="0 0 24 24" class="h-11 w-11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 17 10 11 4 5"></path>
            <path d="M12 19h8"></path>
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-semibold">Workflow Scripts</h2>
          <p class="mt-3 max-w-3xl leading-7 text-textSecondary">Small automation utilities and publishing workflows for turning engineering notes, implementation context, and code changes into useful documentation.</p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span class="tag-muted">Bash</span>
            <span class="tag-muted">Ruby</span>
            <span class="tag-muted">CLI</span>
            <span class="tag-muted">Docs</span>
          </div>
          <div class="mt-6 flex flex-wrap gap-4 font-mono text-sm">
            <a class="text-accentHover hover:text-textPrimary" href="/devlog/">Read Devlog &rarr;</a>
          </div>
        </div>
      </div>
    </article>
  </div>
</section>
