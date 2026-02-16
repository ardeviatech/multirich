import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Play, Volume2 } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { productCategories } from "../data/products";

/* ═══════════════════════════════════════════════════
   Elegant 3D Product Card
   — Refined perspective tilt, dynamic shadow, light sweep
   ═══════════════════════════════════════════════════ */
function ProductCard({
  category,
  index,
  variant = "default",
  onViewportEnter,
}: {
  category: (typeof productCategories)[number];
  index: number;
  variant?: "hero" | "default";
  onViewportEnter: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const variantTotal =
    category.subProducts?.reduce(
      (a, sp) => a + (sp.variants?.length || 0),
      0
    ) || 0;
  const subCount = category.subProducts?.length || 0;

  /* Mouse-tracking spring values */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 200,
    damping: 25,
  });
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 25,
  });
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 16]), {
    stiffness: 200,
    damping: 25,
  });
  const lightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), {
    stiffness: 150,
    damping: 30,
  });
  const lightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), {
    stiffness: 150,
    damping: 30,
  });

  const lightGradient = useTransform(
    [lightX, lightY],
    ([lx, ly]: number[]) =>
      `radial-gradient(ellipse at ${lx}% ${ly}%, rgba(255,255,255,0.22) 0%, transparent 55%)`
  );

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const isHero = variant === "hero";
  const aspect = isHero ? "aspect-[4/3]" : "aspect-[5/4]";

  return (
    <motion.div
      id={`cat-${category.slug}`}
      className="scroll-mt-32"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      onViewportEnter={onViewportEnter}
    >
      <Link
        to={`/products/${category.slug}`}
        className="group block"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cardRef}
          className="relative"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            className={`relative ${aspect} overflow-hidden bg-[#f0ece7]`}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <ImageWithFallback
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.04]"
            />
            <motion.div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                opacity: isHovered ? 0.7 : 0,
                background: lightGradient,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.08) 35%, transparent 55%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end">
              <motion.div
                initial={false}
                animate={
                  isHovered ? { y: 0, opacity: 1 } : { y: 6, opacity: 0 }
                }
                transition={{
                  duration: 0.35,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <p
                  className="text-white/50"
                  style={{
                    fontSize: "0.52rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {category.subtitle}
                </p>
              </motion.div>
              <h3
                className="text-white mt-1"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isHero
                    ? "clamp(1.6rem, 2.5vw, 2.2rem)"
                    : "clamp(1.3rem, 2vw, 1.7rem)",
                  fontWeight: 300,
                  lineHeight: 1.1,
                }}
              >
                {category.name}
              </h3>
              <motion.div
                className="flex items-center gap-3 mt-3"
                initial={false}
                animate={
                  isHovered ? { y: 0, opacity: 1 } : { y: 8, opacity: 0 }
                }
                transition={{
                  duration: 0.35,
                  delay: 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="h-px flex-1 bg-white/15 max-w-[80px]" />
                <span
                  className="inline-flex items-center gap-1.5 text-white/80"
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Explore collection
                  <ArrowRight
                    size={11}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </span>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="absolute -bottom-3 left-[8%] right-[8%] h-6 -z-10"
            style={{
              x: shadowX,
              y: shadowY,
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, transparent 70%)",
              filter: "blur(8px)",
              opacity: isHovered ? 0.85 : 0.4,
              transition: "opacity 0.5s ease",
            }}
          />
        </div>
        <div className="mt-4 px-0.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4
                className="text-[#111]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isHero ? "1.3rem" : "1.15rem",
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                {category.name}
              </h4>
              <div className="flex items-center gap-2.5 mt-1">
                {subCount > 0 && (
                  <span
                    className="text-stone-400"
                    style={{
                      fontSize: "0.6rem",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {subCount} {subCount === 1 ? "type" : "types"}
                  </span>
                )}
                {variantTotal > 0 && (
                  <>
                    <span className="w-[3px] h-[3px] rounded-full bg-stone-300" />
                    <span
                      className="text-stone-400"
                      style={{
                        fontSize: "0.6rem",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {variantTotal} products
                    </span>
                  </>
                )}
              </div>
            </div>
            <span className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight size={14} className="text-stone-400" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   Video Promotion Placeholder
   ═══════════════════════════════════════════════════ */
function VideoPromo({
  title,
  subtitle,
  description,
  bgImage,
  aspectClass = "aspect-[21/9]",
}: {
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
  aspectClass?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="group cursor-pointer"
      onClick={() => setPlaying(!playing)}
    >
      <div className={`relative ${aspectClass} overflow-hidden bg-[#0c0c0c]`}>
        <ImageWithFallback
          src={bgImage}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ${
            playing
              ? "scale-110 opacity-30"
              : "scale-100 opacity-40 group-hover:opacity-50 group-hover:scale-[1.02]"
          }`}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p
            className="text-white/30 mb-3"
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {subtitle}
          </p>
          <h3
            className="text-white mb-6 max-w-xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h3>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border transition-all duration-500 ${
                playing
                  ? "bg-white/20 border-white/30"
                  : "bg-white/[0.07] border-white/15 group-hover:bg-white/[0.12] group-hover:border-white/25"
              }`}
              style={{ backdropFilter: "blur(12px)" }}
            >
              {playing ? (
                <Volume2 size={20} className="text-white/80" />
              ) : (
                <Play
                  size={20}
                  className="text-white/80 ml-1"
                  fill="currentColor"
                />
              )}
            </div>
            {!playing && (
              <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-30" />
            )}
          </motion.div>
          <p
            className="text-white/25 mt-5 max-w-sm"
            style={{
              fontSize: "0.76rem",
              lineHeight: 1.65,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
            }}
          >
            {description}
          </p>
          {playing && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-white/50"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 30, ease: "linear" }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   Parallax Marble Section — Dramatic stone divider
   ═══════════════════════════════════════════════════ */
function ParallaxMarble({
  image,
  title,
  subtitle,
  height = "h-[45vh] md:h-[55vh]",
  overlay = "bg-black/50",
  children,
}: {
  image: string;
  title?: string;
  subtitle?: string;
  height?: string;
  overlay?: string;
  children?: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={sectionRef} className={`relative ${height} overflow-hidden`}>
      <motion.div
        className="absolute inset-x-0 -top-[15%] -bottom-[15%]"
        style={{ y: imgY }}
      >
        <ImageWithFallback
          src={image}
          alt={title || "Marble texture"}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className={`absolute inset-0 ${overlay}`} />
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-white/35 mb-3"
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {subtitle}
          </motion.p>
        )}
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white max-w-2xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </motion.h2>
        )}
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Products Page
   ══════════════════════════════════════════════════ */
export default function Products() {
  const [loaded, setLoaded] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* Parallax for hero */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollToCategory = (slug: string) => {
    const el = document.getElementById(`cat-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveNav(slug);
    }
  };

  /* Split categories into visual groups */
  const heroCards = productCategories.slice(0, 2);
  const midCards = productCategories.slice(2, 5);
  const remainingCards = productCategories.slice(5);

  return (
    <div className="relative bg-[#f8f6f3] min-h-screen">
      {/* ═══ FULL-SCREEN MARBLE HERO — Parallax ═══ */}
      <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Parallax marble background */}
        <motion.div
          className="absolute inset-x-0 -top-[10%] -bottom-0"
          style={{ y: heroImgY }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1630756377422-7cfae60dd550?w=1920&q=80&fit=crop"
            alt="Marble texture"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient overlay — dramatic dark-to-clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Hero content with parallax */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-12 pb-14 md:pb-18"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-3 flex items-center gap-4"
          >
            <div className="w-10 h-px bg-white/30" />
            <p
              className="text-white/40"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Multi-Rich Home Decors &middot; Est. 1980
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.25 }}
            className="text-white max-w-3xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Premium
            <br />
            Surfaces
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-white/35 max-w-lg mt-4"
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.7,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
            }}
          >
            The Philippines' finest collection of natural & engineered
            materials for extraordinary spaces.
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
            onClick={() => scrollToCategory(productCategories[0].slug)}
            className="mt-7 inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors self-start group"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span className="border-b border-white/20 pb-0.5 group-hover:border-white/50 transition-colors">
              Browse Collections
            </span>
            <ChevronDown
              size={14}
              className="animate-bounce"
            />
          </motion.button>
        </motion.div>

        {/* Bottom fade into content */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f8f6f3] to-transparent z-20" />
      </section>

      {/* ═══ CATEGORY QUICK-NAV BAR ═══ */}
      <div className="sticky top-[60px] md:top-[72px] z-30 bg-[#faf8f6]/95 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-0 -mx-1">
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.slug)}
                className={`flex-shrink-0 px-4 py-3.5 transition-all duration-200 border-b-2 ${
                  activeNav === cat.slug
                    ? "border-[#111] text-[#111]"
                    : "border-transparent text-stone-400 hover:text-stone-600"
                }`}
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.04em",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: activeNav === cat.slug ? 500 : 400,
                  whiteSpace: "nowrap",
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ PRODUCT GRID ═══ */}
      <div
        ref={gridRef}
        className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-0"
      >
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-stone-400 mb-1.5"
                style={{
                  fontSize: "0.56rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Collections
              </p>
              <h2
                className="text-[#111]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Our Materials
              </h2>
            </div>
            <p
              className="text-stone-400 hidden sm:block"
              style={{
                fontSize: "0.72rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
              }}
            >
              {productCategories.length} collections
            </p>
          </div>
          <div className="mt-4 h-px bg-stone-200/60" />
        </div>

        {/* HERO PAIR — 2 large featured cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-0">
          {heroCards.map((category, i) => (
            <ProductCard
              key={category.id}
              category={category}
              index={i}
              variant="hero"
              onViewportEnter={() => setActiveNav(category.slug)}
            />
          ))}
        </div>
      </div>

      {/* ═══ PARALLAX MARBLE DIVIDER 1 — Natural Stone ═══ */}
      <div className="mt-16 md:mt-24">
        <ParallaxMarble
          image="https://images.unsplash.com/photo-1674831307533-96f363902316?w=1920&q=80&fit=crop"
          title="The Art of Natural Stone"
          subtitle="Sourced from the World's Finest Quarries"
          height="h-[50vh] md:h-[60vh]"
          overlay="bg-black/55"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/30 max-w-md mt-6"
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.7,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
            }}
          >
            Marble, granite, and onyx — each slab tells a story millions of
            years in the making.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <Link
              to={`/products/${productCategories[0].slug}`}
              className="inline-flex items-center gap-3 border border-white/20 text-white/60 hover:bg-white hover:text-[#111] hover:border-white px-7 py-3 transition-all duration-300"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Explore Natural Stones
              <ArrowRight size={12} />
            </Link>
          </motion.div>
        </ParallaxMarble>
      </div>

      {/* MID-TIER — 3-column grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {midCards.map((category, i) => (
            <ProductCard
              key={category.id}
              category={category}
              index={i}
              variant="default"
              onViewportEnter={() => setActiveNav(category.slug)}
            />
          ))}
        </div>
      </div>

      {/* ═══ VIDEO PROMO — Cinematic showcase ═══ */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-0">
        <VideoPromo
          title="Surfaces That Define Spaces"
          subtitle="Interior Inspiration"
          description="See how architects and designers transform interiors with our premium engineered surfaces."
          bgImage="https://images.unsplash.com/photo-1759238136854-913e5e383308?w=1600&q=80&fit=crop"
          aspectClass="aspect-[2/1] md:aspect-[21/8] min-h-[320px]"
        />
      </div>

      {/* ═══ PARALLAX MARBLE DIVIDER 2 — Engineered Surfaces ═══ */}
      <div className="mt-16 md:mt-24">
        <ParallaxMarble
          image="https://images.unsplash.com/photo-1746651918582-04749d425350?w=1920&q=80&fit=crop"
          title="Engineered for Excellence"
          subtitle="Modern Surface Solutions"
          height="h-[40vh] md:h-[50vh]"
          overlay="bg-black/60"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/30 max-w-md mt-6"
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.7,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
            }}
          >
            High-pressure laminates, compact boards, and WPC — engineered for
            durability and beauty.
          </motion.p>
        </ParallaxMarble>
      </div>

      {/* REMAINING CATEGORIES */}
      {remainingCards.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {remainingCards.map((category, i) => (
              <ProductCard
                key={category.id}
                category={category}
                index={i}
                variant="default"
                onViewportEnter={() => setActiveNav(category.slug)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ═══ CLOSING — All Categories Strip ═══ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white border-t border-stone-200/50"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p
                className="text-stone-400 mb-2"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                At a Glance
              </p>
              <h2
                className="text-[#111]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                }}
              >
                All Categories
              </h2>
            </div>
            <p
              className="text-stone-400"
              style={{
                fontSize: "0.78rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
              }}
            >
              {productCategories.length} collections to explore
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
            {productCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
              >
                <Link to={`/products/${cat.slug}`} className="group block">
                  <div className="aspect-square overflow-hidden mb-2 bg-stone-100">
                    <ImageWithFallback
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  <p
                    className="text-stone-500 group-hover:text-[#111] transition-colors text-center"
                    style={{
                      fontSize: "0.62rem",
                      letterSpacing: "0.03em",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      lineHeight: 1.3,
                    }}
                  >
                    {cat.name}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══ CTA — Marble Background ═══ */}
      <ParallaxMarble
        image="https://images.unsplash.com/photo-1681152968214-9dad026ad188?w=1920&q=80&fit=crop"
        height="h-auto"
        overlay="bg-black/65"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-left"
            >
              <p
                className="text-white/30 mb-3"
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Need Assistance?
              </p>
              <h2
                className="text-white mb-5"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                }}
              >
                Let our specialists help you{" "}
                <br className="hidden md:block" />
                choose the{" "}
                <em style={{ fontStyle: "italic" }}>right material</em>
              </h2>
              <p
                className="text-white/35 max-w-md mb-8"
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                With over 45 years of expertise, our team provides personalized
                guidance — from material selection to technical specifications —
                for projects of any scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#111] px-8 py-3.5 hover:bg-white/90 transition-colors"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Request a Quote
                  <ArrowRight size={13} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 text-white/60 px-8 py-3.5 hover:border-white/60 hover:text-white transition-all"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Visit Showroom
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1630756377422-7cfae60dd550?w=500&q=80&fit=crop"
                      alt="Marble detail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-6">
                    <p
                      className="text-white/40"
                      style={{
                        fontSize: "0.58rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Established
                    </p>
                    <p
                      className="text-white mt-1"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "2rem",
                        fontWeight: 300,
                      }}
                    >
                      1980
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-6">
                    <p
                      className="text-white/40"
                      style={{
                        fontSize: "0.58rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Products
                    </p>
                    <p
                      className="text-white mt-1"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "2rem",
                        fontWeight: 300,
                      }}
                    >
                      200+
                    </p>
                  </div>
                  <div className="aspect-[3/4] overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1551458601-14e8150ece4b?w=500&q=80&fit=crop"
                      alt="Marble quarry"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxMarble>
    </div>
  );
}