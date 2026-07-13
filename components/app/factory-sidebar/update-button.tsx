"use client";

import * as React from "react";
import { Download } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function UpdateButton() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Button
      aria-label="Обновить"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onFocus={() => setIsExpanded(true)}
      onBlur={() => setIsExpanded(false)}
      className={cn(
        "h-8 min-w-8 shrink-0 gap-0 overflow-hidden rounded-full bg-blue-500 p-0 text-white transition-[max-width,background-color] duration-150 ease-out hover:bg-blue-400",
        isExpanded ? "max-w-32" : "max-w-8",
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center">
        <Download />
      </span>
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap text-sm transition-all duration-150 ease-out",
          isExpanded ? "max-w-24 pr-3.5 opacity-100" : "max-w-0 opacity-0",
        )}
      >
        Обновить
      </span>
    </Button>
  );
}
