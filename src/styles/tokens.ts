const colors = {
  background: '#f4f6f9',
  blue: '#0086cc',
  blueBackground: '#e2f3ff',
  border: '#ebedf0',
  borderStrong: '#d6d8db',
  brand: '#b40e4d',
  brandBackground: '#feeff5',
  brandDark: '#870839',
  brandHover: '#d5115b',
  cyan: '#22d3ee',
  green: '#0d9488',
  greenBackground: '#ecfdf5',
  indigo: '#4f46e5',
  neutral: '#6b7280',
  neutralBackground: '#f3f4f6',
  orange: '#e07020',
  orangeBackground: '#fff1e7',
  purple: '#7c5fcf',
  purpleBackground: '#f1e7ff',
  red: '#b91c1c',
  redBackground: '#fee2e2',
  surface: '#ffffff',
  surfaceSoft: '#fbfcfe',
  textPrimary: '#2f3236',
  textSecondary: '#5f656d',
  textTertiary: '#9298a0',
} as const;

export const workspaceTokens = {
  colors,
  focus: {
    outline: `3px solid rgba(180, 14, 77, 0.28)`,
    outlineOffset: 2,
  },
  gradients: {
    aiBadge: 'linear-gradient(135deg, #f6f0ff 0%, #eef4ff 100%)',
    blueCyan: 'linear-gradient(135deg, #4f8cff, #22d3ee)',
    brandCard:
      'radial-gradient(circle at top right, rgba(180,14,77,.08), transparent 36%), linear-gradient(180deg, #ffffff 0%, #fcfbfd 100%)',
    brandCollection:
      'radial-gradient(circle at top right, rgba(180,14,77,.08), transparent 36%), linear-gradient(180deg, #ffffff 0%, #fcfbfd 100%)',
    cardSurface: 'linear-gradient(180deg, #ffffff 0%, #fbfbfd 100%)',
    featureSurface:
      'radial-gradient(circle at top right, rgba(34,211,238,.16), transparent 34%), linear-gradient(145deg, #f6f9ff 0%, #ffffff 68%)',
    heroSurface:
      'radial-gradient(circle at top right, rgba(180,14,77,.12), transparent 40%), linear-gradient(140deg, #ffffff 0%, #fbfcff 100%)',
    menuSurface: 'linear-gradient(180deg, rgba(247,248,251,.98) 0%, rgba(243,245,249,.98) 100%)',
    pageSurface:
      'radial-gradient(circle at top left, rgba(180,14,77,.09), transparent 28%), linear-gradient(180deg, #f7f8fb 0%, #f4f6f9 100%)',
    resourceCard:
      'radial-gradient(circle at top right, rgba(180,14,77,.1), transparent 32%), linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)',
    resourcePanel: 'linear-gradient(180deg, rgba(255,255,255,.82) 0%, rgba(246,248,251,.9) 100%)',
    softPanel: 'linear-gradient(180deg, #ffffff 0%, #fff9fb 100%)',
    subtleRail: 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)',
  },
  hubThemes: {
    agents: {
      accent: '#22d3ee',
      background: '#ede9fe',
      brand: '#7c3aed',
      hover: '#6d28d9',
      soft: 'rgba(124, 58, 237, .14)',
    },
    buckets: {
      accent: '#2dd4bf',
      background: '#ccfbf1',
      brand: '#0f766e',
      hover: '#115e59',
      soft: 'rgba(15, 118, 110, .14)',
    },
    chatbots: {
      accent: '#06b6d4',
      background: '#dbeafe',
      brand: '#2563eb',
      hover: '#1d4ed8',
      soft: 'rgba(37, 99, 235, .14)',
    },
    consoles: {
      accent: '#22d3ee',
      background: '#ccfbf1',
      brand: '#0f766e',
      hover: '#0b5d57',
      soft: 'rgba(15, 118, 110, .14)',
    },
    database: {
      accent: '#06b6d4',
      background: '#dbeafe',
      brand: '#2563eb',
      hover: '#1d4ed8',
      soft: 'rgba(37, 99, 235, .14)',
    },
    domain: {
      accent: '#60a5fa',
      background: '#e0e7ff',
      brand: '#4f46e5',
      hover: '#4338ca',
      soft: 'rgba(79, 70, 229, .14)',
    },
    permissions: {
      accent: '#fb7185',
      background: '#fce7f3',
      brand: '#be185d',
      hover: '#9d174d',
      soft: 'rgba(190, 24, 93, .14)',
    },
    store: {
      accent: colors.purple,
      background: colors.brandBackground,
      brand: colors.brand,
      hover: colors.brandHover,
      soft: 'rgba(180, 14, 77, .14)',
    },
    tools: {
      accent: '#38bdf8',
      background: '#ccfbf1',
      brand: '#0f766e',
      hover: '#0b5f58',
      soft: 'rgba(15, 118, 110, .14)',
    },
  },
  layout: {
    compactRailWidth: 320,
    detailPageMaxWidth: 1320,
    gap: 20,
    navMaxWidth: 1520,
    pageMaxWidth: 1280,
    radius: 14,
    railWidth: 340,
    topbarHeight: 56,
  },
  radii: {
    card: 22,
    lg: 14,
    md: 12,
    pill: 999,
    sm: 8,
    xl: 18,
    xs: 6,
  },
  shadows: {
    card: '0 12px 28px rgba(15,23,42,.08)',
    icon: '0 8px 18px rgba(15,23,42,.12)',
    interactive: '0 22px 40px rgba(15,23,42,.09), 0 2px 0 rgba(255,255,255,.9) inset',
    panel: 'inset 0 1px 0 rgba(255,255,255,.78), 0 10px 26px rgba(15,23,42,.04)',
    popover: '0 18px 36px rgba(15,23,42,.08)',
    raised: '0 18px 50px rgba(15, 23, 42, 0.08)',
    soft: '0 16px 34px rgba(15,23,42,.06)',
  },
  tones: {
    draft: {
      background: colors.neutralBackground,
      color: colors.neutral,
    },
    healthy: {
      background: colors.greenBackground,
      color: colors.green,
    },
    incident: {
      background: colors.redBackground,
      color: colors.red,
    },
    info: {
      background: colors.brandBackground,
      color: colors.brand,
    },
    muted: {
      background: colors.neutralBackground,
      color: colors.neutral,
    },
    pending: {
      background: colors.blueBackground,
      color: colors.blue,
    },
    review: {
      background: colors.blueBackground,
      color: colors.blue,
    },
    warn: {
      background: colors.orangeBackground,
      color: colors.orange,
    },
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
    weights: {
      bold: 700,
      extraBold: 800,
      medium: 500,
      regular: 400,
      semibold: 600,
    },
  },
} as const;

export type HubThemeName = keyof typeof workspaceTokens.hubThemes;
export type ToneName = keyof typeof workspaceTokens.tones;
