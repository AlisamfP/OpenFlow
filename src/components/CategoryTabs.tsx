"use client";
import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import CardGrid from "@/components/CardGrid";
import { authClient } from "@/lib/auth-client";
import type { BaseCardData, Category } from "@/types/cardTypes";
import { useAudioToggle } from "@/context/AudioContext";

interface CategoryTabsProps {
    general: BaseCardData[];
    feelings: BaseCardData[];
    customCards: BaseCardData[];
    initialCategory: Category;
    initialFavCards: { cardId: string; type: string }[];
    initialAudio: AudioSettings;
}

interface AudioSettings {
    pitch: number;
    rate: number;
    volume: number;
    selectedVoice: string;
    enabled: boolean;
}

export default function CategoryTabs({ general, feelings, customCards, initialCategory, initialFavCards, initialAudio }: CategoryTabsProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
    const [favCards, setFavCards] = useState<{ cardId: string; type: string; }[]>(initialFavCards);
    const { data: session } = authClient.useSession();
    const { isAudioEnabled } = useAudioToggle();

    const handleFavToggle = async (cardId: string, type: "base" | "custom") => {
        const res = await fetch("/api/user/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cardId, type })
        });
        if (res.ok) {
            const updated = await res.json();
            setFavCards(updated);
        }
    };

    const handleTabChange = (_e: React.SyntheticEvent, newValue: Category) => {
        setSelectedCategory(newValue);
    };

    const allCards = [...general, ...feelings, ...customCards];
    const favCardIds = favCards.map(f => f.cardId)
    const favoriteCards = allCards.filter(card => favCardIds.includes(card._id));

    const getCards = () => {
        if (selectedCategory === "general") return general;
        if (selectedCategory === "feelings") return feelings;
        if (selectedCategory === "custom") return customCards;
        return favoriteCards;
    }

    const renderEmptyState = () => {
        if (selectedCategory === "favorites") {
            return session ? (
                <>
                    <Typography variant="h5" color="text.primary" sx={{ textAlign: "center" }}>
                        No favorited cards yet.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                        Click the heart icon on any card to add it to your favorites.
                    </Typography>
                </>
            ) : (
                <>
                    <Typography variant="h5" color="text.primary" sx={{ textAlign: "center" }}>
                        Sign in to use favorites.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                        Create an account or sign in to save your favorite cards.
                    </Typography>
                </>
            )
        }
        if (selectedCategory === "custom") {
            return session ? (
                <>
                    <Typography variant="h5" color="text.primary" sx={{ textAlign: "center" }}>
                        No custom cards yet.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                        Create a custom card to see it here.
                    </Typography>
                </>
            ) : (
                <>
                    <Typography variant="h5" color="text.primary" sx={{ textAlign: "center" }}>
                        Sign in to create custom cards.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                        Sign In
                    </Typography>
                </>
            )
        }
        return null;
    }

    const cards = getCards();
    const isEmpty = cards.length === 0 && (selectedCategory === "favorites" || selectedCategory === "custom")

    return (
        <Box sx={{ px: 2, pb: 4 }}>
            <Tabs
                value={selectedCategory}
                onChange={handleTabChange}
                textColor="inherit"
                indicatorColor="secondary"
                aria-label="card categories"
            >
                <Tab label="General" value="general" />
                <Tab label="Feelings" value="feelings" />
                <Tab label="Custom" value="custom" />
                <Tab label="favorites" value="favorites" />
            </Tabs>
            {isEmpty ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, px: 8, py: 6 }}>
                    {renderEmptyState()}
                </Box>
            ) : (
                <CardGrid
                    cards={cards}
                    favCards={favCards}
                    onFavToggle={handleFavToggle}
                    audio={{...initialAudio, enabled: isAudioEnabled}}
                    cardType={selectedCategory === "custom" ? "custom" : "base"}
                    role="tabpanel"
                />
            )}
        </Box>
    );
}