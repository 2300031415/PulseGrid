const labTestNormalRanges: Record<string, { name: string; value: string; note: string }[]> = {
  "CBC": [
    { name: "WBC (White Blood Cells)", value: "7.1 K/uL", note: "Within normal range" },
    { name: "Hemoglobin", value: "13.4 g/dL", note: "Stable recovery" }
  ],
  "Lipid Panel": [
    { name: "Total Cholesterol", value: "185 mg/dL", note: "Desirable (< 200)" },
    { name: "Triglycerides", value: "120 mg/dL", note: "Normal (< 150)" },
    { name: "HDL", value: "45 mg/dL", note: "Optimal (> 40)" },
    { name: "LDL", value: "116 mg/dL", note: "Near optimal" }
  ],
  "CRP": [
    { name: "CRP (C-Reactive Protein)", value: "8.2 mg/L", note: "Mild inflammation" }
  ],
  "ECG Study": [
    { name: "PR Interval", value: "160 ms", note: "Normal sinus conduction" },
    { name: "QRS Duration", value: "92 ms", note: "Normal ventricular activation" },
    { name: "QTc", value: "412 ms", note: "Normal repolarization" }
  ],
  "Urinalysis": [
    { name: "Color", value: "Light Yellow", note: "Normal hydration" },
    { name: "Clarity", value: "Clear", note: "No debris or cloudiness" },
    { name: "Glucose", value: "Negative", note: "Normal" },
    { name: "Protein", value: "Negative", note: "Normal" }
  ]
};

export default function LabResults({ patient }: { patient: any }) {
  const tests = patient?.labTests || [];
  
  // Flatten all sub-components for the assigned tests
  const results = tests.flatMap((test: any) => {
    const matched = labTestNormalRanges[test.name];
    if (matched) return matched;
    // Fallback if the test name is custom/unrecognized
    return [{ name: test.name, value: test.status, note: `Status: ${test.status}` }];
  });

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Lab</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">Latest Lab Results</h2>

      <div className="mt-6 space-y-3">
        {results.length === 0 ? (
          <p className="text-slate-400 text-sm py-4 text-center font-medium">No lab tests assigned to this patient.</p>
        ) : (
          results.map((item) => (
            <article key={item.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                <span className="text-lg font-bold text-teal-700">{item.value}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{item.note}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
