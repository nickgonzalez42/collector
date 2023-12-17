import { useState } from "react";
import { SetSelector } from "./SetSelector";
import { CollectionIndex } from "./CollectionIndex";
import { API } from "aws-amplify";
import { listCollectionCards } from "../graphql/queries";
import { createCollectionCard, updateCollectionCard } from "../graphql/mutations";

export function Collection() {
  const [setID, setSetID] = useState(null);
  const [collection, setCollection] = useState([]);

  function setSelectedSetID(theSetID) {
    setSetID(theSetID);
  }

  async function processCollectionCardForm(event) {
    try {
      const cardID = "c364cc6e-aa05-44a3-8487-69ac9196dcf1";

      const input = {
        cardID: cardID,
        quantity: parseInt(event.target.value), // Assuming you want to use the input value as quantity
        // Add other fields as needed
      };

      const apiData = await API.graphql({
        query: createCollectionCard,
        variables: {
          input: input,
          condition: null, // You can provide a condition if needed
        },
      });

      console.log("Card created:", apiData.data.createCollectionCard);
    } catch (error) {
      console.error("Error creating card:", error);
    }
  }

  return (
    <div className="w-full h-full overflow-auto py-3 px-3 md:px-4">
      <div className="relative inline-block">
        <form>
          <input
            name="TEST"
            type="number"
            className="w-8 text-gray-800 text-center py-1"
            min={0}
            max={99}
            maxLength={2}
            onChange={(e) => {
              processCollectionCardForm(e);
            }}
          />
        </form>
        <SetSelector currentID={setID} setSetID={setSelectedSetID} />
      </div>
      <CollectionIndex setID={setID} />
    </div>
  );
}
