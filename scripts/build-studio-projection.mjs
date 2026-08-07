import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const sourcePath = 'src/data/studio/source-snapshot.normalized.generated.json';
const receiptPath = 'src/data/studio/source-snapshot-receipt.generated.json';
const lkgPath = 'src/data/studio/studio-view.lkg.json';
const outputPath = 'src/data/studio/studio-view.generated.json';
const requiredKeys = ['pmo', 'brain', 'content', 'soul', 'web', 'taste'];
const workbenchRef = 'https://os-zk.84000.art/content-engine-workbench/index.html#orchestration/overview';
const actionGateRef = 'https://github.com/moonstachain/yuanli-content-engine-os/issues/35';

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const byKey = (snapshot) => Object.fromEntries(snapshot.sources.map((source) => [source.key, source]));

function validateSnapshot(snapshot) {
  const errors = [];
  if (snapshot?.schemaVersion !== 'studio-source-snapshots/v1') errors.push('schemaVersion');
  if (snapshot?.classification !== 'public-safe') errors.push('classification');
  if (snapshot?.authoritative !== false || snapshot?.derivedInput !== true) errors.push('derived input boundary');
  if (!snapshot?.observedAt) errors.push('observedAt');
  if (!snapshot?.campaignSeed?.id) errors.push('campaignSeed');
  if (!Array.isArray(snapshot?.sources)) errors.push('sources');
  const keys = new Set((snapshot?.sources || []).map((source) => source.key));
  for (const key of requiredKeys) if (!keys.has(key)) errors.push(`missing source:${key}`);
  for (const source of snapshot?.sources || []) {
    if (source.classification !== 'public-safe') errors.push(`${source.key}:classification`);
    if (!source.sourceRef || !source.sourceRevision || !source.observedAt) errors.push(`${source.key}:provenance`);
    if (!source.freshness || !source.businessState || !source.facts) errors.push(`${source.key}:state`);
  }
  return errors;
}

function derive(snapshot, receipt) {
  const s = byKey(snapshot);
  const seed = snapshot.campaignSeed;
  const conflicts = [];

  const contentRoute = s.content.facts.webCampaignPageStatus;
  const webRoute = s.web.facts.webCampaignPageStatus;
  if (contentRoute && webRoute && contentRoute !== webRoute) {
    conflicts.push({
      id: 'K-STUDIO-001',
      field: 'campaign.publicPageStatus',
      authority: 'web',
      state: 'OPEN',
      severity: 'projection_drift',
      summary: `Content run-state reports ${contentRoute}, while Web reports ${webRoute}.`,
      resolution: 'Use Web as the display authority for public route state; retain conflict until Content projection is refreshed. Studio never auto-writes Content.',
      sources: [
        { key: 'content', value: contentRoute, href: s.content.facts.prRef || s.content.sourceRef },
        { key: 'web', value: webRoute, href: seed.sourceRef }
      ]
    });
  }

  if (s.pmo.facts.owner && s.content.facts.owner && s.pmo.facts.owner !== s.content.facts.owner) {
    conflicts.push({
      id: 'K-STUDIO-OWNER',
      field: 'campaign.owner',
      authority: 'pmo',
      state: 'OPEN',
      severity: 'authority_conflict',
      summary: `PMO owner=${s.pmo.facts.owner}; Content owner=${s.content.facts.owner}.`,
      resolution: 'PMO owns Portfolio Owner. Do not silently overwrite either source.',
      sources: [
        { key: 'pmo', value: s.pmo.facts.owner, href: s.pmo.sourceRef },
        { key: 'content', value: s.content.facts.owner, href: s.content.sourceRef }
      ]
    });
  }

  const staleSources = snapshot.sources.filter((source) => source.freshness === 'STALE');
  const deliveryStatus = staleSources.length ? 'STALE' : conflicts.length ? 'CONFLICT' : 'LIVE';
  const humanReviewOpen = String(s.brain.facts.humanReview || '').includes('NOT_RUN') || String(s.brain.facts.humanReview || '').includes('UNASSIGNED');
  const routeConflict = conflicts.some((conflict) => conflict.field === 'campaign.publicPageStatus');

  const deepLinks = [
    { key: 'pmo-ledger', label: '查看 Owner / WIP / Gate', targetKind: 'portfolio', ownerSystem: 'pmo', href: s.pmo.sourceRef, verifiedRoute: true, note: 'PMO is authoritative for Owner, WIP and gate sequence.' },
    { key: 'brain-evidence', label: '查看 Evidence Pack', targetKind: 'evidence', ownerSystem: 'brain', href: s.brain.sourceRef, verifiedRoute: true, note: 'Public-safe evidence projection; does not imply Human Review approval.' },
    { key: 'brain-review', label: '进入 Human Evidence Review', targetKind: 'human_gate', ownerSystem: 'brain', href: s.brain.facts.reviewRef, verifiedRoute: true, note: 'Current next gate; real human decision remains NOT_RUN.' },
    { key: 'content-runtime', label: '查看 Campaign runtime', targetKind: 'campaign_runtime', ownerSystem: 'content', href: s.content.sourceRef, verifiedRoute: true, note: 'Content Engine runtime truth source.' },
    { key: 'content-pr', label: '查看 Content PR #36', targetKind: 'implementation', ownerSystem: 'content', href: s.content.facts.prRef, verifiedRoute: true, note: 'Implementation is open and still blocked by #37.' },
    { key: 'workbench-overview', label: '查看工程真相', targetKind: 'workbench', ownerSystem: 'content', href: workbenchRef, verifiedRoute: true, note: 'Verified Workbench overview only; no guessed campaign hash route.' },
    { key: 'web-campaign', label: '查看公开 Campaign', targetKind: 'public_route', ownerSystem: 'web', href: `/campaigns/${seed.slug}/`, verifiedRoute: true, note: 'Web owns public route state.' },
    { key: 'producer-test', label: '进入 Producer Test Gate', targetKind: 'reality_gate', ownerSystem: 'web', href: s.web.sourceRef, verifiedRoute: true, note: 'P01–P03 receipts are still NOT_RUN.' },
    { key: 'action-gate', label: '查看真实 Action / Outcome 门', targetKind: 'reality_gate', ownerSystem: 'content', href: actionGateRef, verifiedRoute: true, note: '10-user Action and Day7 Outcome remain NOT_RUN.' },
    { key: 'soul-gate', label: '查看 Changed Rule Human Gate', targetKind: 'human_gate', ownerSystem: 'soul', href: s.soul.sourceRef, verifiedRoute: true, note: 'Soul approval is required; AI cannot auto-approve.' }
  ];

  return {
    schemaVersion: 'studio-view/v1',
    derivedProjection: true,
    authoritative: false,
    classification: 'public-safe',
    observedAt: snapshot.observedAt,
    deliveryStatus,
    fallbackReason: null,
    sourceCount: snapshot.sources.length,
    conflictCount: conflicts.length,
    northStar: snapshot.northStar,
    snapshotReceipt: receipt ? {
      status: receipt.status,
      producer: receipt.producer,
      inputObservedAt: receipt.inputObservedAt,
      inputSha256: receipt.inputSha256,
      sourceCount: receipt.sourceCount,
      localWebRouteVerified: receipt.localWebRouteVerified,
      directCrossRepoCredentialUsed: receipt.directCrossRepoCredentialUsed,
      intakeMode: receipt.intakeMode
    } : undefined,
    campaign: {
      id: seed.id,
      slug: seed.slug,
      title: seed.title,
      module: seed.module,
      question: seed.question,
      user: seed.user,
      symptom: seed.symptom,
      coreClaim: seed.coreClaim,
      owner: s.pmo.facts.owner,
      productionState: s.content.facts.runStatus,
      maturity: s.content.facts.maturity,
      nextGate: humanReviewOpen ? 'Human Evidence Review' : 'PMO Next Gate',
      nextGateRef: humanReviewOpen ? s.brain.facts.reviewRef : s.pmo.sourceRef,
      systemBlocker: s.content.facts.systemBlocker,
      systemBlockerRef: s.content.facts.systemBlockerRef,
      action: seed.action,
      actionTarget: seed.actionTarget,
      actionStatus: s.content.facts.actionStatus,
      outcomeStatus: s.content.facts.outcomeStatus,
      changedRuleStatus: s.soul.facts.changedRuleStatus,
      task2Status: s.soul.facts.task2Status,
      publicPageStatus: s.web.facts.webCampaignPageStatus
    },
    campaignRoom: {
      contract: {
        owner: s.pmo.facts.owner,
        wip: s.pmo.facts.wip,
        module: seed.module,
        question: seed.question,
        user: seed.user,
        sourceRef: s.pmo.sourceRef
      },
      evidence: {
        status: s.brain.facts.evidenceStatus,
        humanReview: s.brain.facts.humanReview,
        sourceRef: s.brain.sourceRef,
        reviewRef: s.brain.facts.reviewRef
      },
      works: s.web.facts.works,
      distribution: {
        runtimeState: s.content.facts.runStatus,
        publicPageStatus: s.web.facts.webCampaignPageStatus,
        conflictState: routeConflict ? 'CONFLICT' : 'LIVE',
        runtimeRef: s.content.sourceRef,
        workbenchRef,
        publicPath: s.web.facts.campaignPath
      },
      reality: {
        producerValidation: s.web.facts.producerValidation || s.content.facts.producerValidation,
        actionStatus: s.content.facts.actionStatus,
        outcomeStatus: s.content.facts.outcomeStatus,
        producerTestRef: s.web.sourceRef,
        actionRef: actionGateRef
      },
      learning: {
        changedRuleStatus: s.soul.facts.changedRuleStatus,
        task2Status: s.soul.facts.task2Status,
        humanGate: s.soul.facts.humanGate,
        humanGateRef: s.soul.sourceRef
      }
    },
    deepLinks,
    claims: s.brain.facts.claims,
    sources: snapshot.sources.map((source) => ({
      key: source.key,
      name: source.name,
      role: source.role,
      state: source.businessState,
      freshness: source.freshness,
      href: source.key === 'brain' ? source.facts.reviewRef : source.key === 'content' ? source.facts.prRef : source.sourceRef,
      sourceRef: source.sourceRef,
      sourceRevision: source.sourceRevision
    })),
    today: [
      { lane: '等待裁决', title: '指定独立 Human Evidence Reviewer 并完成 Brain #4', source: 'Brain #4', href: s.brain.facts.reviewRef },
      { lane: '当前阻塞', title: '刷新 content-cbm-max 的 metrics_72h 确定性投影', source: 'Content #37', href: s.content.facts.systemBlockerRef },
      { lane: '等待现实', title: '运行3—5位生产者首次成功测试', source: 'Web #31', href: s.web.sourceRef },
      { lane: '等待现实', title: '10位真实用户完成AI清算并留下匿名回执', source: 'Content #35 / #36', href: actionGateRef }
    ],
    works: s.web.facts.works,
    conflicts
  };
}

function writeView(view) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(view, null, 2)}\n`, 'utf8');
}

let receipt = null;
if (existsSync(receiptPath)) receipt = readJson(receiptPath);

try {
  const snapshot = readJson(sourcePath);
  const errors = validateSnapshot(snapshot);
  if (errors.length) throw new Error(`invalid normalized source snapshot: ${errors.join(', ')}`);
  if (!receipt || receipt.status !== 'PASS') throw new Error('snapshot producer receipt is not PASS');
  const view = derive(snapshot, receipt);
  writeView(view);
  console.log(`Studio projection built: ${view.deliveryStatus}; sources=${view.sourceCount}; conflicts=${view.conflictCount}; snapshot=${receipt.inputSha256.slice(0, 12)}`);
} catch (error) {
  if (!existsSync(lkgPath)) throw error;
  const lkg = readJson(lkgPath);
  const staleView = {
    ...lkg,
    deliveryStatus: 'STALE',
    fallbackReason: `current source snapshot unavailable or invalid; using Last Known Good (${error.message})`,
    snapshotReceipt: receipt ? {
      status: receipt.status,
      producer: receipt.producer,
      inputObservedAt: receipt.inputObservedAt,
      inputSha256: receipt.inputSha256,
      sourceCount: receipt.sourceCount,
      localWebRouteVerified: receipt.localWebRouteVerified,
      directCrossRepoCredentialUsed: receipt.directCrossRepoCredentialUsed,
      intakeMode: receipt.intakeMode
    } : lkg.snapshotReceipt
  };
  writeView(staleView);
  console.warn(`Studio projection fallback: ${staleView.fallbackReason}`);
}
