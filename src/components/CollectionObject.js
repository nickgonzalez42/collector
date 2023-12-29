import { useEffect, useState } from "react";
import { getColor } from "../functions/GetColor";

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
    // TODO Fix the image being cut off at the top after scrolling down.
    const remainingRightSpace = window.innerWidth - (mousePosition.x + 20);
    const leftPosition = remainingRightSpace < 300 ? mousePosition.x - 230 : mousePosition.x + 20;
    const remainingBottomSpace = window.innerHeight - (mousePosition.y + 20);
    const topPosition =
      remainingBottomSpace < 300 ? mousePosition.y - 240 - scrollPosition : mousePosition.y - 20 - scrollPosition;
    return (
      <img
        style={{
          position: "fixed",
          left: `${leftPosition}px`,
          top: `${topPosition}px`,
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

  const style = {
    backgroundImage: `linear-gradient(to right, ${getColor(props.card)})`,
    fontFamily: "sans-serif",
  };

  return (
    <div className="break-inside-avoid-column mt-1">
      <form key={props.card.id} style={style} className={`flex border-2 border-gray-500 items-center rounded-lg`}>
        <input
          name={props.card.id}
          defaultValue={props.card.quantity || 0}
          type="number"
          className="w-8 text-gray-800 text-center py-1 rounded-l-md"
          min={0}
          max={99}
          maxLength={2}
          onBlur={(e) => {
            props.handleForm(e);
          }}
        />
        <div className="flex-1" onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}>
          <div
            className="cursor-[zoom-in] py-1 truncate ml-1 text-left text-white grow"
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}
          >
            {props.card.number !== "DON!!" ? props.card.number : ""} {props.card.alternate ? "ALT" : ""}{" "}
            {props.card.name.slice(0, 25)}
            {props.card.name.length > 25 ? "..." : ""}
          </div>
        </div>
      </form>
      {isHovering && <HoverImage />}
    </div>
  );
}
