---
layout: default
title: Home
nav: home
---

<section class="shell grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
  <div>
    <p class="eyebrow">Product Engineering Portfolio</p>
    <h1 class="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-textPrimary sm:text-6xl lg:text-7xl">
      Building useful products. Documenting the <span class="text-accentHover">craft.</span>
    </h1>
    <p class="mt-6 max-w-2xl text-lg leading-8 text-textSecondary">
      I’m Cory, a product-minded Rails engineer who builds operational platforms, workflow tools, APIs, and practical software for messy real-world problems.
    </p>
    <p class="mt-4 max-w-2xl leading-7 text-textSecondary">
      This portfolio collects my work, case studies, product thinking, and technical notes. The current devlog follows SeederKit as I explore AI-assisted developer tooling in public.
    </p>
    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <a class="button-primary" href="/projects/">View Projects <span aria-hidden="true">&rarr;</span></a>
      <a class="button-secondary" href="/devlog/">Read the Devlog</a>
      <a class="button-secondary" href="/resume/">Resume</a>
    </div>
  </div>

  <div class="surface rounded-2xl p-6 sm:p-8">
    <div class="mb-6 flex items-center justify-between border-b border-line/70 pb-4">
      <p class="font-mono text-xs uppercase tracking-[0.18em] text-textSecondary">Product Workflow</p>
      <span class="rounded-full border border-accent/40 px-3 py-1 font-mono text-xs text-accentHover">ship & iterate</span>
    </div>
    <div class="grid gap-4">
      <div class="rounded-xl border border-line bg-ink/60 p-4">
        <p class="font-mono text-xs text-textSecondary">01 / Discovery</p>
        <p class="mt-2 text-lg font-semibold">Operational Problem</p>
      </div>
      <div class="mx-auto h-8 w-px bg-line"></div>
      <div class="rounded-xl border border-accent/50 bg-accent/10 p-4">
        <p class="font-mono text-xs text-accentHover">02 / Product Shape</p>
        <p class="mt-2 text-lg font-semibold">Workflow, Data Model, API</p>
      </div>
      <div class="mx-auto h-8 w-px bg-line"></div>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border border-line bg-ink/60 p-4">
          <p class="font-mono text-xs text-textSecondary">03 / Build</p>
          <p class="mt-2 font-semibold">Rails, UI, Integrations</p>
        </div>
        <div class="rounded-xl border border-line bg-ink/60 p-4">
          <p class="font-mono text-xs text-textSecondary">04 / Feedback</p>
          <p class="mt-2 font-semibold">Users, Metrics, Support</p>
        </div>
      </div>
      <div class="mx-auto h-8 w-px bg-line"></div>
      <div class="rounded-xl border border-accent/40 bg-accent/10 p-4">
        <p class="font-mono text-xs text-accentHover">05 / Outcome</p>
        <p class="mt-2 text-lg font-semibold">Useful Product Workflow</p>
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
          <h2 class="mt-3 text-3xl font-semibold tracking-tight">Building SeederKit in public</h2>
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
            <h3 class="mt-3 text-xl font-semibold">First SeederKit posts are coming soon.</h3>
            <p class="mt-3 text-textSecondary">Planned topics include the product problem, schema reader, scenario DSL, deterministic execution, and lessons from turning developer pain into a usable tool.</p>
          </div>
        {% endfor %}
      </div>
    </div>

    <aside class="surface rounded-xl p-6">
      <p class="eyebrow">Current Featured Project</p>
      <div class="mt-6 flex h-16 w-16 items-center justify-center rounded-xl border border-accent/50 bg-accent/10 text-accentHover">
        <svg viewBox="0 0 24 24" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 2 3.5 6.75v10.5L12 22l8.5-4.75V6.75L12 2Z"></path>
          <path d="M12 12 3.5 6.75"></path>
          <path d="M12 12v10"></path>
          <path d="m12 12 8.5-5.25"></path>
        </svg>
      </div>
      <h2 class="mt-6 text-2xl font-semibold">SeederKit</h2>
      <p class="mt-3 leading-7 text-textSecondary">A developer tool for creating realistic Rails seed scenarios with schema-aware planning and predictable execution.</p>
      <ul class="mt-5 space-y-2 text-sm text-textSecondary">
        <li>Schema-aware planning</li>
        <li>Deterministic execution</li>
        <li>Developer workflow design</li>
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
    <p class="eyebrow">Product Engineering Philosophy</p>
    <blockquote class="mt-5 border-l-2 border-accent pl-6 text-2xl font-medium leading-10 text-textPrimary">
      I care about software that makes real work easier: clear workflows, dependable backend systems, thoughtful interfaces, and enough product judgment to know what should not be built.
    </blockquote>
  </div>
</section>
