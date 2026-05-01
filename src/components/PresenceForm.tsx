"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function PresenceForm({ meetingNo }: { meetingNo: number }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await supabase.from("meeting_states").select("is_closed").eq("meeting_number", meetingNo).single();
      if (data && data.is_closed) {
        setIsClosed(true);
      }
      setChecking(false);
    };
    fetchStatus();
  }, [meetingNo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");

    const { data: existing } = await supabase
      .from("attendance")
      .select("id")
      .eq("meeting_number", meetingNo)
      .ilike("name", name.trim());
      
    if (existing && existing.length > 0) {
      setError(`Presence for ${name} is already recorded for Session ${meetingNo}.`);
      setLoading(false);
      return;
    }
    
    // Extra safety, check if closed while filling out
    const { data: stateData } = await supabase.from("meeting_states").select("is_closed").eq("meeting_number", meetingNo).single();
    if (stateData && stateData.is_closed) {
      setError("This session was just closed by the admin.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("attendance")
      .insert({ name: name.trim(), meeting_number: meetingNo });

    if (insertError) {
      setError(insertError.message);
    } else {
      setSuccess(true);
      // Wait for real-time list update via sockets (handled in Admin page)
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-surface-container p-8 rounded-xl text-center shadow-lg border-t-4 border-primary">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-headline text-2xl text-primary italic mb-2">Kehadiran Terverifikasi</h3>
        <p className="font-body text-sm text-on-surface-variant">
          Kehadiran Anda untuk Pertemuan {String(meetingNo).padStart(3, "0")} telah berhasil direkam.
        </p>
      </div>
    );
  }

  if (checking) {
    return <div className="text-center py-12 font-label text-xs uppercase tracking-widest text-on-surface-variant">Validating Session Configuration...</div>;
  }

  if (isClosed) {
    return (
      <div className="bg-surface-container p-8 rounded-xl text-center shadow-lg border-t-4 border-error">
        <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="font-headline text-2xl text-error italic mb-2">Sesi Presensi Ditutup</h3>
        <p className="font-body text-sm text-on-surface-variant">
          Sesi presensi ini telah resmi ditutup oleh admin. Tidak ada lagi entri yang diterima.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container p-8 rounded-xl shadow-lg border-t-4 border-primary">
      <h4 className="font-label text-xs uppercase tracking-widest text-primary mb-6 text-center">Formulir Kehadiran</h4>
      <div className="text-center mb-6">
        <div className="font-headline text-3xl italic text-primary">Pertemuan {String(meetingNo).padStart(3, "0")}</div>
        <div suppressHydrationWarning className="font-label text-[10px] uppercase text-on-surface-variant mt-1">{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="text-error text-xs font-label text-center">{error}</div>}
        <div>
          <label className="block font-label text-[10px] uppercase text-on-surface-variant mb-2">Nama</label>
          <input
            className="w-full bg-white border border-outline-variant/20 rounded-lg px-4 py-3 font-body focus:ring-primary focus:border-primary outline-none text-black"
            type="text"
            placeholder="Masukkan Nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button
          className="w-full bg-secondary text-white py-4 rounded-full font-label font-bold text-xs uppercase tracking-widest hover:scale-95 transition-transform disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Memverifikasi..." : "Daftarkan Kehadiran"}
        </button>
      </form>
    </div>
  );
}
