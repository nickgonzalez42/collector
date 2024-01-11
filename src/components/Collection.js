import { useEffect, useState } from "react";
import { SetSelector } from "./SetSelector";
import { CollectionIndex } from "./CollectionIndex";
import { API } from "aws-amplify";
import { searchCollectionCards } from "../graphql/queries";
import { createCollectionCard, updateCollectionCard, deleteCollectionCard } from "../graphql/mutations";

export function Collection() {
  const [setID, setSetID] = useState(null);
  const [collection, setCollection] = useState([]);
  const [collectionLive, setCollectionLive] = useState(false);

  //TODO Fix the issue where if you update for the first time, several times, you makes several new Collection Cards

  useEffect(() => {
    getCollection();
  }, [setID]);

  function setSelectedSetID(theSetID) {
    setSetID(theSetID);
  }

  async function getCollection() {
    if (setID === null) {
      return;
    }
    setCollectionLive(false);
    // TODO, run a while loop to get all collection objects or add setID to collectionCard to only get those
    let objectsFromAPI = [];

    try {
      let apiData = await API.graphql({
        query: searchCollectionCards,
        variables: {
          filter: {
            setID: { eq: setID },
          },
          limit: 50,
        },
      });
      while (apiData.data.searchCollectionCards.nextToken) {
        objectsFromAPI = objectsFromAPI.concat(apiData.data.searchCollectionCards.items);
        apiData = await API.graphql({
          query: searchCollectionCards,
          variables: {
            filter: {
              setID: { eq: setID },
            },
            nextToken: apiData.data.searchCollectionCards.nextToken,
            limit: 50,
          },
        });
      }
      const uniqueObjects = await removeAndDeleteDuplicates(objectsFromAPI, "cardID");
      setCollection(uniqueObjects);
      setCollectionLive(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeAndDeleteDuplicates(array, property) {
    const uniqueObjects = [];
    const duplicateObjects = [];

    array.forEach((obj, index, self) => {
      if (index === self.findIndex((o) => o[property] === obj[property])) {
        uniqueObjects.push(obj);
      } else {
        duplicateObjects.push(obj);
      }
    });

    // Perform GraphQL mutations to delete duplicates from the database
    for (const duplicateObj of duplicateObjects) {
      try {
        await API.graphql({
          query: deleteCollectionCard, // Replace with your actual mutation for deleting a collection card
          variables: {
            input: { id: duplicateObj.id }, // Assuming there's an 'id' property for each object
          },
        });
      } catch (mutationError) {
        console.log("Error deleting duplicate:", mutationError);
      }
    }

    return uniqueObjects;
  }

  async function processCollectionCardForm(event) {
    const cardID = event.target.name;
    const collectionObject = collection.find((item) => item.cardID === cardID);
    if (collectionObject) {
      try {
        const input = {
          id: collectionObject.id,
          // cardID: cardID,
          quantity: parseInt(event.target.value),
          // Add other fields as needed
        };

        const apiData = await API.graphql({
          query: updateCollectionCard, // Use the imported mutation
          variables: {
            input: input,
            condition: null,
          },
        });
        // console.log("Card updated:", apiData.data.updateCollectionCard);
      } catch (error) {
        console.error("Error updating card:", error);
      }
    } else {
      try {
        const input = {
          cardID: cardID,
          quantity: parseInt(event.target.value),
          setID: setID,
        };

        const apiData = await API.graphql({
          query: createCollectionCard,
          variables: {
            input: input,
            condition: null,
          },
        });

        // console.log("Card created:", apiData.data.createCollectionCard);
        setCollection(collection.concat(apiData.data.createCollectionCard));
        // console.log(collection);
      } catch (error) {
        console.error("Error creating card:", error);
      }
    }
  }

  return (
    <div className="w-full h-full overflow-auto py-3 px-3 md:px-4">
      <div className="relative inline-block">
        <SetSelector currentID={setID} setSetID={setSelectedSetID} />
      </div>
      {collectionLive ? (
        <CollectionIndex handleForm={processCollectionCardForm} collection={collection} setID={setID} />
      ) : (
        <>Loading</>
      )}
    </div>
  );
}
