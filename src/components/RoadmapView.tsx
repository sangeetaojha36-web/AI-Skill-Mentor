import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Roadmap, RoadmapStep } from '../types.ts';
import { api } from '../services/api.ts';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  Circle,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Award,
  Layers,
  Terminal,
  Cpu,
  Compass,
  Target,
  ExternalLink,
  Play,
  X,
  Clock,
  Zap,
} from 'lucide-react';

interface RoadmapViewProps {
  user: User;
  onNavigate: (tab: string) => void;
}

// Fallback curated milestones if initial roadmap is loading or empty
const DEFAULT_ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 'step-1',
    phase: 1,
    title: 'Core Programming & Data Structures Mastery',
    description:
      'Master time and space complexity, arrays, strings, hash maps, and foundational algorithms calibrated for technical screening rounds.',
    skillsCovered: ['Data Structures', 'Python', 'Algorithms', 'Complexity Analysis'],
    estimatedWeeks: 3,
    completed: true,
    recommendedResources: [
      { title: 'Striver SDE Sheet & LeetCode Patterns', type: 'Interactive', url: 'https://leetcode.com' },
      { title: 'Algorithmic Problem Solving in Python', type: 'Course', url: 'https://geeksforgeeks.org' },
    ],
  },
  {
    id: 'step-2',
    phase: 2,
    title: 'Relational Database Engineering & Advanced SQL',
    description:
      'Master indexing, query execution plans, subqueries, and window functions (RANK, DENSE_RANK, LEAD, LAG) for enterprise data operations.',
    skillsCovered: ['SQL', 'Window Functions', 'PostgreSQL', 'Query Optimization'],
    estimatedWeeks: 3,
    completed: false,
    recommendedResources: [
      { title: 'SQL & Relational DBs for Placements', type: 'Course', url: 'https://geeksforgeeks.org' },
      { title: 'PostgreSQL Performance Tuning & Schemas', type: 'Interactive', url: 'https://postgresql.org' },
    ],
  },
  {
    id: 'step-3',
    phase: 3,
    title: 'System Design & RESTful Microservices Architecture',
    description:
      'Design scalable distributed services, caching layers with Redis, message queues, and rate-limiting middleware with production monitoring.',
    skillsCovered: ['System Design', 'Microservices', 'REST APIs', 'Redis', 'Docker'],
    estimatedWeeks: 4,
    completed: false,
    recommendedResources: [
      { title: 'High-Level System Design for Engineers', type: 'Tutorial', url: 'https://github.com' },
      { title: 'Building Scalable APIs with Node & Express', type: 'Interactive', url: 'https://freecodecamp.org' },
    ],
  },
  {
    id: 'step-4',
    phase: 4,
    title: 'Production Capstone & Placement Greenroom Simulation',
    description:
      'Build and deploy a live verified web application, prepare STAR behavioral responses, and undergo simulated mock interviews.',
    skillsCovered: ['Full Stack Deployment', 'STAR Method', 'Mock Interviews', 'Git & CI/CD'],
    estimatedWeeks: 4,
    completed: false,
    recommendedResources: [
      { title: 'Greenroom AI Behavioral Interview Studio', type: 'Interactive' },
      { title: 'Production Capstone Deployment Guide', type: 'Certification' },
    ],
  },
];

/* ---------- Filter Button Component (Inspired by IntegrationsCard) ---------- */
const FilterButton: React.FC<{
  label: string;
  active?: boolean;
  onClick: () => void;
  selected?: string;
}> = ({ label, active, onClick, selected }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition cursor-pointer active:scale-95 ${
      active
        ? 'border-amber-400/60 bg-amber-500/15 text-[#FEC163]'
        : selected
        ? 'border-white/20 bg-white/[0.08] text-white'
        : 'border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/15'
    }`}
  >
    <span>{selected || label}</span>
    <ChevronDown
      size={12}
      className={`transition-transform duration-300 ${active ? 'rotate-180 text-[#FEC163]' : 'text-zinc-500'}`}
    />
  </button>
);

/* ---------- Single Roadmap Milestone Card (Inspired by IntegrationCard) ---------- */
const RoadmapMilestoneCard: React.FC<{
  step: RoadmapStep;
  idx: number;
  isCurrent: boolean;
  onToggle: (stepId: string) => void;
  onNavigate: (tab: string) => void;
}> = ({ step, idx, isCurrent, onToggle, onNavigate }) => {
  const [expanded, setExpanded] = useState(isCurrent);

  // Pick category icon based on phase
  const getPhaseIcon = () => {
    if (step.phase === 1) return <Terminal className="size-5 text-amber-400" />;
    if (step.phase === 2) return <Layers className="size-5 text-indigo-400" />;
    if (step.phase === 3) return <Cpu className="size-5 text-emerald-400" />;
    return <Award className="size-5 text-rose-400" />;
  };

  const getBorderColor = () => {
    if (step.completed) return 'border-emerald-500/30 hover:border-emerald-500/50';
    if (isCurrent) return 'border-[#FEC163]/50 hover:border-[#FEC163]/80';
    return 'border-white/[0.08] hover:border-white/20';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col border-b border-white/[0.06] px-5 py-4.5 transition-colors last:border-b-0 hover:bg-white/[0.02] ${
        step.completed ? 'bg-emerald-950/[0.06]' : isCurrent ? 'bg-amber-950/[0.08]' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Left Icon Container */}
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl border transition-all ${
            step.completed
              ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400'
              : isCurrent
              ? 'border-amber-500/40 bg-amber-950/40 text-[#FEC163] shadow-md shadow-amber-950/40'
              : 'border-white/10 bg-white/[0.04] text-zinc-400'
          }`}
        >
          {getPhaseIcon()}
        </div>

        {/* Main Content Area */}
        <div className="min-w-0 flex-1">
          {/* Header row: Phase kicker + Status Badge + Interactive Toggle Checkbox */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
                  PHASE 0{step.phase} · {step.title.split(' ')[0]} TRACK
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-mono text-zinc-400">~{step.estimatedWeeks} Weeks</span>
              </div>
              <h3 className="text-[15px] font-bold text-white mt-0.5 group-hover:text-[#FEC163] transition-colors leading-snug">
                {step.title}
              </h3>
            </div>

            {/* Status Badge + Toggle Checkbox Button */}
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
              {step.completed ? (
                <span className="shrink-0 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-2.5 py-0.5 text-[9px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Check className="size-2.5" />
                  <span>COMPLETED</span>
                </span>
              ) : isCurrent ? (
                <span className="shrink-0 rounded-full border border-amber-500/40 bg-amber-950/60 px-2.5 py-0.5 text-[9px] font-bold text-[#FEC163] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#FEC163] animate-pulse" />
                  <span>IN PROGRESS</span>
                </span>
              ) : (
                <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                  UPCOMING
                </span>
              )}

              {/* Interactive Milestone Checkbox */}
              <button
                type="button"
                onClick={() => onToggle(step.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  step.completed
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                    : 'border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:border-white/20'
                }`}
                title={step.completed ? 'Mark phase as incomplete' : 'Mark phase as completed'}
              >
                {step.completed ? (
                  <>
                    <CheckCircle2 className="size-3.5 text-emerald-400" />
                    <span className="text-[11px]">Verified</span>
                  </>
                ) : (
                  <>
                    <Circle className="size-3.5 text-zinc-500" />
                    <span className="text-[11px]">Complete</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">{step.description}</p>

          {/* Tag Chips & Metadata Row */}
          <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-1.5">
              {step.skillsCovered.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] whitespace-nowrap font-mono text-zinc-500 uppercase tracking-wider">
                {step.skillsCovered.length} SKILLS · {step.recommendedResources?.length || 2} RESOURCES
              </span>

              {/* Expand Deep Dive Accordion Trigger */}
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="text-[11px] text-[#FEC163] hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                <span>{expanded ? 'Hide Details' : 'Deep Dive'}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Expanded Deep Dive Drawer */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-3.5 pt-3.5 border-t border-white/[0.08] space-y-3"
              >
                {/* Recommended Resources List */}
                {step.recommendedResources && step.recommendedResources.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1">
                      <BookOpen className="size-3 text-[#FEC163]" />
                      <span>Curated Learning Modules for this Phase</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.recommendedResources.map((res, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-center justify-between p-2.5 rounded-lg border border-white/[0.08] bg-black/40 text-xs"
                        >
                          <div className="min-w-0 pr-2">
                            <span className="text-white font-medium truncate block">{res.title}</span>
                            <span className="text-[10px] font-mono text-indigo-400">{res.type}</span>
                          </div>
                          {res.url ? (
                            <button
                              type="button"
                              onClick={() => window.open(res.url, '_blank')}
                              className="px-2 py-1 rounded bg-white/[0.08] hover:bg-white/[0.14] text-[10px] font-semibold text-[#FEC163] shrink-0 cursor-pointer flex items-center gap-1"
                            >
                              <span>Launch</span>
                              <ExternalLink className="size-2.5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onNavigate('courses')}
                              className="px-2 py-1 rounded bg-[#FEC163]/15 hover:bg-[#FEC163]/25 text-[10px] font-semibold text-[#FEC163] shrink-0 cursor-pointer flex items-center gap-1"
                            >
                              <span>View</span>
                              <ArrowRight className="size-2.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Placement Interview Question Sneak-Peek */}
                <div className="p-3 rounded-xl border border-white/[0.06] bg-black/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">
                      Recruiter Placement Checkpoint
                    </span>
                    <p className="text-zinc-300 text-[11px]">
                      Practice technical machine coding & system questions calibrated for {step.skillsCovered[0] || 'core tools'}.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('interview')}
                    className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shrink-0 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto transition-colors"
                  >
                    <Play className="size-3 fill-current" />
                    <span>Practice in AI Greenroom</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------- Main RoadmapView Component ---------- */
export const RoadmapView: React.FC<RoadmapViewProps> = ({ user, onNavigate }) => {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);

  // Filter & Search states (Inspired by user's IntegrationsCard)
  const [activePopover, setActivePopover] = useState<'status' | 'skill' | 'more' | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('All statuses');
  const [selectedSkill, setSelectedSkill] = useState('All skills');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadRoadmap();
  }, [user.id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadRoadmap = async () => {
    setLoading(true);
    try {
      const data = await api.getCurrentRoadmap(user.id);
      if (data?.roadmap && data.roadmap.steps && data.roadmap.steps.length > 0) {
        setRoadmap(data.roadmap);
      } else {
        // Seed default roadmap
        setRoadmap({
          id: `roadmap-${Date.now()}`,
          userId: user.id,
          careerId: 'career-swe',
          careerTitle: user.careerGoal || 'Software Engineer',
          steps: DEFAULT_ROADMAP_STEPS,
          progressPercent: 25,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error('Error fetching roadmap:', err);
      // Fallback
      setRoadmap({
        id: `roadmap-fallback`,
        userId: user.id,
        careerId: 'career-swe',
        careerTitle: user.careerGoal || 'Software Engineer',
        steps: DEFAULT_ROADMAP_STEPS,
        progressPercent: 25,
        updatedAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStep = async (stepId: string) => {
    if (!roadmap) return;
    try {
      const data = await api.toggleRoadmapStep(user.id, stepId);
      if (data?.roadmap) {
        setRoadmap(data.roadmap);
      } else {
        // Local toggle fallback
        const updatedSteps = roadmap.steps.map((s) => (s.id === stepId ? { ...s, completed: !s.completed } : s));
        const completedCount = updatedSteps.filter((s) => s.completed).length;
        setRoadmap({
          ...roadmap,
          steps: updatedSteps,
          progressPercent: Math.round((completedCount / updatedSteps.length) * 100),
        });
      }
    } catch (err) {
      console.error('Error toggling step:', err);
      // Local fallback
      const updatedSteps = roadmap.steps.map((s) => (s.id === stepId ? { ...s, completed: !s.completed } : s));
      const completedCount = updatedSteps.filter((s) => s.completed).length;
      setRoadmap({
        ...roadmap,
        steps: updatedSteps,
        progressPercent: Math.round((completedCount / updatedSteps.length) * 100),
      });
    }
  };

  const handleRegenerateRoadmap = async () => {
    if (!roadmap) return;
    setRegenerating(true);
    try {
      const data = await api.generateRoadmap(user.id, roadmap.careerId);
      if (data?.roadmap) {
        setRoadmap(data.roadmap);
      }
    } catch (err) {
      console.error('Error regenerating roadmap:', err);
    } finally {
      setRegenerating(false);
    }
  };

  const stepsList = roadmap?.steps || DEFAULT_ROADMAP_STEPS;
  const completedSteps = stepsList.filter((s) => s.completed).length;
  const totalSteps = stepsList.length || 1;
  const progress = Math.round((completedSteps / totalSteps) * 100);
  const totalEstimatedWeeks = stepsList.reduce((acc, curr) => acc + (curr.estimatedWeeks || 3), 0);

  // Extract unique skill names across all steps for filter popover
  const allUniqueSkills = useMemo(() => {
    const set = new Set<string>();
    stepsList.forEach((s) => s.skillsCovered.forEach((sk) => set.add(sk)));
    return ['All skills', ...Array.from(set)];
  }, [stepsList]);

  const statusOptions = ['All statuses', 'In Progress', 'Completed', 'Upcoming'];

  // Filter Logic (Exact user inspiration pattern)
  const filteredSteps = useMemo(() => {
    return stepsList.filter((step, idx) => {
      const isCurrent = !step.completed && (idx === 0 || stepsList[idx - 1].completed);
      const matchesSearch =
        step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        step.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        step.skillsCovered.some((sk) => sk.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesStatus = true;
      if (selectedStatus === 'Completed') matchesStatus = step.completed;
      else if (selectedStatus === 'In Progress') matchesStatus = isCurrent;
      else if (selectedStatus === 'Upcoming') matchesStatus = !step.completed && !isCurrent;

      const matchesSkill = selectedSkill === 'All skills' || step.skillsCovered.includes(selectedSkill);

      return matchesSearch && matchesStatus && matchesSkill;
    });
  }, [stepsList, searchQuery, selectedStatus, selectedSkill]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredSteps.length / itemsPerPage);
  const paginatedSteps = filteredSteps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-8 pb-16 animate-fade-in max-w-5xl mx-auto w-full px-2 sm:px-4">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FEC163] mb-1 flex-wrap font-mono">
            <span className="uppercase">Adaptive Placement Curriculum</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Bypasses Known Prerequisites</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Milestone Driven</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Career Roadmap & Milestone Hub</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            Target Career:{' '}
            <span className="text-[#FEC163] font-semibold">
              {roadmap?.careerTitle || user.careerGoal || 'Software Engineer'}
            </span>
            {' · '}
            Calibrated for campus hiring drives and technical interview rounds.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleRegenerateRoadmap}
            disabled={regenerating}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-xl transition-all whitespace-nowrap shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className={`size-3.5 text-[#FEC163] ${regenerating ? 'animate-spin' : ''}`} />
            <span>{regenerating ? 'Calibrating with AI...' : 'Regenerate with AI'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('careers')}
            className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-[#FEC163] hover:bg-[#ffcd7d] rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            Change Target Role
          </button>
        </div>
      </div>

      {/* Progress Cockpit Overview Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#120603]/80 p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#DE4313]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#FEC163] uppercase">
              <Compass className="size-3.5" />
              <span>Overall Placement Readiness</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {completedSteps} of {totalSteps} Phases Completed
            </h2>
            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
              Toggle milestones as you complete topics to update your ATS interview screening readiness score in real-time.
            </p>
          </div>

          <div className="flex items-center gap-5 sm:min-w-[200px] justify-between sm:justify-end">
            <div className="text-left sm:text-right">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#FEC163] tabular-nums">
                {progress}%
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">~{totalEstimatedWeeks} Weeks Total</div>
            </div>

            <div className="size-14 rounded-full border-4 border-white/10 flex items-center justify-center relative shrink-0">
              <span className="text-xs font-bold font-mono text-white">{completedSteps}/{totalSteps}</span>
              <div
                className="absolute inset-0 rounded-full border-4 border-[#FEC163] transition-all duration-700"
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${progress >= 25 ? '100% 0%' : '50% 0%'}, ${
                    progress >= 50 ? '100% 100%' : progress >= 25 ? '100% 50%' : '50% 0%'
                  }, ${progress >= 75 ? '0% 100%' : '50% 50%'}, ${progress >= 100 ? '0% 0%' : '50% 50%'})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Progress Bar Strip */}
        <div className="w-full bg-black/60 rounded-full h-2 mt-5 overflow-hidden border border-white/5 relative z-10">
          <div
            className="bg-gradient-to-r from-amber-600 via-amber-500 to-[#FEC163] h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* =========================================================================
         THE MASTER INTEGRATIONS-STYLE CARD CONTAINER (Direct User Inspiration)
         ========================================================================= */}
      <div className="text-foreground flex w-full flex-col items-center bg-transparent">
        <div className="w-full overflow-hidden rounded-[22px] border border-white/[0.1] bg-[#120603]/90 shadow-2xl backdrop-blur-xl transition-all duration-300">
          {/* Header */}
          <header className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-black/30">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
                <span>Curated Phase Milestones & Deliverables</span>
                <span className="flex size-1.5 rounded-full bg-[#FEC163] animate-pulse" />
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                {filteredSteps.length} of {stepsList.length} Active
              </span>
            </div>
          </header>

          {/* Filters & Search Toolbar (Exact user inspiration pattern) */}
          <div className="relative flex flex-col items-stretch gap-3 border-b border-white/[0.08] bg-[#160703]/80 px-5 py-3.5 md:flex-row md:items-center">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              <FilterButton
                label="All statuses"
                selected={selectedStatus !== 'All statuses' ? selectedStatus : undefined}
                active={activePopover === 'status'}
                onClick={() => setActivePopover(activePopover === 'status' ? null : 'status')}
              />

              <FilterButton
                label="All skills"
                selected={selectedSkill !== 'All skills' ? selectedSkill : undefined}
                active={activePopover === 'skill'}
                onClick={() => setActivePopover(activePopover === 'skill' ? null : 'skill')}
              />

              <FilterButton
                label="More"
                active={activePopover === 'more'}
                onClick={() => setActivePopover(activePopover === 'more' ? null : 'more')}
              />
            </div>

            <div className="hidden flex-1 md:block" />

            {/* Search Input */}
            <div className="group relative w-full md:w-64">
              <Search
                size={14}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-[#FEC163]"
              />
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search milestone, skill or tool..."
                className="w-full rounded-lg border border-white/10 bg-black/40 py-1.5 pr-8 pl-9 text-[12px] text-white placeholder-zinc-500 transition-all focus:border-[#FEC163]/50 focus:outline-none focus:ring-1 focus:ring-[#FEC163]/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Global Popover Dropdown Menu */}
            <AnimatePresence>
              {activePopover && (
                <motion.div
                  ref={popoverRef}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 4 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-5 left-5 z-50 w-auto overflow-hidden rounded-xl border border-white/15 bg-[#170804] p-1.5 shadow-2xl md:right-auto md:left-5 md:min-w-56"
                >
                  {/* Status Options */}
                  {activePopover === 'status' &&
                    statusOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setSelectedStatus(opt);
                          setActivePopover(null);
                          setCurrentPage(1);
                        }}
                        className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                      >
                        <span>{opt}</span>
                        {selectedStatus === opt && <Check size={12} className="text-[#FEC163]" />}
                      </button>
                    ))}

                  {/* Skills Options */}
                  {activePopover === 'skill' && (
                    <div className="max-h-60 overflow-y-auto no-scrollbar space-y-0.5">
                      {allUniqueSkills.map((sk) => (
                        <button
                          key={sk}
                          type="button"
                          onClick={() => {
                            setSelectedSkill(sk);
                            setActivePopover(null);
                            setCurrentPage(1);
                          }}
                          className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                        >
                          <span className="truncate">{sk}</span>
                          {selectedSkill === sk && <Check size={12} className="text-[#FEC163] shrink-0" />}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Advanced More Options */}
                  {activePopover === 'more' && (
                    <div className="space-y-1 p-2">
                      <p className="px-2 pb-1.5 text-[9px] font-bold tracking-wider text-zinc-500 uppercase font-mono">
                        Milestone Settings
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          // Sort phase ascending
                          setActivePopover(null);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                      >
                        <span>Sort by Phase Order</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActivePopover(null);
                          onNavigate('interview');
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                      >
                        <span>Launch AI Greenroom Practice</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStatus('All statuses');
                          setSelectedSkill('All skills');
                          setSearchQuery('');
                          setActivePopover(null);
                          setCurrentPage(1);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] font-medium text-rose-400 transition-colors hover:bg-rose-950/40 cursor-pointer"
                      >
                        <span>Reset All Filters</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* List of Milestones */}
          <div className="no-scrollbar min-h-[300px] overflow-y-auto bg-transparent">
            <AnimatePresence mode="popLayout">
              {paginatedSteps.map((step, idx) => {
                const isCurrent = !step.completed && (idx === 0 || stepsList[idx - 1]?.completed);

                return (
                  <RoadmapMilestoneCard
                    key={step.id}
                    step={step}
                    idx={idx}
                    isCurrent={isCurrent}
                    onToggle={handleToggleStep}
                    onNavigate={onNavigate}
                  />
                );
              })}

              {paginatedSteps.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3 py-20 text-center px-4"
                >
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <Search size={20} className="text-zinc-400" />
                  </div>
                  <p className="text-[14px] font-semibold tracking-tight text-white">No milestones match your search</p>
                  <p className="text-[12px] text-zinc-400">Try adjusting your keyword, skill filter, or status</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedStatus('All statuses');
                      setSelectedSkill('All skills');
                    }}
                    className="text-[12px] font-bold text-[#FEC163] hover:underline cursor-pointer"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Toolbar (Exact user inspiration pattern) */}
          <footer className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] bg-black/40 px-6 py-4 text-[11px] text-zinc-400 sm:flex-row">
            <span className="font-mono">
              {filteredSteps.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} –{' '}
              {Math.min(currentPage * itemsPerPage, filteredSteps.length)} of {filteredSteps.length} milestones
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="rounded-lg p-1.5 transition-all hover:bg-white/10 disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`flex size-7 items-center justify-center rounded-lg text-[11px] font-bold transition-all cursor-pointer font-mono ${
                        currentPage === pageNum
                          ? 'border border-amber-400/40 bg-amber-500/20 text-[#FEC163] shadow-sm'
                          : 'text-zinc-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                className="rounded-lg p-1.5 transition-all hover:bg-white/10 disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* Bottom Placement Next Step CTA */}
      <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#120603]/60 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>Need targeted video courses for your active milestone?</span>
            <span className="text-[10px] font-mono text-[#FEC163] bg-[#FEC163]/10 px-2 py-0.5 rounded border border-[#FEC163]/20">
              Verified
            </span>
          </h4>
          <p className="text-xs text-zinc-400">
            Explore verified tutorials & practical coding repositories mapped to each phase of your roadmap.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('courses')}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-zinc-950 bg-[#FEC163] hover:bg-[#ffcd7d] rounded-xl shadow-lg shadow-amber-950/40 transition-colors whitespace-nowrap cursor-pointer"
        >
          <span>Explore Recommended Courses</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
};
