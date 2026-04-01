"use client";
import { Card as CardMUI, CardContent, CardActionArea, Typography } from "@mui/material";
import type { CardData } from "@/types/cardTypes";
import Image from "next/image";

interface CardProps {
    card: CardData;
    onClick: () => void;
}

export const Card = ({ card, onClick }: CardProps) => {
    return (
        <CardMUI
            sx={{
                display: "flex",
                position: "relative",
                minHeight: "250px",
                minWidth: "300px",
                borderRadius: 2
            }}
        >
            <CardActionArea onClick={onClick}>
                <CardContent sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    {card.emojiUnicode && (
                        <Image 
                            width={200}
                            height={200}
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