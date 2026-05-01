"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { config } from "@/lib/config";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username === config.admin.username &&
      password === config.admin.password
    ) {
      localStorage.setItem("admin_session", "true");
      router.push("/keuangan");
    } else {
      setError("Login Gagal.");
    }
  };

  return (
    <div className="bg-surface-container-low p-8 rounded-xl max-w-sm w-full mx-auto">
      <h4 className="font-label text-xs uppercase tracking-widest text-primary mb-6 text-center">Login Akses Admin</h4>
      <form onSubmit={handleLogin} className="space-y-4">
        {error && <div className="text-error text-xs font-label text-center">{error}</div>}
        <div>
          <label className="block font-label text-[10px] uppercase text-on-surface-variant mb-2">Username</label>
          <input
            className="w-full bg-white border border-outline-variant/20 rounded-lg px-4 py-3 font-body focus:ring-primary focus:border-primary text-black"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-label text-[10px] uppercase text-on-surface-variant mb-2">Password</label>
          <input
            className="w-full bg-white border border-outline-variant/20 rounded-lg px-4 py-3 font-body focus:ring-primary focus:border-primary text-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full bg-secondary text-white py-3 rounded-full font-label font-bold text-xs uppercase tracking-widest mt-4 hover:scale-95 transition-transform"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
