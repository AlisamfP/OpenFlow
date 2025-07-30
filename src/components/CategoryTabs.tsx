import { useState } from "react";
import { Box, Tabs, Tab, Container } from "@mui/material";
import { Card } from "./Card";
import { CardList } from "../assets/CardList";
import useLocalStorage from "../hooks/useLocalStorage";
import { useTTS } from "../hooks/useTTS";

import type { CardData, Cards } from "../types/cardTypes";


function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`
    }
}


const CategoryTabs: React.FC = () => {
    const [ favCardIds, setFavCardIds ] = useLocalStorage("favCardIds");
    const { speak, voices } = useTTS();

    
    const toggleFavorite = (id: string) => {
        setFavCardIds(prev =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };

    const cards = CardList(favCardIds);
    const [categoryPref] = useLocalStorage("categoryPref")
    const tabKeys = Object.keys(cards) as (keyof Cards)[];
    const [selectedCatIndex, setselectedCatIndex] = useState(categoryPref ? tabKeys.indexOf(categoryPref) : 0);

    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        e.preventDefault();
        setselectedCatIndex(newValue)
    }
    
    const selectedCards = cards[tabKeys[selectedCatIndex]];

    const [pitch] = useLocalStorage("pitch");
    const [rate] = useLocalStorage("rate");
    const [volume] = useLocalStorage("volume");
    const [savedVoice] = useLocalStorage("voice");
    const [audioEnabled] = useLocalStorage("audioEnabled")

    const handleCardClick = (text:string) => {
        if(!audioEnabled){
            console.log("AUDIO OFF")
            return;
        }
        const voice = voices.find(v => v.voiceURI === savedVoice) || null;
        speak({
            text, 
            pitch, 
            rate, 
            volume, 
            voice
        })
    }
    
    return (
        <Container>
            <Tabs value={selectedCatIndex} onChange={handleTabChange} sx={{  backgroundColor: 'background.default', mb: 2, p:1, borderRadius: 1}} variant="fullWidth">
                {tabKeys.map((tab, i) => (
                    <Tab
                        key={tab}
                        label={tab}
                        {...a11yProps(i)}>
                    </Tab>
                ))}
            </Tabs>
            <Box role="tabpanel" id={`tabpanel-${selectedCatIndex}`} aria-labelledby={`tab-${selectedCatIndex}`} sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                {selectedCards.map(({ text, icon, id }: CardData) => (
                    <Card 
                        key={id} 
                        text={text} 
                        icon={icon} 
                        isFav={favCardIds.includes(id)}
                        onClick={() => handleCardClick(text)}
                        onToggleFavorite={()=> toggleFavorite(id)} 
                    />
                ))}
            </Box>
        </Container>
    )
}

export default CategoryTabs;