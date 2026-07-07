import type { Theme } from '@mui/material/styles';

export type PanelKind = 'hero' | 'plain' | 'resource' | 'soft';
export type GridCols = 1 | 2 | 3 | 4;
export type GridBreak = 'lg' | 'md' | 'sm';

const primitivePropNames = [
  'active',
  'cardMinHeight',
  'center',
  'chipType',
  'collapseAt',
  'compact',
  'cols',
  'dense',
  'dot',
  'fill',
  'hub',
  'kind',
  'owner',
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

export function buildResourceResultCopy({
  filterLabel,
  isDefault,
  loadedCount,
  total,
  visibleCount,
}: {
  filterLabel?: string;
  isDefault: boolean;
  loadedCount: number;
  total?: number;
  visibleCount: number;
}) {
  const totalCopy = typeof total === 'number' ? `${total.toLocaleString()} total` : 'total unknown';
  const loadedCopy = `${loadedCount.toLocaleString()} loaded`;

  if (isDefault) return `${loadedCopy} · ${totalCopy}`;

  return `${visibleCount.toLocaleString()} ${filterLabel ?? 'visible'} · ${loadedCopy}`;
}
