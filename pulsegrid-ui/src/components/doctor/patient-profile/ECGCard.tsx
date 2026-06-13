export default function ECGCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6">

      <div className="flex justify-between mb-5">

        <h3 className="text-xl font-bold">
          Live ECG
        </h3>

        <span className="text-green-600 font-semibold">
          Connected
        </span>

      </div>

      <svg
        viewBox="0 0 1000 200"
        className="w-full h-[220px]"
      >
        <path
          d="
          M0 100
          L120 100
          L160 40
          L200 170
          L250 100
          L380 100
          L420 50
          L470 170
          L540 100
          L1000 100
          "
          fill="none"
          stroke="#14B8A6"
          strokeWidth="5"
          className="ecg-flow"
        />
      </svg>

    </div>
  );
}