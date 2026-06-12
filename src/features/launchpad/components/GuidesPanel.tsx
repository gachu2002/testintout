import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import { Box, Stack, Typography } from '@mui/material';

import { SectionStatusBadge } from '@/components/reference-status';
import { SmartLink } from '@/components/SmartLink';
import { Panel } from '@/components/workspace';
import { launchpadSectionStatus } from '@/features/launchpad/sectionStatus';
import type { GuideLinksPanel as GuideLinksPanelType } from '@/features/launchpad/types';

import { ListSkeleton } from './LaunchpadPrimitives';

type GuideRow = GuideLinksPanelType['rows'][number];

export function GuidesPanel({
  guideLinks,
  isLoading,
}: {
  guideLinks?: GuideLinksPanelType;
  isLoading: boolean;
}) {
  const rows = guideLinks?.rows ?? [];

  return (
    <Panel sx={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Stack
        alignItems="center"
        color="text.disabled"
        direction="row"
        fontSize={11}
        fontWeight={700}
        letterSpacing=".8px"
        spacing={0.75}
        sx={{ mb: 1.5, textTransform: 'uppercase' }}
      >
        <MenuBookRoundedIcon sx={{ flexShrink: 0, fontSize: 14 }} />
        <Box component="span" sx={{ lineHeight: 1 }}>
          {guideLinks?.title ?? 'Guides'}
        </Box>
        <SectionStatusBadge status={launchpadSectionStatus.guides} />
        {guideLinks?.footerLink ? (
          <MoreLink href={guideLinks.footerLink.href} label="More" />
        ) : null}
      </Stack>
      {isLoading ? <ListSkeleton count={6} /> : null}
      {!isLoading && rows.length === 0 ? (
        <Typography color="text.secondary" fontSize={13}>
          No guides are available.
        </Typography>
      ) : null}
      {!isLoading ? (
        <Stack spacing={0} sx={{ flex: 1 }}>
          {rows.map((row, index) => (
            <GuideItem index={index} key={row.href} row={row} />
          ))}
        </Stack>
      ) : null}
    </Panel>
  );
}

function GuideItem({ index, row }: { index: number; row: GuideRow }) {
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
        sx={(theme) => {
          const tone = getGuideTone(row, index, theme.workspace.colors);
          return {
            alignItems: 'center',
            bgcolor: tone.background,
            borderRadius: '8px',
            color: tone.color,
            display: 'flex',
            flexShrink: 0,
            height: 30,
            justifyContent: 'center',
            width: 30,
          };
        }}
      >
        {getGuideIcon(row, index)}
      </Box>
      <Typography flex={1} fontSize={12} fontWeight={600} minWidth={0} noWrap>
        {row.title}
      </Typography>
      <Typography color="text.disabled" fontSize={10} flexShrink={0}>
        {row.meta}
      </Typography>
      <ChevronRightRoundedIcon sx={{ color: 'text.disabled', fontSize: 16 }} />
    </Box>
  );
}

function MoreLink({ href, label }: { href: string; label: string }) {
  return (
    <Stack
      alignItems="center"
      color="text.disabled"
      component={SmartLink}
      direction="row"
      fontSize={11}
      fontWeight={500}
      href={href}
      spacing={0.25}
      sx={{
        ml: 'auto',
        textDecoration: 'none',
        textTransform: 'none',
        '&:hover': { color: 'primary.main' },
      }}
    >
      {label}
      <ChevronRightRoundedIcon sx={{ fontSize: 15 }} />
    </Stack>
  );
}

function getGuideIcon(row: GuideRow, index: number) {
  const sx = { fontSize: 17 };
  const guideType = getGuideType(row, index);

  if (guideType === 'start') return <PlayCircleRoundedIcon sx={sx} />;
  if (guideType === 'security') return <SecurityRoundedIcon sx={sx} />;
  if (guideType === 'gpu') return <MemoryRoundedIcon sx={sx} />;
  if (guideType === 'mcp') return <ExtensionRoundedIcon sx={sx} />;
  if (guideType === 'project') return <BuildRoundedIcon sx={sx} />;
  if (guideType === 'keycenter') return <KeyRoundedIcon sx={sx} />;

  return <GridViewRoundedIcon sx={sx} />;
}

function getGuideTone(
  row: GuideRow,
  index: number,
  colors: {
    blue: string;
    blueBackground: string;
    brand: string;
    brandBackground: string;
    green: string;
    greenBackground: string;
    purple: string;
    purpleBackground: string;
  },
) {
  const guideType = getGuideType(row, index);

  if (guideType === 'start' || guideType === 'project') {
    return { background: colors.blueBackground, color: colors.blue };
  }

  if (guideType === 'security' || guideType === 'keycenter') {
    return { background: colors.brandBackground, color: colors.brand };
  }

  if (guideType === 'gpu') return { background: colors.greenBackground, color: colors.green };
  if (guideType === 'mcp') return { background: colors.purpleBackground, color: colors.purple };

  return { background: '#fef9c3', color: '#ca8a04' };
}

function getGuideType(row: GuideRow, index: number) {
  const text = `${row.title} ${row.meta} ${row.href}`.toLowerCase();

  if (text.includes('getting-started') || text.includes('처음')) return 'start';
  if (text.includes('keycenter') || text.includes('shared-key')) return 'keycenter';
  if (text.includes('project') || text.includes('프로젝트')) return 'project';
  if (text.includes('sso') || text.includes('security')) return 'security';
  if (text.includes('gpu')) return 'gpu';
  if (text.includes('mcp')) return 'mcp';
  if (index === 4) return 'project';

  return 'other';
}
