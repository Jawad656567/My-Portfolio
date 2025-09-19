// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaFacebook, FaLinkedin, FaDownload, FaEnvelope } from "react-icons/fa";

// Custom hook for detecting mobile screens
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
};

// Floating particles animation - only for desktop
const FloatingParticles = ({ isDark, isMobile }) => {
  if (isMobile) return null; // Disable particles on mobile
  
  const particles = Array.from({ length: 15 }, (_, i) => i); // Reduced from 20 to 15
  
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
    "UI/UX Designer"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simple fade animation for mobile, complex 3D rotation for desktop
  const mobileVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const desktopVariants = {
    initial: { opacity: 0, y: 20, rotateX: -90 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    exit: { opacity: 0, y: -20, rotateX: 90 }
  };

  return (
    <div className={`text-xl md:text-2xl font-medium mb-6 h-10 ${isDark ? "text-purple-300" : "text-purple-600"}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={titles[index]}
          variants={isMobile ? mobileVariants : desktopVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={isMobile ? 
            { duration: 0.4 } : 
            { duration: 0.8, type: "spring", stiffness: 100 }
          }
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

  // Different animation variants for mobile vs desktop
  const contentVariants = {
    mobile: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 }
    },
    desktop: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  const imageVariants = {
    mobile: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.8 }
    },
    desktop: {
      initial: { opacity: 0, scale: 0.8, rotateY: 45 },
      animate: { opacity: 1, scale: 1, rotateY: 0 },
      transition: { duration: 1.5, delay: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-purple-950/20 to-black"
          : "bg-gradient-to-br from-purple-50 via-white to-pink-50"
      }`}
    >
      {/* Animated Background Elements */}
      <FloatingParticles isDark={isDark} isMobile={isMobile} />
      
      {/* Gradient Orbs - Simplified for mobile */}
      <div className={`absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl ${
        isMobile ? '' : 'animate-pulse'
      }`}></div>
      <div className={`absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl ${
        isMobile ? '' : 'animate-pulse delay-1000'
      }`}></div>
      
      <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Left Side - Content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          {...(isMobile ? contentVariants.mobile : contentVariants.desktop)}
        >
          {/* Main Title */}
          <motion.h1
            className={`text-4xl md:text-7xl font-black mb-4 tracking-tight leading-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
            initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.6 : 1, delay: isMobile ? 0.2 : 0.4 }}
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
                transition={{ delay: isMobile ? 0.8 : 1.5, duration: isMobile ? 0.5 : 0.8 }}
              />
            </span>
          </motion.h1>

          {/* Rotating Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isMobile ? 0.4 : 0.8 }}
          >
            <RotatingTitle isDark={isDark} isMobile={isMobile} />
          </motion.div>

          {/* Description */}
          <motion.p
            className={`text-base md:text-xl max-w-2xl mb-8 leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0.5 : 1, duration: isMobile ? 0.5 : 0.8 }}
          >
            Passionate <span className="font-semibold text-purple-500">MERN Stack Developer</span> crafting 
            exceptional digital experiences with clean code, stunning designs, and seamless functionality.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0.6 : 1.2 }}
          >
            <motion.a
              href="#projects"
              whileHover={isMobile ? {} : { scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative px-8 py-4 rounded-xl font-semibold text-lg shadow-xl overflow-hidden transition-all duration-300 ${
                isDark
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-purple-500/25"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-purple-500/25"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaDownload />
                Download CV
              </span>
              {!isMobile && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              )}
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={isMobile ? {} : { scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`group px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 ${
                isDark
                  ? "border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <FaEnvelope />
                Let's Talk
              </span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center md:justify-start gap-6"
            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0.7 : 1.5 }}
          >
            {[
              { icon: FaGithub, href: "https://github.com/Jawad656567", color: "hover:text-gray-600" },
              { icon: FaFacebook, href: "https://www.facebook.com/jawad.ali.543086?mibextid=ZbWKwL", color: "hover:text-blue-500" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/jawad-ali-201640379", color: "hover:text-blue-600" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={isMobile ? {} : { scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`text-3xl transition-all duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                } ${social.color} hover:drop-shadow-lg`}
                initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isMobile ? 0.8 + index * 0.05 : 1.7 + index * 0.1 }}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - 3D Model Image */}
        <motion.div
          className="md:w-1/2 flex items-center justify-center mt-12 md:mt-0"
          {...(isMobile ? imageVariants.mobile : imageVariants.desktop)}
        >
          <motion.div
            className="relative"
            whileHover={isMobile ? {} : { scale: 1.05 }}
            animate={isMobile ? {} : { 
              y: [0, -10, 0],
              rotateY: [0, 5, -5, 0]
            }}
            transition={isMobile ? {} : {
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {/* Glow effect behind image */}
            <div className={`absolute inset-0 rounded-3xl blur-3xl scale-110 ${
              isDark ? "bg-purple-500/20" : "bg-purple-400/30"
            }`}></div>
            
            <img
              src="/models/pc.png"
              alt="3D Computer Model"
              className="relative z-10 w-full max-w-lg h-auto object-contain drop-shadow-2xl"
            />
            
            {/* Animated rings around the image - Only on desktop */}
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
                    left: "-10%" 
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
                    left: "-20%" 
                  }}
                />
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Simplified for mobile */}
      <motion.div 
        className="absolute bottom-7 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: isMobile ? -10 : -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isMobile ? 1 : 2, duration: isMobile ? 0.5 : 0.8 }}
      >
        <motion.div
          className={`w-6 h-10 border-2 rounded-full flex justify-center ${
            isDark ? "border-purple-400" : "border-purple-600"
          }`}
          animate={isMobile ? {} : { y: [0, 10, 0] }}
          transition={isMobile ? {} : { duration: 2, repeat: Infinity }}
        >
          <motion.div
            className={`w-1 h-3 rounded-full mt-2 ${
              isDark ? "bg-purple-400" : "bg-purple-600"
            }`}
            animate={isMobile ? {} : { y: [0, 6, 0] }}
            transition={isMobile ? {} : { duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}