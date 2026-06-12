import { AppProviders } from '@/app/providers/AppProviders';
import { AuthGate } from '@/features/auth/components/AuthGate';
import { AppRouter } from '@/routes/AppRouter';

export function App() {
  return (
    <AppProviders>
      <AuthGate>
        <AppRouter />
      </AuthGate>
    </AppProviders>
  );
}
