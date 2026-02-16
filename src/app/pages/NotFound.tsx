import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f6] px-6">
      <div className="text-center">
        <p
          className="text-stone-200 mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "6rem",
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          404
        </p>
        <h1
          className="text-[#111] mb-3"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.8rem",
            fontWeight: 400,
          }}
        >
          Page not found
        </h1>
        <p
          className="text-stone-500 mb-8"
          style={{ fontSize: "0.88rem" }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 border border-[#111] text-[#111] px-8 py-3 hover:bg-[#111] hover:text-white transition-all duration-300"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Return home
          <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  );
}