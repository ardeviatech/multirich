import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Grid3X3,
  LayoutGrid,
  Search,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getCategoryBySlug, getSubProduct } from "../data/products";

type GridSize = "compact" | "spacious";

export default function SubProductDetail() {
  const { categorySlug, subProductId } = useParams();
  const category = getCategoryBySlug(categorySlug || "");
  const subProduct = getSubProduct(categorySlug || "", subProductId || "");
  const [filterFinish, setFilterFinish] = useState<string>("all");
  const [gridSize, setGridSize] = useState<GridSize>("compact");
  const [searchTerm, setSearchTerm] = useState("");

  if (!category || !subProduct) {
    return <Navigate to={`/products/${categorySlug || ""}`} replace />;
  }

  const siblings = category.subProducts || [];
  const currentIdx = siblings.findIndex((s) => s.id === subProduct.id);
  const prevSibling = currentIdx > 0 ? siblings[currentIdx - 1] : null;
  const nextSibling =
    currentIdx < siblings.length - 1 ? siblings[currentIdx + 1] : null;

  const finishes = subProduct.variants
    ? [...new Set(subProduct.variants.map((v) => v.finish).filter(Boolean))]
    : [];

  let filteredVariants = subProduct.variants
    ? filterFinish === "all"
      ? subProduct.variants
      : subProduct.variants.filter((v) => v.finish === filterFinish)
    : [];

  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    filteredVariants = filteredVariants.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        (v.color && v.color.toLowerCase().includes(q)) ||
        (v.finish && v.finish.toLowerCase().includes(q))
    );
  }

  const variantCount = subProduct.variants?.length || 0;

  return (
    <div className="bg-[#f8f6f3] min-h-screen">
      {/* HEADER */}
      <section className="bg-white border-b border-stone-200/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-10 md:pb-14">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-stone-400 mb-8 flex-wrap"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.03em",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <Link to="/" className="hover:text-stone-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={10} className="text-stone-300" />
            <Link
              to="/products"
              className="hover:text-stone-600 transition-colors"
            >
              Products
            </Link>
            <ChevronRight size={10} className="text-stone-300" />
            <Link
              to={`/products/${category.slug}`}
              className="hover:text-stone-600 transition-colors"
            >
              {category.name}
            </Link>
            <ChevronRight size={10} className="text-stone-300" />
            <span className="text-stone-600">{subProduct.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            {/* Left: Title + Description */}
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-stone-400 mb-2"
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {category.name}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[#111] mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                  fontWeight: 300,
                  lineHeight: 1.08,
                  letterSpacing: "-0.015em",
                }}
              >
                {subProduct.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-stone-500 max-w-lg"
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                {subProduct.description}
              </motion.p>
            </div>

            {/* Right: Specs */}
            {subProduct.specs && subProduct.specs.length > 0 && (
              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <div className="bg-[#f0ece6] p-6">
                  <p
                    className="text-stone-400 mb-4"
                    style={{
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Specifications
                  </p>
                  {subProduct.specs.map((spec, si) => (
                    <div
                      key={spec}
                      className={`flex items-center justify-between py-2.5 ${
                        si < subProduct.specs!.length - 1
                          ? "border-b border-stone-300/30"
                          : ""
                      }`}
                    >
                      <span
                        className="text-stone-500"
                        style={{
                          fontSize: "0.78rem",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        {spec.split(":")[0]}
                      </span>
                      <span
                        className="text-[#111] text-right"
                        style={{
                          fontSize: "0.78rem",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {spec.split(":").slice(1).join(":").trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* SWATCH GRID */}
      {subProduct.variants && subProduct.variants.length > 0 && (
        <section>
          {/* Sticky toolbar */}
          <div className="sticky top-[60px] md:top-[72px] z-30 bg-[#faf8f6]/95 backdrop-blur-md border-b border-stone-200/50">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-3">
              <div className="flex items-center justify-between gap-4">
                {/* Left: results + search */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span
                    className="text-stone-400 flex-shrink-0 hidden sm:inline"
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {filteredVariants.length} of {variantCount}
                  </span>

                  {/* Search */}
                  <div className="relative flex-1 max-w-xs">
                    <Search
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search products\u2026"
                      className="w-full pl-8 pr-3 py-2 bg-[#f0ece6] border-0 outline-none text-stone-700 placeholder:text-stone-400"
                      style={{
                        fontSize: "0.78rem",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    />
                  </div>
                </div>

                {/* Right: filters + grid toggle */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Finish filters */}
                  {finishes.length > 1 && (
                    <div className="hidden md:flex items-center gap-1.5">
                      <button
                        onClick={() => setFilterFinish("all")}
                        className={`px-3 py-1.5 transition-all duration-200 ${
                          filterFinish === "all"
                            ? "bg-[#111] text-white"
                            : "text-stone-500 hover:text-[#111] bg-[#f0ece6]"
                        }`}
                        style={{
                          fontSize: "0.68rem",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        All
                      </button>
                      {finishes.map((finish) => (
                        <button
                          key={finish}
                          onClick={() => setFilterFinish(finish || "all")}
                          className={`px-3 py-1.5 transition-all duration-200 ${
                            filterFinish === finish
                              ? "bg-[#111] text-white"
                              : "text-stone-500 hover:text-[#111] bg-[#f0ece6]"
                          }`}
                          style={{
                            fontSize: "0.68rem",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {finish}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Mobile filter dropdown */}
                  {finishes.length > 1 && (
                    <select
                      value={filterFinish}
                      onChange={(e) => setFilterFinish(e.target.value)}
                      className="md:hidden px-3 py-2 bg-[#f0ece6] border-0 text-stone-600 outline-none"
                      style={{
                        fontSize: "0.72rem",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      <option value="all">All Finishes</option>
                      {finishes.map((f) => (
                        <option key={f} value={f!}>
                          {f}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* Grid toggle */}
                  <div className="hidden md:flex items-center bg-[#f0ece6]">
                    <button
                      onClick={() => setGridSize("compact")}
                      className={`p-2 transition-colors ${
                        gridSize === "compact"
                          ? "bg-[#111] text-white"
                          : "text-stone-400 hover:text-stone-600"
                      }`}
                    >
                      <Grid3X3 size={14} />
                    </button>
                    <button
                      onClick={() => setGridSize("spacious")}
                      className={`p-2 transition-colors ${
                        gridSize === "spacious"
                          ? "bg-[#111] text-white"
                          : "text-stone-400 hover:text-stone-600"
                      }`}
                    >
                      <LayoutGrid size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 md:py-12">
            {filteredVariants.length === 0 ? (
              <div className="text-center py-20">
                <p
                  className="text-stone-400"
                  style={{
                    fontSize: "0.9rem",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  No products match your criteria.
                </p>
                <button
                  onClick={() => {
                    setFilterFinish("all");
                    setSearchTerm("");
                  }}
                  className="mt-3 text-[#111] border-b border-[#111] pb-px"
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-3 md:gap-4 ${
                  gridSize === "compact"
                    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                    : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {filteredVariants.map((variant, i) => (
                  <motion.div
                    key={variant.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(i * 0.02, 0.2),
                    }}
                  >
                    <Link
                      to={`/products/${category.slug}/${subProduct.id}/${variant.id}`}
                      className="group text-left w-full bg-white block hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-400"
                    >
                      <div
                        className={`relative overflow-hidden ${
                          gridSize === "compact"
                            ? "aspect-square"
                            : "aspect-[4/3]"
                        }`}
                      >
                        <ImageWithFallback
                          src={variant.image}
                          alt={variant.name}
                          className="w-full h-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-[1.08]"
                        />
                        {/* Hover glass */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-400" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 flex items-center gap-2 shadow-sm">
                            <span
                              className="text-[#111]"
                              style={{
                                fontSize: "0.6rem",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 500,
                              }}
                            >
                              View Details
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3">
                        <p
                          className="text-[#111]"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize:
                              gridSize === "compact" ? "0.95rem" : "1.1rem",
                            fontWeight: 400,
                            lineHeight: 1.3,
                          }}
                        >
                          {variant.name}
                        </p>
                        <p
                          className="text-stone-400 mt-0.5"
                          style={{
                            fontSize: "0.65rem",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {[variant.finish, variant.color]
                            .filter(Boolean)
                            .join(" \u00b7 ")}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14 md:py-18">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2
                className="text-white mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                  fontWeight: 300,
                  lineHeight: 1.25,
                }}
              >
                Need samples of {subProduct.name}?
              </h2>
              <p
                className="text-white/40"
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                Request physical material samples or speak with our specialists for expert guidance on your project.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#111] px-7 py-3.5 hover:bg-stone-100 transition-colors whitespace-nowrap"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Request Samples
                <ArrowRight size={12} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 bg-[#111] text-white px-8 py-4 hover:bg-[#2a2a2a] transition-colors"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Inquire About This Product
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NAV */}
      <section className="bg-white border-t border-stone-200/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 divide-x divide-stone-200/50">
            <div className="py-8 md:py-10 pr-4 md:pr-10">
              {prevSibling ? (
                <Link
                  to={`/products/${category.slug}/${prevSibling.id}`}
                  className="group flex items-center gap-3"
                >
                  <ArrowLeft
                    size={18}
                    className="text-stone-300 group-hover:text-[#111] transition-colors group-hover:-translate-x-1 duration-300"
                  />
                  <div>
                    <p
                      className="text-stone-400 mb-0.5"
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Previous
                    </p>
                    <p
                      className="text-stone-500 group-hover:text-[#111] transition-colors"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                      }}
                    >
                      {prevSibling.name}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link
                  to={`/products/${category.slug}`}
                  className="group flex items-center gap-3"
                >
                  <ArrowLeft
                    size={18}
                    className="text-stone-300 group-hover:text-[#111] transition-colors group-hover:-translate-x-1 duration-300"
                  />
                  <div>
                    <p
                      className="text-stone-400 mb-0.5"
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Back to
                    </p>
                    <p
                      className="text-stone-500 group-hover:text-[#111] transition-colors"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                      }}
                    >
                      {category.name}
                    </p>
                  </div>
                </Link>
              )}
            </div>

            <div className="py-8 md:py-10 pl-4 md:pl-10 flex justify-end">
              {nextSibling ? (
                <Link
                  to={`/products/${category.slug}/${nextSibling.id}`}
                  className="group flex items-center gap-3 text-right"
                >
                  <div>
                    <p
                      className="text-stone-400 mb-0.5"
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Next
                    </p>
                    <p
                      className="text-stone-500 group-hover:text-[#111] transition-colors"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                      }}
                    >
                      {nextSibling.name}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-stone-300 group-hover:text-[#111] transition-colors group-hover:translate-x-1 duration-300"
                  />
                </Link>
              ) : (
                <Link
                  to={`/products/${category.slug}`}
                  className="group flex items-center gap-3 text-right"
                >
                  <div>
                    <p
                      className="text-stone-400 mb-0.5"
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Back to
                    </p>
                    <p
                      className="text-stone-500 group-hover:text-[#111] transition-colors"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                      }}
                    >
                      {category.name}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-stone-300 group-hover:text-[#111] transition-colors group-hover:translate-x-1 duration-300"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}