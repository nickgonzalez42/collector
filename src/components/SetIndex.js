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
    setSets(setsFromAPI);
    setSelectedSet(setsFromAPI[0]);
  }

  function test() {
    console.log(selectedSet.name);
    console.log(selectedSet.id);
  }

  return (
    <>
      <select value={selectedSet.id} onChange={(e) => setSelectedSet(sets.find((set) => set.id === e.target.value))}>
        {sets.map((set) => (
          <option key={set.id} value={set.id}>
            {set.name}
          </option>
        ))}
      </select>
      <p>{selectedSet.name}</p>
      <button onClick={test}>TEST</button>
      <CardIndex setID={selectedSet.id} />
    </>
  );
}
