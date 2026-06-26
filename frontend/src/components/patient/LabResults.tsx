const results = [
  { name: "CRP", value: "8.2 mg/L", note: "Mild inflammation" },
  { name: "WBC", value: "7.1 K/uL", note: "Within normal range" },
  { name: "Hemoglobin", value: "13.4 g/dL", note: "Stable recovery" },
];

export default function LabResults() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Lab</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">Latest Lab Results</h2>

      <div className="mt-6 space-y-3">
        {results.map((item) => (
          <article key={item.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
              <span className="text-lg font-bold text-teal-700">{item.value}</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
