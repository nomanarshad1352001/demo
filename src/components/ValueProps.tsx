import { Cpu, Link2, Package, Zap } from "lucide-react";

const valueProps = [
  {
    icon: Cpu,
    title: "Jacquard Integration",
    description:
      "Computerised jacquard — your logo or pattern knit directly in, with no per-colour minimum charge.",
    highlight: "No colour limits",
  },
  {
    icon: Link2,
    title: "Seamless Construction",
    description:
      "Linked toe-seam as standard (not an upcharge) — zero rough Rosso-seam finish for maximum comfort.",
    highlight: "Zero upcharge",
  },
  {
    icon: Package,
    title: "Full-Scale Sizing",
    description:
      "Infant through adult XXL sizing under one factory umbrella — one shipment, one invoice.",
    highlight: "All sizes, one factory",
  },
  {
    icon: Zap,
    title: "Rapid Turnaround",
    description:
      "Digital knit-count and gauge sampling turned around in under 7 days.",
    highlight: "Under 7 days",
  },
];

export default function ValueProps() {
  return (
    <section id="why-us" className="py-24 bg-charcoal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-indus-100 text-indus-700 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal-900 tracking-tight">
            Why INDUS LOOM for
            <br />
            <span className="text-indus-600">Socks &amp; Hosiery</span>
          </h2>
          <p className="mt-4 text-charcoal-500 max-w-2xl mx-auto text-lg">
            From design to delivery, we provide end-to-end manufacturing
            excellence with unmatched flexibility and speed.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop) => {
            const Icon = prop.icon;
            return (
              <div
                key={prop.title}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-charcoal-100 hover:border-indus-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-indus-50 group-hover:bg-indus-600 rounded-xl flex items-center justify-center mb-6 transition-colors">
                  <Icon
                    size={28}
                    className="text-indus-600 group-hover:text-white transition-colors"
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-charcoal-900 mb-3">
                  {prop.title}
                </h3>
                <p className="text-charcoal-500 text-sm leading-relaxed mb-4">
                  {prop.description}
                </p>

                {/* Highlight chip */}
                <span className="inline-block px-3 py-1 bg-gold-100 text-gold-600 rounded-full text-xs font-semibold">
                  {prop.highlight}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
