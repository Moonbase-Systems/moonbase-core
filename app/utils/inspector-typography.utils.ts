/**
 * Orbit text styles for the layer inspector (MoonBase Studio Design System).
 * Color, alignment, and box size stay on the consumer.
 */
export const inspectorTypography = {
  /** Card / view title — Space Grotesk 300, 28px. */
  title: 'font-sans text-title font-light',
  /** Large value — Space Grotesk 300, 20px, tabular figures. */
  valueLarge: 'font-sans text-numeric-md font-light tabular-nums',
  /** Field value — Space Grotesk 400, 14px, tabular figures. */
  value: 'font-sans text-body-sm font-normal tabular-nums',
  /** Body text — Space Grotesk 400, 14px. */
  body: 'font-sans text-body-sm font-normal',
  /** Label, unit, group heading — Space Mono 12px, upper case. */
  label: 'font-mono text-label font-normal uppercase',
} as const;

export type InspectorFieldTypography = 'standard-medium' | 'standard-small';

/** Both sizes map to the Orbit field value; kept as a prop for API compatibility. */
export function inspectorFieldTypography(kind: InspectorFieldTypography = 'standard-medium') {
  return kind === 'standard-small' ? inspectorTypography.value : inspectorTypography.valueLarge;
}
