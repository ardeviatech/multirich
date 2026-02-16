import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Layers,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getCategoryBySlug, productCategories } from "../data/products";

export default function ProductDetail() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug || "");

  if (!category) {
    return <Navigate to="/products" replace />;
  }

  const currentIndex = productCategories.findIndex(
    (c) => c.slug === category.slug
  );
  const prevCategory =
    currentIndex > 0 ? productCategories[currentIndex - 1] : null;
  const nextCategory =
    currentIndex < productCategories.length - 1
      ? productCategories[currentIndex + 1]
      : null;

  const totalVariants =
    category.subProducts?.reduce(
      (a, sp) => a + (sp.variants?.length || 0),
      0
    ) || 0;

  return (
    <div className="bg-[#f8f6f3] min-h-screen">
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-0">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-stone-400 mb-8"
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
            <span className="text-stone-600">{category.name}</span>
          </nav>

          {/* Title area */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-stone-400 mb-2"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {category.subtitle}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[#111]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                {category.name}
              </motion.h1>
            </div>

            {/* Meta badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center gap-4"
            >
              {category.subProducts && (
                <div className="bg-[#f0ece6] px-5 py-3">
                  <p
                    className="text-stone-400"
                    style={{
                      fontSize: "0.52rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Types
                  </p>
                  <p
                    className="text-[#111]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.15rem",
                      fontWeight: 400,
                    }}
                  >
                    {category.subProducts.length}
                  </p>
                </div>
              )}
              {totalVariants > 0 && (
                <div className="bg-[#f0ece6] px-5 py-3">
                  <p
                    className="text-stone-400"
                    style={{
                      fontSize: "0.52rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Products
                  </p>
                  <p
                    className="text-[#111]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.15rem",
                      fontWeight: 400,
                    }}
                  >
                    {totalVariants}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Full-width hero image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative aspect-[21/9] md:aspect-[21/7] overflow-hidden"
        >
          <ImageWithFallback
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* DESCRIPTION STRIP */}
      <section className="bg-white border-t border-stone-200/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Description */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-stone-500 max-w-xl"
                style={{
                  fontSize: "1.02rem",
                  lineHeight: 1.9,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                {category.description}
              </p>

              {category.brands && category.brands.length > 0 && (
                <div className="mt-8 flex items-center gap-3 flex-wrap">
                  <span
                    className="text-stone-400"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Brands:
                  </span>
                  {category.brands.map((brand, i) => (
                    <span key={brand} className="text-stone-500" style={{
                      fontSize: "0.82rem",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                    }}>
                      {brand}{i < category.brands!.length - 1 ? "," : ""}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Features + Applications */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                {category.features && category.features.length > 0 && (
                  <div>
                    <p
                      className="text-stone-400 mb-4"
                      style={{
                        fontSize: "0.58rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Features
                    </p>
                    <ul className="space-y-3">
                      {category.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <Check
                            size={13}
                            className="text-stone-400 mt-0.5 flex-shrink-0"
                          />
                          <span
                            className="text-stone-500"
                            style={{
                              fontSize: "0.85rem",
                              lineHeight: 1.5,
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 300,
                            }}
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {category.applications && category.applications.length > 0 && (
                  <div>
                    <p
                      className="text-stone-400 mb-4"
                      style={{
                        fontSize: "0.58rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Ideal For
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.applications.map((app) => (
                        <span
                          key={app}
                          className="px-3 py-1.5 bg-[#f0ece6] text-stone-500"
                          style={{
                            fontSize: "0.75rem",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SUB-PRODUCTS */}
      {category.subProducts && category.subProducts.length > 0 && (
        <section className="py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-stone-400 mb-2"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {category.subProducts.length}{" "}
                  {category.subProducts.length === 1
                    ? "Collection"
                    : "Collections"}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-[#111]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    fontWeight: 300,
                    lineHeight: 1.15,
                  }}
                >
                  Choose Your Type
                </motion.h2>
              </div>
            </div>

            {/* Sub-product cards */}
            <div
              className={`grid gap-5 ${
                category.subProducts.length <= 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {category.subProducts.map((sub, i) => {
                const vc = sub.variants?.length || 0;

                return (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                  >
                    <Link
                      to={`/products/${category.slug}/${sub.id}`}
                      className="group block bg-white overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-500"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <ImageWithFallback
                          src={sub.image}
                          alt={sub.name}
                          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                        />

                        {/* Badge */}
                        {vc > 0 && (
                          <div className="absolute top-4 right-4">
                            <span
                              className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[#111]"
                              style={{
                                fontSize: "0.6rem",
                                letterSpacing: "0.06em",
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 500,
                              }}
                            >
                              <Layers size={10} />
                              {vc} Products
                            </span>
                          </div>
                        )}

                        {/* Bottom hover bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-[#111] py-3 px-5 flex items-center justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          <span
                            className="text-white"
                            style={{
                              fontSize: "0.65rem",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            View Collection
                          </span>
                          <ArrowRight size={13} className="text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3
                          className="text-[#111] mb-2"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1.4rem",
                            fontWeight: 400,
                            lineHeight: 1.2,
                          }}
                        >
                          {sub.name}
                        </h3>
                        <p
                          className="text-stone-500 mb-4"
                          style={{
                            fontSize: "0.82rem",
                            lineHeight: 1.7,
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 300,
                          }}
                        >
                          {sub.description.length > 120
                            ? sub.description.slice(0, 120) + "\u2026"
                            : sub.description}
                        </p>

                        {sub.specs && sub.specs.length > 0 && (
                          <div className="pt-4 border-t border-stone-200/50 flex flex-wrap gap-x-4 gap-y-1.5">
                            {sub.specs.map((s) => (
                              <span
                                key={s}
                                className="text-stone-400"
                                style={{
                                  fontSize: "0.7rem",
                                  fontFamily: "'Inter', sans-serif",
                                }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14 md:py-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2
                className="text-white mb-3"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                }}
              >
                Interested in {category.name}?
              </h2>
              <p
                className="text-white/40"
                style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                Request samples, pricing, and technical specifications — our material specialists are here to help.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#111] px-8 py-3.5 hover:bg-stone-100 transition-colors"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Contact Us
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
              {prevCategory ? (
                <Link
                  to={`/products/${prevCategory.slug}`}
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
                      {prevCategory.name}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/products"
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
                      All Products
                    </p>
                  </div>
                </Link>
              )}
            </div>

            <div className="py-8 md:py-10 pl-4 md:pl-10 flex justify-end">
              {nextCategory ? (
                <Link
                  to={`/products/${nextCategory.slug}`}
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
                      {nextCategory.name}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-stone-300 group-hover:text-[#111] transition-colors group-hover:translate-x-1 duration-300"
                  />
                </Link>
              ) : (
                <Link
                  to="/products"
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
                      All Products
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