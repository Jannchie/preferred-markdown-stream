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

### Returned state

- `formattedContent`: the stable prefix produced by `splitContent(content.value)`
- `contentFinal`: `formattedContent` while loading, otherwise the full `content.value`
- `contentVNodes`: rendered VNodes for the current visible content
- `debouncedLoading`: a delayed loading ref that stays `true` briefly after `loading` becomes `false`

### Notes

- KaTeX and Shiki are lazy-loaded when the content suggests math or code rendering is needed.
- The delayed `debouncedLoading` state currently waits about 1 second before turning off fade-in classes.

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

The component receives these props:

- `language: string`
- `content: string`
- `preAttrs: Record<string, any>`
