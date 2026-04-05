# preferred-markdown-stream

A standalone pnpm monorepo for streaming Markdown packages.

## Packages

- `@preferred-markdown-stream/core`
- `@preferred-markdown-stream/vue`
- `@preferred-markdown-stream/playground`

## Scripts

- `pnpm build`
- `pnpm dev:playground`
- `pnpm docs:build`
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
