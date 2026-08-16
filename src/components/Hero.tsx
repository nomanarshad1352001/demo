export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/8246480/pexels-photo-8246480.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920"
          alt="Textile factory manufacturing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indus-900/95 via-indus-900/85 to-indus-800/90" />
      </div>

      {/* Decorative geometric elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 border border-gold-500/10 rounded-full" />
        <div className="absolute bottom-20 left-10 w-96 h-96 border border-gold-500/5 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 border border-indus-400/10 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/20 rounded-full mb-8">
          <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-gold-300 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            Now accepting orders for 2026
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
          Any gauge, any logo,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">
            no colour limit
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-indus-200/90 mb-10 leading-relaxed font-light">
          Computerised jacquard knitting puts your branding on the sock itself
          — full size range, infant through XXL, from a single factory.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#inquire"
            className="group relative px-8 py-4 bg-gold-500 text-indus-900 rounded-lg text-base font-bold hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20 hover:shadow-gold-400/30 hover:-translate-y-0.5"
          >
            Request Digital Sample
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold-300 rounded-full animate-ping" />
          </a>
          <a
            href="#specifications"
            className="px-8 py-4 border-2 border-indus-400/40 text-white rounded-lg text-base font-semibold hover:border-gold-400/60 hover:bg-indus-800/50 transition-all"
          >
            Download Hosiery Spec Sheet
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: "3,000", label: "Min Pairs / Design" },
            { value: "20–30", label: "Days FOB Lead Time" },
            { value: "7 Day", label: "Sample Turnaround" },
            { value: "200N", label: "Max Needle Count" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-gold-400">
                {stat.value}
              </div>
              <div className="text-xs text-indus-300 mt-1 tracking-wide uppercase font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#why-us" className="flex flex-col items-center gap-2 text-indus-400 hover:text-gold-400 transition-colors">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
