import { useQuery } from '@tanstack/react-query';

import {
  getDomainCertificateDetail,
  getDomainCertificatePanel,
  getDomainConnectionDetail,
  getDomainConnectionPanel,
  getDomainHubDomains,
  getDomainHubFilters,
  getDomainHubGuideLinksPanel,
  getDomainHubStats,
  getDomainHubTipsPanel,
} from '@/features/domain-hub/api/domainHubApi';

export const domainHubQueryKeys = {
  all: ['domain-hub'] as const,
  certificateDetail: (domainId: string) =>
    [...domainHubQueryKeys.all, 'certificate-detail', domainId] as const,
  certificatePanel: () => [...domainHubQueryKeys.all, 'certificate-panel'] as const,
  connectionDetail: (domainId: string) =>
    [...domainHubQueryKeys.all, 'connection-detail', domainId] as const,
  connectionPanel: () => [...domainHubQueryKeys.all, 'connection-panel'] as const,
  domains: (limit: number, cursor: string, q: string) =>
    [...domainHubQueryKeys.all, 'domains', limit, cursor, q] as const,
  filters: () => [...domainHubQueryKeys.all, 'filters'] as const,
  guideLinks: () => [...domainHubQueryKeys.all, 'guide-links', 'domains'] as const,
  stats: () => [...domainHubQueryKeys.all, 'stats'] as const,
  tips: () => [...domainHubQueryKeys.all, 'tips', 'domains'] as const,
};

export function useDomainHubDomainsQuery(limit = 6, cursor = '', q = '') {
  return useQuery({
    queryFn: () => getDomainHubDomains({ cursor, limit, q }),
    queryKey: domainHubQueryKeys.domains(limit, cursor, q),
  });
}

export function useDomainHubFiltersQuery() {
  return useQuery({
    queryFn: getDomainHubFilters,
    queryKey: domainHubQueryKeys.filters(),
  });
}

export function useDomainHubStatsQuery() {
  return useQuery({
    queryFn: getDomainHubStats,
    queryKey: domainHubQueryKeys.stats(),
  });
}

export function useDomainHubTipsQuery() {
  return useQuery({
    queryFn: getDomainHubTipsPanel,
    queryKey: domainHubQueryKeys.tips(),
  });
}

export function useDomainHubGuideLinksQuery() {
  return useQuery({
    queryFn: getDomainHubGuideLinksPanel,
    queryKey: domainHubQueryKeys.guideLinks(),
  });
}

export function useDomainCertificatePanelQuery() {
  return useQuery({
    queryFn: getDomainCertificatePanel,
    queryKey: domainHubQueryKeys.certificatePanel(),
  });
}

export function useDomainCertificateDetailQuery(domainId: string) {
  return useQuery({
    enabled: domainId.length > 0,
    queryFn: () => getDomainCertificateDetail(domainId),
    queryKey: domainHubQueryKeys.certificateDetail(domainId),
  });
}

export function useDomainConnectionPanelQuery() {
  return useQuery({
    queryFn: getDomainConnectionPanel,
    queryKey: domainHubQueryKeys.connectionPanel(),
  });
}

export function useDomainConnectionDetailQuery(domainId: string) {
  return useQuery({
    enabled: domainId.length > 0,
    queryFn: () => getDomainConnectionDetail(domainId),
    queryKey: domainHubQueryKeys.connectionDetail(domainId),
  });
}
