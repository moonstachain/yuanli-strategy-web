export type EstateRing = 'A' | 'B' | 'C';
export type EvidenceState = 'VERIFIED' | 'REPORTED_CURRENT' | 'REPORTED_HISTORICAL' | 'PENDING' | 'CONFLICT';
export type OperationalState = 'VERIFIED' | 'NOT_VERIFIED' | 'NOT_APPLICABLE' | 'UNKNOWN';

export const estateMeta = {
  title: 'Yuanli GitHub Estate',
  subtitle: 'One Soul · One Reality · Governed Evolution',
  derivedProjection: true,
  portalRole: 'read_only_governance_projection',
  sourceOfRecord: false,
  observedAt: '2026-08-08T13:51:00+08:00',
  scopeRevision: 'account-connected-estate-v1',
  phase0Status: 'PARTIAL_GPT_SURFACE_INCOMPLETE',
  g0Status: 'UNAPPROVED',
  mutationMode: 'DISABLED',
  dataMode: 'CURATED_BOOTSTRAP_PENDING_PHASE0_IMPORT',
  truthNotice: '门户只解释证据，不创造法权；当前数据包含本轮已报告事实与核心仓人工引导样本。',
};

export const estateNav = [
  { href: '/estate/', label: '概览' },
  { href: '/estate/repos/', label: '仓库' },
  { href: '/estate/map/', label: '法权地图' },
  { href: '/estate/reality/', label: '现实' },
  { href: '/estate/inbox/', label: '治理 Inbox' },
  { href: '/estate/gates/', label: 'Human Gate' },
  { href: '/estate/evolution/', label: '演化' },
];

export const estateSummary = [
  { key: 'managed', label: 'Managed Estate', value: 309, state: 'REPORTED_CURRENT' as EvidenceState, source: 'Codex 四 Owner 只读枚举', note: '当前受治理候选范围；不等于已获修改授权。' },
  { key: 'account', label: 'Account-connected', value: 317, state: 'REPORTED_CURRENT' as EvidenceState, source: 'Codex 账号全关联只读枚举', note: 'Managed + Connected External。' },
  { key: 'external', label: 'Observe-only External', value: 8, state: 'REPORTED_CURRENT' as EvidenceState, source: 'Codex 外部协作仓枚举', note: '分属 6 个外部 Owner，NOT_GOVERNED。' },
  { key: 'registry', label: 'Aug-01 Registry', value: 305, state: 'REPORTED_HISTORICAL' as EvidenceState, source: 'Governance frozen baseline', note: '历史治理基线，不代表当前 GitHub Reality。' },
  { key: 'gpt', label: 'GPT Connector Surface', value: 297, suffix: '/309', state: 'REPORTED_HISTORICAL' as EvidenceState, source: '旧连接器观测', note: '新鲜逐仓导出尚未导入，本 Portal 不跨表面补绿。' },
  { key: 'conflicts', label: 'P0 Semantic Collisions', value: 2, suffix: '+', state: 'PENDING' as EvidenceState, source: 'Core audit candidates', note: '至少包括两个 yuanli-brain 与 Soul/Governance 词义边界。' },
];

export const observationSurfaces = [
  { id: 'registry', label: 'Governance Registry', observed: 305, managedExpected: null, status: 'REPORTED_HISTORICAL', observedAt: '2026-08-01', role: 'historical_governed_snapshot', note: '只用于 previous-vs-current diff 与历史治理语义。' },
  { id: 'gpt', label: 'GPT Connector', observed: 297, managedExpected: 309, status: 'UNKNOWN_PENDING_EXPORT', observedAt: 'historical only', role: 'independent_observation_surface', note: '硬条件：需要同一审计窗口内的新鲜逐仓导出。' },
  { id: 'codex', label: 'Codex GitHub Credential', observed: 317, managedExpected: 309, status: 'OBSERVED', observedAt: '2026-08-08', role: 'widest_current_reported_surface', note: '309 Managed + 8 Connected External；Observation ≠ Authority。' },
  { id: 'portal', label: 'Estate Portal', observed: null, managedExpected: 309, status: 'DERIVED_PROJECTION', observedAt: estateMeta.observedAt, role: 'read_only_projection', note: '只消费快照与人工批准的语义，不是第一个或第二个 Registry。' },
];

export const estateRings = [
  { id: 'A' as EstateRing, title: 'Ring A · Managed Yuanli Estate', count: 309, status: 'GOVERNANCE_CANDIDATE', rule: 'owner ∈ managed_owner_allowlist', owners: ['moonstachain', 'os-yuanli', '84K-OS', 'yuanli-education'], allowed: 'Phase 0、Registry Drift、后续经 G0 授权的治理。', forbidden: '未获 Gate 前不得 mutation。' },
  { id: 'B' as EstateRing, title: 'Ring B · Connected External Estate', count: 8, status: 'OBSERVE_ONLY / NOT_GOVERNED', rule: 'account-connected && owner ∉ managed_owner_allowlist', owners: ['6 external owners'], allowed: '记录 numeric ID、locator、访问角色、关系与 observed_at。', forbidden: '不得赋 internal layer/lifecycle/authority；mutation=PROHIBITED。' },
  { id: 'C' as EstateRing, title: 'Ring C · External Upstream', count: null, status: 'RELATIONSHIP_ONLY', rule: 'fork parent / explicit dependency / vendor source', owners: ['external'], allowed: '作为 target_external / dependency / fork_parent。', forbidden: '不得进入内部 lifecycle。' },
];

export const authorityNodes = [
  { id: 'soul', label: 'Soul', layer: 'L0', question: '原力战略 / 原力 OS 是什么？', answer: 'Method Canon', status: 'AUTHORITATIVE', repo: 'moonstachain/yuanli-strategy-soul' },
  { id: 'c1', label: 'C1 文脉', layer: 'L1', question: '我是谁，什么不能变？', answer: 'Identity / Intent / Boundary', status: 'AUTHORITATIVE', repo: 'moonstachain/yuanli-client-brain' },
  { id: 'c2', label: 'C2 大脑', layer: 'L1', question: '我们知道什么，凭什么相信？', answer: 'Knowledge / Evidence', status: 'DISTRIBUTED_AUTHORITY', repo: 'local LLM Wiki + GitHub projection' },
  { id: 'c3', label: 'C3 地图', layer: 'L1', question: '现在最该押什么？', answer: 'DEC / Capability Requirements', status: 'AUTHORITATIVE', repo: 'moonstachain/yuanli-org-capability-map' },
  { id: 'c4', label: 'C4 链路', layer: 'L1', question: '谁做了什么，结果如何？', answer: 'Action / Outcome / Learning', status: 'AUTHORITATIVE', repo: 'moonstachain/yuanli-os-max' },
  { id: 'governance', label: 'Estate Governance', layer: 'Control', question: 'GitHub 仓库怎么治理？', answer: 'Registry / Topology / Lifecycle', status: 'AUTHORITATIVE', repo: 'os-yuanli/yuanli-governance' },
  { id: 'pmo', label: 'PMO', layer: 'Control', question: '现在做什么、WIP 是什么？', answer: 'Portfolio / Priority / Gate', status: 'AUTHORITATIVE', repo: 'os-yuanli/yuanli-pmo' },
  { id: 'canonops', label: 'CanonOps', layer: 'Control', question: '什么证据可以晋升回写？', answer: 'Promotion / Evidence Review', status: 'SEMANTIC_ACCEPTED · OPERATIONAL_NOT_VERIFIED', repo: 'os-yuanli/yuanli-canonops-cbm-pmo' },
  { id: 'capability', label: 'Capability Registry', layer: 'L2', question: '有哪些能力？', answer: 'Capability Identity', status: 'AUTHORITATIVE', repo: 'moonstachain/yuanli-os-skills-pack' },
  { id: 'zhiku', label: 'Zhiku', layer: 'L2', question: '能力如何被发现与供应？', answer: 'Capability Supply Network', status: 'INFRASTRUCTURE', repo: 'Zhiku family' },
  { id: 'ras', label: 'RAS', layer: 'L2', question: '能力如何被编队？', answer: 'Assembly / Routing', status: 'CONCEPTUAL_LAYER', repo: 'no verified standalone repo' },
  { id: 'runtime', label: 'Runtime', layer: 'L2', question: '实际跑了什么？', answer: 'Execution Runtime', status: 'OPERATIONAL', repo: 'moonstachain/yuanli-ai-runtime' },
];

export const topologyEdges = [
  { from: 'soul', to: 'c1', relation: 'method governs identity contract' },
  { from: 'soul', to: 'c2', relation: 'method governs evidence semantics' },
  { from: 'soul', to: 'c3', relation: 'method governs strategy semantics' },
  { from: 'soul', to: 'c4', relation: 'method governs action contract semantics' },
  { from: 'c1', to: 'c2', relation: 'CTX constrains evidence retrieval' },
  { from: 'c2', to: 'c3', relation: 'EVD informs DEC' },
  { from: 'c3', to: 'c4', relation: 'DEC + capability requirements' },
  { from: 'c4', to: 'c2', relation: 'OUT / LRN backwrite candidate' },
  { from: 'governance', to: 'pmo', relation: 'estate facts inform portfolio control' },
  { from: 'canonops', to: 'soul', relation: 'human-gated promotion only' },
  { from: 'capability', to: 'zhiku', relation: 'identity → supply/discovery' },
  { from: 'zhiku', to: 'ras', relation: 'proposal → assembly' },
  { from: 'ras', to: 'runtime', relation: 'formation → execution' },
  { from: 'runtime', to: 'c4', relation: 'execution receipt → action truth' },
];

export const governanceInbox = [
  { id: 'OBS-001', priority: 'P0', type: 'Observation', title: 'GPT Connector 新鲜逐仓导出缺失', state: 'BLOCKS_PHASE0_PASS', evidence: '旧 297/309 仅保留为 REPORTED_HISTORICAL_SURFACE。', next: '导入同一审计窗口的新鲜逐仓导出；缺失时保持 PARTIAL。', gate: 'No mutation' },
  { id: 'AUTH-001', priority: 'P0', type: 'Authority', title: '两个 yuanli-brain 的语义竞争', state: 'NEEDS_RAY_ADJUDICATION', evidence: '两个仓均以 Brain / 核心大脑语义自述；第三代 C2 已拆成 LLM Wiki + GBrain。', next: '逐仓读取真实消费者、Writer、Runtime、数据边界与继任关系。', gate: 'G0 + Human adjudication' },
  { id: 'AUTH-002', priority: 'P0', type: 'Vocabulary', title: 'Soul 与 Estate Governance 的 policy 词义需要兼容裁决', state: 'BLOCKED_PENDING_G0', evidence: 'Soul 管 Method Canon；Governance 管 GitHub Estate constitution。', next: 'G0 PASS 后只做 ADR + Compatibility Matrix。', gate: 'G0' },
  { id: 'OPS-001', priority: 'P1', type: 'Capability', title: 'CanonOps 语义法权已接受，运行能力未核验', state: 'OPERATIONAL_NOT_VERIFIED', evidence: '既有 governance ADR 支持角色；关键 operational files 曾出现不可验证。', next: '验证 exact repo / commit / digest / runnable path。', gate: 'Evidence first' },
  { id: 'SWARM-001', priority: 'P1', type: 'Portfolio', title: 'Agency / Zhiku / Fork swarm 需要 identity convergence', state: 'CANDIDATE_ONLY', evidence: '56 agency、9 zhiku、32 fork 为当前报告计数；不得批量语义裁决。', next: 'Phase 0 后进入 10–20 Repo Pilot，再决定扩展规则。', gate: 'G0 → Pilot → G1' },
  { id: 'PROJ-001', priority: 'P1', type: 'Projection', title: '公开网站 / Dashboard / Feishu 必须绑定来源与 freshness', state: 'OPEN', evidence: 'Projection 不得反向覆盖 Source。', next: '逐步补 projection_of / source commit / generated_at。', gate: 'No reverse authority' },
];

export const humanGates = [
  { id: 'G0', title: 'Execution Authorization', status: 'UNAPPROVED', scope: 'PR-1+ / schema / authority semantics', canDoNow: '只读 Phase 0 与门户投影。', cannotDo: '不得将 Phase 0 PASS 推导成执行授权。' },
  { id: 'G1', title: 'Pilot Review', status: 'NOT_REACHED', scope: '10–20 Repo Pilot → Core Expansion', canDoNow: '准备候选，不执行扩展。', cannotDo: '不得跳过 Pilot 直接批量分类 Estate。' },
  { id: 'EXT', title: 'External Collaborator Governance', status: 'NOT_AUTHORIZED', scope: 'Ring B', canDoNow: 'OBSERVE_ONLY。', cannotDo: '不得赋 internal authority / lifecycle / contract。' },
  { id: 'PHY', title: 'Physical Migration', status: 'NOT_AUTHORIZED', scope: 'rename / transfer / archive / merge', canDoNow: '只生成 candidate 与 evidence。', cannotDo: 'Portal 不提供 mutation API。' },
];

export const repoRecords = [
  { id: 'strategy-soul', fullName: 'moonstachain/yuanli-strategy-soul', githubId: null, ring: 'A' as EstateRing, layer: 'L0', organ: 'Method', primaryRole: 'institutional_constitution_and_method_canon', visibility: 'private/reported', lifecycle: 'active', authority: 'Method Canon / A1–C4 / cross-repo method policy', semanticStatus: 'AUTHORITATIVE', operationalStatus: 'NOT_APPLICABLE' as OperationalState, contractStatus: 'EFFECTIVE_REPORTED', observationStatus: 'CORE_EVIDENCE', successor: null, upstream: [], downstream: ['C1', 'C2', 'C3', 'C4', 'projections'], notes: ['Portal 必须引用而不能复制其法权。', 'B4 只保留虚 / 实 / 入 / 出四大壁垒。'] },
  { id: 'estate-governance', fullName: 'os-yuanli/yuanli-governance', githubId: 1283595059, ring: 'A' as EstateRing, layer: 'Control', organ: 'Estate', primaryRole: 'github_estate_governance', visibility: 'private', lifecycle: 'active', authority: 'physical registry / topology / lifecycle / security', semanticStatus: 'AUTHORITATIVE', operationalStatus: 'VERIFIED' as OperationalState, contractStatus: 'REGISTRY_OWNER', observationStatus: 'LIVE_VERIFIED', successor: null, upstream: ['Soul method vocabulary'], downstream: ['Registry', 'PMO', 'Portal projection'], notes: ['numeric GitHub ID 已由当前 Connector 验证。', 'Portal 不是 Registry 替代品。'] },
  { id: 'pmo', fullName: 'os-yuanli/yuanli-pmo', githubId: null, ring: 'A' as EstateRing, layer: 'Control', organ: 'Portfolio', primaryRole: 'portfolio_operating_ledger', visibility: 'private/reported', lifecycle: 'active', authority: 'priority / WIP / gates / outcomes', semanticStatus: 'AUTHORITATIVE', operationalStatus: 'UNKNOWN' as OperationalState, contractStatus: 'NEEDS_BINDING_CHECK', observationStatus: 'CORE_EVIDENCE', successor: null, upstream: ['Governance estate facts'], downstream: ['Execution queue / gates'], notes: ['PMO 回答“现在做什么”，不替代 C3 战略法权。'] },
  { id: 'canonops', fullName: 'os-yuanli/yuanli-canonops-cbm-pmo', githubId: null, ring: 'A' as EstateRing, layer: 'Control', organ: 'Promotion', primaryRole: 'canon_promotion_and_evidence_review', visibility: 'private/reported', lifecycle: 'active/reported', authority: 'promotion / evidence review / backwrite', semanticStatus: 'SEMANTIC_ACCEPTED', operationalStatus: 'NOT_VERIFIED' as OperationalState, contractStatus: 'NOT_VERIFIED', observationStatus: 'ACCESS_GAP_HISTORY', successor: null, upstream: ['OUT / LRN', 'Human review'], downstream: ['Soul promotion candidate'], notes: ['Semantic Authority ≠ Operational Capability。', 'Portal 必须把这两个状态分开显示。'] },
  { id: 'client-brain', fullName: 'moonstachain/yuanli-client-brain', githubId: null, ring: 'A' as EstateRing, layer: 'L1', organ: 'C1', primaryRole: 'founder_identity_and_instance_context', visibility: 'private/reported', lifecycle: 'active', authority: 'Founder Genome bounded source', semanticStatus: 'AUTHORITATIVE_BOUNDED', operationalStatus: 'UNKNOWN' as OperationalState, contractStatus: 'BOUND_SOURCE_REPORTED', observationStatus: 'CORE_EVIDENCE', successor: null, upstream: ['Soul'], downstream: ['CTX'], notes: ['C1 稳定身份、意图、价值、品味、边界与授权。'] },
  { id: 'llm-wiki', fullName: 'moonstachain/llm-wiki', githubId: null, ring: 'A' as EstateRing, layer: 'L1/L2', organ: 'C2', primaryRole: 'committed_knowledge_history_projection', visibility: 'private/reported', lifecycle: 'active', authority: 'GitHub knowledge history projection; local canon lives elsewhere', semanticStatus: 'PROJECTION_OF_KNOWLEDGE_CANON', operationalStatus: 'VERIFIED' as OperationalState, contractStatus: 'BRIDGE_GOVERNED_REPORTED', observationStatus: 'CORE_EVIDENCE', successor: null, upstream: ['local://obsidian/llm-wiki'], downstream: ['GBrain rebuild', 'EVD'], notes: ['LLM Wiki 负责记住；GBrain 负责想起。', 'GitHub projection 不等于 Local Canon。'] },
  { id: 'gbrain', fullName: 'moonstachain/gbrain-yuanli', githubId: null, ring: 'A' as EstateRing, layer: 'L2', organ: 'C2 Runtime', primaryRole: 'rebuildable_cognitive_runtime', visibility: 'private/reported', lifecycle: 'active', authority: 'none over knowledge canon', semanticStatus: 'REBUILDABLE_RUNTIME', operationalStatus: 'VERIFIED' as OperationalState, contractStatus: 'BOUNDARY_REPORTED', observationStatus: 'CORE_EVIDENCE', successor: null, upstream: ['LLM Wiki / evidence fabric'], downstream: ['retrieval / recall'], notes: ['可删除重建；不得反向覆盖知识正典。'] },
  { id: 'capability-map', fullName: 'moonstachain/yuanli-org-capability-map', githubId: null, ring: 'A' as EstateRing, layer: 'L1', organ: 'C3', primaryRole: 'strategic_capability_map', visibility: 'private/reported', lifecycle: 'active', authority: 'CBM / OSA / IPO strategy map', semanticStatus: 'AUTHORITATIVE', operationalStatus: 'VERIFIED' as OperationalState, contractStatus: 'CORE_REPORTED', observationStatus: 'CORE_EVIDENCE', successor: null, upstream: ['EVD'], downstream: ['DEC', 'Capability Requirements'], notes: ['C3 输出 DEC，不输出工具/Agent 名单。'] },
  { id: 'os-max', fullName: 'moonstachain/yuanli-os-max', githubId: null, ring: 'A' as EstateRing, layer: 'L1/L2', organ: 'C4', primaryRole: 'management_workbench_and_action_runtime', visibility: 'private/reported', lifecycle: 'active', authority: 'action / outcome writer', semanticStatus: 'AUTHORITATIVE_BOUNDED', operationalStatus: 'VERIFIED' as OperationalState, contractStatus: 'CORE_REPORTED', observationStatus: 'CORE_EVIDENCE', successor: null, upstream: ['DEC', 'RAS / capability formation'], downstream: ['ACT', 'OUT', 'LRN'], notes: ['OS-MAX 不是方法本体权威。'] },
  { id: 'os-max-governance', fullName: 'moonstachain/yuanli-os-max-governance', githubId: null, ring: 'A' as EstateRing, layer: 'Control', organ: 'C4 Governance', primaryRole: 'scoped_runtime_governance', visibility: 'private/reported', lifecycle: 'active', authority: 'runtime governance only', semanticStatus: 'BOUNDED', operationalStatus: 'UNKNOWN' as OperationalState, contractStatus: 'NEEDS_BINDING_CHECK', observationStatus: 'CORE_EVIDENCE', successor: null, upstream: ['C4 policy'], downstream: ['OS-MAX'], notes: ['不得扩张成全局 Governance。'] },
  { id: 'ai-runtime', fullName: 'moonstachain/yuanli-ai-runtime', githubId: null, ring: 'A' as EstateRing, layer: 'L2', organ: 'Runtime', primaryRole: 'runtime_release', visibility: 'private/reported', lifecycle: 'active', authority: 'none over method / decision', semanticStatus: 'INFRASTRUCTURE', operationalStatus: 'VERIFIED' as OperationalState, contractStatus: 'RUNTIME_REPORTED', observationStatus: 'CORE_EVIDENCE', successor: null, upstream: ['RAS formation / C4'], downstream: ['execution receipt'], notes: ['真正运行什么由 runtime evidence 证明。'] },
  { id: 'skills-pack', fullName: 'moonstachain/yuanli-os-skills-pack', githubId: null, ring: 'A' as EstateRing, layer: 'L2', organ: 'Capability', primaryRole: 'unified_capability_registry', visibility: 'private/reported', lifecycle: 'active', authority: 'Capability Identity registry', semanticStatus: 'AUTHORITATIVE_BOUNDED', operationalStatus: 'VERIFIED' as OperationalState, contractStatus: 'REGISTRY_REPORTED', observationStatus: 'CORE_EVIDENCE', successor: null, upstream: ['source repos'], downstream: ['Zhiku', 'RAS'], notes: ['Capability ≠ Repository。', 'catalog presence ≠ installation ≠ usage ≠ outcome。'] },
  { id: 'zhiku-market-private', fullName: 'moonstachain/zhiku-market-private', githubId: null, ring: 'A' as EstateRing, layer: 'L2', organ: 'Zhiku', primaryRole: 'capability_discovery_router', visibility: 'private/reported', lifecycle: 'active', authority: 'none over capability identity', semanticStatus: 'INFRASTRUCTURE', operationalStatus: 'VERIFIED' as OperationalState, contractStatus: 'NEEDS_BINDING_CHECK', observationStatus: 'CORE_EVIDENCE', successor: null, upstream: ['Capability Registry'], downstream: ['route proposals'], notes: ['Zhiku 是 C4 基础设施，不是第五个 OS 模块。'] },
  { id: 'yuanli-brain-moon', fullName: 'moonstachain/yuanli-brain', githubId: null, ring: 'A' as EstateRing, layer: 'UNKNOWN_PENDING_REVIEW', organ: 'Brain legacy/product?', primaryRole: 'expert_brain_framework_claim', visibility: 'private/reported', lifecycle: 'active/reported', authority: 'CONFLICTING_CLAIM', semanticStatus: 'NEEDS_RAY_ADJUDICATION', operationalStatus: 'UNKNOWN' as OperationalState, contractStatus: 'NEEDS_DEEP_AUDIT', observationStatus: 'LIVE_README_REPORTED', successor: null, upstream: ['GBrain lineage?'], downstream: ['unknown consumers'], notes: ['不得按名字自动判为 C2 authority。'] },
  { id: 'yuanli-brain-os', fullName: 'os-yuanli/yuanli-brain', githubId: null, ring: 'A' as EstateRing, layer: 'UNKNOWN_PENDING_REVIEW', organ: 'Brain legacy/product?', primaryRole: 'core_brain_claim', visibility: 'private/reported', lifecycle: 'active/reported', authority: 'CONFLICTING_CLAIM', semanticStatus: 'NEEDS_RAY_ADJUDICATION', operationalStatus: 'UNKNOWN' as OperationalState, contractStatus: 'NEEDS_DEEP_AUDIT', observationStatus: 'LIVE_README_REPORTED', successor: null, upstream: ['unknown'], downstream: ['unknown consumers'], notes: ['与 moonstachain/yuanli-brain 形成 P0 语义碰撞。'] },
  { id: 'strategy-web', fullName: 'moonstachain/yuanli-strategy-web', githubId: 1323858938, ring: 'A' as EstateRing, layer: 'L5', organ: 'Projection', primaryRole: 'public_strategy_and_governance_projection', visibility: 'public', lifecycle: 'active', authority: 'NONE', semanticStatus: 'PROJECTION', operationalStatus: 'VERIFIED' as OperationalState, contractStatus: 'PORTAL_LOCAL_CONTRACT', observationStatus: 'LIVE_VERIFIED', successor: null, upstream: ['Soul / governed snapshots'], downstream: ['public readers / Estate Portal'], notes: ['当前仓承载 Portal UI，但不得成为 Governance 真源。', 'GitHub numeric ID 当前已验证。'] },
  { id: 'chuandeng', fullName: '84K-OS/chuandeng-strategy-cbm', githubId: 1316906461, ring: 'A' as EstateRing, layer: 'L4', organ: 'Instance', primaryRole: 'ecosystem_strategy_instance', visibility: 'private', lifecycle: 'active', authority: 'instance-bounded only', semanticStatus: 'INSTANCE', operationalStatus: 'UNKNOWN' as OperationalState, contractStatus: 'NEEDS_PHASE0_BINDING', observationStatus: 'LIVE_VERIFIED', successor: null, upstream: ['Soul / C3 method'], downstream: ['84K instance decisions'], notes: ['实例可以产生 Evidence / Learning，但不能直接重定义 Canon。'] },
];

export const repoById = Object.fromEntries(repoRecords.map((repo) => [repo.id, repo]));

export const lineages = [
  { id: 'brain-evolution', title: 'Brain 语义演化', state: 'NEEDS_ADJUDICATION', steps: [['yuanli-brain generation(s)', '历史“大脑”语义开始收仓'], ['LLM Wiki', '长期记忆与证据内核'], ['GBrain', '可重建认知运行时'], ['C2 contract', '一套连续记忆 / evidence / version / retrieval']], learning: '名字不能继承法权；继任关系必须由证据与 Human Gate 确认。' },
  { id: 'capability-evolution', title: '能力从 Repo 到 Capability Identity', state: 'TARGET_MODEL', steps: [['Agent / Skill source repo', '可能的实现来源'], ['Capability Registry', '稳定能力身份'], ['Zhiku', '发现与供应'], ['RAS', '编队与路由'], ['Runtime', '真实调用'], ['OUT / LRN', '结果校准下一次选择']], learning: 'Capability ≠ Repository；存在 ≠ 已采用 ≠ 已使用 ≠ 有结果。' },
  { id: 'projection-evolution', title: 'One Source, Many Projections', state: 'GOVERNING_PATTERN', steps: [['Authority Source', 'Soul / Registry / C1–C4'], ['Compiler / Snapshot', '带 observed_at / digest / status'], ['Portal / Web / Feishu', '可重建投影'], ['Drift detection', '冲突时标 stale，不做静默平均']], learning: 'Projection stale → rebuild；Projection 不拥有 reverse authority。' },
];

export const healthSignals = [
  { label: 'Observation', state: 'WARN', text: 'GPT fresh surface incomplete' },
  { label: 'Authority', state: 'WARN', text: 'P0 collisions awaiting adjudication' },
  { label: 'Mutation', state: 'OK', text: 'Portal mutation mode disabled' },
  { label: 'G0', state: 'BLOCK', text: 'UNAPPROVED' },
];
