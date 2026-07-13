import * as React from "react";

import { MainPage } from "@/pages/main";

type Page = "main" | "settings";

const loadSettingsPage = () => import("@/pages/settings");

const SettingsPage = React.lazy(() =>
  loadSettingsPage().then((module) => ({ default: module.SettingsPage })),
);

export function App() {
  const [page, setPage] = React.useState<Page>("main");
  const [hasOpenedSettings, setHasOpenedSettings] = React.useState(false);

  const openSettings = () => {
    setHasOpenedSettings(true);
    setPage("settings");
  };

  const preloadSettings = () => {
    void loadSettingsPage();
  };

  const closeSettings = () => {
    setPage("main");
  };

  return (
    <React.Suspense fallback={null}>
      <React.Activity mode={page === "main" ? "visible" : "hidden"}>
        <MainPage
          onOpenSettings={openSettings}
          onPreloadSettings={preloadSettings}
        />
      </React.Activity>

      {hasOpenedSettings ? (
        <React.Activity mode={page === "settings" ? "visible" : "hidden"}>
          <SettingsPage onBack={closeSettings} />
        </React.Activity>
      ) : null}
    </React.Suspense>
  );
}
