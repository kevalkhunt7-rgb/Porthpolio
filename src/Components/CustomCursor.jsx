import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const cursorX = useSpring(mouseX, { damping: 28, stiffness: 500, mass: 0.4 });
  const cursorY = useSpring(mouseY, { damping: 28, stiffness: 500, mass: 0.4 });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsHovered(window.getComputedStyle(e.target).cursor === 'pointer');
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.3; }
          94% { opacity: 1; }
          96% { opacity: 0.5; }
          97% { opacity: 1; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        @keyframes rgb-shift {
          0%,100% { text-shadow: -3px 0 #ff003c, 3px 0 #00fff9; }
          25%     { text-shadow:  3px 0 #ff003c,-3px 0 #00fff9; }
          50%     { text-shadow: -2px 0 #00fff9, 2px 0 #ff003c; }
          75%     { text-shadow:  2px 0 #00fff9,-2px 0 #ff003c; }
        }
        @keyframes glitch-1 {
          0%,90%,100% { clip-path: none; transform: translate(0); }
          91% { clip-path: polygon(0 20%,100% 20%,100% 40%,0 40%); transform: translate(-4px, 1px); }
          93% { clip-path: polygon(0 60%,100% 60%,100% 80%,0 80%); transform: translate( 4px,-1px); }
          95% { clip-path: polygon(0 10%,100% 10%,100% 30%,0 30%); transform: translate(-2px, 0);  }
        }
        @keyframes glitch-2 {
          0%,88%,100% { clip-path: none; transform: translate(0); opacity: 0; }
          89% { clip-path: polygon(0 40%,100% 40%,100% 60%,0 60%); transform: translate( 5px, 0); opacity:.7; color:#ff003c; }
          91% { clip-path: polygon(0 70%,100% 70%,100% 90%,0 90%); transform: translate(-5px, 1px); opacity:.7; color:#00fff9; }
          93% { opacity: 0; }
        }
        @keyframes blink-caret {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }

        .code-symbol {
          font-family: 'Courier New', monospace;
          font-weight: 900;
          font-size: 26px;
          letter-spacing: -3px;
          color: #00fff9;
          position: relative;
          display: block;
          line-height: 1;
          white-space: nowrap;
          animation: flicker 4s infinite, rgb-shift 0.8s infinite;
        }
        .code-symbol::before {
          content: '</>';
          position: absolute;
          inset: 0;
          color: #00fff9;
          animation: glitch-1 4s infinite;
        }
        .code-symbol::after {
          content: '</>';
          position: absolute;
          inset: 0;
          animation: glitch-2 4s infinite;
        }
        .scanline {
          position: absolute;
          inset-inline: -6px;
          height: 4px;
          background: linear-gradient(transparent, rgba(0,255,249,0.45), transparent);
          animation: scanline 1.2s linear infinite;
          pointer-events: none;
        }
        .terminal-caret {
          display: inline-block;
          width: 13px;
          height: 22px;
          background: #39ff14;
          box-shadow: 0 0 10px #39ff14, 0 0 24px #39ff14;
          animation: blink-caret 0.7s step-end infinite;
        }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: isClicking ? 0.75 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {!isHovered ? (
            /* ── DEFAULT: glitchy </> ── */
            <motion.div
              key="code"
              initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
              animate={{ opacity: 1, scale: 1,   rotate: 0   }}
              exit={{    opacity: 0, scale: 0.4, rotate:  20 }}
              transition={{ duration: 0.15 }}
              className="relative overflow-hidden px-1.5 py-0.5"
            >
              <span className="code-symbol">&lt;/&gt;</span>
              <div className="scanline" />
            </motion.div>
          ) : (
            /* ── HOVER: terminal prompt ── */
            <motion.div
              key="terminal"
              initial={{ opacity: 0, scale: 0.4, y: 8  }}
              animate={{ opacity: 1, scale: 1,   y: 0  }}
              exit={{    opacity: 0, scale: 0.4, y: -8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1"
            >
              <span
                className="font-mono font-bold text-2xl tracking-tight"
                style={{ color: '#39ff14', textShadow: '0 0 10px #39ff14, 0 0 24px #39ff14' }}
              >
                $
              </span>
              <span
                className="font-mono font-bold text-xl opacity-60"
                style={{ color: '#39ff14', textShadow: '0 0 8px #39ff14' }}
              >
                _
              </span>
              <div className="terminal-caret" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;