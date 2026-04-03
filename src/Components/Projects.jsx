import { useEffect, useRef, useState } from "react";
import medique from "../assets/medique-dashboard.png"
import shopme from "../assets/shopme.png"

const projects = [
  {
    title: "Medique",
    desc: "Medique is a healthcare web app that enables users to manage medical needs like appointments, prescriptions, and health records in one place.",
    image: medique,
    tags: ["React", "Node.js", "MongoDB"],
    titleColor: "text-cyan-400",
    tagBorder: "border-slate-600 text-slate-300 hover:border-cyan-400",
    codeBorder: "border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400",
    demoBg: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90",
    cardBorder: "border-slate-700/60 hover:border-cyan-500/50",
    glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]",
  },
  {
    title: "ShopMe",
    desc: "ShopMe is an e-commerce platform that allows users to browse, purchase, and manage products seamlessly online.",
    image: shopme,
    tags: ["Next.js", "Express", "PostgreSQL"],
    titleColor: "text-purple-400",
    tagBorder: "border-slate-600 text-slate-300 hover:border-purple-400",
    codeBorder: "border-slate-600 hover:border-purple-400 text-slate-300 hover:text-purple-400",
    demoBg: "bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90",
    cardBorder: "border-purple-500/50 hover:border-purple-400/70",
    glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] shadow-[0_0_20px_rgba(168,85,247,0.08)]",
  },
];

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-[#0d0f1a] relative overflow-hidden py-16 sm:py-20 px-5 sm:px-8 md:px-14 lg:px-24"
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { opacity: 0; }
        .fade-up.visible { animation: fadeUp 0.65s ease both; }

        .project-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .project-card:hover { transform: translateY(-6px); }

        .img-zoom img { transition: transform 0.5s ease; }
        .img-zoom:hover img { transform: scale(1.06); }

        /* On mobile, disable tilt-lift so cards don't jump awkwardly */
        @media (max-width: 639px) {
          .project-card:hover { transform: translateY(-3px); }
        }
      `}</style>

      {/* Grid background — anchor point moved to section, not a child div */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-[500px] h-24 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <div
          className={`fade-up text-center mb-4 ${visible ? "visible" : ""}`}
          style={{ animationDelay: "0ms" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
        </div>

        <p
          className={`fade-up text-center text-slate-400 text-sm max-w-lg mx-auto mb-10 sm:mb-12 px-2 ${visible ? "visible" : ""}`}
          style={{ animationDelay: "80ms" }}
        >
          Here are some of my recent projects that showcase my skills and experience in full-stack development.
        </p>

        {/* Cards grid:
            - 1 col on mobile
            - 2 cols on sm (side-by-side, works great for 2 projects)
            - stays 2 cols on lg unless more projects are added
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`fade-up project-card rounded-2xl border ${project.cardBorder} ${project.glow} bg-[#12152a]/80 backdrop-blur-sm overflow-hidden flex flex-col ${visible ? "visible" : ""}`}
              style={{ animationDelay: `${160 + i * 120}ms` }}
            >
              {/* Image */}
              <div className="img-zoom h-44 sm:h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-85"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 p-4 sm:p-5 flex-1">
                <h3 className={`font-bold text-base ${project.titleColor}`}>{project.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed flex-1">{project.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2.5 py-1 rounded-full border ${project.tagBorder} transition-colors duration-200 cursor-default`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-1">
                  <button
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border ${project.codeBorder} text-xs font-semibold transition-all duration-200`}
                  >
                    <GithubIcon /> Code
                  </button>
                  <button
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg ${project.demoBg} text-white text-xs font-semibold transition-all duration-200`}
                  >
                    <ExternalIcon /> Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div
          className={`fade-up flex justify-center mt-10 sm:mt-12 ${visible ? "visible" : ""}`}
          style={{ animationDelay: "560ms" }}
        >
          <button className="px-7 sm:px-8 py-3 rounded-lg border border-slate-600 text-slate-300 text-sm font-semibold tracking-wide hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 w-full sm:w-auto max-w-xs">
            View All Projects
          </button>
        </div>

      </div>
    </section>
  );
}