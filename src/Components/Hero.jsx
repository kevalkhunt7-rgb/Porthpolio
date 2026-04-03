import { useState, useEffect } from "react";
import Profile_image from '../assets/profile_photo-2.png'
import { useNavigate } from "react-router-dom";

const roles = ["MERN Stack Developer", "React Developer", "Node.js Developer", "Full Stack Developer"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let i = 0;
    setDisplayed("");
    setTyping(true);
    const typeInterval = setInterval(() => {
      i++;
      setDisplayed(current.slice(0, i));
      if (i === current.length) {
        clearInterval(typeInterval);
        setTyping(false);
      }
    }, 60);
    return () => clearInterval(typeInterval);
  }, [roleIndex]);

  return (
    <section className="min-h-screen bg-[#0d0f1a] relative overflow-hidden flex items-center">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(34,211,238,0.12), 0 0 40px rgba(168,85,247,0.08); }
          50%       { box-shadow: 0 0 40px rgba(34,211,238,0.32), 0 0 80px rgba(168,85,247,0.18); }
        }
        @keyframes imgReveal {
          from { opacity: 0; transform: scale(0.96) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes badgeSlide {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(24px, -24px) scale(1.1); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-18px, 18px) scale(1.06); }
        }

        .name-shimmer {
          background: linear-gradient(90deg, #22d3ee, #a855f7, #22d3ee);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 0 28px rgba(34,211,238,0.45), 0 0 60px rgba(168,85,247,0.2);
        }
        .btn-primary:active { transform: scale(0.97); }

        .btn-outline {
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .btn-outline:hover {
          transform: translateY(-2px) scale(1.04);
          background: rgba(34,211,238,0.08);
          border-color: rgba(34,211,238,0.8);
          box-shadow: 0 0 18px rgba(34,211,238,0.22);
        }
        .btn-outline:active { transform: scale(0.97); }

        .social-icon {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }
        .social-icon:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 18px rgba(34,211,238,0.35);
          background: rgba(34,211,238,0.1);
          border-color: rgba(34,211,238,0.7);
        }

        .img-card-glow { animation: glowPulse 3.5s ease-in-out infinite; }
        .img-float     { animation: floatY 5s ease-in-out infinite; }
        .img-reveal    { animation: imgReveal 0.9s cubic-bezier(.22,1,.36,1) both; animation-delay: 400ms; }
        .badge-anim    { animation: badgeSlide 0.6s ease both; animation-delay: 1.1s; opacity: 0; animation-fill-mode: forwards; }
        .orb-1         { animation: orbFloat1 7s ease-in-out infinite; }
        .orb-2         { animation: orbFloat2 9s ease-in-out infinite; }

        .fade-up-0 { animation: fadeUp 0.7s ease both; animation-delay: 0ms;   }
        .fade-up-1 { animation: fadeUp 0.7s ease both; animation-delay: 120ms; }
        .fade-up-2 { animation: fadeUp 0.7s ease both; animation-delay: 240ms; }
        .fade-up-3 { animation: fadeUp 0.7s ease both; animation-delay: 360ms; }
        .fade-up-4 { animation: fadeUp 0.7s ease both; animation-delay: 480ms; }
        .fade-up-5 { animation: fadeUp 0.7s ease both; animation-delay: 600ms; }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .hero-layout   { flex-direction: column-reverse !important; padding-top: 5rem !important; padding-bottom: 5rem !important; }
          .hero-text     { align-items: center !important; text-align: center !important; }
          .hero-desc     { text-align: center !important; }
          .hero-btns     { justify-content: center !important; }
          .hero-socials  { justify-content: center !important; }
          .hero-img-wrap { max-width: 260px !important; }
          .badge-code    { font-size: 0.68rem !important; left: 50% !important; transform: translateX(-50%) !important; bottom: -3.25rem !important; white-space: nowrap !important; }
        }
        @media (max-width: 480px) {
          .hero-img-wrap { max-width: 220px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-layout   { gap: 2rem !important; }
          .hero-img-wrap { max-width: 320px !important; }
        }
      `}</style>

      {/* Grid */}
      <div
        id="home"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated orbs */}
      <div className="orb-1 absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-purple-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="orb-2 absolute bottom-0 left-0 w-56 h-56 md:w-72 md:h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 md:px-14 lg:px-24 xl:px-32">
        <div
          className="hero-layout flex items-center justify-between gap-10 py-20 md:py-0"
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2.5rem" }}
        >
          {/* ── Text ── */}
          <div
            className="hero-text flex-1 flex flex-col gap-5"
            style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            <p
              className={`text-slate-400 text-lg font-mono tracking-widest uppercase${mounted ? " fade-up-0" : ""}`}
              style={!mounted ? { opacity: 0 } : {}}
            >
              Hi, I'm
            </p>

            <h1
              className={`name-shimmer font-extrabold leading-none tracking-tight${mounted ? " fade-up-1" : ""}`}
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", ...(mounted ? {} : { opacity: 0 }) }}
            >
              Keval Khunt
            </h1>

            <div
              className={`flex items-center gap-1${mounted ? " fade-up-2" : ""}`}
              style={{ minHeight: "2.5rem", ...(mounted ? {} : { opacity: 0 }) }}
            >
              <h2
                className="text-white font-semibold tracking-wide"
                style={{ fontSize: "clamp(1.1rem, 3.5vw, 1.75rem)" }}
              >
                {displayed}
              </h2>
              <span
                className={`inline-block rounded-sm ml-0.5${typing ? " animate-pulse" : " opacity-0"}`}
                style={{ width: 3, height: "2rem", background: "#22d3ee" }}
              />
            </div>

            <p
              className={`hero-desc text-slate-400 text-base leading-relaxed max-w-lg${mounted ? " fade-up-3" : ""}`}
              style={mounted ? {} : { opacity: 0 }}
            >
              Crafting exceptional web experiences with MongoDB, Express.js,
              React, and Node.js. Passionate about building scalable
              applications and bringing ideas to life.
            </p>

            <div
              className={`hero-btns flex flex-wrap gap-4${mounted ? " fade-up-4" : ""}`}
              style={mounted ? {} : { opacity: 0 }}
            >
              <a href="#projects">
                <button className="btn-primary px-7 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                  View Projects
                </button>
              </a>
              <button className="btn-outline px-7 py-3.5 rounded-lg border border-cyan-500/60 text-cyan-400 text-sm font-bold tracking-wider uppercase flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                Download CV
              </button>
            </div>

            <div
              className={`hero-socials flex gap-3${mounted ? " fade-up-5" : ""}`}
              style={mounted ? {} : { opacity: 0 }}
            >
              <a href="#" className="social-icon w-11 h-11 rounded-lg border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="social-icon w-11 h-11 rounded-lg border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.989V9h3.108v1.561h.046c.433-.82 1.49-1.684 3.066-1.684 3.279 0 3.884 2.157 3.884 4.962v6.613zM5.337 7.433a1.805 1.805 0 110-3.61 1.805 1.805 0 010 3.61zm1.604 13.019H3.733V9h3.208v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="social-icon w-11 h-11 rounded-lg border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Image ── */}
          <div
            className="flex-1 flex justify-center md:justify-end"
            style={{ flex: "1 1 260px", display: "flex", justifyContent: "center" }}
          >
            <div
              className="hero-img-wrap relative"
              style={{ position: "relative", width: "100%", maxWidth: "400px" }}
            >
              <div className={`img-float img-card-glow rounded-2xl p-[2px] img-reveal" : ""}`}>
                <div className="rounded-2xl overflow-hidden bg-[#0d0f1a]">
                  <img
                    src={Profile_image}
                    alt="Keval Khunt — Developer"
                    onLoad={() => setImgLoaded(true)}
                    className="w-full object-cover transition-opacity duration-700"
                    style={{
                      height: "clamp(240px, 45vw, 500px)",
                      opacity: imgLoaded ? 0.9 : 0,
                    }}
                  />
                </div>
              </div>

              {/* Status badge */}
              <div
                className="badge-code badge-anim absolute md:ml-9 mb-7  bg-[#0d1f2d] border border-cyan-500/50 rounded-lg font-mono text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.2)] flex items-center gap-2 "
                style={{ bottom: "-3rem", left: "1.5rem", padding: "0.4rem 0.9rem", fontSize: "0.75rem" }}
              >
                <span className="w-2 h-2 rounded-full  bg-cyan-400 animate-pulse inline-block" style={{ minWidth: 8, minHeight: 8 }} />
                <span>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-white">status</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-cyan-300">"Available for hire"</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}