# Vue パッケージ

`@preferred-markdown-stream/vue` は core パッケージの上に構築され、Vue 向けのレンダリングパイプラインを提供します。

## インストール

```bash
pnpm add @preferred-markdown-stream/vue vue
```

## ルート import

このパッケージはルートエントリから直接利用する前提で設計されています。

```ts
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
} from '@preferred-markdown-stream/vue'
```

## 基本ワークフロー

もっとも一般的な統合方法は次のとおりです。

1. 生のストリーミング文字列を `ref` に保持する。
2. それを `createStreamingMarkdownVNodes()` に渡す。
3. 返ってきた VNodes を `createVNodeRendererComponent()` でコンポーネント化する。
4. テンプレート内でそのコンポーネントを描画する。

### 例

```ts
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
} from '@preferred-markdown-stream/vue'
import { ref } from 'vue'
import '@preferred-markdown-stream/vue/styles.css'

const content = ref('')
const loading = ref(true)

const {
  contentFinal,
  contentVNodes,
  debouncedLoading,
  formattedContent,
}
  = createStreamingMarkdownVNodes(content, loading)

const StreamingMarkdown = createVNodeRendererComponent(contentVNodes)

export {
  contentFinal,
  debouncedLoading,
  formattedContent,
  StreamingMarkdown,
}
```

## レンダリングモード

### ストリーミングコンテンツ

テキストが時間をかけて届き、読み込み中は安定した接頭部分だけを表示したい場合は `createStreamingMarkdownVNodes()` を使ってください。

このヘルパーは次を返します。

- `formattedContent`：`splitContent()` が返すストリーミング安全な接頭部分
- `contentFinal`：読み込み中は `formattedContent`、それ以外は全文
- `contentVNodes`：現在表示可能な内容をレンダリングした Vue VNodes
- `debouncedLoading`：`loading` が `false` になった後もしばらくフェードイン用クラスを維持する遅延ローディングフラグ

## ランタイム挙動

このパッケージは Markdown-It、KaTeX、Shiki を内部で管理します。

数式やシンタックスハイライトが必要そうな内容を検知すると、自動的に遅延読み込みするため、多くの利用者は高レベルのストリーミング API だけで十分です。

`loading` が `true` から `false` に切り替わると、内部の `debouncedLoading` は約 1 秒間有効なままとなり、最後に描画されたバッチのフェードインが完了できるようになっています。

レンダラーは Markdown-It 由来の生 HTML も扱えます。ただしこの経路はブラウザ DOM API に依存するため、生 HTML を含む可能性がある場合はクライアントサイドレンダリングが最も安全です。

## コードブロックのカスタマイズ

fenced code block を自前の Vue コンポーネントで描画したい場合は `setCodeBlockComponent()` を使います。

コンポーネントには次の props が渡されます。

- `language`
- `content`
- `preAttrs`

### 例

```ts
import { setCodeBlockComponent } from '@preferred-markdown-stream/vue'
import CodeBlock from './CodeBlock.vue'

setCodeBlockComponent(CodeBlock)
```

## フェードイン補助

すでに Vue VNodes を持っていて、アニメーション補助だけ欲しい場合は `addFadeInToVNodes()` を使ってください。
