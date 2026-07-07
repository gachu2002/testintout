export type DatabaseEndpoint = {
  host: string | null;
  port: number | string | null;
};

export type DatabaseUsage = {
  quotaLabel?: string;
  quotaBytes: number;
  storageLabel: string;
  usedLabel?: string;
  usagePercent: number;
  usedBytes: number;
};

export type DatabasePrincipal = {
  displayName: string;
  email: string;
  sub: string;
  userId: string;
};

export type DatabaseHealth = {
  label: string;
  message: string;
  severity: string;
};

export type DatabaseCapabilities = {
  canDelete: boolean;
  canEdit: boolean;
  canManageBindings: boolean;
  canRestart: boolean;
};

export type DatabaseResource = {
  backup: string;
  bindingCount: number;
  capabilities: DatabaseCapabilities;
  collaborators: DatabasePrincipal[];
  createdAt: string;
  endpoint: DatabaseEndpoint | null;
  engine: string;
  health: DatabaseHealth;
  id: string;
  name: string;
  owner: DatabasePrincipal;
  status: string;
  summary: string;
  updatedAt: string;
  usage: DatabaseUsage;
  version: string | null;
};

export type DatabaseAccount = {
  host: string | null;
  password: string | null;
  port: number | string | null;
  uri: string | null;
  username: string | null;
};

export type DatabaseRuntimeTopology = {
  primaryMembers: number | null;
  replicaMembers: number | null;
  runningMembers: number | null;
  totalMembers: number | null;
};

export type DatabaseRuntime = {
  reason: string | null;
  storageSize: string | null;
  topology: DatabaseRuntimeTopology | null;
  usage: string | null;
};

export type DatabaseSnapshot = {
  id?: string;
  label?: string;
  name?: string;
  status?: string;
};

export type DatabaseSnapshots = {
  items: DatabaseSnapshot[];
  total: number;
};

export type DatabaseBinding = {
  description: string;
  id: string;
  label: string;
  targetId: string;
  targetName: string;
  targetType: string;
};

export type DatabaseBindingsPayload = {
  items: DatabaseBinding[];
};

export type DatabaseDetail = DatabaseResource & {
  account: DatabaseAccount | null;
  activity: Record<string, unknown> | null;
  bindings: DatabaseBinding[];
  runtime: DatabaseRuntime | null;
  snapshots: DatabaseSnapshots | null;
};

export type CreateDatabaseRequest = {
  engine: string;
  name: string;
  size: string;
};

export type DatabaseRestartJob = {
  action: string;
  jobId: string;
  resource: {
    id: string;
    type: string;
  };
  status: string;
};

export type DatabaseHubStats = {
  bindingCount: number;
  issueCount: number;
  runningCount: number;
  totalDatabases: number;
  totalQuotaBytes: number;
  totalUsedBytes: number;
  weeklyResourceViews?: number;
  weeklyViewCount?: number;
  weeklyViews?: number;
};

export type DatabaseFilterCount = {
  count: number;
  value: string;
};

export type DatabaseHubFilters = {
  backups: DatabaseFilterCount[];
  engines: DatabaseFilterCount[];
  statuses: DatabaseFilterCount[];
};

export type DatabaseTipsPanelRow = {
  meta: string;
  title: string;
};

export type DatabaseTipsPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: 'tips_and_updates';
  label: string;
  rows: DatabaseTipsPanelRow[];
  surface: 'databases';
  title: string;
  type: 'tips';
};

export type DatabaseGuideLinksPanelRow = {
  href: string;
  meta: string;
  title: string;
};

export type DatabaseGuideLinksPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: 'menu_book';
  label: string;
  rows: DatabaseGuideLinksPanelRow[];
  surface: 'databases';
  title: string;
  type: 'guide-links';
};

export type DatabaseHealthPanelItem = {
  bindingCount: number;
  engine: string;
  health: DatabaseHealth;
  id: string;
  name: string;
  status: string;
  updatedAt: string;
};

export type DatabaseHealthPanelSummary = {
  degraded: number;
  healthy: number;
  total: number;
  unknown: number;
};

export type DatabaseHealthPanel = {
  items: DatabaseHealthPanelItem[];
  summary: DatabaseHealthPanelSummary;
};
