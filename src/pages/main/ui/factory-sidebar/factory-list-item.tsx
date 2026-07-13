import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import type { Factory } from "../../model/factory";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

type Props = {
  factory: Factory;
  isActive: boolean;
  onSelect: (id: string) => void;
  onEdit: (factory: Factory) => void;
  onDelete: (factory: Factory) => void;
};

export function FactoryListItem(props: Props) {
  const { factory, isActive, onSelect, onEdit, onDelete } = props;

  const handleSelect = () => {
    onSelect(factory.id);
  };

  const handleEdit = () => {
    onEdit(factory);
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
        <span>{factory.prefix}</span>
      </SidebarMenuButton>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuAction
              aria-label={`Меню завода ${factory.prefix}`}
              showOnHover
              className="hover:bg-sidebar dark:hover:bg-white/10"
            >
              <MoreHorizontal />
            </SidebarMenuAction>
          }
        />
        <DropdownMenuContent side="right" align="start" className="w-44">
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil className="size-4" />
            Редактировать
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
