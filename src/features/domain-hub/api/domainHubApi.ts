import type {
  DomainCertificateDetail,
  DomainCertificatePanel,
  DomainConnectionDetail,
  DomainConnectionPanel,
  DomainGuideLinksPanel,
  DomainHubFilters,
  DomainHubStats,
  DomainResource,
  DomainTipsPanel,
} from '@/features/domain-hub/types';
import { apiClient } from '@/lib/api/axios';
import type { ApiDataResponse, PaginatedResponse } from '@/lib/api/types';

type CursorParams = {
  cursor: string;
  limit: number;
  q?: string;
};

export async function getDomainHubDomains(
  { cursor, limit, q }: CursorParams = { cursor: '', limit: 6 },
): Promise<PaginatedResponse<DomainResource>> {
  const response = await apiClient.get<PaginatedResponse<DomainResource>>('/v2/domains', {
    params: { cursor, limit, ...(q ? { q } : {}) },
  });

  return response.data;
}

export async function getDomainHubStats(): Promise<DomainHubStats> {
  const response = await apiClient.get<ApiDataResponse<DomainHubStats>>('/v2/domains/stats');
  return response.data.data;
}

export async function getDomainHubFilters(): Promise<DomainHubFilters> {
  const response = await apiClient.get<ApiDataResponse<DomainHubFilters>>('/v2/domains/filters');
  return response.data.data;
}

export async function getDomainHubTipsPanel(): Promise<DomainTipsPanel> {
  const response = await apiClient.get<ApiDataResponse<DomainTipsPanel>>('/v2/panels/tips', {
    params: { surface: 'domains' },
  });

  return response.data.data;
}

export async function getDomainHubGuideLinksPanel(): Promise<DomainGuideLinksPanel> {
  const response = await apiClient.get<ApiDataResponse<DomainGuideLinksPanel>>(
    '/v2/panels/guide-links',
    {
      params: { surface: 'domains' },
    },
  );

  return response.data.data;
}

export async function getDomainCertificatePanel(): Promise<DomainCertificatePanel> {
  const response = await apiClient.get<ApiDataResponse<DomainCertificatePanel>>(
    '/v2/domains/panels/certificates',
  );

  return response.data.data;
}

export async function getDomainCertificateDetail(
  domainId: string,
): Promise<DomainCertificateDetail> {
  const response = await apiClient.get<ApiDataResponse<DomainCertificateDetail>>(
    `/v2/domains/${domainId}/certificate`,
  );

  return response.data.data;
}

export async function getDomainConnectionPanel(): Promise<DomainConnectionPanel> {
  const response = await apiClient.get<ApiDataResponse<DomainConnectionPanel>>(
    '/v2/domains/panels/connections',
  );

  return response.data.data;
}

export async function getDomainConnectionDetail(domainId: string): Promise<DomainConnectionDetail> {
  const response = await apiClient.get<ApiDataResponse<DomainConnectionDetail>>(
    `/v2/domains/${domainId}/connection`,
  );

  return response.data.data;
}
