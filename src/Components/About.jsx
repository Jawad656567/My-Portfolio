import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  useGLTF,
  Stage,
  Html,
  useProgress,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import Image from "../images/image.jpg";

// Loader Component with enhanced styling + theme support
function Loader({ isDark }) {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24">
          <div
            className={`absolute inset-0 rounded-full border-4 ${
              isDark ? "border-white/20" : "border-gray-800/20"
            }`}
          ></div>
          <div
            className={`absolute inset-0 rounded-full border-4 ${
              isDark ? "border-indigo-300" : "border-indigo-500"
            } border-t-transparent animate-spin`}
            style={{ transform: `rotate(${progress * 3.6}deg)` }}
          ></div>
        </div>
        <div
          className={`text-xl font-mono tracking-wider ${
            isDark ? "text-slate-100" : "text-slate-800"
          }`}
        >
          {progress.toFixed(0)}%{" "}
          <span className={isDark ? "text-indigo-300" : "text-indigo-600"}>
            loaded
          </span>
        </div>
      </div>
    </Html>
  );
}

// 3D About Model
function AboutModel() {
  const { scene } = useGLTF("/models/about.glb");
  return (
    <primitive
      object={scene}
      scale={1.5}
      position={[0, -1.2, 0]}
      rotation={[0, Math.PI / 5, 0]}
      castShadow
      receiveShadow
    />
  );
}

const experiences = [
  {
    role: "Frontend Developer",
    company: "Tech Creator",
    period: "2025 - Present",
    desc: "Built responsive web applications with React, TailwindCSS, and optimized user experiences.",
    color: "from-purple-500 to-pink-500",
  },
  {
    role: "MERN Stack Developer",
    company: "Freelance",
    period: "2024 - 2025",
    desc: "Developed full-stack projects with MongoDB, Express, React, and Node.js ensuring scalability and performance.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    role: "Intern Web Developer",
    company: "Tech Creator",
    period: "2024 - 2025",
    desc: "Worked on small projects, learned team collaboration, and contributed to real-world applications.",
    color: "from-green-500 to-emerald-400",
  },
];

/* NEW: ExperienceSection component (now theme-aware) */
function ExperienceSection({ isMobile, isDark }) {
  const baseDuration = isMobile ? 0.5 : 0.8;

  return (
    <section
      id="experience"
      className={`relative py-20 md:py-24 bg-gradient-to-br ${
        isDark
          ? "from-slate-950 via-slate-900 to-black text-white"
          : "from-white via-slate-50 to-slate-100 text-slate-900"
      } overflow-hidden`}
    >
      <motion.h2
        className="text-3xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.5 : 1 }}
        viewport={{ once: true }}
      >
        My Journey 🚀
      </motion.h2>

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8">
        {/* Timeline line (hidden on small screens) */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-transparent rounded-full"></div>

        <div className="space-y-20">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative flex flex-col items-center gap-6 lg:gap-12 lg:flex-row ${
                index % 2 === 0 ? "lg:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: baseDuration,
                delay: index * (isMobile ? 0.1 : 0.2),
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Dot with icon (only on large screens) */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
                <motion.div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center shadow-xl`}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Briefcase className="text-white w-6 h-6" />
                </motion.div>
              </div>

              {/* Content Card */}
              <motion.div
                className={`p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md transition relative z-10 border ${
                  isDark
                    ? "bg-slate-900 border-slate-700 hover:border-purple-400"
                    : "bg-white/80 border-slate-200 hover:border-purple-400"
                }`}
                whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                transition={{ duration: 0.25 }}
              >
                <h3
                  className={`text-xl sm:text-2xl font-bold ${
                    isDark ? "text-purple-300" : "text-purple-700"
                  }`}
                >
                  {exp.role}
                </h3>
                <p
                  className={`text-sm sm:text-base ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {exp.company} | {exp.period}
                </p>
                <p
                  className={`mt-3 text-sm sm:text-base ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {exp.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background floating elements (disabled on mobile) */}
      <motion.div
        className={`hidden md:block absolute top-10 left-6 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 rounded-full blur-3xl ${
          isDark ? "bg-purple-600/20" : "bg-purple-500/15"
        }`}
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className={`hidden md:block absolute bottom-16 right-6 sm:right-20 w-28 sm:w-40 h-28 sm:h-40 rounded-full blur-3xl ${
          isDark ? "bg-pink-600/20" : "bg-pink-500/15"
        }`}
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </section>
  );
}

/* Skills data and components */
const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600" },
      { name: "React", level: 92, color: "from-blue-400 to-blue-600" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 88, color: "from-green-400 to-green-600" },
      { name: "MongoDB", level: 85, color: "from-green-500 to-green-700" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "VS Code", level: 95, color: "from-blue-500 to-blue-700" },
      { name: "Git", level: 88, color: "from-red-400 to-red-600" },
    ],
  },
];

// Individual Skill Bar Component with mobile-friendly tweak + theme support
const SkillBar = ({ skill, index, isMobile, isDark }) => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{
      duration: isMobile ? 0.4 : 0.8,
      delay: index * (isMobile ? 0.1 : 0.15),
    }}
    className="group"
  >
    <div className="flex justify-between items-center mb-3">
      <span
        className={`font-semibold text-lg transition-colors duration-300 ${
          isDark ? "text-gray-300 group-hover:text-white" : "text-gray-700 group-hover:text-slate-900"
        }`}
      >
        {skill.name}
      </span>
      <div className="flex items-center space-x-2">
        <span
          className={`text-sm transition-colors duration-300 ${
            isDark ? "text-gray-400 group-hover:text-indigo-400" : "text-gray-500 group-hover:text-indigo-600"
          }`}
        >
          {skill.level}%
        </span>
        <div className="w-2 h-2 rounded-full bg-indigo-500 md:animate-pulse"></div>
      </div>
    </div>
    <div
      className={`relative h-4 rounded-full overflow-hidden border ${
        isDark ? "bg-gray-800/50 border-gray-700/50" : "bg-gray-200/60 border-gray-300/60"
      }`}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        transition={{
          duration: isMobile ? 1 : 2,
          delay: index * (isMobile ? 0.1 : 0.2),
          ease: "easeOut",
        }}
        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
      >
        {/* shimmer disabled on mobile */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
        <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.div>
      <div
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDark ? "bg-white/60" : "bg-slate-600/60"
        }`}
      ></div>
    </div>
  </motion.div>
);

// Skills Category Component with mobile-friendly tweak + theme support
const SkillsCategory = ({ category, skills, index, isMobile, isDark }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      duration: isMobile ? 0.5 : 1,
      delay: index * (isMobile ? 0.15 : 0.3),
    }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100 hidden md:block"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-3xl"></div>
    <div
      className={`relative rounded-3xl p-8 transition-all duration-700 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20 border ${
        isDark
          ? "bg-slate-800/80 md:backdrop-blur-xl border-slate-600/30 hover:border-indigo-500/60"
          : "bg-white/70 backdrop-blur-md border-slate-200 hover:border-indigo-500/40"
      }`}
    >
      <div className="absolute top-0 left-8 transform -translate-y-1/2">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-teal-500 text-white px-6 py-3 rounded-2xl text-lg font-bold shadow-2xl border border-white/20">
          <span className="relative z-10">{category}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
      <div className="mt-6 space-y-6">
        {skills.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            index={skillIndex}
            isMobile={isMobile}
            isDark={isDark}
          />
        ))}
      </div>
      {/* spinner hidden on mobile */}
      <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500 hidden md:block">
        <div className="w-8 h-8 border-2 border-indigo-400 rounded-full animate-spin"></div>
      </div>
    </div>
  </motion.div>
);

// Main About Component (now accepts isDark)
export default function About({ isDark = true }) {
  // Mobile fallback logic
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange); // older Safari
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  // Profile image motion variants: simpler on mobile
  const profileAnimate = isMobile
    ? { opacity: 1, scale: 1 }
    : { y: [0, -15, 0], rotate: [0, 5, -5, 0] };

  const profileTransition = isMobile
    ? { duration: 0.8, ease: "easeOut" }
    : { duration: 6, repeat: Infinity, ease: "easeInOut" };

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br ${
        isDark
          ? "from-slate-950 via-slate-900 to-indigo-950 text-white"
          : "from-indigo-50 via-white to-purple-50 text-slate-900"
      } overflow-hidden`}
    >
      {/* Animated Background Elements (disabled on mobile) */}
      <div className="absolute inset-0 hidden md:block">
        <div
          className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse ${
            isDark ? "bg-indigo-500/10" : "bg-indigo-400/20"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
            isDark ? "bg-purple-500/10" : "bg-purple-400/20"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-500 ${
            isDark ? "bg-teal-500/5" : "bg-teal-400/15"
          }`}
        ></div>
      </div>

      {/* About Section */}
      <section className="relative z-10 flex flex-col items-center justify-start px-6 md:px-20 pt-32 pb-12">
        {/* Floating Profile Picture */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 rounded-full md:blur-2xl opacity-30 md:animate-pulse"></div>
          <motion.img
            src={Image}
            alt="Jawad Ali"
            className={`relative w-44 h-44 md:w-52 md:h-52 rounded-full border-4 ${
              isDark ? "border-white/20" : "border-black/10"
            } shadow-2xl object-cover ring-8 ring-indigo-400/20 hover:ring-indigo-400/40 transition-all duration-500`}
            animate={profileAnimate}
            transition={profileTransition}
            whileHover={{ scale: 1.05, rotate: 0 }}
          />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-xl">
            MERN Stack Developer
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-16 max-w-7xl mx-auto">
          {/* Enhanced Text Section */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: isMobile ? 0.6 : 1, ease: "easeOut" }}
          >
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: isMobile ? 0.6 : 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                About
              </span>
              <br />
              <span className={isDark ? "text-white" : "text-slate-900"}>
                Me
              </span>
            </motion.h2>

            <motion.div
              className="space-y-6 text-lg md:text-xl leading-relaxed"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: isMobile ? 0.6 : 1, delay: 0.4 }}
            >
              <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                Hi! I'm{" "}
                <span className="font-bold text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
                  Jawad Ali
                </span>
                , a passionate{" "}
                <span className="text-indigo-400 font-semibold">
                  MERN Stack Developer
                </span>{" "}
                specializing in modern web applications.
              </p>

              <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                I transform ideas into elegant digital solutions using
                cutting-edge technologies and best practices in web development.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.6 : 1, delay: 0.6 }}
            >
              <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Download Resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                className={`px-8 py-4 border-2 font-semibold rounded-full transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white"
                    : "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                }`}
              >
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          {/* Enhanced 3D Model Section WITH MOBILE FALLBACK */}
          <motion.div
            className="lg:w-1/2 w-full h-[300px] md:h-[400px] relative"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: isMobile ? 0.6 : 1, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl md:blur-xl hidden md:block"></div>
            <div
              className={`relative h-full rounded-3xl overflow-hidden md:backdrop-blur-sm border ${
                isDark ? "border-white/10" : "border-black/10"
              }`}
              suppressHydrationWarning
            >
              {mounted && !isMobile ? (
                // Desktop/Tablet: Show 3D Canvas
                <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
                  <ambientLight intensity={0.4} />
                  <directionalLight
                    position={[10, 10, 5]}
                    intensity={1.2}
                    castShadow
                  />
                  <pointLight
                    position={[-10, -10, -10]}
                    intensity={0.3}
                    color="#4f46e5"
                  />
                  <Suspense fallback={<Loader isDark={isDark} />}>
                    <Stage environment="warehouse" intensity={0.5}>
                      <AboutModel />
                    </Stage>
                  </Suspense>
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={2.5}
                    maxPolarAngle={Math.PI}
                    minPolarAngle={0}
                    maxDistance={12}
                    minDistance={4}
                  />
                </Canvas>
              ) : (
                // Mobile: Show fallback image (ensure this path is in /public)
                <motion.img
                  src="./models/about.png"
                  alt="About section static preview"
                  className="object-cover w-5/6 h-auto mx-auto mt-8"
                  initial={{ opacity: 0.6, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEW Experience Section (timeline) */}
      <ExperienceSection isMobile={isMobile} isDark={isDark} />

      {/* Skills Section */}
      <section className="relative z-10 px-6 md:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.6 : 1 }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-black mb-6"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: isMobile ? 0.6 : 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                My Skills
              </span>
            </motion.h2>
            <motion.p
              className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: isMobile ? 0.6 : 1, delay: 0.4 }}
            >
              A comprehensive overview of my technical expertise and proficiency
              levels across various technologies and tools in the modern web
              development ecosystem.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {skillsData.map((category, index) => (
              <SkillsCategory
                key={category.category}
                category={category.category}
                skills={category.skills}
                index={index}
                isMobile={isMobile}
                isDark={isDark}
              />
            ))}
          </div>

          {/* Additional CSS for shimmer effect */}
          <style jsx>{`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%) skewX(-12deg);
              }
              100% {
                transform: translateX(200%) skewX(-12deg);
              }
            }
            .animate-shimmer {
              animation: shimmer 2s infinite;
            }
          `}</style>
        </div>
      </section>
    </div>
  );
}