import { Stack } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { QueryErrorAlerts } from '@/components/workspace/QueryErrorAlerts';
import { HeroRail, MainLayout } from '@/features/app-gallery/components/AppGalleryPrimitives';
import { CategoryTabs } from '@/features/app-gallery/components/CategoryTabs';
import { CollectionsPanel } from '@/features/app-gallery/components/CollectionsPanel';
import { CuratedHighlights } from '@/features/app-gallery/components/CuratedHighlights';
import { CriteriaRailCard, RecentRailCard } from '@/features/app-gallery/components/HeroRailPanels';
import { PageIntro } from '@/features/app-gallery/components/PageIntro';
import { RegisteredAppsPanel } from '@/features/app-gallery/components/RegisteredAppsPanel';
import { SideRail } from '@/features/app-gallery/components/SideRail';
import {
  useAppGalleryAppsQuery,
  useAppGalleryCategoriesQuery,
  useAppGalleryFeaturedQuery,
  useAppGalleryHeroQuery,
  useAppGalleryRelatedAiQuery,
} from '@/features/app-gallery/hooks/useAppGalleryQueries';
import { useAppStore } from '@/stores/appStore';

export function AppGalleryPageContent() {
  const { pathname } = useLocation();
  const [activeCategoryOverride, setActiveCategoryOverride] = useState<string | null>(null);
  const searchQuery = useAppStore((state) =>
    (state.searchQueriesByPath[pathname] ?? '').trim().toLowerCase(),
  );

  const heroQuery = useAppGalleryHeroQuery();
  const categoriesQuery = useAppGalleryCategoriesQuery();
  const featuredQuery = useAppGalleryFeaturedQuery();
  const appsQuery = useAppGalleryAppsQuery(6, '');
  const relatedAiQuery = useAppGalleryRelatedAiQuery();

  const categories = categoriesQuery.data?.items ?? [];
  const activeCategory = activeCategoryOverride ?? categoriesQuery.data?.defaultCategory ?? 'all';
  const apps = appsQuery.data?.items ?? [];
  const featuredApps = featuredQuery.data ?? [];
  const relatedAi = relatedAiQuery.data ?? [];
  const visibleApps = apps.filter((app) => {
    const matchesCategory = activeCategory === 'all' || app.category === activeCategory;
    const matchesSearch =
      searchQuery.length === 0 ||
      app.title.toLowerCase().includes(searchQuery) ||
      app.subtitle.toLowerCase().includes(searchQuery) ||
      app.summary.toLowerCase().includes(searchQuery) ||
      app.tags.some((tag) => tag.toLowerCase().includes(searchQuery));

    return matchesCategory && matchesSearch;
  });
  const hasPageError =
    heroQuery.isError ||
    categoriesQuery.isError ||
    featuredQuery.isError ||
    appsQuery.isError ||
    relatedAiQuery.isError;

  return (
    <Stack spacing={2.5}>
      <PageIntro hero={heroQuery.data} totalApps={appsQuery.data?.page.total ?? apps.length} />

      <HeroRail>
        <RecentRailCard apps={apps.slice(0, 3)} isLoading={appsQuery.isLoading} />
        <CriteriaRailCard relatedAi={relatedAi.slice(0, 1)} />
      </HeroRail>

      <MainLayout>
        <Stack spacing={2.5}>
          <CuratedHighlights apps={featuredApps} isLoading={featuredQuery.isLoading} />

          <CategoryTabs
            activeCategory={activeCategory}
            categories={categories}
            isLoading={categoriesQuery.isLoading}
            onCategoryChange={setActiveCategoryOverride}
          />

          <RegisteredAppsPanel apps={visibleApps} isLoading={appsQuery.isLoading} />

          <CollectionsPanel apps={apps} />
        </Stack>

        <SideRail apps={apps.slice(0, 3)} />
      </MainLayout>

      <QueryErrorAlerts
        alerts={[
          {
            isError: hasPageError,
            message:
              'Some App Gallery data could not be loaded. The page is showing the available responses.',
          },
        ]}
      />
    </Stack>
  );
}
