const medication = [
  { name: "Paracetamol", time: "08:00 AM", note: "Pain relief" },
  { name: "Antibiotic", time: "01:00 PM", note: "Post-op care" },
  { name: "Vitamin D", time: "08:00 PM", note: "Daily supplement" },
];

export default function MedicationSchedule() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Care plan</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">Medication Schedule</h2>

      <div className="mt-6 space-y-3">
        {medication.map((item) => (
          <article key={item.name} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
              <p className="text-sm text-slate-500">{item.note}</p>
            </div>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">{item.time}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
