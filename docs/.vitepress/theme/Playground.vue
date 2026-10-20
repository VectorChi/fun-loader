<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const ready = ref(false);
const themes = ref<string[]>([]);
const icons = ref<readonly string[]>([]);

const icon = ref('spinner');
const interval = ref(2400);
const shuffle = ref(false);
const paused = ref(false);
const fade = ref(300);
const size = ref(16);
const color = ref('#7c5cff');
const custom = ref('Wrangling tokens…\nAsking nicely…\nPolishing the answer…');
const customLoader = ref<(HTMLElement & { next(): void }) | null>(null);

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
  await customElements.whenDefined('fun-loader');
  ready.value = true;
});
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
      <label><input v-model="shuffle" type="checkbox" /> shuffle</label>
      <label><input v-model="paused" type="checkbox" /> paused</label>
      <label>Fade <input v-model.number="fade" type="range" min="0" max="1500" step="50" /> <code>{{ fade }}ms</code></label>
      <label>Size <input v-model.number="size" type="range" min="12" max="40" /> <code>{{ size }}px</code></label>
      <label>Icon color <input v-model="color" type="color" /></label>
    </div>

    <div v-if="ready" class="pg-grid" :style="style">
      <div v-for="name in themes" :key="name" class="pg-card">
        <span class="demo-label">{{ name }}</span>
        <fun-loader :theme="name" :icon="icon" :interval="interval" :shuffle="shuffle" :paused="paused" />
      </div>
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
          :shuffle="shuffle"
          :paused="paused"
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
