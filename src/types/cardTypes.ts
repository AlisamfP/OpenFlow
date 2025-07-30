export interface Emoji {
    name: string;
    unicode: string;
}

export interface CardData {
    icon: Emoji | undefined;
    text: string;
    id: string;
}

export interface Cards {
    general: CardData[];
    feelings: CardData[];
    custom: CardData[];
    favorites: CardData[];
}


export type Category = "general" | "feelings" | "custom" | "favorites";