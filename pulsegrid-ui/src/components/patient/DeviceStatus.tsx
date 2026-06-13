const devices = [
  { name: "ECG Sensor", status: "Connected", detail: "Lead II stable" },
  { name: "Pulse Sensor", status: "Connected", detail: "Beat interval clear" },
  { name: "SpO₂ Sensor", status: "Connected", detail: "Signal strength strong" },
  { name: "Temperature Sensor", status: "Connected", detail: "Last reading 36.8°C" },
];

const gateway = [
  { label: "Gateway", value: "ESP32-E01" },
  { label: "Protocol", value: "UDP → Socket.IO" },
  { label: "Last Packet", value: "2 seconds ago" },
  { label: "Status", value: "Online" },
];

export default function DeviceStatus() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Hardware</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Connected Devices</h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">4 devices online</span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {devices.map((device) => (
          <article key={device.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:bg-teal-50/40">
            <p className="text-sm text-slate-500">{device.name}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{device.status}</h3>
            <p className="mt-2 text-sm text-slate-500">{device.detail}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {gateway.map((item) => (
          <article key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">{item.label}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{item.value}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
