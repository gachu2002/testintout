import { Box, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { SmartLink } from '@/components/SmartLink';
import { Row } from '@/components/workspace/data';
import { focusVisibleStyles, shouldForwardProp } from '@/components/workspace/utils';
import type { HubThemeName } from '@/styles/tokens';

export const FilterBar = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
    gridTemplateColumns: '1fr',
  },
}));

export const FilterRow = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  minWidth: 0,
}));

export const FilterLabel = styled('span')(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.text.disabled,
  display: 'inline-flex',
  fontSize: 11,
  fontWeight: theme.workspace.typography.weights.extraBold,
  letterSpacing: '.06em',
  paddingRight: theme.spacing(0.5),
  textTransform: 'uppercase',
}));

export const ResultCount = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.background.paper, 0.86),
  border: `1px solid ${theme.workspace.colors.border}`,
  borderRadius: theme.workspace.radii.pill,
  color: theme.palette.text.secondary,
  display: 'inline-flex',
  fontSize: 11,
  fontWeight: theme.workspace.typography.weights.extraBold,
  lineHeight: 1.3,
  padding: theme.spacing(0.75, 1.25),
  whiteSpace: 'nowrap',
}));

export const RowList = styled(Box, {
  shouldForwardProp,
})<{ dense?: boolean }>(({ dense = false, theme }) => ({
  display: 'grid',
  gap: theme.spacing(dense ? 1.25 : 1.5),
}));

export const ListRow = styled(Row, {
  shouldForwardProp,
})<{ center?: boolean; compact?: boolean }>(({ center = false, compact = false, theme }) => ({
  alignItems: center ? 'center' : 'flex-start',
  backgroundColor: alpha(theme.palette.background.default, 0.88),
  borderColor: alpha(theme.workspace.colors.borderStrong, 0.78),
  borderRadius: compact ? 16 : theme.workspace.radii.xl,
  padding: compact ? theme.spacing(1.45) : theme.spacing(1.75),
}));

export const RowCopy = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.5),
  minWidth: 0,
}));

export const RowTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 13,
  fontWeight: theme.workspace.typography.weights.extraBold,
  lineHeight: 1.35,
}));

export const RowMeta = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 11,
  lineHeight: 1.55,
}));

export const RowLink = styled(SmartLink, {
  shouldForwardProp,
})<{ hub?: HubThemeName }>(({ hub, theme }) => {
  const hubTheme = hub ? theme.workspace.hubThemes[hub] : undefined;
  const linkColor = hubTheme?.brand ?? theme.palette.primary.main;

  return {
    color: 'inherit',
    fontSize: 13,
    fontWeight: theme.workspace.typography.weights.bold,
    lineHeight: 1.45,
    textDecoration: 'none',
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      color: linkColor,
    },
    ...focusVisibleStyles(theme),
  };
});

export const FooterLink = styled(SmartLink, {
  shouldForwardProp,
})<{ hub?: HubThemeName }>(({ hub, theme }) => {
  const hubTheme = hub ? theme.workspace.hubThemes[hub] : undefined;
  const linkColor = hubTheme?.brand ?? theme.palette.primary.main;
  const hoverColor = hubTheme?.hover ?? theme.palette.primary.dark;

  return {
    alignItems: 'center',
    color: linkColor,
    display: 'inline-flex',
    fontSize: 12,
    fontWeight: theme.workspace.typography.weights.extraBold,
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(1.75),
    textDecoration: 'none',
    width: 'fit-content',
    '&:hover': {
      color: hoverColor,
    },
    ...focusVisibleStyles(theme),
  };
});

export const SummaryHeader = styled(Box)(({ theme }) => ({
  alignItems: 'baseline',
  display: 'flex',
  gap: theme.spacing(0.75),
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1.25),
}));

export const SummaryLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 11,
  fontWeight: theme.workspace.typography.weights.extraBold,
  letterSpacing: '.08em',
  textTransform: 'uppercase',
}));

export const SummaryValue = styled(Typography, {
  shouldForwardProp,
})<{ hub?: HubThemeName }>(({ hub, theme }) => ({
  color: hub ? theme.workspace.hubThemes[hub].brand : theme.palette.primary.main,
  fontSize: 12,
  fontWeight: theme.workspace.typography.weights.extraBold,
}));

export const DetailGroup = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${alpha(theme.workspace.colors.borderStrong, 0.72)}`,
  marginTop: theme.spacing(1.75),
  paddingTop: theme.spacing(1.75),
}));

export const StatGrid = styled(Box, {
  shouldForwardProp,
})<{ cols?: 2 | 3 | 4 }>(({ cols = 4, theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
  marginTop: theme.spacing(2.75),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));
