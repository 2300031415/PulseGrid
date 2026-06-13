export default function DoctorNotes() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Clinical notes</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Doctor Notes</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">Updated 09:30 AM</span>
      </div>

      <div className="mt-6 space-y-4">
        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Assessment</p>
          <p className="mt-2 text-slate-700">Patient is recovering well after surgery. Alert thresholds remain stable. Continue routine monitoring and encourage mobility progression.</p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Follow-up plan</p>
          <p className="mt-2 text-slate-700">Reassess temperature and pain response in 4 hours. Keep IV fluids conservative and confirm discharge readiness tomorrow morning.</p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">AI note</p>
          <p className="mt-2 text-slate-700">Recovery score is above ward average. Infection risk remains low, but monitor any sudden increase in respiratory rate.</p>
        </article>
      </div>
    </section>
  );
}
