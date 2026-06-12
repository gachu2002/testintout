const apiBaseUrl = readRequiredEnv('VITE_API_BASE_URL', '/api');
const showReferenceStatus = readBooleanEnv('VITE_SHOW_REFERENCE_STATUS', false);

export const env = Object.freeze({
  apiBaseUrl,
  showReferenceStatus,
});

function readRequiredEnv(name: string, fallback: string) {
  const value = (import.meta.env as unknown as Record<string, string | undefined>)[name];

  if (typeof value !== 'string' || value.trim().length === 0) {
    return fallback;
  }

  return value.trim();
}

function readBooleanEnv(name: string, fallback: boolean) {
  const value = (import.meta.env as unknown as Record<string, string | undefined>)[name];

  if (typeof value !== 'string') {
    return fallback;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
}
