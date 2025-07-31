import { useEffect, useState } from "react";
import { Box, Tabs, Tab, Backdrop } from "@mui/material";
import { Card } from "./Card";
import { CardList } from "../assets/CardList";
import useLocalStorage from "../hooks/useLocalStorage";
import { useTTS } from "../hooks/useTTS";

import type { CardData, Cards } from "../types/cardTypes";

function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        "aria-controls": `tabpanel-${index}`,
    };
}

const CategoryTabs: React.FC = () => {
    const [favCardIds, setFavCardIds] = useLocalStorage("favCardIds");
    const [categoryPref] = useLocalStorage("categoryPref");
    const [pitch] = useLocalStorage("pitch");
    const [rate] = useLocalStorage("rate");
    const [volume] = useLocalStorage("volume");
    const [savedVoice] = useLocalStorage("voice");
    const [audioEnabledStored] = useLocalStorage("audioEnabled");

    const [audioEnabled, setAudioEnabled] = useState<boolean>(audioEnabledStored);
    const [fullscreenCard, setFullscreenCard] = useState<CardData | null>(null);
    const { speak, voices } = useTTS();

    const cards = CardList(favCardIds);
    const tabKeys = Object.keys(cards) as (keyof Cards)[];
    const [selectedCatIndex, setselectedCatIndex] = useState(
        categoryPref ? tabKeys.indexOf(categoryPref) : 0
    );
    const selectedCards = cards[tabKeys[selectedCatIndex]];

    useEffect(() => {
        const handleAudioChange = (e: Event) => {
            const custom = e as CustomEvent<boolean>;
            setAudioEnabled(custom.detail);
        };

        window.addEventListener("audioChanged", handleAudioChange);

        return () => window.removeEventListener("audioChanged", handleAudioChange);
    }, []);

    const toggleFavorite = (id: string) => {
        setFavCardIds((prev) =>
            prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
        );
    };

    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        e.preventDefault();
        setselectedCatIndex(newValue);
    };

    const handleCardClick = (text: string, card: CardData) => {
        console.log("IN CARD CLICK.....audioenabled is ", audioEnabled);
        if (!audioEnabled) {
            console.log("AUDIO OFF");
            setFullscreenCard(card);
            return;
        }
        const voice = voices.find((v) => v.voiceURI === savedVoice) || null;
        speak({
            text,
            pitch,
            rate,
            volume,
            voice,
        });
    };

    return (
        <Box component="section">
            <Tabs
                value={selectedCatIndex}
                onChange={handleTabChange}
                sx={{
                    backgroundColor: "background.default",
                    mb: 2,
                    p: 1,
                    borderRadius: 1,
                }}
                variant="fullWidth"
            >
                {tabKeys.map((tab, i) => (
                    <Tab key={tab} label={tab} {...a11yProps(i)}></Tab>
                ))}
            </Tabs>
            <Box
                role="tabpanel"
                id={`tabpanel-${selectedCatIndex}`}
                aria-labelledby={`tab-${selectedCatIndex}`}
                sx={{ display: "flex", flexDirection: "column", gap: "1em" }}
            >
                {selectedCards.map(({ text, icon, id }: CardData) => (
                    <Card
                        key={id}
                        text={text}
                        icon={icon}
                        isFav={favCardIds.includes(id)}
                        onClick={() => handleCardClick(text, { text, icon, id })}
                        onToggleFavorite={() => toggleFavorite(id)}
                    />
                ))}
            </Box>
            {fullscreenCard && (
                <Backdrop
                    open={!!fullscreenCard}
                    onClick={() => setFullscreenCard(null)}
                    sx={{ zIndex: 2 }}
                >

                    <Card
                        fullscreen={true}
                        text={fullscreenCard.text}
                        icon={fullscreenCard.icon}
                        onClick={() => setFullscreenCard(null)}
                    />

                </Backdrop>
            )}
        </Box>
    );
};

export default CategoryTabs;
