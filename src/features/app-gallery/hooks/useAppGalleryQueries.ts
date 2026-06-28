import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getAppGalleryAppDetail,
  getAppGalleryApps,
  getAppGalleryCategories,
  getAppGalleryFeatured,
  getAppGalleryHero,
  getAppGalleryRelatedAi,
  installAppGalleryApp,
} from '@/features/app-gallery/api/appGalleryApi';
import type { AppGalleryAppsParams } from '@/features/app-gallery/types';

const appGalleryQueryKeys = {
  all: ['app-gallery'] as const,
  appDetail: (slug: string | null) => [...appGalleryQueryKeys.all, 'app-detail', slug] as const,
  apps: ({ category, cursor, limit, q }: Required<AppGalleryAppsParams>) =>
    [...appGalleryQueryKeys.all, 'apps', limit, cursor, q, category] as const,
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

export function useAppGalleryAppsQuery({
  category = '',
  cursor = '',
  limit = 6,
  q = '',
}: AppGalleryAppsParams = {}) {
  return useQuery({
    queryFn: () => getAppGalleryApps({ category, cursor, limit, q }),
    queryKey: appGalleryQueryKeys.apps({ category, cursor, limit, q }),
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

export function useAppGalleryInstallMutation() {
  return useMutation({
    mutationFn: installAppGalleryApp,
  });
}
