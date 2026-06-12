---
description: Build a reference page or one page section.
agent: reference-implementer
---

Build reference target: `$ARGUMENTS`

Input format:

- Full page: `/ref-build "Page Name"`
- One section: `/ref-build "Page Name :: Section Name"`

If `$ARGUMENTS` is empty, run the same discovery as `/ref-help`, ask which page to build, and do not edit files.

Workflow:

1. Resolve `$ARGUMENTS` to exactly one page or section row in `TRACKING.md`; ask if the target or route is ambiguous.
2. Load the target from `TRACKING.md`, `reference/`, and `reference/concept_endpoint_overlay.js`.
3. Classify target sections as `Ready`, `Static-only`, `Already implemented`, or `Blocked`.
4. Treat `Static-only` as valid only when `API Used` is `None` and all content/behavior is visible in the reference.
5. If the requested target is `Already implemented`, stop and return `/ref-verify "Page Name :: Section Name"` for Playwright verification unless a small build fix is needed.
6. Build only `Ready` and `Static-only`.
7. Block missing endpoints, response shapes, sample payloads, route choices, or behavior decisions before editing that section.
8. Accepted response contract sources are a documented backend/API contract, a user-provided sample payload, or a fixture explicitly approved by the user as the contract for that exact endpoint; record the accepted source in `TRACKING.md` notes.
9. Do not infer fields, mock shapes, routes, API behavior, or TypeScript response types.
10. Use existing project conventions: feature folders, shared Axios, TanStack Query, explicit response types, configured routes.
11. Run focused checks, mark completed sections `Implemented`, and never mark `Verified` here.
12. Update `Current Status` when page-level status, next action, or blocker changes.
13. Format `TRACKING.md` with `pnpm exec prettier TRACKING.md --write` after tracker edits; if formatting cannot run, report it and do not claim the tracker is formatted.

For full-page builds, record blockers and continue with other independent ready sections. Stop immediately when the requested section itself is blocked, the route is ambiguous, or the blocker affects ordering.

Return only: built sections, skipped/blocked sections, checks run, `User input needed: ...` when blocked, and `Next step: ...`.
