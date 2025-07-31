import { useEffect, useState } from "react";
import { Box, Tabs, Tab, Backdrop, Modal } from "@mui/material";
import { Card } from "./Card";
import { CardList } from "../assets/CardList";
import useLocalStorage from "../hooks/useLocalStorage";
import { useTTS } from "../hooks/useTTS";

import type { CardData, Cards } from "../types/cardTypes";

function a11yProps(index: number) {
  return {
    id: `category-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const CategoryTabs: React.FC = () => {
  const [favCardIds, setFavCardIds] = useLocalStorage("favCardIds");
  const [categoryPref] = useLocalStorage("categoryPref");
  const [pitch] = useLocalStorage("pitch");
  const [rate] = useLocalStorage("rate");
  const [volume] = useLocalStorage("volume");
  const [savedVoice] = useLocalStorage("voice");
  const [audioEnabledStored] = useLocalStorage("audioEnabled");

  const [audioEnabled, setAudioEnabled] = useState<boolean>(audioEnabledStored);
  const [fullscreenCard, setFullscreenCard] = useState<CardData | null>(null);
  const { speak, voices } = useTTS();

  const cards = CardList(favCardIds);
  const tabKeys = Object.keys(cards) as (keyof Cards)[];
  const [selectedCatIndex, setselectedCatIndex] = useState(
    categoryPref ? tabKeys.indexOf(categoryPref) : 0
  );
  const selectedCards = cards[tabKeys[selectedCatIndex]];

  useEffect(() => {
    const handleAudioChange = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      setAudioEnabled(custom.detail);
    };

    window.addEventListener("audioChanged", handleAudioChange);

    return () => window.removeEventListener("audioChanged", handleAudioChange);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavCardIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    e.preventDefault();
    setselectedCatIndex(newValue);
  };

  const handleCardClick = (card: CardData) => {
    if (!audioEnabled) {
      setFullscreenCard(card);
    } else {
      const voice = voices.find((v) => v.voiceURI === savedVoice) || null;
      const { text } = card;
      speak({
        text,
        pitch,
        rate,
        volume,
        voice,
      });
    }
  };

  return (
    <>
      <Box component="section">
        <Tabs
          value={selectedCatIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          selectionFollowsFocus
          textColor="inherit"
          indicatorColor="secondary"
          aria-label="change card category"
          sx={{
            backgroundColor: "background.default",
            mb: 1,
            p: 1,
            borderRadius: 1,
          }}
        >
          {tabKeys.map((tab, i) => (
            <Tab key={tab} label={tab} {...a11yProps(i)}></Tab>
          ))}
        </Tabs>
        <Box
          role="tabpanel"
          id={`tabpanel-${selectedCatIndex}`}
          aria-labelledby={`category-${selectedCatIndex}`}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
          }}
        >
          {selectedCards.map(({ text, icon, id }: CardData) => (
            <Card
              key={id}
              text={text}
              icon={icon}
              isFav={favCardIds.includes(id)}
              onClick={() => handleCardClick({ text, icon, id })}
              onToggleFavorite={() => toggleFavorite(id)}
            />
          ))}
        </Box>
      </Box>
      {fullscreenCard && (
        <Modal
          open={!!fullscreenCard}
          onClose={() => setFullscreenCard(null)}
          aria-labelledby={fullscreenCard.text}
          sx={{
            zIndex: 2,
            width: "90vw",
            height: "90vh",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: 'none',
          }}
        >
          <Box>
            <Card
              fullscreen={true}
              text={fullscreenCard.text}
              icon={fullscreenCard.icon}
              onClick={() => setFullscreenCard(null)}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CategoryTabs;
