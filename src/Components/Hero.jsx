import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaGithub, FaFacebook, FaLinkedin, FaDownload, FaEnvelope } from "react-icons/fa";
import Image from "../images/image.jpg"

// Hook: Detect mobile (<= 768px)
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

// Floating particles animation (desktop only, SSR safe)
const FloatingParticles = ({ isDark }) => {
  if (typeof window === "undefined") return null;
  const particles = Array.from({ length: 15 }, (_, i) => i);
  const w = window.innerWidth;
  const h = window.innerHeight;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-400/30"
          initial={{
            x: Math.random() * w,
            y: Math.random() * h,
          }}
          animate={{
            x: Math.random() * w,
            y: Math.random() * h,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Rotating Title Component
function RotatingTitle({ isDark, isMobile, lowMotion }) {
  const titles = [
    "Web Developer",
    "Frontend Developer",
    "React Enthusiast",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (lowMotion) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(id);
  }, [lowMotion]);

  if (lowMotion) {
    return (
      <div className="text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6 h-8 sm:h-10 text-cyan-400">
        And I'm a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{titles[0]}</span>
      </div>
    );
  }

  return (
    <div className="text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6 h-8 sm:h-10">
      <AnimatePresence mode="wait">
        <motion.span
          key={titles[index]}
          initial={isMobile ? { opacity: 0, y: 8 } : { opacity: 0, y: 20 }}
          animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          exit={isMobile ? { opacity: 0, y: -8 } : { opacity: 0, y: -20 }}
          transition={{
            duration: isMobile ? 0.35 : 0.6,
            type: "tween",
          }}
          className="inline-block"
        >
          <span className="text-white">And I'm a </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            {titles[index]}
          </span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
}



// Hero Section
export default function Hero({ isDark = true }) {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const lowMotion = isMobile || prefersReduced;

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-purple-950/20 to-black"
          : "bg-gradient-to-br from-purple-50 via-white to-pink-50"
      }`}
    >
      {/* Animated Background Elements (desktop only) */}
      {!isMobile && <FloatingParticles isDark={isDark} />}

      {/* Gradient Orbs */}
      <div className={`absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl ${lowMotion ? "" : "animate-pulse"}`} />
      <div className={`absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl ${lowMotion ? "" : "animate-pulse"}`} />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative z-10 py-8 md:py-0 gap-8">
        {/* Left Side - Profile Image */}
        <motion.div
          className="w-full md:w-5/12 flex items-center justify-center order-1 md:order-1"
          initial={lowMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: lowMotion ? 0.5 : 1.2, ease: "easeOut" }}
        >
          <motion.div
            className="relative"
            whileHover={!lowMotion ? { scale: 1.05 } : undefined}
            animate={lowMotion ? undefined : { y: [0, -10, 0] }}
            transition={lowMotion ? undefined : { y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-purple-400 blur-2xl opacity-50 scale-110"></div>
            
            {/* Rotating border ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(180deg, #c084fc, #ec4899, #c084fc)",
                padding: "4px",
              }}
              animate={lowMotion ? undefined : { rotate: 360 }}
              transition={lowMotion ? undefined : { duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-slate-900"></div>
            </motion.div>

            {/* Profile Image Container */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-transparent">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
              <img
                src={Image}
                alt="Profile"
                className="relative z-10 w-full h-full object-cover"
              />
              
              {/* Inner glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-pink-500/20"></div>
            </div>

            {/* Floating decorative elements */}
            {!lowMotion && (
              <>
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-purple-400 rounded-full blur-sm"
                  animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500 rounded-full blur-sm"
                  animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          className="w-full md:w-7/12 text-center md:text-left order-2 md:order-2"
          initial={lowMotion ? { opacity: 0 } : { opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: lowMotion ? 0.4 : 1.2, ease: "easeOut", delay: 0.3 }}
        >
          {/* Greeting */}
          <motion.div
            className={`text-xl sm:text-2xl mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: lowMotion ? 0.2 : 0.6 }}
          >
            Hello, I'm
          </motion.div>

          {/* Main Name */}
          <motion.h1
            className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 tracking-tight leading-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
            initial={lowMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: lowMotion ? 0.4 : 1, delay: lowMotion ? 0 : 0.7 }}
          >
            Jawad Ali
          </motion.h1>

          {/* Rotating Title */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: lowMotion ? 0.25 : 0.9 }}
          >
            <RotatingTitle isDark={isDark} isMobile={isMobile} lowMotion={lowMotion} />
          </motion.div>

          {/* Description */}
          <motion.p
            className={`text-sm sm:text-base lg:text-lg max-w-2xl mb-8 leading-relaxed mx-auto md:mx-0 ${
              isDark ? "text-gray-400" : "text-gray-700"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: lowMotion ? 0.3 : 1.1, duration: 0.6 }}
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Integer facilis imperdiet elementum vel.
            Suspendisse rutrum vulputate sit egestas id purus. Lobortis sed vestibulum viverra at a spondents.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: lowMotion ? 0.35 : 1.3, duration: 0.6 }}
          >
            <motion.a
              href="/cv.pdf"
              download="cv.pdf"
              whileHover={!lowMotion ? { scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" } : undefined}
              whileTap={!lowMotion ? { scale: 0.95 } : undefined}
              className={`group relative w-full sm:w-auto px-8 py-4 text-lg rounded-lg font-semibold text-white shadow-lg overflow-hidden transition-all duration-300 ${
                isDark
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-purple-500/30"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/30"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaDownload />
                Download CV
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={!lowMotion ? { scale: 1.05 } : undefined}
              whileTap={!lowMotion ? { scale: 0.95 } : undefined}
              className={`w-full sm:w-auto px-8 py-4 text-lg rounded-lg font-semibold border-2 transition-all duration-300 shadow-md ${
                isDark
                  ? "border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <FaEnvelope />
                Contact Me
              </span>
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex gap-4 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: lowMotion ? 0.4 : 1.5, duration: 0.6 }}
          >
            {[FaGithub, FaLinkedin, FaFacebook].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={!lowMotion ? { y: -4, scale: 1.1 } : undefined}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? "bg-slate-800 border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-white"
                    : "bg-white border-purple-500/50 text-purple-600 hover:bg-purple-500 hover:text-white"
                }`}
              >
                <Icon className="text-xl" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}