import type { ServiceMenuGroup } from '@/features/app-shell/types';
import type {
  LaunchpadAnnouncement,
  LaunchpadBanner,
  LaunchpadHero,
} from '@/features/launchpad/types';

export type BannerVariant = 'dej' | 'learning' | 'release' | 'research' | 'security';

export type ReferenceBannerSlide = {
  chips: string[];
  description: string;
  eyebrow: string;
  eyebrowIcon?: string;
  id: string;
  primaryHref: string;
  primaryIcon?: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryIcon?: string;
  secondaryLabel?: string;
  showBackdrop: boolean;
  snapshotRows?: Array<{ description: string; icon: string; title: string }>;
  snapshotTitle?: string;
  title: string;
  type: string;
  variant: BannerVariant;
  visualIcon?: string;
  visualMeta: string;
  visualMode: string;
  visualTitle: string;
};

export function buildBannerSlides(
  banners: LaunchpadBanner[],
  announcements: LaunchpadAnnouncement[],
  hero?: LaunchpadHero,
  serviceGroups: ServiceMenuGroup[] = [],
): ReferenceBannerSlide[] {
  const apiSlides = getSortedBanners(banners).map(mapBannerToSlide);

  if (apiSlides.length > 0) {
    return apiSlides;
  }

  return buildFallbackBannerSlides(announcements, hero, serviceGroups);
}

function buildFallbackBannerSlides(
  announcements: LaunchpadAnnouncement[],
  hero?: LaunchpadHero,
  serviceGroups: ServiceMenuGroup[] = [],
): ReferenceBannerSlide[] {
  const releaseAnnouncement =
    announcements.find((announcement) => announcement.type !== 'security') ?? announcements[0];
  const spotlightAnnouncement = announcements[1] ?? releaseAnnouncement;
  const securityAnnouncement =
    announcements.find((announcement) => announcement.type === 'security') ??
    announcements[1] ??
    announcements[0];
  const quickLinks = serviceGroups
    .flatMap((group) => group.links)
    .filter((link) =>
      ['/workspace/app-gallery', '/workspace/ai-gallery', '/docs/about-dej'].includes(link.href),
    )
    .slice(0, 2);

  return [
    {
      chips: (hero?.heroStats ?? []).slice(0, 3).map((stat) => stat.label),
      description: hero?.subtitle ?? '지금 필요한 앱과 작업 현황을 한눈에 확인해 보세요.',
      eyebrow: '오늘의 Workspace',
      eyebrowIcon: 'timeline',
      id: 'launchpad-overview',
      primaryHref: quickLinks[0]?.href ?? '/workspace/app-gallery',
      primaryIcon: quickLinks[0]?.icon,
      primaryLabel: quickLinks[0]?.label ?? 'App Gallery',
      secondaryHref: quickLinks[1]?.href ?? '/workspace/ai-gallery',
      secondaryIcon: quickLinks[1]?.icon,
      secondaryLabel: quickLinks[1]?.label ?? 'AI Gallery',
      showBackdrop: true,
      snapshotRows: (hero?.heroStats ?? []).slice(0, 3).map((stat) => ({
        description: stat.note ? `${stat.value} · ${stat.note}` : stat.value,
        icon: stat.icon || 'data_usage',
        title: stat.label,
      })),
      snapshotTitle: hero?.workspaceName ?? 'DEJ Workspace',
      title: hero?.title ?? '오늘의 Workspace',
      type: 'info',
      variant: 'dej',
      visualMeta: '현재 작업 현황',
      visualMode: 'snapshot',
      visualTitle: hero?.workspaceName ?? 'DEJ Workspace',
    },
    {
      chips: [
        releaseAnnouncement?.type ?? 'release',
        releaseAnnouncement?.publishedAt ? '최근 등록' : '최근 등록',
        '추천 앱',
      ],
      description: releaseAnnouncement?.message ?? 'Launchpad API announcements are not available.',
      eyebrow: '새로운 소식',
      eyebrowIcon: 'rocket_launch',
      id: releaseAnnouncement?.id ?? 'launchpad-release',
      primaryHref: releaseAnnouncement?.href ?? '/docs/api/v2/features/launchpad',
      primaryIcon: 'rocket_launch',
      primaryLabel: '가이드 열기',
      secondaryHref: '/workspace/app-gallery',
      secondaryIcon: 'app_gallery',
      secondaryLabel: 'App Gallery 보기',
      showBackdrop: false,
      title: releaseAnnouncement?.title ?? 'Launchpad Release',
      type: releaseAnnouncement?.type ?? 'release',
      variant: 'release',
      visualMeta: releaseAnnouncement?.publishedAt
        ? `${formatDate(releaseAnnouncement.publishedAt)} 기준`
        : '최근 업데이트',
      visualIcon: 'rocket_launch',
      visualMode: 'card',
      visualTitle: 'Product Release',
    },
    {
      chips: ['Spotlight', 'App Gallery', 'AI Gallery'],
      description:
        spotlightAnnouncement?.message ??
        '새로 공개된 기능과 사용 방법을 한 번에 살펴볼 수 있습니다.',
      eyebrow: '추천 보기',
      eyebrowIcon: 'campaign',
      id: spotlightAnnouncement?.id
        ? `${spotlightAnnouncement.id}-spotlight`
        : 'launchpad-spotlight',
      primaryHref: spotlightAnnouncement?.href ?? '/docs/articles/token-hygiene',
      primaryIcon: 'campaign',
      primaryLabel: '관련 문서 보기',
      secondaryHref: '/workspace/ai-gallery',
      secondaryIcon: 'ai_gallery',
      secondaryLabel: 'AI Gallery 보기',
      showBackdrop: false,
      title: spotlightAnnouncement?.title ?? 'AX Studio Conference 소식을 확인해 보세요.',
      type: spotlightAnnouncement?.type ?? 'info',
      variant: 'learning',
      visualMeta: spotlightAnnouncement?.publishedAt
        ? `${formatDate(spotlightAnnouncement.publishedAt)} 기준`
        : '최근 업데이트',
      visualIcon: 'campaign',
      visualMode: 'card',
      visualTitle: 'Learning Spotlight',
    },
    {
      chips: ['Security', 'API Key', 'MCP Policy'],
      description: securityAnnouncement?.message ?? 'Security notice content is not available.',
      eyebrow: 'Security Notice',
      eyebrowIcon: 'security',
      id: securityAnnouncement?.id ? `${securityAnnouncement.id}-security` : 'ax-studio-security',
      primaryHref: securityAnnouncement?.href ?? '/docs/articles/token-hygiene',
      primaryIcon: 'security',
      primaryLabel: '보안 가이드',
      secondaryHref: '/workspace/keycenter',
      secondaryIcon: 'keycenter',
      secondaryLabel: 'Keycenter 보기',
      showBackdrop: false,
      title: securityAnnouncement?.title ?? 'Security Notice',
      type: securityAnnouncement?.type ?? 'security',
      variant: 'security',
      visualMeta: securityAnnouncement?.publishedAt
        ? `${formatDate(securityAnnouncement.publishedAt)} 기준`
        : '최근 업데이트',
      visualIcon: 'security',
      visualMode: 'card',
      visualTitle: 'Access Guard',
    },
  ];
}

function mapBannerToSlide(banner: LaunchpadBanner): ReferenceBannerSlide {
  const primaryAction = banner.primaryAction ?? { href: '', icon: '', label: '' };
  const secondaryAction = banner.secondaryAction ?? { href: '', icon: '', label: '' };
  const primaryHref = primaryAction.href || banner.href || '';
  const secondaryHref = secondaryAction.href || '';

  return {
    chips: getBannerChips(banner),
    description: banner.message || '표시할 안내 메시지가 없습니다.',
    eyebrow: banner.eyebrow || banner.title || 'Announcement',
    eyebrowIcon: banner.eyebrowIcon,
    id: banner.id,
    primaryHref,
    primaryIcon: primaryAction.icon,
    primaryLabel: primaryAction.label,
    secondaryHref,
    secondaryIcon: secondaryAction.icon,
    secondaryLabel: secondaryAction.label,
    showBackdrop: banner.showBackdrop,
    snapshotRows: banner.snapshotRows,
    snapshotTitle: banner.snapshotTitle,
    title: banner.title || '안내 배너',
    type: banner.type || 'announcement',
    variant: getBannerVariant(banner.theme),
    visualIcon: banner.visualIcon,
    visualMeta: getBannerVisualMeta(banner),
    visualMode: banner.visualMode || 'card',
    visualTitle: getBannerVisualTitle(banner),
  };
}

function getSortedBanners(items: LaunchpadBanner[]) {
  return items.filter(isBannerVisible).sort((a, b) => {
    const pinnedGap = Number(Boolean(b.pinned)) - Number(Boolean(a.pinned));
    if (pinnedGap) return pinnedGap;

    const priorityGap = (Number(b.priority) || 0) - (Number(a.priority) || 0);
    if (priorityGap) return priorityGap;

    const dateA = getComparableDate(a);
    const dateB = getComparableDate(b);

    return dateB - dateA;
  });
}

function isBannerVisible(item: LaunchpadBanner) {
  if (!item || item.status === 'archived' || item.status === 'hidden') {
    return false;
  }

  const now = Date.now();
  const startAt = item.startAt ? new Date(item.startAt).getTime() : null;
  const endAt = item.endAt ? new Date(item.endAt).getTime() : null;

  if (startAt && !Number.isNaN(startAt) && startAt > now) return false;
  if (endAt && !Number.isNaN(endAt) && endAt < now) return false;

  return true;
}

function getComparableDate(item: LaunchpadBanner) {
  const value = item.publishedAt || item.updatedAt || item.lastModified || item.created || '';
  const parsed = new Date(value).getTime();

  return Number.isNaN(parsed) ? 0 : parsed;
}

function getBannerVariant(theme: string): BannerVariant {
  if (theme === 'dej') return 'dej';
  if (theme === 'event' || theme === 'learning') return 'learning';
  if (theme === 'research') return 'research';
  if (theme === 'security') return 'security';

  return 'release';
}

function getBannerChips(item: LaunchpadBanner) {
  const chips = Array.isArray(item.chips) ? item.chips.filter(Boolean) : [];

  if (chips.length > 0) return chips.slice(0, 3);

  return [item.type || 'notice', '최근 등록', '바로가기'];
}

function getBannerVisualTitle(item: LaunchpadBanner) {
  if (item.visualTitle) return item.visualTitle;
  if (item.theme === 'learning' || item.theme === 'event') return 'Learning Spotlight';
  if (item.theme === 'research') return 'Research Program';
  if (item.theme === 'release') return 'Product Release';
  if (item.theme === 'security') return 'Access Guard';

  return item.title || 'Announcement';
}

function getBannerVisualMeta(item: LaunchpadBanner) {
  if (item.visualMeta) return item.visualMeta;
  if (item.publishedAt) return `${formatDate(item.publishedAt)} 기준`;

  return item.theme === 'dej' ? '현재 작업 현황' : '최근 업데이트';
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return '-';

  return new Intl.DateTimeFormat('ko-KR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(date)
    .replace(/\.\s?/g, '.')
    .replace(/\.$/, '');
}

export function getSlideVisual(variant: BannerVariant) {
  if (variant === 'dej') {
    return {
      background:
        'linear-gradient(90deg, rgba(2,12,24,.56) 0%, rgba(3,20,38,.36) 42%, rgba(3,20,38,.12) 72%, rgba(3,20,38,.04) 100%), radial-gradient(circle at center, rgba(255,255,255,.04), transparent 60%), radial-gradient(circle at 10% 16%, rgba(255,255,255,.22), transparent 24%), radial-gradient(circle at 18% 80%, rgba(34,211,238,.28), transparent 28%), radial-gradient(circle at 78% 24%, rgba(59,130,246,.34), transparent 30%), radial-gradient(circle at 88% 78%, rgba(168,85,247,.24), transparent 26%), linear-gradient(135deg, #081a3a 0%, #0f4c81 42%, #26145c 100%)',
      borderColor: 'rgba(255,255,255,.16)',
      ctaBackground: 'linear-gradient(135deg, #38bdf8, #818cf8)',
      ctaColor: '#f8fbff',
      ctaHoverBackground: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
      ctaShadow: '0 12px 28px rgba(59,130,246,.28)',
      dotColor: '#38bdf8',
      ghostBackground: 'rgba(7,29,48,.72)',
      ghostBorder: 'rgba(125,211,252,.28)',
      ghostColor: '#e0f7ff',
      ghostHoverBackground: 'rgba(14,165,233,.16)',
      ghostHoverBorder: 'rgba(125,211,252,.46)',
      padding: '24px 28px 22px',
      shadow: '0 20px 48px rgba(12,19,43,.22)',
    };
  }

  if (variant === 'learning') {
    return {
      background:
        'linear-gradient(90deg, rgba(2,12,24,.58) 0%, rgba(3,20,38,.28) 52%, rgba(3,20,38,.05) 100%), radial-gradient(circle at 18% 16%, rgba(255,255,255,.18), transparent 22%), radial-gradient(circle at 84% 20%, rgba(56,189,248,.38), transparent 28%), radial-gradient(circle at 66% 84%, rgba(168,85,247,.3), transparent 30%), linear-gradient(135deg, #1d4ed8 0%, #0f766e 54%, #312e81 100%)',
      borderColor: 'rgba(255,255,255,.18)',
      ctaBackground: 'linear-gradient(135deg, #dbeafe, #c4b5fd)',
      ctaColor: '#1e3a8a',
      ctaHoverBackground: 'linear-gradient(135deg, #bfdbfe, #a78bfa)',
      ctaShadow: '0 12px 28px rgba(49,46,129,.24)',
      dotColor: '#8b5cf6',
      ghostBackground: 'rgba(7,29,48,.68)',
      ghostBorder: 'rgba(125,211,252,.26)',
      ghostColor: '#e0f7ff',
      ghostHoverBackground: 'rgba(14,165,233,.16)',
      ghostHoverBorder: 'rgba(125,211,252,.46)',
      padding: '26px 30px 24px',
      shadow: '0 18px 44px rgba(12,19,43,.16)',
    };
  }

  if (variant === 'security') {
    return {
      background:
        'linear-gradient(90deg, rgba(2,12,24,.58) 0%, rgba(3,20,38,.28) 52%, rgba(3,20,38,.05) 100%), radial-gradient(circle at 16% 20%, rgba(255,255,255,.14), transparent 22%), radial-gradient(circle at 86% 18%, rgba(34,197,94,.26), transparent 28%), radial-gradient(circle at 70% 82%, rgba(250,204,21,.18), transparent 24%), linear-gradient(135deg, #111827 0%, #0f172a 34%, #14532d 100%)',
      borderColor: 'rgba(255,255,255,.18)',
      ctaBackground: 'linear-gradient(135deg, #dcfce7, #fde68a)',
      ctaColor: '#14532d',
      ctaHoverBackground: 'linear-gradient(135deg, #bbf7d0, #fcd34d)',
      ctaShadow: '0 12px 28px rgba(20,83,45,.24)',
      dotColor: '#84cc16',
      ghostBackground: 'rgba(7,29,48,.68)',
      ghostBorder: 'rgba(125,211,252,.26)',
      ghostColor: '#e0f7ff',
      ghostHoverBackground: 'rgba(14,165,233,.16)',
      ghostHoverBorder: 'rgba(125,211,252,.46)',
      padding: '26px 30px 24px',
      shadow: '0 18px 44px rgba(12,19,43,.16)',
    };
  }

  if (variant === 'research') {
    return {
      background:
        'linear-gradient(90deg, rgba(2,12,24,.58) 0%, rgba(3,20,38,.28) 52%, rgba(3,20,38,.05) 100%), radial-gradient(circle at 16% 18%, rgba(255,255,255,.16), transparent 22%), radial-gradient(circle at 84% 22%, rgba(16,185,129,.36), transparent 28%), radial-gradient(circle at 70% 82%, rgba(45,212,191,.24), transparent 28%), linear-gradient(135deg, #14532d 0%, #0f766e 48%, #164e63 100%)',
      borderColor: 'rgba(255,255,255,.18)',
      ctaBackground: 'linear-gradient(135deg, #d1fae5, #99f6e4)',
      ctaColor: '#115e59',
      ctaHoverBackground: 'linear-gradient(135deg, #a7f3d0, #5eead4)',
      ctaShadow: '0 12px 28px rgba(15,118,110,.24)',
      dotColor: '#14b8a6',
      ghostBackground: 'rgba(7,29,48,.68)',
      ghostBorder: 'rgba(125,211,252,.26)',
      ghostColor: '#e0f7ff',
      ghostHoverBackground: 'rgba(14,165,233,.16)',
      ghostHoverBorder: 'rgba(125,211,252,.46)',
      padding: '26px 30px 24px',
      shadow: '0 18px 44px rgba(12,19,43,.16)',
    };
  }

  return {
    background:
      'linear-gradient(90deg, rgba(122,28,74,.16) 0%, rgba(190,24,93,.06) 46%, rgba(255,255,255,0) 100%), radial-gradient(circle at 16% 18%, rgba(255,255,255,.95), transparent 20%), radial-gradient(circle at 84% 18%, rgba(244,114,182,.18), transparent 28%), radial-gradient(circle at 72% 84%, rgba(251,113,133,.12), transparent 24%), linear-gradient(135deg, #fff8fc 0%, #fff1f6 46%, #ffe4ee 100%)',
    borderColor: 'rgba(244,114,182,.22)',
    ctaBackground: 'linear-gradient(135deg, #fdf2f8, #fbcfe8)',
    ctaColor: '#9d174d',
    ctaHoverBackground: 'linear-gradient(135deg, #fce7f3, #f9a8d4)',
    ctaShadow: '0 12px 28px rgba(190,24,93,.24)',
    dotColor: '#f472b6',
    ghostBackground: 'rgba(255,255,255,.88)',
    ghostBorder: 'rgba(244,114,182,.24)',
    ghostColor: '#9d174d',
    ghostHoverBackground: '#fff1f6',
    ghostHoverBorder: 'rgba(244,114,182,.38)',
    padding: '26px 30px 24px',
    shadow: '0 18px 40px rgba(244,114,182,.12)',
  };
}
