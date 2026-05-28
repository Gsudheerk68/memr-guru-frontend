export default function Trending() {

  const trending = [
    "Pushpa",
    "Salaar",
    "KGF",
    "Brahmanandam Reactions"
  ];

  return (
    <div className="p-10">

      <h1 className="text-4xl mb-5">
        Trending Templates
      </h1>

      {trending.map((item,index)=>(
        <div
          key={index}
          className="border p-4 my-3"
        >
          {item}
        </div>
      ))}

    </div>
  );
}
