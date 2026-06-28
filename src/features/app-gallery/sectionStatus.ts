import type { SectionStatusInfo } from '@/components/reference-status';

export const appGallerySectionStatus = {
  categoryTabs: {
    apis: [{ contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/categories' }],
    evidence: 'User-provided sample payload accepted for category items and default category.',
    fieldsUsed: [
      'defaultCategory',
      'items[].id',
      'items[].label',
      'items[].description',
      'items[].count',
    ],
    id: 'app-gallery-category-tabs',
    nextAction:
      'Run focused Playwright reference verification for this section, then run the broader visual suite before marking Verified.',
    page: 'App Gallery',
    progress: 'implemented',
    readiness: 'Already implemented',
    reference: 'dej_app_gallery.html',
    section: 'Category tabs',
  },
  collections: {
    apis: [
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/categories' },
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/featured' },
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/related-ai' },
    ],
    evidence:
      'User-provided sample payloads accepted for categories, featured apps, and related AI items.',
    fieldsUsed: [
      'apps[].category',
      'apps[].categoryLabel',
      'apps[].title',
      'apps[].subtitle',
      'apps[].icon',
      'apps[].iconColor',
    ],
    id: 'app-gallery-collections',
    nextAction:
      'Run focused Playwright reference verification for this section, then run the broader visual suite before marking Verified.',
    page: 'App Gallery',
    progress: 'implemented',
    readiness: 'Already implemented',
    reference: 'dej_app_gallery.html',
    section: 'Collections',
  },
  highlights: {
    apis: [
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/featured' },
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/apps/:slug' },
    ],
    evidence:
      'User-provided sample payloads accepted for featured app cards and app detail responses.',
    fieldsUsed: [
      'items[].title',
      'items[].subtitle',
      'items[].summary',
      'items[].tags',
      'items[].installTargetLabel',
      'items[].capabilities.canPreview',
    ],
    id: 'app-gallery-highlights',
    nextAction:
      'Run focused Playwright reference verification for this section, then run the broader visual suite before marking Verified.',
    page: 'App Gallery',
    progress: 'implemented',
    readiness: 'Already implemented',
    reference: 'dej_app_gallery.html',
    section: 'Curated highlights',
  },
  heroRail: {
    apis: [
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/hero' },
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/apps (paged)' },
    ],
    evidence: 'User-provided sample payloads accepted for hero data and paged app list items.',
    fieldsUsed: [
      'apps[].title',
      'apps[].subtitle',
      'apps[].summary',
      'apps[].categoryLabel',
      'apps[].icon',
      'apps[].iconColor',
    ],
    id: 'app-gallery-hero-rail',
    nextAction:
      'Run focused Playwright reference verification for this section, then run the broader visual suite before marking Verified.',
    page: 'App Gallery',
    progress: 'implemented',
    readiness: 'Already implemented',
    reference: 'dej_app_gallery.html',
    section: 'Hero rail',
  },
  pageIntro: {
    apis: [
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/hero' },
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/categories' },
    ],
    evidence: 'User-provided sample payloads accepted for hero stats and categories.',
    fieldsUsed: [
      'title',
      'subtitle',
      'stats[].label',
      'stats[].value',
      'stats[].note',
      'categories.items[].label',
      'categories.items[].description',
      'categories.items[].count',
    ],
    id: 'app-gallery-page-intro',
    nextAction:
      'Run focused Playwright reference verification for this section, then run the broader visual suite before marking Verified.',
    page: 'App Gallery',
    progress: 'implemented',
    readiness: 'Already implemented',
    reference: 'dej_app_gallery.html',
    section: 'Page head / intro',
  },
  registeredApps: {
    apis: [
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/apps (paged)' },
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/apps/:slug' },
      { contract: 'accepted', method: 'POST', path: '/api/v2/app-gallery/apps/:slug/install' },
    ],
    evidence:
      'User-provided sample payloads accepted for paged app list, app detail, install request body, and queued install response.',
    fieldsUsed: [
      'items[].title',
      'items[].subtitle',
      'items[].summary',
      'items[].tags',
      'items[].installTargetLabel',
      'items[].capabilities.canInstall',
      'items[].capabilities.canPreview',
    ],
    id: 'app-gallery-registered-apps',
    nextAction:
      'Run focused Playwright reference verification for this section, then run the broader visual suite before marking Verified.',
    page: 'App Gallery',
    progress: 'implemented',
    readiness: 'Already implemented',
    reference: 'dej_app_gallery.html',
    section: 'Registered app cards',
  },
  sideRail: {
    apis: [
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/apps (paged)' },
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/featured' },
      { contract: 'accepted', method: 'GET', path: '/api/v2/app-gallery/categories' },
    ],
    evidence: 'User-provided sample payloads accepted for app list, featured apps, and categories.',
    fieldsUsed: [
      'apps[].title',
      'apps[].subtitle',
      'apps[].summary',
      'apps[].categoryLabel',
      'apps[].iconColor',
    ],
    id: 'app-gallery-side-rail',
    nextAction:
      'Run focused Playwright reference verification for this section, then run the broader visual suite before marking Verified.',
    page: 'App Gallery',
    progress: 'implemented',
    readiness: 'Already implemented',
    reference: 'dej_app_gallery.html',
    section: 'Side rail summaries',
  },
} satisfies Record<string, SectionStatusInfo>;
