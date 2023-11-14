import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listSets } from "../graphql/queries";

export function SetSelector(props) {
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
    props.setSetID(setsFromAPI[0].id);
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
