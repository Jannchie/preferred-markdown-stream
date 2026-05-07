# 快速开始

`preferred-markdown-stream` 适合用于 Markdown 会持续流式到达的界面，例如聊天 UI、推理面板或助手回复。

它不会立刻渲染所有不完整片段，而是帮助你：

- 保持完整句子可见，
- 避免悬空的链接和表格，
- 延迟显示未完成的行内代码和数学公式，
- 保留未结束的 fenced code block，让代码可以持续流式展示，
- 为新渲染的内容添加淡入类名。

## 选择合适的包

如果你想在不依赖 Vue 的前提下使用流式处理逻辑，请使用 `@preferred-markdown-stream/core`。

如果你的 UI 基于 Vue，并且想要开箱即用的渲染链路，请使用 `@preferred-markdown-stream/vue`。

Vue 包会重新导出 core 包中的 `splitContent()`，因此以 Vue 为主的使用者可以只维持一条导入路径。

## 安装

### 仅使用 Core

```bash
pnpm add @preferred-markdown-stream/core
```

### 集成 Vue

```bash
pnpm add @preferred-markdown-stream/vue vue
```

Vue 包支持直接从包根路径导入：

```ts
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
} from '@preferred-markdown-stream/vue'
```

## 快速示例

### Core

```ts
import { splitContent } from '@preferred-markdown-stream/core'
import '@preferred-markdown-stream/core/styles.css'

const partial = 'Hello world. This sentence is still typ'
const visible = splitContent(partial)

console.log(visible)
// "Hello world."
```

### Vue

```ts
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
  splitContent,
} from '@preferred-markdown-stream/vue'
import { ref } from 'vue'
import '@preferred-markdown-stream/vue/styles.css'

const content = ref('')
const loading = ref(true)

const preview = splitContent(content.value)
const { contentVNodes } = createStreamingMarkdownVNodes(content, loading)
export const StreamingMarkdown = createVNodeRendererComponent(contentVNodes)
```

## 两个包如何协作

`@preferred-markdown-stream/vue` 依赖 `@preferred-markdown-stream/core`。

core 包负责流式安全的文本切分与通用淡入树处理；Vue 包则把这些能力适配到 Vue VNodes、Markdown-It 渲染、KaTeX 与 Shiki。

## 推荐阅读

- [Core 包](/zh/guide/core)
- [Vue 包](/zh/guide/vue)
- [Core API](/zh/api/core)
- [Vue API](/zh/api/vue)
