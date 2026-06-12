export type BucketCapacity = {
  label: string;
  quotaBytes: number;
};

export type BucketUsage = {
  label: string;
  quotaBytes: number;
  usagePercent: number | null;
  usedBytes: number;
};

export type BucketUser = {
  displayName: string;
  email: string;
  sub: string;
  userId: string;
};

export type BucketResource = {
  boundProjectCount: number;
  browserUrl: string | null;
  capacity: BucketCapacity;
  collaborators: BucketUser[];
  createdAt: string;
  id: string;
  name: string;
  openUrl: string;
  owner: BucketUser;
  status: string;
  type: string;
  updatedAt: string;
  usage: BucketUsage;
};

export type BucketHubStats = {
  boundProjectCount: number;
  totalBuckets: number;
  totalQuotaBytes: number;
  totalUsedBytes: number;
};

export type BucketFilterCount = {
  count: number;
  value: string;
};

export type BucketHubFilters = {
  statuses: BucketFilterCount[];
  types: BucketFilterCount[];
};

export type BucketFilterValue = string;

export type BucketTipsPanelRow = {
  meta: string;
  title: string;
};

export type BucketTipsPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: 'tips_and_updates';
  label: string;
  rows: BucketTipsPanelRow[];
  surface: 'buckets';
  title: string;
  type: 'tips';
};

export type BucketGuideLinksPanelRow = {
  href: string;
  meta: string;
  title: string;
};

export type BucketGuideLinksPanel = {
  description: string;
  footerLink: {
    href: string;
    label: string;
  };
  icon: 'menu_book';
  label: string;
  rows: BucketGuideLinksPanelRow[];
  surface: 'buckets';
  title: string;
  type: 'guide-links';
};

export type BucketUsagePanelItem = {
  id: string;
  name: string;
  quotaBytes: number;
  usagePercent: number;
  usedBytes: number;
};

export type BucketUsagePanel = {
  items: BucketUsagePanelItem[];
  summary: {
    quotaBytes: number;
    usedBytes: number;
  };
};
