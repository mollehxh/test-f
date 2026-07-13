"use client";

import * as React from "react";
import { Factory as FactoryIcon } from "lucide-react";

import { FactorySidebar } from "@/components/app/factory-sidebar";
import { FactoryChart } from "@/components/app/factory-chart";
import { INITIAL_FACTORIES, type Factory } from "@/components/app/factory-data";
import { SidebarProvider } from "@/components/ui/sidebar";

let factoryCounter = 0;
function nextFactoryId() {
  factoryCounter += 1;
  return `factory-${Date.now()}-${factoryCounter}`;
}

export function MainApp({ onOpenSettings }: { onOpenSettings: () => void }) {
  const [factories, setFactories] =
    React.useState<Factory[]>(INITIAL_FACTORIES);
  const [activeId, setActiveId] = React.useState<string>(
    INITIAL_FACTORIES[0]?.id ?? "",
  );

  const activeFactory =
    factories.find((factory) => factory.id === activeId) ?? null;

  const handleRename = (id: string, name: string) => {
    setFactories((prev) =>
      prev.map((factory) =>
        factory.id === id ? { ...factory, name } : factory,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setFactories((prev) => {
      const next = prev.filter((factory) => factory.id !== id);
      if (id === activeId) {
        setActiveId(next[0]?.id ?? "");
      }
      return next;
    });
  };

  const handleAdd = () => {
    const id = nextFactoryId();
    const factory = {
      id,
      name: `Новый завод ${factories.length + 1}`,
    };

    setFactories((prev) => [...prev, factory]);
    setActiveId(id);

    return factory;
  };

  return (
    <SidebarProvider className="h-svh min-h-0 overflow-hidden bg-background">
      <FactorySidebar
        factories={factories}
        activeId={activeId}
        onSelect={setActiveId}
        onRename={handleRename}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onOpenSettings={onOpenSettings}
      />
      {activeFactory ? (
        <FactoryChart factory={activeFactory} />
      ) : (
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3 p-10 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-border text-muted-foreground">
            <FactoryIcon className="size-5" />
          </div>
          <p className="text-sm text-muted-foreground text-pretty">
            Заводов пока нет. Добавьте завод, чтобы увидеть его график.
          </p>
        </div>
      )}
    </SidebarProvider>
  );
}
