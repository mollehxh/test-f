import * as React from "react";

import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { EmailListEditor } from "./email-list-editor";
import { FieldRow } from "./field-row";
import { SettingsPanel } from "./settings-panel";
import { SettingsSection } from "./settings-section";

const fieldInputClass =
  "h-9 w-full rounded-2xl border border-border bg-transparent sm:w-72";

export function MailSettings() {
  const [imapHost, setImapHost] = React.useState("imap.example.com");
  const [imapPort, setImapPort] = React.useState("993");
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fromAddress, setFromAddress] = React.useState("");
  const [senders, setSenders] = React.useState<string[]>([]);
  const [processedFolder, setProcessedFolder] = React.useState("Processed");

  return (
    <SettingsPanel title="Почта">
      <SettingsSection
        title="Подключение к IMAP"
        description="Данные для доступа к почтовому ящику, из которого приложение забирает письма."
      >
        <Card className="gap-0 divide-y divide-border overflow-hidden py-0">
          <FieldRow
            title="IMAP-сервер"
            htmlFor="imap-host"
            control={
              <Input
                id="imap-host"
                value={imapHost}
                onChange={(e) => setImapHost(e.target.value)}
                placeholder="imap.example.com"
                className={fieldInputClass}
              />
            }
          />
          <FieldRow
            title="Порт IMAP-сервера"
            htmlFor="imap-port"
            control={
              <Input
                id="imap-port"
                inputMode="numeric"
                value={imapPort}
                onChange={(e) => setImapPort(e.target.value)}
                placeholder="993"
                className="h-9 w-full rounded-2xl border border-border bg-transparent sm:w-32"
              />
            }
          />
          <FieldRow
            title="Логин"
            description="Имя пользователя почтового ящика"
            htmlFor="imap-login"
            control={
              <Input
                id="imap-login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="user@example.com"
                autoComplete="username"
                className={fieldInputClass}
              />
            }
          />
          <FieldRow
            title="Пароль"
            description="Пароль или пароль приложения для почтового ящика"
            htmlFor="imap-password"
            control={
              <Input
                id="imap-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className={fieldInputClass}
              />
            }
          />
        </Card>
      </SettingsSection>

      <SettingsSection
        title="Приём архивов"
        description="Определите, от кого приложение принимает архивы и как поступает с обработанными письмами."
      >
        <Card className="gap-0 divide-y divide-border overflow-hidden py-0">
          <FieldRow
            title="Адрес для черновика отчёта"
            description="Почтовый адрес, от имени которого создаётся черновик отчёта"
            htmlFor="from-address"
            control={
              <Input
                id="from-address"
                type="email"
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
                placeholder="reports@example.com"
                className={fieldInputClass}
              />
            }
          />
          <FieldRow
            title="Папка обработанных писем"
            description="Название почтовой папки, куда перемещаются успешно обработанные письма"
            htmlFor="processed-folder"
            control={
              <Input
                id="processed-folder"
                value={processedFolder}
                onChange={(e) => setProcessedFolder(e.target.value)}
                placeholder="Processed"
                className={fieldInputClass}
              />
            }
          />
          <div className="flex flex-col gap-3 px-5 py-4">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">
                Разрешённые отправители
              </p>
              <p className="text-sm text-muted-foreground text-pretty">
                Список адресов, от которых приложение принимает архивы. Письма
                от других отправителей игнорируются.
              </p>
            </div>
            <EmailListEditor
              values={senders}
              onChange={setSenders}
              placeholder="sender@example.com"
              emptyText="Пока не добавлен ни один отправитель — архивы приниматься не будут."
            />
          </div>
        </Card>
      </SettingsSection>
    </SettingsPanel>
  );
}
