import {
  Activity,
  Brain,
  ShieldCheck,
  Users,
  Cloud,
} from "lucide-react";

const benefits = [
  {
    icon: Activity,
    title: "24/7 Real-Time Monitoring",
    desc: "Continuous tracking of patient vitals and health parameters.",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    desc: "Predict outcomes and detect risks before they become critical.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    desc: "HIPAA compliant with role-based access and data encryption.",
  },
  {
    icon: Users,
    title: "Multi-Role Access",
    desc: "Designed for Doctors, Nurses, Lab Technicians and Admins.",
  },
  {
    icon: Cloud,
    title: "Cloud Based",
    desc: "Accessible from anywhere, anytime.",
  },
];

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="relative -mt-6 z-20 pb-16"
    >
      <div className="max-w-[1600px] mx-auto px-10 xl:px-20">

        <div
          className="
          bg-white
          rounded-[28px]
          border
          border-slate-200
          shadow-[0_40px_40px_rgba(15,23,42,0.08)]
          overflow-hidden
          "
        >

          <div className="grid lg:grid-cols-5">

            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                  relative
                  p-8
                  text-center
                  border-r
                  last:border-r-0
                  border-slate-100
                  hover:bg-[#FAFEFE]
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  "
                >

                  {/* Icon */}

                  <div
                    className="
                    w-20
                    h-26
                    mx-auto
                    rounded-full
                    bg-[#ECFDFC]
                    flex
                    items-center
                    justify-center
                    shadow-sm
                    "
                  >
                    <Icon
                      size={30}
                      className="text-teal-600"
                    />
                  </div>

                  {/* Title */}

                  <h3
                    className="
                    mt-5
                    text-[20px]
                    font-semibold
                    text-slate-900
                    leading-6
                    "
                  >
                    {item.title}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                    mt-3
                    text-[14px]
                    leading-6
                    text-slate-500
                    "
                  >
                    {item.desc}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}