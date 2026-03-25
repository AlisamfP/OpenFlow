import { useState, useEffect } from "react";

// Default Breakpoint Values for material ui. Using lg for desktop sizes.
// xs: extra-small (0px or larger)
// sm: small (600px or larger)
// md: medium (900px or larger)
// lg: large (1200px or larger)
// xl: extra-large (1536px or larger)

// A simple hook to know if we're in desktop layout
export function checkIfDesktop() {
  const breakpoint = 1200;
  if (typeof window !== 'undefined') {

  const [isDesktop, setIsDesktop] = useState(
    () => window.innerWidth >= breakpoint,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return isDesktop;
  }
}
