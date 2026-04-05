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

## Public API

- `splitContent(message)`
- `addFadeInClassToTreeNodes(children, loading, fadeInClass?)`
- `streamingTextStyles`
- `StreamingTextNode`

## Notes

- The current implementation keeps the existing behavior from the app.
- The core package no longer depends on Vue types.
- Vue-specific node adaptation lives in `@preferred-markdown-stream/vue`.
