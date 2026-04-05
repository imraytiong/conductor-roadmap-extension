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

  const milestoneNameRaw = process.argv[2];
  if (!milestoneNameRaw) {
    console.error('Usage: node create_milestone.cjs <milestone-name>');
    process.exit(1);
  }

  const milestoneName = milestoneNameRaw.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  const rootDir = process.cwd();
  const milestonesDir = path.join(rootDir, 'milestones');
  const templatePath = path.join(__dirname, '..', 'references', 'milestone-template.md');

  if (!fs.existsSync(milestonesDir)) {
    fs.mkdirSync(milestonesDir, { recursive: true });
    console.log(`Created directory: ${milestonesDir}`);
  }

  const milestonePath = path.join(milestonesDir, `${milestoneName}.md`);
  if (fs.existsSync(milestonePath)) {
    console.log(`Milestone '${milestoneName}' already exists.`);
    return;
  }

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const hourStr = now.getHours() + ':00';

  let content = fs.readFileSync(templatePath, 'utf8');
  content = content.replace('[Name]', milestoneNameRaw)
                   .replace('[PHASE]', 'LATER')
                   .replace('[DATE]', dateStr)
                   .replace('[HOUR]', hourStr);

  fs.writeFileSync(milestonePath, content);
  console.log(`✅ Milestone created: ${milestonePath}`);
}

main();
