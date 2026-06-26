export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.35em] text-blue-600">Reports</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Clinical Reports</h1>
        <p className="mt-3 text-slate-500">This reporting workspace supports patient summaries, ward reports, recovery analytics, and export-ready outputs for clinical review.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-4">
        {[
          ["Patient Reports", "Generate a full care summary for each monitored case."],
          ["Ward Reports", "Monitor ICU, HDU, and post-op recovery performance."],
          ["Doctor Reports", "Share insights with specialists and consultants."],
          ["Recovery Reports", "Assess discharge readiness and recovery trajectories."],
        ].map(([title, text]) => (
          <article key={title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-3 text-slate-500">{text}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-900">Export-ready reports</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Patient report",
              "Ward report",
              "Doctor report",
              "Recovery report",
              "Discharge summary",
              "Lab summary",
            ].map((item) => (
              <button key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-slate-700 hover:border-blue-200 hover:bg-blue-50">{item}</button>
            ))}
          </div>
        </article>

        <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-900">Reporting status</h2>
          <ul className="mt-5 space-y-3 text-slate-700">
            {[
              "PDF export is ready for patient and ward summaries.",
              "Excel export supports weekly recovery analytics.",
              "Integration hooks are ready for the reporting engine and audit logs.",
            ].map((item) => <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">{item}</li>)}
          </ul>
        </article>
      </section>
    </div>
  );
}
