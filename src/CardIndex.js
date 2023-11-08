import { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { TextField, Button, Image, Flex, Heading, Text, View } from "@aws-amplify/ui-react";
import { listCards } from "./graphql/queries";

export function CardIndex(props) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    const apiData = await API.graphql({ query: listCards });
    const cardsFromAPI = apiData.data.listCards.items;
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

  return (
    <>
      {cards.map((card) => (
        <div>
          <p>{card.name}</p>
          {card.image && <Image src={card.image} alt={`visual aid for ${card.name}`} style={{ width: 400 }} />}
        </div>
      ))}
    </>
  );
}
