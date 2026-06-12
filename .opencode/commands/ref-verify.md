---
description: Verify an implemented page or section against references and checks.
agent: reference-verifier
---

Verify reference target: `$ARGUMENTS`

Input format:

- Full page: `/ref-verify "Page Name"`
- One section: `/ref-verify "Page Name :: Section Name"`

If `$ARGUMENTS` is empty, run the same status discovery as `/ref-help` and recommend the best implemented page or section to verify.

Workflow:

1. Locate target rows in `TRACKING.md`.
2. Read reference files and `reference/concept_endpoint_overlay.js`.
3. Read the current React implementation, routes, visual targets, and mock API data for the target.
4. Add or update Playwright Test visual coverage in `tests/visual/visualTargets.ts` when the implemented row has no matching target.
5. Compare visible sections, cards, rails, filters, modals, UI states, CTAs, route wiring, and API mappings through repeatable Playwright Test assertions/screenshots.
6. Do not make implementation or mock API changes during verification; only update verification harness files and `TRACKING.md` with status or gaps.
7. Run focused Playwright Test with `pnpm visual -- --grep "Page :: Section"`, then run the broader relevant visual suite with `pnpm visual`.
8. Use `pnpm visual -- --grep "Page :: Section" --debug`, `pnpm visual -- --grep "Page :: Section" --headed`, `pnpm exec playwright show-report`, and `pnpm exec playwright show-trace <trace.zip>` for Playwright debugging and artifacts.
9. Run focused checks, then `pnpm check` before marking any row `Verified` unless blocked.
10. Mark `Verified` only when repeatable Playwright Test comparison is accepted and checks pass.
11. Keep `Implemented` and note the exact gap when Playwright/browser comparison is missing or cannot launch.
12. Mark or report `Blocked` with `Missing response contract` when response contracts are missing.
13. Visual-only mock approval does not verify dynamic/API behavior; keep the row `Implemented` or `Blocked` until a response contract is accepted.
14. Update `Current Status` when verification changes page-level status or next action.
15. Format `TRACKING.md` with `pnpm exec prettier TRACKING.md --write` after tracker edits; if formatting cannot run, report it and do not claim the tracker is formatted.

Return findings first if there are issues. End with either `Next step: /ref-build "..."`, `User input needed: ...`, or the next verification command. If clean, return verified rows, checks run, and `Next step: ...`.
