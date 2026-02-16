import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    image:
      "https://images.unsplash.com/photo-1758800601600-f691cd1ba66d?w=800&q=80&fit=crop",
    title: "Corporate Elegance",
    category: "Commercial",
  },
  {
    image:
      "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?w=800&q=80&fit=crop",
    title: "Residential Luxury",
    category: "Residential",
  },
  {
    image:
      "https://images.unsplash.com/photo-1630756377422-7cfae60dd550?w=800&q=80&fit=crop",
    title: "Natural Stone Collection",
    category: "Materials",
  },
];

export function FeaturedProjects() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <p
              className="text-stone-400 mb-3"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Inspiration
            </p>
            <h2
              className="text-[#111]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Featured Projects
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 text-[#111] group self-start"
            style={{
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span className="relative">
              View gallery
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-stone-300 group-hover:bg-stone-800 transition-colors" />
            </span>
            <span className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center group-hover:bg-[#111] group-hover:text-white group-hover:border-[#111] transition-all duration-300">
              <ChevronRight size={12} />
            </span>
          </Link>
        </div>

        {/* Project Grid - BoConcept style: 2 small + 1 large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <Link
              key={project.title}
              to="/gallery"
              className={`group relative overflow-hidden ${
                i === 2 ? "md:col-span-2 lg:col-span-1 lg:row-span-1" : ""
              }`}
            >
              <div
                className={`overflow-hidden ${
                  i === 2 ? "aspect-[4/5] md:aspect-[16/9] lg:aspect-[4/5]" : "aspect-[4/5]"
                }`}
              >
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Overlay on hover */}
              <div
                className="absolute inset-0 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15,12,8,0.0) 0%, rgba(15,12,8,0.08) 40%, rgba(15,12,8,0.35) 100%)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-transparent">
                <p
                  className="text-white/60 mb-1"
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {project.category}
                </p>
                <h3
                  className="text-white"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.3rem",
                    fontWeight: 400,
                  }}
                >
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}