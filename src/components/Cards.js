import React, { useState } from "react";
import { CardIndex } from "./CardIndex";
import { SetSelector } from "./SetSelector";

export function Cards() {
  const [setID, setSetID] = useState(null);

  function setSelectedSetID(theSetID) {
    setSetID(theSetID);
  }

  return (
    <div className="w-full h-full overflow-auto py-3 px-4 md:px-5">
      <SetSelector currentID={setID} setSetID={setSelectedSetID} />
      <CardIndex setID={setID} />
    </div>
  );
}
