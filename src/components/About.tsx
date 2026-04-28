export default function About() {
  const items = [
    {
      icon: "🏡",
      title: "Compra & Venda",
      desc: "Negociação segura com toda a documentação em dia.",
    },
    {
      icon: "🔑",
      title: "Locação",
      desc: "Gestão completa de imóveis para locação residencial e comercial.",
    },
    {
      icon: "📍",
      title: "Pará",
      desc: "Especialista no mercado local de Salinópolis, Castanhal e Belém.",
    },
  ];

  return (
    <section id="sobre" className="py-28 bg-[#111] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a6b4a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-[#c9a84c] text-sm tracking-[0.3em] uppercase mb-4">
              Quem sou eu
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
              Experiência que{" "}
              <span className="text-[#c9a84c] italic">faz a diferença</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Sou Fellipe Melo, corretor de imóveis com CRECI ativo e mais de 8
              anos de atuação no mercado paraense. Atendo com atenção,
              transparência e compromisso em cada negociação.
            </p>
            <p className="text-white/50 leading-relaxed mb-10">
              Meu foco é entender o que você realmente precisa e encontrar o
              imóvel certo — seja para morar, investir ou alugar. Cada cliente
              recebe atendimento personalizado do início ao fim.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1a6b4a]/20 border border-[#1a6b4a]/40 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a6b4a"
                  strokeWidth="2"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-medium">CRECI Ativo</p>
                <p className="text-white/40 text-xs">
                  Conselho Regional de Corretores de Imóveis
                </p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
