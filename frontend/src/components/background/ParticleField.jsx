// frontend/src/components/background/ParticleField.jsx
// ─────────────────────────────────────────────────────
// Interactive particle field using HTML Canvas.
// Particles react to mouse proximity — inspired by Google I/O,
// GitHub Universe, and Linear's hero backgrounds.

import { useRef, useEffect, useCallback } from "react";

const PALETTE = [
  "99,102,241",  // indigo-500
  "139,92,246",  // violet-500
  "6,182,212",   // cyan-500
  "192,193,255", // accent-light
  "236,72,153",  // pink-500
];

/**
 * ParticleField
 * @param {object}  props
 * @param {number}  props.particleCount – total particles (default 90)
 * @param {number}  props.connectionRadius – link distance in px (default 140)
 * @param {boolean} props.interactive – react to mouse (default true)
 * @param {string}  props.className – extra classes
 */
export default function ParticleField({
  particleCount = 90,
  connectionRadius = 140,
  interactive = true,
  className = "",
}) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animId = useRef(null);

  const createParticles = useCallback(
    (w, h) =>
      Array.from({ length: particleCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 0.8,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha: Math.random() * 0.5 + 0.15,
      })),
    [particleCount]
  );

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      cvs.width = cvs.offsetWidth * dpr;
      cvs.height = cvs.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.current = createParticles(cvs.offsetWidth, cvs.offsetHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e) => {
      const rect = cvs.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    if (interactive) {
      cvs.addEventListener("mousemove", handleMouse);
      cvs.addEventListener("mouseleave", handleLeave);
    }

    const draw = () => {
      const w = cvs.offsetWidth;
      const h = cvs.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const pts = particles.current;

      // Move & draw particles
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse repel
        if (interactive) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const f = (120 - dist) / 120 * 0.015;
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }

        // Dampen velocity
        p.vx *= 0.998;
        p.vy *= 0.998;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      }

      // Connection lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionRadius) {
            const opacity = (1 - dist / connectionRadius) * 0.12;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${pts[i].color},${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (interactive) {
        cvs.removeEventListener("mousemove", handleMouse);
        cvs.removeEventListener("mouseleave", handleLeave);
      }
      cancelAnimationFrame(animId.current);
    };
  }, [createParticles, connectionRadius, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full -z-10 pointer-events-auto ${className}`}
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}
