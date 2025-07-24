import { useEffect, useState } from "react";
import {
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Typography,
    type SelectChangeEvent
} from '@mui/material'

import { useTTS } from "../hooks/useTTS";

interface TTSVoiceSetting {
    title: string;
    min: number;
    max: number;
    value: number;
    setValue: (val: number) => void;
}



const Settings: React.FC = () => {
    const savedCategoryPref = localStorage.getItem("categoryPref");
    const [categoryPref, setCategoryPref] = useState<string>(savedCategoryPref || "general");

    const savedPitch = localStorage.getItem("pitch");
    const [pitch, setPitch] = useState<number>(savedPitch ? parseFloat(savedPitch) : 1)

    const savedRate = localStorage.getItem("rate");
    const [rate, setRate] = useState<number>(savedRate ? parseFloat(savedRate) : 1)

    const savedVolume = localStorage.getItem("volume");
    const [volume, setVolume] = useState<number>(savedVolume ? parseFloat(savedVolume) : 1)

    const { voices } = useTTS();
    const [selectedVoice, setSelectedVoice] = useState<string>("")

    useEffect(() => {
        if (voices.length) {
            const stored = localStorage.getItem("voice");
            const storedVoice = voices.find(v => v.voiceURI === stored);
            const defaultVoice = voices.find(v => v.default) || voices[0];

            setSelectedVoice((storedVoice || defaultVoice).voiceURI);
            localStorage.setItem("voice", (storedVoice || defaultVoice).voiceURI);
        }
    }, [voices]);

    const ALL_TTS_VOICE_SETTINGS: TTSVoiceSetting[] = [
        { title: 'pitch', min: 0, max: 2, value: pitch, setValue: setPitch },
        { title: 'rate', min: 0, max: 1.5, value: rate, setValue: setRate },
        { title: 'volume', min: 0, max: 1, value: volume, setValue: setVolume }
    ]
    const saveCategoryPref = (e: SelectChangeEvent) => {
        setCategoryPref(e.target.value as string);
        localStorage.setItem("categoryPref", e.target.value as string);
    }

    const handleSliderChange = (title: string, setValue: (val: number) => void) => (_: Event, newVal: number, __: number) => {
        setValue(newVal);
        localStorage.setItem(title, String(newVal));
    }

    const saveVoice = (e: SelectChangeEvent) => {
        setSelectedVoice(e.target.value)
        localStorage.setItem("voice", e.target.value)
    }

    return (
        <Container id="settings" sx={{ p: 2 }}>
            <Typography variant="h3" color="primary" sx={{ py: 2 }}>Settings</Typography>

            <form aria-label="settings form">
                <FormControl fullWidth>
                    <InputLabel id="categoryPref-label">Change the default category for the home page</InputLabel>
                    <Select
                        labelId="categoryPref-label"
                        id="categoryPref"
                        value={categoryPref}
                        label="Change the default category for the home page"
                        onChange={saveCategoryPref}
                    >
                        <MenuItem value={"general"}>General</MenuItem>
                        <MenuItem value={"feelings"}>Feelings</MenuItem>
                        <MenuItem value={"custom"}>Custom</MenuItem>
                        <MenuItem value={"favorites"}>Favorites</MenuItem>
                    </Select>
                </FormControl>



                <FormControl fullWidth margin="normal" disabled={voices.length === 0}>
                    <InputLabel id="voice-label">{voices.length === 0 ? "Loading Voices....." : "Change Spoken Voice"}</InputLabel>
                    {voices.length === 0 ? (
                        <Select labelId="voice-label" id='voice-select' label="Loading Voices....." value="" disabled>
                            <MenuItem disabled value=""></MenuItem>
                        </Select>
                    ) : (
                        <Select
                            label="Change Spoken Voice"
                            labelId="voice-label"
                            value={selectedVoice}
                            onChange={saveVoice}
                        >
                            {voices.map((voice) => (
                                <MenuItem key={voice.voiceURI} value={voice.voiceURI}>
                                    {voice.name} ({voice.lang})
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </FormControl>

                <FormControl component="fieldset" variant="standard" sx={{ border: '2px solid', borderColor: 'primary.main', p: 4 }}>
                    <FormLabel component="legend">Adjust Voice Characteristics</FormLabel>
                    <FormGroup sx={{ minHeight: '250px', gap: 4 }} row>
                        {ALL_TTS_VOICE_SETTINGS.map(({ title, min, max, value, setValue }) => (
                            <FormControlLabel
                                key={title}
                                label={title}
                                labelPlacement="bottom"
                                slotProps={{
                                    typography: {
                                        'color': 'text.primary'
                                    }
                                }
                                }
                                control={
                                    <Slider
                                        orientation="vertical"
                                        aria-label={title}
                                        value={value}
                                        onChange={handleSliderChange(title, setValue)}
                                        min={min}
                                        max={max}
                                        step={0.25}
                                        valueLabelDisplay="auto"
                                    />

                                }
                            />
                        ))}

                    </FormGroup>
                </FormControl>
            </form>
        </Container>
    )
}

export default Settings;