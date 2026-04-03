import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const stats = [
    { value: "5",  label: "Months Internship", color: "text-cyan-400",   from: "#22d3ee", to: "#0ea5e9", border: "rgba(34,211,238,0.4)" },
    { value: "", label: "Projects Completed", color: "text-purple-400", from: "#a855f7", to: "#ec4899", border: "rgba(168,85,247,0.4)" },
    { value: "", label: "Happy Clients",     color: "text-orange-400", from: "#fb923c", to: "#f59e0b", border: "rgba(251,146,60,0.4)" },
];

const services = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        title: "Frontend Development",
        desc: "Building responsive and interactive UIs with React, Next.js, and modern CSS frameworks",
        gradient: "from-cyan-500 to-blue-600",
        glow: "rgba(34,211,238,0.25)",
        border: "rgba(34,211,238,0.4)",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
            </svg>
        ),
        title: "Backend Development",
        desc: "Creating robust APIs and server-side applications with Node.js and Express",
        gradient: "from-purple-500 to-pink-600",
        glow: "rgba(168,85,247,0.25)",
        border: "rgba(168,85,247,0.4)",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7zm0 5h16" />
            </svg>
        ),
        title: "Database Management",
        desc: "Designing and optimizing databases with MongoDB and SQL solutions",
        gradient: "from-blue-500 to-cyan-600",
        glow: "rgba(59,130,246,0.25)",
        border: "rgba(59,130,246,0.4)",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        title: "Full Stack Solutions",
        desc: "End-to-end development from concept to deployment on cloud platforms",
        gradient: "from-violet-500 to-purple-600",
        glow: "rgba(139,92,246,0.25)",
        border: "rgba(139,92,246,0.4)",
    },
];

/* ── Animated counter ── */
function Counter({ target }) {
    const [count, setCount] = useState(0);
    const num = parseInt(target);
    const suffix = target.replace(/[0-9]/g, "");
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 1400;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * num));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, num]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Magnetic card ── */
function MagneticCard({ children, glow, border, delay }) {
    const ref = useRef(null);
    const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [hovered, setHovered] = useState(false);

    const handleMouse = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        rotateX.set(-dy * 10);
        rotateY.set(dx * 10);
    };

    const resetMouse = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateX, rotateY, transformPerspective: 800 }}
            onMouseMove={handleMouse}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { resetMouse(); setHovered(false); }}
            className="rounded-2xl border border-slate-700/50 bg-[#12152a]/80 p-5 backdrop-blur-sm cursor-default relative overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
        >
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ boxShadow: `0 0 32px ${glow}, inset 0 0 20px ${glow}`, border: `1px solid ${border}` }}
            />
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: "-100%", opacity: 0 }}
                animate={hovered ? { x: "150%", opacity: [0, 0.15, 0] } : { x: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)" }}
            />
            {children}
        </motion.div>
    );
}

/* ── Floating particle ── */
function Particle({ x, y, size, color, duration, delay }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}

export default function About() {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true });

    const particles = [
        { x: 5,  y: 15, size: 4, color: "rgba(34,211,238,0.5)",  duration: 4,   delay: 0   },
        { x: 90, y: 25, size: 3, color: "rgba(168,85,247,0.5)",  duration: 5,   delay: 0.8 },
        { x: 15, y: 70, size: 5, color: "rgba(99,102,241,0.4)",  duration: 3.5, delay: 1.2 },
        { x: 80, y: 80, size: 3, color: "rgba(251,146,60,0.4)",  duration: 6,   delay: 0.4 },
        { x: 50, y: 5,  size: 4, color: "rgba(236,72,153,0.4)",  duration: 4.5, delay: 1.6 },
        { x: 60, y: 90, size: 3, color: "rgba(34,211,238,0.3)",  duration: 5.5, delay: 0.2 },
    ];

    return (
        <section
            id="about"
            className="bg-[#0d0f1a] relative overflow-hidden py-16 sm:py-20 px-5 sm:px-8 md:px-14 lg:px-24"
        >
            <style>{`
                @keyframes gridPulse {
                    0%,100% { opacity: 0.07; }
                    50%     { opacity: 0.13; }
                }
                @keyframes rotateSlow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                .grid-bg   { animation: gridPulse 4s ease-in-out infinite; }
                .spin-slow { animation: rotateSlow 20s linear infinite; }
                .spin-rev  { animation: rotateSlow 26s linear infinite reverse; }

                /* Hide large decorative rings on small screens */
                @media (max-width: 639px) {
                    .deco-ring { display: none; }
                }
            `}</style>

            {/* Background grid */}
            <div
                className="absolute inset-0 grid-bg pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(99,102,241,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.2) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Decorative rings */}
            <div className="deco-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[700px] md:h-[700px] pointer-events-none spin-slow opacity-5"
                style={{ border: "1px solid rgba(99,102,241,0.8)", borderRadius: "50%" }} />
            <div className="deco-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] md:w-[480px] md:h-[480px] pointer-events-none spin-rev opacity-5"
                style={{ border: "1px dashed rgba(34,211,238,0.8)", borderRadius: "50%" }} />

            {/* Top glow */}
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)", filter: "blur(40px)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Particles */}
            {particles.map((p, i) => <Particle key={i} {...p} />)}

            <div className="relative z-10 max-w-6xl mx-auto">

                {/* ── Section Title ── */}
                <div ref={titleRef} className="text-center mb-12 sm:mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            {"About".split("").map((ch, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
                                    className="inline-block"
                                >
                                    {ch}
                                </motion.span>
                            ))}{" "}
                            {" Me".split("").map((ch, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
                                    className="inline-block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                                >
                                    {ch === " " ? "\u00a0" : ch}
                                </motion.span>
                            ))}
                        </h2>
                    </motion.div>

                    <motion.div
                        className="mt-3 mx-auto h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                        initial={{ width: 0, opacity: 0 }}
                        animate={titleInView ? { width: 64, opacity: 1 } : {}}
                        transition={{ delay: 0.55, duration: 0.6, ease: "easeOut" }}
                    />
                </div>

                {/* ── Main Layout ── */}
                <div className="flex flex-col lg:flex-row gap-10 items-start">

                    {/* LEFT: Text + Stats */}
                    <div className="w-full lg:flex-1 flex flex-col gap-5">

                        <TextReveal delay={0.1}>
                            I'm a passionate MERN Stack Developer with hands-on experience building full-stack web
                            applications using MongoDB, Express.js, React, and Node.js. I enjoy creating responsive
                            user interfaces and developing efficient backend systems that deliver smooth user experiences.
                        </TextReveal>

                        <TextReveal delay={0.2}>
                            My journey into web development started with curiosity about how websites work, which has
                            now grown into a strong interest in solving real-world problems through code. I'm continuously
                            learning new technologies and improving my skills to stay up to date with modern development practices.
                        </TextReveal>

                        <TextReveal delay={0.3} muted>
                            My journey in web development started with a curiosity about how websites work,
                            and it has evolved into a career where I get to solve complex problems and build
                            products that make a difference.
                        </TextReveal>

                        {/* Stats */}
                        <div className="grid grid-cols-3 xs:grid-cols-3 gap-3 sm:gap-4 mt-2">
                            {stats.map((stat, i) => (
                                <StatCard key={stat.label} stat={stat} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Service Cards */}
                    <div className="w-full lg:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {services.map((service, i) => (
                            <MagneticCard
                                key={service.title}
                                glow={service.glow}
                                border={service.border}
                                delay={0.15 + i * 0.1}
                            >
                                <motion.div
                                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-3 shadow-lg`}
                                    initial={{ scale: 0, rotate: -20 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 + i * 0.1 }}
                                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                                >
                                    {service.icon}
                                </motion.div>

                                <motion.h3
                                    className={`font-bold text-sm sm:text-base mb-1.5 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                                    initial={{ opacity: 0, x: -12 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                >
                                    {service.title}
                                </motion.h3>

                                <motion.p
                                    className="text-slate-400 text-xs leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                                >
                                    {service.desc}
                                </motion.p>
                            </MagneticCard>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

/* ── Text reveal ── */
function TextReveal({ children, delay = 0, muted = false }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    return (
        <motion.p
            ref={ref}
            className={`${muted ? "text-slate-400 text-sm" : "text-slate-300 text-sm sm:text-base"} leading-relaxed`}
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.p>
    );
}

/* ── Stat card ── */
function StatCard({ stat, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.12, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.06, y: -4 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="border border-slate-700/60 rounded-xl px-3 sm:px-5 py-3 sm:py-4 bg-[#12152a]/60 backdrop-blur-sm relative overflow-hidden cursor-default"
            style={{ borderColor: hovered ? (stat.border || "rgba(34,211,238,0.4)") : undefined }}
        >
            <motion.div
                className="absolute inset-0 pointer-events-none rounded-xl"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: `radial-gradient(ellipse at center, ${stat.from}22 0%, transparent 70%)` }}
            />
            <motion.p
                className={`text-2xl sm:text-3xl font-extrabold ${stat.color} relative z-10`}
                animate={hovered ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 0.4 }}
            >
                <Counter target={stat.value} />
            </motion.p>
            <p className="text-slate-400 text-xs mt-1 relative z-10 leading-snug">{stat.label}</p>
        </motion.div>
    );
}