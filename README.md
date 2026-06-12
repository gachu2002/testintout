# AX Studio App Gallery Demo

Lean production-style React setup for rewriting legacy workspace screens.

## Stack

- React 18, React DOM, Vite, TypeScript
- MUI Core and Icons
- TanStack React Query
- Axios
- React Router DOM
- Zustand

## Commands

- `pnpm install`
- `pnpm dev`
- `pnpm lint`
- `pnpm format:check`
- `pnpm typecheck`
- `pnpm build`
- `pnpm check`
- `pnpm visual`
- `pnpm visual -- --list`
- `pnpm visual -- --grep "Page :: Section"`
- `pnpm visual -- --grep "Page :: Section" --debug`
- `pnpm visual:strict`
- `pnpm visual:update`

## Start Here

Most users only need this loop:

1. Run `/ref-help`.
2. Do the returned `Next step:`.
3. Repeat until the target is `Verified` or the workflow asks for user input.

Decision tree:

- Unsure what to do: `/ref-help`
- Reference files or overlay changed: `/ref-sync`
- Tracker says `User input: ...`: provide that exact contract, payload, route choice, behavior decision, or visual-only approval.
- Tracker says `/ref-build "Page :: Section"`: run that command.
- Tracker says `/ref-verify "Page :: Section"`: run that command.
- Tracker says `Verified`: that target is done.

Command formats:

- Full page: `/ref-build "Page Name"` or `/ref-verify "Page Name"`
- One section: `/ref-build "Page Name :: Section Name"` or `/ref-verify "Page Name :: Section Name"`

Status meanings:

- `Ready`: endpoint plus accepted response shape exists. Accepted sources are a documented backend/API contract, a user-provided sample payload, or a fixture explicitly approved as the contract for that exact endpoint.
- `Static-only`: `API Used` is `None` and all content/behavior is visible in the reference.
- `Blocked`: required endpoint, response shape, payload, route, UI behavior, or decision is missing.
- `Implemented`: React code exists and focused checks passed.
- `Verified`: reference comparison was accepted and `pnpm check` passed.

If endpoints, response contracts, sample payloads, UI behavior, or decisions are missing, the target section is marked `Blocked` instead of guessing. Visual-only mock approval can support `Implemented`, but dynamic/API behavior cannot become `Verified` until the response contract is accepted.

Record accepted contract sources and blockers in the relevant `TRACKING.md` notes so `/ref-help`, `/ref-build`, and `/ref-verify` make the same decision later.

Verification runbook:

- Use Playwright Test visual targets as the repeatable reference comparison workflow. Manual browser review can diagnose issues, but it does not make a row `Verified`.
- If the implemented target has no visual coverage, add or update a target in `tests/visual/visualTargets.ts` before acceptance.
- Run `pnpm visual -- --list` to confirm the target name.
- Run `pnpm visual -- --grep "Page :: Section"` for the focused row. The script starts the mock API and Vite, checks target text, and saves React/reference screenshots under `test-results`.
- Use `pnpm visual -- --grep "Page :: Section" --debug`, `pnpm visual -- --grep "Page :: Section" --headed`, or `pnpm exec playwright test tests/visual --ui` when browser-side debugging or locator discovery is useful.
- Debug Playwright Test artifacts with `pnpm exec playwright show-report` or `pnpm exec playwright show-trace <trace.zip>`.
- Run the broader relevant visual suite with `pnpm visual`, then run focused checks and `pnpm check` before marking tracker rows `Verified`.
- Run `pnpm visual:update -- --grep "Page :: Section"` only when intentionally accepting or refreshing screenshot baselines, then use `pnpm visual:strict -- --grep "Page :: Section"` for baseline comparison.
- If Playwright comparison is missing or the browser cannot launch, keep the row `Implemented` and note the exact environment/evidence gap in `TRACKING.md`.
- If response contracts are missing, mark or report the row `Blocked` with `Missing response contract`.

Playwright browsers and Linux system libraries are not installed by `pnpm install` in every environment. The `visual`, `visual:strict`, and `visual:update` scripts run `scripts/ensure-playwright-chromium.mjs` first. It installs Chromium if missing and, in sudo-less Linux environments, downloads known missing Chromium libraries into `/tmp/opencode/chrome-libs` for the existing `playwright.config.ts` fallback.

If the automatic fallback cannot resolve a new missing library, install the browser system dependencies with your environment's package manager or `pnpm exec playwright install-deps chromium` where sudo package installation is allowed. In restricted environments, extend the package map in `scripts/ensure-playwright-chromium.mjs` or set `PLAYWRIGHT_CHROMIUM_LIBRARY_PATH` to a directory containing the required shared libraries.

## Local Mock API

The mock API is a standalone Node server, not Vite middleware.

- Run `node mock-api/server.mjs` in one terminal to serve mock responses at `http://localhost:3001/api`.
- Run `pnpm dev` in another terminal for the Vite frontend at `http://localhost:3000`.
- Keep `VITE_API_BASE_URL=http://localhost:3001/api` in local env files when using the standalone mock server.
- Do not add mock API middleware to `vite.config.ts`; Vite should only serve the frontend.

## Structure

- `src/app`: application composition and global providers
- `src/config`: typed runtime configuration
- `src/features`: feature-owned API, hooks, components, and types
- `src/lib`: shared integrations such as Axios
- `src/pages`: page-level composition
- `src/routes`: React Router route declarations
- `src/stores`: small global Zustand stores
- `mock-api`: standalone mock API server and response fixtures

Keep business logic in feature folders first. Move code into `src/components` or `src/lib` only after it is reused across features.

Frontend code still uses the shared Axios client and explicit TypeScript response types. Add form, realtime, localization, toast, or MUI X packages only when a screen actively needs them.
