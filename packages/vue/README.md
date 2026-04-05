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
  splitContent,
} from '@preferred-markdown-stream/vue'
import '@preferred-markdown-stream/vue/styles.css'
```

`createStreamingMarkdownVNodes()` returns `formattedContent`, `contentFinal`, `contentVNodes`, and `debouncedLoading`.

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
- KaTeX and Shiki are loaded on demand when matching content is detected.
- The fade-in state is intentionally delayed for about 1 second after loading completes so the last rendered batch can still animate.
- Raw HTML rendering uses browser DOM APIs internally, so client-side rendering is the safest path when your Markdown may contain raw HTML.
