import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const maxIndex = args.indexOf('--max-hours');
const maxHours = maxIndex >= 0 ? Number(args[maxIndex + 1]) : 24;
if (!Number.isFinite(maxHours) || maxHours <= 0) throw new Error('invalid --max-hours');

const intake = JSON.parse(readFileSync('src/data/studio/source-snapshots.current.json', 'utf8'));
const observed = new Date(intake.observedAt);
if (Number.isNaN(observed.getTime())) throw new Error('invalid source snapshot observedAt');
const ageHours = (Date.now() - observed.getTime()) / 3_600_000;
if (ageHours < 0) throw new Error(`source snapshot observedAt is in the future: ${intake.observedAt}`);

console.log(`Studio source age: ${ageHours.toFixed(2)}h; max=${maxHours}h; observedAt=${intake.observedAt}`);
if (ageHours > maxHours) {
  console.error(`Studio source snapshot STALE: ${ageHours.toFixed(2)}h > ${maxHours}h. Refresh through governed connector intake; do not add a cross-repo PAT to Web CI.`);
  process.exit(1);
}
