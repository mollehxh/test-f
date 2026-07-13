import { memo } from "react";
import { Download } from "lucide-react";

import { Button } from "@/shared/ui/button";

export const UpdateButton = memo(function UpdateButton() {
  return (
    <Button
      aria-label="Обновить"
      className="group h-8 max-w-8 min-w-8 shrink-0 gap-0 overflow-hidden rounded-full bg-blue-500 p-0 text-white transition-[max-width,background-color] duration-150 ease-out hover:max-w-32 hover:bg-blue-400 focus:max-w-32"
    >
      <span className="flex size-8 shrink-0 items-center justify-center">
        <Download />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm opacity-0 transition-all duration-150 ease-out group-hover:max-w-24 group-hover:pr-3.5 group-hover:opacity-100 group-focus:max-w-24 group-focus:pr-3.5 group-focus:opacity-100">
        Обновить
      </span>
    </Button>
  );
});
