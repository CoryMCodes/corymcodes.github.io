---
layout: post
title: "Building SeederKit's Schema Reader"
date: 2026-05-20 16:00:00 -0400
summary: "How SeederKit turns Active Record reflection into structured context for safer scenario planning and deterministic execution."
tags: [architecture, rails, ai, developer-tooling, seederkit]
---

## The Problem

SeederKit started as a way to make Rails seed data easier to generate, but the more useful direction is scenario generation: describing a realistic application state in natural language and turning that into valid records.

That creates a reliability problem.

A language model can help plan a scenario, but it should not be responsible for writing arbitrary Ruby against an unknown application. Rails applications already contain the information needed to constrain the workflow: models, tables, columns, associations, enums, and validations.

SeederKit needs that application structure before it can safely plan anything.

The `SchemaReader` is the first boundary in that system.

## Constraints

The first version had a few practical constraints:

- The host Rails app should remain the source of truth.
- Output should be stable, serializable, and easy to inspect.
- Downstream services should not need to know Active Record reflection APIs.
- Internal framework and engine models should be filtered out.
- The first pass should avoid noisy metadata unless another part of the pipeline needs it.

That last point matters. Rails exposes a lot of information. Not all of it belongs in the first version of the orchestration context.

## Architecture

`SchemaReader` sits between Active Record reflection and SeederKit's planning pipeline.

```txt
Rails Application
      |
      v
Active Record Models
      |
      v
SchemaReader
      |
      v
Normalized Schema Context
      |
      +--> DomainGraphBuilder
      +--> ScenarioPromptBuilder
      +--> ScenarioValidator
      +--> ExecutionPlanner
```

The goal is not to create a full Rails introspection engine immediately. The goal is to produce a boring, predictable schema summary that other services can trust.

That normalized schema becomes the shared context for planning, validation, and execution ordering.

## Implementation

The service starts by eager loading the Rails application, then selecting concrete application models:

```ruby
def call
  eager_load!

  {
    models: application_models.map { |model| summarize_model(model) }
                              .sort_by { |model| model.fetch(:name) }
  }
end

def application_models
  ActiveRecord::Base.descendants.select { |model| application_model?(model) }
end
```

Models are excluded if they are abstract, missing a table, unnamed, or part of ignored namespaces such as Rails internals or SeederKit itself.

Each model is then summarized into a stable hash:

```ruby
def summarize_model(model)
  {
    name: model.name,
    table_name: model.table_name,
    primary_key: model.primary_key,
    attributes: summarize_attributes(model),
    associations: summarize_associations(model),
    enums: summarize_enums(model),
    validations: summarize_validations(model)
  }
end
```

The important decision here is that downstream services consume this normalized shape instead of reaching back into Active Record directly.

Attributes include column-level details:

```ruby
{
  name: column.name,
  type: column.type,
  sql_type: column.sql_type,
  null: column.null,
  default: column.default
}
```

Associations include relationship metadata and a first-pass required flag:

```ruby
{
  name: association.name,
  macro: association.macro,
  class_name: association.class_name,
  foreign_key: association.foreign_key,
  required: required_association?(model, association),
  polymorphic: association.polymorphic?
}
```

For `belongs_to` associations, SeederKit can infer whether the association is required by checking the association options and the foreign key column nullability:

```ruby
def required_association?(model, association)
  return false unless association.macro == :belongs_to
  return false if association.options[:optional]

  foreign_key_column = model.columns_hash[association.foreign_key.to_s]
  foreign_key_column ? !foreign_key_column.null : false
end
```

That is not a complete validation model, but it gives the execution planner useful ordering information without asking the language model to guess.

## Tradeoffs

The first version uses plain hashes instead of value objects.

That is intentional for now. Hashes are easy to serialize, easy to inspect, and easy to pass into prompt-building or validation layers. The tradeoff is that nested keys can become informal contracts if the shape is not tested.

The mitigation is to lock the output shape with service tests and keep the extraction methods small.

Callbacks and scopes are also left out of the first pass. They may become useful later as execution-risk metadata, but they are noisy and harder to summarize cleanly. The initial schema context focuses on the pieces needed for planning valid records:

- columns
- associations
- enums
- validations
- required relationship hints

## Testing the Contract

A thin dummy app was not enough to prove the schema reader was useful. The test app needed enough Rails behavior to exercise reflection properly: users with posts, posts with comments, required associations, validations, and an enum-backed status.

That made the tests less about implementation mechanics and more about the contract SeederKit needs:

- application models are discovered
- engine models are excluded
- attributes include database metadata
- associations include foreign keys and required state
- enums are represented as values
- validations are normalized

For this kind of service, the tests are not just regression coverage. They define the schema contract for the rest of the orchestration pipeline.

## Lessons Learned

The main lesson is that deterministic AI workflows start before execution.

Reliability does not come from asking the model to be careful. It comes from limiting what the model is allowed to decide and giving the application deterministic layers around it.

For SeederKit, that means:

- Rails introspection builds the context.
- AI can help produce a structured scenario plan.
- Validation checks that plan against the schema.
- Execution happens through controlled application code.

The `SchemaReader` is small, but it establishes the direction of the system: AI-assisted planning, Rails-aware validation, and deterministic execution.

## Next Steps

The next layer is the domain graph.

Once SeederKit has normalized schema metadata, it can derive dependency ordering between models. That unlocks safer scenario planning because the system can understand that a `Post` depends on a `User`, or that a `Comment` depends on a `Post`.

From there, the same schema context can feed:

- prompt construction
- scenario validation
- execution planning
- rollback-safe seeding workflows
- richer debugging output

The long-term goal is not just better seed data. It is a reliable workflow for turning product-level scenario descriptions into valid Rails application state.

---

## Development Notes

This draft was developed from SeederKit engineering notes and implementation context around `SeederKit::SchemaReader`. Code examples were simplified from the current service implementation and sanitized for public documentation.
