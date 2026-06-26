import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 py-24">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          <div>

            <h2 className="text-5xl font-bold text-white">
              Ready To Transform Patient Care?
            </h2>

            <p className="mt-6 text-cyan-100 text-xl leading-8">
              Join leading hospitals that trust PulseGrid
              for real-time monitoring, AI insights and
              better patient outcomes.
            </p>

          </div>

          <div className="flex lg:justify-end gap-4">

            <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold flex items-center gap-2">
              Get Started Today
              <ArrowRight size={18} />
            </button>

            <button className="border border-white text-white px-8 py-4 rounded-xl font-semibold">
              Talk To Sales
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}