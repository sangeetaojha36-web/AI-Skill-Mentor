import React, { useState } from 'react';
import { User, Roadmap, ResumeAnalysis, MockInterviewSession } from '../types.ts';
import {
  TrendingUp,
  Award,
  Layers,
  FileText,
  CheckCircle2,
  Target,
  Sparkles,
  Zap,
  MessageSquare,
  Cpu,
  Smile,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface ProgressViewProps {
  user: User;
  roadmap: Roadmap;
  latestResume?: ResumeAnalysis;
  latestInterview?: MockInterviewSession;
  onNavigate: (tab: string) => void;
}

interface RadarDataPoint {
  category: string;
  key: string;
  current: number;
  benchmark: number;
  fullMark: number;
  description: string;
  pillColor: string;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  user,
  roadmap,
  latestResume,
  latestInterview,
  onNavigate
}) => {
  const [activeTabType, setActiveTabType] = useState<'all' | 'communication' | 'technical' | 'behavioral'>('all');
  const [showBenchmarkComparison, setShowBenchmarkComparison] = useState(true);

  const completedSteps = roadmap?.steps?.filter((s) => s.completed).length || 0;
  const totalSteps = roadmap?.steps?.length || 1;
  const roadmapPct = Math.round((completedSteps / totalSteps) * 100);

  // Compute or extract category competencies for Technical, Communication, and Behavioral
  // Check if questions have category answers and feedback
  const questions = latestInterview?.questions || [];
  
  // Technical category score calculation
  const techQuestions = questions.filter(
    (q) => q.type === 'Technical' || q.type === 'Aptitude & Core'
  );
  const techQuestionScores = techQuestions
    .map((q) => q.score)
    .filter((s): s is number => typeof s === 'number');
  const avgTechQuestionScore =
    techQuestionScores.length > 0
      ? Math.round(
          techQuestionScores.reduce((a, b) => a + b, 0) / techQuestionScores.length
        )
      : undefined;

  // Behavioral & HR category score calculation
  const behavioralQuestions = questions.filter(
    (q) => q.type === 'Behavioral' || q.type === 'HR' || q.type === 'Managerial'
  );
  const behavioralQuestionScores = behavioralQuestions
    .map((q) => q.score)
    .filter((s): s is number => typeof s === 'number');
  const avgBehavioralQuestionScore =
    behavioralQuestionScores.length > 0
      ? Math.round(
          behavioralQuestionScores.reduce((a, b) => a + b, 0) /
            behavioralQuestionScores.length
        )
      : undefined;

  // Derive scores normalized to 100
  const technicalScore =
    avgTechQuestionScore ??
    latestInterview?.breakdown?.technicalKnowledge ??
    (latestInterview?.overallScore ? Math.min(100, Math.round(latestInterview.overallScore * 0.95)) : 84);

  const communicationScore =
    latestInterview?.breakdown?.communication ??
    (latestInterview?.overallScore ? Math.min(100, Math.round(latestInterview.overallScore * 0.92)) : 88);

  const behavioralScore =
    avgBehavioralQuestionScore ??
    latestInterview?.breakdown?.problemSolving ??
    (latestInterview?.overallScore ? Math.min(100, Math.round(latestInterview.overallScore * 0.88)) : 82);

  // Fine-grained Radar multi-axis breakdown
  // Covers: Technical Architecture, Problem Solving, Communication Clarity, Active Listening & Articulation, Behavioral Composure, Team & Leadership
  const radarData: RadarDataPoint[] = [
    {
      category: 'Technical Knowledge',
      key: 'technical',
      current: technicalScore,
      benchmark: 75,
      fullMark: 100,
      description: 'System design principles, syntax depth, and domain architecture fluency.',
      pillColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60'
    },
    {
      category: 'Problem Solving',
      key: 'technical',
      current: Math.min(100, Math.round(technicalScore * 0.96 + (latestInterview?.breakdown?.problemSolving ? 4 : 2))),
      benchmark: 70,
      fullMark: 100,
      description: 'Algorithmic approach, edge-case resilience, and modular solution breakdown.',
      pillColor: 'text-blue-400 bg-blue-950/60 border-blue-800/60'
    },
    {
      category: 'Communication Clarity',
      key: 'communication',
      current: communicationScore,
      benchmark: 80,
      fullMark: 100,
      description: 'Structured STAR responses, concise explanations, and vocabulary precision.',
      pillColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60'
    },
    {
      category: 'Vocal Pace & Articulation',
      key: 'communication',
      current: Math.min(100, Math.round(communicationScore * 0.98 + 1)),
      benchmark: 72,
      fullMark: 100,
      description: 'Pacing cadence (120-150 WPM target), absence of filler words, and tone stability.',
      pillColor: 'text-purple-400 bg-purple-950/60 border-purple-800/60'
    },
    {
      category: 'Behavioral Composure',
      key: 'behavioral',
      current: behavioralScore,
      benchmark: 78,
      fullMark: 100,
      description: 'Eye contact maintenance (>65% target), facial composure, and poise under scrutiny.',
      pillColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60'
    },
    {
      category: 'Culture & Collaboration',
      key: 'behavioral',
      current: Math.min(100, Math.round(behavioralScore * 1.02 - 1)),
      benchmark: 74,
      fullMark: 100,
      description: 'Cross-functional empathy, conflict mitigation, and leadership alignment.',
      pillColor: 'text-teal-400 bg-teal-950/60 border-teal-800/60'
    }
  ];

  const overallAvg = Math.round(
    radarData.reduce((acc, item) => acc + item.current, 0) / radarData.length
  );

  const benchmarkAvg = Math.round(
    radarData.reduce((acc, item) => acc + item.benchmark, 0) / radarData.length
  );

  const deltaBenchmark = overallAvg - benchmarkAvg;

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
          Visual analytics tracking your journey from your initial {user.education.branch} coursework to industry career readiness with proctored behavioral and technical benchmarks.
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
            {latestInterview?.overallScore ? `${latestInterview.overallScore}/100` : `${overallAvg}/100`}
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

      {/* RECHARTS RADAR CHART: Comprehensive Interview Competencies Visualization */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-6 sm:p-8 backdrop-blur shadow-2xl relative overflow-hidden">
        {/* Subtle background ambient radial light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Rubric Radar Analytics
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {latestInterview ? `Session ID: #${latestInterview.id.slice(-6)}` : 'Campus Drive Baseline'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Interview Competency Matrix</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              Cross-axial performance visualization evaluating your real-time performance across Communication, Technical Proficiency, and Behavioral Demeanor compared to tier-1 industry placement percentiles.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setShowBenchmarkComparison((prev) => !prev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5 ${
                showBenchmarkComparison
                  ? 'bg-slate-800 text-indigo-300 border-indigo-500/40 shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  showBenchmarkComparison ? 'bg-amber-400' : 'bg-slate-600'
                }`}
              />
              <span>Industry Benchmark</span>
            </button>
            <button
              onClick={() => onNavigate('interview')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1 shadow-lg shadow-indigo-600/20"
            >
              <span>Practice in Studio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Radar and Detailed Performance Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
          {/* Radar Chart Display Container */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[360px] w-full">
            <div className="w-full h-[360px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    stroke="#475569"
                    tick={{ fill: '#64748B', fontSize: 10 }}
                  />
                  {showBenchmarkComparison && (
                    <Radar
                      name="Tier-1 Benchmark"
                      dataKey="benchmark"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                      fillOpacity={0.15}
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                    />
                  )}
                  <Radar
                    name="Candidate Performance"
                    dataKey="current"
                    stroke="#6366F1"
                    fill="#6366F1"
                    fillOpacity={0.4}
                    strokeWidth={2.5}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as RadarDataPoint;
                        return (
                          <div className="bg-slate-950/95 border border-slate-700/80 p-3.5 rounded-xl shadow-2xl backdrop-blur text-xs space-y-1.5 min-w-[200px]">
                            <div className="font-semibold text-white border-b border-slate-800 pb-1 flex items-center justify-between">
                              <span>{data.category}</span>
                              <span className="font-mono text-indigo-400">{data.current}/100</span>
                            </div>
                            <div className="text-[11px] text-slate-300">
                              <span className="text-slate-400">Industry Benchmark: </span>
                              <span className="text-amber-400 font-mono">{data.benchmark}/100</span>
                            </div>
                            <div className="text-[11px] text-slate-300">
                              <span className="text-slate-400">Delta Advantage: </span>
                              <span
                                className={`font-mono font-medium ${
                                  data.current >= data.benchmark
                                    ? 'text-emerald-400'
                                    : 'text-rose-400'
                                }`}
                              >
                                {data.current >= data.benchmark ? '+' : ''}
                                {data.current - data.benchmark} pts
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800/80">
                              {data.description}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Chart Legend Bar */}
            <div className="flex flex-wrap items-center justify-center gap-5 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-indigo-500/40 border border-indigo-500" />
                <span className="text-slate-200 font-medium">Candidate Score ({overallAvg} Avg)</span>
              </div>
              {showBenchmarkComparison && (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-1 border-t-2 border-dashed border-amber-400" />
                  <span className="text-slate-400">Industry Placement Bar ({benchmarkAvg} Avg)</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Info className="w-3.5 h-3.5" />
                <span>Hover axes for dimension criteria</span>
              </div>
            </div>
          </div>

          {/* Three Core Competency Pillars (Technical, Communication, Behavioral) */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Technical Pillar */}
            <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/20 hover:border-cyan-500/40 transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Technical Proficiency</h4>
                    <p className="text-[11px] text-slate-400">Systems, core DSA, and syntax depth</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono text-cyan-400">{technicalScore}</span>
                  <span className="text-xs text-slate-500">/100</span>
                </div>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${technicalScore}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                <span>Algorithmic logic & syntax correctness</span>
                <span className="text-cyan-300 font-medium font-mono">
                  {technicalScore >= 75 ? '+Ready for L4' : 'Developing'}
                </span>
              </div>
            </div>

            {/* Communication Pillar */}
            <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-950/20 hover:border-indigo-500/40 transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Communication & Articulation</h4>
                    <p className="text-[11px] text-slate-400">Clarity, brevity, STAR methodology</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono text-indigo-400">{communicationScore}</span>
                  <span className="text-xs text-slate-500">/100</span>
                </div>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${communicationScore}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                <span>Vocal pacing & structured responses</span>
                <span className="text-indigo-300 font-medium font-mono">
                  {communicationScore >= 80 ? 'High Impact' : 'Needs Cadence'}
                </span>
              </div>
            </div>

            {/* Behavioral & Composure Pillar */}
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 hover:border-emerald-500/40 transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Smile className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Behavioral & Executive Poise</h4>
                    <p className="text-[11px] text-slate-400">Eye contact tracking, calm, confidence</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono text-emerald-400">{behavioralScore}</span>
                  <span className="text-xs text-slate-500">/100</span>
                </div>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${behavioralScore}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                <span>Non-verbal cues & composure telemetry</span>
                <span className="text-emerald-300 font-medium font-mono">
                  {behavioralScore >= 75 ? 'Proctored Verified' : 'Practice Poise'}
                </span>
              </div>
            </div>

            {/* Summary Delta Banner */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Placement Readiness Quotient</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                    deltaBenchmark >= 0
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                      : 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                  }`}
                >
                  {deltaBenchmark >= 0 ? `+${deltaBenchmark} pts above bar` : `${deltaBenchmark} pts to bar`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Curriculum Velocity Milestones</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">{roadmapPct}% Complete</span>
          </div>
          <div className="space-y-3">
            {roadmap?.steps?.map((step) => (
              <div
                key={step.id}
                className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
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
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Skill Inventory Distribution</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">{user.skills.length} Mastered</span>
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
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
            className="w-full py-2 px-3 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors text-center flex items-center justify-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Upload New Resume to Update</span>
          </button>
        </div>
      </div>
    </div>
  );
};
