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
  
  const rootDir = process.cwd();
  const roadmapPath = path.join(rootDir, 'ROADMAP.md');
  const templatePath = path.join(__dirname, '..', 'references', 'roadmap-template.md');
  const backlogPath = path.join(rootDir, 'backlog.md');

  if (fs.existsSync(roadmapPath)) {
    console.log('ROADMAP.md already exists.');
    return;
  }

  let roadmapContent = '';
  if (fs.existsSync(templatePath)) {
    roadmapContent = fs.readFileSync(templatePath, 'utf8');
  } else {
    console.error('Roadmap template not found.');
    process.exit(1);
  }

  if (fs.existsSync(backlogPath)) {
    console.log('Found backlog.md. Attempting to populate ROADMAP.md...');
    // Basic heuristic: logic could be added here to parse backlog.md
    roadmapContent += '\n\n*Note: initial roadmap generated with backlog.md present. Please manually audit and organize tasks.*';
  }

  fs.writeFileSync(roadmapPath, roadmapContent);
  console.log(`✅ ROADMAP.md initialized at ${roadmapPath}`);
}

main();
