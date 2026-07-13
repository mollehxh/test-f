import * as React from "react";

import { ArchiveSettings } from "./archive-settings";
import { MailSettings } from "./mail-settings";
import { ReportSettings } from "./report-settings";
import { SettingsSidebar } from "./settings-sidebar";
import type { SettingsSectionId } from "../model/settings";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { SidebarProvider } from "@/shared/ui/sidebar";

const SETTINGS_PANELS: {
  id: SettingsSectionId;
  component: React.ComponentType;
}[] = [
  { id: "mail", component: MailSettings },
  { id: "archive", component: ArchiveSettings },
  { id: "report", component: ReportSettings },
];

type Props = {
  onBack: () => void;
};

export function SettingsPage(props: Props) {
  const { onBack } = props;

  const [active, setActive] = React.useState<SettingsSectionId>("mail");

  return (
    <SidebarProvider className="h-svh min-h-0 overflow-hidden bg-background">
      <SettingsSidebar active={active} onSelect={setActive} onBack={onBack} />
      <ScrollArea className="min-w-0 flex-1">
        {SETTINGS_PANELS.map(({ id, component: Panel }) => (
          <React.Activity key={id} mode={id === active ? "visible" : "hidden"}>
            <Panel />
          </React.Activity>
        ))}
      </ScrollArea>
    </SidebarProvider>
  );
}
