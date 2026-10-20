import { defineConfig } from 'vitepress';
import llmstxt from 'vitepress-plugin-llms';
import pkg from '../../package.json';

const site = 'https://vectorchi.github.io/fun-loader/';
const description = 'Playful, rotating loading text for AI requests and other slow tasks.';
const image = 'https://raw.githubusercontent.com/VectorChi/fun-loader/main/.github/assets/demo.png';

export default defineConfig({
  title: 'fun-loader',
  description,
  base: '/fun-loader/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: site },
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'fun-loader' }],
    ['meta', { property: 'og:title', content: 'fun-loader' }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: site }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],
  // Publishes /llms.txt and /llms-full.txt so AI tools can read the docs as plain text.
  vite: {
    plugins: [
      llmstxt({
        domain: 'https://vectorchi.github.io',
        excludeIndexPage: false,
        details: [
          'fun-loader is a ~3 kB web component, `<fun-loader>`, that shows rotating, playful loading messages with an animated icon while an AI/LLM request or other slow task runs. No dependencies.',
          '',
          '- Install: `npm install @vectorchi/fun-loader`, then `import "@vectorchi/fun-loader"` once. CDN: `<script src="https://cdn.jsdelivr.net/npm/@vectorchi/fun-loader@0.3"></script>`.',
          '- HTML: `<fun-loader theme="thinking" icon="spinner"></fun-loader>`.',
          '- React/Next.js: `import { FunLoader } from "@vectorchi/fun-loader/react"`, then `<FunLoader theme="dev" />`. Works in React 18 and 19 and in Next.js server components.',
          '- Vue: `import { FunLoader } from "@vectorchi/fun-loader/vue"`.',
          '- Themes: thinking (default), dev, design, art, kitchen, finance, transfer (payments), calm. Icons: spinner (default), dots, bars, pulse, sparkle, none.',
          '- Options (attributes and properties): theme, icon, interval (ms, default 2400), shuffle, paused, label (screen-reader text, default "Loading"); `messages` (string[]) is a property/prop only and overrides theme.',
          '- Show it while waiting and remove it when the result arrives; removing it stops its timer.',
        ].join('\n'),
      }),
    ],
  },
  vue: {
    template: { compilerOptions: { isCustomElement: (tag) => tag === 'fun-loader' } },
  },
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/installation' },
      { text: 'Playground', link: '/playground' },
      { text: `v${pkg.version}`, link: 'https://www.npmjs.com/package/@vectorchi/fun-loader' },
    ],
    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Installation', link: '/installation' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Waiting for AI responses', link: '/guides/ai-responses' },
          { text: 'Payment flows', link: '/guides/payment-flows' },
          { text: 'Custom messages', link: '/guides/custom-messages' },
        ],
      },
      {
        text: 'Frameworks',
        items: [
          { text: 'React & Next.js', link: '/frameworks/react' },
          { text: 'Vue', link: '/frameworks/vue' },
          { text: 'Plain HTML & JavaScript', link: '/frameworks/html' },
        ],
      },
      {
        text: 'Customize',
        items: [
          { text: 'Themes', link: '/customize/themes' },
          { text: 'Icons', link: '/customize/icons' },
          { text: 'Styling', link: '/customize/styling' },
          { text: 'Accessibility', link: '/customize/accessibility' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Options', link: '/reference/options' },
          { text: 'API', link: '/reference/api' },
          { text: 'Smaller builds', link: '/reference/smaller-builds' },
        ],
      },
      { text: 'Playground', link: '/playground' },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/VectorChi/fun-loader' }],
    search: { provider: 'local' },
    outline: [2, 3],
    editLink: {
      pattern: 'https://github.com/VectorChi/fun-loader/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: '© 2026 Adimchi Oka',
    },
  },
});
