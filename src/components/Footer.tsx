export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/8 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-display text-white">
            Fellipe <span className="text-[#c9a84c]">Melo</span>
          </span>
          <span className="text-white/30 text-sm ml-2">· Corretor de Imóveis</span>
        </div>
        <p className="text-white/25 text-xs">
          CRECI · Pará · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
