# X-Deom

工作日技术演示的固定仓库。一个选题一个应用，都放在这里，不为单个 demo 另开 GitHub 仓库。

## 目录

| 路径 | 作用 |
| --- | --- |
| `apps/<slug>/` | 一个独立的 Bun 应用。在该目录执行 `bun install && bun run dev` |
| `tracking/seen-bookmarks.json` | 选题状态：`proposed`、`skipped`、`built` |
| `skills/project-planning/SKILL.md` | 写 MVP 计划时用的短技能：目标、范围内外、任务、技术栈、延后项 |
| `AGENTS.md` | 云端代理的边界：只改被点名的 `apps/<slug>/` |
| `bunfig.toml` | 安装策略。应用目录里也有一份，`minimumReleaseAge = 259200`（三天） |

根目录没有包。依赖装在每个应用自己的目录里，安装前先放好该应用的 `bunfig.toml`。

## 工作日演示怎么落地

1. 候选写进 `tracking/seen-bookmarks.json` 的 `proposed`，带 slug。
2. 选中的题目在 `apps/<slug>/` 做成单人能点完的小应用，计划记在该目录的 `PLAN.md`。
3. 拉取请求里要有运行中的截图和一段短视频。
4. 做完后把该条从 `proposed` 挪到 `built`。不做的放进 `skipped`。

第一个应用是 [`apps/last-30-days`](apps/last-30-days)：近 30 天跨平台热度简报的样例界面。

## 已有应用

- `apps/last-30-days` — 输入主题，查看 X / Reddit / YouTube / GitHub / Hacker News 的样例简报。数据是固定 JSON，没有实时抓取。
