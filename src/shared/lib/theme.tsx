import * as React from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = Exclude<Theme, "system">;

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const THEME_STORAGE_KEY = "factory-flow-theme";
const DARK_THEME_QUERY = "(prefers-color-scheme: dark)";

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getStoredTheme(): Theme {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (
    storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
  ) {
    return storedTheme;
  }

  return "system";
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_THEME_QUERY).matches ? "dark" : "light";
}

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider(props: Props) {
  const { children } = props;

  const [theme, setThemeState] = React.useState<Theme>(getStoredTheme);
  const [systemTheme, setSystemTheme] =
    React.useState<ResolvedTheme>(getSystemTheme);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_THEME_QUERY);
    const handleChange = () => setSystemTheme(getSystemTheme());

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  React.useLayoutEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setTheme = React.useCallback((nextTheme: Theme) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setThemeState(nextTheme);
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [resolvedTheme, setTheme, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
