"use client";
import React, { useState } from "react";
import Image from "next/image";
import { config } from "@/lib/config";

const ITEMS_PER_PAGE = 6;

export default function GalleryGrid() {
  const { gallery } = config;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(gallery.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentImages = gallery.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-headline text-5xl italic text-primary">Gallery</h2>
          <p className="font-body text-on-surface-variant mt-2">Rekaman Kegiatan Muda Mudi Tegal Cabakan.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentImages.map((photo, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4 w-full aspect-[3/4]">
              <Image
                src={photo.url}
                alt={photo.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-1">
              RECORD {startIndex + index + 1}
            </div>
            <div className="font-headline italic text-xl">{photo.caption}</div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-6 py-2 border rounded-full font-label text-xs uppercase tracking-widest disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-label text-sm flex items-center">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-6 py-2 border rounded-full font-label text-xs uppercase tracking-widest disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
