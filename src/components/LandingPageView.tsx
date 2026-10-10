import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  FileCheck2,
  Target,
  Compass,
  GraduationCap,
  Video,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Award,
  Play,
  Layers,
  Code2,
  Building,
  Shield,
  ShieldCheck,
  Bot,
  Zap,
  Star,
  Users,
  Briefcase,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Activity,
  FileText,
  UserCheck,
} from 'lucide-react';
import { CareerConstellationCanvas } from './auth/CareerConstellationCanvas.tsx';

interface LandingPageViewProps {
  onOpenAuth: (isLogin: boolean, isAdmin?: boolean) => void;
  onStartGuestPreview?: () => void;
}

// 6-Step Workflow defined in the exact user specification
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

// Core Features data for the staggered scroll entrance animation grid
const CORE_FEATURES = [
  {
    icon: FileCheck2,
    tag: 'Optical OCR & Neural Audit',
    title: 'ATS Resume Keyword Scanner',
    desc: 'Deep multi-format resume parsing tested against Fortune 500 applicant tracking systems. Detects weak verbs, bullet length anomalies, and missing skill thresholds.',
    interactiveBadge: 'ATS Score 88/100 · +14% Boost',
    highlight: 'Instant STAR sentence rewriter with quantified impacts',
  },
  {
    icon: Target,
    tag: 'Competency Radar',
    title: 'Competitive Skill Gap Matrix',
    desc: 'Benchmarks your real competencies against real recruitment cutoffs across 24+ engineering disciplines. Categorizes gatekeeper must-haves from secondary skills.',
    interactiveBadge: 'Isolates Gatekeeper Requirements',
    highlight: 'Identifies why candidate resumes get filtered out',
  },
  {
    icon: Compass,
    tag: 'Milestone Sequencing',
    title: 'Adaptive Week-by-Week Roadmap',
    desc: 'A dynamic 4-to-12 week sprint tuned to your graduation date and active branch. Automatically adjusts sequence as you complete practice milestones.',
    interactiveBadge: 'Personalized 12-Week Curriculum',
    highlight: 'Zero generic 6-month fluff, strictly hiring cutoffs',
  },
  {
    icon: Video,
    tag: 'Vision & Speech AI',
    title: 'Greenroom Mock Interview Studio',
    desc: 'Simulate high-pressure technical and HR rounds with live speech pacing (WPM), filler word counters, webcam eye contact gaze tracking, and instant STAR scoring.',
    interactiveBadge: '134 WPM Pacing · 92% Eye Gaze',
    highlight: 'Speech-to-text feedback on accuracy and professional posture',
  },
  {
    icon: Code2,
    tag: 'Recruiter Verified Repos',
    title: 'Production Capstone Blueprints',
    desc: 'Deployable GitHub project blueprints with concrete architecture diagrams, SQL schemas, and live deployment verification to prove Day-1 engineering competence.',
    interactiveBadge: '180+ Engineering Blueprints',
    highlight: 'Full-stack, Robotics, VLSI & Bio-informatics repos',
  },
  {
    icon: Bot,
    tag: '24/7 Placement Copilot',
    title: 'Autonomous Placement Mentor',
    desc: 'Conversational mentor providing company-specific online assessment patterns, aptitude guidance, mock question drill-downs, and salary negotiation strategies.',
    interactiveBadge: 'Instant 24/7 Placement Answers',
    highlight: 'Calibrated for campus recruitment drives across India',
  },
];

// Framer Motion Entrance Animation Variants (Staggered Children Reveal Pattern)
const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const featureCardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 24,
      stiffness: 110,
    },
  },
};

export function LandingPageView({
  onOpenAuth,
  onStartGuestPreview,
}: LandingPageViewProps) {
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  const [selectedDiscipline, setSelectedDiscipline] = useState(DISCIPLINE_TRACKS[0]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activePreviewTab, setActivePreviewTab] = useState<'ats' | 'roadmap' | 'greenroom'>('ats');

  // Auto advance workflow step every 5s if user hasn't clicked
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowIdx((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentStep = WORKFLOW_STEPS[activeWorkflowIdx];
  const StepIcon = currentStep.icon;

  return (
    <div className="relative min-h-screen bg-[#070201] text-slate-100 overflow-x-hidden selection:bg-[#FEC163] selection:text-black">
      {/* Background Interactive Constellation Canvas */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0">
        <CareerConstellationCanvas />
      </div>

      {/* Radiant Solar Background Glows */}
      <div className="fixed top-[-10rem] left-1/2 -translate-x-1/2 w-[70rem] h-[35rem] bg-gradient-to-b from-[#DE4313]/20 via-[#FA8C28]/10 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[45rem] h-[35rem] bg-gradient-to-t from-[#FEC163]/10 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* =========================================================================
         1. STICKY TOP NAVIGATION BAR
         ========================================================================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070201]/85 border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo & Brand - Click scrolls smoothly to top */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative size-10 rounded-xl bg-gradient-to-br from-[#FEC163] via-[#FA8C28] to-[#DE4313] p-0.5 shadow-[0_0_20px_rgba(222,67,19,0.5)] group-hover:scale-105 transition-transform">
              <div className="size-full bg-[#120502] rounded-[10px] flex items-center justify-center">
                <Sparkles className="size-5 text-[#FEC163]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-[#FEC163] transition-colors">
                  SkillBridge AI
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FEC163]/15 text-[#FEC163] border border-[#FEC163]/30">
                  Campus 2026
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono hidden sm:block">
                Autonomous Placement Engine
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-zinc-300">
            <a
              href="#workflow"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>The 6-Step Pipeline</span>
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Core Features
            </a>
            <a href="#disciplines" className="hover:text-white transition-colors">
              Engineering Tracks
            </a>
            <a href="#outcomes" className="hover:text-white transition-colors">
              Student Results
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onOpenAuth(true, true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-300/80 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all cursor-pointer"
              title="Official Institutional & Placement Directorate Admin Login"
            >
              <Shield className="size-3.5 text-amber-400" />
              <span>Admin Portal</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenAuth(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => onOpenAuth(false)}
              className="px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-[#FEC163] via-[#FA8C28] to-[#DE4313] hover:from-[#FFE19C] hover:to-[#DE4313] shadow-[0_0_24px_rgba(222,67,19,0.5)] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
         2. HERO SECTION
         ========================================================================= */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Top Kicker Announcement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#FEC163]/30 text-xs text-zinc-300 shadow-lg mb-6 backdrop-blur-md"
        >
          <span className="size-2 rounded-full bg-[#FEC163] animate-pulse" />
          <span className="font-semibold text-white">Next-Gen Placement Intelligence</span>
          <span className="text-zinc-500">|</span>
          <span className="text-[#FEC163] font-mono">Calibrated for Tier-1, 2 & 3 Colleges</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]"
        >
          From Campus Classroom to{' '}
          <span className="bg-gradient-to-r from-[#FEC163] via-[#FA8C28] to-[#DE4313] bg-clip-text text-transparent">
            Day-1 High-CTC
          </span>{' '}
          Industry Hire.
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed"
        >
          The end-to-end career mentor that audits your resume with optical ATS precision,
          diagnoses gatekeeper skill gaps, constructs your personalized week-by-week roadmap, and
          coaches your technical speech in the Greenroom Studio.
        </motion.p>

        {/* Hero Dual CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto"
        >
          <button
            type="button"
            onClick={() => onOpenAuth(false)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FEC163] via-[#FA8C28] to-[#DE4313] hover:brightness-110 text-zinc-950 font-bold text-sm shadow-[0_0_32px_rgba(222,67,19,0.6)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Create Free Account</span>
            <ArrowRight className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => onOpenAuth(true)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#140603] hover:bg-[#200A04] border border-[#FEC163]/40 text-white font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 group shadow-md"
          >
            <span>Sign In to Student Account</span>
            <ArrowRight className="size-3.5 text-[#FEC163] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Trust & Proof Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-zinc-400"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-400" />
            <span>12,400+ Offers Tracked</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-[#FEC163]" />
            <span>88% Average ATS Score Boost</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-cyan-400" />
            <span>24+ Engineering & Tech Tracks</span>
          </div>
        </motion.div>

        {/* =====================================================================
           LIVE INTERACTIVE COMMAND CENTER MOCKUP
           ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 relative rounded-3xl border border-white/[0.12] bg-[#0E0503]/90 shadow-[0_20px_80px_rgba(0,0,0,0.8)] p-3 sm:p-5 backdrop-blur-2xl max-w-5xl mx-auto"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] px-2">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-rose-500/80" />
              <div className="size-3 rounded-full bg-amber-500/80" />
              <div className="size-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-[11px] font-mono text-zinc-400 hidden sm:inline">
                skillbridge-ai // campus-placement-workspace
              </span>
            </div>

            {/* Preview Feature Tabs */}
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/10 text-[11px]">
              <button
                type="button"
                onClick={() => setActivePreviewTab('ats')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  activePreviewTab === 'ats'
                    ? 'bg-[#FEC163] text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                ATS Scanner
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewTab('roadmap')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  activePreviewTab === 'roadmap'
                    ? 'bg-[#FEC163] text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Adaptive Roadmap
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewTab('greenroom')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  activePreviewTab === 'greenroom'
                    ? 'bg-[#FEC163] text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Greenroom Studio
              </button>
            </div>
          </div>

          {/* Interactive Screen Preview Container */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#070201] p-4 sm:p-6 text-left min-h-[340px] flex flex-col justify-between relative overflow-hidden">
            {activePreviewTab === 'ats' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono text-[#FEC163] uppercase tracking-wider">
                      Neural Optical Audit
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Rohan Sharma · B.Tech Mechanical Engineering
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                      ATS Score: 88 / 100
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                    <span className="text-zinc-500 font-mono text-[10px]">Verified Skills</span>
                    <p className="font-bold text-white">Python, SolidWorks, FEA, C++</p>
                    <span className="text-[10px] text-emerald-400">✓ Parsed 8 Core Skills</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                    <span className="text-zinc-500 font-mono text-[10px]">Gatekeeper Gap Detected</span>
                    <p className="font-bold text-rose-400">ROS2 & Linux IPC</p>
                    <span className="text-[10px] text-rose-300">Mandatory for Robotics Cutoff</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                    <span className="text-zinc-500 font-mono text-[10px]">Target Corporate Role</span>
                    <p className="font-bold text-[#FEC163]">EV & Robotics Engineer</p>
                    <span className="text-[10px] text-zinc-400">₹14.0 LPA Median CTC</span>
                  </div>
                </div>

                {/* Simulated Scanner Beam */}
                <div className="relative p-3 rounded-xl bg-[#120603] border border-[#FEC163]/30 overflow-hidden">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-zinc-300">
                      Recommendation: Inject quantifiable metric into Project 1
                    </span>
                    <span className="text-[#FEC163] font-mono text-[11px]">+14% Match Boost</span>
                  </div>
                  <div className="mt-1 text-[11px] text-zinc-400 font-mono">
                    "Reduced computational cycle time by 28% utilizing multi-threaded C++ kinematics."
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'roadmap' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono text-[#FEC163] uppercase tracking-wider">
                      Milestone Sequence
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      12-Week Campus Placement Master Curriculum
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#FEC163] bg-[#FEC163]/10 px-2.5 py-1 rounded-lg border border-[#FEC163]/25">
                    Phase 2 of 4 Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/20">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">
                      WEEKS 1-3 · COMPLETED
                    </span>
                    <h4 className="font-bold text-white text-xs">Analytical Foundation</h4>
                    <p className="text-[11px] text-zinc-400 mt-1">Advanced SQL & Python Core</p>
                  </div>

                  <div className="p-3 rounded-xl border border-[#FEC163] bg-amber-950/20 shadow-md">
                    <span className="text-[10px] font-mono text-[#FEC163] font-bold block mb-1">
                      WEEKS 4-6 · ACTIVE NOW
                    </span>
                    <h4 className="font-bold text-white text-xs">Domain Specialization</h4>
                    <p className="text-[11px] text-zinc-400 mt-1">ROS2 Nodes & Control Loops</p>
                  </div>

                  <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
                    <span className="text-[10px] font-mono text-zinc-500 font-bold block mb-1">
                      WEEKS 7-9 · UPCOMING
                    </span>
                    <h4 className="font-bold text-zinc-300 text-xs">Production Capstone</h4>
                    <p className="text-[11px] text-zinc-400 mt-1">Autonomous Ground Robot Repo</p>
                  </div>

                  <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
                    <span className="text-[10px] font-mono text-zinc-500 font-bold block mb-1">
                      WEEKS 10-12 · FINAL
                    </span>
                    <h4 className="font-bold text-zinc-300 text-xs">Greenroom Mock Rehearsal</h4>
                    <p className="text-[11px] text-zinc-400 mt-1">Company-Specific STAR Rounds</p>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'greenroom' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                      Greenroom Studio Live Stream
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Tata Elxsi · Technical Round 1 Rehearsal
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded-xl bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs font-mono">
                    Speech Pacing: 134 WPM
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#140603] border border-white/10">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Eye Contact</span>
                    <p className="text-xl font-extrabold text-white mt-0.5">92%</p>
                    <span className="text-[10px] text-emerald-400">Excellent webcam gaze</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#140603] border border-white/10">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Filler Words</span>
                    <p className="text-xl font-extrabold text-white mt-0.5">1 / min</p>
                    <span className="text-[10px] text-emerald-400">Clean vocal articulation</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#140603] border border-white/10">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">STAR Structure</span>
                    <p className="text-xl font-extrabold text-[#FEC163] mt-0.5">89 / 100</p>
                    <span className="text-[10px] text-[#FEC163]">High impact result cited</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Preview Launch Bar */}
            <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="text-zinc-400 font-mono text-[11px]">
                Interactive live preview using synthetic student placement dataset.
              </span>
              <button
                type="button"
                onClick={() => onOpenAuth(false)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FEC163] hover:text-white transition-colors cursor-pointer"
              >
                <span>Sign Up to Unlock Full Workspace</span>
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
         3. THE 6-STEP WORKFLOW SHOWCASE (Directly implementing user request)
         ========================================================================= */}
      <section id="workflow" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FEC163] px-3 py-1 rounded-full bg-[#FEC163]/10 border border-[#FEC163]/20">
            The Complete Student Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Engineered 6-Step Placement Workflow
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Every step after registration is designed to methodically move you from raw resume to verified Day-1 placement offer.
          </p>
        </div>

        {/* Stepper Navigation Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {WORKFLOW_STEPS.map((ws, idx) => {
            const isSelected = activeWorkflowIdx === idx;
            const Icon = ws.icon;
            return (
              <button
                key={ws.step}
                type="button"
                onClick={() => setActiveWorkflowIdx(idx)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                  isSelected
                    ? 'border-[#FEC163] bg-[#1E0904] shadow-lg shadow-amber-950/40 ring-1 ring-[#FEC163]/50'
                    : 'border-white/[0.08] bg-[#0E0503]/60 hover:bg-white/[0.04] text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#FEC163] text-black font-extrabold'
                        : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    {ws.step}
                  </span>
                  <Icon className={`size-4 ${isSelected ? 'text-[#FEC163]' : 'text-zinc-500'}`} />
                </div>
                <div className="text-[11px] font-bold text-white line-clamp-1 mt-2">
                  {ws.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Showcase Card */}
        <div className="rounded-3xl border border-white/[0.1] bg-gradient-to-br from-[#170603] via-[#0E0402] to-[#070201] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="size-7 rounded-xl bg-[#FEC163] text-black font-extrabold text-xs flex items-center justify-center font-mono">
                  {currentStep.step}
                </span>
                <span className="text-xs font-mono text-[#FEC163] uppercase tracking-wider font-semibold">
                  {currentStep.subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentStep.title}
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {currentStep.desc}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
                <div className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
                  <Award className="size-4 text-[#FEC163]" />
                  <span className="text-zinc-200 font-semibold">{currentStep.metric}</span>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400" />
                  <span className="text-zinc-200">{currentStep.highlight}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenAuth(false)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-zinc-950 font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Sign Up to Unlock Step {currentStep.step}</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Right Visual Graphic */}
            <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#070201] p-6 shadow-inner flex flex-col justify-center items-center text-center space-y-4 relative">
              <div className="size-20 rounded-3xl bg-gradient-to-br from-[#FEC163]/20 via-[#FA8C28]/10 to-transparent border border-[#FEC163]/30 flex items-center justify-center text-[#FEC163] shadow-lg">
                <StepIcon className="size-10" />
              </div>

              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                  Workflow Milestone
                </span>
                <h4 className="text-lg font-bold text-white mt-1">{currentStep.title}</h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto mt-1">
                  Automatic data synchronization with your personalized campus placement dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. CORE PLATFORM FEATURES (With Framer Motion Staggered Scroll Entrance)
         ========================================================================= */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FEC163] px-3 py-1 rounded-full bg-[#FEC163]/10 border border-[#FEC163]/20">
            Engineered Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3">
            Built For Uncompromising Placement Success
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Every layer of the platform is designed to eliminate blind spots, maximize interview shortlists, and prepare you for technical rounds.
          </p>
        </motion.div>

        {/* Feature Grid with Staggered Entrance Reveal on Scroll */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CORE_FEATURES.map((feat) => {
            const Icon = feat.icon;
            const isPreviewFeature = feat.title.includes('ATS') || feat.title.includes('Skill Gap');
            return (
              <motion.div
                key={feat.title}
                variants={featureCardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => onOpenAuth(false)}
                className="group relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#140603]/90 to-[#0A0301]/95 p-6 sm:p-7 shadow-xl hover:border-[#FEC163]/50 hover:shadow-[0_12px_36px_rgba(222,67,19,0.25)] transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Ambient Top Card Glow */}
                <div className="absolute top-0 right-0 size-32 bg-[#FEC163]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FEC163]/10 transition-colors" />

                <div className="space-y-4 relative z-10">
                  {/* Top Icon & Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="size-12 rounded-2xl bg-gradient-to-br from-[#FEC163]/20 via-[#FA8C28]/10 to-transparent border border-[#FEC163]/30 flex items-center justify-center text-[#FEC163] shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="size-6 text-[#FEC163]" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
                      {feat.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#FEC163] transition-colors leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Highlight Metric & Interactive Trigger */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] relative z-10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#FEC163]">
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                    <span className="line-clamp-1">{feat.interactiveBadge}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-zinc-400 group-hover:text-white transition-colors hidden sm:inline">
                      Sign Up to Access
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAuth(false);
                      }}
                      className="size-7 rounded-lg bg-white/[0.06] group-hover:bg-[#FEC163] text-zinc-400 group-hover:text-black flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      title="Sign up to access this feature"
                    >
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* =========================================================================
         5. ENGINEERING & BRANCH TRACK EXPLORER
         ========================================================================= */}
      <section id="disciplines" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FEC163] px-3 py-1 rounded-full bg-[#FEC163]/10 border border-[#FEC163]/20">
            Branch-Wise Placement Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Tailored For Every College Discipline
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Whether you are in Mechanical, Computer Science, ECE, Biotech, or Commerce, explore role cutoffs and starting CTC ranges.
          </p>
        </div>

        {/* Discipline Tabs */}
        <div className="flex justify-center mb-8">
          <div className="no-scrollbar inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1.5 overflow-x-auto max-w-full">
            {DISCIPLINE_TRACKS.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedDiscipline(track)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedDiscipline.id === track.id
                    ? 'bg-[#FEC163] text-zinc-950 font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {track.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Discipline Deep-Dive Box */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#120603]/80 p-6 sm:p-8 max-w-4xl mx-auto shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-[10px] font-mono text-[#FEC163] uppercase tracking-wider">
                Top Placement Target Role
              </span>
              <h3 className="text-2xl font-bold text-white mt-0.5">{selectedDiscipline.role}</h3>
              <p className="text-xs text-zinc-400 mt-1">{selectedDiscipline.demand}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Median Starting CTC</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                {selectedDiscipline.salary}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
              High-Demand Placement Skills Recruiter Benchmark:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedDiscipline.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-zinc-400">
              Explore roadmap and mock questions curated specifically for {selectedDiscipline.name}.
            </span>
            <button
              type="button"
              onClick={() => onOpenAuth(false)}
              className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Sign Up for {selectedDiscipline.name} Track</span>
              <ArrowRight className="size-3.5 text-[#FEC163]" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
         6. REPUTATION & REAL STUDENT RESULTS (With Staggered Scroll Entrance)
         ========================================================================= */}
      <section id="outcomes" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FEC163] px-3 py-1 rounded-full bg-[#FEC163]/10 border border-[#FEC163]/20">
            Real Student Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Transforming College Placements
          </h2>
        </motion.div>

        {/* Staggered Outcome Cards Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            variants={featureCardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onOpenAuth(false)}
            className="rounded-3xl border border-white/[0.08] bg-[#120603]/80 p-6 space-y-4 hover:border-[#FEC163]/40 transition-all shadow-xl cursor-pointer"
            title="Sign up to join these placed students"
          >
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full bg-gradient-to-tr from-[#FEC163] to-[#DE4313] p-0.5">
                <div className="size-full rounded-full bg-[#120603] flex items-center justify-center font-bold text-xs text-white">
                  RS
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Rohan Sharma</h4>
                <p className="text-[11px] text-zinc-400 font-mono">B.Tech Mech · Tier-3 College</p>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              "Being in Mechanical, I struggled to pass tech resumes. SkillBridge’s ATS scanner showed me exactly how to highlight ROS2 robotics projects and I placed at Tata Elxsi for 14 LPA."
            </p>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#FEC163]">
              <span>Placed: Tata Elxsi</span>
              <span>14 LPA Offer</span>
            </div>
          </motion.div>

          <motion.div
            variants={featureCardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onOpenAuth(false)}
            className="rounded-3xl border border-white/[0.08] bg-[#120603]/80 p-6 space-y-4 hover:border-[#FEC163]/40 transition-all shadow-xl cursor-pointer"
            title="Sign up to join these placed students"
          >
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full bg-gradient-to-tr from-[#FEC163] to-[#DE4313] p-0.5">
                <div className="size-full rounded-full bg-[#120603] flex items-center justify-center font-bold text-xs text-white">
                  AV
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Ananya Verma</h4>
                <p className="text-[11px] text-zinc-400 font-mono">B.Tech CSE · State University</p>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              "The Greenroom mock interview studio was a total gamechanger. Practicing speech pacing and getting STAR feedback eliminated my placement anxiety before Microsoft rounds."
            </p>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#FEC163]">
              <span>Placed: Microsoft Cloud</span>
              <span>24 LPA Offer</span>
            </div>
          </motion.div>

          <motion.div
            variants={featureCardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onOpenAuth(false)}
            className="rounded-3xl border border-white/[0.08] bg-[#120603]/80 p-6 space-y-4 hover:border-[#FEC163]/40 transition-all shadow-xl cursor-pointer"
            title="Sign up to join these placed students"
          >
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full bg-gradient-to-tr from-[#FEC163] to-[#DE4313] p-0.5">
                <div className="size-full rounded-full bg-[#120603] flex items-center justify-center font-bold text-xs text-white">
                  KP
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Kunal Patel</h4>
                <p className="text-[11px] text-zinc-400 font-mono">B.Com Finance · Autonomous College</p>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              "The personalized roadmap isolated my SQL and Power BI gaps within 10 seconds of uploading my CV. Followed the 6-week curriculum and cleared the FinTech quant interview."
            </p>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#FEC163]">
              <span>Placed: Barclays Quant</span>
              <span>11.5 LPA Offer</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* =========================================================================
         6. INTERACTIVE FAQ ACCORDION
         ========================================================================= */}
      <section id="faq" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FEC163] px-3 py-1 rounded-full bg-[#FEC163]/10 border border-[#FEC163]/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mt-3">
            Got Questions? We Have Answers.
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/[0.08] bg-[#120603]/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  <ChevronDown
                    className={`size-4 text-[#FEC163] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-zinc-300 leading-relaxed border-t border-white/[0.04] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
         7. HIGH-CONVERSION BOTTOM CTA BANNER
         ========================================================================= */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-[#FEC163]/40 bg-gradient-to-r from-[#200A04] via-[#120603] to-[#0A0301] p-8 sm:p-14 text-center shadow-[0_0_60px_rgba(222,67,19,0.3)] space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 size-64 bg-[#FEC163]/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FEC163] px-3 py-1 rounded-full bg-[#FEC163]/10 border border-[#FEC163]/25">
            Your Placement Journey Starts Today
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Stop Guessing Placement Cutoffs. Start Preparing With AI.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto">
            Join over 12,400 students auditing their resumes, building verified GitHub proofs of work, and clearing technical rounds with confidence.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => onOpenAuth(false)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#FEC163] via-[#FA8C28] to-[#DE4313] hover:brightness-110 text-zinc-950 font-bold text-sm shadow-[0_0_30px_rgba(222,67,19,0.6)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Create Free Student Account</span>
              <ArrowRight className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => onOpenAuth(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Sign In to Existing Account</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
         8. FOOTER
         ========================================================================= */}
      <footer className="relative z-10 border-t border-white/[0.08] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-lg bg-gradient-to-br from-[#FEC163] to-[#DE4313] p-0.5">
              <div className="size-full bg-[#120502] rounded-[6px] flex items-center justify-center">
                <Sparkles className="size-3 text-[#FEC163]" />
              </div>
            </div>
            <span className="font-bold text-zinc-300">SkillBridge AI</span>
            <span>· Campus Placement Intelligence Engine</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => onOpenAuth(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Student Sign In
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth(true, true)}
              className="hover:text-amber-300 transition-colors cursor-pointer text-amber-400/90 flex items-center gap-1"
            >
              <Shield className="size-3" />
              <span>Admin Portal</span>
            </button>
            <span>© 2026 SkillBridge. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPageView;
