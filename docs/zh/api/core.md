# Core API

## `splitContent(message)`

```ts
function splitContent(message: string): string
```

返回流式 Markdown 字符串中当前可安全展示的部分。

### 行为

- 保留完整的尾部句子，
- 移除不完整的尾部片段，
- 去掉未完成的链接、图片、表格、行内代码和块级数学公式。

## `addFadeInClassToTreeNodes(children, loading, options?)`

```ts
function addFadeInClassToTreeNodes<T extends StreamingTextNode>(
  children: T[],
  loading: boolean,
  options?: string | FadeInClassOptions,
): T[]
```

在加载期间，为通用渲染树中的文本叶子节点添加 CSS 类名。

### 参数

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| `children` | `T[]` | 一棵包含 `children` 和可选 `props` 的通用节点树。 |
| `loading` | `boolean` | 是否应用淡入类名。 |
| `options` | `string \| FadeInClassOptions` | 可选的淡入类名配置，默认是 `preferred-markdown-stream-fade-in`。 |

## `FadeInClassOptions`

```ts
interface FadeInClassOptions {
  className?: string
}
```

控制在 `loading` 为 `true` 时附加哪个 CSS 类名。

## `styles.css`

可以从以下 CSS 子路径导入默认动画样式：

```ts
import '@preferred-markdown-stream/core/styles.css'
```

样式表支持这些 CSS 变量：

- `--preferred-markdown-stream-animation-name`
- `--preferred-markdown-stream-animation-duration`
- `--preferred-markdown-stream-animation-timing-function`
- `--preferred-markdown-stream-animation-fill-mode`

## `StreamingTextNode`

```ts
interface StreamingTextNode {
  children?: string | StreamingTextNode[] | unknown
  props?: {
    class?: string
    [key: string]: unknown
  } | null
}
```

这是通用树辅助函数共享使用的节点类型。
