import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const manifestPath = 'src/data/studio/source-manifest.json';
const intakePath = 'src/data/studio/source-snapshots.current.json';
const normalizedPath = 'src/data/studio/source-snapshot.normalized.generated.json';
const receiptPath = 'src/data/studio/source-snapshot-receipt.generated.json';
const campaignRegistryPath = 'src/data/campaigns.ts';
const campaignRoutePath = 'src/pages/campaigns/[id].astro';

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const writeJson = (path, value) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
};
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const forbiddenKey = /(token|secret|password|cookie|authorization|api[_-]?key|email|phone)/i;

function scanKeys(value, path = '$', failures = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => scanKeys(item, `${path}[${index}]`, failures));
    return failures;
  }
  if (!value || typeof value !== 'object') return failures;
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKey.test(key)) failures.push(`forbidden public-safe key ${path}.${key}`);
    scanKeys(child, `${path}.${key}`, failures);
  }
  return failures;
}

function validate(manifest, intake) {
  const failures = [];
  if (manifest?.schemaVersion !== 'studio-source-manifest/v1') failures.push('manifest schemaVersion');
  if (manifest?.security?.webCiCrossRepoCredential !== 'NONE') failures.push('Web CI cross-repo credential must be NONE');
  if (manifest?.security?.directCrossRepoFetchFromWebCi !== false) failures.push('direct cross-repo CI fetch must remain false');
  if (intake?.schemaVersion !== 'studio-source-snapshots/v1') failures.push('intake schemaVersion');
  if (intake?.classification !== 'public-safe') failures.push('intake classification');
  if (intake?.authoritative !== false || intake?.derivedInput !== true) failures.push('intake boundary');
  if (!intake?.observedAt || !intake?.campaignSeed?.id || !Array.isArray(intake?.sources)) failures.push('intake envelope incomplete');
  failures.push(...scanKeys(intake));

  const consumed = (manifest?.sources || []).filter((source) => source.consumed);
  const map = Object.fromEntries((intake?.sources || []).map((source) => [source.key, source]));
  for (const rule of consumed) {
    const source = map[rule.key];
    if (!source) { failures.push(`missing source ${rule.key}`); continue; }
    if (source.classification !== 'public-safe') failures.push(`${rule.key}: classification`);
    if (!source.sourceRef || !source.sourceRevision || !source.observedAt || !source.businessState || !source.facts) failures.push(`${rule.key}: provenance/state incomplete`);
    if (rule.directCiFetch !== false) failures.push(`${rule.key}: directCiFetch must be false`);
  }

  let localWebRouteVerified = false;
  if (existsSync(campaignRegistryPath) && existsSync(campaignRoutePath) && intake?.campaignSeed?.slug) {
    const registry = readFileSync(campaignRegistryPath, 'utf8');
    const hasCampaign = registry.includes(`id: '${intake.campaignSeed.slug}'`);
    const webStatus = map.web?.facts?.webCampaignPageStatus;
    const webPath = map.web?.facts?.campaignPath;
    localWebRouteVerified = hasCampaign && webStatus === 'ROUTE_PRESENT' && webPath === `/campaigns/${intake.campaignSeed.slug}/`;
  }
  if (!localWebRouteVerified) failures.push('local Web campaign route could not be verified');

  return { failures, consumed, map, localWebRouteVerified };
}

const raw = readFileSync(intakePath, 'utf8');
const inputSha256 = sha256(raw);
const manifest = readJson(manifestPath);
const intake = JSON.parse(raw);
const { failures, consumed, map, localWebRouteVerified } = validate(manifest, intake);

if (existsSync(normalizedPath)) rmSync(normalizedPath);

if (failures.length) {
  const receipt = {
    schemaVersion: 'studio-snapshot-receipt/v1',
    status: 'BLOCKED',
    producer: manifest?.producer || 'studio-snapshot-producer/v1',
    producedAt: intake?.observedAt || null,
    inputObservedAt: intake?.observedAt || null,
    inputSha256,
    sourceCount: Array.isArray(intake?.sources) ? intake.sources.length : 0,
    consumedSources: consumed.map((source) => source.key),
    localWebRouteVerified,
    directCrossRepoCredentialUsed: false,
    intakeMode: 'governed_connector',
    failures
  };
  writeJson(receiptPath, receipt);
  console.warn(`Studio snapshot producer BLOCKED; normalized input withheld; failures=${failures.join('; ')}`);
  process.exit(0);
}

const normalized = {
  ...intake,
  sources: consumed.map((rule) => ({ ...map[rule.key], ownerSystem: rule.ownerSystem, intakeMode: rule.intakeMode }))
};
writeJson(normalizedPath, normalized);

const receipt = {
  schemaVersion: 'studio-snapshot-receipt/v1',
  status: 'PASS',
  producer: manifest.producer,
  producedAt: intake.observedAt,
  inputObservedAt: intake.observedAt,
  inputSha256,
  sourceCount: normalized.sources.length,
  consumedSources: normalized.sources.map((source) => source.key),
  localWebRouteVerified,
  directCrossRepoCredentialUsed: false,
  intakeMode: 'governed_connector',
  failures: []
};
writeJson(receiptPath, receipt);
console.log(`Studio snapshot produced: PASS; sources=${receipt.sourceCount}; sha256=${inputSha256.slice(0, 12)}; crossRepoCredential=NONE`);
