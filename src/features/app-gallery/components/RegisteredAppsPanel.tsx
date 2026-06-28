import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import { Box, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { SectionStatusBadge } from '@/components/reference-status';
import { IconTile } from '@/components/workspace';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import {
  CardGrid,
  PanelCard,
  SectionLabel,
  StoreCard,
  TagRow,
} from '@/features/app-gallery/components/AppGalleryPrimitives';
import { appGallerySectionStatus } from '@/features/app-gallery/sectionStatus';
import type { AppGalleryApp } from '@/features/app-gallery/types';
import { iconGradient } from '@/features/app-gallery/utils/visuals';

export function RegisteredAppsPanel({
  apps,
  isLoading,
  onOpenAppDetail,
}: {
  apps: AppGalleryApp[];
  isLoading: boolean;
  onOpenAppDetail: (slug: string) => void;
}) {
  return (
    <PanelCard>
      <Stack spacing={1} sx={{ mb: 2.25 }}>
        <SectionLabel>
          <Inventory2RoundedIcon sx={{ color: 'primary.main', fontSize: 15 }} />
          Registered Apps
          <SectionStatusBadge status={appGallerySectionStatus.registeredApps} />
        </SectionLabel>
        <Typography
          component="h2"
          fontSize={26}
          fontWeight={800}
          letterSpacing="-0.04em"
          lineHeight={1.18}
        >
          실제 App Gallery 카탈로그를 확인해 보세요
        </Typography>
        <Typography color="text.secondary" fontSize={13} lineHeight={1.7} maxWidth={760}>
          카테고리와 검색 조건에 맞는 앱을 실시간으로 조회합니다. 카드에서 상세를 열면 실제
          /api/v2/app-gallery/apps/:slug 계약까지 이어집니다.
        </Typography>
      </Stack>

      {isLoading ? (
        <Stack alignItems="center" justifyContent="center" minHeight={220}>
          <CircularProgress size={24} />
        </Stack>
      ) : (
        <CardGrid>
          {apps.map((app) => (
            <AppCard app={app} key={app.slug} onOpenAppDetail={onOpenAppDetail} />
          ))}
        </CardGrid>
      )}

      {!isLoading && apps.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 2 }} variant="body2">
          조건에 맞는 앱이 없습니다.
        </Typography>
      ) : null}
    </PanelCard>
  );
}

function AppCard({
  app,
  onOpenAppDetail,
}: {
  app: AppGalleryApp;
  onOpenAppDetail: (slug: string) => void;
}) {
  return (
    <StoreCard>
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={1.5}
        sx={{ mb: 1.75 }}
      >
        <IconTile tileBackground={iconGradient(app.iconColor)} tileSize={42}>
          <WorkspaceIcon name={app.icon} sx={{ fontSize: 21 }} />
        </IconTile>
        <Chip
          label={app.categoryLabel}
          size="small"
          sx={{
            bgcolor: alpha(app.iconColor, 0.12),
            color: app.iconColor,
            fontSize: 10,
            fontWeight: 800,
          }}
        />
      </Stack>
      <Typography fontSize={17} fontWeight={800} letterSpacing="-0.03em" sx={{ mb: 0.5 }}>
        {app.title}
      </Typography>
      <Typography color="text.disabled" fontSize={11} sx={{ mb: 1.5 }}>
        {app.subtitle}
      </Typography>
      <Typography color="text.secondary" fontSize={12} lineHeight={1.65} sx={{ mb: 1.75 }}>
        {app.summary}
      </Typography>
      <TagRow sx={{ mb: 1.75 }}>
        {app.tags.slice(0, 3).map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              bgcolor: 'background.default',
              color: 'text.secondary',
              fontSize: 10,
              fontWeight: 800,
            }}
          />
        ))}
      </TagRow>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={1}
        sx={{ mt: 'auto' }}
      >
        <Typography
          fontSize={11}
          fontWeight={800}
          sx={(theme) => ({ color: theme.workspace.colors.green })}
        >
          {app.capabilities.canInstall ? '설치 API 연결 가능' : '조회 전용'}
        </Typography>
        <Box
          component="button"
          onClick={() => onOpenAppDetail(app.slug)}
          sx={{
            alignItems: 'center',
            background: 'transparent',
            border: 0,
            color: 'text.disabled',
            cursor: 'pointer',
            display: 'inline-flex',
            fontSize: 12,
            fontWeight: 800,
            gap: 0.5,
            p: 0,
            textDecoration: 'none',
          }}
          type="button"
        >
          상세 보기
          <ChevronRightRoundedIcon sx={{ fontSize: 15 }} />
        </Box>
      </Stack>
    </StoreCard>
  );
}
