import { useState, useEffect } from "react";
import { fetchCardsBySet } from "../functions/api";
import { CollectionObject } from "./CollectionObject";

export function CollectionIndex(props) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, [props.setID]);

  async function fetchCards() {
    try {
      const cardsFromAPI = await fetchCardsBySet(props.setID);
      setCards(cardsFromAPI);
    } catch (error) {
      // Handle error as needed
    }
  }

  return (
    <div className="mt-2 columns-1 md:columns-2 xl:columns-3 2xl:columns-4 gap-1">
      {cards.map((card) => (
        <CollectionObject key={card.id} card={card} />
      ))}
    </div>
  );
}
