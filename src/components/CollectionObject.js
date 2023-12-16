import { useEffect, useState } from "react";

export function CollectionObject(props) {
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.pageX, y: e.pageY });
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const HoverImage = () => {
    return (
      <img
        style={{
          position: "fixed",
          left: `${mousePosition.x + 20}px`,
          top: `${mousePosition.y - 20 - scrollPosition}px`,
          height: `300px`,
        }}
        className="rounded-2xl"
        src={props.card.image}
        alt={`${props.card.name} Card`}
      />
    );
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div>
      <form key={props.card.id} className="mb-0.5 flex border items-center bg-[#672900] border-[#de9922]">
        <input type="number" className="w-8 text-gray-800 text-center py-1" min={0} max={99} maxLength={2} />
        <div className="flex-1" onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}>
          <div className="cursor-[zoom-in] py-1 truncate ml-1 text-left text-white grow">{props.card.name}</div>
        </div>
      </form>
      {isHovering && <HoverImage />}
    </div>
  );
}
