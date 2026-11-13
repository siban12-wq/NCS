import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const contentDir = path.join(rootDir, 'src', 'content');
const publicDir = path.join(rootDir, 'public');

function checkContent() {
  console.log('--- TEAM NCS Content & Integrity Checker ---');
  let hasWarnings = false;

  // 1. Check site.ts for TODOs
  const siteTsPath = path.join(contentDir, 'site.ts');
  if (fs.existsSync(siteTsPath)) {
    const siteContent = fs.readFileSync(siteTsPath, 'utf8');
    const todos = siteContent.match(/\/\/\s*TODO:.*|TODO:.*/gi) || [];
    console.log(`\n1. Found ${todos.length} TODO item(s) in src/content/site.ts:`);
    for (const todo of todos) {
      console.log(`   - ${todo.trim()}`);
    }
  } else {
    console.warn('   [Warning] src/content/site.ts does not exist yet.');
    hasWarnings = true;
  }

  // 2. Check memories.manifest.json & captions.json
  const manifestPath = path.join(contentDir, 'memories.manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log(`\n2. Verifying memories manifest (${manifest.photos.length} photos):`);
    let missingFiles = 0;
    let missingAlts = 0;
    let needsReviewCount = 0;

    for (const photo of manifest.photos) {
      // Check physical file presence in public
      const displayPath = path.join(publicDir, photo.display.replace(/^\//, ''));
      const thumbPath = path.join(publicDir, photo.thumb.replace(/^\//, ''));

      if (!fs.existsSync(displayPath)) {
        console.warn(`   [Missing file] Display image missing: ${photo.display}`);
        missingFiles++;
      }
      if (!fs.existsSync(thumbPath)) {
        console.warn(`   [Missing file] Thumbnail image missing: ${photo.thumb}`);
        missingFiles++;
      }
      if (!photo.alt || photo.alt.trim() === '') {
        console.warn(`   [Missing alt] Photo ${photo.id} has empty alt text!`);
        missingAlts++;
      }
      if (photo.needsReview) {
        needsReviewCount++;
      }
    }

    console.log(`   - Missing files: ${missingFiles}`);
    console.log(`   - Missing alts: ${missingAlts}`);
    console.log(`   - Photos needing review: ${needsReviewCount}`);

    if (missingFiles > 0 || missingAlts > 0) hasWarnings = true;
  } else {
    console.log('\n2. memories.manifest.json not generated yet (run "npm run photos" first).');
  }

  // 3. Check brand & optional assets
  console.log('\n3. Brand & Media Assets:');
  const logoSvg = path.join(publicDir, 'brand', 'logo.svg');
  const logoPng = path.join(publicDir, 'brand', 'logo.png');
  const hasLogo = fs.existsSync(logoSvg) || fs.existsSync(logoPng);
  console.log(`   - Logo asset: ${hasLogo ? 'Present' : 'Not supplied (using geometric orb fallback)'}`);

  const ambientAudio = path.join(publicDir, 'audio', 'ambient.mp3');
  console.log(`   - Ambient audio: ${fs.existsSync(ambientAudio) ? 'Present' : 'Optional (audio toggle will remain muted/disabled)'}`);

  console.log('\n--- Content Check Complete ---');
  if (hasWarnings) {
    console.log('Result: Passed with warnings (placeholders/soft issues logged).');
  } else {
    console.log('Result: All content integrity checks passed.');
  }
}

checkContent();
