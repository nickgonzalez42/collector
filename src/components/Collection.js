import { useState } from "react";
import { SetSelector } from "./SetSelector";
import { CollectionIndex } from "./CollectionIndex.1";

export function Collection() {
  const [setID, setSetID] = useState(null);

  function setSelectedSetID(theSetID) {
    setSetID(theSetID);
  }

  return (
    <div className="w-full h-full overflow-auto py-3 px-3 md:px-4">
      <div className="relative inline-block">
        <SetSelector currentID={setID} setSetID={setSelectedSetID} />
      </div>
      <CollectionIndex setID={setID} />
    </div>
  );
}
