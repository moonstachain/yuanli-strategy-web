export type StudioSourceKey = 'pmo' | 'brain' | 'content' | 'soul' | 'taste' | 'web' | 'bao' | 'deploy';

export type StudioDeliveryStatus = 'LIVE' | 'STALE' | 'CONFLICT';

export interface StudioSourceView {
  key: StudioSourceKey;
  name: string;
  role: string;
  state: string;
  freshness: string;
  href: string;
  sourceRef: string;
  sourceRevision: string;
}

export interface StudioConflict {
  id: string;
  field: string;
  authority: StudioSourceKey;
  state: 'OPEN' | 'RESOLVED';
  severity: 'projection_drift' | 'authority_conflict' | 'unknown';
  summary: string;
  resolution: string;
  sources: Array<{ key: StudioSourceKey; value: string; href: string }>;
}

export interface StudioSnapshotReceiptView {
  status: 'PASS' | 'BLOCKED';
  producer: string;
  inputObservedAt: string | null;
  inputSha256: string;
  sourceCount: number;
  localWebRouteVerified: boolean;
  directCrossRepoCredentialUsed: boolean;
  intakeMode: string;
}

export interface StudioDeepLink {
  key: string;
  label: string;
  targetKind: string;
  ownerSystem: StudioSourceKey;
  href: string;
  verifiedRoute: true;
  note: string;
}

export interface StudioCampaignRoom {
  contract: {
    owner: string;
    wip: string;
    module: string;
    question: string;
    user: string;
    sourceRef: string;
  };
  evidence: {
    status: string;
    humanReview: string;
    sourceRef: string;
    reviewRef: string;
  };
  works: Array<{ type: string; title: string; state: string; href: string }>;
  distribution: {
    runtimeState: string;
    publicPageStatus: string;
    conflictState: string;
    runtimeRef: string;
    workbenchRef: string;
    publicPath: string;
  };
  reality: {
    producerValidation: string;
    actionStatus: string;
    outcomeStatus: string;
    producerTestRef: string;
    actionRef: string;
  };
  learning: {
    changedRuleStatus: string;
    task2Status: string;
    humanGate: string;
    humanGateRef: string;
  };
}

export interface StudioView {
  schemaVersion: 'studio-view/v1';
  derivedProjection: true;
  authoritative: false;
  classification: 'public-safe';
  observedAt: string;
  deliveryStatus: StudioDeliveryStatus;
  fallbackReason: string | null;
  sourceCount: number;
  conflictCount: number;
  northStar: string;
  snapshotReceipt?: StudioSnapshotReceiptView;
  campaign: {
    id: string;
    slug: string;
    title: string;
    module: string;
    question: string;
    user: string;
    symptom: string;
    coreClaim: string;
    owner: string;
    productionState: string;
    maturity: string;
    nextGate: string;
    nextGateRef: string;
    systemBlocker: string;
    systemBlockerRef: string;
    action: string;
    actionTarget: string;
    actionStatus: string;
    outcomeStatus: string;
    changedRuleStatus: string;
    task2Status: string;
    publicPageStatus: string;
  };
  campaignRoom?: StudioCampaignRoom;
  deepLinks?: StudioDeepLink[];
  claims: Array<{ id: string; text: string; state: string; nature: string }>;
  sources: StudioSourceView[];
  today: Array<{ lane: string; title: string; source: string; href: string }>;
  works: Array<{ type: string; title: string; state: string; href: string }>;
  conflicts: StudioConflict[];
}
