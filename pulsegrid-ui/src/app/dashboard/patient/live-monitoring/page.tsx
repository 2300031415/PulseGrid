"use client";

import { useEffect, useState, useRef } from "react";
import ECGMonitor from "@/components/patient/ECGMonitor";
import LiveVitals from "@/components/patient/LiveVitals";

export default function PatientLiveMonitoringPage() {
  const [patientId, setPatientId] = useState<string | null>(null);
  const [liveVitals, setLiveVitals] = useState<{ hr: number; spo2: number; temp: number; resp: number } | undefined>(undefined);
  const [livePoints, setLivePoints] = useState<number[]>([]);

  const pointsRef = useRef<number[]>(new Array(100).fill(96));
  const tickRef = useRef(0);
  const liveVitalsRef = useRef<any>(null);

  // 1. Fetch Patient ID from role profile
  useEffect(() => {
    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("pulsegrid_user") || "{}") : {};
    const query = user.email ? `?email=${encodeURIComponent(user.email)}` : "";

    fetch(`/api/roles/patient${query}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.identity?.patientId) {
          setPatientId(resData.identity.patientId);
        }
      })
      .catch(() => undefined);
  }, []);

  // 2. Poll Patient's latest vitals from the backend database every 3 seconds
  useEffect(() => {
    if (!patientId) return;

    const pollVitals = () => {
      fetch(`/api/doctor/patients/${patientId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.hr) {
            const vitals = {
              hr: data.hr,
              spo2: data.spo2,
              temp: 36.8,
              resp: 18
            };
            liveVitalsRef.current = vitals;
            setLiveVitals(vitals);
          } else {
            liveVitalsRef.current = null;
            setLiveVitals(undefined);
            setLivePoints([]);
          }
        })
        .catch(() => undefined);
    };

    pollVitals();
    const interval = setInterval(pollVitals, 3000);
    return () => clearInterval(interval);
  }, [patientId]);

  // 3. Render scrolling ECG trace locally if active vitals data is available
  useEffect(() => {
    const ecgInterval = setInterval(() => {
      if (!liveVitalsRef.current) return;
      
      tickRef.current += 1;
      const currentHR = liveVitalsRef.current.hr;
      const period = Math.max(10, Math.floor(2000 / currentHR));
      const phase = tickRef.current % period;

      let nextPoint = 96;
      if (phase === 2) nextPoint = 90;
      else if (phase === 3) nextPoint = 88;
      else if (phase === 4) nextPoint = 96;
      else if (phase === 6) nextPoint = 104;
      else if (phase === 7) nextPoint = 20;
      else if (phase === 8) nextPoint = 150;
      else if (phase === 9) nextPoint = 96;
      else if (phase === 11) nextPoint = 85;
      else if (phase === 12) nextPoint = 82;
      else if (phase === 13) nextPoint = 90;
      else if (phase === 14) nextPoint = 96;

      const newPoints = [...pointsRef.current.slice(1), nextPoint];
      pointsRef.current = newPoints;
      setLivePoints(newPoints);
    }, 35);

    return () => clearInterval(ecgInterval);
  }, []);

  const currentStatus = liveVitals ? "live" : "offline";

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-600">Telemetry Feed</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Live Patient Monitoring</h1>
        <p className="mt-3 text-slate-500">
          This dashboard shows your real-time telemetry vitals, including ECG rhythm waveforms, heart rate trends, oxygen levels, and skin temperature.
        </p>
      </section>

      <ECGMonitor livePoints={livePoints} status={currentStatus} />
      <LiveVitals liveVitals={liveVitals} status={currentStatus} />
    </div>
  );
}