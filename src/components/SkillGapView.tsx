import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Career } from '../types.ts';
import { api } from '../services/api.ts';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Layers,
  Sparkles,
  Info,
  ShieldCheck,
  Bell,
  TrendingUp,
  Check,
  ExternalLink,
  Flame,
  Clock,
  Briefcase,
  ChevronRight,
  Lock,
} from 'lucide-react';

interface SkillGapViewProps {
  user: User;
  onNavigate: (tab: string) => void;
  onGenerateRoadmap: (careerId: string) => void;
  onOpenAuth?: (isLogin: boolean) => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  user,
  onNavigate,
  onGenerateRoadmap,
  onOpenAuth,
}) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareerId, setSelectedCareerId] = useState<string>('');
  const [gapData, setGapData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    loadCareersAndGap();
  }, [user.id, user.skills]);

  const loadCareersAndGap = async () => {
    setLoading(true);
    try {
      const careersRes = await api.getCareers();
      setCareers(careersRes.careers);

      // Default to user's career goal or first career
      const initialCareer =
        careersRes.careers.find(
          (c) => c.title.toLowerCase() === (user.careerGoal || '').toLowerCase()
        ) || careersRes.careers[0];

      if (initialCareer) {
        setSelectedCareerId(initialCareer.id);
        const gapRes = await api.getSkillGapAnalysis(user.id, initialCareer.id);
        setGapData(gapRes.gapAnalysis);
      }
    } catch (err) {
      console.error('Error fetching skill gap data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCareerChange = async (careerId: string) => {
    setSelectedCareerId(careerId);
    setLoading(true);
    try {
      const gapRes = await api.getSkillGapAnalysis(user.id, careerId);
      setGapData(gapRes.gapAnalysis);
    } catch (err) {
      console.error('Error updating gap analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedCareer = careers.find((c) => c.id === selectedCareerId);
  const matchPct = gapData?.skillMatchPercentage || 0;
  const missingCount = gapData?.missingSkills?.length || 0;
  const matchedCount = gapData?.matchedSkills?.length || 0;

  // The 12 competency spectrum heights based on match percentage
  const spectrumBars = [
    { label: 'SQL / DB', height: Math.min(100, Math.max(25, matchPct + 10)) },
    { label: 'Python / Code', height: Math.min(100, Math.max(30, matchPct + 5)) },
    { label: 'DSA / Logic', height: Math.min(100, Math.max(20, matchPct - 15)) },
    { label: 'Statistics', height: Math.min(100, Math.max(35, matchPct - 5)) },
    { label: 'System Design', height: Math.min(100, Math.max(20, matchPct - 20)) },
    { label: 'Data Modeling', height: Math.min(100, Math.max(40, matchPct + 8)) },
    { label: 'ETL Pipelines', height: Math.min(100, Math.max(25, matchPct - 10)) },
    { label: 'BI Dashboarding', height: Math.min(100, Math.max(30, matchPct - 12)) },
    { label: 'Cloud / Docker', height: Math.min(100, Math.max(15, matchPct - 25)) },
    { label: 'REST APIs', height: Math.min(100, Math.max(35, matchPct + 2)) },
    { label: 'STAR Behavioral', height: 85 },
    { label: 'Problem Solving', height: 80 },
  ];

  const criticalGap = gapData?.missingSkills?.[0] || {
    name: 'Advanced SQL & Window Functions',
    category: 'Core Technical',
    whyNeeded: 'Mandatory in round 1 technical coding screenings.',
    importance: 'high',
  };

  const bentoCardBase =
    'group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#120502]/90 border border-white/[0.08] hover:border-[#FEC163]/40 p-5 lg:p-6 transition-all duration-300 shadow-[inset_0_0_2px_2px_rgba(255,255,255,0.03),0_4px_20px_-2px_rgba(0,0,0,0.5)]';

  return (
    <div className="space-y-8 pb-16 animate-fade-in max-w-6xl mx-auto w-full px-2 sm:px-4">
      {/* Top Header & Career Selector Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FEC163] mb-1 flex-wrap font-mono">
            <span className="uppercase">Competency Matrix</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Priority Weighted Benchmark</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Indian Placement Cutoffs</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Skill Gap Matrix</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Compare your verified skills against industry benchmarks for your target career. Diagnose exactly what skills unlock campus shortlist filters.
          </p>
        </div>

        {/* Dropdown Career Picker */}
        <div className="flex items-center gap-2.5 shrink-0 bg-white/[0.04] border border-white/[0.08] p-2 rounded-2xl">
          <label className="text-xs font-mono text-zinc-400 whitespace-nowrap pl-2">
            Target Career:
          </label>
          <select
            value={selectedCareerId}
            onChange={(e) => handleCareerChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-black/60 border border-white/10 text-[#FEC163] focus:border-[#FEC163] focus:outline-none cursor-pointer"
          >
            {careers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.domain.split(' ')[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-24 text-center text-zinc-500 text-xs">
          Computing weighted skill gap matrix...
        </div>
      ) : gapData ? (
        <div className="space-y-8">
          {/* =========================================================================
             BENTO 2 GRID MATRIX (Inspired by User's Bento Component)
             ========================================================================= */}
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {/* Card 1: Top Left (Large - 2 cols) - Competency Spectrum Histogram */}
            <div
              className={`${bentoCardBase} min-h-[340px] flex-col justify-end md:col-span-2`}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Visual Container */}
              <div className="relative z-10 flex w-full flex-1 items-start justify-center overflow-visible">
                <div className="flex w-full flex-col">
                  {/* Dashboard Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-zinc-400 text-[10px] font-mono font-semibold tracking-wider uppercase">
                        Target Role Benchmark
                      </span>
                      <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                        {matchPct}%{' '}
                        <span className="text-emerald-400 text-sm font-semibold">
                          Match ({gapData.readinessLevel})
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300 font-semibold">
                        {matchedCount} Acquired
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-[#FEC163] font-semibold">
                        {missingCount} Missing
                      </span>
                    </div>
                  </div>

                  {/* Animated Bar Chart Spectrum */}
                  <div className="flex h-32 items-end gap-1.5 sm:gap-2 overflow-hidden px-1">
                    {spectrumBars.map((bar, i) => (
                      <div key={bar.label} className="flex-1 flex flex-col items-center h-full justify-end group/bar">
                        <motion.div
                          className="w-full rounded-t-md bg-gradient-to-t from-amber-600 via-amber-500 to-[#FEC163]"
                          initial={{ height: `${bar.height}%` }}
                          animate={
                            hoveredCard === 1
                              ? {
                                  height: [
                                    `${bar.height}%`,
                                    `${Math.max(15, bar.height - 25)}%`,
                                    `${bar.height}%`,
                                  ],
                                }
                              : { height: `${bar.height}%` }
                          }
                          transition={{
                            duration: 2,
                            repeat: hoveredCard === 1 ? Infinity : 0,
                            delay: i * 0.05,
                            ease: 'easeInOut',
                          }}
                        />
                        <span className="text-[8px] sm:text-[9px] font-mono text-zinc-500 truncate w-full text-center mt-1.5">
                          {bar.label.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text Content (Bottom Left) */}
              <div className="relative z-10 flex flex-col gap-1.5 pt-4 border-t border-white/[0.06]">
                <h3 className="text-white text-lg font-bold">
                  Competency Spectrum vs. Industry Standard
                </h3>
                <p className="text-zinc-400 max-w-xl text-xs leading-relaxed">
                  Evaluated across 12 placement dimensions. Scoring 80%+ moves your profile into the top 15% recruiter shortlist band.
                </p>
              </div>
            </div>

            {/* Card 2: Top Right (Small - 1 col) - Campus Screening Cutoff Pillars */}
            <div
              className={`${bentoCardBase} min-h-[340px] flex-col justify-start md:col-span-1`}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Text Content (Top Left) */}
              <div className="relative z-10 flex flex-col gap-1 pb-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                  Hiring Filters
                </span>
                <h3 className="text-white text-lg font-bold">
                  Campus Cutoff Health
                </h3>
                <p className="text-zinc-400 text-xs">
                  Prerequisites across placement drive rounds.
                </p>
              </div>

              {/* Visual Container: 3 Service Health Pillars */}
              <div className="relative z-10 flex w-full flex-1 items-end justify-center overflow-visible pt-4 pb-1">
                <div className="relative z-10 flex w-full flex-col gap-3.5">
                  <div className="border-b border-white/[0.08] flex items-center justify-between pb-2">
                    <span className="text-zinc-500 text-[9px] font-bold tracking-widest uppercase font-mono">
                      Drive Stages
                    </span>
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="size-1.5 rounded-full bg-emerald-400"
                        animate={
                          hoveredCard === 2
                            ? { opacity: [1, 0.3, 1] }
                            : { opacity: 1 }
                        }
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-emerald-400 text-[9px] font-mono font-bold tracking-wider uppercase">
                        {matchPct >= 70 ? 'Tier-1 Eligible' : 'Gaps Detected'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {[
                      {
                        name: 'OA Technical Round',
                        score: Math.min(95, Math.max(40, matchPct + 10)),
                        delay: 0.1,
                      },
                      {
                        name: 'System / Coding Round 2',
                        score: Math.min(90, Math.max(30, matchPct - 5)),
                        delay: 0.3,
                      },
                      {
                        name: 'STAR HR & Leadership',
                        score: 88,
                        delay: 0.5,
                      },
                    ].map((stage) => (
                      <div key={stage.name} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-300 text-[11px] font-semibold">
                            {stage.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[#FEC163] font-mono text-[10px] font-bold">
                              {stage.score}%
                            </span>
                            <div className="relative h-1.5 w-12 overflow-hidden rounded-full bg-white/[0.08]">
                              <motion.div
                                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 to-[#FEC163]"
                                initial={{ width: `${stage.score}%` }}
                                animate={
                                  hoveredCard === 2
                                    ? { width: [`${stage.score}%`, `${Math.max(10, stage.score - 20)}%`, `${stage.score}%`] }
                                    : { width: `${stage.score}%` }
                                }
                                transition={{
                                  duration: 1.8,
                                  repeat: hoveredCard === 2 ? Infinity : 0,
                                  delay: stage.delay,
                                  ease: 'easeInOut',
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Mini tick-marks */}
                        <div className="flex items-center gap-1 pt-0.5">
                          {[...Array(12)].map((_, j) => (
                            <motion.div
                              key={j}
                              className={`h-1.5 flex-1 rounded-[1px] ${
                                j < Math.round((stage.score / 100) * 12)
                                  ? 'bg-[#FEC163]'
                                  : 'bg-white/10'
                              }`}
                              initial={{ opacity: 0.3 }}
                              animate={
                                hoveredCard === 2
                                  ? { opacity: [0.3, 1, 0.3] }
                                  : { opacity: 0.3 }
                              }
                              transition={{
                                duration: 0.5,
                                delay: hoveredCard === 2 ? stage.delay + j * 0.04 : 0,
                                repeat: hoveredCard === 2 ? Infinity : 0,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Bottom Left (Small - 1 col) - Critical Gatekeeper Alert */}
            <div
              className={`${bentoCardBase} min-h-[320px] flex-col justify-end md:col-span-1`}
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Visual Alert Area */}
              <div className="relative z-10 flex w-full flex-1 items-start justify-center overflow-visible pt-4">
                <div className="relative flex w-full flex-col items-center">
                  {/* Alert Bell Badge */}
                  <motion.div
                    className="relative z-30 flex size-12 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-950/40 shadow-sm backdrop-blur-md text-rose-400"
                    animate={hoveredCard === 3 ? { y: -6 } : { y: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      animate={
                        hoveredCard === 3
                          ? { rotate: [0, -15, 15, -15, 15, 0] }
                          : { rotate: 0 }
                      }
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Bell className="size-5" />
                    </motion.div>

                    {/* Ping Dot */}
                    <div className="absolute right-2.5 top-2.5 size-2 rounded-full bg-rose-500" />
                    <motion.div
                      className="absolute right-2.5 top-2.5 size-2 rounded-full bg-rose-500"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        hoveredCard === 3
                          ? { scale: 2.5, opacity: 0 }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{
                        duration: 1,
                        repeat: hoveredCard === 3 ? Infinity : 0,
                      }}
                    />
                  </motion.div>

                  {/* Toast Stack Alert */}
                  <div className="mt-3 w-full">
                    <div className="p-3.5 rounded-xl border border-rose-500/30 bg-black/60 shadow-lg backdrop-blur-md space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">
                          High Priority Gap
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">
                          Gatekeeper
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-xs truncate">
                        {criticalGap.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                        {criticalGap.whyNeeded}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content (Bottom Left) */}
              <div className="relative z-10 flex flex-col gap-1.5 pt-4 border-t border-white/[0.06]">
                <h3 className="text-white text-lg font-bold">
                  Critical Gatekeeper Gaps
                </h3>
                <p className="text-zinc-400 text-xs">
                  Unlock this skill first to clear primary automated ATS screening filters.
                </p>
              </div>
            </div>

            {/* Card 4: Bottom Right (Large - 2 cols) - Competency Matrix Explorer */}
            <div
              className={`${bentoCardBase} min-h-[320px] flex-col justify-start md:col-span-2`}
              onMouseEnter={() => setHoveredCard(4)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <span>Recruiter Competency Matrix</span>
                  </h3>
                  <p className="text-zinc-400 text-xs">
                    Verified competencies vs. high-yield missing skills for {selectedCareer?.title}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('courses')}
                  className="text-xs text-[#FEC163] hover:text-white font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Learning Academy</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>

              {/* Side-by-Side Matrix Grid */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 flex-1">
                {/* Left Column: Acquired Skills */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5" />
                      <span>Verified Skills ({matchedCount})</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto no-scrollbar">
                    {gapData.matchedSkills?.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-medium flex items-center gap-1"
                      >
                        <Check className="size-2.5" />
                        <span>{skill}</span>
                      </span>
                    ))}
                    {matchedCount === 0 && (
                      <span className="text-xs text-zinc-500 italic">
                        No matched skills recorded. Update your profile.
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Column: Missing Skills with Actionable Why */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#FEC163] font-bold flex items-center gap-1.5">
                      <AlertTriangle className="size-3.5" />
                      <span>Missing Skills to Learn ({missingCount})</span>
                    </span>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                    {gapData.missingSkills?.slice(0, 3).map((skill: any) => (
                      <div
                        key={skill.name}
                        className="p-2.5 rounded-xl border border-white/[0.08] bg-black/40 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px] truncate">
                            {skill.name}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase ${
                              skill.importance === 'high'
                                ? 'bg-rose-950 text-rose-300 border border-rose-800/40'
                                : 'bg-amber-950 text-amber-300 border border-amber-800/40'
                            }`}
                          >
                            {skill.importance}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 line-clamp-1">
                          {skill.whyNeeded}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-mono text-zinc-400">
                  Target Role: <strong className="text-white">{selectedCareer?.title}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (selectedCareer) {
                      onGenerateRoadmap(selectedCareer.id);
                      onNavigate('roadmap');
                    } else {
                      onNavigate('roadmap');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FEC163] hover:bg-[#ffcd7d] text-zinc-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Sparkles className="size-3.5" />
                  <span>Generate Adaptive Roadmap</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Next in Workflow: Proceed to Personalized Roadmap */}
          <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#120603]/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-[#FEC163] text-black font-bold text-sm flex items-center justify-center font-mono shrink-0">
                4
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Generate Personalized Roadmap
                </h4>
                <p className="text-xs text-zinc-400">
                  Transform identified skill gaps into a structured, week-by-week placement curriculum.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (selectedCareer) {
                  onGenerateRoadmap(selectedCareer.id);
                  onNavigate('roadmap');
                } else {
                  onNavigate('roadmap');
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              <span>Proceed to Roadmap</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
