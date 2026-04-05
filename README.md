# Conductor Roadmap Extension

Dynamic roadmap and milestone management for Gemini CLI projects using [Conductor](https://github.com/google/gemini-cli-conductor).

## Features
- **Dynamic Milestone Flow**: Manage milestones through `LATER` -> `SOON` -> `NOW` -> `COMPLETED` phases.
- **Automated Timestamping**: Automatically tracks when milestones are started, updated, or completed.
- **Reverse-Chronological History**: Maintains a clean, historical record of achievements in your `ROADMAP.md`.
- **Slash Commands**: Quick access to roadmap operations.

## Installation
```bash
gemini extensions install https://github.com/your-username/conductor-roadmap-extension
```

## Commands
- `/roadmap:init`: Initialize `ROADMAP.md` in the current project.
- `/roadmap:create <name>`: Create a new milestone file.
- `/roadmap:promote <name> <phase>`: Promote a milestone to `NOW`, `SOON`, `LATER`, or `COMPLETED`.

## Requirements
- This extension requires the **Conductor** directory to be present in your project.
