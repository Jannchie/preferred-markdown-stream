import { streamingTextStyles } from '@preferred-markdown-stream/core'
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const styleId = 'preferred-markdown-stream-playground-styles'

if (!document.querySelector(`#${styleId}`)) {
  const style = document.createElement('style')
  style.id = styleId
  style.textContent = streamingTextStyles
  document.head.append(style)
}

createApp(App).mount('#app')
