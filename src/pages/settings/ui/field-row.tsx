import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

type Props = {
  title: string;
  description?: string;
  htmlFor?: string;
  control: ReactNode;
  className?: string;
};

export function FieldRow(props: Props) {
  const { title, description, htmlFor, control, className } = props;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
        className,
      )}
    >
      <div className="min-w-0 space-y-0.5">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground"
        >
          {title}
        </label>
        {description ? (
          <p className="text-sm text-muted-foreground text-pretty">
            {description}
          </p>
        ) : null}
      </div>

      <div className="w-full shrink-0 sm:w-auto">{control}</div>
    </div>
  );
}
