"use client";
import { Card as CardMUI, CardContent, CardActionArea, Typography } from "@mui/material";
import type { CardData } from "@/types/cardTypes";
import Image from "next/image";

interface CardProps {
    card: CardData;
    onClick: () => void;
}

export const Card = ({ card, onClick }: CardProps) => {
    // increase width for head shaking horizontally/vertically emojis since they appear smaller than all others
    const size = card.emojiUnicode === "1F642-200D-2195-FE0F" || card.emojiUnicode === "1F642-200D-2194-FE0F" ? 120 : 100
    return (
        <CardMUI
            sx={{
                display: "flex",
                position: "relative",
                minHeight: "250px",
                minWidth: "300px",
                width: {xs: "100%", md: "40%", lg: "30%"},
                borderRadius: 2
            }}
        >
            <CardActionArea onClick={onClick}>
                <CardContent sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                    {card.emojiUnicode && (
                        <Image 
                            width={size}
                            height={size}
                            src={`https://openmoji.org/data/color/svg/${card.emojiUnicode}.svg`}
                            alt={card.emojiName.replace(/-/g, " ")}
                            role="img"
                            data-unicode={card.emojiUnicode}
                        />
                    )}
                    <Typography variant="h5">{card.text}</Typography>
                </CardContent>
            </CardActionArea>
        </CardMUI>
    );
};