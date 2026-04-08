"use client";
import { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import CardGrid from "@/components/CardGrid";
import { authClient } from "@/lib/auth-client";
import type { BaseCardData, Category } from "@/types/cardTypes";

interface CategoryTabsProps {
    general: BaseCardData[];
    feelings: BaseCardData[];
}

export default function CategoryTabs({ general, feelings }: CategoryTabsProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category>("general");
    const [favCards, setFavCards] = useState<{ cardId: string; type: string; }[]>([]);
    const { data: session } = authClient.useSession();

    useEffect(() => {
        if(!session) return;
        const fetchSettings = async() => {
            const res = await fetch("/api/user/settings")
            if(res.ok){
                const data = await res.json();
                setFavCards(data.favCards || [])
            }
        }
        fetchSettings();
    }, [session]);

    const handleFavToggle = async (cardId: string, type: "base" | "custom") => {
        const res = await fetch("/api/user/favorites", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({cardId, type})
        });
        if(res.ok) {
            const updated = await res.json();
            setFavCards(updated);
        }
    };

    const handleTabChange = (_e: React.SyntheticEvent, newValue: Category) => {
        setSelectedCategory(newValue);
    };

    const allCards = [...general, ...feelings];
    const favCardIds = favCards.map(f => f.cardId)
    const favoriteCards = allCards.filter(card => favCardIds.includes(card._id));

    const getCards = () => {
        if(selectedCategory === "general") return general;
        if(selectedCategory === "feelings") return feelings;
        return favoriteCards;
    }

    return (
        <Box>
            <Tabs
                value={selectedCategory}
                onChange={handleTabChange}
                textColor="inherit"
                indicatorColor="secondary"
                aria-label="card categories"
            >
                <Tab label="General" value="general" />
                <Tab label="Feelings" value="feelings" />
                <Tab label="favorites" value="favorites" />
            </Tabs>
            {selectedCategory === "favorites" && favoriteCards.length === 0 ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        px: 8,
                        py: 6,
                    }}
                >
                    {session ? (
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
                    )}
                </Box>
            ) : (
                <CardGrid 
                    cards={getCards()}
                    favCards={favCards}
                    onFavToggle={handleFavToggle} 
                />
            )}
        </Box>
    );
}