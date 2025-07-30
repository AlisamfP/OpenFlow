import { useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !selectedEmoji) return;

    const newCard: CardData = {
      id: crypto.randomUUID(),
      text,
      icon: selectedEmoji,
    };
    console.log(newCard)
    setCustomCards([...customCards, newCard])
    setText("");
    setSelectedEmoji(null);
  };

  return (
    <Grid container spacing={{xs: 2, md: 6}}>
      <Grid size={{xs:12, md:6}}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h4" sx={{ color: "primary.main" }}>
            Create a Custom Card
          </Typography>

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
      <Grid size={{xs:12, md:6}}>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          >
          <Typography variant="h5">Card preview</Typography>
          <Card
            isFav={false}
            text={text}
            icon={selectedEmoji || undefined}
            onClick={() => {}}
            onToggleFavorite={() => {}}
            />
        </Box>
      </Grid>

    </Grid>
  );
};

export default CustomCardForm;
