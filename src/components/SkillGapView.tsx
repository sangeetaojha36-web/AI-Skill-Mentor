import React, { useState, useEffect } from 'react';
import { User, Career } from '../types.ts';
import { api } from '../services/api.ts';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface SkillGapViewProps {
  user: User;
  onNavigate: (tab: string) => void;
  onGenerateRoadmap: (careerId: string) => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  user,
  onNavigate,
  onGenerateRoadmap
}) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareerId, setSelectedCareerId] = useState<string>('');
  const [gapData, setGapData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCareersAndGap();
  }, [user.id, user.skills]);

  const loadCareersAndGap = async () => {
    setLoading(true);
    try {
      const careersRes = await api.getCareers();
      setCareers(careersRes.careers);

      // Default to user's career goal or first career
      const initialCareer =
        careersRes.careers.find(
          (c) => c.title.toLowerCase() === (user.careerGoal || '').toLowerCase()
        ) || careersRes.careers[0];

      if (initialCareer) {
        setSelectedCareerId(initialCareer.id);
        const gapRes = await api.getSkillGapAnalysis(user.id, initialCareer.id);
        setGapData(gapRes.gapAnalysis);
      }
    } catch (err) {
      console.error('Error fetching skill gap data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCareerChange = async (careerId: string) => {
    setSelectedCareerId(careerId);
    setLoading(true);
    try {
      const gapRes = await api.getSkillGapAnalysis(user.id, careerId);
      setGapData(gapRes.gapAnalysis);
    } catch (err) {
      console.error('Error updating gap analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedCareer = careers.find((c) => c.id === selectedCareerId);
  const matchPct = gapData?.skillMatchPercentage || 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Target Career Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 mb-1">
            <span>Competency Matrix</span>
            <span aria-hidden="true">·</span>
            <span>Priority Weighted Matching</span>
            <span aria-hidden="true">·</span>
            <span>Actionable Prerequisite Map</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare your verified skills against global benchmark requirements for your target career.
          </p>
        </div>

        {/* Dropdown Career Picker */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 whitespace-nowrap">Target Career:</label>
          <select
            value={selectedCareerId}
            onChange={(e) => handleCareerChange(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-indigo-500 focus:outline-none"
          >
            {careers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.domain.split(' ')[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs">
          Performing weighted skill gap comparison...
        </div>
      ) : gapData ? (
        <div className="space-y-8">
          {/* Top Score Banner */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  Target Evaluation: {selectedCareer?.title}
                </div>
                <div className="text-lg font-bold text-white">
                  Readiness Level: <span className="text-emerald-400">{gapData.readinessLevel}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You possess {gapData.matchedSkills?.length || 0} of the primary prerequisite competencies. You have {gapData.missingSkills?.length || 0} skills remaining to reach complete industry job readiness.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="text-4xl font-bold text-emerald-400 font-mono tabular-nums">
                  {matchPct}%
                </div>
                <div className="text-xs text-slate-400 mt-1">Skill Match Score</div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full"
                    style={{ width: `${matchPct}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Side-by-Side: Matched Skills vs Missing Skills */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Acquired Skills (4 cols) */}
            <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Current Acquired Skills ({gapData.matchedSkills?.length})</span>
                </h3>
              </div>
              <div className="space-y-2">
                {gapData.matchedSkills?.map((skill: string) => (
                  <div
                    key={skill}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-200">{skill}</span>
                    <span className="text-emerald-400 font-mono text-[11px]">Verified</span>
                  </div>
                ))}
                {gapData.matchedSkills?.length === 0 && (
                  <div className="text-xs text-slate-500 italic p-3">
                    No matching skills recorded yet. Update your profile or upload a resume.
                  </div>
                )}
              </div>
            </div>

            {/* Missing Skills with Priority & Explanations (8 cols) */}
            <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Prioritized Missing Skills ({gapData.missingSkills?.length})</span>
                </h3>
                <span className="text-xs text-slate-500">Sorted by hiring criticality</span>
              </div>

              <div className="space-y-3">
                {gapData.missingSkills?.map((skill: any) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{skill.name}</span>
                        <span className="text-[10px] text-slate-400">· {skill.category}</span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-medium font-mono uppercase ${
                          skill.importance === 'high'
                            ? 'text-rose-300 bg-rose-950/60 border border-rose-800/60'
                            : skill.importance === 'medium'
                            ? 'text-amber-300 bg-amber-950/60 border border-amber-800/60'
                            : 'text-slate-400 bg-slate-900 border border-slate-800'
                        }`}
                      >
                        {skill.importance} Priority
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {skill.whyNeeded}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => onNavigate('courses')}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
                >
                  <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Find Courses for Missing Skills</span>
                </button>

                <button
                  onClick={() => {
                    if (selectedCareer) {
                      onGenerateRoadmap(selectedCareer.id);
                      onNavigate('roadmap');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Build Learning Roadmap for {selectedCareer?.title} →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
