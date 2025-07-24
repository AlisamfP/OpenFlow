import { Box, Card as CardMUI, CardContent, CardHeader, IconButton, Typography, CardActionArea } from "@mui/material";
import { pink } from "@mui/material/colors";
import { PiHeartFill } from 'react-icons/pi';

interface CardProps {
    isFav: boolean;
    text: string;
    icon?: Emoji;
    onClick: () => void;
    onToggleFavorite: () => void;
}

interface Emoji {
    name: string;
    unicode: string;
}


export const Card = ({ isFav, text, icon, onClick, onToggleFavorite }: CardProps) => {


    return (
        <CardMUI sx={{ position: 'relative', minHeight: '250px', display: 'flex' }}>
            <CardHeader
                sx={{
                    color: isFav ? 'pink' : 'background.paper',
                    position: 'absolute',
                    right: 0,
                    top: 0
                }}
                action={
                    <IconButton
                        aria-label={isFav ? "Remove From Favorites" : "Add To Favorites"}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite()
                        }}
                        size="medium"
                        sx={{
                            color: isFav ? pink[400] : 'secondary.main',
                            zIndex: 2,
                            '&:hover': {
                                color: pink[300]
                            }
                        }}
                    >
                        <PiHeartFill />
                    </IconButton>

                }
            />
            <CardActionArea onClick={onClick}>
                <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    {icon &&
                        <Box
                            component="img"
                            sx={{
                                height: '7em',
                                width: 'auto'
                            }}
                            src={`https://openmoji.org/data/color/svg/${icon.unicode}.svg`}
                            alt={icon.name.replace(/-/g, " ")}
                            role="img"
                            data-unicode={icon.unicode} />
                    }
                    <Typography variant="h5">{text}</Typography>
                </CardContent>
            </CardActionArea>
        </CardMUI>
    )
}
