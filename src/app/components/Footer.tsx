import { Link, NavLink } from "react-router-dom";
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";
// import logoImg from "figma:asset/a16171fb97b02acdbc7f0132e079a35530ee5c1e.png";
const logoImg = "";

const productLinks = [
  { label: "Marble Slabs", to: "/products" },
  { label: "Granite", to: "/products" },
  { label: "Laminates", to: "/products" },
  { label: "Tiles & Porcelain", to: "/products" },
  { label: "WPC Products", to: "/products" },
  { label: "Other Products", to: "/products" },
];

const infoLinks = [
  { label: "About Us", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Careers", to: "/contact" },
  { label: "Privacy Policy", to: "#" },
  { label: "Terms & Conditions", to: "#" },
];

const serviceLinks = [
  { label: "Contact Us", to: "/contact" },
  { label: "Find a Showroom", to: "#" },
  { label: "Technical Support", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#0e0e0d] text-white">
      {/* CTA Section */}
      <div className="border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Talk to us, we want to hear from you
          </h2>
          <p
            className="text-white/60 max-w-lg mx-auto mb-8"
            style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
          >
            Send us a message if you have any questions about our products,
            need a quote, or require technical assistance.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-white/25 text-white px-8 py-3 hover:bg-white hover:text-[#0e0e0d] transition-all duration-300"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={logoImg}
              alt="Multi-Rich Home Decors"
              className="h-8 w-auto brightness-0 invert mb-6"
            />
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-start gap-2.5 text-white/40 hover:text-white/70 transition-colors"
                style={{ fontSize: "0.78rem", lineHeight: 1.6 }}
              >
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  488 Boni Avenue cor. San Joaquin Street, Mandaluyong,
                  Philippines
                </span>
              </a>
              <a
                href="mailto:multirich_inc@yahoo.com"
                className="flex items-center gap-2.5 text-white/40 hover:text-white/70 transition-colors"
                style={{ fontSize: "0.78rem" }}
              >
                <Mail size={13} />
                <span>multirich_inc@yahoo.com</span>
              </a>
              <a
                href="tel:+63288940000"
                className="flex items-center gap-2.5 text-white/40 hover:text-white/70 transition-colors"
                style={{ fontSize: "0.78rem" }}
              >
                <Phone size={13} />
                <span>+63 2 8894 0000</span>
              </a>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4
              className="text-white mb-5"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Products
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `transition-colors ${
                        isActive
                          ? "text-white/70"
                          : "text-white/35 hover:text-white/70"
                      }`
                    }
                    style={{ fontSize: "0.8rem" }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4
              className="text-white mb-5"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Information
            </h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `transition-colors ${
                        isActive
                          ? "text-white/70"
                          : "text-white/35 hover:text-white/70"
                      }`
                    }
                    style={{ fontSize: "0.8rem" }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4
              className="text-white mb-5"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Customer Service
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `transition-colors ${
                        isActive
                          ? "text-white/70"
                          : "text-white/35 hover:text-white/70"
                      }`
                    }
                    style={{ fontSize: "0.8rem" }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6 py-5">
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <p className="text-white/25" style={{ fontSize: "0.7rem", letterSpacing: "0.04em" }}>
            Copyright &copy; Multi-Rich Home Decors Incorporated. All Rights
            Reserved. 2025
          </p>
        </div>
      </div>
    </footer>
  );
}