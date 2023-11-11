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
    console.log(props.setID);
    if (!props.setID) {
      console.log("TESTTESTTEST");
      return;
    }
    const apiData = await API.graphql({
      query: cardsBySetID,
      variables: {
        setID: props.setID,
      },
    });

    const cardsFromAPI = apiData.data.cardsBySetID.items;
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
    <div>
      {cards.map((card) => (
        <div key={card.id}>
          <Card card={card} />
        </div>
      ))}
    </div>
  );
}
