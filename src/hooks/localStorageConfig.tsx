import type { Category, CardData } from "../types/cardTypes";
import type { navOptions } from "../types/navTypes";

export const localStorageSchema = {
    currentPage: {
        type: "enum",
        values: ["cards", "custom", "settings", "about"] as const,
        fallback: "cards",
    } as const,
    audioEnabled: {
        type: "boolean",
        fallback: true as boolean,
    } as const,
    pitch: {
        type: "range",
        min: 0,
        max: 1.5,
        fallback: 1,
    } as const,
    rate: {
        type: "range",
        min: 0,
        max: 1.5,
        fallback: 1,
    } as const,
    volume: {
        type: "range",
        min: 0,
        max: 1,
        fallback: 1,
    } as const,
    categoryPref: {
        type: "enum",
        values: ["general", "feelings", "custom", "favorites"] as const,
        fallback: "general",
    } as const,
    voice: {
        type: "string",
        fallback: "",
    } as const,
    favCardIds: {
        type: "array",
        itemType: "string",
        fallback: [] as string[],
    } as const,
    customCards: {
        type: "array",
        itemType: "CardData",
        fallback: []
    } as const
} as const;

export type LocalStorageConfigMap = typeof localStorageSchema;
export type LocalStorageKey = keyof LocalStorageConfigMap;

export type LocalStorageMap = {
    currentPage: navOptions;
    audioEnabled: boolean;
    pitch: number;
    rate: number;
    volume: number;
    categoryPref: Category;
    voice: string;
    favCardIds: string[];
    customCards: CardData[];
};
