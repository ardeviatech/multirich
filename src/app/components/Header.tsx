import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, X, MapPin, Phone, User, LogOut, ShoppingBag, LayoutDashboard, LogIn, Calendar } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../store/authSlice";
import { productCategories } from "../data/products";
// import logoImg from "figma:asset/a16171fb97b02acdbc7f0132e079a35530ee5c1e.png";

const logoImg = "";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: any[] = [];

    productCategories.forEach((cat) => {
      if (cat.name.toLowerCase().includes(query)) {
        results.push({
          id: cat.id,
          type: "Category",
          display: cat.name,
          link: `/products/${cat.slug}`,
        });
      }

      cat.subProducts?.forEach((sub) => {
        if (sub.name.toLowerCase().includes(query)) {
          results.push({
            id: sub.id,
            type: "Material",
            display: sub.name,
            link: `/products/${cat.slug}/${sub.id}`,
          });
        }

        sub.variants?.forEach((variant) => {
          if (variant.name.toLowerCase().includes(query)) {
            results.push({
              id: variant.id,
              type: "Variant",
              display: `${sub.name} - ${variant.name}`,
              link: `/products/${cat.slug}/${sub.id}/${variant.id}`,
            });
          }
        });
      });
    });

    setSearchResults(results.slice(0, 6));
  }, [searchQuery]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, [location]);

  const isTransparent = isHome && !scrolled;

  // NavLink active/pending class builder
  const getNavLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) =>
    `relative transition-colors group ${
      isTransparent ? "text-white" : "text-stone-600"
    } ${
      isActive
        ? isTransparent
          ? "text-white"
          : "text-stone-900"
        : ""
    }`;

  const getUnderlineClass = (isActive: boolean) =>
    `absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
      isActive
        ? "w-full bg-current"
        : "w-0 bg-current group-hover:w-full"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isTransparent
            ? "bg-transparent"
            : "bg-[#faf8f6]/95 backdrop-blur-md shadow-[0_1px_0_rgba(100,90,75,0.06)]"
        }`}
      >
        {/* Top utility bar */}
        <div
          className={`hidden lg:flex items-center justify-between px-10 py-1.5 transition-colors duration-400 ${
            isTransparent
              ? "border-b border-white/10"
              : "border-b border-stone-200/60"
          }`}
        >
          <a
            href="#showroom"
            className={`flex items-center gap-1.5 transition-colors ${
              isTransparent
                ? "text-white/70 hover:text-white"
                : "text-stone-400 hover:text-stone-700"
            }`}
            style={{ fontSize: "0.7rem", letterSpacing: "0.06em" }}
          >
            <Calendar size={12} />
            <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </a>
          <div className="flex items-center gap-4">
            {isAuthenticated && user && (
              <span
                className={`transition-colors ${
                  isTransparent ? "text-white/70" : "text-stone-400"
                }`}
                style={{ fontSize: "0.7rem", letterSpacing: "0.06em" }}
              >
                Welcome, {user.firstName || user.email?.split("@")[0] || "there" || user.email?.split("@")[0] || "there"}
              </span>
            )}
            <a
              href="tel:+63288940000"
              className={`flex items-center gap-1.5 transition-colors ${
                isTransparent
                  ? "text-white/70 hover:text-white"
                  : "text-stone-400 hover:text-stone-700"
              }`}
              style={{ fontSize: "0.7rem", letterSpacing: "0.06em" }}
            >
              <Phone size={11} />
              <span>+63 2 8894 0000</span>
            </a>
            <a
              href="#showroom"
              className={`flex items-center gap-1.5 transition-colors ${
                isTransparent
                  ? "text-white/70 hover:text-white"
                  : "text-stone-400 hover:text-stone-700"
              }`}
              style={{ fontSize: "0.7rem", letterSpacing: "0.06em" }}
            >
              <Calendar size={12} />
              <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            </a>
          </div>
        </div>

        {/* Main nav bar */}
        <div className="flex items-center justify-between px-5 md:px-8 lg:px-10 py-3 lg:py-4">
          {/* Left: hamburger + nav links */}
          <div className="flex items-center gap-5 lg:gap-8 flex-1">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden transition-colors ${
                isTransparent ? "text-white" : "text-stone-700"
              }`}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.slice(0, 3).map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className={getNavLinkClass}
                  style={{
                    fontSize: "0.8rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={getUnderlineClass(isActive)} />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Center: Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logoImg}
              alt="Multi-Rich Home Decors"
              className={`h-8 md:h-9 lg:h-10 w-auto transition-all duration-400 ${
                isTransparent ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          {/* Right: more nav + search + user */}
          <div className="flex items-center gap-5 lg:gap-7 flex-1 justify-end">
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.slice(3).map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className={getNavLinkClass}
                  style={{
                    fontSize: "0.8rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={getUnderlineClass(isActive)} />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Search */}
            <div className="hidden lg:block">
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      placeholder="What can we help you find?"
                      className={`w-56 bg-transparent border-b py-1 outline-none transition-colors ${
                        isTransparent
                          ? "border-white/40 text-white placeholder:text-white/50"
                          : "border-stone-300 text-stone-800 placeholder:text-stone-400"
                      }`}
                      style={{ fontSize: "0.78rem" }}
                    />
                    {searchQuery.trim().length >= 2 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl border border-stone-100 py-1 z-[60] min-w-[280px]">
                        {searchResults.length > 0 ? (
                          <div className="flex flex-col">
                            {searchResults.map((result) => (
                              <Link
                                key={`${result.type}-${result.id}`}
                                to={result.link}
                                className="px-4 py-2.5 hover:bg-stone-50 transition-colors border-b last:border-0 border-stone-50"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-stone-800 block" style={{ fontSize: "0.82rem" }}>
                                    {result.display}
                                  </span>
                                  <span className="text-[0.6rem] uppercase tracking-wider text-stone-400 font-medium">
                                    {result.type}
                                  </span>
                                </div>
                              </Link>
                            ))}
                            <Link
                              to="/products"
                              className="px-4 py-2 text-center text-stone-400 hover:text-stone-700 bg-stone-50/50"
                              style={{ fontSize: "0.7rem" }}
                            >
                              View all products
                            </Link>
                          </div>
                        ) : (
                          <div className="px-4 py-6 text-center">
                            <p className="text-stone-500 italic" style={{ fontSize: "0.78rem" }}>
                              No results found for "{searchQuery}"
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <X
                      size={15}
                      className={
                        isTransparent ? "text-white/70" : "text-stone-400"
                      }
                    />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className={`flex items-center gap-2 border-b pb-1 transition-colors ${
                    isTransparent
                      ? "border-white/25 text-white/65 hover:text-white hover:border-white/50"
                      : "border-stone-200 text-stone-400 hover:text-stone-600 hover:border-stone-400"
                  }`}
                  style={{ fontSize: "0.78rem" }}
                >
                  <span className="w-44">Search Here</span>
                  <Search size={14} />
                </button>
              )}
            </div>

            {/* Shopping Cart */}
            <Link
              to="/cart"
              className={`relative transition-colors ${
                isTransparent
                  ? "text-white/70 hover:text-white"
                  : "text-stone-600 hover:text-stone-800"
              }`}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span
                  className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs flex items-center justify-center font-medium ${
                    isTransparent
                      ? "bg-white text-[#111]"
                      : "bg-[#111] text-white"
                  }`}
                >
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User avatar / auth indicator */}
            {isAuthenticated && user ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                    isTransparent
                      ? "border-white/30 text-white/70 hover:text-white hover:border-white/60"
                      : "border-stone-200 text-stone-400 hover:text-stone-700 hover:border-stone-400"
                  }`}
                  aria-label="User menu"
                >
                  <User size={15} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-lg border border-stone-100 py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-stone-100">
                      <p
                        className="text-stone-800"
                        style={{ fontSize: "0.82rem", fontWeight: 500 }}
                      >
                        {user.firstName && user.lastName
                          ? `${user.firstName && user.lastName
                          ? `${user.firstName} $${user.lastName}`
                          : user.email}`
                          : user.email}
                      </p>
                      <p
                        className="text-stone-400 mt-0.5"
                        style={{ fontSize: "0.72rem" }}
                      >
                        {user.email}
                      </p>
                      <p
                        className="text-stone-300 mt-0.5"
                        style={{
                          fontSize: "0.65rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {user.role}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-stone-500 hover:bg-stone-50 transition-colors"
                      style={{ fontSize: "0.78rem" }}
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Link>
                    <div className="border-t border-stone-100 mt-1 pt-1">
                      <button
                        onClick={() => dispatch(logout())}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-stone-500 hover:bg-stone-50 transition-colors"
                        style={{ fontSize: "0.78rem" }}
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`hidden lg:flex items-center gap-1.5 transition-colors ${
                  isTransparent
                    ? "text-white/70 hover:text-white"
                    : "text-stone-500 hover:text-stone-800"
                }`}
                style={{ fontSize: "0.78rem", letterSpacing: "0.04em" }}
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#faf8f6] overflow-y-auto">
          <div className="flex items-center justify-between p-5 border-b border-stone-200/50">
            <img src={logoImg} alt="Multi-Rich" className="h-8" />
            <button onClick={() => setMobileMenuOpen(false)}>
              <X size={24} className="text-stone-700" />
            </button>
          </div>

          {/* User info in mobile */}
          {isAuthenticated && user && (
            <div className="px-6 py-4 border-b border-stone-200/50 bg-[#f5f2ed]">
              <p
                className="text-stone-800"
                style={{ fontSize: "0.85rem", fontWeight: 500 }}
              >
                {user.firstName && user.lastName
                  ? `${user.firstName && user.lastName
                  ? `${user.firstName} $${user.lastName}`
                  : user.email}`
                  : user.email}
              </p>
              <p
                className="text-stone-400 mt-0.5"
                style={{ fontSize: "0.75rem" }}
              >
                {user.email}
              </p>
            </div>
          )}

          <nav className="flex flex-col p-6 gap-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `py-4 border-b border-stone-200/50 transition-colors ${
                    isActive
                      ? "text-stone-900"
                      : "text-stone-500 hover:text-stone-900"
                  }`
                }
                style={{ fontSize: "1rem", letterSpacing: "0.03em" }}
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="#showroom"
              className="flex items-center gap-2 text-stone-400 pt-6"
              style={{ fontSize: "0.85rem" }}
            >
              <MapPin size={15} />
              Find a showroom
            </a>
            <a
              href="tel:+63288940000"
              className="flex items-center gap-2 text-stone-400 pt-3"
              style={{ fontSize: "0.85rem" }}
            >
              <Phone size={15} />
              +63 2 8894 0000
            </a>

            {isAuthenticated ? (
              <div className="mt-4 pt-4 border-t border-stone-200/50 space-y-0">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-stone-500 hover:text-stone-900 py-3"
                  style={{ fontSize: "0.85rem" }}
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-stone-500 hover:text-stone-900 py-3"
                  style={{ fontSize: "0.85rem" }}
                >
                  <ShoppingBag size={15} />
                  Cart {cartItems.length > 0 && `(${cartItems.length})`}
                </Link>
                <button
                  onClick={() => {
                    dispatch(logout());
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-stone-400 pt-4 mt-2 border-t border-stone-200/50"
                  style={{ fontSize: "0.85rem" }}
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-stone-200/50 space-y-0">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-stone-500 hover:text-stone-900 py-3"
                  style={{ fontSize: "0.85rem" }}
                >
                  <LogIn size={15} />
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-stone-500 hover:text-stone-900 py-3"
                  style={{ fontSize: "0.85rem" }}
                >
                  <User size={15} />
                  Create Account
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
}