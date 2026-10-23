# apps/last-30-days — MVP plan

## Goal

Single-user demo of the Last 30 Days idea: enter a topic, see a “past 30 days cross-platform buzz” brief UI (sample data first).

## MVP in

- One app under `apps/last-30-days/`
- Bun runtime; `bun install && bun run dev` works from that folder
- Topic input + sample brief UI (X / Reddit / YouTube / GitHub / HN sections)
- Fixed sample JSON shaped like last30days-skill agent export schema 1.4 (`src/data/sample-brief.json`); no live scraping
- Sample topic is 「AI赚钱项目」, and the topic field defaults to it
- shadcn/ui minimalist preset: Sera (`radix-sera` in `components.json`)
- Chinese UI copy; single-user only

## MVP out

- Live API calls to X/Reddit/YouTube/GitHub/HN
- Auth, multi-user, persistence
- Full skill runtime / CLI parity

## Stack

- Bun + Vite + React (official `create-vite` scaffold, then shadcn init)
- shadcn/ui Sera preset
- Sample data in-repo
- `bunfig.toml` with `[install] minimumReleaseAge = 259200` before install

## Tasks

1. Scaffold app with `bunx create-vite` (`--no-immediate`), add bunfig.toml, then bun install
2. Brief UI: topic field + sample results grouped by source
3. PLAN.md stays in the app folder; README with run instructions
4. Screenshot + short video of the running UI for the PR

## Deferred

Live aggregators, ranking, AI summarization, Cloudflare deploy wiring.
