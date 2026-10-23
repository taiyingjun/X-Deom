# X-Deom

Sticky tech-demo monorepo. Every demo lives in this repository. Never create a new GitHub repository for a demo.

## Layout

- One app per pick, at `apps/<slug>/`.
- Each app is its own Bun project. From that directory, `bun install && bun run dev` must work.
- `tracking/seen-bookmarks.json` records candidates as `proposed`, `skipped`, or `built`.
- `skills/project-planning/SKILL.md` is the short MVP planning skill for a new demo.

## Cloud agents

- Only change `apps/<slug>/` for the demo you were asked to build.
- The one file outside that directory you may update is `tracking/seen-bookmarks.json`, and only to mark that candidate built or skipped.
- Leave other apps and the repo root alone unless the task is the one-time monorepo bootstrap.
- Use Bun. Before `bun install` in an app, `apps/<slug>/bunfig.toml` must contain:

```toml
[install]
minimumReleaseAge = 259200
```

- A pull request must include at least one screenshot and one short video of the running app.
- Do not create a new GitHub repo per demo. Open the pull request on this repo.
