"use client";
import { Card as CardMUI, CardContent, CardActionArea, Typography, Tooltip, IconButton } from "@mui/material";
import { pink } from "@mui/material/colors";
import type { CardData } from "@/types/cardTypes";
import Image from "next/image";
import { PiHeartFill, PiTrash } from "react-icons/pi";

interface CardProps {
    card: CardData;
    onClick: () => void;
    isFav?: boolean;
    onToggleFavorite?: () => void;
    onDelete?: () => void;
}

export const Card = ({ card, onClick, isFav, onToggleFavorite, onDelete }: CardProps) => {
    // increase width for head shaking horizontally/vertically emojis since they appear smaller than all others
    const size = card.emojiUnicode === "1F642-200D-2195-FE0F" || card.emojiUnicode === "1F642-200D-2194-FE0F" ? 120 : 100
    return (
        <CardMUI
            sx={{
                display: "flex",
                position: "relative",
                minHeight: "250px",
                minWidth: "300px",
                width: {xs: "100%", md: "40%", lg: "30%", xl: "20%"},
                borderRadius: 2
            }}
        >
            {onToggleFavorite && (
                <Tooltip title={isFav ? "Remove from favorites" : "Add to favorites"}>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite();
                        }}
                        size="medium"
                        sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            zIndex: 2,
                            color: isFav ? pink[400] : "background.default",
                            "&:hover": { color: pink[500] },
                        }}
                        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                    >
                        <PiHeartFill />
                    </IconButton>
                </Tooltip>
            )}
            {onDelete && (
                <Tooltip title="Delete card">
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        size="medium"
                        sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            zIndex: 2,
                            color: "error.main",
                            "&:hover": { color: "error.dark" },
                        }}
                        aria-label="Delete card"
                    >
                        <PiTrash />
                    </IconButton>
                </Tooltip>
            )}
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