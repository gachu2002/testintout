import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

import type { SectionStatusInfo } from '@/components/reference-status';
import { SectionStatusBadge } from '@/components/reference-status';
import type { HubThemeName } from '@/styles/tokens';

import { Empty } from './feedback';
import { CardGrid } from './layout';
import { ResultCount } from './patterns';
import { ResourceMenuButton } from './ResourceCardPrimitives';
import { CardSkeletons } from './Skeletons';
import { Panel } from './surface';
import { Desc, Head, HeadCopy, Kicker, Title } from './text';

type WorkspaceResourceCardsPanelProps = {
  children: ReactNode;
  description: string;
  emptyCopy: string;
  hub: HubThemeName;
  icon: ReactNode;
  isEmpty: boolean;
  isLoading: boolean;
  label: string;
  resultCopy?: ReactNode;
  skeletonCount?: number;
  skeletonHeight?: number;
  status: SectionStatusInfo;
  title: string;
};

export function WorkspaceResourceCardsPanel({
  children,
  description,
  emptyCopy,
  hub,
  icon,
  isEmpty,
  isLoading,
  label,
  resultCopy,
  skeletonCount = 4,
  skeletonHeight = 330,
  status,
  title,
}: WorkspaceResourceCardsPanelProps) {
  return (
    <Panel hub={hub} kind="resource">
      <Kicker sx={{ mb: 1.75 }}>
        {icon}
        {label}
        <SectionStatusBadge status={status} />
      </Kicker>
      <Head>
        <HeadCopy>
          <Title>{title}</Title>
          <Desc>{description}</Desc>
        </HeadCopy>
        {resultCopy ? <ResultCount>{resultCopy}</ResultCount> : null}
      </Head>

      {isLoading ? (
        <CardSkeletons collapseAt="md" count={skeletonCount} height={skeletonHeight} />
      ) : isEmpty ? (
        <Empty>{emptyCopy}</Empty>
      ) : (
        <CardGrid collapseAt="md">{children}</CardGrid>
      )}
    </Panel>
  );
}

export function ResourceMenuIcon() {
  return (
    <ResourceMenuButton aria-hidden="true">
      <MoreHorizRoundedIcon sx={{ fontSize: 18 }} />
    </ResourceMenuButton>
  );
}

export function ResourceInfoText({ meta, title }: { meta: ReactNode; title: ReactNode }) {
  return (
    <Box minWidth={0}>
      <Typography fontSize={11} fontWeight={700} noWrap>
        {title}
      </Typography>
      <Typography color="text.disabled" fontSize={10} noWrap>
        {meta}
      </Typography>
    </Box>
  );
}
