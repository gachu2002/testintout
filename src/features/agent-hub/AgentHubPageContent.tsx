import { Stack } from '@mui/material';
import { useState } from 'react';

import { CardGrid, MainGrid } from '@/components/workspace';
import { QueryErrorAlerts } from '@/components/workspace/QueryErrorAlerts';
import { AgentCardsPanel } from '@/features/agent-hub/components/AgentCardsPanel';
import { AgentGuideLinksPanel } from '@/features/agent-hub/components/AgentGuideLinksPanel';
import { AgentHubFilterBar } from '@/features/agent-hub/components/AgentHubFilterBar';
import { AgentHubHero } from '@/features/agent-hub/components/AgentHubHero';
import { AgentModelingTipsPanel } from '@/features/agent-hub/components/AgentModelingTipsPanel';
import { AgentRuntimeRail } from '@/features/agent-hub/components/AgentRuntimeRail';
import {
  useAgentHubAgentsQuery,
  useAgentHubFiltersQuery,
  useAgentHubGuideLinksQuery,
  useAgentHubModelsQuery,
  useAgentHubStatsQuery,
  useAgentHubTipsQuery,
  useAgentRuntimeStatusQuery,
} from '@/features/agent-hub/hooks/useAgentHubQueries';
import type { AgentFilterState, AgentResource } from '@/features/agent-hub/types';

const defaultFilterState: AgentFilterState = {
  status: 'all',
  type: 'all',
};

export function AgentHubPageContent() {
  const [filterState, setFilterState] = useState<AgentFilterState>(defaultFilterState);
  const agentsQuery = useAgentHubAgentsQuery(20, '', '', '');
  const filtersQuery = useAgentHubFiltersQuery();
  const statsQuery = useAgentHubStatsQuery();
  const tipsQuery = useAgentHubTipsQuery();
  const guideLinksQuery = useAgentHubGuideLinksQuery();
  const modelsQuery = useAgentHubModelsQuery();
  const runtimeStatusQuery = useAgentRuntimeStatusQuery();
  const agents = agentsQuery.data?.items ?? [];
  const visibleAgents = agents.filter((agent) => matchesAgentFilter(agent, filterState));

  return (
    <Stack spacing={2.5}>
      <AgentHubHero isLoading={statsQuery.isLoading} stats={statsQuery.data} />
      <AgentHubFilterBar
        filters={filtersQuery.data}
        isLoading={filtersQuery.isLoading}
        loadedCount={agents.length}
        onFilterChange={setFilterState}
        state={filterState}
        total={agentsQuery.data?.page.total}
      />
      <MainGrid>
        <Stack spacing={2.5}>
          <AgentCardsPanel
            agents={visibleAgents}
            filterState={filterState}
            isLoading={agentsQuery.isLoading}
            loadedCount={agents.length}
            total={agentsQuery.data?.page.total}
          />
          <CardGrid collapseAt="md">
            <AgentModelingTipsPanel
              isLoading={modelsQuery.isLoading || tipsQuery.isLoading}
              modelPanel={modelsQuery.data}
              tipsPanel={tipsQuery.data}
            />
            <AgentGuideLinksPanel
              isLoading={guideLinksQuery.isLoading}
              panel={guideLinksQuery.data}
            />
          </CardGrid>
        </Stack>
        <Stack spacing={2.5}>
          <AgentRuntimeRail
            isLoading={runtimeStatusQuery.isLoading}
            panel={runtimeStatusQuery.data}
          />
        </Stack>
      </MainGrid>
      <QueryErrorAlerts
        alerts={[
          {
            isError: statsQuery.isError,
            message:
              'Agent statistics could not be loaded. The page will show available data only.',
          },
          {
            isError: filtersQuery.isError,
            message: 'Agent filters could not be loaded. The page will show the default view only.',
          },
          {
            isError: agentsQuery.isError,
            message: 'Agents could not be loaded. Try refreshing the page.',
          },
          {
            isError: tipsQuery.isError,
            message: 'Agent tips could not be loaded. Try refreshing the page.',
          },
          {
            isError: modelsQuery.isError,
            message: 'Agent model criteria could not be loaded. Try refreshing the page.',
          },
          {
            isError: guideLinksQuery.isError,
            message: 'Agent guide links could not be loaded. Try refreshing the page.',
          },
          {
            isError: runtimeStatusQuery.isError,
            message: 'Agent runtime rail could not be loaded. Try refreshing the page.',
          },
        ]}
      />
    </Stack>
  );
}

function matchesAgentFilter(agent: AgentResource, filterState: AgentFilterState) {
  const typeMatches = filterState.type === 'all' || agent.type === filterState.type;
  const statusMatches = filterState.status === 'all' || agent.status === filterState.status;

  return typeMatches && statusMatches;
}
