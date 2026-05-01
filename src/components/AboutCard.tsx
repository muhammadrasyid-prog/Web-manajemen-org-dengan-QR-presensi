import { config } from "@/lib/config";
import { Landmark } from "lucide-react";

export default function AboutCard() {
  const { profile } = config;
  return (
    <div className="bg-surface-container-lowest p-8 rounded-lg shadow-sm border-t-2 border-primary w-full max-w-sm">
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
        <Landmark className="text-white w-8 h-8" />
      </div>
      <h3 className="font-headline text-2xl italic mb-4">Tentang MMTC</h3>
      <p className="font-body text-on-surface-variant mb-6 text-sm leading-relaxed">
        Muda Mudi Tegal Cabakan adalah organisasi kepemudaan yang bergerak di bidang sosial, keagamaan, dan kemasyarakatan dengan tujuan untuk meningkatkan kualitas sumber daya manusia di lingkungan Tegal Cabakan.
      </p>
      <div className="space-y-4 font-label text-xs uppercase tracking-tighter">
        <div className="flex justify-between border-b border-outline-variant/10 pb-2">
          <span className="text-on-surface-variant">Wilayah</span>
          <span className="text-primary font-bold">{profile.city}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-on-surface-variant">Status</span>
          <span className="text-primary font-bold">Aktif</span>
        </div>
      </div>
    </div>
  );
}
