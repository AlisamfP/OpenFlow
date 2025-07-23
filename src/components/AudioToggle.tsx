import { IconButton } from "@mui/material";
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
            <IconButton
                id="audioToggle"
                aria-pressed="false"
                aria-label="Toggle sound"
                className="flex items-center gap-x-2 p-1 text-2xl cursor-pointer"
                title="Turn sound off"
                onClick={handleToggle}
            >
                {TTSOn ? (<PiSpeakerHigh />) : (<PiSpeakerX />)}
                {TTSOn ? "Audio On" : "Audio Off"}
            </IconButton>
        </>
    )
}

export default AudioToggle;