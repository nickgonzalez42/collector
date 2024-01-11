import { useState, useEffect } from "react";
import { fetchCardsBySet } from "../functions/api";
import { Card } from "./Card";

export function CardIndex(props) {
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
      console.log(error);
    }
  }

  return (
    <div className="mt-2.5">
      <div className="relative">
        <div className="grid content-evenly gap-2 text-center grid-cols-2 mt-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
