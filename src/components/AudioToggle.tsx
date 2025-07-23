import { ListItemIcon, ListItemText, Switch } from "@mui/material";
import { useState, useEffect } from "react";
import { PiSpeakerHigh, PiSpeakerX } from "react-icons/pi";

function AudioToggle() {

    const [TTSOn, setTTSOn] = useState<boolean>(() => {
        const savedState = localStorage.getItem("AudioOn")
        return !savedState ? true : JSON.parse(savedState);
    })

    useEffect(() => {
        localStorage.setItem("TTSOn", String(TTSOn))
    }, [TTSOn]);

    const handleToggle = () => {
        setTTSOn(prevAudioOn => !prevAudioOn);
    }


    return (
        <>
            <ListItemIcon>
                {TTSOn ? (<PiSpeakerHigh />) : (<PiSpeakerX />)}

            </ListItemIcon>
            <ListItemText>
                {TTSOn ? "Audio On" : "Audio Off"}

            </ListItemText>
            <Switch
                slotProps={{
                    input: {
                        'aria-label': 'Toggle Audio'
                    }
                }}
                edge="end"
                checked={TTSOn}
                onChange={handleToggle}
                color="secondary"
            />
        </>

    )
}

export default AudioToggle;