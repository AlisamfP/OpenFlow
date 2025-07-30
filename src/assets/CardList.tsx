import { EmojiList } from "./EmojiList";
import type { Cards } from "../types/cardTypes";
import useLocalStorage from "../hooks/useLocalStorage";
import { useMemo } from "react";

const isValidEmoji = (unicode: string): boolean => {
    return EmojiList.some(e => e.unicode === unicode)
}

export const CardList = (favCardIds: string[]): Cards => {
    const [customCards] = useLocalStorage("customCards")

    const general = useMemo(() => [
        { icon: EmojiList.find((emoji) => emoji.name === "head-shaking-vertically"), text: "Yes" },
        { icon: EmojiList.find((emoji) => emoji.name === "head-shaking-horizontally"), text: "No" },
        { icon: EmojiList.find((emoji) => emoji.name === "zipper-mouth-face"), text: "I'm nonverbal or struggling to speak right now" },
        { icon: EmojiList.find((emoji) => emoji.name === "mantlepiece-clock"), text: "Please be patient with me" },
        { icon: EmojiList.find((emoji) => emoji.name === "rocket"), text: "I need some space" },
        { icon: EmojiList.find((emoji) => emoji.name === "face-in-clouds"), text: "I feel dissociated" },
        { icon: EmojiList.find((emoji) => emoji.name === "stop-sign"), text: "Please stop" },
        { icon: EmojiList.find((emoji) => emoji.name === "shushing-face"), text: "Can you please be quieter?" },
        { icon: EmojiList.find((emoji) => emoji.name === "shaking-face"), text: "I'm feeling overstimulated right now" }
    ].map((card, i) => ({
        ...card,
        id: `general-${i}`
    })), []);
    const feelings = useMemo(() => [
        { icon: EmojiList.find((emoji) => emoji.name === "grinning-face"), text: "I'm happy and content" },
        { icon: EmojiList.find((emoji) => emoji.name === "enraged-face"), text: "I'm angry right now" },
        { icon: EmojiList.find((emoji) => emoji.name === "loudly-crying-face"), text: "I'm sad" },
        { icon: EmojiList.find((emoji) => emoji.name === "sleeping-face"), text: "I'm so tired" }
    ].map((card, i) => ({
        ...card,
        id: `feelings-${i}`
    })), []);

    const custom = customCards
        .filter(card => card.icon && isValidEmoji(card.icon.unicode))
        .map((card, i) => ({
            ...card,
            id: `custom-${i}`
        }))

    const allCards = [...general, ...feelings, ...custom]
    const favorites = allCards.filter(card => favCardIds.includes(card.id))

    return {
        general, feelings, custom, favorites
    };
}