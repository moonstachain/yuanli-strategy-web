# RAY commercial website

This application implements the approved RAY / 原力战略 commercial website. Its canonical source belongs in `moonstachain/yuanli-strategy-web`, under `business-site/`; the Sites workspace is a separate deployment mirror. Run application commands from this directory using its own package configuration.

## Boundaries

- Keep this application's source, dependencies and deployment isolated from the parent repository's Astro media application, Studio and Estate. Changes to the parent application's routes, build contracts or GitHub Pages workflow require their own explicit scope.
- Keep releases private for the current phase. Record the deployment identifier and observed access state as evidence; source publication and site visibility are separate states.
- Treat the GitHub repository as public. Store contact submissions and credentials only in the private application runtime; use synthetic fixtures and redacted evidence in code, issues and PRs.
- Present confirmed method facts, proposed services, teaching examples and verified outcomes as distinct content types. Resolve terminology through the domain sources below.

## Agent skills

### Issue tracker

Before creating, reading, triaging or updating a spec or execution ticket, read `docs/agents/issue-tracker.md`. Application work is tracked in `moonstachain/yuanli-strategy-web`; PMO holds portfolio references.

### Triage labels

Before applying a triage role, read `docs/agents/triage-labels.md`. The configuration inherits PMO's five-role mapping; label availability is a separate verified state.

### Domain docs

Before domain exploration, content changes or architectural decisions, read `docs/agents/domain.md`. This application uses one context, one application glossary and application-scoped ADRs.
