export type AgentPrincipal = {
  id: string;
  name: string;
};

export type AgentRuntime = {
  ide: string;
  provider: string;
  status: string;
  statusLabel: string;
  url: string;
};

export type AgentModel = {
  items: unknown[];
  primary: string;
};

export type AgentWorkflow = {
  stepCount: number;
  steps: unknown[];
};

export type AgentApproval = {
  checkpoints: unknown[];
  mode: string | null;
  required: boolean;
};

export type AgentAuth = {
  mode: string;
  scopes: string[];
};

export type AgentCapabilities = {
  canOpen: boolean;
};

export type AgentResource = {
  approval: AgentApproval;
  approvalMode: string | null;
  auth: AgentAuth;
  authMode: string;
  authors: AgentPrincipal[];
  capabilities: AgentCapabilities;
  icon: string | null;
  id: string;
  model: AgentModel;
  name: string;
  openUrl: string;
  owner: AgentPrincipal;
  runtime: AgentRuntime;
  slug: string;
  status: string;
  statusLabel: string;
  summary: string;
  toolCount: number;
  toolInventoryRefs: unknown[];
  triggerChannel: string | null;
  type: string;
  typeLabel: string;
  workflow: AgentWorkflow;
};

export type AgentStatsCard = {
  id: string;
  label: string;
  note: string;
  value: number;
};

export type AgentHubStats = {
  cards: AgentStatsCard[];
};

export type AgentFilterCount = {
  count: number;
  id: string;
  label: string;
};

export type AgentHubFilters = {
  statuses: AgentFilterCount[];
  types: AgentFilterCount[];
};

export type AgentTipsPanelRow = {
  meta: string;
  title: string;
};

export type AgentTipsPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: 'tips_and_updates';
  label: string;
  rows: AgentTipsPanelRow[];
  surface: 'agents';
  title: string;
  type: 'tips';
};

export type AgentGuideLinksPanelRow = {
  href: string;
  meta: string;
  title: string;
};

export type AgentGuideLinksPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: 'menu_book';
  label: string;
  rows: AgentGuideLinksPanelRow[];
  surface: 'agents';
  title: string;
  type: 'guide-links';
};

export type AgentModelPanelRow = {
  description: string;
  id: string;
  meta: string;
  title: string;
};

export type AgentModelPanel = {
  description: string;
  id: string;
  label: string;
  rows: AgentModelPanelRow[];
  title: string;
};

export type AgentRuntimePanelPill = {
  label: string;
  tone: string;
};

export type AgentRuntimePanelRow = {
  id: string;
  meta: string;
  pill: AgentRuntimePanelPill;
  title: string;
};

export type AgentRuntimeStatusPanel = {
  description: string;
  id: string;
  label: string;
  rows: AgentRuntimePanelRow[];
  title: string;
};

export type AgentFilterState = {
  status: string;
  type: string;
};
