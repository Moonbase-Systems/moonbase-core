/**
 * Figma text styles for the layer inspector.
 * Color, alignment, and box size stay on the consumer.
 */
export const inspectorTypography = {
  /** Special High — Lalezar Regular 48px */
  specialHigh: 'font-lalezar text-special-high font-normal tracking-normal',
  /** Special Medium — Lalezar Regular 40px */
  specialMedium: 'font-lalezar text-special-medium font-normal tracking-normal',
  /** Special Small — Lalezar Regular 36px */
  specialSmall: 'font-lalezar text-special-small font-normal tracking-normal',
  /** Standard High — Inter Medium 24px */
  standardHigh: 'font-inter text-standard-high font-medium tracking-normal',
  /** Standard Medium — Inter Medium 20px */
  standardMedium: 'font-inter text-standard-medium font-medium tracking-normal',
  /** Standard Small — Inter Medium 16px */
  standardSmall: 'font-inter text-standard-small font-medium tracking-normal',
} as const;

export type InspectorFieldTypography = 'standard-medium' | 'standard-small';

export function inspectorFieldTypography(kind: InspectorFieldTypography = 'standard-medium') {
  return kind === 'standard-small' ? inspectorTypography.standardSmall : inspectorTypography.standardMedium;
}
