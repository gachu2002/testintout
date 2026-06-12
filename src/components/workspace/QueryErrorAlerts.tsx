import { Alert } from '@mui/material';

type QueryErrorAlert = {
  isError: boolean;
  message: string;
};

export function QueryErrorAlerts({ alerts }: { alerts: QueryErrorAlert[] }) {
  return (
    <>
      {alerts.map((alert) =>
        alert.isError ? (
          <Alert key={alert.message} severity="warning">
            {alert.message}
          </Alert>
        ) : null,
      )}
    </>
  );
}
