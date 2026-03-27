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
    general: CardData[];
    feelings: CardData[];
}

export type Category = "general" | "feelings";