import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import DeveloperBoardRoundedIcon from '@mui/icons-material/DeveloperBoardRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import type { SvgIconProps } from '@mui/material';

type WorkspaceIconProps = SvgIconProps & {
  name?: string;
};

export function WorkspaceIcon({ name, ...props }: WorkspaceIconProps) {
  switch (name) {
    case 'agent':
    case 'ai_gallery':
      return <SmartToyRoundedIcon {...props} />;
    case 'api':
      return <DataObjectRoundedIcon {...props} />;
    case 'app_gallery':
      return <WidgetsRoundedIcon {...props} />;
    case 'approval':
      return <SecurityRoundedIcon {...props} />;
    case 'bucket':
      return <FolderRoundedIcon {...props} />;
    case 'chat':
    case 'chatbot':
      return <ChatRoundedIcon {...props} />;
    case 'chat_bubble':
      return <ChatBubbleOutlineRoundedIcon {...props} />;
    case 'cloud':
      return <CloudRoundedIcon {...props} />;
    case 'code':
      return <CodeRoundedIcon {...props} />;
    case 'console':
      return <WebRoundedIcon {...props} />;
    case 'database':
    case 'storage':
      return <StorageRoundedIcon {...props} />;
    case 'domain':
      return <ApartmentRoundedIcon {...props} />;
    case 'group':
      return <GroupsRoundedIcon {...props} />;
    case 'guide':
    case 'menu_book':
      return <MenuBookRoundedIcon {...props} />;
    case 'campaign':
      return <CampaignRoundedIcon {...props} />;
    case 'description':
      return <DescriptionRoundedIcon {...props} />;
    case 'fact_check':
      return <FactCheckRoundedIcon {...props} />;
    case 'inventory':
      return <Inventory2RoundedIcon {...props} />;
    case 'insights':
      return <InsightsRoundedIcon {...props} />;
    case 'keycenter':
    case 'vpn_key':
      return <KeyRoundedIcon {...props} />;
    case 'mail':
    case 'notify':
      return <ArticleRoundedIcon {...props} />;
    case 'local_fire_department':
      return <LocalFireDepartmentRoundedIcon {...props} />;
    case 'play_circle':
      return <PlayCircleRoundedIcon {...props} />;
    case 'monitoring':
    case 'query_stats':
      return <QueryStatsRoundedIcon {...props} />;
    case 'project':
      return <PublicRoundedIcon {...props} />;
    case 'rocket_launch':
      return <RocketLaunchRoundedIcon {...props} />;
    case 'savings':
      return <SavingsRoundedIcon {...props} />;
    case 'school':
      return <SchoolRoundedIcon {...props} />;
    case 'science':
      return <ScienceRoundedIcon {...props} />;
    case 'timeline':
      return <TimelineRoundedIcon {...props} />;
    case 'developer_board':
      return <DeveloperBoardRoundedIcon {...props} />;
    case 'support_agent':
      return <SupportAgentRoundedIcon {...props} />;
    case 'terminal':
      return <TerminalRoundedIcon {...props} />;
    case 'thumb_up':
      return <ThumbUpRoundedIcon {...props} />;
    case 'workflow':
      return <AccountTreeRoundedIcon {...props} />;
    default:
      return <AppsRoundedIcon {...props} />;
  }
}
