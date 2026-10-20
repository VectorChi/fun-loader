import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Playground from './Playground.vue';
import './custom.css';
import './sidebar-icons.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Playground', Playground);
    // Docs use the source directly, so the site always shows the current code.
    if (!import.meta.env.SSR) import('../../../src/index');
  },
} satisfies Theme;
