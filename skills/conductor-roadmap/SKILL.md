---
name: conductor-roadmap
description: Bridging strategy and execution by managing project roadmaps and milestones. Use when you need to define high-level project goals, create strategic milestones, and generate tactical Conductor tracks.
---

# Conductor Roadmap

This skill manages the **Strategy-to-Execution** workflow for any project. It centers around a `ROADMAP.md` file and discrete milestone documents.

## Workflow

### 1. Initialize Roadmap
Run `init-roadmap` to scan the current repository (and `backlog.md` if available) and generate the initial `ROADMAP.md`. It also verifies that Conductor is installed as a dependency.

### 2. Create Milestone
Run `create-milestone <name>` to define a specific strategic goal from the Roadmap. This creates a detailed document in `milestones/` using the [milestone-template.md](references/milestone-template.md).

### 3. Generate Tracks
Run `generate-tracks <track-id> [track-title]` to initialize a tactical **Conductor Track**. This initializes the folder structure and registers it in `conductor/tracks.md`.

### 4. Promote Milestone
Run `promote-milestone <name> <phase>` where phase is `NOW`, `SOON`, `LATER`, or `COMPLETED`. This moves the milestone through the flow and adds a timestamp. When moving to `COMPLETED`, it also aggregates conductor tracks and verification tests.

## Components

- **ROADMAP.md**: High-level phasing (NOW, SOON, LATER, COMPLETED) and categorization.
- **milestones/**: Discrete technical and strategic justifications.
- **Conductor Tracks**: Tactical execution plans (bridged automatically from milestones).

## References
- [ROADMAP Template](references/roadmap-template.md)
- [Milestone Template](references/milestone-template.md)
