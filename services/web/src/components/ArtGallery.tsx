"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";

interface ArtPiece {
  id: string;
  title: string;
  author: string;
  category: "Portraits" | "Figures" | "Experimental Pieces";
  src: string;
}

const portraits: ArtPiece[] = [
  {
    id: "faces-2",
    title: "Portraits",
    author: "By Loïc Muhirwa",
    category: "Portraits",
    src: "/images/art/faces/2-low-res.jpg",
  },
  {
    id: "faces-1",
    title: "Portraits",
    author: "By Loïc Muhirwa",
    category: "Portraits",
    src: "/images/art/faces/1-low-res.jpg",
  },
  {
    id: "faces-4",
    title: "Portraits",
    author: "By Loïc Muhirwa",
    category: "Portraits",
    src: "/images/art/faces/4-low-res.jpg",
  },
  {
    id: "faces-3",
    title: "Portraits",
    author: "By Loïc Muhirwa",
    category: "Portraits",
    src: "/images/art/faces/3-low-res.jpg",
  },
  {
    id: "faces-6",
    title: "Portraits",
    author: "By Loïc Muhirwa",
    category: "Portraits",
    src: "/images/art/faces/6-low-res.jpg",
  },
  {
    id: "faces-7",
    title: "Portraits",
    author: "By Loïc Muhirwa",
    category: "Portraits",
    src: "/images/art/faces/7-low-res.jpg",
  },
  {
    id: "faces-8",
    title: "Portraits",
    author: "By Loïc Muhirwa",
    category: "Portraits",
    src: "/images/art/faces/8-low-res.jpg",
  },
  {
    id: "faces-5",
    title: "Portraits",
    author: "By Loïc Muhirwa",
    category: "Portraits",
    src: "/images/art/faces/5-low-res.jpg",
  },
];

const figures: ArtPiece[] = [
  {
    id: "forms-1",
    title: "Figures",
    author: "By Loïc Muhirwa",
    category: "Figures",
    src: "/images/art/forms/1-low-res.jpg",
  },
  {
    id: "forms-4",
    title: "Figures",
    author: "By Loïc Muhirwa",
    category: "Figures",
    src: "/images/art/forms/4-low-res.jpg",
  },
  {
    id: "forms-3",
    title: "Figures",
    author: "By Loïc Muhirwa",
    category: "Figures",
    src: "/images/art/forms/3-low-res.jpg",
  },
  {
    id: "forms-2",
    title: "Figures",
    author: "By Loïc Muhirwa",
    category: "Figures",
    src: "/images/art/forms/2-low-res.jpg",
  },
];

const experimental: ArtPiece[] = [
  {
    id: "exp-1",
    title: "Experimental Pieces",
    author: "By Loïc Muhirwa",
    category: "Experimental Pieces",
    src: "/images/art/experimental/1-low-res.jpg",
  },
  {
    id: "exp-2",
    title: "Experimental Pieces",
    author: "By Loïc Muhirwa",
    category: "Experimental Pieces",
    src: "/images/art/experimental/2-low-res.jpg",
  },
  {
    id: "exp-3",
    title: "Experimental Pieces",
    author: "By Loïc Muhirwa",
    category: "Experimental Pieces",
    src: "/images/art/experimental/3-low-res.jpg",
  },
  {
    id: "exp-4",
    title: "Experimental Pieces",
    author: "By Loïc Muhirwa",
    category: "Experimental Pieces",
    src: "/images/art/experimental/4-low-res.jpg",
  },
];

export function ArtGallery() {
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);

  const renderSection = (title: string, subtitle: string, items: ArtPiece[], id?: string) => (
    <div id={id} className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-serif text-3xl text-stone-950 dark:text-stone-50">{title}</h2>
        <p className="text-sm font-light text-stone-500 dark:text-stone-400">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((piece) => (
          <div
            key={piece.id}
            onClick={() => setSelectedPiece(piece)}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm dark:border-stone-800 dark:bg-stone-900"
          >
            <Image
              src={piece.src}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-stone-950/60 p-3 text-white opacity-0 transition group-hover:opacity-100">
              <h3 className="font-serif text-xs italic text-stone-200">{piece.author}</h3>
              <span className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-stone-300 hover:text-white">
                <Maximize2 size={11} /> full screen
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="art" className="space-y-16 border-t border-stone-200 pt-16 dark:border-stone-800">
      {renderSection("Portraits", "the face and its various expressions", portraits, "drawing")}
      {renderSection("Figures", "the human form in its various shapes and postures", figures)}
      {renderSection(
        "Experimental Pieces",
        "experimenting with different styles and mediums",
        experimental,
        "exp"
      )}

      {/* Fullscreen Lightbox Modal */}
      {selectedPiece && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
          onClick={() => setSelectedPiece(null)}
        >
          <div
            className="relative flex max-h-[90vh] max-w-2xl flex-col items-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPiece(null)}
              className="absolute -top-10 right-0 text-stone-400 transition hover:text-white"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div className="relative aspect-square w-[85vw] max-w-xl overflow-hidden rounded-2xl bg-stone-950 shadow-2xl">
              <Image src={selectedPiece.src} alt="" fill className="object-contain" priority />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg text-stone-200">{selectedPiece.author}</h3>
              <p className="font-mono text-xs text-stone-400">{selectedPiece.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
