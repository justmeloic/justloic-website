import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ArtGallery } from "@/components/ArtGallery";
import { Philosophy } from "@/components/Philosophy";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0F0E0E] transition-colors duration-300">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-6 space-y-28">
        <Hero />
        <Projects />
        <ArtGallery />
        <Philosophy />
        <Credentials />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
