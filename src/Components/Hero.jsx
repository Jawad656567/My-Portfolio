// src/components/Hero.jsx
import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Html, useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

// Loader Component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center className="text-white text-lg font-mono animate-pulse">
      {progress.toFixed(0)}% loaded
    </Html>
  );
}

// 3D Computer Model
function ComputerModel({ scale }) {
  const { scene } = useGLTF("/models/pc.glb");
  return (
    <primitive
      object={scene}
      scale={scale}
      position={[0, -0.3, 0]} // ✅ adjusted so model is not too low
      rotation={[0, Math.PI / 4, 0]}
      castShadow
      receiveShadow
    />
  );
}

// Rotating Title
function RotatingTitle() {
  const titles = [
    "Frontend Developer",
    "Web Developer",
    "MERN Stack Developer",
    "React Enthusiast",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-lg md:text-xl text-purple-300 max-w-lg mb-6 h-8">
      <AnimatePresence mode="wait">
        <motion.span
          key={titles[index]}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.6 }}
          className="inline-block"
        >
          {titles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Hero Section
export default function Hero() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  // Resize listener to update isMobile dynamically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center
      bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden 
      px-6 md:px-20 pt-20 md:pt-0"
    >
      {/* Left Side - Text */}
      <motion.div
        className="md:w-1/2 text-center md:text-left z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 md:mb-4 mt-6 md:mt-0 tracking-wide 
          bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Hi, I'm Jawad Ali
        </motion.h1>

        <RotatingTitle />

        <motion.p
          className="text-gray-300 max-w-lg mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          MERN Stack Developer | Crafting clean, responsive, and professional web experiences.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex justify-center md:justify-start gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 transition-all text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-2xl"
          >
            Download CV
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border border-white hover:bg-white hover:text-black transition-all px-6 py-3 rounded-lg font-semibold"
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex justify-center md:justify-start gap-6 mt-6 text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <a
            href="https://github.com/Jawad656567"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.facebook.com/jawad.ali.543086?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com/in/jawad-ali-201640379"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedin />
          </a>
        </motion.div>
      </motion.div>

      {/* Right Side - 3D Model / Mobile Fallback */}
      <motion.div
        className="md:w-1/2 w-full h-[320px] md:h-[600px] mt-6 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {isMobile ? (
          // Mobile fallback image
          <img
            src="/models/pc.png"
            alt="Computer Model"
            className=" h-auto mx-auto object-contain md:w-full md:h-full"
          />
        ) : (
          // Desktop 3D model
          <Canvas shadows camera={{ position: [0, 2, 6], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 7]} intensity={1} castShadow />
            <Suspense fallback={<Loader />}>
              <Stage environment="city" intensity={0.6}>
                <ComputerModel scale={1.6} />
              </Stage>
            </Suspense>
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={1.2}
              maxPolarAngle={Math.PI / 2.2}
              minPolarAngle={Math.PI / 4.2}
            />
          </Canvas>
        )}
      </motion.div>
    </section>
  );
}
