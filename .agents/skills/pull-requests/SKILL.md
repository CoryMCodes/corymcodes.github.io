---
name: pull-requests
description: GitHub pull request patterns. Use when creating PRs or updating PR descriptions.
---

# Pull Requests

Patterns for creating clear, practical pull requests.

## When to Use

- Creating a new pull request
- Updating a PR description
- Reviewing PR conventions

## PR Template

```markdown
## Summary
- Bullet points describing what changed

## Test plan
- [ ] Verification steps
```

## Requirements

1. **Use bullet summaries** - Keep the summary concise and focused on user-visible or implementation-relevant changes.
2. **Add a test plan** - Include verification steps as a checklist.
3. **Keep context useful** - Mention architecture, migration, rollout, or risk notes only when they help reviewers evaluate the change.

## Example

```markdown
## Summary
- Add CI workflow for Jekyll build verification
- Add Gemfile.lock for reproducible builds

## Test plan
- [ ] CI passes on this PR
- [ ] Local build works with `bundle exec jekyll build`
```
