import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

// High-resolution local visual assets
const IMAGES = {
  hero: '/src/assets/images/hero_cinematic_career_constellation_1794476570452.jpg',
  software: '/src/assets/images/showcase_software_engineer_workspace_1794476571794.jpg',
  analytics: '/src/assets/images/showcase_data_analytics_intelligence_1794476572127.jpg',
  greenroom: '/src/assets/images/showcase_greenroom_interview_studio_1794476572462.jpg',
};

// 6 Core Workflow Steps
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
    a: 'Yes. AI Skill Mentor features dedicated pathways for core branches transitioning into high-growth interdisciplinary roles like Autonomous Robotics, BIM Automation, Bioinformatics, and Quant Analytics, bridging the skill gap with targeted milestone roadmaps.',
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
    id: 'unoptimized',
    name: 'Candidate A (Pre-Audit)',
    branch: 'CSE / 3rd Year',
    atsScore: 64,
    gatekeepersPassed: '6 of 14',
    summary: 'Generic keyword stuffing, unquantified impact statements, auto-reject risk.',
    bullets: [
      {
        original: 'Worked on a library management website using React and Node.',
        critique: 'Passive verb, no measurable impact metrics, generic scope.',
        optimized:
          'Architected full-stack portal with React 19 & Express, reducing checkout latency by 42% for 3,200+ active student users.',
      },
      {
        original: 'Created machine learning model to predict student grades.',
        critique: 'Missing dataset size, evaluation metric, and deployment details.',
        optimized:
          'Trained XGBoost regression pipeline on 14,000+ academic records, achieving 91.2% accuracy with FastAPI inference microservice.',
      },
    ],
  },
  {
    id: 'optimized',
    name: 'Candidate B (Post-Audit)',
    branch: 'ECE / Final Year',
    atsScore: 92,
    gatekeepersPassed: '13 of 14',
    summary: 'STAR-formatted bullets, verifiable production links, Tier-1 benchmark match.',
    bullets: [
      {
        original: 'Wrote embedded code for microcontrollers in college lab.',
        critique: 'Lacks hardware specs, protocol standards, and memory optimization.',
        optimized:
          'Programmed bare-metal ARM Cortex-M4 firmware via SPI/I2C protocols, reducing sensor sampling jitter to <2.1ms under RTOS.',
      },
      {
        original: 'Developed PCB layout for an IoT smart weather station project.',
        critique: 'Missing layer count, EDA tool, and verification benchmarks.',
        optimized:
          'Designed 4-layer impedance-matched PCB in KiCad with ESP32 telemetry, passing EMC pre-compliance across 48hr continuous runs.',
      },
    ],
  },
];

export function LandingPageView({ onOpenAuth, onStartGuestPreview }: LandingPageViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);

  const counterOffersRef = useRef<HTMLSpanElement>(null);
  const counterAtsRef = useRef<HTMLSpanElement>(null);
  const counterTracksRef = useRef<HTMLSpanElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedDisciplineIndex, setSelectedDisciplineIndex] = useState(1);
  const [activeCandidateIndex, setActiveCandidateIndex] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [cgpaValue, setCgpaValue] = useState(8.5);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize tactile audio feedback
  const playSound = (freq = 440, duration = 0.08, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (_) {}
  };

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

      // Connecting lines
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

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

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

  // Desktop Magnetic Cursor
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
        gsap.to(label, { opacity: 0, duration: 0.15 });
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    const interactives = document.querySelectorAll('button, a, [data-cursor]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleInteractiveEnter as any);
      el.addEventListener('mouseleave', handleInteractiveLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleInteractiveEnter as any);
        el.removeEventListener('mouseleave', handleInteractiveLeave);
      });
    };
  }, []);

  // GSAP Animations (Hero line reveal, Counters, Progress bar)
  useEffect(() => {
    const ctx = gsap.context(() => {
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

  const activeCandidate = ATS_CANDIDATE_SAMPLES[activeCandidateIndex];
  const selectedDiscipline = DISCIPLINE_TRACKS[selectedDisciplineIndex];

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

      {/* =========================================================================
          TOP NAVIGATION BAR (Wordmark · Links · Action & Audio Toggle)
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#08090C]/85 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          {/* Wordmark */}
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
            <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
              · CAMPUS ARCHITECTURE
            </span>
          </a>

          {/* Nav links */}
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

          {/* Action CTAs & Sound Switch */}
          <div className="flex items-center gap-4 shrink-0">
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
              className="hidden sm:inline-block text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-colors whitespace-nowrap shrink-0 px-3 py-2 cursor-pointer"
              data-cursor="AUTH"
            >
              Sign In
            </button>

            <button
              onClick={() => {
                playSound(720, 0.12);
                onOpenAuth(false);
              }}
              className="px-5 py-2.5 rounded-lg bg-[#CCFF00] text-[#08090C] text-xs font-bold font-mono uppercase tracking-wider hover:bg-[#b8e600] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 flex items-center gap-2 shadow-lg shadow-[#CCFF00]/10 cursor-pointer"
              data-cursor="START"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 1: HERO VIEWPORT (16:9 Split with Particle Constellation)
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
                <span className="block overflow-hidden">
                  <span className="hero-line-inner block">THE ARCHITECTURE</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-line-inner block text-neutral-300">
                    OF TIER-1 CAMPUS
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-line-inner block text-[#CCFF00]">
                    OFFERS & VELOCITY.
                  </span>
                </span>
              </h1>

              {/* Concrete Value Proposition */}
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
                  className="px-8 py-4 rounded-lg bg-[#CCFF00] text-[#08090C] text-sm font-bold font-mono uppercase tracking-wider hover:bg-[#b8e600] active:scale-[0.98] transition-all flex items-center gap-3 shadow-xl shadow-[#CCFF00]/15 cursor-pointer"
                  data-cursor="JOIN"
                >
                  <span>Claim Placement Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#simulator"
                  onClick={() => playSound(480, 0.05)}
                  className="px-6 py-4 rounded-lg border border-white/15 hover:border-white/30 text-white text-sm font-mono tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                  data-cursor="SIM"
                >
                  <span>Test ATS Simulator</span>
                  <ArrowUpRight className="w-4 h-4 text-[#CCFF00]" />
                </a>

                {onStartGuestPreview && (
                  <button
                    onClick={() => {
                      playSound(900, 0.1);
                      onStartGuestPreview();
                    }}
                    className="px-5 py-4 rounded-lg border border-[#00F0FF]/30 hover:border-[#00F0FF] bg-[#00F0FF]/10 text-[#00F0FF] text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                    data-cursor="DEMO"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant Live Demo</span>
                  </button>
                )}
              </div>

              {/* Quantitative Proof Strip */}
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

            {/* Right Column (Awwwards Live Hologram Telemetry HUD) */}
            <div className="lg:col-span-5 relative">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1015]/90 border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.9)] backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#CCFF00]/10 blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-ping" />
                    <span className="text-xs font-mono font-bold tracking-wider text-white">
                      LIVE PLACEMENT RADAR
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#00F0FF] px-2 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/20">
                    FORTUNE 500 BENCHMARK
                  </span>
                </div>

                {/* Score Dial & Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-[#14171E] border border-white/10">
                    <div className="text-3xl font-bold font-tech text-[#CCFF00] mb-1">
                      94/100
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono">
                      ATS Calibrated Index
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#14171E] border border-white/10">
                    <div className="text-3xl font-bold font-tech text-[#00F0FF] mb-1">
                      3.4x
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono">
                      Interview Shortlist Lift
                    </div>
                  </div>
                </div>

                {/* Telemetry rows */}
                <div className="space-y-3 mb-6 font-mono text-xs">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-neutral-300">STAR Metrics Enforced</span>
                    <span className="text-[#CCFF00] font-bold">100% Passed</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-neutral-300">Gatekeeper Skill Match</span>
                    <span className="text-white font-bold">14 / 14 Extracted</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-neutral-300">Greenroom Speech Telemetry</span>
                    <span className="text-[#00F0FF] font-bold">138 WPM (Optimal)</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenAuth(false)}
                  className="w-full py-3 rounded-xl bg-[#CCFF00] hover:bg-[#b8e600] text-[#08090C] text-xs font-bold font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Launch Assessment Terminal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THE 6-STAGE ENGINE PIPELINE
         ========================================================================= */}
      <section id="pipeline" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-3">
                <span>02</span>
                <span aria-hidden="true">·</span>
                <span>The Algorithmic Workflow</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
                Six Stages from Ingestion to Tier-1 Offer.
              </h2>
            </div>
            <div className="text-xs font-mono text-neutral-400 max-w-xs">
              Every stage calibrated to real placement cutoffs, eliminative ATS rules, and technical panels.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORKFLOW_STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-7 rounded-2xl bg-[#0E1015] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                  data-cursor="STEP"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="size-11 rounded-xl bg-[#14171E] border border-white/10 flex items-center justify-center text-[#CCFF00] group-hover:scale-105 transition-transform">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-400 px-2.5 py-1 rounded bg-white/5 border border-white/10">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#CCFF00] transition-colors mb-1">
                      {item.title}
                    </h3>
                    <div className="text-xs font-mono text-[#00F0FF] mb-3 uppercase tracking-wider">
                      {item.subtitle}
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#CCFF00] font-semibold">{item.metric}</span>
                    <span className="text-neutral-500">{item.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE ATS RESUME SCANNER SIMULATOR
         ========================================================================= */}
      <section id="simulator" className="py-24 border-b border-white/[0.08] relative bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-3">
              <span>03</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Telemetry</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4">
              Real-Time ATS Sentence Rewriter Simulator.
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed">
              Test how corporate ATS parsers analyze raw bullet points versus AI-calibrated STAR formulations with quantifiable metrics.
            </p>
          </div>

          {/* Candidate Switcher */}
          <div className="flex gap-3 mb-8">
            {ATS_CANDIDATE_SAMPLES.map((cand, idx) => (
              <button
                key={cand.id}
                onClick={() => {
                  playSound(640 + idx * 80, 0.08);
                  setActiveCandidateIndex(idx);
                }}
                className={`px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeCandidateIndex === idx
                    ? 'bg-[#CCFF00] text-[#08090C] font-bold shadow-md shadow-[#CCFF00]/15'
                    : 'bg-[#14171E] text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                {cand.name}
              </button>
            ))}
          </div>

          {/* Interactive Inspection Terminal */}
          <div className="p-8 rounded-2xl bg-[#0E1015] border border-white/15 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`size-16 rounded-xl flex items-center justify-center font-bold font-mono text-2xl ${
                    activeCandidate.atsScore >= 80
                      ? 'bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {activeCandidate.atsScore}%
                </div>
                <div>
                  <div className="text-xs font-mono text-neutral-400 uppercase">ATS Compatibility</div>
                  <div className="text-base font-bold text-white">
                    {activeCandidate.atsScore >= 80 ? 'Tier-1 Qualified' : 'Cutoff Risk'}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase mb-1">Gatekeeper Keywords</div>
                <div className="text-xl font-bold font-mono text-white">
                  {activeCandidate.gatekeepersPassed}
                </div>
                <div className="text-xs text-neutral-400 font-mono">Fortune 500 Threshold: 12</div>
              </div>

              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase mb-1">Audit Summary</div>
                <div className="text-xs text-neutral-300 font-mono leading-relaxed">
                  {activeCandidate.summary}
                </div>
              </div>
            </div>

            {/* Bullet Rewrites Before & After */}
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#CCFF00]">
                STAR Bullet Point Formulation
              </div>
              {activeCandidate.bullets.map((b, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-[#14171E] border border-white/10 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-mono shrink-0 font-bold">
                      RAW
                    </span>
                    <p className="text-xs text-neutral-400 font-mono leading-relaxed line-through decoration-red-500/50">
                      {b.original}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-[#CCFF00]/20 text-[#CCFF00] text-[10px] font-mono shrink-0 font-bold">
                      CALIBRATED
                    </span>
                    <p className="text-xs text-white font-mono leading-relaxed font-semibold">
                      {b.optimized}
                    </p>
                  </div>
                  <div className="text-[11px] text-[#00F0FF] font-mono pl-14">
                    ⚡ Audit: {b.critique}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => onOpenAuth(false)}
                className="px-8 py-3.5 rounded-lg bg-[#CCFF00] hover:bg-[#b8e600] text-[#08090C] text-xs font-bold font-mono uppercase tracking-wider transition-all hover:scale-105 cursor-pointer shadow-lg shadow-[#CCFF00]/15"
              >
                Scan &amp; Calibrate Your Resume Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: DISCIPLINE RADAR & SALARY BENCHMARKS
         ========================================================================= */}
      <section id="disciplines" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-3">
              <span>04</span>
              <span aria-hidden="true">·</span>
              <span>Discipline Radar</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4">
              Cross-Discipline Career Gateways.
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed">
              Transition pathways for Core Engineering, IT, Biotech, and Finance into Tier-1 product compensation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISCIPLINE_TRACKS.map((track, i) => (
              <div
                key={track.id}
                className="p-6 rounded-2xl bg-[#0E1015] border border-white/10 hover:border-[#CCFF00]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      {track.name}
                    </span>
                    <span className="text-xs font-mono text-[#00F0FF] font-semibold">
                      {track.demand}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#CCFF00] transition-colors mb-2">
                    {track.role}
                  </h3>
                  <div className="text-base font-bold text-[#CCFF00] font-mono mb-4">
                    {track.salary}
                  </div>

                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-mono text-neutral-400 uppercase">Core Competencies:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {track.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-neutral-300 font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenAuth(false)}
                  className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-[#CCFF00] text-white hover:text-[#08090C] text-xs font-bold font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Select Pathway</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PLACEMENT VELOCITY & CTC CALCULATOR
         ========================================================================= */}
      <section id="calculator" className="py-24 border-b border-white/[0.08] relative bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-3">
                <span>05</span>
                <span aria-hidden="true">·</span>
                <span>Placement Velocity</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4">
                Calculate Estimated Campus Package.
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Calibrated against 12,400+ campus hiring records across Tier-1 institutions, branch cutoffs, and target CTC bands.
              </p>

              {/* Branch Selector */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-mono text-neutral-300 uppercase block">
                  Select Engineering Discipline:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['CSE / IT', 'ECE / Embedded', 'Mechanical / EV', 'Civil BIM', 'Biotech Data'].map(
                    (branch) => (
                      <button
                        key={branch}
                        onClick={() => {
                          playSound(600, 0.05);
                          setSelectedBranch(branch);
                        }}
                        className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          selectedBranch === branch
                            ? 'bg-[#CCFF00] text-[#08090C] font-bold'
                            : 'bg-[#14171E] border border-white/10 text-neutral-300 hover:text-white'
                        }`}
                      >
                        {branch}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* CGPA Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-300 uppercase">Current CGPA:</span>
                  <span className="text-[#CCFF00] font-bold text-base">{cgpaValue} / 10.0</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="10.0"
                  step="0.1"
                  value={cgpaValue}
                  onChange={(e) => setCgpaValue(parseFloat(e.target.value))}
                  className="w-full accent-[#CCFF00] bg-white/10 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Result Box */}
            <div className="lg:col-span-6">
              <div className="p-8 sm:p-10 rounded-2xl bg-[#0E1015] border border-white/15 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#CCFF00]/10 blur-3xl pointer-events-none" />

                <div className="text-xs font-mono uppercase tracking-wider text-[#CCFF00] mb-2">
                  Projected Campus Offering
                </div>
                <div className="text-4xl sm:text-6xl font-bold text-white font-tech tracking-tight mb-4">
                  {projectedLPA}
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 mb-6 font-mono">
                  <div>
                    <div className="text-xs text-neutral-400">Shortlist Probability</div>
                    <div className="text-2xl font-bold text-[#CCFF00]">{shortlistProb}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">Tier-1 Company Pool</div>
                    <div className="text-2xl font-bold text-white">40+ Firms</div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenAuth(false)}
                  className="w-full py-4 rounded-xl bg-[#CCFF00] hover:bg-[#b8e600] text-[#08090C] font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#CCFF00]/15"
                >
                  <span>Unlock Roadmap for High Package</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FREQUENTLY ASKED QUESTIONS (FAQ)
         ========================================================================= */}
      <section id="faq" className="py-24 border-b border-white/[0.08] relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-3">
              <span>06</span>
              <span aria-hidden="true">·</span>
              <span>FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-3">
              Frequently Asked Questions.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-normal">
              Direct insights into how our ATS calibration and placement roadmaps operate.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-[#0E1015] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => {
                      playSound(550, 0.05);
                      setOpenFaq(isOpen ? null : index);
                    }}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`size-4 text-[#CCFF00] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/[0.05] font-normal">
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
          SECTION 7: GRAND TERMINAL CTA & OBSIDIAN FOOTER
         ========================================================================= */}
      <section className="py-24 relative overflow-hidden bg-[#08090C]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="p-10 sm:p-14 rounded-2xl bg-[#0E1015] border border-white/15 text-center relative shadow-2xl overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#CCFF00]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
                <span>Tier-1 Campus Architecture Terminal</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4">
                Ready to Accelerate Your Placement Velocity?
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto mb-8 font-normal">
                Join 12,400+ engineering students building verified proof-of-work, clearing corporate ATS cutoffs, and securing dream offers.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => {
                    playSound(820, 0.1);
                    onOpenAuth(false);
                  }}
                  className="px-8 py-4 rounded-lg bg-[#CCFF00] hover:bg-[#b8e600] text-[#08090C] font-bold text-sm font-mono uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-[#CCFF00]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Start Free Right Now</span>
                  <ArrowRight className="size-4" />
                </button>

                <button
                  onClick={() => {
                    playSound(550, 0.08);
                    onOpenAuth(true);
                  }}
                  className="px-8 py-4 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Sign In to Terminal
                </button>
              </div>
            </div>
          </div>

          {/* Minimalist Obsidian Footer */}
          <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
              <span>SKILLBRIDGE AI · ALL CAMPUS SERVICES OPERATIONAL</span>
            </div>
            <div>© {new Date().getFullYear()} AI Skill Mentor. All rights reserved.</div>
          </footer>
        </div>
      </section>
    </div>
  );
}
