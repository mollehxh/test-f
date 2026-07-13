import * as React from "react";
import { Archive, MailCheck, Settings } from "lucide-react";

import type { Factory, FactoryInput } from "../../model/factory";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { FactoryList } from "./factory-list";
import { OperationActionButton } from "./operation-action-button";
import { OperationStatusCard } from "./operation-status-card";
import { UpdateButton } from "./update-button";

type ActionKey = "mail" | "archive";

type Props = {
  factories: Factory[];
  activeId: string;
  onSelect: (id: string) => void;
  onUpdate: (id: string, input: FactoryInput) => void;
  onDelete: (id: string) => void;
  onAdd: (input: FactoryInput) => void;
  onOpenSettings: () => void;
  onPreloadSettings: () => void;
  updateAvailable?: boolean;
};

export function FactorySidebar(props: Props) {
  const {
    factories,
    activeId,
    onSelect,
    onUpdate,
    onDelete,
    onAdd,
    onOpenSettings,
    onPreloadSettings,
    updateAvailable = true,
  } = props;

  const [running, setRunning] = React.useState<ActionKey | null>(null);
  const [progress, setProgress] = React.useState(0);

  const progressIntervalRef = React.useRef<number | null>(null);
  const actionTimeoutRef = React.useRef<number | null>(null);

  const clearActionTimers = React.useCallback(() => {
    if (progressIntervalRef.current !== null) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (actionTimeoutRef.current !== null) {
      window.clearTimeout(actionTimeoutRef.current);
      actionTimeoutRef.current = null;
    }
  }, []);

  React.useEffect(() => clearActionTimers, [clearActionTimers]);

  const runAction = (key: ActionKey) => {
    if (running) return;

    clearActionTimers();
    setRunning(key);
    setProgress(0);

    const startedAt = performance.now();
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      setProgress(Math.min(96, Math.round((elapsed / 1600) * 100)));
    }, 80);

    actionTimeoutRef.current = window.setTimeout(() => {
      clearActionTimers();
      setProgress(100);
      setRunning(null);
    }, 1600);
  };

  const stopAction = () => {
    clearActionTimers();
    setRunning(null);
    setProgress(0);
  };

  const runMailAction = () => {
    runAction("mail");
  };

  const runArchiveAction = () => {
    runAction("archive");
  };

  return (
    <Sidebar collapsible="none" className="w-72 border-r border-sidebar-border">
      <SidebarHeader className="pt-5">
        <SidebarMenu>
          <OperationActionButton
            label="Обработать почту"
            icon={MailCheck}
            isRunning={running === "mail"}
            disabled={running !== null && running !== "mail"}
            onClick={runMailAction}
          />
          <OperationActionButton
            label="Архивировать"
            icon={Archive}
            isRunning={running === "archive"}
            disabled={running !== null && running !== "archive"}
            onClick={runArchiveAction}
          />
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <FactoryList
          factories={factories}
          activeId={activeId}
          onSelect={onSelect}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onAdd={onAdd}
        />
      </SidebarContent>

      <SidebarFooter className="py-3">
        {running ? (
          <OperationStatusCard
            label={running === "mail" ? "Обработка почты" : "Архивация файлов"}
            progress={progress}
            onStop={stopAction}
          />
        ) : null}

        <div className="flex items-center gap-2">
          <SidebarMenu className="min-w-0 flex-1">
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={onOpenSettings}
                onMouseEnter={onPreloadSettings}
                onFocus={onPreloadSettings}
              >
                <Settings />
                <span>Настройки</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          {updateAvailable ? <UpdateButton /> : null}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
