# Core パッケージ

`@preferred-markdown-stream/core` には、このプロジェクトのフレームワーク非依存な部分が含まれています。

## インストール

```bash
pnpm add @preferred-markdown-stream/core
```

## エクスポート

- `splitContent(message)`
- `addFadeInClassToTreeNodes(children, loading, options?)`
- `StreamingTextNode`
- `FadeInClassOptions`

## `splitContent()`

`splitContent()` は、ストリーミング中の Markdown 文字列から安全でない末尾を切り落とし、安定した先頭部分だけを残します。

現在は次のケースを扱います。

- 英語と中国語の未完成な文末
- `2.` のような途中の番号付きリスト接頭辞
- 閉じていないインラインコード
- 未完成のリンクや画像
- 区切り行を持たない未完成の Markdown テーブル
- `$$ ...` のような閉じていないディスプレイ数式ブロック

一方で、終了していない fenced code block はあえて可視のままにします。Markdown-It がストリーム途中でもコードとして描画できるためです。

### 例

```ts
import { splitContent } from '@preferred-markdown-stream/core'

const incoming = `
Hello.

| Name | Status |
`.trim()

console.log(splitContent(incoming))
// "Hello.\n"
```

## `addFadeInClassToTreeNodes()`

すでにレンダーノードのツリーを持っていて、読み込み中にテキストを持つ葉ノードへフェードイン用クラスを付けたい場合に使います。

### 例

```ts
import { addFadeInClassToTreeNodes } from '@preferred-markdown-stream/core'
import '@preferred-markdown-stream/core/styles.css'

const tree = [
  {
    props: { class: 'root' },
    children: [
      { props: { class: 'message' }, children: 'Hello' },
    ],
  },
]

addFadeInClassToTreeNodes(tree, true)
```

### クラス名のカスタマイズ

```ts
import { addFadeInClassToTreeNodes } from '@preferred-markdown-stream/core'

addFadeInClassToTreeNodes(tree, true, {
  className: 'message-appear',
})
```

その後、アプリ側で対応する CSS を定義してください。

```css
.message-appear {
  opacity: 0;
  animation: message-appear 180ms ease forwards;
}

@keyframes message-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

## `StreamingTextNode`

`StreamingTextNode` は、汎用フェードインヘルパーで使う共有ノード形状です。次のプロパティを持つツリーを表します。

- `children`
- `props`

カスタムノード変換に TypeScript サポートが必要なときに利用できます。

## 既定 CSS の調整

既定のスタイルシートは `@preferred-markdown-stream/core/styles.css` にあります。

次の CSS 変数でアニメーションを調整できます。

```css
.chat-message {
  --preferred-markdown-stream-animation-duration: 180ms;
  --preferred-markdown-stream-animation-timing-function: linear;
}
```

別のクラス名やキーフレーム名が必要なら、自前の CSS を定義し、ヘルパーに `className` を渡してください。
