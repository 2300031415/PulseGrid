type PatientRecord = {
  id?: string;
  name?: string;
  age?: number;
  ward?: string;
  room?: string;
  doctor?: string;
  status?: string;
  condition?: string;
};

export default function PatientHeader({ patient }: { patient?: PatientRecord }) {
  const current = patient ?? {};

  const meta = [
    { label: "Name", value: current.name ?? "Lakshmi Menon" },
    { label: "ID", value: current.id ?? "P-1049" },
    { label: "Ward", value: current.ward ?? "Post-Op" },
    { label: "Bed", value: current.room ?? "E-01" },
    { label: "Doctor", value: current.doctor ?? "Dr. Sarah Johnson" },
    { label: "Status", value: current.status ?? "Stable" },
  ];

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-600">Patient Command Center</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 lg:text-4xl">{current.name ?? "Lakshmi Menon"}</h1>
          <p className="mt-3 text-slate-500">Female • {current.age ?? 55} years • {current.condition ?? "Post-Laparoscopic Cholecystectomy"} • Room {current.room ?? "E-01"}</p>
          <p className="mt-4 text-slate-600">This workspace is built to accept real-time telemetry from connected devices, AI predictions, and the hospital monitoring pipeline without redesigning the screen later.</p>
        </div>

        <div className="rounded-[24px] border border-emerald-100 bg-emerald-50/80 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-emerald-700">{current.status ?? "Stable"} • Active monitoring</span>
          </div>
          <p className="mt-4 text-sm text-slate-500">Attending consultant</p>
          <p className="text-lg font-semibold text-slate-900">{current.doctor ?? "Dr. Sarah Johnson"}</p>
          <p className="text-sm text-slate-500">Cardiologist • City General Hospital</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {meta.map((item) => (
          <article key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">{item.value}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
