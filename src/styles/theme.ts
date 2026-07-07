import { alpha, createTheme } from '@mui/material/styles';

import { workspaceTokens } from '@/styles/tokens';

export type WorkspaceThemeTokens = typeof workspaceTokens;

declare module '@mui/material/styles' {
  interface Theme {
    workspace: WorkspaceThemeTokens;
  }

  interface ThemeOptions {
    workspace?: WorkspaceThemeTokens;
  }
}

const { colors } = workspaceTokens;

export const workspaceTheme = createTheme({
  workspace: workspaceTokens,
  palette: {
    mode: 'light',
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    primary: {
      contrastText: '#fff',
      main: colors.brand,
      dark: colors.brandDark,
      light: colors.brandHover,
    },
    secondary: {
      contrastText: '#fff',
      main: colors.blue,
      dark: '#006aa3',
      light: colors.cyan,
    },
    divider: colors.border,
    error: {
      main: colors.red,
      light: colors.redBackground,
    },
    info: {
      main: colors.blue,
      light: colors.blueBackground,
    },
    success: {
      main: colors.green,
      light: colors.greenBackground,
    },
    warning: {
      main: colors.orange,
      light: colors.orangeBackground,
    },
    text: {
      disabled: colors.textTertiary,
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  shape: {
    borderRadius: workspaceTokens.layout.radius,
  },
  typography: {
    fontFamily: workspaceTokens.typography.fontFamily.join(','),
    h1: {
      fontWeight: workspaceTokens.typography.weights.extraBold,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontWeight: workspaceTokens.typography.weights.extraBold,
      letterSpacing: '-0.035em',
    },
    h3: {
      fontWeight: 760,
      letterSpacing: '-0.03em',
    },
    h4: {
      fontWeight: 730,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: workspaceTokens.typography.weights.bold,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: workspaceTokens.typography.weights.bold,
      letterSpacing: '-0.015em',
    },
    button: {
      fontWeight: workspaceTokens.typography.weights.bold,
      textTransform: 'none',
    },
    caption: {
      color: colors.textTertiary,
      fontSize: 11,
      lineHeight: 1.45,
    },
    overline: {
      color: colors.textTertiary,
      fontSize: 11,
      fontWeight: workspaceTokens.typography.weights.extraBold,
      letterSpacing: '0.08em',
      lineHeight: 1.4,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: workspaceTokens.typography.weights.extraBold,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: workspaceTokens.radii.button,
          boxShadow: 'none',
          fontSize: 13,
          fontWeight: workspaceTokens.typography.weights.bold,
          minHeight: 34,
          textTransform: 'none',
          transition:
            'background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease',
          '&:focus-visible': {
            outline: workspaceTokens.focus.outline,
            outlineOffset: workspaceTokens.focus.outlineOffset,
          },
        },
        containedPrimary: {
          boxShadow: `0 10px 24px ${alpha(colors.brand, 0.16)}`,
          '&:hover': {
            backgroundColor: colors.brandHover,
            boxShadow: `0 12px 26px ${alpha(colors.brand, 0.2)}`,
          },
        },
        outlined: {
          backgroundColor: alpha(colors.surface, 0.72),
          borderColor: alpha(colors.borderStrong, 0.95),
          color: colors.textPrimary,
          '&:hover': {
            backgroundColor: colors.surface,
            borderColor: alpha(colors.brand, 0.22),
          },
        },
        sizeSmall: {
          borderRadius: 10,
          fontSize: 12,
          minHeight: 32,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: workspaceTokens.focus.outline,
            outlineOffset: workspaceTokens.focus.outlineOffset,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${colors.border}`,
          borderRadius: workspaceTokens.radii.xl,
          boxShadow: workspaceTokens.shadows.soft,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: workspaceTokens.radii.pill,
          fontSize: 10,
          fontWeight: workspaceTokens.typography.weights.extraBold,
          height: 29,
        },
        icon: {
          color: 'inherit',
          fontSize: 14,
        },
        label: {
          paddingInline: 10,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: workspaceTokens.gradients.pageSurface,
        },
        button: {
          font: 'inherit',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          border: `1px solid ${alpha(colors.borderStrong, 0.8)}`,
          borderRadius: workspaceTokens.radii.dialog,
          boxShadow: workspaceTokens.shadows.dialog,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: workspaceTokens.focus.outline,
            outlineOffset: workspaceTokens.focus.outlineOffset,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(colors.borderStrong, 0.7),
          borderRadius: workspaceTokens.radii.pill,
          height: 10,
        },
        bar: {
          borderRadius: workspaceTokens.radii.pill,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          border: `1px solid ${colors.border}`,
          boxShadow: workspaceTokens.shadows.popover,
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        rounded: {
          borderRadius: workspaceTokens.radii.lg,
        },
      },
    },
  },
});
