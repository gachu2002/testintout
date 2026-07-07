import { Box, Stack } from '@mui/material';
import { useState } from 'react';

import { QueryErrorAlerts } from '@/components/workspace/QueryErrorAlerts';
import { ArticlesPanel } from '@/features/launchpad/components/ArticlesPanel';
import { BannerPanel } from '@/features/launchpad/components/BannerPanel';
import { GuidesPanel } from '@/features/launchpad/components/GuidesPanel';
import { HeroSummary } from '@/features/launchpad/components/HeroSummary';
import {
  NotificationsPanel,
  ProjectsJobsPanel,
  ResourcesPanel,
} from '@/features/launchpad/components/PersonalRailPanels';
import { StoreSpotlightPanel } from '@/features/launchpad/components/StoreSpotlightPanel';
import {
  useLaunchpadMyWorkQuery,
  useLaunchpadOverviewQuery,
  useLaunchpadResourcesQuery,
} from '@/features/launchpad/hooks/useLaunchpadQueries';
import { buildResourceItems } from '@/features/launchpad/utils/resourceItems';

export function LaunchpadPageContent() {
  const [articleTab, setArticleTab] = useState('all');
  const [bannerIndex, setBannerIndex] = useState(0);
  const overviewQuery = useLaunchpadOverviewQuery();
  const myWorkQuery = useLaunchpadMyWorkQuery();
  const resourcesQuery = useLaunchpadResourcesQuery();

  const overview = overviewQuery.data;
  const myWork = myWorkQuery.data;
  const resources = resourcesQuery.data;
  const articles = overview?.articles.items ?? [];
  const visibleArticles = articles.filter(
    (article) => articleTab === 'all' || article.category === articleTab,
  );
  const resourceItems = buildResourceItems({
    buckets: resources?.buckets.items ?? [],
    consoles: resources?.consoles.items ?? [],
    databases: resources?.databases.items ?? [],
    domains: resources?.domains.items ?? [],
  });

  return (
    <Stack spacing={2.5}>
      <HeroSummary
        hero={overview?.hero}
        isLoading={overviewQuery.isLoading}
        myWorkSummary={myWork?.summary}
      />

      <BannerPanel
        activeIndex={bannerIndex}
        announcements={overview?.announcements.items ?? []}
        banners={overview?.banners ?? []}
        hero={overview?.hero}
        isLoading={overviewQuery.isLoading}
        onSelect={setBannerIndex}
        showAnnouncementsError={overviewQuery.isError}
        serviceGroups={overview?.serviceMenu.items ?? []}
      />

      <Box
        sx={(theme) => ({
          alignItems: { md: 'stretch', xs: 'start' },
          display: 'grid',
          gap: `${theme.workspace.layout.gap}px`,
          gridTemplateColumns: {
            lg: 'repeat(3, minmax(0, 1fr)) 340px',
            md: 'repeat(2, minmax(0, 1fr)) 320px',
            xs: '1fr',
          },
          gridTemplateRows: { md: 'auto auto', xs: 'auto' },
          isolation: 'isolate',
          position: 'relative',
        })}
      >
        <Box
          sx={{
            display: 'flex',
            gridColumn: { lg: '1 / 3', md: '1 / 2', xs: 'auto' },
            gridRow: 1,
            minWidth: 0,
          }}
        >
          <ArticlesPanel
            activeTab={articleTab}
            articles={visibleArticles}
            isLoading={overviewQuery.isLoading}
            onTabChange={setArticleTab}
            tabs={overview?.articles.tabs ?? []}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gridColumn: { lg: '3 / 4', md: '2 / 3', xs: 'auto' },
            gridRow: { md: 1 },
            minWidth: 0,
          }}
        >
          <GuidesPanel guideLinks={overview?.guides} isLoading={overviewQuery.isLoading} />
        </Box>

        <Box
          sx={{
            gridColumn: { lg: '1 / 4', md: '1 / 3', xs: 'auto' },
            gridRow: { md: 2 },
            minWidth: 0,
          }}
        >
          <StoreSpotlightPanel
            aiSpotlight={overview?.storeSpotlight.aiSpotlight}
            aiSpotlightHasError={overviewQuery.isError}
            aiSpotlightIsLoading={overviewQuery.isLoading}
            appFeaturedHasError={overviewQuery.isError}
            appFeaturedIsLoading={overviewQuery.isLoading}
            appFeaturedItems={overview?.storeSpotlight.featuredApps ?? []}
            items={overview?.storeSpotlight.items ?? []}
            storeSpotlightHasError={overviewQuery.isError}
          />
        </Box>

        <Stack
          spacing={2.5}
          sx={{
            gridColumn: { lg: '4 / 5', md: '3 / 4', xs: 'auto' },
            gridRow: { md: '1 / 3' },
            minWidth: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <NotificationsPanel
            hasError={myWorkQuery.isError}
            isLoading={myWorkQuery.isLoading}
            notifications={myWork?.notifications.items ?? []}
            total={myWork?.notifications.total}
          />
          <ProjectsJobsPanel
            hasError={myWorkQuery.isError}
            ideCount={myWork?.ides.items.length ?? 0}
            isLoading={myWorkQuery.isLoading}
            jobs={myWork?.jobs.items ?? []}
            projects={myWork?.projects.items ?? []}
            summary={myWork?.summary}
          />
          <ResourcesPanel
            hasError={resourcesQuery.isError}
            isLoading={resourcesQuery.isLoading}
            resources={resourceItems}
            summary={resources?.summary}
          />
        </Stack>
      </Box>

      <QueryErrorAlerts
        alerts={[
          {
            isError: overviewQuery.isError,
            message:
              'Launchpad overview could not be loaded. The page is using the available API responses.',
          },
        ]}
      />
    </Stack>
  );
}
