#!/usr/bin/env node
/**
 * One-time migration: uploads the 17 service photos + the doctor photo to Sanity and creates the matching
 * documents (services, doctor, clinic settings) with the current titles/descriptions.
 *
 *   Preview (no credentials needed, nothing is written):  npm run migrate:dry
 *   Real run:                                             npm run migrate
 *   Overwrite documents that already exist (DANGER: replaces edits made in the Studio):  npm run migrate -- --force
 *
 * Needs (in .env.local, see .env.local.example): NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * SANITY_API_WRITE_TOKEN. Safe to re-run: existing documents are skipped unless --force is given.
 */
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const seed = JSON.parse(fs.readFileSync(path.join(root, 'scripts/seed-data.json'), 'utf8'));
const DRY = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,              // <-- your Sanity project ID (sanity.io/manage)
  NEXT_PUBLIC_SANITY_DATASET: dataset = 'production',    // <-- dataset name, normally "production"
  NEXT_PUBLIC_SANITY_API_VERSION: apiVersion = '2024-01-01',
  SANITY_API_WRITE_TOKEN: token,                         // <-- SECRET "Editor" token (sanity.io/manage > API > Tokens)
} = process.env;

if (!DRY && (!projectId || !token)) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN. Fill them in .env.local first (see .env.local.example).');
  process.exit(1);
}
const client = DRY ? null : createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// Service id -> photo file in /public/services (names on disk differ from the ids for four services).
const SERVICE_FILES = {
  'db-shoes': 'db-shoes.jpg', 'hand-splint': 'hand-splint.jpg', 'hallux-valgus': 'hallux-splint.jpg',
  'ptb-brace': 'ptb-brace.jpg', 'prosthetic-gloves': 'prosthetic-gloves.jpg', 'silicone-insole': 'foot-insole.jpg',
  'hip-abduction': 'hip-abduction.jpg', 'ak-leg': 'ak-leg.jpg', 'bk-leg': 'bk-leg.jpg', hkafo: 'hkafo.jpg',
  kafo: 'kafo.jpg', afo: 'aafo.jpg', 'double-shell': 'double-shell-long-leg.jpg', dfo: 'dfo.jpg',
  'humerus-brace': 'humerus-brace.jpg', 'spinal-jacket': 'spinal-jacket.jpg', 'thigh-brace': 'thigh-brace.jpg',
};
const DOCTOR_FILE = 'team/Abuzar.jpg'; // inside /public

const key = () => randomUUID().slice(0, 8); // Sanity needs a unique _key on every array item

async function uploadImage(relPath) {
  const full = path.join(root, 'public', relPath);
  if (!fs.existsSync(full)) { console.warn(`  ! file not found, skipping image: public/${relPath}`); return undefined; }
  if (DRY) { console.log(`  [dry-run] would upload public/${relPath}`); return undefined; }
  const asset = await client.assets.upload('image', fs.createReadStream(full), { filename: path.basename(full) });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function save(doc) {
  if (DRY) { console.log(`  [dry-run] would create ${doc._type} "${doc._id}"`); return; }
  if (!FORCE && (await client.getDocument(doc._id))) { console.log(`  = ${doc._id} already exists, skipped (use --force to overwrite)`); return; }
  await client.createOrReplace(doc);
  console.log(`  + saved ${doc._id}`);
}

async function main() {
  console.log(DRY ? 'DRY RUN: nothing will be written.\n' : `Migrating to project ${projectId} / ${dataset}\n`);

  console.log('Services');
  for (const [i, s] of seed.services.entries()) {
    const image = SERVICE_FILES[s.id] ? await uploadImage(`services/${SERVICE_FILES[s.id]}`) : undefined;
    await save({
      _id: `service-${s.id}`, _type: 'service', title: s.titleEn, titleUr: s.titleUr,
      slug: { _type: 'slug', current: s.id }, descriptionEn: s.descriptionEn, descriptionUr: s.descriptionUr,
      order: i + 1, ...(image && { image }),
    });
  }

  console.log('\nDoctor');
  const d = seed.doctor;
  const photo = await uploadImage(DOCTOR_FILE);
  await save({
    _id: 'doctor-lead', _type: 'doctor', name: d.name.en, nameUr: d.name.ur, badge: d.title.en, badgeUr: d.title.ur,
    title: d.role.en, titleUr: d.role.ur, bio: d.bio.en, bioUr: d.bio.ur,
    specialties: d.tags.map((t) => t.en), specialtiesUr: d.tags.map((t) => t.ur), order: 1, ...(photo && { image: photo }),
  });

  console.log('\nClinic settings');
  const c = seed.clinic;
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = DAYS.map((day) => {
    const slots = c.schemaHours.filter((h) => h.days.includes(day)).map((h) => ({ _key: key(), opens: h.opens, closes: h.closes }));
    return { _key: key(), _type: 'dayHours', day, closed: slots.length === 0, slots };
  });
  await save({
    _id: 'clinicSettings', _type: 'clinicSettings', hours,
    homeServiceEn: c.homeService.en, homeServiceUr: c.homeService.ur, whatsapp: c.whatsapp,
    contacts: c.contacts.map((p) => ({ _key: key(), label: p.name.en, labelUr: p.name.ur, role: p.role.en, roleUr: p.role.ur, phone: p.phone })),
    ...(c.social?.facebook && { facebook: c.social.facebook }), ...(c.social?.instagram && { instagram: c.social.instagram }),
    ...(c.mapsUrl && { mapsUrl: c.mapsUrl }),
  });

  console.log('\nDone. Open /admin to review, then rebuild the site.');
}

main().catch((e) => { console.error('\nMigration failed:', e.message); process.exit(1); });
