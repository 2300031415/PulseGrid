export default function Footer() {
  return (
    <footer id="Footer" className="bg-slate-950 text-white py-16">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid lg:grid-cols-4 gap-12">

          <div>
            <h2 className="text-3xl font-bold text-teal-400">
              PulseGrid
            </h2>

            <p className="mt-4 text-slate-400 leading-7">
              Intelligent healthcare monitoring platform
              powered by real-time analytics and AI.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Platform
            </h3>

            <div className="space-y-3 text-slate-400">
              <p>Monitoring</p>
              <p>Analytics</p>
              <p>Reports</p>
              <p>Alerts</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Solutions
            </h3>

            <div className="space-y-3 text-slate-400">
              <p>Hospitals</p>
              <p>Clinics</p>
              <p>ICU</p>
              <p>Remote Care</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-slate-400">
              <p>support@pulsegrid.ai</p>
              <p>contact@pulsegrid.ai</p>
              <p>24/7 Support</p>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          © 2026 PulseGrid. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}