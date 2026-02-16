import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    type: "image" as const,
    src: "https://firebasestorage.googleapis.com/v0/b/eap-environmental.firebasestorage.app/o/MultiRich%2FHero%2Fhero-banner-1.png?alt=media&token=9665b5aa-546f-4b86-b9e4-a42237ef3a0b",
    preHeadline: "Elegantly designed for comfort and calm",
    headline: "Premium Marble Slabs",
    cta: { label: "Explore products", to: "/products" },
  },
  {
    type: "image" as const,
    src: "https://firebasestorage.googleapis.com/v0/b/eap-environmental.firebasestorage.app/o/MultiRich%2FHero%2Fhero-banner-2.png?alt=media&token=53fa9237-c401-4053-a058-deccc65f7cae",
    preHeadline: "Where style meets sophistication",
    headline: "Modern Kitchen Design",
    cta: { label: "View collection", to: "/products" },
  },
  {
    type: "image" as const,
    src: "https://firebasestorage.googleapis.com/v0/b/eap-environmental.firebasestorage.app/o/MultiRich%2FHero%2Fhero-banner-3.png?alt=media&token=423bfd3e-42e2-4f9b-bf23-5bd976a58eaf",
    preHeadline: "Curated for exceptional spaces",
    headline: "Luxury Interiors",
    cta: { label: "Discover more", to: "/about" },
  },
  {
    type: "image" as const,
    src: "https://firebasestorage.googleapis.com/v0/b/eap-environmental.firebasestorage.app/o/MultiRich%2FHero%2Fhero-banner-4.png?alt=media&token=2041c4dd-7dd9-4360-b16e-b688086b43e6",
    preHeadline: "Transform your living spaces",
    headline: "Elegant Surfaces",
    cta: { label: "Get inspired", to: "/gallery" },
  },
  {
    type: "video" as const,
    src: "https://firebasestorage.googleapis.com/v0/b/eap-environmental.firebasestorage.app/o/MultiRich%2FHero%2FMultiRich%20Hero%20Vid.mp4?alt=media&token=29a3157a-e2ab-4670-a7dd-0ef461a58643",
    preHeadline: "Multi-Rich",
    headline: "We Bring Your Dreams to Life",
    cta: { label: "Get inspired", to: "/gallery" },
  },
];

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isPaused, ] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentX = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  // Cinematic overlay intensity increases as user scrolls
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0.6]);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  // Handle slide transitions with video duration awareness
  useEffect(() => {
    if (isPaused) return;
    
    // If current slide is video and we have duration, use video duration
    // Otherwise use default 6000ms for images
    const duration = slides[current].type === "video" && videoDuration 
      ? videoDuration * 1000 // Convert to milliseconds
      : 6000;
    
    const interval = setInterval(nextSlide, duration);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, current, videoDuration]);

  // Play video when video slide is active and get its duration
  useEffect(() => {
    if (videoRef.current && slides[current].type === "video") {
      const video = videoRef.current;
      
      // Get video duration when metadata is loaded
      const handleLoadedMetadata = () => {
        setVideoDuration(video.duration);
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // If metadata is already loaded
      if (video.duration) {
        setVideoDuration(video.duration);
      }
      
      video.play().catch(() => {
        // Autoplay might be blocked, but we'll handle it gracefully
      });
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    } else {
      setVideoDuration(null);
    }
  }, [current]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-stone-900">
      {/* Background images and videos */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          {slides[current].type === "video" ? (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={slides[current].src}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slides[current].src})`,
              }}
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{
                duration: 6,
                ease: "linear",
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Scroll-responsive cinematic overlay with warm vignette gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          opacity: overlayOpacity,
          background: `
            radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(17, 17, 17, 0.4) 70%, rgba(17, 17, 17, 0.75) 100%),
            radial-gradient(ellipse 120% 100% at 50% 40%, transparent 0%, rgba(92, 64, 51, 0.15) 100%)
          `,
        }}
      />

      {/* Content overlay - bottom right like BoConcept */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
        <div className="max-w-3xl ml-auto mr-0 md:mr-8 text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ x: contentX }}
            >
              <p
                className="text-white/75 mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)",
                  fontStyle: "italic",
                  letterSpacing: "0.02em",
                }}
              >
                {slides[current].preHeadline}
              </p>
              <h1
                className="text-white mb-7"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  fontWeight: 400,
                  lineHeight: 1.08,
                  letterSpacing: "-0.01em",
                }}
              >
                {slides[current].headline}
              </h1>
              <Link
                to={slides[current].cta.to}
                className="inline-flex items-center gap-3 text-white border border-white/35 hover:bg-white hover:text-[#111] hover:border-white transition-all duration-350 px-6 py-2.5 group"
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.08em",
                }}
              >
                <span>{slides[current].cta.label}</span>
                <span className="w-6 h-6 rounded-full border border-current/30 flex items-center justify-center group-hover:border-current/50 transition-all">
                  <ChevronRight size={12} />
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-6 md:bottom-8 right-6 md:right-10 lg:right-16 flex items-center gap-4">
          {/* Progress indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => {
              // Calculate duration for this slide
              const slideDuration = slides[i].type === "video" && i === current && videoDuration
                ? videoDuration * 1000
                : 6000;
              
              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="relative w-8 h-0.5 bg-white/25 overflow-hidden"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span
                    className="absolute inset-y-0 left-0 bg-white transition-all"
                    style={{
                      width: i === current ? "100%" : "0%",
                      transitionDuration:
                        i === current && !isPaused ? `${slideDuration}ms` : "300ms",
                      transitionTimingFunction: "linear",
                    }}
                  />
                </button>
              );
            })}
          </div>
          {/* Pause / Play */}
          
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <div className="w-px h-8 bg-white/20" />
      </motion.div>
    </section>
  );
}