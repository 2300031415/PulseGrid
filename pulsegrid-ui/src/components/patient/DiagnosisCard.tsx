type PatientRecord = {
  condition?: string;
  doctor?: string;
  risk?: string;
};

export default function DiagnosisCard({ patient }: { patient?: PatientRecord }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Clinical summary</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Diagnosis & Treatment</h2>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">Post-op recovery</span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Diagnosis</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{patient?.condition ?? "Post Laparoscopic Cholecystectomy"}</h3>
          <p className="mt-3 text-slate-600">The patient is recovering after gallbladder removal surgery with stable vitals and no current signs of complication.</p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Admission Reason</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Gallbladder Removal Surgery</h3>
          <p className="mt-3 text-slate-600">Current status is stable. Monitor for pain management, oxygenation, and recovery trend against baseline.</p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Current Treatment</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Post-op pain care + ambulation support</h3>
          <p className="mt-3 text-slate-600">Pain relief, hydration, and post-op mobility plan are ongoing. AI recommendations suggest maintaining current care.</p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Risk Category</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{patient?.risk ?? "Low"} risk • discharge readiness improving</h3>
          <p className="mt-3 text-slate-600">Recovery score is trending above the ward average and the patient remains under regular observation.</p>
        </article>
      </div>
    </section>
  );
}
