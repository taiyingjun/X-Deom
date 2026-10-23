---
name: project-planning
description: Plan a short Bun and shadcn MVP for one demo app in this monorepo. Use before scaffolding apps/<slug>/.
---

# Project planning

Plan one demo. Write the plan to `apps/<slug>/PLAN.md` before building. Cut scope until a single person can click through it.

## Goal

One sentence: who uses it, and what they can finish in one sitting.

## MVP in

- App path: `apps/<slug>/`
- Bun, with `bunfig.toml` setting `minimumReleaseAge = 259200` before `bun install`
- Official scaffold (`bunx create-*`). Vite + React is enough for one screen
- shadcn/ui minimalist preset (Sera) when the UI is React
- The smallest data source that makes the screen true. Prefer fixed sample JSON over live APIs

## MVP out

Name the live integrations, accounts, and extra screens that wait. Single-user only unless the plan says otherwise.

## Tasks

1. Scaffold without installing, add `bunfig.toml`, then `bun install`
2. Build the one screen
3. Keep `PLAN.md` and a README with `bun install && bun run dev`
4. Capture a screenshot and a short video of the running app for the pull request

## Stack

- Bun
- Vite + React, or a smaller official template if the screen does not need React
- shadcn/ui Sera preset for React UI
- Sample data committed in the app

## Deferred

List what a later weekday can add. Do not start it in this MVP.
