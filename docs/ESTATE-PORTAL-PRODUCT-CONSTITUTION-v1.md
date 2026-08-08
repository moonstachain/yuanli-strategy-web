# Yuanli GitHub Estate Portal · Product Constitution v1

- Status: `implementation-baseline`
- Repository: `moonstachain/yuanli-strategy-web`
- Product surface: `/estate/`
- Task context: `yuanli-os-repository-constitution-topology-v1-20260808`
- Scope revision: `account-connected-estate-v1`
- Placement decision: RAY explicitly accepted the strategic information-security tradeoff of placing the governance portal UI in this public repository on 2026-08-08.

## 1. Product Identity

Yuanli GitHub Estate Portal is a **read-only governance projection** for the RAY Account-Connected GitHub Estate.

It exists to answer:

```text
What do we currently observe?
What is this repository?
Who has authority over which question?
Where do observation surfaces disagree?
What requires human adjudication?
How did digital assets evolve over time?
```

It is a governance cockpit, not another governance authority.

## 2. What This Product Must Never Become

```text
Portal != Source of Record
Portal != Repository Registry
Portal != Method Canon
Portal != Runtime truth source
Portal != automatic authority adjudicator
Portal != GitHub mutation console
```

Portal state is rebuildable projection state.

If Portal and an authority source conflict, Portal must surface drift/conflict/staleness. It must not silently overwrite or average the conflict.

## 3. Governing Doctrines

The following are hard product laws:

1. `Observe != Govern`
2. `Govern != Mutate`
3. `Semantic Authority != Operational Capability`
4. `Contract file exists != Effective Contract`
5. `Projection != Source`
6. `Phase0 PASS != G0 PASS`
7. `MISSING != DOES NOT EXIST`
8. `Evidence missing = NOT_VERIFIED / UNKNOWN`, never inferred PASS

Human sovereignty remains controlling for authority adjudication and gated mutation.

## 4. Estate Rings

### Ring A · Managed Yuanli Estate

Current membership boundary is the frozen managed-owner allowlist:

```text
moonstachain
os-yuanli
84K-OS
yuanli-education
```

Membership means the repository may enter governance analysis. It does not grant mutation authority.

### Ring B · Connected External Estate

Account-connected repositories outside the managed-owner allowlist remain:

```text
OBSERVE_ONLY
NOT_GOVERNED
mutation = PROHIBITED
```

The Portal may display identity, access relationship and observation evidence, but must not invent internal layer, lifecycle, authority or contract semantics for them.

### Ring C · External Upstream

Fork parents, explicit dependencies, vendors and external capability suppliers are relationship targets only and do not enter internal lifecycle governance.

## 5. Reality Doctrine

Reality is not a single connector.

Every observation surface must preserve its own:

```text
collector identity
query scope
observed_at
pagination status
access state
successes
failures
```

Registry, GPT Connector and Codex observations remain independently auditable. One surface must never green another.

The current bootstrap intentionally keeps the historic GPT 297/309 observation separate and marks the fresh GPT export requirement as incomplete.

## 6. Authority Doctrine

The Portal explains accepted authority boundaries but does not create them.

Current governing interpretation includes:

- Soul: institutional / method canon.
- Estate Governance: GitHub estate registry, topology, lifecycle and repository security governance.
- C1: identity / intent / boundaries.
- C2: knowledge and evidence; local LLM Wiki canon + rebuildable retrieval runtime.
- C3: strategic DEC and capability requirements.
- C4: action / outcome / learning truth.
- PMO: portfolio / WIP / gates.
- CanonOps: canon promotion semantics; operational capability must be separately verified.
- Capability Registry: capability identity.
- Zhiku: capability supply/discovery infrastructure, not a fifth OS organ.
- RAS: conceptual formation/orchestration layer.
- Runtime: what actually ran.

## 7. Public Repository Security Boundary

RAY accepted the product-placement risk; this does **not** authorize publishing secrets or raw private evidence.

The public repository must still exclude:

- GitHub PATs, OAuth tokens, API keys and credentials;
- private keys or signing secrets;
- customer raw private content;
- personal secrets or private account identifiers;
- private attachments or private source text copied wholesale;
- unredacted local filesystem paths that expose personal directory names;
- private repository file contents unless separately approved for public projection.

Private-repository names and high-level governance metadata should be minimized to what the portal actually needs. Any future full Managed Estate projection requires a deliberate publication decision and a public-safe transformation step.

## 8. MVP Routes

```text
/estate/                    Estate Health
/estate/repos/              Repository Explorer
/estate/repos/[id]/         Repository Passport
/estate/map/                Authority / Topology Map
/estate/reality/            Reality Observatory
/estate/inbox/              Governance Inbox
/estate/gates/              Human Gate Center
/estate/evolution/          Evolution / Lineage
```

## 9. Mutation Boundary

Portal v1 is `Read + Explain + Route` only.

**No GitHub mutation API is exposed by Portal v1.**

UI controls for approval are intentionally disabled. No route may rename, archive, transfer, delete, change visibility, change permissions, write Registry state, bind a Contract, alter Authority, or create a governance decision receipt.

When a later authorized write path is introduced, execution must remain a separate C4/Governance action with explicit Human Gate, ACT receipt and rollback evidence.

## 10. Bootstrap Honesty

The implementation ships with a curated Core/P0 view model so UI contracts can be tested before the Expanded Phase 0 packet is imported.

This bootstrap:

- does not pretend to contain all 309 Managed repositories;
- does not turn prior reported counts into timeless constants;
- leaves unknown numeric repository IDs unfilled;
- preserves historical vs current-reported vs pending observation states;
- marks the GPT fresh export blocker explicitly;
- marks G0 as `UNAPPROVED`.

## 11. Target Data Upgrade

The UI contract should survive the later data upgrade:

```text
Expanded Phase 0 raw evidence
→ normalized account-connected estate
→ normalized managed estate
→ independent access-surface matrix
→ accepted governance semantic bindings
→ Estate View Model
→ Portal projection
```

Replacing the bootstrap with normalized Phase 0 data should not require redesigning the authority or reality semantics of the UI.

## 12. Acceptance Principle

Engineering build success proves only that the projection is `Done`.

It does not prove:

- Phase 0 PASS;
- G0 PASS;
- repository authority correctness for unreviewed rows;
- operational capability;
- mutation authorization;
- business outcome or compounding.

The product succeeds when a human or AI can enter a core repository and quickly answer: who is it, what is it for, what is it not for, who has authority, what is verified, what remains unknown, and what gate is required next.
