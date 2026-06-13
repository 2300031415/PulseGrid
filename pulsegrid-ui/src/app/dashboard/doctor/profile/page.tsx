"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DoctorProfilePage() {
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    hospital: "City General Hospital",
    email: "sarah.johnson@pulsegrid.health",
    phone: "+1 415 555 0188",
    ward: "Cardiac ICU",
    notificationEmail: true,
    smsAlerts: true,
    monitoringMode: "Live telemetry",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/doctor/profile")
      .then((res) => res.json())
      .then(setProfile)
      .catch(() => undefined);
  }, []);

  const update = (field: string, value: string | boolean) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const saveProfile = async () => {
    await fetch("/api/doctor/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-600">Doctor profile</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Edit your clinical profile</h1>
        <p className="mt-3 text-slate-500">Keep your doctor identity, hospital settings, and notification preferences current for the real-time monitoring workspace.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-900">Profile details</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["name", "Name"],
              ["specialty", "Specialty"],
              ["hospital", "Hospital"],
              ["ward", "Ward"],
              ["email", "Email"],
              ["phone", "Phone"],
            ].map(([field, label]) => (
              <label key={field} className="block text-sm text-slate-600">
                <span className="mb-1 block font-medium text-slate-700">{label}</span>
                <input
                  value={profile[field as keyof typeof profile] as string}
                  onChange={(event) => update(field, event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-200 focus:bg-white"
                />
              </label>
            ))}
          </div>

          <label className="mt-4 block text-sm text-slate-600">
            <span className="mb-1 block font-medium text-slate-700">Monitoring mode</span>
            <select
              value={profile.monitoringMode}
              onChange={(event) => update("monitoringMode", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-200 focus:bg-white"
            >
              <option>Live telemetry</option>
              <option>Alert-first</option>
              <option>Recovery review</option>
            </select>
          </label>
        </article>

        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-900">Notification controls</h2>
          <div className="mt-6 space-y-4">
            {[
              ["notificationEmail", "Email alerts"],
              ["smsAlerts", "SMS alerts"],
            ].map(([field, label]) => (
              <button
                key={field}
                type="button"
                onClick={() => update(field, !profile[field as keyof typeof profile])}
                className={`flex w-full items-center justify-between rounded-3xl border px-4 py-4 text-left transition ${profile[field as keyof typeof profile] ? "border-teal-200 bg-teal-50" : "border-slate-200 bg-slate-50"}`}
              >
                <span>
                  <span className="block text-sm font-semibold text-slate-900">{label}</span>
                  <span className="text-xs text-slate-500">{profile[field as keyof typeof profile] ? "Enabled" : "Disabled"}</span>
                </span>
                <span className={`h-6 w-12 rounded-full transition ${profile[field as keyof typeof profile] ? "bg-teal-500" : "bg-slate-200"}`}>
                  <span className={`mt-1 ml-1 block h-4 w-4 rounded-full bg-white transition ${profile[field as keyof typeof profile] ? "translate-x-6" : "translate-x-0"}`} />
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveProfile}
              className="rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:scale-[1.02]"
            >
              Save profile
            </button>
            <Link href="/dashboard/doctor" className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Back to dashboard
            </Link>
          </div>

          {saved ? <p className="mt-4 text-sm text-emerald-600">Profile saved successfully.</p> : null}
        </article>
      </section>
    </div>
  );
}
