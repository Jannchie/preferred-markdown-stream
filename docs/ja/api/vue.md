# Vue API

## `splitContent(message)`

```ts
function splitContent(message: string): string
```

`@preferred-markdown-stream/vue` だけを導入している Vue 中心の利用者向けに、core のストリーミングテキスト分割関数を再エクスポートしています。

## `addFadeInToVNodes(children, loading, options?)`

```ts
function addFadeInToVNodes(
  children: VNode[],
  loading: boolean,
  options?: string | FadeInClassOptions,
): VNode[]
```

`@preferred-markdown-stream/core` の汎用フェードインツリーヘルパーに対する Vue アダプターです。

## `styles.css`

既定のアニメーションスタイルは Vue パッケージから直接 import できます。

```ts
import '@preferred-markdown-stream/vue/styles.css'
```

## `createStreamingMarkdownVNodes(content, loading)`

```ts
function createStreamingMarkdownVNodes(
  content: Readonly<Ref<string>>,
  loading: Readonly<Ref<boolean>>,
): {
  contentFinal: ComputedRef<string>
  contentVNodes: { value: VNode[] }
  debouncedLoading: Ref<boolean>
  formattedContent: ComputedRef<string>
}
```

Vue でストリーミング Markdown を描画するための主要ヘルパーです。

### 返される状態

- `formattedContent`：`splitContent(content.value)` で作られた安定した接頭部分
- `contentFinal`：読み込み中は `formattedContent`、それ以外は `content.value` 全体
- `contentVNodes`：現在表示中の内容に対応する VNodes
- `debouncedLoading`：`loading` が `false` になった後もしばらく `true` のまま残る遅延ローディング ref

### メモ

- 数式やコード描画が必要そうな場合、KaTeX と Shiki は遅延読み込みされます。
- `debouncedLoading` は現在およそ 1 秒後にフェードイン用クラスを解除します。

## `createVNodeRendererComponent(vnodes)`

```ts
function createVNodeRendererComponent(
  vnodes: { value: VNode[] },
): Component
```

VNode コンテナをそのまま描画できる Vue コンポーネントへ変換します。

## `setCodeBlockComponent(component)`

```ts
function setCodeBlockComponent(component: any): void
```

fenced code block の描画をカスタム Vue コンポーネントで上書きします。

コンポーネントには次の props が渡されます。

- `language: string`
- `content: string`
- `preAttrs: Record<string, any>`
