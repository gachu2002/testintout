import { Stack } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { QueryErrorAlerts } from '@/components/workspace/QueryErrorAlerts';
import { AppDetailDialog } from '@/features/app-gallery/components/AppDetailDialog';
import { HeroRail, MainLayout } from '@/features/app-gallery/components/AppGalleryPrimitives';
import { CategoryTabs } from '@/features/app-gallery/components/CategoryTabs';
import { CollectionsPanel } from '@/features/app-gallery/components/CollectionsPanel';
import { CuratedHighlights } from '@/features/app-gallery/components/CuratedHighlights';
import { CriteriaRailCard, RecentRailCard } from '@/features/app-gallery/components/HeroRailPanels';
import { PageIntro } from '@/features/app-gallery/components/PageIntro';
import { RegisteredAppsPanel } from '@/features/app-gallery/components/RegisteredAppsPanel';
import { SideRail } from '@/features/app-gallery/components/SideRail';
import {
  useAppGalleryAppDetailQuery,
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
  const [selectedAppSlug, setSelectedAppSlug] = useState<string | null>(null);
  const searchQuery = useAppStore((state) =>
    (state.searchQueriesByPath[pathname] ?? '').trim().toLowerCase(),
  );

  const heroQuery = useAppGalleryHeroQuery();
  const categoriesQuery = useAppGalleryCategoriesQuery();
  const categories = categoriesQuery.data?.items ?? [];
  const activeCategory = activeCategoryOverride ?? categoriesQuery.data?.defaultCategory ?? 'all';
  const featuredQuery = useAppGalleryFeaturedQuery();
  const catalogAppsQuery = useAppGalleryAppsQuery({ limit: 6 });
  const appsQuery = useAppGalleryAppsQuery({
    category: activeCategory === 'all' ? '' : activeCategory,
    limit: 6,
    q: searchQuery,
  });
  const relatedAiQuery = useAppGalleryRelatedAiQuery();
  const selectedAppQuery = useAppGalleryAppDetailQuery(selectedAppSlug);
  const catalogApps = catalogAppsQuery.data?.items ?? [];
  const apps = appsQuery.data?.items ?? [];
  const appResultTotal = appsQuery.data?.page.total;
  const featuredApps = featuredQuery.data ?? [];
  const relatedAi = relatedAiQuery.data ?? [];
  const hasPageError =
    heroQuery.isError ||
    categoriesQuery.isError ||
    featuredQuery.isError ||
    catalogAppsQuery.isError ||
    appsQuery.isError ||
    relatedAiQuery.isError;

  return (
    <Stack spacing={2.5}>
      <PageIntro
        hero={heroQuery.data}
        resultTotal={appResultTotal}
        totalApps={appResultTotal ?? apps.length}
      />

      <HeroRail>
        <RecentRailCard apps={catalogApps.slice(0, 3)} isLoading={catalogAppsQuery.isLoading} />
        <CriteriaRailCard relatedAi={relatedAi.slice(0, 3)} />
      </HeroRail>

      <MainLayout>
        <Stack spacing={2.5}>
          <CuratedHighlights
            apps={featuredApps}
            isLoading={featuredQuery.isLoading}
            onOpenAppDetail={setSelectedAppSlug}
          />

          <CategoryTabs
            activeCategory={activeCategory}
            categories={categories}
            isLoading={categoriesQuery.isLoading}
            onCategoryChange={setActiveCategoryOverride}
          />

          <RegisteredAppsPanel
            apps={apps}
            isLoading={appsQuery.isLoading}
            onOpenAppDetail={setSelectedAppSlug}
          />

          <CollectionsPanel
            apps={catalogApps}
            categories={categories}
            featuredApps={featuredApps}
            onOpenAppDetail={setSelectedAppSlug}
          />
        </Stack>

        <SideRail apps={catalogApps.slice(0, 3)} categories={categories} />
      </MainLayout>

      <AppDetailDialog
        key={selectedAppSlug ?? 'closed'}
        detail={selectedAppQuery.data}
        error={selectedAppQuery.error}
        isLoading={selectedAppQuery.isLoading}
        onClose={() => setSelectedAppSlug(null)}
        open={Boolean(selectedAppSlug)}
      />

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
