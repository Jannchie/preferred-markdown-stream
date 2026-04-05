# @preferred-markdown-stream/playground

A small Vite playground for manually testing streamed Markdown rendering.

## Features

- Edit Markdown source content in a textarea
- Replay the content as a character, word, or line stream
- Inspect raw streamed text, sanitized partial text, and final rendered output
- Exercise the Vue bindings together with the core sentence-splitting behavior

## Development

```bash
pnpm install
pnpm dev:playground
```

The playground resolves the workspace source packages directly, so it can be used without publishing any package first.
