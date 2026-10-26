# Agent Reach 游乐场

单人演示：选一条默认公开渠道，运行样例，看结构化结果卡片。

三条渠道都是 [Agent Reach](https://github.com/Panniantong/Agent-Reach) 里装好就能用、不需要登录的能力：

1. V2EX 热帖
2. Bilibili 搜索
3. GitHub 读仓（公开仓库的 README 和文件摘要）

数据是固定样例 `src/data/samples.json`。每条渠道一份信封，字段对齐 Agent Reach 的 JSON 输出：`schema_version`、`ok`、`channel`、`action`、`backend`、`items`、`meta`、`error`。卡片使用其中的标题、来源、摘要和链接。

这一版不安装 Agent Reach，也不访问这些网站。

## 运行

在本目录：

```bash
bun install
bun run dev
```

开发服务器默认在 `http://127.0.0.1:5173`。

安装前请保留 `bunfig.toml` 里的 `minimumReleaseAge = 259200`。
