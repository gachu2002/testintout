import { useQuery } from '@tanstack/react-query';

import {
  getAppGalleryAppDetail,
  getAppGalleryApps,
  getAppGalleryCategories,
  getAppGalleryFeatured,
  getAppGalleryHero,
  getAppGalleryRelatedAi,
} from '@/features/app-gallery/api/appGalleryApi';

const appGalleryQueryKeys = {
  all: ['app-gallery'] as const,
  appDetail: (slug: string | null) => [...appGalleryQueryKeys.all, 'app-detail', slug] as const,
  apps: (limit: number, cursor: string) =>
    [...appGalleryQueryKeys.all, 'apps', limit, cursor] as const,
  categories: () => [...appGalleryQueryKeys.all, 'categories'] as const,
  featured: () => [...appGalleryQueryKeys.all, 'featured'] as const,
  hero: () => [...appGalleryQueryKeys.all, 'hero'] as const,
  relatedAi: () => [...appGalleryQueryKeys.all, 'related-ai'] as const,
};

export function useAppGalleryHeroQuery() {
  return useQuery({
    queryFn: getAppGalleryHero,
    queryKey: appGalleryQueryKeys.hero(),
  });
}

export function useAppGalleryCategoriesQuery() {
  return useQuery({
    queryFn: getAppGalleryCategories,
    queryKey: appGalleryQueryKeys.categories(),
  });
}

export function useAppGalleryFeaturedQuery() {
  return useQuery({
    queryFn: getAppGalleryFeatured,
    queryKey: appGalleryQueryKeys.featured(),
  });
}

export function useAppGalleryAppsQuery(limit = 6, cursor = '') {
  return useQuery({
    queryFn: () => getAppGalleryApps({ cursor, limit }),
    queryKey: appGalleryQueryKeys.apps(limit, cursor),
  });
}

export function useAppGalleryRelatedAiQuery() {
  return useQuery({
    queryFn: getAppGalleryRelatedAi,
    queryKey: appGalleryQueryKeys.relatedAi(),
  });
}

export function useAppGalleryAppDetailQuery(slug: string | null) {
  return useQuery({
    enabled: Boolean(slug),
    queryFn: () => getAppGalleryAppDetail(slug ?? ''),
    queryKey: appGalleryQueryKeys.appDetail(slug),
  });
}
