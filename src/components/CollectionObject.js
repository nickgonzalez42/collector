import { useEffect, useState } from "react";

export function CollectionObject(props) {
  const [isHovering, setIsHovering] = useState(false);
  // const [mousePos, setMousePos] = useState({});

  const HoverableDiv = ({ handleMouseOver, handleMouseOut }) => {
    return <button className="cursor-[zoom-in] py-1 truncate ml-1 text-left text-white grow">{props.card.name}</button>;
  };

  const HoverText = () => {
    return (
      <div>
        <img src={props.card.image} alt={`${props.card.name} Card`} />
      </div>
    );
  };

  const handleMouseOver = () => {
    console.log("IN");
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    console.log("OUT");
    setIsHovering(false);
  };

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     setMousePos({ x: event.clientX, y: event.clientY });
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, [isHovering]);

  return (
    <div>
      <form
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        key={props.card.id}
        className="mb-0.5 flex border items-center bg-[#672900] border-[#de9922]"
      >
        <input type="number" className="w-8 text-gray-800 text-center py-1" min={0} max={99} maxLength={2} />
        <HoverableDiv handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut} />
        {isHovering && <HoverText />}
      </form>
    </div>
  );
}
