import { Stack } from '@mui/material';
import { useState } from 'react';

import { CardGrid, MainGrid } from '@/components/workspace';
import { QueryErrorAlerts } from '@/components/workspace/QueryErrorAlerts';
import { DomainCardsPanel } from '@/features/domain-hub/components/DomainCardsPanel';
import { DomainCertificateRail } from '@/features/domain-hub/components/DomainCertificateRail';
import { DomainConnectionRail } from '@/features/domain-hub/components/DomainConnectionRail';
import { DomainGuideLinksPanel } from '@/features/domain-hub/components/DomainGuideLinksPanel';
import { DomainHubFilterBar } from '@/features/domain-hub/components/DomainHubFilterBar';
import { DomainHubHero } from '@/features/domain-hub/components/DomainHubHero';
import { DomainTipsPanel } from '@/features/domain-hub/components/DomainTipsPanel';
import {
  useDomainCertificateDetailQuery,
  useDomainCertificatePanelQuery,
  useDomainConnectionDetailQuery,
  useDomainConnectionPanelQuery,
  useDomainHubDomainsQuery,
  useDomainHubFiltersQuery,
  useDomainHubGuideLinksQuery,
  useDomainHubStatsQuery,
  useDomainHubTipsQuery,
} from '@/features/domain-hub/hooks/useDomainHubQueries';
import type { DomainStatusFilter } from '@/features/domain-hub/types';

export function DomainHubPageContent() {
  const [activeStatus, setActiveStatus] = useState<DomainStatusFilter>('all');
  const domainsQuery = useDomainHubDomainsQuery(6, '');
  const filtersQuery = useDomainHubFiltersQuery();
  const statsQuery = useDomainHubStatsQuery();
  const tipsQuery = useDomainHubTipsQuery();
  const guideLinksQuery = useDomainHubGuideLinksQuery();
  const certificatePanelQuery = useDomainCertificatePanelQuery();
  const domains = domainsQuery.data?.items ?? [];
  const railDomainId = domains[0]?.id ?? '';
  const certificateDetailQuery = useDomainCertificateDetailQuery(railDomainId);
  const connectionPanelQuery = useDomainConnectionPanelQuery();
  const connectionDetailQuery = useDomainConnectionDetailQuery(railDomainId);
  const visibleDomains = domains.filter((domain) => {
    if (activeStatus === 'all') return true;
    if (activeStatus === 'certificate') return domain.certificate.status !== 'none';

    return domain.status === activeStatus;
  });

  return (
    <Stack spacing={2.5}>
      <DomainHubHero isLoading={statsQuery.isLoading} stats={statsQuery.data} />
      <DomainHubFilterBar
        activeStatus={activeStatus}
        filters={filtersQuery.data}
        isLoading={filtersQuery.isLoading}
        onStatusChange={setActiveStatus}
      />
      <MainGrid>
        <Stack spacing={2.5}>
          <DomainCardsPanel
            activeStatus={activeStatus}
            domains={visibleDomains}
            isLoading={domainsQuery.isLoading}
            loadedCount={domains.length}
            total={domainsQuery.data?.page.total}
          />
          <CardGrid collapseAt="md">
            <DomainTipsPanel isLoading={tipsQuery.isLoading} panel={tipsQuery.data} />
            <DomainGuideLinksPanel
              isLoading={guideLinksQuery.isLoading}
              panel={guideLinksQuery.data}
            />
          </CardGrid>
        </Stack>
        <Stack spacing={2.5}>
          <DomainCertificateRail
            detail={certificateDetailQuery.data}
            isDetailLoading={certificateDetailQuery.isLoading}
            isPanelLoading={certificatePanelQuery.isLoading}
            panel={certificatePanelQuery.data}
          />
          <DomainConnectionRail
            detail={connectionDetailQuery.data}
            isDetailLoading={connectionDetailQuery.isLoading}
            isPanelLoading={connectionPanelQuery.isLoading}
            panel={connectionPanelQuery.data}
          />
        </Stack>
      </MainGrid>
      <QueryErrorAlerts
        alerts={[
          {
            isError: statsQuery.isError,
            message:
              'Domain statistics could not be loaded. The page will show available data only.',
          },
          {
            isError: filtersQuery.isError,
            message:
              'Domain filters could not be loaded. The page will show the default view only.',
          },
          {
            isError: domainsQuery.isError,
            message: 'Domains could not be loaded. Try refreshing the page in a moment.',
          },
          {
            isError: tipsQuery.isError,
            message: 'DNS operation tips could not be loaded. Try refreshing the page in a moment.',
          },
          {
            isError: guideLinksQuery.isError,
            message: 'Domain guide links could not be loaded. Try refreshing the page in a moment.',
          },
          {
            isError: certificatePanelQuery.isError || certificateDetailQuery.isError,
            message:
              'Domain certificate rail could not be loaded. Try refreshing the page in a moment.',
          },
          {
            isError: connectionPanelQuery.isError || connectionDetailQuery.isError,
            message:
              'Domain connection rail could not be loaded. Try refreshing the page in a moment.',
          },
        ]}
      />
    </Stack>
  );
}
