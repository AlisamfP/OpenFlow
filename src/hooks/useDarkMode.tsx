"use client";
import { authClient } from "@/lib/auth-client";
import { useColorScheme } from "@mui/material";

export function useDarkMode() {
    const { mode, setMode } = useColorScheme();
    const { data: session } = authClient.useSession();
    const isDark = mode === "dark";

    const toggleMode = () => {
        setMode(isDark ? "light" : "dark");
    }
    const saveModePref = async (darkModeOn: boolean) => {
        if(session) {
            await fetch("/api/user/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ darkModeOnPref: darkModeOn })
            })
        }
        setMode(darkModeOn ? "dark" : "light");
    };

    return { isDark, mode, toggleMode, saveModePref };
}