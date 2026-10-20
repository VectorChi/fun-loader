import { defineConfig } from 'vitepress';
import pkg from '../../package.json';

export default defineConfig({
  title: 'fun-loader',
  description: 'Playful, rotating loading text for AI requests and other slow tasks.',
  base: '/fun-loader/',
  cleanUrls: true,
  lastUpdated: true,
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
