"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Alert, Autocomplete, Box, Button, Container,
    Grid, Snackbar, TextField, Typography,
} from "@mui/material";
import { authClient } from "@/lib/auth-client";
import { Card } from "@/components/Card";
import { EmojiList } from "@/assets/EmojiList";
import type { Emoji } from "@/types/cardTypes";
import Image from "next/image";

interface CustomCardData {
    _id: string;
    text: string;
    emojiUnicode: string;
    emojiName: string;
}

const MAX_CUSTOM_CARDS = 20;

export default function CustomPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [text, setText] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState<Emoji | null>(null);
    const [customCards, setCustomCards] = useState<CustomCardData[]>([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!session && !isPending) {
            router.push("/account");
        }
    }, [session, isPending, router]);

    useEffect(() => {
        if (!session) return;
        const fetchCards = async () => {
            const res = await fetch("/api/cards/custom");
            if (res.ok) {
                const data = await res.json();
                setCustomCards(data);
            }
        };
        fetchCards();
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text || !selectedEmoji) return;
        setError("");
        setLoading(true);

        const res = await fetch("/api/cards/custom", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text,
                emojiUnicode: selectedEmoji.unicode,
                emojiName: selectedEmoji.name,
            }),
        });

        setLoading(false);

        if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Failed to create card");
            return;
        }

        const newCard = await res.json();
        setCustomCards(prev => [...prev, newCard]);
        setText("");
        setSelectedEmoji(null);
        setOpen(true);
    };

    const handleDelete = async (id: string) => {
        const res = await fetch(`/api/cards/custom/${id}`, { method: "DELETE" });
        if (res.ok) {
            setCustomCards(prev => prev.filter(c => c._id !== id));
        }
    };

    if (isPending) {
        return <Container sx={{ mt: 8 }}><Typography>Loading...</Typography></Container>;
    }

    return (
        <Container sx={{ mt: 4, pb: 6 }}>
            <Typography variant="h4" color="textSecondary" sx={{ mb: 2 }}>
                Custom Card Creation
            </Typography>
            <Grid container spacing={{ xs: 2, md: 6 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                        <Typography variant="h5">Custom Card Info</Typography>
                        <TextField
                            label="Card Text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                        />
                        <Autocomplete
                            id="emoji-select"
                            options={EmojiList}
                            value={selectedEmoji}
                            onChange={(_e, newVal) => setSelectedEmoji(newVal)}
                            getOptionLabel={(option) => option.name.replace(/-/g, " ")}
                            onClose={() => {
                                setTimeout(() => {
                                    (document.activeElement as HTMLElement)?.blur();
                                }, 0)
                            }}
                            autoHighlight
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                // increase width for head shaking horizontally/vertically emojis since they appear smaller than all others the add negative margin left so they appear inline with all the other emojis
                                const isHeadShaking = option.unicode === "1F642-200D-2195-FE0F" || option.unicode === "1F642-200D-2194-FE0F"
                                const size = isHeadShaking ? 50 : 40;
                                const marginLeft = isHeadShaking ? "-5px" : 0;

                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ "& > img": { ml: marginLeft, mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        <Image
                                            width={size}
                                            height={size}
                                            src={`https://openmoji.org/data/color/svg/${option.unicode}.svg`}
                                            alt={option.name.replace(/-/g, " ")}
                                            role="img"
                                            data-unicode={option.unicode}
                                        />
                                        {option.name.replace(/-/g, " ")}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    label="Choose an icon"
                                    slotProps={{
                                        htmlInput: {
                                            ...params.inputProps,
                                            autoComplete: "new-password",
                                        },
                                    }}
                                />
                            )}
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        {customCards.length >= MAX_CUSTOM_CARDS && (
                            <Typography color="warning.main">
                                You've reached the maximum of {MAX_CUSTOM_CARDS} custom cards. Delete a card to create a new one.
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading || customCards.length >= MAX_CUSTOM_CARDS}
                        >
                            {loading ? "Saving..." : "Save Card"}
                        </Button>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                        <Typography variant="h5" align="right">Card preview</Typography>
                        <Card
                            card={{
                                id: "preview",
                                text: text || "Enter your own text to change this",
                                emojiUnicode: selectedEmoji?.unicode || "",
                                emojiName: selectedEmoji?.name || "",
                            }}
                            onClick={() => { }}
                        />
                    </Box>
                </Grid>
                {customCards.length > 0 && (
                    <Grid size={12}>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Your Custom Cards ({customCards.length}/{MAX_CUSTOM_CARDS})
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                            {customCards.map((card) => (
                                <Card
                                    key={card._id}
                                    card={{
                                        id: card._id,
                                        text: card.text,
                                        emojiUnicode: card.emojiUnicode,
                                        emojiName: card.emojiName,
                                    }}
                                    onClick={() => { }}
                                    onDelete={() => handleDelete(card._id)}
                                />
                            ))}
                        </Box>
                    </Grid>
                )}
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
            >
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ display: "flex", alignItems: "center", mt: 10 }}>
                    Custom Card Created!
                </Alert>
            </Snackbar>
        </Container>
    );
}