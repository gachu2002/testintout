import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Empty = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.workspace.colors.borderStrong}`,
  borderRadius: theme.workspace.radii.xl,
  color: theme.palette.text.disabled,
  fontSize: 13,
  padding: theme.spacing(3.5),
  textAlign: 'center',
}));
