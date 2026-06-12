import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

import { workspaceTheme } from '@/styles/theme';

export function AppThemeProvider({ children }: PropsWithChildren) {
  return (
    <MuiThemeProvider theme={workspaceTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
