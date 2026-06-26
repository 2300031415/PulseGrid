"use client";

import { useState, useEffect } from "react";

interface MedicationItem {
  name: string;
  time: string;
  note: string;
}

interface MedicationScheduleProps {
  patient?: {
    id: string;
    medications?: MedicationItem[] | null;
  } | null;
  onUpdate?: () => void;
  isEditable?: boolean;
}

const defaultMedications: MedicationItem[] = [
  { name: "Paracetamol", time: "08:00 AM", note: "Pain relief" },
  { name: "Antibiotic", time: "01:00 PM", note: "Post-op care" },
  { name: "Vitamin D", time: "08:00 PM", note: "Daily supplement" },
];

export default function MedicationSchedule({ patient, onUpdate, isEditable = false }: MedicationScheduleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [draftMedications, setDraftMedications] = useState<MedicationItem[]>([]);

  // Sync draft states when patient data changes or edit mode toggles
  useEffect(() => {
    if (patient) {
      setDraftMedications(patient.medications ?? defaultMedications);
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
          medications: draftMedications,
        }),
      });

      if (response.ok) {
        if (onUpdate) onUpdate();
        setIsEditing(false);
      } else {
        alert("Failed to save medication schedule. Please try again.");
      }
    } catch (error) {
      console.error("Failed to update medications", error);
      alert("Failed to save changes. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleMedicationChange = (index: number, field: keyof MedicationItem, value: string) => {
    const updated = [...draftMedications];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setDraftMedications(updated);
  };

  const handleAddMedication = () => {
    setDraftMedications([
      ...draftMedications,
      { name: "", time: "08:00 AM", note: "" },
    ]);
  };

  const handleRemoveMedication = (index: number) => {
    const updated = draftMedications.filter((_, i) => i !== index);
    setDraftMedications(updated);
  };

  const activeMedications = patient?.medications ?? defaultMedications;

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Care plan</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Medication Schedule</h2>
        </div>

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
                Edit Schedule
              </button>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-6 space-y-4">
          {draftMedications.length === 0 ? (
            <p className="text-slate-400 text-xs font-semibold text-center py-6 bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
              No medications scheduled. Click "Add Medication" below to create one.
            </p>
          ) : (
            draftMedications.map((med, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-3 items-end sm:items-center bg-slate-50 border border-slate-200 p-4 rounded-3xl relative"
              >
                <div className="flex-grow w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Name Input */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Medication Name
                    </label>
                    <input
                      type="text"
                      value={med.name}
                      onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-slate-800 text-sm font-semibold focus:border-teal-500 focus:outline-none transition"
                      placeholder="e.g. Paracetamol"
                      required
                    />
                  </div>

                  {/* Note Input */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Note / Instruction
                    </label>
                    <input
                      type="text"
                      value={med.note}
                      onChange={(e) => handleMedicationChange(index, "note", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-slate-700 text-sm focus:border-teal-500 focus:outline-none transition"
                      placeholder="e.g. Pain relief"
                    />
                  </div>

                  {/* Time Input */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Time
                    </label>
                    <input
                      type="text"
                      value={med.time}
                      onChange={(e) => handleMedicationChange(index, "time", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-slate-800 text-sm font-semibold focus:border-teal-500 focus:outline-none transition"
                      placeholder="e.g. 08:00 AM"
                      required
                    />
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemoveMedication(index)}
                  className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition self-center sm:self-end mt-2 sm:mt-0"
                  title="Remove Medication"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 006 3.75V4H5a2 2 0 00-2 2v.082c0 .245.022.49.066.73L4.2 16.5A3.25 3.25 0 007.427 19h5.146a3.25 3.25 0 003.228-2.77l1.134-9.688c.044-.24.066-.485.066-.73V6a2 2 0 00-2-2h-1v-.25A2.75 2.75 0 0011.25 1h-2.5zM8 4h4v-.25A1.25 1.25 0 0010.75 2.5h-1.5A1.25 1.25 0 008 3.75V4zM5 7h10l-1.127 9.63c-.114.975-.94 1.703-1.921 1.703H8.048c-.98 0-1.807-.728-1.92-1.703L5 7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}

          <button
            type="button"
            onClick={handleAddMedication}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 hover:border-teal-500 hover:text-teal-600 bg-white text-xs font-bold transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Add Medication
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {activeMedications.length === 0 ? (
            <p className="text-slate-400 text-xs font-semibold text-center py-8">
              No medications currently scheduled for this patient.
            </p>
          ) : (
            activeMedications.map((item, index) => (
              <article
                key={index}
                className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.name || "Unnamed Medication"}</h3>
                  <p className="text-sm text-slate-500">{item.note || "No specific instructions"}</p>
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                  {item.time || "N/A"}
                </span>
              </article>
            ))
          )}
        </div>
      )}
    </section>
  );
}

