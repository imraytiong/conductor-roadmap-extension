# Conductor Roadmap Extension

Dynamic roadmap and milestone management for Gemini CLI projects using [Conductor](https://github.com/google/gemini-cli-conductor).

## Features
- **Strategy-to-Execution Flow**: Bridge high-level milestones with tactical execution plans.
- **Dynamic Phasing**: Manage milestones through `LATER` -> `SOON` -> `NOW` -> `COMPLETED`.
- **Automated Timestamping**: Tracks when milestones are started, updated, or completed.
- **Reverse-Chronological History**: Maintains a clean, historical record of achievements in your `ROADMAP.md`.
- **Slash Commands**: Quick access to roadmap and track operations.

## Installation
```bash
gemini extensions install https://github.com/imraytiong/conductor-roadmap-extension
```

## Commands
- `/roadmap:init`: Initialize `ROADMAP.md` in the current project.
- `/roadmap:create <name>`: Create a new milestone document in `milestones/`.
- `/roadmap:promote <name> <phase>`: Promote a milestone to `NOW`, `SOON`, `LATER`, or `COMPLETED`.
- `/roadmap:generate <track-id> [title]`: Initialize a tactical Conductor Track and register it in `conductor/tracks.md`.

## Requirements
- This extension requires the **Conductor** directory to be present in your project.
