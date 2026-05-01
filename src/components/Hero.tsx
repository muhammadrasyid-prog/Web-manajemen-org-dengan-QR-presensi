import Link from "next/link";
import Image from "next/image";
import { config } from "@/lib/config";

export default function Hero() {
  const { profile } = config;
  return (
    <section className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <h1 className="font-headline text-7xl md:text-8xl italic font-medium leading-[0.9] text-primary">{profile.tagline}</h1>
        <p className="font-body text-xl text-on-surface-variant max-w-md leading-relaxed">
          {profile.vision}
        </p>
        <div className="flex gap-4 pt-4 flex-wrap">
          <Link href="/presensi/form?meeting=1" className="bg-primary bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-4 rounded-full font-label font-bold text-sm uppercase tracking-widest text-center">
            Lihat Presensi
          </Link>
          <Link href="/about" className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-full font-label font-bold text-sm uppercase tracking-widest text-center">
            Tentang Kami
          </Link>
        </div>
      </div>
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/10 rounded-xl translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
        <div className="relative w-full aspect-[4/5] rounded-xl shadow-2xl overflow-hidden">
          <Image
            src="/images/syawal26.jpeg"
            alt="Hero Architecture"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
