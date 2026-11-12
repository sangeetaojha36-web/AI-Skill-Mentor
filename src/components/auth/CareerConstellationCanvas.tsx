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

interface StardustParticle {
  angle: number;
  radiusOffset: number;
  baseRadius: number;
  angularSpeed: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

const SKILL_NODES = [
  { label: 'AI & ML', category: 'career' as const, color: '#CCFF00' },
  { label: 'Data Analytics', category: 'career' as const, color: '#CBD0DC' },
  { label: 'Software Eng', category: 'career' as const, color: '#94979E' },
  { label: 'Python Systems', category: 'skill' as const, color: '#CCFF00' },
  { label: 'SQL Architecture', category: 'skill' as const, color: '#CBD0DC' },
  { label: 'System Design', category: 'skill' as const, color: '#94979E' },
  { label: 'Robotics & IoT', category: 'career' as const, color: '#CCFF00' },
  { label: 'Cloud Systems', category: 'skill' as const, color: '#CBD0DC' },
  { label: 'FinTech', category: 'career' as const, color: '#94979E' },
  { label: 'ATS Engine', category: 'core' as const, color: '#CCFF00' },
  { label: 'Mock Studio', category: 'core' as const, color: '#FFFFFF' },
];

const SOLAR_PALETTE = ['#CCFF00', '#CBD0DC', '#94979E', '#5F636E', '#FFFFFF'];

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
      const distance = Math.min(width, height) * 0.32 + (Math.random() - 0.5) * 60;
      return {
        x: width / 2 + Math.cos(angle) * distance,
        y: height / 2 + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: item.category === 'career' ? 5 : item.category === 'core' ? 4.5 : 3.5,
        label: item.label,
        category: item.category,
        color: item.color,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    // Initialize celestial subtle stardust ring particles
    const stardustCount = 80;
    const stardust: StardustParticle[] = [];
    for (let i = 0; i < stardustCount; i++) {
      stardust.push({
        angle: Math.random() * Math.PI * 2,
        baseRadius: Math.min(width, height) * (0.22 + Math.random() * 0.17),
        radiusOffset: (Math.random() - 0.5) * 55,
        angularSpeed: (0.0008 + Math.random() * 0.0014) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.4 + 0.1,
        twinkleSpeed: 0.015 + Math.random() * 0.025,
        color: SOLAR_PALETTE[Math.floor(Math.random() * SOLAR_PALETTE.length)],
      });
    }

    // Particle pulses along links
    const pulses: { from: number; to: number; progress: number; speed: number; color: string }[] = [];
    for (let i = 0; i < 4; i++) {
      pulses.push({
        from: Math.floor(Math.random() * nodes.length),
        to: Math.floor(Math.random() * nodes.length),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.005,
        color: '#CCFF00',
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
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Deep ember obsidian base
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#1c0803'); // Rich sunset ember core
      bgGrad.addColorStop(0.35, '#120401');
      bgGrad.addColorStop(0.7, '#08090C');
      bgGrad.addColorStop(1, '#000000'); // Pure void black
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Volumetric Solar Bloom (FEC163 -> DE4313)
      const solarBloom = ctx.createRadialGradient(
        width * 0.52,
        height * 0.44,
        15,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.65
      );
      solarBloom.addColorStop(0, 'rgba(204, 255, 0, 0.28)'); // #CCFF00 Solar Gold
      solarBloom.addColorStop(0.4, 'rgba(204, 255, 0, 0.18)'); // #00F0FF Ember Flame
      solarBloom.addColorStop(0.8, 'rgba(120, 25, 4, 0.06)');
      solarBloom.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = solarBloom;
      ctx.fillRect(0, 0, width, height);

      // Top-right secondary solar flare
      const trGlow = ctx.createRadialGradient(width * 0.8, height * 0.2, 5, width * 0.8, height * 0.2, width * 0.5);
      trGlow.addColorStop(0, 'rgba(204, 255, 0, 0.16)');
      trGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = trGlow;
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw celestial solar stardust particles
      stardust.forEach((p) => {
        p.angle += p.angularSpeed;
        const currentRadius = p.baseRadius + p.radiusOffset + Math.sin(time * 2 + p.angle * 3) * 6;
        let px = centerX + Math.cos(p.angle) * currentRadius;
        let py = centerY + Math.sin(p.angle) * currentRadius * 0.9;

        // Subtle mouse push
        const mdx = px - mouseX;
        const mdy = py - mouseY;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (dist < 80 && dist > 0) {
          const force = (80 - dist) / 80;
          px += (mdx / dist) * force * 15;
          py += (mdy / dist) * force * 15;
        }

        const currentAlpha = Math.max(0.18, Math.min(1, p.alpha + Math.sin(time * 3 + p.angle * 5) * 0.32));

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size > 2 ? 8 : 3;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Gentle central gravity
        const dx = centerX - node.x;
        const dy = centerY - node.y;
        node.vx += dx * 0.00006;
        node.vy += dy * 0.00006;

        // Mouse interaction
        const mdx = node.x - mouseX;
        const mdy = node.y - mouseY;
        const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mouseDist < 110 && mouseDist > 0) {
          const force = (110 - mouseDist) / 110;
          node.x += (mdx / mouseDist) * force * 1.8;
          node.y += (mdy / mouseDist) * force * 1.8;
        }

        // Keep inside bounds
        const pad = 35;
        if (node.x < pad) { node.x = pad; node.vx *= -1; }
        if (node.x > width - pad) { node.x = width - pad; node.vx *= -1; }
        if (node.y < pad) { node.y = pad; node.vy *= -1; }
        if (node.y > height - pad) { node.y = height - pad; node.vy *= -1; }
      });

      // Draw constellation links (Warm Solar Ember)
      const maxDist = Math.min(width, height) * 0.36;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.38;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(204, 255, 0, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      }

      // Draw travelling pulses
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
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes and labels
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 2.2 + node.pulsePhase) * 1.3;
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

        // Label
        ctx.font = '500 10.5px system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255, 240, 225, 0.95)';
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
