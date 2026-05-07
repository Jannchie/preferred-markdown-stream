# はじめに

`preferred-markdown-stream` は、チャット UI、推論パネル、アシスタント応答のように Markdown が段階的に届くインターフェース向けに設計されています。

未完成の断片をすぐに描画する代わりに、次のことを助けます。

- 完結した文を表示したままにする
- ぶら下がったリンクやテーブルを避ける
- 未完成のインラインコードや数式の表示を遅らせる
- 終了していない fenced code block を可視のままにして、コードを継続的にストリーミング表示する
- 新しく描画された内容にフェードイン用クラスを付与する

## パッケージの選び方

Vue を使わずにストリーミング処理ロジックだけ欲しい場合は `@preferred-markdown-stream/core` を使ってください。

UI が Vue ベースで、すぐ使えるレンダリングパイプラインが欲しい場合は `@preferred-markdown-stream/vue` を使ってください。

Vue パッケージは core パッケージの `splitContent()` を再エクスポートしているため、Vue 中心の利用者は import 経路を一つに保てます。

## インストール

### Core のみ

```bash
pnpm add @preferred-markdown-stream/core
```

### Vue 統合

```bash
pnpm add @preferred-markdown-stream/vue vue
```

Vue パッケージはパッケージルートから直接 import できます。

```ts
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
} from '@preferred-markdown-stream/vue'
```

## クイックサンプル

### Core

```ts
import { splitContent } from '@preferred-markdown-stream/core'
import '@preferred-markdown-stream/core/styles.css'

const partial = 'Hello world. This sentence is still typ'
const visible = splitContent(partial)

console.log(visible)
// "Hello world."
```

### Vue

```ts
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
  splitContent,
} from '@preferred-markdown-stream/vue'
import { ref } from 'vue'
import '@preferred-markdown-stream/vue/styles.css'

const content = ref('')
const loading = ref(true)

const preview = splitContent(content.value)
const { contentVNodes } = createStreamingMarkdownVNodes(content, loading)
export const StreamingMarkdown = createVNodeRendererComponent(contentVNodes)
```

## パッケージ同士の関係

`@preferred-markdown-stream/vue` は `@preferred-markdown-stream/core` に依存しています。

core パッケージはストリーミング安全なテキスト分割と汎用フェードインツリーヘルパーを担当し、Vue パッケージはそれらを Vue VNodes、Markdown-It レンダリング、KaTeX、Shiki に適応します。

## 関連ドキュメント

- [Core パッケージ](/ja/guide/core)
- [Vue パッケージ](/ja/guide/vue)
- [Core API](/ja/api/core)
- [Vue API](/ja/api/vue)
