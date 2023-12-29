import { useState, useEffect } from "react";
import { fetchCardsBySet } from "../functions/api";
import { CollectionObject } from "./CollectionObject";

export function CollectionIndex(props) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.setID]);

  async function fetchCards() {
    try {
      const cardsFromAPI = await fetchCardsBySet(props.setID);
      for (const collectionObj of props.collection) {
        const matchingCard = cardsFromAPI.find(({ id }) => id === collectionObj.cardID);
        if (matchingCard) {
          matchingCard.quantity = collectionObj.quantity;
        }
      }
      setCards(cardsFromAPI);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-1">
      {cards.map((card) => (
        <CollectionObject handleForm={props.handleForm} key={card.id} card={card} />
      ))}
    </div>
  );
}
