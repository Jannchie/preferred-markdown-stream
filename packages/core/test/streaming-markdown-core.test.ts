import { describe, expect, it } from 'vitest'
import {
  addFadeInClassToTreeNodes,
  splitContent,
} from '../src/index'

describe('@preferred-markdown-stream/core', () => {
  it('drops incomplete trailing sentence while streaming', () => {
    expect(splitContent('Hello world. Still typing')).toBe('Hello world.')
    expect(splitContent('你好。还有')).toBe('你好。')
  })

  it('drops dangling ordered list prefixes', () => {
    expect(splitContent('1. First item\n2.')).toBe('1. First item\n')
  })

  it('adds fade-in class recursively to string-backed nodes', () => {
    const tree = [
      {
        props: { class: 'root' },
        children: [
          { props: { class: 'leaf' }, children: 'Hello' },
          {
            children: [
              { props: {}, children: 'World' },
            ],
          },
        ],
      },
    ]

    const result = addFadeInClassToTreeNodes(tree, true)
    const nestedLeaf = result[0].children as any[]
    const deepestLeaf = nestedLeaf[1].children as any[]

    expect(nestedLeaf[0].props.class).toBe('leaf fade-in')
    expect(deepestLeaf[0].props.class).toBe('fade-in')
  })

  it('strips incomplete table rows without separator', () => {
    // Header only — no separator yet
    expect(splitContent('Hello.\n\n| A | B |\n')).toBe('Hello.\n\n')
  })

  it('keeps table rows when separator is present', () => {
    const withSep = 'Hello.\n\n| A | B |\n| --- | --- |\n'
    expect(splitContent(withSep)).toBe(withSep)
  })

  it('keeps complete table with data rows', () => {
    const full = 'Hello.\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n'
    expect(splitContent(full)).toBe(full)
  })

  it('strips unclosed display math ($$)', () => {
    expect(splitContent('Hello.\n\n$$\nx^2\n')).toBe('Hello.\n')
  })

  it('keeps closed display math', () => {
    const closed = 'Hello.\n\n$$\nx^2\n$$\n'
    expect(splitContent(closed)).toBe(closed)
  })

  it('strips incomplete link - unclosed bracket', () => {
    expect(splitContent('Hello. [GitHub')).toBe('Hello.')
  })

  it('strips incomplete link - no url yet', () => {
    expect(splitContent('Hello. [GitHub]')).toBe('Hello.')
  })

  it('strips incomplete link - unclosed parenthesis', () => {
    expect(splitContent('Hello. [GitHub](https://gith')).toBe('Hello.')
  })

  it('keeps complete link', () => {
    expect(splitContent('Hello. [GitHub](https://github.com) is great.')).toBe(
      'Hello. [GitHub](https://github.com) is great.',
    )
  })

  it('strips incomplete image syntax', () => {
    // The `!` is treated as a sentence-end by the splitter, so it stays.
    // The `[alt](https://img` part is stripped by sentence splitting.
    expect(splitContent('Hello. ![alt](https://img')).toBe('Hello. !')
  })

  it('strips unclosed inline code backtick', () => {
    expect(splitContent('Use the `splitCon')).toBe('Use the ')
  })

  it('keeps closed inline code', () => {
    expect(splitContent('Use the `splitContent` function.')).toBe(
      'Use the `splitContent` function.',
    )
  })

  it('does not strip unclosed fenced code blocks (progressive rendering)', () => {
    const partial = 'Hello.\n\n```ts\nconst x\n'
    expect(splitContent(partial)).toBe(partial)
  })

  it('does not mutate classes when loading is false', () => {
    const tree = [{ props: { class: 'leaf' }, children: 'Hello' }]
    const result = addFadeInClassToTreeNodes(tree, false)
    expect(result[0].props?.class).toBe('leaf')
  })
})
