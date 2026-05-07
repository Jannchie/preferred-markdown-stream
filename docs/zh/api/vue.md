# Vue API

## `splitContent(message)`

```ts
function splitContent(message: string): string
```

这是 core 流式文本切分函数的重新导出，方便只安装 `@preferred-markdown-stream/vue` 的使用者直接调用。

## `addFadeInToVNodes(children, loading, options?)`

```ts
function addFadeInToVNodes(
  children: VNode[],
  loading: boolean,
  options?: string | FadeInClassOptions,
): VNode[]
```

这是对 `@preferred-markdown-stream/core` 通用淡入树辅助函数的 Vue 适配层。

## `styles.css`

可以直接从 Vue 包导入默认动画样式：

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

这是 Vue 中流式 Markdown 渲染的主要辅助函数。

### 返回状态

- `formattedContent`：由 `splitContent(content.value)` 生成的稳定前缀
- `contentFinal`：加载时为 `formattedContent`，否则为完整的 `content.value`
- `contentVNodes`：当前可见内容渲染出的 VNodes
- `debouncedLoading`：延迟关闭的 loading ref，在 `loading` 变为 `false` 后仍会短暂保持 `true`

### 说明

- 当内容看起来需要数学公式或代码高亮时，KaTeX 和 Shiki 会被按需懒加载。
- 当前 `debouncedLoading` 大约会延迟 1 秒后才关闭淡入类名。

## `createVNodeRendererComponent(vnodes)`

```ts
function createVNodeRendererComponent(
  vnodes: { value: VNode[] },
): Component
```

把一个 VNode 容器包装成可直接渲染的 Vue 组件。

## `setCodeBlockComponent(component)`

```ts
function setCodeBlockComponent(component: any): void
```

用自定义 Vue 组件覆盖 fenced code block 的渲染方式。

该组件会收到以下 props：

- `language: string`
- `content: string`
- `preAttrs: Record<string, any>`
