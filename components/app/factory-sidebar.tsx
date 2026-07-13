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
  Settings,
  Trash2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
  const [updateHover, setUpdateHover] = React.useState(false)

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
        <button
          type="button"
          onClick={() => runAction("mail")}
          className="flex w-full items-center gap-2 rounded-2xl px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          {running === "mail" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <MailCheck className="size-4" />
          )}
          Обработать почту
        </button>
        <button
          type="button"
          onClick={() => runAction("archive")}
          className="flex w-full items-center gap-2 rounded-2xl px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          {running === "archive" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Archive className="size-4" />
          )}
          Архивировать
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between px-5 pb-1">
        <p className="text-xs font-medium tracking-wide text-muted-foreground">
          Заводы
        </p>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onAdd}
          aria-label="Добавить завод"
          className="text-muted-foreground"
        >
          <Plus />
        </Button>
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
                <Button
                  variant="ghost"
                  onClick={() => onSelect(factory.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "h-9 min-w-0 flex-1 justify-start gap-3 px-2 font-normal hover:bg-transparent hover:text-foreground",
                    isActive ? "text-foreground" : "text-foreground/80",
                  )}
                >
                  <Folder className="text-muted-foreground" />
                  <span className="min-w-0 flex-1 truncate text-left">
                    {factory.name}
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Меню завода ${factory.name}`}
                        className="mr-1 text-muted-foreground opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 data-[popup-open]:opacity-100"
                      >
                        <MoreHorizontal />
                      </Button>
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
          className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Settings className="size-4 shrink-0" />
          <span className="flex-1 truncate text-left">Настройки</span>
        </button>
        {updateAvailable ? (
          <Button
            aria-label="Обновить"
            onMouseEnter={() => setUpdateHover(true)}
            onMouseLeave={() => setUpdateHover(false)}
            onFocus={() => setUpdateHover(true)}
            onBlur={() => setUpdateHover(false)}
            className="h-8 gap-0 overflow-hidden rounded-full bg-blue-600 p-0 text-white hover:bg-blue-500"
          >
            <span className="flex size-8 shrink-0 items-center justify-center">
              <Download />
            </span>
            <span
              className={cn(
                "overflow-hidden whitespace-nowrap text-sm transition-all duration-150 ease-out",
                updateHover ? "max-w-24 pr-3.5 opacity-100" : "max-w-0 opacity-0",
              )}
            >
              Обновить
            </span>
          </Button>
        ) : null}
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
