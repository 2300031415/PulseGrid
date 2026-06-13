"use client";

import { useEffect, useState } from "react";

export default function LabDashboardPage() {
  const [data, setData] = useState({ title: "Lab Technician Portal", summary: "Diagnostics queue, test turnaround, and sample progress tracking.", stats: [], alerts: [], tasks: [], identity: { name: "Ravi Thomas", department: "Clinical Chemistry", shift: "Morning" }, notifications: [] });

  useEffect(() => {
    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("pulsegrid_user") || "{}") : {};
    const query = user.email ? `?email=${encodeURIComponent(user.email)}` : "";

    fetch(`/api/roles/lab${query}`)
      .then((res) => res.json())
      .then((resData) => setData((prev) => ({ ...prev, ...resData })))
      .catch(() => undefined);
  }, []);

  return (
    <main className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-600">Lab portal</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{data.title}</h1>
        <p className="mt-3 text-slate-500">{data.summary}</p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600"><span className="rounded-full bg-blue-50 px-3 py-1">{data.identity.name}</span><span className="rounded-full bg-slate-100 px-3 py-1">{data.identity.department}</span><span className="rounded-full bg-slate-100 px-3 py-1">Shift {data.identity.shift}</span></div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">{data.stats.map((item: any) => <article key={item.label} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"><p className="text-sm text-slate-500">{item.label}</p><h2 className="mt-3 text-3xl font-bold text-blue-700">{item.value}</h2><p className="mt-2 text-sm text-slate-500">{item.detail}</p></article>)}</section>
      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"><h2 className="text-xl font-semibold text-slate-900">Diagnostics queue</h2><div className="mt-5 space-y-3">{data.alerts.map((item: any) => <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="font-semibold text-slate-900">{item.title}</p><p className="text-sm text-slate-500">{item.patient}</p><p className="mt-1 text-sm text-slate-600">{item.detail}</p></div>)}</div></article>
        <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"><h2 className="text-xl font-semibold text-slate-900">Lab actions</h2><ul className="mt-5 space-y-3">{data.tasks.map((item: string) => <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">{item}</li>)}</ul></article>
      </section>
    </main>
  );
}
