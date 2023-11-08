import { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { TextField, Button, Image, Flex, Heading, Text, View } from "@aws-amplify/ui-react";
import { listCards } from "./graphql/queries";
// import { createCard as createCardMutation } from "./graphql/mutations";

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

  // async function createCard(event) {
  //   event.preventDefault();
  //   console.log(event);
  //   const form = new FormData(event.target);
  //   const image = form.get("image");
  //   const data = {
  //     name: form.get("name"),
  //     text: form.get("text"),
  //     image: image.name,
  //     color: form.get("color"),
  //     cost: form.get("cost"),
  //     number: form.get("number"),
  //     setID: props.setID,
  //   };
  //   if (!!data.image) await Storage.put(data.name, image);
  //   await API.graphql({
  //     query: createCardMutation,
  //     variables: { input: data },
  //   });
  //   fetchCards();
  //   event.target.reset();
  // }

  return (
    <View className="App">
      {/* <View as="form" margin="3rem 0" onSubmit={createCard}>
        <Flex direction="row" justifyContent="center">
          <View name="image" as="input" type="file" style={{ alignSelf: "end" }} />
          <TextField name="name" placeholder="Card Name" label="Card Name" labelHidden variation="quiet" required />
          <TextField name="color" placeholder="Card Color" label="Card Color" labelHidden variation="quiet" required />
          <TextField name="text" placeholder="Card Text" label="Card Text" labelHidden variation="quiet" required />
          <TextField name="cost" placeholder="Card Cost" label="Card Cost" labelHidden variation="quiet" required />
          <TextField
            name="number"
            placeholder="Card Number"
            label="Card Number"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Post
          </Button>
        </Flex>
      </View> */}
      <Heading level={3}>Current Cards</Heading>
      <View margin="3rem 0">
        {cards.map((card) => (
          <Flex key={card.id || card.name} direction="row" justifyContent="center" alignItems="center">
            <Text as="strong" fontWeight={700}>
              {card.name}
            </Text>
            {card.image && <Image src={card.image} alt={`visual aid for ${card.name}`} style={{ width: 400 }} />}
          </Flex>
        ))}
      </View>
    </View>
  );
}
