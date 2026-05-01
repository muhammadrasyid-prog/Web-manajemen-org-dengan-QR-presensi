"use client";
import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRPanel({ meetingNumber, url }: { meetingNumber: number, url: string }) {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `meeting_${meetingNumber}_qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="bg-surface-container p-12 rounded-xl flex flex-col items-center justify-center text-center h-full">
      <div className="p-8 bg-white rounded-lg shadow-inner mb-8" ref={qrRef}>
        <QRCodeCanvas value={url} size={256} className="mx-auto" />
      </div>
      <h3 className="font-headline text-2xl text-black italic mb-4">Digital Authentication</h3>
      <p className="font-body text-sm text-on-surface-variant mb-8 max-w-xs">
        Scan this session-specific key to broadcast your presence to the local archival node.
      </p>
      <button 
        onClick={downloadQR}
        className="bg-primary text-white px-8 py-3 rounded-full font-label font-bold text-xs uppercase tracking-widest flex items-center gap-2"
      >
        Download Key
      </button>
    </div>
  );
}
