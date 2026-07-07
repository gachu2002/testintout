import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import type { LaunchpadHero } from '@/features/launchpad/types';
import type { ReferenceBannerSlide } from '@/features/launchpad/utils/bannerSlides';

export function DejSnapshot({
  hero,
  slide,
}: {
  hero?: LaunchpadHero;
  slide: ReferenceBannerSlide;
}) {
  const rows =
    slide.snapshotRows ??
    (hero?.heroStats ?? []).slice(0, 3).map((row) => ({
      description: row.note ? `${row.value} · ${row.note}` : row.value,
      icon: row.icon,
      title: row.label,
    }));

  return (
    <Box
      sx={{
        backdropFilter: 'blur(12px)',
        bgcolor: alpha('#fff', 0.1),
        border: `1px solid ${alpha('#fff', 0.16)}`,
        borderRadius: '18px',
        boxShadow: `inset 0 1px 0 ${alpha('#fff', 0.12)}`,
        display: 'grid',
        gap: 1,
        p: 1.75,
        width: { md: 300, xs: '100%' },
      }}
    >
      <Typography color="rgba(255,255,255,.72)" fontSize={11} fontWeight={800}>
        {slide.snapshotTitle || hero?.workspaceName || 'DEJ Workspace'}
      </Typography>
      {rows.map((row) => (
        <Box
          key={`${row.title}-${row.description}`}
          sx={{
            alignItems: 'center',
            bgcolor: 'rgba(255,255,255,.92)',
            border: `1px solid ${alpha('#fff', 0.14)}`,
            borderRadius: '13px',
            display: 'grid',
            gap: 1.25,
            gridTemplateColumns: '34px minmax(0, 1fr)',
            p: 1.25,
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(255,255,255,.96), rgba(207,244,255,.92))',
              borderRadius: '12px',
              color: '#0369a1',
              display: 'flex',
              height: 34,
              justifyContent: 'center',
              width: 34,
            }}
          >
            <WorkspaceIcon name={row.icon} sx={{ fontSize: 18 }} />
          </Box>
          <Box minWidth={0}>
            <Typography color="text.primary" fontSize={13} fontWeight={800} letterSpacing="-.03em">
              {row.title}
            </Typography>
            <Typography color="text.secondary" fontSize={11} lineHeight={1.4} sx={{ mt: 0.25 }}>
              {row.description}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export function DejPipelineBackground() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        inset: 0,
        opacity: 0.7,
        overflow: 'hidden',
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: 0,
        '&::before': {
          background:
            'linear-gradient(28deg, transparent 0 22%, rgba(125,211,252,.18) 22.3%, transparent 22.8% 42%, rgba(125,211,252,.1) 42.3%, transparent 42.8%), linear-gradient(147deg, transparent 0 30%, rgba(255,255,255,.12) 30.2%, transparent 30.7% 58%, rgba(34,211,238,.1) 58.2%, transparent 58.8%), radial-gradient(circle at 8% 58%, rgba(125,211,252,.7) 0 1.5px, transparent 2.8px), radial-gradient(circle at 18% 18%, rgba(255,255,255,.65) 0 1.3px, transparent 2.8px), radial-gradient(circle at 30% 72%, rgba(125,211,252,.72) 0 1.4px, transparent 2.8px), radial-gradient(circle at 47% 30%, rgba(255,255,255,.7) 0 1.4px, transparent 2.8px), radial-gradient(circle at 67% 68%, rgba(125,211,252,.55) 0 1.4px, transparent 2.8px), radial-gradient(circle at 86% 22%, rgba(255,255,255,.55) 0 1.2px, transparent 2.8px)',
          content: '""',
          inset: -18,
          opacity: 0.46,
          position: 'absolute',
        },
      }}
    >
      <Box
        sx={{
          filter: 'drop-shadow(0 0 16px rgba(125,211,252,.18))',
          height: 118,
          left: '34%',
          opacity: 0.7,
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -48%)',
          width: 360,
        }}
      >
        <PipelineLoop side="left" />
        <PipelineLoop side="right" />
        <Box
          sx={{
            border: '10px solid rgba(188,218,232,.28)',
            borderLeftColor: 'rgba(188,218,232,.16)',
            borderRadius: '16px',
            borderRightColor: 'rgba(188,218,232,.16)',
            boxShadow: '0 0 24px rgba(125,211,252,.1)',
            height: 38,
            left: '50%',
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(-8deg)',
            width: 78,
          }}
        />
        <PipelineLabel label="CEJ" side="left" text="Customer Experience Journey" />
        <PipelineLabel label="DEJ" side="right" text="Development Experience Journey" />
      </Box>
      <PipelineSideLabel label="Connectivity" sx={{ left: '19%', top: '28%' }} />
      <PipelineSideLabel label="Customization" sx={{ left: '14%', top: '48%' }} />
      <PipelineSideLabel label="Quality Integrity" sx={{ right: '20%', top: '38%' }} />
      <PipelineSideLabel label="Just-in-Time Dev" sx={{ right: '17%', top: '58%' }} />
      <PipelineSideLabel
        label="3C 2S customer experience data"
        noDot
        sx={{ left: '4%', top: '60%' }}
      />
      <PipelineSideLabel label="Core Value" noDot sx={{ right: '6%', top: '49%' }} />
    </Box>
  );
}

export function BannerVisualCard({ slide }: { slide: ReferenceBannerSlide }) {
  return (
    <Box
      sx={{
        backdropFilter: 'blur(12px)',
        bgcolor: 'rgba(255,255,255,.12)',
        border: '1px solid rgba(255,255,255,.18)',
        borderRadius: '18px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.14)',
        p: 2,
        width: { md: 292, xs: '100%' },
      }}
    >
      <Stack alignItems="center" direction="row" spacing={1.25}>
        <Box
          sx={{
            alignItems: 'center',
            bgcolor: 'rgba(255,255,255,.16)',
            borderRadius: '13px',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.14)',
            color: '#e0f7ff',
            display: 'flex',
            height: 38,
            justifyContent: 'center',
            width: 38,
          }}
        >
          <WorkspaceIcon
            name={slide.visualIcon || (slide.variant === 'security' ? 'security' : 'group')}
            sx={{ fontSize: 20 }}
          />
        </Box>
        <Typography
          color="rgba(255,255,255,.74)"
          fontSize={11}
          fontWeight={800}
          letterSpacing=".08em"
          textTransform="uppercase"
        >
          {slide.type.toUpperCase()}
        </Typography>
      </Stack>
      <Typography
        color="#fff"
        fontSize={20}
        fontWeight={800}
        letterSpacing="-.04em"
        sx={{ mt: 1.75 }}
      >
        {slide.visualTitle}
      </Typography>
      <Typography color="rgba(236,249,255,.78)" fontSize={12} lineHeight={1.5} sx={{ mt: 1 }}>
        {slide.visualMeta}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.875} sx={{ mt: 1.75 }}>
        {slide.chips.map((chip) => (
          <Box
            key={chip}
            sx={{
              bgcolor: 'rgba(255,255,255,.13)',
              borderRadius: 999,
              color: 'rgba(236,249,255,.86)',
              fontSize: 11,
              fontWeight: 700,
              px: 1,
              py: 0.75,
            }}
          >
            {chip}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function PipelineLoop({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';

  return (
    <Box
      sx={{
        border: '12px solid rgba(188,218,232,.32)',
        borderRadius: '50%',
        boxShadow:
          'inset 0 0 0 5px rgba(255,255,255,.08), 0 0 0 1px rgba(255,255,255,.1), 0 0 28px rgba(125,211,252,.12)',
        height: 102,
        left: isLeft ? 40 : 'auto',
        position: 'absolute',
        right: isLeft ? 'auto' : 40,
        top: 8,
        transform: `rotate(${isLeft ? 31 : -31}deg)`,
        width: 146,
      }}
    />
  );
}

function PipelineLabel({
  label,
  side,
  text,
}: {
  label: string;
  side: 'left' | 'right';
  text: string;
}) {
  return (
    <Box
      sx={{
        color: 'rgba(255,255,255,.92)',
        display: 'grid',
        gap: '1px',
        justifyItems: 'center',
        left: side === 'left' ? 72 : 'auto',
        minWidth: 80,
        position: 'absolute',
        right: side === 'right' ? 72 : 'auto',
        textAlign: 'center',
        textShadow: '0 4px 14px rgba(0,0,0,.35)',
        top: 42,
      }}
    >
      <Typography fontSize={19} fontWeight={500} lineHeight={1}>
        {label}
      </Typography>
      <Typography color="rgba(255,255,255,.74)" fontSize={8} lineHeight={1.15} maxWidth={72}>
        {text}
      </Typography>
    </Box>
  );
}

function PipelineSideLabel({
  label,
  noDot = false,
  sx,
}: {
  label: string;
  noDot?: boolean;
  sx: Record<string, string>;
}) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        color: 'rgba(219,242,255,.76)',
        display: 'flex',
        fontSize: 11,
        fontWeight: 700,
        gap: 1,
        letterSpacing: '-.02em',
        lineHeight: 1.35,
        maxWidth: noDot ? 118 : 'none',
        position: 'absolute',
        textShadow: '0 3px 12px rgba(0,0,0,.52)',
        ...sx,
        '&::before': noDot
          ? { display: 'none' }
          : {
              background: 'rgba(255,255,255,.12)',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: '50%',
              boxShadow: 'inset 0 0 0 7px rgba(255,255,255,.1), 0 0 16px rgba(125,211,252,.16)',
              content: '""',
              height: 28,
              width: 28,
            },
      }}
    >
      {label}
    </Box>
  );
}
