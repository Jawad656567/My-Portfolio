import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import Image from "../images/logooo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Initial theme setup
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg shadow-red-500/20 py-1"
          : "bg-gradient-to-r from-black via-gray-950 to-black py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0 group cursor-pointer">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative group">
                <img
                  src={Image}
                  alt="Portfolio Logo"
                  className="w-25 h-14 object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="w-8 h-8 hidden items-center justify-center text-purple-400 text-lg font-bold bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg backdrop-blur-sm">
                  P
                </div>
              </div>
              <div className="relative">
                <span className="text-lg font-bold text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text tracking-wide drop-shadow-sm">
                  Portfolio
                </span>
                <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-1 items-center justify-end mr-12 space-x-1">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className="relative px-3 py-1.5 text-gray-300 hover:text-white font-medium tracking-wide transition-all duration-300 ease-out transform hover:scale-105 rounded-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-500 ease-out"></div>
                  <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 transition-opacity duration-300"></div>
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden lg:block flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 border border-purple-500/20 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 group"
            >
              <div className="relative w-5 h-5">
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400 transition-all duration-300 group-hover:rotate-180" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-400 transition-all duration-300 group-hover:-rotate-12" />
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-md bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 border border-purple-500/20 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400 transition-all duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400 transition-all duration-300" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 rounded-md hover:bg-gray-800/50"
            >
              {isOpen ? (
                <X
                  size={24}
                  className="text-red-500 transition-transform duration-200"
                />
              ) : (
                <Menu
                  size={24}
                  className="text-purple-400 transition-transform duration-200"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 ease-in-out transform ${
          isOpen
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4 overflow-hidden"
        }`}
      >
        <div className="bg-gradient-to-b from-black/98 via-gray-950/98 to-black/98 backdrop-blur-md border-t border-purple-500/20 shadow-xl shadow-black/50">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item, index) => (
              <div key={item.name} className="group">
                <Link
                  to={item.path}
                  className="block text-gray-300 hover:text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:via-pink-500/20 hover:to-red-500/20 transform hover:translate-x-1 border-l-2 border-transparent hover:border-purple-500"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen
                      ? "slideInLeft 0.5s ease-out forwards"
                      : "none",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{item.name}</span>
                    <div className="w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-6 transition-all duration-500"></div>
                  </div>
                </Link>
              </div>
            ))}

            <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
              {/* Mobile Theme Toggle Text */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm font-medium">
                  Theme:
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 border border-purple-500/30 transition-all duration-300 hover:scale-105"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300 text-sm">Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 text-sm">Dark</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}
