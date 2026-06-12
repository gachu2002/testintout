import type { Theme } from '@mui/material/styles';

export type PanelKind = 'hero' | 'plain' | 'resource' | 'soft';
export type GridCols = 1 | 2 | 3 | 4;
export type GridBreak = 'lg' | 'md' | 'sm';

const primitivePropNames = [
  'active',
  'cardMinHeight',
  'center',
  'collapseAt',
  'compact',
  'cols',
  'dense',
  'dot',
  'fill',
  'hub',
  'kind',
  'tileBackground',
  'tileColor',
  'tileSize',
  'tone',
];

export function shouldForwardProp(prop: PropertyKey) {
  return !primitivePropNames.includes(String(prop));
}

export function hubGradient(brand: string, accent: string) {
  return `linear-gradient(135deg, ${brand}, ${accent})`;
}

export function focusVisibleStyles(theme: Theme) {
  return {
    '&:focus-visible': {
      outline: theme.workspace.focus.outline,
      outlineOffset: theme.workspace.focus.outlineOffset,
    },
  };
}
