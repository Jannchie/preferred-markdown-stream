# @preferred-markdown-stream/vue

Vue bindings and runtime helpers for streaming Markdown rendering.

## Installation

```bash
pnpm add @preferred-markdown-stream/vue vue
```

## Usage

```ts
import '@preferred-markdown-stream/vue/styles.css'
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
  splitContent,
} from '@preferred-markdown-stream/vue'
```

## Public API

- `addFadeInToVNodes(children, loading, options?)`
- `createStreamingMarkdownVNodes(content, loading)`
- `createVNodeRendererComponent(vnodes)`
- `setCodeBlockComponent(component)`
- `splitContent(message)`

## Notes

- The package currently preserves the app's existing runtime behavior.
- `fadeIn.ts` adapts the framework-agnostic tree animation helper for Vue VNodes.
- `runtime.ts` stays internal and owns the Markdown renderer instance plus lazy capability loading.
- `useStreamingMarkdown.ts` contains the repeated Vue wiring that was previously duplicated inside app components.
- Default animation styles are published via `@preferred-markdown-stream/vue/styles.css`.
