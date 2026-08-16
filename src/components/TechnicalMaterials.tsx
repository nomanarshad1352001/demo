const yarnTypes = [
  {
    name: "Combed Cotton",
    description: "Premium long-staple cotton for durability and softness",
    badge: "Most Popular",
  },
  {
    name: "Bamboo Viscose",
    description: "Anti-bacterial, moisture-wicking, silky hand-feel",
    badge: "Eco-Friendly",
  },
  {
    name: "Recycled Polyester",
    description: "GRS-certified, sustainable performance yarn",
    badge: "GRS Certified",
  },
  {
    name: "Merino Wool",
    description: "Premium thermal regulation, natural odour resistance",
    badge: "Premium",
  },
  {
    name: "Organic Cotton",
    description: "GOTS-ready organic cotton, chemical-free processing",
    badge: "GOTS Ready",
  },
];

const gauges = ["96N", "108N", "120N", "144N", "168N", "200N"];

const customizations = [
  {
    title: "Custom Woven Labels",
    description: "Brand labels woven into the sock for premium feel",
  },
  {
    title: "Custom Header Cards",
    description: "Retail-ready packaging with your branding",
  },
  {
    title: "Recyclable Polybags",
    description: "Eco-conscious packaging solutions",
  },
  {
    title: "Retail Display-Ready",
    description: "Hang-tag, clip-strip, and display box options",
  },
];

export default function TechnicalMaterials() {
  return (
    <section id="materials" className="py-24 bg-charcoal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-indus-100 text-indus-700 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            Technical Materials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal-900 tracking-tight">
            Material Options &amp;
            <br />
            <span className="text-indus-600">Customisation Details</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Yarn types */}
          <div>
            <h3 className="text-xl font-bold text-charcoal-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gold-500" />
              Yarn Types
            </h3>
            <div className="space-y-4">
              {yarnTypes.map((yarn) => (
                <div
                  key={yarn.name}
                  className="bg-white border border-charcoal-100 rounded-xl p-5 flex items-start gap-4 hover:border-indus-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-charcoal-900">
                        {yarn.name}
                      </span>
                      <span className="px-2 py-0.5 bg-indus-100 text-indus-700 rounded-full text-xs font-semibold">
                        {yarn.badge}
                      </span>
                    </div>
                    <p className="text-sm text-charcoal-500">
                      {yarn.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Gauge + Customizations */}
          <div>
            {/* Gauge capabilities */}
            <h3 className="text-xl font-bold text-charcoal-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gold-500" />
              Gauge Capabilities
            </h3>
            <div className="bg-white border border-charcoal-100 rounded-xl p-6 mb-8">
              <p className="text-sm text-charcoal-500 mb-4">
                Available needle counts — from everyday to ultra-fine formal
                gauge:
              </p>
              <div className="flex flex-wrap gap-3">
                {gauges.map((gauge) => (
                  <div
                    key={gauge}
                    className="px-5 py-3 bg-gradient-to-br from-indus-50 to-indus-100 border border-indus-200 rounded-xl text-center"
                  >
                    <span className="text-xl font-black text-indus-700">
                      {gauge}
                    </span>
                    <div className="text-[10px] text-indus-500 mt-0.5 font-medium">
                      needle count
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customization details */}
            <h3 className="text-xl font-bold text-charcoal-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gold-500" />
              Customisation Options
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {customizations.map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-charcoal-100 rounded-xl p-5 hover:border-gold-400/40 transition-colors"
                >
                  <h4 className="font-bold text-charcoal-900 text-sm mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-charcoal-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
