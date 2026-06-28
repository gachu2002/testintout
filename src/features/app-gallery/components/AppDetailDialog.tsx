import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { FormEvent, ReactNode } from 'react';
import { useState } from 'react';

import { SmartLink } from '@/components/SmartLink';
import { IconTile } from '@/components/workspace';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import { useAppGalleryInstallMutation } from '@/features/app-gallery/hooks/useAppGalleryQueries';
import type { AppGalleryAppDetail } from '@/features/app-gallery/types';
import { iconGradient } from '@/features/app-gallery/utils/visuals';
import { getErrorMessage } from '@/lib/api/axios';

type AppDetailDialogProps = {
  detail?: AppGalleryAppDetail;
  error: unknown;
  isLoading: boolean;
  onClose: () => void;
  open: boolean;
};

export function AppDetailDialog({ detail, error, isLoading, onClose, open }: AppDetailDialogProps) {
  const [projectId, setProjectId] = useState('');
  const installMutation = useAppGalleryInstallMutation();

  const handleInstall = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!detail || projectId.trim().length === 0) {
      return;
    }

    installMutation.mutate({ projectId: projectId.trim(), slug: detail.slug });
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={onClose} open={open}>
      <DialogTitle sx={{ pb: 1.5 }}>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={2}>
          <Box minWidth={0}>
            <Typography
              color="text.secondary"
              fontSize={11}
              fontWeight={800}
              letterSpacing="0.08em"
            >
              APP DETAIL CONTRACT
            </Typography>
            <Typography component="span" fontSize={24} fontWeight={800} letterSpacing="-0.04em">
              {detail?.title ?? 'App Detail'}
            </Typography>
            <Typography color="text.secondary" fontSize={13} lineHeight={1.6} sx={{ mt: 0.5 }}>
              {detail?.subtitle ?? 'GET /api/v2/app-gallery/apps/:slug response renders here.'}
            </Typography>
          </Box>
          {detail ? (
            <IconTile tileBackground={iconGradient(detail.iconColor)} tileSize={48}>
              <WorkspaceIcon name={detail.icon} sx={{ fontSize: 24 }} />
            </IconTile>
          ) : null}
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Stack alignItems="center" justifyContent="center" minHeight={240}>
            <CircularProgress size={26} />
          </Stack>
        ) : null}

        {!isLoading && error ? (
          <Alert severity="error">
            {getErrorMessage(error, 'App detail could not be loaded.')}
          </Alert>
        ) : null}

        {!isLoading && detail ? (
          <Stack spacing={2.5}>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Chip label={detail.categoryLabel} size="small" />
              <Chip label={detail.installTargetLabel} size="small" />
              <Chip label="GET /apps/:slug" size="small" />
              {detail.tags.slice(0, 3).map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Stack>

            <Box>
              <Typography fontSize={18} fontWeight={800} letterSpacing="-0.03em" sx={{ mb: 0.75 }}>
                설명
              </Typography>
              <Typography color="text.secondary" fontSize={13} lineHeight={1.75}>
                {detail.description || detail.summary}
              </Typography>
            </Box>

            <Box
              sx={(theme) => ({
                bgcolor: alpha(theme.palette.primary.main, 0.04),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                borderRadius: 2,
                p: 2,
              })}
            >
              <Stack spacing={1.75}>
                <Box>
                  <Typography fontSize={16} fontWeight={800} letterSpacing="-0.02em">
                    설치 계약
                  </Typography>
                  <Typography
                    color="text.secondary"
                    fontFamily="monospace"
                    fontSize={12}
                    sx={{ mt: 0.75 }}
                  >
                    {detail.install.method} {detail.install.path}
                  </Typography>
                  <Typography color="text.secondary" fontSize={12} sx={{ mt: 0.5 }}>
                    필수 필드: {detail.install.requiredFields.join(', ')} · target:{' '}
                    {detail.install.targetType}
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleInstall}>
                  <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1.25}>
                    <TextField
                      fullWidth
                      label="projectId"
                      onChange={(event) => setProjectId(event.target.value)}
                      placeholder="설치 대상 프로젝트 ID"
                      size="small"
                      value={projectId}
                    />
                    <Button
                      disabled={
                        projectId.trim().length === 0 ||
                        installMutation.isPending ||
                        !detail.capabilities.canInstall
                      }
                      startIcon={<RocketLaunchRoundedIcon />}
                      sx={{ minWidth: 150 }}
                      type="submit"
                      variant="contained"
                    >
                      설치 요청
                    </Button>
                  </Stack>
                </Box>

                {installMutation.isError ? (
                  <Alert severity="error">
                    {getErrorMessage(installMutation.error, 'Install request failed.')}
                  </Alert>
                ) : null}

                {installMutation.data ? (
                  <Alert icon={<CheckCircleRoundedIcon />} severity="success">
                    Install job {installMutation.data.status}: {installMutation.data.jobId}
                  </Alert>
                ) : null}
              </Stack>
            </Box>

            <DetailGrid>
              <DetailList items={detail.highlights} title="핵심 포인트" />
              <DetailList items={detail.useCases} title="활용 케이스" />
            </DetailGrid>

            <DetailGrid>
              <DetailList items={detail.prerequisites} title="사전 조건" />
              <Box>
                <Typography fontSize={16} fontWeight={800} letterSpacing="-0.02em" sx={{ mb: 1 }}>
                  관련 AI 큐레이션
                </Typography>
                {detail.relatedAi.length > 0 ? (
                  <Stack spacing={1}>
                    {detail.relatedAi.map((item) => (
                      <Box
                        component={SmartLink}
                        href={item.href}
                        key={item.slug}
                        sx={(theme) => ({
                          alignItems: 'center',
                          border: `1px solid ${theme.workspace.colors.border}`,
                          borderRadius: 1.5,
                          color: 'inherit',
                          display: 'grid',
                          gap: 1.25,
                          gridTemplateColumns: 'minmax(0, 1fr) auto',
                          p: 1.25,
                          textDecoration: 'none',
                        })}
                      >
                        <Box minWidth={0}>
                          <Typography fontSize={12} fontWeight={800} noWrap>
                            {item.title}
                          </Typography>
                          <Typography color="text.disabled" fontSize={11} noWrap>
                            {item.subtitle}
                          </Typography>
                        </Box>
                        <OpenInNewRoundedIcon sx={{ color: 'text.disabled', fontSize: 17 }} />
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Typography color="text.secondary" fontSize={12}>
                    연결된 AI 큐레이션이 없습니다.
                  </Typography>
                )}
              </Box>
            </DetailGrid>
          </Stack>
        ) : null}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}

function DetailGrid({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={(theme) => ({
        display: 'grid',
        gap: theme.spacing(2),
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        [theme.breakpoints.down('sm')]: {
          gridTemplateColumns: '1fr',
        },
      })}
    >
      {children}
    </Box>
  );
}

function DetailList({ items, title }: { items: string[]; title: string }) {
  return (
    <Box>
      <Typography fontSize={16} fontWeight={800} letterSpacing="-0.02em" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Stack divider={<Divider flexItem />} spacing={0.75}>
        {items.map((item) => (
          <Typography color="text.secondary" fontSize={12} lineHeight={1.65} key={item}>
            {item}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
