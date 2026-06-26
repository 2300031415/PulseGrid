export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-600">AI</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">AI Insights</h1>
        <p className="mt-3 text-slate-500">This intelligence layer covers risk prediction, infection probability, recovery forecasting, and discharge recommendations for the clinical team.</p>
      </section>

      <div className="grid gap-6 xl:grid-cols-4">
        {[
          ["High Risk Patients", "4 patients above the 85th percentile risk threshold."],
          ["Top Recovery Patients", "7 patients show stronger-than-average recuperation scores."],
          ["Infection Risk", "2 cases flagged for infection monitoring this week."],
          ["Readmission Risk", "1 patient is a potential readmission candidate."],
        ].map(([title, text]) => (
          <article key={title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-3 text-slate-500">{text}</p>
          </article>
        ))}
      </div>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-900">AI recommendations</h2>
          <ul className="mt-5 space-y-3 text-slate-700">
            {[
              "Increase monitoring for P-1049 due to trending low oxygen saturation.",
              "Schedule lab test review for Meera Iyer based on rising infection indicators.",
              "Discharge candidate review for Arjun Sharma in next 48 hours.",
              "Escalate to ICU for a battery-low sensor event in CCU.",
            ].map((item) => <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">{item}</li>)}
          </ul>
        </article>

        <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-900">Prediction engine</h2>
          <p className="mt-3 text-slate-500">This area is planned to connect into the AI service layer for recovery prediction, anomaly detection, ECG analysis, and discharge forecasting once the backend microservice is live.</p>
          <div className="mt-5 space-y-3">
            {[
              ["Recovery Score", "87%"],
              ["Risk Score", "Moderate"],
              ["Discharge Forecast", "2–3 days"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <span>{label}</span>
                <strong className="text-slate-900">{value}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
