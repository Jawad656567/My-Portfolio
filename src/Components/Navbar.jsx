import React, { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Image from "../images/logooo.png";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar({ isDark, setIsDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleTheme = () => setIsDark((d) => !d);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") setIsDark(true);
      else if (saved === "light") setIsDark(false);
      else {
        const prefers = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(prefers);
      }
    } catch {
      const prefers = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist theme + update <html> for better native theming
  useEffect(() => {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const linkBase = "relative px-4 py-2 transition-all duration-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 rounded-lg group overflow-hidden";
  const linkLight = "text-gray-700 hover:text-yellow-600";
  const linkDark = "text-gray-200 hover:text-yellow-400";

  const desktopMenu = (
    <ul className="hidden lg:flex items-center gap-2">
      {NAV_ITEMS.map((item) => (
        <li key={item.name}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `${linkBase} ${isDark ? linkDark : linkLight} ${
                isActive 
                  ? (isDark 
                      ? "text-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20" 
                      : "text-yellow-700 bg-yellow-100 shadow-lg shadow-yellow-200/50") 
                  : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              }`
            }
          >
            <span className="relative z-10">{item.name}</span>
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg ${
              isDark 
                ? "bg-gradient-to-r from-yellow-400/5 to-yellow-600/5" 
                : "bg-gradient-to-r from-yellow-200/30 to-yellow-300/30"
            }`} />
          </NavLink>
        </li>
      ))}

      <li className="ml-2">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
          className={`relative p-3 rounded-full transition-all duration-500 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 overflow-hidden group ${
            isDark
              ? "bg-gradient-to-br from-gray-700 to-gray-800 text-yellow-400 hover:from-gray-600 hover:to-gray-700 shadow-lg shadow-gray-900/20"
              : "bg-gradient-to-br from-gray-100 to-gray-200 text-yellow-600 hover:from-gray-200 hover:to-gray-300 shadow-lg shadow-gray-200/50"
          }`}
        >
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isDark 
              ? "bg-gradient-to-br from-yellow-400/10 to-yellow-600/10" 
              : "bg-gradient-to-br from-yellow-200/20 to-yellow-300/20"
          }`} />
          <div className="relative z-10 transition-transform duration-500 group-hover:rotate-180">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </div>
        </button>
      </li>
    </ul>
  );

  const mobileMenu = (
    <>
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-16 left-0 right-0 transition-all duration-500 ease-out z-50 ${
          isOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-full pointer-events-none"
        } ${
          isDark 
            ? "bg-gray-900/95 border-gray-800" 
            : "bg-white/95 border-gray-200"
        } backdrop-blur-xl border-b shadow-2xl`}
        role="dialog"
        aria-modal="true"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <ul className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item, index) => (
              <li 
                key={item.name}
                className={`transform transition-all duration-500 ${
                  isOpen 
                    ? "translate-x-0 opacity-100" 
                    : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block py-4 px-4 rounded-xl transition-all duration-300 font-medium ${
                      isDark ? linkDark : linkLight
                    } ${
                      isActive 
                        ? (isDark 
                            ? "text-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20 border border-yellow-400/20" 
                            : "text-yellow-700 bg-yellow-100 shadow-lg shadow-yellow-200/50 border border-yellow-200") 
                        : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:translate-x-1"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? (isDark 
                ? "bg-gray-900/90 shadow-2xl shadow-gray-900/20" 
                : "bg-white/90 shadow-2xl shadow-gray-200/20") 
            : (isDark 
                ? "bg-gray-900/70" 
                : "bg-white/70")
        } backdrop-blur-xl supports-[backdrop-filter]:backdrop-blur-xl border-b ${
          isDark ? "border-gray-800/50" : "border-gray-200/50"
        }`}
        role="navigation"
        aria-label="Primary"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18 lg:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 rounded-lg px-2 py-1"
            >
              <div className="relative">
                <img 
                  src={Image} 
                  alt="TechNest logo" 
                  className="w-16 h-12 md:w-20 md:h-14 object-contain transition-transform duration-300 group-hover:scale-110" 
                />
                <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDark 
                    ? "bg-gradient-to-br from-yellow-400/10 to-yellow-600/10" 
                    : "bg-gradient-to-br from-yellow-200/20 to-yellow-300/20"
                }`} />
              </div>
              <span
                className={`text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 ${
                  isDark ? "text-yellow-400" : "text-yellow-600"
                } group-hover:scale-105`}
              >
                TechNest
              </span>
            </Link>

            {/* Desktop Menu */}
            {desktopMenu}

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title="Toggle theme"
                className={`relative p-2.5 rounded-full transition-all duration-500 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 overflow-hidden group ${
                  isDark
                    ? "bg-gradient-to-br from-gray-700 to-gray-800 text-yellow-400 hover:from-gray-600 hover:to-gray-700 shadow-lg shadow-gray-900/20"
                    : "bg-gradient-to-br from-gray-100 to-gray-200 text-yellow-600 hover:from-gray-200 hover:to-gray-300 shadow-lg shadow-gray-200/50"
                }`}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDark 
                    ? "bg-gradient-to-br from-yellow-400/10 to-yellow-600/10" 
                    : "bg-gradient-to-br from-yellow-200/20 to-yellow-300/20"
                }`} />
                <div className="relative z-10 transition-transform duration-500 group-hover:rotate-180">
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </div>
              </button>

              <button
                onClick={() => setIsOpen((o) => !o)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className={`relative p-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 overflow-hidden group ${
                  isDark 
                    ? "text-gray-200 hover:bg-gray-800/80" 
                    : "text-gray-800 hover:bg-gray-100/80"
                } ${isOpen ? "scale-110" : "hover:scale-105"}`}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDark 
                    ? "bg-gradient-to-br from-gray-800/50 to-gray-700/50" 
                    : "bg-gradient-to-br from-gray-100/50 to-gray-200/50"
                }`} />
                <div className="relative z-10 transition-transform duration-300">
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu}
    </>
  );
}