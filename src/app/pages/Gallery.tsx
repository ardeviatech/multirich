import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { X } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1758448755778-90ebf4d0f1e7?w=800&q=80&fit=crop",
    title: "Marble Living Room",
    category: "residential",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1760072513457-651955c7074d?w=800&q=80&fit=crop",
    title: "Kitchen Countertop",
    category: "residential",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1758800601600-f691cd1ba66d?w=800&q=80&fit=crop",
    title: "Office Interior",
    category: "commercial",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1765766600820-58eaf8687f1d?w=800&q=80&fit=crop",
    title: "Bathroom Design",
    category: "residential",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?w=800&q=80&fit=crop",
    title: "Luxury Showroom",
    category: "commercial",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1759177715489-74112089de1a?w=800&q=80&fit=crop",
    title: "Hotel Lobby",
    category: "commercial",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1630756377422-7cfae60dd550?w=800&q=80&fit=crop",
    title: "Marble Texture",
    category: "materials",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1708379584923-f44da1553304?w=800&q=80&fit=crop",
    title: "Calacatta Slab",
    category: "materials",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1766756388111-e3d5cb5edafb?w=800&q=80&fit=crop",
    title: "Staircase Design",
    category: "residential",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1674831307533-96f363902316?w=800&q=80&fit=crop",
    title: "Dark Granite",
    category: "materials",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1617262869522-6740e6450f27?w=800&q=80&fit=crop",
    title: "Wood Flooring",
    category: "materials",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1758448755778-90ebf4d0f1e7?w=800&q=80&fit=crop",
    title: "Elegant Interior",
    category: "residential",
  },
];

const filterTabs = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "materials", label: "Materials" },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filtered =
    activeFilter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <div className="bg-[#faf8f6] min-h-screen">
      {/* Hero banner */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1687180498602-5a1046defaa4?w=1920&q=80&fit=crop"
          alt="Gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end pb-12 md:pb-16 px-6 md:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto w-full">
            <p
              className="text-white/60 mb-2"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Inspiration
            </p>
            <h1
              className="text-white"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Gallery
            </h1>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-2">
        <div className="flex gap-1 border-b border-stone-200/60">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-3 transition-colors relative ${
                activeFilter === tab.id
                  ? "text-[#111]"
                  : "text-stone-400 hover:text-stone-600"
              }`}
              style={{ fontSize: "0.8rem", letterSpacing: "0.04em" }}
            >
              {tab.label}
              {activeFilter === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((img) => (
            <button
              key={img.id}
              onClick={() => setLightboxImage(img.src)}
              className="group relative overflow-hidden aspect-square cursor-pointer"
            >
              <ImageWithFallback
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-4">
                <p
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ fontSize: "0.8rem" }}
                >
                  {img.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X size={28} />
          </button>
          <img
            src={lightboxImage}
            alt="Gallery"
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}