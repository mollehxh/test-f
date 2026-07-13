import * as React from "react";
import { ThemeProvider, useTheme } from "next-themes";

import { TooltipProvider } from "@/shared/ui/tooltip";

type Props = {
  children: React.ReactNode;
};

export function AppProviders(props: Props) {
  const { children } = props;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="factory-flow-theme"
    >
      <TooltipProvider>
        <ThemeHotkey />
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.key.toLowerCase() !== "d" ||
        isTypingTarget(event.target)
      ) {
        return;
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resolvedTheme, setTheme]);

  return null;
}
