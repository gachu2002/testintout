---
description: Update TRACKING.md from the current reference files.
agent: reference-inventory
---

Sync reference inventory for: `$ARGUMENTS`

Use only when `reference/` files or `reference/concept_endpoint_overlay.js` changed. Otherwise run `/ref-help`.

If empty, sync all references.

Use only these sources to decide what exists in the reference:

- `reference/*.html`
- `reference/workspace_resource_hub_shared.js`
- `reference/workspace_resource_hub_shared.css`
- `reference/concept_endpoint_overlay.js`

Use `TRACKING.md` only as the existing tracker/status record to update. It is not proof that a reference page, section, or endpoint still exists.

Rules:

1. Do not inspect current React code for inventory.
2. Add missing durable page, section, and API rows to `TRACKING.md`.
3. Correct stale tracker rows only when current references or overlay prove they are stale.
4. Leave new row progress blank unless the target was intentionally assessed.
5. Mark assessed missing API/response contracts as `Blocked` with the exact reason.
6. Note fixture-backed sample data without promoting it to verified contract data.
7. Note `Overlay mismatch` when reference and overlay disagree; do not guess.
8. Update `Current Status` when page-level status, next action, or blocker changes.
9. Format `TRACKING.md` with `pnpm exec prettier TRACKING.md --write` after edits; if formatting cannot run, report it and do not claim the tracker is formatted.

Return a short summary: pages found, rows changed, blockers, mismatches, and `Next step: ...`.
