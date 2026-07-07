import { formatLabel } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

export { clampPercent, formatBytes, formatPercent, getInitials } from '@/lib/formatters';

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
