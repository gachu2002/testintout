import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@/features/app-shell/components/AppHeader';

const PageShell = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  minHeight: '100vh',
}));

const PageContainer = styled(Container)(({ theme }) => ({
  maxWidth: theme.workspace.layout.pageMaxWidth,
  paddingBottom: theme.spacing(9),
  paddingTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    paddingBottom: theme.spacing(7),
    paddingTop: theme.spacing(2),
  },
}));

export function AppShell() {
  return (
    <PageShell>
      <AppHeader />
      <Box component="main">
        <PageContainer maxWidth={false}>
          <Outlet />
        </PageContainer>
      </Box>
    </PageShell>
  );
}
