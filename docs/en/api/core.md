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

## `addFadeInClassToTreeNodes(children, loading, options?)`

```ts
function addFadeInClassToTreeNodes<T extends StreamingTextNode>(
  children: T[],
  loading: boolean,
  options?: string | FadeInClassOptions,
): T[]
```

Adds a CSS class to text-backed leaves in a generic render tree while loading.

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| `children` | `T[]` | A generic tree of nodes with `children` and optional `props`. |
| `loading` | `boolean` | Whether fade-in classes should be applied. |
| `options` | `string \| FadeInClassOptions` | Optional fade-in class config. Defaults to `preferred-markdown-stream-fade-in`. |

## `FadeInClassOptions`

```ts
interface FadeInClassOptions {
  className?: string
}
```

Controls which CSS class is attached while `loading` is `true`.

## `styles.css`

Import the default animation styles from the CSS subpath:

```ts
import '@preferred-markdown-stream/core/styles.css'
```

The stylesheet supports these CSS variables:

- `--preferred-markdown-stream-animation-name`
- `--preferred-markdown-stream-animation-duration`
- `--preferred-markdown-stream-animation-timing-function`
- `--preferred-markdown-stream-animation-fill-mode`

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
