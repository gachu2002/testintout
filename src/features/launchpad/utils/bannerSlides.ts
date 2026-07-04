import type { ServiceMenuGroup } from '@/features/app-shell/types';
import type { LaunchpadAnnouncement, LaunchpadHero } from '@/features/launchpad/types';
import { workspaceTokens } from '@/styles/tokens';

export type BannerVariant = 'dej' | 'learning' | 'release' | 'research' | 'security';

export type ReferenceBannerSlide = {
  chips: string[];
  description: string;
  eyebrow: string;
  id: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  title: string;
  type: string;
  variant: BannerVariant;
  visualMeta: string;
  visualTitle: string;
};

export function buildBannerSlides(
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
      id: 'launchpad-overview',
      primaryHref: quickLinks[0]?.href ?? '/workspace/app-gallery',
      primaryLabel: quickLinks[0]?.label ?? 'App Gallery',
      secondaryHref: quickLinks[1]?.href ?? '/workspace/ai-gallery',
      secondaryLabel: quickLinks[1]?.label ?? 'AI Gallery',
      title: hero?.title ?? '오늘의 Workspace',
      type: 'info',
      variant: 'dej',
      visualMeta: '현재 작업 현황',
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
      id: releaseAnnouncement?.id ?? 'launchpad-release',
      primaryHref: releaseAnnouncement?.href ?? '/docs/api/v2/features/launchpad',
      primaryLabel: '가이드 열기',
      secondaryHref: '/workspace/app-gallery',
      secondaryLabel: 'App Gallery 보기',
      title: releaseAnnouncement?.title ?? 'Launchpad Release',
      type: releaseAnnouncement?.type ?? 'release',
      variant: 'release',
      visualMeta: releaseAnnouncement?.publishedAt
        ? `${formatDate(releaseAnnouncement.publishedAt)} 기준`
        : '최근 업데이트',
      visualTitle: 'Product Release',
    },
    {
      chips: ['Spotlight', 'App Gallery', 'AI Gallery'],
      description:
        spotlightAnnouncement?.message ??
        '새로 공개된 기능과 사용 방법을 한 번에 살펴볼 수 있습니다.',
      eyebrow: '추천 보기',
      id: spotlightAnnouncement?.id
        ? `${spotlightAnnouncement.id}-spotlight`
        : 'launchpad-spotlight',
      primaryHref: spotlightAnnouncement?.href ?? '/docs/articles/token-hygiene',
      primaryLabel: '관련 문서 보기',
      secondaryHref: '/workspace/ai-gallery',
      secondaryLabel: 'AI Gallery 보기',
      title: spotlightAnnouncement?.title ?? 'AX Studio Conference 소식을 확인해 보세요.',
      type: spotlightAnnouncement?.type ?? 'info',
      variant: 'learning',
      visualMeta: spotlightAnnouncement?.publishedAt
        ? `${formatDate(spotlightAnnouncement.publishedAt)} 기준`
        : '최근 업데이트',
      visualTitle: 'Learning Spotlight',
    },
    {
      chips: ['Security', 'API Key', 'MCP Policy'],
      description: securityAnnouncement?.message ?? 'Security notice content is not available.',
      eyebrow: 'Security Notice',
      id: securityAnnouncement?.id ? `${securityAnnouncement.id}-security` : 'ax-studio-security',
      primaryHref: securityAnnouncement?.href ?? '/docs/articles/token-hygiene',
      primaryLabel: '보안 가이드',
      secondaryHref: '/workspace/keycenter',
      secondaryLabel: 'Keycenter 보기',
      title: securityAnnouncement?.title ?? 'Security Notice',
      type: securityAnnouncement?.type ?? 'security',
      variant: 'security',
      visualMeta: securityAnnouncement?.publishedAt
        ? `${formatDate(securityAnnouncement.publishedAt)} 기준`
        : '최근 업데이트',
      visualTitle: 'Access Guard',
    },
  ];
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
        'linear-gradient(90deg, rgba(2,12,24,.56) 0%, rgba(3,20,38,.36) 42%, rgba(3,20,38,.12) 72%, rgba(3,20,38,.04) 100%), radial-gradient(circle at center, rgba(255,255,255,.04), transparent 60%), radial-gradient(circle at 12% 14%, rgba(255,255,255,.22), transparent 24%), radial-gradient(circle at 20% 72%, rgba(34,211,238,.24), transparent 26%), radial-gradient(circle at 84% 28%, rgba(59,130,246,.26), transparent 30%), radial-gradient(circle at 72% 82%, rgba(14,165,233,.22), transparent 28%), linear-gradient(135deg, #031b31 0%, #074064 48%, #052743 100%)',
      borderColor: 'rgba(255,255,255,.16)',
      ctaBackground: 'linear-gradient(135deg, #0284c7, #22d3ee)',
      ctaColor: '#fff',
      ctaHoverBackground: 'linear-gradient(135deg, #0369a1, #38bdf8)',
      ctaShadow: '0 10px 24px rgba(14,165,233,.22)',
      dotColor: '#38bdf8',
      ghostBackground: 'rgba(7,29,48,.72)',
      ghostBorder: 'rgba(125,211,252,.28)',
      ghostColor: '#e0f7ff',
      ghostHoverBackground: 'rgba(14,165,233,.16)',
      ghostHoverBorder: 'rgba(125,211,252,.46)',
      padding: '24px 28px 22px',
      shadow: '0 18px 44px rgba(12,19,43,.18)',
    };
  }

  if (variant === 'learning') {
    return {
      background:
        'linear-gradient(90deg, rgba(2,12,24,.58) 0%, rgba(3,20,38,.28) 52%, rgba(3,20,38,.05) 100%), radial-gradient(circle at 86% 18%, rgba(125,211,252,.32), transparent 28%), radial-gradient(circle at 62% 88%, rgba(167,139,250,.24), transparent 30%), linear-gradient(135deg, #1e1b4b 0%, #4c1d95 52%, #164e63 100%)',
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
        'linear-gradient(90deg, rgba(2,12,24,.58) 0%, rgba(3,20,38,.28) 52%, rgba(3,20,38,.05) 100%), radial-gradient(circle at 18% 22%, rgba(255,255,255,.18), transparent 22%), radial-gradient(circle at 84% 22%, rgba(16,185,129,.36), transparent 28%), radial-gradient(circle at 70% 82%, rgba(45,212,191,.24), transparent 28%), linear-gradient(135deg, #14532d 0%, #0f766e 48%, #164e63 100%)',
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
      'radial-gradient(circle at top right, rgba(180,14,77,.08), transparent 34%), linear-gradient(90deg, #f7eff3 0%, #eef3f8 58%, #ece6f4 100%)',
    borderColor: 'rgba(214,216,219,.75)',
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
    shadow: workspaceTokens.shadows.raised,
  };
}
