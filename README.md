# preferred-markdown-stream

A standalone pnpm monorepo for streaming Markdown packages.

The project provides:

- `@preferred-markdown-stream/core` for streaming-safe content splitting and generic fade-in helpers
- `@preferred-markdown-stream/vue` for Vue VNode rendering, Markdown-It integration, and lazy KaTeX/Shiki loading
- `@preferred-markdown-stream/playground` for local manual testing

Documentation lives in the `docs/` site and can be previewed locally with `pnpm docs:dev`.

## Packages

- `@preferred-markdown-stream/core`
- `@preferred-markdown-stream/vue`
- `@preferred-markdown-stream/playground`

## Scripts

- `pnpm build`
- `pnpm dev:playground`
- `pnpm docs:dev`
- `pnpm docs:build`
- `pnpm docs:preview`
- `pnpm lint`
- `pnpm lint:fix`
- `pnpm release:ci`
- `pnpm test`
- `pnpm typecheck`

## Release

The repository includes a GitHub Actions release workflow at `.github/workflows/release.yml`.

For npm trusted publishing with GitHub Actions, configure trusted publishers for:

- `@preferred-markdown-stream/core`
- `@preferred-markdown-stream/vue`

Official docs:

- `https://docs.npmjs.com/trusted-publishers/`
- `https://docs.npmjs.com/generating-provenance-statements/`
