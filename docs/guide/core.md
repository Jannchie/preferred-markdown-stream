# Core Package

`@preferred-markdown-stream/core` contains the framework-agnostic pieces of the project.

## Install

```bash
pnpm add @preferred-markdown-stream/core
```

## Exports

- `splitContent(message)`
- `addFadeInClassToTreeNodes(children, loading, fadeInClass?)`
- `streamingTextStyles`
- `StreamingTextNode`

## `splitContent()`

`splitContent()` trims the unsafe tail of a streaming Markdown string and keeps the stable prefix.

It currently handles:

- incomplete trailing sentences in English and Chinese,
- dangling ordered-list prefixes such as `2.`,
- unclosed inline code,
- incomplete links and images,
- incomplete markdown tables without a separator row,
- unclosed display math blocks such as `$$ ...`.

### Example

```ts
import { splitContent } from '@preferred-markdown-stream/core'

const incoming = `
Hello.

| Name | Status |
`.trim()

console.log(splitContent(incoming))
// "Hello.\n"
```

## `addFadeInClassToTreeNodes()`

Use this helper when you already have a tree of render nodes and want to attach a fade-in class to text-backed leaves while loading.

### Example

```ts
import { addFadeInClassToTreeNodes } from '@preferred-markdown-stream/core'

const tree = [
  {
    props: { class: 'root' },
    children: [
      { props: { class: 'message' }, children: 'Hello' },
    ],
  },
]

addFadeInClassToTreeNodes(tree, true, 'fade-in')
```

## `streamingTextStyles`

`streamingTextStyles` exposes a CSS string that you can inject into your app when you want a default fade-in animation style.

### Example

```ts
import { streamingTextStyles } from '@preferred-markdown-stream/core'

const style = document.createElement('style')
style.textContent = streamingTextStyles
document.head.append(style)
```

## `StreamingTextNode`

`StreamingTextNode` is the shared node shape used by the generic fade-in helper. It models a tree with:

- `children`
- `props`

Use it when you need TypeScript support around custom node transformations.
