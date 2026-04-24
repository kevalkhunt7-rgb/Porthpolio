const quickLinks = ["About", "Skills", "Projects", "Contact"];

const socials = [
  {
    label: "GitHub",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.989V9h3.108v1.561h.046c.433-.82 1.49-1.684 3.066-1.684 3.279 0 3.884 2.157 3.884 4.962v6.613zM5.337 7.433a1.805 1.805 0 110-3.61 1.805 1.805 0 010 3.61zm1.604 13.019H3.733V9h3.208v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    label: "Email",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0c18] border-t border-slate-800/60 px-6 pt-12 pb-6">
      <div className="max-w-6xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-3">
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-mono">
              &lt;Dev /&gt;
            </span>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              MERN Stack Developer passionate about creating exceptional web experiences and bringing ideas to life through code.
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-cyan-400 font-bold text-base mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-slate-400 text-sm hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Connect */}
          <div>
            <h4 className="text-cyan-400 font-bold text-base mb-4">Connect With Me</h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 hover:-translate-y-1 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/60" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-5">
          <p className="text-slate-500 text-xs">
            © 2026 John Developer. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs">
            Built with{" "}
            <span className="text-cyan-400 font-medium">React</span>
            {" "}& {" "}
            <span className="text-cyan-400 font-medium">Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
}