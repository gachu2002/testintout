import { Box, CircularProgress } from '@mui/material';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { useAuthBootstrap } from '@/features/auth/hooks/useAuthBootstrap';

export function AuthGate({ children }: PropsWithChildren) {
  const { accountSetting, isAuthenticated, loading } = useAuthBootstrap();

  useEffect(() => {
    if (accountSetting?.language) {
      document.documentElement.lang = accountSetting.language;
    }
  }, [accountSetting?.language]);

  if (loading) {
    return (
      <Box
        aria-label="Loading workspace"
        role="status"
        sx={{
          alignItems: 'center',
          display: 'grid',
          minHeight: '100vh',
          placeItems: 'center',
        }}
      >
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
