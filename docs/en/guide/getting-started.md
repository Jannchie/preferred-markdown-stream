# Getting Started

`preferred-markdown-stream` is designed for interfaces where Markdown arrives progressively, such as chat UIs, reasoning panels, or assistant responses.

Instead of rendering every partial fragment immediately, the packages help you:

- keep complete sentences visible,
- avoid dangling links and tables,
- delay incomplete inline code and display math,
- keep unfinished fenced code blocks visible so code can stream progressively,
- add fade-in classes to newly rendered content.

## Choose a Package

Use `@preferred-markdown-stream/core` if you want the streaming logic without Vue.

Use `@preferred-markdown-stream/vue` if your UI is built with Vue and you want a ready-to-use renderer pipeline.

The Vue package re-exports `splitContent()` from the core package, so Vue-first consumers can stay on a single package import path.

## Install

### Core only

```bash
pnpm add @preferred-markdown-stream/core
```

### Vue integration

```bash
pnpm add @preferred-markdown-stream/vue vue
```

The Vue package can be imported directly from the package root:

```ts
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
} from '@preferred-markdown-stream/vue'
```

## Quick Examples

### Core

```ts
import { splitContent } from '@preferred-markdown-stream/core'
import '@preferred-markdown-stream/core/styles.css'

const partial = 'Hello world. This sentence is still typ'
const visible = splitContent(partial)

console.log(visible)
// "Hello world."
```

### Vue

```ts
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
  splitContent,
} from '@preferred-markdown-stream/vue'
import { ref } from 'vue'
import '@preferred-markdown-stream/vue/styles.css'

const content = ref('')
const loading = ref(true)

const preview = splitContent(content.value)
const { contentVNodes } = createStreamingMarkdownVNodes(content, loading)
export const StreamingMarkdown = createVNodeRendererComponent(contentVNodes)
```

## How the Packages Fit Together

`@preferred-markdown-stream/vue` depends on `@preferred-markdown-stream/core`.

The core package owns the streaming-safe text splitting and generic fade-in tree helper. The Vue package adapts those behaviors to Vue VNodes, Markdown-It rendering, KaTeX, and Shiki.

## Recommended Reading

- [Core Package](/en/guide/core)
- [Vue Package](/en/guide/vue)
- [Core API](/en/api/core)
- [Vue API](/en/api/vue)
