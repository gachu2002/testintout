export const currentUserResponse = {
  data: {
    id: '678dbed527d9dba8417f0d92',
    sub: '1640a460-e7cb-481f-bea2-bbdd38c99dab',
    userId: null,
    username: 'lethanh.nguyen',
    name: 'LeThanh Nguyen',
    displayName: 'LeThanhNguyen/(협력사) 선임/MS DEJ Task',
    email: 'lethanh.nguyen@lge.com',
    fullname: 'LeThanhNguyen',
    givenName: 'LeThanh',
    familyName: 'Nguyen',
    organization: [
      'MS DEJ Task(11002895)',
      'MS시너지개발담당(12100377)',
      'MS사업본부(11000004)',
      'LG전자대표이사(11000001)',
      'Domestic(Korea)',
      'LGE Users',
    ],
    position: null,
    job: null,
    photo:
      'iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEYklEQVR4nO2cPU8UQRjH/7u5RGOkuiskl1ywIZBLbIjd8QEsKe4jUNhoohWfwNrKgm8gvS81doZClITYiEYSirOCECSEtSDPeS+7N8/MPDP77HL/+sns7i8z87zNbJJlWQaDTgeHONrbRnZ9ZTJFs9PDn1+fjHbL61u4e/+B0Y6ji7MTfN99ZbTjvluSNrC0tomF1orRNjUZ2MADgHa3j2anx7KNqWanh3a3z7LNrq9wtLeN08Gh0XYmQFt4JG0QbeCRuBALAbrCI2mB6AKPxIGYC9AXHqlsiD7wSCaIUwCl4JHKgigBjzQL4hhAaXik2BAl4ZGKIA4BhoJHigUxBDxSHsQUCA+PFBpiSHikSYhpLHikUBBjwCONQkz2P7zIJOFxo/2F1gorUOWIOxb33bhK0gbSshzG4uqGyExsdnpYXN1g2YVwLMZUzkVciL7LmQsl5PIOAhAID1EDPCAgQCAcRC3wgMAAAXmImuABEQACchC1wQMiAQT8IWqEB0QECLhD1AoPABpRnwawP3DUTis8AEh+f3ubxe5haJdNjyUtu+hZVdGMT4HyK8dV0+h2MXQic4g8Te61Y154DnG28hzVlBcmA8myz/775yw7jqPibvAA8OjJa5YdR0VePjcOnM/Ecc0KkQoD6TnEG5niy5mZyG2HyAnOjZlIGdG9BnEzm8bxwQ7LYVyeD1h9B8mNO4Q4Do16LCYuVpmIVA9Du2x7LFaZSN33RJeqj3UmUleIriUzp0ykbhB96o3OmYhNxrK8vmW0AYA791osG+54HPkWa3PDGGmIknXEJG2IjSdR6fbORKq6nKXaBCKZSNUgSvZYxDKRqmQs0g0qVlOp3e2zI3jtujwfsL6Fm1GJtTUXWitYWtuUGi6YuBdouBIBSPCSNHqX1Fo2t5A48gZYJXgkSYheAKsIjyQF0fnLbeBp7YkQRO69uDw5zcAqz7xJ+c5Ea4B1gkfygWgFsI7wSK4Q2QDrDI/kArFh0yP4+vGl0e7h46fsh5ehH5/fsBwG1844A7kZRt0yEZEr/9xlW6XlzV2mXLtCgHWER5KEmAuwzvBIUhCTL++ejf32pAjKpLOxgXdxdmK0AW76Habxsusr/D0fsMbjlP6LLlJPZjFFdmNvG2rmae2J0HicdK7IbriEb8OyLZLPck6B2w2P5AoxncP7LxeIU07EV9xegk2PRfJUGLe0xlXUq142ohkv3cOQlkqAo9uFdA9DWuoA5u21miGqAjjLUWmFqAYgx8trhKgCoE2IpA1i6QBd4ktNEEsF6BOca4FYGkCJzEYDxGTwczc7PtiJ+lDuv65sMhHJf3Fx1e72kcb+14Btj0W6hyElOlSaAvF+2OBSuJDuYUho9ETucA8MDdGn6qMJ4uRx5jEnEgqiRMlMA8S8s+BTXlgaomS9sUyIRQfpc8MYKYghirVlQJx1C6EwDvSFGLLSHROi6QrHzEDaFWKMNkEMiJz7L8ZMxBZizB5LSIjcy0P/AKY9UABd2RyjAAAAAElFTkSuQmCC',
    roles: ['admin', 'user'],
    preferences: {
      theme: 'light',
      timezone: 'Asia/Seoul',
      language: 'en-US',
    },
    summary: {
      projectCount: 5,
      unreadNotificationCount: 389,
    },
    capabilities: {
      isAdmin: true,
    },
    lastLoginedAt: '2026-06-14T17:02:49.780Z',
    createdAt: '2025-01-20T03:11:17.310Z',
    updatedAt: '2026-05-27T07:23:52.118Z',
  },
};

export const authSessionResponse = {
  sub: currentUserResponse.data.sub,
  displayname: currentUserResponse.data.displayName,
  displayName: currentUserResponse.data.displayName,
  email: currentUserResponse.data.email,
  exp: 4_102_444_800,
  iat: 1_766_100_000,
  id: currentUserResponse.data.id,
  name: currentUserResponse.data.name,
  roles: currentUserResponse.data.roles,
  userid: currentUserResponse.data.username,
  userId: currentUserResponse.data.username,
  username: currentUserResponse.data.username,
};

export const accountSettingResponse = {
  language: currentUserResponse.data.preferences.language,
  theme: currentUserResponse.data.preferences.theme,
  timezone: currentUserResponse.data.preferences.timezone,
};

export const notificationsResponse = {
  items: [
    {
      id: '6a166f49049bebf7dbd3d9cb',
      type: 'mail-info',
      title: '[Request] gfg Agent Creation',
      message: '',
      status: 'denied',
      projectId: null,
      isUnread: true,
      direction: 'outgoing',
      createdAt: '2026-05-27T04:12:57.974Z',
      updatedAt: '2026-05-27T04:12:57.974Z',
      readAt: null,
      decidedAt: '2026-06-09T04:46:46.110Z',
      executedAt: null,
    },
    {
      id: '6a166f49049bebf7dbd3d9c7',
      type: 'approval',
      title: 'approval',
      message:
        'Agent gfg creation was requested by lethanh.nguyen@lge.com. (type: dify)<br><br>Agent Name: gfg<br>Requester: lethanh.nguyen@lge.com<br>Agent Type: dify<br>Reason: gfd',
      status: 'denied',
      projectId: null,
      isUnread: true,
      direction: 'outgoing',
      createdAt: '2026-05-27T04:12:57.943Z',
      updatedAt: '2026-05-27T04:12:57.943Z',
      readAt: null,
      decidedAt: '2026-06-09T04:46:51.697Z',
      executedAt: null,
    },
    {
      id: '6a166f49049bebf7dbd3d9c5',
      type: 'notify-someone',
      title: '[Request] gfg Agent Creation',
      message:
        'A request has been made to the administrator for the creation of the gfg agent.<br><br>Agent Name: gfg<br>Agent Type: dify<br>Reason: gfd',
      status: 'pending',
      projectId: null,
      isUnread: true,
      direction: 'outgoing',
      createdAt: '2026-05-27T04:12:57.938Z',
      updatedAt: '2026-05-27T04:12:57.938Z',
      readAt: null,
      decidedAt: null,
      executedAt: null,
    },
    {
      id: '6a164d67049bebf7dbd3d1e9',
      type: 'mail-info',
      title: '[Request] testiungfd Agent Creation',
      message: '',
      status: 'pending',
      projectId: null,
      isUnread: true,
      direction: 'outgoing',
      createdAt: '2026-05-27T01:48:23.966Z',
      updatedAt: '2026-05-27T01:48:23.966Z',
      readAt: null,
      decidedAt: null,
      executedAt: null,
    },
    {
      id: '6a164d67049bebf7dbd3d1e5',
      type: 'approval',
      title: 'approval',
      message:
        'Agent testiungfd creation was requested by lethanh.nguyen@lge.com. (type: dify)<br><br>Agent Name: testiungfd<br>Requester: lethanh.nguyen@lge.com<br>Agent Type: dify<br>Reason: gfdg',
      status: 'pending',
      projectId: null,
      isUnread: true,
      direction: 'outgoing',
      createdAt: '2026-05-27T01:48:23.927Z',
      updatedAt: '2026-05-27T01:48:23.927Z',
      readAt: null,
      decidedAt: null,
      executedAt: null,
    },
    {
      id: '6a164d67049bebf7dbd3d1e3',
      type: 'notify-someone',
      title: '[Request] testiungfd Agent Creation',
      message:
        'A request has been made to the administrator for the creation of the testiungfd agent.<br><br>Agent Name: testiungfd<br>Agent Type: dify<br>Reason: gfdg',
      status: 'pending',
      projectId: null,
      isUnread: true,
      direction: 'outgoing',
      createdAt: '2026-05-27T01:48:23.921Z',
      updatedAt: '2026-05-27T01:48:23.921Z',
      readAt: null,
      decidedAt: null,
      executedAt: null,
    },
  ],
  page: {
    cursor: null,
    nextCursor: 'eyJvZmZzZXQiOjZ9',
    hasNext: true,
    total: 523,
  },
};

export const launchpadHeroResponse = {
  data: {
    title: 'Welcome back, lethanh.nguyen@lge.com',
    subtitle: 'Workspace 전반의 운영 현황과 바로 이어지는 작업 흐름을 한 화면에서 확인합니다.',
    userName: 'lethanh.nguyen@lge.com',
    workspaceName: 'DEJ Workspace',
    heroStats: [
      {
        key: 'workspace',
        label: '전체 Workspace',
        value: '8 / 57',
        note: '배포 앱 / 전체 프로젝트',
        icon: 'cloud',
        color: 'linear-gradient(135deg,#2563eb,#60a5fa)',
      },
      {
        key: 'users',
        label: '전체 사용자',
        value: '23',
        note: '가입 사용자 기준',
        icon: 'group',
        color: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
      },
      {
        key: 'saved-cost',
        label: '누적 절감 비용',
        value: '₩2.7M',
        note: 'Usage 누적 합산',
        icon: 'savings',
        color: 'linear-gradient(135deg,#16a34a,#4ade80)',
      },
      {
        key: 'monthly-llm-tokens',
        label: '월간 LLM 토큰',
        value: '59.3M',
        note: '이번 달 LiteLLM 전체',
        icon: 'vpn_key',
        color: 'linear-gradient(135deg,#f97316,#fb923c)',
      },
    ],
  },
};

export const announcementsResponse = {
  data: {
    items: [
      {
        id: 'announcement-launchpad-v2',
        title: 'Workspace v2 Launchpad',
        message: 'Launchpad, shared panels, and article endpoints now follow the v2 contract.',
        type: 'release',
        href: '/docs/api/v2/features/launchpad',
        publishedAt: '2026-05-15T00:00:00Z',
      },
      {
        id: 'announcement-ax-studio-day',
        title: 'Meet new development experience workflows at AX Studio Conference.',
        message:
          'Sessions connect App Gallery, AI Gallery, MCP, and the project hub into one journey. Review team examples and hands-on demos to see where AX Studio is heading next.',
        type: 'conference',
        href: '/docs/events/ax-studio-conference',
        publishedAt: '2026-05-14T00:00:00Z',
      },
      {
        id: 'announcement-secret-review',
        title: 'Production Secret Review Recommended',
        message:
          'Review Keycenter tiers and token rotation policies before registering external tools or chatbot channels.',
        type: 'security',
        href: '/docs/articles/token-hygiene',
        publishedAt: '2026-05-12T00:00:00Z',
      },
    ],
  },
};

export const serviceMenuResponse = {
  data: {
    items: [
      {
        id: 'store',
        title: 'Store',
        links: [
          {
            label: 'App Gallery',
            href: '/workspace/app-gallery',
            description: '실행형 개발 앱과 워크스페이스 도구를 발견하고 살펴보기',
            icon: 'app_gallery',
          },
          {
            label: 'AI Gallery',
            href: '/workspace/ai-gallery',
            description: '챗봇과 tool 자산을 전시하고 재사용 흐름으로 연결',
            icon: 'ai_gallery',
          },
        ],
      },
      {
        id: 'accessibility',
        title: 'Accessibility',
        links: [
          {
            label: 'Domain',
            href: '/workspace/domains',
            description: 'DNS 및 도메인 관리',
            icon: 'domain',
          },
          {
            label: 'Permission',
            href: '/workspace/permissions',
            description: 'IAM 및 권한 관리',
            icon: 'group',
          },
        ],
      },
      {
        id: 'storage',
        title: 'Storage',
        links: [
          {
            label: 'Database',
            href: '/workspace/databases',
            description: '데이터베이스 관리(MongoDB, PostgreSQL, Redis 등)',
            icon: 'database',
          },
          {
            label: 'Buckets',
            href: '/workspace/buckets',
            description: 'S3 스토리지 및 버킷 관리',
            icon: 'bucket',
          },
        ],
      },
      {
        id: 'development',
        title: 'Development',
        links: [
          {
            label: 'Consoles',
            href: '/workspace/consoles',
            description: '데이터베이스 웹 콘솔 모음',
            icon: 'console',
          },
          {
            label: 'Project/Publish',
            href: '/workspace/projects',
            description: '개발 프로젝트 관리(IDE 작업 공간)',
            icon: 'project',
          },
          {
            label: 'Jupyter',
            href: '/workspace/jupyter',
            description: '노트북 실험 및 분석 환경',
            icon: 'science',
          },
        ],
      },
      {
        id: 'ai',
        title: 'AI',
        links: [
          {
            label: 'Workflow',
            href: '/workspace/agents',
            description: 'Dify workflow와 승인형 자동화 런타임을 운영',
            icon: 'workflow',
          },
          {
            label: 'Chatbot',
            href: '/workspace/chatbots',
            description: 'API와 Frontend URL 기반 챗봇 엔드포인트를 관리',
            icon: 'chat',
          },
          {
            label: 'Tool Inventory',
            href: '/workspace/tool-inventory',
            description: '에이전트가 사용하는 연결된 MCP 및 도구 자산을 관리',
            icon: 'inventory',
          },
          {
            label: 'Keycenter',
            href: '/workspace/keycenter',
            description: 'LLM 키 발급과 Freekey, PaidKey 같은 Tier를 관리',
            icon: 'keycenter',
          },
        ],
      },
      {
        id: 'support',
        title: 'Support',
        links: [
          {
            label: '다큐먼트',
            href: '/docs/guides/getting-started',
            description: '가이드와 운영 문서를 확인합니다',
            icon: 'description',
          },
          {
            label: 'About DEJ',
            href: '/docs/about-dej',
            description: 'DEJ의 역사와 CEJ·DEJ 흐름을 확인합니다',
            icon: 'timeline',
          },
          {
            label: '챗봇',
            href: '/support/chatbot',
            description: '지원 챗봇으로 빠르게 문의합니다',
            icon: 'chat_bubble',
          },
          {
            label: '요청하기',
            href: '/support/request',
            description: '기능 요청이나 지원 요청을 등록합니다',
            icon: 'campaign',
          },
        ],
      },
    ],
  },
};

export const articlesResponse = {
  data: {
    items: [
      {
        id: 'article-mcp-workflow',
        title: 'MCP를 활용한 개발 워크플로우 자동화',
        category: 'ai',
        categoryLabel: 'MCP',
        publishedAt: '2026-04-05T00:00:00Z',
        href: '/docs/articles/mcp-workflow',
        summary:
          'Agent와 Tool Inventory를 연결해 반복적인 작업 흐름을 자동화하는 운영 패턴을 소개합니다.',
      },
      {
        id: 'article-token-hygiene',
        title: '운영 환경 토큰 관리 체크리스트',
        category: 'security',
        categoryLabel: 'Security',
        publishedAt: '2026-04-18T00:00:00Z',
        href: '/docs/articles/token-hygiene',
        summary: '배포와 챗봇 등록 과정에서 놓치기 쉬운 secret 관리 기준을 정리합니다.',
      },
      {
        id: 'article-launchpad-quickstart',
        title: '런치패드에서 프로젝트 시작하기',
        category: 'dev',
        categoryLabel: 'Quickstart',
        publishedAt: '2026-05-02T00:00:00Z',
        href: '/docs/guides/getting-started',
        summary: '프로젝트 생성부터 IDE 진입, 배포 준비 상태 확인까지 빠르게 연결하는 흐름입니다.',
      },
      {
        id: 'article-shared-key-policy',
        title: '공용 LLM Key Tier 운영 원칙',
        category: 'ai',
        categoryLabel: 'Keycenter',
        publishedAt: '2026-05-10T00:00:00Z',
        href: '/docs/articles/shared-key-policy',
        summary: 'FREE, PAID, SHARED tier를 워크로드 성격에 맞게 나누는 기준을 다룹니다.',
      },
    ],
    tabs: [
      { id: 'all', label: '전체' },
      { id: 'ai', label: 'AI' },
      { id: 'security', label: '보안' },
      { id: 'dev', label: '개발' },
    ],
  },
};

export const guideLinksResponse = {
  data: {
    surface: 'launchpad',
    type: 'guide-links',
    icon: 'menu_book',
    label: 'Guide Links',
    title: '가이드',
    description: '런치패드에서 바로 이어서 볼 수 있는 빠른 시작 문서 링크입니다.',
    rows: [
      { title: '처음 시작하기', meta: '10분', href: '/docs/guides/getting-started' },
      { title: '프로젝트 생성 가이드', meta: 'Setup', href: '/docs/guides/project-setup' },
      { title: 'Keycenter 운영 원칙', meta: 'Security', href: '/docs/articles/shared-key-policy' },
    ],
    footerLink: {
      href: '/workspace/projects',
      label: 'Projects Hub 열기',
    },
  },
};

export const projectsResponse = {
  items: [
    {
      id: '6a0d5c11992f59c2f8a6fd0e',
      name: 'test-key',
      description: '',
      projectType: 'autoscale',
      ide: 'codeserver',
      storage: 'small',
      visibility: 'private',
      role: 'owner',
      isFavorite: false,
      gitlab: { connected: false, projectId: null },
      createdAt: '2026-05-20T07:00:33.311Z',
      updatedAt: '2026-05-20T07:06:44.188Z',
    },
    {
      id: '6a0d5c29992f59c2f8a6fd34',
      name: 'test-key-fe',
      description: '',
      projectType: 'autoscale',
      ide: 'codeserver',
      storage: 'small',
      visibility: 'private',
      role: 'owner',
      isFavorite: false,
      gitlab: { connected: false, projectId: null },
      createdAt: '2026-05-20T07:00:57.951Z',
      updatedAt: '2026-05-20T07:00:57.951Z',
    },
    {
      id: '69ccc8ca042659d77d59a9f6',
      name: 'yg-sdk-check-react',
      description: '',
      projectType: 'static',
      ide: 'codeserver',
      storage: 'small',
      visibility: 'private',
      role: 'member',
      isFavorite: false,
      gitlab: { connected: false, projectId: null },
      createdAt: '2026-04-01T07:27:06.886Z',
      updatedAt: '2026-04-06T03:48:13.936Z',
    },
  ],
  page: { cursor: '', nextCursor: '', hasNext: false, total: 3 },
};

export const projectPublishHistoryByProjectId = {
  '6a0d5c11992f59c2f8a6fd0e': {
    items: [
      {
        id: 'publish-test-key-241',
        projectId: '6a0d5c11992f59c2f8a6fd0e',
        title: 'test-key release',
        version: 'v2.4.1',
        status: 'released',
        createdAt: '2026-05-20T07:06:44.188Z',
        updatedAt: '2026-05-20T07:06:44.188Z',
      },
    ],
    page: { cursor: '', nextCursor: '', hasNext: false, total: 1 },
  },
  '6a0d5c29992f59c2f8a6fd34': {
    items: [
      {
        id: 'publish-test-key-fe-240',
        projectId: '6a0d5c29992f59c2f8a6fd34',
        title: 'test-key-fe release',
        version: 'v2.4.0',
        status: 'released',
        createdAt: '2026-05-20T07:00:57.951Z',
        updatedAt: '2026-05-20T07:00:57.951Z',
      },
    ],
    page: { cursor: '', nextCursor: '', hasNext: false, total: 1 },
  },
  '69ccc8ca042659d77d59a9f6': {
    items: [
      {
        id: 'publish-yg-sdk-check-react-183',
        projectId: '69ccc8ca042659d77d59a9f6',
        title: 'yg-sdk-check-react release',
        version: 'v1.8.3',
        status: 'building',
        createdAt: '2026-04-06T03:48:13.936Z',
        updatedAt: '2026-04-06T03:48:13.936Z',
      },
    ],
    page: { cursor: '', nextCursor: '', hasNext: false, total: 1 },
  },
};

export const projectResourcesByProjectId = {
  '6a0d5c11992f59c2f8a6fd0e': {
    data: {
      projectId: '6a0d5c11992f59c2f8a6fd0e',
      projectName: 'test-key',
      items: [
        {
          id: 'resource-test-quality',
          projectId: '6a0d5c11992f59c2f8a6fd0e',
          resourceId: '69af90c9a817f1656cdd35ca',
          kind: 'database',
          name: 'test-quality',
          label: 'DB · MongoDB',
          status: 'Healthy',
        },
        {
          id: 'resource-dify-test11',
          projectId: '6a0d5c11992f59c2f8a6fd0e',
          resourceId: '6836ba173f2d7c148554e1dc',
          kind: 'bucket',
          name: 'dify-dify-test11',
          label: 'Bucket · shared',
          status: 'active',
        },
      ],
    },
  },
  '6a0d5c29992f59c2f8a6fd34': {
    data: {
      projectId: '6a0d5c29992f59c2f8a6fd34',
      projectName: 'test-key-fe',
      items: [
        {
          id: 'resource-domain-hango',
          projectId: '6a0d5c29992f59c2f8a6fd34',
          resourceId: '67b7f67ddefef46bea926e61',
          kind: 'domain',
          name: 'hango-test.com',
          label: 'Domain · custom',
          status: 'review',
        },
      ],
    },
  },
  '69ccc8ca042659d77d59a9f6': {
    data: {
      projectId: '69ccc8ca042659d77d59a9f6',
      projectName: 'yg-sdk-check-react',
      items: [
        {
          id: 'resource-console-mongo',
          projectId: '69ccc8ca042659d77d59a9f6',
          resourceId: '69d604a245ad1f36a0e1746e',
          kind: 'console',
          name: 'fdsfds',
          label: 'Console · Mongo GUI',
          status: 'Stopped',
        },
      ],
    },
  },
};

export const jobsResponse = {
  items: [
    {
      id: '6a0ebd42e5cafe2bb74be988',
      type: 'notify-someone',
      status: 'queued',
      progress: null,
      result: null,
      error: null,
      createdAt: '2026-05-21T08:07:30.947Z',
      updatedAt: '2026-05-25T04:45:25.406Z',
    },
    {
      id: '6a0ebd42e5cafe2bb74be98e',
      type: 'mail-info',
      status: 'queued',
      progress: null,
      result: null,
      error: null,
      createdAt: '2026-05-21T08:07:30.980Z',
      updatedAt: '2026-05-21T08:07:30.980Z',
    },
    {
      id: '6a0ebd42e5cafe2bb74be98a',
      type: 'approval',
      status: 'queued',
      progress: null,
      result: null,
      error: null,
      createdAt: '2026-05-21T08:07:30.951Z',
      updatedAt: '2026-05-21T08:07:30.951Z',
    },
    {
      id: '69ebafa0813a837cf09b721c',
      type: 'mail-info',
      status: 'queued',
      progress: null,
      result: null,
      error: null,
      createdAt: '2026-04-24T18:00:00.446Z',
      updatedAt: '2026-04-24T18:00:00.446Z',
    },
    {
      id: '69ebafa0813a837cf09b7218',
      type: 'notify-someone',
      status: 'queued',
      progress: null,
      result: null,
      error: null,
      createdAt: '2026-04-24T18:00:00.340Z',
      updatedAt: '2026-04-24T18:00:00.340Z',
    },
  ],
  page: {
    cursor: '',
    nextCursor: 'eyJvZmZzZXQiOjV9',
    hasNext: true,
    total: 502,
  },
};

export const launchpadMyWorkResponse = {
  data: {
    user: {
      ...currentUserResponse.data,
      lastLoginedAt: '2026-06-16T02:48:01.760Z',
      summary: {
        projectCount: 4,
        unreadNotificationCount: 389,
      },
    },
    summary: {
      projectCount: 4,
      unreadNotificationCount: 389,
      ideCount: 0,
      jobCount: 523,
      recentJobStatus: {
        total: 5,
        queued: 3,
        running: 0,
        failed: 2,
      },
    },
    projects: {
      items: [
        {
          id: '6a1f9827dd04758174b382ee',
          name: 'sasasasasa',
          description: '',
          projectType: 'autoscale',
          ide: 'codeserver',
          storage: 'small',
          visibility: 'private',
          role: 'owner',
          isFavorite: false,
          gitlab: { connected: false, projectId: null },
          createdAt: '2026-06-03T02:57:43.614Z',
          updatedAt: '2026-06-03T02:57:43.614Z',
        },
        {
          id: '6a164d56049bebf7dbd3d1b2',
          name: 'testing',
          description: 'fdsfds',
          projectType: 'autoscale',
          ide: 'codeserver',
          storage: 'medium',
          visibility: 'private',
          role: 'owner',
          isFavorite: false,
          gitlab: { connected: false, projectId: null },
          createdAt: '2026-05-27T01:48:06.234Z',
          updatedAt: '2026-05-27T01:48:06.234Z',
        },
        {
          id: '6a0d5c11992f59c2f8a6fd0e',
          name: 'test-key',
          description: '',
          projectType: 'autoscale',
          ide: 'codeserver',
          storage: 'small',
          visibility: 'private',
          role: 'owner',
          isFavorite: false,
          gitlab: { connected: false, projectId: null },
          createdAt: '2026-05-20T07:00:33.311Z',
          updatedAt: '2026-05-20T07:06:44.188Z',
        },
        {
          id: '6a0d5c29992f59c2f8a6fd34',
          name: 'test-key-fe',
          description: '',
          projectType: 'autoscale',
          ide: 'codeserver',
          storage: 'small',
          visibility: 'private',
          role: 'owner',
          isFavorite: false,
          gitlab: { connected: false, projectId: null },
          createdAt: '2026-05-20T07:00:57.951Z',
          updatedAt: '2026-05-20T07:00:57.951Z',
        },
      ],
      total: 4,
      hasMore: false,
      nextCursor: null,
    },
    ides: {
      items: [],
      total: 0,
      hasMore: false,
      nextCursor: null,
    },
    notifications: {
      items: [
        {
          id: '6a166f49049bebf7dbd3d9cb',
          type: 'mail-info',
          title: '[Request] gfg Agent Creation',
          message: '',
          status: 'pending',
          projectId: null,
          isUnread: true,
          direction: 'outgoing',
          createdAt: '2026-05-27T04:12:57.974Z',
          updatedAt: '2026-05-27T04:12:57.974Z',
          readAt: null,
          decidedAt: null,
          executedAt: null,
        },
        {
          id: '6a166f49049bebf7dbd3d9c7',
          type: 'approval',
          title: 'approval',
          message:
            'Agent gfg creation was requested by lethanh.nguyen@lge.com. (type: dify)<br><br>Agent Name: gfg<br>Requester: lethanh.nguyen@lge.com<br>Agent Type: dify<br>Reason: gfd',
          status: 'denied',
          projectId: null,
          isUnread: true,
          direction: 'outgoing',
          createdAt: '2026-05-27T04:12:57.943Z',
          updatedAt: '2026-05-27T04:12:57.943Z',
          readAt: null,
          decidedAt: '2026-06-09T04:46:46.110Z',
          executedAt: null,
        },
        {
          id: '6a166f49049bebf7dbd3d9c5',
          type: 'notify-someone',
          title: '[Request] gfg Agent Creation',
          message:
            'A request has been made to the administrator for the creation of the gfg agent.<br><br>Agent Name: gfg<br>Agent Type: dify<br>Reason: gfd',
          status: 'pending',
          projectId: null,
          isUnread: true,
          direction: 'outgoing',
          createdAt: '2026-05-27T04:12:57.938Z',
          updatedAt: '2026-05-27T04:12:57.938Z',
          readAt: null,
          decidedAt: null,
          executedAt: null,
        },
        {
          id: '6a164d67049bebf7dbd3d1e9',
          type: 'mail-info',
          title: '[Request] testiungfd Agent Creation',
          message: '',
          status: 'pending',
          projectId: null,
          isUnread: true,
          direction: 'outgoing',
          createdAt: '2026-05-27T01:48:23.966Z',
          updatedAt: '2026-05-27T01:48:23.966Z',
          readAt: null,
          decidedAt: null,
          executedAt: null,
        },
        {
          id: '6a164d67049bebf7dbd3d1e5',
          type: 'approval',
          title: 'approval',
          message:
            'Agent testiungfd creation was requested by lethanh.nguyen@lge.com. (type: dify)<br><br>Agent Name: testiungfd<br>Requester: lethanh.nguyen@lge.com<br>Agent Type: dify<br>Reason: gfdg',
          status: 'denied',
          projectId: null,
          isUnread: true,
          direction: 'outgoing',
          createdAt: '2026-05-27T01:48:23.927Z',
          updatedAt: '2026-05-27T01:48:23.927Z',
          readAt: null,
          decidedAt: '2026-06-09T04:46:51.697Z',
          executedAt: null,
        },
      ],
      total: 523,
      hasMore: true,
      nextCursor: 'eyJvZmZzZXQiOjV9',
    },
    jobs: {
      items: [
        {
          id: '6a166f49049bebf7dbd3d9cb',
          type: 'mail-info',
          status: 'queued',
          progress: null,
          result: null,
          error: null,
          createdAt: '2026-05-27T04:12:57.974Z',
          updatedAt: '2026-05-27T04:12:57.974Z',
        },
        {
          id: '6a166f49049bebf7dbd3d9c7',
          type: 'approval',
          status: 'failed',
          progress: null,
          result: null,
          error: {
            code: 'JOB_FAILED',
            message:
              'Agent gfg creation was requested by lethanh.nguyen@lge.com. (type: dify)<br><br>Agent Name: gfg<br>Requester: lethanh.nguyen@lge.com<br>Agent Type: dify<br>Reason: gfd',
          },
          createdAt: '2026-05-27T04:12:57.943Z',
          updatedAt: '2026-05-27T04:12:57.943Z',
        },
        {
          id: '6a166f49049bebf7dbd3d9c5',
          type: 'notify-someone',
          status: 'queued',
          progress: null,
          result: null,
          error: null,
          createdAt: '2026-05-27T04:12:57.938Z',
          updatedAt: '2026-05-27T04:12:57.938Z',
        },
        {
          id: '6a164d67049bebf7dbd3d1e9',
          type: 'mail-info',
          status: 'queued',
          progress: null,
          result: null,
          error: null,
          createdAt: '2026-05-27T01:48:23.966Z',
          updatedAt: '2026-05-27T01:48:23.966Z',
        },
        {
          id: '6a164d67049bebf7dbd3d1e5',
          type: 'approval',
          status: 'failed',
          progress: null,
          result: null,
          error: {
            code: 'JOB_FAILED',
            message:
              'Agent testiungfd creation was requested by lethanh.nguyen@lge.com. (type: dify)<br><br>Agent Name: testiungfd<br>Requester: lethanh.nguyen@lge.com<br>Agent Type: dify<br>Reason: gfdg',
          },
          createdAt: '2026-05-27T01:48:23.927Z',
          updatedAt: '2026-05-27T01:48:23.927Z',
        },
      ],
      total: 523,
      hasMore: true,
      nextCursor: 'eyJvZmZzZXQiOjV9',
    },
  },
};

export const storeSpotlightResponse = {
  data: {
    items: [
      {
        id: 'store-app-gallery',
        title: 'App Gallery',
        description: 'Browse install-ready app templates and featured apps.',
        href: '/workspace/app-gallery',
        type: 'app-gallery',
      },
      {
        id: 'store-ai-gallery',
        title: 'AI Gallery',
        description: 'Explore curated agents, workflow packs, and MCP configurations.',
        href: '/workspace/ai-gallery',
        type: 'ai-gallery',
      },
    ],
  },
};

export const appGalleryHeroResponse = {
  data: {
    title: 'App Gallery',
    subtitle:
      '프로젝트 시작, 운영 포털, 분석 대시보드까지 바로 이어지는 앱 템플릿을 큐레이션합니다.',
    stats: [
      {
        id: 'catalog',
        label: 'Curated Apps',
        value: '6',
        note: '현재 제공 중인 앱 카탈로그',
      },
      {
        id: 'published',
        label: 'Published Apps',
        value: '0',
        note: '현재 배포 중인 공개 프로젝트',
      },
      {
        id: 'projects',
        label: 'Target Projects',
        value: '60',
        note: '설치 흐름을 연결할 수 있는 전체 프로젝트',
      },
      {
        id: 'categories',
        label: 'Categories',
        value: '4',
        note: '개발, 운영, 워크스페이스, 분석 카테고리',
      },
    ],
    primaryCta: {
      label: 'Browse Featured Apps',
      href: '/workspace/app-gallery',
    },
  },
};

export const appGalleryCategoriesResponse = {
  data: {
    items: [
      {
        id: 'all',
        label: '전체',
        description: '운영과 개발에 바로 연결되는 전체 앱 카탈로그',
        count: 6,
      },
      {
        id: 'development',
        label: 'Development',
        description: '프로젝트 생성과 IDE 진입을 빠르게 연결하는 앱',
        count: 1,
      },
      {
        id: 'workspace',
        label: 'Workspace',
        description: '협업, 문서, 포털 성격의 운영 앱',
        count: 2,
      },
      {
        id: 'operations',
        label: 'Operations',
        description: '배포와 상태 점검, 운영 자동화 흐름',
        count: 2,
      },
      {
        id: 'analytics',
        label: 'Analytics',
        description: '트래픽과 서비스 지표를 읽는 앱',
        count: 1,
      },
    ],
    defaultCategory: 'all',
  },
};

export const appGalleryCatalogItems = [
  {
    slug: 'code-studio',
    title: 'Code Studio',
    subtitle: 'Code Server starter for project owners',
    category: 'development',
    categoryLabel: 'Development',
    icon: 'terminal',
    iconColor: '#2563eb',
    tags: ['codeserver', 'ide', 'starter'],
    summary: '프로젝트를 바로 열고 수정할 수 있는 기본 개발 워크스페이스를 설치합니다.',
    installTargetLabel: '프로젝트',
    capabilities: { canInstall: true, canPreview: true },
  },
  {
    slug: 'launch-monitor',
    title: 'Launch Monitor',
    subtitle: 'Deployment and readiness overview',
    category: 'operations',
    categoryLabel: 'Operations',
    icon: 'rocket_launch',
    iconColor: '#ea580c',
    tags: ['deploy', 'readiness', 'release'],
    summary: '배포 준비 상태, 최근 릴리즈, rollback 흐름을 한 번에 보는 운영 대시보드입니다.',
    installTargetLabel: '프로젝트',
    capabilities: { canInstall: true, canPreview: true },
  },
  {
    slug: 'docs-portal',
    title: 'Docs Portal',
    subtitle: 'Internal guide and README publishing kit',
    category: 'workspace',
    categoryLabel: 'Workspace',
    icon: 'menu_book',
    iconColor: '#0f766e',
    tags: ['docs', 'readme', 'guide'],
    summary: '프로젝트 문서와 가이드를 정리해 운영자와 사용자 모두가 읽기 쉬운 포털 형태로 제공합니다.',
    installTargetLabel: '프로젝트',
    capabilities: { canInstall: true, canPreview: true },
  },
  {
    slug: 'analytics-lab',
    title: 'Analytics Lab',
    subtitle: 'Traffic and usage insight starter',
    category: 'analytics',
    categoryLabel: 'Analytics',
    icon: 'query_stats',
    iconColor: '#7c3aed',
    tags: ['analytics', 'matomo', 'insights'],
    summary: '사용자 방문량과 서비스 사용량을 정리해 실험형 분석 대시보드로 연결합니다.',
    installTargetLabel: '프로젝트',
    capabilities: { canInstall: true, canPreview: true },
  },
  {
    slug: 'support-desk',
    title: 'Support Desk',
    subtitle: 'Request intake and approval handoff',
    category: 'workspace',
    categoryLabel: 'Workspace',
    icon: 'support_agent',
    iconColor: '#be123c',
    tags: ['support', 'approval', 'intake'],
    summary: '문의 접수, 승인 요청, 후속 액션 링크를 한 화면에 정리하는 지원용 앱 템플릿입니다.',
    installTargetLabel: '프로젝트',
    capabilities: { canInstall: true, canPreview: true },
  },
  {
    slug: 'runtime-console',
    title: 'Runtime Console',
    subtitle: 'Service checks and terminal shortcuts',
    category: 'operations',
    categoryLabel: 'Operations',
    icon: 'developer_board',
    iconColor: '#1d4ed8',
    tags: ['console', 'runtime', 'terminal'],
    summary: '서비스 상태 확인, 로그 확인, 터미널 진입 동선을 줄여 주는 운영용 도구 묶음입니다.',
    installTargetLabel: '프로젝트',
    capabilities: { canInstall: true, canPreview: true },
  },
];

export const appGalleryAppsResponse = {
  items: appGalleryCatalogItems,
  page: {
    cursor: null,
    nextCursor: null,
    hasNext: false,
    total: 6,
  },
};

export const appGalleryFeaturedResponse = {
  data: {
    items: [
      {
        ...appGalleryCatalogItems[0],
        badge: '가장 빠른 시작점',
      },
      {
        ...appGalleryCatalogItems[1],
        badge: '운영 가시성 강화',
      },
      {
        ...appGalleryCatalogItems[2],
        badge: '문서화가 중요한 팀에 적합',
      },
    ],
  },
};

export const appGalleryRelatedAiResponse = {
  data: {
    items: [
      {
        slug: 'release-review-agent',
        title: 'Release Review Agent',
        subtitle: '배포 전 체크와 승인 포인트를 정리하는 agent',
        category: 'agent',
        href: '/workspace/ai-gallery',
        tags: ['agent', 'release', 'review'],
      },
      {
        slug: 'workspace-helper-pack',
        title: 'Workspace Helper Pack',
        subtitle: '문서, 가이드, MCP 연결을 묶은 workflow pack',
        category: 'workflow-pack',
        href: '/workspace/ai-gallery',
        tags: ['workflow-pack', 'docs', 'mcp'],
      },
      {
        slug: 'insight-analyst-agent',
        title: 'Insight Analyst Agent',
        subtitle: '사용량과 트렌드를 빠르게 읽어 주는 분석 agent',
        category: 'agent',
        href: '/workspace/ai-gallery',
        tags: ['agent', 'analytics', 'insight'],
      },
    ],
  },
};

export const appGalleryAppDetailsBySlug = {
  'code-studio': {
    data: {
      ...appGalleryCatalogItems[0],
      description:
        '신규 프로젝트에 Code Server 중심의 개발 환경, 기본 README 템플릿, 배포 전 점검 링크를 함께 연결합니다.',
      highlights: [
        'IDE 진입 링크와 프로젝트 기본 구조를 함께 제공합니다.',
        '프로젝트 상세의 Run, Open IDE 흐름과 자연스럽게 연결됩니다.',
        'Launchpad와 Projects Hub 사이의 시작 동선을 줄여 줍니다.',
      ],
      useCases: ['프로젝트 부트스트랩', '팀 공통 개발 환경 표준화', '신규 협업자 온보딩'],
      prerequisites: ['설치 대상 프로젝트 접근 권한', 'Code Server 기반 IDE 사용'],
      install: {
        method: 'POST',
        path: '/api/v2/app-gallery/apps/code-studio/install',
        requiredFields: ['projectId'],
        targetType: 'project',
      },
      relatedAi: appGalleryRelatedAiResponse.data.items.slice(0, 2),
    },
  },
  'launch-monitor': {
    data: {
      ...appGalleryCatalogItems[1],
      description:
        'Project Detail의 Publish 섹션과 Job 상태 추적을 중심으로 운영자용 배포 모니터를 구성합니다.',
      highlights: [
        '배포 readiness 체크와 Job 추적 흐름을 연결합니다.',
        '최근 릴리즈 히스토리와 위험 신호를 같은 컨텍스트에서 읽을 수 있습니다.',
      ],
      useCases: ['배포 워룸', '운영 체크리스트 패널', '프로젝트 상태 브리핑'],
      prerequisites: ['배포 이력이 있는 프로젝트가 권장됩니다.'],
      install: {
        method: 'POST',
        path: '/api/v2/app-gallery/apps/launch-monitor/install',
        requiredFields: ['projectId'],
        targetType: 'project',
      },
      relatedAi: [appGalleryRelatedAiResponse.data.items[0]],
    },
  },
  'docs-portal': {
    data: {
      ...appGalleryCatalogItems[2],
      description:
        'README, 공통 가이드 링크, 배포 이력 패널을 묶어 문서 중심 프로젝트를 빠르게 구성합니다.',
      highlights: [
        'Launchpad Guides, Project Detail README와 문서 흐름을 맞춥니다.',
        '운영 가이드와 사용자 문서를 한 프로젝트로 정리하기 좋습니다.',
      ],
      useCases: ['팀 운영 문서 허브', '프로젝트 온보딩 사이트', '내부 포털 MVP'],
      prerequisites: ['프로젝트 README 또는 문서 콘텐츠 준비'],
      install: {
        method: 'POST',
        path: '/api/v2/app-gallery/apps/docs-portal/install',
        requiredFields: ['projectId'],
        targetType: 'project',
      },
      relatedAi: [],
    },
  },
  'analytics-lab': {
    data: {
      ...appGalleryCatalogItems[3],
      description:
        'Project Observability와 Launchpad Hero 지표를 참고해 KPI 중심의 대시보드를 빠르게 시작합니다.',
      highlights: [
        '방문량, 서비스 사용량, KPI 패널을 함께 배치할 수 있습니다.',
        '운영 회고와 실험 리포트 흐름에 적합합니다.',
      ],
      useCases: ['주간 운영 리포트', 'KPI 실험 대시보드', '서비스 분석 허브'],
      prerequisites: ['분석 소스 연결 또는 샘플 데이터 준비'],
      install: {
        method: 'POST',
        path: '/api/v2/app-gallery/apps/analytics-lab/install',
        requiredFields: ['projectId'],
        targetType: 'project',
      },
      relatedAi: [appGalleryRelatedAiResponse.data.items[2]],
    },
  },
  'support-desk': {
    data: {
      ...appGalleryCatalogItems[4],
      description:
        'Simplify support workflows by combining intake, approval requests, and follow-up action links in one view.',
      highlights: [
        'Shows request intake and approval status in the same screen.',
        'Places follow-up action links around support operator needs.',
        'Standardizes repeated support requests as an app template.',
      ],
      useCases: ['Support request intake', 'Approval handoff', 'Operations action tracking'],
      prerequisites: ['Support target project', 'Approver or operator permission'],
      install: {
        method: 'POST',
        path: '/api/v2/app-gallery/apps/support-desk/install',
        requiredFields: ['projectId'],
        targetType: 'project',
      },
      relatedAi: appGalleryRelatedAiResponse.data.items.slice(0, 2),
    },
  },
  'runtime-console': {
    data: {
      ...appGalleryCatalogItems[5],
      description:
        'Group service status, logs, and terminal entry points so operators can reach issue checks faster.',
      highlights: [
        'Provides service status and log shortcuts together.',
        'Shortens the terminal entry path to improve operations speed.',
        'Organizes runtime inspection links into one card.',
      ],
      useCases: ['Service status checks', 'Operations log review', 'Runtime shortcuts'],
      prerequisites: ['Access to the operations target project', 'Runtime console permission'],
      install: {
        method: 'POST',
        path: '/api/v2/app-gallery/apps/runtime-console/install',
        requiredFields: ['projectId'],
        targetType: 'project',
      },
      relatedAi: [appGalleryRelatedAiResponse.data.items[0]],
    },
  },
};

export const appGalleryInstallResponse = {
  data: {
    jobId: '6a3a02a5dc684c9fde7e52e1',
    status: 'queued',
  },
};

export const aiGallerySpotlightResponse = {
  data: {
    slug: 'jean',
    title: 'jean',
    subtitle: 'dify',
    category: 'agent',
    iconColor: '#2563eb',
    tags: ['dify'],
    summary: 'An agent that can connect to workspace flows.',
    provider: 'dify',
    status: 'review',
    statusLabel: 'Review',
    toolCount: 0,
    openUrl: 'https://jean.dify.hedej.lge.com',
    updatedAt: '2026-05-20T01:11:55.384Z',
    capabilities: { canInstall: true, canOpen: true },
  },
};

export const launchpadOverviewResponse = {
  data: {
    hero: {
      title: 'Welcome back, lethanh.nguyen@lge.com',
      subtitle: 'Workspace 전반의 운영 현황과 바로 이어지는 작업 흐름을 한 화면에서 확인합니다.',
      userName: 'lethanh.nguyen@lge.com',
      workspaceName: 'DEJ Workspace',
      heroStats: [
        {
          key: 'workspace',
          label: '전체 Workspace',
          value: '8 / 53',
          note: '배포 앱 / 전체 프로젝트',
          icon: 'cloud',
          color: 'linear-gradient(135deg,#2563eb,#60a5fa)',
        },
        {
          key: 'users',
          label: '전체 사용자',
          value: '24',
          note: '가입 사용자 기준',
          icon: 'group',
          color: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
        },
        {
          key: 'saved-cost',
          label: '누적 절감 비용',
          value: '₩2.7M',
          note: 'Usage 누적 합산',
          icon: 'savings',
          color: 'linear-gradient(135deg,#16a34a,#4ade80)',
        },
        {
          key: 'monthly-llm-tokens',
          label: '월간 LLM 토큰',
          value: '59.4M',
          note: '이번 달 LiteLLM 전체',
          icon: 'vpn_key',
          color: 'linear-gradient(135deg,#f97316,#fb923c)',
        },
      ],
    },
    announcements: {
      items: [
        {
          id: 'announcement-launchpad-v2',
          title: 'Workspace v2 Launchpad',
          message: '런치패드, 공통 패널, Launchpad Articles 엔드포인트가 v2 계약으로 정리되었습니다.',
          type: 'release',
          href: '/docs/api/v2/features/launchpad',
          publishedAt: '2026-05-15T00:00:00Z',
        },
        {
          id: 'announcement-secret-review',
          title: '운영 Secret 점검 권장',
          message:
            '외부 연결 도구와 챗봇 채널 등록 전에 Keycenter tier와 token rotation 정책을 다시 확인하세요.',
          type: 'security',
          href: '/docs/articles/token-hygiene',
          publishedAt: '2026-05-12T00:00:00Z',
        },
      ],
    },
    storeSpotlight: {
      items: [
        {
          id: 'store-app-gallery',
          title: 'App Gallery',
          description: '바로 설치 가능한 앱 템플릿과 추천 앱을 빠르게 둘러봅니다.',
          href: '/workspace/app-gallery',
          type: 'app-gallery',
        },
        {
          id: 'store-ai-gallery',
          title: 'AI Gallery',
          description: '연결 가능한 agent, workflow pack, MCP 구성을 큐레이션해서 확인합니다.',
          href: '/workspace/ai-gallery',
          type: 'ai-gallery',
        },
      ],
      featuredApps: [
        {
          slug: 'code-studio',
          title: 'Code Studio',
          subtitle: 'Code Server starter for project owners',
          category: 'development',
          categoryLabel: 'Development',
          icon: 'terminal',
          iconColor: '#2563eb',
          tags: ['codeserver', 'ide', 'starter'],
          summary: '프로젝트를 바로 열고 수정할 수 있는 기본 개발 워크스페이스를 설치합니다.',
          installTargetLabel: '프로젝트',
          capabilities: { canInstall: true, canPreview: true },
          badge: '가장 빠른 시작점',
        },
        {
          slug: 'launch-monitor',
          title: 'Launch Monitor',
          subtitle: 'Deployment and readiness overview',
          category: 'operations',
          categoryLabel: 'Operations',
          icon: 'rocket_launch',
          iconColor: '#ea580c',
          tags: ['deploy', 'readiness', 'release'],
          summary: '배포 준비 상태, 최근 릴리즈, rollback 흐름을 한 번에 보는 운영 대시보드입니다.',
          installTargetLabel: '프로젝트',
          capabilities: { canInstall: true, canPreview: true },
          badge: '운영 가시성 강화',
        },
        {
          slug: 'docs-portal',
          title: 'Docs Portal',
          subtitle: 'Internal guide and README publishing kit',
          category: 'workspace',
          categoryLabel: 'Workspace',
          icon: 'menu_book',
          iconColor: '#0f766e',
          tags: ['docs', 'readme', 'guide'],
          summary:
            '프로젝트 문서와 가이드를 정리해 운영자와 사용자 모두가 읽기 쉬운 포털 형태로 제공합니다.',
          installTargetLabel: '프로젝트',
          capabilities: { canInstall: true, canPreview: true },
          badge: '문서화가 중요한 팀에 적합',
        },
      ],
      aiSpotlight: {
        slug: 'jean',
        title: 'jean',
        subtitle: 'dify',
        category: 'agent',
        iconColor: '#2563eb',
        tags: ['dify'],
        summary: '워크스페이스 흐름에 연결할 수 있는 agent입니다.',
        provider: 'dify',
        status: 'review',
        statusLabel: 'Review',
        toolCount: 0,
        openUrl: 'https://jean.dify.hedej.lge.com',
        updatedAt: '2026-05-20T01:11:55.384Z',
        capabilities: { canInstall: true, canOpen: true },
      },
    },
    articles: articlesResponse.data,
    serviceMenu: serviceMenuResponse.data,
    guides: guideLinksResponse.data,
  },
};

const resourceOwner = {
  sub: '1640a460-e7cb-481f-bea2-bbdd38c99dab',
  userId: 'lethanh.nguyen',
  displayName: 'lethanh.nguyen',
  email: 'lethanh.nguyen@lge.com',
};

const databaseOwners = {
  jaeon: {
    sub: '351f0de9-5870-4b4c-bb60-20d57f175679',
    userId: 'jaeon.park',
    displayName: 'jaeon.park',
    email: 'jaeon.park@lge.com',
  },
  lethanh: resourceOwner,
  seunghyun: {
    sub: '4ff875af-7807-472b-ac5d-907232b3bcce',
    userId: 'seunghyun.yi',
    displayName: 'seunghyun.yi',
    email: 'seunghyun.yi@lge.com',
  },
  yonggeun: {
    sub: 'd30683b8-52ee-4b61-a63f-6210b9547058',
    userId: 'yonggeun.jung',
    displayName: 'yonggeun.jung',
    email: 'yonggeun.jung@lge.com',
  },
  yonghun: {
    sub: '733b3a5b-19eb-4f19-a657-895782b3e702',
    userId: 'yonghun.shin',
    displayName: 'yonghun.shin',
    email: 'yonghun.shin@lge.com',
  },
};

export const databasesResponse = {
  items: [
    {
      id: '6a0d0a5b0f75fd60c72f0782',
      name: 'dify-mv-jean',
      engine: 'milvus',
      version: null,
      status: 'unknown',
      summary: 'Milvus database',
      endpoint: { host: 'dify-mv-jean-milvus.milvus-dev.svc', port: 19530 },
      usage: { storageLabel: '0B / 10GB', usedBytes: 0, quotaBytes: 10737418240, usagePercent: 0 },
      owner: databaseOwners.jaeon,
      collaborators: [databaseOwners.jaeon],
      backup: 'none',
      bindingCount: 0,
      health: {
        severity: 'unknown',
        label: 'Unknown',
        message: '런타임 상태를 아직 확인하지 못했습니다.',
      },
      capabilities: { canEdit: true, canDelete: true, canRestart: true, canManageBindings: true },
      createdAt: '2026-05-20T01:11:55.974Z',
      updatedAt: '2026-05-20T01:11:55.974Z',
    },
    {
      id: '6a0aa764b9050af6affa4b71',
      name: 'jean-milvus-test',
      engine: 'milvus',
      version: 'v1beta1',
      status: 'unknown',
      summary: 'Milvus database',
      endpoint: { host: 'jean-milvus-test-milvus.milvus-dev.svc', port: 19530 },
      usage: { storageLabel: '0B / 1.0GB', usedBytes: 0, quotaBytes: 1073741824, usagePercent: 0 },
      owner: databaseOwners.jaeon,
      collaborators: [databaseOwners.jaeon],
      backup: 'none',
      bindingCount: 2,
      health: {
        severity: 'unknown',
        label: 'Unknown',
        message: '런타임 상태를 아직 확인하지 못했습니다.',
      },
      capabilities: { canEdit: true, canDelete: true, canRestart: true, canManageBindings: true },
      createdAt: '2026-05-18T05:45:08.262Z',
      updatedAt: '2026-05-18T05:45:08.262Z',
    },
    {
      id: '69e08ac0081948ac0f056d8f',
      name: 'jean-test',
      engine: 'postgres',
      version: '15',
      status: 'running',
      summary: 'PostgreSQL database',
      endpoint: { host: 'jean-test-0.jean-test.postgres-dev.svc', port: 5432 },
      usage: { storageLabel: '0B / 2.0GB', usedBytes: 0, quotaBytes: 2147483648, usagePercent: 0 },
      owner: databaseOwners.jaeon,
      collaborators: [databaseOwners.jaeon],
      backup: 'none',
      bindingCount: 2,
      health: {
        severity: 'healthy',
        label: 'Healthy',
        message: '최근 상태 점검 기준으로 이상 징후가 없습니다.',
      },
      capabilities: { canEdit: true, canDelete: true, canRestart: true, canManageBindings: true },
      createdAt: '2026-04-16T07:07:44.591Z',
      updatedAt: '2026-04-16T07:07:44.591Z',
    },
    {
      id: '6a2776505b34c8f415bf6a9a',
      name: 'metric-turn-off',
      engine: 'milvus',
      version: 'v1beta1',
      status: 'unknown',
      summary: 'Milvus database',
      endpoint: { host: 'metric-turn-off-milvus.milvus-dev.svc', port: 19530 },
      usage: { storageLabel: '0B / 1.0GB', usedBytes: 0, quotaBytes: 1073741824, usagePercent: 0 },
      owner: databaseOwners.yonghun,
      collaborators: [databaseOwners.yonghun],
      backup: 'none',
      bindingCount: 0,
      health: {
        severity: 'unknown',
        label: 'Unknown',
        message: '런타임 상태를 아직 확인하지 못했습니다.',
      },
      capabilities: { canEdit: true, canDelete: true, canRestart: true, canManageBindings: true },
      createdAt: '2026-06-09T02:11:28.189Z',
      updatedAt: '2026-06-09T02:11:28.189Z',
    },
    {
      id: '69f6a7470bf7bca01912f5f6',
      name: 'pvc-test',
      engine: 'postgres',
      version: '15',
      status: 'running',
      summary: 'PostgreSQL database',
      endpoint: { host: 'pvc-test-0.pvc-test.postgres-dev.svc', port: 5432 },
      usage: { storageLabel: '0B / 2.0GB', usedBytes: 0, quotaBytes: 2147483648, usagePercent: 0 },
      owner: databaseOwners.yonghun,
      collaborators: [databaseOwners.yonghun],
      backup: 'none',
      bindingCount: 0,
      health: {
        severity: 'healthy',
        label: 'Healthy',
        message: '최근 상태 점검 기준으로 이상 징후가 없습니다.',
      },
      capabilities: { canEdit: true, canDelete: true, canRestart: true, canManageBindings: true },
      createdAt: '2026-05-03T01:39:19.381Z',
      updatedAt: '2026-05-03T01:39:19.381Z',
    },
    {
      id: '6a0d46765450fb305e4c167a',
      name: 'sirius-mongodb',
      engine: 'mongo',
      version: '6.0.5',
      status: 'running',
      summary: 'MongoDB database',
      endpoint: null,
      usage: { storageLabel: '0B / 1.0GB', usedBytes: 0, quotaBytes: 1073741824, usagePercent: 0 },
      owner: databaseOwners.seunghyun,
      collaborators: [databaseOwners.seunghyun],
      backup: 'none',
      bindingCount: 0,
      health: {
        severity: 'healthy',
        label: 'Healthy',
        message: '최근 상태 점검 기준으로 이상 징후가 없습니다.',
      },
      capabilities: { canEdit: true, canDelete: true, canRestart: true, canManageBindings: true },
      createdAt: '2026-05-20T05:28:22.518Z',
      updatedAt: '2026-05-20T05:28:22.518Z',
    },
    {
      id: '69fadcdde69dcb16cc5fa1e0',
      name: 'sirius-uv',
      engine: 'mysql',
      version: null,
      status: 'running',
      summary: 'MariaDB database',
      endpoint: { host: 'sirius-uv.mariadb-dev.svc', port: 3306 },
      usage: { storageLabel: '0B / 1.0GB', usedBytes: 0, quotaBytes: 1073741824, usagePercent: 0 },
      owner: databaseOwners.seunghyun,
      collaborators: [databaseOwners.seunghyun],
      backup: 'none',
      bindingCount: 1,
      health: {
        severity: 'healthy',
        label: 'Healthy',
        message: '최근 상태 점검 기준으로 이상 징후가 없습니다.',
      },
      capabilities: { canEdit: true, canDelete: true, canRestart: true, canManageBindings: true },
      createdAt: '2026-05-06T06:17:01.027Z',
      updatedAt: '2026-05-06T06:17:01.027Z',
    },
    {
      id: '69af90c9a817f1656cdd35ca',
      name: 'test-quality',
      engine: 'mongo',
      version: '6.0.5',
      status: 'running',
      summary: 'MongoDB database',
      endpoint: null,
      usage: { storageLabel: '0B / 1.0GB', usedBytes: 0, quotaBytes: 1073741824, usagePercent: 0 },
      owner: databaseOwners.lethanh,
      collaborators: [databaseOwners.lethanh],
      backup: 'none',
      bindingCount: 1,
      health: {
        severity: 'healthy',
        label: 'Healthy',
        message: '최근 상태 점검 기준으로 이상 징후가 없습니다.',
      },
      capabilities: { canEdit: true, canDelete: true, canRestart: true, canManageBindings: true },
      createdAt: '2026-03-10T03:32:25.848Z',
      updatedAt: '2026-03-10T03:32:25.848Z',
    },
    {
      id: '69cc6127507bfc1708ba753f',
      name: 'yg-conn-redis',
      engine: 'redis',
      version: null,
      status: 'running',
      summary: 'Redis database',
      endpoint: { host: 'rfs-yg-conn-redis.redis-dev.svc', port: 26379 },
      usage: { storageLabel: '0B / 5.0GB', usedBytes: 0, quotaBytes: 5368709120, usagePercent: 0 },
      owner: databaseOwners.yonggeun,
      collaborators: [databaseOwners.yonggeun],
      backup: 'none',
      bindingCount: 1,
      health: {
        severity: 'healthy',
        label: 'Healthy',
        message: '최근 상태 점검 기준으로 이상 징후가 없습니다.',
      },
      capabilities: { canEdit: true, canDelete: true, canRestart: true, canManageBindings: true },
      createdAt: '2026-04-01T00:04:55.428Z',
      updatedAt: '2026-04-01T00:04:55.428Z',
    },
    {
      id: '69d739d34b7193f3f51bbad5',
      name: 'yg-milvus-test-1',
      engine: 'milvus',
      version: 'v1beta1',
      status: 'unknown',
      summary: 'Milvus database',
      endpoint: { host: 'yg-milvus-test-1-milvus.milvus-dev.svc', port: 19530 },
      usage: { storageLabel: '0B / 10GB', usedBytes: 0, quotaBytes: 10737418240, usagePercent: 0 },
      owner: databaseOwners.yonggeun,
      collaborators: [databaseOwners.yonggeun],
      backup: 'none',
      bindingCount: 0,
      health: {
        severity: 'unknown',
        label: 'Unknown',
        message: '런타임 상태를 아직 확인하지 못했습니다.',
      },
      capabilities: { canEdit: true, canDelete: true, canRestart: true, canManageBindings: true },
      createdAt: '2026-04-09T05:32:03.052Z',
      updatedAt: '2026-04-09T05:32:03.052Z',
    },
    {
      id: '69d7027fd4b8dae70bc092df',
      name: 'yg-test-mongo-1',
      engine: 'mongo',
      version: '6.0.5',
      status: 'running',
      summary: 'MongoDB database',
      endpoint: null,
      usage: { storageLabel: '0B / 10GB', usedBytes: 0, quotaBytes: 10737418240, usagePercent: 0 },
      owner: databaseOwners.yonggeun,
      collaborators: [databaseOwners.yonggeun],
      backup: 'none',
      bindingCount: 4,
      health: {
        severity: 'healthy',
        label: 'Healthy',
        message: '최근 상태 점검 기준으로 이상 징후가 없습니다.',
      },
      capabilities: { canEdit: true, canDelete: true, canRestart: true, canManageBindings: true },
      createdAt: '2026-04-09T01:35:59.931Z',
      updatedAt: '2026-04-09T01:35:59.931Z',
    },
  ],
  page: { cursor: null, nextCursor: null, hasNext: false, total: 11 },
};

export const databasesStatsResponse = {
  data: {
    totalDatabases: 11,
    runningCount: 7,
    issueCount: 0,
    bindingCount: 11,
    totalUsedBytes: 0,
    totalQuotaBytes: 47244640256,
  },
};

export const databasesFiltersResponse = {
  data: {
    engines: [
      { value: 'milvus', count: 4 },
      { value: 'mongo', count: 3 },
      { value: 'mysql', count: 1 },
      { value: 'postgres', count: 2 },
      { value: 'redis', count: 1 },
    ],
    statuses: [
      { value: 'unknown', count: 4 },
      { value: 'running', count: 7 },
    ],
    backups: [{ value: 'none', count: 11 }],
  },
};

export const databaseHealthPanelResponse = {
  data: {
    items: [
      {
        id: '6a0d0a5b0f75fd60c72f0782',
        name: 'dify-mv-jean',
        engine: 'milvus',
        status: 'unknown',
        health: {
          severity: 'unknown',
          label: 'Unknown',
          message: '런타임 상태를 아직 확인하지 못했습니다.',
        },
        bindingCount: 0,
        updatedAt: '2026-05-20T01:11:55.974Z',
      },
      {
        id: '6a0aa764b9050af6affa4b71',
        name: 'jean-milvus-test',
        engine: 'milvus',
        status: 'unknown',
        health: {
          severity: 'unknown',
          label: 'Unknown',
          message: '런타임 상태를 아직 확인하지 못했습니다.',
        },
        bindingCount: 2,
        updatedAt: '2026-05-18T05:45:08.262Z',
      },
      {
        id: '6a2776505b34c8f415bf6a9a',
        name: 'metric-turn-off',
        engine: 'milvus',
        status: 'unknown',
        health: {
          severity: 'unknown',
          label: 'Unknown',
          message: '런타임 상태를 아직 확인하지 못했습니다.',
        },
        bindingCount: 0,
        updatedAt: '2026-06-09T02:11:28.189Z',
      },
      {
        id: '69d739d34b7193f3f51bbad5',
        name: 'yg-milvus-test-1',
        engine: 'milvus',
        status: 'unknown',
        health: {
          severity: 'unknown',
          label: 'Unknown',
          message: '런타임 상태를 아직 확인하지 못했습니다.',
        },
        bindingCount: 0,
        updatedAt: '2026-04-09T05:32:03.052Z',
      },
      {
        id: '69e08ac0081948ac0f056d8f',
        name: 'jean-test',
        engine: 'postgres',
        status: 'running',
        health: {
          severity: 'healthy',
          label: 'Healthy',
          message: '최근 상태 점검 기준으로 이상 징후가 없습니다.',
        },
        bindingCount: 2,
        updatedAt: '2026-04-16T07:07:44.591Z',
      },
    ],
    summary: { total: 11, healthy: 7, degraded: 0, unknown: 4 },
  },
};

export const databaseTipsPanelResponse = {
  data: {
    surface: 'databases',
    type: 'tips',
    icon: 'tips_and_updates',
    label: 'Tips',
    title: '데이터 리소스 운영 팁',
    description:
      '리소스 카드에서는 제어 판단에 필요한 정보만 남기고, 운영 참고는 패널에서 짧게 확인합니다.',
    rows: [
      {
        title: 'Running 리소스는 영향 범위를 먼저 봅니다',
        meta: '재기동 전 어떤 프로젝트가 붙어 있는지 Bound Projects 기준으로 확인합니다.',
      },
      {
        title: 'Stopped 리소스는 별도 운영 흐름으로 다룹니다',
        meta: '실험성 또는 비상시 리소스는 카드에서 직접 기동하지 않는 전제를 둡니다.',
      },
      {
        title: '연결 콘솔은 카드 밖 링크로 이동합니다',
        meta: 'DB 허브는 리소스 파악에 집중하고 접속 행위는 Consoles Hub로 넘깁니다.',
      },
    ],
    footerLink: { href: '/workspace/projects', label: '연결 프로젝트 보기' },
  },
};

export const databaseGuideLinksPanelResponse = {
  data: {
    surface: 'databases',
    type: 'guide-links',
    icon: 'menu_book',
    label: 'Guide Links',
    title: '데이터 운영 연계 허브',
    description: '데이터 리소스 상태와 실제 운영 콘솔을 이어서 확인할 수 있습니다.',
    rows: [
      {
        title: 'Consoles Hub',
        meta: '각 DB 리소스에 연결된 운영 콘솔을 엽니다.',
        href: '/workspace/consoles',
      },
      {
        title: 'Permission Hub',
        meta: '운영 DB 접근 방식과 읽기 전용 기준을 확인합니다.',
        href: '/workspace/permissions',
      },
      {
        title: 'Projects Hub',
        meta: '리소스가 연결된 프로젝트 맥락을 확인합니다.',
        href: '/workspace/projects',
      },
    ],
    footerLink: { href: '/launchpad', label: '런치패드로 돌아가기' },
  },
};

export const bucketsResponse = {
  items: [
    {
      id: '6836ba173f2d7c148554e1dc',
      name: 'dify-dify-test11',
      type: 'shared',
      status: 'active',
      capacity: { label: '10Gi', quotaBytes: 0 },
      usage: { label: '0B', usedBytes: 0, quotaBytes: 0, usagePercent: null },
      owner: resourceOwner,
      collaborators: [],
      boundProjectCount: 0,
      openUrl: '/api/bucket/open/dify-dify-test11',
      browserUrl: null,
      createdAt: '2025-05-28T07:24:07.894Z',
      updatedAt: '2025-05-28T07:24:07.894Z',
    },
    {
      id: '6837c853b27754ec7be5f5eb',
      name: 'dify-dify-test2',
      type: 'shared',
      status: 'active',
      capacity: { label: '10Gi', quotaBytes: 0 },
      usage: { label: '0B', usedBytes: 0, quotaBytes: 0, usagePercent: null },
      owner: resourceOwner,
      collaborators: [],
      boundProjectCount: 0,
      openUrl: '/api/bucket/open/dify-dify-test2',
      browserUrl: null,
      createdAt: '2025-05-29T02:37:07.204Z',
      updatedAt: '2025-05-29T02:37:07.204Z',
    },
  ],
  page: { cursor: '', nextCursor: '', hasNext: false, total: 2 },
};

export const bucketsStatsResponse = {
  data: {
    totalBuckets: 109,
    totalUsedBytes: 1184403943,
    totalQuotaBytes: 64516851236864,
    boundProjectCount: 4,
  },
};

export const bucketsFiltersResponse = {
  data: {
    types: [
      { value: 'shared', count: 105 },
      { value: 'private', count: 4 },
    ],
    statuses: [{ value: 'active', count: 109 }],
  },
};

export const bucketTipsPanelResponse = {
  data: {
    surface: 'buckets',
    type: 'tips',
    icon: 'tips_and_updates',
    label: 'Tips',
    title: '버킷 운영 팁',
    description:
      '버킷 허브는 점유율과 노출 상태를 빠르게 판단하는 데 집중하고, 세부 운영 가이드는 패널로 분리합니다.',
    rows: [
      {
        title: '퍼블릭 버킷은 노출 경로를 먼저 확인합니다',
        meta: '도메인 연결 여부와 외부 공개 범위를 함께 읽어야 안전합니다.',
      },
      {
        title: '사용량 증가는 프로젝트 맥락과 같이 봅니다',
        meta: '용량 급증은 연결된 프로젝트나 배포 이벤트와 함께 확인하는 편이 빠릅니다.',
      },
      {
        title: '아카이브 후보는 접근 패턴과 같이 판단합니다',
        meta: '단순 용량만이 아니라 최근 사용 여부를 함께 보고 정리합니다.',
      },
    ],
    footerLink: { href: '/workspace/projects', label: '연결 프로젝트 보기' },
  },
};

export const bucketGuideLinksPanelResponse = {
  data: {
    surface: 'buckets',
    type: 'guide-links',
    icon: 'menu_book',
    label: 'Guide Links',
    title: '스토리지 연계 허브',
    description: '버킷 사용 시 자주 이어지는 관련 허브 링크를 제공합니다.',
    rows: [
      {
        title: 'Projects Hub',
        meta: '버킷이 연결된 프로젝트와 사용 맥락을 확인합니다.',
        href: '/workspace/projects',
      },
      {
        title: 'Domain Hub',
        meta: '퍼블릭 버킷이 연결된 도메인 노출 경로를 확인합니다.',
        href: '/workspace/domains',
      },
      {
        title: 'Permission Hub',
        meta: '공유 정책과 접근 범위를 점검합니다.',
        href: '/workspace/permissions',
      },
    ],
    footerLink: { href: '/launchpad', label: '런치패드로 돌아가기' },
  },
};

export const bucketUsagePanelResponse = {
  data: {
    items: [
      {
        id: '677c8116a5f15a0df929f7a7',
        name: 'test-asd',
        usedBytes: 740651818,
        quotaBytes: 5368709120,
        usagePercent: 14,
      },
      {
        id: '686b4fed3ea8a6bd063a5162',
        name: 'milvus-bucket',
        usedBytes: 443517954,
        quotaBytes: 107374182400,
        usagePercent: 0,
      },
      {
        id: '68cd126d73d7d9e3e7722cc7',
        name: 'sirius-bucket-relsw-yj',
        usedBytes: 114032,
        quotaBytes: 1073741824,
        usagePercent: 0,
      },
      {
        id: '685ca04d85bf07e4ee49ddcb',
        name: 'sirius-project3',
        usedBytes: 69615,
        quotaBytes: 10737418240,
        usagePercent: 0,
      },
      {
        id: '6756742eca8b21da5d2a06e9',
        name: 'ygbucket',
        usedBytes: 31150,
        quotaBytes: 2147483648,
        usagePercent: 0,
      },
    ],
    summary: {
      usedBytes: 1184403943,
      quotaBytes: 64516851236864,
    },
  },
};

export const domainsResponse = {
  items: [
    {
      id: '67b7f67ddefef46bea926e61',
      name: 'hango-test.com',
      description: '',
      kind: 'custom',
      status: 'review',
      certificate: { status: 'pending', expiresAt: null },
      connection: { status: 'none' },
      boundProject: null,
      capabilities: { canEdit: true, canDelete: true, canBind: true },
    },
    {
      id: '67b7f682defef46bea926e6b',
      name: 'hango-test.com',
      description: '',
      kind: 'custom',
      status: 'review',
      certificate: { status: 'pending', expiresAt: null },
      connection: { status: 'none' },
      boundProject: null,
      capabilities: { canEdit: true, canDelete: true, canBind: true },
    },
    {
      id: '67b7f683defef46bea926e6d',
      name: 'hango-test.com',
      description: '',
      kind: 'custom',
      status: 'review',
      certificate: { status: 'pending', expiresAt: null },
      connection: { status: 'none' },
      boundProject: null,
      capabilities: { canEdit: true, canDelete: true, canBind: true },
    },
    {
      id: '67beba12a5a336f85d715785',
      name: 'hango-test2.com',
      description: '',
      kind: 'custom',
      status: 'review',
      certificate: { status: 'pending', expiresAt: null },
      connection: { status: 'none' },
      boundProject: null,
      capabilities: { canEdit: true, canDelete: true, canBind: true },
    },
    {
      id: '686750f502ff307210f64334',
      name: 'as.hedej.lge.com',
      description: '',
      kind: 'custom',
      status: 'review',
      certificate: { status: 'pending', expiresAt: null },
      connection: { status: 'none' },
      boundProject: null,
      capabilities: { canEdit: true, canDelete: true, canBind: true },
    },
    {
      id: '68413d15d01905535cf9c31a',
      name: 'alpha.workspace.hedej.lge.com',
      description: '',
      kind: 'custom',
      status: 'review',
      certificate: { status: 'pending', expiresAt: null },
      connection: { status: 'none' },
      boundProject: null,
      capabilities: { canEdit: true, canDelete: true, canBind: true },
    },
    {
      id: '68413d15d01905535cf9c31b',
      name: 'beta-review.workspace.hedej.lge.com',
      description: '',
      kind: 'custom',
      status: 'review',
      certificate: { status: 'pending', expiresAt: null },
      connection: { status: 'none' },
      boundProject: null,
      capabilities: { canEdit: true, canDelete: true, canBind: true },
    },
    {
      id: '68413d15d01905535cf9c31c',
      name: 'gamma.workspace.hedej.lge.com',
      description: '',
      kind: 'custom',
      status: 'review',
      certificate: { status: 'pending', expiresAt: null },
      connection: { status: 'none' },
      boundProject: null,
      capabilities: { canEdit: true, canDelete: true, canBind: true },
    },
  ],
  page: { cursor: null, nextCursor: 'eyJvZmZzZXQiOjZ9', hasNext: true, total: 30 },
};

export const domainsStatsResponse = {
  data: {
    connected: 0,
    pending: 0,
    review: 30,
    total: 30,
  },
};

export const domainsFiltersResponse = {
  data: {
    certificateStatuses: ['none', 'pending', 'issued', 'expired'],
    connectionStatuses: ['none', 'ready', 'connected'],
    statuses: ['pending', 'review', 'connected'],
  },
};

export const domainTipsPanelResponse = {
  data: {
    surface: 'domains',
    type: 'tips',
    icon: 'tips_and_updates',
    label: 'Tips',
    title: 'DNS 운영 팁',
    description:
      '도메인 카드는 연결 판단에 필요한 정보만 남기고, 절차성 안내는 보조 패널로 분리합니다.',
    rows: [
      {
        title: '도메인은 단일 프로젝트 바인딩을 기본으로 봅니다',
        meta: '같은 DNS 리소스에 여러 프로젝트를 섞지 않고 연결 관계를 명확하게 유지합니다.',
      },
      {
        title: '인증서와 연결 상태를 함께 봅니다',
        meta: '오픈 전 인증서 발급 상태와 ingress 또는 CDN 연결 상태를 동시에 확인합니다.',
      },
      {
        title: '승인과 예외 절차는 카드 밖에서 다룹니다',
        meta: '운영 절차는 가이드 링크로 분리해 카드가 복잡해지지 않게 유지합니다.',
      },
    ],
    footerLink: { href: '/workspace/projects', label: '연결 프로젝트 보기' },
  },
};

export const domainGuideLinksPanelResponse = {
  data: {
    surface: 'domains',
    type: 'guide-links',
    icon: 'menu_book',
    label: 'Guide Links',
    title: '도메인 연계 허브',
    description: '도메인 연결과 승인 흐름을 이어서 볼 수 있는 화면을 제공합니다.',
    rows: [
      {
        title: 'Projects Hub',
        meta: '각 DNS 리소스가 어떤 프로젝트에 바인딩되는지 확인합니다.',
        href: '/workspace/projects',
      },
      {
        title: 'Permission Hub',
        meta: '인증서 갱신 승인과 예외 처리 흐름을 확인합니다.',
        href: '/workspace/permissions',
      },
      {
        title: 'Bucket Hub',
        meta: '퍼블릭 버킷과 연결되는 노출 흐름을 함께 봅니다.',
        href: '/workspace/buckets',
      },
    ],
    footerLink: { href: '/launchpad', label: '런치패드로 돌아가기' },
  },
};

export const domainCertificatePanelResponse = {
  data: {
    total: 30,
    items: [
      { status: 'none', count: 0 },
      { status: 'pending', count: 30 },
      { status: 'issued', count: 0 },
      { status: 'expired', count: 0 },
    ],
  },
};

export const domainCertificateByDomainId = {
  '67b7f67ddefef46bea926e61': {
    data: {
      id: '67b7f67ddefef46bea926e61',
      name: 'hango-test.com',
      status: 'pending',
      expiresAt: null,
    },
  },
};

export const domainConnectionPanelResponse = {
  data: {
    total: 30,
    items: [
      { status: 'none', count: 30 },
      { status: 'ready', count: 0 },
      { status: 'connected', count: 0 },
    ],
  },
};

export const domainConnectionByDomainId = {
  '67b7f67ddefef46bea926e61': {
    data: {
      id: '67b7f67ddefef46bea926e61',
      name: 'hango-test.com',
      status: 'none',
      boundProject: null,
    },
  },
};

export const permissionRealmsResponse = {
  items: [
    {
      id: '68a3e31f1fffdac41b31e187',
      name: 'asaad',
      description: '',
      kind: 'scoped',
      status: 'active',
      boundProjects: [
        { kind: 'project', id: '6a0130c4d523098f20e14d05', label: 'test-react', role: null },
      ],
      roles: [
        { name: 'admin', memberCount: 0 },
        { name: 'tester', memberCount: 2 },
        { name: 'user', memberCount: 15 },
      ],
      capabilities: {
        canRequest: true,
        canApprove: true,
        canEdit: true,
        canDelete: true,
        canBind: true,
      },
      updatedAt: '2026-03-06T08:03:56.055Z',
      memberCount: 15,
      projectCount: 1,
    },
    {
      id: '6785eb9b71869c5016f6847b',
      name: 'asdq',
      description: '',
      kind: 'scoped',
      status: 'active',
      boundProjects: [
        { kind: 'project', id: '69d74d1e49d52f50fafbd342', label: 'asdq', role: null },
      ],
      roles: [{ name: 'admin', memberCount: 2 }],
      capabilities: {
        canRequest: true,
        canApprove: true,
        canEdit: true,
        canDelete: true,
        canBind: true,
      },
      updatedAt: '2025-06-23T04:39:41.681Z',
      memberCount: 2,
      projectCount: 1,
    },
    {
      id: '67d7922732a08d7abb8898ff',
      name: 'bgfg',
      description: '',
      kind: 'scoped',
      status: 'active',
      boundProjects: [],
      roles: [{ name: 'admin', memberCount: 0 }],
      capabilities: {
        canRequest: true,
        canApprove: true,
        canEdit: true,
        canDelete: true,
        canBind: true,
      },
      updatedAt: '2025-03-17T03:08:23.056Z',
      memberCount: 0,
      projectCount: 0,
    },
    {
      id: '691bf9889331e577c7400aab',
      name: 'heans',
      description: '',
      kind: 'scoped',
      status: 'active',
      boundProjects: [],
      roles: [{ name: 'admin', memberCount: 1 }],
      capabilities: {
        canRequest: true,
        canApprove: true,
        canEdit: true,
        canDelete: true,
        canBind: true,
      },
      updatedAt: '2025-11-18T04:43:52.464Z',
      memberCount: 1,
      projectCount: 0,
    },
    {
      id: '67f4c4b7d5be39c414c0291f',
      name: 'jean',
      description: '',
      kind: 'scoped',
      status: 'active',
      boundProjects: [
        {
          kind: 'project',
          id: '6a28df9c6197200caeb4f62e',
          label: 'jean-streamlit',
          role: 'owner',
        },
      ],
      roles: [
        { name: 'admin', memberCount: 2 },
        { name: 'guest', memberCount: 1 },
      ],
      capabilities: {
        canRequest: true,
        canApprove: true,
        canEdit: true,
        canDelete: true,
        canBind: true,
      },
      updatedAt: '2025-09-11T23:56:53.315Z',
      memberCount: 3,
      projectCount: 1,
    },
    {
      id: '67ef7770b020e49c76dba748',
      name: 'nhiiiiii',
      description: '',
      kind: 'scoped',
      status: 'active',
      boundProjects: [],
      roles: [
        { name: 'admin', memberCount: 0 },
        { name: 'user', memberCount: 0 },
      ],
      capabilities: {
        canRequest: true,
        canApprove: true,
        canEdit: true,
        canDelete: true,
        canBind: true,
      },
      updatedAt: '2025-09-10T02:38:00.361Z',
      memberCount: 0,
      projectCount: 0,
    },
  ],
  page: { cursor: null, nextCursor: 'eyJvZmZzZXQiOjZ9', hasNext: true, total: 24 },
};

export const permissionRealmStatsResponse = {
  data: {
    totalRealms: 24,
    totalMembers: 83,
    boundProjectCount: 14,
    pendingRequests: 0,
    manageableRealms: 24,
  },
};

export const permissionRealmFiltersResponse = {
  data: {
    kinds: [
      { value: 'platform', count: 0 },
      { value: 'project', count: 1 },
      { value: 'resource', count: 0 },
      { value: 'scoped', count: 23 },
    ],
    statuses: [
      { value: 'active', count: 24 },
      { value: 'review', count: 0 },
    ],
  },
};

export const permissionTipsPanelResponse = {
  data: {
    surface: 'permissions',
    type: 'tips',
    icon: 'tips_and_updates',
    label: 'Tips',
    title: '권한 운영 팁',
    description: '권한 허브는 승인 상태와 연결 리소스를 빠르게 파악하는 역할에 집중합니다.',
    rows: [
      {
        title: '승인은 리소스 영향 범위와 같이 봅니다',
        meta: '요청 단위보다 어떤 프로젝트와 리소스에 연결되는지 먼저 확인하는 편이 안전합니다.',
      },
      {
        title: '예외 권한은 만료와 사유를 함께 관리합니다',
        meta: '영구 예외가 되지 않도록 기간과 배경을 같이 남겨야 합니다.',
      },
      {
        title: '실행 주체보다 소유 주체를 먼저 읽힙니다',
        meta: '누가 요청했고 누가 승인하는지 카드에서 명확해야 합니다.',
      },
    ],
    footerLink: { href: '/workspace/projects', label: '연결 프로젝트 보기' },
  },
};

export const permissionGuideLinksPanelResponse = {
  data: {
    surface: 'permissions',
    type: 'guide-links',
    icon: 'menu_book',
    label: 'Guide Links',
    title: '권한 연계 허브',
    description: '승인 흐름과 연결된 운영 허브를 빠르게 오갈 수 있게 구성합니다.',
    rows: [
      {
        title: 'Domain Hub',
        meta: '도메인 인증서 승인과 예외 흐름을 확인합니다.',
        href: '/workspace/domains',
      },
      {
        title: 'Database Hub',
        meta: 'DB 접근 정책과 연결 리소스를 확인합니다.',
        href: '/workspace/databases',
      },
      {
        title: 'Consoles Hub',
        meta: '운영 콘솔 접근 주체와 실제 사용 흐름을 확인합니다.',
        href: '/workspace/consoles',
      },
    ],
    footerLink: { href: '/launchpad', label: '런치패드로 돌아가기' },
  },
};

export const agentsResponse = {
  items: [
    {
      id: '6a0d0a5b0f75fd60c72f077c',
      slug: 'jean',
      name: 'jean',
      summary: '',
      type: 'workflow',
      typeLabel: 'Workflow',
      status: 'review',
      statusLabel: 'Review',
      approvalMode: null,
      authMode: 'workspace',
      toolCount: 0,
      toolInventoryRefs: [],
      triggerChannel: null,
      runtime: {
        provider: 'dify',
        ide: 'dify',
        status: 'review',
        statusLabel: 'Review',
        url: 'https://jean.dify.hedej.lge.com',
      },
      model: { primary: 'Dify', items: [] },
      workflow: { stepCount: 0, steps: [] },
      approval: { mode: null, required: false, checkpoints: [] },
      auth: { mode: 'workspace', scopes: [] },
      icon: null,
      openUrl: 'https://jean.dify.hedej.lge.com',
      owner: {
        id: '351f0de9-5870-4b4c-bb60-20d57f175679',
        name: '박재온/책임연구원/MS DEJ Task',
      },
      authors: [
        {
          id: '351f0de9-5870-4b4c-bb60-20d57f175679',
          name: '박재온/책임연구원/MS DEJ Task',
        },
      ],
      createdAt: '2026-05-20T01:11:55.384Z',
      updatedAt: '2026-05-20T01:11:55.384Z',
      capabilities: { canOpen: true },
    },
    {
      id: '6989491dbc53b752db166818',
      slug: 'testdifyinagent',
      name: 'testdifyinagent',
      summary: '',
      type: 'workflow',
      typeLabel: 'Workflow',
      status: 'review',
      statusLabel: 'Review',
      approvalMode: null,
      authMode: 'workspace',
      toolCount: 0,
      toolInventoryRefs: [],
      triggerChannel: null,
      runtime: {
        provider: 'dify',
        ide: 'dify',
        status: 'review',
        statusLabel: 'Review',
        url: 'https://testdifyinagent.dify.hedej.lge.com',
      },
      model: { primary: 'Dify', items: [] },
      workflow: { stepCount: 0, steps: [] },
      approval: { mode: null, required: false, checkpoints: [] },
      auth: { mode: 'workspace', scopes: [] },
      icon: null,
      openUrl: 'https://testdifyinagent.dify.hedej.lge.com',
      owner: {
        id: '1640a460-e7cb-481f-bea2-bbdd38c99dab',
        name: 'LeThanhNguyen/(협력사) 선임/MS DEJ Task',
      },
      authors: [
        {
          id: '1640a460-e7cb-481f-bea2-bbdd38c99dab',
          name: 'LeThanhNguyen/(협력사) 선임/MS DEJ Task',
        },
      ],
      createdAt: '2026-02-09T02:40:29.053Z',
      updatedAt: '2026-02-09T08:42:08.864Z',
      capabilities: { canOpen: true },
    },
  ],
  page: { cursor: null, nextCursor: null, hasNext: false, total: 2 },
};

export const agentsStatsResponse = {
  data: {
    cards: [
      { id: 'agents', label: '등록 Agent', value: 2, note: 'Running 0 · Review 2' },
      { id: 'workflow', label: 'Workflow', value: 2, note: 'automation first' },
      { id: 'reviewer', label: 'Reviewer', value: 0, note: 'approval aware' },
      { id: 'linkedTools', label: 'Linked Tools', value: 0, note: 'tool inventory refs' },
      { id: 'approval', label: 'Approval Enabled', value: 0, note: 'checkpointed flows' },
    ],
  },
};

export const agentsFiltersResponse = {
  data: {
    types: [
      { id: 'all', label: '전체', count: 2 },
      { id: 'workflow', label: 'Workflow', count: 2 },
      { id: 'reviewer', label: 'Reviewer', count: 0 },
      { id: 'ops', label: 'Ops', count: 0 },
    ],
    statuses: [
      { id: 'all', label: '전체', count: 2 },
      { id: 'running', label: 'Running', count: 0 },
      { id: 'review', label: 'Review', count: 2 },
    ],
  },
};

export const agentRuntimeStatusPanelResponse = {
  data: {
    id: 'runtime-status',
    label: 'Runtime Status',
    title: '현재 agent runtime 상태',
    description: '실행 중인 agent와 검토 중인 agent를 한 번에 확인합니다.',
    rows: [
      {
        id: '6a0d0a5b0f75fd60c72f077c',
        title: 'jean',
        meta: 'Workflow · dify',
        pill: { label: 'Review', tone: 'review' },
      },
      {
        id: '6989491dbc53b752db166818',
        title: 'testdifyinagent',
        meta: 'Workflow · dify',
        pill: { label: 'Review', tone: 'review' },
      },
    ],
  },
};

export const agentGuideLinksPanelResponse = {
  data: {
    surface: 'agents',
    type: 'guide-links',
    icon: 'menu_book',
    label: 'Guide Links',
    title: 'Agent 연계 허브',
    description:
      '실행 주체 화면에서 credential 정책과 연결 허브로 자연스럽게 이동할 수 있게 구성합니다.',
    rows: [
      {
        title: 'Keycenter',
        meta: 'shared gateway key와 paid tier 정책을 확인합니다.',
        href: '/workspace/keycenter',
      },
      {
        title: 'Projects Hub',
        meta: 'agent가 연결된 프로젝트 맥락을 확인합니다.',
        href: '/workspace/projects',
      },
      {
        title: 'Tool Inventory',
        meta: '외부 도구나 MCP 연결 구성을 확인합니다.',
        href: '/workspace/tool-inventory',
      },
    ],
    footerLink: { href: '/launchpad', label: '런치패드로 돌아가기' },
  },
};

export const agentTipsPanelResponse = {
  data: {
    surface: 'agents',
    type: 'tips',
    icon: 'tips_and_updates',
    label: 'Tips',
    title: 'Agent 운영 팁',
    description:
      'Agent Hub는 챗봇 노출면보다 자동화 실행 주체를 다루므로 workflow와 key 정책이 먼저 읽혀야 합니다.',
    rows: [
      {
        title: 'Agent는 실행 흐름이 먼저 보이도록 둡니다',
        meta: 'entry channel보다 단계 수와 approval checkpoint를 우선 노출합니다.',
      },
      {
        title: 'Key는 Keycenter에서 연결 상태만 확인합니다',
        meta: 'agent 화면에서는 secret이 아니라 어떤 key pool을 참조하는지만 보여줍니다.',
      },
      {
        title: '프로젝트 바인딩보다 운영 기준을 먼저 보여줍니다',
        meta: 'workflow 구조와 key tier가 비교 포인트가 되도록 유지합니다.',
      },
    ],
    footerLink: { href: '/workspace/keycenter', label: 'Keycenter 보기' },
  },
};

export const agentModelsPanelResponse = {
  data: {
    id: 'models',
    label: 'Model',
    title: 'agent별 모델 구성',
    description:
      'primary model과 runtime provider를 함께 보여줘 운영자가 연결 상태를 읽기 쉽게 합니다.',
    rows: [
      {
        id: '6a0d0a5b0f75fd60c72f077c',
        title: 'jean',
        meta: 'Dify',
        description: '',
      },
      {
        id: '6989491dbc53b752db166818',
        title: 'testdifyinagent',
        meta: 'Dify',
        description: '',
      },
    ],
  },
};

const consoleStoppedHealth = {
  severity: 'warning',
  label: 'Stopped',
  message: '현재 console 이 중지 상태입니다.',
};

const consoleCapabilities = {
  canOpen: true,
  canStart: true,
  canStop: true,
  canDelete: true,
  canManageBindings: true,
};

export const consolesResponse = {
  items: [
    {
      id: '6a0ab05db9050af6affa4df3',
      slug: 'jean-test',
      name: 'jean-test',
      summary: 'Attu console',
      type: 'attu',
      typeLabel: 'Attu',
      status: 'stopped',
      statusLabel: 'Stopped',
      icon: null,
      bindingCount: 1,
      bindings: [{ id: '6a0aa764b9050af6affa4b71', name: 'jean-milvus-test', engine: 'milvus' }],
      openUrl: '/attu/jean-test/',
      health: consoleStoppedHealth,
      capabilities: consoleCapabilities,
      owner: databaseOwners.jaeon,
      collaborators: [databaseOwners.jaeon],
      createdAt: '2026-05-18T06:23:25.312Z',
      updatedAt: '2026-05-18T06:23:43.995Z',
    },
    {
      id: '69fadd7de69dcb16cc5fa252',
      slug: 'sirius-uv',
      name: 'sirius-uv',
      summary: 'phpMyAdmin console',
      type: 'phpmyadmin',
      typeLabel: 'phpMyAdmin',
      status: 'stopped',
      statusLabel: 'Stopped',
      icon: null,
      bindingCount: 1,
      bindings: [{ id: '69fadcdde69dcb16cc5fa1e0', name: 'sirius-uv', engine: 'mysql' }],
      openUrl: '/phpmyadmin/sirius-uv/',
      health: consoleStoppedHealth,
      capabilities: consoleCapabilities,
      owner: databaseOwners.seunghyun,
      collaborators: [databaseOwners.seunghyun],
      createdAt: '2026-05-06T06:19:41.137Z',
      updatedAt: '2026-05-06T06:19:54.121Z',
    },
    {
      id: '69e08b18081948ac0f056daf',
      slug: 'jean-tool-test',
      name: 'jean-tool-test',
      summary: 'pgAdmin console',
      type: 'pgadmin',
      typeLabel: 'pgAdmin',
      status: 'stopped',
      statusLabel: 'Stopped',
      icon: null,
      bindingCount: 1,
      bindings: [{ id: '69e08ac0081948ac0f056d8f', name: 'jean-test', engine: 'postgres' }],
      openUrl: '/pgadmin/jean-tool-test/',
      health: consoleStoppedHealth,
      capabilities: consoleCapabilities,
      owner: databaseOwners.jaeon,
      collaborators: [databaseOwners.jaeon],
      createdAt: '2026-04-16T07:09:12.258Z',
      updatedAt: '2026-04-16T07:09:46.965Z',
    },
    {
      id: '69d6e0c733ca0a425ed6c569',
      slug: 'yg-sadqweqeqwe',
      name: 'yg-sadqweqeqwe',
      summary: 'test',
      type: 'mongogui',
      typeLabel: 'Mongo GUI',
      status: 'stopped',
      statusLabel: 'Stopped',
      icon: null,
      bindingCount: 1,
      bindings: [{ id: '69d7027fd4b8dae70bc092df', name: 'yg-test-mongo-1', engine: 'mongo' }],
      openUrl: '/mongogui/yg-sadqweqeqwe/',
      health: consoleStoppedHealth,
      capabilities: consoleCapabilities,
      owner: databaseOwners.yonggeun,
      collaborators: [databaseOwners.yonggeun],
      createdAt: '2026-04-08T23:12:07.988Z',
      updatedAt: '2026-04-09T01:36:41.393Z',
    },
    {
      id: '69d60d567216cd38d4f6e627',
      slug: 'dsadas',
      name: 'dsadas',
      summary: 'dsad',
      type: 'mongogui',
      typeLabel: 'Mongo GUI',
      status: 'stopped',
      statusLabel: 'Stopped',
      icon: null,
      bindingCount: 0,
      bindings: [],
      openUrl: '/mongogui/dsadas/',
      health: consoleStoppedHealth,
      capabilities: consoleCapabilities,
      owner: resourceOwner,
      collaborators: [resourceOwner],
      createdAt: '2026-04-08T08:09:58.195Z',
      updatedAt: '2026-04-08T08:09:58.195Z',
    },
    {
      id: '69d606ed45ad1f36a0e1768b',
      slug: 'test-create',
      name: 'test-create',
      summary: 'Mongo GUI console',
      type: 'mongogui',
      typeLabel: 'Mongo GUI',
      status: 'stopped',
      statusLabel: 'Stopped',
      icon: null,
      bindingCount: 0,
      bindings: [],
      openUrl: '/mongogui/test-create/',
      health: consoleStoppedHealth,
      capabilities: consoleCapabilities,
      owner: resourceOwner,
      collaborators: [resourceOwner],
      createdAt: '2026-04-08T07:42:37.395Z',
      updatedAt: '2026-04-08T07:42:37.395Z',
    },
    {
      id: '69d604a245ad1f36a0e1746e',
      slug: 'fdsfds',
      name: 'fdsfds',
      summary: 'fsdf',
      type: 'mongogui',
      typeLabel: 'Mongo GUI',
      status: 'stopped',
      statusLabel: 'Stopped',
      icon: null,
      bindingCount: 0,
      bindings: [],
      openUrl: '/mongogui/fdsfds/',
      health: consoleStoppedHealth,
      capabilities: consoleCapabilities,
      owner: resourceOwner,
      collaborators: [resourceOwner],
      createdAt: '2026-04-08T07:32:50.299Z',
      updatedAt: '2026-04-08T07:32:50.300Z',
    },
    {
      id: '69cc65cae339d2b7ce754aa3',
      slug: 'yg-redis-conn-test',
      name: 'yg-redis-conn-test',
      summary: 'Redis Insight console',
      type: 'redisinsight',
      typeLabel: 'Redis Insight',
      status: 'stopped',
      statusLabel: 'Stopped',
      icon: null,
      bindingCount: 1,
      bindings: [{ id: '69cc6127507bfc1708ba753f', name: 'yg-conn-redis', engine: 'redis' }],
      openUrl: '/redisinsight/yg-redis-conn-test/',
      health: consoleStoppedHealth,
      capabilities: consoleCapabilities,
      owner: databaseOwners.yonggeun,
      collaborators: [databaseOwners.yonggeun],
      createdAt: '2026-04-01T00:24:42.294Z',
      updatedAt: '2026-04-01T00:24:51.492Z',
    },
  ],
  page: { cursor: null, nextCursor: null, hasNext: false, total: 8 },
};

export const consolesStatsResponse = {
  data: {
    totalConsoles: 8,
    runningCount: 0,
    stoppedCount: 8,
    issueCount: 0,
    bindingCount: 5,
  },
};

export const consolesFiltersResponse = {
  data: {
    types: [
      { value: 'attu', label: 'Attu', count: 1 },
      { value: 'phpmyadmin', label: 'phpMyAdmin', count: 1 },
      { value: 'pgadmin', label: 'pgAdmin', count: 1 },
      { value: 'mongogui', label: 'Mongo GUI', count: 4 },
      { value: 'redisinsight', label: 'Redis Insight', count: 1 },
    ],
    statuses: [{ value: 'stopped', label: 'Stopped', count: 8 }],
  },
};

export const consoleHealthPanelResponse = {
  data: {
    id: 'running-health',
    label: 'Running Health',
    title: '현재 console runtime 상태',
    rows: [
      {
        id: '69d60d567216cd38d4f6e627',
        title: 'dsadas',
        meta: 'Mongo GUI · 0 bound DB',
        pill: { label: 'Stopped', tone: 'warning' },
      },
      {
        id: '69d604a245ad1f36a0e1746e',
        title: 'fdsfds',
        meta: 'Mongo GUI · 0 bound DB',
        pill: { label: 'Stopped', tone: 'warning' },
      },
      {
        id: '6a0ab05db9050af6affa4df3',
        title: 'jean-test',
        meta: 'Attu · 1 bound DB',
        pill: { label: 'Stopped', tone: 'warning' },
      },
      {
        id: '69e08b18081948ac0f056daf',
        title: 'jean-tool-test',
        meta: 'pgAdmin · 1 bound DB',
        pill: { label: 'Stopped', tone: 'warning' },
      },
      {
        id: '69fadd7de69dcb16cc5fa252',
        title: 'sirius-uv',
        meta: 'phpMyAdmin · 1 bound DB',
        pill: { label: 'Stopped', tone: 'warning' },
      },
    ],
    summary: { total: 8, running: 0, stopped: 8, error: 0 },
  },
};

export const consoleTipsPanelResponse = {
  data: {
    surface: 'consoles',
    type: 'tips',
    icon: 'tips_and_updates',
    label: 'Tips',
    title: '콘솔 운영 팁',
    description:
      '콘솔 카드는 실행과 연결 판단에 필요한 정보만 남기고, 운영 참고는 하단 패널에서 짧게 확인합니다.',
    rows: [
      {
        title: 'Running 콘솔만 상태 판단을 우선합니다',
        meta: '실행 중인 콘솔은 Bound DB와 현재 상태만 보고 빠르게 제어할 수 있어야 합니다.',
      },
      {
        title: 'Open 전에 연결 DB를 먼저 확인합니다',
        meta: '운영 콘솔을 열기 전에 어떤 데이터베이스에 붙는지 카드 안에서 바로 읽히도록 유지합니다.',
      },
      {
        title: '이상 감지는 콘솔 카드보다 이벤트 흐름에서 확인합니다',
        meta: '콘솔 허브는 진입과 제어에 집중하고, 세부 장애 원인은 별도 운영 흐름으로 분리합니다.',
      },
    ],
    footerLink: { href: '/workspace/databases', label: '연결 DB 보기' },
  },
};

export const consoleGuideLinksPanelResponse = {
  data: {
    surface: 'consoles',
    type: 'guide-links',
    icon: 'menu_book',
    label: 'Guide Links',
    title: '관련 허브 바로가기',
    description: '콘솔 사용 중 자주 이어지는 허브와 운영 정책 문서를 함께 제공합니다.',
    rows: [
      {
        title: 'Database Hub',
        meta: '연결된 데이터 리소스 상태를 다시 확인합니다.',
        href: '/workspace/databases',
      },
      {
        title: 'Permission Hub',
        meta: '운영 접근 권한과 read-only 정책을 확인합니다.',
        href: '/workspace/permissions',
      },
      {
        title: 'Projects Hub',
        meta: '어떤 프로젝트에 영향이 있는지 프로젝트 단위로 확인합니다.',
        href: '/workspace/projects',
      },
    ],
    footerLink: { href: '/launchpad', label: '런치패드로 돌아가기' },
  },
};

export const launchpadResourcesResponse = {
  data: {
    summary: {
      totalResources: 158,
      attentionCount: 30,
      totalBindings: 18,
    },
    databases: {
      summary: {
        totalDatabases: 11,
        runningCount: 7,
        issueCount: 0,
        bindingCount: 10,
        totalUsedBytes: 0,
        totalQuotaBytes: 47244640256,
      },
      items: databasesResponse.items,
    },
    buckets: {
      summary: {
        totalBuckets: 109,
        totalUsedBytes: 1184403943,
        totalQuotaBytes: 64516851236864,
        boundProjectCount: 3,
      },
      items: bucketsResponse.items,
    },
    domains: {
      summary: {
        total: 30,
        pending: 0,
        review: 30,
        connected: 0,
      },
      items: domainsResponse.items.slice(0, 3),
    },
    consoles: {
      summary: {
        totalConsoles: 8,
        runningCount: 0,
        stoppedCount: 8,
        issueCount: 0,
        bindingCount: 5,
      },
      items: consolesResponse.items,
    },
  },
};
