
import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Frontend Developer",
    company: "Company XYZ",
    period: "2023 - Present",
    desc: "Built responsive web applications with React, TailwindCSS, and optimized user experiences.",
    color: "from-purple-500 to-pink-500",
  },
  {
    role: "MERN Stack Developer",
    company: "Freelance",
    period: "2022 - 2023",
    desc: "Developed full-stack projects with MongoDB, Express, React, and Node.js ensuring scalability and performance.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    role: "Intern Web Developer",
    company: "ABC Tech",
    period: "2021 - 2022",
    desc: "Worked on small projects, learned team collaboration, and contributed to real-world applications.",
    color: "from-green-500 to-emerald-400",
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden"
    >
      <motion.h2
        className="text-3xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
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
              transition={{ duration: 0.8, delay: index * 0.2 }}
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
                className="bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 hover:border-purple-400 transition relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-purple-300">{exp.role}</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  {exp.company} | {exp.period}
                </p>
                <p className="mt-3 text-gray-300 text-sm sm:text-base">{exp.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background floating elements */}
      <motion.div
        className="absolute top-10 left-6 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-purple-600/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-16 right-6 sm:right-20 w-28 sm:w-40 h-28 sm:h-40 bg-pink-600/20 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </section>
  );
}
