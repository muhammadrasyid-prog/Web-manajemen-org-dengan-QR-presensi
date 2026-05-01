"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCards from "@/components/StatCards";
import KasTable from "@/components/KasTable";
import { useAuth } from "@/lib/useAuth";
import { supabase } from "@/lib/supabase";

export default function KeuanganPage() {
  const isAuth = useAuth();
  const [members, setMembers] = useState([]);
  const [kasRecords, setKasRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTotals, setShowTotals] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [mRes, kRes] = await Promise.all([
      supabase.from("members").select("*").order("name"),
      supabase.from("kas").select("*")
    ]);
    if (mRes.data) setMembers(mRes.data as any);
    if (kRes.data) setKasRecords(kRes.data as any);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuth) {
      fetchData();
    }
  }, [isAuth]);

  if (isAuth === null) return <div className="min-h-screen flex items-center justify-center bg-emerald-950 text-white font-label">Validating session...</div>;
  if (!isAuth) return null;

  let globalTotalCollected = 0;
  let globalTotalOutstanding = 0;
  let membersPaidCount = 0;

  members.forEach((m: any) => {
    const amount = m.category === 'SMP' ? 5000 : 10000;
    const mRecords = kasRecords.filter((k: any) => k.member_id === m.id && k.is_paid);
    const paidCount = mRecords.length;
    
    globalTotalCollected += paidCount * amount;
    globalTotalOutstanding += (12 - paidCount) * amount;
    membersPaidCount += paidCount;
  });

  return (
    <div className="flex flex-col min-h-screen bg-emerald-950 text-white">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto px-8 py-24">
        <div className="mb-16 flex justify-between items-end">
          <div>
            <h2 className="font-headline text-5xl italic mb-4">Keuangan</h2>
            <p className="font-body text-secondary-fixed-dim max-w-lg">Buku Kas Muda Mudi Tegal Cabakan</p>
          </div>
          <button 
            onClick={() => setShowTotals(!showTotals)} 
            className="flex items-center gap-2 bg-emerald-800/50 hover:bg-emerald-700/50 px-4 py-2 rounded-lg transition-colors border border-emerald-600/30 text-emerald-200"
          >
            {showTotals ? <EyeOff size={18} /> : <Eye size={18} />}
            <span className="font-label text-xs uppercase tracking-wider">
              {showTotals ? "Sembunyikan Saldo" : "Tampilkan Saldo"}
            </span>
          </button>
        </div>
        
        {loading && kasRecords.length === 0 ? (
          <div className="text-center py-20 text-secondary-fixed-dim animate-pulse font-label uppercase text-xs tracking-widest">Synchronizing archive data...</div>
        ) : (
          <>
            <StatCards 
              totalCollected={globalTotalCollected} 
              membersPaid={membersPaidCount} 
              outstandingBalances={globalTotalOutstanding} 
              showTotals={showTotals}
            />
            <KasTable members={members} kasRecords={kasRecords} refetch={fetchData} showTotals={showTotals} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
