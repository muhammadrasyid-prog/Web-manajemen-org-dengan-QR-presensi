"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QRPanel from "@/components/QRPanel";
import AttendanceList from "@/components/AttendanceList";
import { useAuth } from "@/lib/useAuth";
import { supabase } from "@/lib/supabase";

export default function PresensiAdminPage() {
  const isAuth = useAuth();
  const [meetingSelected, setMeetingSelected] = useState<number>(1);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [baseUrl, setBaseUrl] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const fetchAttendees = async () => {
    const { data } = await supabase
      .from("attendance")
      .select("*")
      .eq("meeting_number", meetingSelected)
      .order("attended_at", { ascending: false });
    if (data) setAttendees(data as any);
    
    // Fetch session closed state
    const { data: stateData } = await supabase
      .from("meeting_states")
      .select("is_closed")
      .eq("meeting_number", meetingSelected)
      .single();
    if (stateData) setIsClosed(stateData.is_closed);
    else setIsClosed(false);

    // Fetch members list
    const { data: membersData } = await supabase
      .from("members")
      .select("*")
      .order("name");
    if (membersData) setMembers(membersData as any);
  };

  const toggleSession = async () => {
    const newVal = !isClosed;
    const { error } = await supabase
      .from("meeting_states")
      .upsert({ meeting_number: meetingSelected, is_closed: newVal });
    if (!error) setIsClosed(newVal);
  };

  useEffect(() => {
    if (isAuth) {
      fetchAttendees();
    }
  }, [isAuth, meetingSelected]);

  useEffect(() => {
    if (!isAuth) return;
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'attendance', filter: `meeting_number=eq.${meetingSelected}` },
        (payload) => {
          setAttendees((prev: any) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuth, meetingSelected]);

  if (isAuth === null) return <div className="min-h-screen flex items-center justify-center font-label">Loading session...</div>;
  if (!isAuth) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-8 py-24 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-headline text-5xl italic text-primary">Presence & Entry</h2>
            <p className="font-body text-on-surface-variant mt-2">Manage session authentication configurations.</p>
          </div>
          <div className="flex items-end gap-4">
            <div>
              <label className="block font-label text-[10px] uppercase text-on-surface-variant mb-2">Select Session</label>
              <select 
                value={meetingSelected} 
                onChange={(e) => setMeetingSelected(Number(e.target.value))}
                className="bg-white border-outline-variant/20 rounded-lg px-6 py-3 font-body text-primary focus:ring-primary focus:border-primary outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>Session {String(m).padStart(3, '0')}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={toggleSession}
              className={`px-6 py-3 rounded-lg font-label font-bold text-xs uppercase tracking-widest text-white transition-opacity h-[48px] ${
                isClosed ? 'bg-error hover:opacity-90' : 'bg-primary hover:opacity-90'
              }`}
            >
              {isClosed ? "Unlock Session" : "Lock Session"}
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-[1fr_2fr] gap-12">
          {baseUrl && <QRPanel meetingNumber={meetingSelected} url={`${baseUrl}/presensi/form?meeting=${meetingSelected}`} />}
          <AttendanceList attendees={attendees} members={members} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
