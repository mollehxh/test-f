"use client"

import * as React from "react"
import {
  ArrowLeft,
  Search,
  Mail,
  FolderArchive,
  FileText,
  ArrowUpRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type NavItem = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  external?: boolean
}

type NavGroup = {
  heading: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    heading: "Настройки",
    items: [
      { id: "mail", label: "Почта", icon: Mail },
      { id: "archive", label: "Обработка архивов", icon: FolderArchive },
      { id: "report", label: "Отчёт", icon: FileText },
    ],
  },
]

export function SettingsSidebar({
  active,
  onSelect,
}: {
  active: string
  onSelect: (id: string) => void
}) {
  const [query, setQuery] = React.useState("")

  const groups = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return NAV_GROUPS
    return NAV_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(q),
      ),
    })).filter((group) => group.items.length > 0)
  }, [query])

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="px-3 pt-5">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-2xl px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Назад в приложение
        </button>
      </div>

      <div className="px-3 py-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по настройкам..."
            className="h-9 rounded-2xl border border-border bg-transparent pl-8"
          />
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1 px-3 pb-4">
        <nav className="flex flex-col gap-5 py-1">
          {groups.map((group) => (
            <div key={group.heading} className="flex flex-col gap-1">
              <p className="px-2 pb-1 text-xs font-medium tracking-wide text-muted-foreground">
                {group.heading}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = item.id === active
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl px-2 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-accent font-medium text-foreground"
                        : "text-foreground/80 hover:bg-accent/60 hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4 text-muted-foreground group-aria-[current=page]:text-foreground" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.external ? (
                      <ArrowUpRight className="size-3.5 text-muted-foreground" />
                    ) : null}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}
