const fs = require('fs');
const path = require('path');

function checkConductor() {
  const rootDir = process.cwd();
  const conductorDir = path.join(rootDir, 'conductor');
  if (!fs.existsSync(conductorDir)) {
    console.error('Error: conductor/ directory not found. Please initialize Conductor first.');
    process.exit(1);
  }
}

async function main() {
  checkConductor();

  const trackIdRaw = process.argv[2];
  const trackTitle = process.argv[3] || trackIdRaw;

  if (!trackIdRaw) {
    console.error('Usage: node initialize_track.cjs <track-id> [track-title]');
    process.exit(1);
  }

  const trackId = trackIdRaw.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const rootDir = process.cwd();
  const conductorTracksDir = path.join(rootDir, 'conductor', 'tracks');
  const trackDir = path.join(conductorTracksDir, trackId);

  if (fs.existsSync(trackDir)) {
    console.log(`Track '${trackId}' already exists.`);
    return;
  }

  fs.mkdirSync(trackDir, { recursive: true });

  // 1. metadata.json
  const metadata = {
    id: trackId,
    title: trackTitle,
    status: 'planned',
    milestone: 'v0.0'
  };
  fs.writeFileSync(path.join(trackDir, 'metadata.json'), JSON.stringify(metadata, null, 2));

  // 2. index.md
  const indexContent = `# Track: ${trackTitle}

## Objective
[Brief description of the track's goal]

## Navigation
- [**Specification**](./spec.md)
- [**Implementation Plan**](./plan.md)
- [**Metadata**](./metadata.json)
`;
  fs.writeFileSync(path.join(trackDir, 'index.md'), indexContent);

  // 3. spec.md
  const specContent = `# Track Specification: ${trackTitle}

## Vision
[Vision for this track]

## Scope
- [ ] Task A
- [ ] Task B
`;
  fs.writeFileSync(path.join(trackDir, 'spec.md'), specContent);

  // 4. plan.md
  const planContent = `# Track Plan: ${trackTitle}

## Phase 1: Foundation
- [ ] Setup and scaffolding
- [ ] Initial tests
`;
  fs.writeFileSync(path.join(trackDir, 'plan.md'), planContent);

  // 5. Update conductor/tracks.md
  const tracksMdPath = path.join(rootDir, 'conductor', 'tracks.md');
  if (fs.existsSync(tracksMdPath)) {
    let tracksMd = fs.readFileSync(tracksMdPath, 'utf8');
    const newEntry = `- [**${trackTitle}**](./tracks/${trackId}/index.md): [Description of this track]`;
    if (!tracksMd.includes(`./tracks/${trackId}/index.md`)) {
      tracksMd += `\n${newEntry}`;
      fs.writeFileSync(tracksMdPath, tracksMd);
      console.log(`Updated conductor/tracks.md with ${trackId}`);
    }
  }

  console.log(`✅ Track initialized: ${trackDir}`);
}

main();
