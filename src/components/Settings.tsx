import { Select, Typography, Slider } from "@material-tailwind/react";
import { useState } from "react";


const Settings: React.FC = () => {
    const savedCategoryPref = localStorage.getItem("categoryPref");
    const [categoryPref, setCategoryPref] = useState<string>(savedCategoryPref || "general");

    const savedPitch = localStorage.getItem("pitch");
    const [ pitch, setPitch ] = useState<number[]>([savedPitch ? parseFloat(savedPitch) : 1])

    const saveCategoryPref = (val: string) => {
        console.log(val)
        setCategoryPref(val);
        localStorage.setItem("categoryPref", val);
    }

    const savePitch = (e:React.FormEvent<HTMLDivElement>) => {
        const val = parseFloat((e.target as HTMLInputElement).value);
        setPitch([val]);
        localStorage.setItem("pitch", String(val));
    }

    return (
        <>
            <section id="settings">
            <Typography type="h2">Settings</Typography>
            
            <form aria-label="settings form">

                <fieldset className="generalSettings">
                    <legend>General Settings</legend>
                    <label htmlFor="categoryPref">Change the default category for the home page</label>
                    <Select 
                        value={categoryPref} 
                        onChange={(val:string) => saveCategoryPref(val)} 
                        size="lg" 
                        className="w-full"
                    >
                        <Select.Trigger className="w-72 text-2xl" placeholder="Default Category"/>
                        <Select.List>
                            <Select.Option key={0} value="general">General</Select.Option>
                            <Select.Option key={1} value="feelings">Feelings</Select.Option>
                            <Select.Option key={2} value="custom">Custom</Select.Option>
                            <Select.Option key={3} value="favorites">Favorites</Select.Option>
                        </Select.List>
                    </Select>
                </fieldset>
                <fieldset className="voiceSettings">
                    <legend>Voice Settings</legend>
                    {/* <div className="voiceSelect">
                        <label htmlFor="voice">Choose a Voice Type: </label>
                        <div className="select-wrapper">
                            <select name="voice" id="voice">
                                <option value="" disabled selected>Voices are loading...</option>
                            </select>
                        </div>
                    </div> */}
                    <fieldset className="rangeGroup" aria-labelledby="RangeGroupLabel">
                        <legend id="RangeGroupLabel">Adjust Voice Characteristics</legend>

                        <div className="settingSection">
                            <label htmlFor="pitch">Pitch: </label>
                            <Slider size="lg" value={pitch} onChange={savePitch} min={0} max={2}>
                                <Slider.Range></Slider.Range>
                                <Slider.Thumb></Slider.Thumb>
                            </Slider>
                            {/* <input type="range" name="pitch" id="pitch" min="0" max="2" value="1" step="0.25"
                                list="pitchValues">
                            <datalist id="pitchValues">
                                <option value="2" label="2"></option>
                                <option value="1" label="1"></option>
                                <option value="0" label="0"></option>
                            </datalist> */}
                        </div>

                        {/* <div className="settingSection">
                            <label htmlFor="rate">Rate: </label>
                            <input type="range" name="rate" id="rate" min="0" max="1.5" value="1" step="0.25"
                                list="rateValues" />
                            <datalist id="rateValues">
                                <option value="1.5" label="1.5"></option>
                                <option value="1" label="1"></option>
                                <option value="0.5" label="0.5"></option>
                                <option value="0" label="0"></option>
                            </datalist>
                        </div>

                        <div className="settingSection">
                            <label htmlFor="volume">Volume: </label>
                            <input type="range" name="volume" id="volume" min="0" max="1" value="0.5" step="0.25"
                                list="volumeValues" />
                            <datalist id="volumeValues">
                                <option value="1" label="1"></option>
                                <option value="0.5" label="0.5"></option>
                                <option value="0" label="0"></option>
                            </datalist>
                        </div> */}
                    </fieldset>
                </fieldset>

                <button id="saveSettings" type="submit" className="button-primary">Save Settings</button>
            </form>
        </section>
        </>
    )
}

export default Settings;