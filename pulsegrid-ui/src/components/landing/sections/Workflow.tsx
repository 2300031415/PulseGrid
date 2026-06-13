import {
  Building2,
  Monitor,
  Brain,
  BellRing,
  Activity,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    icon: Building2,
    title: "Hospital",
    desc: "Add departments, staff and configure settings.",
  },
  {
    icon: Monitor,
    title: "Monitor",
    desc: "Track patient vitals and health in real-time.",
  },
  {
    icon: Brain,
    title: "Analyze",
    desc: "AI analyzes data and detects potential risks.",
  },
  {
    icon: BellRing,
    title: "Alert",
    desc: "Instant alerts notify care teams.",
  },
  {
    icon: Activity,
    title: "Treat",
    desc: "Take action and update treatment plans.",
  },
  {
    icon: TrendingUp,
    title: "Recover",
    desc: "Track recovery and improve outcomes.",
  },
];

export default function Workflow() {
  return (
    <section id="Workflow" className="py-24 bg-gradient-to-b from-white to-[#F8FCFC] relative overflow-hidden">
      
      {/* Global CSS Injection for Streaming Node Pipelines */}
      <style>{`
        @keyframes line-dash-flow {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-flow-line {
          stroke-dasharray: 8, 4;
          animation: line-dash-flow 1.2s infinite linear;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-8 relative z-10">

        {/* Heading */}
        <div className="text-center">
          <h2 className="mt-3 text-5xl font-bold text-slate-900">
            A Smarter Workflow For Better Care
          </h2>
        </div>

        {/* WORKFLOW MATRIX STRUCTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-16 lg:gap-x-6 mt-24 relative">

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={index}
                className="text-center relative group flex flex-col items-center"
              >
                {/* CONNECTING NODE PATHWAY LAYERS */}
                {!isLast && (
                  <>
                    {/* DESKTOP PIPELINE NODE: Runs horizontally to the next item */}
                    <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-4 pointer-events-none z-0">
                      <svg className="w-full h-full" viewBox="0 0 100 16" preserveAspectRatio="none">
                        <path 
                          d="M 0,8 L 100,8" 
                          fill="none" 
                          stroke="rgba(20, 184, 166, 0.15)" 
                          strokeWidth="2"
                        />
                        <path 
                          d="M 0,8 L 100,8" 
                          fill="none" 
                          stroke="#14B8A6" 
                          strokeWidth="2" 
                          className="animate-flow-line drop-shadow-[0_0_2px_rgba(20,184,166,0.4)]"
                        />
                      </svg>
                    </div>

                    {/* MOBILE PIPELINE NODE: Runs vertically down to the next item */}
                    <div className="block lg:hidden absolute top-[84px] bottom-[-60px] left-1/2 -translate-x-1/2 w-4 pointer-events-none z-0">
                      <svg className="w-full h-full" viewBox="0 0 16 100" preserveAspectRatio="none">
                        <path 
                          d="M 8,0 L 8,100" 
                          fill="none" 
                          stroke="rgba(20, 184, 166, 0.15)" 
                          strokeWidth="2"
                        />
                        <path 
                          d="M 8,0 L 8,100" 
                          fill="none" 
                          stroke="#14B8A6" 
                          strokeWidth="2" 
                          className="animate-flow-line drop-shadow-[0_0_2px_rgba(20,184,166,0.4)]"
                        />
                      </svg>
                    </div>
                  </>
                )}

                {/* ICON CONNECTOR HOUSING */}
                <div className="relative mx-auto w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center border border-transparent transition-all duration-300 group-hover:border-teal-200 group-hover:bg-teal-100/50 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] group-hover:scale-105 z-10">
                  <Icon
                    size={34}
                    className="text-teal-600 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* TEXT METADATA */}
                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {index + 1}. {step.title}
                </h3>

                <p className="mt-3 text-slate-500 text-sm leading-6 max-w-[220px] lg:max-w-none px-4 lg:px-0">
                  {step.desc}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
