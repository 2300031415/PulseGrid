const alerts = [
  { title: "Low SpO₂ episode", time: "11:42 AM", tone: "border-rose-500 bg-rose-50" },
  { title: "Heart rate above baseline", time: "09:12 AM", tone: "border-amber-400 bg-amber-50" },
  { title: "Temperature spike observed", time: "Yesterday", tone: "border-sky-400 bg-sky-50" },
];

export default function AlertTimeline() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Monitoring</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">Alert Timeline</h2>

      <div className="mt-6 space-y-4">
        {alerts.map((item) => (
          <article key={item.title} className={`rounded-3xl border-l-4 p-4 ${item.tone}`}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              <span className="text-sm text-slate-500">{item.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
