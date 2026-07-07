export type PermissionRealmKind = 'platform' | 'project' | 'resource' | 'scoped';

export type PermissionRealmStatus = 'active' | 'review';

export type PermissionFilterCount<TValue extends string> = {
  count: number;
  value: TValue;
};

export type PermissionHubStats = {
  boundProjectCount: number;
  manageableRealms: number;
  pendingRequests: number;
  totalMembers: number;
  totalRealms: number;
};

export type PermissionHubFilters = {
  kinds: PermissionFilterCount<PermissionRealmKind>[];
  statuses: PermissionFilterCount<PermissionRealmStatus>[];
};

export type PermissionKindFilter = 'all' | PermissionRealmKind;

export type PermissionRealm = {
  access: {
    accessLevel: string;
    canInspectBindings: boolean;
    canInspectGroups: boolean;
    canInspectMembers: boolean;
    canManage: boolean;
    canRequest: boolean;
    currentUserRoles: string[];
    isOwner: boolean;
    isSystemAdmin: boolean;
    visibilitySource: string;
  };
  boundProjects: {
    id: string;
    kind: string;
    label: string;
    role: string | null;
  }[];
  capabilities: {
    canApprove: boolean;
    canBind: boolean;
    canDelete: boolean;
    canEdit: boolean;
    canRequest: boolean;
  };
  currentUserRoles: string[];
  description: string;
  id: string;
  kind: PermissionRealmKind;
  memberCount: number;
  name: string;
  projectCount: number;
  roles: {
    memberCount: number;
    name: string;
  }[];
  status: PermissionRealmStatus;
  updatedAt: string;
};

export type PermissionTipsPanelRow = {
  meta: string;
  title: string;
};

export type PermissionTipsPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: 'tips_and_updates';
  label: string;
  rows: PermissionTipsPanelRow[];
  surface: 'permissions';
  title: string;
  type: 'tips';
};

export type PermissionGuideLinksPanelRow = {
  href: string;
  meta: string;
  title: string;
};

export type PermissionGuideLinksPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: 'menu_book';
  label: string;
  rows: PermissionGuideLinksPanelRow[];
  surface: 'permissions';
  title: string;
  type: 'guide-links';
};
