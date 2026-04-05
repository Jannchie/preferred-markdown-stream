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

## Notes

- The current implementation keeps the existing behavior from the app.
- The core package no longer depends on Vue types.
- Vue-specific node adaptation lives in `@preferred-markdown-stream/vue`.
- Default animation styles are published via `@preferred-markdown-stream/core/styles.css`.
- Animation duration and timing can be overridden with CSS variables.
