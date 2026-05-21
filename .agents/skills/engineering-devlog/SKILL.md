---
name: engineering-devlog
description: Generate architecture-focused technical blog posts documenting engineering decisions, implementation details, workflows, and lessons learned while building systems and developer tooling.
---

# Engineering Devlog

Generate high-quality technical blog posts focused on:

- architecture decisions
- implementation details
- engineering tradeoffs
- workflow design
- developer tooling
- AI orchestration systems
- Rails infrastructure
- lessons learned during development

This blog exists as an engineering journal documenting the process of building real systems in public.

The goal is NOT marketing content.

The goal is:

- transparent engineering thinking
- reusable implementation patterns
- documenting tradeoffs
- sharing practical workflows
- demonstrating systems design thinking

Reference implementation examples and engineering context from:

```txt
~/code/seeder_kit/
```

Use real implementation details whenever possible.

Always sanitize:

- secrets
- API keys
- credentials
- proprietary/internal business logic
- private company information
- sensitive customer data

Keep examples:

- generic
- reusable
- safe to publish publicly

## Tags

Use only tag slugs from:

```txt
_data/devlog_tags.yml
```

Before generating frontmatter, read that file and choose only tags that are directly relevant to the post.

Tag rules:

- Use tag slugs, not labels.
- Prefer 2-5 tags.
- Always include the most specific relevant project/topic tag when available, such as `seederkit`.
- Include broad filter tags only when they genuinely describe the post, such as `architecture`, `rails`, `ai`, `developer-tooling`, `product-engineering`, or `lessons`.
- Do not invent new tags in frontmatter.
- If a needed tag does not exist in `_data/devlog_tags.yml`, mention the proposed new tag separately instead of adding it to the post.
- Keep the Devlog filter UI clean by treating `filter: true` tags as broad browsing categories and `filter: false` tags as specific metadata.

## Inputs

This skill may use:

- engineering notes
- git diffs
- implementation code
- architecture discussions
- debugging sessions
- commit history

When available:

- inspect recent changes
- summarize implementation details
- explain architectural reasoning

---

# When to Use

Use this skill when:

- documenting SeederKit architecture decisions
- writing implementation deep-dives
- explaining Rails infrastructure patterns
- documenting AI orchestration workflows
- writing about debugging or tradeoffs
- publishing engineering lessons learned
- documenting developer tooling patterns
- explaining deterministic AI workflow systems
- creating technical devlog posts during feature development
- writing postmortems or iteration summaries
- explaining execution pipelines or schema systems

Example requests:

- "Generate a devlog post about SeederKit's SchemaReader service"
- "Write a blog post explaining the scenario DSL architecture"
- "Document the tradeoffs behind deterministic execution planning"
- "Create a post about building schema-aware AI workflows in Rails"
- "Write up lessons learned from implementing workflow-mode execution"

---

# Writing Style

Keep content:

- engineering-focused
- implementation-oriented
- technically credible
- concise but insightful
- transparent about tradeoffs
- useful to experienced developers
- free of hype and marketing language

Avoid:

- generic AI enthusiasm
- “vibe coding” language
- shallow tutorials
- exaggerated claims
- chatbot-style writing
- excessive emojis
- marketing fluff

Write like:

- an experienced engineer documenting system design decisions
- an architecture journal
- a practical engineering case study
- an implementation-focused devlog

Prioritize:

- clarity
- engineering reasoning
- architectural thinking
- practical implementation details

---

# Primary Topics

- Rails architecture
- developer tooling
- AI orchestration
- deterministic workflows
- structured outputs
- validation systems
- schema-aware systems
- execution pipelines
- testing strategies
- engineering tradeoffs
- implementation patterns
- developer productivity
- workflow automation
- orchestration reliability
- scenario generation systems

---

# Workflow

1. Gather engineering context:
   - notes
   - architecture decisions
   - implementation details
   - debugging insights
   - code snippets
   - tradeoffs considered

2. Reference implementation examples from:

   ```txt
   ~/code/seeder_kit/
   ```

3. Generate blog post markdown:
   - filename: `_posts/YYYY-MM-DD-slug.md`
   - include frontmatter
   - include timestamps
   - choose relevant tags only from `_data/devlog_tags.yml`
   - include implementation examples
   - include architectural reasoning

4. Include engineering reflection:
   - why this approach was chosen
   - alternatives considered
   - lessons learned
   - future improvements

5. Include workflow context only when it meaningfully improves transparency or reproducibility:
   - relevant AI assistance
   - human edits/refinements
   - implementation context
   - source notes or code references

---

# Post Structure

```markdown
---
layout: post
title: "Descriptive Technical Title"
date: YYYY-MM-DD HH:MM:SS -0600
summary: "Brief technical summary."
tags: [architecture, rails, seederkit]
---

## The Problem

Describe the engineering challenge.

## Constraints

What constraints shaped the solution?

## Architecture

Describe the system design and approach.

## Implementation

### Component 1

```ruby
# code examples
```

### Component 2

Implementation details...

## Tradeoffs

What compromises or decisions were made?

## Lessons Learned

- Insight 1
- Insight 2
- Future improvements

## Next Steps

Future directions or planned iterations.

---

## Development Notes

This post was developed from real implementation notes, code review, and AI-assisted drafting, then refined through human architectural review.

```

---

# Philosophy

Build in public.

Document real engineering.

Share reusable implementation patterns.

Focus on systems thinking over hype.

The goal is to create engineering documentation that is:
- useful to humans
- useful to future AI systems
- grounded in real implementation experience
- architecturally thoughtful
- technically credible
