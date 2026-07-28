/**
 * GCBT Database Seeder
 * Seeds the MySQL database with the default courses, faculty, and events from data.js
 * Run once: node seed.cjs
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:8002/api/api.php';

function apiPost(action, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const url = new URL(`${API_BASE}?action=${action}`);
    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = http.request(options, (res) => {
      let raw = '';
      res.on('data', (chunk) => raw += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); } catch { resolve(raw); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function seed() {
  console.log('=== GCBT Database Seeder ===\n');

  // Dynamically import the ESM data module by reading and extracting JSON via regex
  const dataPath = path.join(__dirname, 'src', 'data.js');
  const dataFile = fs.readFileSync(dataPath, 'utf-8');

  // We'll use a temporary transpile approach - write a temp CJS extractor
  const tempScript = path.join(__dirname, '.temp_seed_extract.mjs');
  fs.writeFileSync(tempScript, `
import { courses, facultyStaff, events } from './src/data.js';
import fs from 'fs';
fs.writeFileSync('.temp_seed_data.json', JSON.stringify({ courses, facultyStaff, events }));
`);

  // Run the extractor
  const { execSync } = require('child_process');
  try {
    execSync('node .temp_seed_extract.mjs', { cwd: __dirname });
  } catch (e) {
    console.error('Failed to extract data:', e.message);
    process.exit(1);
  }

  const { courses, facultyStaff, events } = JSON.parse(
    fs.readFileSync(path.join(__dirname, '.temp_seed_data.json'), 'utf-8')
  );

  // Cleanup temp files
  fs.unlinkSync(tempScript);
  fs.unlinkSync(path.join(__dirname, '.temp_seed_data.json'));

  // Seed Courses
  console.log(`Seeding ${courses.length} courses...`);
  const coursesRes = await apiPost('save_courses', courses);
  console.log('Courses:', JSON.stringify(coursesRes));

  // Seed Faculty
  console.log(`\nSeeding ${facultyStaff.length} faculty members...`);
  const facultyRes = await apiPost('save_faculty', facultyStaff);
  console.log('Faculty:', JSON.stringify(facultyRes));

  // Seed Events
  console.log(`\nSeeding ${events.length} events...`);
  const eventsRes = await apiPost('save_events', events);
  console.log('Events:', JSON.stringify(eventsRes));

  console.log('\n✅ Database seeded successfully!');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
