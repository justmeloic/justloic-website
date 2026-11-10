"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";

interface ArtPiece {
  id: string;
  title: string;
  category: "Portraits" | "Figures" | "Experimental";
  src: string;
}

const artPieces: ArtPiece[] = [
  { id: "faces-1", title: "Portrait Study I", category: "Portraits", src: "/images/art/faces/1-low-res.jpg" },
  { id: "faces-2", title: "Portrait Study II", category: "Portraits", src: "/images/art/faces/2-low-res.jpg" },
  { id: "forms-1", title: "Figure & Posture I", category: "Figures", src: "/images/art/forms/1-low-res.jpg" },
  { id: "exp-1", title: "Experimental Piece I", category: "Experimental", src: "/images/art/experimental/1-low-res.jpg" },
  { id: "faces-3", title: "Portrait Study III", category: "Portraits", src: "/images/art/faces/3-low-res.jpg" },
  { id: "faces-6", title: "Portrait Study IV", category: "Portraits", src: "/images/art/faces/6-low-res.jpg" },
  { id: "forms-3", title: "Figure & Posture II", category: "Figures", src: "/images/art/forms/3-low-res.jpg" },
  { id: "exp-4", title: "Experimental Piece II", category: "Experimental", src: "/images/art/experimental/4-low-res.jpg" },
];

export function ArtGallery() {
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);

  return (
    <section id="art" className="space-y-8 border-t border-stone-200 dark:border-stone-800 pt-16">
      <div>
        <span className="font-mono text-xs text-red-800 dark:text-red-400 uppercase tracking-widest font-semibold">
          02 / Creative Practice
        </span>
        <h2 className="font-serif text-3xl md:text-4xl mt-1 text-stone-950 dark:text-stone-50">
          Drawings, Portraits & Forms
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-xl font-light">
          Figurative drawing and experimental art exploring the face and posture through charcoal, ink, and digital studies.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {artPieces.map((piece) => (
          <div
            key={piece.id}
            onClick={() => setSelectedPiece(piece)}
            className="group relative aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 cursor-pointer shadow-sm"
          >
            <Image
              src={piece.src}
              alt={piece.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-stone-950/50 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-3 text-white">
              <span className="text-xs font-serif italic">{piece.title}</span>
              <Maximize2 size={14} className="text-stone-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPiece && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in"
          onClick={() => setSelectedPiece(null)}
        >
          <div
            className="relative max-w-2xl max-h-[90vh] flex flex-col items-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPiece(null)}
              className="absolute -top-10 right-0 text-stone-400 hover:text-white transition"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div className="relative w-[85vw] max-w-xl aspect-square rounded-2xl overflow-hidden shadow-2xl bg-stone-950">
              <Image
                src={selectedPiece.src}
                alt={selectedPiece.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center font-serif text-stone-200 text-lg">
              {selectedPiece.title} <span className="font-mono text-xs text-stone-400">({selectedPiece.category})</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
