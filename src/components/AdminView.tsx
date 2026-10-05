import React, { useState, useEffect } from 'react';
import { api } from '../services/api.ts';
import { Career, User } from '../types.ts';
import {
  Shield,
  ShieldCheck,
  Users,
  BookOpen,
  Layers,
  Plus,
  Trash2,
  CheckCircle2,
  TrendingUp,
  Building2,
  Lock,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  AlertTriangle,
  LogOut,
} from 'lucide-react';

interface AdminViewProps {
  user: User;
  onUpdateUser?: (updated: User) => void;
  onNavigate: (tab: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ user, onUpdateUser, onNavigate }) => {
  const [stats, setStats] = useState<any>(null);
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddCareerModal, setShowAddCareerModal] = useState(false);
  const [newCareerTitle, setNewCareerTitle] = useState('');
  const [newCareerDomain, setNewCareerDomain] = useState('Data Science & Analytics');
  const [newCareerSalary, setNewCareerSalary] = useState('₹7.0 LPA - ₹16.0 LPA');
  const [newCareerDesc, setNewCareerDesc] = useState('');
  const [newCareerRecruiters, setNewCareerRecruiters] = useState('Flipkart, Tata Motors, TCS Digital');

  // Admin Verification Gate State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (user.role === 'admin') {
      loadAdminData();
    }
  }, [user.role]);

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

  const handleVerifyAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const cleanPass = adminPasscode.trim().toLowerCase();
      const cleanMail = adminEmail.trim().toLowerCase();

      // Accepts authorized administrator passcodes or admin email formats
      if (
        cleanPass === 'admin2026' ||
        cleanPass === 'admin' ||
        cleanPass === 'admin123' ||
        cleanPass === 'tpo@2026' ||
        cleanPass === 'director2026' ||
        cleanMail.includes('admin') ||
        cleanMail.includes('tpo')
      ) {
        const elevatedUser: User = {
          ...user,
          role: 'admin',
          email: adminEmail.trim() || user.email,
        };
        onUpdateUser?.(elevatedUser);
      } else {
        setAuthError('Access Denied: Invalid Administrative Passcode or Institutional Credentials.');
      }
    }, 400);
  };

  const handleExitAdmin = () => {
    const studentUser: User = {
      ...user,
      role: 'student',
    };
    onUpdateUser?.(studentUser);
    onNavigate('dashboard');
  };

  // If user does not have admin role, render the Admin Authority Verification Gate
  if (user.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6">
        <div className="rounded-3xl border border-[#FEC163]/30 bg-gradient-to-b from-[#180703]/95 via-[#0F0402]/98 to-[#070201] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(222,67,19,0.2)] text-left relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 size-60 bg-[#DE4313]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Emblem */}
          <div className="flex items-center gap-3.5 pb-6 border-b border-white/[0.08] mb-6">
            <div className="size-12 rounded-2xl bg-gradient-to-br from-[#FEC163] to-[#DE4313] p-0.5 shadow-lg shadow-amber-950/50">
              <div className="size-full bg-[#120502] rounded-[14px] flex items-center justify-center text-[#FEC163]">
                <Shield className="size-6 text-[#FEC163]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#FEC163] uppercase tracking-wider">
                  Restricted Authority Zone
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  Admin Only
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                T&P Directorate Admin Verification
              </h2>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <p className="text-sm font-semibold text-zinc-200">
              College Placement Directorate & Institutional Governance
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              You are currently authenticated as a student ({user.name}). This console is restricted
              to college Training & Placement Officers (TPO), Deans, and Recruitment Administrators to
              track batch placement velocity and manage corporate cutoffs.
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="size-4 shrink-0 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleVerifyAdmin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Institutional Admin / TPO Email
              </label>
              <input
                type="email"
                placeholder="e.g. tpo.officer@college.ac.in"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-[#120603] border border-[#FEC163]/30 rounded-xl h-11 px-3.5 text-xs text-white placeholder:text-slate-500 focus:border-[#FEC163] focus:ring-1 focus:ring-[#FEC163]/60 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Directorate Security Passcode / Master Key
              </label>
              <input
                type="password"
                placeholder="Enter T&P Authority Passcode"
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                required
                className="w-full bg-[#120603] border border-[#FEC163]/30 rounded-xl h-11 px-3.5 text-xs text-white placeholder:text-slate-500 focus:border-[#FEC163] focus:ring-1 focus:ring-[#FEC163]/60 focus:outline-none transition-all"
              />
              <p className="text-[10px] text-zinc-500 font-mono mt-1">
                Authorized T&P Passcode: <span className="text-[#FEC163]">admin2026</span>
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="size-3.5" />
                <span>Return to Student Dashboard</span>
              </button>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FEC163] via-[#FA8C28] to-[#DE4313] hover:brightness-110 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-950/40 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <KeyRound className="size-3.5" />
                <span>{isVerifying ? 'Verifying Authorities...' : 'Verify Admin Authorities'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

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
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold text-emerald-300">Verified Institutional Admin Authorities Active</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">Authenticated: {user.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Placement Cell Analytics & Career Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track student placement readiness, campus hiring velocity, and corporate recruitment benchmarks across India.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowAddCareerModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-950 bg-[#FEC163] hover:bg-[#ffcd7d] rounded-xl shadow-md transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Placement Benchmark</span>
          </button>

          <button
            type="button"
            onClick={handleExitAdmin}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
            title="Switch back to student role"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Exit Admin Mode</span>
          </button>
        </div>
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
