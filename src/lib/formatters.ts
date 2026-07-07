export function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatRelativeTime(value: string) {
  const timestamp = new Date(value).getTime();

  if (Number.isNaN(timestamp)) return formatDate(value);

  const diffMs = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < 0) return formatDate(value);
  if (diffMs < minute) return 'Just now';
  if (diffMs < hour) return `${Math.floor(diffMs / minute)} min ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)} hr ago`;
  if (diffMs < day * 2) return 'Yesterday';
  if (diffMs < day * 7) return `${Math.floor(diffMs / day)} days ago`;

  return formatDate(value);
}

export function stripMarkup(value: string) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function formatLabel(value: string) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

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

export function clampPercent(value: number | null | undefined) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0;

  return Math.max(0, Math.min(100, value));
}

export function formatPercent(value: number | null | undefined) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—';

  return `${clampPercent(value).toLocaleString()}%`;
}

export function getInitials(value: string | null | undefined, fallback = 'NA') {
  const initials = (value ?? '')
    .trim()
    .split(/[/@(\s._-]+/)
    .map((part) => part.at(0))
    .filter((part): part is string => Boolean(part))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return initials || fallback;
}
