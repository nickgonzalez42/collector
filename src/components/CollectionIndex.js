import { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { cardsBySetID } from "../graphql/queries";
import { CollectionObject } from "./CollectionObject";

export function CollectionIndex(props) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCardsBySet();
  }, [props.setID]);

  async function fetchCardsBySet() {
    if (!props.setID) {
      return;
    }

    // get card data
    try {
      console.log(props.setID);
      const apiData = await API.graphql({
        authMode: "API_KEY",
        query: cardsBySetID,

        variables: {
          setID: props.setID,
          // sortDirection: asc,
        },
      });

      const cardsFromAPI = apiData.data.cardsBySetID.items;
      // TODO use graphql to sort serverside
      cardsFromAPI.sort((a, b) => a.number.localeCompare(b.number));
      // get card images
      await Promise.all(
        cardsFromAPI.map(async (card) => {
          if (card.image) {
            const url = await Storage.get(card.image);
            card.image = url;
          }
          return card;
        })
      );
      setCards(cardsFromAPI);
    } catch (error) {
      console.error("Error fetching sets:", error);
    }
  }

  return (
    <div className="mt-2 columns-1 md:columns-2 xl:columns-3 2xl:columns-4 gap-1">
      {/* {cards.length > 0 ? cards.map((card) => <CollectionObject key={card.id} card={card} />) : <></>} */}
      {cards.map((card) => (
        <CollectionObject key={card.id} card={card} />
      ))}
    </div>
  );
}
