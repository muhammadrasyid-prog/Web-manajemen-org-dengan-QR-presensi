"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Check, Trash2, Plus } from "lucide-react";
import { useToast } from "./Toast";

const MEETS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function KasTable({ members, kasRecords, refetch, showTotals }: any) {
  const { showToast } = useToast();
  const [newMember, setNewMember] = useState("");
  const [newCategory, setNewCategory] = useState("SMA+");
  const [loading, setLoading] = useState(false);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember) return;
    setLoading(true);
    const { error } = await supabase.from("members").insert({ name: newMember, category: newCategory });
    if (error) {
      showToast(error.message, "error");
    } else {
      showToast("Member added", "success");
      setNewMember("");
      refetch();
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete member?")) return;
    setLoading(true);
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) {
      showToast(error.message, "error");
    } else {
      showToast("Member deleted", "success");
      refetch();
    }
    setLoading(false);
  };

  const toggleKas = async (memberId: number, meetingNo: number) => {
    setLoading(true);
    const existing = kasRecords.find((k: any) => k.member_id === memberId && k.meeting_number === meetingNo);
    if (existing) {
      const { error } = await supabase.from("kas").update({ is_paid: !existing.is_paid }).eq("id", existing.id);
      if (error) showToast(error.message, "error");
      else {
        showToast("Payment status updated", "success");
        refetch();
      }
    } else {
      const { error } = await supabase.from("kas").insert({
        member_id: memberId,
        meeting_number: meetingNo,
        is_paid: true
      });
      if (error) showToast(error.message, "error");
      else {
        showToast("Payment recorded", "success");
        refetch();
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-surface-container p-6 rounded-xl overflow-x-auto text-black">
      <form onSubmit={handleAddMember} className="mb-6 flex gap-4 max-w-md">
        <input 
          placeholder="New Member Name"
          value={newMember}
          onChange={e => setNewMember(e.target.value)}
          className="flex-1 rounded-lg px-4 py-2 text-sm border focus:ring-primary outline-none text-black"
        />
        <select 
          value={newCategory} 
          onChange={e => setNewCategory(e.target.value)}
          className="rounded-lg px-4 py-2 text-sm border focus:ring-primary outline-none bg-white text-black"
        >
          <option value="SMA+">SMA+ (10K)</option>
          <option value="SMP">SMP (5K)</option>
        </select>
        <button type="submit" disabled={loading} className="bg-primary text-white p-2 rounded-lg hover:bg-opacity-90">
          <Plus size={20} />
        </button>
      </form>
      
      <table className="w-full border-collapse min-w-[800px]">
        <thead>
          <tr className="text-left font-label text-[10px] uppercase tracking-widest text-on-surface-variant border-b border-primary/20">
            <th className="py-4 px-4 whitespace-nowrap">Member Entity</th>
            <th className="py-4 px-4 text-center">Delete</th>
            {MEETS.map(m => (
              <th key={m} className="py-4 px-2 text-center">M{m}</th>
            ))}
            <th className="py-4 px-4 text-right">Terkumpul</th>
            <th className="py-4 px-4 text-right text-error whitespace-nowrap">Hutang Sisa</th>
          </tr>
        </thead>
        <tbody className="font-body text-sm text-foreground">
          {members.map((m: any) => {
            const amount = m.category === 'SMP' ? 5000 : 10000;
            const memberKas = kasRecords.filter((k: any) => k.member_id === m.id && k.is_paid);
            const paidCount = memberKas.length;
            const totalTerkumpul = paidCount * amount;
            const totalHutang = (12 - paidCount) * amount;
            
            const formatRp = (val: number) => showTotals ? `Rp ${val.toLocaleString('id-ID')}` : "Rp ***.***";

            return (
            <tr key={m.id} className="border-b border-outline-variant/10 hover:bg-black/5 transition-colors">
              <td className="py-4 px-4 font-headline italic text-lg whitespace-nowrap text-left">
                {m.name}
                <span className="ml-2 text-xs font-label text-on-surface-variant uppercase not-italic bg-black/5 px-2 py-1 rounded">
                  {m.category || 'SMA+'}
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <button onClick={() => handleDelete(m.id)} className="text-error hover:opacity-70 mx-auto transition-opacity">
                  <Trash2 size={16} />
                </button>
              </td>
              {MEETS.map(meet => {
                const record = kasRecords.find((k: any) => k.member_id === m.id && k.meeting_number === meet);
                const isPaid = record?.is_paid;
                return (
                  <td key={meet} className="py-4 px-2 text-center">
                    <button 
                      onClick={() => toggleKas(m.id, meet)}
                      disabled={loading}
                      className={`w-6 h-6 rounded flex items-center justify-center mx-auto transition-colors ${
                        isPaid ? "bg-primary text-white" : "bg-outline-variant text-transparent hover:bg-outline-variant/50"
                      }`}
                    >
                      {isPaid && <Check size={12} strokeWidth={4} />}
                    </button>
                  </td>
                );
              })}
              <td className="py-4 px-4 text-right font-body font-medium">{formatRp(totalTerkumpul)}</td>
              <td className="py-4 px-4 text-right font-body font-medium text-error">{formatRp(totalHutang)}</td>
            </tr>
          )})}
          {members.length === 0 && (
            <tr>
              <td colSpan={16} className="text-center py-8 text-on-surface-variant">No members registered yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
