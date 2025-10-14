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

// Floating particles (desktop only)
const FloatingParticles = ({ isDark }) => {
  if (typeof window === "undefined") return null;
  const particles = Array.from({ length: 20 }, (_, i) => i);
  const w = window.innerWidth;
  const h = window.innerHeight;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${
            isDark ? "bg-purple-400/20" : "bg-purple-600/20"
          }`}
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
  const titles = ["Frontend Developer", "Web Developer", "React Enthusiast"];
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
      <div
        className={`text-xl md:text-2xl font-medium mb-6 h-10 ${
          isDark ? "text-purple-300" : "text-purple-600"
        }`}
      >
        ✨ {titles[0]}
      </div>
    );
  }

  return (
    <div
      className={`text-xl md:text-2xl font-medium mb-6 h-10 ${
        isDark ? "text-purple-300" : "text-purple-600"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={titles[index]}
          initial={isMobile ? { opacity: 0, y: 8 } : { opacity: 0, y: 20, rotateX: -90 }}
          animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, rotateX: 0 }}
          exit={isMobile ? { opacity: 0, y: -8 } : { opacity: 0, y: -20, rotateX: 90 }}
          transition={{
            duration: isMobile ? 0.35 : 0.8,
            type: isMobile ? "tween" : "spring",
            stiffness: 100,
          }}
          className="inline-block"
        >
          ✨ {titles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Hero Section
export default function Hero({ isDark }) {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();

  const lowMotion = isMobile || prefersReduced;
  const titleLowMotion = prefersReduced;

  return (
    <section
      id="home"
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-purple-950/20 to-black"
          : "bg-gradient-to-br from-purple-50 via-white to-pink-50"
      }`}
    >
      {!isMobile && <FloatingParticles isDark={isDark} />}

      {/* Gradient Orbs */}
      <div
        className={`absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl ${
          lowMotion ? "" : "animate-pulse"
        }`}
      />
      <div
        className={`absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl ${
          lowMotion ? "" : "animate-pulse delay-1000"
        }`}
      />

      <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* 📱 Mobile: Photo on Top */}
        {isMobile && (
          <motion.div
            className="flex justify-center mb-8 mt-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-full blur-3xl scale-110 ${
                  isDark ? "bg-purple-500/20" : "bg-purple-400/30"
                }`}
              ></div>
              <img
                src={Image}
                alt="Jawad Ali"
                className="relative z-10 w-44 h-44 rounded-full object-cover drop-shadow-2xl border-4 border-purple-400"
              />
            </div>
          </motion.div>
        )}

        {/* 📝 Text Section */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={lowMotion ? { opacity: 0 } : { opacity: 0, x: -100 }}
          animate={{ opacity: 1, ...(lowMotion ? {} : { x: 0 }) }}
          transition={{ duration: lowMotion ? 0.4 : 1.2 }}
        >
          <motion.h1
            className={`text-5xl md:text-7xl font-black mb-4 tracking-tight leading-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600">
              Jawad Ali
            </span>
          </motion.h1>

          <RotatingTitle isDark={isDark} isMobile={isMobile} lowMotion={titleLowMotion} />

          <motion.p
            className={`text-[15px] md:text-xl max-w-2xl mb-8 leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Passionate <span className="font-semibold text-purple-500">Front-End Developer</span> crafting
            exceptional digital experiences with clean code, stunning designs, and seamless functionality.
          </motion.p>

          {/* 🎯 Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-auto items-center sm:items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href="/cv.pdf"
              download="cv.pdf"
              whileHover={!lowMotion ? { scale: 1.05, y: -2 } : undefined}
              className={`group px-6 py-3 rounded-lg font-semibold w-full sm:w-auto text-center transition-all duration-300
              ${
                isDark
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-purple-500/25"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-purple-500/25"
              }`}
            >
              <span className="flex justify-center items-center gap-2">
                <FaDownload /> Download CV
              </span>
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={!lowMotion ? { scale: 1.05, y: -2 } : undefined}
              className={`group px-6 py-3 rounded-lg font-semibold w-full sm:w-auto text-center border transition-all duration-300
              ${
                isDark
                  ? "border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              }`}
            >
              <span className="flex justify-center items-center gap-2">
                <FaEnvelope /> Let's Talk
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* 💻 Right Side (Laptop - Desktop only) */}
        {!isMobile && (
          <motion.div
            className="md:w-1/2 flex items-center justify-center mt-12 md:mt-0"
            initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0], rotateY: [0, 5, -5, 0] }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div
                className={`absolute inset-0 rounded-3xl blur-3xl scale-110 ${
                  isDark ? "bg-purple-500/20" : "bg-purple-400/30"
                }`}
              ></div>
              <img
                src="/models/pc.png"
                alt="Laptop"
                className="relative z-10 w-full max-w-lg h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
