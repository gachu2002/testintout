import { Stack } from '@mui/material';
import { useState } from 'react';

import { CardGrid, MainGrid } from '@/components/workspace';
import { QueryErrorAlerts } from '@/components/workspace/QueryErrorAlerts';
import { ConsoleCardsPanel } from '@/features/console-hub/components/ConsoleCardsPanel';
import { ConsoleGuideLinksPanel } from '@/features/console-hub/components/ConsoleGuideLinksPanel';
import { ConsoleHealthRail } from '@/features/console-hub/components/ConsoleHealthRail';
import { ConsoleHubFilterBar } from '@/features/console-hub/components/ConsoleHubFilterBar';
import { ConsoleHubHero } from '@/features/console-hub/components/ConsoleHubHero';
import { ConsoleTipsPanel } from '@/features/console-hub/components/ConsoleTipsPanel';
import {
  useConsoleHealthPanelQuery,
  useConsoleHubConsolesQuery,
  useConsoleHubFiltersQuery,
  useConsoleHubGuideLinksQuery,
  useConsoleHubStatsQuery,
  useConsoleHubTipsQuery,
} from '@/features/console-hub/hooks/useConsoleHubQueries';

export function ConsoleHubPageContent() {
  const [activeType, setActiveType] = useState('all');
  const consolesQuery = useConsoleHubConsolesQuery(12, '', '', '');
  const filtersQuery = useConsoleHubFiltersQuery();
  const statsQuery = useConsoleHubStatsQuery();
  const tipsQuery = useConsoleHubTipsQuery();
  const guideLinksQuery = useConsoleHubGuideLinksQuery();
  const healthPanelQuery = useConsoleHealthPanelQuery();
  const consoles = consolesQuery.data?.items ?? [];
  const visibleConsoles = consoles.filter((consoleItem) => {
    if (activeType === 'all') return true;

    return consoleItem.type === activeType;
  });

  return (
    <Stack spacing={2.5}>
      <ConsoleHubHero
        filters={filtersQuery.data}
        isLoading={statsQuery.isLoading || filtersQuery.isLoading}
        stats={statsQuery.data}
      />
      <ConsoleHubFilterBar
        activeType={activeType}
        filters={filtersQuery.data}
        isLoading={filtersQuery.isLoading}
        loadedCount={consoles.length}
        onTypeChange={setActiveType}
        total={consolesQuery.data?.page.total}
      />
      <MainGrid>
        <Stack spacing={2.5}>
          <ConsoleCardsPanel
            activeType={activeType}
            consoles={visibleConsoles}
            isLoading={consolesQuery.isLoading}
            loadedCount={consoles.length}
            total={consolesQuery.data?.page.total}
          />
          <CardGrid collapseAt="md">
            <ConsoleTipsPanel isLoading={tipsQuery.isLoading} panel={tipsQuery.data} />
            <ConsoleGuideLinksPanel
              isLoading={guideLinksQuery.isLoading}
              panel={guideLinksQuery.data}
            />
          </CardGrid>
        </Stack>
        <Stack spacing={2.5}>
          <ConsoleHealthRail isLoading={healthPanelQuery.isLoading} panel={healthPanelQuery.data} />
        </Stack>
      </MainGrid>
      <QueryErrorAlerts
        alerts={[
          {
            isError: statsQuery.isError,
            message:
              'Console statistics could not be loaded. The page will show available data only.',
          },
          {
            isError: filtersQuery.isError,
            message:
              'Console filters could not be loaded. The page will show the default view only.',
          },
          {
            isError: consolesQuery.isError,
            message: 'Consoles could not be loaded. Try refreshing the page.',
          },
          {
            isError: tipsQuery.isError,
            message: 'Console operation tips could not be loaded. Try refreshing the page.',
          },
          {
            isError: guideLinksQuery.isError,
            message: 'Console guide links could not be loaded. Try refreshing the page.',
          },
          {
            isError: healthPanelQuery.isError,
            message: 'Console health rail could not be loaded. Try refreshing the page.',
          },
        ]}
      />
    </Stack>
  );
}
