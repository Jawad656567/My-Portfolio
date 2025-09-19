// src/pages/Projects.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Search, Eye, X, Star, Code, Globe } from "lucide-react";

// Sample projects data
const projectsData = [
  {
    id: 1,
    title: "TechNest Platform",
    category: "Web App",
    description:
      "A modern developer platform with workspace management, real-time collaboration, and advanced authentication system.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "JWT"],
    live: "https://example.com/technest",
    repo: "https://github.com/username/technest",
    featured: true,
    stars: 156,
    status: "Active",
  },
  {
    id: 2,
    title: "Portfolio Website",
    category: "Landing",
    description:
      "Responsive portfolio website with modern design, smooth animations, and interactive elements.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=450&fit=crop",
    tags: ["React", "Tailwind", "Framer Motion", "Three.js"],
    live: "https://example.com/portfolio",
    repo: "https://github.com/username/portfolio",
    featured: false,
    stars: 89,
    status: "Completed",
  },
  {
    id: 3,
    title: "E-commerce Store",
    category: "Web App",
    description:
      "Full-stack e-commerce solution with advanced cart management, payment integration, and admin dashboard.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Redux", "Tailwind"],
    live: "https://example.com/store",
    repo: "https://github.com/username/store",
    featured: true,
    stars: 234,
    status: "Active",
  },
  {
    id: 4,
    title: "Task Management App",
    category: "Web App",
    description:
      "Collaborative task management application with real-time updates and team coordination features.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop",
    tags: ["Vue.js", "Firebase", "Vuetify", "PWA"],
    live: "https://example.com/tasks",
    repo: "https://github.com/username/tasks",
    featured: false,
    stars: 67,
    status: "Active",
  },
  {
    id: 5,
    title: "AI Chat Interface",
    category: "AI/ML",
    description:
      "Modern chat interface for AI interactions with conversation history and customizable themes.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    tags: ["React", "OpenAI", "WebSocket", "TypeScript"],
    live: "https://example.com/chat",
    repo: "https://github.com/username/ai-chat",
    featured: true,
    stars: 312,
    status: "Beta",
  },
  {
    id: 6,
    title: "Weather Dashboard",
    category: "Dashboard",
    description:
      "Beautiful weather dashboard with detailed forecasts, interactive maps, and location-based alerts.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=450&fit=crop",
    tags: ["React", "D3.js", "Weather API", "Chart.js"],
    live: "https://example.com/weather",
    repo: "https://github.com/username/weather",
    featured: false,
    stars: 45,
    status: "Completed",
  },
];

// Unique categories
const categories = [...new Set(projectsData.map((p) => p.category))];

function ProjectCard({ project, isDark, onViewDetails }) {
  const cardBg = isDark
    ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-500/50"
    : "bg-white hover:bg-white border-slate-200 hover:border-purple-400/50 shadow-lg hover:shadow-xl";

  const textColor = isDark ? "text-white" : "text-slate-900";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-700";
  const tagBg = isDark
    ? "bg-gray-800 text-gray-300 border-gray-700"
    : "bg-gray-100 text-gray-700 border-gray-300";

  return (
    <div
      className={`${cardBg} rounded-2xl border overflow-hidden group transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 relative`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500 rounded-2xl" />

      {/* Stars Badge */}
      <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-black/30 backdrop-blur-sm text-white text-xs rounded-lg flex items-center gap-1">
        <Star size={10} />
        {project.stars}
      </div>

      {/* Image */}
      <div className="aspect-video overflow-hidden relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <div className="flex items-center gap-2 mb-3">
          <h3 className={`text-xl font-bold ${textColor}`}>{project.title}</h3>
          <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
            {project.category}
          </span>
        </div>

        <p className={`${subTextColor} text-sm mb-4 line-clamp-2`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={`text-xs px-3 py-1 ${tagBg} rounded-full border`}>
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className={`text-xs px-3 py-1 ${tagBg} rounded-full border`}>
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Actions - Responsive on mobile */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto justify-center flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            <Globe size={16} />
            Live
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto justify-center flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 border rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? "border-gray-600 text-gray-300 hover:border-purple-500 hover:bg-purple-500/10"
                : "border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50"
            }`}
          >
            <Code size={16} />
            Code
          </a>
          <button
            onClick={() => onViewDetails(project)}
            className={`w-full sm:w-auto justify-center flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 sm:ml-auto ${
              isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Eye size={16} />
            View
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, isDark, onClose }) {
  if (!project) return null;

  const modalBg = isDark ? "bg-gray-900" : "bg-white";
  const textColor = isDark ? "text-white" : "text-slate-900";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-700";
  const tagBg = isDark
    ? "bg-gray-800 text-gray-300 border-gray-700"
    : "bg-gray-100 text-gray-700 border-gray-300";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className={`relative ${modalBg} rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border ${
          isDark ? "border-gray-700" : "border-gray-200"
        } shadow-2xl`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
            isDark ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"
          }`}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div className="relative">
          <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`px-3 py-1 text-sm font-medium rounded-lg ${
                project.status === "Active"
                  ? "bg-green-500/80 text-white"
                  : project.status === "Beta"
                  ? "bg-blue-500/80 text-white"
                  : "bg-gray-500/80 text-white"
              }`}
            >
              {project.status}
            </span>
          </div>

          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full flex items-center gap-1">
            <Star size={12} />
            {project.stars} stars
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className={`text-3xl font-bold ${textColor}`}>{project.title}</h2>
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full">
              {project.category}
            </span>
          </div>

          <p className={`${subTextColor} text-base sm:text-lg mb-6 leading-relaxed`}>{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className={`px-4 py-2 ${tagBg} rounded-lg border font-medium`}>
                {tag}
              </span>
            ))}
          </div>

          {/* Modal Actions - Responsive */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <Globe size={20} />
              Live Demo
            </a>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto justify-center flex items-center gap-3 px-5 py-3 border rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:border-purple-500 hover:bg-purple-500/10"
                  : "border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50"
              }`}
            >
              <Code size={20} />
              Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ isDark }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "");
    }
  }, [selectedProject]);

  const filteredProjects = useMemo(() => {
    const s = search.trim().toLowerCase();
    return projectsData.filter((project) => {
      const matchesSearch =
        s === "" ||
        project.title.toLowerCase().includes(s) ||
        project.description.toLowerCase().includes(s) ||
        project.tags.some((tag) => tag.toLowerCase().includes(s));

      const matchesCategory = selectedCategory === "" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  // Backgrounds (pure white in light mode)
  const sectionBg = isDark
    ? "bg-gradient-to-br from-slate-900 via-purple-950/20 to-black"
    : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-600";
  const inputBg = isDark
    ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
    : "bg-white border-slate-200 text-slate-900 placeholder-gray-500 focus:border-purple-400";

  return (
    <section
      id="projects"
      className={`min-h-screen ${sectionBg} ${textColor} pt-16 pb-20 transition-all duration-500 scroll-mt-24 md:scroll-mt-28`}
    >
      {/* Decorative orbs: only in dark to keep light 100% white */}
      <div className={`fixed inset-0 overflow-hidden pointer-events-none ${isDark ? "" : "hidden"}`}>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2000ms" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header - a bit tighter spacing */}
        <div className="text-center mb-12">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${textColor}`}>
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Projects
            </span>
          </h1>
          <p className={`${subTextColor} text-lg md:text-xl max-w-3xl mx-auto leading-relaxed`}>
            A curated collection of projects showcasing modern web development, innovative solutions, and
            cutting-edge technologies
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              size={20}
            />
            <input
              type="text"
              placeholder="Search projects, technologies, or descriptions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 ${inputBg} border rounded-xl focus:outline-none transition-all duration-300`}
            />
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-6 py-4 ${inputBg} border rounded-xl focus:outline-none transition-all duration-300 min-w-48`}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={project.id} style={{ animationDelay: `${index * 0.06}s` }} className="animate-fade-in">
              <ProjectCard project={project} isDark={isDark} onViewDetails={setSelectedProject} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className={`text-6xl mb-4 ${isDark ? "text-gray-700" : "text-gray-300"}`}>🔍</div>
            <p className={`${subTextColor} text-xl mb-2`}>No projects found</p>
            <p className={`${subTextColor} text-sm`}>Try adjusting your search criteria or category filter</p>
          </div>
        )}

        {/* Modal */}
        {selectedProject && (
          <ProjectModal project={selectedProject} isDark={isDark} onClose={() => setSelectedProject(null)} />
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}