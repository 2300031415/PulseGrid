import {
  HeartPulse,
  ChartSpline,
  BellRing,
  MonitorSmartphone,
} from "lucide-react";

const features = [
  {
    icon: HeartPulse,
    title: "Patient Monitoring",
    desc: "Real-time tracking of vitals, ECG, SpO₂, BP and more.",
  },
  {
    icon: ChartSpline,
    title: "Recovery Analytics",
    desc: "AI-powered recovery scores and personalized progress tracking.",
  },
  {
    icon: BellRing,
    title: "Alerts & Notifications",
    desc: "Instant alerts for abnormal changes and critical events.",
  },
  {
    icon: MonitorSmartphone,
    title: "Multi-Device Support",
    desc: "Desktop, tablet and mobile access anywhere.",
  },
];

export default function Features() {
  return (
    <section
      id="Features"
      className="py-28 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Dynamic Keyframe Injection */}
      <style>{`
        @keyframes custom-heart-beat {
          0%, 70%, 100% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1.05); }
          45% { transform: scale(1.22); }
        }
        @keyframes custom-pulse-flow {
          0% { stroke-dashoffset: 1500; }
          100% { stroke-dashoffset: -1500; }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-40px) translateX(20px); opacity: 0.7; }
        }
        .animate-heart-beat {
          animation: custom-heart-beat 1.4s infinite cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .animate-pulse-flow {
          stroke-dasharray: 1500;
          animation: custom-pulse-flow 3.5s infinite linear;
        }
        .animate-particle {
          animation: float-particle 6s infinite ease-in-out;
        }
      `}</style>

      {/* Futuristic Background Atmospheric Glows */}
      <div className="absolute left-[-10%] top-20 w-[600px] h-[600px] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute right-[-10%] bottom-10 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Floating Network Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full animate-particle"
            style={{
              left: `${(i * 4) + 2}%`,
              top: `${((i * 17) % 80) + 10}%`,
              animationDelay: `${(i * 0.35)}s`,
              animationDuration: `${5 + (i % 4)}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto px-10 xl:px-20 relative z-10">

        {/* Heading */}
        <div className="text-center mb-24">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Powerful Features For Modern Healthcare
          </h2>
          <p className="mt-5 text-lg text-slate-400 max-w-3xl mx-auto">
            Everything healthcare teams need for monitoring,
            analytics, alerts and intelligent patient care.
          </p>
        </div>

        <div className="grid lg:grid-cols-[45%_55%] gap-16 items-center">

          {/* LEFT SIDE: FEATURE GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="
                  bg-slate-900/60
                  backdrop-blur-md
                  border
                  border-slate-800
                  rounded-3xl
                  p-8
                  shadow-xl
                  hover:border-teal-100/40
                  hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]
                  hover:-translate-y-2
                  transition-all
                  duration-300
                  text-center
                  group
                  "
                >
                  <div className="w-16 h-16 rounded-2xl bg-teal-950/50 border border-teal-800/50 flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110">
                    <Icon
                      size={30}
                      className="text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-slate-100">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-slate-400 leading-7 text-sm">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE: ANATOMICAL HEART & STREAMING EKG GRAPH */}
          <div className="relative flex flex-col justify-center min-h-[450px] px-4">
            
            {/* Live Engine Status Header */}
            <div className="flex items-center gap-3 mb-6 self-start bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-ping" />
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest font-mono">Live Telemetry Pipeline</span>
            </div>

            {/* Main Interactive Interface Block */}
            <div className="relative w-full flex items-center bg-slate-900/30 border border-slate-800/60 rounded-3xl p-8 backdrop-blur-sm overflow-hidden">
              
              {/* Internal Clinical Telemetry Grid Overlay */}
              <div 
                className="absolute inset-0 opacity-5 pointer-events-none rounded-3xl"
                style={{
                  backgroundImage: 'linear-gradient(to right, #14b8a6 1px, transparent 1px), linear-gradient(to bottom, #14b8a6 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* ANATOMICAL VECTOR HEART OBJECT (Rhythmic Contraction Loop) */}
              <div className="relative w-28 h-28 bg-teal-950/40 rounded-2xl border border-teal-500/30 flex items-center justify-center shrink-0 z-10 overflow-hidden">
                <svg
                  viewBox="0 0 100 120"
                  className="w-20 h-20 text-teal-400 animate-anatomical-heart"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Superior Vena Cava & Aorta Archeology */}
                  <path d="M38,25 L38,10 C38,10 44,7 48,12 L48,22" />
                  <path d="M48,18 C52,8 64,8 68,18 L68,32" strokeWidth="3" />
                  <path d="M58,13 L58,5" />
                  <path d="M64,15 L66,7" />
                  
                  {/* Pulmonary Artery Elements */}
                  <path d="M32,32 C30,22 42,20 45,30" />
                  <path d="M30,24 L24,19" />
                  
                  {/* Primary Muscular Ventricle & Atrium Assembly */}
                  <path 
                    d="M32,32 
                       C15,35 12,65 30,85 
                       C38,92 46,102 50,105 
                       C54,102 62,92 70,85 
                       C88,65 85,35 68,32
                       C62,31 55,36 50,42
                       C45,36 38,31 32,32 Z" 
                    fill="url(#heart-grad)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />

                  {/* Surface Coronary Arteries Mapping Lines */}
                  <path d="M50,42 Q45,60 34,72" strokeWidth="1.5" className="opacity-80" />
                  <path d="M47,54 Q54,68 62,76" strokeWidth="1" className="opacity-70" />
                  <path d="M36,48 Q32,58 24,62" strokeWidth="1" className="opacity-60" />

                  {/* Internal Neon Glow Definition */}
                  <defs>
                    <linearGradient id="heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Sub-Surface Soft Core Blur Glow */}
                <div className="absolute inset-0 bg-teal-500/5 rounded-2xl blur-md -z-10 animate-pulse" />
              </div>
              
              {/* Endless Moving Fluid Pulse Wave */}
              <div className="flex-1 h-[180px] relative ml-4 overflow-hidden">
                <svg
                  viewBox="0 0 800 200"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  {/* Background Path Track */}
                  <path
                    d="M 0,100 L 50,100 L 65,80 L 80,120 L 95,100 L 150,100 L 165,15 L 185,185 L 205,75 L 215,115 L 225,100 L 290,100 L 305,80 L 320,120 L 335,100 L 390,100 L 405,15 L 425,185 L 445,75 L 455,115 L 465,100 L 530,100 L 545,80 L 560,120 L 575,100 L 630,100 L 645,15 L 665,185 L 685,75 L 695,115 L 705,100 L 800,100"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-10"
                  />
                  {/* Glowing Flowing Vector */}
                  <path
                    d="M 0,100 L 50,100 L 65,80 L 80,120 L 95,100 L 150,100 L 165,15 L 185,185 L 205,75 L 215,115 L 225,100 L 290,100 L 305,80 L 320,120 L 335,100 L 390,100 L 405,15 L 425,185 L 445,75 L 455,115 L 465,100 L 530,100 L 545,80 L 560,120 L 575,100 L 630,100 L 645,15 L 665,185 L 685,75 L 695,115 L 705,100 L 800,100"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-pulse-flow drop-shadow-[0_0_10px_#14B8A6]"
                  />
                </svg>
              </div>

            </div>


          </div>

        </div>
      </div>
    </section>
  );
}
