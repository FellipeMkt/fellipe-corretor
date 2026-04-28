"use client";

import { useState, useEffect, useRef } from "react";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  type: "venda" | "aluguel";
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  featured?: boolean;
  tag?: string;
}

const WA_NUMBER = "5591984940521";

export default function Destaques() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/properties")
      .then((r) => r.json())
      .then((data) => setProperties(data.slice(0, 5)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isHovered || properties.length === 0) return;
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % properties.length);
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isHovered, properties.length]);

  if (properties.length === 0) return null;

  const prev = () => setCurrent((p) => (p - 1 + properties.length) % properties.length);
  const next = () => setCurrent((p) => (p + 1) % properties.length);

  const waLink = (title: string) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Olá Fellipe! Tenho interesse no imóvel: ${title}`)}`;

  return (
    <section id="destaques" className="bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <div className="h-px w-8 bg-[#c9a84c]/50" />
        <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-medium">Destaques</span>
        <div className="h-px w-8 bg-[#c9a84c]/50" />
      </div>

      <div
        className="relative h-[85vh] min-h-[560px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {properties.map((property, i) => (
          <div
            key={property.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
          >
            {/* Background */}
            {property.image ? (
              property.image.startsWith("http") ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms]"
                  style={{ backgroundImage: `url('${property.image}')`, transform: i === current ? "scale(1.05)" : "scale(1)" }}
                />
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms]"
                  style={{ backgroundImage: `url('${property.image}')`, transform: i === current ? "scale(1.05)" : "scale(1)" }}
                />
              )
            ) : (
              <div className="absolute inset-0 bg-white/5" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  {property.tag && (
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-[#c9a84c] text-[#0a0a0a] font-medium mb-4">
                      {property.tag}
                    </span>
                  )}
                  <h2 className="font-display text-3xl md:text-5xl text-white mb-2 leading-tight">{property.title}</h2>
                  <p className="text-white/50 flex items-center gap-2 mb-4 text-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    {property.location}
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-display text-3xl text-[#c9a84c]" style={{ textShadow: "0 0 40px rgba(201,168,76,0.3)" }}>
                      {property.price}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${property.type === "venda" ? "bg-[#1a6b4a]/80 text-white" : "bg-white/10 text-white"}`}>
                      {property.type === "venda" ? "Venda" : "Aluguel"}
                    </span>
                    {property.bedrooms > 0 && <span className="text-white/40 text-xs">🛏 {property.bedrooms} quartos</span>}
                    {property.area > 0 && <span className="text-white/40 text-xs">📐 {property.area}m²</span>}
                  </div>
                </div>

                <a
                  href={waLink(property.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-3 bg-[#1a6b4a] hover:bg-[#155a3d] text-white px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#1a6b4a]/30 whitespace-nowrap"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Tenho interesse
                </a>
              </div>
            </div>
          </div>
        ))}

        <button onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/15 bg-black/30 backdrop-blur text-white hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onClick={next} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/15 bg-black/30 backdrop-blur text-white hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {properties.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`transition-all duration-300 rounded-full ${i === current ? "w-8 h-1.5 bg-[#c9a84c]" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`} />
          ))}
        </div>

        <div className="absolute top-8 right-8 z-20 text-white/30 text-xs font-mono">
          {String(current + 1).padStart(2, "0")} / {String(properties.length).padStart(2, "0")}
        </div>
      </div>

      <div className="text-center py-8 border-t border-white/5">
        <a href="#imoveis" className="inline-flex items-center gap-2 text-white/40 hover:text-[#c9a84c] text-sm transition-colors">
          Ver todos os imóveis
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  );
}
