# Core Package

`@preferred-markdown-stream/core` contains the framework-agnostic pieces of the project.

## Install

```bash
pnpm add @preferred-markdown-stream/core
```

## Exports

- `splitContent(message)`
- `addFadeInClassToTreeNodes(children, loading, options?)`
- `StreamingTextNode`
- `FadeInClassOptions`

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
import '@preferred-markdown-stream/core/styles.css'

const tree = [
  {
    props: { class: 'root' },
    children: [
      { props: { class: 'message' }, children: 'Hello' },
    ],
  },
]

addFadeInClassToTreeNodes(tree, true)
```

### Custom Class Name

```ts
import { addFadeInClassToTreeNodes } from '@preferred-markdown-stream/core'

addFadeInClassToTreeNodes(tree, true, {
  className: 'message-appear',
})
```

Then define the matching CSS in your app:

```css
.message-appear {
  opacity: 0;
  animation: message-appear 180ms ease forwards;
}

@keyframes message-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

## `StreamingTextNode`

`StreamingTextNode` is the shared node shape used by the generic fade-in helper. It models a tree with:

- `children`
- `props`

Use it when you need TypeScript support around custom node transformations.

## Default CSS Customization

The default stylesheet lives at `@preferred-markdown-stream/core/styles.css`.

It supports CSS variables for common animation tuning:

```css
.chat-message {
  --preferred-markdown-stream-animation-duration: 180ms;
  --preferred-markdown-stream-animation-timing-function: linear;
}
```

If you need a different class name or keyframes name, define your own CSS and pass `className` to the helper.
