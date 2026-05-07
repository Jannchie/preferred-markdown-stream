---
layout: home

hero:
  name: preferred-markdown-stream
  text: 以流式方式渲染 Markdown，而不暴露破碎片段
  tagline: 提供一个与框架无关的核心包，以及一个面向 Vue 的渐进式 Markdown 渲染包。
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/getting-started
    - theme: alt
      text: Vue 指南
      link: /zh/guide/vue

features:
  - title: 面向流式输出
    details: 在内容尚未稳定前，隐藏不完整的尾句、行内标记、表格和块级数学公式。
  - title: 框架无关核心
    details: "如果你只需要内容切分和淡入辅助能力，可以使用 `@preferred-markdown-stream/core`。"
  - title: 直接集成 Vue
    details: "直接从 `@preferred-markdown-stream/vue` 导入，渲染 VNodes，按需加载 KaTeX 与 Shiki，并自定义代码块。"
---

## 你将获得

- `@preferred-markdown-stream/core`：用于内容切分和通用树动画辅助。
- `@preferred-markdown-stream/vue`：用于 VNode 渲染、Markdown 运行时辅助以及组合式 API。
- 支持从包根路径直接导入，例如 `import { createStreamingMarkdownVNodes } from '@preferred-markdown-stream/vue'`。

## 包列表

| 包名 | 用途 |
| --- | --- |
| `@preferred-markdown-stream/core` | 与框架无关的逻辑，例如 `splitContent()` 和 `addFadeInClassToTreeNodes()` |
| `@preferred-markdown-stream/vue` | Vue 渲染辅助、懒加载 Markdown 能力与渲染器集成 |

## 下一步

- 从 [快速开始](/zh/guide/getting-started) 开始。
- 如果你只需要共享逻辑，阅读 [Core 包](/zh/guide/core)。
- 如果你想直接接入 Vue，阅读 [Vue 包](/zh/guide/vue)。
