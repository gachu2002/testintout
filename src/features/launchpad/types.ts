import type { CurrentUser, ServiceMenuGroup } from '@/features/app-shell/types';

export type Notification = {
  createdAt: string;
  decidedAt: string | null;
  direction: string;
  executedAt: string | null;
  id: string;
  isUnread: boolean;
  message: string;
  projectId: string | null;
  readAt: string | null;
  status: string;
  title: string;
  type: string;
  updatedAt: string;
};

export type HeroStat = {
  color: string;
  icon: string;
  key: string;
  label: string;
  note: string;
  value: string;
};

export type LaunchpadHero = {
  heroStats: HeroStat[];
  subtitle: string;
  title: string;
  userName: string;
  workspaceName: string;
};

export type Article = {
  category: string;
  categoryLabel: string;
  href: string;
  id: string;
  publishedAt: string;
  summary: string;
  title: string;
};

export type LaunchpadAnnouncement = {
  href: string;
  id: string;
  message: string;
  publishedAt: string;
  title: string;
  type: string;
};

export type LaunchpadBannerAction = {
  href: string;
  icon: string;
  label: string;
};

export type LaunchpadBannerSnapshotRow = {
  description: string;
  icon: string;
  title: string;
};

export type LaunchpadBanner = {
  chips: string[];
  created: string;
  endAt: string | null;
  eyebrow: string;
  eyebrowIcon: string;
  href: string;
  id: string;
  lastModified: string;
  message: string;
  name: string;
  pinned: boolean;
  primaryAction: LaunchpadBannerAction;
  priority: number;
  publishedAt: string | null;
  secondaryAction: LaunchpadBannerAction;
  showBackdrop: boolean;
  snapshotRows: LaunchpadBannerSnapshotRow[];
  snapshotTitle: string;
  startAt: string | null;
  status: string;
  theme: string;
  title: string;
  type: string;
  updatedAt?: string;
  visualIcon: string;
  visualMeta: string;
  visualMode: string;
  visualTitle: string;
};

export type ArticleTab = {
  id: string;
  label: string;
};

export type GuideLinksPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: string;
  label: string;
  rows: Array<{
    href: string;
    meta: string;
    title: string;
  }>;
  surface: string;
  title: string;
  type: string;
};

export type Project = {
  createdAt: string;
  description: string;
  gitlab: {
    connected: boolean;
    projectId: string | null;
  };
  id: string;
  ide: string;
  isFavorite: boolean;
  name: string;
  projectType: string;
  role: string;
  storage: string;
  updatedAt: string;
  visibility: string;
};

export type Job = {
  createdAt: string;
  error: Record<string, unknown> | string | null;
  id: string;
  progress: number | null;
  result: Record<string, unknown> | string | null;
  status: string;
  type: string;
  updatedAt: string;
};

export type ResourceOwner = {
  displayName: string;
  email: string;
  sub: string;
  userId: string | null;
};

export type DatabaseResource = {
  bindingCount: number;
  capabilities: Record<string, boolean>;
  collaborators: ResourceOwner[];
  createdAt: string;
  endpoint: { host: string; port: number } | null;
  engine: string;
  health: {
    label: string;
    message: string;
    severity: string;
  };
  id: string;
  name: string;
  owner: ResourceOwner;
  status: string;
  summary: string;
  updatedAt: string;
  usage: {
    quotaBytes: number;
    storageLabel: string;
    usagePercent: number | null;
    usedBytes: number;
  };
  version: string | null;
};

export type BucketResource = {
  boundProjectCount: number;
  browserUrl: string | null;
  capacity: {
    label: string;
    quotaBytes: number;
  };
  collaborators: ResourceOwner[];
  createdAt: string;
  id: string;
  name: string;
  openUrl: string | null;
  owner: ResourceOwner;
  status: string;
  type: string;
  updatedAt: string;
  usage: {
    label: string;
    quotaBytes: number;
    usagePercent: number | null;
    usedBytes: number;
  };
};

export type DomainResource = {
  boundProject: { id: string; name: string } | null;
  capabilities: Record<string, boolean>;
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

export type ConsoleResource = {
  bindingCount: number;
  bindings: Array<{ engine?: string; id: string; name: string }>;
  capabilities: Record<string, boolean>;
  collaborators: ResourceOwner[];
  createdAt: string;
  health: {
    label: string;
    message: string;
    severity: string;
  };
  icon: string | null;
  id: string;
  name: string;
  openUrl: string | null;
  owner: ResourceOwner;
  slug: string;
  status: string;
  statusLabel: string;
  summary: string;
  type: string;
  typeLabel: string;
  updatedAt: string;
};

export type StoreSpotlightItem = {
  description: string;
  href: string;
  id: string;
  title: string;
  type: string;
};

export type AppGalleryFeaturedItem = {
  badge: string;
  capabilities: {
    canInstall: boolean;
    canPreview: boolean;
  };
  category: string;
  categoryLabel: string;
  icon: string;
  iconColor: string;
  installTargetLabel: string;
  slug: string;
  subtitle: string;
  summary: string;
  tags: string[];
  title: string;
};

export type AiGallerySpotlight = {
  capabilities: {
    canInstall: boolean;
    canOpen: boolean;
    canOpenWeb?: boolean;
    canTryNow?: boolean;
  };
  category: string;
  chatbotTypeLabel?: string;
  iconColor: string;
  linkedChatbotCount?: number;
  linkedChatbots?: Array<{
    hasApi?: boolean;
    name: string;
    trialUrl?: string | null;
    type?: string;
    typeLabel?: string;
    webUrl?: string | null;
  }>;
  openUrl: string;
  provider: string;
  slug: string;
  status: string;
  statusLabel: string;
  subtitle: string;
  summary: string;
  tags: string[];
  title: string;
  toolCount: number;
  trialUrl?: string | null;
  updatedAt: string;
  webUrl?: string | null;
};

export type ArticlesResponseData = {
  items: Article[];
  tabs: ArticleTab[];
};

export type AnnouncementsResponseData = {
  items: LaunchpadAnnouncement[];
};

export type StoreSpotlightResponseData = {
  items: StoreSpotlightItem[];
};

export type AppGalleryFeaturedResponseData = {
  items: AppGalleryFeaturedItem[];
};

export type AiGallerySpotlightResponseData = AiGallerySpotlight;

export type LaunchpadOverview = {
  announcements: AnnouncementsResponseData;
  articles: ArticlesResponseData;
  banners: LaunchpadBanner[];
  guides: GuideLinksPanel;
  hero: LaunchpadHero;
  serviceMenu: {
    items: ServiceMenuGroup[];
  };
  storeSpotlight: StoreSpotlightResponseData & {
    aiSpotlight: AiGallerySpotlight;
    featuredApps: AppGalleryFeaturedItem[];
  };
};

export type LaunchpadCursorList<TItem> = {
  hasMore: boolean;
  items: TItem[];
  nextCursor: string | null;
  total: number;
};

export type LaunchpadMyWork = {
  ides: LaunchpadCursorList<unknown>;
  jobs: LaunchpadCursorList<Job>;
  notifications: LaunchpadCursorList<Notification>;
  projects: LaunchpadCursorList<Project>;
  summary: {
    ideCount: number;
    jobCount: number;
    projectCount: number;
    recentJobStatus: {
      failed: number;
      queued: number;
      running: number;
      total: number;
    };
    unreadNotificationCount: number;
  };
  user: CurrentUser;
};

export type LaunchpadResources = {
  buckets: {
    items: BucketResource[];
    summary: {
      boundProjectCount: number;
      totalBuckets: number;
      totalQuotaBytes: number;
      totalUsedBytes: number;
    };
  };
  consoles: {
    items: ConsoleResource[];
    summary: {
      bindingCount: number;
      issueCount: number;
      runningCount: number;
      stoppedCount: number;
      totalConsoles: number;
    };
  };
  databases: {
    items: DatabaseResource[];
    summary: {
      bindingCount: number;
      issueCount: number;
      runningCount: number;
      totalDatabases: number;
      totalQuotaBytes: number;
      totalUsedBytes: number;
    };
  };
  domains: {
    items: DomainResource[];
    summary: {
      connected: number;
      pending: number;
      review: number;
      total: number;
    };
  };
  summary: {
    attentionCount: number;
    totalBindings: number;
    totalResources: number;
  };
};
