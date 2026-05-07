---
layout: home

hero:
  name: preferred-markdown-stream
  text: 断片を見せずに Markdown をストリーミング表示
  tagline: フレームワーク非依存の core パッケージと、Vue 向けの段階的 Markdown レンダリングパッケージを提供します。
  actions:
    - theme: brand
      text: はじめに
      link: /ja/guide/getting-started
    - theme: alt
      text: Vue ガイド
      link: /ja/guide/vue

features:
  - title: ストリーミング前提
    details: 内容がまだ不安定な間は、未完成の文末、インライン記法、テーブル、ディスプレイ数式を非表示にします。
  - title: フレームワーク非依存の core
    details: "内容分割とフェードイン補助だけが必要なら `@preferred-markdown-stream/core` を利用できます。"
  - title: Vue へ直接統合
    details: "`@preferred-markdown-stream/vue` から直接 import して、VNodes の描画、KaTeX と Shiki の遅延読み込み、コードブロックのカスタマイズを行えます。"
---

## 得られるもの

- `@preferred-markdown-stream/core`：内容分割と汎用ツリーアニメーション補助。
- `@preferred-markdown-stream/vue`：VNode レンダリング、Markdown ランタイム補助、Composition API と相性のよい API。
- `import { createStreamingMarkdownVNodes } from '@preferred-markdown-stream/vue'` のようなルート import を前提にしたパッケージ構成。

## パッケージ

| パッケージ | 用途 |
| --- | --- |
| `@preferred-markdown-stream/core` | `splitContent()` や `addFadeInClassToTreeNodes()` などのフレームワーク非依存ロジック |
| `@preferred-markdown-stream/vue` | Vue レンダリング補助、遅延 Markdown 機能、レンダラー統合 |

## 次に読むもの

- [はじめに](/ja/guide/getting-started) から始めてください。
- 共通ロジックだけ必要なら [Core パッケージ](/ja/guide/core) を参照してください。
- Vue にそのまま組み込みたいなら [Vue パッケージ](/ja/guide/vue) を参照してください。
