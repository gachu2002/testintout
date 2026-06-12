export type AppGalleryHero = {
  primaryCta: {
    href: string;
    label: string;
  };
  stats: AppGalleryHeroStat[];
  subtitle: string;
  title: string;
};

export type AppGalleryHeroStat = {
  id: string;
  label: string;
  note: string;
  value: string;
};

export type AppGalleryCategory = {
  count: number;
  description: string;
  id: string;
  label: string;
};

export type AppGalleryCategories = {
  defaultCategory: string;
  items: AppGalleryCategory[];
};

export type AppGalleryCapabilities = {
  canInstall: boolean;
  canPreview: boolean;
};

export type AppGalleryApp = {
  capabilities: AppGalleryCapabilities;
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

export type AppGalleryFeaturedApp = AppGalleryApp & {
  badge: string;
};

export type AppGalleryRelatedAi = {
  category: string;
  href: string;
  slug: string;
  subtitle: string;
  tags: string[];
  title: string;
};

export type AppGalleryAppDetail = AppGalleryApp & {
  description: string;
  highlights: string[];
  install: {
    method: string;
    path: string;
    requiredFields: string[];
    targetType: string;
  };
  prerequisites: string[];
  relatedAi: AppGalleryRelatedAi[];
  useCases: string[];
};
