---
description: Hidden helper for implementing reference pages or sections using project conventions.
mode: subagent
hidden: true
permission:
  bash:
    '*': allow
    'pnpm add*': ask
    'pnpm install*': ask
    'pnpm remove*': ask
    'npm install*': ask
    'npm uninstall*': ask
    'yarn add*': ask
    'rm *': deny
    'rmdir *': deny
    'unlink *': deny
    'shred *': deny
    'truncate *': deny
    'dd *': deny
    'mv *': deny
    'chmod *': ask
    'find * -delete*': deny
    'git commit*': deny
    'git push*': deny
    'git clean*': deny
    'git reset*': deny
    'git checkout*': deny
    'git restore*': deny
    'git switch*': deny
---

You implement reference rewrite work for this Vite, React, TypeScript project.

Always load the current target context from `TRACKING.md`, `reference/`, and `reference/concept_endpoint_overlay.js` before editing implementation code.

Rules:

- Resolve the target to exactly one tracker row before editing. Ask if the page, section, or route is ambiguous.
- Build one page section at a time when possible.
- Build only sections classified as `Ready` or `Static-only`.
- A dynamic section is `Ready` only when every required endpoint and accepted response contract source is available.
- Accepted response contract sources are a documented backend/API contract, a user-provided sample payload, or a fixture explicitly approved by the user as the contract for that exact endpoint.
- Record accepted contract sources in the relevant `TRACKING.md` row notes or API Contract Matrix notes before treating a section as ready.
- `Static-only` means `API Used` is `None` and all content/behavior is visible in the reference.
- Overlay-only rows are inventory/API maps, not visual build targets, unless the user provides a visual reference or explicitly approves visual-only implementation for the exact target.
- If any required information is missing or unclear, stop before editing that section and ask the user immediately.
- If dynamic data is required but no overlay endpoint exists, mark `Blocked`, note `Missing API contract`, and stop that section.
- If an overlay endpoint exists but no accepted response contract source is documented, mark `Blocked`, note `Missing response contract`, and stop that section.
- Blocked notes must name the exact missing endpoint, response, route, behavior, or decision and the user input needed to unblock it.
- Never infer fields, mock shapes, mock data, API behavior, routes, or TypeScript response types from the reference UI.
- Only create visual-only mock work when the user explicitly approves it for the exact section. Visual-only approval can support `Implemented`, not `Verified`, for dynamic/API behavior.
- For full-page builds, record blockers and continue with other independent ready sections. Stop immediately when the requested section itself is blocked, the route is ambiguous, or the blocker affects ordering.
- Do not mark `Verified`; mark `Implemented` only after React code exists and relevant focused checks pass. `/ref-verify` handles Playwright visual acceptance.
- Update the `Current Status` dashboard when page-level status, next action, or blocker changes.
- Format tracker edits with `pnpm exec prettier TRACKING.md --write`. If formatting cannot run, report it and do not claim the tracker is formatted.

Implementation conventions:

- Feature code goes in `src/features/<feature>/`.
- Page composition goes in `src/pages/`.
- Routes use `src/config/routes.ts` and `src/routes/AppRouter.tsx`.
- API calls use `src/lib/api/axios.ts`.
- Server state uses TanStack React Query.
- API data used by UI gets explicit TypeScript response types.
- Prefer existing MUI and workspace primitives.
- Add dependencies only when required.

Return only built sections, blocked sections, checks run, user decisions needed, and the next step.
