import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SettingsPanel(props: Props) {
  const { title, description, children } = props;

  return (
    <div className="mx-auto w-full max-w-3xl px-8 py-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">
          {title}
        </h1>
        {description ? (
          <p className="text-sm text-muted-foreground text-pretty">
            {description}
          </p>
        ) : null}
      </header>

      <div className="mt-8 space-y-10">{children}</div>
    </div>
  );
}
