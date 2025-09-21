import React, { useEffect, useState } from "react";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleTheme = () => setIsDark((d) => !d);

  // Enhanced scroll effect with navbar hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 20);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  const linkBase = "relative px-5 py-2.5 transition-all duration-300 font-medium text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-xl group overflow-hidden";
  const linkLight = "text-gray-700 hover:text-blue-600";
  const linkDark = "text-gray-200 hover:text-blue-400";

  const desktopMenu = (
    <ul className="hidden lg:flex items-center gap-1">
      {NAV_ITEMS.map((item) => (
        <li key={item.name}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `${linkBase} ${isDark ? linkDark : linkLight} ${
                isActive 
                  ? (isDark 
                      ? "text-blue-400 bg-blue-500/10 shadow-lg shadow-blue-500/20 border border-blue-500/20" 
                      : "text-blue-700 bg-blue-50 shadow-lg shadow-blue-200/30 border border-blue-200/50") 
                  : "hover:bg-gray-50/80 dark:hover:bg-gray-800/60 hover:shadow-lg hover:shadow-gray-200/20 dark:hover:shadow-gray-900/20"
              }`
            }
          >
            <span className="relative z-10 uppercase tracking-wider text-xs font-semibold">{item.name}</span>
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl scale-95 group-hover:scale-100 ${
              isDark 
                ? "bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-600/5" 
                : "bg-gradient-to-r from-blue-100/50 via-indigo-100/30 to-blue-200/40"
            }`} />
          </NavLink>
        </li>
      ))}

      <li className="ml-4">
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
      </li>

      <li>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
          className={`relative p-3 rounded-xl transition-all duration-500 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 overflow-hidden group ${
            isDark
              ? "bg-gradient-to-br from-gray-800 to-gray-900 text-amber-400 hover:from-gray-700 hover:to-gray-800 shadow-lg shadow-gray-900/30 border border-gray-700/50"
              : "bg-gradient-to-br from-white to-gray-50 text-amber-600 hover:from-gray-50 hover:to-gray-100 shadow-lg shadow-gray-200/40 border border-gray-200/80"
          }`}
        >
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl ${
            isDark 
              ? "bg-gradient-to-br from-amber-400/10 to-orange-500/10" 
              : "bg-gradient-to-br from-amber-200/20 to-orange-300/15"
          }`} />
          <div className="relative z-10 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </div>
        </button>
      </li>
    </ul>
  );

  const mobileMenu = (
    <>
      {/* Enhanced Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/30 backdrop-blur-md transition-all duration-500 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Enhanced Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-0 left-0 right-0 transition-all duration-700 ease-out z-50 ${
          isOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-full pointer-events-none"
        } ${
          isDark 
            ? "bg-gray-900/98 border-gray-700/50" 
            : "bg-white/98 border-gray-200/80"
        } backdrop-blur-2xl border-b shadow-2xl`}
        style={{ 
          paddingTop: '4rem',
          background: isDark 
            ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.95) 100%)'
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Menu Header with Close Button */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center h-16 px-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <span className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              isDark 
                ? "text-gray-200 hover:bg-gray-800/80 hover:text-white" 
                : "text-gray-800 hover:bg-gray-100/80 hover:text-gray-900"
            }`}
          >
            <X size={22} />
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <ul className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item, index) => (
              <li 
                key={item.name}
                className={`transform transition-all duration-700 ease-out ${
                  isOpen 
                    ? "translate-x-0 opacity-100" 
                    : "translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300 font-medium text-base group ${
                      isDark ? linkDark : linkLight
                    } ${
                      isActive 
                        ? (isDark 
                            ? "text-blue-400 bg-blue-500/10 shadow-lg shadow-blue-500/20 border border-blue-500/30" 
                            : "text-blue-700 bg-blue-50 shadow-lg shadow-blue-200/40 border border-blue-200/60") 
                        : "hover:bg-gray-100/60 dark:hover:bg-gray-800/60 hover:translate-x-2 hover:shadow-lg"
                    }`
                  }
                >
                  <span className="tracking-wide">{item.name}</span>
                  <ChevronDown 
                    size={14} 
                    className="transform -rotate-90 transition-transform duration-300 group-hover:translate-x-1 opacity-60" 
                  />
                </NavLink>
              </li>
            ))}
          </ul>
          
          {/* Mobile Theme Toggle */}
          <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300 font-medium text-base ${
                isDark
                  ? "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
                  : "text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200/60"
              }`}
            >
              <span className="tracking-wide">
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </span>
              <div className="transition-transform duration-300 hover:rotate-180">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          !isVisible ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled 
            ? (isDark 
                ? "bg-gray-900/95 shadow-2xl shadow-gray-900/40 border-gray-800/60" 
                : "bg-white/95 shadow-2xl shadow-gray-200/30 border-gray-200/70") 
            : (isDark 
                ? "bg-gray-900/80 border-gray-800/40" 
                : "bg-white/80 border-gray-200/50")
        } backdrop-blur-2xl supports-[backdrop-filter]:backdrop-blur-2xl border-b`}
        style={{
          background: scrolled 
            ? (isDark 
                ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.9) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.9) 100%)')
            : (isDark 
                ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.75) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.75) 100%)')
        }}
        role="navigation"
        aria-label="Primary"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18 lg:h-20">
            {/* Enhanced Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-xl px-3 py-2"
            >
              <div className="relative">
                <img 
                  src={Image} 
                  alt="TechNest logo" 
                  className="w-16 h-14 md:w-20 md:h-16 object-contain transition-all duration-300 group-hover:scale-110 filter drop-shadow-lg" 
                />
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDark 
                    ? "bg-gradient-to-br from-yellow-500/10 to-amber-600/10" 
                    : "bg-gradient-to-br from-yellow-200/20 to-amber-300/20"
                }`} />
              </div>
              <span
                className={`text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 ${
                  isDark ? "text-yellow-500" : "text-yellow-600"
                } group-hover:scale-105`}
              >
                TechNest
              </span>
            </Link>

            {/* Desktop Menu */}
            {desktopMenu}

            {/* Enhanced Mobile Controls */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title="Toggle theme"
                className={`relative p-2.5 rounded-xl transition-all duration-500 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 overflow-hidden group ${
                  isDark
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 text-amber-400 hover:from-gray-700 hover:to-gray-800 shadow-lg shadow-gray-900/30 border border-gray-700/50"
                    : "bg-gradient-to-br from-white to-gray-50 text-amber-600 hover:from-gray-50 hover:to-gray-100 shadow-lg shadow-gray-200/40 border border-gray-200/80"
                }`}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl ${
                  isDark 
                    ? "bg-gradient-to-br from-amber-400/10 to-orange-500/10" 
                    : "bg-gradient-to-br from-amber-200/20 to-orange-300/15"
                }`} />
                <div className="relative z-10 transition-all duration-500 group-hover:rotate-180">
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </div>
              </button>

              <button
                onClick={() => setIsOpen((o) => !o)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className={`relative p-2.5 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 overflow-hidden group border ${
                  isDark 
                    ? "text-gray-200 hover:bg-gray-800/80 border-gray-700/50 hover:border-gray-600" 
                    : "text-gray-800 hover:bg-gray-100/80 border-gray-200/80 hover:border-gray-300"
                } ${isOpen ? "scale-110 rotate-180" : "hover:scale-105"}`}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl ${
                  isDark 
                    ? "bg-gradient-to-br from-gray-800/50 to-gray-700/50" 
                    : "bg-gradient-to-br from-gray-100/50 to-gray-200/50"
                }`} />
                <div className="relative z-10 transition-transform duration-500">
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
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