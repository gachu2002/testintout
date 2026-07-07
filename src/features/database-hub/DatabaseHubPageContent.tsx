import { Stack } from '@mui/material';
import { useState } from 'react';

import { CardGrid, MainGrid } from '@/components/workspace';
import { QueryErrorAlerts } from '@/components/workspace/QueryErrorAlerts';
import { DatabaseCardsPanel } from '@/features/database-hub/components/DatabaseCardsPanel';
import { DatabaseCreateDialog } from '@/features/database-hub/components/DatabaseCreateDialog';
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

const DATABASE_FETCH_LIMIT = 100;

export function DatabaseHubPageContent() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [createOpen, setCreateOpen] = useState(false);
  const databasesQuery = useDatabaseHubDatabasesQuery(DATABASE_FETCH_LIMIT, '', '', '');
  const filtersQuery = useDatabaseHubFiltersQuery();
  const statsQuery = useDatabaseHubStatsQuery();
  const tipsQuery = useDatabaseHubTipsQuery();
  const guideLinksQuery = useDatabaseHubGuideLinksQuery();
  const healthPanelQuery = useDatabaseHealthPanelQuery();
  const databases = databasesQuery.data?.items ?? [];
  const sortedDatabases = databases.slice().sort((left, right) => {
    const leftTime = new Date(left.createdAt || left.updatedAt || 0).getTime();
    const rightTime = new Date(right.createdAt || right.updatedAt || 0).getTime();

    return rightTime - leftTime;
  });
  const visibleDatabases = sortedDatabases.filter((database) => {
    if (activeCategory === 'all') return true;

    return getDatabaseEngineCategory(database.engine) === activeCategory;
  });

  return (
    <Stack spacing={2.5}>
      <DatabaseHubHero
        healthPanel={healthPanelQuery.data}
        isLoading={statsQuery.isLoading || filtersQuery.isLoading || healthPanelQuery.isLoading}
        onCreateClick={() => setCreateOpen(true)}
        stats={statsQuery.data}
      />
      <DatabaseHubFilterBar
        activeCategory={activeCategory}
        filters={filtersQuery.data}
        isLoading={filtersQuery.isLoading}
        loadedCount={databases.length}
        onCategoryChange={setActiveCategory}
        total={databasesQuery.data?.page.total}
      />
      <MainGrid>
        <Stack spacing={2.5}>
          <DatabaseCardsPanel
            activeCategory={activeCategory}
            databases={visibleDatabases}
            isLoading={databasesQuery.isLoading}
            loadedCount={sortedDatabases.length}
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
      <DatabaseCreateDialog onClose={() => setCreateOpen(false)} open={createOpen} />
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

function getDatabaseEngineCategory(engine: string) {
  if (engine === 'mysql' || engine === 'postgres') return 'relational';
  if (engine === 'mongo') return 'document';
  if (engine === 'redis') return 'cache';
  if (engine === 'elastic') return 'search';
  if (engine === 'milvus') return 'vector';

  return 'unknown';
}
