import React, { useState, useEffect } from 'react';
import { api } from '../services/api.ts';
import { Career } from '../types.ts';
import { Shield, Users, BookOpen, Layers, Plus, Trash2, CheckCircle2, TrendingUp, Building2 } from 'lucide-react';

interface AdminViewProps {
  onNavigate: (tab: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<any>(null);
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddCareerModal, setShowAddCareerModal] = useState(false);
  const [newCareerTitle, setNewCareerTitle] = useState('');
  const [newCareerDomain, setNewCareerDomain] = useState('Data Science & Analytics');
  const [newCareerSalary, setNewCareerSalary] = useState('₹7.0 LPA - ₹16.0 LPA');
  const [newCareerDesc, setNewCareerDesc] = useState('');
  const [newCareerRecruiters, setNewCareerRecruiters] = useState('Flipkart, Tata Motors, TCS Digital');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, careersRes] = await Promise.all([api.getAdminStats(), api.getCareers()]);
      setStats(statsRes);
      setCareers(careersRes.careers);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCareerTitle.trim()) return;

    try {
      const res = await api.addAdminCareer({
        title: newCareerTitle,
        domain: newCareerDomain,
        description: newCareerDesc || `Professional role in ${newCareerDomain}.`,
        averageSalaryIndia: newCareerSalary,
        topRecruitersIndia: newCareerRecruiters.split(',').map((r) => r.trim()),
        growthOutlook: '+24% (High demand in Indian tech centers)',
        requiredSkills: [
          { name: 'Analytical Modeling', importance: 'high', category: 'Technical' },
          { name: 'Communication', importance: 'medium', category: 'Soft Skills' }
        ],
        recommendedDisciplines: ['B.Tech Any Branch', 'B.Sc', 'B.Com'],
        keyResponsibilities: ['Drive operational excellence and execute strategic analytics workflows.'],
        sampleJobTitles: [newCareerTitle, `Associate ${newCareerTitle}`]
      });

      setCareers([...careers, res.career]);
      setShowAddCareerModal(false);
      setNewCareerTitle('');
      setNewCareerDesc('');
    } catch (err) {
      console.error('Error adding career:', err);
    }
  };

  const handleDeleteCareer = async (id: string) => {
    try {
      await api.deleteAdminCareer(id);
      setCareers(careers.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Error deleting career:', err);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
            <Shield className="h-3.5 w-3.5" />
            <span>Training & Placement (T&P) Cell Directorate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Placement Cell Analytics & Career Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track student placement readiness, campus hiring velocity, and corporate recruitment benchmarks across India.
          </p>
        </div>

        <button
          onClick={() => setShowAddCareerModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          <span>Add Placement Benchmark</span>
        </button>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="text-xs text-slate-400">Total Registered Students</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">4,820</div>
          <div className="text-[10px] text-slate-500 mt-1">Across 40+ Indian colleges</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="text-xs text-slate-400">Students Placed (2026 Batch)</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">1,240</div>
          <div className="text-[10px] text-slate-500 mt-1">Day 1 & Day 2 drives</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="text-xs text-slate-400">Average LPA Growth</div>
          <div className="text-2xl font-bold text-orange-400 font-mono mt-1">+68%</div>
          <div className="text-[10px] text-slate-500 mt-1">Compared to service mass hiring</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="text-xs text-slate-400">Placement Mocks Evaluated</div>
          <div className="text-2xl font-bold text-purple-400 font-mono mt-1">3,120</div>
          <div className="text-[10px] text-slate-500 mt-1">AI Rubric assessments</div>
        </div>
      </div>

      {/* Careers Catalog Management */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Indian Corporate Recruitment Benchmark Roles</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3">Career Profile</th>
                <th className="p-3">Domain</th>
                <th className="p-3">Indian CTC in LPA</th>
                <th className="p-3">Top Indian Recruiters</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {careers.map((career) => (
                <tr key={career.id} className="hover:bg-slate-900/60">
                  <td className="p-3 font-semibold text-white">{career.title}</td>
                  <td className="p-3 text-slate-400">{career.domain}</td>
                  <td className="p-3 font-mono text-orange-300 font-semibold">{career.averageSalaryIndia}</td>
                  <td className="p-3 text-slate-300">
                    {(career.topRecruitersIndia || []).slice(0, 3).join(', ')}...
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteCareer(career.id)}
                      className="p-1 rounded text-rose-400 hover:bg-rose-950/40 transition-colors"
                      title="Delete benchmark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Career Benchmark Modal */}
      {showAddCareerModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg w-full space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white">Add New Placement Role Benchmark</h4>
              <button
                onClick={() => setShowAddCareerModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCareer} className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Career Title</label>
                <input
                  type="text"
                  value={newCareerTitle}
                  onChange={(e) => setNewCareerTitle(e.target.value)}
                  placeholder="e.g. EV Powertrain Specialist"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Domain</label>
                <select
                  value={newCareerDomain}
                  onChange={(e) => setNewCareerDomain(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Data Science & Analytics">Data Science & Analytics</option>
                  <option value="Robotics, EV & Mechatronics">Robotics, EV & Mechatronics</option>
                  <option value="Biotechnology & Pharma Analytics">Biotechnology & Pharma Analytics</option>
                  <option value="Civil Engineering & Smart Cities">Civil Engineering & Smart Cities</option>
                  <option value="Commerce, Finance & FinTech">Commerce, Finance & FinTech</option>
                  <option value="Software Engineering & IT">Software Engineering & IT</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Target CTC in India (LPA)</label>
                <input
                  type="text"
                  value={newCareerSalary}
                  onChange={(e) => setNewCareerSalary(e.target.value)}
                  placeholder="e.g. ₹8.0 LPA - ₹18.0 LPA"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Top Recruiters (Comma Separated)</label>
                <input
                  type="text"
                  value={newCareerRecruiters}
                  onChange={(e) => setNewCareerRecruiters(e.target.value)}
                  placeholder="e.g. Tata Motors, Ola Electric, Ather Energy"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Description</label>
                <textarea
                  value={newCareerDesc}
                  onChange={(e) => setNewCareerDesc(e.target.value)}
                  rows={3}
                  placeholder="Job profile duties and required technical skills..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddCareerModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold"
                >
                  Save Benchmark
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
