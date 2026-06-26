"use client";

import { useEffect, useState } from "react";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    { id: 1, title: "Loading alerts…", patient: "", severity: "Info", time: "" },
  ]);

  useEffect(() => {
    fetch("/api/doctor/alerts")
      .then((res) => res.json())
      .then(setAlerts)
      .catch(() => undefined);
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.35em] text-rose-500">Alert Center</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Critical Alerts</h1>
        <p className="mt-3 text-slate-500">This dedicated alerts workspace consolidates critical cases, warning signals, and resolved events for rapid triage and escalation.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {[
          ["Critical", "6", "Immediate ICU review needed"],
          ["Warnings", "11", "Moderate risk trend this shift"],
          ["Resolved", "24", "Stable cases closed today"],
        ].map(([label, value, detail]) => (
          <article key={label} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <p className="text-sm text-slate-500">{label}</p>
            <h2 className="mt-3 text-3xl font-bold text-rose-600">{value}</h2>
            <p className="mt-2 text-sm text-slate-500">{detail}</p>
          </article>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        {alerts.map((item) => (
          <article key={item.id} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">{item.severity}</span>
            </div>
            <p className="mt-3 text-slate-500">{item.patient} • {item.time}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">Acknowledge</button>
              <button className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Escalate</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
