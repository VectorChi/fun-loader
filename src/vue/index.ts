import { defineComponent, h, type PropType } from 'vue';
import type { FunLoaderIcon, FunLoaderStage } from '../element';
import { defineAll } from '../register';

// Called explicitly: a bare side-effect import gets tree-shaken away.
defineAll();

export const FunLoader = defineComponent({
  name: 'FunLoader',
  props: {
    theme: String,
    messages: Array as PropType<readonly string[]>,
    stages: Array as PropType<readonly FunLoaderStage[] | null>,
    interval: Number,
    paused: Boolean,
    /** Show only the icon; screen readers still hear `label`. */
    iconOnly: Boolean,
    /** Show messages in the order written instead of shuffled. */
    ordered: Boolean,
    /** @deprecated Shuffling is the default; use `ordered`. `:shuffle="false"` still means ordered. */
    shuffle: { type: Boolean, default: undefined },
    label: String,
    icon: String as PropType<FunLoaderIcon>,
  },
  setup(props) {
    return () => {
      const { shuffle, ordered, ...rest } = props;
      // Drop unset props so the element's own defaults apply.
      const attrs = Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined));
      return h('fun-loader', { ...attrs, ordered: ordered || shuffle === false });
    };
  },
});

export default FunLoader;
