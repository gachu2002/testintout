import type { SectionStatusInfo } from '@/components/reference-status';

export const permissionHubSectionStatus = {
  blockedSections: {
    apis: [
      { contract: 'missing', method: 'GET', path: '/api/v2/permissions/realms/:id' },
      { contract: 'missing', method: 'GET', path: '/api/v2/permissions/realms/:id/roles' },
      { contract: 'missing', method: 'GET', path: '/api/v2/permissions/requests (paged)' },
      { contract: 'missing', method: 'POST', path: '/api/v2/permissions/realms/:id/requests' },
    ],
    blockers: [
      'Missing accepted response contracts for GET /api/v2/permissions/realms/:id and GET /api/v2/permissions/realms/:id/roles, so Realm cards, detail state, and role rows cannot be verified.',
      'Missing accepted response contracts for GET /api/v2/permissions/requests (paged) and POST /api/v2/permissions/realms/:id/requests, so the request inbox and request submission flow remain blocked.',
    ],
    id: 'permission-hub-blocked-sections',
    nextAction: 'Provide documented contracts, sample payloads, or approved fixtures.',
    page: 'Permission Hub',
    progress: 'blocked',
    readiness: 'Blocked',
    reference: 'workspace_permission_hub.html',
    section: 'Realm cards / request inbox',
  },
  filters: {
    apis: [
      { contract: 'accepted', method: 'GET', path: '/api/v2/permissions/realms/filters' },
      { contract: 'accepted', method: 'GET', path: '/api/v2/permissions/realms (paged)' },
    ],
    evidence:
      'Accepted filters/list payloads and route wiring exist; full row remains blocked by hero/CTA gaps.',
    fieldsUsed: [
      'kinds[].value',
      'kinds[].label',
      'kinds[].count',
      'statuses[].value',
      'statuses[].label',
      'statuses[].count',
      'page.total',
    ],
    id: 'permission-hub-filters',
    page: 'Permission Hub',
    progress: 'implemented',
    readiness: 'Ready',
    reference: 'workspace_permission_hub.html',
    section: 'Filter bar',
  },
  guideLinks: {
    apis: [
      {
        contract: 'accepted',
        method: 'GET',
        path: '/api/v2/panels/guide-links?surface=permissions',
      },
    ],
    evidence: 'Verified with focused visual target, broader visual suite, and pnpm check.',
    fieldsUsed: ['title', 'description', 'rows[].title', 'rows[].href', 'footerLink.href'],
    id: 'permission-hub-guide-links',
    page: 'Permission Hub',
    progress: 'verified',
    readiness: 'Ready',
    reference: 'workspace_permission_hub.html',
    section: 'Guide links',
  },
  hero: {
    apis: [
      { contract: 'accepted', method: 'GET', path: '/api/v2/permissions/realms/stats' },
      { contract: 'accepted', method: 'GET', path: '/api/v2/permissions/realms/filters' },
    ],
    blockers: [
      'Missing accepted role-count stat contract for the reference 포함 Role hero value; existing stats only cover total realms, members, bound projects, and pending requests.',
      'Request CTA route and behavior are not accepted; React disables 새 권한 요청 while the reference uses an active link.',
    ],
    fieldsUsed: [
      'totalRealms',
      'totalMembers',
      'boundProjectCount',
      'pendingRequests',
      'filters.kinds[].count',
      'filters.statuses[].count',
    ],
    id: 'permission-hub-hero',
    nextAction: 'Provide role-count stat contract and request CTA behavior.',
    page: 'Permission Hub',
    progress: 'blocked',
    readiness: 'Blocked',
    reference: 'workspace_permission_hub.html',
    section: 'Hero summary',
  },
  tips: {
    apis: [
      { contract: 'accepted', method: 'GET', path: '/api/v2/panels/tips?surface=permissions' },
    ],
    evidence: 'Verified with focused visual target, broader visual suite, and pnpm check.',
    fieldsUsed: ['title', 'description', 'rows[].title', 'rows[].meta', 'footerLink.href'],
    id: 'permission-hub-tips',
    page: 'Permission Hub',
    progress: 'verified',
    readiness: 'Ready',
    reference: 'workspace_permission_hub.html',
    section: 'Permission operation tips',
  },
} satisfies Record<string, SectionStatusInfo>;
