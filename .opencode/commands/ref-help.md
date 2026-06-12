---
description: Show the simple reference rewrite workflow, current status, and next step.
agent: reference-helper
---

Show the simple workflow and the one best next step for this project.

Do not edit files. Read `TRACKING.md`, `AGENTS.md`, and the reference command files, then return:

1. The 3-step user loop: run `/ref-help`, do `Next step:`, repeat until `Verified` or user input is needed.
2. A compact decision tree: changed references -> `/ref-sync`; `In Progress` -> follow exact `Next Action`; `User input:` -> provide data; `Implemented` -> `/ref-verify` with Playwright; `Ready` or `Static-only` -> `/ref-build`.
3. The current actionable queue from `TRACKING.md`, grouped as: Build next, Verify next, User input needed, Done.
4. The exact page and section command format.
5. One best `Next step:`.

Keep the answer short and practical.

Normal commands users need:

- `/ref-help`
- `/ref-build "Page Name"`
- `/ref-verify "Page Name"`

Section-only format:

- `/ref-build "Page Name :: Section Name"`
- `/ref-verify "Page Name :: Section Name"`

Maintenance command:

- `/ref-sync` updates `TRACKING.md` only when reference files or overlay mappings change.

Explain that missing endpoints, response contracts, sample payloads, UI behavior, route choices, or decisions become `Blocked`. No mock shape or field inference is allowed. Visual-only approval can only support non-verified visual implementation for the exact approved section. `Verified` requires Playwright visual coverage, not manual-only browser review.

End with `Next step: ...`. If the next step is user input, say that directly instead of inventing a command.
