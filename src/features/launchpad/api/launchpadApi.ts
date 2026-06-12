import type {
  AiGallerySpotlight,
  AiGallerySpotlightResponseData,
  AnnouncementsResponseData,
  AppGalleryFeaturedItem,
  AppGalleryFeaturedResponseData,
  Article,
  ArticlesResponseData,
  ArticleTab,
  BucketResource,
  ConsoleResource,
  DatabaseResource,
  DomainResource,
  GuideLinksPanel,
  Job,
  LaunchpadAnnouncement,
  LaunchpadHero,
  LaunchpadMyWork,
  LaunchpadOverview,
  LaunchpadResources,
  Notification,
  Project,
  StoreSpotlightResponseData,
} from '@/features/launchpad/types';
import { apiClient } from '@/lib/api/axios';
import type { ApiDataResponse, PaginatedResponse } from '@/lib/api/types';

type CursorParams = {
  cursor: string;
  limit: number;
};

export async function getNotifications(
  { cursor, limit }: CursorParams = {
    cursor: '',
    limit: 6,
  },
): Promise<PaginatedResponse<Notification>> {
  const response = await apiClient.get<PaginatedResponse<Notification>>('/v2/me/notifications', {
    params: { cursor, limit },
  });

  return response.data;
}

export async function getLaunchpadHero(): Promise<LaunchpadHero> {
  const response = await apiClient.get<ApiDataResponse<LaunchpadHero>>('/v2/launchpad/hero');
  return response.data.data;
}

export async function getLaunchpadOverview(): Promise<LaunchpadOverview> {
  const response =
    await apiClient.get<ApiDataResponse<LaunchpadOverview>>('/v2/launchpad/overview');

  return response.data.data;
}

export async function getLaunchpadMyWork(): Promise<LaunchpadMyWork> {
  const response = await apiClient.get<ApiDataResponse<LaunchpadMyWork>>('/v2/launchpad/my-work');

  return response.data.data;
}

export async function getLaunchpadResources(): Promise<LaunchpadResources> {
  const response =
    await apiClient.get<ApiDataResponse<LaunchpadResources>>('/v2/launchpad/resources');

  return response.data.data;
}

export async function getAnnouncements(): Promise<LaunchpadAnnouncement[]> {
  const response = await apiClient.get<ApiDataResponse<AnnouncementsResponseData>>(
    '/v2/launchpad/announcements',
  );
  return response.data.data.items;
}

export async function getArticles(): Promise<{ items: Article[]; tabs: ArticleTab[] }> {
  const response =
    await apiClient.get<ApiDataResponse<ArticlesResponseData>>('/v2/launchpad/articles');
  return response.data.data;
}

export async function getGuideLinks(surface = 'launchpad'): Promise<GuideLinksPanel> {
  const response = await apiClient.get<ApiDataResponse<GuideLinksPanel>>('/v2/panels/guide-links', {
    params: { surface },
  });

  return response.data.data;
}

export async function getMyProjects(
  { cursor, limit }: CursorParams = {
    cursor: '',
    limit: 5,
  },
): Promise<PaginatedResponse<Project>> {
  const response = await apiClient.get<PaginatedResponse<Project>>('/v2/me/projects', {
    params: { cursor, limit },
  });

  return response.data;
}

export async function getMyJobs(
  { cursor, limit }: CursorParams = { cursor: '', limit: 5 },
): Promise<PaginatedResponse<Job>> {
  const response = await apiClient.get<PaginatedResponse<Job>>('/v2/jobs', {
    params: { cursor, limit, owner: 'me' },
  });

  return response.data;
}

export async function getStoreSpotlight(): Promise<StoreSpotlightResponseData['items']> {
  const response = await apiClient.get<ApiDataResponse<StoreSpotlightResponseData>>(
    '/v2/launchpad/store-spotlight',
  );
  return response.data.data.items;
}

export async function getAppGalleryFeatured(): Promise<AppGalleryFeaturedItem[]> {
  const response = await apiClient.get<ApiDataResponse<AppGalleryFeaturedResponseData>>(
    '/v2/app-gallery/featured',
  );
  return response.data.data.items;
}

export async function getAiGallerySpotlight(): Promise<AiGallerySpotlight> {
  const response = await apiClient.get<ApiDataResponse<AiGallerySpotlightResponseData>>(
    '/v2/ai-gallery/spotlight',
  );
  return response.data.data;
}

export async function getDatabases(
  { cursor, limit }: CursorParams = { cursor: '', limit: 6 },
): Promise<PaginatedResponse<DatabaseResource>> {
  const response = await apiClient.get<PaginatedResponse<DatabaseResource>>('/v2/databases', {
    params: { cursor, limit },
  });

  return response.data;
}

export async function getBuckets(
  { cursor, limit }: CursorParams = { cursor: '', limit: 5 },
): Promise<PaginatedResponse<BucketResource>> {
  const response = await apiClient.get<PaginatedResponse<BucketResource>>('/v2/buckets', {
    params: { cursor, limit },
  });

  return response.data;
}

export async function getDomains(
  { cursor, limit }: CursorParams = { cursor: '', limit: 5 },
): Promise<PaginatedResponse<DomainResource>> {
  const response = await apiClient.get<PaginatedResponse<DomainResource>>('/v2/domains', {
    params: { cursor, limit },
  });

  return response.data;
}

export async function getConsoles(
  { cursor, limit }: CursorParams = { cursor: '', limit: 5 },
): Promise<PaginatedResponse<ConsoleResource>> {
  const response = await apiClient.get<PaginatedResponse<ConsoleResource>>('/v2/consoles', {
    params: { cursor, limit },
  });

  return response.data;
}
