import {
    Box,
    Card as CardMUI,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
    CardActionArea,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { PiHeartFill, PiX, PiTrash } from "react-icons/pi";

import type { Emoji } from "../types/cardTypes";

interface CardProps {
    isFav?: boolean;
    text: string;
    icon: Emoji | null;
    onClick: () => void;
    onToggleFavorite?: () => void;
    fullscreen?: boolean;
    isCustom?: boolean;
    onDelete?: () => void;
}

export const Card = ({
    isFav,
    text,
    icon,
    onClick,
    onToggleFavorite,
    fullscreen,
    isCustom = false,
    onDelete,
}: CardProps) => {
    return (
        <CardMUI
            sx={{
                display: "flex",
                position: "relative",
                minHeight: fullscreen ? "90vh" : "250px",
                width: fullscreen ? "90vw" : isCustom ? "100%" : { xs: "100%", md: "40%", lg: "30%" },
                minWidth: fullscreen ? "90vw" : "300px",
                maxWidth: fullscreen ? "90vw" : isCustom ? "450px" : "100%",
                zIndex: fullscreen ? 3 : 0,
                borderRadius: 2,
            }}
        >
            <CardHeader
                sx={{
                    color: isFav ? "pink" : "background.paper",
                    position: "absolute",
                    right: 0,
                    top: 0,
                }}
                action={
                    <>
                        {onToggleFavorite ? (
                            <IconButton
                                aria-label={isFav ? "Remove From Favorites" : "Add To Favorites"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleFavorite();
                                }}
                                size="medium"
                                sx={{
                                    color: isFav ? pink[400] : "background.default",
                                    zIndex: 2,
                                    "&:hover": {
                                        color: pink[300],
                                    },
                                }}
                            >
                                <PiHeartFill />
                            </IconButton>
                        ) : null}
                        {onDelete ? (
                            <IconButton
                                aria-label="Delete Card"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete();
                                }}
                                size="medium"
                                sx={{
                                    color: "background.default",
                                    zIndex: 2,
                                    "&:hover": {
                                        color: "warning",
                                    },
                                }}
                            >
                                <PiTrash />
                            </IconButton>
                        ) : null}
                        {fullscreen ? (
                            <IconButton
                                aria-label="Exit Fullscreen"
                            >
                                <PiX />
                            </IconButton>
                        ) : null}
                    </>
                }
            />
            <CardActionArea onClick={onClick}>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {icon && (
                        <Box
                            component="img"
                            sx={{
                                height: "7em",
                                width: "auto",
                            }}
                            src={`https://openmoji.org/data/color/svg/${icon.unicode}.svg`}
                            alt={icon.name.replace(/-/g, " ")}
                            role="img"
                            data-unicode={icon.unicode}
                        />
                    )}
                    <Typography variant="h5">{text}</Typography>
                </CardContent>
            </CardActionArea>
        </CardMUI>
    );
};
