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
    let direction = "desc";
    if (releaseType === "GIFT_SET" || releaseType === "PROMO") {
      direction = "asc";
    }
    try {
      let apiData = await API.graphql({
        authMode: "API_KEY",
        query: searchSets,
        variables: {
          filter: {
            releaseType: { eq: releaseType },
          },
          sort: [{ field: "name", direction: direction }],
          limit: 50,
        },
      });
      const setsFromAPI = apiData.data.searchSets.items;

      setSets(setsFromAPI);
      props.setSetID(setsFromAPI[0].id);
    } catch (error) {
      console.error("Error fetching sets:", error);
    }
  }

  return (
    <div className="flex items-center space-x-4" style={{ fontFamily: "sans-serif" }}>
      <div className="relative inline-flex">
        <select
          value={releaseType}
          onChange={(e) => {
            setReleaseType(e.target.value);
          }}
          className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-5 leading-tight focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value={"BOOSTER"}>Boosters</option>
          <option value={"STARTER_DECK"}>Starter Deck</option>
          <option value={"GIFT_SET"}>Gift Set</option>
          <option value={"PROMO"}>Promos</option>
        </select>
      </div>
      <div className="relative inline-flex">
        <select
          value={props.currentID}
          onChange={(e) => props.setSetID(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-5 leading-tight focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {sets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
