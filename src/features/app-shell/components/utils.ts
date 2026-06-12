export function getInitials(nameOrEmail: string) {
  const value = nameOrEmail.trim();

  if (value.includes('@')) {
    return value.slice(0, 2).toUpperCase();
  }

  return value
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
