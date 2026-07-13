"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import type { Factory } from "@/components/app/factory-data";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { DeleteFactoryDialog } from "./delete-factory-dialog";
import { FactoryListItem } from "./factory-list-item";
import { FactoryRenameItem } from "./factory-rename-item";

type Props = {
  factories: Factory[];
  activeId: string;
  onSelect: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => Factory;
};

export const FactoryList = React.memo(function FactoryList(props: Props) {
  const { factories, activeId, onSelect, onRename, onDelete, onAdd } = props;

  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draftName, setDraftName] = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState<Factory | null>(null);
  const cancelRenameRef = React.useRef(false);

  const startRename = (factory: Factory) => {
    cancelRenameRef.current = false;
    setEditingId(factory.id);
    setDraftName(factory.name);
  };

  const handleAdd = () => {
    startRename(onAdd());
  };

  const commitRename = () => {
    if (!editingId) return;

    if (cancelRenameRef.current) {
      cancelRenameRef.current = false;
      return;
    }

    const trimmed = draftName.trim();
    if (trimmed) onRename(editingId, trimmed);
    setEditingId(null);
    setDraftName("");
  };

  const cancelRename = () => {
    cancelRenameRef.current = true;
    setEditingId(null);
    setDraftName("");
  };

  const closeDeleteDialog = () => {
    setDeleteTarget(null);
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
                  <FactoryRenameItem
                    key={factory.id}
                    value={draftName}
                    onChange={setDraftName}
                    onCommit={commitRename}
                    onCancel={cancelRename}
                  />
                );
              }

              return (
                <FactoryListItem
                  key={factory.id}
                  factory={factory}
                  isActive={isActive}
                  onSelect={onSelect}
                  onRename={startRename}
                  onDelete={setDeleteTarget}
                />
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <DeleteFactoryDialog
        factory={deleteTarget}
        onClose={closeDeleteDialog}
        onConfirm={onDelete}
      />
    </>
  );
});
