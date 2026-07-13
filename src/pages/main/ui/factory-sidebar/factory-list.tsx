import * as React from "react";
import { Plus } from "lucide-react";

import type { Factory, FactoryInput } from "../../model/factory";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/shared/ui/sidebar";
import { DeleteFactoryDialog } from "./delete-factory-dialog";
import { FactoryFormDialog } from "./factory-form-dialog";
import { FactoryListItem } from "./factory-list-item";

type Props = {
  factories: Factory[];
  activeId: string;
  onSelect: (id: string) => void;
  onUpdate: (id: string, input: FactoryInput) => void;
  onDelete: (id: string) => void;
  onAdd: (input: FactoryInput) => void;
};

export const FactoryList = React.memo(function FactoryList(props: Props) {
  const { factories, activeId, onSelect, onUpdate, onDelete, onAdd } = props;

  const [editorMode, setEditorMode] = React.useState<"create" | "edit">(
    "create",
  );
  const [editorTarget, setEditorTarget] = React.useState<Factory | null>(null);
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<Factory | null>(null);

  const openCreateDialog = () => {
    setEditorMode("create");
    setEditorTarget(null);
    setEditorOpen(true);
  };

  const openEditDialog = (factory: Factory) => {
    setEditorMode("edit");
    setEditorTarget(factory);
    setEditorOpen(true);
  };

  const handleSubmit = (input: FactoryInput) => {
    if (editorMode === "edit" && editorTarget) {
      onUpdate(editorTarget.id, input);
      return;
    }

    onAdd(input);
  };

  const closeDeleteDialog = () => {
    setDeleteTarget(null);
  };

  return (
    <>
      <SidebarGroup className="pt-3">
        <SidebarGroupLabel>Заводы</SidebarGroupLabel>
        <SidebarGroupAction
          onClick={openCreateDialog}
          aria-label="Добавить завод"
        >
          <Plus />
        </SidebarGroupAction>
        <SidebarGroupContent>
          <SidebarMenu>
            {factories.map((factory) => (
              <FactoryListItem
                key={factory.id}
                factory={factory}
                isActive={factory.id === activeId}
                onSelect={onSelect}
                onEdit={openEditDialog}
                onDelete={setDeleteTarget}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <FactoryFormDialog
        factory={editorTarget}
        mode={editorMode}
        open={editorOpen}
        existingFactories={factories}
        onOpenChange={setEditorOpen}
        onSubmit={handleSubmit}
      />

      <DeleteFactoryDialog
        factory={deleteTarget}
        onClose={closeDeleteDialog}
        onConfirm={onDelete}
      />
    </>
  );
});
