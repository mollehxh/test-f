"use client";

import * as React from "react";
import { Factory as FactoryIcon } from "lucide-react";

import { FactoryChart } from "@/components/app/factory-chart";
import { INITIAL_FACTORIES, type Factory } from "@/components/app/factory-data";
import { FactorySidebar } from "@/components/app/factory-sidebar/factory-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  onOpenSettings: () => void;
  onPreloadSettings: () => void;
};

export function MainApp(props: Props) {
  const { onOpenSettings, onPreloadSettings } = props;

  const [factories, setFactories] =
    React.useState<Factory[]>(INITIAL_FACTORIES);
  const [activeId, setActiveId] = React.useState<string>(
    INITIAL_FACTORIES[0]?.id ?? "",
  );
  const factoryNumberRef = React.useRef(INITIAL_FACTORIES.length);

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
    factoryNumberRef.current += 1;

    const factory = {
      id: crypto.randomUUID(),
      name: `Новый завод ${factoryNumberRef.current}`,
    };

    setFactories((prev) => [...prev, factory]);
    setActiveId(factory.id);

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
        onPreloadSettings={onPreloadSettings}
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
