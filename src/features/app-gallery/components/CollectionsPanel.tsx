import ViewCarouselRoundedIcon from '@mui/icons-material/ViewCarouselRounded';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { SectionStatusBadge } from '@/components/reference-status';
import { IconTile } from '@/components/workspace';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import {
  CollectionCard,
  CollectionGrid,
  PanelCard,
  SectionLabel,
} from '@/features/app-gallery/components/AppGalleryPrimitives';
import { appGallerySectionStatus } from '@/features/app-gallery/sectionStatus';
import type { AppGalleryApp } from '@/features/app-gallery/types';
import { iconGradient } from '@/features/app-gallery/utils/visuals';

export function CollectionsPanel({ apps }: { apps: AppGalleryApp[] }) {
  const recentApps = apps.slice(0, 3);
  const operationsApps = apps
    .filter((app) => app.category === 'operations' || app.category === 'workspace')
    .slice(0, 3);

  return (
    <PanelCard>
      <Stack spacing={1} sx={{ mb: 2.25 }}>
        <SectionLabel>
          <ViewCarouselRoundedIcon sx={{ color: 'primary.main', fontSize: 15 }} />
          Collections
          <SectionStatusBadge status={appGallerySectionStatus.collections} />
        </SectionLabel>
        <Typography
          component="h2"
          fontSize={26}
          fontWeight={800}
          letterSpacing="-0.04em"
          lineHeight={1.18}
        >
          App groups organized by purpose
        </Typography>
        <Typography color="text.secondary" fontSize={13} lineHeight={1.7} maxWidth={760}>
          When you are not sure where to start, compare apps with similar intent together.
        </Typography>
      </Stack>
      <CollectionGrid>
        <CollectionGroup apps={recentApps} label="3 Apps" title="Recently Added Apps" />
        <CollectionGroup
          apps={operationsApps}
          label={`${operationsApps.length} Apps`}
          title="Operations And Docs Flow"
        />
      </CollectionGrid>
    </PanelCard>
  );
}

function CollectionGroup({
  apps,
  label,
  title,
}: {
  apps: AppGalleryApp[];
  label: string;
  title: string;
}) {
  return (
    <CollectionCard>
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={1.5}
        sx={{ mb: 1.75 }}
      >
        <Box>
          <Typography fontSize={18} fontWeight={800} letterSpacing="-0.03em">
            {title}
          </Typography>
          <Typography color="text.secondary" fontSize={12} lineHeight={1.65} sx={{ mt: 0.5 }}>
            Compare apps with different goals and quickly understand the range of the gallery.
          </Typography>
        </Box>
        <Chip
          label={label}
          size="small"
          sx={{ bgcolor: '#e0e7ff', color: '#4f46e5', fontSize: 10, fontWeight: 800 }}
        />
      </Stack>
      <Stack spacing={1.25}>
        {apps.map((app) => (
          <Box
            key={app.slug}
            sx={(theme) => ({
              alignItems: 'center',
              bgcolor: alpha(theme.workspace.colors.background, 0.8),
              borderRadius: 1.5,
              display: 'grid',
              gap: 1.25,
              gridTemplateColumns: 'auto minmax(0, 1fr) auto',
              p: 1.25,
            })}
          >
            <IconTile tileBackground={iconGradient(app.iconColor)} tileSize={30}>
              <WorkspaceIcon name={app.icon} sx={{ fontSize: 16 }} />
            </IconTile>
            <Box minWidth={0}>
              <Typography fontSize={12} fontWeight={800} noWrap>
                {app.title}
              </Typography>
              <Typography color="text.disabled" fontSize={11} noWrap>
                {app.subtitle}
              </Typography>
            </Box>
            <Typography color="primary.main" fontSize={10} fontWeight={800}>
              {app.categoryLabel}
            </Typography>
          </Box>
        ))}
      </Stack>
    </CollectionCard>
  );
}
