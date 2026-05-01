"use client";
import React from "react";

export default function AttendanceList({ attendees, members = [] }: { attendees: any[], members?: any[] }) {
  // Identify guests: people who scanned QR but aren't in members database
  const guests = attendees.filter(att => 
    !members.some(m => m.name.toLowerCase() === att.name.toLowerCase())
  );

  return (
    <div className="bg-surface-container p-6 rounded-xl overflow-x-auto text-black shadow-lg">
      <h4 className="font-headline text-2xl italic text-primary mb-6">Attendance Dashboard</h4>
      <table className="w-full border-collapse min-w-[500px]">
        <thead>
          <tr className="text-left font-label text-[10px] uppercase tracking-widest text-on-surface-variant border-b border-primary/20">
            <th className="py-4 px-4 whitespace-nowrap">Member Validation</th>
            <th className="py-4 px-4 text-center">Status</th>
            <th className="py-4 px-4 text-right">Time Logged</th>
          </tr>
        </thead>
        <tbody className="font-body text-sm text-foreground">
          {/* 1. Official Members */}
          {members.map(m => {
            const attRecord = attendees.find(a => a.name.toLowerCase() === m.name.toLowerCase());
            return (
              <tr key={m.id} className="border-b border-outline-variant/10 hover:bg-black/5 transition-colors">
                <td className="py-4 px-4 font-headline italic text-lg whitespace-nowrap">
                  {m.name}
                  <span className="ml-2 text-xs font-label text-on-surface-variant uppercase not-italic bg-black/5 px-2 py-1 rounded">
                    {m.category || 'Member'}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  {attRecord ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-primary text-white mx-auto">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  ) : (
                    <span className="inline-block w-4 h-[2px] bg-error/50 rounded mx-auto" title="Absen"></span>
                  )}
                </td>
                <td className="py-4 px-4 text-right font-label text-xs uppercase text-on-surface-variant">
                  {attRecord ? new Date(attRecord.attended_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                </td>
              </tr>
            );
          })}
          
          {/* 2. Unregistered Guests */}
          {guests.map(g => (
            <tr key={g.id} className="border-b border-outline-variant/5 bg-black/5 hover:bg-black/10 transition-colors">
              <td className="py-4 px-4 font-headline italic text-lg whitespace-nowrap text-on-surface-variant">
                {g.name}
                <span className="ml-2 text-[10px] font-label text-white uppercase not-italic bg-secondary px-2 py-1 rounded">
                  Tamu / Unknown
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-secondary text-white mx-auto">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </td>
              <td className="py-4 px-4 text-right font-label text-xs uppercase text-on-surface-variant">
                {new Date(g.attended_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </td>
            </tr>
          ))}

          {members.length === 0 && attendees.length === 0 && (
            <tr>
              <td colSpan={3} className="py-12 text-center text-on-surface-variant italic">No data available for this session.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
