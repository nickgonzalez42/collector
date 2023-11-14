import { listSets } from "../graphql/queries";
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { CardIndex } from "./CardIndex";

export function SetIndex() {
  const [sets, setSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState({});

  useEffect(() => {
    fetchSets();
  }, []);

  async function fetchSets() {
    const apiData = await API.graphql({ query: listSets });
    const setsFromAPI = apiData.data.listSets.items;
    // TODO use graphql to sort serverside
    setsFromAPI.sort((a, b) => a.name.localeCompare(b.name));
    setSets(setsFromAPI);
    setSelectedSet(setsFromAPI[0]);
  }

  return (
    <div className="w-full h-full overflow-auto container py-3 px-3 md:px-4">
      <select value={selectedSet.id} onChange={(e) => setSelectedSet(sets.find((set) => set.id === e.target.value))}>
        {sets.map((set) => (
          <option key={set.id} value={set.id}>
            {set.name}
          </option>
        ))}
      </select>
      <CardIndex setID={selectedSet.id} />
    </div>
  );
}
