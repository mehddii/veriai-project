import { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

interface NodeDot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isPulse: boolean;
  pulsePhase: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useApp();
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const nodes: NodeDot[] = [];
    const NODE_COUNT = 65;
    const PULSE_COUNT = 12;
    const MAX_DIST = 170;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < NODE_COUNT; i++) {
      const isPulse = i < PULSE_COUNT;
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: isPulse ? Math.random() * 0.8 + 2 : Math.random() * 1 + 1,
        isPulse,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = isDarkRef.current;
      if (!dark) {
        animId = requestAnimationFrame(draw);
        return;
      }
      time += 0.016;

      // Draw connections first (behind nodes)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.06;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -10 || node.x > canvas.width + 10) node.vx *= -1;
        if (node.y < -10 || node.y > canvas.height + 10) node.vy *= -1;

        let fillAlpha: number;
        let r: number, g: number, b: number;

        if (node.isPulse) {
          const pulse = 0.5 + 0.5 * Math.sin(time * 2.5 + node.pulsePhase);
          r = 139; g = 92; b = 246;
          fillAlpha = 0.15 + pulse * 0.12;
          // Glow for pulse nodes
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${fillAlpha * 0.15})`;
          ctx.fill();
        } else {
          r = 99; g = 102; b = 241;
          fillAlpha = 0.15;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${fillAlpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
