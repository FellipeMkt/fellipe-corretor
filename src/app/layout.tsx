import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fellipe Melo | Corretor de Imóveis",
  description:
    "Especialista em imóveis no Pará. Encontre o imóvel dos seus sonhos com quem conhece o mercado local.",
  openGraph: {
    title: "Fellipe Melo | Corretor de Imóveis",
    description: "Especialista em imóveis no Pará.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
