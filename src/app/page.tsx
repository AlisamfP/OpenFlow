import connectDB from "@/lib/mongoose"
import BaseCard from "@/models/BaseCard"
import CustomCard from "@/models/CustomCard"
import UserSettings from "@/models/UserSettings";
import CategoryTabs from "@/components/CategoryTabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { BaseCardData, Category } from "@/types/cardTypes"

interface AudioSettings {
    pitch: number;
    rate: number;
    volume: number;
    selectedVoice: string;
    enabled: boolean;
}

export default async function Home() {
  await connectDB();
  const raw = await BaseCard.find({})
  const cards: BaseCardData[] = JSON.parse(JSON.stringify(raw))

  const general = cards.filter(c => c.category === "general")
  const feelings = cards.filter(c => c.category === "feelings")

  const session = await auth.api.getSession({headers: await headers()});
  
  let initialCategory: Category = "general";
  let initialFavCards: { cardId: string; type: string}[] = [];
  let initialAudio: AudioSettings = { pitch: 1, rate: 1, volume: 1, selectedVoice: "", enabled: true };
  let customCards: BaseCardData[] = [];

  if(session) {
    const rawSettings = await UserSettings.findOne({ userId: session.user.id })
    if(rawSettings) {
      const settings = JSON.parse(JSON.stringify(rawSettings));
      initialCategory = (settings.categoryPref as Category) || "general";
      initialFavCards = settings.favCards || [];
      if(settings.audio) {
        initialAudio = {
          pitch: settings.audio.pitch ?? 1,
          rate: settings.audio.rate ?? 1,
          volume: settings.audio.volume ?? 1,
          selectedVoice: settings.audio.selectedVoice || "",
          enabled: settings.audio.enabled ?? true,
        }
      }
    }
    const rawCustomCards = await CustomCard.find({ ownerId: session.user.id });
    customCards = JSON.parse(JSON.stringify(rawCustomCards));
  }


  return (
    <CategoryTabs 
      general={general} 
      feelings={feelings} 
      customCards={customCards}
      initialCategory={initialCategory} 
      initialFavCards={initialFavCards} 
      initialAudio={initialAudio} 
    />
  );
}