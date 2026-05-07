import type { MarkdownItShikiOptions } from '@shikijs/markdown-it'
import type {
  LanguageRegistration,
  ThemeRegistrationRaw,
} from 'shiki'
import markdownit from 'markdown-it'
import todo from 'markdown-it-todo'
import { ref } from 'vue'
import VNodePlugin from './render.js'

export const md = markdownit({
  linkify: true,
  typographer: true,
  breaks: true,
  html: true,
} as any)
md.use(VNodePlugin)
md.use(todo)

// Lazy load katex and shiki to reduce initial bundle size
export const isKatexLoaded = ref(false)
export const isShikiLoaded = ref(false)

/**
 * Shiki options type. Accepts builtin theme/language names, or custom
 * {@link ThemeRegistrationRaw} and {@link LanguageRegistration} objects.
 */
export type { MarkdownItShikiOptions, ThemeRegistrationRaw, LanguageRegistration }

/**
 * Configure shiki options before it loads.
 * Must be called before the first code block appears in the stream.
 * Options are merged with defaults, so you only need to override what you want.
 *
 * @example
 * // Builtin theme
 * configureShiki({ theme: 'github-dark' })
 *
 * @example
 * // Custom theme object
 * configureShiki({
 *   theme: { name: 'my-theme', type: 'dark', colors: {...}, tokenColors: [...] }
 * })
 *
 * @example
 * // Dual themes
 * configureShiki({ themes: { dark: 'vitesse-dark', light: 'vitesse-light' } })
 *
 * @example
 * // Custom language grammar
 * configureShiki({
 *   langs: [{ name: 'my-lang', scopeName: 'source.mylang', patterns: [...] }]
 * })
 */
export function configureShiki(options: Partial<MarkdownItShikiOptions>) {
  shikiOptions = { ...shikiOptions, ...options }
}

let shikiOptions: MarkdownItShikiOptions = {
  theme: 'vitesse-dark',
  langs: [
    'javascript',
    'typescript',
    'python',
    'bash',
    'json',
    'html',
    'css',
    'markdown',
    'vue',
    'rust',
    'go',
    'java',
    'sql',
    'jsx',
    'tsx',
  ],
  fallbackLanguage: 'markdown',
}

export async function loadKatex() {
  if (isKatexLoaded.value) {
    return
  }

  const [katex, texmath] = await Promise.all([
    import('katex'),
    import('markdown-it-texmath'),
    import('katex/dist/katex.min.css'), // Lazy load CSS
  ])

  const tm = texmath.default.use(katex.default)
  md.use(tm, { delimiters: ['brackets', 'dollars'] })
  isKatexLoaded.value = true
}

export async function loadShiki(options?: Partial<MarkdownItShikiOptions>) {
  if (options) {
    configureShiki(options)
  }

  if (isShikiLoaded.value) {
    return
  }

  try {
    const Shiki = await import('@shikijs/markdown-it')
    const shiki = await Shiki.default(shikiOptions)
    md.use(shiki)
    isShikiLoaded.value = true
  }
  catch (error) {
    console.error('Failed to load Shiki:', error)
    // If Shiki fails to load, ensure repeated attempts are skipped.
    isShikiLoaded.value = true
  }
}
