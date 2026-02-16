import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/* ═══════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════ */
const values = [
  {
    title: "Innovation",
    description:
      "Providing Filipino households with innovative and superior building materials that set new standards in the industry.",
  },
  {
    title: "Excellence",
    description:
      "A reputation for reliability and excellence, earning the trust of prominent businesses and renowned architects.",
  },
  {
    title: "Service",
    description:
      "An unwavering focus on exceptional customer service — from consultation to project completion.",
  },
  {
    title: "Trust",
    description:
      "International businesses rely on MRHDI to handle and promote their products for the Philippine market.",
  },
];

const distributedBrands = [
  {
    name: "Wilsonart",
    logo: "https://multi-rich.com.ph/wp-content/uploads/2024/07/viber_image_2024-07-29_11-30-13-810.png",
  },
  {
    name: "Multi-Form",
    logo: "https://multi-rich.com.ph/wp-content/uploads/2023/12/Multi-form-New.jpg",
  },
  {
    name: "Arborite",
    logo: "https://multi-rich.com.ph/wp-content/uploads/2023/12/ARBORITE.jpg",
  },
  {
    name: "Rehau",
    logo: "https://multi-rich.com.ph/wp-content/uploads/2023/12/REHAU.jpg",
  },
  {
    name: "Dollken",
    logo: "https://multi-rich.com.ph/wp-content/uploads/2023/12/DOLLKEN.jpg",
  },
  {
    name: "Multi-Form Splendor Collection",
    logo: "https://multi-rich.com.ph/wp-content/uploads/2023/12/Picture3.jpg",
  },
  {
    name: "Greenlam Laminates",
    logo: "https://multi-rich.com.ph/wp-content/uploads/2023/12/GREENLAM.jpg",
  },
  {
    name: "Laticrete",
    logo: "https://multi-rich.com.ph/wp-content/uploads/2023/12/LATICRETE.jpg",
  },
  {
    name: "NewTechWood",
    logo: "https://multi-rich.com.ph/wp-content/uploads/2023/12/Picture5.png",
  },
  {
    name: "Europe",
    logo: "https://multi-rich.com.ph/wp-content/uploads/2023/12/europe-solid-surface.jpg",
  },
  {
    name: "Multiquartz",
    logo: "https://multi-rich.com.ph/wp-content/uploads/2023/12/MultiQuartz-2023.png",
  },
];

/* ═══════════════════════════════════════════��════
   Shared style tokens
   ═══════════════════════════════════════════════════ */
const font = {
  heading: "'Cormorant Garamond', serif",
  body: "'Inter', sans-serif",
};

const label = (color = "text-stone-400") =>
  ({
    className: `${color} block`,
    style: {
      fontSize: "0.6rem",
      letterSpacing: "0.28em",
      textTransform: "uppercase" as const,
      fontFamily: font.body,
      fontWeight: 400,
    },
  }) as const;

const body = (color = "text-stone-500") =>
  ({
    className: color,
    style: {
      fontSize: "0.9rem",
      lineHeight: 1.8,
      fontFamily: font.body,
      fontWeight: 300,
    },
  }) as const;

/* ═══════════════════════════════════════════════════
   About Page
   ═══════════════════════════════════════════════════ */
export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="bg-white">
      {/* ──────────────────────────────────────────────
          1. HERO — Full-bleed, BoConcept center-aligned
          ────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1694382224141-8368bf043717?w=1920&q=80&fit=crop"
            alt="Marble texture"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            {...label("text-white/50")}
          >
            Est. 1980 &middot; Mandaluyong, Philippines
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-white mt-4"
            style={{
              fontFamily: font.heading,
              fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            About Multi-Rich
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/45 max-w-md mt-5"
            style={{
              fontSize: "0.92rem",
              lineHeight: 1.7,
              fontFamily: font.body,
              fontWeight: 300,
            }}
          >
            The Philippines' premier supplier of architectural finishing
            materials for over four decades.
          </motion.p>
        </motion.div>
      </section>

      {/* ──────────────────────────────────────────────
          2. BRAND STATEMENT — Large editorial quote
          ─────────────────���─────────────────────────── */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2
            className="text-[#111]"
            style={{
              fontFamily: font.heading,
              fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
              fontWeight: 300,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
            }}
          >
            Dedicated to providing Filipino households with{" "}
            <em style={{ fontStyle: "italic" }}>innovative</em> and superior
            building materials, with an unwavering focus on exceptional customer
            service.
          </h2>
        </motion.div>
      </section>

      {/* ──────────────────────────────────────────────
          3. OUR STORY — Two-column editorial
          ────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Image - Simple Elegant Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="relative group"
          >
            {/* Subtle backdrop accent */}
            <motion.div
              className="absolute -inset-6 bg-gradient-to-br from-stone-100 to-stone-50 -z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Main image container */}
            <motion.div
              className="relative overflow-hidden shadow-lg"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1667328951055-43d66e6e87fd?w=1200&q=80&fit=crop"
                  alt="Marble slabs"
                  className="w-full aspect-[3/2] object-cover"
                />
              </motion.div>
              
              {/* Elegant overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
              
              {/* Subtle shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Minimalist corner accent */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-24 border border-stone-200 -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p {...label()} className="text-stone-400 mb-4">
              Our Story
            </p>
            <h3
              className="text-[#111] mb-8"
              style={{
                fontFamily: font.heading,
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 300,
                lineHeight: 1.2,
              }}
            >
              A legacy built on quality craftsmanship since 1980
            </h3>
            <div className="space-y-5">
              <p {...body()}>
                In 1980, Joseph L. Ang and his team of passionate individuals
                founded Multi-Rich Home Decors Inc. in Mandaluyong, Philippines.
                Their goal was to provide high-quality products and services,
                importing Italian granite and marble slabs for residential and
                commercial interior design markets.
              </p>
              <p {...body()}>
                Their success quickly made MRHDI a prominent player in the
                industry, earning a reputation for excellence and gaining the
                trust of both customers and competitors. Today, MRHDI sources
                materials from Italy, Spain, Africa, Greece, the Americas,
                India, and China.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          4. FULL-WIDTH IMAGE BREAK
          ────────────────────────────────────────────── */}
      <div className="w-full h-[40vh] md:h-[55vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1681152968214-9dad026ad188?w=1920&q=80&fit=crop"
          alt="Luxury marble showroom"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ──────────────────────────────────────────────
          5. STATS — Clean horizontal row
          ────────────────────────────────────────────── */}
      

      {/* ──────────────────────────────────────────────
          6. OUR JOURNEY — BoConcept-style timeline
          ────────────────────────────────────────────── */}
      

      {/* ──────────────────────────────────────────────
          7. SECOND STORY BLOCK — reversed layout
          ────────────────────────────────────────────── */}
      <section className="bg-[#f8f6f3]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center order-2 lg:order-1"
            >
              <p {...label()} className="text-stone-400 mb-4">
                Global Reach
              </p>
              <h3
                className="text-[#111] mb-8"
                style={{
                  fontFamily: font.heading,
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                }}
              >
                Sourcing the world's finest materials for the Philippine market
              </h3>
              <p {...body()}>
                MRHDI has become the leading provider of high-quality granite and
                marble slabs, imported from Italy, Spain, Africa, Greece, the
                Americas, India, and China. The company has developed a
                reputation for reliability and excellence, earning the trust of
                prominent businesses, renowned architects, and interior
                designers across the Philippines.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <div className="overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1769970502055-6d1de307406d?w=800&q=80&fit=crop"
                  alt="Modern kitchen with marble countertop"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          8. VALUES — BoConcept clean grid
          ────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <p {...label()} className="text-stone-400 mb-4">
            What Drives Us
          </p>
          <h2
            className="text-[#111]"
            style={{
              fontFamily: font.heading,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 300,
              lineHeight: 1.15,
            }}
          >
            Our Values
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-stone-200">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`p-7 md:p-8 group hover:bg-[#faf8f6] transition-colors duration-400 ${
                i < 3 ? "lg:border-r border-b lg:border-b-0 border-stone-200" : "border-b lg:border-b-0 border-stone-200 last:border-b-0"
              }`}
            >
              <span
                className="block text-stone-300 mb-6 group-hover:text-stone-400 transition-colors duration-300"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  fontFamily: font.body,
                  fontWeight: 400,
                }}
              >
                0{i + 1}
              </span>
              <h3
                className="text-[#111] mb-3"
                style={{
                  fontFamily: font.heading,
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                {v.title}
              </h3>
              <p
                className="text-stone-400"
                style={{
                  fontSize: "0.82rem",
                  lineHeight: 1.7,
                  fontFamily: font.body,
                  fontWeight: 300,
                }}
              >
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          9. FULL-WIDTH IMAGE BREAK
          ────────────────────────────────────────────── */}
      <div className="w-full h-[35vh] md:h-[50vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1761864419043-1a7fb363de47?w=1920&q=80&fit=crop"
          alt="Dark granite stone texture"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ──────────────────────────────────────────────
          10. PARTNERS — Clean logo showcase
          ────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20 mb-14 md:mb-16"
        >
          <div>
            <p {...label()} className="text-stone-400 mb-4">
              Exclusive Partnerships
            </p>
            <h2
              className="text-[#111]"
              style={{
                fontFamily: font.heading,
                fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                fontWeight: 300,
                lineHeight: 1.2,
              }}
            >
              World-class brands, distributed exclusively
            </h2>
          </div>
          <div className="flex items-end">
            <p {...body()} className="text-stone-500">
              The following top-notch goods are now distributed in the
              Philippines by Multi-Rich Home Decors Inc., a prominent importer
              of the best architectural finishing building materials.
            </p>
          </div>
        </motion.div>

        {/* Brand grid */}
        <div className="border-t border-stone-200">
          {/* Featured — Wilsonart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr] border-b border-stone-200 group"
          >
            <div className="flex items-center justify-center py-10 md:py-12 md:border-r border-stone-200">
              <ImageWithFallback
                src={distributedBrands[0].logo}
                alt={distributedBrands[0].name}
                className="h-10 md:h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-400"
              />
            </div>
            <div className="flex items-center px-6 md:px-10 pb-8 md:pb-0 md:py-12">
              <div>
                <p
                  className="text-stone-300 mb-1"
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontFamily: font.body,
                  }}
                >
                  Sole Philippine Distributor
                </p>
                <p
                  className="text-[#111]"
                  style={{
                    fontFamily: font.heading,
                    fontSize: "1.25rem",
                    fontWeight: 400,
                  }}
                >
                  {distributedBrands[0].name}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Remaining brands in a tight grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {distributedBrands.slice(1).map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="group flex flex-col items-center justify-center py-8 md:py-10 border-b border-r border-stone-200 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:[&:nth-child(5n)]:border-r-0"
              >
                <div className="h-8 md:h-9 flex items-center justify-center mb-3">
                  <ImageWithFallback
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-full max-w-[80%] object-contain opacity-40 group-hover:opacity-90 transition-opacity duration-400"
                  />
                </div>
                <p
                  className="text-stone-300 group-hover:text-stone-500 transition-colors duration-300"
                  style={{
                    fontSize: "0.52rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontFamily: font.body,
                    fontWeight: 400,
                    lineHeight: 1.3,
                    textAlign: "center",
                    maxWidth: "90%",
                  }}
                >
                  {brand.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          11. CTA — BoConcept editorial close
          ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1642621188724-f85258807ba4?w=1920&q=80&fit=crop"
            alt="White marble veined texture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-white/40 mb-4"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontFamily: font.body,
              }}
            >
              Start Your Project
            </p>
            <h2
              className="text-white mb-5"
              style={{
                fontFamily: font.heading,
                fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Let's create something
              <br />
              <em style={{ fontStyle: "italic" }}>beautiful</em> together
            </h2>
            <p
              className="text-white/40 max-w-md mx-auto mb-8"
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.7,
                fontFamily: font.body,
                fontWeight: 300,
              }}
            >
              Whether you need a quote, technical assistance, or design
              consultation — we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#111] px-8 py-3.5 hover:bg-white/90 transition-colors"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: font.body,
                }}
              >
                Start a Project
                <ArrowRight size={13} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/30 text-white/70 px-8 py-3.5 hover:border-white/60 hover:text-white transition-all"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: font.body,
                }}
              >
                Visit Showroom
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}