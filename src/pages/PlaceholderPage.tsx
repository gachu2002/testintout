import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';

type PlaceholderPageProps = {
  description: string;
  title: string;
};

export function PlaceholderPage({ description, title }: PlaceholderPageProps) {
  const params = useParams();

  return (
    <Paper sx={{ border: 1, borderColor: 'divider', p: { xs: 3, md: 4 } }}>
      <Stack alignItems="flex-start" spacing={2}>
        <Typography color="primary" fontWeight={800} variant="overline">
          {params.section ?? 'Coming soon'}
        </Typography>
        <Typography component="h1" variant="h4">
          {title}
        </Typography>
        <Typography color="text.secondary" maxWidth={680} variant="body1">
          {description}
        </Typography>
        <Button
          component={RouterLink}
          startIcon={<ArrowBackRoundedIcon />}
          to="/"
          variant="contained"
        >
          Back to Launchpad
        </Button>
      </Stack>
    </Paper>
  );
}
