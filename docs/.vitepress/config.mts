import { defineConfig } from 'vitepress'

const enThemeConfig = {
  nav: [
    { text: 'Home', link: '/en/' },
    { text: 'Guide', link: '/en/guide/getting-started' },
    { text: 'Core API', link: '/en/api/core' },
    { text: 'Vue API', link: '/en/api/vue' },
  ],
  sidebar: [
    {
      text: 'Guide',
      items: [
        { text: 'Getting Started', link: '/en/guide/getting-started' },
        { text: 'Core Package', link: '/en/guide/core' },
        { text: 'Vue Package', link: '/en/guide/vue' },
      ],
    },
    {
      text: 'API Reference',
      items: [
        { text: 'Core API', link: '/en/api/core' },
        { text: 'Vue API', link: '/en/api/vue' },
      ],
    },
  ],
  outline: {
    label: 'On this page',
    level: [2, 3] as [2, 3],
  },
  docFooter: {
    prev: 'Previous page',
    next: 'Next page',
  },
  lastUpdated: {
    text: 'Last updated',
  },
  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © preferred-markdown-stream',
  },
}

const zhThemeConfig = {
  nav: [
    { text: '首页', link: '/zh/' },
    { text: '指南', link: '/zh/guide/getting-started' },
    { text: 'Core API', link: '/zh/api/core' },
    { text: 'Vue API', link: '/zh/api/vue' },
  ],
  sidebar: [
    {
      text: '指南',
      items: [
        { text: '快速开始', link: '/zh/guide/getting-started' },
        { text: 'Core 包', link: '/zh/guide/core' },
        { text: 'Vue 包', link: '/zh/guide/vue' },
      ],
    },
    {
      text: 'API 参考',
      items: [
        { text: 'Core API', link: '/zh/api/core' },
        { text: 'Vue API', link: '/zh/api/vue' },
      ],
    },
  ],
  outline: {
    label: '本页内容',
    level: [2, 3] as [2, 3],
  },
  docFooter: {
    prev: '上一页',
    next: '下一页',
  },
  lastUpdated: {
    text: '最后更新',
  },
  footer: {
    message: '基于 MIT License 发布。',
    copyright: 'Copyright © preferred-markdown-stream',
  },
}

const jaThemeConfig = {
  nav: [
    { text: 'ホーム', link: '/ja/' },
    { text: 'ガイド', link: '/ja/guide/getting-started' },
    { text: 'Core API', link: '/ja/api/core' },
    { text: 'Vue API', link: '/ja/api/vue' },
  ],
  sidebar: [
    {
      text: 'ガイド',
      items: [
        { text: 'はじめに', link: '/ja/guide/getting-started' },
        { text: 'Core パッケージ', link: '/ja/guide/core' },
        { text: 'Vue パッケージ', link: '/ja/guide/vue' },
      ],
    },
    {
      text: 'API リファレンス',
      items: [
        { text: 'Core API', link: '/ja/api/core' },
        { text: 'Vue API', link: '/ja/api/vue' },
      ],
    },
  ],
  outline: {
    label: 'このページ',
    level: [2, 3] as [2, 3],
  },
  docFooter: {
    prev: '前のページ',
    next: '次のページ',
  },
  lastUpdated: {
    text: '最終更新',
  },
  footer: {
    message: 'MIT License のもとで公開。',
    copyright: 'Copyright © preferred-markdown-stream',
  },
}

export default defineConfig({
  title: 'preferred-markdown-stream',
  description: 'Streaming Markdown utilities for framework-agnostic and Vue applications.',
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    search: {
      provider: 'local',
    },
    langMenuLabel: 'Change language',
  },
  locales: {
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'preferred-markdown-stream',
      description: 'Streaming Markdown utilities for framework-agnostic and Vue applications.',
      themeConfig: {
        ...enThemeConfig,
        langMenuLabel: 'Change language',
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'preferred-markdown-stream',
      description: '面向框架无关和 Vue 应用的流式 Markdown 工具。',
      themeConfig: {
        ...zhThemeConfig,
        langMenuLabel: '切换语言',
      },
    },
    ja: {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja/',
      title: 'preferred-markdown-stream',
      description: 'フレームワーク非依存および Vue アプリ向けのストリーミング Markdown ユーティリティ。',
      themeConfig: {
        ...jaThemeConfig,
        langMenuLabel: '言語を切り替え',
      },
    },
  },
})
