import React, { useState, useEffect } from 'react';
import { User, Project } from '../types.ts';
import { api } from '../services/api.ts';
import { Layers, Clock, CheckSquare, Search, ArrowRight, Sparkles } from 'lucide-react';

interface ProjectsViewProps {
  user: User;
  onNavigate: (tab: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ user, onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await api.getProjects();
      setProjects(data.projects);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = projects.filter((p) => {
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.targetCareer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.keySkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDiff && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-indigo-400 mb-1">
          <span>Portfolio Capstone Engine</span>
          <span aria-hidden="true">·</span>
          <span>Proof-of-Work Artifacts</span>
          <span aria-hidden="true">·</span>
          <span>Interdisciplinary</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Practical Portfolio Project Recommendations
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Build concrete, production-grade projects that prove your capabilities to recruiters and hiring managers beyond textbook theory.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by skill or role..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-indigo-500 focus:outline-none"
        >
          <option value="All">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs">Loading projects catalog...</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-12 text-center text-xs text-slate-400">
          No projects matched your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((proj) => {
            const isTargetCareer =
              user.careerGoal &&
              proj.targetCareer.toLowerCase().includes(user.careerGoal.toLowerCase());

            return (
              <div
                key={proj.id}
                className={`rounded-xl border p-6 flex flex-col justify-between transition-colors ${
                  isTargetCareer
                    ? 'border-indigo-500/80 bg-indigo-950/20'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
                          {proj.targetCareer}
                        </span>
                        {isTargetCareer && (
                          <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
                            Target Career Match
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white">{proj.title}</h3>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 font-mono text-slate-300">
                        {proj.difficulty}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Skills Involved */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-medium text-slate-400">Skills Demonstrated:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.keySkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-2">
                    <div className="text-[11px] font-semibold text-slate-300">Expected Deliverables:</div>
                    <ul className="space-y-1 text-xs text-slate-400">
                      {proj.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <CheckSquare className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 font-mono">
                    <Clock className="h-3.5 w-3.5 text-slate-500" />
                    <span>~{proj.estimatedHours} hours estimated</span>
                  </div>

                  <button
                    onClick={() => onNavigate('resume')}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>Add to Resume →</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
