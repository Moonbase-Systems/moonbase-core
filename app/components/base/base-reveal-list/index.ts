export interface BaseRevealListProps {
  active?: boolean;
  dense?: boolean;
  /** When false, list spacing is kept but the continuous vertical rail is omitted (per-row segments elsewhere). */
  showRail?: boolean;
}

export { default as BaseRevealList } from './BaseRevealList.vue';
