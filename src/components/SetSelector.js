import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { searchSets } from "../graphql/queries";

export function SetSelector(props) {
  const [sets, setSets] = useState([]);
  const [releaseType, setReleaseType] = useState("BOOSTER");

  useEffect(() => {
    fetchSets();
  }, [releaseType]);

  async function fetchSets() {
    try {
      console.log(releaseType);
      let apiData = await API.graphql({
        authMode: "API_KEY",
        query: searchSets,
        variables: {
          filter: {
            releaseType: { eq: releaseType },
          },
          // sort: [{ field: "releaseOrder", direction: "asc" }],
          limit: 50,
        },
      });
      console.log(apiData);
      const setsFromAPI = apiData.data.searchSets.items;

      // TODO sort this on the server end
      setsFromAPI.sort((a, b) => parseInt(b.releaseOrder) - parseInt(a.releaseOrder));

      setSets(setsFromAPI);
      props.setSetID(setsFromAPI[0].id);
    } catch (error) {
      console.error("Error fetching sets:", error);
    }
  }

  return (
    <div>
      <select
        value={releaseType}
        onChange={(e) => {
          setReleaseType(e.target.value);
        }}
      >
        <option value={"BOOSTER"}>Boosters</option>
        <option value={"STARTER_DECK"}>Starter Deck</option>
        <option value={"GIFT_SET"}>Gift Set</option>
        <option value={"PROMO"}>Promos</option>
      </select>
      <select value={props.currentID} onChange={(e) => props.setSetID(e.target.value)}>
        {sets.map((set) => (
          <option key={set.id} value={set.id}>
            {set.name}
          </option>
        ))}
      </select>
    </div>
  );
}
