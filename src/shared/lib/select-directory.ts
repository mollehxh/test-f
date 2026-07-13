export type DirectorySelectionResult =
  | { status: "selected"; path: string }
  | { status: "cancelled" }
  | { status: "unavailable" };

declare global {
  interface Window {
    factoryFlow?: {
      dialog?: {
        selectDirectory: () => Promise<string | null>;
      };
    };
  }
}

export async function selectDirectory(): Promise<DirectorySelectionResult> {
  const selectDirectoryFromDesktop =
    window.factoryFlow?.dialog?.selectDirectory;

  if (!selectDirectoryFromDesktop) {
    return { status: "unavailable" };
  }

  const path = await selectDirectoryFromDesktop();

  if (!path) {
    return { status: "cancelled" };
  }

  return { status: "selected", path };
}
