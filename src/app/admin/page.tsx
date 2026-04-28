"use client";

import { useState, useEffect } from "react";

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

const EMPTY: Property = {
  id: 0,
  title: "",
  location: "",
  price: "",
  type: "venda",
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  image: "",
  featured: false,
  tag: "",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [editing, setEditing] = useState<Property | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  async function login() {
    const res = await fetch("/api/properties");
    const data = await res.json();
    if (Array.isArray(data)) {
      // Testa a senha salvando sem mudanças
      const test = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, properties: data }),
      });
      if (test.ok) {
        setAuthed(true);
        setProperties(data);
        setAuthError("");
      } else {
        setAuthError("Senha incorreta");
      }
    }
  }

  useEffect(() => {
    if (authed) {
      fetch("/api/properties").then((r) => r.json()).then(setProperties);
    }
  }, [authed]);

  async function save() {
    if (!editing) return;
    setSaving(true);
    let list: Property[];
    if (isNew) {
      const newItem = { ...editing, id: Date.now() };
      list = [...properties, newItem];
    } else {
      list = properties.map((p) => (p.id === editing.id ? editing : p));
    }
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, properties: list }),
    });
    if (res.ok) {
      setProperties(list);
      setEditing(null);
      setMsg("✅ Salvo com sucesso!");
      setTimeout(() => setMsg(""), 3000);
    }
    setSaving(false);
  }

  async function remove(id: number) {
    if (!confirm("Remover este imóvel?")) return;
    const list = properties.filter((p) => p.id !== id);
    await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, properties: list }),
    });
    setProperties(list);
    setMsg("🗑️ Imóvel removido");
    setTimeout(() => setMsg(""), 3000);
  }

  async function uploadImage(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("password", password);
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url && editing) {
      setEditing({ ...editing, image: data.url });
    }
    setUploading(false);
  }

  // LOGIN
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="font-display text-3xl text-white mb-1">
              Fellipe <span className="text-[#c9a84c]">Melo</span>
            </p>
            <p className="text-white/40 text-sm">Painel Administrativo</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <label className="block text-white/50 text-xs mb-2 tracking-widest uppercase">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/50 mb-4"
            />
            {authError && <p className="text-red-400 text-sm mb-4">{authError}</p>}
            <button
              onClick={login}
              className="w-full bg-[#1a6b4a] hover:bg-[#155a3d] text-white py-3 rounded-xl font-medium transition-colors"
            >
              Entrar
            </button>
          </div>
          <p className="text-center text-white/20 text-xs mt-4">
            Senha padrão: <span className="text-white/40"></span>
          </p>
        </div>
      </div>
    );
  }

  // EDITOR DE IMÓVEL
  if (editing) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-2xl">{isNew ? "Novo imóvel" : "Editar imóvel"}</h1>
            <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white text-sm">← Voltar</button>
          </div>

          <div className="space-y-4">
            {/* Foto */}
            <div>
              <label className="block text-white/50 text-xs mb-2 tracking-widest uppercase">Foto</label>
              {editing.image && (
                <div
                  className="w-full h-48 rounded-xl bg-cover bg-center mb-3 border border-white/10"
                  style={{ backgroundImage: `url('${editing.image}')` }}
                />
              )}
              <div className="flex gap-3">
                <label className="flex-1 cursor-pointer bg-white/5 border border-dashed border-white/20 hover:border-[#c9a84c]/50 rounded-xl px-4 py-3 text-center text-white/40 hover:text-white text-sm transition-colors">
                  {uploading ? "Enviando..." : "📁 Fazer upload de foto"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
                  />
                </label>
              </div>
              <input
                type="text"
                value={editing.image}
                onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                placeholder="Ou cole uma URL de imagem"
                className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/50 text-sm"
              />
            </div>

            {/* Título */}
            <div>
              <label className="block text-white/50 text-xs mb-2 tracking-widest uppercase">Título</label>
              <input
                type="text"
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c9a84c]/50"
              />
            </div>

            {/* Localização */}
            <div>
              <label className="block text-white/50 text-xs mb-2 tracking-widest uppercase">Localização</label>
              <input
                type="text"
                value={editing.location}
                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c9a84c]/50"
              />
            </div>

            {/* Preço e Tipo */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/50 text-xs mb-2 tracking-widest uppercase">Preço</label>
                <input
                  type="text"
                  value={editing.price}
                  onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                  placeholder="R$ 000.000"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c9a84c]/50"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-2 tracking-widest uppercase">Tipo</label>
                <select
                  value={editing.type}
                  onChange={(e) => setEditing({ ...editing, type: e.target.value as "venda" | "aluguel" })}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c9a84c]/50"
                >
                  <option value="venda">Venda</option>
                  <option value="aluguel">Aluguel</option>
                </select>
              </div>
            </div>

            {/* Quartos, Banheiros, Área */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Quartos", key: "bedrooms" },
                { label: "Banheiros", key: "bathrooms" },
                { label: "Área (m²)", key: "area" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-white/50 text-xs mb-2 tracking-widest uppercase">{label}</label>
                  <input
                    type="number"
                    value={(editing as unknown as Record<string, number>)[key]}
                    onChange={(e) => setEditing({ ...editing, [key]: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c9a84c]/50"
                  />
                </div>
              ))}
            </div>

            {/* Tag e Destaque */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/50 text-xs mb-2 tracking-widest uppercase">Tag (opcional)</label>
                <input
                  type="text"
                  value={editing.tag || ""}
                  onChange={(e) => setEditing({ ...editing, tag: e.target.value })}
                  placeholder="Ex: Destaque, Novo, Premium"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c9a84c]/50"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-2 tracking-widest uppercase">Destaque</label>
                <div className="flex items-center gap-3 mt-3">
                  <input
                    type="checkbox"
                    checked={editing.featured || false}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                    className="w-5 h-5 accent-[#1a6b4a]"
                  />
                  <span className="text-white/50 text-sm">Exibir em destaque</span>
                </div>
              </div>
            </div>

            <button
              onClick={save}
              disabled={saving}
              className="w-full bg-[#1a6b4a] hover:bg-[#155a3d] disabled:opacity-50 text-white py-4 rounded-xl font-medium transition-colors mt-4"
            >
              {saving ? "Salvando..." : "💾 Salvar imóvel"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // LISTA DE IMÓVEIS
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-white">
              Fellipe <span className="text-[#c9a84c]">Admin</span>
            </h1>
            <p className="text-white/40 text-sm mt-1">{properties.length} imóveis cadastrados</p>
          </div>
          <div className="flex gap-3">
            <a href="/" className="text-white/40 hover:text-white text-sm transition-colors px-4 py-2 border border-white/10 rounded-xl">
              Ver site →
            </a>
            <button
              onClick={() => { setEditing({ ...EMPTY }); setIsNew(true); }}
              className="bg-[#1a6b4a] hover:bg-[#155a3d] text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              + Novo imóvel
            </button>
          </div>
        </div>

        {msg && (
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-6 text-sm">
            {msg}
          </div>
        )}

        {/* Lista */}
        <div className="space-y-3">
          {properties.map((p) => (
            <div
              key={p.id}
              className="bg-white/3 border border-white/8 rounded-2xl p-4 flex items-center gap-4 hover:border-white/15 transition-colors"
            >
              <div
                className="w-20 h-16 rounded-xl bg-cover bg-center flex-shrink-0 bg-white/5"
                style={{ backgroundImage: p.image ? `url('${p.image}')` : "none" }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{p.title || "Sem título"}</p>
                <p className="text-white/40 text-sm truncate">{p.location}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#c9a84c] text-sm font-medium">{p.price}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.type === "venda" ? "bg-[#1a6b4a]/30 text-green-400" : "bg-[#c9a84c]/20 text-[#c9a84c]"}`}>
                    {p.type}
                  </span>
                  {p.tag && <span className="text-xs text-white/30">{p.tag}</span>}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => { setEditing(p); setIsNew(false); }}
                  className="px-4 py-2 border border-white/15 hover:border-white/30 text-white/60 hover:text-white rounded-xl text-sm transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="px-4 py-2 border border-red-500/20 hover:border-red-500/50 text-red-400/60 hover:text-red-400 rounded-xl text-sm transition-colors"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-20 text-white/20">
            <p className="text-4xl mb-4">🏠</p>
            <p>Nenhum imóvel cadastrado ainda.</p>
            <button
              onClick={() => { setEditing({ ...EMPTY }); setIsNew(true); }}
              className="mt-4 text-[#c9a84c] text-sm hover:underline"
            >
              Adicionar o primeiro
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
