// Snapshot the live Ask Barry skills curve into assets/skills-curve.png.
// Only replaces the image when the chart's own content changed (dots, tiers, labels),
// so the repo does not get a new commit every night just because the date in the header moved.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const URL = process.env.CURVE_URL || 'https://ask-barry.onrender.com/curve';
const OUT_DIR = 'assets';
const PNG = path.join(OUT_DIR, 'skills-curve.png');
const STATE = path.join(OUT_DIR, 'skills-curve.state.txt');
const MAX_AGE_DAYS = 3; // fail loudly if Ask Barry's evidence date is older than this

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function load(page) {
  // Render free tier cold-starts slowly, so retry with long timeouts.
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      await page.goto(URL, { waitUntil: 'networkidle', timeout: 120000 });
      await page.waitForSelector('svg text', { timeout: 60000 });
      return;
    } catch (e) {
      console.log(`Attempt ${attempt} failed: ${e.message}`);
      if (attempt === 4) throw e;
      await sleep(30000);
    }
  }
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1160, height: 913 }, deviceScaleFactor: 2 });
await load(page);

// 1. The chart's content as plain text: labels, tier numbers, evidence names.
const state = await page.evaluate(() =>
  [...document.querySelectorAll('svg text')].map((t) => t.textContent.trim()).filter(Boolean).join('\n'));
if (state.split('\n').length < 20) throw new Error('Chart text looks empty or wrong; refusing to overwrite the image.');

// 2. Freshness check on the "Evidence as of 12 Nov 2026" line.
const bodyText = await page.evaluate(() => document.body.innerText);
const m = bodyText.match(/Evidence as of (\d{1,2} \w+ \d{4})/);
if (m) {
  const age = (Date.now() - Date.parse(m[1] + ' UTC')) / 86400000;
  console.log(`Ask Barry evidence date: ${m[1]} (${age.toFixed(1)} days old)`);
  if (age > MAX_AGE_DAYS) throw new Error(`Ask Barry's evidence date is ${m[1]}: its nightly update looks stale.`);
} else {
  console.log('Warning: no "Evidence as of" line found; skipping freshness check.');
}

// 3. Only write the PNG if the chart content changed.
fs.mkdirSync(OUT_DIR, { recursive: true });
const old = fs.existsSync(STATE) ? fs.readFileSync(STATE, 'utf8') : '';
if (old === state && fs.existsSync(PNG)) {
  console.log('Chart unchanged since last snapshot; nothing to do.');
} else {
  await page.screenshot({ path: PNG, clip: { x: 0, y: 0, width: 1160, height: 913 } });
  fs.writeFileSync(STATE, state);
  console.log('Chart changed: wrote new PNG and state file.');
}
await browser.close();
