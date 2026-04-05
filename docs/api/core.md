# Core API

## `splitContent(message)`

```ts
function splitContent(message: string): string
```

Returns the visible portion of a streaming Markdown string.

### Behavior

- keeps complete trailing sentences,
- removes incomplete trailing fragments,
- strips incomplete links, images, tables, inline code, and display math.

## `addFadeInClassToTreeNodes(children, loading, fadeInClass?)`

```ts
function addFadeInClassToTreeNodes<T extends StreamingTextNode>(
  children: T[],
  loading: boolean,
  fadeInClass?: string,
): T[]
```

Adds a CSS class to text-backed leaves in a generic render tree while loading.

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| `children` | `T[]` | A generic tree of nodes with `children` and optional `props`. |
| `loading` | `boolean` | Whether fade-in classes should be applied. |
| `fadeInClass` | `string` | Optional class name. Defaults to `fade-in`. |

## `streamingTextStyles`

```ts
const streamingTextStyles: string
```

Default CSS used for fade-in behavior.

## `StreamingTextNode`

```ts
interface StreamingTextNode {
  children?: string | StreamingTextNode[] | unknown
  props?: {
    class?: string
    [key: string]: unknown
  } | null
}
```

Shared node type used by the generic tree helper.
