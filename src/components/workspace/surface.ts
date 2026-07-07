import { Box, Paper } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import type { PanelKind } from '@/components/workspace/utils';
import { shouldForwardProp } from '@/components/workspace/utils';
import type { HubThemeName } from '@/styles/tokens';

export const Panel = styled(Paper, {
  shouldForwardProp,
})<{ hub?: HubThemeName; kind?: PanelKind }>(({ hub, kind = 'plain', theme }) => {
  const hubTheme = hub ? theme.workspace.hubThemes[hub] : undefined;

  return {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.workspace.colors.border}`,
    borderRadius: theme.workspace.layout.radius,
    boxShadow: 'none',
    padding: theme.spacing(2.5),
    ...(kind === 'hero'
      ? {
          background: `radial-gradient(circle at top right, ${hubTheme?.soft ?? 'rgba(180,14,77,.12)'}, transparent 40%), linear-gradient(140deg, #ffffff 0%, #fbfcff 100%)`,
          borderColor: alpha(theme.workspace.colors.borderStrong, 0.76),
          boxShadow: theme.workspace.shadows.panel,
          padding: theme.spacing(3.5),
          [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2.5),
          },
        }
      : {}),
    ...(kind === 'resource'
      ? {
          background: theme.workspace.gradients.resourcePanel,
          borderColor: alpha(theme.workspace.colors.borderStrong, 0.72),
          boxShadow: theme.workspace.shadows.panel,
          padding: theme.spacing(2.75),
        }
      : {}),
    ...(kind === 'soft'
      ? {
          background: theme.workspace.gradients.softPanel,
          borderColor: alpha(theme.palette.primary.main, 0.16),
          boxShadow: theme.workspace.shadows.soft,
        }
      : {}),
  };
});

export const SoftPanel = styled(Panel)(({ theme }) => ({
  background: theme.workspace.gradients.softPanel,
  borderColor: alpha(theme.palette.primary.main, 0.16),
  boxShadow: theme.workspace.shadows.soft,
}));

export const SurfaceCard = styled(Box)(({ theme }) => ({
  background: theme.workspace.gradients.cardSurface,
  border: `1px solid ${theme.workspace.colors.border}`,
  borderRadius: theme.workspace.radii.xl,
  minWidth: 0,
}));

export const CardBox = styled(SurfaceCard)(({ theme }) => ({
  padding: theme.spacing(2.25),
}));

export const HoverCard = styled(CardBox, {
  shouldForwardProp,
})<{ hub?: HubThemeName }>(({ hub, theme }) => {
  const hubTheme = hub ? theme.workspace.hubThemes[hub] : undefined;

  return {
    background: `radial-gradient(circle at top right, ${hubTheme?.soft ?? 'rgba(180,14,77,.1)'}, transparent 32%), linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)`,
    borderColor: alpha(theme.workspace.colors.borderStrong, 0.94),
    borderRadius: theme.workspace.radii.resourceCard,
    boxShadow: theme.workspace.shadows.resourceCard,
    transition: theme.transitions.create(['border-color', 'box-shadow', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      borderColor: alpha(hubTheme?.brand ?? theme.palette.primary.main, 0.18),
      boxShadow: theme.workspace.shadows.resourceCardHover,
      transform: 'translateY(-2px)',
    },
  };
});
