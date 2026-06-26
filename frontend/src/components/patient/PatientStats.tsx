type PatientRecord = {
  recovery?: number;
  risk?: string;
};

const stats = [
  { label: "NEWS Score", value: "2", tone: "text-blue-600" },
  { label: "Recovery Score", value: "87%", tone: "text-emerald-600" },
  { label: "Current Risk", value: "Low", tone: "text-teal-600" },
  { label: "Device Battery", value: "92%", tone: "text-amber-500" },
];

export default function PatientStats({ patient }: { patient?: PatientRecord }) {
  const recovery = patient?.recovery ?? 87;
  const risk = patient?.risk ?? "Low";

  const cards = [
    { label: "NEWS Score", value: "2", tone: "text-blue-600" },
    { label: "Recovery Score", value: `${recovery}%`, tone: "text-emerald-600" },
    { label: "Current Risk", value: risk, tone: "text-teal-600" },
    { label: "Device Battery", value: "92%", tone: "text-amber-500" },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => (
        <article key={item.label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">{item.label}</p>
          <h2 className={`mt-3 text-4xl font-bold ${item.tone}`}>{item.value}</h2>
          <p className="mt-3 text-sm text-slate-500">Live summary from the monitoring pipeline and recovery model.</p>
        </article>
      ))}
    </section>
  );
}
