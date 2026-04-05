# Vue API

## `splitContent(message)`

```ts
function splitContent(message: string): string
```

Re-export of the core streaming text splitter for Vue-first consumers that only install `@preferred-markdown-stream/vue`.

## `addFadeInToVNodes(children, loading, options?)`

```ts
function addFadeInToVNodes(
  children: VNode[],
  loading: boolean,
  options?: string | FadeInClassOptions,
): VNode[]
```

Vue adapter around the generic fade-in tree helper from `@preferred-markdown-stream/core`.

## `styles.css`

Import the default animation styles from the Vue package directly:

```ts
import '@preferred-markdown-stream/vue/styles.css'
```

## `createStreamingMarkdownVNodes(content, loading)`

```ts
function createStreamingMarkdownVNodes(
  content: Readonly<Ref<string>>,
  loading: Readonly<Ref<boolean>>,
): {
  contentFinal: ComputedRef<string>
  contentVNodes: { value: VNode[] }
  debouncedLoading: Ref<boolean>
  formattedContent: ComputedRef<string>
}
```

Primary helper for streaming Markdown rendering in Vue.

## `createVNodeRendererComponent(vnodes)`

```ts
function createVNodeRendererComponent(
  vnodes: { value: VNode[] },
): Component
```

Turns a VNode container into a renderable Vue component.

## `setCodeBlockComponent(component)`

```ts
function setCodeBlockComponent(component: any): void
```

Overrides fenced code block rendering with a custom Vue component.
