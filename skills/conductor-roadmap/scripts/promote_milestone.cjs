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

  const milestoneName = process.argv[2];
  const targetPhase = process.argv[3] ? process.argv[3].toUpperCase() : null;

  if (!milestoneName || !targetPhase) {
    console.error('Usage: node promote_milestone.cjs <milestone-name> <NOW|SOON|LATER|COMPLETED>');
    process.exit(1);
  }

  const rootDir = process.cwd();
  const milestonesDir = path.join(rootDir, 'milestones');
  const roadmapPath = path.join(rootDir, 'ROADMAP.md');

  const milestoneFile = milestoneName.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '.md';
  const milestonePath = path.join(milestonesDir, milestoneFile);

  if (!fs.existsSync(milestonePath)) {
    console.error(`Error: Milestone file ${milestonePath} not found.`);
    process.exit(1);
  }

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const hourStr = now.getHours() + ':00';

  let content = fs.readFileSync(milestonePath, 'utf8');

  // Update Status in Milestone File
  const statusLineRegex = /^## Status:.*$/m;
  const newStatusLine = `## Status: ${targetPhase} (${targetPhase === 'COMPLETED' ? 'Completed' : 'Updated'}: ${dateStr} ${hourStr})`;
  if (statusLineRegex.test(content)) {
    content = content.replace(statusLineRegex, newStatusLine);
  } else {
    // If not found, insert after the first line (title)
    const lines = content.split('\n');
    lines.splice(1, 0, '\n' + newStatusLine);
    content = lines.join('\n');
  }

  fs.writeFileSync(milestonePath, content);
  console.log(`✅ Updated status in ${milestonePath}`);

  // Update ROADMAP.md
  if (fs.existsSync(roadmapPath)) {
    let roadmapContent = fs.readFileSync(roadmapPath, 'utf8');
    
    // Remove the milestone from any current section
    const milestoneEntryRegex = new RegExp(`^[-*]\\s+\\[\\*\\*.*\\*\\*\\]\\(milestones\\/${milestoneFile}\\):.*$`, 'm');
    let removedEntry = '';
    const match = roadmapContent.match(milestoneEntryRegex);
    if (match) {
      removedEntry = match[0];
      roadmapContent = roadmapContent.replace(milestoneEntryRegex, '').replace(/\n\n\n/g, '\n\n');
    } else {
        // Try to find the title from the milestone file if it's not in the roadmap yet
        const titleMatch = content.match(/^# Milestone: (.*)$/m);
        const title = titleMatch ? titleMatch[1] : milestoneName;
        removedEntry = `- [**${title}**](milestones/${milestoneFile}): Summary pending update.`;
    }

    // Prepare target section logic
    const sections = ['NOW', 'SOON', 'LATER', 'COMPLETED'];
    if (!sections.includes(targetPhase)) {
        console.error(`Invalid phase: ${targetPhase}`);
        process.exit(1);
    }

    const sectionHeader = `## ${targetPhase}`;
    const sectionIndex = roadmapContent.indexOf(sectionHeader);

    if (sectionIndex !== -1) {
      if (targetPhase === 'COMPLETED') {
        // COMPLETED section: Insert at the TOP of the section (reverse chronological)
        // Find the line after the description if it exists
        const nextLineIndex = roadmapContent.indexOf('\n', sectionIndex + sectionHeader.length + 1);
        const descriptionEndIndex = roadmapContent.indexOf('\n', nextLineIndex + 1);
        
        roadmapContent = roadmapContent.slice(0, descriptionEndIndex + 1) + 
                         removedEntry + ` (Completed: ${dateStr} ${hourStr})\n` + 
                         roadmapContent.slice(descriptionEndIndex + 1);
      } else {
        // Other sections: Append at the bottom of the section
        // Find the end of the section (next ## or end of file)
        let nextSectionIndex = roadmapContent.indexOf('\n## ', sectionIndex + 1);
        if (nextSectionIndex === -1) {
            // Check for horizontal rule
            nextSectionIndex = roadmapContent.indexOf('\n---', sectionIndex + 1);
        }
        if (nextSectionIndex === -1) nextSectionIndex = roadmapContent.length;

        roadmapContent = roadmapContent.slice(0, nextSectionIndex).trimEnd() + 
                         '\n' + removedEntry + 
                         '\n' + roadmapContent.slice(nextSectionIndex);
      }
      fs.writeFileSync(roadmapPath, roadmapContent);
      console.log(`✅ Promoted milestone to ${targetPhase} in ROADMAP.md`);
    } else {
      console.warn(`Warning: Section ${targetPhase} not found in ROADMAP.md`);
    }
  }
}

main();
