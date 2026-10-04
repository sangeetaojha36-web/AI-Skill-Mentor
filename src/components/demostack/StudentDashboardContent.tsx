import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Archive,
  ArrowDownWideNarrow,
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Copy,
  EllipsisVertical,
  ExternalLink,
  Filter,
  FolderInput,
  FolderPlus,
  Grid2X2,
  Info,
  List,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  UserRound,
  Users,
  X,
  CheckCircle2,
  Github,
  Globe,
  Check,
  Loader2,
  Layers,
  Code2,
  Play,
  Terminal,
  BookOpen,
  Briefcase,
  Star,
  Eye,
  Award,
  TrendingUp,
  Compass,
  Search,
  Zap,
  Flame,
  GraduationCap,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Bookmark,
  Video,
  Mic,
  FileText,
  Target,
} from 'lucide-react';
import {
  BgFolderVector,
  BuildingIcon,
  DashboardFolderPlusIcon,
  DashboardImagesIcon,
  DashboardVideoIcon,
  FigGraduationIcon,
  FigLightbulbIcon,
  FigPlayIcon,
  FigSparkleIcon,
  InspireFourIcon,
  InspireOneIcon,
  InspireThreeIcon,
  InspireTwoIcon,
} from './icons.tsx';
import { User, Career, Roadmap, ResumeAnalysis, MockInterviewSession, Course, Project, StudentProject } from '../../types.ts';
import { api } from '../../services/api.ts';

interface StudentDashboardContentProps {
  user: User;
  topCareer?: Career;
  gapAnalysis?: any;
  roadmap?: Roadmap;
  latestResume?: ResumeAnalysis;
  latestInterview?: MockInterviewSession;
  recommendedCourses?: Course[];
  recommendedProjects?: Project[];
  profileCompleteness?: number;
  onNavigate: (tab: string) => void;
  onOpenChat: () => void;
  onUpdateUser?: (updated: User) => void;
}

type SortMode = 'recent' | 'ascending' | 'descending';
type ViewMode = 'grid' | 'list';

export function StudentDashboardContent({
  user,
  topCareer,
  gapAnalysis,
  roadmap,
  latestResume,
  latestInterview,
  recommendedCourses,
  recommendedProjects,
  onNavigate,
  onOpenChat,
  onUpdateUser,
}: StudentDashboardContentProps) {
  const matchPercentage = gapAnalysis?.skillMatchPercentage || 68;
  const missingSkills = gapAnalysis?.missingSkills || [
    { name: 'Power BI', importance: 'high', reason: 'Critical for corporate business reporting in India' },
    { name: 'SQL Window Functions', importance: 'high', reason: 'Mandatory in technical placement rounds' },
    { name: 'A/B Testing & Statistics', importance: 'medium', reason: 'High demand in e-commerce analytics' },
  ];
  const acquiredSkills = gapAnalysis?.matchedSkills || user.skills || ['Python', 'Excel', 'Problem Solving'];

  const activeStep = roadmap?.steps?.find((s) => !s.completed) || roadmap?.steps?.[0] || {
    phase: 1,
    title: 'Core Analytical Tooling & SQL',
    description: 'Master advanced SQL aggregations and Python data manipulation.',
    estimatedWeeks: 3,
  };

  // 4-Step Placement Preparation Playbook
  const dashboardTips = [
    {
      step: 'STEP 01',
      category: 'Career Mapping',
      title: `${user.education?.branch || 'Branch'} Placement Strategy`,
      description: `Target high-CTC roles calibrated for ${user.education?.degree || 'degree'} candidates in tech.`,
      actionText: 'Explore Roles',
      image: 'https://assets.watermelon.sh/components/demostack-tip-1.webp',
      onClick: () => onNavigate('careers'),
    },
    {
      step: 'STEP 02',
      category: 'ATS Screening',
      title: 'ATS Keyword Calibration',
      description: `Inject missing competencies like ${missingSkills.slice(0, 2).map((s: any) => s.name).join(', ') || 'Python, SQL'} to pass filters.`,
      actionText: 'Audit Resume',
      image: 'https://assets.watermelon.sh/components/demostack-tip-2.webp',
      onClick: () => onNavigate('resume'),
    },
    {
      step: 'STEP 03',
      category: 'AI Greenroom',
      title: 'Interactive Mock Interview',
      description: 'Master technical and HR rounds with real-time speech evaluation and STAR feedback.',
      actionText: 'Start Interview',
      image: 'https://assets.watermelon.sh/components/demostack-tip-3.webp',
      onClick: () => onNavigate('interview'),
    },
    {
      step: 'STEP 04',
      category: 'Project Showcase',
      title: 'Production Capstone Repos',
      description: 'Showcase deployed live web apps with verified GitHub documentation to recruiters.',
      actionText: 'View Projects',
      image: 'https://assets.watermelon.sh/components/demostack-tip-4.webp',
      onClick: () => onNavigate('projects'),
    },
  ];

  // Resources from Reference Structure, mapped to user's real counts & sections
  const dashboardResources = [
    {
      label: 'Learning Academy',
      sublabel: `${recommendedCourses.length} Recommended courses`,
      icon: FigGraduationIcon,
      onClick: () => onNavigate('courses'),
    },
    {
      label: 'Knowledge Base',
      sublabel: `${topCareer?.topRecruitersIndia?.length || 5} Recruiters & CTC guides`,
      icon: FigLightbulbIcon,
      onClick: () => onNavigate('careers'),
    },
    {
      label: 'Capstone Projects',
      sublabel: `${recommendedProjects.length} Verified project blueprints`,
      icon: FigPlayIcon,
      onClick: () => onNavigate('projects'),
    },
    {
      label: 'Skill Progress',
      sublabel: `${acquiredSkills.length} Competencies verified`,
      icon: FigSparkleIcon,
      onClick: () => onNavigate('progress'),
    },
  ];

  // Inspiration List from Reference Structure, tailored to student career paths
  const inspiredDemos = [
    {
      title: `${user.careerGoal || 'Data Analyst & BI Specialist'}`,
      subtitle: `${topCareer?.averageSalaryIndia || '₹7.5 - 16 LPA'} · High Demand`,
      icon: InspireOneIcon,
      onClick: () => onNavigate('careers'),
    },
    {
      title: 'Cloud Systems & DevOps Engineer',
      subtitle: '₹9 - 22 LPA · Amazon, Tata Comms',
      icon: InspireTwoIcon,
      onClick: () => onNavigate('careers'),
    },
    {
      title: 'Full Stack & Enterprise Software Engineer',
      subtitle: '₹8 - 20 LPA · TCS Digital, Swiggy',
      icon: InspireThreeIcon,
      onClick: () => onNavigate('careers'),
    },
    {
      title: 'Applied AI & ML Automation Specialist',
      subtitle: '₹12 - 28 LPA · Google, Fractal, Startups',
      icon: InspireFourIcon,
      onClick: () => onNavigate('careers'),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-2 py-4 sm:px-4 sm:py-6 animate-fade-in">
      {/* SECTION 1: 3 Interactive Placement Command Cards */}
      <PrimaryPlacementActionCards
        user={user}
        topCareer={topCareer}
        gapAnalysis={gapAnalysis}
        roadmap={roadmap}
        latestResume={latestResume}
        latestInterview={latestInterview}
        onNavigate={onNavigate}
      />

      {/* SECTION 2: Tips Horizontal Carousel with exact reference styling */}
      <DashboardTips tips={dashboardTips} branch={user.education?.branch} />

      {/* SECTION 3: Resources & Inspiration Split with Interactive Capabilities */}
      <div className="flex flex-col gap-8 lg:flex-row items-start">
        <ResourcesSection
          user={user}
          topCareer={topCareer}
          gapAnalysis={gapAnalysis}
          recommendedCourses={recommendedCourses}
          recommendedProjects={recommendedProjects}
          onNavigate={onNavigate}
          onUpdateUser={onUpdateUser}
        />
        <InspirationList inspiredItems={inspiredDemos} />
      </div>

      {/* SECTION 4: Resume & Portfolio Projects Section */}
      <DemostacksWorkspaceSection
        user={user}
        recommendedProjects={recommendedProjects || []}
        onNavigate={onNavigate}
        onUpdateUser={onUpdateUser}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1. PrimaryPlacementActionCards (Interactive Top Command Cockpit)
// ---------------------------------------------------------------------------
interface PrimaryPlacementActionCardsProps {
  user: User;
  topCareer?: Career;
  gapAnalysis?: any;
  roadmap?: Roadmap;
  latestResume?: ResumeAnalysis;
  latestInterview?: MockInterviewSession;
  onNavigate: (tab: string) => void;
}

function PrimaryPlacementActionCards({
  user,
  topCareer,
  gapAnalysis,
  roadmap,
  latestResume,
  latestInterview,
  onNavigate,
}: PrimaryPlacementActionCardsProps) {
  const matchPercentage = gapAnalysis?.skillMatchPercentage || 68;
  const missingSkills = gapAnalysis?.missingSkills || [
    { name: 'Power BI', importance: 'high', reason: 'Critical for corporate business reporting in India' },
    { name: 'SQL Window Functions', importance: 'high', reason: 'Mandatory in technical placement rounds' },
    { name: 'A/B Testing & Statistics', importance: 'medium', reason: 'High demand in e-commerce analytics' },
  ];

  const activeStep = roadmap?.steps?.find((s) => !s.completed) || roadmap?.steps?.[0] || {
    phase: 1,
    title: 'Core Analytical Tooling & SQL',
    description: 'Master advanced SQL aggregations and Python data manipulation.',
    estimatedWeeks: 3,
  };

  const resumeScore = latestResume?.score || 82;
  const targetTitle = user.careerGoal || topCareer?.title || 'Software Engineer';
  const degreeBranch = `${user.education?.degree || 'B.Tech'} in ${user.education?.branch || 'Computer Science'}`;

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* CARD 1: Target Career Track & Adaptive Roadmap */}
      <div
        onClick={() => onNavigate('roadmap')}
        className="group relative flex flex-col justify-between rounded-2xl border border-amber-500/25 bg-gradient-to-b from-amber-950/50 via-[#1c0d04]/80 to-[#0e0401]/95 p-4.5 transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-950/40 cursor-pointer shadow-sm select-none"
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          {/* Header Row: Category Badge + Match Pill */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
              Placement Target
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[11px] font-mono font-bold text-[#FEC163]">
              <span className="size-1.5 rounded-full bg-[#FEC163] animate-pulse" />
              <span>{matchPercentage}% Match</span>
            </div>
          </div>

          {/* Icon + Title Block */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-[#FEC163] shadow-md group-hover:scale-105 transition-transform">
              <Target className="size-5.5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-base leading-snug group-hover:text-[#FEC163] transition-colors truncate">
                {targetTitle}
              </h3>
              <p className="text-zinc-400 text-xs truncate">{degreeBranch}</p>
            </div>
          </div>

          {/* Progress Bar & Milestone Info */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-1.5 rounded-full bg-black/60 overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-[#FEC163] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(12, matchPercentage))}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>Phase {activeStep.phase} of {roadmap?.steps?.length || 4} Active</span>
              <span className="text-amber-400/90">{missingSkills.length} High-Yield Gaps</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs relative z-10">
          <span className="font-semibold text-[#FEC163] group-hover:text-white transition-colors flex items-center gap-1">
            <span>Explore Roadmap</span>
            <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('careers');
            }}
            className="text-[11px] text-zinc-400 hover:text-white px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            Switch Role
          </button>
        </div>
      </div>

      {/* CARD 2: Greenroom AI Mock Studio */}
      <div
        onClick={() => onNavigate('interview')}
        className="group relative flex flex-col justify-between rounded-2xl border border-emerald-500/25 bg-gradient-to-b from-emerald-950/50 via-[#091b12]/80 to-[#030d07]/95 p-4.5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-950/40 cursor-pointer shadow-sm select-none"
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          {/* Header Row: Category Badge + Equalizer Status */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
              Live AI Studio
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[11px] font-mono font-bold text-emerald-300">
              {latestInterview?.completed ? (
                <span>Score: {latestInterview.overallScore}/100</span>
              ) : (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="w-0.5 h-3.5 bg-emerald-300 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>Voice AI Ready</span>
                </div>
              )}
            </div>
          </div>

          {/* Icon + Title Block */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 shadow-md group-hover:scale-105 transition-transform">
              <Video className="size-5.5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-base leading-snug group-hover:text-emerald-300 transition-colors truncate">
                Greenroom AI Mock Studio
              </h3>
              <p className="text-zinc-400 text-xs truncate">Speech pacing & STAR response grading</p>
            </div>
          </div>

          {/* Interactive Feature Chips */}
          <div className="flex items-center gap-1.5 pt-1 flex-wrap">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              DSA Coding
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-300">
              STAR Behavioral
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-400">
              HR Practice
            </span>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs relative z-10">
          <span className="font-semibold text-emerald-400 group-hover:text-white transition-colors flex items-center gap-1">
            <span>Start Mock Interview</span>
            <Play className="size-3 fill-current" />
          </span>

          <span className="text-[11px] font-mono text-zinc-400">
            {latestInterview?.completed ? 'Retake Session' : '3 Min Rapid'}
          </span>
        </div>
      </div>

      {/* CARD 3: ATS Resume Optimizer & Screening Score */}
      <div
        onClick={() => onNavigate('resume')}
        className="group relative flex flex-col justify-between rounded-2xl border border-indigo-500/25 bg-gradient-to-b from-indigo-950/50 via-[#130b24]/80 to-[#080312]/95 p-4.5 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400/60 hover:shadow-lg hover:shadow-indigo-950/40 cursor-pointer shadow-sm select-none"
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          {/* Header Row: Category Badge + ATS Score Badge */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
              ATS Resume Filter
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[11px] font-mono font-bold text-indigo-300">
              <span>ATS Score: {resumeScore}/100</span>
            </div>
          </div>

          {/* Icon + Title Block */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 shadow-md group-hover:scale-105 transition-transform">
              <FileText className="size-5.5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-base leading-snug group-hover:text-indigo-300 transition-colors truncate">
                ATS Score: {resumeScore}/100
              </h3>
              <p className="text-zinc-400 text-xs truncate">
                {missingSkills.length} High-yield skills to unlock screening
              </p>
            </div>
          </div>

          {/* Interactive Keyword Missing Insights */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 truncate">
              <span className="text-indigo-400 font-semibold shrink-0">Priority Add:</span>
              <span className="text-zinc-300 truncate">
                {missingSkills.slice(0, 2).map((s: any) => s.name).join(', ') || 'SQL, Python'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span>Campus Shortlist Chance</span>
              <span className="text-emerald-400 font-semibold">Top 15% Tier</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs relative z-10">
          <span className="font-semibold text-indigo-400 group-hover:text-white transition-colors flex items-center gap-1">
            <span>Audit Resume Keywords</span>
            <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>

          <span className="text-[11px] text-zinc-400 hover:text-white">
            Upload PDF
          </span>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 2. DashboardTips (4-Pillar Placement Action Playbook)
// ---------------------------------------------------------------------------
function DashboardTips({
  tips,
  branch,
}: {
  tips: Array<{
    step: string;
    category: string;
    title: string;
    description: string;
    actionText: string;
    image: string;
    onClick: () => void;
  }>;
  branch?: string;
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <section className="flex flex-col gap-5 p-5 sm:p-6 rounded-3xl border border-white/[0.08] bg-[#0E0503]/80 shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FEC163]">
            <Sparkles className="size-3.5" />
            <span className="uppercase tracking-wider font-mono">Placement Preparation Playbook</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
            Strategic Action Guide · {branch || 'Campus Placement'}
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 max-w-prose">
            Follow this 4-step preparation cycle to crack technical tests, pass ATS filters, and clear mock interviews.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="h-auto shrink-0 self-start rounded-full px-4 py-2 text-xs font-medium text-zinc-300 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center gap-1.5 transition-colors cursor-pointer"
          aria-label="Dismiss guide"
        >
          <span>Dismiss Guide</span>
          <X className="size-3.5" />
        </button>
      </div>

      {/* Evenly balanced 4-column grid: No scrollbars, no cut-off cards, no awkward overlapping arrows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        {tips.map((tip) => (
          <article
            key={tip.title}
            onClick={tip.onClick}
            className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#140603] hover:bg-[#1C0904] p-3.5 transition-all duration-200 hover:border-[#FEC163]/50 hover:-translate-y-1 cursor-pointer shadow-sm"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-black/40">
                <img
                  src={tip.image}
                  alt={tip.title}
                  width={256}
                  height={160}
                  className="size-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/85 backdrop-blur-sm border border-white/20 text-[10px] font-mono font-bold text-[#FEC163] shadow-md">
                  {tip.step}
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  {tip.category}
                </span>
                <h3 className="font-semibold text-white text-sm group-hover:text-[#FEC163] transition-colors leading-snug">
                  {tip.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
                  {tip.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#FEC163] group-hover:text-white transition-colors">
              <span>{tip.actionText}</span>
              <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 3. ResourcesSection (Interactive Resource Hub with Deep Dive Inspection)
// ---------------------------------------------------------------------------
interface ResourcesSectionProps {
  user: User;
  topCareer?: Career;
  gapAnalysis?: any;
  recommendedCourses?: Course[];
  recommendedProjects?: Project[];
  onNavigate: (tab: string) => void;
  onUpdateUser?: (updated: User) => void;
}

const DEFAULT_COURSES: Course[] = [
  {
    id: 'course-sql-placement',
    title: 'SQL & Relational Databases for Tech & Analytics Placements',
    provider: 'GeeksforGeeks / Striver Sheet',
    skill: 'SQL & Query Optimization',
    difficulty: 'Beginner',
    duration: '3 Weeks (15 Hours)',
    rating: 4.9,
    url: 'https://geeksforgeeks.org',
    type: 'Interactive',
    domain: 'Data Science & Analytics',
  },
  {
    id: 'course-fullstack-system',
    title: 'Distributed Systems & Microservices Architecture',
    provider: 'freeCodeCamp / NPTEL',
    skill: 'System Design & APIs',
    difficulty: 'Intermediate',
    duration: '4 Weeks (20 Hours)',
    rating: 4.8,
    url: 'https://freecodecamp.org',
    type: 'Course',
    domain: 'Full Stack & Cloud',
  },
  {
    id: 'course-python-algo',
    title: 'Python for Placement Coding & Data Structures',
    provider: 'NPTEL / IIT Madras',
    skill: 'Python & Algorithms',
    difficulty: 'Intermediate',
    duration: '6 Weeks (18 Hours)',
    rating: 4.9,
    url: 'https://nptel.ac.in',
    type: 'Interactive',
    domain: 'Software Engineering',
  },
];

const DEFAULT_PROJECT_BLUEPRINTS: Project[] = [
  {
    id: 'proj-swiggy-zomato-analytics',
    title: 'Quick-Commerce & Food Delivery Unit Economics Analytics Dashboard',
    domain: 'Data Science & Analytics',
    targetCareer: 'Data Analyst & Insights Specialist',
    difficulty: 'Intermediate',
    description: 'Process 500,000+ simulated delivery records in SQL & Python, calculate city-wise rider payout margins and late delivery penalties, and build an interactive Power BI telemetry dashboard.',
    keySkills: ['SQL', 'Python', 'Power BI', 'Statistics'],
    deliverables: ['SQL analytical query script', 'Jupyter exploratory notebook', 'Live telemetry dashboard with executive KPIs'],
    estimatedHours: 25,
  },
  {
    id: 'proj-tata-motors-ev-telemetry',
    title: 'EV Battery Temperature Telemetry & Predictive Failure Model',
    domain: 'Robotics, EV & IoT',
    targetCareer: 'Robotics & Embedded Systems Engineer',
    difficulty: 'Advanced',
    description: 'Python & ROS node simulator capturing battery pack cell thermal data, identifying anomalous temperature spikes, and triggering automated safety shutdown loops.',
    keySkills: ['Python', 'Robotics', 'ROS', 'Microcontrollers'],
    deliverables: ['ROS 2 package with publisher/subscriber nodes', 'Thermal anomaly prediction script', 'Architecture schematic documentation'],
    estimatedHours: 35,
  },
  {
    id: 'proj-zerodha-algo-trading',
    title: 'Algorithmic Momentum Trading & Risk Model in Python',
    domain: 'FinTech & Quantitative Software',
    targetCareer: 'FinTech Software & Analytics Specialist',
    difficulty: 'Intermediate',
    description: 'Historical stock quotes pipeline calculating Moving Average Convergence Divergence (MACD) and Value at Risk (VaR) with automated financial model.',
    keySkills: ['Financial Modeling', 'Excel', 'Python', 'SQL'],
    deliverables: ['Excel valuation model with scenario toggles', 'Python backtesting notebook with Sharpe ratio metrics'],
    estimatedHours: 28,
  },
  {
    id: 'proj-ai-resume-copilot',
    title: 'AI Resume ATS Scanner & Placement Interview Evaluator',
    domain: 'Full Stack & AI Systems',
    targetCareer: 'Full Stack & Applied AI Engineer',
    difficulty: 'Advanced',
    description: 'Full stack web app using NLP skill extraction, STAR interview grading, and recruiter keyword score breakdowns with live browser demo.',
    keySkills: ['TypeScript', 'React', 'Node.js', 'NLP / AI'],
    deliverables: ['React frontend with real-time feedback', 'Express REST API', 'Live deployed portfolio link'],
    estimatedHours: 30,
  },
];

function ResourcesSection({
  user,
  topCareer,
  gapAnalysis,
  recommendedCourses,
  recommendedProjects,
  onNavigate,
  onUpdateUser,
}: ResourcesSectionProps) {
  // Interactive filters
  const [activeFilter, setActiveFilter] = useState<'all' | 'prep' | 'action' | 'starred'>('all');
  const [inspectingResource, setInspectingResource] = useState<'courses' | 'careers' | 'projects' | 'progress' | null>(null);

  // User bookmarked resources state (persisted in localStorage)
  const [starredIds, setStarredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('demostack_starred_resources');
      return saved ? JSON.parse(saved) : ['courses', 'careers'];
    } catch {
      return ['courses', 'careers'];
    }
  });

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('demostack_starred_resources', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Live data fallbacks
  const coursesList = useMemo(() => {
    return recommendedCourses && recommendedCourses.length > 0 ? recommendedCourses : DEFAULT_COURSES;
  }, [recommendedCourses]);

  const projectsList = useMemo(() => {
    return recommendedProjects && recommendedProjects.length > 0 ? recommendedProjects : DEFAULT_PROJECT_BLUEPRINTS;
  }, [recommendedProjects]);

  const recruitersList = useMemo(() => {
    return topCareer?.topRecruitersIndia && topCareer.topRecruitersIndia.length > 0
      ? topCareer.topRecruitersIndia
      : ['Google India', 'Microsoft', 'Amazon IDC', 'Swiggy', 'TCS Digital', 'L&T Technology'];
  }, [topCareer]);

  const matchPercentage = gapAnalysis?.skillMatchPercentage || 68;
  const acquiredSkills = gapAnalysis?.matchedSkills || user.skills || ['Python', 'Excel', 'Problem Solving'];
  const missingSkills = gapAnalysis?.missingSkills || [
    { name: 'Power BI', importance: 'high', reason: 'Critical for corporate business reporting in India' },
    { name: 'SQL Window Functions', importance: 'high', reason: 'Mandatory in technical placement rounds' },
    { name: 'A/B Testing & Statistics', importance: 'medium', reason: 'High demand in e-commerce analytics' },
  ];

  // Interactive Quick Peek State
  const [courseDifficultyFilter, setCourseDifficultyFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [addingProjectId, setAddingProjectId] = useState<string | null>(null);
  const [addedProjectNotice, setAddedProjectNotice] = useState<string | null>(null);
  const [copiedCheatsheet, setCopiedCheatsheet] = useState(false);
  const [verifyingSkill, setVerifyingSkill] = useState<string | null>(null);

  // Add blueprint project to student's portfolio
  const handleAddBlueprintToPortfolio = async (proj: Project) => {
    setAddingProjectId(proj.id);
    try {
      const newStudentProj: StudentProject = {
        id: `proj-${Date.now()}`,
        title: proj.title,
        description: proj.description,
        techStack: proj.keySkills,
        githubUrl: 'https://github.com/student/' + proj.id,
        liveUrl: 'https://' + proj.id.slice(0, 14) + '.demo.app',
        previewType: (proj.domain.toLowerCase().includes('data') || proj.domain.toLowerCase().includes('analytics'))
          ? 'analytics'
          : proj.domain.toLowerCase().includes('telemetry') || proj.domain.toLowerCase().includes('robotics')
          ? 'dashboard'
          : 'saas',
        aiAnalysis: {
          recruiterScore: 92,
          impactSummary: `Production capstone blueprint demonstrating ${proj.keySkills.join(', ')} with verified recruiter alignment.`,
          verifiedSkills: proj.keySkills,
          suggestedResumeBullets: [
            `Engineered ${proj.title} implementing end-to-end pipelines using ${proj.keySkills.slice(0, 2).join(' and ')}.`,
            `Optimized execution workflow reducing turnaround latency by 32% with verified automated testing.`,
          ],
          interviewQuestions: [
            `How did you architect the data pipeline to handle edge cases in ${proj.keySkills[0]}?`,
            `What trade-offs did you evaluate between batch processing and real-time computation?`,
          ],
          analyzedAt: new Date().toISOString(),
        },
        createdAt: new Date().toISOString(),
      };

      const existingProjects = user.studentProjects || [];
      const updatedProjects = [newStudentProj, ...existingProjects];
      const updatedUser: User = { ...user, studentProjects: updatedProjects };

      onUpdateUser?.(updatedUser);
      await api.updateProfile(user.id, { studentProjects: updatedProjects });

      setAddedProjectNotice(`"${proj.title}" added to your portfolio!`);
      setTimeout(() => setAddedProjectNotice(null), 4000);
    } catch (err) {
      console.error('Failed to add project to portfolio:', err);
    } finally {
      setAddingProjectId(null);
    }
  };

  // Instant skill self-verify
  const handleVerifySkill = async (skillName: string) => {
    setVerifyingSkill(skillName);
    try {
      const currentSkills = user.skills || [];
      if (!currentSkills.includes(skillName)) {
        const updatedSkills = [...currentSkills, skillName];
        const updatedUser: User = { ...user, skills: updatedSkills };
        onUpdateUser?.(updatedUser);
        await api.updateProfile(user.id, { skills: updatedSkills });
      }
    } catch (err) {
      console.error('Failed to verify skill:', err);
    } finally {
      setVerifyingSkill(null);
    }
  };

  // Copy CTC Cheatsheet
  const handleCopyCheatsheet = () => {
    const text = `# Placement & CTC Preparation Cheatsheet
Role: ${user.careerGoal || topCareer?.title || 'Software & Analytics Specialist'}
Target CTC Band: ${topCareer?.averageSalaryIndia || '₹8.5 - 24 LPA'}
Top Recruiters: ${recruitersList.join(', ')}

Hiring Stages:
1. Online Assessment (OA): 2 DSA Problems + 20 Aptitude / CS Fundamentals
2. Technical Round 1: Core Tooling & Live Coding (${acquiredSkills.slice(0, 3).join(', ')})
3. Technical Round 2: System Architecture & Capstone Project Walkthrough
4. HR & Cultural Fit: STAR Method Behavioral Evaluation

Key High-Yield Competencies:
${missingSkills.map((s: any) => `- [ ] ${s.name}: ${s.reason}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedCheatsheet(true);
    setTimeout(() => setCopiedCheatsheet(false), 2500);
  };

  // 4 Main Resource Cards Definitions
  const resourceCards = [
    {
      id: 'courses',
      category: 'prep' as const,
      label: 'Learning Academy',
      sublabel: `${coursesList.length} Recommended courses`,
      tag: 'Curated Curriculum',
      accentColor: '#818cf8',
      bgGradient: 'from-indigo-950/70 via-[#180e30] to-[#0d051c]',
      borderColor: 'border-indigo-500/25 hover:border-indigo-400/60',
      shadowColor: 'hover:shadow-indigo-950/40',
      badgeBg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
      icon: FigGraduationIcon,
      highlight: `${coursesList.length} Tracks · 4.9★ Average`,
      pills: coursesList.slice(0, 2).map((c) => c.skill),
      destinationTab: 'courses',
    },
    {
      id: 'careers',
      category: 'prep' as const,
      label: 'Knowledge Base',
      sublabel: `${recruitersList.length} Recruiters & CTC guides`,
      tag: 'Campus Intelligence',
      accentColor: '#fbbf24',
      bgGradient: 'from-amber-950/60 via-[#221105] to-[#120602]',
      borderColor: 'border-amber-500/25 hover:border-amber-400/60',
      shadowColor: 'hover:shadow-amber-950/40',
      badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      icon: FigLightbulbIcon,
      highlight: `CTC: ${topCareer?.averageSalaryIndia?.split('(')[0] || '₹8.5 - 24 LPA'}`,
      pills: recruitersList.slice(0, 3),
      destinationTab: 'careers',
    },
    {
      id: 'projects',
      category: 'action' as const,
      label: 'Capstone Projects',
      sublabel: `${projectsList.length} Verified project blueprints`,
      tag: 'Production Repos',
      accentColor: '#34d399',
      bgGradient: 'from-emerald-950/60 via-[#0a2015] to-[#04100a]',
      borderColor: 'border-emerald-500/25 hover:border-emerald-400/60',
      shadowColor: 'hover:shadow-emerald-950/40',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      icon: FigPlayIcon,
      highlight: `${projectsList.length} Deployable · 1-Click Add`,
      pills: ['Interactive Preview', 'AI Graded', 'GitHub Ready'],
      destinationTab: 'projects',
    },
    {
      id: 'progress',
      category: 'action' as const,
      label: 'Skill Progress',
      sublabel: `${acquiredSkills.length} Competencies verified`,
      tag: 'ATS Readiness',
      accentColor: '#fb7185',
      bgGradient: 'from-rose-950/60 via-[#240b17] to-[#12030a]',
      borderColor: 'border-rose-500/25 hover:border-rose-400/60',
      shadowColor: 'hover:shadow-rose-950/40',
      badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      icon: FigSparkleIcon,
      highlight: `${matchPercentage}% Placement Match Score`,
      pills: [`${missingSkills.length} High-Yield Gaps`, 'Verified Level 2'],
      destinationTab: 'progress',
    },
  ];

  // Filtered Cards
  const displayedCards = useMemo(() => {
    return resourceCards.filter((card) => {
      if (activeFilter === 'prep') return card.category === 'prep';
      if (activeFilter === 'action') return card.category === 'action';
      if (activeFilter === 'starred') return starredIds.includes(card.id);
      return true;
    });
  }, [activeFilter, starredIds, resourceCards]);

  return (
    <section className="flex flex-1 flex-col items-start gap-4 lg:max-w-xl w-full">
      {/* Interactive Header with Segmented Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">Resources</h2>
            <span className="flex size-2 rounded-full bg-[#FEC163] animate-pulse" />
          </div>
          <p className="text-zinc-400 text-xs mt-0.5">
            Interactive placement modules, CTC benchmarks & verified code blueprints.
          </p>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#FEC163] text-zinc-950 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('prep')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeFilter === 'prep'
                ? 'bg-[#FEC163] text-zinc-950 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Prep & CTC
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('action')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeFilter === 'action'
                ? 'bg-[#FEC163] text-zinc-950 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Blueprints
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('starred')}
            className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
              activeFilter === 'starred'
                ? 'bg-[#FEC163] text-zinc-950 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="View Bookmarked Resources"
          >
            <Star className={`size-3 ${starredIds.length > 0 ? 'fill-current' : ''}`} />
            <span>{starredIds.length}</span>
          </button>
        </div>
      </div>

      {/* 2x2 Interactive Resource Grid */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4">
        {displayedCards.map((card) => {
          const Icon = card.icon;
          const isStarred = starredIds.includes(card.id);

          return (
            <div
              key={card.id}
              onClick={() => setInspectingResource(card.id as any)}
              className={`group relative flex flex-col justify-between rounded-2xl border ${card.borderColor} bg-gradient-to-b ${card.bgGradient} p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${card.shadowColor} cursor-pointer select-none`}
            >
              {/* Top Row: Category Tag & Interactive Star Button */}
              <div className="flex items-center justify-between w-full mb-3">
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border ${card.badgeBg}`}
                >
                  {card.tag}
                </span>

                <button
                  type="button"
                  onClick={(e) => toggleStar(card.id, e)}
                  className="p-1 rounded-md text-zinc-500 hover:text-[#FEC163] transition-colors cursor-pointer"
                  title={isStarred ? 'Remove bookmark' : 'Bookmark this resource'}
                >
                  <Star className={`size-3.5 ${isStarred ? 'fill-[#FEC163] text-[#FEC163]' : ''}`} />
                </button>
              </div>

              {/* Center Visual Art Area: Vibrant Animated Container */}
              <div className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-black/40 shadow-inner group-hover:border-white/20 transition-all">
                {/* Ambient Radial Glow */}
                <div
                  className="absolute inset-0 opacity-40 blur-xl transition-opacity duration-300 group-hover:opacity-75"
                  style={{
                    background: `radial-gradient(circle at center, ${card.accentColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Micro Floating Badge */}
                <div className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-zinc-300">
                  {card.highlight}
                </div>

                {/* Glowing Centerpiece Icon */}
                <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] shadow-lg backdrop-blur-sm transition-transform duration-200 ease-out group-hover:scale-110">
                  <Icon className="size-7 text-white drop-shadow-md" />
                </div>

                {/* Subtle animated status ping */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[9px] font-mono text-zinc-400">
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: card.accentColor }} />
                  <span>Ready</span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="mt-3.5 space-y-1">
                <h3 className="font-semibold text-white group-hover:text-[#FEC163] transition-colors text-sm flex items-center justify-between">
                  <span>{card.label}</span>
                  <ArrowUpRight className="size-3.5 text-zinc-500 group-hover:text-[#FEC163] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </h3>
                <p className="text-zinc-400 text-xs font-medium">{card.sublabel}</p>

                {/* Sneak-Peek Micro Tags */}
                <div className="flex items-center gap-1.5 pt-1.5 flex-wrap">
                  {card.pills.slice(0, 2).map((pill) => (
                    <span
                      key={pill}
                      className="text-[10px] text-zinc-400 bg-white/[0.04] border border-white/[0.06] rounded px-1.5 py-0.5 truncate max-w-[140px]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Hover Action Row */}
              <div className="mt-3.5 pt-2.5 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectingResource(card.id as any);
                  }}
                  className="flex items-center gap-1 text-[11px] font-medium text-zinc-300 hover:text-white px-2 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] transition-colors cursor-pointer"
                >
                  <Eye className="size-3 text-[#FEC163]" />
                  <span>Quick Peek</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(card.destinationTab);
                  }}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#FEC163] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Launch</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {displayedCards.length === 0 && (
        <div className="w-full py-8 text-center rounded-2xl border border-white/[0.08] bg-black/30">
          <p className="text-xs text-zinc-400">No bookmarked resources found in this view.</p>
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className="mt-2 text-xs font-semibold text-[#FEC163] hover:underline cursor-pointer"
          >
            Show All Resources
          </button>
        </div>
      )}

      {/* =========================================================================
         DEEP DIVE QUICK PEEK INSPECTION MODAL (Interactive In-Place Explorer)
         ========================================================================= */}
      {inspectingResource && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setInspectingResource(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-white/[0.15] bg-[#120603] text-white shadow-2xl overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/[0.08] bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#FEC163]/10 border border-[#FEC163]/30 text-[#FEC163]">
                  {inspectingResource === 'courses' && <GraduationCap className="size-5" />}
                  {inspectingResource === 'careers' && <Lightbulb className="size-5" />}
                  {inspectingResource === 'projects' && <Code2 className="size-5" />}
                  {inspectingResource === 'progress' && <Sparkles className="size-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    {inspectingResource === 'courses' && 'Learning Academy · Curated Tracks'}
                    {inspectingResource === 'careers' && 'Placement Knowledge Base · Recruiter & CTC Guide'}
                    {inspectingResource === 'projects' && 'Production Capstone Blueprints'}
                    {inspectingResource === 'progress' && 'Competency Matrix & Skill Verification'}
                  </h3>
                  <p className="text-zinc-400 text-xs">
                    {inspectingResource === 'courses' && 'Interactive technical courses targeted to placement tests.'}
                    {inspectingResource === 'careers' && 'Salary benchmarks, interview rounds & company requirements.'}
                    {inspectingResource === 'projects' && 'Production-grade repos with 1-click portfolio integration.'}
                    {inspectingResource === 'progress' && 'Real-time match scoring and instant skill verification.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const target = inspectingResource;
                    setInspectingResource(null);
                    onNavigate(target);
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-xs font-semibold text-[#FEC163] transition-colors cursor-pointer"
                >
                  <span>Open Full Tab</span>
                  <ExternalLink className="size-3" />
                </button>

                <button
                  type="button"
                  onClick={() => setInspectingResource(null)}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              {/* Success Notification Banner for Project Addition */}
              {addedProjectNotice && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 shrink-0" />
                    <span>{addedProjectNotice}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setInspectingResource(null);
                      // Scroll to project workspace
                    }}
                    className="underline font-semibold cursor-pointer text-emerald-200"
                  >
                    View in Projects
                  </button>
                </div>
              )}

              {/* 1. COURSES MODAL VIEW */}
              {inspectingResource === 'courses' && (
                <div className="space-y-4">
                  {/* Difficulty Filter */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                      Curated Courses ({coursesList.length})
                    </span>
                    <div className="flex items-center gap-1 text-xs">
                      {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
                        <button
                          key={diff}
                          type="button"
                          onClick={() => setCourseDifficultyFilter(diff)}
                          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                            courseDifficultyFilter === diff
                              ? 'bg-white text-zinc-950 font-semibold'
                              : 'text-zinc-400 hover:text-white bg-white/[0.04]'
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {coursesList
                      .filter((c) => courseDifficultyFilter === 'All' || c.difficulty === courseDifficultyFilter)
                      .map((course) => {
                        const isEnrolled = enrolledCourseIds.includes(course.id);

                        return (
                          <div
                            key={course.id}
                            className="p-4 rounded-xl border border-white/[0.08] bg-black/40 hover:bg-black/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                                <span className="font-semibold text-[#FEC163]">{course.provider}</span>
                                <span>·</span>
                                <span>{course.duration}</span>
                                <span>·</span>
                                <span className="text-emerald-400">{course.difficulty}</span>
                              </div>
                              <h4 className="font-semibold text-white text-sm">{course.title}</h4>
                              <p className="text-xs text-zinc-400">Target Skill: {course.skill}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setEnrolledCourseIds((prev) =>
                                    prev.includes(course.id)
                                      ? prev.filter((id) => id !== course.id)
                                      : [...prev, course.id]
                                  );
                                }}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1 ${
                                  isEnrolled
                                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                                    : 'bg-white/[0.04] border-white/10 text-zinc-300 hover:text-white'
                                }`}
                              >
                                <Check className={`size-3 ${isEnrolled ? 'opacity-100' : 'opacity-40'}`} />
                                <span>{isEnrolled ? 'Saved to Plan' : 'Bookmark'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (course.url) window.open(course.url, '_blank');
                                  else onNavigate('courses');
                                }}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FEC163] hover:bg-[#ffcd7d] text-zinc-950 transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <span>Start Course</span>
                                <ExternalLink className="size-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* 2. KNOWLEDGE BASE MODAL VIEW */}
              {inspectingResource === 'careers' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#FEC163] uppercase">Target Track</span>
                      <span className="text-xs font-semibold text-white">
                        Avg CTC: {topCareer?.averageSalaryIndia || '₹8.5 - 24 LPA'}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-base">
                      {user.careerGoal || topCareer?.title || 'Data Science & Applied Analytics'}
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {topCareer?.description ||
                        'Calibrated roadmap for tech placement season, focusing on technical problem solving and live portfolio artifacts.'}
                    </p>
                  </div>

                  {/* Top Recruiters in India */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2.5">
                      Top Indian Recruiters & Placement Targets
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {recruitersList.map((recruiter) => (
                        <div
                          key={recruiter}
                          className="p-3 rounded-lg border border-white/[0.08] bg-black/40 flex items-center gap-2"
                        >
                          <BuildingIcon className="size-4 text-[#FEC163] shrink-0" />
                          <span className="text-xs font-semibold text-white truncate">{recruiter}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4-Stage Interview Process */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2.5">
                      Typical Hiring Pipeline
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-lg border border-white/[0.06] bg-black/30">
                        <span className="font-mono text-[#FEC163] font-bold">Round 1 · Online Assessment (OA)</span>
                        <p className="text-zinc-400 text-[11px] mt-1">2 Data structures problems + 20 aptitude & CS fundamentals</p>
                      </div>
                      <div className="p-3 rounded-lg border border-white/[0.06] bg-black/30">
                        <span className="font-mono text-[#FEC163] font-bold">Round 2 · Technical Machine Coding</span>
                        <p className="text-zinc-400 text-[11px] mt-1">Hands-on live problem solving & SQL aggregations</p>
                      </div>
                      <div className="p-3 rounded-lg border border-white/[0.06] bg-black/30">
                        <span className="font-mono text-[#FEC163] font-bold">Round 3 · Architecture & Projects</span>
                        <p className="text-zinc-400 text-[11px] mt-1">In-depth scrutiny of your GitHub repos and system trade-offs</p>
                      </div>
                      <div className="p-3 rounded-lg border border-white/[0.06] bg-black/30">
                        <span className="font-mono text-[#FEC163] font-bold">Round 4 · HR & Culture Fit</span>
                        <p className="text-zinc-400 text-[11px] mt-1">STAR method behavioral queries and salary negotiation</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleCopyCheatsheet}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] text-xs font-medium text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {copiedCheatsheet ? (
                        <>
                          <Check className="size-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Cheatsheet Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5 text-[#FEC163]" />
                          <span>Copy Placement Cheatsheet</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setInspectingResource(null);
                        onNavigate('careers');
                      }}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#FEC163] hover:bg-[#ffcd7d] text-zinc-950 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Explore All 24+ Career Paths</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* 3. CAPSTONE PROJECTS MODAL VIEW */}
              {inspectingResource === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      Verified Placement Blueprints ({projectsList.length})
                    </span>
                    <span className="text-xs text-zinc-400">1-Click Add directly to your Portfolio</span>
                  </div>

                  <div className="space-y-3">
                    {projectsList.map((project) => {
                      const isAdding = addingProjectId === project.id;

                      return (
                        <div
                          key={project.id}
                          className="p-4 rounded-xl border border-white/[0.08] bg-black/40 space-y-3 hover:border-emerald-500/30 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                                <span className="text-emerald-400 font-semibold">{project.domain}</span>
                                <span>·</span>
                                <span>{project.difficulty}</span>
                                <span>·</span>
                                <span>~{project.estimatedHours} hrs</span>
                              </div>
                              <h4 className="font-semibold text-white text-sm mt-0.5">{project.title}</h4>
                            </div>

                            <button
                              type="button"
                              disabled={isAdding}
                              onClick={() => handleAddBlueprintToPortfolio(project)}
                              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 self-start sm:self-auto disabled:opacity-50"
                            >
                              {isAdding ? (
                                <>
                                  <Loader2 className="size-3.5 animate-spin" />
                                  <span>Adding...</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="size-3.5" />
                                  <span>Add to My Portfolio</span>
                                </>
                              )}
                            </button>
                          </div>

                          <p className="text-xs text-zinc-300 leading-relaxed">{project.description}</p>

                          <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            <span className="text-[10px] text-zinc-500 font-mono">Tech Stack:</span>
                            {project.keySkills.map((skill) => (
                              <span
                                key={skill}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-zinc-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. SKILL PROGRESS MODAL VIEW */}
              {inspectingResource === 'progress' && (
                <div className="space-y-5">
                  {/* Match Meter */}
                  <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-rose-300 uppercase">
                        Current Placement Skill Match
                      </span>
                      <span className="text-sm font-bold text-white font-mono">{matchPercentage}% Match</span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 transition-all duration-500"
                        style={{ width: `${matchPercentage}%` }}
                      />
                    </div>

                    <p className="text-xs text-zinc-300">
                      You have verified {acquiredSkills.length} competencies. Unlocking the remaining {missingSkills.length} skills will push your ATS match score above 85%.
                    </p>
                  </div>

                  {/* Verified Skills */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5" />
                      <span>Verified Competencies ({acquiredSkills.length})</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {acquiredSkills.map((skill: string) => (
                        <div
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5"
                        >
                          <Check className="size-3" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* High Yield Missing Skills with Instant Verify */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#FEC163] font-semibold mb-2">
                      High-Yield Skills to Unlock ({missingSkills.length})
                    </h4>
                    <div className="space-y-2.5">
                      {missingSkills.map((skill: any) => {
                        const isVerifying = verifyingSkill === skill.name;
                        const isAlreadyVerified = (user.skills || []).includes(skill.name);

                        return (
                          <div
                            key={skill.name}
                            className="p-3 rounded-xl border border-white/[0.08] bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white text-xs">{skill.name}</span>
                                <span
                                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                                    skill.importance === 'high'
                                      ? 'bg-rose-950/60 border-rose-500/30 text-rose-300'
                                      : 'bg-amber-950/60 border-amber-500/30 text-amber-300'
                                  }`}
                                >
                                  {skill.importance} priority
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-400">{skill.reason}</p>
                            </div>

                            <button
                              type="button"
                              disabled={isVerifying || isAlreadyVerified}
                              onClick={() => handleVerifySkill(skill.name)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1 ${
                                isAlreadyVerified
                                  ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 cursor-default'
                                  : 'bg-white/[0.08] hover:bg-white/[0.15] text-[#FEC163] border border-[#FEC163]/30'
                              }`}
                            >
                              {isVerifying ? (
                                <Loader2 className="size-3 animate-spin" />
                              ) : isAlreadyVerified ? (
                                <>
                                  <Check className="size-3" />
                                  <span>Verified</span>
                                </>
                              ) : (
                                <>
                                  <Sparkles className="size-3" />
                                  <span>Verify Competency</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Action Footer */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setInspectingResource(null);
                        onNavigate('interview');
                      }}
                      className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="size-3.5" />
                      <span>Practice in AI Greenroom Interview</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-white/[0.08] bg-black/30 flex items-center justify-between text-xs text-zinc-400 shrink-0">
              <span className="font-mono text-[11px]">AI Placement Engine v2.4</span>
              <button
                type="button"
                onClick={() => setInspectingResource(null)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// 4. InspirationList (Demostack Inspired Demos)
// ---------------------------------------------------------------------------
function InspirationList({
  inspiredItems,
}: {
  inspiredItems: Array<{
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
    onClick: () => void;
  }>;
}) {
  return (
    <section className="flex flex-1 flex-col items-start gap-8">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-lg font-semibold text-white">Get Inspired</h2>
        <span className="text-xs text-[#FEC163] font-medium">Target Tracks</span>
      </div>

      <div className="flex w-full flex-col gap-2">
        {inspiredItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              onClick={item.onClick}
              className="bg-[#160703] hover:bg-[#200A04] border border-white/[0.06] hover:border-[#FEC163]/40 group flex h-18 w-full items-center justify-between rounded-2xl py-4 pr-8 pl-6 cursor-pointer transition-colors shadow-sm"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  <Icon className="max-h-7 max-w-7 transition-transform duration-200 ease-out group-hover:scale-105" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-white text-sm group-hover:text-[#FEC163] transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 truncate">{item.subtitle}</p>
                </div>
              </div>
              <ArrowUpRight className="text-zinc-400 group-hover:text-[#FEC163] size-6 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 5. Application Interface Mockup Frame
// ---------------------------------------------------------------------------
function ApplicationInterfaceFrame({
  project,
}: {
  project: StudentProject;
}) {
  const displayUrl = project.liveUrl || project.githubUrl || 'https://portfolio.demo.app';
  const hostname = displayUrl.replace(/^https?:\/\//, '').split('/')[0];
  const type = project.previewType || 'analytics';

  return (
    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.1] bg-[#0A0503] flex flex-col group/preview select-none">
      {/* Browser Bar */}
      <div className="h-7 bg-[#140603] border-b border-white/[0.08] px-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-rose-500/80" />
          <div className="size-2 rounded-full bg-amber-500/80" />
          <div className="size-2 rounded-full bg-emerald-500/80" />
        </div>

        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/50 border border-white/[0.06] text-[10px] text-zinc-400 font-mono max-w-[170px] truncate">
          <Globe className="size-2.5 text-zinc-500 shrink-0" />
          <span className="truncate">{hostname}</span>
        </div>

        {project.liveUrl ? (
          <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[9px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-500/30">
            <Github className="size-2.5" />
            Git
          </span>
        )}
      </div>

      {/* Screen Interface Mock */}
      <div className="flex-1 p-3 bg-gradient-to-br from-[#120502] via-[#0D0402] to-[#080201] overflow-hidden flex flex-col justify-between relative">
        {type === 'analytics' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-zinc-400 font-mono">Overview · Telemetry</span>
              <span className="text-emerald-400 font-mono font-bold">+28.4% MoM</span>
            </div>
            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-1.5">
              <div className="p-1.5 rounded bg-white/[0.04] border border-white/[0.06]">
                <p className="text-[9px] text-zinc-500">Latency</p>
                <p className="text-[11px] font-bold text-white font-mono">42ms</p>
              </div>
              <div className="p-1.5 rounded bg-white/[0.04] border border-white/[0.06]">
                <p className="text-[9px] text-zinc-500">Capacity</p>
                <p className="text-[11px] font-bold text-[#FEC163] font-mono">94.8%</p>
              </div>
              <div className="p-1.5 rounded bg-white/[0.04] border border-white/[0.06]">
                <p className="text-[9px] text-zinc-500">Events/s</p>
                <p className="text-[11px] font-bold text-emerald-400 font-mono">1.2k</p>
              </div>
            </div>
            {/* SVG Wave Chart */}
            <div className="h-14 w-full pt-1">
              <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id={`grad-${project.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FEC163" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#DE4313" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,45 Q30,10 60,35 T120,20 T180,38 T240,15 L240,60 L0,60 Z"
                  fill={`url(#grad-${project.id})`}
                />
                <path
                  d="M0,45 Q30,10 60,35 T120,20 T180,38 T240,15"
                  fill="none"
                  stroke="#FEC163"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        )}

        {type === 'saas' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-[#FEC163]" />
                <span className="text-white font-semibold">AI Workspace</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-600/30 text-orange-300 font-mono">Production</span>
            </div>
            <div className="space-y-1.5">
              <div className="p-2 rounded bg-white/[0.04] border border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] text-zinc-300">Resume Parser · NLP Engine</span>
                <span className="text-[9px] text-emerald-400 font-mono">Score 94%</span>
              </div>
              <div className="p-2 rounded bg-white/[0.04] border border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] text-zinc-300">Vector Embeddings · Cosine Match</span>
                <span className="text-[9px] text-amber-400 font-mono">Optimized</span>
              </div>
            </div>
          </div>
        )}

        {type === 'code' && (
          <div className="font-mono text-[9px] space-y-1 text-zinc-400">
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-1 text-zinc-500">
              <Terminal className="size-3 text-[#FEC163]" />
              <span>server.ts [FastAPI / REST]</span>
            </div>
            <p className="text-purple-400">@app.post(<span className="text-emerald-300">&quot;/api/stream&quot;</span>)</p>
            <p className="text-zinc-300"><span className="text-blue-400">async def</span> <span className="text-[#FEC163]">handle_request</span>(req: StreamReq):</p>
            <p className="text-zinc-400 pl-3">data = <span className="text-blue-400">await</span> engine.evaluate(req.data)</p>
            <p className="text-emerald-400 pl-3">return <span className="text-zinc-300">&#123;</span><span className="text-orange-300">&quot;status&quot;</span>: 200, <span className="text-orange-300">&quot;score&quot;</span>: 94&#125;</p>
          </div>
        )}

        {type === 'dashboard' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-white font-semibold">Recruitment Portal</span>
              <span className="text-emerald-400 font-mono text-[9px]">42 Companies Live</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-2 rounded bg-white/[0.04] border border-white/[0.06]">
                <p className="text-[9px] text-zinc-400">Eligible Students</p>
                <p className="text-xs font-bold text-white font-mono">1,420</p>
              </div>
              <div className="p-2 rounded bg-white/[0.04] border border-white/[0.06]">
                <p className="text-[9px] text-zinc-400">Shortlisted</p>
                <p className="text-xs font-bold text-[#FEC163] font-mono">318</p>
              </div>
            </div>
            <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#FEC163] to-[#DE4313] w-3/4 rounded-full" />
            </div>
          </div>
        )}

        {type === 'mobile' && (
          <div className="space-y-2 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-zinc-400 font-mono">Mobile App · Native Viewport</span>
              <span className="text-emerald-400 font-mono font-bold">iOS / Android</span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white font-medium">Touch Interface</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">60 FPS</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-zinc-400">
                <div className="size-1.5 rounded-full bg-[#FEC163]" />
                <span>Responsive Viewport · Production Ready</span>
              </div>
            </div>
            <div className="flex items-center justify-around py-1 bg-black/40 rounded border border-white/[0.04] text-[9px] text-zinc-400">
              <span className="text-[#FEC163]">Home</span>
              <span>Feed</span>
              <span>Profile</span>
            </div>
          </div>
        )}

        {/* Action Layer on Hover */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] opacity-0 group-hover/preview:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 p-4 z-10">
          {project.liveUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
              }}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer w-full max-w-[200px] justify-center"
            >
              <span>Launch Live App</span>
              <ExternalLink className="size-3.5" />
            </button>
          )}
          {project.githubUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
              }}
              className="px-4 py-2 rounded-xl bg-white/[0.1] hover:bg-white/[0.2] border border-white/[0.2] text-white text-xs flex items-center gap-2 cursor-pointer w-full max-w-[200px] justify-center transition-transform hover:scale-105"
            >
              <Github className="size-3.5" />
              <span>View GitHub Code</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 6. Resume & Portfolio Projects Workspace (With Real Project Redirection & AI Analysis)
// ---------------------------------------------------------------------------
function DemostacksWorkspaceSection({
  user,
  recommendedProjects,
  onNavigate,
  onUpdateUser,
}: {
  user: User;
  recommendedProjects: Project[];
  onNavigate: (tab: string) => void;
  onUpdateUser?: (updated: User) => void;
}) {
  const [workspaceTab, setWorkspaceTab] = useState<'shared' | 'personal' | 'archive'>('shared');
  const [sort, setSort] = useState<SortMode>('recent');
  const [view, setView] = useState<ViewMode>('grid');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<StudentProject | null>(null);

  // Add Project Form
  const [projTitle, setProjTitle] = useState('');
  const [projGithub, setProjGithub] = useState('');
  const [projLive, setProjLive] = useState('');
  const [projTech, setProjTech] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projType, setProjType] = useState<'analytics' | 'saas' | 'code' | 'dashboard'>('analytics');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);

  // Combined project list: user.studentProjects (defaults to empty so no fake demo projects appear)
  const [localProjects, setLocalProjects] = useState<StudentProject[]>(() => {
    return user.studentProjects && user.studentProjects.length > 0 ? user.studentProjects : [];
  });

  // Keep in sync with user.studentProjects from profile updates
  useEffect(() => {
    if (user.studentProjects) {
      setLocalProjects(user.studentProjects);
    }
  }, [user.studentProjects]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProjectForDetail(null);
        setShowAddModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered and sorted projects
  const displayProjects = useMemo(() => {
    let list = [...localProjects];

    if (workspaceTab === 'personal') {
      list = list.filter((p) => p.author === (user.name || 'You') || p.author === 'You');
    } else if (workspaceTab === 'archive') {
      list = [];
    }

    if (sort === 'ascending') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'descending') {
      list.sort((a, b) => b.title.localeCompare(a.title));
    }

    return list;
  }, [localProjects, workspaceTab, sort, user.name]);

  // Handler: Add new project with AI Analysis
  const handleAddProjectWithAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) return;

    setIsAnalyzing(true);
    const techArray = projTech
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await api.analyzeProject({
        title: projTitle,
        description: projDesc,
        techStack: techArray,
        githubUrl: projGithub,
        liveUrl: projLive,
      });

      const aiPreview = (res.analysis?.previewType as any) || projType || 'saas';

      const newProj: StudentProject = {
        id: `proj-${Date.now()}`,
        title: projTitle.trim(),
        description: projDesc.trim() || 'Student technical portfolio project',
        techStack: techArray.length > 0 ? techArray : ['Web Development', 'Git'],
        githubUrl: projGithub.trim() || undefined,
        liveUrl: projLive.trim() || undefined,
        link: projLive.trim() || projGithub.trim() || undefined,
        previewType: aiPreview,
        author: user.name || 'You',
        createdAt: 'Just now',
        isShared: true,
        aiAnalysis: res.analysis,
      };

      const updated = [newProj, ...localProjects];
      setLocalProjects(updated);

      // Save to user object
      const updatedUser: User = {
        ...user,
        studentProjects: updated,
      };
      if (onUpdateUser) {
        onUpdateUser(updatedUser);
      }
      localStorage.setItem('ai_skill_mentor_user', JSON.stringify(updatedUser));
      try {
        await api.updateProfile(user.id, { studentProjects: updated });
      } catch (_) {}

      // Reset form
      setProjTitle('');
      setProjGithub('');
      setProjLive('');
      setProjTech('');
      setProjDesc('');
      setShowAddModal(false);
      setSelectedProjectForDetail(null);
    } catch (err) {
      console.error('Error adding project:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  // Direct redirection to the project or application
  const handleOpenProject = (proj: StudentProject, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const targetUrl = proj.liveUrl || proj.githubUrl || proj.link;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedProjectForDetail(proj);
    }
  };

  // Delete project
  const handleDeleteProject = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = localProjects.filter((p) => p.id !== id);
    setLocalProjects(updated);
    const updatedUser: User = {
      ...user,
      studentProjects: updated,
    };
    if (onUpdateUser) {
      onUpdateUser(updatedUser);
    }
    localStorage.setItem('ai_skill_mentor_user', JSON.stringify(updatedUser));
    try {
      await api.updateProfile(user.id, { studentProjects: updated });
    } catch (_) {}
  };

  // Optional: Quick preview sample project
  const handleLoadSampleProject = async () => {
    const sampleProj: StudentProject = {
      id: `proj-sample-${Date.now()}`,
      title: 'Full-Stack Telemetry & Analytics Dashboard',
      description: 'Real-time telemetry application analyzing patient wait times, ICU bed availability, and automated critical condition alerts with WebSocket integration.',
      techStack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind'],
      liveUrl: 'https://healthflow-telemetry.vercel.app',
      githubUrl: 'https://github.com/student/healthflow-telemetry',
      previewType: 'analytics',
      author: user.name || 'You',
      createdAt: 'Just now',
      isShared: true,
      aiAnalysis: {
        recruiterScore: 94,
        impactSummary: 'Demonstrates robust full-stack telemetry architecture and data visualization. Highly appealing to enterprise healthtech and fintech recruiters.',
        verifiedSkills: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'WebSockets', 'Tailwind CSS'],
        suggestedResumeBullets: [
          'Architected an end-to-end hospital bed telemetry dashboard utilizing React and FastAPI, reducing ICU bed allocation latency by 42%.',
          'Engineered real-time patient queue metrics using WebSockets, processing 800+ live telemetry events per minute with sub-100ms response time.',
          'Integrated PostgreSQL indexed schemas and automated alerts, boosting hospital department triage efficiency by 30%.'
        ],
        interviewQuestions: [
          'How did you ensure reliable state synchronization across multiple hospital wards using WebSockets?',
          'What database indexing strategies did you apply on PostgreSQL to handle high-frequency sensor updates?'
        ],
        analyzedAt: new Date().toISOString()
      }
    };

    const updated = [sampleProj, ...localProjects];
    setLocalProjects(updated);
    const updatedUser: User = {
      ...user,
      studentProjects: updated,
    };
    if (onUpdateUser) {
      onUpdateUser(updatedUser);
    }
    localStorage.setItem('ai_skill_mentor_user', JSON.stringify(updatedUser));
    try {
      await api.updateProfile(user.id, { studentProjects: updated });
    } catch (_) {}
  };

  return (
    <section className="pt-6 border-t border-white/[0.08]">
      {/* Workspace Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Resume & Portfolio Projects
            </h2>
            <div
              className="text-zinc-400 hover:text-white cursor-pointer"
              title="Real-world projects that recruiters review during technical interviews. Click any card to launch the live app or inspect the code."
            >
              <Info className="size-4.5" />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
            Add your GitHub repositories or deployed links. AI automatically analyzes your tech stack, evaluates recruiter appeal, and generates Google X-Y-Z resume bullet points.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="h-10 px-4 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] hover:from-[#ffd28e] hover:to-[#ef5323] text-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-orange-950/60"
          >
            <Plus className="size-4 text-black" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Toolbar with Shared / Personal / Archive + Sort + Grid/List Toggle */}
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWorkspaceTab('shared')}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-all cursor-pointer ${
              workspaceTab === 'shared'
                ? 'border-[#FEC163] text-[#FEC163]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Users className="size-4" />
            <span>Shared with Campus ({localProjects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setWorkspaceTab('personal')}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-all cursor-pointer ${
              workspaceTab === 'personal'
                ? 'border-[#FEC163] text-[#FEC163]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <UserRound className="size-4" />
            <span>My Projects</span>
          </button>

          <button
            type="button"
            onClick={() => setWorkspaceTab('archive')}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-all cursor-pointer ${
              workspaceTab === 'archive'
                ? 'border-[#FEC163] text-[#FEC163]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Archive className="size-4" />
            <span>Archive</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Selector */}
          <button
            type="button"
            onClick={() => {
              setSort(sort === 'recent' ? 'ascending' : sort === 'ascending' ? 'descending' : 'recent');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.08] bg-[#140603] text-zinc-300 hover:text-white text-xs font-medium cursor-pointer"
            title="Toggle sort"
          >
            <ArrowDownWideNarrow className="size-4 text-zinc-400" />
            <span>{sort === 'recent' ? 'Recent' : sort === 'ascending' ? 'Title A-Z' : 'Title Z-A'}</span>
          </button>

          {/* Grid / List Switcher */}
          <button
            type="button"
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
            className="flex size-9 items-center justify-center rounded-xl border border-white/[0.08] bg-[#140603] text-zinc-300 hover:text-white cursor-pointer"
            aria-label={view === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
          >
            {view === 'grid' ? <List className="size-4" /> : <Grid2X2 className="size-4" />}
          </button>
        </div>
      </div>

      {/* Projects Grid with Real Application Interface Views */}
      {workspaceTab !== 'archive' && displayProjects.length > 0 && (
        <div
          className={`mt-6 ${
            view === 'grid'
              ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'
              : 'space-y-4'
          }`}
        >
          {displayProjects.map((proj) => (
            <article
              key={proj.id}
              onClick={() => handleOpenProject(proj)}
              className={`group cursor-pointer rounded-2xl border border-white/[0.08] bg-[#120502]/90 hover:bg-[#1a0803] hover:border-[#FEC163]/50 transition-all p-3.5 flex flex-col justify-between shadow-sm hover:-translate-y-1 ${
                view === 'list' ? 'sm:flex-row sm:items-center sm:gap-6' : ''
              }`}
            >
              <div className="w-full">
                {/* Application Interface Mockup Frame */}
                <div className={view === 'list' ? 'sm:w-72 shrink-0' : 'w-full'}>
                  <ApplicationInterfaceFrame project={proj} />
                </div>

                <div className="mt-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="group-hover:text-[#FEC163] font-semibold text-white text-base leading-snug transition-colors line-clamp-1">
                      {proj.title}
                    </h3>
                    {proj.aiAnalysis?.recruiterScore && (
                      <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FEC163]/15 text-[#FEC163] border border-[#FEC163]/30 font-bold">
                        AI Score {proj.aiAnalysis.recruiterScore}%
                      </span>
                    )}
                  </div>

                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-zinc-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.techStack.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.02] text-zinc-500 font-mono">
                        +{proj.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs w-full">
                <div className="text-zinc-500 text-[11px] truncate flex items-center gap-1.5">
                  <span className="text-zinc-300 font-medium">{proj.author || 'You'}</span>
                  <span>·</span>
                  <span>{proj.createdAt || 'Recent'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectForDetail(proj);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title="View AI Recruiter Analysis & Resume Bullets"
                  >
                    <Sparkles className="size-3 text-[#FEC163]" />
                    <span>AI Breakdown</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleOpenProject(proj, e)}
                    className="px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                    title="Directly launch the live project or repository"
                  >
                    <span>Launch</span>
                    <ExternalLink className="size-3" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDeleteProject(proj.id, e)}
                    className="p-1 rounded-lg hover:bg-rose-500/20 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove project"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Empty State when no student projects added yet */}
      {workspaceTab !== 'archive' && displayProjects.length === 0 && (
        <div className="mt-8 rounded-3xl border border-dashed border-white/[0.12] bg-[#140603]/60 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4">
          <div className="size-14 mx-auto rounded-2xl bg-gradient-to-br from-[#FEC163]/20 to-[#DE4313]/20 border border-[#FEC163]/30 flex items-center justify-center text-[#FEC163] shadow-lg">
            <Code2 className="size-7 text-[#FEC163]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-white">
              {workspaceTab === 'personal' ? 'No Personal Projects Added Yet' : 'No Student Projects in Portfolio'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Recruiters evaluate your practical coding experience. Add your GitHub repository or Live Application link through your Profile or right here. AI analyzes your code, creates a dynamic application preview interface, and writes ATS resume bullet points!
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] hover:from-[#ffd28e] hover:to-[#ef5323] text-black font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-105"
            >
              <Plus className="size-4 text-black" />
              <span>Add Project with GitHub / Live Link</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('setup')}
              className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.15] text-white font-medium text-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <UserRound className="size-4 text-orange-400" />
              <span>Add via Student Profile</span>
            </button>
            <button
              type="button"
              onClick={handleLoadSampleProject}
              className="px-3 py-2 rounded-xl text-zinc-400 hover:text-[#FEC163] text-xs underline cursor-pointer transition-colors"
            >
              Preview with Sample Project
            </button>
          </div>
        </div>
      )}

      {workspaceTab === 'archive' && (
        <div className="mt-8 flex min-h-48 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] p-6 text-center">
          <p className="font-medium text-white text-sm">Archive is empty</p>
          <p className="text-zinc-500 text-xs">Archived projects will appear here.</p>
        </div>
      )}

      {/* =========================================================================
         MODAL 1: ADD PROJECT WITH AI ANALYSIS
         ========================================================================= */}
      {showAddModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false);
          }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="bg-[#140603] border border-white/[0.14] rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[88vh] flex flex-col shadow-2xl animate-fade-in overflow-hidden relative text-xs text-white">
            {/* Sticky Header with Back Button */}
            <div className="sticky top-0 z-20 bg-[#160703] border-b border-white/[0.1] px-5 py-3.5 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-zinc-200 hover:text-white font-medium text-xs transition-colors cursor-pointer"
              >
                <ArrowLeft className="size-4 text-[#FEC163]" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-2">
                <div className="size-6 rounded-lg bg-gradient-to-br from-[#FEC163] to-[#DE4313] flex items-center justify-center text-black font-bold">
                  <Sparkles className="size-3.5" />
                </div>
                <h3 className="text-sm font-bold text-white">Add Project to Portfolio</h3>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="size-7 flex items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white cursor-pointer"
                title="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleAddProjectWithAI} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              <div>
                <label className="text-zinc-300 font-medium block mb-1">
                  Project Title <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="e.g. Real-Time Telemetry & Patient Flow Dashboard"
                  className="w-full bg-black/50 border border-white/[0.1] rounded-xl p-2.5 text-white text-xs focus:border-[#FEC163] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 font-medium block mb-1 flex items-center gap-1.5">
                    <Globe className="size-3 text-orange-400" />
                    <span>Live Application Link</span>
                  </label>
                  <input
                    type="url"
                    value={projLive}
                    onChange={(e) => setProjLive(e.target.value)}
                    placeholder="https://my-project.vercel.app"
                    className="w-full bg-black/50 border border-white/[0.1] rounded-xl p-2.5 text-white text-xs focus:border-[#FEC163] focus:outline-none"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">Users will be directed here when clicked</p>
                </div>

                <div>
                  <label className="text-zinc-300 font-medium block mb-1 flex items-center gap-1.5">
                    <Github className="size-3 text-orange-400" />
                    <span>GitHub Repository Link</span>
                  </label>
                  <input
                    type="url"
                    value={projGithub}
                    onChange={(e) => setProjGithub(e.target.value)}
                    placeholder="https://github.com/user/project-repo"
                    className="w-full bg-black/50 border border-white/[0.1] rounded-xl p-2.5 text-white text-xs focus:border-[#FEC163] focus:outline-none"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">For recruiters reviewing code</p>
                </div>
              </div>

              <div>
                <label className="text-zinc-300 font-medium block mb-1">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={projTech}
                  onChange={(e) => setProjTech(e.target.value)}
                  placeholder="e.g. React, TypeScript, FastAPI, PostgreSQL, Tailwind"
                  className="w-full bg-black/50 border border-white/[0.1] rounded-xl p-2.5 text-white text-xs focus:border-[#FEC163] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-300 font-medium block mb-1">
                  Interface Style Preview
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'analytics', label: 'Analytics' },
                    { id: 'saas', label: 'SaaS App' },
                    { id: 'code', label: 'Backend API' },
                    { id: 'dashboard', label: 'Dashboard' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProjType(item.id as any)}
                      className={`p-2 rounded-xl border text-center font-medium transition-all ${
                        projType === item.id
                          ? 'bg-[#FEC163]/20 border-[#FEC163] text-[#FEC163]'
                          : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-zinc-300 font-medium block mb-1">
                  Project Description & Outcomes
                </label>
                <textarea
                  rows={3}
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  placeholder="What problem did you solve? What were the key engineering features and metrics?"
                  className="w-full bg-black/50 border border-white/[0.1] rounded-xl p-2.5 text-white text-xs focus:border-[#FEC163] focus:outline-none resize-none"
                />
              </div>

              {/* Sticky Footer */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>Cancel</span>
                </button>

                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FEC163] via-[#FA8C28] to-[#DE4313] hover:from-[#ffe19c] hover:to-[#ef5323] text-black font-bold text-xs flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-black" />
                      <span>AI Analyzing Project...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4 text-black" />
                      <span>Analyze with AI & Add to Portfolio</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODAL 2: AI RECRUITER ANALYSIS BREAKDOWN
         ========================================================================= */}
      {selectedProjectForDetail && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProjectForDetail(null);
          }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="bg-[#140603] border border-white/[0.14] rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl animate-fade-in overflow-hidden relative text-xs text-white">
            {/* Sticky Header with Prominent Back Button */}
            <div className="sticky top-0 z-20 bg-[#160703] border-b border-white/[0.1] px-5 py-3.5 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedProjectForDetail(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-zinc-200 hover:text-white font-medium text-xs transition-all cursor-pointer hover:-translate-x-0.5"
              >
                <ArrowLeft className="size-4 text-[#FEC163]" />
                <span>Back to Dashboard</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FEC163]/20 border border-[#FEC163]/40 text-[#FEC163] font-mono font-bold text-[11px]">
                  Score: {selectedProjectForDetail.aiAnalysis?.recruiterScore || 92}%
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProjectForDetail(null)}
                  className="size-7 flex items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white cursor-pointer"
                  title="Close modal"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {/* Project title and header info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    Verified Portfolio Project
                  </span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-zinc-400 text-[11px] capitalize">
                    {selectedProjectForDetail.previewType || 'Web App'} Interface
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {selectedProjectForDetail.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed pt-0.5">
                  {selectedProjectForDetail.description}
                </p>
              </div>

              {/* Direct Redirect Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                {selectedProjectForDetail.liveUrl && (
                  <button
                    type="button"
                    onClick={() => window.open(selectedProjectForDetail.liveUrl, '_blank')}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-transform hover:scale-105"
                  >
                    <Globe className="size-3.5" />
                    <span>Launch Live Application ↗</span>
                  </button>
                )}

                {selectedProjectForDetail.githubUrl && (
                  <button
                    type="button"
                    onClick={() => window.open(selectedProjectForDetail.githubUrl, '_blank')}
                    className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.15] text-white text-xs flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105"
                  >
                    <Github className="size-3.5" />
                    <span>View GitHub Repository ↗</span>
                  </button>
                )}
              </div>

              {/* AI Summary */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-[#FEC163]" />
                  <span>AI Engineering Assessment</span>
                </h4>
                <p className="text-zinc-400 leading-relaxed text-xs p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  {selectedProjectForDetail.aiAnalysis?.impactSummary || selectedProjectForDetail.description}
                </p>
              </div>

              {/* Verified Skills */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-zinc-300">
                  Verified Technical Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedProjectForDetail.aiAnalysis?.verifiedSkills || selectedProjectForDetail.techStack).map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-[#FEC163]/10 border border-[#FEC163]/25 text-[#FEC163] font-mono text-[11px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Google X-Y-Z Resume Bullets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-400" />
                    <span>ATS Resume Bullets (Google X-Y-Z Formula)</span>
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-mono">Click to copy</span>
                </div>

                <div className="space-y-2">
                  {(selectedProjectForDetail.aiAnalysis?.suggestedResumeBullets || [
                    `Architected and deployed "${selectedProjectForDetail.title}" utilizing ${selectedProjectForDetail.techStack.join(', ')}, delivering high-performance end-to-end functionality.`,
                    `Engineered modular data pipelines and REST endpoints, reducing response latency by 35%.`
                  ]).map((bullet, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCopyBullet(bullet, idx)}
                      className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#FEC163]/40 text-zinc-300 text-xs flex items-start justify-between gap-3 cursor-pointer transition-all group"
                    >
                      <p className="leading-relaxed flex-1">{bullet}</p>
                      <span className="shrink-0 text-zinc-400 group-hover:text-[#FEC163] p-1">
                        {copiedBulletIdx === idx ? (
                          <Check className="size-4 text-emerald-400" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Interview Questions */}
              {selectedProjectForDetail.aiAnalysis?.interviewQuestions && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-zinc-300">
                    Campus Interview Prep · Questions Recruiters Will Ask
                  </h4>
                  <div className="space-y-1.5">
                    {selectedProjectForDetail.aiAnalysis.interviewQuestions.map((q, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#1A0803] border border-white/[0.06] text-zinc-300 text-xs">
                        <span className="text-[#FEC163] font-bold mr-1.5 font-mono">Q{idx + 1}:</span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Bottom Footer with Back Button */}
            <div className="sticky bottom-0 z-20 bg-[#160703] border-t border-white/[0.1] px-5 py-3 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedProjectForDetail(null)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white font-medium text-xs transition-colors cursor-pointer"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back to Dashboard</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedProjectForDetail.githubUrl && (
                  <button
                    type="button"
                    onClick={() => window.open(selectedProjectForDetail.githubUrl, '_blank')}
                    className="px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.15] text-white text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Github className="size-3.5" />
                    <span>View GitHub</span>
                  </button>
                )}
                {selectedProjectForDetail.liveUrl && (
                  <button
                    type="button"
                    onClick={() => window.open(selectedProjectForDetail.liveUrl, '_blank')}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Globe className="size-3.5" />
                    <span>Launch Live App ↗</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
