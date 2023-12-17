import { useEffect, useState } from "react";

const colors = {
  red: "#932224",
  yellow: "#ece048",
  black: "#232122",
  purple: "#83438d",
  blue: "#2284bd",
  green: "#218c6a",
};

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

  // TODO Order the colors correctly
  const getColor = () => {
    const arr = props.card.color;
    if (props.card.name === "DON!!") {
      return `${colors.black}, ${colors.black}`;
    }
    if (props.card.color.length > 1) {
      let c = "";
      for (let i = 0; i < props.card.color.length; i++) {
        console.log(props.card.color[i]);
        if (arr[i] === "BLUE") {
          c += colors.blue;
        } else if (arr[i] === "BLACK") {
          c += colors.black;
        } else if (arr[i] === "GREEN") {
          c += colors.green;
        } else if (arr[i] === "YELLOW") {
          c += colors.yellow;
        } else if (arr[i] === "PURPLE") {
          c += colors.purple;
        } else if (arr[i] === "RED") {
          c += colors.red;
        }
      }
      // if (arr.includes("BLUE")) c += colors.blue;
      // if (arr.includes("BLACK")) c += colors.black;
      // if (arr.includes("GREEN")) c += colors.green;
      // if (arr.includes("YELLOW")) c += colors.yellow;
      // if (arr.includes("PURPLE")) c += colors.purple;
      // if (arr.includes("RED")) c += colors.red;
      return c.slice(0, 7) + ", " + c.slice(7);
    }
    if (arr.includes("BLUE")) return `${colors.blue}, ${colors.blue}`;
    else if (arr.includes("BLACK")) return `${colors.black}, ${colors.black}`;
    else if (arr.includes("GREEN")) return `${colors.green}, ${colors.green}`;
    else if (arr.includes("YELLOW")) return `${colors.yellow}, ${colors.yellow}`;
    else if (arr.includes("PURPLE")) return `${colors.purple}, ${colors.purple}`;
    else if (arr.includes("RED")) return `${colors.red}, ${colors.red}`;
    // Default background color if no specific color is found
    return "bg-[#672900]";
  };

  const style = {
    backgroundImage: `linear-gradient(to right, ${getColor()})`,
  };

  return (
    <div>
      <form key={props.card.id} style={style} className={`mb-0.5 flex border items-center`}>
        <input type="number" className="w-8 text-gray-800 text-center py-1" min={0} max={99} maxLength={2} />
        <div className="flex-1" onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}>
          <div className="cursor-[zoom-in] py-1 truncate ml-1 text-left text-white grow">
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
