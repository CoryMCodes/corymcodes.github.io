---
layout: default
title: Devlog
nav: devlog
permalink: /devlog/
---

<section class="shell py-14 lg:py-20" data-controller="post-filter">
  <div class="max-w-3xl">
    <p class="eyebrow">Devlog</p>
    <h1 class="mt-4 text-5xl font-semibold tracking-tight text-textPrimary">Product notes, implementation journals, and technical tradeoffs.</h1>
    <p class="mt-5 text-lg leading-8 text-textSecondary">The current devlog follows SeederKit: the product problem, Rails implementation, AI-assisted workflow design, validation, and the decisions behind turning developer pain into a usable tool.</p>
  </div>

  <div class="mt-8 flex flex-wrap gap-2">
    <button type="button" class="filter-button filter-button-active" data-post-filter-target="button" data-action="post-filter#filter" data-post-filter-tag-param="all" aria-pressed="true">All</button>
    {% assign filter_tags = site.data.devlog_tags | where: "filter", true %}
    {% for tag in filter_tags %}
      {% assign tagged_posts = site.tags[tag.slug] %}
      {% if tagged_posts and tagged_posts.size > 0 %}
        <button type="button" class="filter-button filter-button-inactive" data-post-filter-target="button" data-action="post-filter#filter" data-post-filter-tag-param="{{ tag.slug }}" aria-pressed="false">{{ tag.label }}</button>
      {% endif %}
    {% endfor %}
  </div>

  <div class="mt-8 overflow-hidden rounded-2xl border border-line bg-surface/60">
    {% for post in site.posts %}
      <a href="{{ post.url }}" class="block border-b border-line/70 p-6 transition last:border-b-0 hover:bg-elevated/40" data-post-filter-target="post" data-post-tags="{{ post.tags | join: ' ' }}">
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
    <div class="hidden p-8" data-post-filter-target="empty">
      <p class="font-mono text-xs uppercase tracking-[0.18em] text-textSecondary">No Matches</p>
      <h2 class="mt-3 text-2xl font-semibold text-textPrimary">No posts match this tag yet.</h2>
      <p class="mt-3 max-w-2xl leading-7 text-textSecondary">The tag pool is intentionally small so the devlog stays easy to scan as new writing gets added.</p>
    </div>
  </div>
</section>
