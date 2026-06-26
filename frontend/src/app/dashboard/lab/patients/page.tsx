"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Upload, FileText, CheckCircle2, AlertCircle, Trash2, X } from "lucide-react";

type LabTestItem = {
  id: string;
  name: string;
  status: "Pending" | "Uploaded";
  pdfFilename: string | null;
  pdfData: string | null;
};

type Patient = {
  id: string;
  name: string;
  ward: string;
  age: number;
  labTest?: string;
  labTests?: LabTestItem[];
  hospitalCode?: string;
};

export default function LabPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Upload modal states
  const [uploadPatient, setUploadPatient] = useState<Patient | null>(null);
  const [uploadTest, setUploadTest] = useState<LabTestItem | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPatients = () => {
    fetch("/api/doctor/patients")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPatients(data);
        }
      })
      .catch(() => undefined);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.ward.toLowerCase().includes(query);

      const tests = patient.labTests || [];
      const hasPending = tests.some((t) => t.status === "Pending");
      const hasUploaded = tests.some((t) => t.status === "Uploaded");

      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter === "Pending"
            ? hasPending
            : statusFilter === "Uploaded"
              ? hasUploaded
              : true;

      return matchesSearch && matchesStatus;
    });
  }, [patients, searchQuery, statusFilter]);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  // Submit report PDF Base64
  const handleSubmitReport = async () => {
    if (!uploadPatient || !uploadTest || !selectedFile) return;
    setUploading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;

      // Update test item status & data
      const updatedTests: LabTestItem[] = (uploadPatient.labTests || []).map((t) => {
        if (t.id === uploadTest.id) {
          return {
            ...t,
            status: "Uploaded",
            pdfFilename: selectedFile.name,
            pdfData: base64Data,
          };
        }
        return t;
      });

      const description = updatedTests.map((t) => t.name).join(", ");

      try {
        const res = await fetch(`/api/doctor/patients/${uploadPatient.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            labTest: description,
            labTests: updatedTests,
          }),
        });

        if (res.ok) {
          setUploadPatient(null);
          setUploadTest(null);
          setSelectedFile(null);
          fetchPatients();
        }
      } catch {}
      setUploading(false);
    };
    reader.readAsDataURL(selectedFile);
  };

  // Delete PDF Report (reset to Pending)
  const handleDeleteReport = async (patient: Patient, testId: string) => {
    const updatedTests: LabTestItem[] = (patient.labTests || []).map((t) => {
      if (t.id === testId) {
        return {
          ...t,
          status: "Pending",
          pdfFilename: null,
          pdfData: null,
        };
      }
      return t;
    });

    const description = updatedTests.map((t) => t.name).join(", ");

    try {
      const res = await fetch(`/api/doctor/patients/${patient.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          labTest: description,
          labTests: updatedTests,
        }),
      });

      if (res.ok) {
        fetchPatients();
      }
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Lab Pathology Queue</h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Diagnostic Report Center</p>

        <div className="relative mt-6">
          <Search size={18} className="absolute left-4 top-4 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search patient by name, ID, or ward..."
            className="w-full border border-slate-200 rounded-2xl pl-12 pr-4 py-3 outline-none transition focus:border-teal-500 focus:bg-slate-50/50 text-slate-800 text-sm font-medium"
          />
        </div>

        <div className="flex gap-2.5 mt-5 flex-wrap">
          {["All", "Pending", "Uploaded"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatusFilter(item)}
              className={`rounded-xl px-5 py-2 text-xs font-semibold tracking-wide uppercase transition ${
                statusFilter === item
                  ? "bg-teal-600 text-white shadow-md shadow-teal-600/10"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-teal-500 hover:text-teal-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-slate-500 font-semibold px-2">
        Showing {filteredPatients.length} patient{filteredPatients.length === 1 ? "" : "s"} in queue.
      </div>

      {/* Patient Lab Queue Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider text-left">
                <th className="p-5">Patient Name</th>
                <th>Ward Location</th>
                <th>Age</th>
                <th>Assigned Pathology Tests & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-slate-400 font-semibold">
                    No diagnostics queued.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => {
                  const tests = patient.labTests || [];
                  return (
                    <tr key={patient.id} className="hover:bg-slate-50/40 transition">
                      <td className="p-5">
                        <div className="font-bold text-slate-900">{patient.name}</div>
                        <div className="text-xs text-slate-400 font-bold mt-0.5">{patient.id}</div>
                      </td>
                      <td className="text-slate-600">{patient.ward}</td>
                      <td className="text-slate-600">{patient.age}</td>
                      <td className="p-4">
                        <div className="space-y-2.5 my-1.5">
                          {tests.length === 0 ? (
                            <span className="text-xs text-slate-400 font-semibold">
                              No lab tests assigned.
                            </span>
                          ) : (
                            tests.map((test) => (
                              <div key={test.id} className="flex items-center justify-between gap-4 max-w-xl bg-slate-50/50 border border-slate-100 rounded-xl p-3 shadow-sm hover:bg-slate-50 transition">
                                <div className="flex items-center gap-2">
                                  {test.status === "Uploaded" ? (
                                    <CheckCircle2 size={16} className="text-teal-600" />
                                  ) : (
                                    <AlertCircle size={16} className="text-amber-500" />
                                  )}
                                  <div>
                                    <span className="font-bold text-slate-800 text-sm">{test.name}</span>
                                    {test.pdfFilename && (
                                      <span className="block text-slate-400 font-medium text-[11px] mt-0.5 truncate max-w-xs">
                                        File: {test.pdfFilename}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  {test.status === "Pending" ? (
                                    <button
                                      onClick={() => {
                                        setUploadPatient(patient);
                                        setUploadTest(test);
                                      }}
                                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-bold transition"
                                    >
                                      <Upload size={12} />
                                      <span>Upload Report</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleDeleteReport(patient, test.id)}
                                      className="flex items-center gap-1.5 px-3 py-1.5 border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-bold transition"
                                    >
                                      <Trash2 size={12} />
                                      <span>Delete Report</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Upload Modal */}
      {uploadPatient && uploadTest && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-100 p-6 space-y-6 animate-scale-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Upload Lab Report</h2>
                <p className="text-xs text-slate-400 font-bold mt-0.5">
                  Test: {uploadTest.name} | Patient: {uploadPatient.name}
                </p>
              </div>
              <button
                onClick={() => {
                  setUploadPatient(null);
                  setUploadTest(null);
                  setSelectedFile(null);
                }}
                className="text-slate-400 hover:text-slate-900 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Drag & Drop dashed box */}
            <div
              onClick={triggerFileSelect}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
                dragOver
                  ? "border-teal-500 bg-teal-50/50"
                  : "border-slate-200 hover:border-teal-500 hover:bg-teal-50/20"
              }`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Upload size={20} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-700">
                    {selectedFile ? selectedFile.name : "Drag & drop PDF here"}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {selectedFile
                      ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                      : "or click to browse local files"}
                  </p>
                </div>
              </div>
            </div>

            {selectedFile && (
              <div className="flex items-center gap-3 bg-teal-50/40 border border-teal-100 rounded-xl p-3 text-teal-800 text-xs font-bold">
                <FileText size={16} className="text-teal-600" />
                <span className="flex-1 truncate">{selectedFile.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="text-teal-600 hover:text-teal-800 p-0.5 rounded"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-slate-100 justify-end">
              <button
                onClick={() => {
                  setUploadPatient(null);
                  setUploadTest(null);
                  setSelectedFile(null);
                }}
                className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReport}
                disabled={!selectedFile || uploading}
                className="px-6 py-3 rounded-2xl bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 shadow-md shadow-teal-600/10 font-bold text-sm transition flex items-center gap-2"
              >
                <span>{uploading ? "Uploading..." : "Submit Report"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
