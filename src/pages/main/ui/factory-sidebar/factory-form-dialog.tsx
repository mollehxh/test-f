import * as React from "react";
import { FolderOpenIcon, LoaderCircleIcon } from "lucide-react";

import type { Factory, FactoryInput } from "../../model/factory";
import { selectDirectory } from "@/shared/lib/select-directory";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/ui/input-group";

type Props = {
  factory: Factory | null;
  mode: "create" | "edit";
  open: boolean;
  existingFactories: Factory[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: FactoryInput) => void;
};

type FormErrors = Partial<Record<keyof FactoryInput, string>>;

const EMPTY_FORM: FactoryInput = {
  prefix: "",
  folderPath: "",
};

export function FactoryFormDialog(props: Props) {
  const { factory, mode, open, existingFactories, onOpenChange, onSubmit } =
    props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open ? (
        <FactoryFormContent
          key={`${mode}-${factory?.id ?? "new"}`}
          factory={factory}
          mode={mode}
          existingFactories={existingFactories}
          onCancel={() => onOpenChange(false)}
          onSubmit={(input) => {
            onSubmit(input);
            onOpenChange(false);
          }}
        />
      ) : null}
    </Dialog>
  );
}

type ContentProps = Pick<Props, "factory" | "mode" | "existingFactories"> & {
  onCancel: () => void;
  onSubmit: (input: FactoryInput) => void;
};

function FactoryFormContent(props: ContentProps) {
  const { factory, mode, existingFactories, onCancel, onSubmit } = props;

  const [form, setForm] = React.useState<FactoryInput>(() =>
    factory
      ? { prefix: factory.prefix, folderPath: factory.folderPath }
      : EMPTY_FORM,
  );
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSelectingFolder, setIsSelectingFolder] = React.useState(false);

  const setField = (field: keyof FactoryInput, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = (input: FactoryInput) => {
    const nextErrors: FormErrors = {};
    const normalizedPrefix = input.prefix.toLocaleLowerCase();
    const normalizedFolderPath = input.folderPath.toLocaleLowerCase();

    if (!input.prefix) {
      nextErrors.prefix = "Укажите префикс завода.";
    } else if (
      existingFactories.some(
        (item) =>
          item.id !== factory?.id &&
          item.prefix.toLocaleLowerCase() === normalizedPrefix,
      )
    ) {
      nextErrors.prefix = "Такой префикс уже используется.";
    }

    if (!input.folderPath) {
      nextErrors.folderPath = "Укажите папку завода.";
    } else if (
      existingFactories.some(
        (item) =>
          item.id !== factory?.id &&
          item.folderPath.toLocaleLowerCase() === normalizedFolderPath,
      )
    ) {
      nextErrors.folderPath = "Эта папка уже привязана к другому заводу.";
    }

    return nextErrors;
  };

  const handleSelectFolder = async () => {
    setIsSelectingFolder(true);

    try {
      const result = await selectDirectory();

      if (result.status === "selected") {
        setField("folderPath", result.path);
        return;
      }

      if (result.status === "unavailable") {
        setErrors((current) => ({
          ...current,
          folderPath:
            "Системный выбор папки будет доступен после подключения Electron.",
        }));
      }
    } catch {
      setErrors((current) => ({
        ...current,
        folderPath: "Не удалось открыть системный выбор папки.",
      }));
    } finally {
      setIsSelectingFolder(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const input = {
      prefix: form.prefix.trim(),
      folderPath: form.folderPath.trim(),
    };
    const nextErrors = validate(input);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit(input);
  };

  return (
    <DialogContent>
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Добавить завод" : "Редактировать завод"}
          </DialogTitle>
          <DialogDescription>
            Префикс используется для идентификации данных, а папка — для их
            хранения на компьютере.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <Field data-invalid={Boolean(errors.prefix)}>
            <FieldLabel htmlFor="factory-prefix">Префикс</FieldLabel>
            <Input
              id="factory-prefix"
              autoFocus
              value={form.prefix}
              onChange={(event) => setField("prefix", event.target.value)}
              placeholder="Например, NORTH"
              aria-invalid={Boolean(errors.prefix)}
            />
            <FieldError>{errors.prefix}</FieldError>
          </Field>

          <Field data-invalid={Boolean(errors.folderPath)}>
            <FieldLabel htmlFor="factory-folder">Папка</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="factory-folder"
                value={form.folderPath}
                placeholder="Папка не выбрана"
                aria-invalid={Boolean(errors.folderPath)}
                title={form.folderPath || undefined}
                readOnly
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  variant="ghost"
                  size="xs"
                  disabled={isSelectingFolder}
                  onClick={handleSelectFolder}
                >
                  {isSelectingFolder ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : (
                    <FolderOpenIcon />
                  )}
                  {isSelectingFolder ? "Выбор..." : "Выбрать"}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldError>{errors.folderPath}</FieldError>
          </Field>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit">
            {mode === "create" ? "Добавить" : "Сохранить"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
