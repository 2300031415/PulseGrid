"use client";

import { useState, useEffect } from "react";

type PatientRecord = {
  id: string;
  condition?: string;
  doctor?: string;
  risk?: string;
  status?: string;
  diagnosisDetails?: string | null;
  admissionReason?: string | null;
  admissionReasonDetails?: string | null;
  currentTreatment?: string | null;
  currentTreatmentDetails?: string | null;
  riskDetails?: string | null;
};

interface DiagnosisCardProps {
  patient?: PatientRecord | null;
  onUpdate?: () => void;
  isEditable?: boolean;
}

export default function DiagnosisCard({ patient, onUpdate, isEditable = false }: DiagnosisCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // States for form inputs
  const [draftCondition, setDraftCondition] = useState("");
  const [draftDiagnosisDetails, setDraftDiagnosisDetails] = useState("");
  const [draftAdmissionReason, setDraftAdmissionReason] = useState("");
  const [draftAdmissionReasonDetails, setDraftAdmissionReasonDetails] = useState("");
  const [draftCurrentTreatment, setDraftCurrentTreatment] = useState("");
  const [draftCurrentTreatmentDetails, setDraftCurrentTreatmentDetails] = useState("");
  const [draftRisk, setDraftRisk] = useState("");
  const [draftRiskDetails, setDraftRiskDetails] = useState("");

  // Sync draft states when patient data changes or edit mode toggles
  useEffect(() => {
    if (patient) {
      setDraftCondition(patient.condition ?? "Post Laparoscopic Cholecystectomy");
      setDraftDiagnosisDetails(
        patient.diagnosisDetails ??
          "The patient is recovering after gallbladder removal surgery with stable vitals and no current signs of complication."
      );
      setDraftAdmissionReason(patient.admissionReason ?? "Gallbladder Removal Surgery");
      setDraftAdmissionReasonDetails(
        patient.admissionReasonDetails ??
          "Current status is stable. Monitor for pain management, oxygenation, and recovery trend against baseline."
      );
      setDraftCurrentTreatment(patient.currentTreatment ?? "Post-op pain care + ambulation support");
      setDraftCurrentTreatmentDetails(
        patient.currentTreatmentDetails ??
          "Pain relief, hydration, and post-op mobility plan are ongoing. AI recommendations suggest maintaining current care."
      );
      setDraftRisk(patient.risk ?? "Low");
      setDraftRiskDetails(
        patient.riskDetails ??
          "Recovery score is trending above the ward average and the patient remains under regular observation."
      );
    }
  }, [patient, isEditing]);

  const handleSave = async () => {
    if (!patient?.id) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/doctor/patients/${patient.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          condition: draftCondition,
          diagnosisDetails: draftDiagnosisDetails,
          admissionReason: draftAdmissionReason,
          admissionReasonDetails: draftAdmissionReasonDetails,
          currentTreatment: draftCurrentTreatment,
          currentTreatmentDetails: draftCurrentTreatmentDetails,
          risk: draftRisk,
          riskDetails: draftRiskDetails,
        }),
      });

      if (response.ok) {
        if (onUpdate) onUpdate();
        setIsEditing(false);
      } else {
        alert("Failed to save changes. Please try again.");
      }
    } catch (error) {
      console.error("Failed to update diagnosis details", error);
      alert("Failed to save changes. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status?: string) => {
    switch (status) {
      case "Critical":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "Warning":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-teal-50 text-teal-700 border-teal-100";
    }
  };

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Clinical summary</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Diagnosis & Treatment</h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <span className={`rounded-full px-3 py-1 text-sm font-semibold border ${getStatusStyles(patient?.status)}`}>
            {patient?.status ?? "Stable"}
          </span>

          {/* Edit Control Actions */}
          {isEditable && (
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md shadow-teal-600/10 transition disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    disabled={loading}
                    className="px-4 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 text-sm font-bold transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-1.5 rounded-xl border border-teal-200 text-teal-600 hover:bg-teal-50 text-sm font-bold transition"
                >
                  Edit Details
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Diagnosis Block */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 flex flex-col">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Diagnosis (Condition)</label>
            <input
              type="text"
              value={draftCondition}
              onChange={(e) => setDraftCondition(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-800 text-sm font-semibold focus:border-teal-500 focus:outline-none transition mb-3"
              placeholder="Diagnosis / Condition Title"
            />
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Details</label>
            <textarea
              value={draftDiagnosisDetails}
              onChange={(e) => setDraftDiagnosisDetails(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-700 text-sm focus:border-teal-500 focus:outline-none transition resize-none flex-grow h-24"
              placeholder="Enter diagnosis details..."
            />
          </div>

          {/* Admission Reason Block */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 flex flex-col">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Admission Reason</label>
            <input
              type="text"
              value={draftAdmissionReason}
              onChange={(e) => setDraftAdmissionReason(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-800 text-sm font-semibold focus:border-teal-500 focus:outline-none transition mb-3"
              placeholder="Admission Reason Title"
            />
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Details</label>
            <textarea
              value={draftAdmissionReasonDetails}
              onChange={(e) => setDraftAdmissionReasonDetails(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-700 text-sm focus:border-teal-500 focus:outline-none transition resize-none flex-grow h-24"
              placeholder="Enter admission details..."
            />
          </div>

          {/* Current Treatment Block */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 flex flex-col">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Current Treatment</label>
            <input
              type="text"
              value={draftCurrentTreatment}
              onChange={(e) => setDraftCurrentTreatment(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-800 text-sm font-semibold focus:border-teal-500 focus:outline-none transition mb-3"
              placeholder="Treatment Title"
            />
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Details</label>
            <textarea
              value={draftCurrentTreatmentDetails}
              onChange={(e) => setDraftCurrentTreatmentDetails(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-700 text-sm focus:border-teal-500 focus:outline-none transition resize-none flex-grow h-24"
              placeholder="Enter treatment details..."
            />
          </div>

          {/* Risk Level Block */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 flex flex-col">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Risk Level</label>
            <div className="relative mb-3">
              <select
                value={draftRisk}
                onChange={(e) => setDraftRisk(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-800 text-sm font-semibold focus:border-teal-500 focus:outline-none transition appearance-none cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Risk Details</label>
            <textarea
              value={draftRiskDetails}
              onChange={(e) => setDraftRiskDetails(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-700 text-sm focus:border-teal-500 focus:outline-none transition resize-none flex-grow h-24"
              placeholder="Enter risk details..."
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Diagnosis Block */}
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Diagnosis</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              {patient?.condition ?? "Post Laparoscopic Cholecystectomy"}
            </h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              {patient?.diagnosisDetails ??
                "The patient is recovering after gallbladder removal surgery with stable vitals and no current signs of complication."}
            </p>
          </article>

          {/* Admission Reason Block */}
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Admission Reason</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              {patient?.admissionReason ?? "Gallbladder Removal Surgery"}
            </h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              {patient?.admissionReasonDetails ??
                "Current status is stable. Monitor for pain management, oxygenation, and recovery trend against baseline."}
            </p>
          </article>

          {/* Current Treatment Block */}
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Current Treatment</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              {patient?.currentTreatment ?? "Post-op pain care + ambulation support"}
            </h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              {patient?.currentTreatmentDetails ??
                "Pain relief, hydration, and post-op mobility plan are ongoing. AI recommendations suggest maintaining current care."}
            </p>
          </article>

          {/* Risk Category Block */}
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Risk Category</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              {patient?.risk ?? "Low"} risk •{" "}
              {patient?.riskDetails ? "discharge assessment completed" : "discharge readiness improving"}
            </h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              {patient?.riskDetails ??
                "Recovery score is trending above the ward average and the patient remains under regular observation."}
            </p>
          </article>
        </div>
      )}
    </section>
  );
}

