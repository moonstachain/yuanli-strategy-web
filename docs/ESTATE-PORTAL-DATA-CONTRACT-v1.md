# Yuanli GitHub Estate Portal · Data Contract v1

- Status: `implementation-baseline`
- Product: `/estate/`
- Projection rule: `One Source, Many Projections`

## 1. Data Spine

Portal data must move through four distinguishable layers:

```text
Raw Observation
→ Normalized Reality
→ Accepted Governance Semantics
→ Derived Portal View
```

The Portal must never collapse these layers into one undocumented JSON object.

## 2. Raw Observation

A raw repository observation should preserve, where available:

```yaml
surface_id:
collector_identity:
collector_version:
query_scope:
observed_at_start:
observed_at_end:
pagination_status:
github_numeric_id:
locator:
owner:
visibility:
archived:
disabled:
fork:
fork_parent:
default_branch:
head_sha:
pushed_at:
access_status:
access_role:
error:
```

No missing field may be silently reconstructed from another observation surface.

## 3. Observation Surface State

For each repository, each surface stores its own state:

```text
OBSERVED
MISSING
ACCESS_FAILED
OUT_OF_SCOPE
UNKNOWN_PENDING_EXPORT
```

The Portal may derive comparison alerts from these states but may not overwrite them.

Canonical example:

```text
Registry      OBSERVED
GPT Connector MISSING
Codex         OBSERVED
```

This means “surface disagreement”, not “all green”.

## 4. Stable Identity

Preferred physical continuity key:

```text
GitHub numeric repository ID
```

`owner/name` is the current locator. A locator change for the same numeric ID must be modeled as rename/transfer continuity, not delete + create.

When numeric ID has not been verified, the Portal must display an explicit pending state rather than invent a value.

## 5. Ring Membership

Current Phase 0 membership rule is deliberately simple and non-semantic.

### Ring A

```text
current owner ∈ managed_owner_allowlist
```

### Ring B

```text
account-connected
AND current owner ∉ managed_owner_allowlist
```

### Ring C

```text
fork parent / explicit dependency / vendor / external source relationship
```

Repository names, README wording or `yuanli` substrings must never decide ring membership.

## 6. Governance Semantics

Accepted semantic fields are sourced from Governance/Soul/C1–C4 decisions and bindings, not inferred by the Portal.

Portal semantics may include:

```yaml
logical_identity:
system_layer:
os_organ:
primary_role:
authority_summary:
semantic_status:
operational_status:
contract_status:
lifecycle_display:
successor:
upstream:
downstream:
notes:
```

Before any future Registry schema change, existing Registry fields and relation writers must be checked for compatibility. This Portal data contract does not authorize Registry schema evolution.

## 7. Semantic vs Operational State

Every authority-bearing core repository should support two independent status dimensions.

```text
Semantic Authority
= what the accepted governance model says it should own

Operational Capability
= what current executable evidence proves it can actually do
```

Allowed operational states in the initial view model:

```text
VERIFIED
NOT_VERIFIED
NOT_APPLICABLE
UNKNOWN
```

Semantic Authority ≠ Operational Capability.

## 8. Contract Effectiveness

A repository file named `repo-contract.yaml` is only a claim artifact until it is bound through the required evidence chain.

The effective chain conceptually requires:

```text
repository identity
+ exact commit
+ content/blob digest
+ Registry binding
+ accepted authority domain
+ human approval
+ effective time
- expiry
- revocation
```

Portal labels must distinguish `file exists`, `claimed`, `bound`, `effective`, `revoked`, `expired`, and `not verified` when evidence is available.

## 9. Expanded Phase 0 Import Targets

The next governed data source is expected to expose or compile from:

```text
ACCOUNT_CONNECTED_ESTATE_SNAPSHOT
MANAGED_ESTATE_SNAPSHOT
CONNECTED_EXTERNAL_LEDGER
ACCESS_SURFACE_MATRIX
PREVIOUS_VS_CURRENT_DIFF
CORE_DEEP_AUDIT
AUTHORITY_COLLISION_CANDIDATES
ACCESS_FAILURE_LEDGER
```

The Portal should consume normalized/public-safe projections of these artifacts, not private raw command logs.

## 10. Public Projection Minimization

Because this product is hosted in a public repository, the projection compiler must minimize data.

Allowed public-safe classes include, subject to explicit publication policy:

- numeric repository IDs;
- repository locator/name;
- high-level owner and visibility state;
- ring membership;
- public-safe role / authority summary;
- high-level lifecycle and conflict status;
- hashes/digests that do not expose secret material;
- observation timestamps and surface status;
- links to public sources.

Default-excluded classes:

- credentials and tokens;
- private source contents;
- customer raw evidence;
- private attachment URLs;
- sensitive personal data;
- unredacted local filesystem paths;
- private workflow logs containing secrets;
- repository secrets, environment values, deploy keys or webhook secrets.

## 11. Bootstrap View Model

`src/data/estate.ts` is an implementation bootstrap, not the Estate Registry.

It may contain curated current-reported facts necessary to validate UI semantics. Every such fact must expose state/source/note or clearly carry pending/unknown status.

The bootstrap is expected to be superseded by a generated public-safe Estate View Model once Expanded Phase 0 output is available.

## 12. Derived Status Rules

Portal status is fail-closed.

Examples:

```text
fresh GPT export missing
→ PARTIAL_GPT_SURFACE_INCOMPLETE

integrity/hash failure or detected mutation in a read-only audit
→ BLOCKED_INTEGRITY_FAILURE

all mandatory Phase 0 evidence complete
→ Phase0 PASS candidate
```

Even then:

```text
Phase0 PASS != G0 PASS
```

No derived UI state may create Human authorization.
