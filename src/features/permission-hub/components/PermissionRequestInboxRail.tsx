import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import { Stack, Typography } from '@mui/material';

import { SectionStatusBadge } from '@/components/reference-status';
import { Badge, ListRow, Panel, RowCopy, RowList, RowMeta, RowTitle } from '@/components/workspace';
import { Desc, Head, HeadCopy, Kicker, Title } from '@/components/workspace/text';
import { permissionHubSectionStatus } from '@/features/permission-hub/sectionStatus';

export function PermissionRequestInboxRail() {
  return (
    <Panel hub="permissions">
      <Kicker sx={{ mb: 1.75 }}>
        <PendingActionsRoundedIcon sx={{ fontSize: 14 }} />
        Request List
        <SectionStatusBadge status={permissionHubSectionStatus.requestInbox} />
      </Kicker>
      <Head>
        <HeadCopy>
          <Title>현재 요청 목록</Title>
          <Desc>
            Request inbox는 응답 계약이 제공되면 최신 권한 요청을 우측 패널에서 바로 표시합니다.
          </Desc>
        </HeadCopy>
      </Head>
      <RowList>
        <ListRow compact>
          <RowCopy>
            <RowTitle>Request inbox contract needed</RowTitle>
            <RowMeta>GET /api/v2/permissions/requests response shape is missing.</RowMeta>
          </RowCopy>
          <Badge tone="pending">Blocked</Badge>
        </ListRow>
      </RowList>
      <Stack direction="row" spacing={1.25} sx={{ mt: 2 }}>
        <InfoOutlinedIcon color="disabled" sx={{ fontSize: 18, mt: 0.25 }} />
        <Typography color="text.secondary" fontSize={12} lineHeight={1.7}>
          Realm create, delete, detail, and request submit controls stay disabled until exact action
          response contracts are accepted.
        </Typography>
      </Stack>
    </Panel>
  );
}
