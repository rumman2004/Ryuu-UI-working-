// frontend/src/components/background/NeuralNetwork.jsx
// ────────────────────────────────────────────────────
// Animated neural network / node-graph background using SVG.
// Inspired by Google AI landing pages, DeepMind visuals,
// and Samsung AI features promos.

import { useRef, useEffect, useState, useCallback } from "react";

/**
 * NeuralNetwork
 * Renders a pulsing, breathing node-graph network using SVG.
 * Nodes are connected by animated edges with traveling pulses.
 *
 * @param {object}  props
 * @param {number}  props.nodeCount – total nodes (default 30)
 * @param {boolean} props.contained – absolute vs fixed
 * @param {string}  props.className – extra classes
 */
export default function NeuralNetwork({
  nodeCount = 30,
  contained = false,
  className = "",
}) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const update = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDimensions({ w: rect.width || 1440, h: rect.height || 900 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const generateNodes = useCallback(() => {
    const { w, h } = dimensions;
    return Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * w * 0.9 + w * 0.05,
      y: Math.random() * h * 0.9 + h * 0.05,
      r: Math.random() * 3 + 1.5,
      pulseDelay: Math.random() * 5,
      color:
        i % 3 === 0
          ? "99,102,241"
          : i % 3 === 1
          ? "139,92,246"
          : "6,182,212",
    }));
  }, [nodeCount, dimensions]);

  const [nodes] = useState(generateNodes);

  // Build edges (connect nearby nodes)
  const maxDist = Math.min(dimensions.w, dimensions.h) * 0.25;
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        edges.push({
          x1: nodes[i].x,
          y1: nodes[i].y,
          x2: nodes[j].x,
          y2: nodes[j].y,
          dist,
          color: nodes[i].color,
          delay: Math.random() * 6,
        });
      }
    }
  }

  return (
    <div
      className={`${contained ? "absolute" : "fixed"} inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Pulse animation for edges */}
          <style>{`
            @keyframes nn-pulse {
              0%, 100% { stroke-opacity: 0.04; }
              50% { stroke-opacity: 0.15; }
            }
            @keyframes nn-node-pulse {
              0%, 100% { r: var(--base-r); opacity: 0.3; }
              50% { r: calc(var(--base-r) * 1.8); opacity: 0.7; }
            }
            @keyframes nn-travel {
              0% { offset-distance: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { offset-distance: 100%; opacity: 0; }
            }
            .nn-edge {
              animation: nn-pulse 4s ease-in-out infinite;
            }
          `}</style>
        </defs>

        {/* Edges */}
        {edges.map((e, i) => (
          <line
            key={`e-${i}`}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke={`rgba(${e.color},0.08)`}
            strokeWidth="0.5"
            className="nn-edge"
            style={{ animationDelay: `${e.delay}s` }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            {/* Outer glow */}
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r * 4}
              fill={`rgba(${n.color},0.04)`}
            >
              <animate
                attributeName="r"
                values={`${n.r * 3};${n.r * 6};${n.r * 3}`}
                dur="5s"
                begin={`${n.pulseDelay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0.6;0.3"
                dur="5s"
                begin={`${n.pulseDelay}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* Core dot */}
            <circle cx={n.x} cy={n.y} r={n.r} fill={`rgba(${n.color},0.6)`}>
              <animate
                attributeName="opacity"
                values="0.4;0.9;0.4"
                dur="4s"
                begin={`${n.pulseDelay}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.08), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
