"use client";
import { Box, Card as CardMUI, CardContent, CardActionArea, Typography } from "@mui/material";
import type { CardData } from "@/types/cardTypes";

interface CardProps {
    card: CardData;
    onClick: () => void;
}

export const Card = ({ card, onClick }: CardProps) => {
    return (
        <CardMUI>
            <CardActionArea onClick={onClick}>
                <CardContent>
                    {card.emojiUnicode && (
                        <Box 
                            component="img"
                            sx={{height: "7em", width: "auto"}}
                            src={`https://openmoji.org/data/color/svg/${card.emojiUnicode}.svg`}
                            alt={card.text}
                        />
                    )}
                    <Typography>{card.text}</Typography>
                </CardContent>
            </CardActionArea>
        </CardMUI>
    );
};