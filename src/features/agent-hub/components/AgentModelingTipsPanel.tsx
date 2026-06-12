import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import { Box, Skeleton, Stack } from '@mui/material';

import { SectionStatusBadge } from '@/components/reference-status';
import {
  Desc,
  Empty,
  FooterLink,
  Head,
  HeadCopy,
  Kicker,
  ListRow,
  Panel,
  RowCopy,
  RowList,
  RowMeta,
  RowSkeletons,
  RowTitle,
  Title,
} from '@/components/workspace';
import { agentHubSectionStatus } from '@/features/agent-hub/sectionStatus';
import type { AgentModelPanel, AgentTipsPanel } from '@/features/agent-hub/types';

export function AgentModelingTipsPanel({
  isLoading,
  modelPanel,
  tipsPanel,
}: {
  isLoading: boolean;
  modelPanel?: AgentModelPanel;
  tipsPanel?: AgentTipsPanel;
}) {
  const hasRows = Boolean(modelPanel?.rows.length || tipsPanel?.rows.length);

  return (
    <Panel hub="agents">
      <Kicker sx={{ mb: 1.75 }}>
        <TipsAndUpdatesRoundedIcon sx={{ fontSize: 14 }} />
        {modelPanel?.label ?? tipsPanel?.label ?? 'Model'}
        <SectionStatusBadge status={agentHubSectionStatus.modelingTips} />
      </Kicker>
      <Head>
        <HeadCopy>
          {isLoading ? (
            <Skeleton height={28} width={240} />
          ) : (
            <Title>{modelPanel?.title ?? tipsPanel?.title}</Title>
          )}
          {isLoading ? (
            <Skeleton height={48} width="100%" />
          ) : (
            <Desc>{modelPanel?.description ?? tipsPanel?.description}</Desc>
          )}
        </HeadCopy>
      </Head>

      {isLoading ? (
        <RowSkeletons count={3} height={74} />
      ) : hasRows ? (
        <Stack spacing={1.5}>
          {modelPanel?.rows.length ? (
            <RowList>
              {modelPanel.rows.map((row) => (
                <ListRow compact key={row.id}>
                  <RowCopy>
                    <RowTitle>{row.title}</RowTitle>
                    <RowMeta>{row.description || row.meta}</RowMeta>
                  </RowCopy>
                </ListRow>
              ))}
            </RowList>
          ) : null}
          {tipsPanel?.rows.length ? (
            <Box>
              <RowList>
                {tipsPanel.rows.map((row) => (
                  <ListRow compact key={row.title}>
                    <RowCopy>
                      <RowTitle>{row.title}</RowTitle>
                      <RowMeta>{row.meta}</RowMeta>
                    </RowCopy>
                  </ListRow>
                ))}
              </RowList>
            </Box>
          ) : null}
        </Stack>
      ) : (
        <Empty>No agent modeling guidance is available.</Empty>
      )}

      {!isLoading && tipsPanel?.footerLink ? (
        <FooterLink href={tipsPanel.footerLink.href} hub="agents">
          {tipsPanel.footerLink.label}
          <ChevronRightRoundedIcon sx={{ fontSize: 14 }} />
        </FooterLink>
      ) : null}
    </Panel>
  );
}
