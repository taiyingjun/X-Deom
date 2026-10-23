import sampleBriefJson from "@/data/sample-brief.json" with { type: "json" }

export type SourceId = "x" | "reddit" | "youtube" | "github" | "hackernews"

export type BriefCluster = {
  title: string
  summary: string
  sources: string[]
  engagement_total: number
}

export type BriefResult = {
  candidate_id: string
  title: string
  source: string
  url: string
  published_at?: string
  summary: string
  engagement: Record<string, number>
  relevance_score: number
  cluster?: number
}

export type AgentBrief = {
  schema_version: string
  query: string
  generated_at: string
  window_days: number
  source_status: Record<string, string>
  freshness_verdicts: unknown[]
  clusters: BriefCluster[]
  results: BriefResult[]
  usage: {
    calls: number
    promptTokens: number
    completionTokens: number
    totalTokens: number
  } | null
}

export const sampleBrief = sampleBriefJson as unknown as AgentBrief

export const SOURCE_ORDER: SourceId[] = [
  "x",
  "reddit",
  "youtube",
  "github",
  "hackernews",
]

export const SOURCE_LABEL: Record<SourceId, { name: string; hint: string }> = {
  x: { name: "X", hint: "热评、转发与回复" },
  reddit: { name: "Reddit", hint: "帖子分数与评论" },
  youtube: { name: "YouTube", hint: "视频观看与摘录" },
  github: { name: "GitHub", hint: "发布、星标与议题" },
  hackernews: { name: "Hacker News", hint: "点数与开发者评论" },
}

const STATUS_LABEL: Record<string, string> = {
  ok: "已返回",
  "no-results": "无匹配",
  partial: "部分返回",
  "rate-limited": "被限流",
  "auth-failed": "未授权",
  "payment-required": "额度不足",
  unreachable: "不可达",
  timeout: "超时",
  "schema-drift": "结构变化",
  "skipped-unconfigured": "未配置，已跳过",
  error: "失败",
}

const ENGAGEMENT_LABEL: Record<string, string> = {
  likes: "赞",
  reposts: "转发",
  replies: "回复",
  score: "分",
  num_comments: "评论",
  views: "观看",
  comments: "评论",
  stars: "星标",
  forks: "复刻",
  reactions: "反应",
  points: "点数",
}

const numberFormat = new Intl.NumberFormat("zh-CN")

export function normalizeTopic(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
}

export function formatCount(value: number) {
  return numberFormat.format(value)
}

export function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso))
}

export function statusLabel(state: string | undefined) {
  if (!state) return "未记录"
  return STATUS_LABEL[state] ?? state
}

export function formatEngagement(engagement: Record<string, number>) {
  const parts = Object.entries(engagement).map(([key, value]) => {
    const label = ENGAGEMENT_LABEL[key] ?? key
    return `${label} ${formatCount(value)}`
  })
  return parts.join(" · ")
}

export function sourceName(source: string) {
  if (source in SOURCE_LABEL) {
    return SOURCE_LABEL[source as SourceId].name
  }
  return source
}

export function resultsForSource(brief: AgentBrief, source: string) {
  return brief.results.filter((item) => item.source === source)
}
