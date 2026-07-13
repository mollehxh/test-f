"use client"

import * as React from "react"
import { Plus, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EmailListEditor({
  values,
  onChange,
  placeholder = "name@example.com",
  emptyText = "Пока нет ни одного адреса.",
}: {
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  emptyText?: string
}) {
  const [draft, setDraft] = React.useState("")

  const add = React.useCallback(() => {
    const value = draft.trim()
    if (!value) return
    if (values.includes(value)) {
      setDraft("")
      return
    }
    onChange([...values, value])
    setDraft("")
  }, [draft, values, onChange])

  const remove = (value: string) => {
    onChange(values.filter((item) => item !== value))
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          type="email"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing || e.keyCode === 229) return
            if (e.key === "Enter") {
              e.preventDefault()
              add()
            }
          }}
          placeholder={placeholder}
          className="h-9 flex-1 rounded-2xl border border-border bg-transparent"
        />
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={add}
          disabled={!draft.trim()}
          className="rounded-2xl"
        >
          <Plus className="size-4" />
          Добавить
        </Button>
      </div>

      {values.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <Badge
              key={value}
              variant="outline"
              className="h-7 gap-1 rounded-2xl pr-1 pl-3 text-sm font-normal"
            >
              {value}
              <button
                type="button"
                onClick={() => remove(value)}
                aria-label={`Удалить ${value}`}
                className="grid size-4 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      )}
    </div>
  )
}
