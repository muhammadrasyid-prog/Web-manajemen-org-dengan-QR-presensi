import Image from "next/image";
import { config } from "@/lib/config";

export default function PengurusGrid() {
  const { pengurus } = config;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="mt-12">
      <h4 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-6">Struktur Organisasi</h4>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {pengurus.map((p, index) => (
          <div key={index} className="text-center group">
            <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-full grayscale hover:grayscale-0 transition-all duration-500 ring-1 ring-outline-variant ring-offset-4 ring-offset-surface-container-low flex items-center justify-center bg-primary">
              {p.photo ? (
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-white text-4xl font-headline font-medium">
                  {getInitials(p.name)}
                </span>
              )}
            </div>
            <div className="font-headline italic text-lg text-primary">{p.name}</div>
            <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              {p.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
