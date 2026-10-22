import { execFileSync } from 'node:child_process';
import { defineConfig, type HeadConfig, type UserConfig } from 'vitepress';
import llmstxt from 'vitepress-plugin-llms';
import pkg from '../../package.json';

// When a docs page was first committed and last changed, for its structured data.
// Needs the full git history: the Pages workflow checks out with fetch-depth: 0.
function gitDates(file: string): { published?: string | undefined; modified?: string | undefined } {
  try {
    const log = execFileSync('git', ['log', '--follow', '--format=%cI', '--', file], {
      encoding: 'utf8',
    })
      .trim()
      .split('\n')
      .filter(Boolean);
    return { published: log[log.length - 1], modified: log[0] };
  } catch {
    return {};
  }
}

const site = 'https://vectorchi.github.io/fun-loader/';
const description = 'Playful, rotating loading text for AI requests and other slow tasks.';
const image =
  'https://raw.githubusercontent.com/VectorChi/fun-loader/main/.github/assets/article-cover.png';

// The plugin is typed against the repo's Vite 8 (which Vitest needs), while VitePress bundles
// Vite 5. The plugin API is the same at runtime, so cast it to the type VitePress expects.
type VitePlugin = NonNullable<NonNullable<UserConfig['vite']>['plugins']>[number];

// Publishes /llms.txt and /llms-full.txt so AI tools can read the docs as plain text.
const llms = llmstxt({
  domain: 'https://vectorchi.github.io',
  excludeIndexPage: false,
  ignoreFiles: ['copy-review.md'],
  details: [
    'fun-loader is a 4.4 kB web component, `<fun-loader>`, that shows rotating, playful loading messages with an animated icon while an AI/LLM request or other slow task runs. No dependencies.',
    '',
    '- Long waits: every theme changes its messages after 8 s and 20 s of active (unpaused) waiting, to lines that acknowledge the wait without faking progress.',
    '- When to use: open-ended waits of a few seconds or more (LLM responses, image generation, reports, payments). For waits under a second a plain spinner is enough; for known progress such as uploads, use a progress bar.',
    '- Install: `npm install @vectorchi/fun-loader`, then `import "@vectorchi/fun-loader"` once. CDN: `<script src="https://cdn.jsdelivr.net/npm/@vectorchi/fun-loader@0.4"></script>`.',
    '- HTML: `<fun-loader theme="thinking" icon="spinner"></fun-loader>`.',
    '- React/Next.js: `import { FunLoader } from "@vectorchi/fun-loader/react"`, then `<FunLoader theme="dev" />`. Works in React 18 and 19 and in Next.js server components.',
    '- Vue: `import { FunLoader } from "@vectorchi/fun-loader/vue"`.',
    '- Themes: thinking (default), dev, design, art, kitchen, finance, transfer (payments), calm. Icons: spinner (default), dots, bars, pulse, sparkle, orbit, globe, gear, none.',
    '- Options (attributes and properties): theme, icon, interval (ms, default 2400), ordered (keep written order; messages are shuffled by default), paused, icon-only (icon without text), label (screen-reader text, default "Loading"). Property/prop only: `messages` (string[], one stage, overrides theme) and `stages` ({ after: ms, messages }[]; [] or null turns staging off).',
    '- Show it while waiting and remove it when the result arrives; removing it stops its timer.',
  ].join('\n'),
}) as unknown as VitePlugin;

export default defineConfig({
  title: 'fun-loader',
  description,
  base: '/fun-loader/',
  cleanUrls: true,
  // Internal review notes, not a docs page.
  srcExclude: ['copy-review.md'],
  lastUpdated: true,
  sitemap: { hostname: site },
  head: [
    // Head hrefs aren't prefixed with `base`, so these spell out /fun-loader/.
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/fun-loader/logo.svg' }],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/fun-loader/logo-512.png' },
    ],
    ['link', { rel: 'apple-touch-icon', href: '/fun-loader/apple-touch-icon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'fun-loader' }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: image }],
    [
      'meta',
      { name: 'google-site-verification', content: 'yTh0PS1hhamC_jfQYHSr-_lWwzfhd29LzuraumH9aro' },
    ],
    [
      'script',
      {
        defer: '',
        src: 'https://context7.com/docs7-analytics.js',
        'data-site': 'c20904e9-a55e-43eb-a209-2712234b2555',
      },
    ],
    // "Ask the docs" chat widget. Deferred so it runs once the page body exists.
    [
      'script',
      { defer: '', src: 'https://context7.com/widget.js', 'data-library': '/vectorchi/fun-loader' },
    ],
  ],
  // Per-page canonical URL and link-preview tags, plus structured data on the homepage.
  transformHead({ pageData, title, description }) {
    // The 404 page gets no canonical URL or article data.
    if (pageData.isNotFound) return [];
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '');
    const url = site + path;
    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
    ];
    const { published, modified } = gitDates(`docs/${pageData.relativePath}`);
    const author = { '@type': 'Person', name: 'Adimchi Oka' };
    const article = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: pageData.title || title,
      description,
      url,
      image,
      inLanguage: 'en',
      author,
      publisher: author,
      ...(published && { datePublished: published }),
      ...(modified && { dateModified: modified }),
      isPartOf: { '@type': 'WebSite', name: 'fun-loader', url: site },
    };
    head.push(['script', { type: 'application/ld+json' }, JSON.stringify(article)]);
    if (path === '') {
      const data = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'fun-loader',
        description: pkg.description,
        url: site,
        codeRepository: 'https://github.com/VectorChi/fun-loader',
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'Web browser',
        license: 'https://opensource.org/licenses/MIT',
        author,
        version: pkg.version,
        ...(modified && { dateModified: modified }),
      };
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(data)]);
    }
    return head;
  },
  vite: {
    plugins: [llms],
  },
  vue: {
    template: { compilerOptions: { isCustomElement: (tag) => tag === 'fun-loader' } },
  },
  themeConfig: {
    logo: '/logo.svg',
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
