import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

// Offline aggregate comparison only. No database credentials, user rows, or network clients.
export function parseCounts(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.shift() !== 'date,new_registrations') throw new Error('Only date,new_registrations aggregates are accepted; no PII columns');
  const result = new Map();
  for (const line of lines) {
    const [date, raw, extra] = line.split(',');
    if (extra !== undefined || !/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(date).toISOString().slice(0, 10) !== date || !/^\d+$/.test(raw)) throw new Error('Invalid daily aggregate');
    if (result.has(date)) throw new Error('Duplicate date');
    const count = Number(raw);
    if (!Number.isSafeInteger(count)) throw new Error('Invalid count');
    result.set(date, count);
  }
  return result;
}
export function reconcile(backend, ga4, metrica) {
  return [...new Set([...backend.keys(), ...ga4.keys(), ...metrica.keys()])].sort().map(date => ({
    date,
    backend: backend.get(date) ?? null,
    ga4ConsentedNewRegistrations: ga4.get(date) ?? null,
    metricaConsentedNewRegistrations: metrica.get(date) ?? null,
    // Difference is an observation, not an estimate of refused/missing individuals.
    ga4Difference: backend.has(date) && ga4.has(date) ? backend.get(date) - ga4.get(date) : null,
    metricaDifference: backend.has(date) && metrica.has(date) ? backend.get(date) - metrica.get(date) : null,
  }));
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, value, i, all) => i % 2 === 0 ? [...pairs, [value, all[i + 1]]] : pairs, []));
  for (const key of ['--backend', '--ga4', '--metrica', '--timezone']) if (!args[key]) throw new Error('Required: --backend CSV --ga4 CSV --metrica CSV --timezone IANA');
  new Intl.DateTimeFormat('en', { timeZone: args['--timezone'] }).format();
  const read = name => parseCounts(fs.readFileSync(args[name], 'utf8'));
  console.log(JSON.stringify({ timezone: args['--timezone'], scope: 'Backend unique new accounts vs consented new-account completion events; existing logins excluded. Missing dates are null. No backfill or inferred consent.', rows: reconcile(read('--backend'), read('--ga4'), read('--metrica')) }, null, 2));
}
