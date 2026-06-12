import { formatLabel } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

const byteUnits = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'] as const;

export function formatBytes(value: number) {
  if (!Number.isFinite(value) || value <= 0) return '0 B';

  const exponent = Math.min(Math.floor(Math.log(value) / Math.log(1024)), byteUnits.length - 1);
  const scaledValue = value / 1024 ** exponent;
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: scaledValue < 10 && exponent > 0 ? 1 : 0,
  });

  return `${formatter.format(scaledValue)} ${byteUnits[exponent]}`;
}

export function formatPercent(value: number | null | undefined) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—';

  return `${Math.max(0, Math.min(100, value)).toLocaleString()}%`;
}

export function clampPercent(value: number | null | undefined) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0;

  return Math.max(0, Math.min(100, value));
}

export function getBucketTypeLabel(type: string) {
  if (type === 'private') return '프라이빗';
  if (type === 'shared') return '공용';
  if (type === 'public') return '퍼블릭';

  return formatLabel(type);
}

export function getBucketStatusLabel(status: string) {
  if (status === 'active') return 'Active';
  if (status === 'review') return 'Review';
  if (status === 'archive') return 'Archive';

  return formatLabel(status);
}

export function getBucketTone(status: string): ToneName {
  if (status === 'active') return 'healthy';
  if (status === 'review') return 'review';
  if (status === 'archive') return 'draft';

  return 'info';
}

export function getBucketIconBackground(type: string) {
  if (type === 'private') return 'linear-gradient(135deg,#0f766e,#14b8a6)';
  if (type === 'shared') return 'linear-gradient(135deg,#0891b2,#5eead4)';
  if (type === 'public') return 'linear-gradient(135deg,#0ea5e9,#22d3ee)';

  return 'linear-gradient(135deg,#0f766e,#2dd4bf)';
}

export function getInitials(value: string | undefined) {
  if (!value) return 'NA';

  return value
    .split(/[-_\s.]+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
