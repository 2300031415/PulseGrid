"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/doctor/alerts")
      .then((res) => res.json())
      .then(setAlerts)
      .catch(() => undefined);
  }, []);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-teal-600">PulseGrid Doctor Workspace</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 lg:text-4xl">Doctor Dashboard</h1>
          <p className="mt-2 text-slate-500">Dr. Sarah Johnson • Cardiologist • City General Hospital</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label className="relative block min-w-[280px] flex-1 lg:min-w-[340px]">
            <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
            <input
              placeholder="Search patients or wards..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-teal-200 focus:bg-white"
            />
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              aria-label="Open notifications"
            >
              <Bell size={18} />
              {alerts.length > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                  {alerts.length}
                </span>
              ) : null}
            </button>

            {open ? (
              <div className="absolute right-0 z-20 mt-3 w-80 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.16)]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Notifications</p>
                  <button type="button" onClick={() => setOpen(false)} className="text-xs text-teal-600">Close</button>
                </div>
                <div className="mt-4 space-y-3">
                  {alerts.map((item) => (
                    <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.patient} • {item.time}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <Link href="/dashboard/doctor/profile" className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-teal-200 hover:bg-white">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Dr. Sarah Johnson</p>
              <p className="text-xs text-slate-500">Cardiologist</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
