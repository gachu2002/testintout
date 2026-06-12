import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

import type { SectionStatusInfo } from '@/components/reference-status';
import { SectionStatusBadge } from '@/components/reference-status';
import type { HubThemeName } from '@/styles/tokens';

import { Panel } from './surface';
import { Kicker } from './text';
import { shouldForwardProp } from './utils';

type WorkspaceHubHeroProps = {
  actions?: ReactNode;
  children?: ReactNode;
  description: string;
  eyebrow: string;
  eyebrowIcon: ReactNode;
  hub: HubThemeName;
  maxDescriptionWidth?: number;
  status?: SectionStatusInfo;
  title: string;
};

const HubHeroTop = styled(Box)(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  gap: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const HubHeroCopy = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.25),
  minWidth: 0,
}));

const HubHeroKicker = styled(Kicker, {
  shouldForwardProp,
})<{ hub: HubThemeName }>(({ hub, theme }) => ({
  color: theme.workspace.hubThemes[hub].brand,
  letterSpacing: '.12em',
}));

const HubHeroTitle = styled('h1')(({ theme }) => ({
  fontSize: 30,
  fontWeight: theme.workspace.typography.weights.extraBold,
  letterSpacing: '-.04em',
  lineHeight: 1.15,
  margin: 0,
}));

const HubHeroDescription = styled(Typography, {
  shouldForwardProp,
})<{ maxDescriptionWidth: number }>(({ maxDescriptionWidth, theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 14,
  lineHeight: 1.7,
  maxWidth: maxDescriptionWidth,
}));

const HubHeroActions = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
}));

export function WorkspaceHubHero({
  actions,
  children,
  description,
  eyebrow,
  eyebrowIcon,
  hub,
  maxDescriptionWidth = 820,
  status,
  title,
}: WorkspaceHubHeroProps) {
  return (
    <Panel hub={hub} kind="hero">
      <HubHeroTop>
        <HubHeroCopy>
          <HubHeroKicker hub={hub}>
            {eyebrowIcon}
            {eyebrow}
            {status ? <SectionStatusBadge status={status} /> : null}
          </HubHeroKicker>
          <HubHeroTitle>{title}</HubHeroTitle>
          <HubHeroDescription maxDescriptionWidth={maxDescriptionWidth}>
            {description}
          </HubHeroDescription>
        </HubHeroCopy>
        {actions ? <HubHeroActions>{actions}</HubHeroActions> : null}
      </HubHeroTop>
      {children}
    </Panel>
  );
}
