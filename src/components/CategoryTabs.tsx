import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { Card } from "./Card";
import { CardList } from "../assets/CardList";
import useLocalStorage from "../hooks/useLocalStorage";
import { useTTS } from "../hooks/useTTS";

interface Emoji {
    name: string;
    unicode: string;
}

interface CardData {
    id: string;
    icon: Emoji | undefined;
    text: string;
}

interface Cards {
    general: CardData[];
    feelings: CardData[];
    custom: CardData[];
    favorites: CardData[];
}

function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`
    }
}


const CategoryTabs: React.FC = () => {
    const [ favCardIds, setFavCardIds ] = useLocalStorage<string[]>("favCardIds", []);
    const { speak, voices } = useTTS();
    
    const toggleFavorite = (id: string) => {
        setFavCardIds(prev =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };

    const cards = CardList();
    const tabKeys = Object.keys(cards) as (keyof Cards)[];
    const [selectedCatIndex, setselectedCatIndex] = useState(0);

    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setselectedCatIndex(newValue)
    }
    
    const selectedCards = cards[tabKeys[selectedCatIndex]];

    const pitch = parseFloat(localStorage.getItem("pitch")|| "1");
    const rate = parseFloat(localStorage.getItem("rate")|| "1");
    const volume = parseFloat(localStorage.getItem("volume")|| "1");
    const savedVoice = localStorage.getItem("voice") || "";

    const handleCardClick = (text:string) => {
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
        <Box>
            <Tabs value={selectedCatIndex} onChange={handleTabChange} sx={{ mt: 7, backgroundColor: 'background.default', mb: 2, p:1, borderRadius: 1}} variant="fullWidth">
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
        </Box>
    )
}

export default CategoryTabs;