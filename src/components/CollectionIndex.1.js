import { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { searchCards } from "../graphql/queries";
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
    let cardsFromAPI = [];
    try {
      let apiData = await API.graphql({
        authMode: "API_KEY",
        query: searchCards,
        variables: {
          filter: {
            setID: { eq: props.setID },
          },
          sort: [
            { field: "number", direction: "asc" },
            { field: "alternate", direction: "asc" },
          ],
          limit: 50,
        },
      });
      while (apiData.data.searchCards.nextToken) {
        cardsFromAPI = cardsFromAPI.concat(apiData.data.searchCards.items);
        apiData = await API.graphql({
          authMode: "API_KEY",
          query: searchCards,
          variables: {
            filter: {
              setID: { eq: props.setID },
            },
            sort: [
              { field: "number", direction: "asc" },
              { field: "alternate", direction: "asc" },
            ],
            limit: 50,
            nextToken: apiData.data.searchCards.nextToken,
          },
        });
      }
      console.log(cardsFromAPI);
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
      console.log(cardsFromAPI);
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
