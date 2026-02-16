import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { productCategories } from "../data/products";

export function ProductCategories() {
  const featured = productCategories.slice(0, 6);

  return (
    <section className="bg-[#f5f2ed]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-14 md:mb-18">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-stone-400 mb-2"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Our Collections
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#111]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              Premium Materials
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[#111] border-b border-[#111] pb-0.5 hover:gap-3 transition-all duration-300"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              View All
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {featured.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Link
                to={`/products/${cat.slug}`}
                className="group block"
              >
                <div className="aspect-square overflow-hidden mb-3.5 bg-stone-100">
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-[1.08]"
                  />
                </div>
                <p
                  className="text-[#111] group-hover:text-stone-500 transition-colors"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.05rem",
                    fontWeight: 400,
                    lineHeight: 1.3,
                  }}
                >
                  {cat.name}
                </p>
                <p
                  className="text-stone-400 mt-0.5"
                  style={{
                    fontSize: "0.62rem",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {cat.subtitle}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}