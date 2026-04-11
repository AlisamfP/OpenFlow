"use client";
import { Card } from "@/components/Card";
import { useTTS } from "@/hooks/useTTS";
import { authClient } from "@/lib/auth-client";
import type { BaseCardData } from "@/types/cardTypes";
import { Box } from "@mui/material";

interface AudioSettings {
    pitch: number;
    rate: number;
    volume: number;
    selectedVoice: string;
}

interface CardGridProps {
    cards: BaseCardData[];
    favCards?: { cardId: string; type: string }[];
    onFavToggle?: (cardId: string, type: "base" | "custom") => void;
    audio: AudioSettings;
    cardType: "base" | "custom";
    role?: string;
}

export default function CardGrid({ cards, favCards = [], onFavToggle, audio, cardType, role }: CardGridProps) {
    const { speak, voices } = useTTS();
    const { data: session } = authClient.useSession();
    const handleCardClick = (card: BaseCardData) => {
        const voice = audio?.selectedVoice ? voices.find(v => v.voiceURI === audio.selectedVoice) || null : null;
        console.log(audio)
        speak({ 
            text: card.text,
            pitch: audio?.pitch ?? 1,
            rate: audio?.rate ?? 1,
            volume: audio?.volume ?? 1,
            voice,
        })
    };

    return (
        <Box
            {...(role ? { role } : {})}
            sx={{
                display: "flex",
                flexDirection: {xs: "column", md: "row"},
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                gap: "1em",
                pt: 3
            }}
        >
            {cards.map((card) => (
                <Card
                    key={card._id}
                    card={{ id: card._id, emojiUnicode: card.emojiUnicode, emojiName: card.emojiName, text: card.text }}
                    onClick={() => handleCardClick(card)}
                    isFav={favCards.some(c => c.cardId === card._id)}
                    onToggleFavorite={session ? () => onFavToggle?.(card._id, cardType) : undefined}
                />
            ))}
        </Box>
    );
}