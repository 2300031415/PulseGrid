"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import PatientHeader from "@/components/patient/PatientHeader";
import PatientStats from "@/components/patient/PatientStats";
import DiagnosisCard from "@/components/patient/DiagnosisCard";
import LiveVitals from "@/components/patient/LiveVitals";
import ECGMonitor from "@/components/patient/ECGMonitor";

import AIInsights from "@/components/patient/AIInsights";
import MedicationSchedule from "@/components/patient/MedicationSchedule";
import LabResults from "@/components/patient/LabResults";
import AlertTimeline from "@/components/patient/AlertTimeline";
import TrendCard from "@/components/patient/TrendCard";
import DoctorNotes from "@/components/patient/DoctorNotes";

// Date utilities
const getTodayString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getHistoricalECGPoints = (hr: number) => {
  const points = [];
  const period = Math.max(10, Math.floor(2000 / hr));
  for (let idx = 0; idx < 100; idx++) {
    const phase = idx % period;
    let nextPoint = 96;
    if (phase === 2) nextPoint = 90;
    else if (phase === 3) nextPoint = 88;
    else if (phase === 4) nextPoint = 96;
    else if (phase === 6) nextPoint = 104; // Q wave
    else if (phase === 7) nextPoint = 20;  // R wave peak
    else if (phase === 8) nextPoint = 150; // S wave dip
    else if (phase === 9) nextPoint = 96;
    else if (phase === 11) nextPoint = 85; // T wave
    else if (phase === 12) nextPoint = 82;
    else if (phase === 13) nextPoint = 90;
    else if (phase === 14) nextPoint = 96;
    points.push(nextPoint);
  }
  return points;
};

const getHistoricalVitals = (patient: any, date: string) => {
  const hash = (patient?.name || "").charCodeAt(0) || 0;
  const dateNum = new Date(date).getDate() || 14;
  const hr = 70 + ((hash + dateNum) % 15); // 70 to 85
  const spo2 = 97 + ((hash + dateNum) % 3); // 97 to 99
  const temp = 36.5 + ((hash + dateNum) % 6) * 0.1; // 36.5 to 37.0
  const resp = 15 + ((hash + dateNum) % 4); // 15 to 18
  return { hr, spo2, temp, resp };
};

export default function PatientProfilePage() {
  const params = useParams<{ id: string }>();
  const [patient, setPatient] = useState<any>(null);

  // Live Telemetry states
  const [scanning, setScanning] = useState(false);
  const [showDeviceList, setShowDeviceList] = useState(false);
  const [availableDevices, setAvailableDevices] = useState<string[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);

  const [liveVitals, setLiveVitals] = useState<{ hr: number | null; spo2: number | null; temp: number | null; resp: number | null } | undefined>(undefined);
  const [livePoints, setLivePoints] = useState<number[]>([]);

  const pointsRef = useRef<number[]>(new Array(100).fill(96));
  const tickRef = useRef(0);
  const liveVitalsRef = useRef<{ hr: number | null; spo2: number | null; temp: number | null; resp: number | null }>({ hr: 82, spo2: 98, temp: 36.8, resp: 18 });
  const connectedDeviceRef = useRef<string | null>(null);
  const isPhysicalDeviceRef = useRef(false);

  // Clean up database vitals on unmount if device was connected and NOT a physical device
  useEffect(() => {
    return () => {
      if (connectedDeviceRef.current && !isPhysicalDeviceRef.current && params?.id) {
        fetch(`/api/doctor/patients/${params.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hr: null,
            spo2: null
          })
        }).catch(() => undefined);
      }
    };
  }, [params?.id]);

  // Date states
  const todayStr = getTodayString();
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const isHistorical = selectedDate !== todayStr;

  const fetchPatient = () => {
    if (!params?.id) return;

    fetch(`/api/doctor/patients/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPatient(data);
        if (data) {
          const initialHR = data.hr !== null && data.hr !== undefined ? Number(data.hr) : null;
          const initialSpO2 = data.spo2 !== null && data.spo2 !== undefined ? Number(data.spo2) : null;

          liveVitalsRef.current = {
            hr: initialHR,
            spo2: initialSpO2,
            temp: initialHR ? 36.8 : null,
            resp: initialHR ? 18 : null
          };
          if (data.productId) {
            isPhysicalDeviceRef.current = true;
            setConnectedDevice(data.productId);
            connectedDeviceRef.current = data.productId;
            setLiveVitals({
              hr: initialHR,
              spo2: initialSpO2,
              temp: initialHR ? 36.8 : null,
              resp: initialHR ? 18 : null
            });
          }
        }
      })
      .catch(() => undefined);
  };

  useEffect(() => {
    fetchPatient();
  }, [params?.id]);

  // Handle device scan simulation
  const startScanning = () => {
    setScanning(true);
    setShowDeviceList(true);
    setTimeout(() => {
      setAvailableDevices([
        "Berry PM6100 - Bedside Unit 3",
        "Berry PM6100 - Ambulance Unit A-12",
        "PulseGrid Monitor - Ward B",
      ]);
      setScanning(false);
    }, 1200);
  };

  const connectDevice = (device: string) => {
    setConnectedDevice(device);
    connectedDeviceRef.current = device;
    isPhysicalDeviceRef.current = false; // Manually scanned simulated device
    setShowDeviceList(false);
    // Initialize live vital display
    setLiveVitals({ ...liveVitalsRef.current });
  };

  const disconnectDevice = () => {
    const isPhysical = isPhysicalDeviceRef.current;
    setConnectedDevice(null);
    connectedDeviceRef.current = null;
    isPhysicalDeviceRef.current = false;
    setLiveVitals(undefined);
    setLivePoints([]);
    if (params?.id && !isPhysical) {
      fetch(`/api/doctor/patients/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hr: null,
          spo2: null
        })
      }).catch(() => undefined);
    }
  };

  // Web Bluetooth GATT Connection for Shanghai Berry PM6100 Monitor
  const connectBluetoothDevice = async () => {
    const nav = typeof window !== "undefined" ? (navigator as any) : null;
    if (!nav || !nav.bluetooth) {
      alert("Web Bluetooth API is not supported in this browser. Please use Chrome, Edge, or Opera.");
      return;
    }

    try {
      setScanning(true);
      const device = await nav.bluetooth.requestDevice({
        filters: [
          { namePrefix: "Berry" },
          { namePrefix: "PM" }
        ],
        optionalServices: [
          "0000ffb0-0000-1000-8000-00805f9b34fb", // Custom service UUID of Berry oximeters
          "49535343-fe7d-4ae5-8fa9-9fafd205e455"  // Microchip transparent service
        ]
      });

      setConnectedDevice(device.name || "Physical Berry PM6100");
      connectedDeviceRef.current = device.name || "Physical Berry PM6100";
      setScanning(false);

      const server = await device.gatt?.connect();
      if (!server) throw new Error("GATT server connection failed");

      let service;
      try {
        service = await server.getPrimaryService("0000ffb0-0000-1000-8000-00805f9b34fb");
      } catch {
        service = await server.getPrimaryService("49535343-fe7d-4ae5-8fa9-9fafd205e455");
      }

      const characteristics = await service.getCharacteristics();
      const rxChar = characteristics.find((c: any) => c.properties.notify || c.properties.indicate);
      if (!rxChar) throw new Error("No receiver notification characteristic found");

      await rxChar.startNotifications();

      const byteBuffer: number[] = [];
      rxChar.addEventListener("characteristicvaluechanged", (event: any) => {
        const value: DataView = event.target.value;
        for (let i = 0; i < value.byteLength; i++) {
          byteBuffer.push(value.getUint8(i));
        }

        while (byteBuffer.length >= 5) {
          const syncIndex = byteBuffer.findIndex(b => (b & 0x80) !== 0);
          if (syncIndex === -1) {
            byteBuffer.length = 0;
            break;
          }
          if (syncIndex > 0) {
            byteBuffer.splice(0, syncIndex);
          }
          if (byteBuffer.length < 5) {
            break;
          }

          const isValid = byteBuffer.slice(1, 5).every(b => (b & 0x80) === 0);
          if (isValid) {
            const rawPacket = byteBuffer.splice(0, 5);
            const hr = rawPacket[2];
            const spo2 = rawPacket[3];
            const resp = rawPacket[4];

            if (hr > 30 && hr < 240 && spo2 > 50 && spo2 <= 100) {
              const parsed = {
                hr,
                spo2,
                temp: 36.8,
                resp: resp > 0 && resp < 50 ? resp : 18
              };
              liveVitalsRef.current = parsed;
              setLiveVitals(parsed);
            }
          } else {
            byteBuffer.shift();
          }
        }
      });

      device.addEventListener("gattserverdisconnected", () => {
        disconnectDevice();
      });

    } catch (err: any) {
      console.error("Web Bluetooth error:", err);
      setScanning(false);
      setConnectedDevice(null);
      connectedDeviceRef.current = null;
      alert(`Web Bluetooth Connection failed: ${err.message || err}`);
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    // If date is changed, disconnect active monitor
    setConnectedDevice(null);
    connectedDeviceRef.current = null;
    setLiveVitals(undefined);
    setLivePoints([]);
    setShowDeviceList(false);
    if (params?.id) {
      fetch(`/api/doctor/patients/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hr: null,
          spo2: null
        })
      }).catch(() => undefined);
    }
  };

  // Telemetry loops
  useEffect(() => {
    if (!connectedDevice || isHistorical) return;

    // 1. ECG scrolling wave generator tick loop
    const ecgInterval = setInterval(() => {
      tickRef.current += 1;
      const currentHR = liveVitalsRef.current?.hr;
      if (!currentHR) {
        const newPoints = [...pointsRef.current.slice(1), 96];
        pointsRef.current = newPoints;
        setLivePoints(newPoints);
        return;
      }
      const period = Math.max(10, Math.floor(2000 / currentHR));
      const phase = tickRef.current % period;

      let nextPoint = 96;
      if (phase === 2) nextPoint = 90;
      else if (phase === 3) nextPoint = 88;
      else if (phase === 4) nextPoint = 96;
      else if (phase === 6) nextPoint = 104; // Q wave
      else if (phase === 7) nextPoint = 20;  // R wave peak
      else if (phase === 8) nextPoint = 150; // S wave dip
      else if (phase === 9) nextPoint = 96;
      else if (phase === 11) nextPoint = 85; // T wave
      else if (phase === 12) nextPoint = 82;
      else if (phase === 13) nextPoint = 90;
      else if (phase === 14) nextPoint = 96;

      const newPoints = [...pointsRef.current.slice(1), nextPoint];
      pointsRef.current = newPoints;
      setLivePoints(newPoints);
    }, 35);

    // 2. Vitals updates loop: poll DB if device is connected (updated via MQTT)
    const vitalsInterval = setInterval(() => {
      if (params?.id) {
        fetch(`/api/doctor/patients/${params.id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              const hasTelemetry = data.hr !== null && data.hr !== undefined;
              const updatedVitals = {
                hr: hasTelemetry ? Number(data.hr) : null,
                spo2: hasTelemetry ? Number(data.spo2) : null,
                temp: hasTelemetry ? (liveVitalsRef.current?.temp ?? (36.4 + Math.random() * 0.7)) : null,
                resp: hasTelemetry ? (liveVitalsRef.current?.resp ?? (15 + Math.floor(Math.random() * 5))) : null,
              };
              // Add minor fluctuations to temp and resp to keep them visually dynamic
              if (hasTelemetry && updatedVitals.temp && updatedVitals.resp) {
                updatedVitals.temp = Math.max(36.0, Math.min(38.5, updatedVitals.temp + (Math.random() * 0.1 - 0.05)));
                updatedVitals.resp = Math.max(12, Math.min(24, updatedVitals.resp + (Math.floor(Math.random() * 3) - 1)));
              }

              liveVitalsRef.current = updatedVitals as any;
              setLiveVitals(updatedVitals as any);
            }
          })
          .catch(() => undefined);
      }
    }, 2000);

    return () => {
      clearInterval(ecgInterval);
      clearInterval(vitalsInterval);
    };
  }, [connectedDevice, patient, params?.id, isHistorical]);

  // PDF report downloader
  const downloadReportPDF = () => {
    const activeVitals = isHistorical 
      ? getHistoricalVitals(patient, selectedDate)
      : (connectedDevice ? liveVitals : null);

    const hr = activeVitals?.hr ?? patient?.hr ?? "--";
    const spo2 = activeVitals?.spo2 ?? patient?.spo2 ?? "--";
    const temp = activeVitals?.temp ? `${activeVitals.temp.toFixed(1)}°C` : "--";
    const resp = activeVitals?.resp ? `${activeVitals.resp}/min` : "--";
    const status = activeVitals?.hr ? (activeVitals.hr > 100 || (activeVitals.spo2 !== null && activeVitals.spo2 !== undefined && activeVitals.spo2 < 95) ? "Warning" : "Stable") : (patient?.status || "Stable");
    const doctor = patient?.doctor || "Dr. Sarah Johnson";
    const hospital = patient?.hospitalName || "City General Hospital";

    const lines = [
      `======================================================================`,
      `                         CLINICAL TELEMETRY REPORT                    `,
      `======================================================================`,
      `Report Date: ${selectedDate}`,
      `Hospital: ${hospital}`,
      `Attending Doctor: ${doctor}`,
      `----------------------------------------------------------------------`,
      `PATIENT PROFILE`,
      `Name: ${patient?.name || "N/A"}               Patient ID: ${patient?.id || "N/A"}`,
      `Age/Gender: ${patient?.age || "N/A"} / ${patient?.gender || "N/A"}`,
      `Admission Date: ${patient?.admissionDate || "N/A"}     Status: ${status}`,
      `----------------------------------------------------------------------`,
      `TELEMETRY VITAL SIGNS`,
      `Mode: ${isHistorical ? "Historical Log" : "Live Device Stream"}`,
      ``,
      `* Heart Rate: ${hr} bpm           [Normal Range: 60-100 bpm]`,
      `* SpO2 Level: ${spo2}%             [Normal Range: >= 95%]`,
      `* Temperature: ${temp}          [Normal Range: 36.1-37.2C]`,
      `* Respiration: ${resp}        [Normal Range: 12-20/min]`,
      `----------------------------------------------------------------------`,
      `ECG WAVEFORM ANALYSIS`,
      `Rhythm: ${activeVitals?.hr ? "Normal Sinus Rhythm (NSR)" : "No telemetry active (flatline)"}`,
      `Trace Quality: ${activeVitals?.hr ? "High (Synthesized via Berry PM6100)" : "N/A"}`,
      `----------------------------------------------------------------------`,
      `CLINICAL NOTES`,
    ];

    const notesText = patient?.notes || "The patient exhibits stable cardiorespiratory telemetry. Heart rate rhythm is regular. No signs of tachycardia, bradycardia, or oxygen desaturation detected during this reporting window.";
    const wrappedNotes: string[] = [];
    const words = notesText.split(" ");
    let currentLine = "";
    for (const word of words) {
      if ((currentLine + word).length > 68) {
        wrappedNotes.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    }
    if (currentLine.trim()) {
      wrappedNotes.push(currentLine.trim());
    }

    lines.push(...wrappedNotes);
    lines.push(`======================================================================`);
    lines.push(`Generated by PulseGrid Telemetry System`);

    const pdfBody = [
      "%PDF-1.4",
      "1 0 obj",
      "<< /Type /Catalog /Pages 2 0 R >>",
      "endobj",
      "2 0 obj",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      "endobj",
      "3 0 obj",
      "<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595.28 841.89] /Contents 5 0 R >>",
      "endobj",
      "4 0 obj",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>",
      "endobj",
      "5 0 obj",
    ];

    let streamContent = "BT\n/F1 10 Tf\n14 TL\n50 780 Td\n";
    for (const line of lines) {
      const escaped = line.replace(/[()]/g, "\\$&");
      streamContent += `(${escaped}) Tj T*\n`;
    }
    streamContent += "ET";

    pdfBody.push(`<< /Length ${streamContent.length} >>`);
    pdfBody.push("stream");
    pdfBody.push(streamContent);
    pdfBody.push("endstream");
    pdfBody.push("endobj");
    
    pdfBody.push("xref");
    pdfBody.push("0 6");
    pdfBody.push("0000000000 65535 f ");
    pdfBody.push("0000000009 00000 n ");
    pdfBody.push("0000000058 00000 n ");
    pdfBody.push("0000000115 00000 n ");
    pdfBody.push("0000000244 00000 n ");
    pdfBody.push("0000000311 00000 n ");
    pdfBody.push("trailer");
    pdfBody.push("<< /Size 6 /Root 1 0 R >>");
    pdfBody.push("startxref");
    pdfBody.push("0");
    pdfBody.push("%%EOF");

    const pdfString = pdfBody.join("\n");
    const bytes = new Uint8Array(pdfString.length);
    for (let i = 0; i < pdfString.length; i++) {
      bytes[i] = pdfString.charCodeAt(i);
    }
    
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${patient?.name || "Patient"}_Telemetry_Report_${selectedDate}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentStatus = isHistorical 
    ? "historical" 
    : (connectedDevice ? "live" : "offline");

  const displayPoints = isHistorical 
    ? getHistoricalECGPoints(getHistoricalVitals(patient, selectedDate).hr)
    : livePoints;

  const displayVitals = isHistorical
    ? getHistoricalVitals(patient, selectedDate)
    : liveVitals;

  return (
    <div className="space-y-6">
      <PatientHeader patient={patient} />
      <PatientStats patient={patient} />

      {/* Bedside Telemetry Integration Panel - Placed above ECG monitor */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Bedside Telemetry Integration</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              {isHistorical 
                ? `Viewing historical telemetry log report for ${selectedDate}` 
                : "Connect this profile to a live medical monitoring device"}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Date Selector */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Date:</span>
              <input
                type="date"
                value={selectedDate}
                max={todayStr}
                onChange={(e) => handleDateChange(e.target.value)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold focus:outline-none focus:border-teal-500 transition"
              />
            </div>
            
            {/* PDF Report Download */}
            <button
              type="button"
              onClick={downloadReportPDF}
              className="px-3.5 py-1.5 rounded-xl border border-teal-200 text-teal-600 hover:bg-teal-50 bg-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Report (PDF)
            </button>

            {/* Connection Toggle */}
            {!isHistorical ? (
              <div className="flex items-center gap-3">
                {!connectedDevice ? (
                  <button
                    type="button"
                    onClick={startScanning}
                    disabled={scanning}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 shadow-md shadow-teal-600/10 font-bold text-xs transition"
                  >
                    {scanning ? "Scanning..." : "Connect Monitor"}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      Active: {connectedDevice}
                    </span>
                    <button
                      type="button"
                      onClick={disconnectDevice}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 text-xs font-bold transition"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold shadow-sm">
                Historical Mode
              </span>
            )}
          </div>
        </div>

        {/* Scan Status */}
        {scanning && (
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin"></span>
            Scanning for available Bluetooth/COM bedside monitors...
          </div>
        )}

        {/* Available Devices List (Only shown when not scanning, devices available, scanning panel clicked) */}
        {showDeviceList && !connectedDevice && availableDevices.length > 0 && !scanning && (
          <div className="mt-4 border border-slate-100 rounded-2xl bg-slate-50 p-5 space-y-3 animate-scale-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Available Bluetooth/COM Monitor</h3>
              <button
                type="button"
                onClick={connectBluetoothDevice}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm shadow-teal-600/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                Pair Physical Device (Bluetooth BLE)
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {availableDevices.map((device) => (
                <button
                  key={device}
                  type="button"
                  onClick={() => connectDevice(device)}
                  className="flex items-center justify-between px-4 py-3 bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-200 rounded-xl text-xs font-semibold text-slate-700 transition text-left"
                >
                  <span>{device} (Simulated)</span>
                  <span className="text-[10px] text-teal-600 font-bold">Connect</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
      
      <ECGMonitor livePoints={displayPoints} status={currentStatus} />
      <LiveVitals liveVitals={displayVitals} status={currentStatus} />

      <TrendCard />
      <DiagnosisCard patient={patient} onUpdate={fetchPatient} isEditable={!isHistorical} />

      <AIInsights />

      <div className="grid gap-6 xl:grid-cols-2">
        <MedicationSchedule patient={patient} onUpdate={fetchPatient} isEditable={!isHistorical} />
        <LabResults />
      </div>

      <AlertTimeline />
      <DoctorNotes />
    </div>
  );
}