import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Box, InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

import { SectionStatusBadge } from '@/components/reference-status';
import { appShellSectionStatus } from '@/features/app-shell/sectionStatus';
import { useAppStore } from '@/stores/appStore';

const SearchBox = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  border: `1.5px solid ${theme.workspace.colors.border}`,
  borderRadius: 999,
  display: 'flex',
  flex: '1 1 260px',
  gap: theme.spacing(1),
  height: 36,
  maxWidth: 440,
  minWidth: 120,
  padding: theme.spacing(0, 1.25, 0, 1.5),
  transition: theme.transitions.create(['background-color', 'border-color', 'box-shadow'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:focus-within': {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.08)}`,
  },
  [theme.breakpoints.down('sm')]: {
    flexBasis: 120,
  },
}));

const AiBadge = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background: 'linear-gradient(135deg, #f6f0ff 0%, #eef4ff 100%)',
  border: `1px solid ${alpha(theme.workspace.colors.purple, 0.18)}`,
  borderRadius: 999,
  color: theme.workspace.colors.purple,
  display: 'inline-flex',
  fontSize: 10,
  fontWeight: 800,
  gap: 3,
  height: 22,
  letterSpacing: '0.02em',
  padding: theme.spacing(0, 0.875),
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export function AppHeaderSearch() {
  const { pathname } = useLocation();
  const searchQuery = useAppStore((state) => state.searchQueriesByPath[pathname] ?? '');
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);

  return (
    <SearchBox role="search">
      <SearchRoundedIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
      <InputBase
        fullWidth
        inputProps={{ 'aria-label': 'Search apps, work tools, and recommendations' }}
        onChange={(event) => setSearchQuery(pathname, event.target.value)}
        placeholder="Search apps, work tools, and recommendations..."
        sx={{ fontSize: 13 }}
        value={searchQuery}
      />
      <AiBadge>
        <AutoAwesomeRoundedIcon sx={{ fontSize: 12 }} />
        AI
      </AiBadge>
      <SectionStatusBadge status={appShellSectionStatus.globalSearch} />
    </SearchBox>
  );
}
