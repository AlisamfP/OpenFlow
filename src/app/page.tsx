import connectDB from "@/lib/mongoose"
import BaseCard from "@/models/BaseCard"
import { BaseCardData } from "@/types/cardTypes"
import CardGrid from "@/components/CardGrid";

export default async function Home() {
  await connectDB();
  const raw = await BaseCard.find({})
  const cards: BaseCardData[] = JSON.parse(JSON.stringify(raw))


  return (
    <main>
      <CardGrid cards={cards} />
    </main>
  );
}