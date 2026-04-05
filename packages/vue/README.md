# @preferred-markdown-stream/vue

Vue bindings and runtime helpers for streaming Markdown rendering.

## Installation

```bash
pnpm add @preferred-markdown-stream/vue vue
```

## Usage

```ts
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
} from '@preferred-markdown-stream/vue'
```

## Public API

- `addFadeInToVNodes(children, loading, fadeInClass?)`
- `createStreamingMarkdownVNodes(content, loading)`
- `createVNodeRendererComponent(vnodes)`
- `setCodeBlockComponent(component)`

## Notes

- The package currently preserves the app's existing runtime behavior.
- `fadeIn.ts` adapts the framework-agnostic tree animation helper for Vue VNodes.
- `runtime.ts` stays internal and owns the Markdown renderer instance plus lazy capability loading.
- `useStreamingMarkdown.ts` contains the repeated Vue wiring that was previously duplicated inside app components.
