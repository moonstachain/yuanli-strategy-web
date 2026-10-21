# 原力战略 Web

The root application is the existing Astro media and user-action frontend, including Studio and Estate. Its package scripts, route contracts and GitHub Pages workflow govern that application.

The RAY commercial website lives in the isolated `business-site/` application with a separate deployment. Before working in that directory, read `business-site/AGENTS.md`. Keep application dependencies, route changes and hosting configuration within the application being changed; changes spanning both require an explicit shared scope.

## Agent skills

- **Commercial specs and execution:** read `business-site/docs/agents/issue-tracker.md` before creating or updating tickets. Execution belongs in this Web repository; PMO holds portfolio relationships.
- **Commercial triage:** read `business-site/docs/agents/triage-labels.md` before assigning a triage role; configured labels and verified tracker availability are separate states.
- **Commercial domain and architecture:** read `business-site/docs/agents/domain.md` before domain exploration or design decisions. The sub-application uses a single context; Soul remains the authority for method definitions.

This repository is public. Keep private client information, contact submissions and credentials in their authorized private destinations; commit only public-safe source and redacted evidence.
