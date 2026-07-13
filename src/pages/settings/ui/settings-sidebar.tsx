import { ArrowLeft, FileText, FolderArchive, Mail } from "lucide-react";

import type { SettingsSectionId } from "../model/settings";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

const NAV_ITEMS: {
  id: SettingsSectionId;
  label: string;
  icon: typeof Mail;
}[] = [
  { id: "mail", label: "Почта", icon: Mail },
  { id: "archive", label: "Обработка архивов", icon: FolderArchive },
  { id: "report", label: "Отчёт", icon: FileText },
];

type Props = {
  active: SettingsSectionId;
  onSelect: (id: SettingsSectionId) => void;
  onBack?: () => void;
};

export function SettingsSidebar(props: Props) {
  const { active, onSelect, onBack } = props;

  return (
    <Sidebar collapsible="none" className="w-72 border-r border-sidebar-border">
      <SidebarHeader className="pt-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onBack}>
              <ArrowLeft />
              <span>Назад в приложение</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Настройки</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === active;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSelect(item.id)}
                      isActive={isActive}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
