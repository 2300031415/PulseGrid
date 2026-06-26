const trends = [
  { label: "Heart Rate", value: "82 bpm", change: "+4% vs baseline", color: "text-rose-500" },
  { label: "SpO₂", value: "98%", change: "Stable", color: "text-teal-600" },
  { label: "Temperature", value: "36.8°C", change: "Normal", color: "text-amber-500" },
  { label: "Respiration", value: "18/min", change: "Steady", color: "text-cyan-600" },
];

export default function TrendCard() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Trend analysis</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">24 Hour Trends</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">Live telemetry</span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {trends.map((item) => (
          <article key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">{item.label}</p>
            <h3 className={`mt-3 text-3xl font-bold ${item.color}`}>{item.value}</h3>
            <p className="mt-2 text-sm text-slate-500">{item.change}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#f8fbfc_0%,#edf7f7_100%)] p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Telemetry map</p>
            <p className="mt-2 text-slate-600">HR and oxygenation remain within the expected recovery window.</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Stable trend</span>
        </div>

        <svg viewBox="0 0 800 140" className="mt-5 h-[140px] w-full" aria-label="Trend visualization">
          <path d="M0 95 C40 110, 70 55, 120 60 S220 120, 280 85 S360 30, 420 50 S520 130, 580 75 S660 30, 740 40 S780 58, 800 36" fill="none" stroke="#14b8a6" strokeWidth="4" strokeLinecap="round" />
          <path d="M0 110 C50 98, 110 80, 160 88 S260 126, 320 101 S430 43, 490 58 S580 126, 640 97 S730 60, 800 72" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        </svg>
      </div>
    </section>
  );
}
