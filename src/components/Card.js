export function Card(props) {
  const link = `/cards/${props.card.number}`;
  return (
    <a href={link} className="group h-full w-full relative cursor-zoom-in">
      <img
        className="max-h-[80vh] select-none rounded-3xl border hover:shadow-[0px_0px_8px_3px_#6366f190] w-full"
        src={props.card.image}
        alt={`${props.card.name} Card`}
      />
    </a>
  );
}
