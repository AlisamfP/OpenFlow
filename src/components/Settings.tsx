"use client";

import { useEffect, useState } from "react";
import { Alert, Box, Container, FormControl, FormGroup, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Snackbar, Stack, Typography } from "@mui/material";
import { type TTSVoiceSetting, useTTS } from "@/hooks/useTTS";
import { Category } from "@/types/cardTypes";


export default function SettingsPanel() {
    const { voices } = useTTS();

    const [categoryPref, setCategoryPref] = useState<Category>("general")
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const [volume, setVolume] = useState(1);
    const [selectedVoice, setSelectedVoice] = useState("");
    const [open, setOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            const res = await fetch("/api/user/settings");
            if(res.ok){
                const data = await res.json();
                setCategoryPref(data.categoryPref || "general")
                setPitch(data.audio?.pitch ?? 1)
                setRate(data.audio?.rate ?? 1);
                setVolume(data.audio?.volume ?? 1);
                setSelectedVoice(data.audio?.selectedVoice || 1);
                setLoaded(true);
            }
        }
        fetchSettings();
    },[])

    const saveSettings = async (updates: {
        categoryPref?: Category;
        audio?: {
            pitch: number;
            rate: number;
            volume: number;
            selectedVoice: string;
        };
    }) => {
        await fetch("/api/user/settings", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updates)
        });
        setOpen(true)
    }

    const RANGE_SLIDER_OPTIONS: TTSVoiceSetting[] = [
        { title: "pitch", min: 0, max: 2, value: pitch, setValue: setPitch },
        { title: "rate", min: 0, max: 1.5, value: rate, setValue: setRate },
        { title: "volume", min: 0, max: 1, value: volume, setValue: setVolume }
    ];

    if(!loaded){
        return(
            <Container sx={{ mt: 8 }}>
                <Typography>Loading...</Typography>
            </Container>
        )
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "75%" }}>
            <Typography variant="h4" color="textSecondary">Settings</Typography>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                flexDirection: { xs: "column", md: "row" }
            }}>
                <Box sx={{ display: "flex", flexDirection: "column", pt: 2, gap: 4, minWidth: 0, flex: 1 }}>
                    <FormControl>
                        <InputLabel id="categoryPref-label">
                            Change the default category for the home page
                        </InputLabel>
                        <Select
                            labelId="categoryPref-label"
                            id="categoryPref"
                            value={categoryPref}
                            label="Change the default category for the home page"
                            onChange={(e: SelectChangeEvent) => {
                                const val = e.target.value as Category;
                                setCategoryPref(val);
                                saveSettings({categoryPref: val});
                            }}
                            onClose={() => {
                                setTimeout(() => {
                                    (document.activeElement as HTMLElement)?.blur();
                                }, 0)
                            }}
                        >
                            <MenuItem value="general">General</MenuItem>
                            <MenuItem value="feelings">Feelings</MenuItem>
                            <MenuItem value="custom">Custom</MenuItem>
                            <MenuItem value="favorites">Favorites</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="voice-label">
                            {voices.length === 0 ? "Loading Voices..." : "Change Spoken Voice"}
                        </InputLabel>
                        {voices.length === 0 ? (
                            <Select labelId="voices-label" label="Loading Voices..." value="" disabled>
                                <MenuItem disabled value="" />
                            </Select>
                        ) : (
                            <Select
                                label="Change Spoken Voice"
                                labelId="voices-label"
                                value={selectedVoice}
                                onChange={(e: SelectChangeEvent) => {
                                    const val = e.target.value;
                                    setSelectedVoice(val);
                                    saveSettings({ audio: { pitch, rate, volume, selectedVoice: val } });
                                }}
                                onClose={() => {
                                    setTimeout(() => {
                                        (document.activeElement as HTMLElement)?.blur();
                                    }, 0)
                                }}
                            >
                                {voices.map((voice) => (
                                    <MenuItem key={voice.voiceURI} value={voice.voiceURI}>
                                        {voice.name} ({voice.lang})
                                    </MenuItem>
                                ))}

                            </Select>
                        )}
                    </FormControl>
                </Box>

                <FormControl
                    component="fieldset"
                    variant="standard"
                    sx={{
                        border: "2px solid",
                        borderColor: "primary.main",
                        p: 4,
                        pt: 5,
                        alignItems: "center",
                        backgroundColor: "background.paper",
                        borderRadius: 4,
                        width: "fit-content",
                        minWidth: "fit-content",
                        mb: 12,
                        flexShrink: 0
                    }}
                >
                    <FormLabel component="legend" id="voice-settings-label">
                        Adjust Voice Characteristics
                    </FormLabel>
                    <FormGroup aria-labelledby="voice-settings-label">
                        <Stack sx={{ height: 250 }} direction="row" spacing={{ xs: 4, sm: 8, lg: 10 }}>
                            {RANGE_SLIDER_OPTIONS.map(({title, min, max, value, setValue}) => (
                                <Box key={title} textAlign="center" display="flex" flexDirection="column-reverse" alignItems="center">
                                    <Typography
                                        id={`slider-${title}-label`}
                                        component="label"
                                        htmlFor={`slider-${title}`}
                                        variant="body2"
                                    >
                                        {title.charAt(0).toUpperCase() + title.slice(1)}
                                    </Typography>
                                    <Slider
                                        id={`slider-${title}`}
                                        aria-labelledby={`slider${title}-label`}
                                        getAriaValueText={(val) => `${val} ${title}`}
                                        orientation="vertical"
                                        value={value}
                                        onChange={(_,val) => setValue(val as number)}
                                        onChangeCommitted={() => {
                                            saveSettings({ audio: { pitch, rate, volume, selectedVoice } })
                                        }}
                                        min={min}
                                        max={max}
                                        step={0.25}
                                        valueLabelDisplay="auto"
                                        sx={{ color: "text.secondary" }}
                                    />
                                </Box>
                            ))}
                        </Stack>
                    </FormGroup>
                </FormControl>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity="success"
                    role="status"
                    aria-live="polite"
                    sx={{ display: "flex", alignItems: "center", mt: 10 }}
                >
                    Settings saved!
                </Alert>
            </Snackbar>
        </Box>
    )
}