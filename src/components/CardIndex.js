import { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { TextField, Button, Image, Flex, Heading, Text, View } from "@aws-amplify/ui-react";
import { listCards, cardsBySetID } from "../graphql/queries";
import { Card } from "./Card";

export function CardIndex(props) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCardsBySet();
  }, [props.setID]);

  async function fetchCardsBySet() {
    if (!props.setID) {
      return;
    }

    // get card data
    const apiData = await API.graphql({
      query: cardsBySetID,
      variables: {
        setID: props.setID,
        // sortDirection: "asc",
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
  }

  // async function fetchAllCards() {
  //   const apiData = await API.graphql({ query: listCards });
  //   const cardsFromAPI = apiData.data.listCards.items;
  //   await Promise.all(
  //     cardsFromAPI.map(async (card) => {
  //       if (card.image) {
  //         const url = await Storage.get(card.image);
  //         card.image = url;
  //       }
  //       return card;
  //     })
  //   );
  //   setCards(cardsFromAPI);
  // }

  return (
    <div className="container mt-2.5">
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
