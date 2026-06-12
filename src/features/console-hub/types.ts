export type ConsolePrincipal = {
  displayName: string;
  email: string;
  sub: string;
  userId: string;
};

export type ConsoleBinding = {
  engine: string;
  id: string;
  name: string;
};

export type ConsoleHealth = {
  label: string;
  message: string;
  severity: string;
};

export type ConsoleCapabilities = {
  canDelete: boolean;
  canManageBindings: boolean;
  canOpen: boolean;
  canStart: boolean;
  canStop: boolean;
};

export type ConsoleResource = {
  bindingCount: number;
  bindings: ConsoleBinding[];
  capabilities: ConsoleCapabilities;
  collaborators: ConsolePrincipal[];
  createdAt: string;
  health: ConsoleHealth;
  icon: string | null;
  id: string;
  name: string;
  openUrl: string;
  owner: ConsolePrincipal;
  slug: string;
  status: string;
  statusLabel: string;
  summary: string;
  type: string;
  typeLabel: string;
  updatedAt: string;
};

export type ConsoleHubStats = {
  bindingCount: number;
  issueCount: number;
  runningCount: number;
  stoppedCount: number;
  totalConsoles: number;
};

export type ConsoleFilterCount = {
  count: number;
  label: string;
  value: string;
};

export type ConsoleHubFilters = {
  statuses: ConsoleFilterCount[];
  types: ConsoleFilterCount[];
};

export type ConsoleTipsPanelRow = {
  meta: string;
  title: string;
};

export type ConsoleTipsPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: 'tips_and_updates';
  label: string;
  rows: ConsoleTipsPanelRow[];
  surface: 'consoles';
  title: string;
  type: 'tips';
};

export type ConsoleGuideLinksPanelRow = {
  href: string;
  meta: string;
  title: string;
};

export type ConsoleGuideLinksPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: 'menu_book';
  label: string;
  rows: ConsoleGuideLinksPanelRow[];
  surface: 'consoles';
  title: string;
  type: 'guide-links';
};

export type ConsoleHealthPanelPill = {
  label: string;
  tone: string;
};

export type ConsoleHealthPanelRow = {
  id: string;
  meta: string;
  pill: ConsoleHealthPanelPill;
  title: string;
};

export type ConsoleHealthPanelSummary = {
  error: number;
  running: number;
  stopped: number;
  total: number;
};

export type ConsoleHealthPanel = {
  id: string;
  label: string;
  rows: ConsoleHealthPanelRow[];
  summary: ConsoleHealthPanelSummary;
  title: string;
};
