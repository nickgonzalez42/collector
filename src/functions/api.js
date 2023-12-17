// api.js
import { API, Storage } from "aws-amplify";
import { searchCards } from "../graphql/queries";

export async function fetchCardsBySet(setID) {
  if (!setID) {
    return [];
  }

  let cardsFromAPI = [];
  try {
    let apiData = await API.graphql({
      authMode: "API_KEY",
      query: searchCards,
      variables: {
        filter: {
          setID: { eq: setID },
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
            setID: { eq: setID },
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

    await Promise.all(
      cardsFromAPI.map(async (card) => {
        if (card.image) {
          const url = await Storage.get(card.image);
          card.image = url;
        }
        return card;
      })
    );

    return cardsFromAPI;
  } catch (error) {
    console.error("Error fetching sets:", error);
    throw error;
  }
}
