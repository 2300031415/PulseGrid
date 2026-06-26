export default function SummaryCards() {
  const cards = [
    {
      title: "NEWS Score",
      value: "2",
      color: "text-blue-600",
    },
    {
      title: "Recovery Score",
      value: "87%",
      color: "text-green-600",
    },
    {
      title: "Current Risk",
      value: "Low",
      color: "text-teal-600",
    },
    {
      title: "Battery",
      value: "92%",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white border border-slate-200 rounded-2xl p-6"
        >
          <p className="text-slate-500">
            {card.title}
          </p>

          <h3 className={`text-4xl font-bold mt-3 ${card.color}`}>
            {card.value}
          </h3>
        </div>
      ))}

    </div>
  );
}