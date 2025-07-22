import { useState } from "react";
import { Tabs } from "@material-tailwind/react";
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

const CategoryTabs: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<keyof Cards>("general");


    const cards: Cards = CardList();
    const tabKeys = Object.keys(cards) as (keyof Cards)[];

    return (
        <Tabs defaultValue={selectedCategory} className="w-full flex flex-col">
            <Tabs.List className="bg-card-back w-full rounded-lg">
                {tabKeys.map((tab: keyof Cards, i:number) => (
                    <Tabs.Trigger
                    value={tab}
                    key={i}
                    className={`z-10 w-full p-4 rounded-lg text-2xl`}
                    onClick={() => setSelectedCategory(tab)}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Tabs.Trigger>
                ))}
                <Tabs.TriggerIndicator className="py-1 rounded-lg"/>
            </Tabs.List>
                {tabKeys.map((tab: keyof Cards) => (
                    <Tabs.Panel key={tab} value={tab} className="flex flex-wrap gap-4">
                        {cards[tab].map(({ text, icon, isFav }: CardData, i:number) => (
                            <Card key={i} text={text} icon={icon} isFav={isFav} />
                        ))}
                    </Tabs.Panel>
                )
                )}
        </Tabs>
    )
}

export default CategoryTabs;