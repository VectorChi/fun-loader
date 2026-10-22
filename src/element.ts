/** A set of messages that takes over once the wait has lasted `after` ms. */
export interface FunLoaderStage {
  after: number;
  messages: readonly string[];
}

export interface FunLoaderTheme {
  name: string;
  /** Stage 0: the messages shown first. */
  messages: readonly string[];
  /** All stages, including stage 0. When omitted, the theme has one stage: `messages`. */
  stages?: readonly FunLoaderStage[];
}

const themes = new Map<string, readonly FunLoaderStage[]>();

export function registerTheme(theme: FunLoaderTheme): void {
  themes.set(
    theme.name,
    theme.stages?.length ? theme.stages : [{ after: 0, messages: theme.messages }],
  );
}

/** The stage 0 messages of a registered theme. */
export function getTheme(name: string): readonly string[] | undefined {
  return themes.get(name)?.[0]?.messages;
}

/** All stages of a registered theme. */
export function getThemeStages(name: string): readonly FunLoaderStage[] | undefined {
  return themes.get(name);
}

export const DEFAULT_THEME = 'thinking';
export const DEFAULT_INTERVAL = 2400;
const MIN_INTERVAL = 250;
const FALLBACK: readonly FunLoaderStage[] = [{ after: 0, messages: ['Thinking…'] }];

export const ICONS = [
  'spinner',
  'dots',
  'bars',
  'pulse',
  'sparkle',
  'orbit',
  'globe',
  'gear',
  'none',
] as const;
export type FunLoaderIcon = (typeof ICONS)[number];
export const DEFAULT_ICON: FunLoaderIcon = 'spinner';

const css = `:host{display:inline-flex;align-items:center;gap:var(--fun-loader-gap,.5em);font:inherit;color:inherit}
:host([hidden]),:host([icon-only]) .t{display:none}
.t{display:inline-block;animation:fl-in var(--fun-loader-fade,300ms) ease-out both}
.sr{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.i{position:relative;flex:none;display:inline-flex;align-items:center;justify-content:space-between;width:1em;height:1em;color:var(--fun-loader-icon-color,currentColor)}
.i>i{display:none;width:.22em;background:currentColor}
.i>i:nth-child(2){animation-delay:.15s}.i>i:nth-child(3){animation-delay:.3s}
.none{display:none}
.spinner{box-sizing:border-box;border:.14em solid;border-right-color:transparent;border-radius:50%;animation:fl-spin .8s linear infinite}
.dots>i,.bars>i{display:block;animation:fl-bounce 1s ease-in-out infinite}
.dots>i{height:.22em;border-radius:50%}
.bars>i{height:100%;border-radius:.05em;animation-name:fl-bar}
.pulse::before,.sparkle::before{content:'';position:absolute;inset:0}
.pulse::before{border-radius:50%;background:currentColor;animation:fl-pulse 1.2s ease-out infinite}
.sparkle::before{content:'\\2726';display:grid;place-items:center;line-height:1;animation:fl-twinkle 1.6s ease-in-out infinite}
.orbit{width:1.3em;perspective:4em;transform-style:preserve-3d}
.orbit>i{display:block;position:absolute;left:50%;top:50%;width:.26em;height:.26em;margin:-.13em;border-radius:50%;transform:rotateX(-18deg) rotateY(var(--a,0deg)) translateZ(.4em) rotateY(calc(-1*var(--a,0deg))) rotateX(18deg);animation:fl-orbit 3.6s linear infinite,fl-depth 3.6s linear infinite}
.orbit>i:nth-child(2){--a:120deg;animation-delay:0s,-2.4s}.orbit>i:nth-child(3){--a:240deg;animation-delay:0s,-1.2s}
.globe{box-sizing:border-box;border:.08em solid;border-radius:50%}
.globe::before,.globe>i{content:'';display:block;position:absolute;inset:-.08em;width:auto;background:none;border:.08em solid;border-radius:50%}
.globe::before{transform:rotateX(72deg)}
.globe>i{animation:fl-meridian 2s linear infinite}
.globe>i:nth-child(2){animation-delay:-.67s}.globe>i:nth-child(3){animation-delay:-1.33s}
.gear::before{content:'';position:absolute;inset:0;background:radial-gradient(currentColor .3em,#0000 0),repeating-conic-gradient(currentColor 0 20deg,#0000 0 45deg);-webkit-mask:radial-gradient(#0000 .14em,#000 0 .5em,#0000 0);mask:radial-gradient(#0000 .14em,#000 0 .5em,#0000 0);animation:fl-spin 1.6s cubic-bezier(.65,0,.35,1) infinite}
@keyframes fl-orbit{from{transform:rotateX(-18deg) rotateY(var(--a,0deg)) translateZ(.4em) rotateY(calc(-1*var(--a,0deg))) rotateX(18deg)}to{transform:rotateX(-18deg) rotateY(calc(var(--a,0deg) - 360deg)) translateZ(.4em) rotateY(calc(360deg - var(--a,0deg))) rotateX(18deg)}}
@keyframes fl-depth{0%,to{opacity:1}50%{opacity:.36}}
@keyframes fl-meridian{from{transform:rotateX(-18deg) rotateY(0)}to{transform:rotateX(-18deg) rotateY(180deg)}}
@keyframes fl-in{from{opacity:0;transform:translateY(.25em)}to{opacity:1;transform:none}}
@keyframes fl-spin{to{transform:rotate(1turn)}}
@keyframes fl-bounce{0%,80%,to{transform:none;opacity:.4}40%{transform:translateY(-.3em);opacity:1}}
@keyframes fl-bar{0%,80%,to{transform:scaleY(.4)}40%{transform:none}}
@keyframes fl-pulse{from{transform:scale(.3);opacity:1}to{transform:none;opacity:0}}
@keyframes fl-twinkle{0%,to{transform:scale(.7);opacity:.6}50%{transform:scale(1) rotate(90deg);opacity:1}}
@keyframes fl-fade{50%{opacity:.4}}
:host([paused]) .i,:host([paused]) .i>i,:host([paused]) .i::before{animation-play-state:paused}
@media (prefers-reduced-motion:reduce){.t{animation:none}.i,.i>i,.i::before{animation:fl-fade 2s ease-in-out infinite}}`;

// Lets the module be imported during SSR, where HTMLElement does not exist.
const Base = (typeof HTMLElement === 'undefined' ? class {} : HTMLElement) as typeof HTMLElement;

export class FunLoader extends Base {
  static observedAttributes = [
    'theme',
    'interval',
    'paused',
    'ordered',
    'label',
    'icon',
    'icon-only',
  ];

  private _messages: readonly string[] | undefined;
  /** undefined: use the theme's stages. null: staging disabled. */
  private _stages: readonly FunLoaderStage[] | null | undefined;
  private _stage = 0;
  /** Indices of the current stage's messages still to show before any repeats. */
  private _bag: number[] = [];
  /** Active milliseconds banked before the clock last started. */
  private _elapsed = 0;
  /** When the clock last started, or undefined while it is stopped. */
  private _since: number | undefined;
  private _timer: ReturnType<typeof setInterval> | undefined;
  private _stageTimer: ReturnType<typeof setTimeout> | undefined;
  private _text: HTMLElement | undefined;
  private _label: HTMLElement | undefined;
  private _icon: HTMLElement | undefined;

  get theme(): string {
    return this.getAttribute('theme') ?? DEFAULT_THEME;
  }
  set theme(value: string) {
    this.setAttribute('theme', value);
  }

  get interval(): number {
    const n = Number(this.getAttribute('interval'));
    return n > 0 ? Math.max(n, MIN_INTERVAL) : DEFAULT_INTERVAL;
  }
  set interval(value: number) {
    this.setAttribute('interval', String(value));
  }

  get paused(): boolean {
    return this.hasAttribute('paused');
  }
  set paused(value: boolean) {
    this.toggleAttribute('paused', value);
  }

  /** Show only the icon. Screen readers still hear `label`; no text timers run meanwhile. */
  get iconOnly(): boolean {
    return this.hasAttribute('icon-only');
  }
  set iconOnly(value: boolean) {
    this.toggleAttribute('icon-only', value);
  }

  /** Show messages in the order written instead of shuffled. */
  get ordered(): boolean {
    return this.hasAttribute('ordered');
  }
  set ordered(value: boolean) {
    this.toggleAttribute('ordered', value);
  }

  /** The opposite of `ordered`, kept for code written before shuffling became the default. */
  get shuffle(): boolean {
    return !this.ordered;
  }
  set shuffle(value: boolean) {
    this.ordered = !value;
  }

  get label(): string {
    return this.getAttribute('label') ?? 'Loading';
  }
  set label(value: string) {
    this.setAttribute('label', value);
  }

  /** The animated icon shown before the text; unknown names fall back to the default. */
  get icon(): FunLoaderIcon {
    const value = this.getAttribute('icon') as FunLoaderIcon;
    return ICONS.includes(value) ? value : DEFAULT_ICON;
  }
  set icon(value: FunLoaderIcon) {
    this.setAttribute('icon', value);
  }

  /** The messages in rotation now: the current stage's. Setting it gives one stage of your own messages. */
  get messages(): readonly string[] {
    return this.stages[this._stage]?.messages ?? [];
  }
  set messages(value: readonly string[] | null | undefined) {
    const next = value?.length ? value : undefined;
    // Only a real change re-picks the message; frameworks often set the same value again.
    if (next === this._messages) return;
    this._messages = next;
    this._reset();
  }

  /**
   * The stages in use. Set your own to override the theme's, `[]` or `null` to turn staging off
   * (stage 0 only), or `undefined` to go back to the theme's.
   */
  get stages(): readonly FunLoaderStage[] {
    const own = this._stages?.filter((s) => s.messages.length);
    const single = this._messages && [{ after: 0, messages: this._messages }];
    const list = own?.length
      ? [...own].sort((a, b) => a.after - b.after)
      : (single ?? getThemeStages(this.theme) ?? FALLBACK);
    // Staging off keeps only stage 0. The first stage always starts at 0.
    const [first, ...rest] = this._stages === null ? list.slice(0, 1) : list;
    return first ? [{ ...first, after: 0 }, ...rest] : FALLBACK;
  }
  set stages(value: readonly FunLoaderStage[] | null | undefined) {
    const next = value && !value.length ? null : value;
    if (next === this._stages) return;
    this._stages = next;
    this._reset();
  }

  /** The message currently on screen. */
  get current(): string {
    return this._text?.textContent ?? '';
  }

  /** The index of the current stage. */
  get stage(): number {
    return this._stage;
  }

  connectedCallback(): void {
    if (!this._text) {
      const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
      root.innerHTML = `<style>${css}</style><span class="i" part="icon" aria-hidden="true"><i></i><i></i><i></i></span><span class="sr"></span><span class="t" part="text" aria-hidden="true"></span>`;
      this._icon = root.querySelector<HTMLElement>('.i') ?? undefined;
      this._label = root.querySelector<HTMLElement>('.sr') ?? undefined;
      this._text = root.querySelector<HTMLElement>('.t') ?? undefined;
    }
    this._renderIcon();
    // Announce the label once rather than every rotating message.
    if (!this.hasAttribute('role')) this.setAttribute('role', 'status');
    // Each connection starts a fresh wait; the clock only runs while not paused.
    this._elapsed = 0;
    this._since = this.paused ? undefined : Date.now();
    this._stage = 0;
    this._reset();
  }

  disconnectedCallback(): void {
    this._stop();
    this._since = undefined;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue || !this.isConnected) return;
    if (name === 'label') this._renderLabel();
    else if (name === 'icon') this._renderIcon();
    else if (name === 'interval') this._schedule();
    else if (name === 'paused') {
      // Bank the active time on pause; restart the clock on resume.
      this._elapsed = this._now();
      this._since = this.paused ? undefined : Date.now();
      this._schedule();
    } else this._reset();
  }

  /** Advance to the next message immediately. */
  next(): void {
    const list = this.messages;
    if (!this._bag.length) {
      const order = list.map((_, i) => i);
      if (!this.ordered) {
        for (let i = order.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [order[i], order[j]] = [order[j] as number, order[i] as number];
        }
      }
      // Never show the message already on screen twice in a row, even across stages.
      if (order.length > 1 && list[order[0] as number] === this.current) {
        order.push(order.shift() as number);
      }
      this._bag = order;
    }
    this._show(list[this._bag.shift() as number] ?? '');
  }

  /** Active milliseconds since the element connected, excluding paused time. */
  private _now(): number {
    return this._elapsed + (this._since === undefined ? 0 : Date.now() - this._since);
  }

  /** Re-picks the stage for the time waited so far and shows a fresh message from it. */
  private _reset(): void {
    if (!this._text) return;
    const now = this._now();
    // A reset starts clean: the no-repeat rule is for natural advances, not option changes.
    this._text.textContent = '';
    // Stages are sorted, so the current one is the last that has started.
    this._enter(Math.max(0, this.stages.filter((s) => s.after <= now).length - 1));
    this._renderLabel();
  }

  private _enter(stage: number): void {
    this._stage = stage;
    this._bag = [];
    this.next();
    this._schedule();
  }

  private _show(message: string): void {
    const old = this._text;
    if (!old) return;
    // Replacing the node restarts the fade-in animation.
    const text = old.cloneNode() as HTMLElement;
    text.textContent = message;
    old.replaceWith(text);
    this._text = text;
  }

  private _renderIcon(): void {
    if (this._icon) this._icon.className = `i ${this.icon}`;
  }

  private _renderLabel(): void {
    if (this._label) this._label.textContent = this.label;
  }

  private _schedule(): void {
    this._stop();
    // With no visible text there is nothing to rotate. The wait clock keeps counting, so turning
    // the text back on (which resets) lands on the right stage.
    if (this.paused || this.iconOnly || !this.isConnected) return;
    if (this.messages.length > 1) this._timer = setInterval(() => this.next(), this.interval);
    // Switch stages exactly at the boundary rather than on the next rotation tick.
    const next = this.stages[this._stage + 1];
    if (next) {
      this._stageTimer = setTimeout(() => this._enter(this._stage + 1), next.after - this._now());
    }
  }

  private _stop(): void {
    clearInterval(this._timer);
    clearTimeout(this._stageTimer);
    this._timer = this._stageTimer = undefined;
  }
}

/** Registers the element under `tag` (default `fun-loader`). Safe to call more than once. */
export function define(tag = 'fun-loader'): void {
  if (typeof customElements !== 'undefined' && !customElements.get(tag)) {
    customElements.define(tag, class extends FunLoader {});
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fun-loader': FunLoader;
  }
}
