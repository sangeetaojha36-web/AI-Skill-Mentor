import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  ArrowRight,
  ArrowUpRight,
  FileCheck2,
  Target,
  Compass,
  GraduationCap,
  Video,
  CheckCircle2,
  Award,
  Code2,
  Shield,
  Bot,
  FileText,
  Sparkles,
  ChevronDown,
  Layers,
  Terminal,
  Activity,
  Cpu,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sliders,
  Check,
  Zap,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageViewProps {
  onOpenAuth: (isLogin: boolean, isAdmin?: boolean) => void;
  onStartGuestPreview?: () => void;
}

// =========================================================================
// ASSET PATHS (Verified Local High-Resolution Generated Images)
// =========================================================================
const IMAGES = {
  hero: '/src/assets/images/hero_cinematic_career_constellation_1794476570452.jpg',
  software: '/src/assets/images/showcase_software_engineer_workspace_1794476571794.jpg',
  analytics: '/src/assets/images/showcase_data_analytics_intelligence_1794476572127.jpg',
  greenroom: '/src/assets/images/showcase_greenroom_interview_studio_1794476572462.jpg',
};

// =========================================================================
// CORE CONTRACT DATA - Preserved from existing implementation
// =========================================================================
const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Register & Upload Resume',
    subtitle: 'Neural Document Ingestion',
    desc: 'Instant optical and semantic parsing for PDF, DOCX, and high-res image resumes. Extracts academic history, projects, and tech stack.',
    badge: 'Step 1',
    metric: '99.4% Parsing Accuracy',
    highlight: 'Auto-detects branch, CGPA & verified credentials',
    icon: FileText,
    image: IMAGES.hero,
  },
  {
    step: '02',
    title: 'AI Resume Analysis & ATS Score',
    subtitle: 'Corporate Cutoff Calibration',
    desc: 'Neural scanner audits your resume against Fortune 500 ATS algorithms, flagging missing gatekeeper keywords and formatting issues.',
    badge: 'Step 2',
    metric: 'Average 88% ATS Score',
    highlight: 'Quantified bullet improvements using STAR method',
    icon: FileCheck2,
    image: IMAGES.software,
  },
  {
    step: '03',
    title: 'Skill Gaps Are Identified',
    subtitle: 'Competitive Gap Matrix',
    desc: 'Benchmark your real capabilities against Tier-1 and Day-1 hiring requirements. Isolates high-priority technical gaps before campus drives.',
    badge: 'Step 3',
    metric: '24+ Industry Benchmarks',
    highlight: 'Identifies gatekeeper skills that trigger auto-rejects',
    icon: Target,
    image: IMAGES.analytics,
  },
  {
    step: '04',
    title: 'Personalized Roadmap Is Generated',
    subtitle: 'Adaptive Milestone Curriculum',
    desc: 'Generates a custom week-by-week placement syllabus tuned to your target role, graduation timeline, and existing competencies.',
    badge: 'Step 4',
    metric: '4 to 12 Week Roadmaps',
    highlight: 'Prioritizes highest-ROI placement topics first',
    icon: Compass,
    image: IMAGES.software,
  },
  {
    step: '05',
    title: 'AI Recommends Courses & Projects',
    subtitle: 'Verified Proof-of-Work Engines',
    desc: 'Access targeted video modules from GFG, Coursera, NPTEL and step-by-step GitHub capstone blueprints that impress senior engineers.',
    badge: 'Step 5',
    metric: '180+ Curated Blueprints',
    highlight: 'Deployable production repositories with live demos',
    icon: GraduationCap,
    image: IMAGES.analytics,
  },
  {
    step: '06',
    title: 'Mock Interview & Progress Tracking',
    subtitle: 'Greenroom Speech AI & Analytics',
    desc: 'Rehearse real technical rounds with live speech AI, eye-contact detection, and instant STAR scoring to ensure Day-1 readiness.',
    badge: 'Step 6',
    metric: '3.4x Higher Shortlist Rate',
    highlight: 'Real-time speech pacing & confidence telemetry',
    icon: Video,
    image: IMAGES.greenroom,
  },
];

const DISCIPLINE_TRACKS = [
  {
    id: 'mech',
    name: 'Mechanical Engineering',
    role: 'Autonomous Systems & EV Robotics',
    salary: '₹8.5 - 18.0 LPA',
    demand: 'High Demand in Auto Tech',
    skills: ['ROS2 & Python', 'SolidWorks FEA', 'MATLAB/Simulink', 'CAN Protocol'],
    personaKey: 'rohan' as const,
  },
  {
    id: 'cse',
    name: 'Computer Science & IT',
    role: 'Full Stack & AI Systems Engineer',
    salary: '₹12.0 - 32.0 LPA',
    demand: 'Super High in SaaS & Cloud',
    skills: ['Distributed Systems', 'TypeScript & React', 'System Design', 'PostgreSQL'],
    personaKey: 'ananya' as const,
  },
  {
    id: 'ece',
    name: 'Electronics & Comm (ECE)',
    role: 'VLSI & Embedded Firmware Engineer',
    salary: '₹10.0 - 24.0 LPA',
    demand: 'Surging in Semiconductor',
    skills: ['Embedded C / C++', 'Verilog / FPGA', 'RTOS', 'ARM Architecture'],
    personaKey: 'rohan' as const,
  },
  {
    id: 'biotech',
    name: 'Biotechnology & Pharma',
    role: 'Bioinformatics & Computational Biology',
    salary: '₹7.5 - 16.0 LPA',
    demand: 'Growing in Genomics',
    skills: ['Python BioPy', 'Nextflow / Genomics', 'R Statistics', 'Molecular Docking'],
    personaKey: 'ananya' as const,
  },
  {
    id: 'civil',
    name: 'Civil & Infrastructure',
    role: 'Smart BIM & Structural Simulation',
    salary: '₹6.5 - 14.5 LPA',
    demand: 'High in Metro & Infra',
    skills: ['Revit BIM', 'ETABS Analysis', 'Python Geospatial', 'Project Planning'],
    personaKey: 'rohan' as const,
  },
  {
    id: 'commerce',
    name: 'Finance & Analytics',
    role: 'FinTech Quant & Business Analyst',
    salary: '₹9.0 - 22.0 LPA',
    demand: 'High in BFSI & Banking',
    skills: ['SQL Window Functions', 'Power BI / Tableau', 'Financial Modeling', 'Python Pandas'],
    personaKey: 'ananya' as const,
  },
];

const FAQS = [
  {
    q: 'How does the AI Resume Analyzer differ from generic checker tools?',
    a: 'Generic checkers only count keywords. Our engine runs an optical and semantic audit trained on real hiring rubrics from top IT, FinTech, and Engineering recruiters, giving you actionable STAR sentence rewrites and quantifiable impact metrics.',
  },
  {
    q: 'Can non-CS students (Mechanical, Civil, Biotech) use this for high-paying roles?',
    a: 'Yes. SkillBridge AI features dedicated pathways for core branches transitioning into high-growth interdisciplinary roles like Autonomous Robotics, BIM Automation, Bioinformatics, and Quant Analytics, bridging the skill gap with targeted milestone roadmaps.',
  },
  {
    q: 'How does the Greenroom Mock Interview Studio evaluate answers?',
    a: 'The Greenroom analyzes your microphone input and optional camera feed for verbal delivery, speech pace (WPM), filler word density, and STAR structuring. You receive immediate score breakdowns and benchmark comparisons.',
  },
  {
    q: 'Are the recommended capstone projects verified by real recruiters?',
    a: 'Yes. Every project includes architectural blueprints, sample GitHub repositories, schemas, and live deployment checklists designed specifically to prove real-world production capability during campus technical rounds.',
  },
];

// Interactive ATS candidate profiles for instant testing
const ATS_CANDIDATE_SAMPLES = [
  {
    id: 'ananya',
    name: 'Ananya Verma',
    target: 'Backend / Systems Engineer (Tier 1)',
    initialScore: 54,
    finalScore: 92,
    bulletOld: 'Built a backend web API for an e-commerce platform using Node and MongoDB.',
    bulletNew: 'Architected distributed Redis-backed ingestion API handling 4.2k req/sec with <45ms p99 latency.',
    detectedKeywords: ['Distributed Systems', 'Redis Caching', 'PostgreSQL', 'Docker', 'Async Microservices'],
    missingBefore: ['Horizontal Scale Proof', 'P99 Latency Metrics', 'Load Balancing'],
  },
  {
    id: 'rohan',
    name: 'Rohan Sharma',
    target: 'Robotics & Embedded Systems',
    initialScore: 48,
    finalScore: 89,
    bulletOld: 'Worked on robotic car project using Arduino and ultrasonic sensors for obstacle avoidance.',
    bulletNew: 'Engineered ROS2 autonomous navigation stack with LiDAR SLAM on NVIDIA Jetson, achieving 18Hz loop rate.',
    detectedKeywords: ['ROS2 Galactic', 'C++17', 'LiDAR SLAM', 'CAN Bus Protocol', 'PID Motor Control'],
    missingBefore: ['Hardware Latency Benchmarks', 'Firmware State Machines', 'RTOS'],
  },
  {
    id: 'kunal',
    name: 'Kunal Patel',
    target: 'BIM Automation & Structural Infra',
    initialScore: 51,
    finalScore: 87,
    bulletOld: 'Assisted in structural drawing and drafting using AutoCAD software.',
    bulletNew: 'Automated Revit BIM parameter validation scripts in Python, eliminating 60+ clashes across 14-story MEP model.',
    detectedKeywords: ['Autodesk Revit BIM', 'Dynamo Python', 'ETABS Analysis', 'Geospatial GIS', 'Clash Detection'],
    missingBefore: ['Parametric Scripting', 'Structural Code Compliance', 'Version Control'],
  },
];

export function LandingPageView({
  onOpenAuth,
  onStartGuestPreview,
}: LandingPageViewProps) {
  // State variables - 100% logic preservation
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  const [selectedDiscipline, setSelectedDiscipline] = useState(DISCIPLINE_TRACKS[0]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activePreviewTab, setActivePreviewTab] = useState<'ats' | 'roadmap' | 'greenroom'>('ats');

  // Interactive ATS Scanner Simulator state
  const [selectedCandidate, setSelectedCandidate] = useState(ATS_CANDIDATE_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [currentScore, setCurrentScore] = useState(ATS_CANDIDATE_SAMPLES[0].finalScore);
  const [scanStep, setScanStep] = useState(2); // 0: ready, 1: scanning, 2: completed

  // Interactive Placement Calculator state
  const [selectedBranch, setSelectedBranch] = useState('CSE / IT');
  const [cgpaValue, setCgpaValue] = useState(8.2);

  // Audio Synth Toggle (Tactile Micro-Interactions)
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // DOM Refs
  const rootRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterOffersRef = useRef<HTMLSpanElement>(null);
  const counterAtsRef = useRef<HTMLSpanElement>(null);
  const counterTracksRef = useRef<HTMLSpanElement>(null);

  // Synthesize clean harmonic clicks / chimes without external audio files
  const playSound = (freq = 600, duration = 0.05, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (_) {}
  };

  // Run simulated laser ATS scan
  const triggerScanSimulation = (cand = selectedCandidate) => {
    setIsScanning(true);
    setScanStep(1);
    setCurrentScore(cand.initialScore);
    playSound(440, 0.1, 'sine');

    let current = cand.initialScore;
    const interval = setInterval(() => {
      current += 2;
      if (current >= cand.finalScore) {
        current = cand.finalScore;
        clearInterval(interval);
        setIsScanning(false);
        setScanStep(2);
        playSound(880, 0.25, 'triangle');
      }
      setCurrentScore(current);
    }, 45);
  };

  // Switch candidate and re-run scan
  const handleSelectCandidate = (cand: typeof ATS_CANDIDATE_SAMPLES[0]) => {
    setSelectedCandidate(cand);
    triggerScanSimulation(cand);
  };

  // Smooth Scrolling with Lenis + ScrollTrigger Sync
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Real-Time Interactive Particle Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 800;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(65, Math.floor(width / 22));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.6 + 0.8,
      baseAlpha: Math.random() * 0.4 + 0.2,
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(204, 255, 0, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Subtle attraction to cursor
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (1 - dist / 140) * 0.4;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dist / 140) * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = dist < 140 ? '#00F0FF' : `rgba(204, 255, 0, ${p.baseAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Card Mouse Spotlight & 3D Tilt Coordinates
  useEffect(() => {
    const handleCardMouse = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>('.spotlight-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleCardMouse);
    return () => window.removeEventListener('mousemove', handleCardMouse);
  }, []);

  // Custom Magnetic Cursor Logic
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const label = cursorLabelRef.current;
    if (!dot || !ring) return;

    const quickDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const quickDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    const quickRingX = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power3' });
    const quickRingY = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power3' });

    const handlePointerMove = (e: MouseEvent) => {
      quickDotX(e.clientX);
      quickDotY(e.clientY);
      quickRingX(e.clientX);
      quickRingY(e.clientY);
    };

    const handleInteractiveEnter = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      const cursorType = target?.getAttribute('data-cursor') || 'VIEW';
      gsap.to(ring, {
        scale: 2.2,
        backgroundColor: 'rgba(204, 255, 0, 0.12)',
        borderColor: '#CCFF00',
        duration: 0.25,
      });
      if (label) {
        label.textContent = cursorType;
        gsap.to(label, { opacity: 1, duration: 0.2 });
      }
    };

    const handleInteractiveLeave = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        duration: 0.25,
      });
      if (label) {
        gsap.to(label, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    const interactives = document.querySelectorAll('button, a, input, select, .interactive-hover');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleInteractiveEnter as EventListener);
      el.addEventListener('mouseleave', handleInteractiveLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleInteractiveEnter as EventListener);
        el.removeEventListener('mouseleave', handleInteractiveLeave);
      });
    };
  }, []);

  // GSAP Animations (Hero line reveal, Counters, Progress bar)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll Progress Bar
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.1,
          },
        });
      }

      // 2. Hero Headline Stagger Reveal
      gsap.fromTo(
        '.hero-line-inner',
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.1,
        }
      );

      // 3. Viewport Animated Number Counters
      const setupCounter = (
        targetRef: React.RefObject<HTMLSpanElement | null>,
        endVal: number,
        prefix = '',
        suffix = ''
      ) => {
        if (!targetRef.current) return;
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: targetRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: endVal,
              duration: 2.2,
              ease: 'power3.out',
              onUpdate: () => {
                if (targetRef.current) {
                  targetRef.current.textContent = `${prefix}${Math.floor(obj.val).toLocaleString()}${suffix}`;
                }
              },
            });
          },
        });
      };

      setupCounter(counterOffersRef, 12400, '', '+');
      setupCounter(counterAtsRef, 88, '', '%');
      setupCounter(counterTracksRef, 24, '', '+');
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Dynamic calculations for the Placement Velocity Calculator
  const projectedLPA = React.useMemo(() => {
    const base = selectedBranch.includes('CSE') ? 16 : selectedBranch.includes('ECE') ? 13 : 10;
    const factor = Math.max(0, (cgpaValue - 6.0) * 4.2);
    const low = Math.round((base + factor * 0.8) * 10) / 10;
    const high = Math.round((base + factor * 1.5 + 4) * 10) / 10;
    return `₹${low} - ${high} LPA`;
  }, [selectedBranch, cgpaValue]);

  const shortlistProb = React.useMemo(() => {
    const base = cgpaValue >= 8.5 ? 94 : cgpaValue >= 7.5 ? 86 : 72;
    return Math.min(99, base);
  }, [cgpaValue]);

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen bg-[#08090C] text-[#F3F4F6] selection:bg-[#CCFF00] selection:text-[#08090C] overflow-hidden"
    >
      {/* Hairline Top Scroll Progress Indicator */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#CCFF00] origin-left z-50 pointer-events-none"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Custom Desktop Magnetic Cursor Follower */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#CCFF00] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/30 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 hidden lg:flex items-center justify-center"
      >
        <span
          ref={cursorLabelRef}
          className="text-[8px] font-mono tracking-widest text-[#CCFF00] uppercase opacity-0 font-bold"
        >
          VIEW
        </span>
      </div>

      {/* TOP BAR CONTRACT: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (Sound & Primary CTA) */}
      <header className="sticky top-0 z-40 bg-[#08090C]/85 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 font-display flex items-center gap-3"
            data-cursor="HOME"
          >
            <span className="w-2.5 h-2.5 rounded-sm bg-[#CCFF00]" />
            <span>SKILLBRIDGE AI</span>
            <span className="text-xs text-neutral-400 font-mono hidden sm:inline">· CAMPUS ARCHITECTURE</span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <a
              href="#pipeline"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
              data-cursor="GO"
            >
              Pipeline
            </a>
            <a
              href="#simulator"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
              data-cursor="SCAN"
            >
              ATS Simulator
            </a>
            <a
              href="#disciplines"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
              data-cursor="RADAR"
            >
              Discipline Radar
            </a>
            <a
              href="#calculator"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
              data-cursor="MATH"
            >
              CTC Calculator
            </a>
            <a
              href="#faq"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
              data-cursor="HELP"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Sound switch */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Tactile Web Audio Synth Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playSound(880, 0.15, 'triangle');
              }}
              title={soundEnabled ? 'Mute sound effects' : 'Enable tactile audio feedback'}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 hover:border-white/20 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
              data-cursor="AUDIO"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span className="text-[11px] text-[#CCFF00]">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="text-[11px] text-neutral-500">AUDIO OFF</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                playSound(540, 0.08);
                onOpenAuth(true);
              }}
              className="hidden sm:inline-block text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-colors whitespace-nowrap shrink-0 px-3 py-2"
              data-cursor="AUTH"
            >
              Sign In
            </button>

            <button
              onClick={() => {
                playSound(720, 0.12);
                onOpenAuth(false);
              }}
              className="px-5 py-2.5 rounded-lg bg-[#CCFF00] text-[#08090C] text-xs font-bold font-mono uppercase tracking-wider hover:bg-[#b8e600] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 flex items-center gap-2 shadow-lg shadow-[#CCFF00]/10"
              data-cursor="START"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 1: HERO VIEWPORT (Awwwards 16:9 Split with Real-Time Canvas)
         ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center border-b border-white/[0.08] overflow-hidden">
        {/* Interactive Neural Constellation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
        />

        {/* Ambient Radial Mesh Behind Headline */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#CCFF00]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00F0FF]/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column (Editorial Typography & Primary Claim) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Unboxed Chapter Lead */}
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-6">
                <span>01</span>
                <span aria-hidden="true">·</span>
                <span>The Algorithmic Campus Placement Engine</span>
              </div>

              {/* Fluid Masked Headline */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold font-display tracking-tight text-white leading-[1.05] mb-6">
                <span className="char-mask block">
                  <span className="hero-line-inner block">THE ARCHITECTURE</span>
                </span>
                <span className="char-mask block">
                  <span className="hero-line-inner block text-neutral-300">
                    OF TIER-1 CAMPUS
                  </span>
                </span>
                <span className="char-mask block">
                  <span className="hero-line-inner block text-[#CCFF00]">
                    OFFERS & VELOCITY.
                  </span>
                </span>
              </h1>

              {/* Concrete Value Proposition (Anti-Slop Prose) */}
              <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed mb-8">
                Engineered for engineering students across Computer Science, Robotics,
                VLSI, and Civil. Connect your resume to real corporate cutoffs: instant
                optical ATS scoring, gap isolation, adaptive roadmaps, and speech AI mock interviews.
              </p>

              {/* Primary Decision Block */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  onClick={() => {
                    playSound(800, 0.1);
                    onOpenAuth(false);
                  }}
                  className="px-8 py-4 rounded-lg bg-[#CCFF00] text-[#08090C] text-sm font-bold font-mono uppercase tracking-wider hover:bg-[#b8e600] active:scale-[0.98] transition-all flex items-center gap-3 shadow-xl shadow-[#CCFF00]/15"
                  data-cursor="JOIN"
                >
                  <span>Claim Placement Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#simulator"
                  onClick={() => playSound(480, 0.05)}
                  className="px-6 py-4 rounded-lg border border-white/15 hover:border-white/30 text-white text-sm font-mono tracking-wider transition-colors flex items-center gap-2"
                  data-cursor="SIM"
                >
                  <span>Test ATS Simulator</span>
                  <ArrowUpRight className="w-4 h-4 text-[#CCFF00]" />
                </a>
              </div>

              {/* Adjacent Quantitative Proof Strip */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.08] max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white font-tech tabular-nums">
                    <span ref={counterOffersRef}>12,400+</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mt-1">Offers Secured</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#CCFF00] font-tech tabular-nums">
                    <span ref={counterAtsRef}>88%</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mt-1">Avg ATS Score</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white font-tech tabular-nums">
                    <span ref={counterTracksRef}>24+</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mt-1">Target Roles</div>
                </div>
              </div>
            </div>

            {/* Right Column (Hero Visual Anchor with Live Hologram HUD) */}
            <div className="lg:col-span-5 relative">
              <div className="spotlight-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative group">
                <img
                  src={IMAGES.hero}
                  alt="Engineering student surveying future career constellations"
                  referrerPolicy="no-referrer"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Measured Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-transparent opacity-80" />

                {/* Floating Telemetry Glass Cards */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-neutral-300 bg-[#08090C]/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                    <span>NEURAL AUDIT ENGINE</span>
                  </div>
                  <span className="text-[#CCFF00]">CALIBRATED 2026</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#08090C]/90 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-neutral-400 uppercase">
                      Direct Benchmark Match
                    </span>
                    <span className="text-xs font-mono text-[#CCFF00] font-bold">
                      94.2% FIT
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#CCFF00] h-full w-[94%]" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mt-2">
                    <span>Google L4 · Microsoft SDE · Ather Robotics</span>
                    <span className="text-white">Day-1 Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kinetic Placement Proof Marquee */}
      <div className="border-b border-white/[0.08] bg-[#0E1015]/60 py-3 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-xs font-mono text-neutral-400 tracking-wider">
          <span>GOOGLE TIER-1 OFFERS: ₹32 LPA</span>
          <span className="text-[#CCFF00]">·</span>
          <span>MICROSOFT CORE SYSTEMS: ₹28 LPA</span>
          <span className="text-[#CCFF00]">·</span>
          <span>ATHER ENERGY ROS2 ROBOTICS: ₹18.5 LPA</span>
          <span className="text-[#CCFF00]">·</span>
          <span>L&amp;T INFRASTRUCTURE BIM ANALYTICS: ₹14 LPA</span>
          <span className="text-[#CCFF00]">·</span>
          <span>QUALCOMM VLSI VERIFICATION: ₹22 LPA</span>
          <span className="text-[#CCFF00]">·</span>
          <span>AMAZON AWS CLOUD PLATFORM: ₹30 LPA</span>
          <span className="text-[#CCFF00]">·</span>
          <span>GOOGLE TIER-1 OFFERS: ₹32 LPA</span>
          <span className="text-[#CCFF00]">·</span>
          <span>MICROSOFT CORE SYSTEMS: ₹28 LPA</span>
          <span className="text-[#CCFF00]">·</span>
          <span>ATHER ENERGY ROS2 ROBOTICS: ₹18.5 LPA</span>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: INTERACTIVE ATS LASER DIAGNOSTIC SCANNER SIMULATOR
         ========================================================================= */}
      <section id="simulator" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Kicker & Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-3">
                02 · Interactive Optical Diagnostic
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
                Simulate Your ATS Laser Audit
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md font-mono">
              Test how corporate ATS parsers analyze student resumes. Switch between candidates
              or trigger the real-time laser audit to see STAR sentence transforms.
            </p>
          </div>

          {/* Interactive Candidate Switcher */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-xs font-mono text-neutral-400 uppercase mr-2">
              Select Sample Candidate:
            </span>
            {ATS_CANDIDATE_SAMPLES.map((cand) => (
              <button
                key={cand.id}
                onClick={() => {
                  playSound(640, 0.08);
                  handleSelectCandidate(cand);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCandidate.id === cand.id
                    ? 'bg-[#CCFF00] text-[#08090C] font-bold shadow-md shadow-[#CCFF00]/20'
                    : 'bg-[#14171E] text-neutral-300 hover:text-white border border-white/10'
                }`}
                data-cursor="SWITCH"
              >
                {cand.name} ({cand.target.split(' ')[0]})
              </button>
            ))}

            <button
              onClick={() => triggerScanSimulation()}
              disabled={isScanning}
              className="ml-auto px-4 py-2 rounded-lg bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all disabled:opacity-50"
              data-cursor="RESYNC"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Auditing Resume...' : 'Re-Run Laser Scan'}</span>
            </button>
          </div>

          {/* Simulated Scanner Terminal Window */}
          <div className="spotlight-card rounded-2xl border border-white/10 p-6 sm:p-8 bg-[#0E1015] relative overflow-hidden">
            {/* Real-time Neon Laser Beam Animation */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_15px_#00F0FF] z-20 animate-laser pointer-events-none" />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: ATS Score Gauge */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-[#08090C] border border-white/10 text-center">
                <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke={currentScore >= 85 ? '#CCFF00' : '#00F0FF'}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="264"
                      strokeDashoffset={264 - (264 * currentScore) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold font-tech text-white tabular-nums">
                      {currentScore}%
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      ATS Match
                    </span>
                  </div>
                </div>

                <div className="text-sm font-bold text-white font-display mb-1">
                  {selectedCandidate.name}
                </div>
                <div className="text-xs text-neutral-400 font-mono mb-4">
                  {selectedCandidate.target}
                </div>

                <div className="w-full py-2 px-3 rounded bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 flex items-center justify-between">
                  <span>Initial Baseline:</span>
                  <span className="text-red-400 line-through">{selectedCandidate.initialScore}%</span>
                  <span className="text-[#CCFF00] font-bold">+{selectedCandidate.finalScore - selectedCandidate.initialScore}% Boost</span>
                </div>
              </div>

              {/* Center & Right Column: Bullet Transformation & Detected Keywords */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 flex items-center justify-between">
                    <span>Weak Unquantified Bullet (Before):</span>
                    <span className="text-red-400">Triggers ATS Gatekeeper Filter</span>
                  </div>
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
                    "{selectedCandidate.bulletOld}"
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#CCFF00] mb-2 flex items-center justify-between">
                    <span>Neural STAR Rewrite (Optimized):</span>
                    <span className="text-[#CCFF00] font-bold">Passes Fortune 500 Screening</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#CCFF00]/5 border border-[#CCFF00]/30 text-xs sm:text-sm text-white font-mono leading-relaxed">
                    "{selectedCandidate.bulletNew}"
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Verified Gatekeeper Keywords Extracted:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.detectedKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded bg-[#14171E] border border-white/10 text-xs font-mono text-[#00F0FF] flex items-center gap-1.5"
                      >
                        <Check className="w-3 h-3 text-[#CCFF00]" />
                        <span>{kw}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Diagnostic Action Strip */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-neutral-400">
                Want to run this deep neural optical audit on your real PDF resume?
              </div>
              <button
                onClick={() => {
                  playSound(800, 0.1);
                  onOpenAuth(false);
                }}
                className="px-6 py-3 rounded-lg bg-[#CCFF00] text-[#08090C] text-xs font-bold font-mono uppercase tracking-wider hover:bg-[#b8e600] active:scale-[0.98] transition-all flex items-center gap-2"
                data-cursor="UPLOAD"
              >
                <span>Upload Resume for Live Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE 6-STEP RECRUITMENT PIPELINE (Awwwards Visual Grid)
         ========================================================================= */}
      <section id="pipeline" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Kicker */}
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-3">
              03 · The 6-Phase Execution System
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight mb-4">
              From Raw Resume to Day-1 Placement Offer
            </h2>
            <p className="text-base text-neutral-300">
              A continuous, synchronized pipeline where every step feeds real telemetry
              into the next, closing gaps and building production-grade proof of work.
            </p>
          </div>

          {/* Interactive Step Switcher Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
            {WORKFLOW_STEPS.map((s, idx) => {
              const StepIcon = s.icon;
              const isActive = activeWorkflowIdx === idx;
              return (
                <button
                  key={s.step}
                  onClick={() => {
                    playSound(500 + idx * 80, 0.08);
                    setActiveWorkflowIdx(idx);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-[#161922] border-[#CCFF00] text-white shadow-lg shadow-[#CCFF00]/5'
                      : 'bg-[#0E1015] border-white/10 text-neutral-400 hover:border-white/20 hover:text-neutral-200'
                  }`}
                  data-cursor={`STEP ${s.step}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-neutral-500">
                      PHASE {s.step}
                    </span>
                    <StepIcon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#CCFF00]' : 'text-neutral-500'
                      }`}
                    />
                  </div>
                  <div className="text-xs font-bold font-display line-clamp-1">
                    {s.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Feature Showcase with Cinematic Asset */}
          {(() => {
            const activeStep = WORKFLOW_STEPS[activeWorkflowIdx];
            const StepIcon = activeStep.icon;
            return (
              <div className="spotlight-card rounded-2xl border border-white/10 p-8 lg:p-12 bg-[#0E1015]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-3 text-xs font-mono text-[#CCFF00] uppercase tracking-wider">
                      <StepIcon className="w-4 h-4" />
                      <span>{activeStep.subtitle}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-neutral-400">{activeStep.metric}</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-bold font-display text-white">
                      {activeStep.title}
                    </h3>

                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                      {activeStep.desc}
                    </p>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs font-mono text-[#00F0FF] uppercase mb-1">
                        Engineered Outcome
                      </div>
                      <div className="text-sm text-neutral-200 font-mono">
                        {activeStep.highlight}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          playSound(840, 0.1);
                          onOpenAuth(false);
                        }}
                        className="px-6 py-3.5 rounded-lg bg-[#CCFF00] text-[#08090C] text-xs font-bold font-mono uppercase tracking-wider hover:bg-[#b8e600] active:scale-[0.98] transition-all flex items-center gap-2"
                        data-cursor="EXPERIENCE"
                      >
                        <span>Experience Phase {activeStep.step}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6 relative">
                    <div className="rounded-xl border border-white/10 overflow-hidden relative group">
                      <img
                        src={activeStep.image}
                        alt={activeStep.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300 bg-[#08090C]/80 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/10">
                        <span>PHASE {activeStep.step} VERIFICATION</span>
                        <span className="text-[#CCFF00]">ACTIVE ENGINE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INTERACTIVE DISCIPLINE RADAR (CSE, MECH, ECE, CIVIL, BIOTECH)
         ========================================================================= */}
      <section id="disciplines" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-3">
              04 · Cross-Discipline Placement Intelligence
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight mb-4">
              Every Branch Has a High-Growth Pathway
            </h2>
            <p className="text-base text-neutral-300">
              Select your academic discipline to view targeted high-paying roles,
              exact gatekeeper competencies, and realistic campus CTC ranges.
            </p>
          </div>

          {/* Discipline Selector Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {DISCIPLINE_TRACKS.map((t) => {
              const isSel = selectedDiscipline.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    playSound(600, 0.08);
                    setSelectedDiscipline(t);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSel
                      ? 'bg-[#161922] border-[#CCFF00] text-white shadow-lg shadow-[#CCFF00]/5'
                      : 'bg-[#0E1015] border-white/10 text-neutral-400 hover:border-white/20 hover:text-white'
                  }`}
                  data-cursor="DISCIPLINE"
                >
                  <div className="text-xs font-bold font-display mb-1">{t.name}</div>
                  <div className="text-[11px] font-mono text-[#CCFF00]">{t.salary}</div>
                </button>
              );
            })}
          </div>

          {/* Active Discipline Card */}
          <div className="spotlight-card rounded-2xl border border-white/10 p-8 lg:p-12 bg-[#0E1015]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 uppercase">
                  <span>Target Corporate Role</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#00F0FF]">{selectedDiscipline.demand}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold font-display text-white">
                  {selectedDiscipline.role}
                </h3>

                <div className="text-lg font-mono text-[#CCFF00] font-bold">
                  Target CTC: {selectedDiscipline.salary}
                </div>

                <p className="text-sm text-neutral-300 font-mono">
                  Crucial Gatekeeper Skills Tested in Technical Rounds:
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedDiscipline.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg bg-[#14171E] border border-white/10 text-xs font-mono text-white flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                      <span>{sk}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#08090C] rounded-xl border border-white/10 p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-mono text-neutral-400 uppercase mb-2">
                    Automated Curriculum Readiness
                  </div>
                  <div className="text-2xl font-bold font-tech text-white mb-2">
                    Ready to Deploy
                  </div>
                  <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                    Customized roadmap modules, capstone repositories, and mock questions
                    are pre-calibrated for {selectedDiscipline.name}.
                  </p>
                </div>

                <button
                  onClick={() => {
                    playSound(750, 0.1);
                    onOpenAuth(false);
                  }}
                  className="w-full py-3.5 rounded-lg bg-[#CCFF00] text-[#08090C] text-xs font-bold font-mono uppercase tracking-wider hover:bg-[#b8e600] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  data-cursor="ENROLL"
                >
                  <span>Build {selectedDiscipline.name} Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: INTERACTIVE PLACEMENT VELOCITY & CTC CALCULATOR
         ========================================================================= */}
      <section id="calculator" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-3">
              05 · Placement Velocity Projection
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight mb-4">
              Calculate Your Tier-1 Offer Trajectory
            </h2>
            <p className="text-base text-neutral-300">
              Slide your current CGPA and choose your discipline to project hiring velocity,
              median package range, and Day-1 shortlist probability.
            </p>
          </div>

          <div className="spotlight-card rounded-2xl border border-white/10 p-8 lg:p-12 bg-[#0E1015]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Controls Column */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-3">
                    Select Academic Discipline
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['CSE / IT', 'Mechanical', 'ECE / EE', 'Civil / Other'].map((b) => (
                      <button
                        key={b}
                        onClick={() => {
                          playSound(550, 0.06);
                          setSelectedBranch(b);
                        }}
                        className={`py-2 px-3 rounded-lg text-xs font-mono transition-all text-center ${
                          selectedBranch === b
                            ? 'bg-[#CCFF00] text-[#08090C] font-bold'
                            : 'bg-[#14171E] text-neutral-300 hover:text-white border border-white/10'
                        }`}
                        data-cursor="BRANCH"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-300 mb-3">
                    <span className="uppercase">Undergraduate CGPA</span>
                    <span className="text-xl font-bold font-tech text-[#CCFF00] tabular-nums">
                      {cgpaValue.toFixed(1)} / 10.0
                    </span>
                  </div>
                  <input
                    type="range"
                    min="6.0"
                    max="9.8"
                    step="0.1"
                    value={cgpaValue}
                    onChange={(e) => {
                      setCgpaValue(parseFloat(e.target.value));
                      playSound(400 + parseFloat(e.target.value) * 50, 0.02);
                    }}
                    className="w-full accent-[#CCFF00] cursor-pointer h-2 bg-white/10 rounded-lg"
                    data-cursor="SLIDE"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-2">
                    <span>6.0 (Tier-3 Floor)</span>
                    <span>7.5 (Standard Cutoff)</span>
                    <span>9.0+ (Day-1 Fast-Track)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 leading-relaxed">
                  <span className="text-[#CCFF00] font-bold">Insight:</span> A 0.5 CGPA shift combined with 2 verified capstone blueprints and 85%+ ATS score triples shortlist probability across Tier-1 recruiters.
                </div>
              </div>

              {/* Output Telemetry Column */}
              <div className="lg:col-span-6 bg-[#08090C] rounded-xl border border-white/10 p-8 space-y-6">
                <div>
                  <div className="text-xs font-mono text-neutral-400 uppercase mb-1">
                    Projected Campus CTC Range
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold font-tech text-[#CCFF00] tabular-nums">
                    {projectedLPA}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 uppercase mb-2">
                    <span>Day-1 Shortlist Probability</span>
                    <span className="text-white font-bold">{shortlistProb}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#CCFF00] h-full transition-all duration-300"
                      style={{ width: `${shortlistProb}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-neutral-400 uppercase mb-2">
                    Top Verified Recruiting Cohorts
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-300">
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Google</span>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Microsoft</span>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Ather Energy</span>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Qualcomm</span>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Tower Research</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playSound(820, 0.1);
                    onOpenAuth(false);
                  }}
                  className="w-full py-3.5 rounded-lg bg-[#CCFF00] text-[#08090C] text-xs font-bold font-mono uppercase tracking-wider hover:bg-[#b8e600] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  data-cursor="UNLOCK"
                >
                  <span>Lock in This Placement Target</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: PROVEN STUDENT CASE STUDIES (Verified Proof of Work)
         ========================================================================= */}
      <section className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-3">
              06 · Verified Student Transformations
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight mb-4">
              Real Offers. Quantified Shifts.
            </h2>
            <p className="text-base text-neutral-300">
              Documented trajectories of graduates who bridged technical gaps and
              secured top offers across Product Tech, Auto Robotics, and BIM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student 1: Rohan Sharma */}
            <div className="spotlight-card rounded-2xl border border-white/10 p-6 bg-[#0E1015] flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
                  <span>MECHANICAL → ROBOTICS</span>
                  <span className="text-[#CCFF00] font-bold">₹18.5 LPA</span>
                </div>
                <h4 className="text-xl font-bold font-display text-white mb-2">
                  Rohan Sharma
                </h4>
                <div className="text-xs text-neutral-400 font-mono mb-4">
                  Placed at Ather Energy (Autonomous Systems)
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                  "I was stuck with standard mechanical CAD drafting with low CTC offers.
                  SkillBridge generated a 10-week ROS2 and C++17 roadmap with an autonomous
                  slam capstone. Cleared round 2 in my first try."
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                <span>ATS: 48% → 89%</span>
                <span className="text-[#CCFF00]">10-Week Sprint</span>
              </div>
            </div>

            {/* Student 2: Ananya Verma */}
            <div className="spotlight-card rounded-2xl border border-white/10 p-6 bg-[#0E1015] flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
                  <span>CSE → DISTRIBUTED SYS</span>
                  <span className="text-[#CCFF00] font-bold">₹32.0 LPA</span>
                </div>
                <h4 className="text-xl font-bold font-display text-white mb-2">
                  Ananya Verma
                </h4>
                <div className="text-xs text-neutral-400 font-mono mb-4">
                  Placed at Google (Core Cloud Services)
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                  "The Greenroom interview speech telemetry was life-changing. It flagged
                  my filler words and forced me to structure answers in the STAR format.
                  My technical communication scored in the 98th percentile."
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                <span>ATS: 54% → 94%</span>
                <span className="text-[#CCFF00]">8-Week Sprint</span>
              </div>
            </div>

            {/* Student 3: Kunal Patel */}
            <div className="spotlight-card rounded-2xl border border-white/10 p-6 bg-[#0E1015] flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
                  <span>CIVIL → BIM ANALYTICS</span>
                  <span className="text-[#CCFF00] font-bold">₹14.0 LPA</span>
                </div>
                <h4 className="text-xl font-bold font-display text-white mb-2">
                  Kunal Patel
                </h4>
                <div className="text-xs text-neutral-400 font-mono mb-4">
                  Placed at L&amp;T Technology Services
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                  "Every company visiting campus wanted Python and automated BIM modeling.
                  The platform roadmap had exact step-by-step ETABS and Python scripts
                  that proved I had real production capabilities."
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                <span>ATS: 51% → 87%</span>
                <span className="text-[#CCFF00]">12-Week Sprint</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: ARCHITECTURAL FAQ ACCORDION
         ========================================================================= */}
      <section id="faq" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-3">
              07 · Technical Verification &amp; Inquiries
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="spotlight-card rounded-xl border border-white/10 overflow-hidden bg-[#0E1015] transition-all"
                >
                  <button
                    onClick={() => {
                      playSound(500, 0.05);
                      setActiveFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                    data-cursor="TOGGLE"
                  >
                    <span className="text-base sm:text-lg font-bold font-display text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#CCFF00]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base text-neutral-300 font-mono leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: MONUMENTAL FINAL CONVERSION SECTION
         ========================================================================= */}
      <section className="py-28 relative overflow-hidden bg-[#0A0C10]">
        <div className="absolute inset-0 bg-grid-hairline opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#CCFF00]/10 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-6">
            08 · Final Directive
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display text-white tracking-tight leading-tight mb-8">
            YOUR TIER-1 PLACEMENT
            <br />
            <span className="text-[#CCFF00]">BEGINS TODAY.</span>
          </h2>

          <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Audit your resume with optical precision, isolate your corporate skill gaps,
            and build verified proof of work that recruiters cannot overlook.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                playSound(900, 0.12);
                onOpenAuth(false);
              }}
              className="px-9 py-4 rounded-xl bg-[#CCFF00] text-[#08090C] text-sm font-bold font-mono uppercase tracking-wider hover:bg-[#b8e600] active:scale-[0.98] transition-all flex items-center gap-3 shadow-2xl shadow-[#CCFF00]/25"
              data-cursor="CLAIM"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playSound(600, 0.08);
                onOpenAuth(true, true);
              }}
              className="px-6 py-4 rounded-xl border border-white/15 hover:border-white/30 text-neutral-300 hover:text-white text-sm font-mono tracking-wider transition-colors flex items-center gap-2"
              data-cursor="ADMIN"
            >
              <Shield className="w-4 h-4 text-[#00F0FF]" />
              <span>T&amp;P Directorate Terminal</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER (Quiet Architectural 1-Row Contract)
         ========================================================================= */}
      <footer className="py-12 border-t border-white/[0.08] bg-[#08090C] text-xs font-mono text-neutral-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-sm bg-[#CCFF00]" />
            <span className="text-white font-bold font-display">SKILLBRIDGE AI</span>
            <span>·</span>
            <span>CAMPUS RECRUITMENT ARCHITECTURE 2026</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenAuth(true, true)}
              className="hover:text-white transition-colors"
              data-cursor="GO"
            >
              Directorate Console
            </button>
            <button
              onClick={() => onOpenAuth(true)}
              className="hover:text-white transition-colors"
              data-cursor="GO"
            >
              Student Sign In
            </button>
            <button
              onClick={() => onOpenAuth(false)}
              className="hover:text-white transition-colors text-[#CCFF00]"
              data-cursor="GO"
            >
              Register Candidate
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
