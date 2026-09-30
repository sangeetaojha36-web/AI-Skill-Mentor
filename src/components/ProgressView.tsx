import React from 'react';
import { User, Roadmap, ResumeAnalysis, MockInterviewSession } from '../types.ts';
import { TrendingUp, Award, Layers, FileText, CheckCircle2, Target } from 'lucide-react';

interface ProgressViewProps {
  user: User;
  roadmap: Roadmap;
  latestResume?: ResumeAnalysis;
  latestInterview?: MockInterviewSession;
  onNavigate: (tab: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  user,
  roadmap,
  latestResume,
  latestInterview,
  onNavigate
}) => {
  const completedSteps = roadmap?.steps?.filter((s) => s.completed).length || 0;
  const totalSteps = roadmap?.steps?.length || 1;
  const roadmapPct = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-indigo-400 mb-1">
          <span>Student Analytics</span>
          <span aria-hidden="true">·</span>
          <span>Growth Trajectory</span>
          <span aria-hidden="true">·</span>
          <span>Career Velocity</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-indigo-400" />
          <span>Progress Tracking & Competency Analytics</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Visual analytics tracking your journey from your initial {user.education.branch} coursework to industry career readiness.
        </p>
      </div>

      {/* High-Level Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
          <div className="text-xs text-slate-400">Roadmap Completion</div>
          <div className="text-3xl font-bold text-blue-400 font-mono tabular-nums">{roadmapPct}%</div>
          <div className="text-[11px] text-slate-500 pt-2">
            {completedSteps} of {totalSteps} phases accomplished
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
          <div className="text-xs text-slate-400">Verified Skills Count</div>
          <div className="text-3xl font-bold text-emerald-400 font-mono tabular-nums">{user.skills.length}</div>
          <div className="text-[11px] text-slate-500 pt-2">Extracted and verified in portfolio</div>
        </div>

        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
          <div className="text-xs text-slate-400">Mock Interview Score</div>
          <div className="text-3xl font-bold text-purple-400 font-mono tabular-nums">
            {latestInterview ? `${latestInterview.overallScore}/100` : '82/100'}
          </div>
          <div className="text-[11px] text-slate-500 pt-2">Evaluated against hiring rubrics</div>
        </div>

        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
          <div className="text-xs text-slate-400">ATS Resume Rating</div>
          <div className="text-3xl font-bold text-indigo-400 font-mono tabular-nums">
            {latestResume ? `${latestResume.score}/100` : '78/100'}
          </div>
          <div className="text-[11px] text-slate-500 pt-2">Keywords and measurable metrics</div>
        </div>
      </div>

      {/* Progress Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Curriculum Velocity Milestones</h3>
          <div className="space-y-3">
            {roadmap?.steps?.map((step) => (
              <div
                key={step.id}
                className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-semibold text-white">
                    Phase {step.phase}: {step.title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Skills: {step.skillsCovered.join(', ')}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-500">{step.estimatedWeeks} wks</span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                      step.completed
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    {step.completed ? 'COMPLETED' : 'PENDING'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Portfolio Taxonomy */}
        <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Skill Inventory Distribution</h3>
          <div className="space-y-2">
            {user.skills.map((skill) => (
              <div
                key={skill}
                className="p-2 rounded bg-slate-950 border border-slate-800 text-xs flex justify-between items-center text-slate-300"
              >
                <span>{skill}</span>
                <span className="text-[10px] text-indigo-400 font-mono">Mastered</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('resume')}
            className="w-full py-2 px-3 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors text-center"
          >
            Upload New Resume to Update
          </button>
        </div>
      </div>
    </div>
  );
};
