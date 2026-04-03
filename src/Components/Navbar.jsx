import { useState, useEffect } from "react";

const navLinks = ["Home", "About", "Skills", "Projects", "Contact"];

export default function Navbar() {
    const [active, setActive] = useState("Home");
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 font-mono">
            <div
                className={`backdrop-blur-md bg-[#0d0f1a]/90 border-b border-indigo-900/30 transition-shadow duration-300 ${scrolled ? "shadow-[0_4px_32px_rgba(0,0,0,0.5)]" : ""
                    }`}
            >
                <div className="max-w-8xl mx-auto px-6 py-4 flex items-center  justify-between">
                    {/* Logo */}
                    <span className="text-5xl font-semibold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] select-none cursor-pointer">
                        &lt;Dev /&gt;
                    </span>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link}>
                                <button
                                    onClick={() => {
                                        setActive(link);
                                        const section = document.getElementById(link.toLowerCase());
                                        if (section) {
                                            section.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    className={`relative cursor-pointer text-2xl font-Patrick-Hand font-semibold tracking-wide pb-0.5 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:rounded-full after:bg-gradient-to-r after:from-cyan-400 after:to-purple-500 after:transition-all after:duration-300 ${active === link
                                        ? "text-cyan-400 after:w-full"
                                        : "text-slate-400 hover:text-slate-200 after:w-0 hover:after:w-full"
                                        }`}
                                >
                                    {link}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-[5px] p-1"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block w-[22px] h-[1.5px] rounded-full transition-all duration-300 origin-center ${menuOpen
                                ? "bg-cyan-400 translate-y-[7px] rotate-45"
                                : "bg-slate-400"
                                }`}
                        />
                        <span
                            className={`block w-[22px] h-[1.5px] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : "bg-slate-400"
                                }`}
                        />
                        <span
                            className={`block w-[22px] h-[1.5px] rounded-full transition-all duration-300 origin-center ${menuOpen
                                ? "bg-cyan-400 -translate-y-[7px] -rotate-45"
                                : "bg-slate-400"
                                }`}
                        />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <ul className="flex flex-col px-6 pb-4 pt-4 gap-4 border-t border-indigo-900/30">
                        {navLinks.map((link) => (
                            <li key={link}>
                                <button
                                    onClick={() => {
                                        setActive(link);
                                        setMenuOpen(false);

                                        const section = document.getElementById(link.toLowerCase());
                                        if (section) {
                                            section.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    className={`text-sm tracking-wide transition-colors duration-200 ${active === link
                                            ? "text-cyan-400"
                                            : "text-slate-400 hover:text-slate-200"
                                        }`}
                                >
                                    {link}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}