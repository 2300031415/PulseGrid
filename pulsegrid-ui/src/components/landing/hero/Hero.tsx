import DashboardMockup from "../hero/DashboardMockup";
import PhoneMockup from "../hero/PhoneMockup";
import ECGAnimation from "../hero/ECGAnimation";
import FloatingParticles from "../hero/FloatingParticles";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-white via-[#F8FCFC] to-[#EDF9F8]"
    >
      <FloatingParticles />

      {/* Background Glows */}

      <div className="absolute -left-48 top-0 w-[700px] h-[700px] rounded-full bg-teal-200/20 blur-[140px]" />

      <div className="absolute -right-48 top-0 w-[700px] h-[700px] rounded-full bg-cyan-200/20 blur-[140px]" />

      <div className="absolute right-40 top-32 w-[400px] h-[400px] rounded-full bg-teal-300/10 blur-[120px]" />

      <div className="absolute left-20 bottom-20 w-[300px] h-[300px] rounded-full bg-cyan-200/10 blur-[100px]" />

      {/* Main Container */}

      <div className="relative max-w-[1600px] mx-auto px-10 xl:px-20 pt-16 pb-10">

        <div className="grid lg:grid-cols-[42%_58%] gap-8 items-center">

          {/* LEFT SIDE */}

          <div>

            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm">
              ● Connected Care • Real-Time Insight
            </div>

            <h1 className="mt-7 text-[72px] leading-[78px] font-extrabold tracking-[-2px] text-slate-900">
              Smarter Hospital
              <br />
              Monitoring for
              <br />
              <span className="bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Better Outcomes
              </span>
            </h1>

            <p className="mt-7 text-[20px] leading-10 text-slate-600 max-w-2xl">
              PulseGrid empowers doctors, nurses, administrators and
              patients with real-time monitoring, AI-powered clinical
              insights, intelligent alerts and recovery analytics.
            </p>

            {/* CTA */}

            <div className="flex flex-wrap gap-5 mt-10">

              <button
                className="
                px-8 py-4 rounded-xl
                bg-gradient-to-r
                from-teal-500
                to-blue-600
                text-white
                font-semibold
                shadow-lg
                hover:scale-105
                hover:-translate-y-1
                hover:shadow-[0_15px_40px_rgba(20,184,166,0.35)]
                transition-all duration-300
                "
              >
                Request Demo →
              </button>

              <button
                className="
                px-8 py-4 rounded-xl
                border border-teal-300
                text-teal-700
                font-semibold
                hover:bg-teal-500
                hover:text-white
                hover:border-teal-500
                hover:scale-105
                transition-all duration-300
                "
              >
                Explore Features
              </button>

            </div>

            {/* TRUSTED USERS */}

            <div className="flex items-center gap-5 mt-10">

              <div className="flex -space-x-3">

                <img
                  src="https://i.pravatar.cc/100?img=11"
                  alt=""
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />

                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt=""
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />

                <img
                  src="https://i.pravatar.cc/100?img=13"
                  alt=""
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />

                <img
                  src="https://i.pravatar.cc/100?img=18"
                  alt=""
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />

              </div>

              <div>

                <p className="font-semibold text-slate-800">
                  Trusted by 1000+ Healthcare Professionals
                </p>

                <p className="text-sm text-slate-500">
                  Doctors • Nurses • Hospitals • Clinics
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="relative h-[550px] flex items-center justify-center">

            <ECGAnimation />

            {/* Dashboard Glow */}

            <div className="absolute w-[650px] h-[350px] bg-teal-400/20 blur-[120px] rounded-full" />

            {/* Dashboard */}

            <div
              className="
              relative z-20
              animate-[float_6s_ease-in-out_infinite]
              "
            >
              <DashboardMockup />
            </div>

            {/* Phone */}

            <div
              className="
              absolute
              right-[20px]
              top-[20px]
              z-30
              rotate-[4deg]
              animate-[phoneFloat_6s_ease-in-out_infinite]
              "
            >
              <PhoneMockup />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}