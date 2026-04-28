"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

export default function Portfolio() {
  const [filter, setFilter] = useState<"todos" | "venda" | "aluguel">("todos");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties")
      .then((r) => r.json())
      .then((data) => { setProperties(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === "todos" ? properties : properties.filter((p) => p.type === filter);

  const waLink = (title: string) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Olá Fellipe! Tenho interesse no imóvel: ${title}`)}`;

  return (
    <section id="imoveis" className="py-28 bg-[#0e0e0e]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#c9a84c] text-sm tracking-[0.3em] uppercase mb-4">Portfólio</p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
            Imóveis <span className="text-[#c9a84c] italic">disponíveis</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Seleção de imóveis para compra e locação no Pará. Todos verificados e com documentação em dia.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-12">
          {(["todos", "venda", "aluguel"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                filter === tab ? "bg-[#c9a84c] text-[#0e0e0e]" : "border border-white/15 text-white/60 hover:text-white hover:border-white/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="bg-white/3 border border-white/8 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <div
                key={property.id}
                className="group bg-[#161616] border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1 duration-300"
              >
                <div className="relative h-52 overflow-hidden bg-white/5">
                  {property.image ? (
                    property.image.startsWith("http") ? (
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${property.image}')` }}
                      />
                    )
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-4xl">🏠</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${property.type === "venda" ? "bg-[#1a6b4a] text-white" : "bg-[#c9a84c] text-[#0e0e0e]"}`}>
                      {property.type === "venda" ? "Venda" : "Aluguel"}
                    </span>
                    {property.tag && (
                      <span className="text-xs px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm">{property.tag}</span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-display text-xl font-bold">{property.price}</p>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-white font-medium mb-1 truncate">{property.title}</h3>
                  <p className="text-white/40 text-sm mb-4 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    {property.location}
                  </p>
                  {(property.bedrooms > 0 || property.area > 0) && (
                    <div className="flex gap-4 text-white/40 text-xs mb-5">
                      {property.bedrooms > 0 && <span>🛏 {property.bedrooms} quartos</span>}
                      {property.bathrooms > 0 && <span>🚿 {property.bathrooms} banheiros</span>}
                      {property.area > 0 && <span>📐 {property.area}m²</span>}
                    </div>
                  )}
                  <a
                    href={waLink(property.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#1a6b4a]/50 text-[#1a6b4a] hover:bg-[#1a6b4a] hover:text-white rounded-xl text-sm font-medium transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Tenho interesse
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-white/40 text-sm mb-4">Não encontrou o que procura?</p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Olá Fellipe! Estou procurando um imóvel com as seguintes características:")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#c9a84c] hover:text-white border border-[#c9a84c]/40 hover:border-white/30 px-8 py-3 rounded-full text-sm transition-all"
          >
            Me diga o que você precisa →
          </a>
        </div>
      </div>
    </section>
  );
}
