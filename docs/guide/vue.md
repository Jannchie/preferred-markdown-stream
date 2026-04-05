# Vue Package

`@preferred-markdown-stream/vue` builds on top of the core package and gives you a Vue-friendly rendering pipeline.

## Install

```bash
pnpm add @preferred-markdown-stream/vue vue
```

## Root Imports

The package is designed to be consumed directly from the root entry:

```ts
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
} from '@preferred-markdown-stream/vue'
```

## Main Workflow

The most common integration looks like this:

1. Keep your raw streaming string in a `ref`.
2. Pass it into `createStreamingMarkdownVNodes()`.
3. Turn the returned VNodes into a component with `createVNodeRendererComponent()`.
4. Render that component in your template.

### Example

```ts
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
} from '@preferred-markdown-stream/vue'
import { ref } from 'vue'
import '@preferred-markdown-stream/vue/styles.css'

const content = ref('')
const loading = ref(true)

const {
  contentFinal,
  contentVNodes,
  debouncedLoading,
  formattedContent,
}
  = createStreamingMarkdownVNodes(content, loading)

const StreamingMarkdown = createVNodeRendererComponent(contentVNodes)

export {
  contentFinal,
  debouncedLoading,
  formattedContent,
  StreamingMarkdown,
}
```

## Rendering Modes

### Streaming content

Use `createStreamingMarkdownVNodes()` when new text arrives over time and you only want to show the stable prefix while loading.

The helper returns:

- `formattedContent`: the streaming-safe prefix from `splitContent()`
- `contentFinal`: `formattedContent` while loading, otherwise the full content
- `contentVNodes`: rendered Vue VNodes
- `debouncedLoading`: a delayed loading flag that keeps fade-in classes active briefly after loading becomes `false`

## Runtime Behavior

The package manages Markdown-It, KaTeX, and Shiki internally.

Math and syntax highlighting are loaded automatically when matching content is detected, so most consumers only need the high-level streaming APIs.

When `loading` flips from `true` to `false`, the internal `debouncedLoading` state stays enabled for about 1 second so the last rendered batch can finish its fade-in animation.

The renderer also supports raw HTML from Markdown-It. That HTML path uses browser DOM APIs, so client-side rendering is the safest integration path when your Markdown may contain raw HTML.

## Custom Code Blocks

Use `setCodeBlockComponent()` when you want fenced code blocks to render through your own Vue component.

Your component receives:

- `language`
- `content`
- `preAttrs`

### Example

```ts
import { setCodeBlockComponent } from '@preferred-markdown-stream/vue'
import CodeBlock from './CodeBlock.vue'

setCodeBlockComponent(CodeBlock)
```

## Fade-in Helpers

If you already have Vue VNodes and only want the animation helper, use `addFadeInToVNodes()`.
