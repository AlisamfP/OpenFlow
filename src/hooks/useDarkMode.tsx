import { useColorScheme } from "@mui/material";

export function useDarkMode() {
  const { mode, setMode } = useColorScheme();
  const light = "light";
  const dark = "dark";

  const isDark = mode === dark;
  const toggleMode = () => {
    setMode(isDark ? light : dark);
  };

  return { isDark, mode, toggleMode };
}