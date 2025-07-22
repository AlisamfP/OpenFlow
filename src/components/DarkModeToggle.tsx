import { Button } from "@material-tailwind/react";
import { useLayoutEffect, useState } from "react";
import { PiMoonStars, PiSun } from "react-icons/pi";

function DarkModeToggle() {
    const darkMode = "dark";
    const lightMode = "light";

    const getDataTheme = (theme: string) => theme === darkMode ? darkMode : lightMode;
    const getToggledTheme = (theme: string) => theme === darkMode ? lightMode : darkMode;

    const initialTheme = localStorage.getItem("dataTheme");
    const [theme, setTheme] = useState<string | null>(initialTheme);

    useLayoutEffect(() => {
        document.documentElement.setAttribute("data-theme", getDataTheme(theme as string))
    }, [theme])

    const toggleTheme = () => {
        const newTheme = getToggledTheme(theme as string);
        setTheme(newTheme);
        localStorage.setItem("dataTheme", getDataTheme(newTheme))
    }
    return (
        <>
            <Button
                id="darkModeToggle"
                className="flex items-center gap-x-2 p-1 text-2xl cursor-pointer"
                aria-pressed="false"
                aria-label="Toggle dark mode"
                title="Toggle dark mode"
                onClick={toggleTheme}
            >
                {theme === "dark" ? (<PiMoonStars />) : (<PiSun />)}
                {theme === "dark" ? "Dark Mode Active" : "Light Mode Active"}
            </Button>
        </>
    )
}

export default DarkModeToggle;