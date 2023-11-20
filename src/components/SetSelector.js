import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listSets } from "../graphql/queries";

export function SetSelector(props) {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetchSets();
  }, []);

  async function fetchSets() {
    try {
      const apiData = await API.graphql({ query: listSets, authMode: "API_KEY" });
      const setsFromAPI = apiData.data.listSets.items;

      // TODO sort this on the server end
      setsFromAPI.sort((a, b) => parseInt(b.releaseOrder) - parseInt(a.releaseOrder));

      setSets(setsFromAPI);
      props.setSetID(setsFromAPI[0].id);
    } catch (error) {
      console.error("Error fetching sets:", error);
    }
  }

  return (
    <select value={props.currentID} onChange={(e) => props.setSetID(e.target.value)}>
      {sets.map((set) => (
        <option key={set.id} value={set.id}>
          {set.name}
        </option>
      ))}
    </select>
  );
}
