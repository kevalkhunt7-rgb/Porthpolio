import { useEffect, useRef, useState } from "react";

const contactInfo = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "kevalkhunt7@gmail.com",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 9106550601",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Location",
    value: "Surat, Gujarat",
    gradient: "from-cyan-500 to-purple-600",
  },
];

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[#0d0f1a] relative overflow-hidden py-16 sm:py-20 px-5 sm:px-8 md:px-14 lg:px-24"
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { opacity: 0; }
        .fade-up.visible { animation: fadeUp 0.65s ease both; }

        .input-field {
          background: rgba(18, 21, 42, 0.8);
          border: 1px solid rgba(51, 65, 85, 0.6);
          color: #e2e8f0;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          outline: none;
          width: 100%;
          border-radius: 0.5rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
        }
        .input-field::placeholder { color: #475569; }
        .input-field:focus {
          border-color: rgba(34, 211, 238, 0.5);
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.08);
        }
      `}</style>

      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-[500px] h-24 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-56 sm:w-72 h-56 sm:h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <div
          className={`fade-up text-center mb-4 ${visible ? "visible" : ""}`}
          style={{ animationDelay: "0ms" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Get In{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
        </div>

        <p
          className={`fade-up text-center text-slate-400 text-sm max-w-md mx-auto mb-10 sm:mb-12 leading-relaxed px-2 ${visible ? "visible" : ""}`}
          style={{ animationDelay: "80ms" }}
        >
          Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.
        </p>

        {/* Two-column layout — stacks on mobile, side-by-side on lg */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">

          {/* Left — Contact Info + Let's Work Together */}
          <div className="flex flex-col gap-4 sm:gap-5 w-full lg:w-2/5">

            {/* Contact Information */}
            <div
              className={`fade-up ${visible ? "visible" : ""}`}
              style={{ animationDelay: "160ms" }}
            >
              <h3 className="text-cyan-400 font-bold text-base mb-3 sm:mb-4">Contact Information</h3>

              {/* On sm screens, show info cards in a 1-col list; on md+ they can breathe more */}
              <div className="flex flex-col gap-3">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-700/50 bg-[#12152a]/60 hover:border-slate-600 transition-colors duration-200"
                  >
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white flex-shrink-0`}>
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-500 text-xs mb-0.5">{info.label}</p>
                      <p className="text-slate-300 text-sm truncate">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Let's Work Together */}
            <div
              className={`fade-up rounded-xl border border-cyan-500/20 bg-[#12152a]/60 p-4 sm:p-5 ${visible ? "visible" : ""}`}
              style={{ animationDelay: "300ms" }}
            >
              <h4 className="text-cyan-400 font-bold text-sm mb-2">Let's Work Together</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                I'm currently available for freelance work and full-time opportunities. If you have a project that you want to get started or think you need my help with something, then get in touch.
              </p>
              <p className="mt-3 flex items-center gap-2 text-cyan-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block flex-shrink-0" />
                Available for new projects
              </p>
            </div>

          </div>

          {/* Right — Contact Form */}
          <div
            className={`fade-up flex-1 flex flex-col gap-3 sm:gap-4 ${visible ? "visible" : ""}`}
            style={{ animationDelay: "240ms" }}
          >
            {/* Name + Email side-by-side on sm and up */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="input-field"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-slate-300 text-sm mb-1.5">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project Inquiry"
                className="input-field"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-slate-300 text-sm mb-1.5">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                className="input-field resize-none"
              />
            </div>

            {/* Submit */}
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,0.2)] mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Message
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}