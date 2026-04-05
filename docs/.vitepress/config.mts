import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'preferred-markdown-stream',
  description: 'Streaming Markdown utilities for framework-agnostic and Vue applications.',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Core API', link: '/api/core' },
      { text: 'Vue API', link: '/api/vue' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Core Package', link: '/guide/core' },
          { text: 'Vue Package', link: '/guide/vue' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Core API', link: '/api/core' },
          { text: 'Vue API', link: '/api/vue' },
        ],
      },
    ],
    search: {
      provider: 'local',
    },
    outline: {
      level: [2, 3],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © preferred-markdown-stream',
    },
  },
})
