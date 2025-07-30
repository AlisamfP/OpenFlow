import { useEffect, useState } from "react";
import {
    Alert,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Snackbar,
    Stack,
    Typography,
    type SelectChangeEvent,
} from "@mui/material";
import { PiX } from "react-icons/pi";

import { useTTS } from "../hooks/useTTS";
import useLocalStorage from '../hooks/useLocalStorage';

interface TTSVoiceSetting {
    title: string;
    min: number;
    max: number;
    value: number;
    setValue: (val: number) => void;
}


const Settings: React.FC = () => {
    const [categoryPref, setCategoryPref] = useLocalStorage<string>("categoryPref", "general");
    const [pitch, setPitch] = useLocalStorage<number>("pitch", 1);
    const [rate, setRate] = useLocalStorage<number>("rate", 1);
    const [volume, setVolume] = useLocalStorage<number>("volume", 1);
    const [storedVoice, setStoredVoice] = useLocalStorage<string>("voice", "");

    const [open, setOpen] = useState<boolean>(false);

    const showSaveNotification = () => {
        setOpen(true);
    }

    const hideSaveNotification = () => {
        setOpen(false);
    }


    const { voices } = useTTS();


    useEffect(() => {
        if (voices.length) {
            const voiceToUse = 
            voices.find((v) => v.voiceURI === storedVoice) ||
            voices.find((v) => v.default) || 
            voices[0];
            
            setStoredVoice(voiceToUse.voiceURI);
        }
    }, [setStoredVoice, storedVoice, voices]);

    const RANGE_SLIDER_OPTIONS: TTSVoiceSetting[] = [
        { title: "pitch", min: 0, max: 2, value: pitch, setValue: setPitch },
        { title: "rate", min: 0, max: 1.5, value: rate, setValue: setRate },
        { title: "volume", min: 0, max: 1, value: volume, setValue: setVolume },
    ];

    const saveCategoryPref = (e: SelectChangeEvent) => {
        setCategoryPref(e.target.value as string);
        showSaveNotification();
    };

    const saveVoice = (e: SelectChangeEvent) => {
        setStoredVoice(e.target.value)
        showSaveNotification();
    };

    return (
        <Container id="settings" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: 6 }}>
            <Typography variant="h3" color="primary">
                Settings
            </Typography>

            <FormControl fullWidth>
                <InputLabel id="categoryPref-label">
                    Change the default category for the home page
                </InputLabel>
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
                <InputLabel id="voice-label">
                    {voices.length === 0 ? "Loading Voices....." : "Change Spoken Voice"}
                </InputLabel>
                {voices.length === 0 ? (
                    <Select
                        labelId="voice-label"
                        id="voice-select"
                        label="Loading Voices....."
                        value=""
                        disabled
                    >
                        <MenuItem disabled value=""></MenuItem>
                    </Select>
                ) : (
                    <Select
                        label="Change Spoken Voice"
                        labelId="voice-label"
                        value={storedVoice}
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

            <FormControl
                component="fieldset"
                variant="standard"
                sx={{ border: "2px solid", borderColor: "primary.main", p: 4 }}
            >
                <FormLabel component="legend">Adjust Voice Characteristics</FormLabel>
                <FormGroup>
                    <Stack sx={{height: 250}} direction="row">
                    {RANGE_SLIDER_OPTIONS.map(
                        ({ title, min, max, value, setValue }) => (
                            <FormControlLabel
                                key={title}
                                label={title}
                                labelPlacement="bottom"
                                slotProps={{
                                    typography: {
                                        color: "text.primary",
                                    },
                                }}
                                control={
                                    <Slider
                                        orientation="vertical"
                                        aria-label={title}
                                        value={value}
                                        onChange={(_,val) => setValue(val as number)}
                                        onChangeCommitted={showSaveNotification}
                                        min={min}
                                        max={max}
                                        step={0.25}
                                        valueLabelDisplay="auto"
                                    />
                                }
                            />
                        )
                    )}
                    </Stack>
                </FormGroup>
            </FormControl>

            <Snackbar 
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                open={open}
                autoHideDuration={4000}
                onClose={hideSaveNotification}
            >
                <Alert
                    onClose={hideSaveNotification}
                    severity="success"
                    sx={{display: 'flex', alignItems: 'center'}}
                >
                    Settings saved!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Settings;
