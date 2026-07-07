import type {
  AiGallerySpotlight,
  AppGalleryFeaturedItem,
  StoreSpotlightItem,
} from '@/features/launchpad/types';

const APP_SECTION_DESCRIPTION =
  '자주 쓰는 개발 앱과 운영 도구를 한곳에서 열어볼 수 있습니다. 필요한 앱을 찾아 바로 실행해 보세요.';
const AI_SECTION_DESCRIPTION =
  '업무에 바로 쓸 수 있는 AI Assistant와 Skills를 모아 두었습니다. 필요한 도우미를 찾아 바로 사용해 보세요.';

export type StoreTileTone = 'blue' | 'brand' | 'green' | 'neutral' | 'orange' | 'purple';

export type StoreTileViewModel = {
  description: string;
  href: string;
  icon: string;
  iconBackground: string;
  id: string;
  name: string;
  tag: string;
  tagTone: StoreTileTone;
};

export type StoreSectionViewModel = {
  description: string;
  hasError: boolean;
  href: string;
  isLoading: boolean;
  spotlight: StoreSpotlightCard | null;
  tiles: StoreTileViewModel[];
  title: string;
  variant: 'ai' | 'app';
};

export type StoreSpotlightCard = {
  description: string;
  eyebrow: string;
  href: string;
  icon: string;
  iconBackground: string;
  points: Array<{ icon: string; text: string }>;
  stateLabel: string;
  tags: string[];
  title: string;
};

export function buildAppSection(
  item: StoreSpotlightItem | undefined,
  appItems: AppGalleryFeaturedItem[],
  state: { hasError: boolean; isLoading: boolean },
): StoreSectionViewModel {
  const href = item?.href ?? '/workspace/app-gallery';
  const firstItem = appItems[0];

  return {
    description: APP_SECTION_DESCRIPTION,
    hasError: state.hasError,
    href,
    isLoading: state.isLoading,
    spotlight: firstItem ? mapAppSpotlight(firstItem, href) : null,
    tiles: appItems.map((appItem) => mapAppTile(appItem, href)),
    title: `DEJ ${item?.title ?? 'App Gallery'}`,
    variant: 'app',
  };
}

export function buildAiSection(
  item: StoreSpotlightItem | undefined,
  aiSpotlight: AiGallerySpotlight | undefined,
  state: { hasError: boolean; isLoading: boolean },
): StoreSectionViewModel {
  const href = item?.href ?? '/workspace/ai-gallery';

  return {
    description: AI_SECTION_DESCRIPTION,
    hasError: state.hasError,
    href,
    isLoading: state.isLoading,
    spotlight: aiSpotlight ? mapAiSpotlight(aiSpotlight, href) : null,
    tiles: aiSpotlight ? mapAiTiles(aiSpotlight, href) : [],
    title: `DEJ ${item?.title ?? 'AI Gallery'}`,
    variant: 'ai',
  };
}

export function getTileTagTone(
  tone: StoreTileTone,
  colors: {
    blue: string;
    blueBackground: string;
    brand: string;
    brandBackground: string;
    green: string;
    greenBackground: string;
    orange: string;
    orangeBackground: string;
    purple: string;
    purpleBackground: string;
    textTertiary: string;
  },
) {
  if (tone === 'blue') return { background: colors.blueBackground, color: colors.blue };
  if (tone === 'brand') return { background: colors.brandBackground, color: colors.brand };
  if (tone === 'green') return { background: colors.greenBackground, color: colors.green };
  if (tone === 'orange') return { background: colors.orangeBackground, color: colors.orange };
  if (tone === 'purple') return { background: colors.purpleBackground, color: colors.purple };

  return { background: '#f4f6f9', color: colors.textTertiary };
}

function mapAppSpotlight(item: AppGalleryFeaturedItem, sectionHref: string): StoreSpotlightCard {
  const points = [
    item.installTargetLabel ? `${item.installTargetLabel} 단위로 바로 연결` : null,
    item.capabilities.canInstall ? '설치 API 연결 가능' : '조회 중심 프리뷰',
    ...item.tags.slice(0, 2),
  ].filter((point): point is string => Boolean(point));

  return {
    description: item.summary,
    eyebrow: 'DEJ App Gallery',
    href: sectionHref,
    icon: item.icon,
    iconBackground: item.iconColor || '#2563eb',
    points: points.map((point) => ({ icon: getCategoryIcon(item.category), text: point })),
    stateLabel: item.badge || '앱 갤러리 추천',
    tags: item.tags,
    title: item.title,
  };
}

function mapAiSpotlight(item: AiGallerySpotlight, sectionHref: string): StoreSpotlightCard {
  const points = [
    item.chatbotTypeLabel ? `${item.chatbotTypeLabel} 연결` : null,
    typeof item.linkedChatbotCount === 'number' ? `연결된 챗봇 ${item.linkedChatbotCount}개` : null,
    item.capabilities.canTryNow ? '바로 써보기 가능' : null,
    item.capabilities.canOpenWeb ? '웹 열기 가능' : null,
  ].filter((point): point is string => Boolean(point));

  return {
    description: item.summary,
    eyebrow: 'DEJ AI Gallery',
    href: item.openUrl || sectionHref,
    icon: 'smart_toy',
    iconBackground: item.iconColor || '#b40e4d',
    points: points.map((point) => ({ icon: 'link', text: point })),
    stateLabel: 'AI Gallery Preview',
    tags: item.tags,
    title: item.title,
  };
}

function mapAppTile(item: AppGalleryFeaturedItem, sectionHref: string): StoreTileViewModel {
  return {
    description: item.summary,
    href: sectionHref,
    icon: item.icon,
    iconBackground: item.iconColor || getCategoryAccent(item.category),
    id: item.slug,
    name: item.title,
    tag: item.badge || item.categoryLabel,
    tagTone: getAppTone(item.category),
  };
}

function mapAiTiles(item: AiGallerySpotlight, sectionHref: string): StoreTileViewModel[] {
  const linkedChatbots = item.linkedChatbots ?? [];
  const tiles = linkedChatbots.length
    ? linkedChatbots.slice(0, 4).map((chatbot) => ({
        description: chatbot.typeLabel || chatbot.type || 'Connected chatbot',
        href: chatbot.trialUrl || chatbot.webUrl || sectionHref,
        name: chatbot.name,
        tag: chatbot.hasApi ? 'API 챗봇' : '웹페이지 챗봇',
      }))
    : item.tags.slice(0, 4).map((tag) => ({
        description: item.chatbotTypeLabel || 'Connected chatbot',
        href: item.trialUrl || item.webUrl || sectionHref,
        name: tag,
        tag: item.statusLabel || 'Preview',
      }));

  return tiles.map((tile, index) => ({
    description: tile.description,
    href: tile.href,
    icon: index % 2 === 0 ? 'hub' : 'chat',
    iconBackground:
      index % 2 === 0
        ? 'linear-gradient(135deg,#b40e4d,#7c5fcf)'
        : 'linear-gradient(135deg,#4f8cff,#0086cc)',
    id: `${item.slug}-${tile.name}`,
    name: tile.name,
    tag: tile.tag,
    tagTone: 'brand',
  }));
}

function getCategoryAccent(category: string) {
  if (category === 'operations') return '#fb923c';
  if (category === 'workspace') return '#14b8a6';

  return '#3b6fcf';
}

function getCategoryIcon(category: string) {
  if (category === 'workspace') return 'dashboard';
  if (category === 'operations') return 'rocket_launch';
  if (category === 'analytics') return 'monitoring';

  return 'terminal';
}

function getAppTone(category: string): StoreTileTone {
  if (category === 'operations') return 'orange';
  if (category === 'workspace') return 'green';

  return 'blue';
}
