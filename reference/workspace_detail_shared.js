(function () {
  const config = window.DETAIL_PAGE_CONFIG;
  if (!config || !config.items || !Object.keys(config.items).length) return;

  const escapeAttribute = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const params = new URLSearchParams(window.location.search);
  const itemParam = config.paramName || "item";
  const requestedKey = params.get(itemParam);
  const keys = Object.keys(config.items);
  const currentKey = Object.prototype.hasOwnProperty.call(config.items, requestedKey) ? requestedKey : keys[0];
  const item = config.items[currentKey];

  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--bg", item.theme.bg || "#f6f7fb");
  rootStyle.setProperty("--brand", item.theme.brand);
  rootStyle.setProperty("--brand-h", item.theme.brandH || item.theme.brand);
  rootStyle.setProperty("--brand-bg", item.theme.brandBg);
  rootStyle.setProperty("--brand-soft", item.theme.brandSoft);
  rootStyle.setProperty("--accent", item.theme.accent || item.theme.brand);

  document.title = item.documentTitle || `${item.title} · ${config.pageTitle || config.hubLabel || "Detail"}`;

  const serviceGroups = [
    {
      title: "Gallery",
      links: [
        ["dej_app_gallery.html", "widgets", "App Gallery", "실행형 개발 앱과 워크스페이스 도구를 발견하고 살펴보기", "app-gallery"],
        ["dej_ai_gallery.html", "smart_toy", "AI Gallery", "챗봇과 tool 자산을 전시하고 재사용 흐름으로 연결", "ai-gallery"]
      ]
    },
    {
      title: "Accessibility",
      links: [
        ["workspace_domain_hub.html", "apartment", "Domain", "DNS 및 도메인 관리", "domain"],
        ["workspace_permission_hub.html", "groups", "Permission", "IAM 및 권한 관리", "permission"]
      ]
    },
    {
      title: "Storage",
      links: [
        ["workspace_database_hub.html", "storage", "Database", "데이터베이스 관리(MongoDB, PostgreSQL, Redis 등)", "database"],
        ["workspace_s3_hub.html", "folder", "Buckets", "S3 스토리지 및 버킷 관리", "s3"]
      ]
    },
    {
      title: "Development",
      links: [
        ["workspace_tools_hub.html", "web", "Consoles", "데이터베이스 웹 콘솔 모음", "tools"],
        ["workspace_projects_hub.html", "public", "Project/Publish", "개발 프로젝트 관리(IDE 작업 공간)", "projects"],
        ["#", "science", "Jupyter", "노트북 실험 및 분석 환경", "jupyter"]
      ]
    },
    {
      title: "AI",
      links: [
        ["workspace_agent_hub.html", "smart_toy", "Workflow", "Dify workflow와 승인형 자동화 런타임을 운영", "agent-hub"],
        ["workspace_chatbot_hub.html", "chat", "Chatbot", "API와 Frontend URL 기반 챗봇 엔드포인트를 관리", "chatbot-hub"],
        ["workspace_tool_inventory_hub.html", "inventory_2", "Tool Inventory", "에이전트가 사용하는 연결된 MCP 및 도구 자산을 관리", "tool-inventory"],
        ["workspace_keycenter_hub.html", "vpn_key", "Keycenter", "발급된 LLM 키와 연결 상태를 관리", "keycenter"]
      ]
    },
    {
      title: "Support",
      links: [
        ["#", "description", "다큐먼트", "가이드와 운영 문서를 확인합니다", "docs"],
        ["about_dej.html", "timeline", "About DEJ", "DEJ의 역사와 CEJ·DEJ 흐름을 확인합니다", "about"],
        ["#", "chat_bubble_outline", "챗봇", "지원 챗봇으로 빠르게 문의합니다", "support-chat"],
        ["#", "campaign", "요청하기", "기능 요청이나 지원 요청을 등록합니다", "request"]
      ]
    }
  ];

  function renderServiceGroups() {
    return serviceGroups.map((group) => `
      <section class="service-group">
        <div class="service-group-title">${group.title}</div>
        <div class="service-links">
          ${group.links.map(([href, icon, title, desc, key]) => `
            <a class="service-link${key === config.activeHubKey ? " is-current" : ""}" href="${href}">
              <span class="material-icons-round service-link-icon">${icon}</span>
              <span class="service-link-copy">
                <span class="service-link-title">${title}</span>
                <span class="service-link-desc">${desc}</span>
              </span>
            </a>
          `).join("")}
        </div>
      </section>
    `).join("");
  }

  function renderActions(actions) {
    return (actions || []).map((action) => {
      const classes = `action-btn ${action.variant || "secondary"}`;
      const actionAttr = action.actionKey ? ` data-action-key="${action.actionKey}"` : "";
      const disabledAttr = action.disabled ? " disabled" : "";
      const iconHtml = `<span class="material-icons-round" style="font-size:18px;">${action.icon || "open_in_new"}</span>`;

      if (action.kind === "button") {
        return `
          <button class="${classes}" type="button"${actionAttr}${disabledAttr}>
            ${iconHtml}
            ${action.label}
          </button>
        `;
      }

      return `
        <a class="${classes}" href="${action.href || "#"}"${actionAttr}>
          ${iconHtml}
          ${action.label}
        </a>
      `;
    }).join("");
  }

  function renderStats(stats) {
    return (stats || []).map((stat) => `
      <article class="stat-card" data-stat-card="${stat.label}">
        <div class="stat-label">${stat.label}</div>
        <div class="stat-value">${stat.value}</div>
        <div class="stat-meta">${stat.meta || ""}</div>
      </article>
    `).join("");
  }

  function renderHeroBadges(itemConfig) {
    const badges = [];
    if (itemConfig.typeLabel) badges.push(`<span class="pill engine">${itemConfig.typeLabel}</span>`);
    if (itemConfig.statusLabel) badges.push(`<span class="pill tone-${itemConfig.statusTone || "healthy"}" data-status-pill>${itemConfig.statusLabel}</span>`);
    (itemConfig.heroBadges || []).forEach((badge) => badges.push(`<span class="pill engine">${badge}</span>`));
    return badges.join("");
  }

  const searchPlaceholder = item.searchPlaceholder || config.searchPlaceholder || "검색";
  const searchSource = config.searchSource || config.activeHubKey || "";
  const searchSourceLabel = config.searchSourceLabel || config.hubLabel || config.pageTitle || "";
  const searchDefaultType = config.searchDefaultType || "detail";

  const app = document.getElementById("app");
  app.innerHTML = `
    <div
      data-ax-topbar
      data-active-key="${escapeAttribute(config.activeHubKey || "")}"
      data-search-placeholder="${escapeAttribute(searchPlaceholder)}"
      data-search-source="${escapeAttribute(searchSource)}"
      data-search-source-label="${escapeAttribute(searchSourceLabel)}"
      data-search-default-type="${escapeAttribute(searchDefaultType)}"
    ></div>

    <main class="page">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="portal_launchpad.html">Launchpad</a>
        <span class="material-icons-round" aria-hidden="true">chevron_right</span>
        <a href="${config.hubHref}">${config.hubLabel}</a>
        <span class="material-icons-round" aria-hidden="true">chevron_right</span>
        <span>${item.title}</span>
      </nav>

      <section class="panel hero">
        <div class="hero-top">
          <div>
            <div class="eyebrow"><span class="material-icons-round" style="font-size:16px;">${item.heroIcon || "dashboard"}</span>${item.eyebrow || config.eyebrow || ""}</div>
            <div class="hero-title-row">
              <h1 class="hero-title">${item.title}</h1>
              ${renderHeroBadges(item)}
            </div>
            <p class="hero-desc">${item.description || ""}</p>
          </div>
          <div class="hero-actions">${renderActions(item.actions)}</div>
        </div>
        <div class="hero-stats">${renderStats(item.heroStats)}</div>
      </section>

      <div class="layout${item.layoutMode === "full-width" ? " is-full-width" : ""}">
        <div class="main-col">${item.mainHtml || ""}</div>
        ${item.sidebarHtml ? `
        <aside class="side-col">
          <div class="side-persistent">${item.sidebarHtml}</div>
        </aside>
        ` : ""}
      </div>
    </main>
  `;

  const logButtons = Array.from(document.querySelectorAll("[data-log-pod-button]"));
  const logPanels = Array.from(document.querySelectorAll("[data-log-pod-panel]"));

  if (logButtons.length && logPanels.length) {
    const setActivePod = (podName) => {
      logButtons.forEach((button) => {
        const active = button.dataset.logPodButton === podName;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", String(active));
      });

      logPanels.forEach((panel) => {
        const active = panel.dataset.logPodPanel === podName;
        panel.classList.toggle("is-active", active);
      });
    };

    logButtons.forEach((button) => {
      button.addEventListener("click", () => setActivePod(button.dataset.logPodButton));
    });
  }
})();
