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
  'docs/PORTAL-DESIGN-SYSTEM-v1.md',
  'docs/FIRST-SUCCESS-JOURNEY-v1.md',
  'docs/UX-CONSISTENCY-CONTRACT-v1.md',
];

const failures = [];
for (const file of requiredFiles) if (!existsSync(file)) failures.push(`missing required file: ${file}`);

const checks = [
  ['src/layouts/BaseLayout.astro', ['data-mode={mode}', 'mode-strip', '阅读模式', '观察模式', '工作模式', 'yuanli-navigation:v0.2']],
  ['src/components/Header.astro', ['用户主导航', "label: '看时代'", "label: '找原力'", "label: '做生意'", "label: '建系统'", "label: '文章'", "label: '案例'", "label: '工具'", "label: '正典'", 'currentPathParam === key']],
  ['src/components/Footer.astro', ['关于我们如何工作', '没有真实结果，不写成成功案例']],
  ['src/components/ToolLayout.astro', ['generatedAsset', 'initialValues', 'isMeaningfullyFilled', '删除已保存草稿', 'hasAsset']],
  ['src/pages/articles/[...id].astro', ['article-context', 'previous-location', '证据与阅读边界', 'article.data.nextAction?.label']],
  ['src/pages/articles/index.astro', ["requestedType", "activeType === 'case'", 'history.replaceState']],
  ['src/pages/index.astro', ['mode="field"', 'data-first-success-journey', 'primary-diagnostic-cta', 'symptom-entry-grid', 'journey-resume', 'truth-card']],
  ['src/pages/start.astro', ['yuanli-navigation:v0.2', 'resume-conflict', 'const scopes', 'indexes: [0,1,2]', 'indexes: [3,4,5,6]', 'indexes: [7,8]', '并列位置']],
  ['src/pages/tools/index.astro', ['综合诊断｜建议完成基础导航后使用', '基础行动']],
  ['src/pages/about.astro', ['建设者信息结构', "title: '主题'", "title: '栏目'", "title: '战役'", "title: '旗舰'", "title: '发布状态'", "title: '回写协议'"]],
  ['src/styles/first-success.css', ['.symptom-entry-grid', '.resume-card', '.tool-outcome-grid', '.story-track-grid']],
  ['src/styles/global.css', ["@import './tokens/system.css'", "@import './themes/paper.css'", 'prefers-reduced-motion', ':focus-visible']],
  ['docs/PORTAL-DESIGN-SYSTEM-v1.md', ['旧版“首页高密度总控台”合同正式废止', '看时代', '案例', '回写协议']],
  ['docs/INFORMATION-ARCHITECTURE.md', ['用户可见一级导航', '建设者信息架构', '3分钟原力导航 v0.2']],
];

for (const [file, needles] of checks) {
  if (!existsSync(file)) { failures.push(`missing contract target: ${file}`); continue; }
  const content = readFileSync(file, 'utf8');
  for (const needle of needles) if (!content.includes(needle)) failures.push(`${file} missing contract marker: ${needle}`);
}

const header = existsSync('src/components/Header.astro') ? readFileSync('src/components/Header.astro', 'utf8') : '';
if (header.includes('explore-menu')) failures.push('Header must not restore explore-menu into user primary navigation');
if (header.includes("label: '探索'")) failures.push('Header must not expose builder taxonomy as primary user navigation');

if (failures.length) {
  console.error('Design contract failed:\n' + failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log('Design contract passed: user IA, scoped navigation, mode continuity, tool assets, article return paths and builder IA boundaries are present.');
