// frontend/src/components/background/StarField.jsx
// ─────────────────────────────────────────────────
// Animated starfield / nebula background using Canvas.
// Inspired by Samsung Galaxy themes, Apple's space aesthetics,
// and Google's starfield Easter egg.

import { useRef, useEffect, useCallback } from "react";

/**
 * StarField
 * A canvas-rendered starfield with twinkling stars and optional
 * shooting stars. Creates a deep cosmic atmosphere.
 *
 * @param {object}  props
 * @param {number}  props.starCount - number of stars (default 200)
 * @param {boolean} props.shootingStars - enable shooting stars (default true)
 * @param {string}  props.className – extra classes
 */
export default function StarField({
  starCount = 200,
  shootingStars = true,
  className = "",
}) {
  const canvasRef = useRef(null);
  const animId = useRef(null);

  const createStars = useCallback(
    (w, h) =>
      Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.6 + 0.2,
        color:
          Math.random() > 0.7
            ? `163,166,255`   // accent-light
            : Math.random() > 0.5
            ? `172,138,255`   // secondary-light
            : `255,255,255`,  // white
      })),
    [starCount]
  );

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    let dpr = window.devicePixelRatio || 1;
    let stars = [];
    let shooters = [];
    let time = 0;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      cvs.width = cvs.offsetWidth * dpr;
      cvs.height = cvs.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(cvs.offsetWidth, cvs.offsetHeight);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnShooter = (w, h) => ({
      x: Math.random() * w * 0.8,
      y: Math.random() * h * 0.3,
      len: Math.random() * 80 + 40,
      speed: Math.random() * 4 + 3,
      angle: (Math.random() * 0.4 + 0.3) * Math.PI, // ~50–120°
      alpha: 1,
      decay: Math.random() * 0.015 + 0.008,
    });

    const draw = () => {
      const w = cvs.offsetWidth;
      const h = cvs.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.016; // ~60fps

      // ── Draw stars ──
      for (const s of stars) {
        const twinkle =
          s.baseAlpha +
          Math.sin(time * s.twinkleSpeed * 360 + s.twinklePhase) * 0.3;
        const alpha = Math.max(0.05, Math.min(1, twinkle));

        // Outer glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${alpha * 0.08})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${alpha})`;
        ctx.fill();
      }

      // ── Shooting stars ──
      if (shootingStars) {
        // Spawn occasionally
        if (Math.random() < 0.005) {
          shooters.push(spawnShooter(w, h));
        }

        for (let i = shooters.length - 1; i >= 0; i--) {
          const sh = shooters[i];
          const dx = Math.cos(sh.angle) * sh.speed;
          const dy = Math.sin(sh.angle) * sh.speed;
          sh.x += dx;
          sh.y += dy;
          sh.alpha -= sh.decay;

          if (sh.alpha <= 0 || sh.x > w + 100 || sh.y > h + 100) {
            shooters.splice(i, 1);
            continue;
          }

          const tailX = sh.x - Math.cos(sh.angle) * sh.len;
          const tailY = sh.y - Math.sin(sh.angle) * sh.len;

          const grad = ctx.createLinearGradient(tailX, tailY, sh.x, sh.y);
          grad.addColorStop(0, `rgba(163,166,255,0)`);
          grad.addColorStop(0.6, `rgba(163,166,255,${sh.alpha * 0.4})`);
          grad.addColorStop(1, `rgba(255,255,255,${sh.alpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(sh.x, sh.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          ctx.stroke();

          // Head glow
          ctx.beginPath();
          ctx.arc(sh.x, sh.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${sh.alpha})`;
          ctx.fill();
        }
      }

      animId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId.current);
    };
  }, [createStars, shootingStars]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full -z-10 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
