export type DomainHubStats = {
  connected: number;
  pending: number;
  review: number;
  total: number;
};

export type DomainStatus = 'connected' | 'pending' | 'review';

export type DomainCertificateStatus = 'expired' | 'issued' | 'none' | 'pending';

export type DomainConnectionStatus = 'connected' | 'none' | 'ready';

export type DomainHubFilters = {
  certificateStatuses: DomainCertificateStatus[];
  connectionStatuses: DomainConnectionStatus[];
  statuses: DomainStatus[];
};

export type DomainStatusFilter = 'all' | 'certificate' | DomainStatus;

export type DomainBoundProject = {
  id: string;
  name: string;
  type?: string;
};

export type DomainResource = {
  boundProject: DomainBoundProject | null;
  capabilities: {
    canBind: boolean;
    canDelete: boolean;
    canEdit: boolean;
    canOpen?: boolean;
  };
  certificate: {
    expiresAt: string | null;
    status: string;
  };
  connection: {
    status: string;
  };
  description: string;
  id: string;
  kind: string;
  name: string;
  status: string;
};

export type DomainCreateRequest = {
  url: string;
};

export type DomainCreateResponse = DomainResource;

export type DomainTipsPanelRow = {
  meta: string;
  title: string;
};

export type DomainTipsPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: 'tips_and_updates';
  label: string;
  rows: DomainTipsPanelRow[];
  surface: 'domains';
  title: string;
  type: 'tips';
};

export type DomainGuideLinksPanelRow = {
  href: string;
  meta: string;
  title: string;
};

export type DomainGuideLinksPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: 'menu_book';
  label: string;
  rows: DomainGuideLinksPanelRow[];
  surface: 'domains';
  title: string;
  type: 'guide-links';
};

export type DomainCertificatePanelItem = {
  count: number;
  status: DomainCertificateStatus;
};

export type DomainCertificatePanel = {
  items: DomainCertificatePanelItem[];
  total: number;
};

export type DomainCertificateDetail = {
  expiresAt: string | null;
  id: string;
  name: string;
  status: DomainCertificateStatus;
};

export type DomainConnectionPanelItem = {
  count: number;
  status: DomainConnectionStatus;
};

export type DomainConnectionPanel = {
  items: DomainConnectionPanelItem[];
  total: number;
};

export type DomainConnectionDetail = {
  boundProject: null;
  id: string;
  name: string;
  status: DomainConnectionStatus;
};
