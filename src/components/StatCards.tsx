export default function StatCards({ 
  totalCollected, 
  membersPaid, 
  outstandingBalances,
  showTotals
}: { 
  totalCollected: number, 
  membersPaid: number, 
  outstandingBalances: number,
  showTotals: boolean
}) {
  const formatRp = (val: number) => showTotals ? `Rp ${val.toLocaleString('id-ID')}` : "Rp ***.***";
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="bg-emerald-900/50 p-8 rounded-lg border border-emerald-800/50 backdrop-blur-sm">
        <div className="font-label text-[10px] uppercase tracking-widest text-secondary-fixed-dim mb-4">Total Uang Kas Terkumpul</div>
        <div className="font-headline text-4xl italic text-primary-fixed">{formatRp(totalCollected)}</div>
      </div>
      <div className="bg-emerald-900/50 p-8 rounded-lg border border-emerald-800/50 backdrop-blur-sm">
        <div className="font-label text-[10px] uppercase tracking-widest text-secondary-fixed-dim mb-4">Total Validasi Ceklis</div>
        <div className="font-headline text-4xl italic text-primary-fixed">{membersPaid}</div>
      </div>
      <div className="bg-emerald-900/50 p-8 rounded-lg border border-emerald-800/50 backdrop-blur-sm">
        <div className="font-label text-[10px] uppercase tracking-widest text-secondary-fixed-dim mb-4">Total Tunggakan / Hutang</div>
        <div className="font-headline text-4xl italic text-error">{formatRp(outstandingBalances)}</div>
      </div>
    </div>
  );
}
