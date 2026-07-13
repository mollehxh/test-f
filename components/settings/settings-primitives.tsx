"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export function SettingsPanel({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-8 py-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">
          {title}
        </h1>
        {description ? (
          <p className="text-sm text-muted-foreground text-pretty">
            {description}
          </p>
        ) : null}
      </header>
      <div className="mt-8 space-y-10">{children}</div>
    </div>
  )
}

export function SettingsSection({
  title,
  description,
  action,
  children,
  className,
}: {
  title?: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={className}>
      {title ? (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            {description ? (
              <p className="text-sm text-muted-foreground text-pretty">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  )
}

export function FieldRow({
  title,
  description,
  htmlFor,
  control,
  className,
}: {
  title: string
  description?: string
  htmlFor?: string
  control: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
        className,
      )}
    >
      <div className="min-w-0 space-y-0.5">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground"
        >
          {title}
        </label>
        {description ? (
          <p className="text-sm text-muted-foreground text-pretty">
            {description}
          </p>
        ) : null}
      </div>
      <div className="w-full shrink-0 sm:w-auto">{control}</div>
    </div>
  )
}
