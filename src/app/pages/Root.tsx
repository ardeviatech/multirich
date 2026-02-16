import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Chatbot } from "../components/Chatbot";

export default function Root() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header />
      <main className="relative flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}