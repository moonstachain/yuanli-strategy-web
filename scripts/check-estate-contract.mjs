import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const requiredFiles = [
  'src/data/estate.ts',
  'src/layouts/EstateLayout.astro',
  'src/styles/estate.css',
  'src/pages/estate/index.astro',
  'src/pages/estate/repos/index.astro',
  'src/pages/estate/repos/[id].astro',
  'src/pages/estate/map.astro',
  'src/pages/estate/reality.astro',
  'src/pages/estate/inbox.astro',
  'src/pages/estate/gates.astro',
  'src/pages/estate/evolution.astro',
  'docs/ESTATE-PORTAL-PRODUCT-CONSTITUTION-v1.md',
  'docs/ESTATE-PORTAL-DATA-CONTRACT-v1.md',
];

const failures = [];
for (const file of requiredFiles) if (!existsSync(file)) failures.push(`missing required estate file: ${file}`);

const checks = [
  ['src/data/estate.ts', [
    'derivedProjection: true',
    "sourceOfRecord: false",
    "phase0Status: 'PARTIAL_GPT_SURFACE_INCOMPLETE'",
    "g0Status: 'UNAPPROVED'",
    "mutationMode: 'DISABLED'",
    "OBSERVE_ONLY / NOT_GOVERNED",
    "mutation=PROHIBITED",
    "SEMANTIC_ACCEPTED · OPERATIONAL_NOT_VERIFIED",
    'Capability ≠ Repository',
  ]],
  ['src/layouts/EstateLayout.astro', [
    'Derived Projection · 非真源',
    '可观察 ≠ 可治理 ≠ 可修改',
    '不成为新的 Registry、Canon、Runtime 或 Mutation Authority',
  ]],
  ['src/pages/estate/index.astro', ['让整个 GitHub', 'THREE RINGS', 'NEEDS YOUR DECISION', 'OBSERVATION SURFACES']],
  ['src/pages/estate/repos/index.astro', ['Repository 不是文件夹', 'PENDING_PHASE0_BINDING', 'NO BULK JUDGMENT']],
  ['src/pages/estate/repos/[id].astro', ['WHO AM I?', 'SEMANTIC AUTHORITY', 'OPERATIONAL CAPABILITY', 'Derived Projection']],
  ['src/pages/estate/map.astro', ['AUTHORITY / TOPOLOGY GRAPH', 'GOLDEN QUERIES', 'Zhiku 是第五个原力 OS 模块吗？', 'NO · FAIL_CLOSED']],
  ['src/pages/estate/reality.astro', ['MISSING ≠ DOES NOT EXIST', 'OBSERVED ≠ GOVERNED', 'PHASE 0 PASS ≠ G0 PASS', 'NO CROSS-SURFACE GREENING']],
  ['src/pages/estate/inbox.astro', ['candidate / evidence request / gate input', 'FAIL CLOSED', 'HUMAN SOVEREIGNTY']],
  ['src/pages/estate/gates.astro', ['Approve · disabled', 'Reject · disabled', 'Portal v1 只有 Read + Route', 'G0 UNAPPROVED']],
  ['src/pages/estate/evolution.astro', ['Archive 不是垃圾桶', 'SUCCESSION', '让历史改变未来']],
  ['docs/ESTATE-PORTAL-PRODUCT-CONSTITUTION-v1.md', [
    'Observe != Govern',
    'Govern != Mutate',
    'Semantic Authority != Operational Capability',
    'Contract file exists != Effective Contract',
    'Projection != Source',
    'Phase0 PASS != G0 PASS',
    'public repository',
    'mutation API',
  ]],
  ['docs/ESTATE-PORTAL-DATA-CONTRACT-v1.md', [
    'Raw Observation',
    'Normalized Reality',
    'Accepted Governance Semantics',
    'Derived Portal View',
    'GitHub numeric repository ID',
    'UNKNOWN_PENDING_EXPORT',
    'Semantic Authority ≠ Operational Capability',
    'Phase0 PASS != G0 PASS',
  ]],
];

for (const [file, needles] of checks) {
  if (!existsSync(file)) continue;
  const content = readFileSync(file, 'utf8');
  for (const needle of needles) if (!content.includes(needle)) failures.push(`${file} missing contract marker: ${needle}`);
}

const estateData = existsSync('src/data/estate.ts') ? readFileSync('src/data/estate.ts', 'utf8') : '';
if (estateData.includes("g0Status: 'PASS'")) failures.push('Estate bootstrap must not claim G0 PASS');
if (estateData.includes("mutationMode: 'ENABLED'")) failures.push('Estate Portal v1 mutation mode must remain disabled');
if (/githubId:\s*['\"]?\d+['\"]?/g.test(estateData) === false) failures.push('Estate bootstrap should contain at least one evidence-bound numeric GitHub ID');

const ringBBlock = estateData.match(/id:\s*'B'[\s\S]*?id:\s*'C'/)?.[0] ?? '';
for (const forbidden of ['system_layer:', 'canonical_for:', 'internal_lifecycle:', 'authority_domains:']) {
  if (ringBBlock.includes(forbidden)) failures.push(`Ring B must not contain internal governance semantic field: ${forbidden}`);
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
}

const publicProjectionFiles = [
  ...walk('src/pages/estate'),
  'src/data/estate.ts',
  'src/layouts/EstateLayout.astro',
  'docs/ESTATE-PORTAL-PRODUCT-CONSTITUTION-v1.md',
  'docs/ESTATE-PORTAL-DATA-CONTRACT-v1.md',
].filter(existsSync);

const leakRules = [
  [/github_pat_[A-Za-z0-9_]+/, 'GitHub fine-grained PAT'],
  [/ghp_[A-Za-z0-9]+/, 'GitHub classic PAT'],
  [/sk-proj-[A-Za-z0-9_-]+/, 'OpenAI project key'],
  [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, 'private key block'],
  [/\/Users\/[A-Za-z0-9._-]+\/Documents\//, 'unredacted local user Documents path'],
];

for (const file of publicProjectionFiles) {
  const content = readFileSync(file, 'utf8');
  for (const [pattern, label] of leakRules) if (pattern.test(content)) failures.push(`${file} contains possible ${label}`);
}

if (failures.length) {
  console.error('Estate Portal contract failed:\n' + failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log('Estate Portal contract passed: read-only derived governance projection, independent observation surfaces, explicit authority/operational split, G0 fail-closed, Ring B observe-only, mutation disabled, and no obvious credential/private-path leaks.');
