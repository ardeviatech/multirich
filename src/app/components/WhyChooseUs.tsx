import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function WhyChooseUs() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text */}
          <div>
            <p
              className="text-stone-400 mb-3"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Since 1980
            </p>
            <h2
              className="text-[#111] mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Why choose Multi-Rich
              <br />
              Home Decors?
            </h2>
            <p
              className="text-stone-500 mb-8"
              style={{ fontSize: "0.88rem", lineHeight: 1.8 }}
            >
              Established in 1980, Multi-Rich Home Decors Inc. has become a
              reputable supplier of premium marble slabs in the Philippines. We
              source our marble from Italy, Spain, Africa, Greece, the Americas,
              India, and China. Renowned companies, architects, and interior
              designers rely on our products and services.
            </p>
            <p
              className="text-stone-500 mb-10"
              style={{ fontSize: "0.88rem", lineHeight: 1.8 }}
            >
              As the sole distributor of Wilsonart High-Pressure Laminates in
              the Philippines, our strategic partnerships have cemented our
              reputation among international businesses operating in the
              country.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-[#111] group"
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span className="relative">
                Learn more
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-stone-300 group-hover:bg-stone-800 transition-colors" />
              </span>
              <span className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center group-hover:bg-[#111] group-hover:text-white group-hover:border-[#111] transition-all duration-300">
                <ChevronRight size={12} />
              </span>
            </Link>
          </div>

          {/* Right: image */}
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759177715489-74112089de1a?w=800&q=80&fit=crop"
              alt="Luxury marble interior"
              className="w-full aspect-[4/5] object-cover"
            />
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white shadow-xl p-6 md:p-8">
              <p
                className="text-[#111]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3rem",
                  fontWeight: 300,
                  lineHeight: 1,
                }}
              >
                45+
              </p>
              <p
                className="text-stone-500 mt-1"
                style={{ fontSize: "0.75rem", letterSpacing: "0.06em" }}
              >
                Years of Excellence
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}