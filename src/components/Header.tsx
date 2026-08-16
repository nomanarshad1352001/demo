"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Why Us", href: "#why-us" },
  { label: "Specifications", href: "#specifications" },
  { label: "Products", href: "#products" },
  { label: "Materials", href: "#materials" },
  { label: "Inquire", href: "#inquire" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-indus-900/95 backdrop-blur-md border-b border-indus-700/50">
      {/* Top meta bar */}
      <div className="bg-gold-500 text-indus-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between text-xs sm:text-sm font-semibold tracking-widest">
          <span>CREW &bull; SPORT &bull; DRESS &bull; KIDS</span>
          <span className="hidden sm:inline">SOCKS &amp; HOSIERY DIVISION</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-white tracking-wider">
                INDUS LOOM
              </span>
              <span className="text-[10px] sm:text-xs text-gold-300 tracking-[0.2em] font-medium leading-tight">
                CRAFTED ON THE INDUS. DELIVERED WORLDWIDE.
              </span>
            </a>
          </div>

          {/* Division badge (desktop) */}
          <div className="hidden lg:flex items-center">
            <span className="px-3 py-1 bg-gold-500/15 border border-gold-500/30 rounded-full text-gold-300 text-xs font-semibold tracking-wider">
              SOCKS &amp; HOSIERY DIVISION
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm text-indus-200 hover:text-white hover:bg-indus-700/50 rounded-md transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#inquire"
              className="ml-2 px-5 py-2 bg-gold-500 text-indus-900 rounded-md text-sm font-bold hover:bg-gold-400 transition-colors"
            >
              Request Sample
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-indus-800 border-t border-indus-700/50">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-indus-200 hover:text-white hover:bg-indus-700/50 rounded-md transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#inquire"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 px-4 py-3 bg-gold-500 text-indus-900 rounded-md text-center font-bold hover:bg-gold-400 transition-colors"
            >
              Request Sample
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
