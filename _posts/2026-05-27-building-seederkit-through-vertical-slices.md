---
layout: post
title: "Building SeederKit Through Vertical Slices"
date: 2026-05-27 15:05:54 -0400
summary: "How shifting from broad architecture planning to small executable slices changed the way I use coding agents while building SeederKit."
tags: [architecture, ai, developer-tooling, lessons, seederkit]
---

## The Problem

Coding agents are useful for exploring architecture. They can help name components, compare boundaries, outline phases, and pressure-test a direction before the code exists.

That is valuable, but I started to feel the limit of staying at that level for too long.

SeederKit already had a clear long-term direction:

```txt
natural language or structured request
-> structured scenario plan
-> deterministic validation
-> deterministic execution
-> repeatable development state
```

The architecture made sense. The product still needed to become usable.

That shifted the way I wanted to use coding agents. Instead of asking for more top-level architecture, I started pushing the work downward into smaller vertical slices: one thin path that accepts input, validates it, performs a useful action, and proves the behavior in tests.

The recent SeederKit additions came from that shift.

## Constraints

The main constraint is that SeederKit should not let AI generate arbitrary Ruby.

The product direction still depends on structured plans and deterministic execution. AI may eventually help translate intent into a scenario plan, but the engine needs to own the contracts around validation, ordering, execution, and rollback behavior.

That means the first usable slice could not be "ask the model to seed my app."

It needed to be smaller:

```txt
Ruby hash plan
-> normalized scenario entities
-> basic validation
-> transaction-wrapped create!
-> created records returned by ref
```

That slice is not the whole architecture. It is the first executable version of the core promise.

## Architecture

The current engine map now has a concrete scenario path:

```txt
ScenarioPlan
      |
      v
ScenarioEntity
      |
      v
BasicScenarioValidator
      |
      v
ScenarioExecutor
      |
      v
Active Record records
```

There is also a registry path for named scenarios:

```txt
SeederKit.scenario
      |
      v
ScenarioRegistry
      |
      v
SeederKit.run_scenario
      |
      v
ScenarioExecutor
```

This is intentionally less abstract than the earlier architecture work.

The goal was not to design every future service. The goal was to prove that a scenario can be described without executable Ruby generation, validated before execution, and run through a controlled path.

That changed the role of the coding agent. The agent became less useful as a speculative architect and more useful as an implementation partner for a narrow acceptance test.

## Implementation

The first contract is `ScenarioPlan`.

It accepts plain hash input and normalizes each entity into a small object:

```ruby
module SeederKit
  class ScenarioPlan
    attr_reader :entities

    def self.build(input)
      new(input)
    end

    def initialize(input)
      normalized_input = normalize_hash(input)

      @entities = Array(normalized_input.fetch("entities", [])).map do |entity_input|
        normalized_entity = normalize_hash(entity_input)

        ScenarioEntity.new(
          ref: normalized_entity["ref"],
          model: normalized_entity["model"],
          count: normalized_entity.fetch("count", ScenarioEntity::DEFAULT_COUNT),
          attributes: normalized_entity.fetch("attributes", {}),
          belongs_to: normalized_entity.fetch("belongs_to", {})
        )
      end
    end
  end
end
```

The entity object keeps the first version deliberately small:

```ruby
module SeederKit
  class ScenarioEntity
    DEFAULT_COUNT = 1

    attr_reader :ref, :model, :count, :attributes, :belongs_to

    def initialize(ref:, model:, count: DEFAULT_COUNT, attributes: {}, belongs_to: {})
      @ref = ref.to_s.strip
      @model = model.to_s.strip
      @count = count.to_i
      @attributes = normalize_hash(attributes)
      @belongs_to = normalize_hash(belongs_to)
    end
  end
end
```

The plan does not validate Active Record behavior. It does not resolve associations. It does not touch the database. It just gives the rest of the system a predictable shape.

Validation is a separate step:

```ruby
def call(plan)
  errors = []
  refs = plan.entities.map(&:ref)

  validate_refs(plan, refs, errors)
  validate_entities(plan, refs, errors)
  validate_dependency_order(plan, errors)

  raise ValidationError, errors if errors.any?

  true
end
```

The first validator checks practical things:

- refs are present and unique
- models exist
- attributes exist
- counts are positive
- `belongs_to` associations exist
- referenced entities exist
- referenced entities appear earlier in the plan

That last rule is intentionally simple. The v1 executor follows explicit scenario order, so validation enforces that relationships point backward to records that already exist.

Execution then becomes straightforward:

```ruby
def call(input)
  plan = input.is_a?(ScenarioPlan) ? input : ScenarioPlan.build(input)

  validator.call(plan)

  records_by_ref = {}

  ActiveRecord::Base.transaction do
    plan.entities.each do |entity|
      records_by_ref[entity.ref] = create_records(entity, records_by_ref)
    end
  end

  Result.new(records_by_ref: records_by_ref)
end
```

This is the first real product slice: a user can describe users, posts, and comments as structured data, and SeederKit can create them through Rails while preserving references between records.

The registry gives that slice a more product-shaped API:

```ruby
SeederKit.scenario "User with posts" do
  description "Creates one user with two posts."
  plan(
    entities: [
      {
        ref: "user",
        model: "User",
        attributes: { name: "Alice", email: "alice@example.com" }
      },
      {
        ref: "post",
        model: "Post",
        count: 2,
        attributes: { title: "Hello", body: "Test body" },
        belongs_to: { user: "user" }
      }
    ]
  )
end
```

That is still not a final DSL. It is a usable path.

## Tradeoffs

The biggest tradeoff is accepting a smaller, less elegant architecture for the first executable version.

There is no full `ExecutionPlanner` yet. There is no advanced attribute resolver. There is no enum validation. There is no AI planner. The validator is named `BasicScenarioValidator` on purpose because it is the first useful layer, not the final one.

The upside is that the product now has a working center.

Before this slice, it was easy to keep discussing architecture:

```txt
SchemaReader should feed DomainGraphBuilder.
DomainGraphBuilder should feed validation.
Validation should feed execution planning.
AI should target structured outputs.
```

All of that is still true. But the recent work made the idea executable:

```txt
given a structured scenario,
SeederKit can validate it,
create records,
wire relationships,
rollback on failure,
and return refs to what it created.
```

That is a better foundation for the next architectural decision than another diagram.

## Lessons Learned

The main lesson is that agent-assisted development gets more useful when the task has a narrow behavioral target.

High-level architecture prompts are good for exploration, but they can keep producing more architecture. The work starts to feel productive without necessarily making the product more usable.

Small vertical slices create better pressure:

- What is the input?
- What is the output?
- What must be validated?
- What happens on failure?
- What can be tested end to end?

That framing made the recent additions much clearer. `ScenarioPlan`, `BasicScenarioValidator`, `ScenarioExecutor`, and `ScenarioRegistry` are not just more components. They are the first path through the product.

It also changed how I think about the architecture plan. The plan is still useful, but it should serve the slices. When a slice proves something, the architecture should absorb that evidence.

## Next Steps

The next step is not to jump straight to AI.

The better next step is to harden the scenario slice:

- validate required relationships against schema and graph context
- handle enum-like values deliberately
- define structured validation error codes more fully
- decide when `BasicScenarioValidator` should become a richer `ScenarioValidator`
- introduce an execution planner only when the current explicit-order model becomes too limiting

That path keeps SeederKit moving toward AI-assisted scenario generation without making AI the center of the architecture too early.

The product is stronger when deterministic Rails behavior comes first.

---

## Development Notes

This post was developed from recent SeederKit changes around `ScenarioPlan`, `ScenarioEntity`, `BasicScenarioValidator`, `ScenarioExecutor`, `ScenarioRegistry`, and the updated architecture plan. The framing came from a workflow shift: using coding agents less for broad architecture expansion and more for small, testable vertical slices.
