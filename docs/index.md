---
layout: home

hero:
  name: preferred-markdown-stream
  text: Stream Markdown without broken fragments
  tagline: A framework-agnostic core package and a Vue package for progressively rendered Markdown UIs.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Vue Guide
      link: /guide/vue

features:
  - title: Streaming-first
    details: Hide incomplete trailing sentences, inline markup, tables, and display math until the content is ready to render.
  - title: Framework-agnostic core
    details: Use `@preferred-markdown-stream/core` when you only need content splitting and fade-in helpers.
  - title: Direct Vue integration
    details: Import straight from `@preferred-markdown-stream/vue` to render VNodes, lazy-load KaTeX and Shiki, and customize code blocks.
---

## What You Get

- `@preferred-markdown-stream/core` for content splitting and generic tree animation helpers.
- `@preferred-markdown-stream/vue` for VNode rendering, markdown runtime helpers, and composition-friendly APIs.
- A package structure that supports direct root imports such as `import { createStreamingMarkdownVNodes } from '@preferred-markdown-stream/vue'`.

## Packages

| Package | Use it for |
| --- | --- |
| `@preferred-markdown-stream/core` | Framework-agnostic logic like `splitContent()` and `addFadeInClassToTreeNodes()` |
| `@preferred-markdown-stream/vue` | Vue rendering helpers, lazy markdown capabilities, and renderer integration |

## Next Steps

- Start with [Getting Started](/guide/getting-started).
- Read [Core Package](/guide/core) if you only need the shared logic.
- Read [Vue Package](/guide/vue) if you want a drop-in Vue integration.
