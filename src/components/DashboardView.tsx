import React, { useState } from 'react';
import { User, Career, Roadmap, ResumeAnalysis, MockInterviewSession, Course, Project } from '../types.ts';
import {
  Compass,
  Target,
  FileText,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Bot,
  BrainCircuit,
  Sparkles,
  Layers,
  GraduationCap,
  Award,
  Building2,
  Video,
  Mic,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Play
} from 'lucide-react';

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
  onOpenChat
}) => {
  const matchPercentage = gapAnalysis?.skillMatchPercentage || 68;
  const missingSkills = gapAnalysis?.missingSkills || [
    { name: 'Power BI', importance: 'high', reason: 'Critical for corporate business reporting in India' },
    { name: 'SQL Window Functions', importance: 'high', reason: 'Mandatory in technical placement rounds' },
    { name: 'A/B Testing & Statistics', importance: 'medium', reason: 'High demand in e-commerce analytics' }
  ];
  const acquiredSkills = gapAnalysis?.matchedSkills || user.skills || ['Python', 'Excel', 'Problem Solving'];

  // Current active roadmap step
  const activeStep = roadmap?.steps?.find((s) => !s.completed) || roadmap?.steps?.[0] || {
    phase: 1,
    title: 'Core Analytical Tooling & SQL',
    description: 'Master advanced SQL aggregations and Python data manipulation.',
    estimatedWeeks: 3
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1 flex-wrap">
            <span className="text-orange-400 font-semibold">{user.education?.collegeTier || 'College Tier'}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{user.education?.degree} in {user.education?.branch}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-300 font-mono tabular-nums">{user.education?.currentYear}</span>
            {user.education?.cgpa && (
              <>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-emerald-400 font-mono tabular-nums">CGPA {user.education.cgpa}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Student Intelligence Bento
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Real-time skill mapping, Greenroom interview prep, and corporate ATS readiness.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('setup')}
            className="px-3.5 py-2 text-xs font-medium text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors cursor-pointer"
          >
            Edit Profile
          </button>
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-lg shadow-orange-950 transition-all cursor-pointer"
          >
            <Bot className="h-4 w-4" />
            <span>Ask Placement Mentor</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
         BENTO GRID ARCHITECTURE (12-Column Responsive Layout)
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
        
        {/* -----------------------------------------------------------------------
           BENTO TILE 1: Primary Career Match Anchor (Col Span: 8)
           ----------------------------------------------------------------------- */}
        <div className="lg:col-span-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between group hover:border-white/[0.16] transition-all">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-xs font-medium text-orange-400">
                <Target className="h-4 w-4" />
                <span className="uppercase tracking-wider">Target Career Focus</span>
              </div>
              <button
                onClick={() => onNavigate('careers')}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Change Career Goal</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {user.careerGoal || topCareer?.title || 'Data Analyst & Business Insights'}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
                  {topCareer?.description || 'Transform business operations with Python, SQL analytics, and dashboards for top hiring enterprises in India.'}
                </p>
              </div>

              {/* Match Score Badge */}
              <div className="shrink-0 flex items-center sm:flex-col items-end gap-2 bg-zinc-900/80 border border-white/[0.06] p-3 rounded-2xl">
                <div className="text-[11px] text-zinc-400 font-medium">Role Readiness</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-emerald-400">
                  {matchPercentage}%
                </div>
              </div>
            </div>

            {/* Skill Match Visual Bar */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Domain Readiness Progress</span>
                <span className="font-mono tabular-nums text-zinc-200">{acquiredSkills.length} of {acquiredSkills.length + missingSkills.length} competencies locked</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800/80 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 transition-all duration-700 rounded-full"
                  style={{ width: `${matchPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Action Footer in Anchor Card */}
          <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Next Milestone: Phase {activeStep.phase} — {activeStep.title}</span>
            </div>
            <button
              onClick={() => onNavigate('roadmap')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all cursor-pointer"
            >
              <span>View Full Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
           BENTO TILE 2: Greenroom AI Mock Interview Studio (Col Span: 4)
           ----------------------------------------------------------------------- */}
        <div className="lg:col-span-4 rounded-3xl border border-white/[0.08] bg-zinc-950 p-6 flex flex-col justify-between relative overflow-hidden group hover:border-orange-500/40 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
                <Video className="h-4 w-4" />
                <span>GREENROOM STUDIO</span>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live AI Booth
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Mock Placement Interview
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Practice campus technical & HR rounds with instant speech-to-text feedback.
              </p>
            </div>

            {/* Simulated Studio VU Level Display */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-white/[0.06] space-y-2">
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>Studio Audio & Mic</span>
                <span className="text-zinc-200 font-mono">Calibrated</span>
              </div>
              <div className="flex items-center gap-1 h-3">
                {[40, 75, 55, 90, 65, 80, 45, 95, 70, 85, 50, 60].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-orange-500/70 rounded-full transition-all duration-300"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {latestInterview?.completed && (
              <div className="text-xs text-zinc-300 flex items-center justify-between p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                <span>Last Session Score:</span>
                <span className="font-mono text-emerald-400 font-bold">{latestInterview.overallScore || 78}/100</span>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('interview')}
            className="w-full mt-6 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-950/60 cursor-pointer"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Enter Greenroom Booth</span>
          </button>
        </div>

        {/* -----------------------------------------------------------------------
           BENTO TILE 3: Skill Gap Matrix (Col Span: 6)
           ----------------------------------------------------------------------- */}
        <div className="lg:col-span-6 rounded-3xl border border-white/[0.08] bg-zinc-950 p-6 flex flex-col justify-between group hover:border-white/[0.16] transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
                <BrainCircuit className="h-4 w-4" />
                <span>SKILL GAP MATRIX</span>
              </div>
              <span className="text-xs text-zinc-400 font-mono tabular-nums">
                {missingSkills.length} Critical Gaps
              </span>
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight">
              High-Priority Missing Skills
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Recruiters in India screen for these exact competencies during online assessments:
            </p>

            <div className="mt-4 space-y-2.5">
              {missingSkills.slice(0, 3).map((skill: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-zinc-900/80 border border-white/[0.05] flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span>{skill.name}</span>
                      <span className="text-[10px] text-rose-400 font-medium">· Required</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{skill.reason}</p>
                  </div>
                  <button
                    onClick={() => onNavigate('courses')}
                    className="shrink-0 text-[11px] text-orange-400 hover:text-orange-300 font-medium cursor-pointer"
                  >
                    Learn →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
            <span className="text-zinc-500">ML extraction from Indian syllabus</span>
            <button
              onClick={() => onNavigate('skillgap')}
              className="text-white hover:text-orange-400 transition-colors font-medium cursor-pointer flex items-center gap-1"
            >
              <span>Explore Gap Analysis</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
           BENTO TILE 4: ATS Resume Health Scorecard (Col Span: 6)
           ----------------------------------------------------------------------- */}
        <div className="lg:col-span-6 rounded-3xl border border-white/[0.08] bg-zinc-950 p-6 flex flex-col justify-between group hover:border-white/[0.16] transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <FileText className="h-4 w-4" />
                <span>ATS RESUME SCANNER</span>
              </div>
              <span className="text-xs text-zinc-400 font-mono">TCS / Infosys / Startup Filter</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  ATS Compatibility Score
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Evaluated against job descriptions for Indian campus & off-campus hiring.
                </p>
              </div>

              <div className="shrink-0 text-center bg-zinc-900 border border-white/[0.06] p-3 rounded-2xl min-w-[76px]">
                <div className="text-2xl font-bold font-mono tabular-nums text-emerald-400">
                  {latestResume?.score || 82}
                </div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">/ 100</div>
              </div>
            </div>

            {/* Score Component Bars */}
            <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.04]">
                <div className="text-zinc-400 text-[11px]">Keywords</div>
                <div className="text-white font-bold font-mono text-sm mt-0.5">88%</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.04]">
                <div className="text-zinc-400 text-[11px]">Formatting</div>
                <div className="text-white font-bold font-mono text-sm mt-0.5">92%</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.04]">
                <div className="text-zinc-400 text-[11px]">Projects</div>
                <div className="text-white font-bold font-mono text-sm mt-0.5">76%</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
            <span className="text-zinc-500">Live NLP text parser ready</span>
            <button
              onClick={() => onNavigate('resume')}
              className="text-white hover:text-orange-400 transition-colors font-medium cursor-pointer flex items-center gap-1"
            >
              <span>Scan New Resume</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
           BENTO TILE 5: India Compensation & Placement CTC (Col Span: 4)
           ----------------------------------------------------------------------- */}
        <div className="lg:col-span-4 rounded-3xl border border-white/[0.08] bg-zinc-950 p-6 flex flex-col justify-between group hover:border-white/[0.16] transition-all">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
              <Building2 className="h-4 w-4" />
              <span>MARKET COMPENSATION (INDIA)</span>
            </div>

            <div>
              <div className="text-2xl font-bold font-mono text-white tracking-tight">
                {topCareer?.averageSalaryIndia || '₹7.5 - 16 LPA'}
              </div>
              <div className="text-xs text-zinc-400 mt-1">Average Starting to Mid Package in LPA</div>
            </div>

            <div className="pt-2 border-t border-white/[0.06]">
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-2 font-medium">
                Top Hiring Recruiters:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(topCareer?.topRecruitersIndia || ['Flipkart', 'Tata Motors', 'Swiggy', 'TCS Digital', 'Mu Sigma']).map((comp) => (
                  <span
                    key={comp}
                    className="px-2.5 py-1 rounded-xl bg-zinc-900 border border-white/[0.06] text-xs text-zinc-200"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 text-[11px] text-zinc-500">
            Growth Outlook: <span className="text-emerald-400 font-medium">{topCareer?.growthOutlook || '+22% (High Demand)'}</span>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
           BENTO TILE 6: Recommended Capstone Projects (Col Span: 4)
           ----------------------------------------------------------------------- */}
        <div className="lg:col-span-4 rounded-3xl border border-white/[0.08] bg-zinc-950 p-6 flex flex-col justify-between group hover:border-white/[0.16] transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <BookOpen className="h-4 w-4" />
                <span>CAPSTONE PROJECTS</span>
              </div>
              <span className="text-xs text-zinc-400 font-mono">Portfolio</span>
            </div>

            {recommendedProjects?.[0] ? (
              <div>
                <h4 className="font-semibold text-white text-sm line-clamp-1">
                  {recommendedProjects[0].title}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {recommendedProjects[0].description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {recommendedProjects[0].keySkills?.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-zinc-400">
                Build domain-specific capstones to showcase directly to recruiters.
              </p>
            )}
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="w-full mt-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Explore Capstone Ideas</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* -----------------------------------------------------------------------
           BENTO TILE 7: AI Career Mentor Agent Spotlight (Col Span: 4)
           ----------------------------------------------------------------------- */}
        <div className="lg:col-span-4 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-orange-950/40 via-zinc-950 to-zinc-950 p-6 flex flex-col justify-between group hover:border-orange-500/30 transition-all">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
              <Sparkles className="h-4 w-4" />
              <span>AI PLACEMENT MENTOR</span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">Ask Career Guidance Questions</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Trained on Indian placement guidelines, branch switching, and CTC negotiation.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-zinc-300">
              <div
                onClick={onOpenChat}
                className="p-2 rounded-xl bg-zinc-900/80 border border-white/[0.05] hover:bg-zinc-800 transition-colors cursor-pointer text-[11px]"
              >
                💬 "How can a {user.education?.branch || 'Mechanical'} student crack a Data Analyst role?"
              </div>
              <div
                onClick={onOpenChat}
                className="p-2 rounded-xl bg-zinc-900/80 border border-white/[0.05] hover:bg-zinc-800 transition-colors cursor-pointer text-[11px]"
              >
                💬 "What questions do TCS & Flipkart ask in technical rounds?"
              </div>
            </div>
          </div>

          <button
            onClick={onOpenChat}
            className="w-full mt-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Start Chat Session</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
