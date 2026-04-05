import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { addFadeInToVNodes, splitContent } from '../src/index'

describe('@preferred-markdown-stream/vue', () => {
  it('re-exports the streaming text splitter', () => {
    expect(splitContent('Hello world. Still typing')).toBe('Hello world.')
  })

  it('adds fade-in classes to Vue VNodes through the adapter', () => {
    const nodes = [
      h('div', [
        h('span', { class: 'first' }, 'Hello'),
        h('span', 'World'),
      ]),
    ]

    const result = addFadeInToVNodes(nodes, true)
    const children = result[0].children as any[]

    expect(children[0].props.class).toBe('first preferred-markdown-stream-fade-in')
    expect(children[1].props.class).toBe('preferred-markdown-stream-fade-in')
  })

  it('supports custom fade-in class names through the adapter', () => {
    const nodes = [
      h('div', [
        h('span', { class: 'first' }, 'Hello'),
      ]),
    ]

    const result = addFadeInToVNodes(nodes, true, {
      className: 'message-appear',
    })
    const children = result[0].children as any[]

    expect(children[0].props.class).toBe('first message-appear')
  })
})
