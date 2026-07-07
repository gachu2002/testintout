import { Buffer } from 'node:buffer';

type MockData = Record<string, unknown> & {
  appGalleryAppDetailsBySlug?: Record<string, unknown>;
  appGalleryAppsByCategoryResponse?: Record<string, unknown>;
  databaseBindingsByDatabaseId?: Record<string, unknown>;
  databaseCreateResponse?: unknown;
  databaseDetailsById?: Record<string, unknown>;
  databaseRestartResponse?: unknown;
  domainCertificateByDomainId?: Record<string, unknown>;
  domainConnectionByDomainId?: Record<string, unknown>;
  domainCreateResponse?: unknown;
  projectPublishHistoryByProjectId?: Record<string, unknown>;
  projectResourcesByProjectId?: Record<string, unknown>;
};

type MockResolution = {
  payload: unknown;
  status: number;
};

type PaginatedPayload = {
  items: unknown[];
  page?: Record<string, unknown>;
};

const routeKeys = new Map<string, string>([
  ['/api/v2/me', 'currentUserResponse'],
  ['/api/v2/me/notifications', 'notificationsResponse'],
  ['/api/v2/launchpad/overview', 'launchpadOverviewResponse'],
  ['/api/v2/launchpad/my-work', 'launchpadMyWorkResponse'],
  ['/api/v2/launchpad/resources', 'launchpadResourcesResponse'],
  ['/api/v2/launchpad/hero', 'launchpadHeroResponse'],
  ['/api/v2/launchpad/announcements', 'announcementsResponse'],
  ['/api/v2/launchpad/service-menu', 'serviceMenuResponse'],
  ['/api/v2/launchpad/articles', 'articlesResponse'],
  ['/api/v2/panels/guide-links', 'guideLinksResponse'],
  ['/api/v2/me/projects', 'projectsResponse'],
  ['/api/v2/jobs', 'jobsResponse'],
  ['/api/v2/launchpad/store-spotlight', 'storeSpotlightResponse'],
  ['/api/v2/app-gallery/hero', 'appGalleryHeroResponse'],
  ['/api/v2/app-gallery/categories', 'appGalleryCategoriesResponse'],
  ['/api/v2/app-gallery/featured', 'appGalleryFeaturedResponse'],
  ['/api/v2/app-gallery/apps', 'appGalleryAppsResponse'],
  ['/api/v2/app-gallery/related-ai', 'appGalleryRelatedAiResponse'],
  ['/api/v2/ai-gallery/spotlight', 'aiGallerySpotlightResponse'],
  ['/api/v2/databases', 'databasesResponse'],
  ['/api/v2/databases/filters', 'databasesFiltersResponse'],
  ['/api/v2/databases/panels/health', 'databaseHealthPanelResponse'],
  ['/api/v2/databases/stats', 'databasesStatsResponse'],
  ['/api/v2/buckets', 'bucketsResponse'],
  ['/api/v2/buckets/filters', 'bucketsFiltersResponse'],
  ['/api/v2/buckets/panels/usage', 'bucketUsagePanelResponse'],
  ['/api/v2/buckets/stats', 'bucketsStatsResponse'],
  ['/api/v2/domains', 'domainsResponse'],
  ['/api/v2/domains/filters', 'domainsFiltersResponse'],
  ['/api/v2/domains/panels/certificates', 'domainCertificatePanelResponse'],
  ['/api/v2/domains/panels/connections', 'domainConnectionPanelResponse'],
  ['/api/v2/domains/stats', 'domainsStatsResponse'],
  ['/api/v2/permissions/realms', 'permissionRealmsResponse'],
  ['/api/v2/permissions/realms/filters', 'permissionRealmFiltersResponse'],
  ['/api/v2/permissions/realms/stats', 'permissionRealmStatsResponse'],
  ['/api/v2/permissions/requests', 'permissionRequestsResponse'],
  ['/api/v2/agents', 'agentsResponse'],
  ['/api/v2/agents/filters', 'agentsFiltersResponse'],
  ['/api/v2/agents/panels/models', 'agentModelsPanelResponse'],
  ['/api/v2/agents/panels/runtime-status', 'agentRuntimeStatusPanelResponse'],
  ['/api/v2/agents/stats', 'agentsStatsResponse'],
  ['/api/v2/consoles', 'consolesResponse'],
  ['/api/v2/consoles/filters', 'consolesFiltersResponse'],
  ['/api/v2/consoles/panels/guide-links', 'consoleGuideLinksPanelResponse'],
  ['/api/v2/consoles/panels/health', 'consoleHealthPanelResponse'],
  ['/api/v2/consoles/panels/tips', 'consoleTipsPanelResponse'],
  ['/api/v2/consoles/stats', 'consolesStatsResponse'],
]);

export function resolveMockResponse(
  mockData: MockData,
  method: string | undefined,
  rawUrl: string | undefined,
): MockResolution | null {
  if (!method || !rawUrl) {
    return null;
  }

  const requestUrl = new URL(rawUrl, 'http://localhost');

  if (
    method === 'POST' &&
    /^\/api\/v2\/app-gallery\/apps\/([^/]+)\/install$/.test(requestUrl.pathname)
  ) {
    return {
      payload: mockData.appGalleryInstallResponse ?? {
        data: { jobId: '6a3a02a5dc684c9fde7e52e1', status: 'queued' },
      },
      status: 200,
    };
  }

  if (method === 'POST' && requestUrl.pathname === '/api/v2/databases') {
    return {
      payload: mockData.databaseCreateResponse ?? { data: null },
      status: 200,
    };
  }

  if (method === 'POST' && /^\/api\/v2\/databases\/([^/]+)\/restart$/.test(requestUrl.pathname)) {
    return {
      payload: mockData.databaseRestartResponse ?? { data: null },
      status: 200,
    };
  }

  if (method === 'POST' && requestUrl.pathname === '/api/v2/domains') {
    return {
      payload: mockData.domainCreateResponse ?? { data: null },
      status: 200,
    };
  }

  if (method === 'POST' && requestUrl.pathname === '/api/v2/permissions/realms') {
    return {
      payload: mockData.permissionRealmCreateResponse ?? { data: null },
      status: 200,
    };
  }

  if (method !== 'GET') {
    return null;
  }

  if (requestUrl.pathname === '/api/v2/app-gallery/apps') {
    const category = requestUrl.searchParams.get('filter[category]')?.trim();
    const categoryPayload = category
      ? mockData.appGalleryAppsByCategoryResponse?.[category]
      : null;

    if (categoryPayload) {
      const selectedParams = new URLSearchParams(requestUrl.searchParams);
      selectedParams.delete('filter[category]');

      return {
        payload: applyPagination(categoryPayload, selectedParams),
        status: 200,
      };
    }
  }

  if (
    requestUrl.pathname === '/api/v2/panels/tips' &&
    requestUrl.searchParams.get('surface') === 'buckets'
  ) {
    const payload = mockData.bucketTipsPanelResponse;

    if (payload) {
      return { payload, status: 200 };
    }
  }

  if (
    requestUrl.pathname === '/api/v2/panels/tips' &&
    requestUrl.searchParams.get('surface') === 'databases'
  ) {
    const payload = mockData.databaseTipsPanelResponse;

    if (payload) {
      return { payload, status: 200 };
    }
  }

  if (
    requestUrl.pathname === '/api/v2/panels/tips' &&
    requestUrl.searchParams.get('surface') === 'domains'
  ) {
    const payload = mockData.domainTipsPanelResponse;

    if (payload) {
      return { payload, status: 200 };
    }
  }

  if (
    requestUrl.pathname === '/api/v2/panels/tips' &&
    requestUrl.searchParams.get('surface') === 'permissions'
  ) {
    const payload = mockData.permissionTipsPanelResponse;

    if (payload) {
      return { payload, status: 200 };
    }
  }

  if (
    requestUrl.pathname === '/api/v2/panels/tips' &&
    requestUrl.searchParams.get('surface') === 'agents'
  ) {
    const payload = mockData.agentTipsPanelResponse;

    if (payload) {
      return { payload, status: 200 };
    }
  }

  if (
    requestUrl.pathname === '/api/v2/panels/guide-links' &&
    requestUrl.searchParams.get('surface') === 'buckets'
  ) {
    const payload = mockData.bucketGuideLinksPanelResponse;

    if (payload) {
      return { payload, status: 200 };
    }
  }

  if (
    requestUrl.pathname === '/api/v2/panels/guide-links' &&
    requestUrl.searchParams.get('surface') === 'databases'
  ) {
    const payload = mockData.databaseGuideLinksPanelResponse;

    if (payload) {
      return { payload, status: 200 };
    }
  }

  if (
    requestUrl.pathname === '/api/v2/panels/guide-links' &&
    requestUrl.searchParams.get('surface') === 'domains'
  ) {
    const payload = mockData.domainGuideLinksPanelResponse;

    if (payload) {
      return { payload, status: 200 };
    }
  }

  if (
    requestUrl.pathname === '/api/v2/panels/guide-links' &&
    requestUrl.searchParams.get('surface') === 'permissions'
  ) {
    const payload = mockData.permissionGuideLinksPanelResponse;

    if (payload) {
      return { payload, status: 200 };
    }
  }

  if (
    requestUrl.pathname === '/api/v2/panels/guide-links' &&
    requestUrl.searchParams.get('surface') === 'agents'
  ) {
    const payload = mockData.agentGuideLinksPanelResponse;

    if (payload) {
      return { payload, status: 200 };
    }
  }

  const routeKey = routeKeys.get(requestUrl.pathname);

  if (routeKey) {
    const payload = mockData[routeKey];

    if (payload) {
      return {
        payload: applyPagination(payload, requestUrl.searchParams),
        status: 200,
      };
    }
  }

  const databaseBindingsMatch = requestUrl.pathname.match(
    /^\/api\/v2\/databases\/([^/]+)\/bindings$/,
  );

  if (databaseBindingsMatch) {
    const databaseId = decodeURIComponent(databaseBindingsMatch[1]);
    const bindings = mockData.databaseBindingsByDatabaseId?.[databaseId];

    return { payload: bindings ?? { data: { items: [] } }, status: 200 };
  }

  const databaseDetailMatch = requestUrl.pathname.match(/^\/api\/v2\/databases\/([^/]+)$/);

  if (databaseDetailMatch) {
    const databaseId = decodeURIComponent(databaseDetailMatch[1]);
    const detail = mockData.databaseDetailsById?.[databaseId];

    if (detail) {
      return { payload: detail, status: 200 };
    }
  }

  const appGalleryDetailMatch = requestUrl.pathname.match(
    /^\/api\/v2\/app-gallery\/apps\/([^/]+)$/,
  );

  if (appGalleryDetailMatch) {
    const slug = decodeURIComponent(appGalleryDetailMatch[1]);
    const appDetail = mockData.appGalleryAppDetailsBySlug?.[slug];

    if (appDetail) {
      return { payload: appDetail, status: 200 };
    }
  }

  const domainCertificateMatch = requestUrl.pathname.match(
    /^\/api\/v2\/domains\/([^/]+)\/certificate$/,
  );

  if (domainCertificateMatch) {
    const domainId = decodeURIComponent(domainCertificateMatch[1]);
    const certificate = mockData.domainCertificateByDomainId?.[domainId];

    if (certificate) {
      return { payload: certificate, status: 200 };
    }
  }

  const domainConnectionMatch = requestUrl.pathname.match(
    /^\/api\/v2\/domains\/([^/]+)\/connection$/,
  );

  if (domainConnectionMatch) {
    const domainId = decodeURIComponent(domainConnectionMatch[1]);
    const connection = mockData.domainConnectionByDomainId?.[domainId];

    if (connection) {
      return { payload: connection, status: 200 };
    }
  }

  const publishHistoryMatch = requestUrl.pathname.match(
    /^\/api\/v2\/projects\/([^/]+)\/publish\/history$/,
  );

  if (publishHistoryMatch) {
    const projectId = decodeURIComponent(publishHistoryMatch[1]);
    const history = mockData.projectPublishHistoryByProjectId?.[projectId];

    if (history) {
      return { payload: applyPagination(history, requestUrl.searchParams), status: 200 };
    }
  }

  const projectResourcesMatch = requestUrl.pathname.match(
    /^\/api\/v2\/projects\/([^/]+)\/resources$/,
  );

  if (projectResourcesMatch) {
    const projectId = decodeURIComponent(projectResourcesMatch[1]);
    const resources = mockData.projectResourcesByProjectId?.[projectId];

    if (resources) {
      return { payload: resources, status: 200 };
    }
  }

  if (requestUrl.pathname.startsWith('/api/')) {
    return {
      payload: { error: 'Mock route not found', path: requestUrl.pathname },
      status: 404,
    };
  }

  return null;
}

function applyPagination(payload: unknown, params: URLSearchParams) {
  if (!params.has('limit') && !params.has('cursor') && !params.has('q')) {
    return payload;
  }

  if (!isPaginatedPayload(payload)) {
    return payload;
  }

  const q = params.get('q')?.trim().toLowerCase() ?? '';
  const cursor = params.get('cursor') ?? '';
  const offset = parseCursor(cursor);
  const category = params.get('filter[category]')?.trim() ?? '';
  const categoryItems = category
    ? payload.items.filter((item) => matchesCategory(item, category))
    : payload.items;
  const filteredItems = q ? categoryItems.filter((item) => matchesQuery(item, q)) : categoryItems;
  const limit = parseLimit(params.get('limit'), filteredItems.length);
  const total = q || category ? filteredItems.length : getPayloadTotal(payload);

  if (offset === 0 && filteredItems.length <= limit && !q && !category) {
    return payload;
  }

  const items = filteredItems.slice(offset, offset + limit);
  const nextOffset = offset + items.length;
  const hasNext = nextOffset < total;

  return {
    ...payload,
    items,
    page: {
      ...payload.page,
      cursor: cursor || null,
      hasNext,
      nextCursor: hasNext ? formatCursor(nextOffset) : null,
      total,
    },
  };
}

function isPaginatedPayload(payload: unknown): payload is PaginatedPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    Array.isArray((payload as { items?: unknown }).items)
  );
}

function parseCursor(cursor: string) {
  if (!cursor) return 0;

  const offset = Number.parseInt(cursor, 10);
  if (Number.isFinite(offset) && offset > 0) return offset;

  try {
    const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString('utf8')) as {
      offset?: unknown;
    };
    const decodedOffset = Number(decoded.offset);

    return Number.isFinite(decodedOffset) && decodedOffset > 0 ? decodedOffset : 0;
  } catch {
    return 0;
  }
}

function formatCursor(offset: number) {
  return Buffer.from(JSON.stringify({ offset })).toString('base64');
}

function parseLimit(limitValue: string | null, fallback: number) {
  const limit = Number.parseInt(limitValue ?? '', 10);
  return Number.isFinite(limit) && limit > 0 ? limit : fallback;
}

function getPayloadTotal(payload: PaginatedPayload) {
  const total = payload.page?.total;

  return typeof total === 'number' ? total : payload.items.length;
}

function matchesQuery(item: unknown, query: string) {
  if (typeof item !== 'object' || item === null) return false;

  const { description, name, subtitle, summary, tags, title } = item as {
    description?: unknown;
    name?: unknown;
    subtitle?: unknown;
    summary?: unknown;
    tags?: unknown;
    title?: unknown;
  };

  return [name, description, subtitle, summary, title, ...(Array.isArray(tags) ? tags : [])]
    .filter((value): value is string => typeof value === 'string')
    .some((value) => value.toLowerCase().includes(query));
}

function matchesCategory(item: unknown, category: string) {
  if (typeof item !== 'object' || item === null) return false;

  const itemCategory = (item as { category?: unknown }).category;

  return typeof itemCategory === 'string' && itemCategory === category;
}
