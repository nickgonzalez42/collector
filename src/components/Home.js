import { Storage } from "aws-amplify";
import { useState, useEffect } from "react";

export function Home() {
  const [background, setBackground] = useState("");

  useEffect(() => {
    async function fetchBackground() {
      // Use for randomized background
      // const numberOfBackgrounds = 10;
      // const random = Math.floor(Math.random() * numberOfBackgrounds);
      const image = `static/home0.png`;
      // const image = `static/home${random}.png`;
      const url = await Storage.get(image);
      setBackground(url);
    }
    fetchBackground();
  }, []);

  const style = {
    backgroundImage: `url(${background})`,
    minHeight: "93vh",
    backgroundSize: "100% 100%",
  };

  return (
    <div
      className="flex items-center justify-center h-full w-full overflow-auto text-center bg-contain text-white"
      style={style}
    >
      {/* Overlay to prevent background image from going behind header */}
      <div className="bg-black bg-opacity-60 p-8 rounded-3xl relative z-10">
        <h1 className="text-l md:text-xl lg:text-2xl font-bold">
          <div className="text-3xl md:text-4xl lg:text-5xl mt-3 mb-4">STRAW HAT STASH</div>an optcg collection website
        </h1>
        <p className="text-md lg:text-lg mt-5 mb-8">Begin your journey</p>
        <a
          href="/cards"
          className="bg-gray-800 text-gray-200 hover:bg-gray-500 hover:text-white px-4 py-3 text-l rounded-md"
        >
          view cards
        </a>
        <a
          href="/collection"
          className="bg-gray-800 text-gray-200 ml-4 hover:bg-gray-500 hover:text-white px-4 py-3 text-l rounded-md"
        >
          start collection
        </a>
      </div>
    </div>
  );
}
