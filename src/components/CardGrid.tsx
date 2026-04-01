"use client";
import { Card } from "@/components/Card";
import { useTTS } from "@/hooks/useTTS";
import type { BaseCardData } from "@/types/cardTypes";
import { Box } from "@mui/material";

interface CardGridProps {
    cards: BaseCardData[];
}

export default function CardGrid({ cards }: CardGridProps) {
    const { speak } = useTTS();
    const handleCardClick = (card: BaseCardData) => {
        speak({ text: card.text })
    };

    return (
        <Box
            role="tabpanel"
            sx={{
                display: "flex",
                flexDirection: {xs: "column", md: "row"},
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                gap: "1em",
                pb: 6,
                pt: 2
            }}
        >
            {cards.map((card) => (
                <Card
                    key={card._id}
                    card={{ id: card._id, emojiUnicode: card.emojiUnicode, emojiName: card.emojiName, text: card.text }}
                    onClick={() => handleCardClick(card)}
                />
            ))}
        </Box>
    );
}