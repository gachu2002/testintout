import { Stack } from '@mui/material';
import { useState } from 'react';

import { CardGrid, MainGrid } from '@/components/workspace';
import { QueryErrorAlerts } from '@/components/workspace/QueryErrorAlerts';
import { DatabaseCardsPanel } from '@/features/database-hub/components/DatabaseCardsPanel';
import { DatabaseGuideLinksPanel } from '@/features/database-hub/components/DatabaseGuideLinksPanel';
import { DatabaseHealthRail } from '@/features/database-hub/components/DatabaseHealthRail';
import { DatabaseHubFilterBar } from '@/features/database-hub/components/DatabaseHubFilterBar';
import { DatabaseHubHero } from '@/features/database-hub/components/DatabaseHubHero';
import { DatabaseTipsPanel } from '@/features/database-hub/components/DatabaseTipsPanel';
import {
  useDatabaseHealthPanelQuery,
  useDatabaseHubDatabasesQuery,
  useDatabaseHubFiltersQuery,
  useDatabaseHubGuideLinksQuery,
  useDatabaseHubStatsQuery,
  useDatabaseHubTipsQuery,
} from '@/features/database-hub/hooks/useDatabaseHubQueries';

export function DatabaseHubPageContent() {
  const [activeEngine, setActiveEngine] = useState('all');
  const databasesQuery = useDatabaseHubDatabasesQuery(12, '', '', '');
  const filtersQuery = useDatabaseHubFiltersQuery();
  const statsQuery = useDatabaseHubStatsQuery();
  const tipsQuery = useDatabaseHubTipsQuery();
  const guideLinksQuery = useDatabaseHubGuideLinksQuery();
  const healthPanelQuery = useDatabaseHealthPanelQuery();
  const databases = databasesQuery.data?.items ?? [];
  const visibleDatabases = databases.filter((database) => {
    if (activeEngine === 'all') return true;

    return database.engine === activeEngine;
  });

  return (
    <Stack spacing={2.5}>
      <DatabaseHubHero
        filters={filtersQuery.data}
        isLoading={statsQuery.isLoading || filtersQuery.isLoading}
        stats={statsQuery.data}
      />
      <DatabaseHubFilterBar
        activeEngine={activeEngine}
        filters={filtersQuery.data}
        isLoading={filtersQuery.isLoading}
        loadedCount={databases.length}
        onEngineChange={setActiveEngine}
        total={databasesQuery.data?.page.total}
      />
      <MainGrid>
        <Stack spacing={2.5}>
          <DatabaseCardsPanel
            activeEngine={activeEngine}
            databases={visibleDatabases}
            isLoading={databasesQuery.isLoading}
            loadedCount={databases.length}
            total={databasesQuery.data?.page.total}
          />
          <CardGrid collapseAt="md">
            <DatabaseTipsPanel isLoading={tipsQuery.isLoading} panel={tipsQuery.data} />
            <DatabaseGuideLinksPanel
              isLoading={guideLinksQuery.isLoading}
              panel={guideLinksQuery.data}
            />
          </CardGrid>
        </Stack>
        <Stack spacing={2.5}>
          <DatabaseHealthRail
            isLoading={healthPanelQuery.isLoading}
            panel={healthPanelQuery.data}
          />
        </Stack>
      </MainGrid>
      <QueryErrorAlerts
        alerts={[
          {
            isError: statsQuery.isError,
            message:
              'Database statistics could not be loaded. The page will show available data only.',
          },
          {
            isError: filtersQuery.isError,
            message:
              'Database filters could not be loaded. The page will show the default view only.',
          },
          {
            isError: databasesQuery.isError,
            message: 'Databases could not be loaded. Try refreshing the page.',
          },
          {
            isError: tipsQuery.isError,
            message: 'Database operation tips could not be loaded. Try refreshing the page.',
          },
          {
            isError: guideLinksQuery.isError,
            message: 'Database guide links could not be loaded. Try refreshing the page.',
          },
          {
            isError: healthPanelQuery.isError,
            message: 'Database health rail could not be loaded. Try refreshing the page.',
          },
        ]}
      />
    </Stack>
  );
}
