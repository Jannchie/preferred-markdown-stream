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

const content = ref('')
const loading = ref(true)

const { contentFinal, contentVNodes, formattedContent }
  = createStreamingMarkdownVNodes(content, loading)

const StreamingMarkdown = createVNodeRendererComponent(contentVNodes)

export {
  contentFinal,
  formattedContent,
  StreamingMarkdown,
}
```

## Rendering Modes

### Streaming content

Use `createStreamingMarkdownVNodes()` when new text arrives over time and you only want to show the stable prefix while loading.

## Runtime Behavior

The package manages Markdown-It, KaTeX, and Shiki internally.

Math and syntax highlighting are loaded automatically when matching content is detected, so most consumers only need the high-level streaming APIs.

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
