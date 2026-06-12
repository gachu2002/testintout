import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { SectionStatusBadge } from '@/components/reference-status';
import { CardGrid, Panel } from '@/components/workspace';
import { QueryErrorAlerts } from '@/components/workspace/QueryErrorAlerts';
import { PermissionGuideLinksPanel } from '@/features/permission-hub/components/PermissionGuideLinksPanel';
import { PermissionHubFilterBar } from '@/features/permission-hub/components/PermissionHubFilterBar';
import { PermissionHubHero } from '@/features/permission-hub/components/PermissionHubHero';
import { PermissionTipsPanel } from '@/features/permission-hub/components/PermissionTipsPanel';
import {
  usePermissionHubFiltersQuery,
  usePermissionHubGuideLinksQuery,
  usePermissionHubStatsQuery,
  usePermissionHubTipsQuery,
  usePermissionRealmsQuery,
} from '@/features/permission-hub/hooks/usePermissionHubQueries';
import { permissionHubSectionStatus } from '@/features/permission-hub/sectionStatus';
import type { PermissionKindFilter } from '@/features/permission-hub/types';

export function PermissionHubPageContent() {
  const [activeKind, setActiveKind] = useState<PermissionKindFilter>('all');
  const realmsQuery = usePermissionRealmsQuery(6, '', '', '');
  const filtersQuery = usePermissionHubFiltersQuery();
  const statsQuery = usePermissionHubStatsQuery();
  const tipsQuery = usePermissionHubTipsQuery();
  const guideLinksQuery = usePermissionHubGuideLinksQuery();

  return (
    <Stack spacing={2.5}>
      <PermissionHubHero
        filters={filtersQuery.data}
        isLoading={statsQuery.isLoading || filtersQuery.isLoading}
        stats={statsQuery.data}
      />
      <PermissionHubFilterBar
        activeKind={activeKind}
        filters={filtersQuery.data}
        isLoading={filtersQuery.isLoading}
        loadedCount={realmsQuery.data?.items.length ?? 0}
        onKindChange={setActiveKind}
        stats={statsQuery.data}
        total={realmsQuery.data?.page.total}
      />
      <CardGrid collapseAt="md">
        <PermissionTipsPanel isLoading={tipsQuery.isLoading} panel={tipsQuery.data} />
        <PermissionGuideLinksPanel
          isLoading={guideLinksQuery.isLoading}
          panel={guideLinksQuery.data}
        />
      </CardGrid>
      <BlockedSectionsNotice />
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
        ]}
      />
    </Stack>
  );
}

function BlockedSectionsNotice() {
  return (
    <Panel hub="permissions" kind="soft">
      <Stack direction="row" spacing={1.25}>
        <InfoOutlinedIcon color="disabled" sx={{ fontSize: 18, mt: 0.25 }} />
        <Stack spacing={0.5}>
          <Typography fontSize={13} fontWeight={800}>
            Realm cards and request inbox are waiting on API contracts.
            <SectionStatusBadge status={permissionHubSectionStatus.blockedSections} />
          </Typography>
          <Typography color="text.secondary" fontSize={12} lineHeight={1.7}>
            This route currently implements the accepted Permission Hub hero summary, filter, tips,
            and guide-link contracts. Remaining dynamic sections stay blocked until their response
            shapes are accepted.
          </Typography>
        </Stack>
      </Stack>
    </Panel>
  );
}
