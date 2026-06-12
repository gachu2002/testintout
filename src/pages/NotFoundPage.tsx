import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Paper sx={{ border: 1, borderColor: 'divider', p: { xs: 3, md: 4 } }}>
      <Stack alignItems="flex-start" spacing={2}>
        <Typography color="primary" fontWeight={800} variant="overline">
          404
        </Typography>
        <Typography component="h1" variant="h4">
          Page not found
        </Typography>
        <Typography color="text.secondary" maxWidth={680} variant="body1">
          The route does not exist in this demo yet.
        </Typography>
        <Button component={RouterLink} startIcon={<HomeRoundedIcon />} to="/" variant="contained">
          Go home
        </Button>
      </Stack>
    </Paper>
  );
}
