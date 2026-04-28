"use client";

import { useEffect, useRef } from "react";

const WA_NUMBER = "5591984940521";

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(201,168,76,0.06), transparent 60%)`;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Mouse glow */}
      <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none transition-all duration-300" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* MOBILE: foto como background direito */}
      <div
        className="absolute inset-0 z-0 lg:hidden"
        style={{
          backgroundImage: "url('/foto-fellipe.png')",
          backgroundSize: "auto 90%",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
          opacity: 0.18,
        }}
      />

      {/* Glow blobs */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1a6b4a]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-20 top-1/3 w-[400px] h-[400px] bg-[#c9a84c]/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Vertical line left — desktop only */}
      <div className="absolute left-8 top-0 bottom-0 hidden lg:flex flex-col items-center justify-center">
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <span className="text-white/20 text-[10px] tracking-[0.4em] rotate-90 whitespace-nowrap py-8">
          CRECI · PA · 13151
        </span>
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* Main grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-12 items-center min-h-screen py-28">

        {/* LEFT — text */}
        <div className="flex flex-col justify-center">

          <div className="inline-flex items-center gap-2 mb-6 self-start">
            <div className="w-2 h-2 rounded-full bg-[#1a6b4a] animate-pulse" />
            <span className="text-white/50 text-xs tracking-[0.4em] uppercase">Corretor de Imóveis · Pará</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
            Seu próximo<br />
            imóvel{" "}
            <span className="text-[#c9a84c] italic" style={{ textShadow: "0 0 60px rgba(201,168,76,0.3)" }}>
              começa aqui
            </span>
          </h1>

          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-[#c9a84c]/50" />
            <span className="text-white/30 text-xs tracking-widest uppercase">Fellipe Melo</span>
          </div>

          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
            Especialista no mercado imobiliário de Salinópolis. Atendimento
            personalizado para compra, venda e locação.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Olá Fellipe! Quero conhecer os imóveis disponíveis!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#1a6b4a] hover:bg-[#155a3d] text-white px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#1a6b4a]/30"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar com Fellipe
            </a>
            <a
              href="#destaques"
              className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-[#c9a84c]/50 text-white/70 hover:text-white px-8 py-4 rounded-full text-sm font-medium transition-all duration-300"
            >
              Ver destaques
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="flex gap-8 pt-8 border-t border-white/8">
            {[
              { value: "+10M", label: "Em imóveis negociados" },
              { value: "11 anos", label: "De experiência" },
              { value: "100%", label: "Satisfação" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl text-[#c9a84c] font-bold" style={{ textShadow: "0 0 30px rgba(201,168,76,0.4)" }}>
                  {stat.value}
                </p>
                <p className="text-white/30 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — foto desktop */}
        <div className="relative hidden lg:flex justify-end items-center">
          <div className="absolute w-[420px] h-[420px] rounded-full border border-[#c9a84c]/10" style={{ animation: "spin 20s linear infinite" }} />
          <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-white/5" style={{ animation: "spin 30s linear infinite reverse" }} />
          <div className="absolute w-72 h-72 bg-[#1a6b4a]/20 rounded-full blur-3xl" />
          <div className="absolute w-48 h-48 bg-[#c9a84c]/10 rounded-full blur-2xl translate-x-16 -translate-y-16" />

          <div className="relative w-80 h-[480px]">
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#c9a84c]/60 rounded-tl-lg z-20" />
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#c9a84c]/60 rounded-tr-lg z-20" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#c9a84c]/60 rounded-bl-lg z-20" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#c9a84c]/60 rounded-br-lg z-20" />
            <div
              className="w-full h-full rounded-2xl border border-white/10"
              style={{
                backgroundImage: "url('/foto-fellipe.png')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(26,107,74,0.15)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-24 rounded-b-2xl bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
            <div className="absolute -right-6 top-8 bg-[#0a0a0a]/90 backdrop-blur border border-white/10 rounded-2xl px-4 py-3 shadow-2xl">
              <p className="text-[#c9a84c] text-xs font-medium tracking-widest uppercase">CRECI</p>
              <p className="text-white text-sm font-bold">PA · 13151</p>
            </div>
            <div className="absolute -left-6 bottom-12 bg-[#1a6b4a]/90 backdrop-blur border border-[#1a6b4a]/30 rounded-2xl px-4 py-3 shadow-2xl">
              <p className="text-white/60 text-xs">Disponível agora</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-white text-sm font-medium">WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-white/40 rounded-full" style={{ animation: "bounce 2s infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
