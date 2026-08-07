import { existsSync, readFileSync } from 'node:fs';

const failures = [];
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const required = [
  'src/data/studio/source-snapshots.current.json',
  'src/data/studio/studio-view.lkg.json',
  'src/data/studio/studio-view.generated.json',
  'src/lib/studio/contracts.ts',
  'src/lib/studio/source-registry.ts',
  'docs/STUDIO-PRODUCT-CONSTITUTION-v2.md',
  'docs/STUDIO-DATA-CONTRACT-v1.md',
  'docs/STUDIO-DEEPLINK-CONTRACT-v1.md',
  'docs/STUDIO-REALITY-CONTRACT-v1.md',
];

for (const path of required) if (!existsSync(path)) failures.push(`missing ${path}`);

if (!failures.length) {
  const source = readJson('src/data/studio/source-snapshots.current.json');
  const lkg = readJson('src/data/studio/studio-view.lkg.json');
  const view = readJson('src/data/studio/studio-view.generated.json');
  const studioTs = readFileSync('src/data/studio.ts', 'utf8');
  const registry = readFileSync('src/lib/studio/source-registry.ts', 'utf8');

  const sourceMap = Object.fromEntries(source.sources.map((item) => [item.key, item]));
  for (const key of ['pmo', 'brain', 'content', 'soul', 'web', 'taste']) {
    if (!sourceMap[key]) failures.push(`missing source key ${key}`);
  }
  if (source.classification !== 'public-safe' || source.authoritative !== false || source.derivedInput !== true) failures.push('source snapshot boundary invalid');
  if (lkg.derivedProjection !== true || lkg.authoritative !== false) failures.push('LKG must be derived and non-authoritative');
  if (view.derivedProjection !== true || view.authoritative !== false) failures.push('generated Studio view must be derived and non-authoritative');
  if (!['LIVE', 'STALE', 'CONFLICT'].includes(view.deliveryStatus)) failures.push('invalid deliveryStatus');
  if (view.campaign.actionStatus !== '0/10 · NOT_RUN') failures.push('real-user action must remain 0/10 NOT_RUN');
  if (view.campaign.outcomeStatus !== 'Day7 · NOT_RUN') failures.push('Day7 Outcome must remain NOT_RUN');
  if (String(view.campaign.changedRuleStatus).startsWith('APPROVED')) failures.push('Changed Rule cannot be approved without Human Gate receipt');
  const c03 = view.claims.find((claim) => claim.id === 'C03');
  if (!c03 || c03.state !== 'Hypothesis') failures.push('C03 must remain Hypothesis');
  if (sourceMap.soul?.facts?.canonicalAutoWrite !== false) failures.push('Canon auto-write must remain false');
  if (studioTs.includes('studioSnapshot = {')) failures.push('manual studioSnapshot object literal is forbidden');
  if (!studioTs.includes('studioView')) failures.push('Studio must consume generated studioView');
  if (!registry.includes('https://os-zk.84000.art/bao.html')) failures.push('Bao professional workbench entry missing');
  if (!registry.includes('content-engine-workbench/index.html#orchestration/overview')) failures.push('Content Workbench verified entry missing');

  const contentRoute = sourceMap.content?.facts?.webCampaignPageStatus;
  const webRoute = sourceMap.web?.facts?.webCampaignPageStatus;
  if (contentRoute !== webRoute) {
    if (view.deliveryStatus !== 'CONFLICT') failures.push('route projection drift must surface as CONFLICT');
    if (!view.conflicts.some((conflict) => conflict.field === 'campaign.publicPageStatus')) failures.push('route projection drift must retain conflict receipt');
    if (view.campaign.publicPageStatus !== webRoute) failures.push('Web must arbitrate campaign.publicPageStatus');
  }

  for (const sourceView of view.sources) {
    if (!sourceView.sourceRef || !sourceView.sourceRevision || !sourceView.freshness) failures.push(`source provenance incomplete: ${sourceView.key}`);
  }
}

if (failures.length) {
  console.error(`Studio contract failed:\n${failures.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log('Studio contract passed: authority, provenance, conflict visibility, LKG and reality gates are intact.');
