export default function AIInsights() {
  const insights = [
    { title: "Recovery probability", value: "87%", tone: "bg-emerald-50 text-emerald-700" },
    { title: "Infection risk", value: "12%", tone: "bg-blue-50 text-blue-700" },
    { title: "Predicted discharge", value: "2 days", tone: "bg-amber-50 text-amber-700" },
  ];

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">AI</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Clinical Insights</h2>
        </div>
        <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">AI model active</span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {insights.map((item) => (
          <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">{item.title}</p>
            <h3 className={`mt-3 inline-flex rounded-full px-3 py-1 text-xl font-bold ${item.tone}`}>{item.value}</h3>
            <p className="mt-3 text-sm text-slate-600">Clinical recommendations are generated from real-time vitals, recovery trends, and device signals.</p>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-3xl border border-dashed border-teal-200 bg-teal-50/60 p-5 text-slate-700">
        • Continue ambulation and monitor oxygenation.<br />
        • Reassess temperature and infection markers in 6 hours.<br />
        • Recovery trajectory remains above the ward average.
      </div>
    </section>
  );
}
