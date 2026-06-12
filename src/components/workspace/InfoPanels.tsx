import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Skeleton, Stack } from '@mui/material';
import type { ReactNode } from 'react';

import type { SectionStatusInfo } from '@/components/reference-status';
import { SectionStatusBadge } from '@/components/reference-status';
import type { HubThemeName } from '@/styles/tokens';

import { Empty } from './feedback';
import { FooterLink, ListRow, RowCopy, RowLink, RowList, RowMeta, RowTitle } from './patterns';
import { Panel } from './surface';
import { Desc, Head, HeadCopy, Kicker, Title } from './text';

type PanelFooterLink = {
  href: string;
  label: string;
};

type TextRow = {
  meta: string;
  title: string;
};

type LinkRow = TextRow & {
  href: string;
};

type RowsPanelData<TRow> = {
  description?: string;
  footerLink?: PanelFooterLink;
  label?: string;
  rows?: TRow[];
  title?: string;
};

type SharedRowsPanelProps<TRow> = {
  defaultLabel: string;
  emptyCopy: string;
  hub: HubThemeName;
  icon: ReactNode;
  isLoading: boolean;
  panel?: RowsPanelData<TRow>;
  renderRow: (row: TRow) => ReactNode;
  rowKey: (row: TRow) => string;
  status: SectionStatusInfo;
  titleSkeletonWidth?: number;
};

type PublicRowsPanelProps<TRow> = Omit<
  SharedRowsPanelProps<TRow>,
  'defaultLabel' | 'renderRow' | 'rowKey'
> & {
  defaultLabel?: string;
};

export function WorkspaceTipsPanel({
  defaultLabel = 'Tips',
  emptyCopy,
  hub,
  icon,
  isLoading,
  panel,
  status,
  titleSkeletonWidth,
}: PublicRowsPanelProps<TextRow>) {
  return (
    <SharedRowsPanel
      defaultLabel={defaultLabel}
      emptyCopy={emptyCopy}
      hub={hub}
      icon={icon}
      isLoading={isLoading}
      panel={panel}
      renderRow={(row) => (
        <RowCopy>
          <RowTitle>{row.title}</RowTitle>
          <RowMeta>{row.meta}</RowMeta>
        </RowCopy>
      )}
      rowKey={(row) => row.title}
      status={status}
      titleSkeletonWidth={titleSkeletonWidth}
    />
  );
}

export function WorkspaceGuideLinksPanel({
  defaultLabel = 'Guide Links',
  emptyCopy,
  hub,
  icon,
  isLoading,
  panel,
  status,
  titleSkeletonWidth,
}: PublicRowsPanelProps<LinkRow>) {
  return (
    <SharedRowsPanel
      defaultLabel={defaultLabel}
      emptyCopy={emptyCopy}
      hub={hub}
      icon={icon}
      isLoading={isLoading}
      panel={panel}
      renderRow={(row) => (
        <RowCopy>
          <RowLink href={row.href} hub={hub}>
            {row.title}
          </RowLink>
          <RowMeta>{row.meta}</RowMeta>
        </RowCopy>
      )}
      rowKey={(row) => row.href}
      status={status}
      titleSkeletonWidth={titleSkeletonWidth}
    />
  );
}

function SharedRowsPanel<TRow>({
  defaultLabel,
  emptyCopy,
  hub,
  icon,
  isLoading,
  panel,
  renderRow,
  rowKey,
  status,
  titleSkeletonWidth = 220,
}: SharedRowsPanelProps<TRow>) {
  const rows = panel?.rows ?? [];

  return (
    <Panel hub={hub}>
      <Kicker sx={{ mb: 1.75 }}>
        {icon}
        {panel?.label ?? defaultLabel}
        <SectionStatusBadge status={status} />
      </Kicker>
      <Head>
        <HeadCopy>
          {isLoading ? (
            <Skeleton height={28} width={titleSkeletonWidth} />
          ) : (
            <Title>{panel?.title}</Title>
          )}
          {isLoading ? (
            <Skeleton height={42} width="100%" />
          ) : panel?.description ? (
            <Desc>{panel.description}</Desc>
          ) : null}
        </HeadCopy>
      </Head>

      {isLoading ? (
        <RowsPanelSkeleton />
      ) : rows.length > 0 ? (
        <RowList>
          {rows.map((row) => (
            <ListRow compact key={rowKey(row)}>
              {renderRow(row)}
            </ListRow>
          ))}
        </RowList>
      ) : (
        <Empty>{emptyCopy}</Empty>
      )}

      {!isLoading && panel?.footerLink ? (
        <FooterLink href={panel.footerLink.href} hub={hub}>
          {panel.footerLink.label}
          <ChevronRightRoundedIcon sx={{ fontSize: 14 }} />
        </FooterLink>
      ) : null}
    </Panel>
  );
}

function RowsPanelSkeleton() {
  return (
    <Stack spacing={1.5}>
      {[0, 1, 2].map((item) => (
        <Skeleton height={74} key={item} sx={{ borderRadius: '16px' }} variant="rounded" />
      ))}
    </Stack>
  );
}
