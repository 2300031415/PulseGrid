export default function LiveMonitoringPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-600">Doctor workspace</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Live Monitoring</h1>
        <p className="mt-3 text-slate-500">This intensive ICU view combines active patients, telemetry health, ECG stream readiness, and ward-level status for quick triage.</p>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        {[
          ["ICU Watch", "12 patients currently under active observation.", "text-rose-600"],
          ["Telemetry Health", "All sensors are reporting stable packets and gateway latency is under 2 seconds.", "text-emerald-600"],
          ["Gateway Status", "ESP32 + MAX30102 + AD8232 cluster online for live device streaming.", "text-blue-600"],
        ].map(([title, text, tone]) => (
          <article key={title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-3 text-slate-500">{text}</p>
            <span className={`mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${tone}`}>Live</span>
          </article>
        ))}
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-900">Active patients</h2>
          <div className="mt-5 space-y-3">
            {[
              ["P-1049", "Lakshmi Menon", "ICU-A", "HR 82 • SpO₂ 98%", "Critical"],
              ["P-1051", "Arjun Sharma", "ICU-B", "HR 76 • Temp 36.8", "Stable"],
              ["P-1058", "Meera Iyer", "CCU", "HR 91 • SpO₂ 94%", "Warning"],
            ].map(([id, name, ward, vitals, status]) => (
              <div key={id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-slate-900">{name} • {id}</p>
                  <p className="text-sm text-slate-500">{ward} • {vitals}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status === "Critical" ? "bg-rose-50 text-rose-700" : status === "Warning" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{status}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-900">Monitoring readiness</h2>
          <ul className="mt-5 space-y-3 text-slate-700">
            {[
              "Live ECG stream support via AD8232 sensor integration",
              "Redis-backed latest vitals cache for fast dashboard refresh",
              "Socket.IO events for alerts, device status, and AI predictions",
              "Multi-hospital orchestration for ICU, HDU, and post-op wards",
            ].map((item) => <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">{item}</li>)}
          </ul>
        </article>
      </section>
    </div>
  );
}
