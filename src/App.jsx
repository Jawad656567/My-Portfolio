import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Project from "./Components/Project";
import Contact from "./Components/Contact";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-gray-900" : "bg-white"}`}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Hero isDark={isDark} />} />
            <Route path="/about" element={<About isDark={isDark} />} />
            <Route path="/projects" element={<Project isDark={isDark} />} />
            <Route path="/contact" element={<Contact isDark={isDark} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
