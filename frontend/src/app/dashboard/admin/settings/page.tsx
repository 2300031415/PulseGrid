"use client";

import { useState } from "react";
import { Settings, ShieldAlert, FileSpreadsheet, Key, Save, ToggleLeft, ToggleRight } from "lucide-react";

export default function AdminSettingsPage() {
  const [telemetryAudits, setTelemetryAudits] = useState(true);
  const [mfaRequire, setMfaRequire] = useState(false);
  const [hipaaLogging, setHipaaLogging] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-600">Administration</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Hospital Settings</h1>
        <p className="mt-3 text-slate-500">
          Manage system configurations, logging rules, security preferences, and compliance constraints.
        </p>
      </section>

      {/* Settings Options */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
        {/* Telemetry audits */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <FileSpreadsheet size={16} className="text-teal-600" />
              <span>Real-time Telemetry Audits</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Record connection timestamps and packet delivery logs for all ESP32 monitors on the ward.
            </p>
          </div>
          <button onClick={() => setTelemetryAudits(!telemetryAudits)} className="text-teal-600 hover:scale-105 transition">
            {telemetryAudits ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-400" />}
          </button>
        </div>

        {/* HIPAA Logging */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <ShieldAlert size={16} className="text-teal-600" />
              <span>HIPAA Compliant Audit Trail</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Ensure patient detail modifications and report review queries are logged to the backend journal.
            </p>
          </div>
          <button onClick={() => setHipaaLogging(!hipaaLogging)} className="text-teal-600 hover:scale-105 transition">
            {hipaaLogging ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-400" />}
          </button>
        </div>

        {/* MFA */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Key size={16} className="text-teal-600" />
              <span>Enforce MFA for Clinicians</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Require two-factor authentication for Doctors and Nurses when accessing patient telemetry.
            </p>
          </div>
          <button onClick={() => setMfaRequire(!mfaRequire)} className="text-teal-600 hover:scale-105 transition">
            {mfaRequire ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-400" />}
          </button>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            {saved && (
              <span className="text-xs text-emerald-600 font-bold animate-fade-in">
                ✓ Hospital preferences saved.
              </span>
            )}
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-600/10 font-bold text-sm transition"
          >
            <Save size={16} />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
