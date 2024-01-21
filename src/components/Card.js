export function Card(props) {
  const link = `/card/${props.card.number}`;

  return (
    <a href={link} className="group h-full w-full relative cursor-zoom-in">
      <img
        className={`max-h-[80vh] select-none rounded-3xl hover:shadow-[0px_0px_8px_3px_#a48b47] w-full`}
        src={props.card.image}
        alt={`${props.card.name} Card`}
      />
    </a>
  );
}
