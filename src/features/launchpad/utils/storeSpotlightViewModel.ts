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
  return {
    description: item.summary,
    eyebrow: 'DEJ App Gallery',
    href: sectionHref,
    icon: item.icon,
    iconBackground: getIconBackground(item.iconColor, '#22d3ee'),
    points: [
      { icon: 'rocket_launch', text: item.subtitle },
      {
        icon: 'dashboard',
        text: `${item.categoryLabel} · Install target ${item.installTargetLabel}`,
      },
      { icon: 'link', text: item.tags.join(' · ') },
    ],
    stateLabel: '앱 갤러리 추천',
    tags: item.tags,
    title: item.title,
  };
}

function mapAiSpotlight(item: AiGallerySpotlight, sectionHref: string): StoreSpotlightCard {
  return {
    description: item.summary,
    eyebrow: 'DEJ AI Gallery',
    href: item.openUrl || sectionHref,
    icon: 'smart_toy',
    iconBackground: getIconBackground(item.iconColor, '#7c5fcf'),
    points: [],
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
    iconBackground: getIconBackground(item.iconColor, getCategoryAccent(item.category)),
    id: item.slug,
    name: item.title,
    tag: item.badge || item.categoryLabel,
    tagTone: getAppTone(item.category),
  };
}

function mapAiTiles(item: AiGallerySpotlight, sectionHref: string): StoreTileViewModel[] {
  return item.tags.slice(0, 4).map((tag, index) => ({
    description: 'Connected chatbot',
    href: sectionHref,
    icon: index % 2 === 0 ? 'hub' : 'chat',
    iconBackground:
      index % 2 === 0
        ? 'linear-gradient(135deg,#b40e4d,#7c5fcf)'
        : 'linear-gradient(135deg,#4f8cff,#0086cc)',
    id: `${item.slug}-${tag}`,
    name: tag,
    tag: item.statusLabel || 'Preview',
    tagTone: getAiTone(item.status),
  }));
}

function getIconBackground(color: string, accent: string) {
  return `linear-gradient(135deg, ${color}, ${accent})`;
}

function getCategoryAccent(category: string) {
  if (category === 'operations') return '#fb923c';
  if (category === 'workspace') return '#14b8a6';

  return '#3b6fcf';
}

function getAppTone(category: string): StoreTileTone {
  if (category === 'operations') return 'orange';
  if (category === 'workspace') return 'green';

  return 'blue';
}

function getAiTone(status: string): StoreTileTone {
  if (status === 'review') return 'blue';
  if (status === 'active') return 'green';
  if (status === 'error') return 'brand';

  return 'purple';
}
