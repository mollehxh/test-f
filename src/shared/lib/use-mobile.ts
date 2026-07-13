import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );
    const update = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", update);
    update();

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return Boolean(isMobile);
}
