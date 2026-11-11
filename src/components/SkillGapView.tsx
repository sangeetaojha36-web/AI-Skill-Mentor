import React, { useState, useEffect, useMemo } from 'react';
import { User, Career, ResumeAnalysis } from '../types.ts';
import { api } from '../services/api.ts';
import { COMPREHENSIVE_CAREERS, CareerPath, CareerSkill } from '../data/careersData.ts';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  Clock,
  Briefcase,
  Search,
  Building2,
  Filter,
  Plus,
  Compass,
  FileText,
  Award,
  Upload,
  X,
  TrendingUp,
  GraduationCap
} from 'lucide-react';

interface SkillGapViewProps {
  user: User;
  latestResume?: ResumeAnalysis;
  onNavigate: (tab: string) => void;
  onGenerateRoadmap: (careerId: string) => void;
  onCareerSelected?: (careerId: string, title: string) => void;
  onOpenAuth?: (isLogin: boolean) => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  user,
  latestResume: initialResume,
  onNavigate,
  onGenerateRoadmap,
  onCareerSelected,
}) => {
  const [careers, setCareers] = useState<CareerPath[]>(COMPREHENSIVE_CAREERS);
  const [selectedCareerId, setSelectedCareerId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [latestResume, setLatestResume] = useState<ResumeAnalysis | null>(initialResume || null);

  // Search & Filter state
  const [skillFilter, setSkillFilter] = useState<'all' | 'high' | 'medium' | 'matched'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Gap Simulator
  const [simulatedSkills, setSimulatedSkills] = useState<Set<string>>(new Set());
  const [learningPlanSkills, setLearningPlanSkills] = useState<Set<string>>(new Set());

  // Load careers and sync with user's preferred career goal and latest resume analysis
  useEffect(() => {
    // 1. Sync latest resume from props or local storage
    if (initialResume) {
      setLatestResume(initialResume);
    } else {
      try {
        const saved = localStorage.getItem('latest_resume_analysis');
        if (saved) {
          setLatestResume(JSON.parse(saved));
        }
      } catch (_) {}
    }

    // 2. Load careers list
    const loadCareers = async () => {
      try {
        const res = await api.getCareers();
        if (res.careers && res.careers.length > 0) {
          setCareers(res.careers);
        }
      } catch (_) {}
    };
    loadCareers();
  }, [initialResume]);

  // Synchronize selected career with user's careerGoal
  useEffect(() => {
    if (careers.length === 0) return;

    if (user.careerGoal) {
      const match = careers.find(
        (c) => c.title.toLowerCase() === user.careerGoal.toLowerCase()
      );
      if (match) {
        setSelectedCareerId(match.id);
        return;
      }
    }

    // Default to first career if not already set
    if (!selectedCareerId && careers[0]) {
      setSelectedCareerId(careers[0].id);
    }
  }, [user.careerGoal, careers, selectedCareerId]);

  const selectedCareer: CareerPath = useMemo(() => {
    return careers.find((c) => c.id === selectedCareerId) || careers[0];
  }, [careers, selectedCareerId]);

  // Handle switching target career
  const handleCareerChange = (careerId: string) => {
    setSelectedCareerId(careerId);
    setSimulatedSkills(new Set());
    const matched = careers.find((c) => c.id === careerId);
    if (matched && onCareerSelected) {
      onCareerSelected(careerId, matched.title);
    }
  };

  // Combine user profile skills and AI resume-extracted skills
  const resumeExtractedSkills: string[] = useMemo(() => {
    return latestResume?.extractedData?.skills || [];
  }, [latestResume]);

  // Compute live Skill Gap Data grounded in the AI resume analysis + profile skills
  const gapAnalysis = useMemo(() => {
    if (!selectedCareer) return null;

    // Normalization helper
    const norm = (s: string) => s.toLowerCase().trim();

    // All verified skills: User profile + AI Resume Extraction + Simulated
    const verifiedSkillsSet = new Set<string>();
    (user.skills || []).forEach((s) => verifiedSkillsSet.add(norm(s)));
    resumeExtractedSkills.forEach((s) => verifiedSkillsSet.add(norm(s)));

    // Simulated skills
    const simulatedSkillsSet = new Set<string>();
    simulatedSkills.forEach((s) => simulatedSkillsSet.add(norm(s)));

    const matchedList: (CareerSkill & { isFromResume: boolean })[] = [];
    const missingList: (CareerSkill & { whyNeeded: string; isSimulated: boolean })[] = [];

    let totalWeight = 0;
    let earnedWeight = 0;
    let simulatedEarnedWeight = 0;

    for (const skill of selectedCareer.requiredSkills) {
      const w = skill.importance === 'high' ? 3 : skill.importance === 'medium' ? 2 : 1;
      totalWeight += w;

      const sNorm = norm(skill.name);
      const isVerified =
        verifiedSkillsSet.has(sNorm) ||
        Array.from(verifiedSkillsSet).some((vs) => vs.includes(sNorm) || sNorm.includes(vs));

      const isSimulated =
        simulatedSkillsSet.has(sNorm) ||
        Array.from(simulatedSkillsSet).some((ss) => ss.includes(sNorm) || sNorm.includes(ss));

      if (isVerified) {
        const isFromResume = resumeExtractedSkills.some((rs) => norm(rs).includes(sNorm) || sNorm.includes(norm(rs)));
        matchedList.push({ ...skill, isFromResume });
        earnedWeight += w;
      } else if (isSimulated) {
        matchedList.push({ ...skill, isFromResume: false });
        simulatedEarnedWeight += w;
      } else {
        const why =
          skill.importance === 'high'
            ? `Critical prerequisite for ${selectedCareer.title} campus recruitment screening and technical assessment.`
            : skill.importance === 'medium'
            ? `High-value competitive differentiator in round 2 technical interviews and code evaluation.`
            : `Secondary bonus tool that sets top-tier candidates apart during hiring manager review.`;

        missingList.push({
          ...skill,
          whyNeeded: why,
          isSimulated: false
        });
      }
    }

    const priorityOrder = { high: 1, medium: 2, low: 3 };
    missingList.sort((a, b) => priorityOrder[a.importance] - priorityOrder[b.importance]);

    const baseMatchPercent = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
    const simulatedMatchPercent = totalWeight > 0 ? Math.round(((earnedWeight + simulatedEarnedWeight) / totalWeight) * 100) : 0;

    // Competency pillars grouped by category
    const categoryGroups: { [key: string]: { total: number; matched: number; skills: (CareerSkill & { isAcquired: boolean })[] } } = {};
    for (const skill of selectedCareer.requiredSkills) {
      const cat = skill.category || 'General';
      if (!categoryGroups[cat]) {
        categoryGroups[cat] = { total: 0, matched: 0, skills: [] };
      }
      categoryGroups[cat].total += 1;
      const sNorm = norm(skill.name);
      const isAcquired =
        verifiedSkillsSet.has(sNorm) ||
        simulatedSkillsSet.has(sNorm) ||
        Array.from(verifiedSkillsSet).some((vs) => vs.includes(sNorm) || sNorm.includes(vs)) ||
        Array.from(simulatedSkillsSet).some((ss) => ss.includes(sNorm) || sNorm.includes(ss));

      if (isAcquired) categoryGroups[cat].matched += 1;
      categoryGroups[cat].skills.push({ ...skill, isAcquired });
    }

    const readinessLevel =
      simulatedMatchPercent >= 75
        ? 'Day-1 Placement Ready (Tier-1 Shortlist Eligible)'
        : simulatedMatchPercent >= 50
        ? 'Competitive Candidate (Close High-Priority Gaps)'
        : 'Foundational Phase (Core Competencies Needed)';

    return {
      baseMatchPercent,
      simulatedMatchPercent,
      readinessLevel,
      matchedList,
      missingList,
      categoryGroups,
      totalRequiredCount: selectedCareer.requiredSkills.length,
      highPriorityGaps: missingList.filter((m) => m.importance === 'high'),
      mediumPriorityGaps: missingList.filter((m) => m.importance === 'medium'),
      lowPriorityGaps: missingList.filter((m) => m.importance === 'low')
    };
  }, [selectedCareer, user.skills, resumeExtractedSkills, simulatedSkills]);

  // Toggle simulated skill
  const toggleSimulatedSkill = (skillName: string) => {
    setSimulatedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(skillName)) {
        next.delete(skillName);
      } else {
        next.add(skillName);
      }
      return next;
    });
  };

  // Toggle learning plan
  const toggleLearningPlan = (skillName: string) => {
    setLearningPlanSkills((prev) => {
      const next = new Set(prev);
      if (next.has(skillName)) {
        next.delete(skillName);
      } else {
        next.add(skillName);
      }
      return next;
    });
  };

  // Save simulated skills to user's real profile
  const handleSaveSimulatedSkills = async () => {
    if (simulatedSkills.size === 0) return;
    const current = user.skills || [];
    const merged = Array.from(new Set([...current, ...Array.from(simulatedSkills)]));
    await api.updateProfile(user.id, { skills: merged });
    setSimulatedSkills(new Set());
  };

  // Filtered Missing Gaps based on active tab and search query
  const filteredMissingGaps = useMemo(() => {
    if (!gapAnalysis) return [];
    let list = gapAnalysis.missingList;

    if (skillFilter === 'high') {
      list = list.filter((s) => s.importance === 'high');
    } else if (skillFilter === 'medium') {
      list = list.filter((s) => s.importance === 'medium');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.whyNeeded.toLowerCase().includes(q)
      );
    }

    return list;
  }, [gapAnalysis, skillFilter, searchQuery]);

  return (
    <div className="space-y-8 pb-16 animate-fade-in max-w-6xl mx-auto w-full px-2 sm:px-4 font-sans">
      {/* Top Header & Role Selector Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-amber-500/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1 flex-wrap font-mono">
            <span className="uppercase">Step 3: Competency Matrix</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Priority Weighted Benchmark</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Connected to AI Resume Analyzer</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Target className="h-7 w-7 text-amber-400 shrink-0" />
            <span>Skill Gap & Placement Cutoff Matrix</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Detailed diagnosis of your competencies against hiring cutoffs for <strong className="text-white">{selectedCareer?.title}</strong>. Grounded in your uploaded resume and profile.
          </p>
        </div>

        {/* Target Career Picker Dropdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0 bg-slate-950 border border-amber-500/30 p-2.5 rounded-2xl shadow-lg">
          <label className="text-xs font-mono text-slate-400 whitespace-nowrap pl-1 flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-amber-400" />
            <span>Target Role:</span>
          </label>
          <select
            value={selectedCareerId}
            onChange={(e) => handleCareerChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-black border border-white/10 text-amber-300 focus:border-amber-400 focus:outline-none cursor-pointer max-w-[280px] truncate"
          >
            {careers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.salaryRange})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* LINEAR PLACEMENT PIPELINE BREADCRUMB */}
      <div className="rounded-xl border border-white/10 bg-slate-950/80 p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <button
          onClick={() => onNavigate('careers')}
          className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer"
        >
          <span className="h-5 w-5 rounded-full bg-slate-900 text-slate-400 font-bold flex items-center justify-center text-[11px]">1</span>
          <span>Role Explorer</span>
        </button>
        <span className="text-slate-600">→</span>
        <button
          onClick={() => onNavigate('resume')}
          className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer"
        >
          <span className="h-5 w-5 rounded-full bg-slate-900 text-slate-400 font-bold flex items-center justify-center text-[11px]">2</span>
          <span>Upload Resume</span>
        </button>
        <span className="text-slate-600">→</span>
        <div className="flex items-center gap-2 text-amber-400">
          <span className="h-5 w-5 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center text-[11px]">3</span>
          <span className="font-bold">Skill Gap Matrix (Current)</span>
        </div>
        <span className="text-slate-600">→</span>
        <button
          onClick={() => {
            onGenerateRoadmap(selectedCareerId);
            onNavigate('roadmap');
          }}
          className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer"
        >
          <span className="h-5 w-5 rounded-full bg-slate-900 text-slate-400 font-bold flex items-center justify-center text-[11px]">4</span>
          <span>Roadmap</span>
        </button>
      </div>

      {/* SECTION 1: CONNECTED AI RESUME STATUS BANNER */}
      {latestResume ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0804] border border-amber-500/35 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>AI Resume NLP Grounded</span>
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-xs font-bold text-white truncate max-w-[260px]">
                  {latestResume.fileName}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono">
                <span>ATS Score: <strong className="text-amber-300 tabular-nums">{latestResume.score}/100</strong></span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Verified Skills Extracted: <strong className="text-white tabular-nums">{resumeExtractedSkills.length} competencies</strong></span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Scanned: <strong className="text-slate-300">{new Date(latestResume.createdAt).toLocaleDateString()}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('resume')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/25 hover:border-amber-400 text-xs font-semibold text-amber-200 transition-all cursor-pointer shrink-0 whitespace-nowrap self-start md:self-auto"
          >
            <Upload className="h-3.5 w-3.5 text-amber-400" />
            <span>Re-Scan / Switch Resume</span>
          </button>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono">
              <Sparkles className="h-4 w-4" />
              <span>Connect AI Resume Analyzer for Precision Cutoffs</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              No resume document analyzed yet. Currently displaying benchmarks based on your profile skills. Upload your PDF or PNG resume to automatically extract your exact technical competencies.
            </p>
          </div>
          <button
            onClick={() => onNavigate('resume')}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5"
          >
            <Upload className="h-3.5 w-3.5 text-black" />
            <span>Upload Resume Now</span>
          </button>
        </div>
      )}

      {/* SECTION 2: TOP KPI METRIC STRIP (4 TILES) */}
      {gapAnalysis && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Match Score */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/25 space-y-1 shadow-md">
            <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Role Match Score
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold font-mono text-amber-400 tabular-nums">
                {gapAnalysis.simulatedMatchPercent}%
              </span>
              {simulatedSkills.size > 0 && (
                <span className="text-xs text-emerald-400 font-mono font-bold">
                  (+{gapAnalysis.simulatedMatchPercent - gapAnalysis.baseMatchPercent}%)
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {gapAnalysis.readinessLevel.split('(')[0]}
            </div>
          </div>

          {/* Acquired Skills */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/25 space-y-1 shadow-md">
            <div className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Acquired Skills</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-white tabular-nums">
              {gapAnalysis.matchedList.length}
              <span className="text-sm font-normal text-slate-500 font-mono"> / {gapAnalysis.totalRequiredCount}</span>
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              Verified in resume & profile
            </div>
          </div>

          {/* Missing Gaps */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/25 space-y-1 shadow-md">
            <div className="text-[11px] font-mono font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Missing Skill Gaps</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-white tabular-nums">
              {gapAnalysis.missingList.length}
            </div>
            <div className="text-[11px] text-rose-300 truncate font-mono">
              {gapAnalysis.highPriorityGaps.length} Critical Cutoff Filters
            </div>
          </div>

          {/* Salary & Competition */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/25 space-y-1 shadow-md">
            <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
              <span>Compensation Range</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300 truncate pt-1">
              {selectedCareer.salaryRange}
            </div>
            <div className="text-[11px] text-slate-400 truncate font-mono">
              {selectedCareer.experienceLevel}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ROLE COMPETENCY PILLARS (DYNAMIC BASED ON ROLE) */}
      {gapAnalysis && (
        <div className="p-6 rounded-2xl bg-[#0C0603] border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/15 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-amber-400" />
                <span>Competency Pillar Breakdown for {selectedCareer.title}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Target recruiter evaluation dimensions derived from {selectedCareer.domain} industry standards.
              </p>
            </div>
            <span className="text-[11px] font-mono text-amber-300">
              {Object.keys(gapAnalysis.categoryGroups).length} Evaluated Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {Object.entries(gapAnalysis.categoryGroups).map(([category, group]) => {
              const pct = Math.round((group.matched / group.total) * 100);
              return (
                <div
                  key={category}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{category}</span>
                    <span className="text-xs font-mono font-bold text-amber-300 tabular-nums">
                      {group.matched} / {group.total} ({pct}%)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        pct === 100
                          ? 'bg-emerald-400'
                          : pct >= 50
                          ? 'bg-amber-400'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {/* Skill Badges inside Pillar */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {group.skills.map((s) => (
                      <span
                        key={s.name}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 ${
                          s.isAcquired
                            ? 'bg-emerald-950/60 border border-emerald-600/40 text-emerald-300'
                            : 'bg-rose-950/40 border border-rose-800/30 text-rose-300'
                        }`}
                      >
                        {s.isAcquired ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
                        <span>{s.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 4: DEEP-DIVE SKILL GAP DIAGNOSTICS & ACTIONABLE MATRIX */}
      {gapAnalysis && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span>Actionable Skill Gaps & Screening Cutoffs ({gapAnalysis.missingList.length})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Understand exactly why recruiters filter on these skills and how to clear each barrier.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
              <button
                type="button"
                onClick={() => setSkillFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  skillFilter === 'all'
                    ? 'bg-amber-500 text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Gaps ({gapAnalysis.missingList.length})
              </button>
              <button
                type="button"
                onClick={() => setSkillFilter('high')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  skillFilter === 'high'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-rose-400 hover:text-rose-300'
                }`}
              >
                Critical Cutoffs ({gapAnalysis.highPriorityGaps.length})
              </button>
              <button
                type="button"
                onClick={() => setSkillFilter('medium')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  skillFilter === 'medium'
                    ? 'bg-amber-500 text-black shadow-sm'
                    : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                Differentiators ({gapAnalysis.mediumPriorityGaps.length})
              </button>
            </div>
          </div>

          {/* Search Bar for Missing Gaps */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search missing competencies or keywords (e.g. SQL, React, Automation)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Missing Skills Cards Grid */}
          {filteredMissingGaps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMissingGaps.map((gap) => {
                const isHigh = gap.importance === 'high';
                const isMed = gap.importance === 'medium';
                const inPlan = learningPlanSkills.has(gap.name);

                return (
                  <div
                    key={gap.name}
                    className={`p-5 rounded-2xl border transition-all text-xs space-y-3.5 flex flex-col justify-between ${
                      isHigh
                        ? 'bg-[#120404] border-rose-800/40 hover:border-rose-600/60 shadow-lg'
                        : isMed
                        ? 'bg-[#120703] border-amber-800/40 hover:border-amber-600/60 shadow-lg'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      {/* Badge & Title */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase inline-block ${
                              isHigh
                                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                : isMed
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-slate-900 text-slate-300 border border-slate-800'
                            }`}
                          >
                            {isHigh ? '🔴 Gatekeeper Cutoff' : isMed ? '🟡 Technical Differentiator' : '🔵 Value Add'}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-white">
                            {gap.name}
                          </h3>
                        </div>

                        <span className="text-[11px] text-slate-400 font-mono px-2 py-0.5 rounded bg-black/40 border border-white/5 shrink-0">
                          {gap.category}
                        </span>
                      </div>

                      {/* Recruiter Rationale */}
                      <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                        {gap.whyNeeded}
                      </p>

                      {/* Diagnostic Metadata */}
                      <div className="mt-3 pt-3 border-t border-white/5 space-y-1.5 text-[11px] text-slate-400 font-mono">
                        <div className="flex items-center justify-between">
                          <span>Screening Stage:</span>
                          <span className="text-slate-200">
                            {isHigh ? 'Round 1 Online Assessment / Filter' : 'Round 2 Live Technical Interview'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Estimated Remediation:</span>
                          <span className="text-amber-300 font-semibold flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>1-2 Weeks Hands-on Practice</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => toggleLearningPlan(gap.name)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          inPlan
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                        }`}
                      >
                        {inPlan ? '✓ In Learning Plan' : '+ Add to Plan'}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onNavigate('courses')}
                          className="px-2.5 py-1.5 text-xs text-amber-400 hover:underline cursor-pointer font-medium"
                        >
                          Find Course →
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleSimulatedSkill(gap.name)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 transition-all cursor-pointer flex items-center gap-1"
                          title="Simulate acquiring this skill to watch your role match score update"
                        >
                          <Plus className="h-3 w-3" />
                          <span>I Have This</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-white">
                No Gaps Found in Selected Filter!
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                You have met all competencies in this filter category for <strong>{selectedCareer.title}</strong>.
              </p>
            </div>
          )}
        </div>
      )}

      {/* SECTION 5: VERIFIED SKILLS ALREADY ACQUIRED (RESUME EVIDENCE) */}
      {gapAnalysis && (
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Verified Competencies from Resume & Profile ({gapAnalysis.matchedList.length})</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                These skills directly satisfy cutoff criteria for {selectedCareer.title}.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-bold">
              Verified Evidence
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {gapAnalysis.matchedList.map((skill) => (
              <div
                key={skill.name}
                className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="font-semibold text-white truncate">{skill.name}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded bg-slate-900 shrink-0">
                  {skill.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: INTERACTIVE GAP SIMULATOR (IF SIMULATING SKILLS) */}
      {simulatedSkills.size > 0 && gapAnalysis && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-300 uppercase font-mono flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>Live Placement Simulation Active</span>
            </div>
            <p className="text-xs text-slate-200">
              You are simulating <strong>{simulatedSkills.size}</strong> additional skills. Role match rises from <strong>{gapAnalysis.baseMatchPercent}%</strong> to <strong>{gapAnalysis.simulatedMatchPercent}%</strong>!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveSimulatedSkills}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Save to My Profile Skills
            </button>
            <button
              onClick={() => setSimulatedSkills(new Set())}
              className="px-3 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* SECTION 7: PROCEED TO STEP 4 (CAREER ROADMAP) CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#1A0A04] to-slate-950 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-2xl">
        <div className="space-y-1">
          <div className="text-xs font-bold text-amber-400 uppercase font-mono flex items-center gap-1.5">
            <span className="h-5 w-5 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center text-[11px]">4</span>
            <span>Next in Placement Workflow: Step 4 — Personalized Career Roadmap</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Ready to Bridge Your Skill Gaps with a Structured Curriculum?
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Transform your identified missing skills for <strong>{selectedCareer.title}</strong> into a week-by-week placement roadmap with capstone projects and mock interview drills.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            onGenerateRoadmap(selectedCareerId);
            onNavigate('roadmap');
          }}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm shadow-xl hover:shadow-amber-500/25 transition-all cursor-pointer flex items-center gap-2 shrink-0 self-start sm:self-auto whitespace-nowrap"
        >
          <span>Proceed to Career Roadmap</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
