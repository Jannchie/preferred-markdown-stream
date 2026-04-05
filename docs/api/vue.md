# Vue API

## `addFadeInToVNodes(children, loading, fadeInClass?)`

```ts
function addFadeInToVNodes(
  children: VNode[],
  loading: boolean,
  fadeInClass?: string,
): VNode[]
```

Vue adapter around the generic fade-in tree helper from `@preferred-markdown-stream/core`.

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
