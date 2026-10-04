import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  type BreadcrumbSegment
} from '@/components/base-ui/breadcrumb';
import { ArrowLeft, Home, Layers, Sparkles } from 'lucide-react';
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
  setup: { label: 'Student Profile Setup', shortLabel: 'Profile Setup' },
  careers: { label: 'Career Explorer & Branch Matches', shortLabel: 'Career Explorer' },
  skillgap: { label: 'Skill Gap Analysis', shortLabel: 'Skill Gap', parentTab: 'careers' },
  roadmap: { label: 'Placement Roadmap', shortLabel: 'Roadmap', parentTab: 'careers' },
  resume: { label: 'ATS Resume Analyzer', shortLabel: 'Resume Analyzer' },
  interview: { label: 'Greenroom Mock Studio', shortLabel: 'Mock Interview' },
  courses: { label: 'Targeted Courses', shortLabel: 'Courses', parentTab: 'roadmap' },
  projects: { label: 'Production Projects', shortLabel: 'Projects', parentTab: 'roadmap' },
  progress: { label: 'Academic Progress Tracker', shortLabel: 'Progress' },
  admin: { label: 'Admin Portal', shortLabel: 'Admin' },
};

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  activeTab,
  historyStack,
  user,
  currentDetailTitle,
  onClearDetail,
  onNavigate,
  onBack,
  customSegments,
  className = ''
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
        onClick: () => onNavigate('dashboard')
      });
      result.push({
        label: 'Dashboard',
        current: true,
        icon: <Home className="w-3.5 h-3.5 text-[#FEC163]" />,
        badge: user?.education?.branch ? `${user.education.branch.split(' ')[0]}` : 'Active'
      });
      return result;
    }

    // Root: Dashboard
    result.push({
      label: 'Dashboard',
      href: '#',
      icon: <Home className="w-3.5 h-3.5 text-slate-400" />,
      onClick: () => onNavigate('dashboard')
    });

    // Check if there is an intermediate step in the stack or hierarchy
    const meta = TAB_META[activeTab] || { label: activeTab, shortLabel: activeTab };
    const parentTabKey = meta.parentTab;

    // If we have history or known parent that is different from dashboard and current
    const previousInStack = historyStack.length > 1 ? historyStack[historyStack.length - 2] : null;

    if (previousInStack && previousInStack !== 'dashboard' && previousInStack !== activeTab) {
      const prevMeta = TAB_META[previousInStack] || { shortLabel: previousInStack };
      result.push({
        label: prevMeta.shortLabel,
        href: '#',
        onClick: () => onNavigate(previousInStack)
      });
    } else if (parentTabKey && parentTabKey !== 'dashboard' && parentTabKey !== activeTab) {
      const parentMeta = TAB_META[parentTabKey] || { shortLabel: parentTabKey };
      result.push({
        label: parentMeta.shortLabel,
        href: '#',
        onClick: () => onNavigate(parentTabKey)
      });
    }

    // Active tab
    if (currentDetailTitle) {
      result.push({
        label: meta.shortLabel,
        href: '#',
        onClick: () => {
          if (onClearDetail) onClearDetail();
        }
      });
      // Leaf node: detail
      result.push({
        label: currentDetailTitle,
        current: true,
        badge: 'Inspecting'
      });
    } else {
      result.push({
        label: meta.label,
        current: true,
        badge: activeTab === 'careers' && user?.education?.branch ? user.education.branch : undefined
      });
    }

    return result;
  }, [activeTab, historyStack, user, currentDetailTitle, customSegments, onNavigate, onClearDetail]);

  const canGoBack = activeTab !== 'dashboard' || !!currentDetailTitle;

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 mb-4 animate-fade-in ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        {/* Step-by-step Go-to-Back Button */}
        {canGoBack && (
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#FEC163]/30 bg-[#120603]/90 hover:bg-[#200A04] text-xs font-semibold text-[#FEC163] hover:text-white shadow-sm hover:border-[#FEC163]/60 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FEC163]"
            title="Go to previous step"
            aria-label="Go back one step"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FEC163] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </button>
        )}

        {/* Base UI Breadcrumb List styled with pill container */}
        <Breadcrumb>
          <BreadcrumbList className="border-border/70 bg-background w-full max-w-full justify-center rounded-2xl border px-3 py-1.5 shadow-sm sm:w-fit sm:justify-start sm:rounded-full sm:px-3.5">
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

      {/* Step helper note / User branch badge */}
      {user?.education?.branch && activeTab !== 'dashboard' && (
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
          <span className="text-slate-500">Degree & Field:</span>
          <span className="text-[#FEC163] font-medium bg-[#140603] px-2 py-0.5 rounded-md border border-[#FEC163]/25">
            {user.education.degree ? `${user.education.degree} ` : ''}{user.education.branch}
          </span>
        </div>
      )}
    </div>
  );
};

export default BreadcrumbNavigation;
