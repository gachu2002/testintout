import { Navigate, Route, Routes } from 'react-router-dom';

import { routes, toChildRoutePath } from '@/config/routes';
import { AppShell } from '@/features/app-shell/components/AppShell';
import { AboutDejPage } from '@/pages/AboutDejPage';
import { AgentHubPage } from '@/pages/AgentHubPage';
import { AppGalleryPage } from '@/pages/AppGalleryPage';
import { BucketHubPage } from '@/pages/BucketHubPage';
import { ConsoleHubPage } from '@/pages/ConsoleHubPage';
import { DatabaseHubPage } from '@/pages/DatabaseHubPage';
import { DomainHubPage } from '@/pages/DomainHubPage';
import { LaunchpadPage } from '@/pages/LaunchpadPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PermissionHubPage } from '@/pages/PermissionHubPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';

export function AppRouter() {
  const agentsPath = toChildRoutePath(routes.agents);
  const appGalleryPath = toChildRoutePath(routes.appGallery);
  const bucketsPath = toChildRoutePath(routes.buckets);
  const consolesPath = toChildRoutePath(routes.consoles);
  const databasesPath = toChildRoutePath(routes.databases);
  const domainsPath = toChildRoutePath(routes.domains);
  const permissionsPath = toChildRoutePath(routes.permissions);

  return (
    <Routes>
      <Route element={<AboutDejPage />} path={routes.aboutDej} />
      <Route element={<AppShell />} path={routes.launchpad}>
        <Route index element={<LaunchpadPage />} />
        <Route element={<AgentHubPage />} path={agentsPath} />
        <Route element={<AppGalleryPage />} path={appGalleryPath} />
        <Route element={<BucketHubPage />} path={bucketsPath} />
        <Route element={<ConsoleHubPage />} path={consolesPath} />
        <Route element={<DatabaseHubPage />} path={databasesPath} />
        <Route element={<DomainHubPage />} path={domainsPath} />
        <Route element={<PermissionHubPage />} path={permissionsPath} />
        <Route
          element={
            <PlaceholderPage
              description="This route is wired so navigation works, but its API contract was not provided yet."
              title="Workspace Area"
            />
          }
          path="workspace/:section"
        />
        <Route
          element={
            <PlaceholderPage
              description="Documentation pages can be connected when the docs API or markdown loading strategy is defined."
              title="Documentation"
            />
          }
          path="docs/*"
        />
        <Route
          element={
            <PlaceholderPage
              description="Support routes are wired so reference navigation works while the support API is defined."
              title="Support"
            />
          }
          path="support/*"
        />
      </Route>
      <Route element={<Navigate replace to={routes.launchpad} />} path="/launchpad" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}
