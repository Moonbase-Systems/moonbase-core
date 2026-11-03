import type { ClassValue } from 'clsx';
import type { Component } from 'vue';

export type BaseIconRailItem = {
  id: string;
  label: string;
  icon?: string;
  iconClass?: string;
  iconComponent?: Component;
  maskUrl?: string;
  boxClass?: string;
};

export interface BaseIconRailProps {
  items: BaseIconRailItem[];
  modelValue?: string;
  class?: ClassValue;
}

export { default as BaseIconRail } from './BaseIconRail.vue';
