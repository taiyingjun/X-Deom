import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  sampleBrief,
  SOURCE_LABEL,
  SOURCE_ORDER,
  formatCount,
  formatEngagement,
  formatWhen,
  normalizeTopic,
  resultsForSource,
  sourceName,
  statusLabel,
  type SourceId,
} from "@/lib/brief"

const SAMPLE_TOPIC = sampleBrief.query

function isKnownSource(source: string): source is SourceId {
  return SOURCE_ORDER.includes(source as SourceId)
}

export default function App() {
  const [topic, setTopic] = useState(SAMPLE_TOPIC)
  const [submitted, setSubmitted] = useState<string | null>(null)
  const [sourceFilter, setSourceFilter] = useState<SourceId | "all">("all")

  const brief = sampleBrief
  const topicMatches =
    submitted !== null && normalizeTopic(submitted) === normalizeTopic(brief.query)

  const visibleSources = useMemo(() => {
    const known = SOURCE_ORDER.filter(
      (source) => sourceFilter === "all" || sourceFilter === source,
    )
    const extras = [...new Set(brief.results.map((item) => item.source))].filter(
      (source) => !isKnownSource(source),
    )
    return sourceFilter === "all" ? [...known, ...extras] : known
  }, [brief.results, sourceFilter])

  function showBrief(nextTopic: string) {
    const trimmed = nextTopic.trim()
    if (!trimmed) return
    setTopic(trimmed)
    setSubmitted(trimmed)
    setSourceFilter("all")
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <p className="text-xs font-semibold tracking-widest uppercase">
            Last 30 Days
          </p>
          <Badge variant="secondary">样例数据</Badge>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-14">
        <section className="flex flex-col gap-5">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            单人演示 · 近 {brief.window_days} 天
          </p>
          <h1 className="font-heading text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            过去三十天，人们在讨论什么
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            输入一个主题，看一份跨平台热度简报。这一版只读取仓库里的固定样例，形状对齐
            last30days-skill 的 agent export（schema {brief.schema_version}
            ），不会去请求 X、Reddit、YouTube、GitHub 或 Hacker News。
          </p>
        </section>

        <form
          className="flex flex-col gap-6"
          onSubmit={(event) => {
            event.preventDefault()
            showBrief(topic)
          }}
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="topic"
              className="text-xs font-semibold tracking-widest uppercase"
            >
              主题
            </label>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <Input
                id="topic"
                name="topic"
                value={topic}
                placeholder={`例如：${SAMPLE_TOPIC}`}
                autoComplete="off"
                onChange={(event) => setTopic(event.target.value)}
              />
              <Button type="submit" disabled={topic.trim().length === 0}>
                生成简报
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => showBrief(SAMPLE_TOPIC)}
            >
              使用样例：{SAMPLE_TOPIC}
            </Button>
            <p className="text-sm text-muted-foreground">
              样例主题可直接出简报。其它主题会说明没有对应样例，并仍展示这一份。
            </p>
          </div>
        </form>

        {submitted === null ? (
          <section className="border-t pt-8" aria-live="polite">
            <h2 className="font-heading text-2xl tracking-wide uppercase">
              等待一个主题
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              提交后会出现五个分区：X、Reddit、YouTube、GitHub、Hacker News。上面的要点来自样例
              JSON 里的 clusters，每条结果带互动计数和相关度。
            </p>
          </section>
        ) : (
          <section className="flex flex-col gap-10" aria-live="polite">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge>{topicMatches ? "命中样例" : "非样例主题"}</Badge>
                <Badge variant="secondary">schema {brief.schema_version}</Badge>
                <span className="text-sm text-muted-foreground">
                  生成于 {formatWhen(brief.generated_at)} · 窗口 {brief.window_days} 天
                  · usage {brief.usage === null ? "无" : `${brief.usage.totalTokens} tokens`}
                </span>
              </div>
              <h2 className="font-heading text-3xl tracking-wide text-balance uppercase sm:text-4xl">
                {topicMatches ? brief.query : submitted}
              </h2>
              {!topicMatches && (
                <p className="border-l-2 pl-4 text-sm leading-relaxed text-muted-foreground">
                  固定样例只有「{brief.query}」。你输入的是「{submitted}
                  」，下面仍展示这份样例，方便看简报长什么样。
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {brief.clusters.map((cluster) => (
                <Card key={cluster.title} size="sm">
                  <CardHeader>
                    <CardTitle>{cluster.title}</CardTitle>
                    <CardDescription className="flex flex-col gap-1">
                      <span>{cluster.sources.map(sourceName).join(" · ")}</span>
                      <span className="whitespace-nowrap">
                        互动 {formatCount(cluster.engagement_total)}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed">{cluster.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold tracking-widest uppercase">
                平台
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={sourceFilter === "all" ? "default" : "outline"}
                  aria-pressed={sourceFilter === "all"}
                  onClick={() => setSourceFilter("all")}
                >
                  全部
                </Button>
                {SOURCE_ORDER.map((source) => (
                  <Button
                    key={source}
                    type="button"
                    size="sm"
                    variant={sourceFilter === source ? "default" : "outline"}
                    aria-pressed={sourceFilter === source}
                    onClick={() => setSourceFilter(source)}
                  >
                    {SOURCE_LABEL[source].name}
                  </Button>
                ))}
              </div>
            </div>

            {visibleSources.map((source) => {
              const items = resultsForSource(brief, source)
              const meta = isKnownSource(source) ? SOURCE_LABEL[source] : null
              const state = brief.source_status[source]
              return (
                <section
                  key={source}
                  id={`source-${source}`}
                  className="flex scroll-mt-8 flex-col gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading text-3xl tracking-wide uppercase">
                      {sourceName(source)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {meta?.hint ?? "样例中的其它来源"} · {statusLabel(state)} ·{" "}
                      {items.length} 条
                    </p>
                  </div>
                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">这个来源在样例里没有条目。</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {items.map((item) => (
                        <Card key={item.candidate_id} size="sm">
                          <CardHeader>
                            <CardTitle>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="underline-offset-4 hover:underline"
                              >
                                {item.title}
                              </a>
                            </CardTitle>
                            <CardDescription>
                              {item.published_at ? formatWhen(item.published_at) : "日期未知"}
                              {" · "}
                              相关度 {Math.round(item.relevance_score * 100)}%
                              {item.cluster !== undefined
                                ? ` · 要点 ${item.cluster + 1}`
                                : ""}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-3">
                            <p className="leading-relaxed">{item.summary}</p>
                            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                              {formatEngagement(item.engagement) || "无互动计数"}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </section>
              )
            })}
          </section>
        )}
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground">
          <p>
            灵感来自{" "}
            <a
              className="underline underline-offset-4"
              href="https://github.com/mvanhorn/last30days-skill"
              target="_blank"
              rel="noreferrer"
            >
              mvanhorn/last30days-skill
            </a>
            。这里没有它的检索运行时，只有一份可供界面使用的样例简报。
          </p>
          <p>单人演示，不做账号、保存或实时聚合。</p>
        </div>
      </footer>
    </div>
  )
}
