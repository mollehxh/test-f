"use client";

import * as React from "react";
import { Info, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SettingsPanel } from "@/components/settings/settings-panel";
import { SettingsSection } from "@/components/settings/settings-section";

type Rule = {
  id: string;
  mask: string;
};

const DEFAULT_RULES: Rule[] = [
  { id: "r1", mask: "log/Error.txt" },
  { id: "r2", mask: "log/Param_2*" },
  { id: "r3", mask: "accrue/**" },
  { id: "r4", mask: "results/*.spc" },
];

export function ArchiveSettings() {
  const [rules, setRules] = React.useState<Rule[]>(DEFAULT_RULES);

  const updateRule = (id: string, mask: string) => {
    setRules((prev) =>
      prev.map((rule) => (rule.id === id ? { ...rule, mask } : rule)),
    );
  };

  const removeRule = (id: string) => {
    setRules((prev) => prev.filter((rule) => rule.id !== id));
  };

  const addRule = () => {
    setRules((prev) => [...prev, { id: crypto.randomUUID(), mask: "" }]);
  };

  return (
    <SettingsPanel title="Обработка архивов">
      <SettingsSection
        title="Правила извлечения"
        description="Правила определяют, какие файлы и папки из распакованного архива переносятся в результаты. Каждое правило — путь или glob-маска. Переносятся только совпавшие файлы и папки."
        action={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addRule}
            className="rounded-2xl"
          >
            <Plus className="size-4" />
            Добавить правило
          </Button>
        }
      >
        {rules.length > 0 ? (
          <Card className="gap-0 divide-y divide-border overflow-hidden py-0">
            {rules.map((rule, index) => (
              <div key={rule.id} className="flex items-center gap-3 px-4 py-3">
                <span className="w-6 shrink-0 text-center text-sm text-muted-foreground tabular-nums">
                  {index + 1}
                </span>
                <Input
                  value={rule.mask}
                  onChange={(e) => updateRule(rule.id, e.target.value)}
                  placeholder="results/*.spc"
                  aria-label={`Маска правила ${index + 1}`}
                  className="h-9 flex-1 rounded-2xl border border-border bg-transparent font-mono text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRule(rule.id)}
                  aria-label={`Удалить правило ${index + 1}`}
                  className="shrink-0 rounded-2xl text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </Card>
        ) : null}

        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-muted/40 px-4 py-3">
          <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-pretty">
            {rules.length === 0
              ? "Активных правил нет — приложение перенесёт всё содержимое распакованного архива."
              : "Если удалить все правила, приложение перенесёт всё содержимое распакованного архива."}
          </p>
        </div>
      </SettingsSection>
    </SettingsPanel>
  );
}
