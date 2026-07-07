import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import { Box, Typography } from '@mui/material';
import type { ReactElement } from 'react';

import { SectionStatusBadge } from '@/components/reference-status';
import {
  PageHeader,
  SectionLabel,
  TagChip,
  TagRow,
} from '@/features/app-gallery/components/AppGalleryPrimitives';
import { appGallerySectionStatus } from '@/features/app-gallery/sectionStatus';
import type { AppGalleryHero } from '@/features/app-gallery/types';

export function PageIntro({
  hero,
  resultTotal,
  totalApps,
}: {
  hero?: AppGalleryHero;
  resultTotal?: number;
  totalApps: number;
}) {
  const stats = hero?.stats ?? [
    {
      id: 'catalog',
      label: 'Registered Apps',
      note: 'Current app catalog',
      value: String(totalApps),
    },
  ];

  return (
    <PageHeader>
      <SectionLabel>
        <StorefrontRoundedIcon sx={{ color: 'primary.main', fontSize: 15 }} />
        DEJ App Gallery
        <SectionStatusBadge status={appGallerySectionStatus.pageIntro} />
      </SectionLabel>
      <Box>
        <Typography component="h1" variant="h3">
          {hero?.title ?? 'App Gallery'}
        </Typography>
        <Typography color="text.secondary" maxWidth={860} sx={{ mt: 1 }} variant="body2">
          {hero?.subtitle ??
            'Browse community-registered apps from the live list. The page surfaces app names, descriptions, and install targets first so teams can quickly understand where each app fits.'}
        </Typography>
      </Box>
      <TagRow>
        {stats.map((stat) => (
          <TagChip
            icon={getStatIcon(stat.id)}
            key={stat.id}
            label={`${stat.label} ${stat.value}`}
            size="small"
            title={stat.note}
            variant="outlined"
          />
        ))}
        {typeof resultTotal === 'number' ? (
          <TagChip
            icon={<ViewListRoundedIcon />}
            label={`조회 결과 ${resultTotal}`}
            size="small"
            title="Current app list result total"
            variant="outlined"
          />
        ) : null}
      </TagRow>
    </PageHeader>
  );
}

function getStatIcon(id: string): ReactElement {
  switch (id) {
    case 'categories':
      return <CategoryRoundedIcon />;
    case 'projects':
      return <FolderOpenRoundedIcon />;
    case 'published':
      return <RocketLaunchRoundedIcon />;
    case 'catalog':
      return <Inventory2RoundedIcon />;
    default:
      return <AutoAwesomeRoundedIcon />;
  }
}
