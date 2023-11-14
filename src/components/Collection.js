import { useAuthenticator, Heading } from "@aws-amplify/ui-react";
import { SetIndex } from "./Cards";

export function Collection() {
  const { route } = useAuthenticator((context) => [context.route]);

  const body = (
    <div className="w-full h-full overflow-auto py-3 px-3 md:px-4">
      {/* <div className="flex"> */}
      <div className="relative inline-block">
        <select>
          <option>Choice</option>
          <option>Choice</option>
          <option>Choice</option>
        </select>
        {/* </div> */}
        <div className="grow text-right"></div>
      </div>
      <div className="mt-2 columns-1 md:columns-2 xl:columns-3 2xl:columns-4 gap-1">
        {/* for each at this level */}
        <div className="mb-0.5 flex border items-center bg-[#672900] border-[#de9922]">
          <input type="number" className="w-8 text-gray-800 text-center py-1" min={0} max={99} maxLength={2} />
          <button className="cursor-[zoom-in] py-1 truncate ml-1 text-left text-white grow">Card Name</button>
        </div>
        <div className="mb-0.5 flex border items-center bg-[#672900] border-[#de9922]">
          <input type="number" className="w-8 text-gray-800 text-center py-1" min={0} max={99} maxLength={2} />
          <button className="cursor-[zoom-in] py-1 truncate ml-1 text-left text-white grow">Card Name</button>
        </div>
        <div className="mb-0.5 flex border items-center bg-[#672900] border-[#de9922]">
          <input type="number" className="w-8 text-gray-800 text-center py-1" min={0} max={99} maxLength={2} />
          <button className="cursor-[zoom-in] py-1 truncate ml-1 text-left text-white grow">Card Name</button>
        </div>
        <div className="mb-0.5 flex border items-center bg-[#672900] border-[#de9922]">
          <input type="number" className="w-8 text-gray-800 text-center py-1" min={0} max={99} maxLength={2} />
          <button className="cursor-[zoom-in] py-1 truncate ml-1 text-left text-white grow">Card Name</button>
        </div>
      </div>
    </div>
  );

  const message = route === "authenticated" ? body : <Heading level={1}>{"Loading"}</Heading>;

  return message;
}
