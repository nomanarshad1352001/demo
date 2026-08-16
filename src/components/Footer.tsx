import { Mail, Phone, MapPin, Globe, MessageCircle } from "lucide-react";

const footerLinks = [
  { label: "Why Us", href: "#why-us" },
  { label: "Specifications", href: "#specifications" },
  { label: "Products", href: "#products" },
  { label: "Materials", href: "#materials" },
  { label: "Inquire", href: "#inquire" },
];

const productLinks = [
  "Crew & Ankle Socks",
  "Sports & Compression",
  "Dress Socks",
  "Kids & Infant Socks",
  "Wool & Bamboo Blends",
  "Custom Jacquard",
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal-900 text-charcoal-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-black text-white tracking-wider">
                INDUS LOOM
              </span>
              <div className="text-xs text-gold-400 tracking-[0.15em] font-medium mt-1">
                SOCKS &amp; HOSIERY DIVISION
              </div>
            </div>
            <p className="text-sm text-charcoal-400 leading-relaxed mb-6">
              Computerised jacquard knitting, seamless construction, and
              full-scale sizing from infant to XXL — all from Karachi, Pakistan.
            </p>
            <div className="flex gap-3">
              <span className="px-3 py-1 bg-charcoal-800 border border-charcoal-700 rounded-full text-xs font-semibold text-charcoal-300">
                OEKO-TEX
              </span>
              <span className="px-3 py-1 bg-charcoal-800 border border-charcoal-700 rounded-full text-xs font-semibold text-charcoal-300">
                Sedex
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-charcoal-400 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">
              Products
            </h4>
            <ul className="space-y-3">
              {productLinks.map((product) => (
                <li key={product}>
                  <span className="text-sm text-charcoal-400">
                    {product}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">
              Contact &amp; Export
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-charcoal-400">
                  INDUS LOOM — Karachi, Pakistan
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:export@indusloom.com"
                  className="text-sm text-charcoal-400 hover:text-gold-400 transition-colors"
                >
                  export@indusloom.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-charcoal-400">
                  +92 XXX XXX XXXX
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle
                  size={16}
                  className="text-gold-400 mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-charcoal-400">
                  WhatsApp: +92 XXX XXX XXXX
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Globe size={16} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.indusloom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-charcoal-400 hover:text-gold-400 transition-colors"
                >
                  www.indusloom.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-charcoal-500">
            &copy; {new Date().getFullYear()} INDUS LOOM. All rights reserved.
            Crafted on the Indus, delivered worldwide.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-charcoal-600">
              CREW &bull; SPORT &bull; DRESS &bull; KIDS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
