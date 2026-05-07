# Core API

## `splitContent(message)`

```ts
function splitContent(message: string): string
```

ストリーミング中の Markdown 文字列から、現在安全に表示できる部分を返します。

### 挙動

- 完結した末尾文は残す
- 未完成の末尾断片は取り除く
- 未完成のリンク、画像、テーブル、インラインコード、ディスプレイ数式を取り除く

## `addFadeInClassToTreeNodes(children, loading, options?)`

```ts
function addFadeInClassToTreeNodes<T extends StreamingTextNode>(
  children: T[],
  loading: boolean,
  options?: string | FadeInClassOptions,
): T[]
```

読み込み中に、汎用レンダーツリーのテキスト葉ノードへ CSS クラスを追加します。

### パラメータ

| 名前 | 型 | 説明 |
| --- | --- | --- |
| `children` | `T[]` | `children` と任意の `props` を持つ汎用ノードツリー。 |
| `loading` | `boolean` | フェードイン用クラスを適用するかどうか。 |
| `options` | `string \| FadeInClassOptions` | 任意のフェードインクラス設定。既定値は `preferred-markdown-stream-fade-in`。 |

## `FadeInClassOptions`

```ts
interface FadeInClassOptions {
  className?: string
}
```

`loading` が `true` の間に付与する CSS クラス名を制御します。

## `styles.css`

既定のアニメーションスタイルは次の CSS サブパスから import できます。

```ts
import '@preferred-markdown-stream/core/styles.css'
```

スタイルシートは次の CSS 変数をサポートします。

- `--preferred-markdown-stream-animation-name`
- `--preferred-markdown-stream-animation-duration`
- `--preferred-markdown-stream-animation-timing-function`
- `--preferred-markdown-stream-animation-fill-mode`

## `StreamingTextNode`

```ts
interface StreamingTextNode {
  children?: string | StreamingTextNode[] | unknown
  props?: {
    class?: string
    [key: string]: unknown
  } | null
}
```

汎用ツリーヘルパーで共有されるノード型です。
