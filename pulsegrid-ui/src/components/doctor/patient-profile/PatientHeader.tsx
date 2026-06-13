export default function PatientHeader() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm text-slate-500">
            Patient ID: P-1049
          </p>

          <h1 className="text-4xl font-bold text-slate-900 mt-1">
            Lakshmi Menon
          </h1>

          <p className="text-slate-500 mt-2">
            Female • 55 Years • Post-Op Ward • Room E-01
          </p>

        </div>

        <div className="text-right">

          <div className="inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
            Stable
          </div>

          <p className="text-slate-500 mt-3">
            Doctor: Dr. Sarah Johnson
          </p>

        </div>

      </div>

    </div>
  );
}