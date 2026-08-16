import { ShieldCheck, Clock, MapPin, Layers } from "lucide-react";

const specs = [
  {
    icon: Layers,
    label: "Minimum Order Quantity (MOQ)",
    value: "3,000 pairs / design",
    detail: "Across all styles and colourways",
  },
  {
    icon: Clock,
    label: "Production Lead Time",
    value: "20–30 days FOB",
    detail: "From order confirmation to port",
  },
  {
    icon: ShieldCheck,
    label: "Compliance & Certifications",
    value: "OEKO-TEX Standard 100, Sedex Audited",
    detail: "Full supply chain transparency",
  },
  {
    icon: MapPin,
    label: "Shipping Ports",
    value: "Karachi (PKQCT / KICT)",
    detail: "Direct access to global shipping lanes",
  },
];

export default function ManufacturingSpecs() {
  return (
    <section id="specifications" className="py-24 bg-indus-900 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indus-700/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indus-800/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gold-500/10 border border-gold-500/20 text-gold-400 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            Manufacturing &amp; Order Specs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Built for Scale
          </h2>
          <p className="mt-4 text-indus-300 max-w-2xl mx-auto text-lg">
            Our factory is set up for large-scale B2B production with rigorous
            quality and compliance standards.
          </p>
        </div>

        {/* Spec cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.label}
                className="group bg-indus-800/60 backdrop-blur-sm border border-indus-700/50 rounded-2xl p-6 hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold-500/20 transition-colors">
                  <Icon size={24} className="text-gold-400" />
                </div>
                <div className="text-xs text-indus-400 font-semibold tracking-wider uppercase mb-2">
                  {spec.label}
                </div>
                <div className="text-lg font-bold text-white mb-2">
                  {spec.value}
                </div>
                <div className="text-sm text-indus-400">{spec.detail}</div>
              </div>
            );
          })}
        </div>

        {/* Additional info bar */}
        <div className="mt-12 bg-indus-800/40 border border-indus-700/30 rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold text-white mb-1">
              Ready to place your order?
            </h3>
            <p className="text-indus-300 text-sm">
              Get a detailed quote with FOB pricing, custom packaging options,
              and production timeline.
            </p>
          </div>
          <a
            href="#inquire"
            className="flex-shrink-0 px-8 py-3 bg-gold-500 text-indus-900 rounded-lg font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </section>
  );
}
