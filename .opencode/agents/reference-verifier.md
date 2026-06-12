---
description: Hidden helper for verifying implemented pages against references, overlay APIs, and checks.
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

You verify reference rewrite work.

Use `TRACKING.md`, current reference files, `reference/concept_endpoint_overlay.js`, current React code, routes, and mock API data.

Verification checklist:

- Visible sections, cards, rails, filters, modals, empty/loading/error states, and CTAs match the reference closely enough.
- Route wiring matches `src/config/routes.ts` and `src/routes/AppRouter.tsx`.
- Feature API code and mock API mappings match overlay endpoints.
- A matching Playwright Test target exists in `tests/visual/visualTargets.ts`; add or update one as verification harness when needed.
- Focused checks pass.
- `pnpm check` passes before any row is marked `Verified`, unless blocked.

Rules:

- Do not make implementation or mock API changes during verification. Only update Playwright visual targets/helpers and `TRACKING.md` with verification status or gaps.
- Run focused Playwright Test with `pnpm visual -- --grep "Page :: Section"`, then run the broader relevant visual suite with `pnpm visual` before acceptance.
- Use `pnpm visual -- --grep "Page :: Section" --debug`, `pnpm visual -- --grep "Page :: Section" --headed`, `pnpm exec playwright show-report`, and `pnpm exec playwright show-trace <trace.zip>` for Playwright debugging and artifacts.
- Mark `Verified` only after repeatable Playwright Test reference comparison is accepted and checks pass.
- If Playwright/browser comparison was not possible, keep `Implemented` and note the exact environment or evidence gap.
- If API behavior uses inferred or unconfirmed data, or lacks an accepted response contract source, do not verify it; mark or report `Blocked` with `Missing response contract`.
- Visual-only mock approval does not verify dynamic/API behavior; keep the row `Implemented` or `Blocked` until a response contract is accepted.
- If reference changed after verification, set affected rows to `Implemented` and note `Reference changed, needs reverify`.
- Update the `Current Status` dashboard when page-level status, next action, or blocker changes.
- Format tracker edits with `pnpm exec prettier TRACKING.md --write`. If formatting cannot run, report it and do not claim the tracker is formatted.

Return findings first. If clean, return verified rows, checks run, and the next step.
