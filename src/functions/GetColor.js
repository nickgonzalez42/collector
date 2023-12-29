const colors = {
  red: "#932224",
  yellow: "#d4d135",
  black: "#232122",
  purple: "#83438d",
  blue: "#2284bd",
  green: "#218c6a",
};

export const getColor = (card) => {
  const arr = card.color;
  if (card.name === "DON!!") {
    return `${colors.black}, ${colors.black}`;
  }
  if (card.color.length > 1) {
    let c = "";
    for (let i = 0; i < card.color.length; i++) {
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
    return c.slice(0, 7) + ", " + c.slice(7);
  }
  if (arr.includes("BLUE")) return `${colors.blue}, ${colors.blue}`;
  else if (arr.includes("BLACK")) return `${colors.black}, ${colors.black}`;
  else if (arr.includes("GREEN")) return `${colors.green}, ${colors.green}`;
  else if (arr.includes("YELLOW")) return `${colors.yellow}, ${colors.yellow}`;
  else if (arr.includes("PURPLE")) return `${colors.purple}, ${colors.purple}`;
  else if (arr.includes("RED")) return `${colors.red}, ${colors.red}`;
  // Default background color if no specific color is found
  return "#672900";
};
