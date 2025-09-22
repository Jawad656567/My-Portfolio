import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Project from "./Components/Project";
import Contact from "./Components/contact";
import Footer from "./Components/Footer";

function App() {
  // Load initial value from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  // Sync theme to localStorage + <html> tag
  useEffect(() => {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <Router>
      <div
        className={`min-h-screen transition-colors duration-500 ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Hero isDark={isDark} />} />
            <Route path="/about" element={<About isDark={isDark} />} />
            <Route path="/projects" element={<Project isDark={isDark} />} />
            <Route path="/contact" element={<Contact isDark={isDark} />} />
          </Routes>
        </div>
        <Footer isDark={isDark} setIsDark={setIsDark} />
      </div>
    </Router>
  );
}

export default App;
