import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { QueryProvider } from '@/app/providers/QueryProvider';
import { AppThemeProvider } from '@/app/providers/ThemeProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <AppThemeProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AppThemeProvider>
    </QueryProvider>
  );
}
