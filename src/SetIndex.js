import { listSets } from "./graphql/queries";
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { CardIndex } from "./CardIndex";

export function SetIndex() {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetchSets();
  }, []);

  async function fetchSets() {
    const apiData = await API.graphql({ query: listSets });
    const setsFromAPI = apiData.data.listSets.items;
    setSets(setsFromAPI);
  }

  return (
    <>
      {sets.map((set) => (
        <>
          <p>{set.name}</p>
          <CardIndex setId={set.id} />
        </>
      ))}
    </>
  );
}
