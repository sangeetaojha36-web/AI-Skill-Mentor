import React, { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Chrome,
  Github,
  Eye,
  EyeOff,
  Bot,
  X,
  Target,
  FileCheck2,
  Video,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  User as UserIcon
} from "lucide-react";
import { User } from "./types.ts";
import { api } from "./services/api.ts";
import { CareerConstellationCanvas } from "./components/auth/CareerConstellationCanvas.tsx";
import { AnimatedTopDock } from "./components/navigation/AnimatedTopDock.tsx";
import { BreadcrumbNavigation } from "./components/navigation/BreadcrumbNavigation.tsx";
import { ProfileSetupView } from "./components/ProfileSetupView.tsx";
import { DashboardView } from "./components/DashboardView.tsx";
import { ResumeAnalyzerView } from "./components/ResumeAnalyzerView.tsx";
import { CareerExplorerView } from "./components/CareerExplorerView.tsx";
import { SkillGapView } from "./components/SkillGapView.tsx";
import { RoadmapView } from "./components/RoadmapView.tsx";
import { CoursesView } from "./components/CoursesView.tsx";
import { ProjectsView } from "./components/ProjectsView.tsx";
import { ChatbotView } from "./components/ChatbotView.tsx";
import { MockInterviewView } from "./components/MockInterviewView.tsx";
import { ProgressView } from "./components/ProgressView.tsx";
import { AdminView } from "./components/AdminView.tsx";

export default function App() {
  // Current user state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("ai_skill_mentor_user");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (_) {}
    }
    return null;
  });

  // Active navigation tab and step-by-step history stack
  const [activeTab, setActiveTab] = useState<string>("setup");
  const [navigationHistory, setNavigationHistory] = useState<string[]>(["dashboard", "setup"]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [showChatModal, setShowChatModal] = useState<boolean>(false);

  const navigateTab = (newTab: string) => {
    if (newTab === activeTab) return;
    setNavigationHistory((prev) => {
      if (newTab === "dashboard") {
        return ["dashboard"];
      }
      const existingIdx = prev.indexOf(newTab);
      if (existingIdx !== -1) {
        return prev.slice(0, existingIdx + 1);
      }
      const base = prev.length > 0 && prev[0] === "dashboard" ? prev : ["dashboard", ...prev];
      return [...base, newTab];
    });
    setActiveTab(newTab);
  };

  const handleBack = () => {
    setNavigationHistory((prev) => {
      if (prev.length <= 1) {
        setActiveTab("dashboard");
        return ["dashboard"];
      }
      const nextHistory = prev.slice(0, -1);
      const prevTab = nextHistory[nextHistory.length - 1] || "dashboard";
      setActiveTab(prevTab);
      return nextHistory;
    });
  };

  // Auth Form State
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Synchronize dashboard whenever user updates
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("ai_skill_mentor_user", JSON.stringify(currentUser));
      refreshDashboard();
    } else {
      localStorage.removeItem("ai_skill_mentor_user");
    }
  }, [currentUser?.id, currentUser?.skills, currentUser?.careerGoal]);

  const refreshDashboard = async () => {
    if (!currentUser) return;
    try {
      const data = await api.getDashboard(currentUser.id);
      setDashboardData(data);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    }
  };

  // Sign up & Log in submission handler
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail) {
        throw new Error("Please enter your email address.");
      }

      if (isLoginMode) {
        // Log in flow
        const res = await api.login(cleanEmail, password).catch(() => {
          // If demo/new user, auto-register for convenience
          const fullName = cleanEmail.split("@")[0].replace(".", " ");
          return api.register({
            name: fullName.charAt(0).toUpperCase() + fullName.slice(1),
            email: cleanEmail,
            password: password || "password123",
          });
        });

        setCurrentUser(res.user);
        setActiveTab("setup");
      } else {
        // Sign up flow
        const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || "Student";

        let registeredUser: User;
        try {
          const res = await api.register({
            name: fullName,
            email: cleanEmail,
            password: password || "password123",
          });
          registeredUser = res.user;
        } catch (err: any) {
          // If user exists, log in
          const res = await api.login(cleanEmail, password || "password123");
          registeredUser = res.user;
        }

        const completeUser: User = {
          ...registeredUser,
          name: fullName,
          email: cleanEmail,
          schoolEducation: registeredUser.schoolEducation || {
            tenthMarks: "91%",
            tenthBoard: "CBSE",
            twelfthMarks: "86%",
            twelfthBoard: "CBSE",
            twelfthStream: "Science (PCM)",
          },
          education: registeredUser.education || {
            degree: "B.Tech",
            branch: "Computer Science & Engineering",
            college: "National Institute of Technology",
            collegeTier: "Tier 1",
            currentYear: "3rd Year",
            passingYear: "2027",
            cgpa: "8.4 / 10.0",
          },
          skills: registeredUser.skills && registeredUser.skills.length > 0
            ? registeredUser.skills
            : ["Python", "SQL", "Data Structures", "Problem Solving"],
          experience: registeredUser.experience || [],
          achievements: registeredUser.achievements || [],
          studentProjects: registeredUser.studentProjects || [],
          studentCourses: registeredUser.studentCourses || [],
          isProfileComplete: false,
        };

        setCurrentUser(completeUser);
        localStorage.setItem("ai_skill_mentor_user", JSON.stringify(completeUser));
        setActiveTab("setup");
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication error. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (type: 'rohan' | 'ananya') => {
    if (type === 'rohan') {
      const rohanUser: User = {
        id: "user-rohan-mechanical",
        name: "Rohan Sharma",
        email: "rohan.sharma22@aktu.ac.in",
        role: "student",
        country: "India",
        location: "Noida, Uttar Pradesh",
        stateOrCity: "Noida, Uttar Pradesh",
        languages: ["Hindi", "English"],
        schoolEducation: {
          tenthMarks: "91%",
          tenthBoard: "CBSE",
          twelfthMarks: "86%",
          twelfthBoard: "CBSE",
          twelfthStream: "Science (PCM)",
        },
        education: {
          degree: "B.Tech",
          branch: "Mechanical Engineering",
          college: "Dr. A.P.J. Abdul Kalam Technical University",
          collegeTier: "Tier 3",
          currentYear: "Final Year (4th Year)",
          passingYear: "2026",
          cgpa: "8.2 / 10.0",
        },
        skills: ["Python", "AutoCAD", "SolidWorks", "Excel", "Problem Solving", "SQL"],
        interests: ["Data Science & Analytics", "Robotics & Automation"],
        careerGoal: "Data Analyst & Business Insights",
        targetCompanies: ["Flipkart", "Tata Motors", "TCS Digital", "Swiggy"],
        experience: [
          {
            id: "exp-1",
            role: "Industrial Engineering Trainee",
            company: "BHEL Summer Internship",
            duration: "June 2025 - August 2025 (2 Months)",
            description: "Assisted senior plant engineers with turbine maintenance telemetry and vibration analysis."
          }
        ],
        achievements: [],
        studentProjects: [],
        studentCourses: [],
        isProfileComplete: true,
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(rohanUser);
      localStorage.setItem("ai_skill_mentor_user", JSON.stringify(rohanUser));
      setActiveTab("dashboard");
    } else {
      const ananyaUser: User = {
        id: "user-ananya-biotech",
        name: "Ananya Iyer",
        email: "ananya.iyer@du.ac.in",
        role: "student",
        country: "India",
        location: "New Delhi",
        stateOrCity: "New Delhi",
        languages: ["English", "Hindi"],
        schoolEducation: {
          tenthMarks: "94%",
          tenthBoard: "CBSE",
          twelfthMarks: "91%",
          twelfthBoard: "CBSE",
          twelfthStream: "Science (PCB)",
        },
        education: {
          degree: "B.Sc (Hons)",
          branch: "Biotechnology & Life Sciences",
          college: "University of Delhi",
          collegeTier: "Tier 1",
          currentYear: "Final Year (3rd Year)",
          passingYear: "2026",
          cgpa: "8.7 / 10.0",
        },
        skills: ["PCR", "Python", "Biostatistics", "Genomics", "Excel"],
        interests: ["Bioinformatics", "Pharmaceutical Analytics"],
        careerGoal: "Bioinformatics & Genomic Data Scientist",
        targetCompanies: ["Biocon", "Strand Life Sciences", "Dr. Reddy's"],
        experience: [],
        achievements: [],
        studentProjects: [],
        studentCourses: [],
        isProfileComplete: true,
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(ananyaUser);
      localStorage.setItem("ai_skill_mentor_user", JSON.stringify(ananyaUser));
      setActiveTab("dashboard");
    }
  };

  const handleProfileSaved = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem("ai_skill_mentor_user", JSON.stringify(updatedUser));
    refreshDashboard();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("ai_skill_mentor_user");
    setIsLoginMode(false);
    setActiveTab("setup");
  };

  // If user is not authenticated, render the System-Themed Auth Page
  if (!currentUser) {
    return (
      <div className="min-h-screen w-full bg-[#050302] text-slate-100 flex items-center justify-center p-3 sm:p-6 lg:p-8 font-sans antialiased selection:bg-[#DE4313]/40 selection:text-white">
        {/* Main Bento Registration Shell (Solar Sunset FEC163 to DE4313) */}
        <div className="w-full max-w-6xl rounded-3xl border border-[#FEC163]/30 bg-[#0A0402]/95 shadow-[0_24px_70px_rgba(0,0,0,0.98),0_0_40px_rgba(222,67,19,0.22)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 backdrop-blur-2xl transition-all">
          
          {/* =====================================================================
             LEFT HERO: SYSTEM CAREER CONSTELLATION ANIMATION (Solar Theme)
             ===================================================================== */}
          <div className="lg:col-span-7 relative min-h-[480px] sm:min-h-[560px] lg:min-h-[680px] flex flex-col justify-between p-6 sm:p-10 overflow-hidden rounded-2xl m-2 bg-[#060201] border border-[#FEC163]/25">
            {/* Live Interactive Constellation Canvas */}
            <CareerConstellationCanvas />

            {/* Subtle Gradient Vignette ensuring text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060201] via-[#060201]/45 to-transparent pointer-events-none" />

            {/* Top Brand Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#FEC163] to-[#DE4313] flex items-center justify-center text-black font-bold shadow-lg shadow-[#DE4313]/40 border border-[#FEC163]/50">
                  <Compass className="h-5 w-5 text-black" />
                </div>
                <div>
                  <span className="text-base font-bold tracking-tight text-white block">
                    AI Skill Mentor
                  </span>
                  <span className="text-[10px] text-[#FEC163] font-mono tracking-wider uppercase block">
                    Solar Career Engine
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0904]/90 border border-[#FEC163]/40 text-[11px] text-[#FFD799] shadow-[0_0_15px_rgba(222,67,19,0.35)]">
                <span className="h-2 w-2 rounded-full bg-[#FEC163] animate-pulse shadow-[0_0_10px_#FEC163]" />
                <span>Placement AI Active</span>
              </div>
            </div>

            {/* Floating Live Bento Metric Badges (Solar Amber & Flame) */}
            <div className="relative z-10 my-auto py-8 space-y-3 pointer-events-none max-w-sm">
              <div className="p-3 rounded-2xl bg-[#140603]/90 border border-[#FEC163]/35 shadow-2xl backdrop-blur-md flex items-center gap-3 transform hover:translate-x-1 transition-transform">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#FEC163] to-[#DE4313] text-black font-bold flex items-center justify-center shrink-0 shadow-md">
                  <Target className="h-4 w-4 text-black" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">94% Role Readiness Match</div>
                  <div className="text-[10px] text-[#FFD799]">Data Analytics & Software Engineering</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#140603]/90 border border-[#FEC163]/35 shadow-2xl backdrop-blur-md flex items-center gap-3 transform translate-x-3">
                <div className="h-8 w-8 rounded-xl bg-[#DE4313]/25 text-[#FEC163] flex items-center justify-center shrink-0 border border-[#FEC163]/40">
                  <FileCheck2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">ATS Resume Health: 88/100</div>
                  <div className="text-[10px] text-[#FFD799]">Calibrated for Indian Recruiters (TCS, Swiggy)</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#140603]/90 border border-[#FEC163]/35 shadow-2xl backdrop-blur-md flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-[#FEC163]/20 text-[#FEC163] flex items-center justify-center shrink-0 border border-[#FEC163]/40">
                  <Video className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Greenroom AI Mock Studio</div>
                  <div className="text-[10px] text-[#FFD799]">Speech-to-text technical & HR practice</div>
                </div>
              </div>
            </div>

            {/* Bottom System Onboarding Steps */}
            <div className="relative z-10 space-y-4 pt-4 border-t border-[#FEC163]/20">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-[#FEC163] to-[#DE4313] bg-clip-text text-transparent">
                  Discover Your Future in Your Field
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md leading-relaxed">
                  Bridge your skill gaps, analyze curriculum benchmarks, and practice campus interviews with AI.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold text-xs shadow-[0_0_20px_rgba(222,67,19,0.5)]">
                  <span className="h-5 w-5 rounded-full bg-black text-[#FEC163] text-[11px] font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span>Register Student Profile</span>
                </div>

                <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#120502]/80 border border-[#FEC163]/25 text-slate-300 text-xs">
                  <span className="h-5 w-5 rounded-full bg-[#260C05] text-[#FEC163] text-[11px] font-bold flex items-center justify-center shrink-0 border border-[#FEC163]/30">
                    2
                  </span>
                  <span>Map Academic Marks (10th, 12th & College)</span>
                </div>

                <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#120502]/80 border border-[#FEC163]/25 text-slate-300 text-xs">
                  <span className="h-5 w-5 rounded-full bg-[#260C05] text-[#FEC163] text-[11px] font-bold flex items-center justify-center shrink-0 border border-[#FEC163]/30">
                    3
                  </span>
                  <span>Unlock Placement Roadmap & Greenroom</span>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================================
             RIGHT FORM COLUMN (Solar Sunset Form)
             ===================================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            {/* Mode Switcher Tabs */}
            <div className="flex rounded-xl bg-[#0D0502] p-1 border border-[#FEC163]/30 mb-6">
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(false);
                  setAuthError("");
                }}
                className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  !isLoginMode
                    ? "bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black shadow-[0_0_18px_rgba(222,67,19,0.6)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign Up (New Student)
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(true);
                  setAuthError("");
                }}
                className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  isLoginMode
                    ? "bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black shadow-[0_0_18px_rgba(222,67,19,0.6)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign In (Existing User)
              </button>
            </div>

            {/* Form Header */}
            <div className="space-y-1 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-[#FEC163] to-[#DE4313] bg-clip-text text-transparent">
                {isLoginMode ? "Welcome Back" : "Create Student Account"}
              </h2>
              <p className="text-xs text-slate-400">
                {isLoginMode
                  ? "Enter your registered credentials to resume career mentoring."
                  : "Input your basic details to start personalized skill tracking."}
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <span className="shrink-0 font-bold">⚠️</span>
                <span>{authError}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!isLoginMode && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rohan"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required={!isLoginMode}
                      className="w-full bg-[#120603] border border-[#FEC163]/30 rounded-xl h-11 px-3.5 text-xs text-white placeholder:text-slate-500 focus:border-[#FEC163] focus:ring-1 focus:ring-[#FEC163]/60 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sharma"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required={!isLoginMode}
                      className="w-full bg-[#120603] border border-[#FEC163]/30 rounded-xl h-11 px-3.5 text-xs text-white placeholder:text-slate-500 focus:border-[#FEC163] focus:ring-1 focus:ring-[#FEC163]/60 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  College / Personal Email
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    placeholder="student@college.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#120603] border border-[#FEC163]/30 rounded-xl h-11 px-3.5 text-xs text-white placeholder:text-slate-500 focus:border-[#FEC163] focus:ring-1 focus:ring-[#FEC163]/60 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Password
                  </label>
                  {!isLoginMode && (
                    <span className="text-[10px] text-slate-400 font-mono">Min. 6 characters</span>
                  )}
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#120603] border border-[#FEC163]/30 rounded-xl h-11 px-3.5 pr-10 text-xs text-white placeholder:text-slate-500 focus:border-[#FEC163] focus:ring-1 focus:ring-[#FEC163]/60 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA (Solar Sunset Gradient Button) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-[#FEC163] via-[#FA8C28] to-[#DE4313] hover:from-[#FFE19C] hover:to-[#DE4313] text-black font-bold text-xs rounded-xl shadow-[0_0_28px_rgba(222,67,19,0.7)] transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Directing to Student Space...</span>
                ) : isLoginMode ? (
                  <>
                    <span>Sign In & Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Create Account & Setup Profile</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Instant Demo Student Profiles (Fast 1-Click Access) */}
            <div className="mt-6 pt-5 border-t border-[#FEC163]/20">
              <div className="text-[10px] font-semibold text-[#FEC163] uppercase tracking-wider text-center mb-2.5 font-mono">
                Instant 1-Click Student Demo Profiles
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('rohan')}
                  className="p-2.5 rounded-xl bg-[#120603] hover:bg-[#220B04] border border-[#FEC163]/30 text-left transition-colors cursor-pointer shadow-sm"
                >
                  <div className="font-semibold text-white text-[11px]">Rohan Sharma</div>
                  <div className="text-[10px] text-[#FEC163] font-mono">B.Tech Mech · Tier 3</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('ananya')}
                  className="p-2.5 rounded-xl bg-[#120603] hover:bg-[#220B04] border border-[#FEC163]/30 text-left transition-colors cursor-pointer shadow-sm"
                >
                  <div className="font-semibold text-white text-[11px]">Ananya Iyer</div>
                  <div className="text-[10px] text-amber-200 font-mono">B.Sc Biotech · DU</div>
                </button>
              </div>
            </div>

            {/* Footer switcher */}
            <div className="mt-5 text-center text-xs text-slate-400">
              {isLoginMode ? (
                <>
                  Need to setup a student profile?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoginMode(false);
                      setAuthError("");
                    }}
                    className="text-[#FEC163] font-semibold hover:underline cursor-pointer ml-1"
                  >
                    Sign Up Free
                  </button>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoginMode(true);
                      setAuthError("");
                    }}
                    className="text-[#FEC163] font-semibold hover:underline cursor-pointer ml-1"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Once signed up or logged in, DIRECT TO FULL APPLICATION INTERFACE
  return (
    <div className="min-h-screen bg-[#050302] text-slate-100 flex flex-col font-sans antialiased selection:bg-[#DE4313]/40 selection:text-white">
      {/* Animated Top Dock Command Bar */}
      <AnimatedTopDock
        currentUser={currentUser}
        activeTab={activeTab}
        onSelectTab={navigateTab}
        onOpenChat={() => setShowChatModal(true)}
        onLogout={handleLogout}
        proximity={122}
        spring={0.19}
        damping={0.7}
        widthGrowth={17}
        heightGrowth={16}
        drop={3.5}
      />

      {/* Main Container */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-16 pt-4 max-w-7xl mx-auto w-full">
        {/* Step-by-Step Breadcrumb Navigation Bar */}
        <BreadcrumbNavigation
          activeTab={activeTab}
          historyStack={navigationHistory}
          user={currentUser}
          onNavigate={navigateTab}
          onBack={handleBack}
        />

        {/* Step 2: Comprehensive Student Profile Setup */}
        {activeTab === "setup" && (
          <ProfileSetupView
            user={currentUser}
            onProfileSaved={handleProfileSaved}
            onContinueToDashboard={() => navigateTab("dashboard")}
          />
        )}

        {/* Dashboard View */}
        {activeTab === "dashboard" && (
          <DashboardView
            user={currentUser}
            topCareer={dashboardData?.topCareer}
            gapAnalysis={dashboardData?.gapAnalysis}
            roadmap={dashboardData?.roadmap}
            latestResume={dashboardData?.latestResume}
            latestInterview={dashboardData?.latestInterview}
            recommendedCourses={dashboardData?.recommendedCourses || []}
            recommendedProjects={dashboardData?.recommendedProjects || []}
            profileCompleteness={dashboardData?.profileCompleteness || 85}
            onNavigate={navigateTab}
            onOpenChat={() => setShowChatModal(true)}
          />
        )}

        {/* Career Explorer */}
        {activeTab === "careers" && (
          <CareerExplorerView
            user={currentUser}
            onSelectCareer={async (cid, title) => {
              setCurrentUser((prev) => (prev ? { ...prev, careerGoal: title } : null));
              await api.updateProfile(currentUser.id, { careerGoal: title });
              await api.generateRoadmap(currentUser.id, cid);
              refreshDashboard();
            }}
            onNavigate={navigateTab}
          />
        )}

        {/* Skill Gap Analysis */}
        {activeTab === "skillgap" && (
          <SkillGapView
            user={currentUser}
            onNavigate={navigateTab}
            onGenerateRoadmap={(cid) => {
              navigateTab("roadmap");
            }}
          />
        )}

        {/* Roadmap */}
        {activeTab === "roadmap" && (
          <RoadmapView user={currentUser} onNavigate={navigateTab} />
        )}

        {/* ATS Resume Analyzer */}
        {activeTab === "resume" && (
          <ResumeAnalyzerView
            user={currentUser}
            onSkillsUpdated={(newSkills) => {
              const merged = Array.from(new Set([...currentUser.skills, ...newSkills]));
              setCurrentUser((prev) => (prev ? { ...prev, skills: merged } : null));
              refreshDashboard();
            }}
            onNavigate={navigateTab}
          />
        )}

        {/* Greenroom Mock Interview Studio */}
        {activeTab === "interview" && (
          <MockInterviewView user={currentUser} onNavigate={navigateTab} />
        )}

        {/* Courses */}
        {activeTab === "courses" && (
          <CoursesView user={currentUser} onNavigate={navigateTab} />
        )}

        {/* Projects */}
        {activeTab === "projects" && (
          <ProjectsView user={currentUser} onNavigate={navigateTab} />
        )}

        {/* Progress Tracker */}
        {activeTab === "progress" && (
          <ProgressView
            user={currentUser}
            roadmap={dashboardData?.roadmap}
            latestResume={dashboardData?.latestResume}
            latestInterview={dashboardData?.latestInterview}
            onNavigate={navigateTab}
          />
        )}

        {/* Admin View */}
        {activeTab === "admin" && <AdminView onNavigate={navigateTab} />}
      </main>

      {/* Floating AI Chat Mentor Button (Solar Sunset FEC163 to DE4313) */}
      <button
        onClick={() => setShowChatModal(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313] hover:from-[#FFE19C] hover:to-[#DE4313] text-black font-bold shadow-[0_0_28px_rgba(222,67,19,0.7)] border border-[#FEC163]/50 transition-all hover:scale-105 cursor-pointer"
      >
        <Bot className="h-5 w-5 text-black" />
        <span className="text-xs font-bold hidden sm:inline">Ask AI Mentor</span>
      </button>

      {/* AI Chatbot Modal (Solar Glass) */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-end sm:items-center justify-center p-2 sm:p-4 backdrop-blur-md">
          <div className="bg-[#0A0402] border border-[#FEC163]/35 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_24px_70px_rgba(0,0,0,0.98),0_0_40px_rgba(222,67,19,0.25)]">
            <div className="p-4 border-b border-[#FEC163]/25 flex items-center justify-between bg-[#190804]/90">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#FEC163] to-[#DE4313] text-black font-bold flex items-center justify-center shadow-[0_0_15px_rgba(222,67,19,0.6)] border border-[#FEC163]/40">
                  <Bot className="h-4 w-4 text-black" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">AI Career Mentor</h3>
                  <div className="text-[10px] text-[#FEC163] font-mono">
                    Online for {currentUser.name}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#260C05] transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto">
              <ChatbotView user={currentUser} onNavigate={setActiveTab} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
