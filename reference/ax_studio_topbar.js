(() => {
  const logoDataUrl = "data:image/svg+xml,%3csvg%20width='35'%20height='20'%20viewBox='0%200%2035%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M16.7961%2010.1421L21.022%2014.368C23.4543%2016.8004%2027.398%2016.8004%2029.8303%2014.368C32.2627%2011.9356%2032.2627%207.99197%2029.8303%205.5596C27.398%203.12723%2023.4543%203.12723%2021.022%205.5596L20.723%205.85861L18.7019%203.83756L19.0009%203.53856C22.5495%20-0.0100035%2028.3028%20-0.0100042%2031.8514%203.53856C35.4%207.08712%2035.4%2012.8405%2031.8514%2016.389C28.3028%2019.9376%2022.5495%2019.9376%2019.0009%2016.389L12.5757%209.96379L14.5948%207.9447L16.7941%2010.144L16.7961%2010.1421ZM17.6605%208.92103L19.6782%206.90332L17.6572%204.88228L15.6395%206.89998L17.6605%208.92103Z'%20fill='%236D6E72'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M14.3637%205.63217L18.6416%209.91016L18.6428%209.90899L20.7901%2012.0562L22.8099%2010.0364L16.3847%203.61113C12.8361%200.0625671%207.08278%200.0625666%203.53422%203.61113C-0.0143374%207.15969%20-0.0143374%2012.913%203.53422%2016.4616C7.08278%2020.0102%2012.8361%2020.0102%2016.3847%2016.4616L16.6801%2016.1662L14.6591%2014.1452L14.3637%2014.4406C11.9313%2016.8729%207.98764%2016.8729%205.55527%2014.4406C3.1229%2012.0082%203.1229%208.06454%205.55527%205.63217C7.98764%203.1998%2011.9313%203.1998%2014.3637%205.63217ZM15.7038%2013.1004L17.7248%2015.1215L19.7453%2013.101L17.7243%2011.0799L15.7038%2013.1004Z'%20fill='%23A50034'/%3e%3crect%20x='15.376'%20y='12.7714'%20width='2.85369'%20height='5.21909'%20transform='rotate(-45%2015.376%2012.7714)'%20fill='%236D6E72'/%3e%3c/svg%3e";
  const SERVICE_MENU_API = "/api/v2/launchpad/service-menu";

  const defaultServiceGroups = [
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
        { key: "keycenter", title: "Keycenter", desc: "발급된 LLM 키와 연결된 사용처를 관리", icon: "vpn_key", href: "workspace_keycenter_hub.html" }
      ]
    },
    {
      title: "Support",
      links: [
        { key: "messages", title: "Message Center", desc: "수신, 발신, 요청, 승인 메시지를 한 화면에서 관리", icon: "mark_email_unread", href: "workspace_message_hub.html" },
        { key: "docs", title: "다큐먼트", desc: "가이드와 운영 문서를 확인합니다", icon: "description", href: "#" },
        { key: "about-dej", title: "About DEJ", desc: "DEJ의 역사와 CEJ·DEJ 흐름을 확인합니다", icon: "timeline", href: "about_dej.html" },
        { key: "chatbot", title: "챗봇", desc: "지원 챗봇으로 빠르게 문의합니다", icon: "chat_bubble_outline", href: "dej_chatbot_trial.html" },
        { key: "request", title: "요청하기", desc: "기능 요청이나 승인 요청을 바로 등록합니다", icon: "campaign", href: "workspace_message_hub.html?box=requests" }
      ]
    }
  ];

  const sampleHrefByApiHref = {
    "/workspace/app-gallery": "dej_app_gallery.html",
    "/workspace/ai-gallery": "dej_ai_gallery.html",
    "/workspace/domains": "workspace_domain_hub.html",
    "/workspace/permissions": "workspace_permission_hub.html",
    "/workspace/databases": "workspace_database_hub.html",
    "/workspace/buckets": "workspace_s3_hub.html",
    "/workspace/consoles": "workspace_tools_hub.html",
    "/workspace/projects": "workspace_projects_hub.html",
    "/workspace/jupyter": "#",
    "/workspace/agents": "workspace_agent_hub.html",
    "/workspace/chatbots": "workspace_chatbot_hub.html",
    "/workspace/tool-inventory": "workspace_tool_inventory_hub.html",
    "/workspace/keycenter": "workspace_keycenter_hub.html",
    "/docs/guides/getting-started": "#",
    "/docs/about-dej": "about_dej.html",
    "/support/chatbot": "dej_chatbot_trial.html",
    "/support/request": "#"
  };

  const activeKeyByApiHref = {
    "/workspace/app-gallery": "app-gallery",
    "/workspace/ai-gallery": "ai-gallery",
    "/workspace/domains": "domain",
    "/workspace/permissions": "permission",
    "/workspace/databases": "database",
    "/workspace/buckets": "s3",
    "/workspace/consoles": "tools",
    "/workspace/projects": "projects",
    "/workspace/jupyter": "jupyter",
    "/workspace/agents": "agent-hub",
    "/workspace/chatbots": "chatbot-hub",
    "/workspace/tool-inventory": "tool-inventory",
    "/workspace/keycenter": "keycenter",
    "/docs/guides/getting-started": "docs",
    "/docs/about-dej": "about-dej",
    "/support/chatbot": "chatbot",
    "/support/request": "request"
  };

  const materialIconByApiIcon = {
    app_gallery: "widgets",
    ai_gallery: "smart_toy",
    domain: "apartment",
    group: "groups",
    database: "storage",
    bucket: "folder",
    console: "web",
    project: "public",
    science: "science",
    workflow: "smart_toy",
    chat: "chat",
    inventory: "inventory_2",
    keycenter: "vpn_key",
    description: "description",
    timeline: "timeline",
    chat_bubble: "chat_bubble_outline",
    campaign: "campaign"
  };

  let serviceGroupsPromise = null;

  const externalServices = [
    { title: "DEJ 챗봇", desc: "Workspace 지원 챗봇", icon: "forum", href: "https://dej-chatbot.apps.hedej.lge.com" },
    { title: "HEANS", desc: "HEANS 서비스 바로가기", icon: "open_in_new", href: "https://workspace.hedej.lge.com/heans" },
    { title: "HEVPDS", desc: "HEVPDS 서비스 바로가기", icon: "open_in_new", href: "https://workspace.hedej.lge.com/hevpds" }
  ];

  const escapeHtml = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const escapeAttribute = escapeHtml;

  function normalizeApiLink(link = {}) {
    const apiHref = String(link.href || "").trim();
    const sampleHref = sampleHrefByApiHref[apiHref] || apiHref || "#";
    const key = activeKeyByApiHref[apiHref] || "";
    const title = String(link.label || link.title || "").trim() || "Untitled";
    const desc = String(link.description || "").trim();
    const icon = materialIconByApiIcon[String(link.icon || "").trim()] || String(link.icon || "").trim() || "link";

    return {
      key,
      title,
      desc,
      icon,
      href: sampleHref
    };
  }

  function normalizeServiceGroups(items) {
    if (!Array.isArray(items) || !items.length) {
      return defaultServiceGroups;
    }

    const groups = items
      .map((group) => ({
        title: String(group?.title || "").trim(),
        links: Array.isArray(group?.links) ? group.links.map(normalizeApiLink).filter((link) => link.title) : []
      }))
      .filter((group) => group.title && group.links.length);

    return groups.length ? groups : defaultServiceGroups;
  }

  async function loadServiceGroups() {
    if (!serviceGroupsPromise) {
      serviceGroupsPromise = fetch(SERVICE_MENU_API, {
        credentials: "same-origin",
        headers: {
          Accept: "application/json"
        }
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }

          const payload = await response.json();
          const items = Array.isArray(payload?.data?.items) ? payload.data.items : payload?.items;
          return normalizeServiceGroups(items);
        })
        .catch(() => defaultServiceGroups);
    }

    return serviceGroupsPromise;
  }

  const renderGroups = (serviceGroups, activeKey) => serviceGroups.map((group) => `
    <section class="service-group">
      <div class="service-group-head">
        <div class="service-group-copy">
          <div class="service-group-title-row">
            <div class="service-group-title">${escapeHtml(group.title)}</div>
          </div>
        </div>
      </div>
      <div class="service-links">
        ${group.links.map((link) => `
          <a class="service-link ${activeKey === link.key ? "is-current" : ""}" href="${escapeAttribute(link.href)}">
            <span class="material-icons-round service-link-icon">${escapeHtml(link.icon)}</span>
            <span class="service-link-copy">
              <span class="service-link-title">${escapeHtml(link.title)}</span>
              <span class="service-link-desc">${escapeHtml(link.desc)}</span>
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
          <a class="service-outlink" href="${escapeAttribute(link.href)}" target="_blank" rel="noopener noreferrer">
            <span class="material-icons-round service-outlink-icon">${escapeHtml(link.icon)}</span>
            <span class="service-outlink-copy">
              <span class="service-outlink-title">${escapeHtml(link.title)}</span>
              <span class="service-outlink-desc">${escapeHtml(link.desc)}</span>
            </span>
            <span class="material-icons-round service-outlink-arrow">north_east</span>
          </a>
        `).join("")}
      </div>
    </div>
  `;

  const mountTopbar = async (host) => {
    const activeKey = host.dataset.activeKey || "";
    const searchPlaceholder = host.dataset.searchPlaceholder || "서비스 검색 또는 챗봇에게 물어보세요";
    const searchSource = host.dataset.searchSource || activeKey || "";
    const searchSourceLabel = host.dataset.searchSourceLabel || "";
    const searchDefaultType = host.dataset.searchDefaultType || "";
    const launchpadHref = host.dataset.launchpadHref || "portal_launchpad.html";
    const settingsHref = host.dataset.settingsHref || "workspace_settings.html";
    const serviceGroups = await loadServiceGroups();

    host.innerHTML = `
      <header class="topbar">
        <div class="topbar-inner">
          <a class="topbar-brand" href="${escapeAttribute(launchpadHref)}" aria-label="AX Studio Launchpad">
            <span class="brand-mark" aria-hidden="true">
              <img src="${logoDataUrl}" alt="AX Studio" />
            </span>
            <span class="brand-name">AX Studio</span>
          </a>
          <div class="logo-menu" id="serviceMenuWrap">
            <button class="menu-trigger" id="serviceMenuButton" type="button" aria-label="전체 메뉴 열기" aria-haspopup="true" aria-expanded="false" aria-controls="serviceMenuPopover">
              <span class="material-icons-round">apps</span>
              <span class="material-icons-round menu-caret">expand_more</span>
            </button>
            <div class="service-popover" id="serviceMenuPopover" aria-labelledby="serviceMenuButton" hidden>
              <div class="service-popover-inner">
                <div class="service-groups">${renderGroups(serviceGroups, activeKey)}</div>
                ${renderExternalServices()}
              </div>
            </div>
          </div>
          <form class="search-wrap" action="portal_launchpad_search.html">
            <span class="material-icons-round ico">search</span>
            <input class="search-input" name="q" type="search" placeholder="${escapeAttribute(searchPlaceholder)}" aria-label="${escapeAttribute(searchPlaceholder)}" />
            ${searchSource ? `<input type="hidden" name="source" value="${escapeAttribute(searchSource)}" />` : ""}
            ${searchSourceLabel ? `<input type="hidden" name="sourceLabel" value="${escapeAttribute(searchSourceLabel)}" />` : ""}
            ${searchDefaultType ? `<input type="hidden" name="defaultType" value="${escapeAttribute(searchDefaultType)}" />` : ""}
            <span class="search-ai" aria-hidden="true"><span class="material-icons-round">auto_awesome</span><span>AI 검색 가능</span></span>
          </form>
          <div class="tb-spacer"></div>
          <div class="tb-icon"><span class="material-icons-round">notifications_none</span><div class="dot"></div></div>
          <a class="avatar avatar-link" href="${escapeAttribute(settingsHref)}" aria-label="설정 페이지 열기">TN</a>
        </div>
      </header>
    `;

    const menuWrap = host.querySelector("#serviceMenuWrap");
    const menuButton = host.querySelector("#serviceMenuButton");
    const menuPopover = host.querySelector("#serviceMenuPopover");

    if (!menuWrap || !menuButton || !menuPopover) return;

    const setOpen = (open) => {
      menuWrap.classList.toggle("is-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuPopover.hidden = !open;
    };

    setOpen(false);

    menuButton.addEventListener("click", (event) => {
      event.preventDefault();
      setOpen(!menuWrap.classList.contains("is-open"));
    });

    menuPopover.addEventListener("click", (event) => {
      if (event.target.closest(".service-link, .service-outlink")) setOpen(false);
    });

    document.addEventListener("click", (event) => {
      if (!menuWrap.contains(event.target)) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.focus();
      }
    });
  };

  window.mountAxStudioTopbar = mountTopbar;
  document.querySelectorAll("[data-ax-topbar]").forEach(mountTopbar);
})();
