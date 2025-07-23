import { IconButton, useColorScheme } from "@mui/material";
import { PiMoonStars, PiSun } from "react-icons/pi";




function Test() {
    const { mode, setMode } = useColorScheme();
    const lightMode = 'light';
    const darkMode = 'dark';

    
    
    const toggleTheme = () => {
        if(!mode){
            console.log("NO MODE")
            setMode(lightMode);
        }
        const newTheme = mode === darkMode ? lightMode : darkMode
        console.log("TOGGLE....", mode)
        setMode(newTheme);
    }

    return (
        <>
            <IconButton
                id="darkModeToggle"
                className="flex items-center gap-x-2 p-1 text-2xl cursor-pointer"
                aria-label="Toggle dark mode"
                title="Toggle dark mode"
                onClick={()=> toggleTheme()}
            >
                {mode === "dark" ? (<PiMoonStars />) : (<PiSun />)}
                {mode === "dark" ? "Dark Mode Active" : "Light Mode Active"}
            </IconButton>
        </>
    )
}

export default function DarkModeToggle() {
    return (
        <Test />
    )
}