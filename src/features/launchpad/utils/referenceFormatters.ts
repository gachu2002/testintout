export function formatLaunchpadDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.valueOf())) return '-';

  return new Intl.DateTimeFormat('ko-KR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(date)
    .replace(/\.\s?/g, '.')
    .replace(/\.$/, '');
}

export function formatLaunchpadRelativeTime(value: string | null | undefined) {
  const date = new Date(value ?? '');

  if (Number.isNaN(date.valueOf())) return '-';

  const diffMinutes = Math.round((date.getTime() - Date.now()) / 60000);
  const relativeTimeFormatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });

  if (Math.abs(diffMinutes) < 60) {
    return relativeTimeFormatter.format(diffMinutes, 'minute');
  }

  const diffHours = Math.round(diffMinutes / 60);

  if (Math.abs(diffHours) < 24) {
    return relativeTimeFormatter.format(diffHours, 'hour');
  }

  return relativeTimeFormatter.format(Math.round(diffHours / 24), 'day');
}
