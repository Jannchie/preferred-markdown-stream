# Core 包

`@preferred-markdown-stream/core` 包含项目中与框架无关的部分。

## 安装

```bash
pnpm add @preferred-markdown-stream/core
```

## 导出内容

- `splitContent(message)`
- `addFadeInClassToTreeNodes(children, loading, options?)`
- `StreamingTextNode`
- `FadeInClassOptions`

## `splitContent()`

`splitContent()` 会裁掉流式 Markdown 字符串中不安全的尾部，只保留稳定前缀。

当前会处理：

- 英文和中文中未完成的尾句，
- 类似 `2.` 这样的悬空有序列表前缀，
- 未闭合的行内代码，
- 不完整的链接和图片，
- 缺少分隔行的未完成 Markdown 表格，
- 例如 `$$ ...` 这样的未闭合块级数学公式。

它会有意保留未结束的 fenced code block，因为 Markdown-It 在流式过程中仍然可以把它渲染为代码块。

### 示例

```ts
import { splitContent } from '@preferred-markdown-stream/core'

const incoming = `
Hello.

| Name | Status |
`.trim()

console.log(splitContent(incoming))
// "Hello.\n"
```

## `addFadeInClassToTreeNodes()`

如果你已经有一棵渲染节点树，并希望在加载期间给文本叶子节点附加淡入类名，可以使用这个辅助函数。

### 示例

```ts
import { addFadeInClassToTreeNodes } from '@preferred-markdown-stream/core'
import '@preferred-markdown-stream/core/styles.css'

const tree = [
  {
    props: { class: 'root' },
    children: [
      { props: { class: 'message' }, children: 'Hello' },
    ],
  },
]

addFadeInClassToTreeNodes(tree, true)
```

### 自定义类名

```ts
import { addFadeInClassToTreeNodes } from '@preferred-markdown-stream/core'

addFadeInClassToTreeNodes(tree, true, {
  className: 'message-appear',
})
```

然后在你的应用中定义对应 CSS：

```css
.message-appear {
  opacity: 0;
  animation: message-appear 180ms ease forwards;
}

@keyframes message-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

## `StreamingTextNode`

`StreamingTextNode` 是通用淡入辅助函数使用的共享节点结构，它描述了一棵包含以下字段的树：

- `children`
- `props`

当你需要围绕自定义节点变换获得 TypeScript 支持时，可以使用它。

## 默认 CSS 定制

默认样式表位于 `@preferred-markdown-stream/core/styles.css`。

它支持以下 CSS 变量来调节常见动画参数：

```css
.chat-message {
  --preferred-markdown-stream-animation-duration: 180ms;
  --preferred-markdown-stream-animation-timing-function: linear;
}
```

如果你需要不同的类名或关键帧名称，可以自行定义 CSS，并通过 `className` 传入辅助函数。
