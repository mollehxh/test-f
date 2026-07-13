"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { MainApp } from "@/components/app/main-app";

type View = "app" | "settings";

const loadSettingsView = () => import("@/components/settings/settings-view");

const SettingsView = dynamic(() =>
  loadSettingsView().then((module) => module.SettingsView),
);

export default function Page() {
  const [view, setView] = React.useState<View>("app");
  const [hasOpenedSettings, setHasOpenedSettings] = React.useState(false);

  const openSettings = () => {
    setHasOpenedSettings(true);
    setView("settings");
  };

  const preloadSettings = () => {
    void loadSettingsView();
  };

  const closeSettings = () => {
    setView("app");
  };

  return (
    <>
      <React.Activity mode={view === "app" ? "visible" : "hidden"}>
        <MainApp
          onOpenSettings={openSettings}
          onPreloadSettings={preloadSettings}
        />
      </React.Activity>

      {hasOpenedSettings ? (
        <React.Activity mode={view === "settings" ? "visible" : "hidden"}>
          <SettingsView onBack={closeSettings} />
        </React.Activity>
      ) : null}
    </>
  );
}
