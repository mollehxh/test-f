"use client";

import * as React from "react";
import {
  ArrowLeft,
  Search,
  Mail,
  FolderArchive,
  FileText,
  ArrowUpRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
};

type NavGroup = {
  heading: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    heading: "Настройки",
    items: [
      { id: "mail", label: "Почта", icon: Mail },
      { id: "archive", label: "Обработка архивов", icon: FolderArchive },
      { id: "report", label: "Отчёт", icon: FileText },
    ],
  },
];

export function SettingsSidebar({
  active,
  onSelect,
  onBack,
}: {
  active: string;
  onSelect: (id: string) => void;
  onBack?: () => void;
}) {
  const [query, setQuery] = React.useState("");

  const groups = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV_GROUPS;
    return NAV_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => item.label.toLowerCase().includes(q)),
    })).filter((group) => group.items.length > 0);
  }, [query]);

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
        {groups.map((group) => (
          <SidebarGroup key={group.heading}>
            <SidebarGroupLabel>{group.heading}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
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
                        {item.external ? <ArrowUpRight /> : null}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
