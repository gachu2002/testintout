import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { SmartLink } from '@/components/SmartLink';
import { SoftPanel } from '@/components/workspace';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import { routes } from '@/config/routes';
import { launchpadSectionStatus } from '@/features/launchpad/sectionStatus';
import type {
  Job,
  LaunchpadMyWork,
  LaunchpadResources,
  Notification,
  Project,
} from '@/features/launchpad/types';
import { buildDeploymentRows, type DeploymentRow } from '@/features/launchpad/utils/deploymentRows';
import type { ResourceRailItem } from '@/features/launchpad/utils/resourceItems';
import { formatRelativeTime, stripMarkup } from '@/lib/formatters';
import { getStatusTone } from '@/lib/statusTone';

import { HeaderTextAction, ListSkeleton, PanelMoreLink, RailHeader } from './LaunchpadPrimitives';

export function NotificationsPanel({
  hasError = false,
  isLoading,
  notifications,
}: {
  hasError?: boolean;
  isLoading: boolean;
  notifications: Notification[];
  total?: number;
}) {
  return (
    <SoftPanel>
      <RailHeader
        action={<HeaderTextAction label="All read" />}
        icon={<NotificationsNoneRoundedIcon sx={{ fontSize: 14 }} />}
        status={launchpadSectionStatus.notificationsRail}
        title="My Notifications"
      />
      {isLoading ? <ListSkeleton count={5} /> : null}
      {!isLoading && hasError ? (
        <RailErrorMessage label="Notifications could not be loaded." />
      ) : null}
      {!isLoading && !hasError && notifications.length === 0 ? (
        <Typography color="text.secondary" fontSize={13}>
          No notifications are available.
        </Typography>
      ) : null}
      {!isLoading && !hasError ? (
        <Stack spacing={0}>
          {notifications.slice(0, 5).map((notification) => (
            <NotificationRow key={notification.id} notification={notification} />
          ))}
        </Stack>
      ) : null}
    </SoftPanel>
  );
}

export function ProjectsJobsPanel({
  hasError = false,
  ideCount,
  isLoading,
  jobs,
  projects,
  summary,
}: {
  hasError?: boolean;
  ideCount: number;
  isLoading: boolean;
  jobs: Job[];
  projects: Project[];
  summary?: LaunchpadMyWork['summary'];
}) {
  const rows = buildDeploymentRows(projects, jobs);

  return (
    <SoftPanel>
      <RailHeader
        action={<PanelMoreLink href={routes.projects} label="View all" />}
        icon={<RocketLaunchRoundedIcon sx={{ fontSize: 14 }} />}
        status={launchpadSectionStatus.deploymentsRail}
        title="My Deployments"
      />
      {isLoading ? <ListSkeleton count={5} /> : null}
      {!isLoading && hasError ? (
        <RailErrorMessage label="Deployments could not be loaded." />
      ) : null}
      {!isLoading && !hasError && rows.length === 0 ? (
        <Typography color="text.secondary" fontSize={13}>
          No deployments are available.
        </Typography>
      ) : null}
      {!isLoading && !hasError ? (
        <Stack spacing={1.25}>
          <DeploymentSummaryCards
            ideCount={ideCount}
            jobCount={jobs.length}
            projectCount={projects.length}
            summary={summary}
          />
          <Stack spacing={0}>
            {rows.map((row) => (
              <DeploymentItem key={row.id} row={row} />
            ))}
          </Stack>
        </Stack>
      ) : null}
    </SoftPanel>
  );
}

export function ResourcesPanel({
  hasError = false,
  isLoading,
  resources,
  summary,
}: {
  hasError?: boolean;
  isLoading: boolean;
  resources: ResourceRailItem[];
  summary?: LaunchpadResources['summary'];
}) {
  return (
    <SoftPanel>
      <RailHeader
        icon={<Inventory2RoundedIcon sx={{ fontSize: 14 }} />}
        status={launchpadSectionStatus.resourcesRail}
        title="My Resources"
      />
      {isLoading ? <ListSkeleton count={6} /> : null}
      {!isLoading && hasError ? <RailErrorMessage label="Resources could not be loaded." /> : null}
      {!isLoading && !hasError && resources.length === 0 ? (
        <Typography color="text.secondary" fontSize={13}>
          No resources are available.
        </Typography>
      ) : null}
      {!isLoading && !hasError ? (
        <Stack spacing={1.5}>
          <ResourceSummaryCards summary={summary} />
          <Stack
            spacing={1}
            sx={{
              maxHeight: 560,
              overflow: 'auto',
              pr: 0.5,
              scrollbarColor: 'rgba(146,152,160,.45) transparent',
              scrollbarWidth: 'thin',
            }}
          >
            {resources.slice(0, 8).map((resource) => (
              <ResourceItem key={resource.id} resource={resource} />
            ))}
          </Stack>
        </Stack>
      ) : null}
    </SoftPanel>
  );
}

function DeploymentSummaryCards({
  ideCount,
  jobCount,
  projectCount,
  summary,
}: {
  ideCount: number;
  jobCount: number;
  projectCount: number;
  summary?: LaunchpadMyWork['summary'];
}) {
  return (
    <Box sx={{ display: 'grid', gap: 1.25, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
      <SummaryCard label="내 프로젝트" value={summary?.projectCount ?? projectCount} />
      <SummaryCard
        label="활성 IDE / Job"
        value={`${summary?.ideCount ?? ideCount} / ${summary?.jobCount ?? jobCount}`}
      />
    </Box>
  );
}

function ResourceSummaryCards({ summary }: { summary?: LaunchpadResources['summary'] }) {
  return (
    <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
      <SummaryCard label="전체 리소스" value={summary?.totalResources ?? 0} />
      <SummaryCard label="점검 필요" value={summary?.attentionCount ?? 0} />
      <SummaryCard label="연결 수" value={summary?.totalBindings ?? 0} />
    </Box>
  );
}

function SummaryCard({ label, value }: { label: string; value: number | string }) {
  return (
    <Box
      sx={(theme) => ({
        bgcolor: 'background.default',
        border: `1px solid ${theme.workspace.colors.border}`,
        borderRadius: '14px',
        minWidth: 0,
        px: 1.5,
        py: 1.25,
      })}
    >
      <Typography color="text.disabled" fontSize={11} fontWeight={700} letterSpacing=".02em">
        {label}
      </Typography>
      <Typography color="text.primary" fontSize={18} fontWeight={800} sx={{ mt: 0.5 }}>
        {value}
      </Typography>
    </Box>
  );
}

function RailErrorMessage({ label }: { label: string }) {
  return (
    <Typography color="error.main" fontSize={13} fontWeight={700}>
      {label}
    </Typography>
  );
}

function NotificationRow({ notification }: { notification: Notification }) {
  const message = stripMarkup(notification.message) || notification.status;

  return (
    <Box
      sx={{
        borderRadius: '7px',
        display: 'flex',
        gap: 1,
        p: '8px 4px',
        transition: 'background .12s',
        '&:hover': { bgcolor: 'background.default' },
      }}
    >
      <Box
        sx={(theme) => ({
          bgcolor: notification.isUnread ? 'primary.main' : 'transparent',
          border: notification.isUnread
            ? 'none'
            : `1.5px solid ${theme.workspace.colors.borderStrong}`,
          borderRadius: '50%',
          flexShrink: 0,
          height: 6,
          mt: 0.625,
          width: 6,
        })}
      />
      <Box minWidth={0}>
        <Typography
          color="text.secondary"
          fontSize={12}
          lineHeight={1.5}
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            '& b': { color: 'text.primary' },
          }}
        >
          <Box component="b">{notification.title}</Box> {message}
        </Typography>
        <Typography color="text.disabled" fontSize={10} sx={{ mt: 0.25 }}>
          {formatRelativeTime(notification.createdAt)}
        </Typography>
      </Box>
    </Box>
  );
}

function DeploymentItem({ row }: { row: DeploymentRow }) {
  return (
    <Box
      component={SmartLink}
      href={row.href}
      sx={{
        alignItems: 'center',
        borderRadius: '8px',
        color: 'text.primary',
        display: 'flex',
        gap: 1.25,
        p: '8px 4px',
        textDecoration: 'none',
        transition: 'background .12s',
        '&:hover': { bgcolor: 'background.default' },
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          background: row.iconBackground,
          borderRadius: '8px',
          color: '#fff',
          display: 'flex',
          flexShrink: 0,
          height: 30,
          justifyContent: 'center',
          width: 30,
        }}
      >
        {getDeploymentIcon(row.icon)}
      </Box>
      <Box flex={1} minWidth={0}>
        <Typography fontSize={12} fontWeight={600} noWrap>
          {row.name}
        </Typography>
        <Typography color="text.disabled" fontSize={10} noWrap>
          {row.version}
        </Typography>
      </Box>
      <DeploymentPill status={row.status} />
    </Box>
  );
}

function ResourceItem({ resource }: { resource: ResourceRailItem }) {
  return (
    <Box
      component={SmartLink}
      href={resource.href}
      sx={(theme) => ({
        alignItems: 'center',
        bgcolor: 'rgba(255,255,255,.9)',
        border: `1px solid ${alpha(theme.workspace.colors.borderStrong, 0.88)}`,
        borderRadius: '12px',
        color: 'text.primary',
        display: 'grid',
        gap: 1.25,
        gridTemplateColumns: 'auto minmax(0,1fr)',
        p: '11px 12px',
        textDecoration: 'none',
        transition: 'border-color .15s ease, background .15s ease, transform .15s ease',
        '&:hover': {
          bgcolor: '#fff',
          borderColor: alpha(theme.workspace.colors.brand, 0.18),
          transform: 'translateY(-1px)',
        },
      })}
    >
      <Box
        sx={{
          alignItems: 'center',
          background: resource.iconBackground,
          borderRadius: '11px',
          color: '#fff',
          display: 'flex',
          flexShrink: 0,
          height: 34,
          justifyContent: 'center',
          width: 34,
        }}
      >
        <WorkspaceIcon name={resource.iconName} sx={{ fontSize: 18 }} />
      </Box>
      <Box minWidth={0}>
        <Typography
          color="text.disabled"
          display="block"
          fontSize={10}
          fontWeight={800}
          letterSpacing=".08em"
          noWrap
          sx={{ mb: 0.375, textTransform: 'uppercase' }}
        >
          {resource.meta}
        </Typography>
        <Typography display="block" fontSize={12} fontWeight={700} noWrap>
          {resource.title}
        </Typography>
      </Box>
    </Box>
  );
}

function DeploymentPill({ status }: { status: string }) {
  const tone = getStatusTone(status);

  return (
    <Box
      sx={{
        bgcolor: tone.background,
        borderRadius: '10px',
        color: tone.color,
        flexShrink: 0,
        fontSize: 10,
        fontWeight: 700,
        px: 1,
        py: 0.25,
        whiteSpace: 'nowrap',
      }}
    >
      {status}
    </Box>
  );
}

function getDeploymentIcon(name: string) {
  const sx = { fontSize: 17 };

  if (name === 'dashboard') return <DashboardRoundedIcon sx={sx} />;
  if (name === 'schedule') return <ScheduleRoundedIcon sx={sx} />;
  if (name === 'smart_toy') return <SmartToyRoundedIcon sx={sx} />;

  return <LanguageRoundedIcon sx={sx} />;
}
