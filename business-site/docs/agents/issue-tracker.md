# Issue tracker: GitHub

Specs and execution tickets for this application live in [moonstachain/yuanli-strategy-web](https://github.com/moonstachain/yuanli-strategy-web/issues). Always select that repository explicitly: the Sites deployment workspace may have a different Git remote.

Use the authorized GitHub connector when available. The `gh` CLI is an equivalent interface when authenticated for the same repository. An unavailable interface does not establish that a write succeeded.

## Routing

1. Search the Web repository for an existing issue covering the same scope. Update or reference an existing owner instead of creating duplicate execution tickets.
2. Put the commercial website spec and its implementation tickets in the Web repository. Child tickets name the parent spec and any blocking tickets.
3. Keep portfolio registration, allocation and cross-project status in [os-yuanli/yuanli-pmo](https://github.com/os-yuanli/yuanli-pmo). PMO references the Web execution issue; it does not mirror each implementation task.
4. Route changes to method definitions to [moonstachain/yuanli-strategy-soul](https://github.com/moonstachain/yuanli-strategy-soul). Client-specific delivery and private evidence belong in the relevant private destination.

The user authorized project setup and implementation, then approved the website audit recommendations and requested optimization. Keep changes within the approved application scope and preserve the observed Site audience. Read `docs/OPTIMIZATION-SPEC.md` for this iteration's acceptance criteria and release boundary.

## Ticket contract

Each implementation ticket records its parent spec, outcome, scope, acceptance evidence, dependencies and source pointers. Use `Part of #<spec>` and `Blocked by: #<number>` at the top when native sub-issues or dependency edges are unavailable. Never invent an issue number or claim an edge was created without a successful write.

Use the current [PMO intake rules](https://github.com/os-yuanli/yuanli-pmo/blob/master/INTAKE-ROUTING.md) when recording CanonNode, PortfolioItem and CBM relationships. Existing method definitions remain authoritative; this site applies them. Unregistered portfolio identifiers and unverified capability mappings remain explicit gaps until recorded in their authoritative destination.

The new commercial website has its own execution spec [Web #38](https://github.com/moonstachain/yuanli-strategy-web/issues/38) and a separate portfolio registration. The existing media campaign is adjacent work; its completion and outcome states are independent.

## Operations

When a skill says “publish to the issue tracker,” create or update a GitHub issue in `moonstachain/yuanli-strategy-web`. When it says “fetch the relevant ticket,” read that issue including its current body, labels and discussion.

With `gh`, use an explicit repository for every operation:

```bash
gh issue view <number> --repo moonstachain/yuanli-strategy-web --json number,title,body,labels,comments
gh issue list --repo moonstachain/yuanli-strategy-web --state open --json number,title,body,labels
gh issue create --repo moonstachain/yuanli-strategy-web --title '<title>' --body-file <body-file>
gh issue edit <number> --repo moonstachain/yuanli-strategy-web --body-file <body-file>
```

Use structured connector fields or an exact UTF-8 body file for multiline text. Record dependency links in the issue body if the available connector cannot create native relationships. Apply only labels verified to exist; follow `triage-labels.md` for the fallback.

**PRs as a request surface: no.** PRs review implementation of already tracked work. Keep source changes on an isolated branch until the applicable review and release decision; a push to the parent repository's `main` triggers its existing public GitHub Pages deployment.

## Completion evidence

An issue is complete when its acceptance criteria have observed evidence. Distinguish implementation, local verification, private deployment and real user validation. An issue closure or successful build alone does not establish a business outcome. Contact acceptance evidence uses synthetic input and a verified server persistence/readback result; publish no raw personal submissions.

## Sources

- [PMO issue routing configuration](https://github.com/os-yuanli/yuanli-pmo/blob/master/docs/agents/issue-tracker.md)
- [Repository authority map](https://github.com/moonstachain/yuanli-strategy-soul/blob/main/governance/repository-authority-map-v1.yaml)
