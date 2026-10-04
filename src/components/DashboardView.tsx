import React from 'react';
import { User, Career, Roadmap, ResumeAnalysis, MockInterviewSession, Course, Project } from '../types.ts';
import { Bot, Sparkles, User as UserIcon } from 'lucide-react';
import { StudentDashboardContent } from './demostack/StudentDashboardContent.tsx';

interface DashboardViewProps {
  user: User;
  topCareer: Career;
  gapAnalysis: any;
  roadmap: Roadmap;
  latestResume?: ResumeAnalysis;
  latestInterview?: MockInterviewSession;
  recommendedCourses: Course[];
  recommendedProjects: Project[];
  profileCompleteness: number;
  onNavigate: (tab: string) => void;
  onOpenChat: () => void;
  onUpdateUser?: (updated: User) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  topCareer,
  gapAnalysis,
  roadmap,
  latestResume,
  latestInterview,
  recommendedCourses,
  recommendedProjects,
  profileCompleteness,
  onNavigate,
  onOpenChat,
  onUpdateUser,
}) => {
  return (
    <div className="space-y-6 pb-16 animate-fade-in max-w-7xl mx-auto">
      {/* Top Header Bar - Single Unified Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/[0.08] px-2 sm:px-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1 flex-wrap">
            <span className="text-[#FEC163] font-semibold">{user.education?.collegeTier || 'College Tier'}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{user.education?.degree || 'Degree'} in {user.education?.branch || 'Discipline'}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-300 font-mono tabular-nums">{user.education?.currentYear || 'Current Year'}</span>
            {user.education?.cgpa && (
              <>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-emerald-400 font-mono tabular-nums">CGPA {user.education.cgpa}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Career & Placement Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Real-time skill mapping, Greenroom interview prep, and corporate ATS readiness.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('setup')}
            className="px-4 py-2 text-xs font-medium text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <UserIcon className="size-3.5 text-zinc-400" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-lg shadow-orange-950 transition-all cursor-pointer"
          >
            <Bot className="size-4" />
            <span>Ask Placement Mentor</span>
          </button>
        </div>
      </div>

      {/* Unified Reference Arrangement Dashboard with Real User Data */}
      <StudentDashboardContent
        user={user}
        topCareer={topCareer}
        gapAnalysis={gapAnalysis}
        roadmap={roadmap}
        latestResume={latestResume}
        latestInterview={latestInterview}
        recommendedCourses={recommendedCourses}
        recommendedProjects={recommendedProjects}
        profileCompleteness={profileCompleteness}
        onNavigate={onNavigate}
        onOpenChat={onOpenChat}
        onUpdateUser={onUpdateUser}
      />
    </div>
  );
};
