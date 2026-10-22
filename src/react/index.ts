// 'use client' is added to the built file by scripts/use-client.mjs; bundlers strip it from here.
import {
  createElement,
  type DetailedHTMLProps,
  forwardRef,
  type HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import type { FunLoader as FunLoaderElement, FunLoaderIcon, FunLoaderStage } from '../element';
import { defineAll } from '../register';

// Called explicitly: a bare side-effect import gets tree-shaken away.
defineAll();

export interface FunLoaderProps extends HTMLAttributes<HTMLElement> {
  theme?: string;
  messages?: readonly string[];
  /** Messages that change as the wait grows. Memoize it: a new array restarts the rotation. */
  stages?: readonly FunLoaderStage[] | null;
  interval?: number;
  paused?: boolean;
  /** Show only the icon; screen readers still hear `label`. */
  iconOnly?: boolean;
  /** Show messages in the order written instead of shuffled. */
  ordered?: boolean;
  /** @deprecated Shuffling is the default; use `ordered` instead. `shuffle={false}` still means ordered. */
  shuffle?: boolean;
  label?: string;
  icon?: FunLoaderIcon;
}

// useLayoutEffect warns during server rendering on React 18.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export const FunLoader = forwardRef<FunLoaderElement, FunLoaderProps>(function FunLoader(
  { theme, messages, stages, interval, paused, iconOnly, ordered, shuffle, label, icon, ...rest },
  ref,
) {
  const el = useRef<FunLoaderElement>(null);
  useImperativeHandle(ref, () => el.current as FunLoaderElement);

  // React 18 turns every prop into a string attribute, which breaks arrays and
  // `false` booleans, so these are always set as properties.
  useIsomorphicLayoutEffect(() => {
    const node = el.current;
    if (!node) return;
    node.paused = !!paused;
    node.iconOnly = !!iconOnly;
    node.ordered = ordered ?? shuffle === false;
    node.messages = messages;
    node.stages = stages;
  }, [paused, iconOnly, ordered, shuffle, messages, stages]);

  // Strings go through as attributes so server-rendered HTML already carries them.
  return createElement('fun-loader', {
    role: 'status',
    ...rest,
    ref: el,
    theme,
    icon,
    label,
    interval: interval === undefined ? undefined : String(interval),
  });
});

type FunLoaderJSX = DetailedHTMLProps<HTMLAttributes<FunLoaderElement>, FunLoaderElement> &
  Partial<Record<'theme' | 'icon' | 'label' | 'interval', string>>;

// Lets the raw <fun-loader> tag type-check in TSX too.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'fun-loader': FunLoaderJSX;
    }
  }
}

export default FunLoader;
