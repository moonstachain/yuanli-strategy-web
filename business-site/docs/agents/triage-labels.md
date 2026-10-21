# Triage labels

This application inherits the [PMO triage vocabulary](https://github.com/os-yuanli/yuanli-pmo/blob/master/docs/agents/triage-labels.md). Apply it to issues in `moonstachain/yuanli-strategy-web`.

| Canonical role in Matt Pocock skills | Configured tracker label | Meaning |
| --- | --- | --- |
| `needs-triage` | `[intake]` | Maintainer evaluates scope, routing and readiness. |
| `needs-info` | `needs-info` | A specific missing answer or evidence prevents a decision. |
| `ready-for-agent` | `ready-for-agent` | Scope, dependencies and acceptance criteria support agent implementation. |
| `ready-for-human` | `ready-for-human` | The next action requires a human decision or operation. |
| `wontfix` | `wontfix` | The issue will not be actioned; record the reason. |

## Availability and fallback

**Setup status on 2026-10-21: mapping configured.** `ready-for-agent` is verified on Web issues #38–#44 by successful issue creation responses. Other roles are configured for later use; their repository-level existence has not yet been verified. The current connector exposes no dedicated label-creation operation.

Before applying a label, inspect the repository's existing labels through an available read interface. Use the exact mapped label if it exists. If label creation is available and authorized, create only missing mapped labels, then verify the result.

When the interface cannot verify or create a label, keep the issue actionable with a plain `Triage role: <canonical-role>` field and record `Label sync: pending`. This is a temporary visibility fallback, not a second label vocabulary. Once synchronization succeeds, update the field and record the actual applied label.

Use one current triage role at a time. Triage labels represent readiness; they do not set portfolio priority, evidence maturity or business validation.
