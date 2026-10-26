# apps/agent-reach-playground — MVP plan

## Goal

Single-user Bun playground that shows what [Agent Reach](https://github.com/Panniantong/Agent-Reach) is for: pick a default public channel, run a sample fetch, and see structured result cards — so someone can feel the “full-web passport for agents” idea in one sitting.

Source inspiration: https://x.com/ozmazzz/status/2113933745204207854 and https://github.com/Panniantong/Agent-Reach

## MVP in

- App path: `apps/agent-reach-playground/`
- Bun; `bunfig.toml` with `minimumReleaseAge = 259200` before `bun install`
- Vite + React + shadcn/ui Sera (minimalist)
- One screen: channel picker for three **default / no-login** channels only:
  1. V2EX 热帖
  2. Bilibili 搜索
  3. GitHub 读仓（公开仓 README / 文件摘要）
- Each pick shows structured result cards (title, source, snippet, link) from **fixed sample JSON** committed in the app (shaped like Agent Reach-style structured output)
- README with `bun install && bun run dev`
- PR must include at least one screenshot AND one short video of the running app

## MVP out

- Live Agent Reach CLI / real network scrapes (no install of Agent-Reach itself in MVP)
- Login-gated channels (小红书 / Reddit / 雪球 / anything needing cookies or OAuth)
- Multi-user, persistence, API keys
- New GitHub repository (must stay in this sticky monorepo)

## Stack

- Bun + Vite + React
- shadcn/ui Sera preset
- Sample JSON under `src/data/samples.json`

## Tasks

1. Scaffold without installing, add `bunfig.toml`, then `bun install`
2. Build the one playground screen with three channel tabs/buttons + sample cards
3. Keep this `PLAN.md` and a README with run instructions
4. Capture screenshot + short video of the running UI for the PR
5. Update repo-root `tracking/seen-bookmarks.json`: move id `2113933745204207854` from `proposed` into `built` with `app: apps/agent-reach-playground` (create the built entry if it is missing from `proposed`)

## Deferred

Wire real Agent Reach / live fetches behind a toggle; Cloudflare Pages preview path; more channels.
