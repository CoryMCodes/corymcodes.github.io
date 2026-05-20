---
layout: default
title: Devlog
nav: devlog
permalink: /devlog/
---

<section class="shell py-14 lg:py-20">
  <div class="max-w-3xl">
    <p class="eyebrow">Devlog</p>
    <h1 class="mt-4 text-5xl font-semibold tracking-tight text-textPrimary">Product notes, implementation journals, and technical tradeoffs.</h1>
    <p class="mt-5 text-lg leading-8 text-textSecondary">The current devlog follows SeederKit: the product problem, Rails implementation, AI-assisted workflow design, validation, and the decisions behind turning developer pain into a usable tool.</p>
  </div>

  <div class="mt-8 flex flex-wrap gap-2">
    <span class="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">All</span>
    <span class="rounded-lg border border-line bg-surface/70 px-4 py-2 text-sm text-textSecondary">Architecture</span>
    <span class="rounded-lg border border-line bg-surface/70 px-4 py-2 text-sm text-textSecondary">Rails</span>
    <span class="rounded-lg border border-line bg-surface/70 px-4 py-2 text-sm text-textSecondary">AI</span>
    <span class="rounded-lg border border-line bg-surface/70 px-4 py-2 text-sm text-textSecondary">Tooling</span>
    <span class="rounded-lg border border-line bg-surface/70 px-4 py-2 text-sm text-textSecondary">Lessons</span>
  </div>

  <div class="mt-8 overflow-hidden rounded-2xl border border-line bg-surface/60">
    {% for post in site.posts %}
      <a href="{{ post.url }}" class="block border-b border-line/70 p-6 transition last:border-b-0 hover:bg-elevated/40">
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p class="font-mono text-xs text-textSecondary">{{ post.date | date: "%B %d, %Y" }}</p>
            <h2 class="mt-2 text-xl font-semibold text-textPrimary">{{ post.title }}</h2>
            {% if post.summary %}
              <p class="mt-2 max-w-3xl text-sm leading-6 text-textSecondary">{{ post.summary }}</p>
            {% endif %}
            {% if post.tags %}
              <div class="mt-3 flex flex-wrap gap-2">
                {% for tag in post.tags limit:3 %}
                  <span class="tag-muted">{{ tag }}</span>
                {% endfor %}
              </div>
            {% endif %}
          </div>
          <span class="font-mono text-xs text-textSecondary">read &rarr;</span>
        </div>
      </a>
    {% else %}
      <div class="p-8">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-textSecondary">Publishing Queue</p>
        <h2 class="mt-3 text-2xl font-semibold">No published devlog posts yet.</h2>
        <p class="mt-3 max-w-2xl leading-7 text-textSecondary">The first series should document SeederKit’s origin, product direction, schema reader, scenario DSL, execution model, and what it takes to make AI-assisted tooling feel useful.</p>
      </div>
    {% endfor %}
  </div>
</section>
