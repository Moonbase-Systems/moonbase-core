export interface BaseTreeItemProps {
  label: string;
  selected?: boolean;
  expandable?: boolean;
  open?: boolean;
  toggleLabel?: string;
}

export { default as BaseTreeItem } from './BaseTreeItem.vue';
