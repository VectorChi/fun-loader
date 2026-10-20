export interface FunLoaderTheme {
  name: string;
  messages: readonly string[];
}

const themes = new Map<string, readonly string[]>();

export function registerTheme(theme: FunLoaderTheme): void {
  themes.set(theme.name, theme.messages);
}

export function getTheme(name: string): readonly string[] | undefined {
  return themes.get(name);
}

export const DEFAULT_THEME = 'thinking';
export const DEFAULT_INTERVAL = 2400;
const MIN_INTERVAL = 250;
const FALLBACK_MESSAGES: readonly string[] = ['Thinking…'];

export const ICONS = ['spinner', 'dots', 'bars', 'pulse', 'sparkle', 'none'] as const;
export type FunLoaderIcon = (typeof ICONS)[number];
export const DEFAULT_ICON: FunLoaderIcon = 'spinner';

const css = `:host{display:inline-flex;align-items:center;gap:var(--fun-loader-gap,.5em);font:inherit;color:inherit}
:host([hidden]){display:none}
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
  static observedAttributes = ['theme', 'interval', 'paused', 'shuffle', 'label', 'icon'];

  private _messages: readonly string[] | undefined;
  private _order: number[] = [];
  private _pos = 0;
  private _timer: ReturnType<typeof setInterval> | undefined;
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

  get shuffle(): boolean {
    return this.hasAttribute('shuffle');
  }
  set shuffle(value: boolean) {
    this.toggleAttribute('shuffle', value);
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

  /** Custom messages; when set, these take precedence over `theme`. */
  get messages(): readonly string[] {
    const list = this._messages ?? getTheme(this.theme);
    return list?.length ? list : FALLBACK_MESSAGES;
  }
  set messages(value: readonly string[] | null | undefined) {
    this._messages = value?.length ? value : undefined;
    this._reset();
  }

  /** The message currently on screen. */
  get current(): string {
    return this._text?.textContent ?? '';
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
    this._reset();
  }

  disconnectedCallback(): void {
    this._stop();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue || !this.isConnected) return;
    if (name === 'label') this._renderLabel();
    else if (name === 'icon') this._renderIcon();
    else if (name === 'interval' || name === 'paused') this._schedule();
    else this._reset();
  }

  /** Advance to the next message immediately. */
  next(): void {
    const list = this.messages;
    if (++this._pos >= this._order.length) this._shuffleOrder(list.length);
    this._show(list[this._order[this._pos] ?? 0] ?? '');
  }

  private _reset(): void {
    if (!this._text) return;
    this._shuffleOrder(this.messages.length);
    this._show(this.messages[this._order[0] ?? 0] ?? '');
    this._renderLabel();
    this._schedule();
  }

  private _shuffleOrder(length: number): void {
    const prev = this._order[this._order.length - 1];
    const order = Array.from({ length }, (_, i) => i);
    if (this.shuffle) {
      for (let i = length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j] as number, order[i] as number];
      }
      // Avoid showing the same message twice in a row across rounds.
      if (length > 1 && order[0] === prev) order.push(order.shift() as number);
    }
    this._order = order;
    this._pos = 0;
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
    if (!this.paused && this.isConnected && this.messages.length > 1) {
      this._timer = setInterval(() => this.next(), this.interval);
    }
  }

  private _stop(): void {
    if (this._timer !== undefined) clearInterval(this._timer);
    this._timer = undefined;
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
