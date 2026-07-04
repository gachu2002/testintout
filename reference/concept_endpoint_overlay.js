(() => {
  const GUIDELINE_ROUTE_PREFIX = "/api/v2/sample/guidelines";
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

  const detectFilename = () => {
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
      const match = candidate.match(/([A-Za-z0-9_-]+\.html)\b/);
      if (match) {
        return decodeURIComponent(match[1]);
      }
    }

    const path = window.location.pathname || "";
    const trimmedPath = path.replace(/\/+$/, "");
    const parts = trimmedPath.split("/").filter(Boolean);
    const lastPart = decodeURIComponent(parts[parts.length - 1] || "");

    if (!lastPart || lastPart === "sample") {
      return "index.html";
    }

    return lastPart.includes(".") ? lastPart : `${lastPart}.html`;
  };

  const ensureStyle = () => {
    if (document.querySelector("[data-endpoint-inline-style]")) return;

    const style = document.createElement("style");
    style.dataset.endpointInlineStyle = "true";
    style.textContent = `
    .endpoint-inline-guide-host {
      position: relative !important;
    }
    .endpoint-inline-guide-host[data-endpoint-guide-placement="header"] {
      padding-right: 120px;
    }
    .endpoint-inline-guide-host[data-endpoint-guide-placement="body"] {
      padding-top: 42px;
    }
    .endpoint-inline-guide-host[data-endpoint-guide-placement="below-actions"] {
      padding-top: 0;
    }
    .endpoint-inline-guide-slot {
      position: absolute;
      top: 10px;
      right: 12px;
      z-index: 18;
    }
    .endpoint-inline-guide-slot[data-endpoint-guide-placement="below-actions"] {
      position: relative;
      top: auto;
      right: auto;
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
    .endpoint-inline-guide {
      position: relative;
      z-index: 19;
      display: flex;
      justify-content: flex-end;
      max-width: 100%;
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
      position: relative;
      z-index: 2;
    }
    .endpoint-inline-guide-trigger:hover,
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
      width: min(560px, calc(100vw - 32px));
      max-height: min(60vh, 720px);
      overflow: auto;
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
      z-index: 20;
    }
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
    .endpoint-inline-guide-sections {
      display: grid;
      gap: 12px;
      margin-top: 12px;
    }
    .endpoint-inline-guide-section {
      display: grid;
      gap: 8px;
    }
    .endpoint-inline-guide-section-copy {
      display: grid;
      gap: 4px;
    }
    .endpoint-inline-guide-section-title {
      font-size: 12px;
      font-weight: 800;
      color: var(--t1, var(--text-1, #2f3236));
    }
    .endpoint-inline-guide-section-summary {
      font-size: 11px;
      line-height: 1.5;
      color: var(--t2, var(--text-2, #5f656d));
    }
    @media (max-width: 640px) {
      .endpoint-inline-guide-host[data-endpoint-guide-placement="header"] {
        padding-right: 108px;
      }
      .endpoint-inline-guide-host[data-endpoint-guide-placement="body"] {
        padding-top: 38px;
      }
      .endpoint-inline-guide-host[data-endpoint-guide-placement="below-actions"] {
        padding-top: 0;
      }
      .endpoint-inline-guide-slot {
        top: 8px;
        right: 10px;
      }
      .endpoint-inline-guide-slot[data-endpoint-guide-placement="below-actions"] {
        top: auto;
        right: auto;
        margin-top: 8px;
      }
      .endpoint-inline-guide-trigger {
        min-height: 28px;
        padding: 0 10px;
      }
      .endpoint-inline-guide-popover {
        left: auto;
        right: 0;
        width: min(420px, calc(100vw - 24px));
        max-height: min(55vh, 720px);
        padding: 12px;
      }
      .endpoint-inline-guide-item {
        grid-template-columns: 1fr;
      }
    }
  `;
    document.head.appendChild(style);
  };

  const HEADING_SELECTORS = [
    ".panel-title",
    ".list-title",
    ".resource-title",
    ".hero-title",
    ".page-title",
    ".publish-section-title",
    ".gallery-section-title",
    ".section-title",
    ".widget-title",
    ".chart-title",
    ".banner-title",
    ".card-title",
    ".time-title",
    ".pipe-title",
    ".ops-title",
    ".hub-briefing-title",
    ".hub-publish-section-head h3",
    ".hub-invite-section-head h3"
  ].join(", ");

  const CONTAINER_SELECTORS = [
    ".panel",
    ".gallery-section",
    ".section",
    ".widget",
    ".banner",
    ".card",
    ".publish-panel",
    ".hub-publish-panel",
    ".hub-invite-panel",
    ".timeline-panel",
    ".pipeline-panel",
    ".hub-briefing-panel",
    ".hub-briefing-rail",
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
    ".gallery-section-head",
    ".publish-section-head",
    ".hub-publish-section-head",
    ".hub-briefing-head",
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

  const createGuideSections = (guide, groupMap, pageNote) => {
    const endpoints = guide.endpoints
      ? dedupe(guide.endpoints)
      : dedupe(
          (guide.groupLabels || []).flatMap((label) => {
            return groupMap.get(normalize(label)) || [];
          })
        );

    return {
      summary: guide.summary || "",
      notes: [guide.note, guide.includePageNote ? pageNote : null].filter(Boolean),
      endpoints
    };
  };

  const renderGuide = (guide, sections) => {
    const wrapper = document.createElement("div");
    wrapper.className = "endpoint-inline-guide";
    wrapper.dataset.endpointInlineGuide = "true";
    if (guide.anchorSelector) {
      wrapper.dataset.endpointAnchorSelector = guide.anchorSelector;
    }
    if (guide.placement) {
      wrapper.dataset.endpointPlacement = guide.placement;
    }

    const noteMarkup = sections.notes
      .map((note) => `<div class="endpoint-inline-guide-note">${note}</div>`)
      .join("");

    const listMarkup = sections.endpoints.length
      ? `
        <ul class="endpoint-inline-guide-list">
          ${sections.endpoints
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
      : '<div class="endpoint-inline-guide-empty">연결된 전용 backend endpoint가 아직 없습니다. 현재는 문서화된 v2 계약 또는 후속 분리 대상만 표시합니다.</div>';

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
      <div class="endpoint-inline-guide-popover" role="dialog" aria-label="${guide.label || "Panel API"}" hidden>
        <div class="endpoint-inline-guide-head">
          <div class="endpoint-inline-guide-kicker">Connected API</div>
          <div class="endpoint-inline-guide-label">${guide.label || "Panel API"}</div>
        </div>
        ${sections.summary ? `<div class="endpoint-inline-guide-summary">${sections.summary}</div>` : ""}
        ${noteMarkup}
        ${listMarkup}
      </div>
    `;

    return wrapper;
  };

  const insertGuide = (target, guideNode) => {
    const anchorSelector = guideNode.dataset.endpointAnchorSelector;
    if (anchorSelector) {
      const anchorTarget = target.querySelector(anchorSelector);
      if (anchorTarget && target.contains(anchorTarget)) {
        const slot = document.createElement("div");
        slot.className = "endpoint-inline-guide-slot";
        slot.dataset.endpointGuideSlot = "true";
        slot.dataset.endpointGuidePlacement = guideNode.dataset.endpointPlacement || "below-actions";
        slot.appendChild(guideNode);

        anchorTarget.classList.add("endpoint-inline-guide-host");
        anchorTarget.dataset.endpointGuidePlacement = slot.dataset.endpointGuidePlacement;
        anchorTarget.appendChild(slot);
        return;
      }
    }

    const directHeader = Array.from(target.children || []).find((child) =>
      child.matches?.(DIRECT_HEADER_SELECTORS)
    );
    const nestedHeader = directHeader || target.querySelector(DIRECT_HEADER_SELECTORS);

    const slot = document.createElement("div");
    slot.className = "endpoint-inline-guide-slot";
    slot.dataset.endpointGuideSlot = "true";
    slot.appendChild(guideNode);

    if (nestedHeader && target.contains(nestedHeader)) {
      nestedHeader.classList.add("endpoint-inline-guide-host");
      nestedHeader.dataset.endpointGuidePlacement = "header";
      nestedHeader.appendChild(slot);
      return;
    }

    target.classList.add("endpoint-inline-guide-host");
    target.dataset.endpointGuidePlacement = "body";
    target.insertBefore(slot, target.firstChild);
  };

  const hasExistingGuide = (target) => {
    return Array.from(target.children || []).some((child) => {
      return (
        child.matches?.("[data-endpoint-guide-slot]") ||
        child.matches?.("[data-endpoint-inline-guide]")
      );
    });
  };

  const fetchGuideline = async (filename) => {
    try {
      const response = await fetch(
        `${GUIDELINE_ROUTE_PREFIX}/${encodeURIComponent(filename)}`,
        {
          credentials: "same-origin",
          headers: {
            Accept: "application/json"
          }
        }
      );

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.warn("[sample-guideline] failed to load", filename, error);
      return null;
    }
  };

  let activeGuideNodes = [];
  let documentListenersBound = false;

  const syncGuideState = (guideNode) => {
    const trigger = guideNode.querySelector(".endpoint-inline-guide-trigger");
    const popover = guideNode.querySelector(".endpoint-inline-guide-popover");
    const isOpen = guideNode.classList.contains("is-open");
    if (trigger) {
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
    if (popover) {
      popover.hidden = !isOpen;
    }
  };

  const closeGuides = (exceptNode = null) => {
    activeGuideNodes.forEach((guideNode) => {
      if (guideNode === exceptNode) return;
      guideNode.classList.remove("is-open");
      syncGuideState(guideNode);
    });
  };

  const bindDocumentListeners = () => {
    if (documentListenersBound) return;
    documentListenersBound = true;

    document.addEventListener("click", (event) => {
      if (activeGuideNodes.some((guideNode) => guideNode.contains(event.target))) return;
      closeGuides();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      closeGuides();
    });
  };

  const init = async () => {
    const filename = detectFilename();
    const config = await fetchGuideline(filename);

    if (!config) {
      return;
    }

    document
      .querySelectorAll("[data-endpoint-overlay], [data-endpoint-inline-guide], [data-endpoint-guide-slot]")
      .forEach((node) => node.remove());

    ensureStyle();
    activeGuideNodes = [];
    const groupMap = new Map(
      (config.groups || []).map((group) => [normalize(group.label), group.endpoints || []])
    );

    (config.guides || []).forEach((guide) => {
      const target = resolveTarget(guide);
      if (!target || hasExistingGuide(target)) {
        return;
      }

      const sections = createGuideSections(guide, groupMap, config.note);
      const guideNode = renderGuide(guide, sections);
      insertGuide(target, guideNode);
      activeGuideNodes.push(guideNode);
    });

    if (!activeGuideNodes.length) {
      return;
    }

    activeGuideNodes.forEach((guideNode) => {
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

    bindDocumentListeners();
  };

  window.refreshConceptEndpointOverlay = () => {
    void init();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.refreshConceptEndpointOverlay();
    }, { once: true });
    return;
  }

  window.refreshConceptEndpointOverlay();
})();
