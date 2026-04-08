"use client";
import { Card } from "@/components/Card";
import { useTTS } from "@/hooks/useTTS";
import { authClient } from "@/lib/auth-client";
import type { BaseCardData } from "@/types/cardTypes";
import { Box } from "@mui/material";

interface CardGridProps {
    cards: BaseCardData[];
    favCards?: { 
        cardId: string; 
        type: string
    }[];
    onFavToggle?: (cardId: string, type: "base" | "custom") => void;
}

export default function CardGrid({ cards, favCards = [], onFavToggle }: CardGridProps) {
    const { speak } = useTTS();
    const { data: session } = authClient.useSession();
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
                    isFav={favCards.some(c => c.cardId === card._id)}
                    onToggleFavorite={session ? () => onFavToggle?.(card._id, "base") : undefined}
                />
            ))}
        </Box>
    );
}