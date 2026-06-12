export const routes = {
  aboutDej: '/docs/about-dej',
  aiGallery: '/workspace/ai-gallery',
  agents: '/workspace/agents',
  appGallery: '/workspace/app-gallery',
  buckets: '/workspace/buckets',
  consoles: '/workspace/consoles',
  databases: '/workspace/databases',
  docsApiV2: '/docs/api/v2/README.md',
  domains: '/workspace/domains',
  gettingStarted: '/docs/guides/getting-started',
  jupyter: '/workspace/jupyter',
  keycenter: '/workspace/keycenter',
  launchpad: '/',
  permissions: '/workspace/permissions',
  projects: '/workspace/projects',
  supportChatbot: '/support/chatbot',
  supportRequest: '/support/request',
  toolInventory: '/workspace/tool-inventory',
} as const;

export type ResolvedHref = {
  href: string;
  isInternal: boolean;
};

export function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//');
}

export function toChildRoutePath(route: string) {
  return route.startsWith('/') ? route.slice(1) : route;
}

export function resolveSafeHref(href: string): ResolvedHref | null {
  const trimmedHref = href.trim();

  if (!trimmedHref || hasUnsafeCharacters(trimmedHref) || trimmedHref.startsWith('\\')) {
    return null;
  }

  if (isInternalHref(trimmedHref) || trimmedHref.startsWith('#') || isRelativeHref(trimmedHref)) {
    return { href: trimmedHref, isInternal: true };
  }

  try {
    const parsedUrl = trimmedHref.startsWith('//')
      ? new URL(`https:${trimmedHref}`)
      : new URL(trimmedHref);

    if (isAllowedExternalProtocol(parsedUrl.protocol)) {
      return { href: parsedUrl.toString(), isInternal: false };
    }
  } catch {
    return null;
  }

  return null;
}

function isRelativeHref(href: string) {
  return !href.startsWith('//') && !/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(href);
}

function hasUnsafeCharacters(href: string) {
  return /[\u0000-\u001F\u007F]/.test(href);
}

function isAllowedExternalProtocol(protocol: string) {
  return protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:';
}
