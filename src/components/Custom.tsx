import { useState } from "react";

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Card } from "./Card";
import { EmojiList } from "../assets/EmojiList";
import useLocalStorage from "../hooks/useLocalStorage";
import type { CardData, Emoji } from "../types/cardTypes";

const CustomCardForm = () => {
  const [text, setText] = useState("");
  const [customCards, setCustomCards] = useLocalStorage("customCards");
  const [selectedEmoji, setSelectedEmoji] = useState<Emoji | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const showSaveNotification = () => {
    setOpen(true);
  };

  const hideSaveNotification = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !selectedEmoji) return;

    const newCard: CardData = {
      id: crypto.randomUUID(),
      text,
      icon: selectedEmoji,
    };
    setCustomCards([...customCards, newCard]);
    setText("");
    setSelectedEmoji(null);
    showSaveNotification();
  };

  return (
    <>
      <Typography
        variant="h4"
        color="textSecondary"
        sx={{
          mb: 2,
          fontSize: { xs: "2.5em", md: "3em" },
        }}
      >
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
              onChange={(e, newVal) => {
                e.preventDefault();
                setSelectedEmoji(newVal);
              }}
              getOptionLabel={(option) => option.name.replace(/-/g, " ")}
              autoHighlight
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box
                    key={key}
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...optionProps}
                  >
                    <img
                      src={`https://openmoji.org/data/color/svg/${option.unicode}.svg`}
                      alt={option.name.replace(/-/g, " ")}
                      loading="lazy"
                      width="80"
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

            <Button type="submit" variant="contained" color="primary">
              Save Card
            </Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <Typography variant="h5" align="right">
              Card preview
            </Typography>
            <Card
              isFav={false}
              text={text}
              icon={selectedEmoji}
              onClick={() => { }}
              onToggleFavorite={() => { }}
              isCustom={true}
            />
          </Box>
        </Grid>
        <Grid size={12}>
          <Typography variant="h5">Custom Card List</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { sm: "column", md: "row" },
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {customCards.map((card) => (
              <Card
                key={card.id}
                isFav={false}
                text={card.text}
                icon={card.icon}
                onClick={() => { }}
                isCustom={true}
                onDelete={() => {
                  setCustomCards(customCards.filter((c) => c.id !== card.id));
                }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={4000}
        onClose={hideSaveNotification}
      >
        <Alert
          onClose={hideSaveNotification}
          severity="success"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Custom Card Created!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomCardForm;
