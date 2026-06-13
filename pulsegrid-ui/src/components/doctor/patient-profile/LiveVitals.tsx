import {
  Heart,
  Activity,
  Thermometer,
  Wind,
} from "lucide-react";

export default function LiveVitals() {
  const vitals = [
    {
      icon: Heart,
      label: "Heart Rate",
      value: "82 bpm",
      color: "text-red-500",
    },
    {
      icon: Activity,
      label: "SpO₂",
      value: "98%",
      color: "text-teal-600",
    },
    {
      icon: Thermometer,
      label: "Temperature",
      value: "36.8°C",
      color: "text-orange-500",
    },
    {
      icon: Wind,
      label: "Respiration",
      value: "18/min",
      color: "text-cyan-600",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6">

      <h3 className="text-xl font-bold mb-6">
        Live Vitals
      </h3>

      <div className="grid lg:grid-cols-4 gap-4">

        {vitals.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="bg-slate-50 rounded-xl p-5"
            >
              <Icon
                className={item.color}
                size={24}
              />

              <p className="text-slate-500 mt-3">
                {item.label}
              </p>

              <h3
                className={`text-3xl font-bold mt-2 ${item.color}`}
              >
                {item.value}
              </h3>
            </div>
          );
        })}

      </div>

    </div>
  );
}