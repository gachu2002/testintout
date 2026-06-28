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
      : '<div class="endpoint-inline-guide-empty">연결된 전용 backend endpoint가 아직 없습니다. 현재는 문서화된 v2 계약 또는 후속 분리 대상만 표시합니다.</div>';

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

  const resolveGuideEndpoints = (guide, groupMap) => {
    if (guide.endpoints) {
      return dedupe(guide.endpoints);
    }

    const fromGroups = (guide.groupLabels || []).flatMap((label) => {
      return groupMap.get(normalize(label)) || [];
    });

    return dedupe(fromGroups);
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

  const init = async () => {
    const filename = detectFilename();
    const config = await fetchGuideline(filename);

    if (!config || !Array.isArray(config.guides) || !config.guides.length) {
      return;
    }

    document.querySelectorAll("[data-endpoint-overlay], [data-endpoint-inline-guide]").forEach((node) =>
      node.remove()
    );

    ensureStyle();

    const groupMap = new Map(
      (config.groups || []).map((group) => [normalize(group.label), group.endpoints || []])
    );
    const guideNodes = [];

    config.guides.forEach((guide) => {
      const target = resolveTarget(guide);
      if (!target || target.querySelector("[data-endpoint-inline-guide]")) {
        return;
      }

      const guideNode = renderGuide(
        guide,
        resolveGuideEndpoints(guide, groupMap),
        config.note
      );
      insertGuide(target, guideNode);
      guideNodes.push(guideNode);
    });

    if (!guideNodes.length) {
      return;
    }

    const syncGuideState = (guideNode) => {
      const trigger = guideNode.querySelector(".endpoint-inline-guide-trigger");
      if (trigger) {
        trigger.setAttribute(
          "aria-expanded",
          guideNode.classList.contains("is-open") ? "true" : "false"
        );
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
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      void init();
    }, { once: true });
    return;
  }

  void init();
})();
