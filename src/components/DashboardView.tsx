import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Career, Roadmap, ResumeAnalysis, MockInterviewSession, Course, Project } from '../types.ts';
import { Bot, User as UserIcon } from 'lucide-react';
import { StudentDashboardContent } from './demostack/StudentDashboardContent.tsx';

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger for cards and list items with magnetic hover & staggered reveal
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Find all dashboard cards, list items, and metric blocks
      const targets = containerRef.current?.querySelectorAll<HTMLElement>(
        '.spotlight-card, [data-card], .grid > div, .rounded-2xl, .rounded-xl, .rounded-3xl, li, .space-y-4 > div'
      );

      if (targets && targets.length > 0) {
        // Staggered 'fade-in and move-up' reveal via ScrollTrigger.batch
        ScrollTrigger.batch(Array.from(targets), {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              {
                y: 36,
                opacity: 0,
                scale: 0.98,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.75,
                stagger: 0.07,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }
            );
          },
        });

        // Magnetic hover micro-interaction
        targets.forEach((card) => {
          const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            gsap.to(card, {
              x: relX * 0.04,
              y: relY * 0.04,
              duration: 0.3,
              ease: 'power2.out',
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
          };

          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseleave', handleMouseLeave);
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Header Bar - Single Unified Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/[0.08] px-2 sm:px-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1 flex-wrap font-mono">
            <span className="text-[#CCFF00] font-semibold">{user.education?.collegeTier || 'College Tier'}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{user.education?.degree || 'Degree'} in {user.education?.branch || 'Discipline'}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-300 font-mono tabular-nums">{user.education?.currentYear || 'Current Year'}</span>
            {user.education?.cgpa && (
              <>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-[#00F0FF] font-mono tabular-nums">CGPA {user.education.cgpa}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5 font-display">
            <span>Career & Placement Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 font-mono">
            Real-time skill mapping, Greenroom interview prep, and corporate ATS readiness.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('setup')}
            className="px-4 py-2 text-xs font-medium text-zinc-300 bg-[#14171E] hover:bg-[#1B1E28] border border-white/10 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 font-mono"
          >
            <UserIcon className="size-3.5 text-zinc-400" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#08090C] bg-[#CCFF00] hover:bg-[#b8e600] rounded-xl shadow-lg shadow-[#CCFF00]/15 transition-all cursor-pointer font-mono"
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
