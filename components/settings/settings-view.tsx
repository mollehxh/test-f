"use client"

import * as React from "react"

import { SettingsSidebar } from "@/components/settings/settings-sidebar"
import { MailSettings } from "@/components/settings/mail-settings"
import { ArchiveSettings } from "@/components/settings/archive-settings"
import { ReportSettings } from "@/components/settings/report-settings"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SettingsView({ onBack }: { onBack: () => void }) {
  const [active, setActive] = React.useState("mail")

  return (
    <main className="flex h-svh w-full overflow-hidden bg-background">
      <SettingsSidebar active={active} onSelect={setActive} onBack={onBack} />
      <ScrollArea className="min-w-0 flex-1">
        {active === "mail" ? <MailSettings /> : null}
        {active === "archive" ? <ArchiveSettings /> : null}
        {active === "report" ? <ReportSettings /> : null}
      </ScrollArea>
    </main>
  )
}
