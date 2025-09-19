// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaFacebook, FaLinkedin, FaDownload, FaEnvelope } from "react-icons/fa";

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

// Floating particles animation
const FloatingParticles = ({ isDark }) => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${
            isDark ? "bg-purple-400/20" : "bg-purple-600/20"
          }`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
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
function RotatingTitle({ isDark, isMobile }) {
  const titles = [
    "Frontend Developer",
    "Web Developer",
    "MERN Stack Developer",
    "React Enthusiast",
    "UI/UX Designer",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`text-xl md:text-2xl font-medium mb-6 h-10 ${
        isDark ? "text-purple-300" : "text-purple-600"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={titles[index]}
          initial={{ opacity: 0, y: 20, ...(isMobile ? {} : { rotateX: -90 }) }}
          animate={{ opacity: 1, y: 0, ...(isMobile ? {} : { rotateX: 0 }) }}
          exit={{ opacity: 0, y: -20, ...(isMobile ? {} : { rotateX: 90 }) }}
          transition={{
            duration: isMobile ? 0.5 : 0.8,
            type: "spring",
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
  const isMobile = useIsMobile(); // Detect mobile

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

      {/* Gradient Orbs (light & pulse — keep on both) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left Side - Content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Main Title */}
<motion.h1
  className={`text-5xl md:text-7xl font-black mb-4 tracking-tight leading-tight 
    ${isDark ? "text-white" : "text-slate-900"} 
    mt-8 sm:mt-0  /* 👈 mobile pe neeche push, PC pe normal */
  `}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.4 }}
>
  Hi, I'm
  <br />
  <span className="relative inline-block">
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600">
      Jawad Ali
    </span>
    <motion.div
      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-pink-500 to-fuchsia-500"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ delay: 1.5, duration: 0.8 }}
    />
  </span>
</motion.h1>


          {/* Rotating Title */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <RotatingTitle isDark={isDark} isMobile={isMobile} />
          </motion.div>

          {/* Description */}
          <motion.p
            className={`text-[15px] md:text-xl max-w-2xl mb-8 leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Passionate <span className="font-semibold text-purple-500">MERN Stack Developer</span> crafting
            exceptional digital experiences with clean code, stunning designs, and seamless functionality.
          </motion.p>

{/* Action Buttons */}
<motion.div
  className="flex flex-col sm:flex-row gap-3 mb-6 items-center sm:items-start"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.2 }}
>
  <motion.a
    href="#projects"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`group relative 
      w-fit px-4 py-2 text-sm rounded-md   /* 👈 mobile */
      sm:w-auto sm:px-8 sm:py-4 sm:text-lg sm:rounded-xl /* 👈 PC */
      font-medium shadow-md overflow-hidden transition-all duration-300
      ${
        isDark
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-purple-500/25"
          : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-purple-500/25"
      }`}
  >
    <span className="relative z-10 flex items-center gap-2">
      <FaDownload className="text-sm sm:text-base" />
      Download CV
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
  </motion.a>

  <motion.a
    href="#contact"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`group 
      w-fit px-4 py-2 text-sm rounded-md   /* 👈 mobile */
      sm:w-auto sm:px-8 sm:py-4 sm:text-lg sm:rounded-xl /* 👈 PC */
      font-medium border transition-all duration-300
      ${
        isDark
          ? "border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
          : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
      }`}
  >
    <span className="flex items-center gap-2">
      <FaEnvelope className="text-sm sm:text-base" />
      Let's Talk
    </span>
  </motion.a>
</motion.div>


          {/* Social Links */}
          <motion.div
            className="flex justify-center md:justify-start gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            {[
              { icon: FaGithub, href: "https://github.com/Jawad656567", color: "hover:text-gray-600" },
              {
                icon: FaFacebook,
                href: "https://www.facebook.com/jawad.ali.543086?mibextid=ZbWKwL",
                color: "hover:text-blue-500",
              },
              {
                icon: FaLinkedin,
                href: "https://www.linkedin.com/in/jawad-ali-201640379",
                color: "hover:text-blue-600",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`text-3xl transition-all duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                } ${social.color} hover:drop-shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - 3D Model Image */}
        <motion.div
          className="md:w-1/2 flex items-center justify-center mt-12 md:mt-0"
          initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, scale: 0.8, rotateY: 45 }}
          animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: isMobile ? 0.8 : 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            animate={
              isMobile
                ? { y: [0, -4, 0] }
                : { y: [0, -10, 0], rotateY: [0, 5, -5, 0] }
            }
            transition={
              isMobile
                ? { y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }
                : {
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  }
            }
          >
            {/* Glow effect behind image */}
            <div
              className={`absolute inset-0 rounded-3xl blur-3xl scale-110 ${
                isDark ? "bg-purple-500/20" : "bg-purple-400/30"
              }`}
            ></div>

            <img
              src="/models/pc.png"
              alt="3D Computer Model"
              className="relative z-10 w-full max-w-lg h-auto object-contain drop-shadow-2xl"
            />

            {/* Animated rings around the image (desktop only) */}
            {!isMobile && (
              <>
                <motion.div
                  className={`absolute inset-0 rounded-full border-2 ${
                    isDark ? "border-purple-500/30" : "border-purple-400/40"
                  }`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: "120%",
                    height: "120%",
                    top: "-10%",
                    left: "-10%",
                  }}
                />
                <motion.div
                  className={`absolute inset-0 rounded-full border-2 ${
                    isDark ? "border-pink-500/20" : "border-pink-400/30"
                  }`}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: "140%",
                    height: "140%",
                    top: "-20%",
                    left: "-20%",
                  }}
                />
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className={`w-6 h-10 border-2 rounded-full flex justify-center ${
            isDark ? "border-purple-400" : "border-purple-600"
          }`}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className={`w-1 h-3 rounded-full mt-2 ${
              isDark ? "bg-purple-400" : "bg-purple-600"
            }`}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Custom CSS for wave animation */}
      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-15deg);
          }
        }
        .animate-wave {
          display: inline-block;
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}