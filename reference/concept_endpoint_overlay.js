(() => {
  const SHARED = {
    me: [
      "GET /api/v2/me",
      "GET /api/v2/me/notifications (paged)",
      "PATCH /api/v2/me/preferences"
    ],
    search: [
      "GET /api/v2/search?q=&types=projects,domains,...",
      "GET /api/v2/tags (paged)",
      "GET /api/v2/hashtags (paged)"
    ],
    jobs: [
      "GET /api/v2/jobs/:jobId",
      "GET /api/v2/jobs?owner=me (paged)",
      "POST /api/v2/jobs/:jobId/cancel"
    ],
    realtime: [
      "GET /api/v2/realtime",
      "WS /socket.io namespace /hedej"
    ]
  };

  const pages = {
    "portal_launchpad.html": {
      title: "Launchpad",
      note: "최신 Launchpad FE는 overview / my-work / resources 3종 집계 endpoint를 기본 계약으로 사용합니다.",
      groups: [
        {
          label: "Launchpad Overview",
          endpoints: ["GET /api/v2/launchpad/overview"]
        },
        {
          label: "Launchpad My Work",
          endpoints: ["GET /api/v2/launchpad/my-work"]
        },
        {
          label: "Launchpad Resources",
          endpoints: ["GET /api/v2/launchpad/resources"]
        }
      ]
    },
    "workspace_projects_hub.html": {
      title: "Projects Hub",
      groups: [
        {
          label: "Projects",
          endpoints: [
            "GET /api/v2/projects (paged)",
            "GET /api/v2/projects/filters",
            "GET /api/v2/projects/runtimes",
            "GET /api/v2/hashtags (paged)"
          ]
        },
        {
          label: "Project Cards",
          endpoints: [
            "GET /api/v2/projects/:id/ides?scope=mine|all",
            "GET /api/v2/projects/:id/collaborators",
            "POST /api/v2/projects/:id/favorites",
            "DELETE /api/v2/projects/:id/favorites"
          ]
        },
        {
          label: "Realtime",
          endpoints: [
            "GET /api/v2/realtime",
            "WS /api/v2/realtime room project:<id>"
          ]
        },
        { label: "Search", endpoints: SHARED.search }
      ]
    },
    "workspace_project_detail.html": {
      title: "Project Detail",
      groups: [
        {
          label: "Hero and Meta",
          endpoints: [
            "GET /api/v2/projects/:id",
            "PATCH /api/v2/projects/:id",
            "GET /api/v2/projects/:id/hero-stats",
            "GET /api/v2/projects/:id/tags",
            "PUT /api/v2/projects/:id/tags",
            "POST /api/v2/projects/:id/collaborators",
            "DELETE /api/v2/projects/:id/collaborators/:userId"
          ]
        },
        {
          label: "Connected Resources",
          endpoints: [
            "GET /api/v2/projects/:id/resources",
            "POST /api/v2/projects/:id/resources/db",
            "POST /api/v2/projects/:id/resources/bucket",
            "POST /api/v2/projects/:id/resources/gitlab",
            "POST /api/v2/projects/:id/resources/permission",
            "POST /api/v2/projects/:id/resources/llm",
            "POST /api/v2/projects/:id/resources/analytics",
            "DELETE /api/v2/projects/:id/resources/:resourceId"
          ]
        },
        {
          label: "Configuration",
          endpoints: [
            "GET /api/v2/projects/:id/domains",
            "PATCH /api/v2/projects/:id/domain",
            "GET /api/v2/projects/:id/variables",
            "PATCH /api/v2/projects/:id/variables",
            "PUT /api/v2/projects/:id/variables",
            "POST /api/v2/projects/:id/variables",
            "DELETE /api/v2/projects/:id/variables/:key",
            "POST /api/v2/projects/:id/variables/:key/reveal",
            "GET /api/v2/projects/:id/ports",
            "POST /api/v2/projects/:id/ports",
            "DELETE /api/v2/projects/:id/ports/:port"
          ]
        },
        {
          label: "Danger Zone",
          endpoints: [
            "DELETE /api/v2/projects/:id",
            "POST /api/v2/projects/:id/archive",
            "POST /api/v2/projects/:id/restore"
          ]
        },
        {
          label: "Observability",
          endpoints: [
            "GET /api/v2/projects/:id/analytics/user/kpi",
            "GET /api/v2/projects/:id/analytics/user/visits",
            "GET /api/v2/projects/:id/analytics/user/top-pages",
            "GET /api/v2/projects/:id/analytics/service/cpu",
            "GET /api/v2/projects/:id/analytics/service/memory",
            "GET /api/v2/projects/:id/analytics/service/summary",
            "GET /api/v2/projects/:id/logs (paged)",
            "WS /api/v2/projects/:id/logs/stream",
            "POST /api/v2/projects/:id/terminal/sessions",
            "WS /api/v2/projects/:id/terminal/sessions/:sessionId",
            "DELETE /api/v2/projects/:id/terminal/sessions/:sessionId"
          ]
        },
        {
          label: "Governance",
          endpoints: [
            "GET /api/v2/projects/:id/harvest (paged)",
            "GET /api/v2/projects/:id/harvest/summary",
            "GET /api/v2/projects/:id/harvest/:docId",
            "GET /api/v2/projects/:id/security/issues (paged)",
            "GET /api/v2/projects/:id/security/summary",
            "GET /api/v2/projects/:id/security/issues/:issueId"
          ]
        },
        {
          label: "Timeline and Publish",
          endpoints: [
            "GET /api/v2/projects/:id/timeline (paged)",
            "GET /api/v2/projects/:id/publish/readiness",
            "POST /api/v2/projects/:id/publish/release",
            "POST /api/v2/projects/:id/publish/rollback",
            "GET /api/v2/projects/:id/publish/history (paged)"
          ]
        },
        {
          label: "IDE and Run",
          endpoints: [
            "POST /api/v2/projects/:id/ide/open",
            "POST /api/v2/projects/:id/run"
          ]
        },
        {
          label: "Jobs and Realtime",
          endpoints: SHARED.jobs.concat(SHARED.realtime)
        }
      ]
    },
    "workspace_domain_hub.html": {
      title: "Domain Hub",
      groups: [
        {
          label: "Domains",
          endpoints: [
            "GET /api/v2/domains (paged)",
            "GET /api/v2/domains/filters",
            "GET /api/v2/domains/stats",
            "GET /api/v2/domains/:id",
            "POST /api/v2/domains",
            "PATCH /api/v2/domains/:id",
            "DELETE /api/v2/domains/:id",
            "POST /api/v2/domains/:id/bind",
            "DELETE /api/v2/domains/:id/bind",
            "GET /api/v2/domains/:id/certificate",
            "GET /api/v2/domains/:id/connection",
            "GET /api/v2/domains/panels/certificates",
            "GET /api/v2/domains/panels/connections"
          ]
        },
        {
          label: "Shared Panels",
          endpoints: [
            "GET /api/v2/panels/tips?surface=domains",
            "GET /api/v2/panels/guide-links?surface=domains"
          ]
        },
        { label: "Search", endpoints: SHARED.search }
      ]
    },
    "workspace_s3_hub.html": {
      title: "Bucket Hub",
      groups: [
        {
          label: "Buckets",
          endpoints: [
            "GET /api/v2/buckets (paged)",
            "GET /api/v2/buckets/filters",
            "GET /api/v2/buckets/stats",
            "GET /api/v2/buckets/:id",
            "POST /api/v2/buckets",
            "PATCH /api/v2/buckets/:id",
            "DELETE /api/v2/buckets/:id",
            "POST /api/v2/buckets/:id/bind",
            "DELETE /api/v2/buckets/:id/bind/:projectId",
            "POST /api/v2/buckets/:id/open",
            "GET /api/v2/buckets/panels/usage"
          ]
        },
        {
          label: "Shared Panels",
          endpoints: [
            "GET /api/v2/panels/tips?surface=buckets",
            "GET /api/v2/panels/guide-links?surface=buckets"
          ]
        },
        { label: "Search", endpoints: SHARED.search }
      ]
    },
    "workspace_permission_hub.html": {
      title: "Permission Hub",
      groups: [
        {
          label: "Realms",
          endpoints: [
            "GET /api/v2/permissions/realms (paged)",
            "GET /api/v2/permissions/realms/filters",
            "GET /api/v2/permissions/realms/stats",
            "GET /api/v2/permissions/realms/:id",
            "POST /api/v2/permissions/realms",
            "PATCH /api/v2/permissions/realms/:id",
            "DELETE /api/v2/permissions/realms/:id",
            "GET /api/v2/permissions/realms/:id/roles",
            "GET /api/v2/permissions/realms/:id/members (paged)",
            "POST /api/v2/permissions/realms/:id/members",
            "DELETE /api/v2/permissions/realms/:id/members/:userId"
          ]
        },
        {
          label: "Request Inbox",
          endpoints: [
            "GET /api/v2/permissions/requests (paged)",
            "GET /api/v2/permissions/realms/:id/requests (paged)",
            "POST /api/v2/permissions/realms/:id/requests",
            "POST /api/v2/permissions/requests/:reqId/approve",
            "POST /api/v2/permissions/requests/:reqId/reject",
            "GET /api/v2/permissions/requests/:reqId"
          ]
        },
        {
          label: "Shared Panels",
          endpoints: [
            "GET /api/v2/panels/tips?surface=permissions",
            "GET /api/v2/panels/guide-links?surface=permissions"
          ]
        }
      ]
    },
    "workspace_database_hub.html": {
      title: "Database Hub",
      groups: [
        {
          label: "Databases",
          endpoints: [
            "GET /api/v2/databases (paged)",
            "GET /api/v2/databases/filters",
            "GET /api/v2/databases/stats",
            "GET /api/v2/databases/:id",
            "POST /api/v2/databases",
            "PATCH /api/v2/databases/:id",
            "DELETE /api/v2/databases/:id",
            "POST /api/v2/databases/:id/restart",
            "GET /api/v2/databases/:id/bindings",
            "GET /api/v2/databases/panels/health"
          ]
        },
        {
          label: "Shared Panels",
          endpoints: [
            "GET /api/v2/panels/tips?surface=databases",
            "GET /api/v2/panels/guide-links?surface=databases"
          ]
        },
        { label: "Jobs", endpoints: SHARED.jobs }
      ]
    },
    "workspace_tools_hub.html": {
      title: "Consoles Hub",
      groups: [
        {
          label: "Consoles",
          endpoints: [
            "GET /api/v2/consoles (paged)",
            "GET /api/v2/consoles/filters",
            "GET /api/v2/consoles/stats",
            "GET /api/v2/consoles/:id",
            "POST /api/v2/consoles",
            "DELETE /api/v2/consoles/:id",
            "POST /api/v2/consoles/:id/start",
            "POST /api/v2/consoles/:id/stop",
            "POST /api/v2/consoles/:id/open",
            "GET /api/v2/consoles/:id/bindings",
            "POST /api/v2/consoles/:id/bindings",
            "DELETE /api/v2/consoles/:id/bindings/:dbId",
            "GET /api/v2/consoles/panels/health",
            "GET /api/v2/consoles/panels/tips",
            "GET /api/v2/consoles/panels/guide-links"
          ]
        },
        {
          label: "Shared Panels",
          endpoints: [
            "GET /api/v2/panels/tips?surface=consoles",
            "GET /api/v2/panels/guide-links?surface=consoles"
          ]
        },
        { label: "Jobs", endpoints: SHARED.jobs }
      ]
    },
    "workspace_agent_hub.html": {
      title: "Agent Hub",
      groups: [
        {
          label: "Agents",
          endpoints: [
            "GET /api/v2/agents (paged)",
            "GET /api/v2/agents/filters",
            "GET /api/v2/agents/stats",
            "GET /api/v2/agents/:id",
            "POST /api/v2/agents",
            "PATCH /api/v2/agents/:id",
            "DELETE /api/v2/agents/:id",
            "POST /api/v2/agents/:id/open",
            "GET /api/v2/agents/:id/tools",
            "GET /api/v2/agents/:id/runtime",
            "GET /api/v2/agents/panels/runtime-status",
            "GET /api/v2/agents/panels/models"
          ]
        },
        {
          label: "Shared Panels",
          endpoints: [
            "GET /api/v2/panels/tips?surface=agents",
            "GET /api/v2/panels/guide-links?surface=agents"
          ]
        }
      ]
    },
    "workspace_chatbot_hub.html": {
      title: "Chatbot Hub",
      groups: [
        {
          label: "Chatbots",
          endpoints: [
            "GET /api/v2/chatbots (paged)",
            "GET /api/v2/chatbots/filters",
            "GET /api/v2/chatbots/stats",
            "GET /api/v2/chatbots/:id",
            "POST /api/v2/chatbots",
            "PATCH /api/v2/chatbots/:id",
            "DELETE /api/v2/chatbots/:id",
            "POST /api/v2/chatbots/:id/open",
            "GET /api/v2/chatbots/:id/endpoints",
            "POST /api/v2/chatbots/:id/endpoints",
            "DELETE /api/v2/chatbots/:id/endpoints/:endpointId",
            "GET /api/v2/chatbots/:id/channels",
            "GET /api/v2/chatbots/panels/publish-queue",
            "GET /api/v2/chatbots/panels/registration"
          ]
        },
        {
          label: "Shared Panels",
          endpoints: [
            "GET /api/v2/panels/tips?surface=chatbots",
            "GET /api/v2/panels/guide-links?surface=chatbots"
          ]
        }
      ]
    },
    "workspace_tool_inventory_hub.html": {
      title: "Tool Inventory Hub",
      groups: [
        {
          label: "Tool Inventory",
          endpoints: [
            "GET /api/v2/tool-inventory (paged)",
            "GET /api/v2/tool-inventory/filters",
            "GET /api/v2/tool-inventory/stats",
            "GET /api/v2/tool-inventory/:id",
            "POST /api/v2/tool-inventory",
            "PATCH /api/v2/tool-inventory/:id",
            "DELETE /api/v2/tool-inventory/:id",
            "POST /api/v2/tool-inventory/:id/open",
            "GET /api/v2/tool-inventory/:id/tools",
            "GET /api/v2/tool-inventory/:id/consumers",
            "GET /api/v2/tool-inventory/panels/connection-pulse"
          ]
        },
        {
          label: "Shared Panels",
          endpoints: [
            "GET /api/v2/panels/tips?surface=tool-inventory",
            "GET /api/v2/panels/guide-links?surface=tool-inventory"
          ]
        }
      ]
    },
    "workspace_keycenter_hub.html": {
      title: "Keycenter Hub",
      groups: [
        {
          label: "Tiers",
          endpoints: [
            "GET /api/v2/keycenter/tiers (paged)",
            "GET /api/v2/keycenter/tiers/filters",
            "GET /api/v2/keycenter/tiers/stats",
            "GET /api/v2/keycenter/tiers/:id",
            "POST /api/v2/keycenter/tiers",
            "PATCH /api/v2/keycenter/tiers/:id",
            "DELETE /api/v2/keycenter/tiers/:id"
          ]
        },
        {
          label: "Keys and Requests",
          endpoints: [
            "GET /api/v2/keycenter/keys (paged)",
            "GET /api/v2/keycenter/keys/:id",
            "POST /api/v2/keycenter/keys",
            "POST /api/v2/keycenter/keys/:id/rotate",
            "DELETE /api/v2/keycenter/keys/:id",
            "POST /api/v2/keycenter/keys/:id/reveal",
            "GET /api/v2/keycenter/requests (paged)",
            "POST /api/v2/keycenter/requests/:reqId/approve",
            "POST /api/v2/keycenter/requests/:reqId/reject"
          ]
        },
        {
          label: "Shared Panels",
          endpoints: [
            "GET /api/v2/panels/tips?surface=keycenter",
            "GET /api/v2/panels/guide-links?surface=keycenter"
          ]
        }
      ]
    },
    "dej_app_store.html": {
      title: "App Gallery",
      groups: [
        {
          label: "App Gallery",
          endpoints: [
            "GET /api/v2/app-gallery/hero",
            "GET /api/v2/app-gallery/categories",
            "GET /api/v2/app-gallery/apps (paged)",
            "GET /api/v2/app-gallery/apps/:slug",
            "POST /api/v2/app-gallery/apps/:slug/install",
            "GET /api/v2/app-gallery/featured",
            "GET /api/v2/app-gallery/related-ai"
          ]
        },
        { label: "Jobs", endpoints: SHARED.jobs }
      ]
    },
    "dej_agent_store.html": {
      title: "AI Gallery",
      groups: [
        {
          label: "AI Gallery",
          endpoints: [
            "GET /api/v2/ai-gallery/hero",
            "GET /api/v2/ai-gallery/rail",
            "GET /api/v2/ai-gallery/categories",
            "GET /api/v2/ai-gallery/spotlight",
            "GET /api/v2/ai-gallery/connectable-agents (paged)",
            "GET /api/v2/ai-gallery/workflow-packs (paged)",
            "GET /api/v2/ai-gallery/trust-matrix",
            "GET /api/v2/ai-gallery/linked-mcp",
            "GET /api/v2/ai-gallery/approvals",
            "GET /api/v2/ai-gallery/insights",
            "POST /api/v2/ai-gallery/items/:slug/install"
          ]
        },
        { label: "Jobs", endpoints: SHARED.jobs }
      ]
    },
    "portal_v2.html": {
      title: "Legacy Portal",
      note: "전용 portal_v2 엔트리는 문서에 없어서 최신 Launchpad 집계 계약과 Gallery feed를 가장 가까운 SoT로 매핑했습니다.",
      groups: [
        {
          label: "Launchpad Core",
          endpoints: ["GET /api/v2/launchpad/overview"]
        },
        {
          label: "Store Feed",
          endpoints: [
            "GET /api/v2/launchpad/overview",
            "GET /api/v2/app-gallery/featured",
            "GET /api/v2/ai-gallery/spotlight"
          ]
        },
        {
          label: "User Context",
          endpoints: ["GET /api/v2/launchpad/my-work"]
        }
      ]
    },
    "store_v2.html": {
      title: "Legacy Store",
      note: "전용 store_v2 섹션은 없어서 App Gallery와 AI Gallery를 합쳐 가장 가까운 SoT로 붙였습니다.",
      groups: [
        {
          label: "App Catalog",
          endpoints: [
            "GET /api/v2/app-gallery/hero",
            "GET /api/v2/app-gallery/categories",
            "GET /api/v2/app-gallery/apps (paged)",
            "GET /api/v2/app-gallery/apps/:slug",
            "POST /api/v2/app-gallery/apps/:slug/install",
            "GET /api/v2/app-gallery/featured"
          ]
        },
        {
          label: "AI Catalog",
          endpoints: [
            "GET /api/v2/ai-gallery/categories",
            "GET /api/v2/ai-gallery/spotlight",
            "GET /api/v2/ai-gallery/connectable-agents (paged)",
            "POST /api/v2/ai-gallery/items/:slug/install"
          ]
        },
        { label: "Jobs", endpoints: SHARED.jobs }
      ]
    },
    "mcp_hub_v2.html": {
      title: "Legacy MCP Hub",
      note: "문서상 MCP 전용 허브 대신 Tool Inventory가 v2 SoT입니다.",
      groups: [
        {
          label: "Tool Inventory",
          endpoints: [
            "GET /api/v2/tool-inventory (paged)",
            "GET /api/v2/tool-inventory/filters",
            "GET /api/v2/tool-inventory/stats",
            "GET /api/v2/tool-inventory/:id",
            "POST /api/v2/tool-inventory",
            "PATCH /api/v2/tool-inventory/:id",
            "DELETE /api/v2/tool-inventory/:id",
            "POST /api/v2/tool-inventory/:id/open",
            "GET /api/v2/tool-inventory/:id/tools",
            "GET /api/v2/tool-inventory/:id/consumers",
            "GET /api/v2/tool-inventory/panels/connection-pulse"
          ]
        },
        {
          label: "Related AI Gallery",
          endpoints: [
            "GET /api/v2/ai-gallery/linked-mcp",
            "GET /api/v2/ai-gallery/approvals",
            "GET /api/v2/ai-gallery/insights"
          ]
        }
      ]
    },
    "dej_chatbot_trial.html": {
      title: "Chatbot Trial",
      note: "백엔드 문서에는 trial 화면 전용 엔트리가 없어서 chatbot catalog, open, endpoint metadata를 기준으로 표기했습니다.",
      groups: [
        {
          label: "Chatbot Discovery",
          endpoints: [
            "GET /api/v2/chatbots (paged)",
            "GET /api/v2/chatbots/:id",
            "GET /api/v2/chatbots/filters",
            "GET /api/v2/chatbots/:id/endpoints",
            "GET /api/v2/chatbots/:id/channels"
          ]
        },
        {
          label: "Launch and Access",
          endpoints: [
            "POST /api/v2/chatbots/:id/open",
            "POST /api/v2/chatbots/:id/endpoints",
            "DELETE /api/v2/chatbots/:id/endpoints/:endpointId"
          ]
        }
      ]
    },
    "about_dej.html": {
      title: "About DEJ",
      note: "docs/api/v2 기준으로는 이 화면에 대응되는 전용 백엔드 엔드포인트가 정의되어 있지 않아 정적 콘셉트 페이지로 표시했습니다.",
      groups: []
    }
  };

  const GUIDE_LAYOUTS = {
    "portal_launchpad.html": [
      {
        selector: ".hero-greet",
        label: "Launchpad Header API",
        summary: "개인화 인사와 상단 요약은 Launchpad overview 집계 응답에서 공급합니다.",
        endpoints: ["GET /api/v2/launchpad/overview"],
        includePageNote: true
      },
      {
        selector: ".banner.dej-banner",
        label: "DEJ Main Banner API",
        summary: "메인 메시지와 서비스 CTA 슬롯은 overview payload 내부 hero/service menu 조합으로 채웁니다.",
        endpoints: ["GET /api/v2/launchpad/overview"]
      },
      {
        selector: ".banner.event-banner",
        label: "Event Banner API",
        summary: "행사/이벤트 공지형 배너는 overview 안의 announcements 묶음을 사용합니다.",
        endpoints: ["GET /api/v2/launchpad/overview"]
      },
      {
        selector: ".banner.security-banner",
        label: "Security Notice API",
        summary: "보안 공지성 배너도 동일하게 overview 안의 announcements 묶음을 사용합니다.",
        endpoints: ["GET /api/v2/launchpad/overview"]
      },
      {
        title: "DEJ App Gallery",
        label: "App Gallery Preview API",
        summary: "런치패드 안의 앱 전시 슬롯은 overview 안의 storeSpotlight 큐레이션을 기본으로 사용합니다.",
        endpoints: ["GET /api/v2/launchpad/overview"]
      },
      {
        title: "DEJ AI Gallery",
        label: "AI Gallery Preview API",
        summary: "런치패드 안의 챗봇/MCP 전시 슬롯도 overview 안의 storeSpotlight 큐레이션을 기본으로 사용합니다.",
        endpoints: ["GET /api/v2/launchpad/overview"]
      },
      {
        selector: ".cz-articles",
        label: "Articles Panel API",
        summary: "아티클 카드 목록과 상단 카테고리 탭은 overview 안의 articles 묶음을 사용합니다.",
        endpoints: ["GET /api/v2/launchpad/overview"]
      },
      {
        selector: ".cz-guides",
        label: "Guides Panel API",
        summary: "가이드 링크 목록은 overview 안의 guides 묶음으로 함께 내려옵니다.",
        endpoints: ["GET /api/v2/launchpad/overview"]
      },
      {
        selector: ".cz-sidebar .personal-rail-card:nth-of-type(1)",
        label: "My Notifications API",
        summary: "우측 개인화 알림 패널은 Launchpad my-work 집계 응답의 notifications 묶음을 사용합니다.",
        endpoints: ["GET /api/v2/launchpad/my-work"]
      },
      {
        selector: ".cz-sidebar .personal-rail-card:nth-of-type(2)",
        label: "My Deployments API",
        summary: "내 작업/배포 패널은 my-work 집계 응답의 projects, jobs, summary를 함께 사용합니다.",
        endpoints: ["GET /api/v2/launchpad/my-work"]
      },
      {
        selector: ".cz-sidebar .usage-rail-card",
        label: "My Resources API",
        summary: "내 리소스 패널은 Launchpad resources 집계 응답의 요약과 최근 항목 미리보기를 사용합니다.",
        endpoints: ["GET /api/v2/launchpad/resources"]
      }
    ],
    "workspace_projects_hub.html": [
      {
        selector: "#projects-section",
        label: "Project List API",
        summary: "프로젝트 목록, 필터, 런타임, 카드 액션이 이 패널에 연결됩니다.",
        endpoints: [
          "GET /api/v2/projects (paged)",
          "GET /api/v2/projects/filters",
          "GET /api/v2/projects/runtimes",
          "GET /api/v2/hashtags (paged)",
          "GET /api/v2/projects/:id/ides?scope=mine|all",
          "GET /api/v2/projects/:id/collaborators",
          "POST /api/v2/projects/:id/favorites",
          "DELETE /api/v2/projects/:id/favorites"
        ]
      },
      {
        selector: "#publish-section",
        label: "Publish Queue API",
        summary: "우측 배포 대기열과 상태 요약은 publish/readiness 계열 엔드포인트를 봅니다.",
        endpoints: [
          "GET /api/v2/projects/:id/publish/readiness",
          "GET /api/v2/projects/:id/publish/history (paged)",
          "POST /api/v2/projects/:id/publish/release",
          "POST /api/v2/projects/:id/publish/rollback",
          "GET /api/v2/jobs?owner=me (paged)"
        ]
      },
      {
        selector: ".service-health-card",
        label: "Ops / Realtime API",
        summary: "서비스 상태성 패널은 realtime/jobs 계열 정보를 함께 사용합니다.",
        endpoints: [
          "GET /api/v2/realtime",
          "WS /api/v2/realtime room project:<id>",
          "GET /api/v2/jobs?owner=me (paged)"
        ]
      },
      {
        title: "준비 체크리스트",
        label: "Publish Checklist API",
        summary: "배포 모달의 체크리스트는 readiness 결과와 release 판단값을 참조합니다.",
        endpoints: [
          "GET /api/v2/projects/:id/publish/readiness",
          "POST /api/v2/projects/:id/publish/release",
          "POST /api/v2/projects/:id/publish/rollback"
        ]
      },
      {
        title: "Commit Timeline",
        label: "Commit Timeline API",
        summary: "배포 전후 타임라인은 프로젝트 activity timeline에 연결됩니다.",
        endpoints: ["GET /api/v2/projects/:id/timeline (paged)"]
      },
      {
        title: "현재 초대된 사람",
        label: "Member Invite API",
        summary: "멤버 초대 모달의 현재 인원/회수 흐름은 collaborator API에 연결됩니다.",
        endpoints: [
          "GET /api/v2/projects/:id/collaborators",
          "POST /api/v2/projects/:id/collaborators",
          "DELETE /api/v2/projects/:id/collaborators/:userId"
        ]
      },
      {
        title: "사람 검색",
        label: "Member Search API",
        summary: "사람 검색은 전역 검색 API를 재사용하는 것으로 안내합니다.",
        endpoints: [
          "GET /api/v2/search?q=&types=projects,domains,...",
          "POST /api/v2/projects/:id/collaborators"
        ],
        note: "문서상 전용 user-search 엔드포인트는 없어 공용 search + collaborator 등록 흐름으로 연결했습니다."
      }
    ],
    "workspace_project_detail.html": [
      {
        selector: "#overview",
        label: "Overview API",
        summary: "프로젝트 기본 정보, 태그, 협업자, IDE 실행 버튼이 이 영역과 연결됩니다.",
        groupLabels: ["Hero and Meta", "IDE and Run"]
      },
      {
        title: "Database, bucket, LLM, GitLab, permissions",
        label: "Connected Resources API",
        summary: "연결 자원 목록, 추가 버튼, 삭제 액션이 이 패널에 매핑됩니다.",
        groupLabels: ["Connected Resources"]
      },
      {
        selector: "#config",
        label: "Configuration API",
        summary: "도메인, 변수, 포트 수정 흐름이 이 패널 안에서 API로 이어집니다.",
        groupLabels: ["Configuration"]
      },
      {
        title: "Delete This Project",
        label: "Danger Zone API",
        summary: "삭제/보관/복구 계열 액션이 이 패널에 연결됩니다.",
        groupLabels: ["Danger Zone"]
      },
      {
        selector: "#metrics-user",
        label: "User Analytics API",
        summary: "KPI, Top Page, 방문량 차트는 사용자 분석 엔드포인트를 사용합니다.",
        endpoints: [
          "GET /api/v2/projects/:id/analytics/user/kpi",
          "GET /api/v2/projects/:id/analytics/user/top-pages",
          "GET /api/v2/projects/:id/analytics/user/visits"
        ]
      },
      {
        selector: "#metrics-service",
        label: "Service Observability API",
        summary: "리소스 사용량, 로그 스트림, 터미널 연결은 이 API들에 붙습니다.",
        endpoints: [
          "GET /api/v2/projects/:id/analytics/service/cpu",
          "GET /api/v2/projects/:id/analytics/service/memory",
          "GET /api/v2/projects/:id/analytics/service/summary",
          "GET /api/v2/projects/:id/logs (paged)",
          "WS /api/v2/projects/:id/logs/stream",
          "POST /api/v2/projects/:id/terminal/sessions",
          "WS /api/v2/projects/:id/terminal/sessions/:sessionId",
          "DELETE /api/v2/projects/:id/terminal/sessions/:sessionId"
        ]
      },
      {
        title: "문서 수집과 검색 대상",
        label: "Harvest API",
        summary: "문서 목록, 검색 대상, 상세 조회는 harvest 엔드포인트에 연결됩니다.",
        endpoints: [
          "GET /api/v2/projects/:id/harvest (paged)",
          "GET /api/v2/projects/:id/harvest/summary",
          "GET /api/v2/projects/:id/harvest/:docId"
        ]
      },
      {
        title: "취약점과 조치 버전",
        label: "Security API",
        summary: "보안 이슈 목록, 요약, 개별 상세는 security 엔드포인트에 연결됩니다.",
        endpoints: [
          "GET /api/v2/projects/:id/security/issues (paged)",
          "GET /api/v2/projects/:id/security/summary",
          "GET /api/v2/projects/:id/security/issues/:issueId"
        ]
      },
      {
        title: "프로젝트 타임라인",
        label: "Activity Timeline API",
        summary: "최근 활동 타임라인은 프로젝트 activity/publish 흐름을 합쳐 표시합니다.",
        endpoints: [
          "GET /api/v2/projects/:id/timeline (paged)",
          "GET /api/v2/projects/:id/publish/history (paged)"
        ]
      },
      {
        title: "신규 배포 설정",
        label: "Release Form API",
        summary: "릴리즈 입력 폼은 readiness 검사 후 실제 release/rollback으로 이어집니다.",
        endpoints: [
          "GET /api/v2/projects/:id/publish/readiness",
          "POST /api/v2/projects/:id/publish/release",
          "POST /api/v2/projects/:id/publish/rollback"
        ]
      },
      {
        title: "최근 버전",
        label: "Version History API",
        summary: "우측 버전 목록은 publish history API에 직접 연결됩니다.",
        endpoints: ["GET /api/v2/projects/:id/publish/history (paged)"]
      },
      {
        title: "이번 작업 요약",
        label: "Release Summary API",
        summary: "요약 카드도 readiness/history 결과를 기반으로 구성됩니다.",
        endpoints: [
          "GET /api/v2/projects/:id/publish/readiness",
          "GET /api/v2/projects/:id/publish/history (paged)"
        ]
      }
    ],
    "workspace_domain_hub.html": [
      {
        selector: ".hero-shell",
        label: "Hub Summary API",
        summary: "상단 통계, 필터 기준, 검색 조건은 domain list/stats API에 연결됩니다.",
        endpoints: [
          "GET /api/v2/domains (paged)",
          "GET /api/v2/domains/stats",
          "GET /api/v2/domains/filters",
          "GET /api/v2/search?q=&types=projects,domains,..."
        ]
      },
      {
        selector: "#resource-panel",
        label: "Domain Resource API",
        summary: "도메인 카드 본문, 생성, 수정, 바인딩, 오픈 정보는 이 API로 연결됩니다.",
        endpoints: [
          "GET /api/v2/domains (paged)",
          "GET /api/v2/domains/:id",
          "POST /api/v2/domains",
          "PATCH /api/v2/domains/:id",
          "DELETE /api/v2/domains/:id",
          "POST /api/v2/domains/:id/bind",
          "DELETE /api/v2/domains/:id/bind"
        ]
      },
      {
        title: "DNS 운영 팁",
        label: "Tips Panel API",
        summary: "운영 팁 패널은 공용 tips surface를 읽습니다.",
        endpoints: ["GET /api/v2/panels/tips?surface=domains"]
      },
      {
        title: "가이드 링크",
        label: "Guide Links API",
        summary: "링크 패널은 공용 guide-links surface를 읽습니다.",
        endpoints: ["GET /api/v2/panels/guide-links?surface=domains"]
      },
      {
        title: "현재 인증서 상태",
        label: "Certificate Panel API",
        summary: "인증서 레일은 domain certificate 요약과 상세 조회를 사용합니다.",
        endpoints: [
          "GET /api/v2/domains/panels/certificates",
          "GET /api/v2/domains/:id/certificate"
        ]
      },
      {
        title: "현재 커넥션 상태",
        label: "Connection Panel API",
        summary: "연결 상태 레일은 connection 패널 요약과 상세 조회를 사용합니다.",
        endpoints: [
          "GET /api/v2/domains/panels/connections",
          "GET /api/v2/domains/:id/connection"
        ]
      }
    ],
    "workspace_s3_hub.html": [
      {
        selector: ".hero-shell",
        label: "Bucket Summary API",
        summary: "상단 통계, 필터, 검색 진입은 bucket list/stats API에 연결됩니다.",
        endpoints: [
          "GET /api/v2/buckets (paged)",
          "GET /api/v2/buckets/stats",
          "GET /api/v2/buckets/filters",
          "GET /api/v2/search?q=&types=projects,domains,..."
        ]
      },
      {
        selector: "#resource-panel",
        label: "Bucket Resource API",
        summary: "버킷 카드 목록과 bind/open 액션은 이 API에 연결됩니다.",
        endpoints: [
          "GET /api/v2/buckets (paged)",
          "GET /api/v2/buckets/:id",
          "POST /api/v2/buckets",
          "PATCH /api/v2/buckets/:id",
          "DELETE /api/v2/buckets/:id",
          "POST /api/v2/buckets/:id/bind",
          "DELETE /api/v2/buckets/:id/bind/:projectId",
          "POST /api/v2/buckets/:id/open"
        ]
      },
      {
        title: "버킷 운영 팁",
        label: "Tips Panel API",
        summary: "운영 팁 패널은 buckets surface용 공용 tips feed를 사용합니다.",
        endpoints: ["GET /api/v2/panels/tips?surface=buckets"]
      },
      {
        title: "가이드 링크",
        label: "Guide Links API",
        summary: "관련 허브 링크는 buckets surface용 guide-links feed를 사용합니다.",
        endpoints: ["GET /api/v2/panels/guide-links?surface=buckets"]
      },
      {
        title: "현재 주요 버킷 사용량",
        label: "Usage Panel API",
        summary: "우측 사용량 패널은 버킷 usage 집계 API에 연결됩니다.",
        endpoints: ["GET /api/v2/buckets/panels/usage"]
      }
    ],
    "workspace_permission_hub.html": [
      {
        selector: ".hero-shell",
        label: "Permission Summary API",
        summary: "상단 카운트/필터는 realm list와 stats API를 참조합니다.",
        endpoints: [
          "GET /api/v2/permissions/realms (paged)",
          "GET /api/v2/permissions/realms/stats",
          "GET /api/v2/permissions/realms/filters"
        ]
      },
      {
        selector: "#resource-panel",
        label: "Realm Resource API",
        summary: "권한 Realm 카드, 멤버, Role, 생성/수정 흐름이 이 패널과 연결됩니다.",
        endpoints: [
          "GET /api/v2/permissions/realms (paged)",
          "GET /api/v2/permissions/realms/:id",
          "POST /api/v2/permissions/realms",
          "PATCH /api/v2/permissions/realms/:id",
          "DELETE /api/v2/permissions/realms/:id",
          "GET /api/v2/permissions/realms/:id/roles",
          "GET /api/v2/permissions/realms/:id/members (paged)",
          "POST /api/v2/permissions/realms/:id/members",
          "DELETE /api/v2/permissions/realms/:id/members/:userId"
        ]
      },
      {
        title: "권한 운영 팁",
        label: "Tips Panel API",
        summary: "권한 운영 팁은 permissions surface용 tips feed를 읽습니다.",
        endpoints: ["GET /api/v2/panels/tips?surface=permissions"]
      },
      {
        title: "가이드 링크",
        label: "Guide Links API",
        summary: "연결 허브/문서 링크는 permissions surface용 guide-links feed를 읽습니다.",
        endpoints: ["GET /api/v2/panels/guide-links?surface=permissions"]
      },
      {
        title: "현재 요청 목록",
        label: "Request Inbox API",
        summary: "우측 요청함 패널은 permission request inbox 계열 엔드포인트에 연결됩니다.",
        endpoints: [
          "GET /api/v2/permissions/requests (paged)",
          "GET /api/v2/permissions/realms/:id/requests (paged)",
          "POST /api/v2/permissions/realms/:id/requests",
          "POST /api/v2/permissions/requests/:reqId/approve",
          "POST /api/v2/permissions/requests/:reqId/reject",
          "GET /api/v2/permissions/requests/:reqId"
        ]
      }
    ],
    "workspace_database_hub.html": [
      {
        selector: ".hero-shell",
        label: "Database Summary API",
        summary: "상단 통계, 필터, 검색은 DB list/stats API를 참조합니다.",
        endpoints: [
          "GET /api/v2/databases (paged)",
          "GET /api/v2/databases/stats",
          "GET /api/v2/databases/filters",
          "GET /api/v2/search?q=&types=projects,domains,..."
        ]
      },
      {
        selector: "#resource-panel",
        label: "Database Resource API",
        summary: "DB 카드 목록, 상세, 재시작, 바인딩 정보가 이 패널과 연결됩니다.",
        endpoints: [
          "GET /api/v2/databases (paged)",
          "GET /api/v2/databases/:id",
          "POST /api/v2/databases",
          "PATCH /api/v2/databases/:id",
          "DELETE /api/v2/databases/:id",
          "POST /api/v2/databases/:id/restart",
          "GET /api/v2/databases/:id/bindings"
        ]
      },
      {
        title: "데이터 리소스 운영 팁",
        label: "Tips Panel API",
        summary: "운영 팁 패널은 databases surface용 tips feed를 사용합니다.",
        endpoints: ["GET /api/v2/panels/tips?surface=databases"]
      },
      {
        title: "가이드 링크",
        label: "Guide Links API",
        summary: "연결 허브 링크는 databases surface용 guide-links feed를 사용합니다.",
        endpoints: ["GET /api/v2/panels/guide-links?surface=databases"]
      },
      {
        title: "현재 Running 리소스 Healthy",
        label: "Health Panel API",
        summary: "우측 health 패널은 DB health 집계 API에 연결됩니다.",
        endpoints: ["GET /api/v2/databases/panels/health"]
      }
    ],
    "workspace_tools_hub.html": [
      {
        selector: ".hero-shell",
        label: "Console Summary API",
        summary: "상단 상태/필터/검색은 console list/stats API를 참조합니다.",
        endpoints: [
          "GET /api/v2/consoles (paged)",
          "GET /api/v2/consoles/stats",
          "GET /api/v2/consoles/filters",
          "GET /api/v2/search?q=&types=projects,domains,..."
        ]
      },
      {
        selector: "#resource-panel",
        label: "Console Resource API",
        summary: "콘솔 카드 목록과 start/stop/open/binding 액션은 이 API에 연결됩니다.",
        endpoints: [
          "GET /api/v2/consoles (paged)",
          "GET /api/v2/consoles/:id",
          "POST /api/v2/consoles",
          "DELETE /api/v2/consoles/:id",
          "POST /api/v2/consoles/:id/start",
          "POST /api/v2/consoles/:id/stop",
          "POST /api/v2/consoles/:id/open",
          "GET /api/v2/consoles/:id/bindings",
          "POST /api/v2/consoles/:id/bindings",
          "DELETE /api/v2/consoles/:id/bindings/:dbId"
        ]
      },
      {
        title: "콘솔 운영 팁",
        label: "Tips Panel API",
        summary: "콘솔 운영 팁은 전용 tips panel API를 사용합니다.",
        endpoints: ["GET /api/v2/consoles/panels/tips"]
      },
      {
        title: "가이드 링크",
        label: "Guide Links API",
        summary: "관련 가이드 링크는 전용 guide-links panel API를 사용합니다.",
        endpoints: ["GET /api/v2/consoles/panels/guide-links"]
      },
      {
        title: "현재 Running 콘솔 Healthy",
        label: "Health Panel API",
        summary: "우측 health 패널은 console health 집계 API에 연결됩니다.",
        endpoints: ["GET /api/v2/consoles/panels/health"]
      }
    ],
    "workspace_agent_hub.html": [
      {
        selector: ".hero-shell",
        label: "Agent Summary API",
        summary: "상단 상태/필터/검색은 agent list/stats API를 참조합니다.",
        endpoints: [
          "GET /api/v2/agents (paged)",
          "GET /api/v2/agents/stats",
          "GET /api/v2/agents/filters"
        ]
      },
      {
        selector: "#resource-panel",
        label: "Agent Resource API",
        summary: "에이전트 카드, 런타임, 툴, 오픈 액션은 이 API에 연결됩니다.",
        endpoints: [
          "GET /api/v2/agents (paged)",
          "GET /api/v2/agents/:id",
          "POST /api/v2/agents",
          "PATCH /api/v2/agents/:id",
          "DELETE /api/v2/agents/:id",
          "POST /api/v2/agents/:id/open",
          "GET /api/v2/agents/:id/runtime",
          "GET /api/v2/agents/:id/tools"
        ]
      },
      {
        title: "Agent Hub 분리 기준",
        label: "Agent Modeling API",
        summary: "이 패널은 agent runtime/model 판단에 연결되는 기준 API를 보여줍니다.",
        endpoints: [
          "GET /api/v2/agents/panels/models",
          "GET /api/v2/panels/tips?surface=agents"
        ]
      },
      {
        title: "연결 기준",
        label: "Agent Guide Links API",
        summary: "관련 연결 기준/링크 패널은 guide-links surface에 연결됩니다.",
        endpoints: ["GET /api/v2/panels/guide-links?surface=agents"]
      },
      {
        title: "현재 서비스 상태",
        label: "Runtime Status API",
        summary: "우측 상태 패널은 runtime-status panel API에 연결됩니다.",
        endpoints: ["GET /api/v2/agents/panels/runtime-status"]
      }
    ],
    "workspace_chatbot_hub.html": [
      {
        selector: ".hero-shell",
        label: "Chatbot Summary API",
        summary: "상단 상태/필터는 chatbot list/stats API를 참조합니다.",
        endpoints: [
          "GET /api/v2/chatbots (paged)",
          "GET /api/v2/chatbots/stats",
          "GET /api/v2/chatbots/filters"
        ]
      },
      {
        selector: "#resource-panel",
        label: "Chatbot Resource API",
        summary: "챗봇 카드, endpoint/channel 조회, 오픈 액션은 이 API에 연결됩니다.",
        endpoints: [
          "GET /api/v2/chatbots (paged)",
          "GET /api/v2/chatbots/:id",
          "POST /api/v2/chatbots",
          "PATCH /api/v2/chatbots/:id",
          "DELETE /api/v2/chatbots/:id",
          "POST /api/v2/chatbots/:id/open",
          "GET /api/v2/chatbots/:id/endpoints",
          "POST /api/v2/chatbots/:id/endpoints",
          "DELETE /api/v2/chatbots/:id/endpoints/:endpointId",
          "GET /api/v2/chatbots/:id/channels"
        ]
      },
      {
        title: "등록 모델",
        label: "Registration Panel API",
        summary: "모델/등록 관점 패널은 chatbot registration panel API를 봅니다.",
        endpoints: ["GET /api/v2/chatbots/panels/registration"]
      },
      {
        title: "연결 허브",
        label: "Guide Links API",
        summary: "관련 허브 연결 링크는 chatbots surface guide-links를 사용합니다.",
        endpoints: ["GET /api/v2/panels/guide-links?surface=chatbots"]
      },
      {
        title: "현재 등록 상태",
        label: "Registration Status API",
        summary: "우측 등록 상태 패널은 registration/publish queue 성격의 panel API를 사용합니다.",
        endpoints: [
          "GET /api/v2/chatbots/panels/registration",
          "GET /api/v2/chatbots/panels/publish-queue"
        ]
      }
    ],
    "workspace_tool_inventory_hub.html": [
      {
        selector: ".hero-shell",
        label: "Inventory Summary API",
        summary: "상단 카운트/필터는 tool inventory list/stats API를 참조합니다.",
        endpoints: [
          "GET /api/v2/tool-inventory (paged)",
          "GET /api/v2/tool-inventory/stats",
          "GET /api/v2/tool-inventory/filters"
        ]
      },
      {
        selector: "#resource-panel",
        label: "Inventory Resource API",
        summary: "inventory 카드, tool/consumer 조회, open 액션이 이 패널과 연결됩니다.",
        endpoints: [
          "GET /api/v2/tool-inventory (paged)",
          "GET /api/v2/tool-inventory/:id",
          "POST /api/v2/tool-inventory",
          "PATCH /api/v2/tool-inventory/:id",
          "DELETE /api/v2/tool-inventory/:id",
          "POST /api/v2/tool-inventory/:id/open",
          "GET /api/v2/tool-inventory/:id/tools",
          "GET /api/v2/tool-inventory/:id/consumers"
        ]
      },
      {
        title: "왜 Tool Inventories인가",
        label: "Tips Panel API",
        summary: "개념 설명 패널은 tool-inventory surface용 tips feed에 연결됩니다.",
        endpoints: ["GET /api/v2/panels/tips?surface=tool-inventory"]
      },
      {
        title: "연결 흐름",
        label: "Guide Links API",
        summary: "연결 흐름 패널은 tool-inventory surface용 guide-links feed를 사용합니다.",
        endpoints: ["GET /api/v2/panels/guide-links?surface=tool-inventory"]
      },
      {
        title: "현재 연결 상태",
        label: "Connection Pulse API",
        summary: "우측 연결 상태 패널은 connection-pulse panel API에 연결됩니다.",
        endpoints: ["GET /api/v2/tool-inventory/panels/connection-pulse"]
      }
    ],
    "workspace_keycenter_hub.html": [
      {
        selector: ".hero-shell",
        label: "Tier Summary API",
        summary: "상단 카운트와 필터는 tier list/stats API를 참조합니다.",
        endpoints: [
          "GET /api/v2/keycenter/tiers (paged)",
          "GET /api/v2/keycenter/tiers/stats",
          "GET /api/v2/keycenter/tiers/filters"
        ]
      },
      {
        selector: "#resource-panel",
        label: "Tier Resource API",
        summary: "Tier 카드 본문은 tier CRUD 흐름에 직접 연결됩니다.",
        endpoints: [
          "GET /api/v2/keycenter/tiers (paged)",
          "GET /api/v2/keycenter/tiers/:id",
          "POST /api/v2/keycenter/tiers",
          "PATCH /api/v2/keycenter/tiers/:id",
          "DELETE /api/v2/keycenter/tiers/:id"
        ]
      },
      {
        title: "Keycenter 운영 원칙",
        label: "Tips Panel API",
        summary: "운영 원칙 패널은 keycenter surface용 tips feed를 사용합니다.",
        endpoints: ["GET /api/v2/panels/tips?surface=keycenter"]
      },
      {
        title: "연결 허브",
        label: "Guide Links API",
        summary: "연결 허브 패널은 keycenter surface용 guide-links feed를 사용합니다.",
        endpoints: ["GET /api/v2/panels/guide-links?surface=keycenter"]
      },
      {
        title: "모델별 사용량",
        label: "Key Usage API",
        summary: "모델별 사용량 패널은 key/tier/request 집계를 합쳐 보여주는 위치입니다.",
        endpoints: [
          "GET /api/v2/keycenter/tiers (paged)",
          "GET /api/v2/keycenter/keys (paged)",
          "GET /api/v2/keycenter/requests (paged)"
        ],
        note: "문서상 모델별 사용량 전용 panel API는 없어 tier/keys/request 조합으로 매핑했습니다."
      }
    ],
    "dej_app_store.html": [
      {
        selector: ".page-head",
        label: "App Gallery Header API",
        summary: "페이지 상단 소개/검색/요약 진입은 App Gallery hero 계열과 연결됩니다.",
        endpoints: [
          "GET /api/v2/app-gallery/hero",
          "GET /api/v2/app-gallery/categories"
        ]
      },
      {
        selector: ".featured-grid",
        label: "Featured App API",
        summary: "상단 추천 카드와 우측 주요 앱 요약은 featured/detail API를 사용합니다.",
        endpoints: [
          "GET /api/v2/app-gallery/featured",
          "GET /api/v2/app-gallery/apps/:slug"
        ]
      },
      {
        title: "최근 등록된 앱을 한눈에 살펴보세요",
        label: "App List API",
        summary: "앱 카드 그리드와 설치 액션은 목록/상세/설치 API에 연결됩니다.",
        endpoints: [
          "GET /api/v2/app-gallery/apps (paged)",
          "GET /api/v2/app-gallery/apps/:slug",
          "POST /api/v2/app-gallery/apps/:slug/install"
        ]
      },
      {
        title: "목적에 따라 가볍게 모아본 앱 묶음",
        label: "Collection API",
        summary: "묶음/추천 컬렉션은 featured + category 결과를 재배열한 패널로 봅니다.",
        endpoints: [
          "GET /api/v2/app-gallery/categories",
          "GET /api/v2/app-gallery/featured",
          "GET /api/v2/app-gallery/related-ai"
        ]
      }
    ],
    "dej_agent_store.html": [
      {
        selector: ".page-head",
        label: "AI Gallery Header API",
        summary: "페이지 상단 소개/검색/요약은 AI Gallery hero/rail API에 연결됩니다.",
        endpoints: [
          "GET /api/v2/ai-gallery/hero",
          "GET /api/v2/ai-gallery/rail",
          "GET /api/v2/ai-gallery/categories"
        ]
      },
      {
        title: "지금 바로 살펴보고 써볼 수 있는 챗봇 모음",
        label: "Chatbot Showcase API",
        summary: "챗봇 전시 카드와 설치 액션은 spotlight/list/install API에 연결됩니다.",
        endpoints: [
          "GET /api/v2/ai-gallery/spotlight",
          "GET /api/v2/ai-gallery/connectable-agents (paged)",
          "POST /api/v2/ai-gallery/items/:slug/install"
        ]
      },
      {
        title: "챗봇이 더 똑똑하게 일하도록 돕는 MCP 모음",
        label: "Linked MCP API",
        summary: "MCP 섹션은 linked-mcp 기반 전시 feed에 연결됩니다.",
        endpoints: [
          "GET /api/v2/ai-gallery/linked-mcp",
          "GET /api/v2/ai-gallery/workflow-packs (paged)"
        ]
      },
      {
        title: "처음 보는 사람도 어렵지 않게 고르는 방법",
        label: "Trust / Guide API",
        summary: "가이드 표와 비교 관점은 trust/approval/insight API를 사용합니다.",
        endpoints: [
          "GET /api/v2/ai-gallery/trust-matrix",
          "GET /api/v2/ai-gallery/approvals",
          "GET /api/v2/ai-gallery/insights"
        ]
      }
    ],
    "portal_v2.html": [
      {
        selector: ".banner",
        label: "Legacy Launchpad Banner API",
        summary: "상단 배너는 최신 Launchpad overview 집계 계약으로 매핑했습니다.",
        groupLabels: ["Launchpad Core", "User Context"],
        includePageNote: true
      },
      {
        selector: ".chart-wrap",
        label: "Usage Chart API",
        summary: "주간 사용량 차트는 my-work와 resources 집계 응답을 기준으로 가까운 SoT를 잡았습니다.",
        endpoints: [
          "GET /api/v2/launchpad/my-work",
          "GET /api/v2/launchpad/resources"
        ]
      },
      {
        title: "많이 본 페이지",
        label: "Top Pages API",
        summary: "많이 본 페이지 패널은 overview 안의 articles/service menu 조합을 가까운 SoT로 매핑했습니다.",
        endpoints: ["GET /api/v2/launchpad/overview"]
      },
      {
        title: "LLM Key 사용량",
        label: "LLM Usage API",
        summary: "LLM 사용량 패널은 overview hero와 my-work 요약을 기준으로 가까운 SoT를 잡았습니다.",
        endpoints: [
          "GET /api/v2/launchpad/overview",
          "GET /api/v2/launchpad/my-work"
        ]
      },
      {
        title: "Notifications",
        label: "Notification API",
        summary: "알림 위젯은 Launchpad my-work 집계 응답의 notifications 묶음에 연결됩니다.",
        endpoints: ["GET /api/v2/launchpad/my-work"]
      },
      {
        title: "내 배포 앱",
        label: "My App Feed API",
        summary: "내 배포 앱 위젯은 Launchpad my-work 집계 응답의 프로젝트/job 요약으로 매핑했습니다.",
        endpoints: ["GET /api/v2/launchpad/my-work"]
      }
    ],
    "store_v2.html": [
      {
        selector: ".banner",
        label: "Legacy Store Banner API",
        summary: "상단 추천 배너는 App Gallery hero/feed를 가까운 SoT로 매핑했습니다.",
        endpoints: [
          "GET /api/v2/app-gallery/hero",
          "GET /api/v2/app-gallery/featured"
        ],
        includePageNote: true
      },
      {
        selector: ".content .section:nth-of-type(1)",
        label: "Popular Apps API",
        summary: "인기 앱/최신 등록/추천 탭은 app list/detail/install 흐름에 연결됩니다.",
        endpoints: [
          "GET /api/v2/app-gallery/apps (paged)",
          "GET /api/v2/app-gallery/apps/:slug",
          "POST /api/v2/app-gallery/apps/:slug/install"
        ]
      },
      {
        selector: ".content .section:nth-of-type(2)",
        label: "Template Bundle API",
        summary: "프로젝트 템플릿도 app catalog의 한 variant로 매핑했습니다.",
        endpoints: [
          "GET /api/v2/app-gallery/categories",
          "GET /api/v2/app-gallery/featured"
        ]
      },
      {
        selector: ".sidebar .widget:nth-of-type(1)",
        label: "Trending Widget API",
        summary: "우측 인기 위젯은 featured/app list 결과를 집계한 패널로 봅니다.",
        endpoints: [
          "GET /api/v2/app-gallery/featured",
          "GET /api/v2/app-gallery/apps (paged)"
        ]
      },
      {
        selector: ".sidebar .widget:nth-of-type(2)",
        label: "Update Widget API",
        summary: "최근 업데이트 위젯은 app detail feed에 가까운 슬롯으로 매핑했습니다.",
        endpoints: [
          "GET /api/v2/app-gallery/apps (paged)",
          "GET /api/v2/app-gallery/apps/:slug"
        ]
      },
      {
        selector: ".sidebar .widget:nth-of-type(3)",
        label: "Installed App Widget API",
        summary: "내 설치 앱 위젯은 install/job 상태를 합쳐 보는 위치로 안내합니다.",
        endpoints: [
          "POST /api/v2/app-gallery/apps/:slug/install",
          "GET /api/v2/jobs?owner=me (paged)"
        ]
      }
    ],
    "mcp_hub_v2.html": [
      {
        selector: ".banner",
        label: "Legacy MCP Banner API",
        summary: "상단 배너는 Tool Inventory 허브를 가까운 SoT로 사용합니다.",
        groupLabels: ["Tool Inventory"],
        includePageNote: true
      },
      {
        selector: ".stats-bar",
        label: "Inventory Stats API",
        summary: "등록 수/활성 연결/호출량 요약은 inventory stats와 pulse에 연결됩니다.",
        endpoints: [
          "GET /api/v2/tool-inventory/stats",
          "GET /api/v2/tool-inventory/panels/connection-pulse"
        ]
      },
      {
        selector: ".content .section",
        label: "Inventory List API",
        summary: "MCP 카드 목록과 연결 상태는 inventory list/detail/open 흐름에 연결됩니다.",
        endpoints: [
          "GET /api/v2/tool-inventory (paged)",
          "GET /api/v2/tool-inventory/:id",
          "POST /api/v2/tool-inventory",
          "PATCH /api/v2/tool-inventory/:id",
          "DELETE /api/v2/tool-inventory/:id",
          "POST /api/v2/tool-inventory/:id/open"
        ]
      },
      {
        title: "내 연결",
        label: "Connected Inventory API",
        summary: "내 연결 위젯은 connection pulse와 consumer 관점 API에 연결됩니다.",
        endpoints: [
          "GET /api/v2/tool-inventory/panels/connection-pulse",
          "GET /api/v2/tool-inventory/:id/consumers"
        ]
      },
      {
        title: "최근 활동",
        label: "Activity Widget API",
        summary: "최근 활동 위젯은 inventory/AI 연계 insight feed로 매핑했습니다.",
        endpoints: [
          "GET /api/v2/tool-inventory/panels/connection-pulse",
          "GET /api/v2/ai-gallery/insights"
        ]
      },
      {
        title: "문서 & 가이드",
        label: "Guide Widget API",
        summary: "문서/가이드 위젯은 related AI/guide feed 기준으로 연결했습니다.",
        endpoints: [
          "GET /api/v2/ai-gallery/linked-mcp",
          "GET /api/v2/ai-gallery/approvals"
        ]
      }
    ],
    "dej_chatbot_trial.html": [
      {
        selector: ".page-head",
        label: "Trial Header API",
        summary: "실험실 상단 소개와 진입 상태는 chatbot catalog 요약에 연결됩니다.",
        groupLabels: ["Chatbot Discovery"],
        includePageNote: true
      },
      {
        title: "Phiên thử nghiệm gần đây",
        label: "Recent Trial Session API",
        summary: "최근 세션 레일은 chatbot 상세/endpoints/channel metadata를 참조합니다.",
        endpoints: [
          "GET /api/v2/chatbots (paged)",
          "GET /api/v2/chatbots/:id",
          "GET /api/v2/chatbots/:id/endpoints",
          "GET /api/v2/chatbots/:id/channels"
        ]
      },
      {
        title: "Chọn bot phù hợp với mục đích công việc",
        label: "Bot Launch API",
        summary: "봇 선택 카드와 실행 버튼은 open/endpoint 등록 흐름에 연결됩니다.",
        endpoints: [
          "GET /api/v2/chatbots (paged)",
          "POST /api/v2/chatbots/:id/open",
          "POST /api/v2/chatbots/:id/endpoints",
          "DELETE /api/v2/chatbots/:id/endpoints/:endpointId"
        ]
      }
    ],
    "about_dej.html": [
      {
        selector: ".portal-hero",
        label: "Static Concept Note",
        summary: "이 영역은 현재 정적 소개 섹션이며 연결된 docs/api/v2 엔드포인트가 없습니다.",
        endpoints: [],
        includePageNote: true
      },
      {
        selector: ".pipeline-panel",
        label: "Static Concept Note",
        summary: "CEJ -> DEJ 변환 흐름은 현재 정적 콘셉트 다이어그램입니다.",
        endpoints: []
      },
      {
        selector: ".timeline-panel",
        label: "Static Concept Note",
        summary: "연혁 패널은 현재 정적 narrative 패널입니다.",
        endpoints: []
      },
      {
        title: "Core Ideas",
        label: "Static Concept Note",
        summary: "Core Ideas 카드 역시 현재는 API 연결 없이 고정 콘텐츠입니다.",
        endpoints: []
      },
      {
        title: "Continue in AX Studio",
        label: "Static Concept Note",
        summary: "연결 CTA는 단순 링크이며 전용 backend endpoint는 문서에 정의되어 있지 않습니다.",
        endpoints: []
      }
    ]
  };

  const detectFilename = () => {
    const knownPages = Object.keys(pages);
    const candidates = [];
    const pushCandidate = (value) => {
      if (!value) return;
      candidates.push(String(value));
    };

    pushCandidate(window.location.pathname);
    pushCandidate(window.location.href);
    pushCandidate(document.baseURI);
    pushCandidate(document.URL);

    try {
      const params = new URLSearchParams(window.location.search || "");
      params.forEach((value, key) => {
        pushCandidate(key);
        pushCandidate(value);
      });
    } catch (error) {
      // Ignore malformed preview URLs and continue with other filename hints.
    }

    for (const candidate of candidates) {
      for (const pageName of knownPages) {
        if (candidate.includes(pageName)) return pageName;
      }
    }

    const path = window.location.pathname || "";
    const parts = path.split("/");
    return parts[parts.length - 1] || "index.html";
  };

  const filename = detectFilename();

  const config = pages[filename];
  if (!config) return;

  document.querySelectorAll("[data-endpoint-overlay], [data-endpoint-inline-guide]").forEach((node) =>
    node.remove()
  );

  if (!document.querySelector("[data-endpoint-inline-style]")) {
    const style = document.createElement("style");
    style.dataset.endpointInlineStyle = "true";
    style.textContent = `
    .endpoint-inline-guide {
      position: relative;
      z-index: 24;
      display: flex;
      justify-content: flex-end;
      margin: 0;
      pointer-events: none;
    }
    .endpoint-inline-guide-trigger {
      appearance: none;
      border: 1px solid rgba(180, 14, 77, 0.14);
      background: rgba(255, 248, 251, 0.96);
      color: var(--brand, #b40e4d);
      border-radius: 999px;
      min-height: 30px;
      padding: 0 11px;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.04em;
      line-height: 1;
      box-shadow: 0 8px 18px rgba(180, 14, 77, 0.08);
      transition: transform .16s ease, box-shadow .16s ease, background .16s ease, border-color .16s ease;
      pointer-events: auto;
    }
    .endpoint-inline-guide-trigger:hover,
    .endpoint-inline-guide:hover .endpoint-inline-guide-trigger,
    .endpoint-inline-guide:focus-within .endpoint-inline-guide-trigger,
    .endpoint-inline-guide.is-open .endpoint-inline-guide-trigger {
      transform: translateY(-1px);
      background: rgba(255, 244, 248, 1);
      border-color: rgba(180, 14, 77, 0.22);
      box-shadow: 0 14px 28px rgba(180, 14, 77, 0.12);
    }
    .endpoint-inline-guide-trigger:focus-visible {
      outline: 2px solid rgba(180, 14, 77, 0.22);
      outline-offset: 2px;
    }
    .endpoint-inline-guide-kicker {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    .endpoint-inline-guide-kicker::before {
      content: "";
      width: 7px;
      height: 7px;
      border-radius: 999px;
      background: currentColor;
      opacity: 0.72;
      flex: 0 0 auto;
    }
    .endpoint-inline-guide-label {
      display: inline-flex;
      align-items: center;
      padding: 4px 8px;
      border-radius: 999px;
      background: rgba(180, 14, 77, 0.08);
      color: var(--brand, #b40e4d);
      font-size: 10px;
      font-weight: 800;
      white-space: nowrap;
    }
    .endpoint-inline-guide-popover {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: min(440px, calc(100vw - 32px));
      padding: 13px;
      border-radius: 16px;
      border: 1px solid rgba(180, 14, 77, 0.14);
      background:
        linear-gradient(180deg, rgba(254, 239, 245, 0.98) 0%, rgba(255, 255, 255, 0.98) 100%);
      color: var(--t1, var(--text-1, #2f3236));
      box-shadow: 0 22px 48px rgba(15, 23, 42, 0.16), inset 0 1px 0 rgba(255,255,255,.82);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateY(8px);
      transition: opacity .18s ease, transform .18s ease, visibility .18s ease;
    }
    .endpoint-inline-guide:hover .endpoint-inline-guide-popover,
    .endpoint-inline-guide:focus-within .endpoint-inline-guide-popover,
    .endpoint-inline-guide.is-open .endpoint-inline-guide-popover {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translateY(0);
    }
    .endpoint-inline-guide-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .endpoint-inline-guide-summary {
      margin-top: 8px;
      font-size: 12px;
      line-height: 1.55;
      color: var(--t2, var(--text-2, #5f656d));
    }
    .endpoint-inline-guide-note {
      margin-top: 7px;
      font-size: 11px;
      line-height: 1.55;
      color: var(--t2, var(--text-2, #5f656d));
    }
    .endpoint-inline-guide-list {
      display: grid;
      gap: 6px;
      margin: 10px 0 0;
      padding: 0;
      list-style: none;
    }
    .endpoint-inline-guide-item {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 7px;
      align-items: flex-start;
      padding: 7px 9px;
      border-radius: 10px;
      background: rgba(255,255,255,.92);
      border: 1px solid rgba(15, 23, 42, 0.06);
      word-break: break-word;
      font-size: 11px;
      line-height: 1.45;
    }
    .endpoint-inline-guide-method {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 42px;
      padding: 3px 6px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.06);
      color: var(--t2, var(--text-2, #5f656d));
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.03em;
      line-height: 1;
    }
    .endpoint-inline-guide-empty {
      margin-top: 10px;
      padding: 8px 10px;
      border-radius: 10px;
      background: rgba(255,255,255,.88);
      border: 1px solid rgba(15,23,42,.05);
      font-size: 11px;
      color: var(--t2, var(--text-2, #5f656d));
      line-height: 1.5;
    }
    @media (max-width: 640px) {
      .endpoint-inline-guide-trigger {
        min-height: 28px;
        padding: 0 10px;
      }
      .endpoint-inline-guide-popover {
        left: 0;
        right: auto;
        width: min(360px, calc(100vw - 24px));
        padding: 12px;
      }
      .endpoint-inline-guide-item {
        grid-template-columns: 1fr;
      }
    }
  `;
    document.head.appendChild(style);
  }

  const normalize = (value) =>
    String(value || "")
      .replace(/\s+/g, "")
      .toLowerCase();

  const splitEndpoint = (endpoint) => {
    const parts = String(endpoint || "").split(" ");
    return {
      method: parts.shift() || "",
      path: parts.join(" ")
    };
  };

  const dedupe = (items) => {
    const seen = new Set();
    return (items || []).filter((item) => {
      const key = String(item || "").trim();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const groupMap = new Map(
    (config.groups || []).map((group) => [normalize(group.label), group.endpoints || []])
  );

  const resolveGuideEndpoints = (guide) => {
    if (guide.endpoints) return dedupe(guide.endpoints);
    const fromGroups = (guide.groupLabels || []).flatMap((label) => {
      return groupMap.get(normalize(label)) || [];
    });
    return dedupe(fromGroups);
  };

  const HEADING_SELECTORS = [
    ".panel-title",
    ".list-title",
    ".resource-title",
    ".hero-title",
    ".page-title",
    ".publish-section-title",
    ".store-section-title",
    ".section-title",
    ".widget-title",
    ".chart-title",
    ".banner-title",
    ".card-title",
    ".time-title",
    ".pipe-title",
    ".ops-title",
    ".hub-publish-section-head h3",
    ".hub-invite-section-head h3"
  ].join(", ");

  const CONTAINER_SELECTORS = [
    ".panel",
    ".store-section",
    ".section",
    ".widget",
    ".banner",
    ".card",
    ".publish-panel",
    ".hub-publish-panel",
    ".hub-invite-panel",
    ".timeline-panel",
    ".pipeline-panel",
    ".hero",
    ".portal-hero",
    ".rail-view",
    ".trial-panel",
    ".stats-bar",
    ".chart-wrap",
    ".featured-grid",
    ".page-head",
    ".service-health-card",
    ".ops-card"
  ].join(", ");

  const DIRECT_HEADER_SELECTORS = [
    ".panel-header",
    ".panel-head",
    ".resource-head",
    ".hero-top",
    ".list-head",
    ".section-head",
    ".store-section-head",
    ".publish-section-head",
    ".hub-publish-section-head",
    ".hub-invite-section-head",
    ".metrics-section-head",
    ".page-head",
    ".banner-content",
    ".feature-top"
  ].join(", ");

  const pickByText = (nodes, text) => {
    const target = normalize(text);
    if (!target) return null;

    const exact = nodes.find((node) => normalize(node.textContent) === target);
    if (exact) return exact;

    return (
      nodes.find((node) => normalize(node.textContent).includes(target)) ||
      nodes.find((node) => target.includes(normalize(node.textContent)))
    );
  };

  const resolveTarget = (guide) => {
    if (guide.selector) {
      const nodes = Array.from(document.querySelectorAll(guide.selector));
      if (!nodes.length) return null;
      if (!guide.title) return nodes[0];
      return pickByText(nodes, guide.title) || nodes[0];
    }

    if (!guide.title) return null;

    const candidates = Array.from(document.querySelectorAll(HEADING_SELECTORS));
    const heading = pickByText(candidates, guide.title);
    if (!heading) return null;
    return heading.closest(CONTAINER_SELECTORS) || heading.parentElement;
  };

  const insertGuide = (target, guideNode) => {
    const directHeader = Array.from(target.children || []).find((child) =>
      child.matches?.(DIRECT_HEADER_SELECTORS)
    );

    const anchorNode = directHeader || target;
    if (anchorNode) {
      const computedStyle = window.getComputedStyle(anchorNode);
      if (computedStyle.position === "static") {
        anchorNode.style.position = "relative";
      }
    }

    guideNode.style.position = "absolute";
    guideNode.style.top = directHeader ? "10px" : "12px";
    guideNode.style.right = "12px";

    if (directHeader) {
      directHeader.appendChild(guideNode);
      return;
    }

    const nestedHeader = target.querySelector(DIRECT_HEADER_SELECTORS);
    if (nestedHeader && target.contains(nestedHeader)) {
      const computedStyle = window.getComputedStyle(nestedHeader);
      if (computedStyle.position === "static") {
        nestedHeader.style.position = "relative";
      }
      guideNode.style.top = "10px";
      nestedHeader.appendChild(guideNode);
      return;
    }

    target.appendChild(guideNode);
  };

  const renderGuide = (guide, endpoints, pageNote) => {
    const wrapper = document.createElement("div");
    wrapper.className = "endpoint-inline-guide";
    wrapper.dataset.endpointInlineGuide = "true";

    const listMarkup = endpoints.length
      ? `
        <ul class="endpoint-inline-guide-list">
          ${endpoints
            .map((endpoint) => {
              const parts = splitEndpoint(endpoint);
              return `
                <li class="endpoint-inline-guide-item">
                  <span class="endpoint-inline-guide-method">${parts.method || "API"}</span>
                  <span>${parts.path || endpoint}</span>
                </li>
              `;
            })
            .join("")}
        </ul>
      `
      : '<div class="endpoint-inline-guide-empty">연결된 전용 backend endpoint가 문서에 정의되어 있지 않습니다.</div>';

    const noteMarkup = [guide.note, guide.includePageNote ? pageNote : null]
      .filter(Boolean)
      .map((text) => `<div class="endpoint-inline-guide-note">${text}</div>`)
      .join("");

    wrapper.innerHTML = `
      <button
        class="endpoint-inline-guide-trigger"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-label="${guide.label || "Panel API"} 열기"
      >
        <span class="endpoint-inline-guide-kicker">API Guide</span>
      </button>
      <div class="endpoint-inline-guide-popover" role="dialog" aria-label="${guide.label || "Panel API"}">
        <div class="endpoint-inline-guide-head">
          <div class="endpoint-inline-guide-kicker">Connected API</div>
          <div class="endpoint-inline-guide-label">${guide.label || "Panel API"}</div>
        </div>
        ${guide.summary ? `<div class="endpoint-inline-guide-summary">${guide.summary}</div>` : ""}
        ${noteMarkup}
        ${listMarkup}
      </div>
    `;

    return wrapper;
  };

  const guideNodes = [];

  const buildHubGuides = (options) => {
    return [
      {
        selector: ".hero-shell",
        label: `${options.title} Summary API`,
        summary: options.heroSummary,
        endpoints: options.heroEndpoints
      },
      {
        selector: "#resource-panel",
        label: `${options.title} Resource API`,
        summary: options.resourceSummary,
        endpoints: options.resourceEndpoints
      },
      {
        title: options.tipsTitle,
        label: "Tips Panel API",
        summary: options.tipsSummary,
        endpoints: [options.tipsEndpoint]
      },
      {
        title: options.linksTitle,
        label: "Guide Links API",
        summary: options.linksSummary,
        endpoints: [options.linksEndpoint]
      },
      {
        title: options.sideTitle,
        label: options.sideLabel,
        summary: options.sideSummary,
        endpoints: options.sideEndpoints
      }
    ].concat(
      (options.extraPanels || []).map((item) => ({
        title: item.title,
        label: item.label,
        summary: item.summary,
        endpoints: item.endpoints
      }))
    );
  };

  const fallbackLayouts = {
    "workspace_domain_hub.html": buildHubGuides({
      title: "Domain",
      heroSummary: "상단 통계, 필터, 검색 진입은 domain list/stats API에 연결됩니다.",
      heroEndpoints: [
        "GET /api/v2/domains (paged)",
        "GET /api/v2/domains/stats",
        "GET /api/v2/domains/filters",
        "GET /api/v2/search?q=&types=projects,domains,..."
      ],
      resourceSummary: "도메인 카드 본문, 생성, 수정, 바인딩, 오픈 정보는 이 API로 연결됩니다.",
      resourceEndpoints: [
        "GET /api/v2/domains (paged)",
        "GET /api/v2/domains/:id",
        "POST /api/v2/domains",
        "PATCH /api/v2/domains/:id",
        "DELETE /api/v2/domains/:id",
        "POST /api/v2/domains/:id/bind",
        "DELETE /api/v2/domains/:id/bind"
      ],
      tipsTitle: "DNS 운영 팁",
      tipsSummary: "운영 팁 패널은 공용 tips surface를 읽습니다.",
      tipsEndpoint: "GET /api/v2/panels/tips?surface=domains",
      linksTitle: "가이드 링크",
      linksSummary: "링크 패널은 공용 guide-links surface를 읽습니다.",
      linksEndpoint: "GET /api/v2/panels/guide-links?surface=domains",
      sideTitle: "현재 인증서 상태",
      sideLabel: "Certificate Panel API",
      sideSummary: "우측 인증서 레일은 certificate panel API에 연결됩니다.",
      sideEndpoints: [
        "GET /api/v2/domains/panels/certificates",
        "GET /api/v2/domains/:id/certificate"
      ],
      extraPanels: [
        {
          title: "현재 커넥션 상태",
          label: "Connection Panel API",
          summary: "우측 커넥션 레일은 connection panel API에 연결됩니다.",
          endpoints: [
            "GET /api/v2/domains/panels/connections",
            "GET /api/v2/domains/:id/connection"
          ]
        }
      ]
    }),
    "workspace_s3_hub.html": buildHubGuides({
      title: "Bucket",
      heroSummary: "상단 통계, 필터, 검색 진입은 bucket list/stats API에 연결됩니다.",
      heroEndpoints: [
        "GET /api/v2/buckets (paged)",
        "GET /api/v2/buckets/stats",
        "GET /api/v2/buckets/filters",
        "GET /api/v2/search?q=&types=projects,domains,..."
      ],
      resourceSummary: "버킷 카드 목록과 bind/open 액션은 이 API에 연결됩니다.",
      resourceEndpoints: [
        "GET /api/v2/buckets (paged)",
        "GET /api/v2/buckets/:id",
        "POST /api/v2/buckets",
        "PATCH /api/v2/buckets/:id",
        "DELETE /api/v2/buckets/:id",
        "POST /api/v2/buckets/:id/bind",
        "DELETE /api/v2/buckets/:id/bind/:projectId",
        "POST /api/v2/buckets/:id/open"
      ],
      tipsTitle: "버킷 운영 팁",
      tipsSummary: "운영 팁 패널은 buckets surface용 tips feed를 사용합니다.",
      tipsEndpoint: "GET /api/v2/panels/tips?surface=buckets",
      linksTitle: "가이드 링크",
      linksSummary: "링크 패널은 buckets surface용 guide-links feed를 사용합니다.",
      linksEndpoint: "GET /api/v2/panels/guide-links?surface=buckets",
      sideTitle: "현재 주요 버킷 사용량",
      sideLabel: "Usage Panel API",
      sideSummary: "우측 사용량 패널은 버킷 usage 집계 API에 연결됩니다.",
      sideEndpoints: ["GET /api/v2/buckets/panels/usage"]
    }),
    "workspace_permission_hub.html": buildHubGuides({
      title: "Permission",
      heroSummary: "상단 통계, 필터는 realm list/stats API에 연결됩니다.",
      heroEndpoints: [
        "GET /api/v2/permissions/realms (paged)",
        "GET /api/v2/permissions/realms/stats",
        "GET /api/v2/permissions/realms/filters"
      ],
      resourceSummary: "Realm 카드, 역할/멤버, CRUD 흐름이 이 패널에 연결됩니다.",
      resourceEndpoints: [
        "GET /api/v2/permissions/realms (paged)",
        "GET /api/v2/permissions/realms/:id",
        "POST /api/v2/permissions/realms",
        "PATCH /api/v2/permissions/realms/:id",
        "DELETE /api/v2/permissions/realms/:id",
        "GET /api/v2/permissions/realms/:id/roles",
        "GET /api/v2/permissions/realms/:id/members (paged)",
        "POST /api/v2/permissions/realms/:id/members",
        "DELETE /api/v2/permissions/realms/:id/members/:userId"
      ],
      tipsTitle: "권한 운영 팁",
      tipsSummary: "운영 팁 패널은 permissions surface용 tips feed를 사용합니다.",
      tipsEndpoint: "GET /api/v2/panels/tips?surface=permissions",
      linksTitle: "가이드 링크",
      linksSummary: "링크 패널은 permissions surface용 guide-links feed를 사용합니다.",
      linksEndpoint: "GET /api/v2/panels/guide-links?surface=permissions",
      sideTitle: "현재 요청 목록",
      sideLabel: "Request Inbox API",
      sideSummary: "우측 요청함 패널은 permission request API에 연결됩니다.",
      sideEndpoints: [
        "GET /api/v2/permissions/requests (paged)",
        "GET /api/v2/permissions/realms/:id/requests (paged)",
        "POST /api/v2/permissions/realms/:id/requests",
        "POST /api/v2/permissions/requests/:reqId/approve",
        "POST /api/v2/permissions/requests/:reqId/reject",
        "GET /api/v2/permissions/requests/:reqId"
      ]
    }),
    "workspace_database_hub.html": buildHubGuides({
      title: "Database",
      heroSummary: "상단 상태/필터는 database list/stats API를 참조합니다.",
      heroEndpoints: [
        "GET /api/v2/databases (paged)",
        "GET /api/v2/databases/stats",
        "GET /api/v2/databases/filters"
      ],
      resourceSummary: "DB 카드, restart, binding 조회는 이 API에 연결됩니다.",
      resourceEndpoints: [
        "GET /api/v2/databases (paged)",
        "GET /api/v2/databases/:id",
        "POST /api/v2/databases",
        "PATCH /api/v2/databases/:id",
        "DELETE /api/v2/databases/:id",
        "POST /api/v2/databases/:id/restart",
        "GET /api/v2/databases/:id/bindings"
      ],
      tipsTitle: "데이터 리소스 운영 팁",
      tipsSummary: "운영 팁 패널은 databases surface용 tips feed를 사용합니다.",
      tipsEndpoint: "GET /api/v2/panels/tips?surface=databases",
      linksTitle: "가이드 링크",
      linksSummary: "링크 패널은 databases surface용 guide-links feed를 사용합니다.",
      linksEndpoint: "GET /api/v2/panels/guide-links?surface=databases",
      sideTitle: "현재 Running 리소스 Healthy",
      sideLabel: "Health Panel API",
      sideSummary: "우측 health 패널은 DB health 집계 API에 연결됩니다.",
      sideEndpoints: ["GET /api/v2/databases/panels/health"]
    }),
    "workspace_tools_hub.html": buildHubGuides({
      title: "Console",
      heroSummary: "상단 상태/필터는 console list/stats API를 참조합니다.",
      heroEndpoints: [
        "GET /api/v2/consoles (paged)",
        "GET /api/v2/consoles/stats",
        "GET /api/v2/consoles/filters"
      ],
      resourceSummary: "콘솔 카드, start/stop/open, binding 액션이 이 API에 연결됩니다.",
      resourceEndpoints: [
        "GET /api/v2/consoles (paged)",
        "GET /api/v2/consoles/:id",
        "POST /api/v2/consoles",
        "DELETE /api/v2/consoles/:id",
        "POST /api/v2/consoles/:id/start",
        "POST /api/v2/consoles/:id/stop",
        "POST /api/v2/consoles/:id/open",
        "GET /api/v2/consoles/:id/bindings",
        "POST /api/v2/consoles/:id/bindings",
        "DELETE /api/v2/consoles/:id/bindings/:dbId"
      ],
      tipsTitle: "콘솔 운영 팁",
      tipsSummary: "콘솔 팁 패널은 consoles 전용 tips API를 사용합니다.",
      tipsEndpoint: "GET /api/v2/consoles/panels/tips",
      linksTitle: "가이드 링크",
      linksSummary: "가이드 링크 패널은 consoles 전용 guide-links API를 사용합니다.",
      linksEndpoint: "GET /api/v2/consoles/panels/guide-links",
      sideTitle: "현재 Running 콘솔 Healthy",
      sideLabel: "Health Panel API",
      sideSummary: "우측 health 패널은 console health 집계 API에 연결됩니다.",
      sideEndpoints: ["GET /api/v2/consoles/panels/health"]
    }),
    "workspace_agent_hub.html": buildHubGuides({
      title: "Agent",
      heroSummary: "상단 상태/필터는 agent list/stats API를 참조합니다.",
      heroEndpoints: [
        "GET /api/v2/agents (paged)",
        "GET /api/v2/agents/stats",
        "GET /api/v2/agents/filters"
      ],
      resourceSummary: "에이전트 카드, runtime, tools, open 액션이 이 API에 연결됩니다.",
      resourceEndpoints: [
        "GET /api/v2/agents (paged)",
        "GET /api/v2/agents/:id",
        "POST /api/v2/agents",
        "PATCH /api/v2/agents/:id",
        "DELETE /api/v2/agents/:id",
        "POST /api/v2/agents/:id/open",
        "GET /api/v2/agents/:id/runtime",
        "GET /api/v2/agents/:id/tools"
      ],
      tipsTitle: "Agent Hub 분리 기준",
      tipsSummary: "운영 기준 패널은 model/tips 계열 API와 연결됩니다.",
      tipsEndpoint: "GET /api/v2/panels/tips?surface=agents",
      linksTitle: "연결 기준",
      linksSummary: "연결 기준 패널은 guide-links surface에 연결됩니다.",
      linksEndpoint: "GET /api/v2/panels/guide-links?surface=agents",
      sideTitle: "현재 서비스 상태",
      sideLabel: "Runtime Status API",
      sideSummary: "우측 상태 패널은 runtime-status panel API에 연결됩니다.",
      sideEndpoints: ["GET /api/v2/agents/panels/runtime-status"],
      extraPanels: [
        {
          title: "Agent Hub 분리 기준",
          label: "Agent Modeling API",
          summary: "이 패널은 agent runtime/model 판단 기준 API도 함께 봅니다.",
          endpoints: ["GET /api/v2/agents/panels/models"]
        }
      ]
    }),
    "workspace_chatbot_hub.html": buildHubGuides({
      title: "Chatbot",
      heroSummary: "상단 상태/필터는 chatbot list/stats API를 참조합니다.",
      heroEndpoints: [
        "GET /api/v2/chatbots (paged)",
        "GET /api/v2/chatbots/stats",
        "GET /api/v2/chatbots/filters"
      ],
      resourceSummary: "챗봇 카드, endpoint/channel 조회, open 액션이 이 API에 연결됩니다.",
      resourceEndpoints: [
        "GET /api/v2/chatbots (paged)",
        "GET /api/v2/chatbots/:id",
        "POST /api/v2/chatbots",
        "PATCH /api/v2/chatbots/:id",
        "DELETE /api/v2/chatbots/:id",
        "POST /api/v2/chatbots/:id/open",
        "GET /api/v2/chatbots/:id/endpoints",
        "POST /api/v2/chatbots/:id/endpoints",
        "DELETE /api/v2/chatbots/:id/endpoints/:endpointId",
        "GET /api/v2/chatbots/:id/channels"
      ],
      tipsTitle: "등록 모델",
      tipsSummary: "등록/배포 관점 패널은 registration panel API에 연결됩니다.",
      tipsEndpoint: "GET /api/v2/chatbots/panels/registration",
      linksTitle: "연결 허브",
      linksSummary: "연결 허브 패널은 guide-links surface에 연결됩니다.",
      linksEndpoint: "GET /api/v2/panels/guide-links?surface=chatbots",
      sideTitle: "현재 등록 상태",
      sideLabel: "Registration Status API",
      sideSummary: "우측 등록 상태 패널은 registration/publish queue panel API를 사용합니다.",
      sideEndpoints: [
        "GET /api/v2/chatbots/panels/registration",
        "GET /api/v2/chatbots/panels/publish-queue"
      ]
    }),
    "workspace_tool_inventory_hub.html": buildHubGuides({
      title: "Inventory",
      heroSummary: "상단 상태/필터는 inventory list/stats API를 참조합니다.",
      heroEndpoints: [
        "GET /api/v2/tool-inventory (paged)",
        "GET /api/v2/tool-inventory/stats",
        "GET /api/v2/tool-inventory/filters"
      ],
      resourceSummary: "inventory 카드, tool/consumer 조회, open 액션이 이 API에 연결됩니다.",
      resourceEndpoints: [
        "GET /api/v2/tool-inventory (paged)",
        "GET /api/v2/tool-inventory/:id",
        "POST /api/v2/tool-inventory",
        "PATCH /api/v2/tool-inventory/:id",
        "DELETE /api/v2/tool-inventory/:id",
        "POST /api/v2/tool-inventory/:id/open",
        "GET /api/v2/tool-inventory/:id/tools",
        "GET /api/v2/tool-inventory/:id/consumers"
      ],
      tipsTitle: "왜 Tool Inventories인가",
      tipsSummary: "설명 패널은 tool-inventory surface용 tips feed를 사용합니다.",
      tipsEndpoint: "GET /api/v2/panels/tips?surface=tool-inventory",
      linksTitle: "연결 흐름",
      linksSummary: "연결 흐름 패널은 guide-links surface를 사용합니다.",
      linksEndpoint: "GET /api/v2/panels/guide-links?surface=tool-inventory",
      sideTitle: "현재 연결 상태",
      sideLabel: "Connection Pulse API",
      sideSummary: "우측 상태 패널은 connection-pulse panel API에 연결됩니다.",
      sideEndpoints: ["GET /api/v2/tool-inventory/panels/connection-pulse"]
    }),
    "workspace_keycenter_hub.html": buildHubGuides({
      title: "Keycenter",
      heroSummary: "상단 카운트/필터는 tier list/stats API를 참조합니다.",
      heroEndpoints: [
        "GET /api/v2/keycenter/tiers (paged)",
        "GET /api/v2/keycenter/tiers/stats",
        "GET /api/v2/keycenter/tiers/filters"
      ],
      resourceSummary: "Tier 카드 본문은 tier CRUD 흐름에 직접 연결됩니다.",
      resourceEndpoints: [
        "GET /api/v2/keycenter/tiers (paged)",
        "GET /api/v2/keycenter/tiers/:id",
        "POST /api/v2/keycenter/tiers",
        "PATCH /api/v2/keycenter/tiers/:id",
        "DELETE /api/v2/keycenter/tiers/:id"
      ],
      tipsTitle: "Keycenter 운영 원칙",
      tipsSummary: "운영 원칙 패널은 keycenter surface용 tips feed를 사용합니다.",
      tipsEndpoint: "GET /api/v2/panels/tips?surface=keycenter",
      linksTitle: "연결 허브",
      linksSummary: "연결 허브 패널은 keycenter surface용 guide-links feed를 사용합니다.",
      linksEndpoint: "GET /api/v2/panels/guide-links?surface=keycenter",
      sideTitle: "모델별 사용량",
      sideLabel: "Key Usage API",
      sideSummary: "우측 사용량 패널은 key/tier/request 집계를 합쳐 보여주는 위치입니다.",
      sideEndpoints: [
        "GET /api/v2/keycenter/tiers (paged)",
        "GET /api/v2/keycenter/keys (paged)",
        "GET /api/v2/keycenter/requests (paged)"
      ]
    })
  };

  const guideLayouts = GUIDE_LAYOUTS[filename] || fallbackLayouts[filename] || [];

  guideLayouts.forEach((guide) => {
    const target = resolveTarget(guide);
    if (!target || target.querySelector("[data-endpoint-inline-guide]")) return;
    const guideNode = renderGuide(guide, resolveGuideEndpoints(guide), config.note);
    insertGuide(target, guideNode);
    guideNodes.push(guideNode);
  });

  if (!guideNodes.length) return;

  const syncGuideState = (guideNode) => {
    const trigger = guideNode.querySelector(".endpoint-inline-guide-trigger");
    if (trigger) {
      trigger.setAttribute("aria-expanded", guideNode.classList.contains("is-open") ? "true" : "false");
    }
  };

  const closeGuides = (exceptNode = null) => {
    guideNodes.forEach((guideNode) => {
      if (guideNode === exceptNode) return;
      guideNode.classList.remove("is-open");
      syncGuideState(guideNode);
    });
  };

  guideNodes.forEach((guideNode) => {
    const trigger = guideNode.querySelector(".endpoint-inline-guide-trigger");
    if (!trigger) return;

    syncGuideState(guideNode);

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const shouldOpen = !guideNode.classList.contains("is-open");
      closeGuides(shouldOpen ? guideNode : null);
      guideNode.classList.toggle("is-open", shouldOpen);
      syncGuideState(guideNode);
    });
  });

  document.addEventListener("click", (event) => {
    if (guideNodes.some((guideNode) => guideNode.contains(event.target))) return;
    closeGuides();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeGuides();
  });
})();
