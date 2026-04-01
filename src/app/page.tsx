import connectDB from "@/lib/mongoose"
import BaseCard from "@/models/BaseCard"
import { BaseCardData } from "@/types/cardTypes"
import CategoryTabs from "@/components/CategoryTabs";

export default async function Home() {
  await connectDB();
  const raw = await BaseCard.find({})
  const cards: BaseCardData[] = JSON.parse(JSON.stringify(raw))

  const general = cards.filter(c => c.category === "general")
  const feelings = cards.filter(c => c.category === "feelings")


  return (
    <CategoryTabs general={general} feelings={feelings} />
  );
}