"use client";

import { useState } from "react";
import { Settings, Bell, RefreshCw, Volume2, History, Save, ToggleLeft, ToggleRight } from "lucide-react";

export default function LabSettingsPage() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [newRequestNotif, setNewRequestNotif] = useState(true);
  const [enableHistoryLogs, setEnableHistoryLogs] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-600">Lab Portal</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Lab Preferences</h1>
        <p className="mt-3 text-slate-500">
          Configure diagnostic queue updates, audio cues for incoming samples, and logging preferences.
        </p>
      </section>

      {/* Settings Options */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
        {/* Row 1: Auto Refresh */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <RefreshCw size={16} className="text-teal-600" />
              <span>Auto-refresh Diagnostics Queue</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Automatically reload the patient queue every 30 seconds to fetch new lab requests.
            </p>
          </div>
          <button onClick={() => setAutoRefresh(!autoRefresh)} className="text-teal-600 hover:scale-105 transition">
            {autoRefresh ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-400" />}
          </button>
        </div>

        {/* Row 2: Sound Alerts */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Volume2 size={16} className="text-teal-600" />
              <span>Audio Notifications</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Play a chime when new high-priority lab tests are assigned by a doctor.
            </p>
          </div>
          <button onClick={() => setSoundAlerts(!soundAlerts)} className="text-teal-600 hover:scale-105 transition">
            {soundAlerts ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-400" />}
          </button>
        </div>

        {/* Row 3: Push Notifications */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Bell size={16} className="text-teal-600" />
              <span>New Request Alerts</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Show a desktop browser alert notification immediately for new lab test requests.
            </p>
          </div>
          <button onClick={() => setNewRequestNotif(!newRequestNotif)} className="text-teal-600 hover:scale-105 transition">
            {newRequestNotif ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-400" />}
          </button>
        </div>

        {/* Row 4: History Logs */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <History size={16} className="text-teal-600" />
              <span>Shift Handover Logs</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Compile and auto-email reports uploaded during this shift to the clinical supervisor.
            </p>
          </div>
          <button onClick={() => setEnableHistoryLogs(!enableHistoryLogs)} className="text-teal-600 hover:scale-105 transition">
            {enableHistoryLogs ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-400" />}
          </button>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            {saved && (
              <span className="text-xs text-emerald-600 font-bold animate-fade-in">
                ✓ Lab preferences saved.
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
