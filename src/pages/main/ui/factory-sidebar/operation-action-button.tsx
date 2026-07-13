import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";

import { SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/sidebar";

type Props = {
  label: string;
  icon: LucideIcon;
  isRunning: boolean;
  disabled: boolean;
  onClick: () => void;
};

export function OperationActionButton(props: Props) {
  const { label, icon: Icon, isRunning, disabled, onClick } = props;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={onClick}
        disabled={disabled}
        aria-busy={isRunning}
      >
        {isRunning ? <Loader2 className="animate-spin" /> : <Icon />}
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
