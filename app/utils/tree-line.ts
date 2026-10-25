import { inject, type InjectionKey, onUnmounted, provide, ref, watch } from 'vue';

type TreeLineContext = {
  notify: (id: symbol, active: boolean) => void;
};

const treeLineKey: InjectionKey<TreeLineContext> = Symbol('treeLine');

export function useTreeLine(selected: () => boolean) {
  const parent = inject(treeLineKey, null);
  const selfId = Symbol();
  const sources = new Map<symbol, boolean>();
  const childActive = ref(false);

  function publish() {
    parent?.notify(selfId, selected() || childActive.value);
  }

  provide(treeLineKey, {
    notify(id, active) {
      sources.set(id, active);
      const next = [...sources.values()].some(Boolean);
      if (next === childActive.value) {
        return;
      }
      childActive.value = next;
      publish();
    },
  });

  watch(selected, publish, { immediate: true });

  onUnmounted(() => {
    parent?.notify(selfId, false);
  });

  return { childActive };
}
