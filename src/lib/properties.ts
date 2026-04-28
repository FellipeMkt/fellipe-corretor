export interface Property {
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

// Em produção, lê do JSON. Em dev, usa os dados padrão.
export const properties: Property[] = [
  {
    id: 1,
    title: "Casa de Praia em Salinópolis",
    location: "Atalaia, Salinópolis – PA",
    price: "R$ 850.000",
    type: "venda",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    featured: true,
    tag: "Destaque",
  },
  {
    id: 2,
    title: "Apartamento Vista Mar",
    location: "Bairro da Praia, Salinópolis – PA",
    price: "R$ 3.200/mês",
    type: "aluguel",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    tag: "Novo",
  },
  {
    id: 3,
    title: "Terreno Beira Mar",
    location: "Maçarico, Salinópolis – PA",
    price: "R$ 420.000",
    type: "venda",
    bedrooms: 0,
    bathrooms: 0,
    area: 600,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  },
  {
    id: 4,
    title: "Casa Térrea com Piscina",
    location: "Residencial Sol Nascente, Castanhal – PA",
    price: "R$ 530.000",
    type: "venda",
    bedrooms: 3,
    bathrooms: 2,
    area: 165,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  },
  {
    id: 5,
    title: "Cobertura Duplex",
    location: "Marco, Belém – PA",
    price: "R$ 1.200.000",
    type: "venda",
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    tag: "Premium",
  },
  {
    id: 6,
    title: "Sala Comercial",
    location: "Centro Empresarial, Belém – PA",
    price: "R$ 4.500/mês",
    type: "aluguel",
    bedrooms: 0,
    bathrooms: 1,
    area: 55,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
];
