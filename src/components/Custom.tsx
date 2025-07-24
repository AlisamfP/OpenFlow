import { useState } from "react";

import {
    Box, Button, TextField, MenuItem, Typography, InputLabel, Select, FormControl
} from '@mui/material'
import { Card } from "./Card";
import { EmojiList } from "../assets/EmojiList";

interface Emoji {
    name: string;
    unicode: string;
}

interface CardData {
    id: string;
    text: string;
    icon?: Emoji;
}

const CustomCardForm = () => {
    const [text, setText] = useState("")
    const [selectedEmoji, setSelectedEmoji] = useState<Emoji | null>(null)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text || !selectedEmoji) return;

        const newCard: CardData = {
            id: crypto.randomUUID(),
            text,
            icon: selectedEmoji
        }
        const existing = JSON.parse(localStorage.getItem("customCards") || "[]")
        const updated = [...existing, newCard];
        localStorage.setItem("customCards", JSON.stringify(updated))

        setText("")
        setSelectedEmoji(null);
    }

    return (
        <>
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}
        >
            <Typography variant="h4" sx={{color: 'primary.main'}}>Create a Custom Card</Typography>

            <TextField
                label="Card Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />

            <FormControl fullWidth required>
                <InputLabel>Emoji</InputLabel>
                <Select
                    value={selectedEmoji?.name || ""}
                    label="Emoji"
                    onChange={(e) => {
                        const emoji = EmojiList.find((em) => em.name === e.target.value);
                        if (emoji) setSelectedEmoji(emoji);
                    }}
                >
                    {EmojiList.map((emoji) => (
                        <MenuItem key={emoji.name} value={emoji.name}>
                            {emoji.unicode} {emoji.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
                Save Card
            </Button>
        </Box>
        {(text || selectedEmoji) && (
            <Box>
                <Typography>Preview</Typography>
                <Card 
                    isFav={false}
                    text={text}
                    icon={selectedEmoji || undefined}
                    onClick={() => {}}
                    onToggleFavorite={()=> {}}
                />
            </Box>
        )}
        </>

    )
}

export default CustomCardForm