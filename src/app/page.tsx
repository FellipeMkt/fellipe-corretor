import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Destaques from "@/components/Destaques";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Destaques />
        <About />
        <Portfolio />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
