import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutCard from "@/components/AboutCard";
import PengurusGrid from "@/components/PengurusGrid";
import { config } from "@/lib/config";

export default function AboutPage() {
  const { profile } = config;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <AboutCard />
          </div>
          <div className="md:col-span-8 flex flex-col gap-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-surface-container-lowest p-8 rounded-lg border-t-2 border-primary">
                <h4 className="font-label text-xs uppercase tracking-widest text-primary mb-4">Our Vision</h4>
                <p className="font-headline text-2xl italic leading-snug">{profile.vision}</p>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-lg border-t-2 border-primary">
                <h4 className="font-label text-xs uppercase tracking-widest text-primary mb-4">Our Mission</h4>
                <p className="font-headline text-2xl italic leading-snug">{profile.mission}</p>
              </div>
            </div>
            <PengurusGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
