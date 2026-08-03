import { cva, type VariantProps } from 'class-variance-authority';
import type { EChartsOption } from 'echarts';

export const baseLineChartVariants = cva('w-full', {
  variants: {
    height: {
      sm: 'h-[12rem]',
      md: 'h-[16rem]',
      lg: 'h-[22rem]',
    },
  },
  defaultVariants: {
    height: 'md',
  },
});

export interface BaseLineChartSeries {
  name: string;
  data: number[];
  color: string;
}

export interface BaseLineChartProps {
  series: BaseLineChartSeries[];
  height?: 'sm' | 'md' | 'lg';
  yFormatter?: (val: number) => string;
}

export type BaseLineChartVariants = VariantProps<typeof baseLineChartVariants>;
export type { EChartsOption };
export { default as BaseLineChart } from './BaseLineChart.vue';
