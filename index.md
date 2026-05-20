---
layout: default
title: Home
nav: home
---

<section class="shell grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
  <div>
    <p class="eyebrow">Engineering Journal</p>
    <h1 class="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-textPrimary sm:text-6xl lg:text-7xl">
      Building systems. Documenting the <span class="text-accentHover">journey.</span>
    </h1>
    <p class="mt-6 max-w-2xl text-lg leading-8 text-textSecondary">
      I’m Cory, a Rails engineer exploring AI-assisted developer tooling, deterministic workflows, and practical orchestration systems through projects like SeederKit.
    </p>
    <p class="mt-4 max-w-2xl leading-7 text-textSecondary">
      This site is a systems engineering journal: architecture decisions, implementation tradeoffs, debugging notes, and workflows built in public.
    </p>
    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <a class="button-primary" href="/devlog/">Read the Devlog <span aria-hidden="true">&rarr;</span></a>
      <a class="button-secondary" href="/projects/seederkit/">View SeederKit</a>
      <a class="button-secondary" href="/resume/">Resume</a>
    </div>
  </div>

  <div class="surface rounded-2xl p-6 sm:p-8">
    <div class="mb-6 flex items-center justify-between border-b border-line/70 pb-4">
      <p class="font-mono text-xs uppercase tracking-[0.18em] text-textSecondary">Scenario Pipeline</p>
      <span class="rounded-full border border-accent/40 px-3 py-1 font-mono text-xs text-accentHover">deterministic</span>
    </div>
    <div class="grid gap-4">
      <div class="rounded-xl border border-line bg-ink/60 p-4">
        <p class="font-mono text-xs text-textSecondary">01 / Input</p>
        <p class="mt-2 text-lg font-semibold">Natural Language Scenario</p>
      </div>
      <div class="mx-auto h-8 w-px bg-line"></div>
      <div class="rounded-xl border border-accent/50 bg-accent/10 p-4">
        <p class="font-mono text-xs text-accentHover">02 / Planner</p>
        <p class="mt-2 text-lg font-semibold">Schema-Aware Execution Plan</p>
      </div>
      <div class="mx-auto h-8 w-px bg-line"></div>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border border-line bg-ink/60 p-4">
          <p class="font-mono text-xs text-textSecondary">03 / Validator</p>
          <p class="mt-2 font-semibold">Structured Output Checks</p>
        </div>
        <div class="rounded-xl border border-line bg-ink/60 p-4">
          <p class="font-mono text-xs text-textSecondary">04 / Executor</p>
          <p class="mt-2 font-semibold">Ordered Seed Operations</p>
        </div>
      </div>
      <div class="mx-auto h-8 w-px bg-line"></div>
      <div class="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
        <p class="font-mono text-xs text-emerald-300">05 / Result</p>
        <p class="mt-2 text-lg font-semibold">Repeatable Rails Scenario</p>
      </div>
    </div>
  </div>
</section>

<section class="border-y border-line/60 bg-surface/30 py-14">
  <div class="shell grid gap-8 lg:grid-cols-[1fr_360px]">
    <div>
      <div class="mb-6 flex items-end justify-between gap-4">
        <div>
          <p class="eyebrow">Latest From The Devlog</p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight">Architecture notes and implementation journals</h2>
        </div>
        <a class="hidden font-mono text-sm text-accentHover hover:text-textPrimary sm:block" href="/devlog/">All posts &rarr;</a>
      </div>

      <div class="grid gap-4">
        {% for post in site.posts limit:3 %}
          <a href="{{ post.url }}" class="surface block rounded-xl p-5 transition hover:border-accent/70">
            <div class="flex flex-wrap items-center gap-3 text-xs text-textSecondary">
              <span class="font-mono">{{ post.date | date: "%B %d, %Y" }}</span>
              {% for tag in post.tags limit:2 %}
                <span class="tag">{{ tag }}</span>
              {% endfor %}
            </div>
            <h3 class="mt-3 text-xl font-semibold text-textPrimary">{{ post.title }}</h3>
            {% if post.summary %}
              <p class="mt-2 text-sm leading-6 text-textSecondary">{{ post.summary }}</p>
            {% endif %}
          </a>
        {% else %}
          <div class="surface rounded-xl p-6">
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-textSecondary">Devlog Queue</p>
            <h3 class="mt-3 text-xl font-semibold">First architecture posts are coming soon.</h3>
            <p class="mt-3 text-textSecondary">Planned topics include SeederKit’s schema reader, deterministic AI workflows, scenario DSL design, and Rails domain graph extraction.</p>
          </div>
        {% endfor %}
      </div>
    </div>

    <aside class="surface rounded-xl p-6">
      <p class="eyebrow">Featured Project</p>
      <div class="mt-6 flex h-16 w-16 items-center justify-center rounded-xl border border-accent/50 bg-accent/10 text-accentHover">
        <svg viewBox="0 0 24 24" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 2 3.5 6.75v10.5L12 22l8.5-4.75V6.75L12 2Z"></path>
          <path d="M12 12 3.5 6.75"></path>
          <path d="M12 12v10"></path>
          <path d="m12 12 8.5-5.25"></path>
        </svg>
      </div>
      <h2 class="mt-6 text-2xl font-semibold">SeederKit</h2>
      <p class="mt-3 leading-7 text-textSecondary">AI-assisted seed data generation with deterministic execution, schema awareness, and scenario-based planning.</p>
      <ul class="mt-5 space-y-2 text-sm text-textSecondary">
        <li>Schema-aware planning</li>
        <li>Deterministic execution</li>
        <li>Structured AI workflows</li>
        <li>Scenario generation pipelines</li>
      </ul>
      <div class="mt-6 flex flex-wrap gap-3">
        <a class="font-mono text-sm text-accentHover hover:text-textPrimary" href="/projects/seederkit/">View Project &rarr;</a>
        <a class="font-mono text-sm text-accentHover hover:text-textPrimary" href="https://github.com/corymcodes/seeder_kit">GitHub &rarr;</a>
      </div>
    </aside>
  </div>
</section>

<section class="shell py-16">
  <div class="max-w-3xl">
    <p class="eyebrow">Engineering Philosophy</p>
    <blockquote class="mt-5 border-l-2 border-accent pl-6 text-2xl font-medium leading-10 text-textPrimary">
      I’m interested in practical AI systems engineering: reliable workflows built around validation, orchestration, and deterministic execution.
    </blockquote>
  </div>
</section>
