const products = [
  {
    title: "Crew & Ankle Socks",
    description:
      "Everyday ribbed, cushioned heel/toe, ribbed cuff support. Perfect for casual, workwear, and uniform programs.",
    features: ["Cushioned heel/toe", "Ribbed cuff support", "Multiple lengths"],
    icon: "🧦",
    color: "from-blue-500/10 to-blue-600/5",
    borderColor: "hover:border-blue-400/40",
  },
  {
    title: "Sports & Compression",
    description:
      "Zoned arch compression, moisture-wicking mesh ventilation, high-impact padding for athletic performance.",
    features: ["Arch compression", "Mesh ventilation", "High-impact padding"],
    icon: "⚡",
    color: "from-emerald-500/10 to-emerald-600/5",
    borderColor: "hover:border-emerald-400/40",
  },
  {
    title: "Dress Socks",
    description:
      "Fine-gauge needle counts (168N / 200N) for formal wear, soft hand-feel yarn blends for business elegance.",
    features: ["168N / 200N gauge", "Soft hand-feel", "Formal finishing"],
    icon: "👔",
    color: "from-violet-500/10 to-violet-600/5",
    borderColor: "hover:border-violet-400/40",
  },
  {
    title: "Kids & Infant Socks",
    description:
      "Non-slip silicone grips, hypoallergenic dyes, extra-elastic leg bands designed for safety and comfort.",
    features: ["Silicone grips", "Hypoallergenic", "Extra-elastic bands"],
    icon: "👶",
    color: "from-pink-500/10 to-pink-600/5",
    borderColor: "hover:border-pink-400/40",
  },
  {
    title: "Wool & Bamboo Blends",
    description:
      "Thermal regulation, anti-bacterial organic bamboo, premium Merino options for cold-weather performance.",
    features: ["Thermal regulation", "Anti-bacterial", "Merino wool"],
    icon: "🌿",
    color: "from-amber-500/10 to-amber-600/5",
    borderColor: "hover:border-amber-400/40",
  },
  {
    title: "Custom Jacquard Branding",
    description:
      "Precision multi-color pattern knitting, custom welt tags, bespoke packaging options for your brand.",
    features: ["Multi-color knitting", "Custom welt tags", "Bespoke packaging"],
    icon: "🎨",
    color: "from-red-500/10 to-red-600/5",
    borderColor: "hover:border-red-400/40",
  },
];

export default function ProductPortfolio() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-indus-100 text-indus-700 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            Product Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal-900 tracking-tight">
            Complete Product Range
          </h2>
          <p className="mt-4 text-charcoal-500 max-w-2xl mx-auto text-lg">
            From everyday essentials to premium performance — every category
            manufactured under one roof with consistent quality.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.title}
              className={`group relative bg-gradient-to-br ${product.color} border border-charcoal-100 ${product.borderColor} rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className="text-4xl mb-5">{product.icon}</div>

              {/* Content */}
              <h3 className="text-xl font-bold text-charcoal-900 mb-3">
                {product.title}
              </h3>
              <p className="text-charcoal-500 text-sm leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 bg-white/80 border border-charcoal-200/50 text-charcoal-600 rounded-full text-xs font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Gallery row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="https://images.pexels.com/photos/10563910/pexels-photo-10563910.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500"
              alt="Colorful socks display"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="https://images.pexels.com/photos/31199531/pexels-photo-31199531.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500"
              alt="Factory worker quality control"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="https://images.pexels.com/photos/8246482/pexels-photo-8246482.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500"
              alt="Knitting machinery"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="https://images.pexels.com/photos/31090817/pexels-photo-31090817.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500"
              alt="Factory textile production"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
