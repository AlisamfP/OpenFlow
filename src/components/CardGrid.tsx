"use client";
import { Card } from "@/components/Card";
import type { BaseCardData } from "@/types/cardTypes";

interface CardGridProps {
    cards: BaseCardData[];
}

export default function CardGrid({ cards }: CardGridProps) {
    const handleCardClick = (card: BaseCardData) => {
        console.log("clicked", card.text);
    };

    return (
        <div>
            {cards.map((card) => (
                <Card
                    key={card._id}
                    card={{ id: card._id, emojiUnicode: card.emojiUnicode, emojiName: card.emojiName, text: card.text }}
                    onClick={() => handleCardClick(card)}
                />
            ))}
        </div>
    );
}