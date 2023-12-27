import { Storage } from "aws-amplify";
import { useState, useEffect } from "react";

export function Home() {
  const [background, setBackground] = useState("");

  useEffect(() => {
    async function fetchBackground() {
      const numberOfBackgrounds = 10;
      const random = Math.floor(Math.random() * numberOfBackgrounds);
      const image = `static/home${random}.png`;
      console.log(image);
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
      className="flex items-center justify-center h-full w-full overflow-auto text-center bg-cover text-white"
      style={style}
    >
      {/* Overlay to prevent background image from going behind header */}
      <div className="bg-black bg-opacity-60 p-8 rounded-md relative z-10">
        <h1 className="text-4xl lg:text-6xl font-bold">
          A deck building website for
          <div className="text-8xl mt-1">One Piece TCG</div>
        </h1>
        <p className="lg:text-lg mt-10 mb-8">Browse decks or create your own!</p>
        <a
          href="/builder"
          className="bg-indigo-700 text-gray-200 hover:bg-indigo-500 hover:text-white px-4 py-3 text-xl rounded-md"
        >
          Create a deck
        </a>
        <a
          href="decks"
          className="bg-indigo-700 text-gray-200 ml-4 hover:bg-indigo-500 hover:text-white px-4 py-3 text-xl rounded-md"
        >
          Browse decks
        </a>
      </div>
    </div>
  );
}
