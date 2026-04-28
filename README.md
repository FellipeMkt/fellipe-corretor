# Fellipe Melo — Site Imobiliário

Site one-page moderno para corretor de imóveis, construído com Next.js 15 + Tailwind CSS v4.

## Stack
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Vercel** (hospedagem — mesmo padrão do ResortClub)

---

## Passo a passo — do zero ao ar

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

### 3. Personalizar antes de publicar

Edite os arquivos abaixo:

#### Número de WhatsApp
Altere `WA_NUMBER` nos arquivos:
- `src/components/Navbar.tsx`
- `src/components/Hero.tsx`
- `src/components/Portfolio.tsx`
- `src/components/CTA.tsx`
- `src/components/WhatsAppFloat.tsx`

Troque `5591999999999` pelo número real com DDD (sem espaços, sem `+`).
Exemplo: `5591987654321`

#### Imóveis do portfólio
Edite `src/lib/properties.ts`:
- Título, localização, preço, tipo
- Substitua as imagens do Unsplash pelas fotos reais dos imóveis
- Para usar imagens locais: coloque na pasta `public/imoveis/` e use `/imoveis/nome.jpg`

#### Informações pessoais
- `src/app/layout.tsx` → título e descrição SEO
- `src/components/About.tsx` → texto de apresentação e CRECI
- `src/components/CTA.tsx` → e-mail e telefone
- `src/components/Footer.tsx` → número do CRECI

#### Imagem do hero
Em `src/components/Hero.tsx`, substitua a URL da imagem de fundo pelo retrato do Fellipe ou uma foto de imóvel de destaque.

---

### 4. Build de produção

```bash
npm run build
```

### 5. Deploy na Vercel (igual ao ResortClub)

#### Opção A — Via GitHub (recomendado)

1. Crie um repositório no GitHub e suba o projeto:
```bash
git init
git add .
git commit -m "feat: site fellipe corretor"
git remote add origin https://github.com/seu-usuario/fellipe-corretor.git
git push -u origin main
```

2. Acesse [vercel.com](https://vercel.com) → **Add New Project**
3. Importe o repositório
4. Clique em **Deploy** — zero configuração necessária

#### Opção B — Vercel CLI

```bash
npx vercel --prod
```

---

### 6. Domínio personalizado

No painel da Vercel:
- Settings → Domains → Add Domain
- Exemplo: `fellipemelo.com.br`
- Configure o DNS conforme instruções da Vercel

---

## Estrutura de arquivos

```
src/
├── app/
│   ├── layout.tsx      ← SEO, fontes
│   ├── page.tsx        ← Monta as seções
│   └── globals.css     ← Tema, cores, fontes
├── components/
│   ├── Navbar.tsx      ← Menu fixo com scroll
│   ├── Hero.tsx        ← Seção inicial
│   ├── About.tsx       ← Apresentação
│   ├── Portfolio.tsx   ← Grid de imóveis com filtro
│   ├── CTA.tsx         ← Call to action + contatos
│   ├── Footer.tsx      ← Rodapé
│   └── WhatsAppFloat.tsx ← Botão flutuante
└── lib/
    └── properties.ts   ← Dados dos imóveis
```

## Personalização de cores

Em `src/app/globals.css`:
- `--color-brand-500`: verde principal (padrão: #1a6b4a)
- `--color-gold-400`: dourado dos destaques (padrão: #c9a84c)
- `bg-[#0e0e0e]`: fundo escuro

Para tema claro, troque `background-color: #0e0e0e` por `#ffffff` no `body` e ajuste as classes de texto.
