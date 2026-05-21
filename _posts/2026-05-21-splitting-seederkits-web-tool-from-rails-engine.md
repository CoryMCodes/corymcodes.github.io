---
layout: post
title: "Splitting SeederKit's Web Tool from Its Rails Engine"
date: 2026-05-21 14:48:29 -0400
summary: "Why SeederKit now has a zero-setup schema-to-seeds webpage and a deeper Rails engine path for deterministic scenario orchestration."
tags: [architecture, rails, developer-tooling, product-engineering, seederkit]
---

## The Problem

SeederKit is starting to separate into two related products.

The first is a zero-setup webpage: paste a Rails `schema.rb`, get a starter `db/seeds.rb` file back. It is intentionally small. It asks for no install, no app access, no credentials, and no backend server.

The second is the Rails engine: installed inside a real application, able to introspect live Active Record models, build domain context, and eventually plan, validate, and execute repeatable scenarios.

Those two paths solve different parts of the same problem. The webpage is the low-friction first touch. The engine is the deeper developer workflow.

Trying to make one surface carry both jobs too early would make the simple thing heavier and the powerful thing shallower.

## Constraints

The webpage MVP is mostly a deterministic text transformation:

```txt
schema.rb -> seeds.rb
```

That does not require a Rails server. A hosted Rails app would work, but it would add runtime complexity, deployment overhead, and a less comfortable privacy story for users pasting schema text into a tool.

The engine has a different set of constraints. It needs to run inside a Rails app because the richer version of SeederKit depends on Rails itself:

- Active Record model metadata
- associations
- validations
- enum definitions
- execution ordering
- future scenario validation

That pushed the project toward a useful boundary: keep the public webpage static, and let the engine stay Rails-native.

## Architecture

The current split looks like this:

```txt
Standalone webpage
  input:  pasted schema.rb
  output: starter seeds.rb
  stack:  Vite + TypeScript
  deploy: static hosting

Rails engine
  input:  live application models
  output: schema context, domain graph, future execution plans
  stack:  Rails engine services
  deploy: installed in host app
```

The two implementations do not need to share runtime code yet. They need to share product behavior.

That is an important distinction. The webpage can move quickly in TypeScript because it is optimizing for a narrow workflow. The engine can keep building Rails-specific services because it is optimizing for deeper application awareness.

The engine path is becoming:

```txt
SchemaReader
      |
      v
DomainGraphBuilder
      |
      v
Scenario validation / execution planning
```

The web path is smaller:

```txt
parse schema text
      |
      v
build seed plan
      |
      v
generate seeds.rb
```

Both paths care about deterministic ordering. They just get their source data differently.

## Implementation

The static web tool has a single high-level operation:

```ts
export function generateSeeds(schemaText: string): string {
  return generateSeedFile(buildSeedPlan(parseSchema(schemaText)));
}
```

That pipeline is intentionally plain. The parser reads `create_table` blocks, collects supported columns, skips Rails and SeederKit internal tables, applies explicit foreign keys, and infers obvious `_id` relationships.

The seed planner then orders parent tables before child tables:

```ts
export function buildSeedPlan(parsedSchema: ParsedSchema): SeedPlan {
  const tablesByName = new Map(parsedSchema.tables.map((table) => [table.name, cloneTable(table)]));
  const orderedNames = dependencyOrder(tablesByName);

  return {
    tables: orderedNames.map((tableName) => {
      const table = tablesByName.get(tableName);

      if (!table) {
        throw new Error(`Missing table ${tableName}`);
      }

      return {
        ...table,
        variableName: variableNameFor(table.name),
      };
    }),
  };
}
```

The Rails engine is moving toward the same concept from the other direction. Instead of parsing pasted text, it can read the application through Rails reflection.

`SchemaReader` produces normalized model metadata. `DomainGraphBuilder` turns that metadata into dependency information:

```ruby
def call(schema)
  models = schema.fetch(:models)
  models_by_name = models.to_h { |model| [ model.fetch(:name), model ] }
  dependencies_by_name = dependencies_by_name(models, models_by_name)
  dependents_by_name = dependents_by_name(models_by_name.keys, dependencies_by_name)

  {
    models: graph_models(models, dependencies_by_name, dependents_by_name),
    creation_order: creation_order(models_by_name.keys, dependencies_by_name)
  }
end
```

For v1, the graph uses non-polymorphic `belongs_to` associations only:

```ruby
def dependencies_for(model, known_model_names)
  model.fetch(:associations, []).filter_map do |association|
    next unless association.fetch(:macro) == :belongs_to
    next if association.fetch(:polymorphic, false)

    class_name = association.fetch(:class_name)
    class_name if known_model_names.include?(class_name)
  end.uniq
end
```

That keeps the service focused. The graph does not try to solve validations, enum state, workflows, prompts, or execution. It answers one question:

```txt
In what order can these models be created safely?
```

The output is small enough to inspect and stable enough for another service to consume:

```ruby
{
  models: [
    {
      name: "User",
      table_name: "users",
      dependencies: [],
      dependents: ["Post"]
    }
  ],
  creation_order: ["User", "Post", "Comment"]
}
```

## Tradeoffs

The biggest tradeoff is duplication.

The web app has a TypeScript implementation of the schema-to-seeds flow. The engine has Ruby services with similar concepts. Sharing code would sound cleaner, but it would force one runtime to shape the other before the product behavior is stable.

That is not worth it yet.

The webpage needs to be fast, static, and safe for anonymous users. The engine needs to be Rails-aware and eventually capable of deeper orchestration. Keeping those code paths separate lets each side optimize for its real job.

Another tradeoff is that the web tool is intentionally less ambitious. It can generate starter seeds from schema structure, but it does not know model validations, callbacks, scopes, or business workflows. That is acceptable because its promise is smaller.

The engine can take the slower path toward richer context because it has access to the app itself.

## Lessons Learned

The useful product boundary became clearer after building both directions.

The public tool should stay simple. Its value is immediacy: paste schema, get a useful starting point. Adding a server or an engine install would weaken that.

The Rails engine should stay service-first. Its value is application awareness: schema context, domain graphs, validation, and deterministic execution inside the host app.

`DomainGraphBuilder` also changed how `SchemaReader` feels. Before the graph, schema metadata was mostly descriptive. After the graph, that metadata becomes an orchestration input.

That is the important step. SeederKit is not just collecting facts about an app. It is turning those facts into a structure that later services can use to make safer decisions.

## Next Steps

The next engine step is likely a structured scenario format or validation layer that consumes both `SchemaReader` and `DomainGraphBuilder`.

That would move SeederKit closer to the core workflow:

```txt
describe intent
      |
      v
validate against app structure
      |
      v
plan deterministic execution
      |
      v
create repeatable scenario data
```

The webpage can keep improving the immediate `schema.rb -> seeds.rb` experience. The engine can keep building the deeper orchestration path.

That split feels right for now: one product surface for quick utility, one Rails-native path for serious developer tooling.

---

## Development Notes

This post was developed from the `2026-05-21 14:45` SeederKit engineering note and implementation context from the schema parser, seed planner, seed file generator, TypeScript web flow, and `DomainGraphBuilder`.
