export default function DevicePanel() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6">

      <h3 className="text-xl font-bold mb-5">
        Device Information
      </h3>

      <div className="space-y-4">

        <Info
          label="Device"
          value="ESP32-E01"
        />

        <Info
          label="Status"
          value="Online"
        />

        <Info
          label="Battery"
          value="92%"
        />

        <Info
          label="Signal"
          value="Strong"
        />

        <Info
          label="Firmware"
          value="v1.2.0"
        />

      </div>

    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">

      <span className="text-slate-500">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}