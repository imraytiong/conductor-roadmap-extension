# ROADMAP

## NOW
*Active milestones and imminent capabilities.*
- [**v0.2**](milestones/v0_2.md): Fix race condition during concurrent file promotions.
- [**automated-tests**](milestones/automated_tests.md): Add Jest tests for node scripts.

## SOON
*Priority features and technical debt (1-3 month horizon).*
- [**v1-release**](milestones/v1_release.md): Publish extension to npm.

## LATER
*Long-term vision and conceptually "fuzzy" ideas.*
- **Track-to-Milestone Rollups**: Bi-directional sync where completed Conductor tracks suggest milestone promotion.
- **Automated Release Notes**: Generate CHANGELOG entries from completed child tracks when a milestone finishes.
- **Milestone Validation**: Block COMPLETED promotion if child tracks are incomplete or orphaned.
- **CLI Dashboard (`/roadmap:dashboard`)**: Terminal-native readout of phasing and track progress.
- **Roadmap Audit (`/roadmap:audit`)**: Scan for broken links, empty descriptions, or disconnected tracks.
- **Interactive Triage**: Fast CLI prompt to re-order SOON/LATER queues without manual markdown edits.
- **AI Backlog Muncher**: Skill to parse unstructured `backlog.md` and propose structured LATER milestones.
- **Auto-Drafting Specs**: Agentic generation of `spec.md`/`plan.md` directly from Milestone context during track creation.
- **Roadmap Balancing**: AI warnings for overloaded phases (e.g., too many items in NOW).
- **Milestone Dependencies**: Block promotion if prerequisite milestones are not COMPLETED.
- **Stale Tracking**: Flag milestones stuck in NOW for too long.
- **Archiving System**: Move old COMPLETED items to yearly archives to keep the main roadmap clean.

## COMPLETED
*Historical record of achievements.*

---
## Categories
- **Capabilities**: New features and functionality.
- **Infrastructure**: Core systems and tools.
- **Quality of Life**: Developer experience and minor improvements.
- **Technical Debt**: Refactoring and maintenance.
