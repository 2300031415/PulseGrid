"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PulseGridLogo from "@/components/common/PulseGridLogo";

export default function OrganizationPage() {
  const router = useRouter();
  const [hospitalCode, setHospitalCode] = useState("CITYHOSP01");

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8FCFC] to-[#EEF9F8] flex items-center justify-center px-6">

      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-100 p-10">

        <div className="text-center">

          <div className="flex justify-center mb-8">
            <PulseGridLogo />
            </div>

          <h2 className="mt-8 text-3xl font-bold text-slate-900">
            Find Your Organization
          </h2>

          <p className="mt-3 text-slate-500">
            Enter your hospital code or subdomain
          </p>

        </div>

        <div className="mt-10">

          <label className="block mb-3 text-sm font-semibold text-slate-700">
            Hospital Code
          </label>

          <input
            type="text"
            value={hospitalCode}
            onChange={(e) => setHospitalCode(e.target.value)}
            placeholder="CITYHOSP01"
            className="w-full border border-slate-200 rounded-xl px-5 py-4 outline-none focus:border-teal-500"
          />

          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
          >
            Continue
          </button>

        </div>

        <div className="mt-8 bg-slate-50 rounded-xl p-4 text-sm text-slate-500">

          Examples:

          <div className="mt-2">
            CITYHOSP01
          </div>

          <div>
            GENERALCARE02
          </div>

          <div>
            APOLLO03
          </div>

        </div>

      </div>

    </main>
  );
}