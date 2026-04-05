const SENTENCE_SPLIT_REGEXP
  = /(?<=[。？！；、，,;\n])|(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=[.?!`])/g
const SENTENCE_END_REGEXP = /[.?!。？！；，、,;`\n]$/
const ORDERED_LIST_PREFIX_REGEXP = /^\d+\./
const TABLE_ROW_REGEXP = /^\|.+\|$/
const TABLE_SEPARATOR_REGEXP = /^\|[\s:|-]+\|$/
const FENCE_DELIMITER_REGEXP = /^(`{3,}|~{3,})/gm
const INLINE_CODE_BACKTICK_REGEXP = /(?<!`)`(?!`)/g
const COMPLETE_INLINE_MARKUP_REGEXP = /^!?\[[^\]]*\]\([^)]*\)/
const DEFAULT_FADE_IN_CLASS_NAME = 'preferred-markdown-stream-fade-in'

export interface StreamingTextNode {
  children?: string | StreamingTextNode[] | unknown
  props?: {
    class?: string
    [key: string]: unknown
  } | null
}

export interface FadeInClassOptions {
  className?: string
}

function resolveFadeInClassName(
  options?: string | FadeInClassOptions,
): string {
  if (typeof options === 'string') {
    return options
  }

  return options?.className ?? DEFAULT_FADE_IN_CLASS_NAME
}

/**
 * Strip trailing unclosed display-math blocks ($$…) that would render
 * as plain text because the closing $$ has not arrived yet.
 * Fenced code blocks are NOT stripped — markdown-it renders unclosed
 * fences as code, allowing progressive streaming inside code blocks.
 */
function stripUnclosedBlock(content: string): string {
  const lastDoubleDollar = content.lastIndexOf('$$')
  if (lastDoubleDollar !== -1) {
    let count = 0
    let pos = -1
    // eslint-disable-next-line no-cond-assign
    while ((pos = content.indexOf('$$', pos + 1)) !== -1) {
      count++
    }
    if (count % 2 === 1) {
      return `${content.slice(0, lastDoubleDollar).trimEnd()}\n`
    }
  }

  return content
}

/**
 * Strip trailing incomplete inline markup such as links `[text](url)` and
 * images `![alt](src)`. If the content ends mid-link/image, truncate back
 * to just before the opening `[` (or `![`).
 *
 * Recognised incomplete patterns (from the last unmatched `[`):
 *   [text         – unclosed bracket
 *   [text]        – no (url) part yet
 *   [text](url    – unclosed parenthesis
 */
function stripIncompleteInlineMarkup(content: string): string {
  // Find the last `[` that could start a link/image.
  // Walk backwards so we handle the trailing-most incomplete markup.
  let i = content.length - 1
  while (i >= 0) {
    if (content[i] === '[') {
      break
    }
    i--
  }

  if (i < 0) {
    return content // no `[` at all
  }

  // Check whether the `[` is inside a fenced code block — if so, skip.
  const beforeBracket = content.slice(0, i)
  const fencesBefore = beforeBracket.match(FENCE_DELIMITER_REGEXP)?.length ?? 0
  if (fencesBefore % 2 === 1) {
    return content // inside a code fence, leave alone
  }

  // Also skip if it's inside an inline code span (backticks).
  const backticksBefore = beforeBracket.match(INLINE_CODE_BACKTICK_REGEXP)?.length ?? 0
  if (backticksBefore % 2 === 1) {
    return content // inside inline code
  }

  const tail = content.slice(i)

  // Complete link/image: [text](url) — possibly followed by more text
  if (COMPLETE_INLINE_MARKUP_REGEXP.test(tail)) {
    return content // fully formed, nothing to strip
  }

  // The `[` starts an incomplete link/image — truncate.
  // Also strip a preceding `!` for image syntax.
  const cutAt = (i > 0 && content[i - 1] === '!') ? i - 1 : i
  return content.slice(0, cutAt)
}

/**
 * Strip a trailing unclosed inline code span (single backtick).
 * If the content ends with an odd number of unmatched backticks,
 * the last one opens a code span that never closes — strip from there.
 */
function stripUnclosedInlineCode(content: string): string {
  // Find the last backtick that is NOT part of a fenced code block delimiter.
  // We only care about single backticks (inline code), not ``` fences.
  // Work on individual lines to avoid false positives from fenced blocks.

  // First, remove fenced code block regions so they don't interfere.
  // We only need to check the *last line fragment* outside fences.
  let inFence = false
  let fenceChar: string | null = null
  let lastFenceEnd = 0
  let match: RegExpExecArray | null = null
  FENCE_DELIMITER_REGEXP.lastIndex = 0
  // eslint-disable-next-line no-cond-assign
  while ((match = FENCE_DELIMITER_REGEXP.exec(content)) !== null) {
    if (!inFence) {
      inFence = true
      fenceChar = match[1][0]
    }
    else if (match[1][0] === fenceChar) {
      inFence = false
      fenceChar = null
      lastFenceEnd = match.index + match[0].length
    }
  }

  // If we're inside an open fence, the backticks are code content — skip.
  if (inFence) {
    return content
  }

  // Only inspect the portion after the last closed fence.
  const region = content.slice(lastFenceEnd)

  // Count single backticks (not part of ```` sequences).
  // A simple approach: split by backtick and check odd/even.
  let count = 0
  let lastBacktickPos = -1
  let index = 0
  for (const character of region) {
    if (character === '`') {
      count++
      lastBacktickPos = index
    }
    index++
  }

  if (count % 2 === 1 && lastBacktickPos !== -1) {
    // Odd count — the last backtick is an unclosed opener.
    // Find its absolute position and truncate.
    const absPos = lastFenceEnd + lastBacktickPos
    return content.slice(0, absPos)
  }

  return content
}

/**
 * Strip trailing table rows that lack a separator line.
 * A markdown table requires at least a header row + separator row
 * (e.g. `| --- |`) to be recognised by the parser.
 */
function stripIncompleteTable(content: string): string {
  const lines = content.split('\n')

  // Walk backwards to find a contiguous block of table-like lines at the end.
  let tableStart = -1
  for (let i = lines.length - 1; i >= 0; i--) {
    const trimmed = lines[i].trim()
    if (trimmed === '') {
      if (tableStart !== -1) {
        break
      }
      continue
    }
    if (TABLE_ROW_REGEXP.test(trimmed)) {
      tableStart = i
    }
    else {
      break
    }
  }

  if (tableStart === -1) {
    return content
  }

  // Check whether the trailing table block contains a separator line
  const hasSeparator = lines
    .slice(tableStart)
    .some(line => TABLE_SEPARATOR_REGEXP.test(line.trim()))

  if (hasSeparator) {
    return content
  }

  // Compute the character offset of the first table row and truncate there.
  let offset = 0
  for (let i = 0; i < tableStart; i++) {
    offset += lines[i].length + 1 // +1 for the '\n'
  }
  return content.slice(0, offset)
}

/**
 * Smart content splitting to avoid displaying incomplete sentences
 * Supports both English and Chinese punctuation
 */
export function splitContent(msg: string): string {
  const sentences = msg.split(SENTENCE_SPLIT_REGEXP)

  if (
    sentences.length > 0
    && !SENTENCE_END_REGEXP.test(sentences.at(-1)!)
  ) {
    sentences.pop()
  }

  if (sentences.length > 0 && ORDERED_LIST_PREFIX_REGEXP.test(sentences.at(-1)!)) {
    sentences.pop()
  }

  let result = sentences.join('')
  result = stripIncompleteTable(result)
  result = stripUnclosedBlock(result)
  result = stripIncompleteInlineMarkup(result)
  result = stripUnclosedInlineCode(result)
  return result
}

/**
 * Add a fade-in class to string-backed nodes in a generic tree structure.
 */
function addFadeInClassToTreeNodesWithClassName<T extends StreamingTextNode>(
  childrenRaw: T[],
  loading: boolean,
  className: string,
): T[] {
  // eslint-disable-next-line unicorn/no-magic-array-flat-depth
  const children = childrenRaw.flat(20) as T[]
  for (const child of children) {
    // Leaf node with text content (normal markdown text)
    const isTextLeaf = typeof child.children === 'string'
    // Leaf node rendered via innerHTML (e.g. KaTeX math, raw HTML blocks)
    const isHtmlLeaf = !isTextLeaf
      && child.props != null
      && 'innerHTML' in child.props
    if (isTextLeaf || isHtmlLeaf) {
      child.props = {
        ...child.props,
      }
      if (loading) {
        const existingClass = typeof child.props!.class === 'string'
          ? child.props!.class
          : ''
        child.props!.class = `${existingClass} ${className}`.trim()
      }
    }
    if (
      child.children
      && Array.isArray(child.children)
      && child.children.length > 0
    ) {
      addFadeInClassToTreeNodesWithClassName(
        child.children as T[],
        loading,
        className,
      )
    }
  }
  return children
}

/**
 * Add a fade-in class to string-backed nodes in a generic tree structure.
 */
export function addFadeInClassToTreeNodes<T extends StreamingTextNode>(
  childrenRaw: T[],
  loading: boolean,
  options?: string | FadeInClassOptions,
): T[] {
  const className = resolveFadeInClassName(options)
  return addFadeInClassToTreeNodesWithClassName(childrenRaw, loading, className)
}
