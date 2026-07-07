import type {
  DomainCertificateDetail,
  DomainCertificatePanel,
  DomainConnectionDetail,
  DomainConnectionPanel,
  DomainCreateRequest,
  DomainCreateResponse,
  DomainGuideLinksPanel,
  DomainHubFilters,
  DomainHubStats,
  DomainResource,
  DomainTipsPanel,
} from '@/features/domain-hub/types';
import { apiClient } from '@/lib/api/axios';
import type { ApiDataResponse, CursorParams, PaginatedResponse } from '@/lib/api/types';
import { unwrapApiData } from '@/lib/api/types';

export async function getDomainHubDomains(
  { cursor, limit, q, sort }: CursorParams = { cursor: '', limit: 8, sort: '' },
): Promise<PaginatedResponse<DomainResource>> {
  const response = await apiClient.get<PaginatedResponse<DomainResource>>('/v2/domains', {
    params: { cursor, limit, sort, ...(q ? { q } : {}) },
  });

  return response.data;
}

export async function createDomain(payload: DomainCreateRequest): Promise<DomainCreateResponse> {
  const response = await apiClient.post<ApiDataResponse<DomainCreateResponse>>(
    '/v2/domains',
    payload,
  );

  return unwrapApiData(response);
}

export async function getDomainHubStats(): Promise<DomainHubStats> {
  const response = await apiClient.get<ApiDataResponse<DomainHubStats>>('/v2/domains/stats');
  return unwrapApiData(response);
}

export async function getDomainHubFilters(): Promise<DomainHubFilters> {
  const response = await apiClient.get<ApiDataResponse<DomainHubFilters>>('/v2/domains/filters');
  return unwrapApiData(response);
}

export async function getDomainHubTipsPanel(): Promise<DomainTipsPanel> {
  const response = await apiClient.get<ApiDataResponse<DomainTipsPanel>>('/v2/panels/tips', {
    params: { surface: 'domains' },
  });

  return unwrapApiData(response);
}

export async function getDomainHubGuideLinksPanel(): Promise<DomainGuideLinksPanel> {
  const response = await apiClient.get<ApiDataResponse<DomainGuideLinksPanel>>(
    '/v2/panels/guide-links',
    {
      params: { surface: 'domains' },
    },
  );

  return unwrapApiData(response);
}

export async function getDomainCertificatePanel(): Promise<DomainCertificatePanel> {
  const response = await apiClient.get<ApiDataResponse<DomainCertificatePanel>>(
    '/v2/domains/panels/certificates',
  );

  return unwrapApiData(response);
}

export async function getDomainCertificateDetail(
  domainId: string,
): Promise<DomainCertificateDetail> {
  const response = await apiClient.get<ApiDataResponse<DomainCertificateDetail>>(
    `/v2/domains/${domainId}/certificate`,
  );

  return unwrapApiData(response);
}

export async function getDomainConnectionPanel(): Promise<DomainConnectionPanel> {
  const response = await apiClient.get<ApiDataResponse<DomainConnectionPanel>>(
    '/v2/domains/panels/connections',
  );

  return unwrapApiData(response);
}

export async function getDomainConnectionDetail(domainId: string): Promise<DomainConnectionDetail> {
  const response = await apiClient.get<ApiDataResponse<DomainConnectionDetail>>(
    `/v2/domains/${domainId}/connection`,
  );

  return unwrapApiData(response);
}
