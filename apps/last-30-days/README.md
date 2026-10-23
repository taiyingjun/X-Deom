# 近 30 天

单人演示：输入一个主题，看「过去 30 天」跨平台热度简报。界面分 X、Reddit、YouTube、GitHub、Hacker News。

数据是固定样例 `src/data/sample-brief.json`，字段对齐 [last30days-skill](https://github.com/mvanhorn/last30days-skill) 的 agent JSON export（schema 1.4）。这一版不联网抓取。

内置样例主题是「AI赚钱项目」，打开页面时输入框里就是这六个字。输入别的主题时，页面会说明没有对应样例，并仍展示这一份，方便看版式。

## 运行

在本目录：

```bash
bun install
bun run dev
```

开发服务器默认在 `http://127.0.0.1:5173`。

安装前请保留 `bunfig.toml` 里的 `minimumReleaseAge = 259200`。
