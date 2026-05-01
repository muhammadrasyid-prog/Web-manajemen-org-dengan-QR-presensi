import { config } from "@/lib/config";

export default function StatBar({ totalMembers }: { totalMembers: number }) {
  const { meetings, profile } = config;
  return (
    <section className="max-w-7xl mx-auto px-8 mb-24">
      <div className="bg-surface-container rounded-xl p-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
          <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Total Members</div>
          <div className="font-headline text-5xl italic text-primary">{totalMembers}</div>
        </div>
        <div className="md:border-x border-outline-variant/30 px-4">
          <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Validated Meetings</div>
          <div className="font-headline text-5xl italic text-primary">{meetings.length}</div>
        </div>
        <div>
          <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Founded Date</div>
          <div className="font-headline text-5xl italic text-primary">{profile.founding_year}</div>
        </div>
      </div>
    </section>
  );
}
