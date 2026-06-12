import { alpha } from '@mui/material/styles';

export function iconGradient(color: string) {
  return `linear-gradient(135deg, ${alpha(color, 0.72)}, ${color})`;
}
