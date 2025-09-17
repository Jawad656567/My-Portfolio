import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out p-0 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg shadow-red-500/30"
          : "bg-gradient-to-r from-black via-gray-950 to-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 group cursor-pointer">
            <div className="relative">
              <span className="text-xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text animate-pulse">
                🐍 BLACK COBRA
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-2 items-center">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className="relative px-3 py-2 text-white/90 hover:text-white font-medium tracking-wide transition-all duration-300 ease-out transform hover:scale-105 flex items-center gap-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-500 ease-out"></div>
                  <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 transition-opacity duration-300"></div>
                </Link>
              </div>
            ))}

            {/* CTA Button */}
            <button className="ml-4 relative overflow-hidden bg-gradient-to-r from-purple-400 to-pink-500 text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/30 group">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="absolute inset-0 animate-pulse bg-white/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-700"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-white/90 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              {isOpen ? (
                <X size={26} className="animate-spin text-red-500" />
              ) : (
                <Menu size={26} className="hover:animate-pulse text-yellow-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 ease-in-out transform ${
          isOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4 overflow-hidden"
        }`}
      >
        <div className="bg-gradient-to-b from-black/95 via-gray-950/95 to-black/95 backdrop-blur-md border-t border-red-500/20">
          <div className="px-4 py-5 space-y-3">
            {navItems.map((item, index) => (
              <div key={item.name} className="group">
                <Link
                  to={item.path}
                  className="block text-white/90 hover:text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-red-600/20 hover:via-orange-500/20 hover:to-yellow-500/20 transform hover:translate-x-2"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen ? "slideInLeft 0.5s ease-out forwards" : "none",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <div className="w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-8 transition-all duration-500"></div>
                  </div>
                </Link>
              </div>
            ))}

            <button
              className="w-full mt-5 bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2.5 px-5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/30"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </button>
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
