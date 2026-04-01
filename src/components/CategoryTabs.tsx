"use client";
import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import CardGrid from "@/components/CardGrid";
import type { BaseCardData, Category } from "@/types/cardTypes";

interface CategoryTabsProps {
    general: BaseCardData[];
    feelings: BaseCardData[];
}

export default function CategoryTabs({ general, feelings }: CategoryTabsProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category>("general");

    const handleTabChange = (_e: React.SyntheticEvent, newValue: Category) => {
        setSelectedCategory(newValue);
    };

    const cards = selectedCategory === "general" ? general : feelings;

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
            </Tabs>
            <CardGrid cards={cards} />
        </Box>
    );
}