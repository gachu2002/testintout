export type DatabaseEndpoint = {
  host: string;
  port: number;
};

export type DatabaseUsage = {
  quotaBytes: number;
  storageLabel: string;
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

export type DatabaseHubStats = {
  bindingCount: number;
  issueCount: number;
  runningCount: number;
  totalDatabases: number;
  totalQuotaBytes: number;
  totalUsedBytes: number;
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
