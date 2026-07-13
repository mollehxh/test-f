import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import type { Factory } from "@/components/app/factory-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type Props = {
  factory: Factory;
  isActive: boolean;
  onSelect: (id: string) => void;
  onRename: (factory: Factory) => void;
  onDelete: (factory: Factory) => void;
};

export function FactoryListItem(props: Props) {
  const { factory, isActive, onSelect, onRename, onDelete } = props;

  const handleSelect = () => {
    onSelect(factory.id);
  };

  const handleRename = () => {
    onRename(factory);
  };

  const handleDelete = () => {
    onDelete(factory);
  };

  return (
    <SidebarMenuItem className="rounded-xl transition-colors hover:bg-sidebar-accent has-[[aria-expanded=true]]:bg-sidebar-accent">
      <SidebarMenuButton
        onClick={handleSelect}
        isActive={isActive}
        aria-current={isActive ? "page" : undefined}
      >
        <span>{factory.name}</span>
      </SidebarMenuButton>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuAction
              aria-label={`Меню завода ${factory.name}`}
              showOnHover
              className="hover:bg-sidebar dark:hover:bg-white/10"
            >
              <MoreHorizontal />
            </SidebarMenuAction>
          }
        />
        <DropdownMenuContent side="right" align="start" className="w-44">
          <DropdownMenuItem onClick={handleRename}>
            <Pencil className="size-4" />
            Переименовать
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            <Trash2 className="size-4" />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
