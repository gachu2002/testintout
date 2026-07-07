import { Stack } from '@mui/material';
import { useState } from 'react';

import { CardGrid, MainGrid } from '@/components/workspace';
import { QueryErrorAlerts } from '@/components/workspace/QueryErrorAlerts';
import { PermissionGuideLinksPanel } from '@/features/permission-hub/components/PermissionGuideLinksPanel';
import { PermissionHubFilterBar } from '@/features/permission-hub/components/PermissionHubFilterBar';
import { PermissionHubHero } from '@/features/permission-hub/components/PermissionHubHero';
import { PermissionRealmCardsPanel } from '@/features/permission-hub/components/PermissionRealmCardsPanel';
import { PermissionRealmCreateDialog } from '@/features/permission-hub/components/PermissionRealmCreateDialog';
import { PermissionRequestInboxRail } from '@/features/permission-hub/components/PermissionRequestInboxRail';
import { PermissionTipsPanel } from '@/features/permission-hub/components/PermissionTipsPanel';
import {
  usePermissionHubFiltersQuery,
  usePermissionHubGuideLinksQuery,
  usePermissionHubStatsQuery,
  usePermissionHubTipsQuery,
  usePermissionRealmsQuery,
  usePermissionRequestsQuery,
} from '@/features/permission-hub/hooks/usePermissionHubQueries';
import type { PermissionKindFilter, PermissionRealm } from '@/features/permission-hub/types';

export function PermissionHubPageContent() {
  const [activeKind, setActiveKind] = useState<PermissionKindFilter>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const realmsQuery = usePermissionRealmsQuery(100, '', '', '-updatedAt');
  const requestsQuery = usePermissionRequestsQuery(8, '', '-createdAt');
  const filtersQuery = usePermissionHubFiltersQuery();
  const statsQuery = usePermissionHubStatsQuery();
  const tipsQuery = usePermissionHubTipsQuery();
  const guideLinksQuery = usePermissionHubGuideLinksQuery();
  const realms = realmsQuery.data?.items ?? [];
  const visibleRealms = realms.filter((realm) => matchesRealmKind(realm, activeKind));

  return (
    <Stack spacing={2.5}>
      <PermissionHubHero
        filters={filtersQuery.data}
        isLoading={statsQuery.isLoading || filtersQuery.isLoading}
        onCreateClick={() => setIsCreateOpen(true)}
        stats={statsQuery.data}
      />
      <PermissionHubFilterBar
        activeKind={activeKind}
        filters={filtersQuery.data}
        isLoading={filtersQuery.isLoading}
        loadedCount={realms.length}
        onKindChange={setActiveKind}
        stats={statsQuery.data}
        total={realmsQuery.data?.page.total}
      />
      <MainGrid>
        <Stack spacing={2.5}>
          <PermissionRealmCardsPanel
            activeKind={activeKind}
            isLoading={realmsQuery.isLoading}
            loadedCount={realms.length}
            realms={visibleRealms}
            total={realmsQuery.data?.page.total}
          />
          <CardGrid collapseAt="md">
            <PermissionTipsPanel isLoading={tipsQuery.isLoading} panel={tipsQuery.data} />
            <PermissionGuideLinksPanel
              isLoading={guideLinksQuery.isLoading}
              panel={guideLinksQuery.data}
            />
          </CardGrid>
        </Stack>
        <Stack spacing={2.5}>
          <PermissionRequestInboxRail
            isLoading={requestsQuery.isLoading}
            requests={requestsQuery.data?.items ?? []}
          />
        </Stack>
      </MainGrid>
      <PermissionRealmCreateDialog
        existingRealmNames={realms.map((realm) => realm.name)}
        onClose={() => setIsCreateOpen(false)}
        open={isCreateOpen}
      />
      <QueryErrorAlerts
        alerts={[
          {
            isError: statsQuery.isError,
            message:
              'Permission statistics could not be loaded. The page will show available data only.',
          },
          {
            isError: filtersQuery.isError,
            message:
              'Permission filters could not be loaded. The page will show the default view only.',
          },
          {
            isError: realmsQuery.isError,
            message: 'Permission realms could not be loaded. Try refreshing the page in a moment.',
          },
          {
            isError: tipsQuery.isError,
            message:
              'Permission operation tips could not be loaded. Try refreshing the page in a moment.',
          },
          {
            isError: guideLinksQuery.isError,
            message:
              'Permission guide links could not be loaded. Try refreshing the page in a moment.',
          },
          {
            isError: requestsQuery.isError,
            message:
              'Permission request inbox could not be loaded. Try refreshing the page in a moment.',
          },
        ]}
      />
    </Stack>
  );
}

function matchesRealmKind(realm: PermissionRealm, activeKind: PermissionKindFilter) {
  if (activeKind === 'all') return true;

  return realm.kind === activeKind;
}
