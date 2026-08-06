import { readFileSync, existsSync } from 'node:fs';

const requiredFiles = [
  'src/styles/tokens/system.css',
  'src/styles/themes/paper.css',
  'src/styles/themes/field.css',
  'src/styles/themes/cockpit.css',
  'src/styles/home-v2.css',
  'docs/PORTAL-DESIGN-SYSTEM-v1.md',
];

const failures = [];
for (const file of requiredFiles) {
  if (!existsSync(file)) failures.push(`missing required file: ${file}`);
}

const checks = [
  ['src/layouts/BaseLayout.astro', ['data-mode={mode}', 'skip-link', 'reading-progress']],
  ['src/components/Header.astro', ['mobile-menu', '<details', 'aria-current']],
  ['src/components/ToolLayout.astro', ['localStorage', 'tool-progress-bar', 'clear-local-draft']],
  ['src/pages/articles/[...id].astro', ['article-toc', 'reading-progress-bar', 'EvidenceBadge', 'ModuleCoordinate']],
  ['src/pages/index.astro', ['mode="field"', 'data-article-ledger', 'timeline-stage', 'ledger-search', 'evidence-filter', 'article-result-count']],
  ['src/styles/home-v2.css', ['.trilogy-matrix', '.column-table', '.timeline-stage', '.article-row[hidden]']],
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

console.log('Design contract passed: paper/field/cockpit, homepage ledger, accessibility, reading and local-work states are present.');
