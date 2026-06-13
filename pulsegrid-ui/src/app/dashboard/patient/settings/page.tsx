"use client";

import { useState } from "react";
import { Settings, Bell, Shield, Eye, Save, ToggleLeft, ToggleRight } from "lucide-react";

export default function PatientSettingsPage() {
  const [telemetry, setTelemetry] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-600">Preferences</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-3 text-slate-500">
          Configure your telemetry streaming options, notifications, and portal view preferences.
        </p>
      </section>

      {/* Settings Options */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
        {/* Row 1: Telemetry */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Shield size={16} className="text-teal-600" />
              <span>Live Telemetry Streaming</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Allow bedside devices to stream your ECG and SpO2 to the ICU central dashboard.
            </p>
          </div>
          <button onClick={() => setTelemetry(!telemetry)} className="text-teal-600 hover:scale-105 transition">
            {telemetry ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-400" />}
          </button>
        </div>

        {/* Row 2: Notifications */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Bell size={16} className="text-teal-600" />
              <span>Attending Alerts (Push)</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Get immediate alerts if doctor prescribes a new medication or lab test.
            </p>
          </div>
          <button onClick={() => setNotifications(!notifications)} className="text-teal-600 hover:scale-105 transition">
            {notifications ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-400" />}
          </button>
        </div>

        {/* Row 3: SMS */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Bell size={16} className="text-teal-600" />
              <span>SMS Vitals Reminders</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Receive daily recovery guidelines and care plan reminders via SMS text.
            </p>
          </div>
          <button onClick={() => setSmsAlerts(!smsAlerts)} className="text-teal-600 hover:scale-105 transition">
            {smsAlerts ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-400" />}
          </button>
        </div>

        {/* Row 4: Dark Mode */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Eye size={16} className="text-teal-600" />
              <span>High Contrast Portal</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Optimize color palette for low-light room environments (ICU-friendly dark theme).
            </p>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="text-teal-600 hover:scale-105 transition">
            {darkMode ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-400" />}
          </button>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            {saved && (
              <span className="text-xs text-emerald-600 font-bold animate-fade-in">
                ✓ Preferences updated successfully.
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
