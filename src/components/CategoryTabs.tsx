import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { Card } from "./Card";
import { CardList } from "../assets/CardList";

interface Emoji {
    name: string;
    unicode: string;
}

interface CardData {
    icon: Emoji | undefined;
    text: string;
    isFav: boolean;
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
    const cards: Cards = CardList();
    const tabKeys = Object.keys(cards) as (keyof Cards)[];
    const [selectedCatIndex, setselectedCatIndex] = useState(0);
    
    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setselectedCatIndex(newValue)
    }

    return (
        <Box className="bg-background mt-5">

            <Tabs value={selectedCatIndex} onChange={handleTabChange} sx={{marginTop: '5em'}} variant="fullWidth">
                {tabKeys.map((tab, i) => (
                    <Tab
                        key={tab}
                        label={tab}
                        {...a11yProps(i)}>
                    </Tab>
                ))}
            </Tabs>
            <Box role="tabpanel" id={`tabpanel-${selectedCatIndex}`} aria-labelledby={`tab-${selectedCatIndex}`} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: '1em' }}>
                {cards[tabKeys[selectedCatIndex]].map(({ text, icon, isFav }: CardData, i: number) => (
                    <Card key={text + i} text={text} icon={icon} isFav={isFav} />
                ))}
            </Box>
        </Box>
    )
}

export default CategoryTabs;