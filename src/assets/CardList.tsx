import { EmojiList } from "./EmojiList";

interface Emoji {
    name: string;
    unicode: string;
}

interface CardData {
    icon: Emoji | undefined;
    text: string;
    id: string;
}

interface Cards {
    general: CardData[];
    feelings: CardData[];
    custom: CardData[];
    favorites: CardData[];
}

const getCustomCards = (): CardData[] => {
    const customCards = localStorage.getItem("customCards");
    if(typeof customCards === 'string' && customCards.trim() != "") {
        return JSON.parse(customCards);
    }
    return [];
}

const getFavCardIds = (): string[] => {
    const favCards = localStorage.getItem("favCardIds")
    return favCards ? JSON.parse(favCards) : [];
}



export const CardList = (): Cards => {
    const favoriteIds = getFavCardIds()
    const customCards = getCustomCards()

    const general = [
            {icon: EmojiList.find((emoji) => emoji.name === "head-shaking-vertically"), text: "Yes" },
            { icon: EmojiList.find((emoji) => emoji.name === "head-shaking-horizontally"), text: "No" },
            { icon: EmojiList.find((emoji) => emoji.name === "zipper-mouth-face"), text: "I'm nonverbal or struggling to speak right now" },
            { icon: EmojiList.find((emoji) => emoji.name === "mantlepiece-clock"), text: "Please be patient with me" },
            { icon: EmojiList.find((emoji) => emoji.name === "rocket"), text: "I need some space" },
            { icon: EmojiList.find((emoji) => emoji.name === "face-in-clouds"), text: "I feel dissociated" },
            { icon: EmojiList.find((emoji) => emoji.name === "stop-sign"), text: "Please stop" },
            { icon: EmojiList.find((emoji) => emoji.name === "shushing-face"), text: "Can you please be quieter?" },
            { icon: EmojiList.find((emoji) => emoji.name === "shaking-face"), text: "I'm feeling overstimulated right now"  }
        ].map((card, i) => ({
            ...card,
            id: `general-${i}`
        }));
        const feelings = [
            { icon: EmojiList.find((emoji) => emoji.name === "grinning-face"), text: "I'm happy and content" },
            { icon: EmojiList.find((emoji) => emoji.name === "enraged-face"), text: "I'm angry right now" },
            { icon: EmojiList.find((emoji) => emoji.name === "loudly-crying-face"), text: "I'm sad" },
            { icon: EmojiList.find((emoji) => emoji.name === "sleeping-face"), text: "I'm so tired"  }
        ].map((card, i) => ({
            ...card,
            id: `feelings-${i}`
        }))

        const custom = customCards.map((card, i) => ({
            ...card,
            id: `custom-${i}`
        }))

        const allCards = [...general, ...feelings, ...custom]
        const favorites = allCards.filter(card => favoriteIds.includes(card.id))
        
    return {
        general, feelings, custom, favorites
    };
}