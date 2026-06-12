import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import {
  Badge,
  Box,
  CircularProgress,
  IconButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';

import { SectionStatusBadge } from '@/components/reference-status';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import { useHeaderNotificationsQuery } from '@/features/app-shell/hooks/useAppShellQueries';
import { appShellSectionStatus } from '@/features/app-shell/sectionStatus';
import type { Notification } from '@/features/app-shell/types';
import { formatLabel, formatRelativeTime, stripMarkup } from '@/lib/formatters';
import { getStatusTone } from '@/lib/statusTone';

type AppHeaderNotificationsProps = {
  unreadCount: number;
};

export function AppHeaderNotifications({ unreadCount }: AppHeaderNotificationsProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const notificationsQuery = useHeaderNotificationsQuery({ enabled: isOpen, limit: 6 });
  const notifications = notificationsQuery.data?.items ?? [];
  const total = notificationsQuery.data?.page.total ?? unreadCount;

  return (
    <>
      <IconButton
        aria-controls={isOpen ? 'header-notifications-popover' : undefined}
        aria-expanded={isOpen ? 'true' : undefined}
        aria-haspopup="dialog"
        aria-label="Notifications"
        data-ref="header-notifications-button"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ flexShrink: 0, height: 34, width: 34 }}
      >
        <Badge color="primary" invisible={unreadCount === 0} overlap="circular" variant="dot">
          <NotificationsNoneRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
        </Badge>
      </IconButton>
      <SectionStatusBadge status={appShellSectionStatus.notifications} />

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        id="header-notifications-popover"
        onClose={() => setAnchorEl(null)}
        open={isOpen}
        slotProps={{
          paper: {
            sx: (theme) => ({
              background: theme.workspace.gradients.cardSurface,
              border: `1px solid ${theme.workspace.colors.border}`,
              borderRadius: '8px',
              boxShadow: '0 24px 54px rgba(15,23,42,.16)',
              mt: 1.25,
              overflow: 'hidden',
              width: { sm: 390, xs: 'calc(100vw - 32px)' },
            }),
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Box data-ref="header-notifications-popover" sx={{ minWidth: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={(theme) => ({
              alignItems: 'flex-start',
              borderBottom: `1px solid ${theme.workspace.colors.border}`,
              p: 2,
            })}
          >
            <Box minWidth={0}>
              <Typography fontSize={15} fontWeight={800} letterSpacing="-0.02em">
                Notifications
              </Typography>
              <Typography color="text.secondary" fontSize={12} sx={{ mt: 0.25 }}>
                Latest workspace activity
              </Typography>
            </Box>

            <Box
              component="span"
              sx={(theme) => ({
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                borderRadius: '6px',
                color: 'primary.main',
                flexShrink: 0,
                fontSize: 11,
                fontWeight: 800,
                lineHeight: 1,
                px: 1,
                py: 0.75,
              })}
            >
              {total.toLocaleString()} total
            </Box>
          </Stack>

          <Box
            sx={{
              maxHeight: 420,
              overflowY: 'auto',
              p: 1,
              scrollbarColor: 'rgba(146,152,160,.45) transparent',
              scrollbarWidth: 'thin',
            }}
          >
            {notificationsQuery.isLoading ? (
              <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 180 }}>
                <CircularProgress size={24} />
              </Stack>
            ) : null}

            {notificationsQuery.isError ? (
              <Box sx={{ p: 2 }}>
                <Typography color="error.main" fontSize={13} fontWeight={700}>
                  Notifications could not be loaded.
                </Typography>
                <Typography color="text.secondary" fontSize={12} sx={{ mt: 0.5 }}>
                  Try opening this menu again in a moment.
                </Typography>
              </Box>
            ) : null}

            {!notificationsQuery.isLoading &&
            !notificationsQuery.isError &&
            notifications.length === 0 ? (
              <Box sx={{ p: 2 }}>
                <Typography color="text.secondary" fontSize={13}>
                  No notifications are available.
                </Typography>
              </Box>
            ) : null}

            {!notificationsQuery.isLoading && !notificationsQuery.isError ? (
              <Stack spacing={0.5}>
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </Stack>
            ) : null}
          </Box>
        </Box>
      </Popover>
    </>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const message = stripMarkup(notification.message) || formatLabel(notification.status);
  const statusTone = getStatusTone(notification.status);

  return (
    <Box
      sx={(theme) => ({
        alignItems: 'flex-start',
        borderRadius: '6px',
        display: 'grid',
        gap: 1.25,
        gridTemplateColumns: '32px minmax(0, 1fr) 7px',
        px: 1,
        py: 1.125,
        transition: theme.transitions.create(['background-color', 'box-shadow'], {
          duration: theme.transitions.duration.shortest,
        }),
        '&:hover': {
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.06)}`,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          alignItems: 'center',
          bgcolor: getNotificationIconBackground(notification.type, theme.palette.primary.main),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: '6px',
          color: getNotificationIconColor(notification.type),
          display: 'flex',
          height: 32,
          justifyContent: 'center',
          width: 32,
        })}
      >
        <WorkspaceIcon name={getNotificationIconName(notification.type)} sx={{ fontSize: 17 }} />
      </Box>

      <Box minWidth={0}>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Typography fontSize={13} fontWeight={800} noWrap>
            {notification.title}
          </Typography>
          <Typography color="text.disabled" fontSize={10} sx={{ flexShrink: 0 }}>
            {formatRelativeTime(notification.createdAt)}
          </Typography>
        </Stack>
        <Typography
          color="text.secondary"
          fontSize={12}
          lineHeight={1.45}
          sx={{
            display: '-webkit-box',
            mt: 0.375,
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {message}
        </Typography>
        <Stack alignItems="center" direction="row" spacing={0.75} sx={{ mt: 0.875 }}>
          <Box
            component="span"
            sx={{
              bgcolor: statusTone.background,
              borderRadius: '6px',
              color: statusTone.color,
              fontSize: 10,
              fontWeight: 800,
              lineHeight: 1,
              px: 0.75,
              py: 0.5,
            }}
          >
            {formatLabel(notification.status)}
          </Box>
          <Typography color="text.disabled" fontSize={10} fontWeight={700}>
            {formatLabel(notification.direction)}
          </Typography>
        </Stack>
      </Box>

      <Box
        aria-hidden="true"
        sx={(theme) => ({
          bgcolor: notification.isUnread
            ? 'primary.main'
            : alpha(theme.workspace.colors.borderStrong, 0.8),
          borderRadius: '50%',
          height: 7,
          mt: 0.75,
          width: 7,
        })}
      />
    </Box>
  );
}

function getNotificationIconName(type: string) {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes('approval')) return 'approval';
  if (normalizedType.includes('mail')) return 'mail';
  if (normalizedType.includes('notify')) return 'notify';

  return 'campaign';
}

function getNotificationIconBackground(type: string, primaryColor: string) {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes('approval')) return '#fff1e7';
  if (normalizedType.includes('mail')) return '#e2f3ff';
  if (normalizedType.includes('notify')) return alpha(primaryColor, 0.08);

  return '#f4f6f9';
}

function getNotificationIconColor(type: string) {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes('approval')) return 'warning.main';
  if (normalizedType.includes('mail')) return 'secondary.main';
  if (normalizedType.includes('notify')) return 'primary.main';

  return 'text.secondary';
}
