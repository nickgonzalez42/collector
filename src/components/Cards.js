import { listSets } from "../graphql/queries";
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { CardIndex } from "./CardIndex";
import { SetSelector } from "./SetSelector";

export function Cards() {
  const [setID, setSetID] = useState(null);

  function setSelectedSetID(theSetID) {
    setSetID(theSetID);
  }

  return (
    <div className="w-full h-full overflow-auto py-3 px-3 md:px-4">
      <SetSelector currentID={setID} setSetID={setSelectedSetID} />
      <CardIndex setID={setID} />
    </div>
  );
}
