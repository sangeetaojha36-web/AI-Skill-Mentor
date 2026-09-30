import React, { useState } from 'react';
import { User, StudentExperience, StudentAchievement, StudentProject, StudentCourse } from '../types.ts';
import { api } from '../services/api.ts';
import {
  User as UserIcon,
  GraduationCap,
  Briefcase,
  Trophy,
  Code,
  BookOpen,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  School,
  Building2,
  Calendar,
  Layers,
  Check,
  ChevronRight
} from 'lucide-react';

interface ProfileSetupViewProps {
  user: User;
  onProfileSaved: (updatedUser: User) => void;
  onContinueToDashboard?: () => void;
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
  'M.Tech',
  'M.Sc',
  'B.Des',
  'B.Arch',
  'LLB'
];

const POPULAR_SKILL_SUGGESTIONS = [
  'Python',
  'SQL',
  'Java',
  'C++',
  'JavaScript',
  'React',
  'Node.js',
  'AutoCAD',
  'SolidWorks',
  'Power BI',
  'Excel (Advanced)',
  'Machine Learning',
  'Data Structures & Algorithms',
  'Financial Modeling',
  'Bioinformatics',
  'STAAD Pro',
  'Git & GitHub'
];

export const ProfileSetupView: React.FC<ProfileSetupViewProps> = ({
  user,
  onProfileSaved,
  onContinueToDashboard
}) => {
  // Step navigation (1: Personal & School, 2: College, 3: Skills & Experience, 4: Projects & Courses, 5: Summary)
  const [activeStep, setActiveStep] = useState<number>(1);

  // 1. Personal Details
  const [name, setName] = useState(user.name || '');
  const [age, setAge] = useState<string | number>(user.age || '21');
  const [location, setLocation] = useState(user.location || user.stateOrCity || 'Noida, Uttar Pradesh');

  // 2. School Education (10th & 12th)
  const [tenthMarks, setTenthMarks] = useState(user.schoolEducation?.tenthMarks || '91%');
  const [tenthBoard, setTenthBoard] = useState(user.schoolEducation?.tenthBoard || 'CBSE');
  const [twelfthMarks, setTwelfthMarks] = useState(user.schoolEducation?.twelfthMarks || '86%');
  const [twelfthBoard, setTwelfthBoard] = useState(user.schoolEducation?.twelfthBoard || 'CBSE');
  const [twelfthStream, setTwelfthStream] = useState(user.schoolEducation?.twelfthStream || 'Science (PCM)');

  // 3. College Details
  const [collegeName, setCollegeName] = useState(user.education?.college || 'Dr. A.P.J. Abdul Kalam Technical University');
  const [degree, setDegree] = useState(user.education?.degree || 'B.Tech');
  const [branch, setBranch] = useState(user.education?.branch || 'Mechanical Engineering');
  const [currentYear, setCurrentYear] = useState(user.education?.currentYear || 'Final Year (4th Year)');
  const [passingYear, setPassingYear] = useState(user.education?.passingYear || '2026');
  const [cgpa, setCgpa] = useState(user.education?.cgpa || '8.2 / 10.0');

  // 4. Skills
  const [skills, setSkills] = useState<string[]>(
    user.skills && user.skills.length > 0 ? [...user.skills] : ['Python', 'SQL', 'AutoCAD', 'SolidWorks']
  );
  const [newSkillInput, setNewSkillInput] = useState('');

  // 5. Experience / Internships
  const [experienceList, setExperienceList] = useState<StudentExperience[]>(
    user.experience && user.experience.length > 0
      ? user.experience
      : [
          {
            id: 'exp-1',
            role: 'Industrial Engineering Trainee',
            company: 'BHEL Summer Internship',
            duration: 'June 2025 - August 2025 (2 Months)',
            description: 'Assisted senior plant engineers with turbine maintenance telemetry and vibration analysis.'
          }
        ]
  );
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpDuration, setNewExpDuration] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');
  const [showAddExpModal, setShowAddExpModal] = useState(false);

  // 6. Achievements
  const [achievementsList, setAchievementsList] = useState<StudentAchievement[]>(
    user.achievements && user.achievements.length > 0
      ? user.achievements
      : [
          {
            id: 'ach-1',
            title: '1st Runner Up - Inter-College Technical Hackathon',
            eventOrIssuer: 'State Tech Fest 2025',
            year: '2025',
            description: 'Built a predictive sensor prototype detecting motor overheating.'
          }
        ]
  );
  const [newAchTitle, setNewAchTitle] = useState('');
  const [newAchIssuer, setNewAchIssuer] = useState('');
  const [newAchYear, setNewAchYear] = useState('');
  const [newAchDesc, setNewAchDesc] = useState('');
  const [showAddAchModal, setShowAddAchModal] = useState(false);

  // 7. Projects
  const [projectsList, setProjectsList] = useState<StudentProject[]>(
    user.studentProjects && user.studentProjects.length > 0
      ? user.studentProjects
      : [
          {
            id: 'proj-1',
            title: 'EV Battery Pack Thermal Simulation',
            techStack: ['Python', 'SolidWorks', 'ANSYS'],
            link: 'https://github.com/student/ev-battery-sim',
            description: 'Designed CAD casing and ran thermal stress analysis to prevent thermal runaway in battery packs.'
          }
        ]
  );
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjLink, setNewProjLink] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [showAddProjModal, setShowAddProjModal] = useState(false);

  // 8. Courses & Certifications
  const [coursesList, setCoursesList] = useState<StudentCourse[]>(
    user.studentCourses && user.studentCourses.length > 0
      ? user.studentCourses
      : [
          {
            id: 'course-1',
            title: 'Applied Data Science with Python',
            provider: 'NPTEL / IIT Madras',
            year: '2025',
            certificateUrl: 'nptel.ac.in/cert/12345'
          }
        ]
  );
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseProvider, setNewCourseProvider] = useState('');
  const [newCourseYear, setNewCourseYear] = useState('');
  const [newCourseCert, setNewCourseCert] = useState('');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  // Submission state
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handlers for Skills
  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills([...skills, trimmed]);
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Handlers for Experience
  const handleAddExperience = () => {
    if (!newExpRole.trim() || !newExpCompany.trim()) return;
    const item: StudentExperience = {
      id: `exp-${Date.now()}`,
      role: newExpRole.trim(),
      company: newExpCompany.trim(),
      duration: newExpDuration.trim() || '3 Months',
      description: newExpDesc.trim() || 'Contributed to technical team deliverables and project milestones.'
    };
    setExperienceList([...experienceList, item]);
    setNewExpRole('');
    setNewExpCompany('');
    setNewExpDuration('');
    setNewExpDesc('');
    setShowAddExpModal(false);
  };

  const handleRemoveExperience = (id: string) => {
    setExperienceList(experienceList.filter((e) => e.id !== id));
  };

  // Handlers for Achievements
  const handleAddAchievement = () => {
    if (!newAchTitle.trim()) return;
    const item: StudentAchievement = {
      id: `ach-${Date.now()}`,
      title: newAchTitle.trim(),
      eventOrIssuer: newAchIssuer.trim() || 'College / University',
      year: newAchYear.trim() || '2025',
      description: newAchDesc.trim()
    };
    setAchievementsList([...achievementsList, item]);
    setNewAchTitle('');
    setNewAchIssuer('');
    setNewAchYear('');
    setNewAchDesc('');
    setShowAddAchModal(false);
  };

  const handleRemoveAchievement = (id: string) => {
    setAchievementsList(achievementsList.filter((a) => a.id !== id));
  };

  // Handlers for Projects
  const handleAddProject = () => {
    if (!newProjTitle.trim()) return;
    const stack = newProjTech
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const item: StudentProject = {
      id: `proj-${Date.now()}`,
      title: newProjTitle.trim(),
      techStack: stack.length > 0 ? stack : ['General'],
      link: newProjLink.trim(),
      description: newProjDesc.trim() || 'Academic capstone project.'
    };
    setProjectsList([...projectsList, item]);
    setNewProjTitle('');
    setNewProjTech('');
    setNewProjLink('');
    setNewProjDesc('');
    setShowAddProjModal(false);
  };

  const handleRemoveProject = (id: string) => {
    setProjectsList(projectsList.filter((p) => p.id !== id));
  };

  // Handlers for Courses
  const handleAddCourse = () => {
    if (!newCourseTitle.trim()) return;
    const item: StudentCourse = {
      id: `course-${Date.now()}`,
      title: newCourseTitle.trim(),
      provider: newCourseProvider.trim() || 'Online Platform',
      year: newCourseYear.trim() || '2025',
      certificateUrl: newCourseCert.trim()
    };
    setCoursesList([...coursesList, item]);
    setNewCourseTitle('');
    setNewCourseProvider('');
    setNewCourseYear('');
    setNewCourseCert('');
    setShowAddCourseModal(false);
  };

  const handleRemoveCourse = (id: string) => {
    setCoursesList(coursesList.filter((c) => c.id !== id));
  };

  // Master Save Function
  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const updatedData: Partial<User> = {
        name,
        age: age ? Number(age) : 21,
        location,
        stateOrCity: location,
        country: 'India',
        schoolEducation: {
          tenthMarks,
          tenthBoard,
          twelfthMarks,
          twelfthBoard,
          twelfthStream
        },
        education: {
          college: collegeName,
          degree,
          branch,
          currentYear,
          passingYear,
          cgpa
        },
        skills,
        experience: experienceList,
        achievements: achievementsList,
        studentProjects: projectsList,
        studentCourses: coursesList,
        isProfileComplete: true
      };

      const res = await api.updateProfile(user.id, updatedData);
      onProfileSaved(res.user);
      setSaveSuccess(true);
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-orange-400 mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Step 2: Comprehensive Student Profile Setup</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Build Your Academic & Skill Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Enter your school marks, college degree, skills, projects, and achievements. The AI Skill Mentor will use these details to guide your future career path.
        </p>

        {/* Step Indicator Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2">
          {[
            { num: 1, title: 'Personal & School' },
            { num: 2, title: 'College Education' },
            { num: 3, title: 'Skills & Experience' },
            { num: 4, title: 'Projects & Courses' },
            { num: 5, title: 'Review & Save' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeStep === s.num
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span
                className={`h-4 w-4 rounded-full text-[10px] flex items-center justify-center font-mono ${
                  activeStep === s.num ? 'bg-orange-800 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {s.num}
              </span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
         STEP 1: PERSONAL & SCHOOL MARKS (10th & 12th)
         ========================================================================= */}
      {activeStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          {/* Personal Details Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-orange-400" />
              <span>Personal Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohan Sharma"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1.5">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 21"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1.5">Location (City & State)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Noida, Uttar Pradesh"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* School Education Card (10th & 12th) */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <School className="h-4 w-4 text-orange-400" />
              <span>School Education Marks (10th & 12th Standards)</span>
            </h3>

            {/* 10th Standard */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-200">Class 10th (Secondary School)</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">10th Marks / Percentage / CGPA</label>
                  <input
                    type="text"
                    value={tenthMarks}
                    onChange={(e) => setTenthMarks(e.target.value)}
                    placeholder="e.g. 91% or 9.4 CGPA"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Board of Examination</label>
                  <select
                    value={tenthBoard}
                    onChange={(e) => setTenthBoard(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="CBSE">CBSE (Central Board of Secondary Education)</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="International (IB / Cambridge)">International (IB / Cambridge)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 12th Standard */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-200">Class 12th (Higher Secondary)</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">12th Marks / Percentage</label>
                  <input
                    type="text"
                    value={twelfthMarks}
                    onChange={(e) => setTwelfthMarks(e.target.value)}
                    placeholder="e.g. 86% or 8.8 CGPA"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Stream</label>
                  <select
                    value={twelfthStream}
                    onChange={(e) => setTwelfthStream(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Science (PCM)">Science (Physics, Chemistry, Maths)</option>
                    <option value="Science (PCB)">Science (Physics, Chemistry, Biology)</option>
                    <option value="Science (PCMB)">Science (PCMB)</option>
                    <option value="Commerce">Commerce with Maths / IP</option>
                    <option value="Arts / Humanities">Arts / Humanities</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Board</label>
                  <select
                    value={twelfthBoard}
                    onChange={(e) => setTwelfthBoard(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="ISC">ISC</option>
                    <option value="State Board">State Board</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-sm transition-colors"
              >
                <span>Next: College Details</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         STEP 2: COLLEGE / UNIVERSITY DETAILS
         ========================================================================= */}
      {activeStep === 2 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-6 animate-fade-in">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-orange-400" />
            <span>College / University Pursuing Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-300 block mb-1.5">
                College / University Name
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="e.g. Dr. A.P.J. Abdul Kalam Technical University, Delhi University, IIT..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1.5">Degree Program</label>
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
              <label className="font-semibold text-slate-300 block mb-1.5">
                Branch / Specialization
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="e.g. Mechanical Engineering, CSE, Biotechnology, Commerce..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1.5">Current Year / Semester</label>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="1st Year">1st Year (Freshman)</option>
                <option value="2nd Year">2nd Year (Sophomore)</option>
                <option value="3rd Year">3rd Year (Junior)</option>
                <option value="Final Year (4th Year)">Final Year (4th Year / Senior)</option>
                <option value="Graduated">Recent Graduate</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1.5">Passing Year</label>
              <select
                value={passingYear}
                onChange={(e) => setPassingYear(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-300 block mb-1.5">
                College CGPA / Current Percentage
              </label>
              <input
                type="text"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                placeholder="e.g. 8.2 / 10.0 or 79%"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-sm transition-colors"
            >
              <span>Next: Skills & Experience</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
         STEP 3: SKILLS & EXPERIENCE / INTERNSHIPS
         ========================================================================= */}
      {activeStep === 3 && (
        <div className="space-y-6 animate-fade-in">
          {/* Skills Management */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code className="h-4 w-4 text-orange-400" />
                <span>Skills Inventory ({skills.length} added)</span>
              </h3>
            </div>

            {/* Input to add custom skill */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(newSkillInput);
                  }
                }}
                placeholder="Type a skill and press Add (e.g. Python, SQL, AutoCAD, Power BI)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(newSkillInput)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Quick Suggestions */}
            <div>
              <div className="text-[11px] text-slate-400 mb-1.5">Quick add common skills:</div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SKILL_SUGGESTIONS.filter((s) => !skills.includes(s))
                  .slice(0, 10)
                  .map((rec) => (
                    <button
                      key={rec}
                      type="button"
                      onClick={() => handleAddSkill(rec)}
                      className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3 text-orange-400" />
                      <span>{rec}</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Active Skills Badges */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white flex items-center gap-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    ✕
                  </button>
                </span>
              ))}
              {skills.length === 0 && (
                <span className="text-xs text-slate-500">No skills added yet. Add at least 2-3 skills.</span>
              )}
            </div>
          </div>

          {/* Experience / Internships List */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-orange-400" />
                <span>Internships & Experience ({experienceList.length})</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddExpModal(true)}
                className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-medium"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Experience</span>
              </button>
            </div>

            <div className="space-y-3">
              {experienceList.map((exp) => (
                <div
                  key={exp.id}
                  className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1.5 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-white">{exp.role}</div>
                    <div className="text-[11px] text-orange-400">
                      {exp.company} · {exp.duration}
                    </div>
                    <p className="text-slate-400 text-[11px] mt-1">{exp.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="text-slate-500 hover:text-rose-400 shrink-0 p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {experienceList.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-lg">
                  No experience or internships listed yet. (Optional)
                </div>
              )}
            </div>
          </div>

          {/* Achievements Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Trophy className="h-4 w-4 text-orange-400" />
                <span>Achievements & Awards ({achievementsList.length})</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddAchModal(true)}
                className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-medium"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Achievement</span>
              </button>
            </div>

            <div className="space-y-3">
              {achievementsList.map((ach) => (
                <div
                  key={ach.id}
                  className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1.5 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-white">{ach.title}</div>
                    <div className="text-[11px] text-slate-400">
                      {ach.eventOrIssuer} ({ach.year})
                    </div>
                    {ach.description && <p className="text-slate-400 text-[11px]">{ach.description}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAchievement(ach.id)}
                    className="text-slate-500 hover:text-rose-400 shrink-0 p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {achievementsList.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-lg">
                  No achievements listed yet. (Optional)
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(4)}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-sm transition-colors"
            >
              <span>Next: Projects & Courses</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
         STEP 4: PROJECTS & COURSES / CERTIFICATIONS
         ========================================================================= */}
      {activeStep === 4 && (
        <div className="space-y-6 animate-fade-in">
          {/* Projects Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code className="h-4 w-4 text-orange-400" />
                <span>Academic & Independent Projects ({projectsList.length})</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddProjModal(true)}
                className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-medium"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-3">
              {projectsList.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1.5 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{proj.title}</span>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-orange-400 hover:underline"
                        >
                          View Link ↗
                        </a>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{proj.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(proj.id)}
                    className="text-slate-500 hover:text-rose-400 shrink-0 p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {projectsList.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-lg">
                  No projects added yet. (Add your final year capstone or semester projects)
                </div>
              )}
            </div>
          </div>

          {/* Courses & Certifications Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-orange-400" />
                <span>Courses & Certifications ({coursesList.length})</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddCourseModal(true)}
                className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-medium"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Course</span>
              </button>
            </div>

            <div className="space-y-3">
              {coursesList.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1.5 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-white">{c.title}</div>
                    <div className="text-[11px] text-slate-400">
                      {c.provider} · Completed {c.year}
                    </div>
                    {c.certificateUrl && (
                      <div className="text-[10px] text-orange-400 truncate max-w-sm mt-0.5">
                        Cert: {c.certificateUrl}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCourse(c.id)}
                    className="text-slate-500 hover:text-rose-400 shrink-0 p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {coursesList.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-lg">
                  No certifications listed yet. (e.g. NPTEL, Coursera, Udemy)
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(5)}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-sm transition-colors"
            >
              <span>Next: Review & Save Profile</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
         STEP 5: REVIEW ALL INFORMATION & SAVE
         ========================================================================= */}
      {activeStep === 5 && (
        <div className="space-y-6 animate-fade-in">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                Step 5 of 5: Final Review & Confirmation
              </div>
              <h2 className="text-xl font-bold text-white mt-1">Review Your Complete Student Profile</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Check all information before saving. You can edit any details anytime.
              </p>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Personal & School */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-semibold text-orange-400 uppercase text-[10px]">
                  Personal & School Marks
                </div>
                <div className="text-white font-medium">{name} (Age: {age || 21})</div>
                <div className="text-slate-400">{location}</div>
                <div className="pt-2 border-t border-slate-800 text-slate-300 space-y-1">
                  <div>10th Standard: <span className="text-white font-mono">{tenthMarks}</span> ({tenthBoard})</div>
                  <div>12th Standard: <span className="text-white font-mono">{twelfthMarks}</span> ({twelfthStream}, {twelfthBoard})</div>
                </div>
              </div>

              {/* College Education */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-semibold text-orange-400 uppercase text-[10px]">
                  College Details
                </div>
                <div className="text-white font-medium">{collegeName}</div>
                <div className="text-slate-300">{degree} in {branch}</div>
                <div className="pt-2 border-t border-slate-800 text-slate-300 space-y-1">
                  <div>Status: <span className="text-white">{currentYear}</span> · Passing: <span className="text-white">{passingYear}</span></div>
                  <div>College CGPA: <span className="text-emerald-400 font-mono font-bold">{cgpa}</span></div>
                </div>
              </div>
            </div>

            {/* Skills & Stats Summary */}
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300">Skills ({skills.length}):</span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {experienceList.length} Internships · {projectsList.length} Projects · {coursesList.length} Courses
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-[11px]"
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Save Status Banner */}
            {saveSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-xs flex items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Profile Successfully Saved!</div>
                    <div className="text-[11px] text-emerald-300">
                      Your academic and skill parameters are now indexed by the AI Career Guidance Engine.
                    </div>
                  </div>
                </div>

                {onContinueToDashboard && (
                  <button
                    onClick={onContinueToDashboard}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shrink-0 flex items-center gap-1 shadow-sm"
                  >
                    <span>Proceed to Dashboard</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveStep(4)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ← Back to Edit
              </button>

              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 disabled:opacity-50 rounded-lg shadow-md transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Saving Information...' : 'Save & Complete Profile'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODALS: ADD EXPERIENCE
         ========================================================================= */}
      {showAddExpModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white">Add Internship / Experience</h4>
              <button onClick={() => setShowAddExpModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-slate-300 block mb-1">Job / Internship Role</label>
                <input
                  type="text"
                  value={newExpRole}
                  onChange={(e) => setNewExpRole(e.target.value)}
                  placeholder="e.g. Data Analyst Intern, Summer Trainee"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={newExpCompany}
                  onChange={(e) => setNewExpCompany(e.target.value)}
                  placeholder="e.g. Tata Motors, Startup, College Lab"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Duration</label>
                <input
                  type="text"
                  value={newExpDuration}
                  onChange={(e) => setNewExpDuration(e.target.value)}
                  placeholder="e.g. May 2025 - July 2025 (3 Months)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Key Responsibilities & Learnings</label>
                <textarea
                  value={newExpDesc}
                  onChange={(e) => setNewExpDesc(e.target.value)}
                  rows={3}
                  placeholder="Briefly describe what you worked on..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddExpModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddExperience}
                className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold"
              >
                Add Experience
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODALS: ADD ACHIEVEMENT
         ========================================================================= */}
      {showAddAchModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white">Add Achievement / Award</h4>
              <button onClick={() => setShowAddAchModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-slate-300 block mb-1">Title of Achievement / Award</label>
                <input
                  type="text"
                  value={newAchTitle}
                  onChange={(e) => setNewAchTitle(e.target.value)}
                  placeholder="e.g. 1st Place Smart India Hackathon"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">Event / Issuer</label>
                  <input
                    type="text"
                    value={newAchIssuer}
                    onChange={(e) => setNewAchIssuer(e.target.value)}
                    placeholder="e.g. Ministry of Education"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Year</label>
                  <input
                    type="text"
                    value={newAchYear}
                    onChange={(e) => setNewAchYear(e.target.value)}
                    placeholder="e.g. 2025"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Short Description (Optional)</label>
                <textarea
                  value={newAchDesc}
                  onChange={(e) => setNewAchDesc(e.target.value)}
                  rows={2}
                  placeholder="e.g. Built an IoT solution for rural irrigation."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddAchModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddAchievement}
                className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold"
              >
                Add Achievement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODALS: ADD PROJECT
         ========================================================================= */}
      {showAddProjModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white">Add Academic / Capstone Project</h4>
              <button onClick={() => setShowAddProjModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-slate-300 block mb-1">Project Title</label>
                <input
                  type="text"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  placeholder="e.g. Swiggy Food Delivery Analytics Dashboard"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Tech Stack (Comma Separated)</label>
                <input
                  type="text"
                  value={newProjTech}
                  onChange={(e) => setNewProjTech(e.target.value)}
                  placeholder="e.g. Python, SQL, Power BI"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">GitHub / Live Link (Optional)</label>
                <input
                  type="text"
                  value={newProjLink}
                  onChange={(e) => setNewProjLink(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Detailed Description & Deliverables</label>
                <textarea
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  rows={3}
                  placeholder="What problem did it solve? What were the key outcomes?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddProjModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddProject}
                className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODALS: ADD COURSE
         ========================================================================= */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white">Add Course / Certification</h4>
              <button onClick={() => setShowAddCourseModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-slate-300 block mb-1">Course / Certification Title</label>
                <input
                  type="text"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. NPTEL Data Analytics with Python"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">Platform / Institute</label>
                  <input
                    type="text"
                    value={newCourseProvider}
                    onChange={(e) => setNewCourseProvider(e.target.value)}
                    placeholder="e.g. NPTEL / IIT Madras, Coursera"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Completion Year</label>
                  <input
                    type="text"
                    value={newCourseYear}
                    onChange={(e) => setNewCourseYear(e.target.value)}
                    placeholder="e.g. 2025"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Certificate URL or Credential ID (Optional)</label>
                <input
                  type="text"
                  value={newCourseCert}
                  onChange={(e) => setNewCourseCert(e.target.value)}
                  placeholder="e.g. coursera.org/verify/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddCourseModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCourse}
                className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
