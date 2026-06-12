# Workspace Frontend Demo Rules

## Project Goal

This repo is a Vite, React, TypeScript rewrite of legacy workspace reference screens. The reference implementation lives in `reference/`; React implementation lives under `src/`.

## Source Of Truth

- Use `TRACKING.md` as the project tracker for pages, sections, APIs, progress, and next actions.
- Use `reference/` as the visual and behavior source when rewriting screens.
- Use `reference/concept_endpoint_overlay.js` as the primary API contract map.
- Use reference files and overlay mappings for inventory; `TRACKING.md` records current knowledge but is not proof that a reference still exists.
- Use React code, mock API coverage, reference comparison, and checks for progress status.
- Leave tracker progress blank until a page or section is intentionally assessed.
- Mark `Verified` only after a Playwright visual target compares the React implementation against the relevant reference and the required checks pass.
- Do not create scattered temporary planning files. Put durable project status in `TRACKING.md`.

## Readiness And Blocking

- Agent decision tree: resolve one tracker row, classify it, build only `Ready` or `Static-only`, verify only `Implemented`, and block with the exact missing user input.
- Resolve the requested page or section to exactly one `TRACKING.md` row before editing. Ask if the page, section, or route is ambiguous.
- Classify each target section before editing: `Ready`, `Static-only`, `Already implemented`, or `Blocked`.
- `Ready` means every required endpoint plus response shape is available from an accepted contract source.
- Accepted contract sources are a documented backend/API response contract, a user-provided sample payload, or a fixture explicitly approved by the user as the contract for that exact endpoint.
- Record accepted contract sources in the relevant `TRACKING.md` row notes or API Contract Matrix notes before treating the section as ready.
- `Static-only` means `API Used` is `None` and all content/behavior is visible in the reference. Do not treat dynamic sections as static just because mock data could be invented.
- `Already implemented` means React code exists for the target; fix only small gaps during build and use `/ref-verify` for acceptance.
- `Blocked` means a required endpoint, response shape, sample payload, route choice, UI behavior, or decision is missing.
- Mark missing endpoints as `Blocked` with `Missing API contract`; mark missing response shapes or sample payloads as `Blocked` with `Missing response contract`.
- Blocked notes must name the exact missing endpoint, response, route, behavior, or decision and the user input needed to unblock it.
- Overlay-only pages are inventory/API maps, not visual build targets, unless the user provides a visual reference or explicitly approves visual-only implementation for the exact target.
- Visual-only mock approval can support `Implemented`; it does not allow `Verified` for dynamic/API behavior until the response contract is accepted.

## Reference Rewrite Workflow

- Start by identifying the exact `TRACKING.md` row and reference files for the requested page or section.
- Compare visible reference structure, section names, UI states, and API mappings before editing React code.
- For full-page builds, record blockers and continue with other independent ready sections. Stop immediately when the requested section itself is blocked, the route is ambiguous, or the blocker affects ordering.
- Stop and ask immediately when required information is missing or unclear.
- Do not infer fields, response shapes, mock data, API behavior, routes, or TypeScript response types from the reference UI.
- Dynamic sections are buildable only when every required endpoint and accepted response contract source is available.
- Only do visual-only mock work when explicitly approved for the exact page or section.
- Build one page section at a time when possible.
- Update `TRACKING.md` after meaningful progress: `Planned`, `In Progress`, `Implemented`, `Verified`, or `Blocked`.
- Update the `Current Status` dashboard in `TRACKING.md` when page-level status, next action, or blocker changes.
- If the reference and overlay disagree, note the mismatch in `TRACKING.md` instead of guessing silently.

## Implementation Conventions

- Keep feature code in `src/features/<feature>/` with colocated API, hooks, components, types, and small utilities.
- Keep page composition in `src/pages/` and route wiring in `src/routes/AppRouter.tsx` using `src/config/routes.ts` constants.
- Use the shared Axios client from `src/lib/api/axios.ts` for backend calls.
- Use TanStack React Query hooks for server state.
- Define explicit TypeScript response types for API data used by the UI.
- Badge tooltip info, including `sectionStatus.ts` evidence, blockers, next actions, fields, and API notes, must be detailed and must not include dates, times, timestamps, or temporal field names.
- Prefer existing MUI and workspace primitives before adding new shared components.
- Move code into `src/components` or `src/lib` only after it is reused across features.
- Add dependencies only when a screen actively needs them.

## Verification

- Prefer focused checks first, then broader checks when the work is complete.
- Available commands include `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build`, and `pnpm check`.
- Use Playwright Test visual targets as the repeatable reference comparison path. A row cannot become `Verified` from manual-only browser review.
- During `/ref-verify`, add or update a target in `tests/visual/visualTargets.ts` when the implemented row does not already have Playwright coverage.
- Run focused Playwright Test first with `pnpm visual -- --grep "Page :: Section"`, then run the broader relevant visual suite with `pnpm visual` before final acceptance.
- Use `pnpm visual -- --grep "Page :: Section" --debug`, `pnpm visual -- --grep "Page :: Section" --headed`, `pnpm exec playwright show-report`, and `pnpm exec playwright show-trace <trace.zip>` for Playwright debugging and artifacts.
- If Playwright/browser comparison is unavailable, keep the row `Implemented` and record the exact missing verification evidence or environment blocker.
- Run `pnpm check` before treating a feature/page as complete unless there is a clear blocker.
