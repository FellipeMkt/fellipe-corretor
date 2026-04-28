"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#sobre", label: "Sobre" },
    { href: "#imoveis", label: "Imóveis" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0e0e0e]/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        <a href="#hero" className="flex items-center gap-2">
          <span className="font-display text-xl text-white">
            Fellipe <span className="text-[#c9a84c]">Melo</span>
          </span>
          <span className="text-white/40 text-sm hidden sm:block">|</span>
          <span className="text-white/50 text-xs hidden sm:block tracking-widest uppercase">
            Corretor
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/70 hover:text-white text-sm tracking-wide transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/5591984940521?text=Olá%20Fellipe,%20tenho%20interesse%20em%20um%20imóvel!"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1a6b4a] hover:bg-[#155a3d] text-white text-sm px-5 py-2 rounded-full transition-colors"
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0e0e0e]/95 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/70 hover:text-white text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/5591984940521"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1a6b4a] text-white text-sm px-5 py-2 rounded-full text-center"
          >
            Falar no WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
