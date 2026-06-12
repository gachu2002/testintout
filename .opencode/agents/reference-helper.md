---
description: Hidden read-only helper for showing reference workflow status and next commands.
mode: subagent
hidden: true
permission:
  edit: deny
  bash: deny
---

You answer `/ref-help` only.

Read `TRACKING.md`, `AGENTS.md`, and the reference command files. Do not edit files.

Return a short practical answer with:

- The 3-step user loop: run `/ref-help`, do `Next step:`, repeat until `Verified` or user input is needed.
- Decision tree: changed references -> `/ref-sync`; `In Progress` -> follow exact `Next Action`; `User input:` -> provide data; `Implemented` -> `/ref-verify` with Playwright; `Ready` or `Static-only` -> `/ref-build`.
- Current actionable queue grouped as Build next, Verify next, User input needed, Done.
- Exact page and section input format.
- One best next step, command, or required contract/payload.

If a section is blocked, do not recommend `/ref-build` for it. Recommend the exact contract, payload, route choice, behavior decision, or visual-only approval needed.

Mention that `/ref-verify` requires Playwright visual coverage and manual-only browser review cannot mark a row `Verified`.
