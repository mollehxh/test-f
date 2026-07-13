import * as React from "react";

import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { EmailListEditor } from "./email-list-editor";
import { FieldRow } from "./field-row";
import { SettingsPanel } from "./settings-panel";
import { SettingsSection } from "./settings-section";

const VARIABLES: { token: string; description: string }[] = [
  {
    token: "{{period}}",
    description: "Период, к которому относятся проблемные архивы",
  },
  { token: "{{problemCount}}", description: "Количество найденных проблем" },
  {
    token: "{{processedCount}}",
    description: "Количество успешно обработанных архивов",
  },
  {
    token: "{{problemArchives}}",
    description:
      "Список отсутствующих или необработанных архивов (для текста письма)",
  },
];

const SUBJECT_DEFAULT = "Проблемы обработки архивов за {{period}}";

const BODY_DEFAULT = `За период {{period}} обнаружено проблем: {{problemCount}}.
Успешно обработано архивов: {{processedCount}}.

Проблемные архивы:
{{problemArchives}}`;

export function ReportSettings() {
  const [recipients, setRecipients] = React.useState<string[]>([]);
  const [subject, setSubject] = React.useState(SUBJECT_DEFAULT);
  const [body, setBody] = React.useState(BODY_DEFAULT);

  return (
    <SettingsPanel title="Отчёт">
      <SettingsSection
        title="Получатели"
        description="Адреса, которым адресуется черновик отчёта о проблемах."
      >
        <Card className="overflow-hidden px-5 py-4">
          <EmailListEditor
            values={recipients}
            onChange={setRecipients}
            placeholder="recipient@example.com"
            emptyText="Пока не добавлен ни один получатель."
          />
        </Card>
      </SettingsSection>

      <SettingsSection
        title="Шаблоны письма"
        description="Тема и текст черновика отчёта. Используйте переменные из списка ниже.
        "
      >
        <Card className="gap-0 divide-y divide-border overflow-hidden py-0">
          <FieldRow
            title="Тема письма"
            description="Шаблон темы черновика"
            htmlFor="report-subject"
            control={
              <Input
                id="report-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-9 w-full rounded-2xl border border-border bg-transparent sm:w-80"
              />
            }
          />
          <div className="flex flex-col gap-3 px-5 py-4">
            <div className="space-y-0.5">
              <label
                htmlFor="report-body"
                className="text-sm font-medium text-foreground"
              >
                Текст письма
              </label>
              <p className="text-sm text-muted-foreground text-pretty">
                Шаблон тела письма. Здесь особенно уместна переменная{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                  {"{{problemArchives}}"}
                </code>
                .
              </p>
            </div>
            <Textarea
              id="report-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-40 rounded-2xl border border-border bg-transparent font-mono text-sm leading-relaxed"
            />
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection
        title="Доступные переменные"
        description="Подставляются в тему и текст письма при формировании отчёта."
      >
        <Card className="gap-0 divide-y divide-border overflow-hidden py-0">
          {VARIABLES.map((variable) => (
            <div
              key={variable.token}
              className="flex flex-col gap-1.5 px-5 py-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Badge
                variant="secondary"
                className="h-6 w-fit rounded-2xl font-mono text-xs font-normal"
              >
                {variable.token}
              </Badge>
              <p className="text-sm text-muted-foreground text-pretty">
                {variable.description}
              </p>
            </div>
          ))}
        </Card>
      </SettingsSection>
    </SettingsPanel>
  );
}
