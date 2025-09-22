import React, { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Linkedin, 
  Github,
  ArrowUp,
  Heart,
  Sun,
  Moon,
  ExternalLink
} from "lucide-react";
import Image from "../images/logooo.png";

const FOOTER_LINKS = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Our Team", path: "/team" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" }
  ],
  services: [
    { name: "Web Development", path: "/services/web" },
    { name: "Mobile Apps", path: "/services/mobile" },
    { name: "UI/UX Design", path: "/services/design" },
    { name: "Consulting", path: "/services/consulting" }
  ]
};

const SOCIAL_LINKS = [
  { icon: Facebook, href: "https://www.facebook.com/jawad.ali.543086?mibextid=ZbWKwL", label: "Facebook", color: "hover:text-blue-500", bgColor: "group-hover:bg-blue-500/10" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jawad-ali-201640379", label: "LinkedIn", color: "hover:text-blue-600", bgColor: "group-hover:bg-blue-600/10" },
  { icon: Github, href: "https://github.com/Jawad656567", label: "GitHub", color: "hover:text-gray-800 dark:hover:text-white", bgColor: "group-hover:bg-gray-800/10" }
];

export default function Footer({ isDark, setIsDark }) {
  const [showScrollTop, setShowScrollTop] = useState(true);

  const toggleTheme = () => setIsDark((d) => !d);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`relative overflow-hidden ${
      isDark 
        ? "bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-300" 
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-600"
    } transition-all duration-500`}>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#fbbf24' : '#f59e0b'} 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="relative">
                <img 
                  src={Image} 
                  alt="TechNest logo" 
                  className="w-14 h-12 object-contain transition-all duration-500 group-hover:scale-110 filter drop-shadow-lg" 
                />
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md ${
                  isDark 
                    ? "bg-gradient-to-br from-yellow-500/20 to-amber-600/20" 
                    : "bg-gradient-to-br from-yellow-400/30 to-amber-500/30"
                }`} />
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-bold tracking-tight ${
                  isDark ? "text-yellow-500" : "text-yellow-600"
                } group-hover:scale-105 transition-all duration-500 drop-shadow-sm`}>
                  TechNest
                </span>
                <span className={`text-xs tracking-widest font-light mt-1 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                } transition-all duration-500 group-hover:text-yellow-500`}>
                  DIGITAL SOLUTIONS
                </span>
              </div>
            </div>
            
            <p className={`text-sm leading-relaxed mb-8 ${
              isDark ? "text-gray-400" : "text-gray-500"
            } max-w-sm`}>
              We craft innovative digital experiences that transform businesses and create lasting impact in the digital landscape.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className={`p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${
                  isDark 
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 text-yellow-500 shadow-gray-900/50 border border-gray-700/50" 
                    : "bg-gradient-to-br from-white to-gray-50 text-yellow-600 shadow-gray-200/50 border border-gray-200/80"
                }`}>
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <a 
                    href="mailto:ja289327@gmail.com" 
                    className={`text-sm font-medium hover:text-yellow-500 transition-all duration-300 hover:translate-x-1`}
                  >
                   Email
                  </a>
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Business Inquiries
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className={`p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${
                  isDark 
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 text-yellow-500 shadow-gray-900/50 border border-gray-700/50" 
                    : "bg-gradient-to-br from-white to-gray-50 text-yellow-600 shadow-gray-200/50 border border-gray-200/80"
                }`}>
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <a 
                    href="tel:+923146767659" 
                    className={`text-sm font-medium hover:text-yellow-500 transition-all duration-300 hover:translate-x-1`}
                  >
                    +92 314 676765 9
                  </a>
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Support Line
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className={`p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${
                  isDark 
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 text-yellow-500 shadow-gray-900/50 border border-gray-700/50" 
                    : "bg-gradient-to-br from-white to-gray-50 text-yellow-600 shadow-gray-200/50 border border-gray-200/80"
                }`}>
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-medium`}>
                    Swabi, Pakistan
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Head Office
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className={`text-lg font-bold mb-6 relative ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Company
              <div className={`absolute -bottom-1 left-0 w-12 h-1 rounded-full ${
                isDark 
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600" 
                  : "bg-gradient-to-r from-yellow-500 to-amber-600"
              }`} />
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <span className={`group flex items-center gap-2 text-sm hover:text-yellow-500 transition-all duration-300 hover:translate-x-2 font-medium relative py-1 cursor-pointer`}>
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full" />
                    </span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className={`text-lg font-bold mb-6 relative ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Services
              <div className={`absolute -bottom-1 left-0 w-12 h-1 rounded-full ${
                isDark 
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600" 
                  : "bg-gradient-to-r from-yellow-500 to-amber-600"
              }`} />
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.name}>
                  <span className={`group flex items-center gap-2 text-sm hover:text-yellow-500 transition-all duration-300 hover:translate-x-2 font-medium relative py-1 cursor-pointer`}>
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full" />
                    </span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Actions */}
        <div className={`mt-12 pt-8 border-t ${
          isDark ? "border-gray-800/50" : "border-gray-200/50"
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <span className={`text-sm font-semibold ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}>
                Connect with us:
              </span>
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`group relative p-3 rounded-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 overflow-hidden ${
                        isDark 
                          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400 hover:bg-gray-700 shadow-lg shadow-gray-900/30 border border-gray-700/50" 
                          : "bg-gradient-to-br from-white to-gray-50 text-gray-500 hover:bg-gray-50 shadow-lg shadow-gray-200/40 border border-gray-200/80"
                      } ${social.color}`}
                    >
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl ${social.bgColor}`} />
                      <Icon size={20} className="relative z-10 transition-all duration-500 group-hover:scale-110" />
                      
                      {/* Pulse effect */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                        <div className="absolute inset-0 rounded-xl bg-current animate-ping" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Theme Toggle & Back to Top */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title="Toggle theme"
                className={`relative p-3 rounded-xl transition-all duration-500 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 overflow-hidden group ${
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

              {/* Premium Back to Top Button */}
              {showScrollTop && (
                <button
                  onClick={scrollToTop}
                  className={`group relative px-6 py-3.5 rounded-2xl font-semibold text-sm tracking-wide overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 ${
                    isDark 
                      ? "bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 text-gray-900 shadow-xl shadow-yellow-500/40" 
                      : "bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 text-white shadow-xl shadow-yellow-500/40"
                  }`}
                  style={{
                    background: isDark 
                      ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #f97316 100%)'
                      : 'linear-gradient(135deg, #eab308 0%, #f59e0b 50%, #ea580c 100%)',
                    boxShadow: '0 20px 40px -12px rgba(245, 158, 11, 0.4), 0 8px 16px -4px rgba(245, 158, 11, 0.3)'
                  }}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  {/* Moving Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
                    <div className="h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-2.5">
                    <div className="relative">
                      <ArrowUp 
                        size={18} 
                        className="transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110" 
                      />
                      {/* Icon Glow */}
                      <div className="absolute inset-0 rounded-full bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <span className="relative transition-all duration-300 group-hover:tracking-wider">
                      Back to Top
                      {/* Text Underline */}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/40 group-hover:w-full transition-all duration-500 rounded-full" />
                    </span>
                  </div>
                  
                  {/* Ripple Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-white rounded-full group-hover:w-96 group-hover:h-96 transition-all duration-700" />
                  </div>
                  
                  {/* Floating Particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-2 left-3 w-1 h-1 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute top-3 right-4 w-0.5 h-0.5 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.8s' }} />
                    <div className="absolute bottom-3 left-1/2 w-0.5 h-0.5 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '1.1s' }} />
                  </div>
                  
                  {/* Border Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 blur-sm" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className={`mt-10 pt-8 border-t text-center ${
          isDark ? "border-gray-800/50" : "border-gray-200/50"
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className={`text-sm font-medium ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                © 2025 TechNest. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className={`hover:text-yellow-500 transition-colors duration-300 cursor-pointer ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}>
                  Privacy Policy
                </span>
                <span className={isDark ? "text-gray-600" : "text-gray-300"}>•</span>
                <span className={`hover:text-yellow-500 transition-colors duration-300 cursor-pointer ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}>
                  Terms of Service
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                Crafted with
              </span>
              <Heart 
                size={16} 
                className="text-red-500 fill-current animate-pulse" 
              />
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                in Pakistan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10 blur-3xl ${
          isDark 
            ? "bg-gradient-to-br from-yellow-500 to-amber-600" 
            : "bg-gradient-to-br from-yellow-400 to-amber-500"
        } animate-pulse`} />
        <div className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-10 blur-3xl ${
          isDark 
            ? "bg-gradient-to-br from-amber-600 to-orange-500" 
            : "bg-gradient-to-br from-amber-500 to-orange-400"
        } animate-pulse`} style={{ animationDelay: '2s' }} />
      </div>
    </footer>
  );
}