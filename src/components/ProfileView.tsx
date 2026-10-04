import React, { useState } from 'react';
import { User } from '../types.ts';
import { api } from '../services/api.ts';
import {
  UserCircle,
  GraduationCap,
  Sparkles,
  Save,
  CheckCircle2,
  Plus,
  X,
  Compass,
  Building2
} from 'lucide-react';

interface ProfileViewProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onNavigate: (tab: string) => void;
}

const INDIAN_DEGREES = [
  'B.Tech',
  'B.E.',
  'BCA',
  'MCA',
  'B.Sc (Hons)',
  'B.Com (Hons)',
  'BBA',
  'MBA',
  'B.Des',
  'B.Arch',
  'M.Sc',
  'M.Tech',
  'LLB',
  'MBBS / Allied Health'
];

const INDIAN_BRANCHES = [
  'Mechanical Engineering',
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Civil Engineering',
  'Biotechnology & Life Sciences',
  'Chemical Engineering',
  'Mechatronics / Robotics',
  'Commerce & Accounting',
  'Finance & Banking',
  'Economics',
  'Design & Human Factors',
  'Data Science & AI'
];

const INDIAN_COLLEGES_POPULAR = [
  'AKTU Affiliated Engineering College',
  'University of Delhi (DU)',
  'St. Xavier\'s College, Mumbai',
  'Anna University Affiliated College',
  'Visvesvaraya Technological University (VTU)',
  'Savitribai Phule Pune University (SPPU)',
  'National Institute of Technology (NIT)',
  'Indian Institute of Technology (IIT)',
  'BITS Pilani / Goa / Hyderabad',
  'Vellore Institute of Technology (VIT)',
  'SRM Institute of Science and Technology',
  'Manipal Academy of Higher Education (MAHE)',
  'Christ University, Bengaluru',
  'State Government Engineering College'
];

const INTERESTS_INDIA = [
  'Data Science & Analytics',
  'Software Development & SDE Roles',
  'Electric Vehicles & Automotive Automation',
  'Bioinformatics & Pharma Analytics',
  'FinTech, Equity Markets & Algorithmic Trading',
  'Smart Civil Infrastructure & BIM',
  'VLSI & Semiconductor Firmware',
  'Product Management (APM)',
  'Campus Placement Aptitude & DSA',
  'GATE / Core PSU Technical Preparation'
];

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateUser, onNavigate }) => {
  const [name, setName] = useState(user.name);
  const [stateOrCity, setStateOrCity] = useState(user.stateOrCity || 'Noida, Uttar Pradesh');
  const [degree, setDegree] = useState(user.education.degree || 'B.Tech');
  const [branch, setBranch] = useState(user.education.branch || 'Mechanical Engineering');
  const [college, setCollege] = useState(user.education.college || 'AKTU Affiliated College');
  const [collegeTier, setCollegeTier] = useState<any>(user.education.collegeTier || 'Tier 3');
  const [currentYear, setCurrentYear] = useState(user.education.currentYear || 'Final Year (2026 Batch)');
  const [cgpa, setCgpa] = useState(user.education.cgpa || '8.1 / 10.0');
  const [careerGoal, setCareerGoal] = useState(user.careerGoal || 'Data Analyst');
  const [skills, setSkills] = useState<string[]>([...user.skills]);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [interests, setInterests] = useState<string[]>([...user.interests]);
  const [targetCompanies, setTargetCompanies] = useState<string[]>(
    user.targetCompanies || ['Flipkart', 'Tata Motors', 'TCS Digital']
  );
  const [newCompanyInput, setNewCompanyInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    const clean = newSkillInput.trim();
    if (!skills.includes(clean)) {
      setSkills([...skills, clean]);
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleAddCompany = () => {
    if (!newCompanyInput.trim()) return;
    const clean = newCompanyInput.trim();
    if (!targetCompanies.includes(clean)) {
      setTargetCompanies([...targetCompanies, clean]);
    }
    setNewCompanyInput('');
  };

  const handleRemoveCompany = (comp: string) => {
    setTargetCompanies(targetCompanies.filter((c) => c !== comp));
  };

  const handleToggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updates: Partial<User> = {
        name,
        country: 'India',
        stateOrCity,
        careerGoal,
        targetCompanies,
        skills,
        interests,
        education: {
          degree,
          branch,
          college,
          collegeTier,
          currentYear,
          cgpa
        }
      };

      const res = await api.updateProfile(user.id, updates);
      onUpdateUser(res.user);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-orange-400 mb-1">
          <span>Indian Student Academic Profile</span>
          <span aria-hidden="true">·</span>
          <span>Placement Tier Classification</span>
          <span aria-hidden="true">·</span>
          <span>Target Companies (LPA)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <UserCircle className="h-6 w-6 text-orange-400" />
          <span>Student Education & Placement Profile</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Provide your Indian degree, college details, and CGPA. The AI recommendation engine uses this to calculate realistic placement bridges into high-paying roles.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Academic Background */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-orange-400" />
            <span>Indian College & Degree Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">City / State in India</label>
              <input
                type="text"
                value={stateOrCity}
                onChange={(e) => setStateOrCity(e.target.value)}
                placeholder="e.g. Noida, UP / Bengaluru, KA / Pune, MH"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Degree Program</label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
              >
                {INDIAN_DEGREES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Branch / Specialization</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
              >
                {INDIAN_BRANCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">College / University Name</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. AKTU Affiliated College, Delhi University, Anna Univ..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">College Placement Tier</label>
              <select
                value={collegeTier}
                onChange={(e) => setCollegeTier(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="Tier 1">Tier 1 (IIT, NIT, BITS, IIIT, Top Univ)</option>
                <option value="Tier 2">Tier 2 (Top State Govt / Major Autonomous)</option>
                <option value="Tier 3">Tier 3 (Affiliated Engineering / Degree Colleges)</option>
                <option value="Autonomous / State Univ">Autonomous / State University</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Academic Year / Batch</label>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="Final Year (8th Sem - 2026 Batch)">Final Year (2026 Batch)</option>
                <option value="3rd Year (5th/6th Sem - 2027 Batch)">3rd Year (2027 Batch)</option>
                <option value="2nd Year (3rd/4th Sem)">2nd Year (Sophomore)</option>
                <option value="1st Year (Fresher)">1st Year (Freshman)</option>
                <option value="2025 Recent Graduate">2025 Graduate (Off-Campus Seeking)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">College CGPA / Percentage</label>
              <input
                type="text"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                placeholder="e.g. 8.1 / 10.0 or 78%"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Career Goal & Target Indian Companies */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Compass className="h-4 w-4 text-orange-400" />
            <span>Target Role & Dream Companies in India</span>
          </h3>

          <div className="text-xs space-y-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Target Role (e.g. "Data Analyst", "SDE-1", "Robotics Engineer")
              </label>
              <input
                type="text"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                placeholder="e.g. Data Analyst, Full Stack Developer, Robotics Specialist..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Target Recruiters Tag Manager */}
            <div>
              <label className="font-semibold text-slate-300 block mb-1.5">
                Target Recruiting Companies
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newCompanyInput}
                  onChange={(e) => setNewCompanyInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCompany();
                    }
                  }}
                  placeholder="Add company (e.g. Flipkart, Tata Motors, Biocon, TCS Digital)..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCompany}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {targetCompanies.map((comp) => (
                  <span
                    key={comp}
                    className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5"
                  >
                    <span>{comp}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCompany(comp)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Verified Skills Inventory */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span>Current Skills Inventory ({skills.length})</span>
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('resume')}
              className="text-xs text-orange-400 hover:underline"
            >
              Extract from ATS Resume →
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="Add skill (e.g. Python, SQL, AutoCAD, Power BI, SolidWorks, React)..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Section 4: Academic Interests */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">
            Placement Tracks & Passion Areas
          </h3>
          <p className="text-xs text-slate-400">
            Select the domains you want to target during upcoming campus and off-campus hiring drives.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {INTERESTS_INDIA.map((interest) => {
              const selected = interests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => handleToggleInterest(interest)}
                  className={`p-2.5 rounded-lg border text-left transition-colors ${
                    selected
                      ? 'bg-orange-950/60 border-orange-600 text-white font-medium'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {savedSuccess ? (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>Placement profile updated successfully!</span>
            </span>
          ) : (
            <span className="text-xs text-slate-500">Updates career recommendations immediately.</span>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
