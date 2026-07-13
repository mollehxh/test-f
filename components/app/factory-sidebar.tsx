"use client"

import * as React from "react"
import {
  Archive,
  Download,
  Folder,
  Loader2,
  MailCheck,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Factory } from "@/components/app/factory-data"

type ActionKey = "mail" | "archive"

export function FactorySidebar({
  factories,
  activeId,
  onSelect,
  onRename,
  onDelete,
  onAdd,
  onOpenSettings,
  updateAvailable = true,
}: {
  factories: Factory[]
  activeId: string
  onSelect: (id: string) => void
  onRename: (id: string, name: string) => void
  onDelete: (id: string) => void
  onAdd: () => void
  onOpenSettings: () => void
  updateAvailable?: boolean
}) {
  const [running, setRunning] = React.useState<ActionKey | null>(null)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [draftName, setDraftName] = React.useState("")
  const [deleteTarget, setDeleteTarget] = React.useState<Factory | null>(null)

  const runAction = (key: ActionKey) => {
    if (running) return
    setRunning(key)
    window.setTimeout(() => setRunning(null), 1600)
  }

  const startRename = (factory: Factory) => {
    setEditingId(factory.id)
    setDraftName(factory.name)
  }

  const commitRename = () => {
    if (!editingId) return
    const trimmed = draftName.trim()
    if (trimmed) onRename(editingId, trimmed)
    setEditingId(null)
  }

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="flex flex-col gap-1 px-3 pt-5">
        <ActionButton
          icon={running === "mail" ? Loader2 : MailCheck}
          label="Обработать почту"
          spinning={running === "mail"}
          onClick={() => runAction("mail")}
        />
        <ActionButton
          icon={running === "archive" ? Loader2 : Archive}
          label="Архивировать"
          spinning={running === "archive"}
          onClick={() => runAction("archive")}
        />
      </div>

      <div className="mt-5 flex items-center justify-between px-5 pb-1">
        <p className="text-xs font-medium tracking-wide text-muted-foreground">
          Заводы
        </p>
        <button
          type="button"
          onClick={onAdd}
          aria-label="Добавить завод"
          className="flex size-5 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <ScrollArea className="min-h-0 flex-1 px-3 pb-3">
        <nav className="flex flex-col gap-0.5 py-1">
          {factories.map((factory) => {
            const isActive = factory.id === activeId
            const isEditing = factory.id === editingId

            if (isEditing) {
              return (
                <Input
                  key={factory.id}
                  autoFocus
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={(e) => {
                    if (e.nativeEvent.isComposing || e.keyCode === 229) return
                    if (e.key === "Enter") commitRename()
                    if (e.key === "Escape") setEditingId(null)
                  }}
                  aria-label="Название завода"
                  className="h-9 rounded-2xl border border-border bg-transparent px-2"
                />
              )
            }

            return (
              <div
                key={factory.id}
                className={cn(
                  "group relative flex items-center rounded-2xl transition-colors",
                  isActive ? "bg-accent" : "hover:bg-accent/60",
                )}
              >
                <button
                  type="button"
                  onClick={() => onSelect(factory.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-2 py-1.5 text-sm",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-foreground/80",
                  )}
                >
                  <Folder className="size-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1 truncate text-left">
                    {factory.name}
                  </span>
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <button
                        type="button"
                        aria-label={`Меню завода ${factory.name}`}
                        className="mr-1 flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-opacity hover:bg-background hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100 data-[popup-open]:opacity-100"
                      >
                        <MoreHorizontal className="size-4" />
                      </button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onClick={() => startRename(factory)}>
                      <Pencil className="size-4" />
                      Переименовать
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setDeleteTarget(factory)}
                    >
                      <Trash2 className="size-4" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="flex items-center gap-1 border-t border-border px-3 py-3">
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl px-1.5 py-1.5 text-left transition-colors hover:bg-accent"
        >
          <Avatar className="size-7">
            <AvatarFallback className="text-xs">Н</AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
            Никита
          </span>
        </button>
        <button
          type="button"
          aria-label={
            updateAvailable ? "Доступно обновление" : "Обновлений нет"
          }
          title={updateAvailable ? "Доступно обновление" : "Обновлений нет"}
          className={cn(
            "relative flex size-8 shrink-0 items-center justify-center rounded-2xl transition-colors",
            updateAvailable
              ? "text-foreground hover:bg-accent"
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
          )}
        >
          <Download className="size-4" />
          {updateAvailable ? (
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-foreground ring-2 ring-sidebar" />
          ) : null}
        </button>
      </div>

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить завод?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `Завод «${deleteTarget.name}» будет удалён без возможности восстановления.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) onDelete(deleteTarget.id)
                setDeleteTarget(null)
              }}
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  )
}

function ActionButton({
  icon: Icon,
  label,
  spinning,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  spinning?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl px-2 py-1.5 text-sm font-medium text-foreground/90 transition-colors hover:bg-accent hover:text-foreground"
    >
      <Icon className={cn("size-4", spinning && "animate-spin")} />
      <span className="flex-1 text-left">{label}</span>
    </button>
  )
}
