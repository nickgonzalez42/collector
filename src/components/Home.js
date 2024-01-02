export function Home() {
  const style = {
    backgroundImage: "url(/home0.png)",
    minHeight: "93vh",
    backgroundSize: "100% 100%",
  };

  return (
    <div
      className="flex items-center justify-center h-full w-full overflow-auto text-center bg-contain text-white"
      style={style}
    >
      {/* Overlay to prevent background image from going behind header */}
      <div className="bg-black bg-opacity-60 p-4 md:p-8 rounded-3xl relative z-10 m-2">
        <h1 className="text-xl md:text-2xl lg:text-3xl">
          <div className="text-xl md:text-3xl lg:text-4xl mt-3 mb-4">STRAW HAT STASH</div>an optcg collection website
        </h1>
        <p className="text-sm md:text-lg mt-3 mb-6">begin your journey</p>
        <a
          href="/cards"
          className="bg-gray-800 text-gray-200 hover:bg-gray-500 hover:text-white px-3 md:px-4 py-2 md:py-3 text-base md:text-lg rounded-md block mb-2 md:inline-block md:mb-0 m-2"
        >
          view cards
        </a>
        <a
          href="/collection"
          className="bg-gray-800 text-gray-200 hover:bg-gray-500 hover:text-white px-3 md:px-4 py-2 md:py-3 text-base md:text-lg rounded-md block mb-2 md:inline-block md:mb-0 m-2"
        >
          start collection
        </a>
      </div>
    </div>
  );
}
