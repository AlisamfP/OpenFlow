export interface Emoji {
    name: string;
    unicode: string;
}

export interface BaseCardData {
    _id: string;
    emojiUnicode: string;
    emojiName: string;
    text: string;
    category: "general" | "feelings";
}

export interface CardData {
    id: string;
    emojiUnicode: string;
    emojiName: string;
    text: string;
}

export interface Cards {
    general: BaseCardData[];
    feelings: BaseCardData[];
    favorites: BaseCardData[];
    customCards: BaseCardData[];
}

export type Category = "general" | "feelings" | "favorites" | "custom";