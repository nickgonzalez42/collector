import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "./Card";
import { API, Storage, graphqlOperation } from "aws-amplify";
import { listCards, cardsBySetID } from "../graphql/queries";

export function Alternates() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCardsByNumber();
  }, [id]);

  async function fetchCardsByNumber() {
    if (!id) {
      return;
    }

    // get card data
    try {
      console.log(id);
      const apiData = await API.graphql({
        authMode: "API_KEY",
        query: listCards,
        variables: {
          filter: {
            number: { eq: id },
          },
          // Add other variables if needed
        },
      });
      const cardsFromAPI = apiData.data.listCards.items;
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
    <div className="mt-2.5">
      <div className="relative">
        <div className="grid content-evenly gap-2 text-center grid-cols-2 mt-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
            // TODO Add set info
          ))}
        </div>
      </div>
    </div>
  );
}
