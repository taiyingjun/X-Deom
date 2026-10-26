import samples from "@/data/samples.json"

export const CHANNEL_ORDER = ["v2ex", "bilibili", "github"] as const

export type ChannelId = (typeof CHANNEL_ORDER)[number]

export type ReachItem = {
  title: string
  url: string
  author: string | null
  published_at: string | null
  text: string
  raw: {
    node?: string
    replies?: number
    bvid?: string
    duration?: string | null
    path?: string
    repo?: string
  }
}

export type ReachEnvelope = {
  schema_version: number
  ok: true
  channel: string
  action: string
  backend: string
  items: ReachItem[]
  meta: {
    sample: true
    captured_at: string
    query: string
    note: string
  }
  error: null
}

export type ChannelSample = {
  id: ChannelId
  label: string
  hint: string
  command: string
  response: ReachEnvelope
}

export const channels = samples.channels as ChannelSample[]

export function channelById(id: ChannelId): ChannelSample {
  const channel = channels.find((item) => item.id === id)
  if (!channel) {
    throw new Error(`Missing sample channel: ${id}`)
  }
  return channel
}

export function itemSource(channel: ChannelSample, item: ReachItem): string {
  if (item.raw.node) return `${channel.label} · ${item.raw.node}`
  if (item.raw.path) return `${channel.label} · ${item.raw.path}`
  if (item.raw.bvid) return `${channel.label} · ${item.raw.bvid}`
  return channel.label
}

export function itemFacts(item: ReachItem): string[] {
  const facts: string[] = []
  if (typeof item.raw.replies === "number") {
    facts.push(`${item.raw.replies} 回复`)
  }
  if (item.raw.duration) {
    facts.push(item.raw.duration)
  }
  if (item.raw.repo) {
    facts.push(item.raw.repo)
  }
  return facts
}

export function formatWhen(iso: string | null): string {
  if (!iso) return "日期未附在样例里"
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Shanghai",
  }).format(date)
}
