export function Card(props) {
  const link = `/cards/${props.card.number}`;
  return (
    // <a href={link} className="">
    <img
      // data-v-e2c950e4=""
      // loading=""
      src={props.card.image}
      // className="card max-h-[80vh] select-none border border-gray-700 hover:border-indigo-500 hover:shadow-[0px_0px_8px_3px_#6366f190] wiggle w-full"
      className="card max-h-[80vh]"
      alt={`${props.card.name} Card`}
    />
    // </a>
  );
}
