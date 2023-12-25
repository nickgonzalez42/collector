import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "./Card";
import { API, Storage } from "aws-amplify";
import { searchCards } from "../graphql/queries";

export function Alternates() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCardsByNumber();
  }, []);

  async function fetchCardsByNumber() {
    console.log("RUNNING");
    if (!id) {
      return;
    }
    let cardsFromAPI = [];
    try {
      let apiData = await API.graphql({
        authMode: "API_KEY",
        query: searchCards,
        variables: {
          filter: {
            number: { eq: id },
          },
          sort: [
            { field: "setID", direction: "asc" },
            // { field: "image", direction: "asc" },
          ],
          limit: 50,
        },
      });
      while (apiData.data.searchCards.nextToken) {
        console.log("RUNNING");
        cardsFromAPI = cardsFromAPI.concat(apiData.data.searchCards.items);
        apiData = await API.graphql({
          authMode: "API_KEY",
          query: searchCards,
          variables: {
            filter: {
              number: { eq: id },
            },
            sort: [
              // { field: "alternate", direction: "asc" },
              { field: "setID", direction: "asc" },
            ],
            limit: 50,
            nextToken: apiData.data.searchCards.nextToken,
          },
        });
      }
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
      console.log(cardsFromAPI);
    } catch (error) {
      console.error("Error fetching sets:", error);
    }
  }

  return (
    <div className="mt-2.5">
      <div className="relative">
        <div className="grid content-evenly gap-2 text-center grid-cols-2 mt-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {cards.map((card) => (
            <div key={card.id}>
              <Card card={card} />
              {card.set.name ? <p>{card.set.name}</p> : <></>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
