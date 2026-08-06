import { readFileSync, existsSync } from 'node:fs';

const requiredFiles = [
  'src/styles/tokens/system.css',
  'src/styles/themes/paper.css',
  'src/styles/themes/field.css',
  'src/styles/themes/cockpit.css',
  'src/styles/home-v2.css',
  'src/pages/start.astro',
  'src/pages/status.astro',
  'docs/PORTAL-DESIGN-SYSTEM-v1.md',
  'docs/FIRST-SUCCESS-JOURNEY-v1.md',
];

const failures = [];
for (const file of requiredFiles) {
  if (!existsSync(file)) failures.push(`missing required file: ${file}`);
}

const checks = [
  ['src/layouts/BaseLayout.astro', ['data-mode={mode}', 'skip-link', 'reading-progress']],
  ['src/components/Header.astro', ['task-nav', 'explore-menu', 'aria-current']],
  ['src/components/ToolLayout.astro', ['localStorage', 'tool-progress-bar', 'clear-local-draft', 'yuanli-journey:last']],
  ['src/pages/articles/[...id].astro', ['article-toc', 'reading-progress-bar', 'EvidenceBadge', 'ModuleCoordinate']],
  ['src/pages/articles/index.astro', ['article-search', 'article-result-count', 'data-search-item']],
  ['src/pages/index.astro', ['mode="field"', 'data-first-success-journey', 'primary-diagnostic-cta', 'symptom-entry-grid', 'journey-resume', 'truth-card']],
  ['src/pages/start.astro', ['yuanli-navigation:v0.1', 'navigation-result', 'navigation-disclaimer', 'localStorage']],
  ['src/styles/home-v2.css', ['.symptom-entry-grid', '.resume-card', '.tool-outcome-grid', '.story-track-grid']],
  ['src/styles/global.css', ["@import './tokens/system.css'", "@import './themes/paper.css'", 'prefers-reduced-motion', ':focus-visible']],
];

for (const [file, needles] of checks) {
  if (!existsSync(file)) {
    failures.push(`missing contract target: ${file}`);
    continue;
  }
  const content = readFileSync(file, 'utf8');
  for (const needle of needles) {
    if (!content.includes(needle)) failures.push(`${file} missing contract marker: ${needle}`);
  }
}

if (failures.length) {
  console.error('Design contract failed:\n' + failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log('Design contract passed: first-success journey, task navigation, article search, truth ledger, reading and local continuity states are present.');
