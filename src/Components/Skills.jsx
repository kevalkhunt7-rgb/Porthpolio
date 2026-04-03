import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    glow: "rgba(34,211,238,0.18)",
    glowHover: "rgba(34,211,238,0.35)",
    barFrom: "#22d3ee",
    barTo: "#6366f1",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 75 },
      { name: "JavaScript/TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 88 },
      { name: "HTML5/CSS3", level: 95 },
    ],
  },
  {
    title: "Backend",
    color: "text-purple-400",
    border: "border-purple-500/30",
    glow: "rgba(168,85,247,0.18)",
    glowHover: "rgba(168,85,247,0.35)",
    barFrom: "#a855f7",
    barTo: "#ec4899",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "RESTful APIs", level: 92 },
    ],
  },
  {
    title: "Database",
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    glow: "rgba(34,211,238,0.18)",
    glowHover: "rgba(34,211,238,0.35)",
    barFrom: "#22d3ee",
    barTo: "#3b82f6",
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "MySQL", level: 70 },
    ],
  },
  {
    title: "Tools & Others",
    color: "text-purple-400",
    border: "border-purple-500/30",
    glow: "rgba(168,85,247,0.18)",
    glowHover: "rgba(168,85,247,0.35)",
    barFrom: "#8b5cf6",
    barTo: "#a855f7",
    skills: [
      { name: "Git/GitHub", level: 92 },
      { name: "Docker", level: 78 },
      { name: "AWS/Cloud", level: 75 },
      { name: "CI/CD", level: 80 },
      { name: "Agile/Scrum", level: 85 },
    ],
  },
];

/* ── Animated skill bar ── */
function SkillBar({ name, level, barFrom, barTo, index, cardInView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, x: -24 }}
      animate={cardInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.25 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* label row */}
      <div className="flex justify-between items-center">
        <motion.span
          className="text-slate-300 text-sm font-medium"
          animate={{ color: hovered ? "#fff" : "#cbd5e1" }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.span>
        <motion.span
          className="text-xs font-mono"
          animate={{
            color: hovered ? barFrom : "#94a3b8",
            scale: hovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {level}%
        </motion.span>
      </div>

      {/* track */}
      <div className="h-[4px] w-full bg-slate-700/60 rounded-full overflow-hidden relative">
        {/* fill bar */}
        <motion.div
          className="h-full rounded-full absolute left-0 top-0"
          style={{ background: `linear-gradient(90deg, ${barFrom}, ${barTo})` }}
          initial={{ width: "0%" }}
          animate={cardInView ? { width: `${level}%` } : { width: "0%" }}
          transition={{ duration: 0.9, delay: 0.3 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* glowing tip */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full -translate-x-1/2"
          style={{
            background: barTo,
            boxShadow: `0 0 8px 3px ${barTo}88`,
          }}
          initial={{ left: "0%" }}
          animate={cardInView ? { left: `${level}%` } : { left: "0%" }}
          transition={{ duration: 0.9, delay: 0.3 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* shimmer on hover */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ x: "-100%", opacity: 0 }}
          animate={hovered ? { x: "200%", opacity: [0, 0.5, 0] } : { x: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.5) 50%, transparent 80%)" }}
        />
      </div>
    </motion.div>
  );
}

/* ── Category card with 3D tilt ── */
function SkillCard({ cat, cardIndex }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -6);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 6);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: cardIndex * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
        setHovered(false);
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-2xl border ${cat.border} bg-[#12152a]/80 backdrop-blur-sm p-6 relative overflow-hidden cursor-default`}
    >
      {/* animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ boxShadow: `0 0 36px ${cat.glowHover}, inset 0 0 24px ${cat.glow}` }}
      />

      {/* corner accent top-right */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none rounded-bl-full"
        animate={{ opacity: hovered ? 0.15 : 0.06 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(circle, ${cat.barFrom} 0%, transparent 70%)` }}
      />

      {/* shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%", opacity: 0 }}
        animate={hovered ? { x: "160%", opacity: [0, 0.12, 0] } : { x: "-100%", opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)" }}
      />

      {/* ── Category title ── */}
      <motion.h3
        className={`text-3xl font-bold mb-5 ${cat.color} relative z-10`}
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: cardIndex * 0.12 + 0.1 }}
      >
        {/* letter by letter */}
        {cat.title.split("").map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: cardIndex * 0.12 + 0.15 + i * 0.04, duration: 0.3 }}
          >
            {ch === " " ? "\u00a0" : ch}
          </motion.span>
        ))}
      </motion.h3>

      {/* ── Skill bars ── */}
      <div className="flex flex-col gap-4 relative z-10">
        {cat.skills.map((skill, si) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            barFrom={cat.barFrom}
            barTo={cat.barTo}
            index={si}
            cardInView={inView}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Floating particle ── */
function Particle({ x, y, size, color, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{ y: [0, -28, 0], opacity: [0.15, 0.5, 0.15], scale: [1, 1.4, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Skills() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  const particles = [
    { x: 4,  y: 20, size: 4, color: "rgba(34,211,238,0.5)",  duration: 4,   delay: 0   },
    { x: 92, y: 15, size: 3, color: "rgba(168,85,247,0.5)",  duration: 5,   delay: 0.7 },
    { x: 10, y: 75, size: 5, color: "rgba(99,102,241,0.4)",  duration: 3.5, delay: 1.1 },
    { x: 85, y: 70, size: 3, color: "rgba(251,146,60,0.4)",  duration: 6,   delay: 0.3 },
    { x: 50, y: 8,  size: 4, color: "rgba(236,72,153,0.4)",  duration: 4.5, delay: 1.5 },
    { x: 65, y: 92, size: 3, color: "rgba(34,211,238,0.3)",  duration: 5.5, delay: 0.1 },
  ];

  return (
    <section
      id="skills"
      className="bg-[#0d0f1a] relative overflow-hidden py-20 px-6"
    >
      <style>{`
        @keyframes gridPulse {
          0%,100% { opacity: 0.07; }
          50%      { opacity: 0.13; }
        }
        @keyframes rotateSlow {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        .grid-pulse { animation: gridPulse 4s ease-in-out infinite; }
        .ring-cw  { animation: rotateSlow 22s linear infinite; }
        .ring-ccw { animation: rotateSlow 18s linear infinite reverse; }
      `}</style>

      {/* bg grid */}
      <div
        className="absolute inset-0 grid-pulse pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* rotating rings */}
      <div className="absolute top-1/2 left-1/2 w-[640px] h-[640px] pointer-events-none ring-cw opacity-[0.04]"
        style={{ border: "1px solid rgba(99,102,241,1)", borderRadius: "50%" }} />
      <div className="absolute top-1/2 left-1/2 w-[420px] h-[420px] pointer-events-none ring-ccw opacity-[0.04]"
        style={{ border: "1px dashed rgba(34,211,238,1)", borderRadius: "50%" }} />

      {/* top glow breathe */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[560px] h-36 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.12) 0%, transparent 70%)", filter: "blur(40px)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* particles */}
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      <div className="relative z-10 max-w-8xl mx-auto px-4">

        {/* ── Title ── */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {"Technical".split("").map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
              >
                {ch}
              </motion.span>
            ))}{" "}
            {" Skills".split("").map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.48 + i * 0.06, duration: 0.4 }}
              >
                {ch === " " ? "\u00a0" : ch}
              </motion.span>
            ))}
          </h2>

          {/* underline draws itself */}
          <motion.div
            className="mt-3 mx-auto h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ width: 0, opacity: 0 }}
            animate={titleInView ? { width: 64, opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, ci) => (
            <SkillCard key={cat.title} cat={cat} cardIndex={ci} />
          ))}
        </div>

      </div>
    </section>
  );
}