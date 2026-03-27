
// Default Breakpoint Values for material ui. Using lg for desktop sizes.
// xs: extra-small (0px or larger)
// sm: small (600px or larger)
// md: medium (900px or larger)
// lg: large (1200px or larger)
// xl: extra-large (1536px or larger)

// A simple hook to know if we're in desktop layout
// hooks/useWindowSize.js
"use client"; 
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  return windowSize;
}
export default useWindowSize;
