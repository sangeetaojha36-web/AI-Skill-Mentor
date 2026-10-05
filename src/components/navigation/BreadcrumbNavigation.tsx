import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  type BreadcrumbSegment,
} from '@/components/base-ui/breadcrumb';
import {
  ArrowLeft,
  Home,
  Layers,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  FileText,
  Target,
  Compass,
  BookOpen,
  Video,
  ArrowRight,
} from 'lucide-react';
import { User } from '../../types.ts';

export interface BreadcrumbNavigationProps {
  activeTab: string;
  historyStack: string[];
  user: User | null;
  currentDetailTitle?: string | null;
  onClearDetail?: () => void;
  onNavigate: (tab: string) => void;
  onBack: () => void;
  customSegments?: readonly BreadcrumbSegment[];
  className?: string;
}

const TAB_META: Record<string, { label: string; shortLabel: string; parentTab?: string }> = {
  dashboard: { label: 'Placement Dashboard', shortLabel: 'Dashboard' },
  setup: { label: 'Student Profile & Resume Setup', shortLabel: 'Profile Setup' },
  resume: { label: 'AI Resume Analyzer', shortLabel: 'Resume AI' },
  skillgap: { label: 'Skill Gap Matrix', shortLabel: 'Skill Gaps', parentTab: 'resume' },
  roadmap: { label: 'Personalized Roadmap', shortLabel: 'Roadmap', parentTab: 'skillgap' },
  courses: { label: 'Learning Academy', shortLabel: 'Courses', parentTab: 'roadmap' },
  projects: { label: 'Portfolio Projects', shortLabel: 'Projects', parentTab: 'roadmap' },
  interview: { label: 'Mock Interview Studio', shortLabel: 'Mock Interview', parentTab: 'courses' },
  progress: { label: 'Progress Tracker', shortLabel: 'Progress', parentTab: 'interview' },
  careers: { label: 'Career Explorer & Branch Matches', shortLabel: 'Career Explorer' },
  admin: { label: 'Admin Console', shortLabel: 'Admin' },
};

// 6-Step Placement Workflow from user specification:
// 1. Student registers and uploads resume.
// 2. Resume is analyzed using AI.
// 3. Skill gaps are identified.
// 4. Personalized roadmap is generated.
// 5. AI recommends courses and projects.
// 6. Mock interview and dashboard track progress.
export const WORKFLOW_PIPELINE = [
  {
    stepNum: 1,
    label: 'Upload Resume',
    tab: 'resume',
    altTab: 'setup',
    desc: 'Register & upload CV',
  },
  {
    stepNum: 2,
    label: 'AI Analysis',
    tab: 'resume',
    desc: 'Extract verified skills & ATS score',
  },
  {
    stepNum: 3,
    label: 'Skill Gaps',
    tab: 'skillgap',
    desc: 'Benchmark missing recruiter competencies',
  },
  {
    stepNum: 4,
    label: 'Roadmap',
    tab: 'roadmap',
    desc: 'Generate weekly milestone plan',
  },
  {
    stepNum: 5,
    label: 'Courses & Projects',
    tab: 'courses',
    altTab: 'projects',
    desc: 'Curated courses & capstone builds',
  },
  {
    stepNum: 6,
    label: 'Interview & Progress',
    tab: 'interview',
    altTab: 'progress',
    desc: 'STAR mock interview & progress tracking',
  },
];

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  activeTab,
  historyStack,
  user,
  currentDetailTitle,
  onClearDetail,
  onNavigate,
  onBack,
  customSegments,
  className = '',
}) => {
  // Compute step-by-step breadcrumb segments
  const segments: BreadcrumbSegment[] = React.useMemo(() => {
    if (customSegments && customSegments.length > 0) {
      return [...customSegments];
    }

    const result: BreadcrumbSegment[] = [];

    // Always start with Dashboard as root step
    if (activeTab === 'dashboard') {
      result.push({
        label: 'Platform',
        href: '#',
        icon: <Layers className="w-3 h-3 text-slate-400" />,
        onClick: () => onNavigate('dashboard'),
      });
      result.push({
        label: 'Placement Dashboard',
        current: true,
        icon: <Home className="w-3.5 h-3.5 text-[#FEC163]" />,
        badge: user?.education?.branch ? `${user.education.branch.split(' ')[0]}` : 'Active',
      });
      return result;
    }

    // Root: Dashboard
    result.push({
      label: 'Dashboard',
      href: '#',
      icon: <Home className="w-3.5 h-3.5 text-slate-400" />,
      onClick: () => onNavigate('dashboard'),
    });

    // Check if there is an intermediate step in the stack or hierarchy
    const meta = TAB_META[activeTab] || { label: activeTab, shortLabel: activeTab };
    const parentTabKey = meta.parentTab;

    const previousInStack = historyStack.length > 1 ? historyStack[historyStack.length - 2] : null;

    if (previousInStack && previousInStack !== 'dashboard' && previousInStack !== activeTab) {
      const prevMeta = TAB_META[previousInStack] || { shortLabel: previousInStack };
      result.push({
        label: prevMeta.shortLabel,
        href: '#',
        onClick: () => onNavigate(previousInStack),
      });
    } else if (parentTabKey && parentTabKey !== 'dashboard' && parentTabKey !== activeTab) {
      const parentMeta = TAB_META[parentTabKey] || { shortLabel: parentTabKey };
      result.push({
        label: parentMeta.shortLabel,
        href: '#',
        onClick: () => onNavigate(parentTabKey),
      });
    }

    // Active tab
    if (currentDetailTitle) {
      result.push({
        label: meta.shortLabel,
        href: '#',
        onClick: () => {
          if (onClearDetail) onClearDetail();
        },
      });
      result.push({
        label: currentDetailTitle,
        current: true,
        badge: 'Inspecting',
      });
    } else {
      result.push({
        label: meta.label,
        current: true,
        badge: activeTab === 'careers' && user?.education?.branch ? user.education.branch : undefined,
      });
    }

    return result;
  }, [activeTab, historyStack, user, currentDetailTitle, customSegments, onNavigate, onClearDetail]);

  const canGoBack = activeTab !== 'dashboard' || Boolean(currentDetailTitle);

  // Determine active step index in the 6-step workflow
  const currentWorkflowStep = React.useMemo(() => {
    if (activeTab === 'setup' || (activeTab === 'resume' && !user?.skills?.length)) return 1;
    if (activeTab === 'resume') return 2;
    if (activeTab === 'skillgap') return 3;
    if (activeTab === 'roadmap') return 4;
    if (activeTab === 'courses' || activeTab === 'projects') return 5;
    if (activeTab === 'interview' || activeTab === 'progress') return 6;
    return null;
  }, [activeTab, user?.skills?.length]);

  // Next step calculation
  const nextWorkflowStep = React.useMemo(() => {
    if (currentWorkflowStep === 1) return { num: 2, label: 'AI Resume Scan', tab: 'resume' };
    if (currentWorkflowStep === 2) return { num: 3, label: 'Skill Gap Matrix', tab: 'skillgap' };
    if (currentWorkflowStep === 3) return { num: 4, label: 'Personalized Roadmap', tab: 'roadmap' };
    if (currentWorkflowStep === 4) return { num: 5, label: 'Courses & Projects', tab: 'courses' };
    if (currentWorkflowStep === 5) return { num: 6, label: 'Mock Interview Studio', tab: 'interview' };
    if (currentWorkflowStep === 6) return { num: 'Done', label: 'Placement Dashboard', tab: 'dashboard' };
    return null;
  }, [currentWorkflowStep]);

  return (
    <div className={`space-y-3 mb-6 animate-fade-in ${className}`}>
      {/* Top Row: Back button + Breadcrumb trail + Degree badge */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Step-by-step Go-to-Back Button */}
          {canGoBack && (
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#FEC163]/30 bg-[#120603]/90 hover:bg-[#200A04] text-xs font-semibold text-[#FEC163] hover:text-white shadow-sm hover:border-[#FEC163]/60 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FEC163]"
              title="Go to previous page"
              aria-label="Go back one step"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#FEC163] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>
          )}

          {/* Breadcrumb List */}
          <Breadcrumb>
            <BreadcrumbList className="border border-white/10 bg-[#120603]/90 w-full max-w-full justify-center rounded-2xl px-3 py-1.5 shadow-sm sm:w-fit sm:justify-start sm:rounded-full sm:px-3.5">
              {segments.map((segment, index) => (
                <BreadcrumbItem key={`${segment.label}-${index}`}>
                  {'href' in segment || 'onClick' in segment ? (
                    <BreadcrumbLink
                      href={'href' in segment ? segment.href : '#'}
                      onClick={() => {
                        if ('onClick' in segment && segment.onClick) {
                          segment.onClick();
                        } else if ('href' in segment && segment.href && segment.href !== '#') {
                          onNavigate(segment.href);
                        }
                      }}
                    >
                      {segment.icon}
                      <span>{segment.label}</span>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>
                      {segment.icon}
                      <span>{segment.label}</span>
                      {segment.badge && (
                        <span className="ml-1.5 hidden sm:inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FEC163]/15 text-[#FEC163] border border-[#FEC163]/30">
                          {segment.badge}
                        </span>
                      )}
                    </BreadcrumbPage>
                  )}
                  {index < segments.length - 1 ? <BreadcrumbSeparator /> : null}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* User branch badge */}
        {user?.education?.branch && activeTab !== 'dashboard' && (
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
            <span className="text-zinc-500">Degree & Branch:</span>
            <span className="text-[#FEC163] font-medium bg-[#140603] px-2.5 py-0.5 rounded-md border border-[#FEC163]/25">
              {user.education.degree ? `${user.education.degree} ` : ''}{user.education.branch}
            </span>
          </div>
        )}
      </div>

      {/* 6-Step Workflow Stepper Ribbon (Visible across all tabs to guide student workflow) */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#140603]/90 p-2.5 sm:p-3 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold px-1 hidden sm:block shrink-0">
            Placement Flow:
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {WORKFLOW_PIPELINE.map((item) => {
              const isActive = currentWorkflowStep === item.stepNum;
              const isPassed = currentWorkflowStep !== null && currentWorkflowStep > item.stepNum;

              return (
                <button
                  key={item.stepNum}
                  type="button"
                  onClick={() => onNavigate(item.tab)}
                  className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'border-[#FEC163] bg-[#FEC163] text-zinc-950 font-bold shadow-md shadow-amber-950/40'
                      : isPassed
                      ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:border-emerald-500/60'
                      : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                  title={`${item.stepNum}. ${item.label} - ${item.desc}`}
                >
                  <span
                    className={`size-4 rounded-full text-[9px] font-mono font-bold flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-zinc-950 text-[#FEC163]'
                        : isPassed
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="size-3" /> : item.stepNum}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Advance Button if on a workflow step */}
        {nextWorkflowStep && (
          <button
            type="button"
            onClick={() => onNavigate(nextWorkflowStep.tab)}
            className="self-end md:self-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="text-[10px] text-zinc-400 font-mono">Next:</span>
            <span className="text-[#FEC163]">{nextWorkflowStep.label}</span>
            <ArrowRight className="size-3 text-[#FEC163]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;
