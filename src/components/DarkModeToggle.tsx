import {
    ListItemIcon,
    ListItemText,
    Switch,
    useColorScheme
} from "@mui/material";
import {
    PiMoonStars,
    PiSun
} from "react-icons/pi";


export default function DarkModeToggle() {
    const { mode, setMode } = useColorScheme();
    const lightMode = 'light';
    const darkMode = 'dark';

    const toggleTheme = () => {
        if (!mode) {
            console.log("NO MODE")
            setMode(lightMode);
        }
        const newTheme = mode === darkMode ? lightMode : darkMode
        setMode(newTheme);
    }

    return (
        <>
            <ListItemIcon>
                {mode === darkMode ? (<PiMoonStars />) : (<PiSun />)}

            </ListItemIcon>
            <ListItemText>
                {mode === darkMode ? "Dark Mode Active" : "Light Mode Active"}

            </ListItemText>
            <Switch
                slotProps={{
                    input: {
                        'aria-label': 'Dark Mode Switch'
                    }
                }}
                edge="end"
                checked={mode === darkMode}
                onChange={toggleTheme}
                color="secondary"
            />
        </>
    )
}