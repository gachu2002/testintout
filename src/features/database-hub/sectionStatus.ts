import type { SectionStatusInfo } from '@/components/reference-status';

export const databaseHubSectionStatus = {
  cards: {
    apis: [
      { contract: 'accepted', method: 'GET', path: '/api/v2/databases?cursor=&sort=&limit=&q=' },
      { contract: 'missing', method: 'GET', path: '/api/v2/databases/:id' },
      { contract: 'missing', method: 'POST', path: '/api/v2/databases' },
      { contract: 'missing', method: 'PATCH', path: '/api/v2/databases/:id' },
      { contract: 'missing', method: 'DELETE', path: '/api/v2/databases/:id' },
      { contract: 'missing', method: 'POST', path: '/api/v2/databases/:id/restart' },
      { contract: 'missing', method: 'GET', path: '/api/v2/databases/:id/bindings' },
    ],
    blockers: [
      'Missing accepted response contract for GET /api/v2/databases/:id, so detail navigation remains disabled.',
      'Missing accepted response contracts for POST /api/v2/databases, PATCH /api/v2/databases/:id, DELETE /api/v2/databases/:id, POST /api/v2/databases/:id/restart, and GET /api/v2/databases/:id/bindings, so create/edit/delete/restart/binding behavior remains disabled.',
    ],
    evidence: 'Accepted user-provided list payload supports read-only database card rendering.',
    fieldsUsed: [
      'items[].name',
      'items[].engine',
      'items[].version',
      'items[].status',
      'items[].summary',
      'items[].endpoint',
      'items[].usage.storageLabel',
      'items[].bindingCount',
      'items[].health.label',
      'items[].owner.displayName',
    ],
    id: 'database-hub-cards',
    nextAction: 'Provide or approve contracts for the listed database detail and action endpoints.',
    page: 'Database Hub',
    progress: 'blocked',
    readiness: 'Blocked',
    reference: 'workspace_database_hub.html',
    section: 'Database cards',
  },
  filters: {
    apis: [
      { contract: 'accepted', method: 'GET', path: '/api/v2/databases/filters' },
      { contract: 'accepted', method: 'GET', path: '/api/v2/databases?cursor=&sort=&limit=&q=' },
    ],
    evidence:
      'Accepted user-provided filters payload drives engine filter chips and loaded counts.',
    fieldsUsed: ['engines[].value', 'engines[].count', 'statuses[].value', 'page.total'],
    id: 'database-hub-filters',
    page: 'Database Hub',
    progress: 'implemented',
    readiness: 'Ready',
    reference: 'workspace_database_hub.html',
    section: 'Filter bar',
  },
  guideLinks: {
    apis: [
      {
        contract: 'accepted',
        method: 'GET',
        path: '/api/v2/panels/guide-links?surface=databases',
      },
    ],
    evidence:
      'Focused Playwright target, broader visual suite, and project checks passed with the accepted guide-links payload.',
    fieldsUsed: ['title', 'description', 'rows[].title', 'rows[].href', 'footerLink.href'],
    id: 'database-hub-guide-links',
    page: 'Database Hub',
    progress: 'verified',
    readiness: 'Ready',
    reference: 'workspace_database_hub.html',
    section: 'Guide links',
  },
  healthRail: {
    apis: [{ contract: 'accepted', method: 'GET', path: '/api/v2/databases/panels/health' }],
    evidence:
      'React renders the accepted health panel payload with the current reference live-snapshot overview labels and item health messages; visual acceptance remains pending.',
    fieldsUsed: [
      'summary.total',
      'summary.healthy',
      'summary.degraded',
      'summary.unknown',
      'items[].name',
      'items[].health.label',
      'items[].health.message',
    ],
    id: 'database-hub-health-rail',
    page: 'Database Hub',
    progress: 'implemented',
    readiness: 'Ready',
    reference: 'workspace_database_hub.html',
    section: 'Health rail',
  },
  hero: {
    apis: [
      { contract: 'accepted', method: 'GET', path: '/api/v2/databases/stats' },
      { contract: 'accepted', method: 'GET', path: '/api/v2/databases/filters' },
      { contract: 'deferred', method: 'GET', path: '/api/v2/search?q=&types=projects,domains,...' },
    ],
    blockers: [
      'Missing accepted response contract for POST /api/v2/databases, so the create-database CTA remains disabled.',
      'Missing accepted response contract for shared global search, so cross-resource search remains deferred to the app shell/search work.',
    ],
    evidence:
      'Accepted user-provided stats and filters payloads support the contract-driven summary.',
    fieldsUsed: [
      'totalDatabases',
      'runningCount',
      'issueCount',
      'bindingCount',
      'totalQuotaBytes',
      'engines[].count',
      'statuses[].count',
    ],
    id: 'database-hub-hero',
    nextAction:
      'Provide create-database and shared search contracts before enabling those behaviors.',
    page: 'Database Hub',
    progress: 'implemented',
    readiness: 'Ready',
    reference: 'workspace_database_hub.html',
    section: 'Hero summary',
  },
  tips: {
    apis: [{ contract: 'accepted', method: 'GET', path: '/api/v2/panels/tips?surface=databases' }],
    evidence:
      'Focused Playwright target, broader visual suite, and project checks passed with the accepted tips payload.',
    fieldsUsed: ['title', 'description', 'rows[].title', 'rows[].meta', 'footerLink.href'],
    id: 'database-hub-tips',
    page: 'Database Hub',
    progress: 'verified',
    readiness: 'Ready',
    reference: 'workspace_database_hub.html',
    section: 'Database operation tips',
  },
} satisfies Record<string, SectionStatusInfo>;
