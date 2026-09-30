import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  category: 'core' | 'skill' | 'career';
  color: string;
  pulsePhase: number;
}

const SKILL_NODES = [
  { label: 'AI & ML', category: 'career' as const, color: '#f97316' },
  { label: 'Data Analyst', category: 'career' as const, color: '#ea580c' },
  { label: 'Software Eng', category: 'career' as const, color: '#fb923c' },
  { label: 'Python', category: 'skill' as const, color: '#38bdf8' },
  { label: 'SQL', category: 'skill' as const, color: '#34d399' },
  { label: 'System Design', category: 'skill' as const, color: '#a78bfa' },
  { label: 'Robotics', category: 'career' as const, color: '#f59e0b' },
  { label: 'Cloud Architecture', category: 'skill' as const, color: '#60a5fa' },
  { label: 'FinTech', category: 'career' as const, color: '#10b981' },
  { label: 'ATS Scanner', category: 'core' as const, color: '#fbbf24' },
  { label: 'Mock Interview', category: 'core' as const, color: '#fb7185' },
];

export const CareerConstellationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize nodes
    const nodes: Node[] = SKILL_NODES.map((item, index) => {
      const angle = (index / SKILL_NODES.length) * Math.PI * 2;
      const distance = Math.min(width, height) * 0.3 + (Math.random() - 0.5) * 60;
      return {
        x: width / 2 + Math.cos(angle) * distance,
        y: height / 2 + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: item.category === 'career' ? 6 : item.category === 'core' ? 5.5 : 4.5,
        label: item.label,
        category: item.category,
        color: item.color,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    // Particle pulses along links
    const pulses: { from: number; to: number; progress: number; speed: number; color: string }[] = [];
    for (let i = 0; i < 7; i++) {
      pulses.push({
        from: Math.floor(Math.random() * nodes.length),
        to: Math.floor(Math.random() * nodes.length),
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
        color: i % 2 === 0 ? '#ea580c' : '#38bdf8',
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onPointerLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mouseleave', onPointerLeave);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep ambient cosmic background glow
      const radialGlow = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, Math.max(width, height) * 0.65);
      radialGlow.addColorStop(0, 'rgba(234, 88, 12, 0.12)');
      radialGlow.addColorStop(0.5, 'rgba(17, 24, 39, 0.6)');
      radialGlow.addColorStop(1, 'rgba(9, 10, 15, 0.95)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Subtle futuristic grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const step = 44;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update node positions with soft bounds
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Gentle central gravitational pull so they stay centered
        const dx = width / 2 - node.x;
        const dy = height / 2 - node.y;
        node.vx += dx * 0.00008;
        node.vy += dy * 0.00008;

        // Mouse repulsion / interaction
        const mdx = node.x - mouseX;
        const mdy = node.y - mouseY;
        const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mouseDist < 120 && mouseDist > 0) {
          const force = (120 - mouseDist) / 120;
          node.x += (mdx / mouseDist) * force * 2;
          node.y += (mdy / mouseDist) * force * 2;
        }

        // Boundary padding
        const pad = 40;
        if (node.x < pad) { node.x = pad; node.vx *= -1; }
        if (node.x > width - pad) { node.x = width - pad; node.vx *= -1; }
        if (node.y < pad) { node.y = pad; node.vy *= -1; }
        if (node.y > height - pad) { node.y = height - pad; node.vy *= -1; }
      });

      // Draw constellation connections
      const maxDist = Math.min(width, height) * 0.38;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(255, 140, 50, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw pulsing data packets travelling on constellation links
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.from = Math.floor(Math.random() * nodes.length);
          pulse.to = Math.floor(Math.random() * nodes.length);
          while (pulse.to === pulse.from) {
            pulse.to = Math.floor(Math.random() * nodes.length);
          }
        }

        const n1 = nodes[pulse.from];
        const n2 = nodes[pulse.to];
        if (!n1 || !n2) return;

        const px = n1.x + (n2.x - n1.x) * pulse.progress;
        const py = n1.y + (n2.y - n1.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes and labels
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 1.5;
        const currentRadius = node.radius + pulse;

        // Outer glow
        const glowGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, currentRadius * 3.5);
        glowGrad.addColorStop(0, node.color);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Node center
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node label
        ctx.font = '500 10.5px "Plus Jakarta Sans", system-ui, sans-serif';
        ctx.fillStyle = 'rgba(243, 244, 246, 0.9)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(node.label, node.x, node.y + currentRadius + 5);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-auto"
    />
  );
};
