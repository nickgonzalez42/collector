import { useState } from "react";
import { SetSelector } from "./SetSelector";
import { CollectionIndex } from "./CollectionIndex";

export function Collection() {
  const [setID, setSetID] = useState(null);

  function setSelectedSetID(theSetID) {
    setSetID(theSetID);
  }

  return (
    <div className="w-full h-full overflow-auto py-3 px-3 md:px-4">
      <div className="relative inline-block">
        <SetSelector currentID={setID} setSetID={setSelectedSetID} />
        <div className="grow text-right"></div>
      </div>
      <CollectionIndex setID={setID} />
    </div>
  );

  // const [setID, setSetID] = useState("");
  // const [cards, setCards] = useState([]);
  // // const { route } = useAuthenticator((context) => [context.route]);

  // useEffect(() => {
  //   fetchCardsBySet();
  // }, [setID]);

  // function setSelectedSetID(theSetID) {
  //   setSetID(theSetID);
  //   console.log(theSetID);
  // }

  // // TODO refactor this and CardIndex
  // async function fetchCardsBySet() {
  //   if (!setID) {
  //     return;
  //   }
  //   // get card data
  //   const apiData = await API.graphql({
  //     query: cardsBySetID,
  //     variables: {
  //       setID: setID,
  //     },
  //   });
  //   const cardsFromAPI = apiData.data.cardsBySetID.items;
  //   cardsFromAPI.sort((a, b) => a.number.localeCompare(b.number));
  //   // get card images
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
  //   console.log(cards);
  // }

  // // const message = route === "authenticated" ? body : <Heading level={1}>{"Loading"}</Heading>;

  // return (
  // <div className="w-full h-full overflow-auto py-3 px-3 md:px-4">
  //   <div className="relative inline-block">
  //     <SetSelector currentID={setID} setSetID={setSelectedSetID} />
  //     <div className="grow text-right"></div>
  //   </div>
  //   <div className="mt-2 columns-1 md:columns-2 xl:columns-3 2xl:columns-4 gap-1">
  //     {cards.map((card) => (
  //       <div key={card.id} className="mb-0.5 flex border items-center bg-[#672900] border-[#de9922]">
  //         <input type="number" className="w-8 text-gray-800 text-center py-1" min={0} max={99} maxLength={2} />
  //         <button className="cursor-[zoom-in] py-1 truncate ml-1 text-left text-white grow">{card.name}</button>
  //       </div>
  //     ))}
  //   </div>
  // </div>;
  // );
}
