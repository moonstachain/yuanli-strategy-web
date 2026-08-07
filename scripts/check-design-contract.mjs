import { readFileSync, existsSync } from 'node:fs';

const requiredFiles = [
  'src/styles/tokens/system.css',
  'src/styles/themes/paper.css',
  'src/styles/themes/field.css',
  'src/styles/themes/cockpit.css',
  'src/styles/home-v2.css',
  'src/styles/first-success.css',
  'src/pages/start.astro',
  'src/pages/status.astro',
  'src/layouts/StudioLayout.astro',
  'src/data/studio.ts',
  'src/data/studio/source-manifest.json',
  'src/data/studio/source-snapshots.current.json',
  'src/data/studio/studio-view.lkg.json',
  'src/lib/studio/contracts.ts',
  'src/lib/studio/source-registry.ts',
  'scripts/produce-studio-snapshot.mjs',
  'scripts/check-studio-source-age.mjs',
  'scripts/build-studio-projection.mjs',
  'scripts/check-studio-contract.mjs',
  '.github/workflows/studio-source-health.yml',
  'src/pages/studio/index.astro',
  'src/pages/studio/radar.astro',
  'src/pages/studio/research.astro',
  'src/pages/studio/production.astro',
  'src/pages/studio/publish.astro',
  'src/pages/studio/outcomes.astro',
  'src/pages/studio/system.astro',
  'src/pages/studio/campaigns/[id].astro',
  'docs/PORTAL-DESIGN-SYSTEM-v1.md',
  'docs/FIRST-SUCCESS-JOURNEY-v1.md',
  'docs/UX-CONSISTENCY-CONTRACT-v1.md',
  'docs/PRODUCER-STUDIO-v1.md',
  'docs/STUDIO-PRODUCT-CONSTITUTION-v2.md',
  'docs/STUDIO-DATA-CONTRACT-v1.md',
  'docs/STUDIO-DEEPLINK-CONTRACT-v1.md',
  'docs/STUDIO-REALITY-CONTRACT-v1.md',
  'docs/STUDIO-SNAPSHOT-PRODUCER-v1.md',
  'docs/STUDIO-PRODUCER-TEST-PACKET-v2.md',
];

const failures = [];
for (const file of requiredFiles) if (!existsSync(file)) failures.push(`missing required file: ${file}`);

const checks = [
  ['src/layouts/BaseLayout.astro', ['data-mode={mode}', 'mode-strip', '阅读模式', '观察模式', '工作模式', 'yuanli-navigation:v0.2']],
  ['src/components/Header.astro', ['用户主导航', "label: '看时代'", "label: '找原力'", "label: '做生意'", "label: '建系统'", "label: '文章'", "label: '案例'", "label: '工具'", "label: '正典'", 'currentPathParam === key']],
  ['src/components/Footer.astro', ['关于我们如何工作', '没有真实结果，不写成成功案例', '生产者 Studio']],
  ['src/components/ToolLayout.astro', ['generatedAsset', 'initialValues', 'isMeaningfullyFilled', '删除已保存草稿', 'hasAsset']],
  ['src/pages/articles/[...id].astro', ['article-context', 'previous-location', '证据与阅读边界', 'article.data.nextAction?.label']],
  ['src/pages/articles/index.astro', ["requestedType", "activeType === 'case'", 'history.replaceState']],
  ['src/pages/index.astro', ['mode="field"', 'data-first-success-journey', 'primary-diagnostic-cta', 'symptom-entry-grid', 'journey-resume', 'truth-card']],
  ['src/pages/start.astro', ['yuanli-navigation:v0.2', 'resume-conflict', 'const scopes', 'indexes: [0,1,2]', 'indexes: [3,4,5,6]', 'indexes: [7,8]', '并列位置']],
  ['src/pages/tools/index.astro', ['综合诊断｜建议完成基础导航后使用', '基础行动']],
  ['src/pages/about.astro', ['建设者信息结构', "title: '主题'", "title: '栏目'", "title: '战役'", "title: '旗舰'", "title: '发布状态'", "title: '回写协议'"]],
  ['src/layouts/StudioLayout.astro', ['原力 Studio', 'Mission Control', 'Derived Projection', 'Studio不是第七个真源', 'studioView']],
  ['src/data/studio.ts', ['studioView', 'producerNav', "label: '今日'", "label: '雷达'", "label: '研究'", "label: '生产'", "label: '发布'", "label: '学习'", "label: '系统'"]],
  ['src/data/studio/source-manifest.json', ['studio-source-manifest/v1', '"webCiCrossRepoCredential": "NONE"', '"directCrossRepoFetchFromWebCi": false', '"maxAgeHours": 24', '"healthCheckHours": 6']],
  ['src/data/studio/source-snapshots.current.json', ['MG-D2-ai-distillation-v1', 'governed_connector', 'UNASSIGNED_HUMAN / NOT_RUN', '0/10 · NOT_RUN', 'Day7 · NOT_RUN', 'MISSING_ROUTE', 'ROUTE_PRESENT']],
  ['scripts/produce-studio-snapshot.mjs', ['studio-snapshot-receipt/v1', 'inputSha256', 'localWebRouteVerified', 'directCrossRepoCredentialUsed', 'forbiddenKey']],
  ['scripts/check-studio-source-age.mjs', ['--max-hours', 'Studio source snapshot STALE', 'governed connector intake']],
  ['.github/workflows/studio-source-health.yml', ["cron: '17 */6 * * *'", 'contents: read', 'check-studio-source-age.mjs --max-hours 24', 'no cross-repo PAT']],
  ['src/lib/studio/source-registry.ts', ['studioFieldAuthority', 'signal.candidate', 'deployment.receipt', 'bao.html', 'content-engine-workbench/index.html#orchestration/overview']],
  ['src/lib/studio/contracts.ts', ['StudioSnapshotReceiptView', 'StudioCampaignRoom', 'StudioDeepLink', 'campaignRoom?', 'deepLinks?']],
  ['src/data/campaigns.ts', ["id: 'ai-distillation'", "'when-experience-becomes-skill'", "'extractable-ability-vs-generative-source'", "'ai-clearance-action-guide'", "href: '/tools/ai-clearance/'"]],
  ['src/content/articles/when-experience-becomes-skill.md', ['evidenceLevel: hypothesis', 'sourceStatus: source_pack_ready', 'Human Evidence Review', '7日 Outcome']],
  ['src/pages/studio/index.astro', ['Current Gate', 'Waiting Reality', '系统阻塞', 'SOURCE CONFLICT', 'North Star']],
  ['src/pages/studio/research.astro', ['Claim Board', 'MINIMUM PACK READY', 'Human Evidence Review', 'Hypothesis']],
  ['src/pages/studio/campaigns/[id].astro', ['Contract', 'Evidence', 'Works', 'Distribution', 'Reality', 'Learning', 'Verified Deep Links', 'SOURCE CONFLICT', 'P01–P03']],
  ['src/pages/studio/publish.astro', ['最小包已就绪，人审未完成', 'C03 · HYPOTHESIS', 'Workbench verified overview']],
  ['src/pages/studio/outcomes.astro', ['Published → Used → Validated → Compounding', 'Human Gate required', 'WAITING_CHANGED_RULE']],
  ['src/pages/studio/system.astro', ['Snapshot Producer', 'Cross-repo credential', '24h', '每6h', 'Source Health', '字段法权', 'Bao · Signal Workbench', 'Content Workbench · Expert Console']],
  ['src/styles/first-success.css', ['.symptom-entry-grid', '.resume-card', '.tool-outcome-grid', '.story-track-grid']],
  ['src/styles/global.css', ["@import './tokens/system.css'", "@import './themes/paper.css'", 'prefers-reduced-motion', ':focus-visible']],
  ['docs/PORTAL-DESIGN-SYSTEM-v1.md', ['旧版“首页高密度总控台”合同正式废止', '看时代', '案例', '回写协议']],
  ['docs/INFORMATION-ARCHITECTURE.md', ['用户可见一级导航', '建设者信息架构', '3分钟原力导航 v0.2']],
  ['docs/STUDIO-PRODUCT-CONSTITUTION-v2.md', ['Producer Mission Control', 'No seventh truth source', 'Next Gate > percent complete', 'AI正在蒸馏你']],
  ['docs/STUDIO-DATA-CONTRACT-v1.md', ['字段法权', 'Last Known Good', 'derived_projection: true', '不做静默平均']],
  ['docs/STUDIO-DEEPLINK-CONTRACT-v1.md', ['Read + Route', 'Bao', 'Content Workbench', '直接改 Canon']],
  ['docs/STUDIO-REALITY-CONTRACT-v1.md', ['Published ≠ Used', 'Waiting Reality', '三复利轮', 'WAITING_CHANGED_RULE']],
  ['docs/STUDIO-SNAPSHOT-PRODUCER-v1.md', ['cross_repo_credential = NONE', 'Governed Connector Intake', 'SHA256 receipt', '24h', '每 6 小时']],
  ['docs/STUDIO-PRODUCER-TEST-PACKET-v2.md', ['P01', 'P02', 'P03', 'EMPTY · NOT_RUN', 'C03 仍为 `Hypothesis`', 'Control Plane']],
];

for (const [file, needles] of checks) {
  if (!existsSync(file)) { failures.push(`missing contract target: ${file}`); continue; }
  const content = readFileSync(file, 'utf8');
  for (const needle of needles) if (!content.includes(needle)) failures.push(`${file} missing contract marker: ${needle}`);
}

const header = existsSync('src/components/Header.astro') ? readFileSync('src/components/Header.astro', 'utf8') : '';
if (header.includes('explore-menu')) failures.push('Header must not restore explore-menu into user primary navigation');
if (header.includes("label: '探索'")) failures.push('Header must not expose builder taxonomy as primary user navigation');

const studio = existsSync('src/data/studio.ts') ? readFileSync('src/data/studio.ts', 'utf8') : '';
if (studio.includes('studioSnapshot = {')) failures.push('Studio must not restore a manually maintained aggregate snapshot');
if (!studio.includes('studioView')) failures.push('Studio must consume the derived projection');

if (failures.length) {
  console.error('Design contract failed:\n' + failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log('Design contract passed: C-side IA remains stable while Studio v2 Phase 1.5/2 adds governed snapshot production, Campaign Room, verified deep links and producer-test readiness without weakening reality gates.');
