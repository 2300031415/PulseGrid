import {
  Shield,
  Users,
  Building2,
  Clock3,
  Brain,
  Lock,
} from "lucide-react";

const stats = [
  {
    icon: Shield,
    value: "99.9%",
    label: "Platform Uptime",
  },
  {
    icon: Users,
    value: "1000+",
    label: "Patients Supported",
  },
  {
    icon: Building2,
    value: "50+",
    label: "Healthcare Facilities",
  },
  {
    icon: Clock3,
    value: "24/7",
    label: "Monitoring",
  },
  {
    icon: Brain,
    value: "AI",
    label: "Clinical Insights",
  },
  {
    icon: Lock,
    value: "100%",
    label: "Data Security",
  },
];

export default function Stats() {
  return (
    <section id="Stats" className="bg-gradient-to-r from-[#012A44] to-[#014A5A] py-12">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid lg:grid-cols-6 gap-6">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="text-center text-white"
              >
                <Icon
                  size={30}
                  className="mx-auto mb-3"
                />

                <h3 className="text-3xl font-bold">
                  {stat.value}
                </h3>

                <p className="text-slate-300 mt-2">
                  {stat.label}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}