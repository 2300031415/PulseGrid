import { Activity, Heart, Thermometer, Wind } from "lucide-react";

export default function LiveVitals({ 
  liveVitals, 
  status = "offline" 
}: { 
  liveVitals?: { hr: number | null; spo2: number | null; temp: number | null; resp: number | null }; 
  status?: "live" | "historical" | "offline";
}) {
  const hasData = status !== "offline";

  const currentHR = hasData && liveVitals && liveVitals.hr !== null && liveVitals.hr !== undefined ? `${liveVitals.hr} bpm` : "--";
  const currentSpO2 = hasData && liveVitals && liveVitals.spo2 !== null && liveVitals.spo2 !== undefined ? `${liveVitals.spo2}%` : "--";
  const currentTemp = hasData && liveVitals && liveVitals.temp !== null && liveVitals.temp !== undefined ? `${liveVitals.temp.toFixed(1)}°C` : "--";
  const currentResp = hasData && liveVitals && liveVitals.resp !== null && liveVitals.resp !== undefined ? `${liveVitals.resp}/min` : "--";

  const hrDetail = hasData && liveVitals && liveVitals.hr !== null && liveVitals.hr !== undefined 
    ? (liveVitals.hr > 100 ? "Tachycardia alert" : "Normal sinus rhythm") 
    : (status === "offline" ? "Connect monitor to stream" : "Waiting for telemetry feed...");
    
  const spo2Detail = hasData && liveVitals && liveVitals.spo2 !== null && liveVitals.spo2 !== undefined 
    ? (liveVitals.spo2 < 95 ? "Hypoxia risk alert" : "Oxygen saturation stable") 
    : (status === "offline" ? "Connect monitor to stream" : "Waiting for telemetry feed...");
    
  const tempDetail = hasData && liveVitals && liveVitals.temp !== null && liveVitals.temp !== undefined 
    ? "Within normal range" 
    : (status === "offline" ? "Connect monitor to stream" : "Waiting for telemetry feed...");
    
  const respDetail = hasData && liveVitals && liveVitals.resp !== null && liveVitals.resp !== undefined 
    ? "Steady breathing rate" 
    : (status === "offline" ? "Connect monitor to stream" : "Waiting for telemetry feed...");

  const vitals = [
    { label: "Heart Rate", value: currentHR, detail: hrDetail, icon: Heart, accent: hasData ? "text-rose-500" : "text-slate-400" },
    { label: "SpO₂", value: currentSpO2, detail: spo2Detail, icon: Activity, accent: hasData ? "text-teal-600" : "text-slate-400" },
    { label: "Temperature", value: currentTemp, detail: tempDetail, icon: Thermometer, accent: hasData ? "text-amber-500" : "text-slate-400" },
    { label: "Respiration", value: currentResp, detail: respDetail, icon: Wind, accent: hasData ? "text-cyan-600" : "text-slate-400" },
  ];

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Telemetry</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Live Vitals</h2>
        </div>
        {status === "live" && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Live feed</span>
        )}
        {status === "historical" && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">Historical Log</span>
        )}
        {status === "offline" && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-500">Disconnected</span>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {vitals.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.label}</p>
                <Icon className={item.accent} size={18} />
              </div>
              <h3 className={`mt-4 text-3xl font-bold ${item.accent}`}>{item.value}</h3>
              <p className="mt-3 text-sm text-slate-500">{item.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
