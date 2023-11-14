export function Home() {
  return (
    <div className="w-full h-full overflow-auto py-3 px-3 md:px-4 text-center bg-gradient-to-tl from-pink-950 via-indigo-950 to-blue-950 text-white">
      <h1 className="mt-40 text-2xl lg:text-4xl font-bold">
        A deck building website for <div className="text-6xl lg:text-8xl mt-1">One Piece TCG</div>
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
  );
}
