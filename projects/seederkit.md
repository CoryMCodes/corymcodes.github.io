---
layout: default
title: SeederKit
nav: projects
permalink: /projects/seederkit/
---

<section class="shell py-14 lg:py-20">
  <div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
    <div>
      <p class="eyebrow">Featured Project</p>
      <h1 class="mt-4 text-5xl font-semibold tracking-tight">SeederKit</h1>
      <p class="mt-5 max-w-3xl text-lg leading-8 text-textSecondary">A Rails developer tool for creating realistic seed scenarios. SeederKit explores how AI can support product workflows when it is constrained by schema awareness, validation, and predictable execution.</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a class="button-primary" href="https://github.com/corymcodes/seeder_kit">View on GitHub</a>
        <a class="button-secondary" href="/devlog/">Read Architecture Posts</a>
      </div>
    </div>

    <aside class="surface rounded-2xl p-6">
      <p class="font-mono text-xs uppercase tracking-[0.18em] text-textSecondary">Core Pipeline</p>
      <div class="mt-6 space-y-3">
        <div class="rounded-lg border border-line bg-ink/60 p-4 font-mono text-sm">schema reader</div>
        <div class="pl-6 font-mono text-textSecondary">&darr;</div>
        <div class="rounded-lg border border-line bg-ink/60 p-4 font-mono text-sm">domain graph builder</div>
        <div class="pl-6 font-mono text-textSecondary">&darr;</div>
        <div class="rounded-lg border border-accent/50 bg-accent/10 p-4 font-mono text-sm text-accentHover">scenario planner</div>
        <div class="pl-6 font-mono text-textSecondary">&darr;</div>
        <div class="rounded-lg border border-accent/40 bg-accent/10 p-4 font-mono text-sm text-accentHover">deterministic executor</div>
      </div>
    </aside>
  </div>

  <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    <div class="surface rounded-xl p-5">
      <h2 class="font-semibold">Schema-Aware Planning</h2>
      <p class="mt-3 text-sm leading-6 text-textSecondary">Use Rails schema and relationship context to constrain scenario generation.</p>
    </div>
    <div class="surface rounded-xl p-5">
      <h2 class="font-semibold">Structured Outputs</h2>
      <p class="mt-3 text-sm leading-6 text-textSecondary">Treat model output as data that must be validated before execution.</p>
    </div>
    <div class="surface rounded-xl p-5">
      <h2 class="font-semibold">Deterministic Execution</h2>
      <p class="mt-3 text-sm leading-6 text-textSecondary">Generate plans probabilistically, then execute through predictable application code.</p>
    </div>
    <div class="surface rounded-xl p-5">
      <h2 class="font-semibold">Rails-Native Tooling</h2>
      <p class="mt-3 text-sm leading-6 text-textSecondary">Build around Rails conventions, ActiveRecord models, validations, and workflows.</p>
    </div>
  </div>

  <div class="prose-cmc mt-14 max-w-3xl">
    <h2>The Thesis</h2>
    <p>Seed data tooling breaks down when product teams need believable, connected scenarios instead of isolated fake records. SeederKit explores a more useful path: let AI assist with intent and planning, but keep validation and execution inside predictable Rails code.</p>

    <h2>What The Devlog Will Cover</h2>
    <ul>
      <li>Why scenario generation is different from fake data generation.</li>
      <li>How schema readers and domain graphs shape safer AI workflows.</li>
      <li>Why structured validation matters before anything touches a database.</li>
      <li>How predictable execution keeps AI-assisted tooling debuggable.</li>
    </ul>
  </div>
</section>
