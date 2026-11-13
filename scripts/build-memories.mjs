import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const publicMemoriesDir = path.join(rootDir, 'public', 'memories');
const originalsCaptionsDir = path.join(rootDir, '_originals', 'captions');
const contentDir = path.join(rootDir, 'src', 'content');
const docsDir = path.join(rootDir, 'docs');

const chaptersConfig = [
  { slug: 'campus', title: 'Our Campus', blurb: 'Green, open, and full of sky — the spaces where our days begin.' },
  { slug: 'team', title: 'The Team', blurb: 'The streams that met: students supporting students in royal blue.' },
  { slug: 'support', title: 'On Duty', blurb: 'Present and listening during orientations, PTMs, and daily campus life.' },
  { slug: 'celebrate', title: 'Moments of Joy', blurb: 'Small celebrations, shared laughter, and community.' },
  { slug: 'more', title: 'More Memories', blurb: 'Snapshots across the academic seasons.' },
];

const chapterAssignmentRules = {
  'campus-01': 'campus',
  'campus-03': 'campus',
  'campus-04': 'campus',
  'campus-05': 'campus',
  'campus-06': 'campus',
  'campus-07': 'campus',
  'campus-08': 'campus',
  'campus-hills': 'campus',
  'team-in-blue': 'team',
  'team-on-duty': 'team',
  'under-the-trees': 'team',
  'help-desk': 'support',
  'celebration': 'celebrate',
};

async function main() {
  console.log('--- TEAM NCS: Photo Pipeline & Manifest Builder ---');

  if (!fs.existsSync(publicMemoriesDir)) {
    console.error(`Error: Directory not found: ${publicMemoriesDir}`);
    process.exit(1);
  }

  // Ensure output dirs exist
  fs.mkdirSync(contentDir, { recursive: true });
  fs.mkdirSync(docsDir, { recursive: true });

  let sharp;
  try {
    const sharpModule = await import('sharp');
    sharp = sharpModule.default || sharpModule;
  } catch (err) {
    console.warn('Warning: Sharp not loaded yet (may be installing). Proceeding with fallback metadata.');
  }

  // 1. Scan public/memories
  const files = fs.readdirSync(publicMemoriesDir);
  const photoMap = new Map();

  for (const file of files) {
    if (file.startsWith('.') || file.endsWith('.json')) continue;
    
    // Group files by base name
    // e.g. campus-01-1600.webp -> base = campus-01
    // e.g. campus-01-480.webp -> base = campus-01
    // e.g. campus-01.jpg -> base = campus-01
    // e.g. campus-hills-1600.webp -> base = campus-hills
    let id = file;
    let type = 'unknown';

    if (file.endsWith('-1600.webp')) {
      id = file.slice(0, -'-1600.webp'.length);
      type = 'display';
    } else if (file.endsWith('-480.webp')) {
      id = file.slice(0, -'-480.webp'.length);
      type = 'thumb';
    } else if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      id = file.replace(/\.(jpg|jpeg|png)$/i, '');
      type = 'original';
    }

    if (!photoMap.has(id)) {
      photoMap.set(id, { id });
    }
    const entry = photoMap.get(id);
    if (type === 'display') entry.displayFile = file;
    if (type === 'thumb') entry.thumbFile = file;
    if (type === 'original') entry.originalFile = file;
  }

  console.log(`Found ${photoMap.size} distinct photo sets.`);

  // 2. Fill gaps with sharp if missing
  for (const [id, entry] of photoMap.entries()) {
    const originalPath = entry.originalFile ? path.join(publicMemoriesDir, entry.originalFile) : null;
    
    if (sharp && originalPath && fs.existsSync(originalPath)) {
      // Missing 1600.webp?
      if (!entry.displayFile) {
        const targetName = `${id}-1600.webp`;
        const targetPath = path.join(publicMemoriesDir, targetName);
        console.log(`Generating missing 1600 rendition: ${targetName}`);
        await sharp(originalPath)
          .rotate()
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 78 })
          .toFile(targetPath);
        entry.displayFile = targetName;
      }

      // Missing 480.webp?
      if (!entry.thumbFile) {
        const targetName = `${id}-480.webp`;
        const targetPath = path.join(publicMemoriesDir, targetName);
        console.log(`Generating missing 480 rendition: ${targetName}`);
        await sharp(originalPath)
          .rotate()
          .resize({ width: 480, withoutEnlargement: true })
          .webp({ quality: 78 })
          .toFile(targetPath);
        entry.thumbFile = targetName;
      }
    }
  }

  // 3. Compute dimensions, aspect, blur data URI, and dominant color
  for (const [id, entry] of photoMap.entries()) {
    const inspectFile = entry.displayFile || entry.originalFile || entry.thumbFile;
    if (!inspectFile) continue;
    const inspectPath = path.join(publicMemoriesDir, inspectFile);

    entry.thumb = entry.thumbFile ? `/memories/${entry.thumbFile}` : `/memories/${inspectFile}`;
    entry.display = entry.displayFile ? `/memories/${entry.displayFile}` : `/memories/${inspectFile}`;
    entry.original = entry.originalFile ? `/memories/${entry.originalFile}` : `/memories/${inspectFile}`;

    if (sharp && fs.existsSync(inspectPath)) {
      try {
        const metadata = await sharp(inspectPath).metadata();
        entry.width = metadata.width || 1600;
        entry.height = metadata.height || 1067;
        entry.aspect = Number((entry.width / entry.height).toFixed(3));

        // 16px blur placeholder
        const blurBuffer = await sharp(inspectPath)
          .resize(16, null, { withoutEnlargement: true })
          .webp({ quality: 30 })
          .toBuffer();
        entry.blur = `data:image/webp;base64,${blurBuffer.toString('base64')}`;

        // Dominant color via 1x1 resize
        const { data } = await sharp(inspectPath)
          .resize(1, 1, { fit: 'cover' })
          .raw()
          .toBuffer({ resolveWithObject: true });
        
        const r = data[0].toString(16).padStart(2, '0');
        const g = data[1].toString(16).padStart(2, '0');
        const b = data[2].toString(16).padStart(2, '0');
        entry.dominant = `#${r}${g}${b}`;
      } catch (err) {
        console.warn(`Could not read sharp metadata for ${inspectFile}:`, err.message);
        entry.width = 1600;
        entry.height = 1067;
        entry.aspect = 1.5;
        entry.blur = '';
        entry.dominant = '#12163A';
      }
    } else {
      entry.width = 1600;
      entry.height = 1067;
      entry.aspect = 1.5;
      entry.blur = '';
      entry.dominant = '#12163A';
    }
  }

  // 4. Merge captions
  // Read captions.json, captions (1).json, captions (2).json
  const captionFiles = ['captions.json', 'captions (1).json', 'captions (2).json'];
  const captionRecords = [];

  for (const cFile of captionFiles) {
    const fullPath = path.join(originalsCaptionsDir, cFile);
    if (fs.existsSync(fullPath)) {
      try {
        const stat = fs.statSync(fullPath);
        const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        captionRecords.push({ file: cFile, mtime: stat.mtimeMs, data });
      } catch (err) {
        console.warn(`Warning reading caption file ${cFile}:`, err.message);
      }
    }
  }

  // Sort caption files by mtime ascending (latest comes last)
  captionRecords.sort((a, b) => a.mtime - b.mtime);

  const conflicts = [];
  const remainingTodos = [];
  const mergedCaptions = {};

  // For each photo ID in photoMap, gather caption data
  for (const [id, entry] of photoMap.entries()) {
    let resolvedAlt = null;
    let resolvedCaption = null;
    let resolvedStory = null;
    let resolvedYear = 2026;
    let resolvedJourney = false;
    let resolvedHidden = false;
    let resolvedNeedsReview = false;

    const valuesSeen = {
      alt: [],
      caption: [],
      story: [],
      year: [],
      journey: [],
      hidden: []
    };

    for (const rec of captionRecords) {
      // In these files, keys can be `NAME.jpg` or `NAME`
      const item = rec.data[`${id}.jpg`] || rec.data[id];
      if (!item) continue;

      if (rec.data._comment && rec.data._comment.includes('TODO')) {
        resolvedNeedsReview = true;
      }

      // alt
      if (item.alt !== undefined) {
        valuesSeen.alt.push({ file: rec.file, val: item.alt });
        if (item.alt && !resolvedAlt) resolvedAlt = item.alt;
        else if (item.alt && resolvedAlt && resolvedAlt !== item.alt) {
          conflicts.push({ id, field: 'alt', valuesSeen: `${resolvedAlt} vs ${item.alt}`, resolved: item.alt });
          resolvedAlt = item.alt; // newer wins
        }
      }

      // caption
      if (item.caption !== undefined) {
        valuesSeen.caption.push({ file: rec.file, val: item.caption });
        if (item.caption && !resolvedCaption) resolvedCaption = item.caption;
        else if (item.caption && resolvedCaption && resolvedCaption !== item.caption) {
          conflicts.push({ id, field: 'caption', valuesSeen: `${resolvedCaption} vs ${item.caption}`, resolved: item.caption });
          resolvedCaption = item.caption;
        }
      }

      // story
      if (item.story !== undefined) {
        resolvedStory = item.story;
      }

      // year
      if (item.year !== undefined) {
        resolvedYear = item.year;
      }

      // journey / featured
      if (item.featured !== undefined || item.journey !== undefined) {
        const isJourney = Boolean(item.journey ?? item.featured);
        resolvedJourney = isJourney;
      }

      // hidden
      if (item.hidden !== undefined) {
        resolvedHidden = Boolean(item.hidden);
      }
    }

    if (!resolvedAlt) {
      resolvedAlt = `TEAM NCS memory from campus, ${resolvedYear || 2026}`;
      remainingTodos.push({ id, issue: 'Missing alt text, fallback generated' });
    }

    if (resolvedCaption && resolvedCaption.includes('TODO')) {
      resolvedNeedsReview = true;
      remainingTodos.push({ id, issue: `Caption contains TODO: "${resolvedCaption}"` });
    }

    const chapter = chapterAssignmentRules[id] || 'more';

    mergedCaptions[id] = {
      id,
      chapter,
      alt: resolvedAlt,
      caption: resolvedCaption || null,
      story: resolvedStory || null,
      year: resolvedYear,
      journey: resolvedJourney,
      hidden: resolvedHidden,
      needsReview: resolvedNeedsReview || false,
    };
  }

  // Write canonical captions to src/content/captions.json
  const canonicalCaptionsPath = path.join(contentDir, 'captions.json');
  fs.writeFileSync(canonicalCaptionsPath, JSON.stringify(mergedCaptions, null, 2), 'utf8');
  console.log(`Saved canonical captions to ${canonicalCaptionsPath}`);

  // Write CAPTIONS_REPORT.md
  let reportMd = `# Captions & Metadata Report

Generated at: ${new Date().toISOString()}

## Summary
- Total photos scanned: ${photoMap.size}
- Captions files inspected: ${captionRecords.map(r => r.file).join(', ')}
- Conflicts detected: ${conflicts.length}
- Open review items: ${remainingTodos.length}

## Conflicts Resolution Table
| Photo ID | Field | Values Seen | Value Used |
|---|---|---|---|
`;

  if (conflicts.length === 0) {
    reportMd += `| (None) | - | No direct field conflicts found across caption sources | - |\n`;
  } else {
    for (const c of conflicts) {
      reportMd += `| \`${c.id}\` | ${c.field} | ${c.valuesSeen} | **${c.resolved}** |\n`;
    }
  }

  reportMd += `\n## Open Review Items & TODOs\n`;
  if (remainingTodos.length === 0) {
    reportMd += `* All photos have verified alt texts and complete captions.\n`;
  } else {
    for (const t of remainingTodos) {
      reportMd += `- **\`${t.id}\`**: ${t.issue}\n`;
    }
  }

  reportMd += `\n## Consent & Removal Mechanism\nTo omit any photograph from the published website without deleting files, set \`"hidden": true\` for that photo ID in \`src/content/captions.json\` and re-run \`npm run build\`.\n`;

  fs.writeFileSync(path.join(docsDir, 'CAPTIONS_REPORT.md'), reportMd, 'utf8');
  console.log('Saved docs/CAPTIONS_REPORT.md');

  // 5. Assemble final photos list for manifest
  const manifestPhotos = [];
  const chapterBuckets = new Map();
  for (const ch of chaptersConfig) {
    chapterBuckets.set(ch.slug, []);
  }

  for (const [id, entry] of photoMap.entries()) {
    const meta = mergedCaptions[id] || {
      id,
      chapter: chapterAssignmentRules[id] || 'more',
      alt: `TEAM NCS memory from campus, 2026`,
      caption: null,
      story: null,
      year: 2026,
      journey: false,
      hidden: false,
      needsReview: true
    };

    // If hidden, exclude from public manifest
    if (meta.hidden) {
      console.log(`Skipping hidden photo: ${id}`);
      continue;
    }

    const photoObj = {
      id,
      chapter: meta.chapter,
      thumb: entry.thumb,
      display: entry.display,
      original: entry.original,
      width: entry.width,
      height: entry.height,
      aspect: entry.aspect,
      blur: entry.blur,
      dominant: entry.dominant,
      alt: meta.alt,
      caption: meta.caption,
      story: meta.story,
      year: meta.year,
      journey: meta.journey,
      hidden: false,
      needsReview: meta.needsReview,
    };

    manifestPhotos.push(photoObj);

    if (!chapterBuckets.has(meta.chapter)) {
      chapterBuckets.set(meta.chapter, []);
    }
    chapterBuckets.get(meta.chapter).push(id);
  }

  // 6. Journey Selection (Corridor)
  // Ensure >= 8 journey photos if available, cap at 30
  let journeyPhotos = manifestPhotos.filter(p => p.journey);
  if (journeyPhotos.length < 8 && manifestPhotos.length > journeyPhotos.length) {
    const candidates = manifestPhotos.filter(p => !p.journey);
    // Sort wider aspect ratio first, then deterministic id
    candidates.sort((a, b) => b.aspect - a.aspect || a.id.localeCompare(b.id));
    for (const c of candidates) {
      c.journey = true;
      journeyPhotos.push(c);
      if (journeyPhotos.length >= 8) break;
    }
  }

  // If more than 30, cap
  if (journeyPhotos.length > 30) {
    journeyPhotos.slice(30).forEach(p => { p.journey = false; });
  }

  // 7. Output chapters in manifest
  const chapters = chaptersConfig
    .map(ch => ({
      slug: ch.slug,
      title: ch.title,
      blurb: ch.blurb,
      photoIds: chapterBuckets.get(ch.slug) || [],
    }))
    .filter(ch => ch.photoIds.length > 0);

  const manifest = {
    generatedAt: new Date().toISOString(),
    chapters,
    photos: manifestPhotos,
  };

  const manifestPath = path.join(contentDir, 'memories.manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Successfully generated manifest at ${manifestPath} with ${manifestPhotos.length} photos in ${chapters.length} chapters.`);
}

main().catch(err => {
  console.error('Fatal error in build-memories.mjs:', err);
  process.exit(1);
});
