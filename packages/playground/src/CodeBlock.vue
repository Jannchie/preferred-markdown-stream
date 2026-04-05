<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  language: string
  content: string
  preAttrs: Record<string, any>
}>()

const copied = ref(false)

function copyCode() {
  const tempElement = document.createElement('div')
  tempElement.innerHTML = props.content
  const { textContent } = tempElement
  navigator.clipboard.writeText(textContent ?? '').then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}
</script>

<template>
  <div class="code-block-wrapper">
    <div class="code-block-toolbar">
      <span class="code-language">{{ language || 'text' }}</span>
      <button class="copy-button" @click="copyCode">
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>
    <div class="code-content">
      <pre v-bind="preAttrs"><code v-html="content" /></pre>
    </div>
  </div>
</template>
