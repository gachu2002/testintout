import { useQuery } from '@tanstack/react-query';

import {
  getAiGallerySpotlight,
  getAnnouncements,
  getAppGalleryFeatured,
  getArticles,
  getBuckets,
  getConsoles,
  getDatabases,
  getDomains,
  getGuideLinks,
  getLaunchpadHero,
  getLaunchpadMyWork,
  getLaunchpadOverview,
  getLaunchpadResources,
  getMyJobs,
  getMyProjects,
  getNotifications,
  getStoreSpotlight,
} from '@/features/launchpad/api/launchpadApi';

export const launchpadQueryKeys = {
  all: ['launchpad'] as const,
  aiGallerySpotlight: () => [...launchpadQueryKeys.all, 'ai-gallery-spotlight'] as const,
  announcements: () => [...launchpadQueryKeys.all, 'announcements'] as const,
  appGalleryFeatured: () => [...launchpadQueryKeys.all, 'app-gallery-featured'] as const,
  articles: () => [...launchpadQueryKeys.all, 'articles'] as const,
  buckets: (limit: number, cursor: string) =>
    [...launchpadQueryKeys.all, 'buckets', limit, cursor] as const,
  consoles: (limit: number, cursor: string) =>
    [...launchpadQueryKeys.all, 'consoles', limit, cursor] as const,
  databases: (limit: number, cursor: string) =>
    [...launchpadQueryKeys.all, 'databases', limit, cursor] as const,
  domains: (limit: number, cursor: string) =>
    [...launchpadQueryKeys.all, 'domains', limit, cursor] as const,
  guideLinks: (surface: string) => [...launchpadQueryKeys.all, 'guide-links', surface] as const,
  hero: () => [...launchpadQueryKeys.all, 'hero'] as const,
  jobs: (limit: number, cursor: string) =>
    [...launchpadQueryKeys.all, 'jobs', limit, cursor] as const,
  notifications: (limit: number, cursor: string) =>
    [...launchpadQueryKeys.all, 'notifications', limit, cursor] as const,
  myWork: () => [...launchpadQueryKeys.all, 'my-work'] as const,
  overview: () => [...launchpadQueryKeys.all, 'overview'] as const,
  projects: (limit: number, cursor: string) =>
    [...launchpadQueryKeys.all, 'projects', limit, cursor] as const,
  resources: () => [...launchpadQueryKeys.all, 'resources'] as const,
  storeSpotlight: () => [...launchpadQueryKeys.all, 'store-spotlight'] as const,
};

export function useNotificationsQuery(limit = 6, cursor = '') {
  return useQuery({
    queryFn: () => getNotifications({ cursor, limit }),
    queryKey: launchpadQueryKeys.notifications(limit, cursor),
  });
}

export function useLaunchpadHeroQuery() {
  return useQuery({
    queryFn: getLaunchpadHero,
    queryKey: launchpadQueryKeys.hero(),
  });
}

export function useLaunchpadOverviewQuery() {
  return useQuery({
    queryFn: getLaunchpadOverview,
    queryKey: launchpadQueryKeys.overview(),
  });
}

export function useLaunchpadMyWorkQuery() {
  return useQuery({
    queryFn: getLaunchpadMyWork,
    queryKey: launchpadQueryKeys.myWork(),
  });
}

export function useLaunchpadResourcesQuery() {
  return useQuery({
    queryFn: getLaunchpadResources,
    queryKey: launchpadQueryKeys.resources(),
  });
}

export function useAnnouncementsQuery() {
  return useQuery({
    queryFn: getAnnouncements,
    queryKey: launchpadQueryKeys.announcements(),
  });
}

export function useArticlesQuery() {
  return useQuery({
    queryFn: getArticles,
    queryKey: launchpadQueryKeys.articles(),
  });
}

export function useGuideLinksQuery(surface = 'launchpad') {
  return useQuery({
    queryFn: () => getGuideLinks(surface),
    queryKey: launchpadQueryKeys.guideLinks(surface),
  });
}

export function useMyProjectsQuery(limit = 5, cursor = '') {
  return useQuery({
    queryFn: () => getMyProjects({ cursor, limit }),
    queryKey: launchpadQueryKeys.projects(limit, cursor),
  });
}

export function useMyJobsQuery(limit = 5, cursor = '') {
  return useQuery({
    queryFn: () => getMyJobs({ cursor, limit }),
    queryKey: launchpadQueryKeys.jobs(limit, cursor),
  });
}

export function useStoreSpotlightQuery() {
  return useQuery({
    queryFn: getStoreSpotlight,
    queryKey: launchpadQueryKeys.storeSpotlight(),
  });
}

export function useAppGalleryFeaturedQuery() {
  return useQuery({
    queryFn: getAppGalleryFeatured,
    queryKey: launchpadQueryKeys.appGalleryFeatured(),
  });
}

export function useAiGallerySpotlightQuery() {
  return useQuery({
    queryFn: getAiGallerySpotlight,
    queryKey: launchpadQueryKeys.aiGallerySpotlight(),
  });
}

export function useDatabasesQuery(limit = 6, cursor = '') {
  return useQuery({
    queryFn: () => getDatabases({ cursor, limit }),
    queryKey: launchpadQueryKeys.databases(limit, cursor),
  });
}

export function useBucketsQuery(limit = 5, cursor = '') {
  return useQuery({
    queryFn: () => getBuckets({ cursor, limit }),
    queryKey: launchpadQueryKeys.buckets(limit, cursor),
  });
}

export function useDomainsQuery(limit = 5, cursor = '') {
  return useQuery({
    queryFn: () => getDomains({ cursor, limit }),
    queryKey: launchpadQueryKeys.domains(limit, cursor),
  });
}

export function useConsolesQuery(limit = 5, cursor = '') {
  return useQuery({
    queryFn: () => getConsoles({ cursor, limit }),
    queryKey: launchpadQueryKeys.consoles(limit, cursor),
  });
}
