import { createApp } from 'vue'
import { streamingTextStyles } from '@preferred-markdown-stream/core'
import { setCodeBlockComponent } from '@preferred-markdown-stream/vue'
import App from './App.vue'
import CodeBlock from './CodeBlock.vue'
import './style.css'


const styleId = 'preferred-markdown-stream-playground-styles'

if (!document.getElementById(styleId)) {
  const style = document.createElement('style')
  style.id = styleId
  style.textContent = streamingTextStyles
  document.head.appendChild(style)
}

createApp(App).mount('#app')
