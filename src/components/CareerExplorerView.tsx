import React, { useState, useEffect } from 'react';
import { User, Career, CareerMatchScore } from '../types.ts';
import { api } from '../services/api.ts';
import {
  Compass,
  Target,
  Sparkles,
  TrendingUp,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  Building2
} from 'lucide-react';

interface CareerExplorerViewProps {
  user: User;
  onSelectCareer: (careerId: string, careerTitle: string) => void;
  onNavigate: (tab: string) => void;
}

export const CareerExplorerView: React.FC<CareerExplorerViewProps> = ({
  user,
  onSelectCareer,
  onNavigate
}) => {
  const [recommendations, setRecommendations] = useState<CareerMatchScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  useEffect(() => {
    loadRecommendations();
  }, [user.id, user.skills, user.education.branch]);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      const data = await api.getCareerRecommendations(user.id);
      setRecommendations(data.recommendations);
    } catch (err) {
      console.error('Failed to load career recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const domains = [
    'All',
    'Data Science & Analytics',
    'Software Engineering & IT',
    'Robotics, EV & Mechatronics',
    'Biotechnology & Pharma Analytics',
    'Civil Engineering & Smart Cities',
    'Commerce, Finance & FinTech',
    'Product Strategy & Technology',
    'Electronics, Semiconductors & Hardware'
  ];

  const filtered = recommendations.filter((item) => {
    const matchesDomain =
      selectedDomain === 'All' || item.career.domain.toLowerCase().includes(selectedDomain.toLowerCase());
    const matchesSearch =
      item.career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.career.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.career.topRecruitersIndia || []).some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-orange-400 mb-1">
          <span>Indian Corporate Placements</span>
          <span aria-hidden="true">·</span>
          <span>LPA Compensation Benchmarks</span>
          <span aria-hidden="true">·</span>
          <span>Core-to-Tech Cross Bridges</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Indian Career Explorer & Recommendation Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Ranked career paths for Indian college students based on your background in{' '}
          <span className="text-orange-300 font-medium">{user.education?.degree} {user.education?.branch}</span> ({user.education?.collegeTier || 'College'}). Compare hiring packages in LPA and inspect top recruiting firms.
        </p>
      </div>

      {/* Search & Domain Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search careers, recruiters (Flipkart, Tata, Biocon)..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* Domain Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-2xl">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedDomain === dom
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {dom === 'All' ? 'All Indian Domains' : dom.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs">
          Calculating Indian placement suitability vectors...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-12 text-center text-xs text-slate-400">
          No careers matched your search criteria. Try a different search term or domain filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => {
            const isTarget =
              user.careerGoal &&
              item.career.title.toLowerCase() === user.careerGoal.toLowerCase();

            return (
              <div
                key={item.career.id}
                className={`rounded-xl border p-6 space-y-4 transition-all flex flex-col justify-between ${
                  isTarget
                    ? 'border-orange-500 bg-orange-950/20 shadow-md'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[11px] text-orange-400 font-medium">
                          {item.career.domain}
                        </span>
                        {item.isCrossDiscipline && (
                          <span className="text-[10px] text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
                            Core-to-Tech Bridge
                          </span>
                        )}
                        {isTarget && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/50 font-medium">
                            Current Goal
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white">{item.career.title}</h3>
                    </div>

                    {/* Vector Score Gauge */}
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums">
                        {item.overallScore}%
                      </div>
                      <div className="text-[10px] text-slate-500">Placement Match</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.career.description}
                  </p>

                  {/* Recommendation Rationale */}
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 leading-relaxed">
                    <span className="text-orange-400 font-semibold">Placement Rationale: </span>
                    {item.matchExplanation}
                  </div>

                  {/* Top Recruiters in India */}
                  {item.career.topRecruitersIndia && item.career.topRecruitersIndia.length > 0 && (
                    <div className="pt-1 flex items-center gap-1.5 flex-wrap text-[11px] text-slate-400">
                      <Building2 className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                      <span className="text-slate-500">Top Recruiters:</span>
                      {item.career.topRecruitersIndia.slice(0, 4).map((rec, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                        >
                          {rec}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Skills Snapshot */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-medium text-slate-400 flex justify-between">
                      <span>Key Prerequisites:</span>
                      <span className="font-mono text-emerald-400">
                        {item.matchedSkills.length} of {item.career.requiredSkills.length} acquired
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.career.requiredSkills.map((sk) => {
                        const hasSkill = item.matchedSkills.includes(sk.name);
                        return (
                          <span
                            key={sk.name}
                            className={`text-[10px] px-2 py-0.5 rounded border ${
                              hasSkill
                                ? 'text-emerald-300 bg-emerald-950/40 border-emerald-800/50'
                                : 'text-slate-400 bg-slate-950 border-slate-800'
                            }`}
                          >
                            {hasSkill ? '✓ ' : ''}
                            {sk.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer Info & Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">CTC in India: </span>
                    <span className="font-mono text-orange-300 font-semibold">
                      {item.career.averageSalaryIndia}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectCareer(item.career.id, item.career.title)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        isTarget
                          ? 'bg-slate-800 text-slate-300 cursor-default'
                          : 'bg-orange-600 hover:bg-orange-500 text-white shadow-sm'
                      }`}
                    >
                      {isTarget ? 'Active Goal' : 'Set as Goal'}
                    </button>
                    <button
                      onClick={() => {
                        onSelectCareer(item.career.id, item.career.title);
                        onNavigate('skillgap');
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
                    >
                      Gap Analysis →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
