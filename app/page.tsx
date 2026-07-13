"use client"

import * as React from "react"

import { MainApp } from "@/components/app/main-app"
import { SettingsView } from "@/components/settings/settings-view"

type View = "app" | "settings"

export default function Page() {
  const [view, setView] = React.useState<View>("app")

  return view === "app" ? (
    <MainApp onOpenSettings={() => setView("settings")} />
  ) : (
    <SettingsView onBack={() => setView("app")} />
  )
}
