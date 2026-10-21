# Domain docs

This application is **single-context**. Paths below are relative to the application root: this directory's project root in the Sites workspace, and `business-site/` when mirrored into `moonstachain/yuanli-strategy-web`.

## Before exploring

Read `GLOSSARY.md` and relevant decisions in `docs/adr/`. These hold application terms and application architecture. If a file or directory does not exist, proceed silently; use `domain-modeling` to create it when a term or decision actually needs resolution.

Use the glossary's vocabulary in code, tests, issues and design discussions. Surface conflicts with an existing ADR explicitly, with the affected decision and proposed reason for revisiting it.

## Authority boundaries

| Subject | Authoritative destination | Application usage |
| --- | --- | --- |
| 原力战略 definitions and method structure | [Soul Constitution](https://github.com/moonstachain/yuanli-strategy-soul/blob/main/CONSTITUTION.md) and its canonical glossary | Reference confirmed terms; register definition changes upstream. |
| Repository ownership and cross-repository authority | [Soul repository authority map](https://github.com/moonstachain/yuanli-strategy-soul/blob/main/governance/repository-authority-map-v1.yaml) | Preserve the Web repository's projection and user-action role. |
| Portfolio identity, priority and program status | [PMO PORTFOLIO](https://github.com/os-yuanli/yuanli-pmo/blob/master/PORTFOLIO.md) and project dossiers | Link to registered records; keep application execution in Web issues. |
| Capability component identifiers and maturity | [PMO CBM registry](https://github.com/os-yuanli/yuanli-pmo/blob/master/cbm/CELLS.md) | Reuse verified IDs and preserve their recorded status. |
| Application vocabulary and design decisions | `GLOSSARY.md` and `docs/adr/` | Define site-specific concepts and local technical decisions. |

Application ADRs describe choices such as application isolation, content modeling, submission persistence and access behavior. Cross-repository governance decisions retain their existing destination in `os-yuanli/os-governance/docs/decisions/`; this application's ADRs link to them when relevant.

## Content classification

Keep four distinctions visible in the content model and evidence:

- Confirmed method or biographical facts carry a traceable approved source.
- Proposed service packaging remains a proposal until approved for delivery and publication.
- Teaching examples are labeled as demonstrations and do not imply client results.
- Outcomes require attributable, publishable evidence and retain their validation limits.

The approved application scope is recorded in [Web #38](https://github.com/moonstachain/yuanli-strategy-web/issues/38). Method definitions remain governed by Soul. Keep private source material and personal submission data out of the public repository.
