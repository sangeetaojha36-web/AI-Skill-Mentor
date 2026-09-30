import React, { useState, useEffect } from 'react';
import { User, Roadmap, RoadmapStep } from '../types.ts';
import { api } from '../services/api.ts';
import {
  Layers,
  CheckCircle2,
  Circle,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Award
} from 'lucide-react';

interface RoadmapViewProps {
  user: User;
  onNavigate: (tab: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ user, onNavigate }) => {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    loadRoadmap();
  }, [user.id]);

  const loadRoadmap = async () => {
    setLoading(true);
    try {
      const data = await api.getCurrentRoadmap(user.id);
      setRoadmap(data.roadmap);
    } catch (err) {
      console.error('Error fetching roadmap:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStep = async (stepId: string) => {
    if (!roadmap) return;
    try {
      const data = await api.toggleRoadmapStep(user.id, stepId);
      setRoadmap(data.roadmap);
    } catch (err) {
      console.error('Error toggling step:', err);
    }
  };

  const handleRegenerateRoadmap = async () => {
    if (!roadmap) return;
    setRegenerating(true);
    try {
      const data = await api.generateRoadmap(user.id, roadmap.careerId);
      setRoadmap(data.roadmap);
    } catch (err) {
      console.error('Error regenerating roadmap:', err);
    } finally {
      setRegenerating(false);
    }
  };

  const completedSteps = roadmap?.steps?.filter((s) => s.completed).length || 0;
  const totalSteps = roadmap?.steps?.length || 1;
  const progress = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 mb-1">
            <span>Adaptive Curriculum</span>
            <span aria-hidden="true">·</span>
            <span>Bypasses Known Prerequisites</span>
            <span aria-hidden="true">·</span>
            <span>Milestone Driven</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Personalized Learning Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Target Career:{' '}
            <span className="text-indigo-300 font-semibold">{roadmap?.careerTitle || user.careerGoal}</span>
          </p>
        </div>

        <button
          onClick={handleRegenerateRoadmap}
          disabled={regenerating}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-sm disabled:opacity-50"
        >
          <Sparkles className={`h-3.5 w-3.5 text-indigo-400 ${regenerating ? 'animate-spin' : ''}`} />
          <span>{regenerating ? 'Adapting with AI...' : 'Regenerate with AI'}</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs">
          Loading personalized learning roadmap...
        </div>
      ) : roadmap ? (
        <div className="space-y-8">
          {/* Progress Overview Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  Overall Completion Status
                </div>
                <div className="text-xl font-bold text-white mt-1">
                  {completedSteps} of {totalSteps} Phases Completed
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click any checkbox below as you complete modules to update your career readiness metric.
                </p>
              </div>

              <div className="text-right sm:min-w-[140px]">
                <div className="text-3xl font-bold text-blue-400 font-mono tabular-nums">
                  {progress}%
                </div>
                <div className="text-xs text-slate-400">Roadmap Progress</div>
              </div>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Phase-by-Phase Roadmap Timeline */}
          <div className="space-y-4">
            {roadmap.steps.map((step, idx) => {
              const isCurrent = !step.completed && (idx === 0 || roadmap.steps[idx - 1].completed);

              return (
                <div
                  key={step.id}
                  className={`rounded-xl border p-5 transition-all ${
                    step.completed
                      ? 'border-emerald-800/40 bg-emerald-950/15'
                      : isCurrent
                      ? 'border-indigo-500/80 bg-slate-900/80 shadow-lg'
                      : 'border-slate-800 bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => handleToggleStep(step.id)}
                      className="mt-0.5 text-slate-400 hover:text-indigo-400 transition-colors focus:outline-none"
                    >
                      {step.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-indigo-400 font-mono">
                            PHASE {step.phase}
                          </span>
                          <span className="text-sm font-bold text-white">{step.title}</span>
                          {isCurrent && (
                            <span className="text-[10px] text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-700/60 font-medium">
                              In Progress
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                          <Calendar className="h-3 w-3 text-slate-500" />
                          <span>~{step.estimatedWeeks} weeks</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                        {step.description}
                      </p>

                      {/* Skills Covered in this Phase */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                        <span className="text-slate-500 text-[11px]">Core Skills:</span>
                        {step.skillsCovered.map((sk) => (
                          <span
                            key={sk}
                            className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>

                      {/* Recommended Resources for this Phase */}
                      {step.recommendedResources && step.recommendedResources.length > 0 && (
                        <div className="pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-3 text-xs">
                          <span className="text-slate-500 text-[11px] flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            Curated Learning:
                          </span>
                          {step.recommendedResources.map((res, rIdx) => (
                            <span
                              key={rIdx}
                              className="text-[11px] text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/50"
                            >
                              {res.title} ({res.type})
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Next Step CTA */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white">Need targeted practice courses?</h4>
              <p className="text-xs text-slate-400">
                Explore verified courses directly mapped to each phase of your roadmap.
              </p>
            </div>
            <button
              onClick={() => onNavigate('courses')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <span>Explore Recommended Courses →</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
