import { Card } from "./Card";
import { CardList } from "../assets/cardList";

interface CardGridProps {
  category: "general" | "feelings" | "custom" | "favorites";
}

const CardGrid: React.FC<CardGridProps> = ({ category }) => {
  const cards = CardList();
  const categoryCards = cards[category];
  return (
    <>
      {categoryCards.map(({ text, icon, isFav }, i) => (
        <Card key={i} text={text} icon={icon} isFav={isFav} />
      ))}
    </>
  );
};

export default CardGrid;
