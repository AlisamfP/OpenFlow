import { useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
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
  const [text, setText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<Emoji | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !selectedEmoji) return;

    const newCard: CardData = {
      id: crypto.randomUUID(),
      text,
      icon: selectedEmoji,
    };
    const existing = JSON.parse(localStorage.getItem("customCards") || "[]");
    const updated = [...existing, newCard];
    localStorage.setItem("customCards", JSON.stringify(updated));

    setText("");
    setSelectedEmoji(null);
  };

  return (
    <Container>
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
          onChange={(e, newVal) => {
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
      {(text || selectedEmoji) && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography>Preview</Typography>
          <Card
            isFav={false}
            text={text}
            icon={selectedEmoji || undefined}
            onClick={() => {}}
            onToggleFavorite={() => {}}
          />
        </Box>
      )}
    </Container>
  );
};

export default CustomCardForm;
