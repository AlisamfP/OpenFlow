import { EmojiList } from "./EmojiList";

interface Emoji {
    name: string;
    unicode: string;
}

interface Card {
    icon: Emoji | undefined;
    text: string;
    isFav: boolean;
}

interface Cards {
    general: Card[];
    feelings: Card[];
    custom: Card[];
    favorites: Card[];
}

const getCustomCards = (): Card[] => {
    const customCards = localStorage.getItem("customCards");
    if(typeof customCards === 'string' && customCards.trim() != "") {
        console.log("There are custom cards in local storage...")
        console.log(JSON.parse(customCards))
        return JSON.parse(customCards);
    }
    return [];
}

const getFavCards = (): Card[] => {
    const favCards = localStorage.getItem("favCards")
    if(typeof favCards === 'string' && favCards.trim() != "") {
        return JSON.parse(favCards);
    }
    return [];
}

const checkFav = (text:string, icon:Emoji | undefined, favorites: Card[]): boolean => {
    if(!icon) return false;
    return favorites.some(fav => fav.text === text && fav.icon?.unicode === icon.unicode);
}

export const CardList = (): Cards => {
    const favorites = getFavCards()
    const customCards = getCustomCards()

    const cards: Cards = {
        general: [
            {
                icon: EmojiList.find((emoji) => emoji.name === "head-shaking-vertically"),
                text: "Yes"
            },
            {
                icon: EmojiList.find((emoji) => emoji.name === "head-shaking-horizontally"),
                text: "No"
            },
            {
                icon: EmojiList.find((emoji) => emoji.name === "zipper-mouth-face"),
                text: "I'm nonverbal or struggling to speak right now"
            },
            {
                icon: EmojiList.find((emoji) => emoji.name === "mantlepiece-clock"),
                text: "Please be patient with me"
            },
            {
                icon: EmojiList.find((emoji) => emoji.name === "rocket"),
                text: "I need some space"
            },
            {
                icon: EmojiList.find((emoji) => emoji.name === "face-in-clouds"),
                text: "I feel dissociated"
            },
            {
                icon: EmojiList.find((emoji) => emoji.name === "stop-sign"),
                text: "Please stop"
            },
            {
                icon: EmojiList.find((emoji) => emoji.name === "shushing-face"),
                text: "Can you please be quieter?"
            },
            {
                icon: EmojiList.find((emoji) => emoji.name === "shaking-face"),
                text: "I'm feeling overstimulated right now"
            }
        ].map(card => ({
            ...card,
            isFav: checkFav(card.text, card.icon, favorites)
        })),
        feelings: [
            {
                icon: EmojiList.find((emoji) => emoji.name === "grinning-face"),
                text: "I'm happy and content"
            },
            {
                icon: EmojiList.find((emoji) => emoji.name === "enraged-face"),
                text: "I'm angry right now"
            },
            {
                icon: EmojiList.find((emoji) => emoji.name === "loudly-crying-face"),
                text: "I'm sad"
            },
            {
                icon: EmojiList.find((emoji) => emoji.name === "sleeping-face"),
                text: "I'm so tired"
            }
        ].map(card => ({
            ...card,
            isFav: checkFav(card.text, card.icon, favorites)
        })),
        custom: customCards.map(card => ({
            ...card,
            isFav: checkFav(card.text, card.icon, favorites)
        })),
        favorites: favorites
    }
    return cards;
}