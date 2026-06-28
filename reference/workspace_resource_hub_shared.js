(() => {
  const escapeAttribute = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const logoDataUrl = "data:image/svg+xml,%3csvg%20width='35'%20height='20'%20viewBox='0%200%2035%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M16.7961%2010.1421L21.022%2014.368C23.4543%2016.8004%2027.398%2016.8004%2029.8303%2014.368C32.2627%2011.9356%2032.2627%207.99197%2029.8303%205.5596C27.398%203.12723%2023.4543%203.12723%2021.022%205.5596L20.723%205.85861L18.7019%203.83756L19.0009%203.53856C22.5495%20-0.0100035%2028.3028%20-0.0100042%2031.8514%203.53856C35.4%207.08712%2035.4%2012.8405%2031.8514%2016.389C28.3028%2019.9376%2022.5495%2019.9376%2019.0009%2016.389L12.5757%209.96379L14.5948%207.9447L16.7941%2010.144L16.7961%2010.1421ZM17.6605%208.92103L19.6782%206.90332L17.6572%204.88228L15.6395%206.89998L17.6605%208.92103Z'%20fill='%236D6E72'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M14.3637%205.63217L18.6416%209.91016L18.6428%209.90899L20.7901%2012.0562L22.8099%2010.0364L16.3847%203.61113C12.8361%200.0625671%207.08278%200.0625666%203.53422%203.61113C-0.0143374%207.15969%20-0.0143374%2012.913%203.53422%2016.4616C7.08278%2020.0102%2012.8361%2020.0102%2016.3847%2016.4616L16.6801%2016.1662L14.6591%2014.1452L14.3637%2014.4406C11.9313%2016.8729%207.98764%2016.8729%205.55527%2014.4406C3.1229%2012.0082%203.1229%208.06454%205.55527%205.63217C7.98764%203.1998%2011.9313%203.1998%2014.3637%205.63217ZM15.7038%2013.1004L17.7248%2015.1215L19.7453%2013.101L17.7243%2011.0799L15.7038%2013.1004Z'%20fill='%23A50034'/%3e%3crect%20x='15.376'%20y='12.7714'%20width='2.85369'%20height='5.21909'%20transform='rotate(-45%2015.376%2012.7714)'%20fill='%236D6E72'/%3e%3c/svg%3e";

  const serviceGroups = [
    {
      title: "Gallery",
      links: [
        { key: "app-gallery", title: "App Gallery", desc: "실행형 개발 앱과 워크스페이스 도구를 발견하고 살펴보기", icon: "widgets", href: "dej_app_gallery.html" },
        { key: "ai-gallery", title: "AI Gallery", desc: "챗봇과 tool 자산을 전시하고 재사용 흐름으로 연결", icon: "smart_toy", href: "dej_ai_gallery.html" }
      ]
    },
    {
      title: "Accessibility",
      links: [
        { key: "domain", title: "Domain", desc: "DNS 및 도메인 관리", icon: "apartment", href: "workspace_domain_hub.html" },
        { key: "permission", title: "Permission", desc: "IAM 및 권한 관리", icon: "groups", href: "workspace_permission_hub.html" }
      ]
    },
    {
      title: "Storage",
      links: [
        { key: "database", title: "Database", desc: "데이터베이스 관리(MongoDB, PostgreSQL, Redis 등)", icon: "storage", href: "workspace_database_hub.html" },
        { key: "s3", title: "Buckets", desc: "S3 스토리지 및 버킷 관리", icon: "folder", href: "workspace_s3_hub.html" }
      ]
    },
    {
      title: "Development",
      links: [
        { key: "tools", title: "Consoles", desc: "데이터베이스 웹 콘솔 모음", icon: "web", href: "workspace_tools_hub.html" },
        { key: "projects", title: "Project/Publish", desc: "개발 프로젝트 관리(IDE 작업 공간)", icon: "public", href: "workspace_projects_hub.html" },
        { key: "jupyter", title: "Jupyter", desc: "노트북 실험 및 분석 환경", icon: "science", href: "#" }
      ]
    },
    {
      title: "AI",
      links: [
        { key: "agent-hub", title: "Workflow", desc: "Dify workflow와 승인형 자동화 런타임을 운영", icon: "smart_toy", href: "workspace_agent_hub.html" },
        { key: "chatbot-hub", title: "Chatbot", desc: "API와 Frontend URL 기반 챗봇 엔드포인트를 관리", icon: "chat", href: "workspace_chatbot_hub.html" },
        { key: "tool-inventory", title: "Tool Inventory", desc: "에이전트가 사용하는 연결된 MCP 및 도구 자산을 관리", icon: "inventory_2", href: "workspace_tool_inventory_hub.html" },
        { key: "keycenter", title: "Keycenter", desc: "발급된 LLM 키와 연결 상태를 관리", icon: "vpn_key", href: "workspace_keycenter_hub.html" }
      ]
    },
    {
      title: "Support",
      links: [
        { key: "docs", title: "다큐먼트", desc: "가이드와 운영 문서를 확인합니다", icon: "description", href: "#" },
        { key: "about-dej", title: "About DEJ", desc: "DEJ의 역사와 CEJ·DEJ 흐름을 확인합니다", icon: "timeline", href: "about_dej.html" },
        { key: "chatbot", title: "챗봇", desc: "지원 챗봇으로 빠르게 문의합니다", icon: "chat_bubble_outline", href: "dej_chatbot_trial.html" },
        { key: "request", title: "요청하기", desc: "기능 요청이나 지원 요청을 등록합니다", icon: "campaign", href: "#" }
      ]
    }
  ];

  const externalServices = [
    { title: "DEJ 챗봇", desc: "Workspace 지원 챗봇", icon: "forum", href: "https://dej-chatbot.apps.hedej.lge.com" },
    { title: "HEANS", desc: "HEANS 서비스 바로가기", icon: "open_in_new", href: "https://workspace.hedej.lge.com/heans" },
    { title: "HEVPDS", desc: "HEVPDS 서비스 바로가기", icon: "open_in_new", href: "https://workspace.hedej.lge.com/hevpds" }
  ];

  const toneClass = {
    healthy: "tone-healthy",
    stable: "tone-healthy",
    review: "tone-review",
    pending: "tone-pending",
    info: "tone-info",
    warn: "tone-warn",
    incident: "tone-incident",
    draft: "tone-draft",
    muted: "tone-muted"
  };

  const config = window.HUB_CONFIG;
  const app = document.getElementById("app");

  if (!config || !app) return;

  const searchContext = {
    source: config.searchSource || config.activeKey || "workspace-hub",
    sourceLabel: config.searchSourceLabel || config.title || "Workspace Hub",
    defaultType: config.searchDefaultType || "hub"
  };

  const theme = config.theme || {};
  const rootStyle = document.documentElement.style;
  [
    ["--bg", theme.bg],
    ["--brand", theme.brand],
    ["--brand-h", theme.brandH],
    ["--brand-bg", theme.brandBg],
    ["--brand-soft", theme.brandSoft],
    ["--accent-2", theme.accent2]
  ].forEach(([name, value]) => {
    if (value) rootStyle.setProperty(name, value);
  });

  if (config.documentTitle) document.title = config.documentTitle;

  const renderServiceGroups = () => serviceGroups.map((group) => `
    <section class="service-group">
      <div class="service-group-title">${group.title}</div>
      <div class="service-links">
        ${group.links.map((link) => `
          <a class="service-link ${config.activeKey === link.key ? "is-current" : ""}" href="${link.href}">
            <span class="material-icons-round service-link-icon">${link.icon}</span>
            <span class="service-link-copy">
              <span class="service-link-title">${link.title}</span>
              <span class="service-link-desc">${link.desc}</span>
            </span>
          </a>
        `).join("")}
      </div>
    </section>
  `).join("");

  const renderExternalServices = () => `
    <div class="service-outlinks" aria-label="외부 서비스 바로가기">
      <div class="service-outlinks-title">DEJ 시스템</div>
      <div class="service-outlink-list">
        ${externalServices.map((link) => `
          <a class="service-outlink" href="${link.href}" target="_blank" rel="noopener noreferrer">
            <span class="material-icons-round service-outlink-icon">${link.icon}</span>
            <span class="service-outlink-copy">
              <span class="service-outlink-title">${link.title}</span>
              <span class="service-outlink-desc">${link.desc}</span>
            </span>
            <span class="material-icons-round service-outlink-arrow">north_east</span>
          </a>
        `).join("")}
      </div>
    </div>
  `;

  const renderHeroStats = () => (config.heroStats || []).map((item) => `
    <article class="stat-card">
      <div class="stat-icon" style="background:${item.color || "linear-gradient(135deg,var(--brand),var(--accent-2))"}">
        <span class="material-icons-round">${item.icon}</span>
      </div>
      <div class="stat-copy">
        <div class="stat-value">${item.value}</div>
        <div class="stat-label">${item.label}</div>
        ${item.note ? `<div class="stat-note">${item.note}</div>` : ""}
      </div>
    </article>
  `).join("");

  const renderFilters = () => (config.filters || []).map((item, index) => `
    <button
      class="filter-chip ${index === 0 ? "is-active" : ""}"
      type="button"
      data-resource-filter="${item.id}"
      aria-selected="${index === 0 ? "true" : "false"}"
    >
      <span class="material-icons-round">${item.icon}</span>${item.label}
    </button>
  `).join("");

  const renderBreadcrumbs = () => {
    const items = config.breadcrumbs || [
      { label: "Launchpad", href: "portal_launchpad.html" },
      { label: config.breadcrumbLabel || config.title }
    ];

    return `
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        ${items.map((item, index) => `
          ${index > 0 ? `<span class="material-icons-round" aria-hidden="true">chevron_right</span>` : ""}
          ${item.href ? `<a href="${item.href}">${item.label}</a>` : `<span>${item.label}</span>`}
        `).join("")}
      </nav>
    `;
  };

  const renderDetails = (details) => (details || []).map((item) => `
    <span class="metric-chip">
      <span class="material-icons-round">${item.icon}</span>${item.text}
    </span>
  `).join("");

  const renderTags = (tags) => (tags || []).map((item) => `
    <span class="tag">
      <span class="material-icons-round">${item.icon}</span>${item.text}
    </span>
  `).join("");

  const renderOwnerBlock = (owner) => {
    if (!owner) return "";
    return `
      <div class="resource-owner-block">
        <div class="resource-subtitle">${owner.label || "Owner"}</div>
        <div class="resource-owner-card">
          <div class="resource-owner-avatar" style="background:${owner.color || "linear-gradient(135deg,var(--brand),var(--accent-2))"}">${owner.initials || "OW"}</div>
          <div class="resource-owner-copy">
            <div class="resource-owner-name">${owner.name || ""}</div>
            ${owner.meta ? `<div class="resource-owner-meta">${owner.meta}</div>` : ""}
          </div>
        </div>
      </div>
    `;
  };

  const renderUsageBlock = (usage) => {
    if (!usage) return "";
    const rawValue = Number(usage.value);
    const value = Number.isFinite(rawValue) ? Math.max(0, Math.min(100, rawValue)) : 0;
    return `
      <div class="resource-usage-block">
        <div class="resource-usage-head">
          <div class="resource-subtitle">${usage.label || "Usage"}</div>
          <div class="resource-usage-value">${value}%</div>
        </div>
        <div class="resource-usage-track">
          <div class="resource-usage-fill" style="width:${value}%; background:${usage.color || "linear-gradient(90deg,var(--brand),var(--accent-2))"}"></div>
        </div>
        ${usage.meta ? `<div class="resource-usage-meta">${usage.meta}</div>` : ""}
      </div>
    `;
  };

  const renderConnections = (connections) => (connections || []).map((item) => `
    <div class="db-connector">
      <div class="db-connector-badge" style="background:${item.color || "linear-gradient(135deg,var(--brand),var(--accent-2))"}">${item.abbr || "DB"}</div>
      <div class="db-connector-copy">
        <div class="db-connector-name">${item.name || ""}</div>
        ${item.meta ? `<div class="db-connector-meta">${item.meta}</div>` : ""}
      </div>
    </div>
  `).join("");

  const renderConnectionsBlock = (label, connections, options = {}) => {
    if (!(connections || []).length) return "";
    const maxItems = Number.isFinite(options.maxItems) ? options.maxItems : Infinity;
    const visibleConnections = (connections || []).slice(0, maxItems);
    const hiddenCount = Math.max(0, (connections || []).length - visibleConnections.length);
    const moreName = options.moreName || "추가 바인딩";
    const moreMeta = options.moreMeta || "나머지 항목은 생략";
    const classes = [
      "resource-connections",
      options.equalWidth ? "is-equal" : "",
      options.layoutClass || ""
    ].filter(Boolean).join(" ");

    return `
      <div class="resource-connections-block">
        <div class="resource-subtitle">${label || "Connected"}</div>
        <div class="${classes}">
          ${renderConnections(visibleConnections)}
          ${hiddenCount ? `
            <div class="db-connector db-connector-more">
              <div class="db-connector-badge">+${hiddenCount}</div>
              <div class="db-connector-copy">
                <div class="db-connector-name">${moreName}</div>
                <div class="db-connector-meta">${moreMeta}</div>
              </div>
            </div>
          ` : ""}
        </div>
      </div>
    `;
  };

  const renderResourceAction = (action) => {
    const classes = `resource-action-btn ${action.kind || "neutral"}${action.disabled ? " is-disabled" : ""}`;
    const icon = action.icon || "open_in_new";
    const label = action.label || "Action";

    if (action.href && !action.disabled) {
      return `<a class="${classes}" href="${action.href}"><span class="material-icons-round">${icon}</span>${label}</a>`;
    }

    return `<button class="${classes}" type="button" ${action.disabled ? "disabled" : ""}><span class="material-icons-round">${icon}</span>${label}</button>`;
  };

  const isPrimaryNavigationAction = (action) => {
    const label = (action?.label || "").trim().toLowerCase();
    return action?.kind === "open" && (label === "detail" || label === "open");
  };

  const getPrimaryResourceHref = (item) => {
    const primaryAction = (item.actions || []).find((action) => (
      action.href && !action.disabled && isPrimaryNavigationAction(action)
    ));

    if (primaryAction) return primaryAction.href;
    if (item.action?.href) return item.action.href;
    return "";
  };

  const renderResourceFooter = (item) => {
    const detailHref = getPrimaryResourceHref(item);
    const actions = (item.actions || []).filter((action) => {
      if (!detailHref) return true;
      return !(isPrimaryNavigationAction(action) && action.href === detailHref);
    });
    const hasActions = actions.length > 0;
    const hasLegacyLink = Boolean(item.action?.href) && item.action.href !== detailHref;

    if (!item.footer && !hasActions && !hasLegacyLink) return "";

    return `
      <div class="resource-footer">
        ${item.footer ? `<div class="footer-note"><span class="material-icons-round">schedule</span>${item.footer}</div>` : `<div class="footer-spacer"></div>`}
        <div class="resource-footer-actions">
          ${hasActions ? `<div class="resource-actions">${actions.map(renderResourceAction).join("")}</div>` : ""}
          ${hasLegacyLink ? `<a class="mini-link" href="${item.action.href}">${item.action.label}<span class="material-icons-round">chevron_right</span></a>` : ""}
        </div>
      </div>
    `;
  };

  const renderResources = () => (config.resources || []).map((item) => {
    const detailHref = getPrimaryResourceHref(item);

    return `
      <article class="resource-card" data-resource-card data-resource-tags="${(item.categories || []).join(" ")}">
        <div class="resource-top">
          <div>
            <div class="status-row">
              <span class="status-pill ${toneClass[item.status?.tone] || "tone-info"}">${item.status?.label || "Active"}</span>
              ${item.engine ? `<span class="engine-pill">${item.engine}</span>` : ""}
            </div>
            <div class="resource-name-row">
              <div class="resource-icon" style="background:${item.color || "linear-gradient(135deg,var(--brand),var(--accent-2))"}">
                <span class="material-icons-round">${item.icon || "hub"}</span>
              </div>
              <div class="resource-copy">
                <div class="resource-name">${detailHref ? `<a href="${detailHref}">${item.name}</a>` : item.name}</div>
                <div class="resource-meta">${item.meta || ""}</div>
              </div>
            </div>
          </div>
          <div class="menu-dot"><span class="material-icons-round">more_horiz</span></div>
        </div>
        ${(item.details || []).length ? `<div class="metric-list">${renderDetails(item.details)}</div>` : ""}
        ${renderUsageBlock(item.usage)}
        ${renderOwnerBlock(item.owner)}
        ${renderConnectionsBlock(item.connectionsLabel || "Connected DB", item.connections, {
          equalWidth: item.connectionsEqualWidth,
          maxItems: item.connectionsMaxItems,
          layoutClass: item.connectionsLayoutClass,
          moreName: item.connectionsMoreName,
          moreMeta: item.connectionsMoreMeta
        })}
        ${renderConnectionsBlock(item.secondaryConnectionsLabel || "Connected Consoles", item.secondaryConnections, {
          equalWidth: item.secondaryConnectionsEqualWidth,
          maxItems: item.secondaryConnectionsMaxItems,
          layoutClass: item.secondaryConnectionsLayoutClass,
          moreName: item.secondaryConnectionsMoreName,
          moreMeta: item.secondaryConnectionsMoreMeta
        })}
        ${(item.tags || []).length ? `
          <div class="resource-tags-block">
            ${item.tagsLabel ? `<div class="resource-subtitle">${item.tagsLabel}</div>` : ""}
            <div class="tag-list">${renderTags(item.tags)}</div>
          </div>
        ` : ""}
        ${renderResourceFooter(item)}
      </article>
    `;
  }).join("");

  const renderRows = (rows) => (rows || []).map((row) => `
    <div class="list-row">
      <div class="list-row-copy">
        <div class="list-row-title">${row.href ? `<a href="${row.href}">${row.title}</a>` : row.title}</div>
        <div class="list-row-meta">${row.meta || ""}</div>
      </div>
      ${row.pill ? `<span class="ops-pill ${toneClass[row.pill.tone] || "tone-info"}">${row.pill.label}</span>` : ""}
    </div>
  `).join("");

  const renderPanel = (panel) => `
    <section class="panel">
      <div class="sec-label"><span class="material-icons-round">${panel.icon}</span>${panel.label}</div>
      <div class="list-head">
        <div class="list-title">${panel.title}</div>
        ${panel.description ? `<div class="list-desc">${panel.description}</div>` : ""}
      </div>
      <div class="list-rows">${renderRows(panel.rows)}</div>
      ${panel.footerLink ? `<a class="panel-link" href="${panel.footerLink.href}">${panel.footerLink.label}<span class="material-icons-round">chevron_right</span></a>` : ""}
    </section>
  `;

  const renderSummary = () => {
    const summary = config.summary;
    if (!summary) return "";

    return `
      <section class="panel personal-rail-card summary-card">
        <div class="sec-label"><span class="material-icons-round">${summary.icon}</span>${summary.label}</div>
        <div class="summary-kicker"><span class="material-icons-round">monitoring</span>${summary.kicker}</div>
        <div class="summary-value">${summary.value}${summary.unit ? ` <small>${summary.unit}</small>` : ""}</div>
        <div class="summary-desc">${summary.description}</div>
        <div class="summary-metrics">
          ${(summary.metrics || []).map((item) => `
            <div class="summary-metric">
              <div class="summary-metric-icon" style="background:${item.color || "linear-gradient(135deg,var(--brand),var(--accent-2))"}">
                <span class="material-icons-round">${item.icon}</span>
              </div>
              <div class="summary-metric-copy">
                <div class="summary-metric-label">${item.label}</div>
                <div class="summary-metric-value">${item.value}</div>
                ${item.note ? `<div class="summary-metric-note">${item.note}</div>` : ""}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  };

  const renderSidebarPanels = () => (config.sidebarPanels || []).map((panel) => {
    if ((panel.rows || []).length) {
      return `
        <section class="panel personal-rail-card">
          <div class="sec-label"><span class="material-icons-round">${panel.icon}</span>${panel.label}${panel.linkLabel ? `<a class="sec-label-more" href="${panel.linkHref || "#"}">${panel.linkLabel} <span class="material-icons-round">chevron_right</span></a>` : ""}</div>
          <div class="list-head">
            ${panel.title ? `<div class="list-title">${panel.title}</div>` : ""}
            ${panel.description ? `<div class="list-desc">${panel.description}</div>` : ""}
          </div>
          <div class="list-rows">${renderRows(panel.rows)}</div>
          ${panel.footerLink ? `<a class="side-link" href="${panel.footerLink.href}">${panel.footerLink.label}<span class="material-icons-round">chevron_right</span></a>` : ""}
        </section>
      `;
    }

    return `
      <section class="panel personal-rail-card">
        <div class="sec-label"><span class="material-icons-round">${panel.icon}</span>${panel.label}${panel.linkLabel ? `<a class="sec-label-more" href="${panel.linkHref || "#"}">${panel.linkLabel} <span class="material-icons-round">chevron_right</span></a>` : ""}</div>
        <div class="side-list">
          ${(panel.items || []).map((item) => `
            <div class="side-item">
              <div class="side-bullet" style="background:${item.color || "linear-gradient(135deg,var(--brand),var(--accent-2))"}">
                <span class="material-icons-round">${item.icon}</span>
              </div>
              <div class="side-copy">
                <div class="side-title">${item.title}</div>
                <div class="side-meta">${item.meta}</div>
              </div>
            </div>
          `).join("")}
        </div>
        ${panel.footerLink ? `<a class="side-link" href="${panel.footerLink.href}">${panel.footerLink.label}<span class="material-icons-round">chevron_right</span></a>` : ""}
      </section>
    `;
  }).join("");

  const mainPanels = (config.mainPanels || []).map(renderPanel).join("");
  const hasMainPanels = Boolean(mainPanels.trim());
  const summaryMarkup = renderSummary();
  const sidebarMarkup = renderSidebarPanels();
  const hasSideContent = Boolean((summaryMarkup + sidebarMarkup).trim());

  app.innerHTML = `
    <div
      data-ax-topbar
      data-active-key="${escapeAttribute(config.activeKey || "")}"
      data-search-placeholder="${escapeAttribute(config.searchPlaceholder || "허브, 프로젝트, 리소스를 검색하세요...")}"
      data-search-source="${escapeAttribute(searchContext.source)}"
      data-search-source-label="${escapeAttribute(searchContext.sourceLabel)}"
      data-search-default-type="${escapeAttribute(searchContext.defaultType)}"
    ></div>

    <main class="page">
      ${renderBreadcrumbs()}

      <section class="panel hero-shell">
        <div class="hero-top">
          <div class="hero-copy">
            <div class="hero-kicker"><span class="material-icons-round">hub</span>${config.eyebrow || "Workspace Hub"}</div>
            <h1 class="hero-title">${config.title}</h1>
            <p class="hero-desc">${config.description}</p>
          </div>
          <div class="hero-actions">
            ${config.primaryAction ? `<a class="hero-btn primary" href="${config.primaryAction.href}"><span class="material-icons-round">${config.primaryAction.icon || "add_circle"}</span>${config.primaryAction.label}</a>` : ""}
            ${config.secondaryAction ? `<a class="hero-btn ghost" href="${config.secondaryAction.href}"><span class="material-icons-round">${config.secondaryAction.icon || "chevron_right"}</span>${config.secondaryAction.label}</a>` : ""}
          </div>
        </div>
        <div class="hero-stats">${renderHeroStats()}</div>
      </section>

      <section class="control-bar">
        <div class="filter-row" role="tablist" aria-label="${config.title} 필터">
          <span class="filter-label">View</span>
          ${renderFilters()}
        </div>
        <div class="control-actions">
          ${config.utilityAction ? `<a class="view-toggle-btn" href="${config.utilityAction.href}"><span class="material-icons-round">${config.utilityAction.icon || "menu_book"}</span>${config.utilityAction.label}</a>` : ""}
          ${config.createAction ? `<a class="create-btn" href="${config.createAction.href}"><span class="material-icons-round">${config.createAction.icon || "add_circle"}</span>${config.createAction.label}</a>` : ""}
        </div>
      </section>

      <div class="layout">
        <div class="main-col">
          <section class="panel resource-panel" id="resource-panel">
            <div class="sec-label"><span class="material-icons-round">${config.resourceSectionIcon || "widgets"}</span>${config.resourceSectionLabel || "Resource Overview"}</div>
            <div class="resource-head">
              <div class="resource-head-copy">
                <div class="resource-title">${config.resourceTitle}</div>
                <div class="resource-desc">${config.resourceDescription}</div>
              </div>
              ${config.resourceHeaderLink ? `<a class="panel-link" href="${config.resourceHeaderLink.href}">${config.resourceHeaderLink.label}<span class="material-icons-round">chevron_right</span></a>` : ""}
            </div>
            <div class="resource-grid" id="resourceGrid">${renderResources()}</div>
            <div class="empty-state" id="resourceEmptyState">선택한 필터에 맞는 리소스가 없습니다. 다른 뷰를 선택해보세요.</div>
          </section>

          ${hasMainPanels ? `<div class="panel-grid">${mainPanels}</div>` : ""}
        </div>

        ${hasSideContent ? `
          <aside class="side-col">
            ${summaryMarkup}
            ${sidebarMarkup}
          </aside>
        ` : ""}
      </div>
    </main>
  `;

  (() => {
    const tabs = Array.from(document.querySelectorAll("[data-resource-filter]"));
    const cards = Array.from(document.querySelectorAll("[data-resource-card]"));
    const emptyState = document.getElementById("resourceEmptyState");

    if (!tabs.length || !cards.length) return;

    const applyFilter = (filterId) => {
      let visibleCount = 0;

      tabs.forEach((tab) => {
        const active = tab.dataset.resourceFilter === filterId;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });

      cards.forEach((card) => {
        const tags = (card.dataset.resourceTags || "").split(/\s+/).filter(Boolean);
        const visible = filterId === "all" || tags.includes(filterId);
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      if (emptyState) emptyState.classList.toggle("is-visible", visibleCount === 0);
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        applyFilter(tab.dataset.resourceFilter || "all");
      });
    });

    applyFilter(tabs[0].dataset.resourceFilter || "all");
  })();
})();
