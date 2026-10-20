import { defineComponent, h, type PropType } from 'vue';
import type { FunLoaderIcon } from '../element';
import { defineAll } from '../register';

// Called explicitly: a bare side-effect import gets tree-shaken away.
defineAll();

export const FunLoader = defineComponent({
  name: 'FunLoader',
  props: {
    theme: String,
    messages: Array as PropType<readonly string[]>,
    interval: Number,
    paused: Boolean,
    shuffle: Boolean,
    label: String,
    icon: String as PropType<FunLoaderIcon>,
  },
  setup(props) {
    return () => {
      // Drop unset props so the element's own defaults apply.
      const attrs = Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined));
      return h('fun-loader', attrs);
    };
  },
});

export default FunLoader;
