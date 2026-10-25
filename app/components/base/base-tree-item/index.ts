export interface BaseTreeItemProps {
  label: string;
  selected?: boolean;
  expandable?: boolean;
  open?: boolean;
  toggleLabel?: string;
  dense?: boolean;
  /** When false, label is plain text (for drag on a parent row). */
  interactiveLabel?: boolean;
}

export { default as BaseTreeItem } from './BaseTreeItem.vue';
