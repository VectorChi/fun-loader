<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { FunLoaderStage } from '../../../src/element';

const ready = ref(false);
const themes = ref<string[]>([]);
const icons = ref<readonly string[]>([]);

const icon = ref('spinner');
const interval = ref(2400);
const ordered = ref(false);
const paused = ref(false);
const iconOnly = ref(false);
const fade = ref(300);
const size = ref(16);
const color = ref('#7c5cff');
const custom = ref('Wrangling tokens…\nAsking nicely…\nPolishing the answer…');
const customLoader = ref<(HTMLElement & { next(): void }) | null>(null);

// "Simulate a long request": scale every theme's stage timings by the chosen speed and
// restart the loaders, so the stage changes are quick to watch.
const SPEEDS = [1, 4, 10];
const speed = ref(1);
const run = ref(0);
const waited = ref(0);
const stageByTheme = ref<Record<string, number>>({});
const grid = ref<HTMLElement | null>(null);
let getStages: (name: string) => readonly FunLoaderStage[] | undefined = () => undefined;
const scaledStages = computed(() => {
  const out: Record<string, FunLoaderStage[] | undefined> = {};
  for (const name of themes.value) {
    out[name] = getStages(name)?.map((s) => ({ ...s, after: s.after / speed.value }));
  }
  return out;
});
// The markup and CSS for the current settings, so people can copy what they see.
const snippet = computed(() => {
  const attrs = ['theme="thinking"'];
  if (icon.value !== 'spinner') attrs.push(`icon="${icon.value}"`);
  if (interval.value !== 2400) attrs.push(`interval="${interval.value}"`);
  if (ordered.value) attrs.push('ordered');
  if (paused.value) attrs.push('paused');
  if (iconOnly.value) attrs.push('icon-only');
  const css: string[] = [];
  if (size.value !== 16) css.push(`  font-size: ${size.value}px;`);
  if (color.value !== '#7c5cff') css.push(`  --fun-loader-icon-color: ${color.value};`);
  if (fade.value !== 300) css.push(`  --fun-loader-fade: ${fade.value}ms;`);
  const html = `<fun-loader ${attrs.join(' ')}></fun-loader>`;
  return css.length ? `${html}\n\n<style>\nfun-loader {\n${css.join('\n')}\n}\n</style>` : html;
});
const copied = ref(false);
async function copySnippet(): Promise<void> {
  await navigator.clipboard.writeText(snippet.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
}
const scaledInterval = computed(() => Math.max(250, Math.round(interval.value / speed.value)));
function restart(): void {
  run.value++;
  waited.value = 0;
}
watch(speed, restart);
let tick: ReturnType<typeof setInterval> | undefined;
let last = 0;

const messages = computed(() =>
  custom.value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean),
);
const style = computed(() => ({
  '--fun-loader-fade': `${fade.value}ms`,
  '--fun-loader-icon-color': color.value,
  fontSize: `${size.value}px`,
}));

// Render loaders only once the element is defined, so Vue sets real properties
// instead of attributes on not-yet-upgraded elements.
onMounted(async () => {
  const lib = await import('../../../src/index');
  const themeModule = await import('../../../src/themes');
  themes.value = Object.values(themeModule).map((theme) => theme.name);
  icons.value = lib.ICONS;
  getStages = lib.getThemeStages;
  await customElements.whenDefined('fun-loader');
  ready.value = true;
  // Track the simulated wait (frozen while paused, like the element's clock) and each card's stage.
  last = Date.now();
  tick = setInterval(() => {
    const now = Date.now();
    if (!paused.value) waited.value += (now - last) * speed.value;
    last = now;
    const stages: Record<string, number> = {};
    for (const el of grid.value?.querySelectorAll<HTMLElement & { stage: number; theme: string }>(
      'fun-loader',
    ) ?? []) {
      stages[el.theme] = el.stage;
    }
    stageByTheme.value = stages;
  }, 200);
});
onBeforeUnmount(() => clearInterval(tick));
</script>

<template>
  <div class="pg">
    <div class="pg-controls">
      <label>Icon
        <select v-model="icon">
          <option v-for="name in icons" :key="name">{{ name }}</option>
        </select>
      </label>
      <label>Interval <input v-model.number="interval" type="range" min="250" max="5000" step="250" /> <code>{{ interval }}ms</code></label>
      <label><input v-model="ordered" type="checkbox" /> ordered</label>
      <label><input v-model="paused" type="checkbox" /> paused</label>
      <label><input v-model="iconOnly" type="checkbox" /> icon only</label>
      <label>Fade <input v-model.number="fade" type="range" min="0" max="1500" step="50" /> <code>{{ fade }}ms</code></label>
      <label>Size <input v-model.number="size" type="range" min="12" max="40" /> <code>{{ size }}px</code></label>
      <label>Icon color <input v-model="color" type="color" /></label>
    </div>

    <div class="pg-controls pg-sim">
      <span class="pg-sim-title">Simulate a long request</span>
      <div class="pg-speeds" role="group" aria-label="Speed">
        <button
          v-for="s in SPEEDS"
          :key="s"
          type="button"
          :class="{ active: speed === s }"
          :aria-pressed="speed === s"
          @click="speed = s"
        >
          {{ s }}×
        </button>
      </div>
      <button type="button" class="pg-restart" @click="restart">Restart</button>
      <span class="pg-waited">
        Waited <strong>{{ (waited / 1000).toFixed(1) }} s</strong>. Messages change at 8 s and 20 s.
      </span>
    </div>

    <div v-if="ready" ref="grid" class="pg-grid" :style="style">
      <div v-for="name in themes" :key="name" class="pg-card">
        <span class="demo-label">{{ name }} · stage {{ stageByTheme[name] ?? 0 }}</span>
        <fun-loader
          :key="`${name}-${run}`"
          :theme="name"
          :stages="scaledStages[name]"
          :icon="icon"
          :interval="scaledInterval"
          :ordered="ordered"
          :paused="paused"
          :iconOnly="iconOnly"
        />
      </div>
    </div>

    <div class="pg-card pg-snippet">
      <div class="pg-row pg-snippet-head">
        <span class="demo-label">Your settings, ready to paste</span>
        <button type="button" @click="copySnippet">{{ copied ? 'Copied' : 'Copy' }}</button>
      </div>
      <pre><code>{{ snippet }}</code></pre>
    </div>

    <div v-if="ready" class="pg-card pg-custom" :style="style">
      <span class="demo-label">Your own messages (one per line)</span>
      <textarea v-model="custom" rows="3" />
      <div class="pg-row">
        <fun-loader
          ref="customLoader"
          :messages="messages"
          :icon="icon"
          :interval="interval"
          :ordered="ordered"
          :paused="paused"
          :iconOnly="iconOnly"
        />
        <button type="button" @click="customLoader?.next()">next()</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pg-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  padding: 16px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.pg-controls label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.pg-controls select {
  padding: 2px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}
.pg-sim {
  margin-top: 12px;
  align-items: center;
}
.pg-sim-title {
  font-size: 14px;
  font-weight: 600;
}
.pg-speeds {
  display: inline-flex;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}
.pg-speeds button {
  padding: 2px 12px;
  font-size: 13px;
}
.pg-speeds button + button {
  border-left: 1px solid var(--vp-c-divider);
}
.pg-speeds button.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.pg-restart {
  padding: 2px 10px;
  font-size: 13px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}
.pg-waited {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.pg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 16px;
}
.pg-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}
.pg-snippet {
  margin-top: 12px;
}
.pg-snippet-head {
  justify-content: space-between;
}
.pg-snippet pre {
  margin: 0;
  padding: 12px 14px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
  border-radius: 6px;
  background: var(--vp-c-bg);
}
.pg-custom {
  margin-top: 12px;
}
.pg-custom textarea {
  width: 100%;
  padding: 8px;
  font: inherit;
  font-size: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
}
.pg-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
.pg-row button {
  padding: 2px 10px;
  font-size: 13px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}
</style>
