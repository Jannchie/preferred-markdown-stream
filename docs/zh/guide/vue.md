# Vue 包

`@preferred-markdown-stream/vue` 构建在 core 包之上，提供一套对 Vue 更友好的渲染链路。

## 安装

```bash
pnpm add @preferred-markdown-stream/vue vue
```

## 根路径导入

这个包被设计为可以直接从根入口导入：

```ts
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
} from '@preferred-markdown-stream/vue'
```

## 主要工作流

最常见的接入方式如下：

1. 用一个 `ref` 保存原始流式字符串。
2. 把它传给 `createStreamingMarkdownVNodes()`。
3. 用 `createVNodeRendererComponent()` 把返回的 VNodes 包装成组件。
4. 在模板中渲染这个组件。

### 示例

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

## 渲染模式

### 流式内容

当文本会持续到达，而且你只希望在加载期间展示稳定前缀时，请使用 `createStreamingMarkdownVNodes()`。

这个辅助函数会返回：

- `formattedContent`：由 `splitContent()` 产生的流式安全前缀
- `contentFinal`：加载中为 `formattedContent`，加载结束后为完整内容
- `contentVNodes`：当前可见内容对应的 Vue VNodes
- `debouncedLoading`：一个延迟关闭的加载标记，在 `loading` 变为 `false` 后仍会短暂保留淡入类名

## 运行时行为

这个包会在内部管理 Markdown-It、KaTeX 与 Shiki。

当内容中检测到数学公式或代码高亮需求时，会自动按需加载，因此大多数使用者只需要依赖高层流式 API。

当 `loading` 从 `true` 切换为 `false` 时，内部的 `debouncedLoading` 会继续保持约 1 秒，这样最后一批内容仍能完成淡入动画。

渲染器也支持 Markdown-It 输出的原始 HTML。不过这一分支依赖浏览器 DOM API，所以当 Markdown 可能包含原始 HTML 时，优先选择客户端渲染会更稳妥。

## 自定义代码块

如果你希望 fenced code block 通过自己的 Vue 组件渲染，可以使用 `setCodeBlockComponent()`。

组件会收到以下 props：

- `language`
- `content`
- `preAttrs`

### 示例

```ts
import { setCodeBlockComponent } from '@preferred-markdown-stream/vue'
import CodeBlock from './CodeBlock.vue'

setCodeBlockComponent(CodeBlock)
```

## 淡入辅助

如果你已经有 Vue VNodes，只想使用动画辅助能力，可以使用 `addFadeInToVNodes()`。
