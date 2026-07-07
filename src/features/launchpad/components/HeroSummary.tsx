import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';

import { SectionStatusBadge } from '@/components/reference-status';
import { SmartLink } from '@/components/SmartLink';
import { IconTile, Panel } from '@/components/workspace';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import { routes } from '@/config/routes';
import type { CurrentUser } from '@/features/app-shell/types';
import { launchpadSectionStatus } from '@/features/launchpad/sectionStatus';
import type { HeroStat, LaunchpadHero, LaunchpadMyWork } from '@/features/launchpad/types';

const LoadingPanel = styled(Panel)(({ theme }) => ({
  borderRadius: theme.workspace.radii.sm,
  padding: theme.spacing(1.5),
}));

const HeroRoot = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
}));

const HeroCopy = styled(Box)({
  minWidth: 0,
});

const HeroTitle = styled('h1')({
  fontSize: 22,
  fontWeight: 700,
  letterSpacing: '-.5px',
  lineHeight: 1.2,
  margin: 0,
});

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 13,
  marginTop: theme.spacing(0.5),
}));

const StatsList = styled(Stack)({
  flexDirection: 'row',
  flexShrink: 0,
  flexWrap: 'wrap',
  gap: 10,
});

const statCardStyles = (theme: Theme) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.workspace.colors.border}`,
  borderRadius: 10,
  color: theme.palette.text.primary,
  display: 'flex',
  gap: 9,
  padding: '10px 16px',
  textDecoration: 'none',
  transition: theme.transitions.create(['border-color', 'box-shadow', 'transform'], {
    duration: theme.transitions.duration.shortest,
  }),
  whiteSpace: 'nowrap',
});

const StatCard = styled('div')(({ theme }) => statCardStyles(theme));

const StatCardLink = styled(SmartLink)(({ theme }) => ({
  ...statCardStyles(theme),
  '&:hover': {
    borderColor: 'rgba(79,140,255,.26)',
    boxShadow: '0 10px 22px rgba(79,140,255,.1)',
    transform: 'translateY(-1px)',
  },
}));

const StatValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'statColor',
})<{ statColor: string }>(({ statColor }) => ({
  background: statColor,
  backgroundClip: 'text',
  fontSize: 15,
  fontWeight: 700,
  lineHeight: 1.2,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 10,
  lineHeight: 1.2,
  marginTop: theme.spacing(0.25),
}));

export function HeroSummary({
  hero,
  isLoading,
  myWorkSummary,
  user,
}: {
  hero?: LaunchpadHero;
  isLoading: boolean;
  myWorkSummary?: LaunchpadMyWork['summary'];
  user?: CurrentUser;
}) {
  if (isLoading) {
    return (
      <LoadingPanel>
        <Skeleton height={26} width="34%" />
        <Skeleton height={18} width="48%" />
        <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1} sx={{ mt: 1.25 }}>
          {[0, 1, 2, 3].map((item) => (
            <Skeleton height={46} key={item} sx={{ flex: 1, borderRadius: 1 }} variant="rounded" />
          ))}
        </Stack>
      </LoadingPanel>
    );
  }

  const fallbackDisplayName = user?.givenName || user?.fullname || hero?.userName || 'AX Studio';
  const title = hero?.title ?? `${getHeroGreetingName(fallbackDisplayName)} 님, 반갑습니다 👋`;
  const subtitle = getHeroSubtitle(myWorkSummary, hero, user?.summary.unreadNotificationCount ?? 0);
  const stats = hero?.heroStats ?? [];

  return (
    <HeroRoot data-ref="launchpad-hero">
      <HeroCopy>
        <HeroTitle>
          {title} <AutoAwesomeRoundedIcon sx={{ color: 'primary.main', fontSize: 17, mb: -0.25 }} />
          <SectionStatusBadge status={launchpadSectionStatus.hero} />
        </HeroTitle>
        <HeroSubtitle>{subtitle}</HeroSubtitle>
      </HeroCopy>

      <StatsList>
        {stats.map((stat) => (
          <StatItem key={stat.key} stat={stat} />
        ))}
      </StatsList>
    </HeroRoot>
  );
}

function getHeroGreetingName(value: string) {
  const raw = value.trim();
  const local = raw.split('@')[0]?.trim() ?? '';

  if (!local) return 'Workspace User';

  if (/[._-]/.test(local) && !/\s/.test(local)) {
    return local
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
      .join(' ');
  }

  return local;
}

function getHeroSubtitle(
  summary: LaunchpadMyWork['summary'] | undefined,
  hero: LaunchpadHero | undefined,
  unreadFallback: number,
) {
  if (!summary) {
    return hero?.subtitle ?? `읽지 않은 알림 ${unreadFallback}건을 먼저 확인해 보세요.`;
  }

  const unreadCount = Number(summary.unreadNotificationCount || 0);
  const runningCount = Number(summary.recentJobStatus?.running || 0);

  if (unreadCount > 0 && runningCount > 0) {
    return `읽지 않은 알림 ${unreadCount}건과 진행 중인 작업 ${runningCount}건이 있습니다.`;
  }

  if (unreadCount > 0) {
    return `읽지 않은 알림 ${unreadCount}건을 먼저 확인해 보세요.`;
  }

  if (runningCount > 0) {
    return `진행 중인 작업 ${runningCount}건을 여기에서 바로 확인할 수 있습니다.`;
  }

  return '새 알림 없이 작업을 바로 시작할 수 있습니다.';
}

function StatItem({ stat }: { stat: HeroStat }) {
  const isWorkspaceStat = stat.key === 'workspace';
  const statContent = (
    <>
      <IconTile sx={{ borderRadius: '8px' }} tileBackground={stat.color} tileSize={30}>
        <WorkspaceIcon name={stat.icon} sx={{ fontSize: 15 }} />
      </IconTile>
      <Box minWidth={0}>
        <StatValue noWrap statColor={stat.color}>
          {stat.value}
        </StatValue>
        <StatLabel noWrap>{stat.label}</StatLabel>
      </Box>
    </>
  );

  if (isWorkspaceStat) {
    return <StatCardLink href={routes.projects}>{statContent}</StatCardLink>;
  }

  return <StatCard>{statContent}</StatCard>;
}
