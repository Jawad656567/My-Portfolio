// src/pages/Contact.jsx
import React, { useEffect, useMemo, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle2,
  XCircle,
  Loader2,
  Copy,
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Environment, Sparkles } from "@react-three/drei";

// Hook: detect mobile (<= 768px)
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

// Desktop-only 3D scene (no external assets)
function ContactShapes({ isDark }) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} />
      <pointLight position={[-5, -5, -5]} intensity={0.7} color={isDark ? "#a78bfa" : "#7c3aed"} />

      <Suspense fallback={null}>
        <Environment preset="city" />
        <Sparkles count={80} scale={12} size={2} speed={0.4} color={isDark ? "#a78bfa" : "#7c3aed"} />
        <Float rotationIntensity={1.2} floatIntensity={1.2} speed={1}>
          <mesh position={[-2.5, 1.2, 0]}>
            <icosahedronGeometry args={[1.1, 0]} />
            <meshStandardMaterial
              color={isDark ? "#a78bfa" : "#7c3aed"}
              metalness={0.4}
              roughness={0.2}
              emissive={isDark ? "#6d28d9" : "#7c3aed"}
              emissiveIntensity={0.25}
            />
          </mesh>
        </Float>
        <Float rotationIntensity={1} floatIntensity={1.1} speed={1.2}>
          <mesh position={[2.6, -0.6, -1]}>
            <dodecahedronGeometry args={[0.9, 0]} />
            <meshStandardMaterial
              color={isDark ? "#22d3ee" : "#06b6d4"}
              metalness={0.3}
              roughness={0.25}
              emissive={isDark ? "#0891b2" : "#22d3ee"}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
        <Float rotationIntensity={0.8} floatIntensity={0.9} speed={1.4}>
          <mesh position={[0.2, -2, 1]}>
            <octahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial
              color={isDark ? "#fb7185" : "#f43f5e"}
              metalness={0.35}
              roughness={0.3}
              emissive={isDark ? "#be123c" : "#e11d48"}
              emissiveIntensity={0.18}
            />
          </mesh>
        </Float>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Suspense>
    </Canvas>
  );
}

// Simple helper
const cx = (...classes) => classes.filter(Boolean).join(" ");

// Info item
function InfoItem({ icon: Icon, label, value, onClick, isDark }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cx(
        "w-full text-left p-4 rounded-xl border transition-all duration-300 group",
        isDark
          ? "bg-slate-900/70 border-slate-700 hover:border-indigo-500/60 hover:shadow-indigo-500/20 shadow-lg"
          : "bg-white/80 backdrop-blur-sm border-slate-200 hover:border-indigo-500/40 hover:shadow-indigo-500/10 shadow-lg"
      )}
    >
      <div className="flex items-center gap-4">
        <span
          className={cx(
            "p-3 rounded-lg transition-colors duration-300",
            isDark ? "bg-indigo-500/15 text-indigo-300" : "bg-indigo-500/10 text-indigo-600"
          )}
        >
          <Icon size={22} />
        </span>
        <div className="flex-1">
          <p className={cx("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>{label}</p>
          <p className={cx("text-base font-semibold", isDark ? "text-gray-100" : "text-gray-800")}>
            {value}
          </p>
        </div>
        <Copy
          className={cx(
            "opacity-0 group-hover:opacity-100 transition-opacity",
            isDark ? "text-indigo-300" : "text-indigo-600"
          )}
          size={18}
        />
      </div>
    </motion.button>
  );
}

// Social link
function SocialLink({ href, icon: Icon, isDark, delay = 0 }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.12, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={cx(
        "inline-flex items-center justify-center w-11 h-11 rounded-xl border shadow-md transition-all",
        isDark
          ? "bg-slate-900/70 border-slate-700 text-gray-200 hover:text-white hover:border-indigo-500/60"
          : "bg-white/80 backdrop-blur-sm border-slate-200 text-gray-700 hover:text-slate-900 hover:border-indigo-500/40"
      )}
      aria-label={href}
    >
      <Icon size={20} />
    </motion.a>
  );
}

// Main Contact Component
export default function Contact({ isDark = true }) {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const FORM_ENDPOINT = useMemo(() => {
    // Optional: set VITE_FORMSPREE_ID in .env to use Formspree
    const id = import.meta?.env?.VITE_FORMSPREE_ID;
    return id ? `https://formspree.io/f/${id}` : null;
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message should be at least 10 characters";
    return e;
    // subject optional
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eObj = validate();
    if (Object.keys(eObj).length) {
      setErrors(eObj);
      return;
    }
    setStatus({ type: "sending", message: "Sending your message..." });

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Failed to send");
      } else {
        // Simulate success if no endpoint configured
        await new Promise((r) => setTimeout(r, 1200));
      }
      setStatus({ type: "success", message: "Thanks! I’ll get back to you shortly." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setTimeout(() => setStatus({ type: "idle", message: "" }), 3500);
    }
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus({ type: "success", message: "Copied to clipboard" });
      setTimeout(() => setStatus({ type: "idle", message: "" }), 1500);
    } catch {
      setStatus({ type: "error", message: "Copy failed" });
      setTimeout(() => setStatus({ type: "idle", message: "" }), 1500);
    }
  };

  return (
    <section
      id="contact"
      className={cx(
        "relative min-h-screen overflow-hidden",
        "pt-16 pb-20 md:pb-28",
        "transition-colors duration-700",
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950/20 to-black text-white"
          : "bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-900"
      )}
    >
      {/* Decorative gradient orbs */}
      {!isMobile && (
        <>
          <motion.div
            className={cx(
              "absolute -top-16 -left-10 w-80 h-80 rounded-full blur-3xl",
              isDark ? "bg-indigo-500/20" : "bg-indigo-400/30"
            )}
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={cx(
              "absolute bottom-10 -right-10 w-96 h-96 rounded-full blur-3xl",
              isDark ? "bg-fuchsia-500/20" : "bg-fuchsia-400/25"
            )}
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

    <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10">
  {/* Heading */}
  <div className="text-center mb-6 md:mb-8 mt-[-10px]">
    <motion.h1
      className={cx(
        "font-black tracking-tight",
        "text-4xl md:text-6xl lg:text-7xl",
        "leading-[1.1]"
      )}
      initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, y: 20, rotateX: -15 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: isMobile ? 0.6 : 1 }}
      viewport={{ once: true }}
    >
      Let’s work together
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-teal-400">
        on your next idea
      </span>
    </motion.h1>

    <motion.p
      className={cx(
        "mt-2 md:mt-4 mx-auto max-w-2xl",
        isDark ? "text-gray-300" : "text-gray-700"
      )}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      Fill out the form and I’ll get back ASAP. Prefer email or a quick call? Use the info on
      the right.
    </motion.p>
  </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* Left: Contact Form */}
          <motion.div
            className={cx(
              "relative rounded-3xl p-6 sm:p-8 md:p-10 border",
              isDark
                ? "bg-slate-900/60 border-slate-800 shadow-2xl shadow-indigo-900/10"
                : "bg-white/70 backdrop-blur-md border-slate-200 shadow-xl"
            )}
            initial={{ opacity: 0, x: isMobile ? 0 : -60, y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: isMobile ? 0.6 : 1 }}
            viewport={{ once: true }}
          >
            {/* Subtle accent line */}
            <div
              className="absolute inset-x-0 -top-px h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(99,102,241,.0), rgba(99,102,241,.6), rgba(244,63,94,.6), rgba(20,184,166,.6), rgba(99,102,241,.0))",
              }}
            />

            <form onSubmit={handleSubmit} noValidate>
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Full Name
                  </label>
                  <div
                    className={cx(
                      "relative group rounded-xl border transition-all",
                      isDark
                        ? "bg-slate-950/40 border-slate-800 focus-within:border-indigo-500/70"
                        : "bg-white/70 border-slate-200 focus-within:border-indigo-500/50"
                    )}
                  >
                    <span
                      className={cx(
                        "absolute left-3 top-1/2 -translate-y-1/2",
                        isDark ? "text-indigo-300/70" : "text-indigo-600/70"
                      )}
                    >
                      <Mail size={18} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={cx(
                        "w-full pl-10 pr-3 py-3 rounded-xl bg-transparent outline-none",
                        isDark ? "text-white placeholder:text-gray-500" : "text-slate-900 placeholder:text-gray-500"
                      )}
                      aria-invalid={!!errors.name}
                      aria-describedby="err-name"
                    />
                  </div>
                  {errors.name && (
                    <p id="err-name" className="mt-1 text-sm text-rose-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Email
                  </label>
                  <div
                    className={cx(
                      "relative group rounded-xl border transition-all",
                      isDark
                        ? "bg-slate-950/40 border-slate-800 focus-within:border-indigo-500/70"
                        : "bg-white/70 border-slate-200 focus-within:border-indigo-500/50"
                    )}
                  >
                    <span
                      className={cx(
                        "absolute left-3 top-1/2 -translate-y-1/2",
                        isDark ? "text-indigo-300/70" : "text-indigo-600/70"
                      )}
                    >
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={cx(
                        "w-full pl-10 pr-3 py-3 rounded-xl bg-transparent outline-none",
                        isDark ? "text-white placeholder:text-gray-500" : "text-slate-900 placeholder:text-gray-500"
                      )}
                      aria-invalid={!!errors.email}
                      aria-describedby="err-email"
                    />
                  </div>
                  {errors.email && (
                    <p id="err-email" className="mt-1 text-sm text-rose-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="mt-5">
                <label className="block text-sm font-medium mb-1.5">
                  Subject (optional)
                </label>
                <div
                  className={cx(
                    "relative group rounded-xl border transition-all",
                    isDark
                      ? "bg-slate-950/40 border-slate-800 focus-within:border-indigo-500/70"
                      : "bg-white/70 border-slate-200 focus-within:border-indigo-500/50"
                  )}
                >
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can I help?"
                    className={cx(
                      "w-full px-3 py-3 rounded-xl bg-transparent outline-none",
                      isDark ? "text-white placeholder:text-gray-500" : "text-slate-900 placeholder:text-gray-500"
                    )}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mt-5">
                <label className="block text-sm font-medium mb-1.5">
                  Message
                </label>
                <div
                  className={cx(
                    "relative group rounded-xl border transition-all",
                    isDark
                      ? "bg-slate-950/40 border-slate-800 focus-within:border-indigo-500/70"
                      : "bg-white/70 border-slate-200 focus-within:border-indigo-500/50"
                  )}
                >
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, budget or any details you have in mind."
                    rows={6}
                    className={cx(
                      "w-full px-3 py-3 rounded-xl bg-transparent outline-none resize-y",
                      isDark ? "text-white placeholder:text-gray-500" : "text-slate-900 placeholder:text-gray-500"
                    )}
                    aria-invalid={!!errors.message}
                    aria-describedby="err-message"
                  />
                </div>
                {errors.message && (
                  <p id="err-message" className="mt-1 text-sm text-rose-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="mt-7 flex items-center gap-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status.type === "sending"}
                  className={cx(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
                    status.type === "sending" ? "cursor-wait" : "cursor-pointer",
                    isDark
                      ? "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:shadow-indigo-500/25"
                      : "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:shadow-indigo-300/40"
                  )}
                >
                  {status.type === "sending" ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className={cx("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
                  
                </p>
              </div>
            </form>
          </motion.div>

          {/* Right: Info + Social + 3D (desktop only for 3D) */}
          <div className="flex flex-col gap-6">
            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoItem
                icon={Mail}
                label="Email"
                value="ja289327@gmail.com"
                onClick={() => copy("ja289327@gmail.com")}
                isDark={isDark}
              />
              <InfoItem
                icon={Phone}
                label="Phone"
                value="+923146767659"
                onClick={() => copy("03146767659")}
                isDark={isDark}
              />
              <InfoItem
                icon={MapPin}
                label="Location"
                value="Swabi, Pakistan"
                onClick={() => copy("Swabi, Pakistan")}
                isDark={isDark}
              />
            </div>

            {/* Socials */}
            <div
              className={cx(
                "flex items-center gap-4 p-4 rounded-2xl border",
                isDark ? "bg-slate-900/60 border-slate-800" : "bg-white/70 backdrop-blur-md border-slate-200"
              )}
            >
              <span className={cx("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
                Also find me on
              </span>
              <div className="flex items-center gap-3">
                <SocialLink
                  href="https://github.com/your-username"
                  icon={Github}
                  isDark={isDark}
                  delay={0.1}
                />
                <SocialLink
                  href="https://www.linkedin.com/in/your-username"
                  icon={Linkedin}
                  isDark={isDark}
                  delay={0.2}
                />
              </div>
            </div>

            {/* Desktop: 3D Background Card */}
            {!isMobile && (
              <motion.div
                className={cx(
                  "relative h-64 rounded-2xl overflow-hidden border",
                  isDark ? "bg-slate-900/50 border-slate-800" : "bg-white/60 backdrop-blur-md border-slate-200"
                )}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <ContactShapes isDark={isDark} />
                {/* Gradient overlay for depth */}
                <div
                  className={cx(
                    "pointer-events-none absolute inset-0",
                    "bg-gradient-to-t from-black/10 via-transparent to-transparent"
                  )}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Status Toast */}
      <AnimatePresence>
        {status.type !== "idle" && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className={cx(
              "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
              "px-5 py-3 rounded-xl shadow-2xl border flex items-center gap-2",
              status.type === "success"
                ? isDark
                  ? "bg-emerald-900/60 text-emerald-200 border-emerald-700/60"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                : status.type === "error"
                ? isDark
                  ? "bg-rose-900/60 text-rose-200 border-rose-700/60"
                  : "bg-rose-50 text-rose-700 border-rose-200"
                : isDark
                ? "bg-slate-900/70 text-slate-200 border-slate-700"
                : "bg-white/90 text-slate-800 border-slate-200"
            )}
            role="status"
            aria-live="polite"
          >
            {status.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : status.type === "error" ? (
              <XCircle size={18} />
            ) : (
              <Loader2 size={18} className="animate-spin" />
            )}
            <span className="text-sm">{status.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}