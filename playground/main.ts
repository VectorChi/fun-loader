import { DEFAULT_ICON, type FunLoader, type FunLoaderIcon, getTheme, ICONS } from '../src';
import * as themes from '../src/themes';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const grid = $('grid');
for (const { name } of Object.values(themes)) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<h2>${name} · ${getTheme(name)?.length ?? 0}</h2><fun-loader theme="${name}"></fun-loader>`;
  grid.append(card);
}

const iconRow = $('icons');
for (const icon of ICONS) {
  const el = document.createElement('fun-loader');
  el.icon = icon;
  el.messages = [icon];
  iconRow.append(el);
}

// Everything except the fixed icon gallery.
const loaders = () => document.querySelectorAll<FunLoader>('fun-loader:not(#icons > *)');

const iconSelect = $<HTMLSelectElement>('icon');
iconSelect.innerHTML = ICONS.map((icon) => `<option>${icon}</option>`).join('');
iconSelect.value = DEFAULT_ICON;
iconSelect.addEventListener('change', () => {
  for (const el of loaders()) el.icon = iconSelect.value as FunLoaderIcon;
});

const iconColor = $<HTMLInputElement>('icon-color');
const applyIconColor = () =>
  document.body.style.setProperty('--fun-loader-icon-color', iconColor.value);
iconColor.addEventListener('input', applyIconColor);
applyIconColor();

function bindRange(id: string, apply: (value: string) => void, unit = ''): void {
  const input = $<HTMLInputElement>(id);
  const output = input.parentElement?.querySelector('output');
  const update = () => {
    if (output) output.textContent = `${input.value}${unit}`;
    apply(input.value);
  };
  input.addEventListener('input', update);
  update();
}

function bindToggle(id: 'shuffle' | 'paused'): void {
  const input = $<HTMLInputElement>(id);
  input.addEventListener('change', () => {
    for (const el of document.querySelectorAll('fun-loader')) el[id] = input.checked;
  });
}

bindRange(
  'interval',
  (v) => {
    for (const el of loaders()) el.interval = Number(v);
  },
  'ms',
);
bindRange('fade', (v) => document.body.style.setProperty('--fun-loader-fade', `${v}ms`), 'ms');
bindRange('size', (v) => document.body.style.setProperty('--size', `${v}px`), 'px');
bindToggle('shuffle');
bindToggle('paused');

const custom = $<HTMLTextAreaElement>('custom');
const customLoader = $<FunLoader>('custom-loader');
const applyCustom = () => {
  customLoader.messages = custom.value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
};
custom.addEventListener('input', applyCustom);
applyCustom();
$('next').addEventListener('click', () => customLoader.next());
