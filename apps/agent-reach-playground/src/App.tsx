import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  CHANNEL_ORDER,
  channelById,
  formatWhen,
  itemFacts,
  itemSource,
  type ChannelId,
} from "@/lib/reach"

const SAMPLE_DELAY_MS = 700

export default function App() {
  const [channelId, setChannelId] = useState<ChannelId>("v2ex")
  const [phase, setPhase] = useState<"running" | "ready">("ready")
  const [runId, setRunId] = useState(0)

  const channel = channelById(channelId)
  const envelope = channel.response

  useEffect(() => {
    if (phase !== "running") return
    const timer = window.setTimeout(() => setPhase("ready"), SAMPLE_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [phase, runId])

  function runSample(nextId: ChannelId) {
    setChannelId(nextId)
    setPhase("running")
    setRunId((current) => current + 1)
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
          <p className="text-xs font-semibold tracking-widest uppercase">
            Agent Reach
          </p>
          <Badge variant="secondary">样例数据</Badge>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-14">
        <section className="flex flex-col gap-5">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            单人演示 · 三条免登录渠道
          </p>
          <h1 className="font-heading text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            选一条渠道，看它读回来的卡片
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            这是 Agent Reach 的单页游乐场。挑一条默认公开渠道，运行样例，看标题、来源、摘要和链接。
            结果来自仓库里的固定 JSON，形状对齐它的信封：schema_version、ok、channel、action、backend、items。
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold tracking-widest uppercase">渠道</h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {CHANNEL_ORDER.map((id) => {
                const option = channelById(id)
                const selected = id === channelId
                return (
                  <Button
                    key={id}
                    type="button"
                    variant={selected ? "default" : "outline"}
                    aria-pressed={selected}
                    onClick={() => runSample(id)}
                  >
                    {option.label}
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="leading-relaxed text-muted-foreground">{channel.hint}</p>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-widest uppercase">样例命令</p>
              <pre className="overflow-x-auto border px-4 py-3 text-sm leading-relaxed">
                <code>{channel.command}</code>
              </pre>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="button"
                disabled={phase === "running"}
                onClick={() => runSample(channelId)}
              >
                {phase === "running" ? "正在读取样例" : "运行样例"}
              </Button>
              <p className="text-sm text-muted-foreground">
                命令只显示在页面上。点击后读取本地 JSON，大约需要一会儿才换成卡片。
              </p>
            </div>
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-6" aria-live="polite" aria-busy={phase === "running"}>
          {phase === "running" ? (
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-3xl tracking-tight">正在读取样例</h2>
              <p className="leading-relaxed text-muted-foreground">
                {channel.label} 的卡片马上出现。这一步停在本地文件上，信封字段会和卡片一起出来。
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>ok</Badge>
                  <Badge variant="secondary">{envelope.channel}</Badge>
                  <Badge variant="secondary">{envelope.action}</Badge>
                  <Badge variant="secondary">{envelope.backend}</Badge>
                  <span className="text-sm text-muted-foreground">
                    schema {envelope.schema_version} · {envelope.items.length} 条 · 冻结于{" "}
                    {formatWhen(envelope.meta.captured_at)}
                  </span>
                </div>
                <h2 className="font-heading text-3xl tracking-tight text-balance sm:text-4xl">
                  {channel.label}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  查询 {envelope.meta.query}。{envelope.meta.note}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {envelope.items.map((item) => {
                  const facts = itemFacts(item)
                  return (
                    <Card key={item.url} size="sm">
                      <CardHeader>
                        <CardTitle className="normal-case tracking-normal text-balance">
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
                          {itemSource(channel, item)}
                          {" · "}
                          {item.author ?? "作者未附在样例里"}
                          {" · "}
                          {formatWhen(item.published_at)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-3">
                        <p className="leading-relaxed">{item.text}</p>
                        {facts.length > 0 && (
                          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                            {facts.join(" · ")}
                          </p>
                        )}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm break-all underline underline-offset-4"
                        >
                          {item.url}
                        </a>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 text-sm leading-relaxed text-muted-foreground">
          <p>
            灵感来自{" "}
            <a
              className="underline underline-offset-4"
              href="https://github.com/Panniantong/Agent-Reach"
              target="_blank"
              rel="noreferrer"
            >
              Panniantong/Agent-Reach
            </a>
            。这里没有安装它的命令行，只有三条默认公开渠道的样例信封。
          </p>
          <p>小红书、Reddit、雪球这类登录渠道留到以后。单人演示，不做账号、保存或实时抓取。</p>
        </div>
      </footer>
    </div>
  )
}
