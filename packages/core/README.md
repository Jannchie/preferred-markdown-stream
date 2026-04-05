# @preferred-markdown-stream/core

Framework-agnostic utilities for streaming Markdown UIs.

## Installation

```bash
pnpm add @preferred-markdown-stream/core
```

## Usage

```ts
import { splitContent } from '@preferred-markdown-stream/core'
```

```ts
import '@preferred-markdown-stream/core/styles.css'
```

## Public API

- `splitContent(message)`
- `addFadeInClassToTreeNodes(children, loading, options?)`
- `StreamingTextNode`
- `FadeInClassOptions`

## Behavior Notes

- Incomplete trailing sentences, links, images, tables, inline code, and unclosed `$$` display math are hidden until they become safe to render.
- Unfinished fenced code blocks are kept visible so code can continue streaming progressively.

## Notes

- The current implementation keeps the existing behavior from the app.
- The core package no longer depends on Vue types.
- Vue-specific node adaptation lives in `@preferred-markdown-stream/vue`.
- Default animation styles are published via `@preferred-markdown-stream/core/styles.css`.
- Animation duration and timing can be overridden with CSS variables.
