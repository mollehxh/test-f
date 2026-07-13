import type { ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SettingsSection(props: Props) {
  const { title, description, action, children, className } = props;

  return (
    <section className={className}>
      {title ? (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            {description ? (
              <p className="text-sm text-muted-foreground text-pretty">
                {description}
              </p>
            ) : null}
          </div>

          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}

      {children}
    </section>
  );
}
