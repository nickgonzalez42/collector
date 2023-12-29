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
      // Handle error as needed
    }
  }

  return (
    <div className="mt-2 columns-1 md:columns-2 xl:columns-3 2xl:columns-4 grid-flow-row">
      {cards.map((card) => (
        <CollectionObject handleForm={props.handleForm} key={card.id} card={card} />
      ))}
    </div>
  );
}
