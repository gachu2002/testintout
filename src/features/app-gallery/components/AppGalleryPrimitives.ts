import { Box, Chip, Stack } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { Kicker, Panel, Pill, SoftPanel, SurfaceCard } from '@/components/workspace';

export const PageHeader = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1.75),
}));

export const SectionLabel = styled(Kicker)(() => ({}));

export const TagRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

export const TagChip = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  borderColor: alpha(theme.workspace.colors.blueBackground, 0.95),
  color: theme.palette.text.secondary,
  fontSize: 10,
  fontWeight: 800,
  height: 29,
  '& .MuiChip-icon': {
    color: 'inherit',
    fontSize: 14,
  },
}));

export const HeroRail = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const RailCard = styled(Box)(({ theme }) => ({
  background: theme.workspace.gradients.subtleRail,
  border: `1px solid ${theme.workspace.colors.border}`,
  borderRadius: theme.workspace.radii.xl,
  padding: theme.spacing(2.25),
}));

export const MainLayout = styled(Box)(({ theme }) => ({
  alignItems: 'start',
  display: 'grid',
  gap: theme.workspace.layout.gap,
  gridTemplateColumns: `minmax(0, 1fr) ${theme.workspace.layout.compactRailWidth}px`,
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const PanelCard = styled(Panel)(() => ({}));

export const SoftPanelCard = styled(SoftPanel)(() => ({}));

export const FeaturedGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.75),
  gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, .85fr)',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const FeatureCard = styled(Box)(({ theme }) => ({
  background: theme.workspace.gradients.featureSurface,
  border: `1px solid ${alpha(theme.workspace.colors.indigo, 0.12)}`,
  borderRadius: theme.workspace.radii.xl,
  padding: theme.spacing(2.75),
}));

export const CardGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.75),
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const StoreCard = styled(SurfaceCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 246,
  padding: theme.spacing(2.25),
}));

export const CategoryButton = styled(Pill)({
  fontSize: 12,
  fontWeight: 800,
  height: 34,
});

export const CollectionGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.75),
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const CollectionCard = styled(Box)(({ theme }) => ({
  background: theme.workspace.gradients.brandCollection,
  border: `1px solid ${theme.workspace.colors.border}`,
  borderRadius: theme.workspace.radii.xl,
  padding: theme.spacing(2.25),
}));

export const SideRowGrid = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'grid',
  gap: theme.spacing(1.25),
  gridTemplateColumns: 'auto minmax(0, 1fr) auto',
}));
