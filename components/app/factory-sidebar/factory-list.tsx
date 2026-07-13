"use client";

import * as React from "react";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";

import type { Factory } from "@/components/app/factory-data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function FactoryList({
  factories,
  activeId,
  onSelect,
  onRename,
  onDelete,
  onAdd,
}: {
  factories: Factory[];
  activeId: string;
  onSelect: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => Factory;
}) {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draftName, setDraftName] = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState<Factory | null>(null);

  const startRename = (factory: Factory) => {
    setEditingId(factory.id);
    setDraftName(factory.name);
  };

  const handleAdd = () => {
    startRename(onAdd());
  };

  const commitRename = () => {
    if (!editingId) return;

    const trimmed = draftName.trim();
    if (trimmed) onRename(editingId, trimmed);
    setEditingId(null);
  };

  return (
    <>
      <SidebarGroup className="pt-3">
        <SidebarGroupLabel>Заводы</SidebarGroupLabel>
        <SidebarGroupAction onClick={handleAdd} aria-label="Добавить завод">
          <Plus />
        </SidebarGroupAction>
        <SidebarGroupContent>
          <SidebarMenu>
            {factories.map((factory) => {
              const isActive = factory.id === activeId;
              const isEditing = factory.id === editingId;

              if (isEditing) {
                return (
                  <SidebarMenuItem key={factory.id}>
                    <SidebarInput
                      autoFocus
                      value={draftName}
                      onFocus={(event) => event.currentTarget.select()}
                      onChange={(event) => setDraftName(event.target.value)}
                      onBlur={commitRename}
                      onKeyDown={(event) => {
                        if (
                          event.nativeEvent.isComposing ||
                          event.keyCode === 229
                        ) {
                          return;
                        }

                        if (event.key === "Enter") commitRename();
                        if (event.key === "Escape") setEditingId(null);
                      }}
                      aria-label="Название завода"
                      className="h-8"
                    />
                  </SidebarMenuItem>
                );
              }

              return (
                <SidebarMenuItem
                  key={factory.id}
                  className="rounded-xl transition-colors hover:bg-sidebar-accent has-[[aria-expanded=true]]:bg-sidebar-accent"
                >
                  <SidebarMenuButton
                    onClick={() => onSelect(factory.id)}
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
                    <DropdownMenuContent
                      side="right"
                      align="start"
                      className="w-44"
                    >
                      <DropdownMenuItem onClick={() => startRename(factory)}>
                        <Pencil className="size-4" />
                        Переименовать
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setDeleteTarget(factory)}
                      >
                        <Trash2 className="size-4" />
                        Удалить
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить завод?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `Завод «${deleteTarget.name}» будет удалён без возможности восстановления.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) onDelete(deleteTarget.id);
                setDeleteTarget(null);
              }}
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
