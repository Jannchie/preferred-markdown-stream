<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { splitContent } from '@preferred-markdown-stream/core'
import {
  createStreamingMarkdownVNodes,
  createVNodeRendererComponent,
} from '@preferred-markdown-stream/vue'

type ChunkMode = 'character' | 'word' | 'line'

const defaultMarkdown = `# Streaming Markdown Kitchen Sink

This playground simulates an **assistant response** that arrives in chunks. It demonstrates how \`preferred-markdown-stream\` handles *partial markdown* gracefully — incomplete sentences are hidden until a sentence boundary appears.

## Inline Formatting

You can use **bold**, *italic*, ~~strikethrough~~, and \`inline code\` within a sentence. You can also combine them: ***bold italic***, ~~**bold strikethrough**~~. Links work too: [GitHub](https://github.com) and images will render as well.

## Blockquote

> "Any sufficiently advanced technology is indistinguishable from magic."
>
> — Arthur C. Clarke

Nested blockquotes also work:

> Outer quote.
>
> > Inner nested quote with \`code\` inside.

## Lists

Unordered list:

- First item with **bold** text.
- Second item with a [link](https://example.com).
  - Nested item A.
  - Nested item B.
- Third item.

Ordered list:

1. Clone the repository.
2. Install dependencies with \`pnpm install\`.
3. Run the dev server:
   - \`pnpm dev\` for development.
   - \`pnpm build\` for production.

## Task List

- [x] Implement streaming text splitter.
- [x] Support Chinese punctuation boundaries.
- [ ] Add LaTeX rendering via KaTeX.
- [ ] Benchmark rendering performance.

## Code Blocks

Inline: the \`splitContent()\` function strips incomplete trailing fragments.

Fenced TypeScript block:

\`\`\`ts
export function greet(name: string): string {
  const timestamp = new Date().toISOString()
  return \`[\${timestamp}] Hello, \${name}!\`
}

interface StreamOptions {
  chunkMode: 'character' | 'word' | 'line'
  intervalMs: number
}
\`\`\`

A Python example:

\`\`\`python
from dataclasses import dataclass

@dataclass
class Chunk:
    text: str
    index: int

def stream(content: str, mode: str = "word") -> list[Chunk]:
    """Split content into streamable chunks."""
    if mode == "word":
        tokens = content.split()
    elif mode == "line":
        tokens = content.splitlines(keepends=True)
    else:
        tokens = list(content)
    return [Chunk(text=t, index=i) for i, t in enumerate(tokens)]
\`\`\`

## Table

| Feature         | Status | Notes                          |
| --------------- | ------ | ------------------------------ |
| Sentence split  | Done   | English + Chinese punctuation. |
| Fade-in anim    | Done   | CSS \`@keyframes\` approach.     |
| Shiki highlight | Lazy   | Loaded on first code block.    |
| KaTeX math      | Lazy   | Loaded on first formula.       |

## Horizontal Rule

---

## 中英文混合段落

你好，这是一段中英混合的流式输出测试。The splitter recognizes both English periods and Chinese sentence-ending punctuation like 。？！ as valid boundaries. 它能够正确地在句子边界处截断，避免展示不完整的内容。

分条说明：

1. 英文句号、问号、感叹号都是合法的边界。
2. 中文的句号（。）、问号（？）、感叹号（！）也被识别。
3. 逗号和顿号作为较弱的边界同样受到支持。

## Math (KaTeX)

The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ and Euler's identity: $e^{i\\pi} + 1 = 0$.

A display-mode equation:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## Final Notes

This single example covers: headings, paragraphs, inline formatting, blockquotes, ordered and unordered lists, task lists, fenced code blocks in multiple languages, tables, horizontal rules, bilingual text, math formulas, and nested structures.

The stream splitter ensures none of these are shown in a broken state mid-render.
`

const sourceMarkdown = ref(defaultMarkdown)
const streamedMarkdown = ref('')
const loading = ref(false)
const isPlaying = ref(false)
const chunkMode = ref<ChunkMode>('word')
const intervalMs = ref(35)
const cursor = ref(0)
const diagnosticsOpen = ref(false)
let playbackTimer: number | undefined

const { contentFinal, contentVNodes, formattedContent } =
  createStreamingMarkdownVNodes(streamedMarkdown, loading)
const MarkdownPreview = createVNodeRendererComponent(contentVNodes)

const chunks = computed(() =>
  createChunks(sourceMarkdown.value, chunkMode.value),
)
const progress = computed(() => {
  if (chunks.value.length === 0) {
    return 0
  }

  return Math.min(cursor.value / chunks.value.length, 1)
})
const completionLabel = computed(
  () => `${cursor.value}/${chunks.value.length}`,
)
const streamedPreview = computed(() => splitContent(streamedMarkdown.value))

watch([sourceMarkdown, chunkMode], () => {
  resetPlayback()
})

onBeforeUnmount(() => {
  clearPlaybackTimer()
})

function createChunks(source: string, mode: ChunkMode): string[] {
  if (!source) {
    return []
  }

  if (mode === 'character') {
    return Array.from(source)
  }

  if (mode === 'word') {
    return source.match(/\S+|\s+/g) ?? []
  }

  return source.split(/(?<=\n)/g)
}

function clearPlaybackTimer() {
  if (playbackTimer !== undefined) {
    window.clearTimeout(playbackTimer)
    playbackTimer = undefined
  }
}

function queueNextStep() {
  clearPlaybackTimer()
  playbackTimer = window.setTimeout(() => {
    stepPlayback()
  }, intervalMs.value)
}

function stepPlayback() {
  if (cursor.value >= chunks.value.length) {
    finishPlayback()
    return
  }

  streamedMarkdown.value += chunks.value[cursor.value] ?? ''
  cursor.value += 1

  if (cursor.value >= chunks.value.length) {
    finishPlayback()
    return
  }

  queueNextStep()
}

function startPlayback(options?: { restart?: boolean }) {
  if (options?.restart || cursor.value >= chunks.value.length) {
    streamedMarkdown.value = ''
    cursor.value = 0
  }

  if (chunks.value.length === 0) {
    resetPlayback()
    return
  }

  clearPlaybackTimer()
  loading.value = true
  isPlaying.value = true
  stepPlayback()
}

function pausePlayback() {
  clearPlaybackTimer()
  isPlaying.value = false
  loading.value = false
}

function resetPlayback() {
  clearPlaybackTimer()
  streamedMarkdown.value = ''
  cursor.value = 0
  loading.value = false
  isPlaying.value = false
}

function finishPlayback() {
  clearPlaybackTimer()
  streamedMarkdown.value = sourceMarkdown.value
  cursor.value = chunks.value.length
  loading.value = false
  isPlaying.value = false
}
</script>

<template>
  <div class="app-shell">
    <!-- Header -->
    <header class="header">
      <div class="header-brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-name">Streaming Markdown Playground</span>
          <span class="brand-tag">preferred-markdown-stream</span>
        </div>
      </div>
      <div class="header-status">
        <div class="status-pill" :data-active="isPlaying">
          <span class="status-dot" />
          {{ isPlaying ? 'Streaming' : 'Idle' }}
        </div>
        <span class="progress-chip">{{ completionLabel }} chunks</span>
      </div>
    </header>

    <!-- Main -->
    <div class="main-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="control-group">
          <span class="control-group-label">Source</span>

          <div class="field-row">
            <label class="field-label">Markdown source</label>
            <textarea
              v-model="sourceMarkdown"
              class="source-textarea"
              rows="12"
              spellcheck="false"
            />
          </div>
        </div>

        <div class="control-group">
          <span class="control-group-label">Stream settings</span>

          <div class="field-row">
            <label class="field-label">Chunk mode</label>
            <div class="chip-group">
              <button
                v-for="mode in (['character', 'word', 'line'] as ChunkMode[])"
                :key="mode"
                class="chip"
                :data-active="chunkMode === mode"
                @click="chunkMode = mode"
              >
                {{ mode }}
              </button>
            </div>
          </div>

          <div class="field-row">
            <label class="field-label">
              Interval
              <span class="field-value">{{ intervalMs }}ms</span>
            </label>
            <input
              v-model.number="intervalMs"
              type="range"
              min="10"
              max="300"
              step="5"
              class="range-input"
            >
          </div>
        </div>

        <div class="control-group">
          <span class="control-group-label">Playback</span>

          <div class="playback-row">
            <button
              class="btn btn-accent"
              @click="startPlayback({ restart: true })"
            >
              Restart
            </button>
            <button
              class="btn"
              :disabled="isPlaying"
              @click="startPlayback()"
            >
              Play
            </button>
            <button
              class="btn"
              :disabled="!isPlaying"
              @click="pausePlayback"
            >
              Pause
            </button>
            <button
              class="btn"
              @click="finishPlayback"
            >
              Reveal
            </button>
            <button
              class="btn btn-full"
              @click="resetPlayback"
            >
              Clear
            </button>
          </div>

          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${progress * 100}%` }" />
          </div>
          <div class="progress-meta">
            <span>{{ completionLabel }} chunks</span>
            <span>{{ Math.round(progress * 100) }}%</span>
          </div>
        </div>
      </aside>

      <!-- Preview -->
      <section class="preview-panel" :data-streaming="isPlaying">
        <div class="preview-header">
          <span class="preview-title">
            Rendered Preview
          </span>
          <span class="preview-badge">LIVE</span>
        </div>
        <div class="preview-body">
          <div class="markdown-output">
            <MarkdownPreview />
          </div>
        </div>
      </section>
    </div>

    <!-- Diagnostics -->
    <section class="diagnostics-section">
      <button
        class="diagnostics-toggle"
        :data-collapsed="!diagnosticsOpen"
        @click="diagnosticsOpen = !diagnosticsOpen"
      >
        <span class="toggle-chevron" :data-open="diagnosticsOpen">&#9660;</span>
        Diagnostics
      </button>

      <div v-show="diagnosticsOpen" class="diagnostics-grid" :data-open="diagnosticsOpen">
        <article class="diagnostic-card">
          <div class="diagnostic-label">Raw stream buffer</div>
          <p class="diagnostic-desc">The exact text that has arrived so far.</p>
          <pre class="diagnostic-pre">{{ streamedMarkdown }}</pre>
        </article>

        <article class="diagnostic-card">
          <div class="diagnostic-label">splitContent(buffer)</div>
          <p class="diagnostic-desc">After incomplete trailing fragments are removed.</p>
          <pre class="diagnostic-pre">{{ streamedPreview }}</pre>
        </article>

        <article class="diagnostic-card">
          <div class="diagnostic-label">contentFinal</div>
          <p class="diagnostic-desc">The value actually rendered by the Vue helper.</p>
          <pre class="diagnostic-pre">{{ contentFinal }}</pre>
        </article>

        <article class="diagnostic-card">
          <div class="diagnostic-label">formattedContent</div>
          <p class="diagnostic-desc">The helper output before the final loading switch.</p>
          <pre class="diagnostic-pre">{{ formattedContent }}</pre>
        </article>
      </div>
    </section>
  </div>
</template>
