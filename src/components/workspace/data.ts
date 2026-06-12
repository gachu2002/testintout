import { Box, ButtonBase, LinearProgress } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { focusVisibleStyles, hubGradient, shouldForwardProp } from '@/components/workspace/utils';
import type { HubThemeName, ToneName } from '@/styles/tokens';

export const IconTile = styled(Box, {
  shouldForwardProp,
})<{
  tileBackground?: string;
  tileColor?: string;
  tileSize?: number;
  hub?: HubThemeName;
  tone?: ToneName;
}>(({ hub, theme, tileBackground, tileColor = '#fff', tileSize = 38, tone }) => {
  const hubTheme = hub ? theme.workspace.hubThemes[hub] : undefined;

  return {
    alignItems: 'center',
    background:
      tileBackground ??
      (hubTheme ? hubGradient(hubTheme.brand, hubTheme.accent) : undefined) ??
      (tone ? theme.workspace.tones[tone].color : theme.workspace.gradients.blueCyan),
    borderRadius: tileSize > 36 ? 13 : 11,
    boxShadow: tileSize >= 38 ? theme.workspace.shadows.icon : 'none',
    color: tileColor,
    display: 'inline-flex',
    flexShrink: 0,
    height: tileSize,
    justifyContent: 'center',
    width: tileSize,
  };
});

export const Badge = styled('span', {
  shouldForwardProp,
})<{ dot?: boolean; tone?: ToneName }>(({ dot = false, theme, tone = 'info' }) => {
  const value = theme.workspace.tones[tone];

  return {
    alignItems: 'center',
    backgroundColor: value.background,
    borderRadius: theme.workspace.radii.pill,
    color: value.color,
    display: 'inline-flex',
    flexShrink: 0,
    fontSize: 10,
    fontWeight: 800,
    gap: 5,
    letterSpacing: '0.02em',
    lineHeight: 1,
    padding: theme.spacing(0.75, 1),
    whiteSpace: 'nowrap',
    ...(dot
      ? {
          '&::before': {
            background: 'currentColor',
            borderRadius: '50%',
            content: '""',
            height: 6,
            width: 6,
          },
        }
      : {}),
  };
});

export const Pill = styled(ButtonBase, {
  shouldForwardProp,
})<{ active?: boolean; hub?: HubThemeName; tone?: ToneName }>(({
  active = false,
  hub,
  theme,
  tone = 'info',
}) => {
  const hubTheme = hub ? theme.workspace.hubThemes[hub] : undefined;
  const toneValue = theme.workspace.tones[tone];
  const value = hubTheme
    ? {
        background: hubTheme.background,
        color: hubTheme.brand,
      }
    : toneValue;

  return {
    alignItems: 'center',
    backgroundColor: active ? value.background : alpha(theme.palette.background.paper, 0.84),
    border: `1px solid ${active ? alpha(value.color, 0.22) : theme.workspace.colors.border}`,
    borderRadius: theme.workspace.radii.pill,
    color: active ? value.color : theme.palette.text.secondary,
    display: 'inline-flex',
    fontSize: 12,
    fontWeight: 700,
    gap: theme.spacing(0.625),
    height: 36,
    padding: theme.spacing(0, 1.75),
    transition: theme.transitions.create(
      ['background-color', 'border-color', 'box-shadow', 'color'],
      {
        duration: theme.transitions.duration.shortest,
      },
    ),
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: value.background,
      borderColor: alpha(value.color, 0.22),
      color: value.color,
    },
    ...(active
      ? {
          boxShadow: `inset 0 0 0 1px ${alpha(value.color, 0.05)}`,
        }
      : {}),
    ...focusVisibleStyles(theme),
  };
});

export const Metric = styled('span')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.background.default, 0.95),
  border: `1px solid ${alpha(theme.workspace.colors.borderStrong, 0.72)}`,
  borderRadius: theme.workspace.radii.pill,
  color: theme.palette.text.secondary,
  display: 'inline-flex',
  fontSize: 10,
  fontWeight: 700,
  gap: theme.spacing(0.625),
  padding: theme.spacing(0.75, 1.25),
  '& .MuiSvgIcon-root': {
    color: theme.palette.text.disabled,
    fontSize: 13,
  },
}));

export const Tag = styled('span')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.background.paper, 0.92),
  border: `1px solid ${alpha(theme.workspace.colors.borderStrong, 0.9)}`,
  borderRadius: theme.workspace.radii.pill,
  color: theme.palette.text.secondary,
  display: 'inline-flex',
  fontSize: 10,
  fontWeight: 700,
  gap: theme.spacing(0.625),
  padding: theme.spacing(0.75, 1.25),
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    fontSize: 13,
  },
}));

export const Row = styled(Box)(({ theme }) => ({
  alignItems: 'flex-start',
  backgroundColor: alpha(theme.palette.background.default, 0.88),
  border: `1px solid ${alpha(theme.workspace.colors.borderStrong, 0.72)}`,
  borderRadius: theme.workspace.radii.xl,
  display: 'flex',
  gap: theme.spacing(1.5),
  justifyContent: 'space-between',
  minWidth: 0,
  padding: theme.spacing(1.75),
}));

export const Meter = styled(LinearProgress, {
  shouldForwardProp,
})<{ fill?: string }>(({ fill, theme }) => ({
  '& .MuiLinearProgress-bar': {
    background:
      fill ??
      `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
    boxShadow: '0 6px 16px rgba(15,23,42,.14)',
  },
}));
