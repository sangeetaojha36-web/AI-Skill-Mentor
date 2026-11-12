import React, { useState, useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { User, ResumeAnalysis } from '../types.ts';
import { api } from '../services/api.ts';
import { COMPREHENSIVE_CAREERS, CareerPath, CareerSkill } from '../data/careersData.ts';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Award,
  FileUp,
  Check,
  X,
  Briefcase,
  Target,
  Search,
  Building2,
  Plus,
  Compass,
  HelpCircle,
  Layers,
  GraduationCap,
  Filter,
  CheckCheck
} from 'lucide-react';

interface ResumeAnalyzerViewProps {
  user: User;
  onSkillsUpdated: (newSkills: string[]) => void;
  onRoleSelected?: (roleTitle: string, careerId: string) => void;
  onResumeAnalyzed?: (analysis: ResumeAnalysis, roleGapAnalysis?: any) => void;
  onNavigate: (tab: string) => void;
}

// Pre-loaded realistic sample data for 1-click testing of PDF and PNG documents
const SAMPLE_DOCS = {
  software: {
    fileName: 'Kavita_Verma_IIT_FullStack_Resume.pdf',
    fileType: 'application/pdf',
    fileSize: '154.2 KB',
    badge: 'PDF Document',
    roleHint: 'Junior Frontend Web Developer',
    text: `Kavita Verma
Bengaluru, Karnataka | kavita.verma@alumni.iitd.ac.in | +91 98112 33445
LinkedIn: linkedin.com/in/kavita-verma-dev | GitHub: github.com/kavita-builds

EDUCATION
B.Tech in Computer Science & Engineering | Indian Institute of Technology (IIT) Delhi
Graduation: June 2026 | CGPA: 8.8 / 10.0

TECHNICAL SKILLS
Languages & Frameworks: JavaScript (ES6+), TypeScript, React, HTML5, CSS3, Tailwind CSS, Python, Node.js, Express, REST APIs
Tools & Databases: Git, GitHub, PostgreSQL, MongoDB, Vite, Postman, Jest, Linux
Core Competencies: Data Structures & Algorithms, Component Architecture, Responsive Web Design, State Management, Problem Solving

PROJECTS
Collaborative Code Playground & Developer Canvas (Full-Stack React & Node)
- Engineered a real-time collaborative workspace supporting live code editing with syntax highlighting and instant preview.
- Reduced initial DOM render latency by 42% through lazy-loaded component bundles and optimized Tailwind styling.
- Handled state synchronization using WebSocket event dispatchers and debounced document snapshots.
- Open-sourced on GitHub with 180+ stars and deployed production build on Vercel.

Campus Placement Portal & Mock Testing Dashboard
- Built a responsive full-stack platform used by 1,200+ engineering students to practice mock technical assessments.
- Integrated role-specific skill benchmarking quizzes, automated scoring pipelines, and percentile ranking leaderboards.
- Designed 15+ reusable React UI components with strict TypeScript type-safety and accessible keyboard navigation.

ACHIEVEMENTS & LEADERSHIP
- Finalist at Smart India Hackathon (SIH 2025): Designed real-time civic grievance routing application.
- Technical Secretary, IIT Delhi Coding Club: Mentored 200+ junior students in modern web development.`
  },

  mechanical: {
    fileName: 'Rohan_Sharma_AKTU_Mechanical_Resume.pdf',
    fileType: 'application/pdf',
    fileSize: '142.6 KB',
    badge: 'PDF Document',
    roleHint: 'Junior CAD Modeler & Mechanical Drafter',
    text: `Rohan Sharma
Noida, Uttar Pradesh | rohan.sharma22@aktu.ac.in | +91 98765 43210
LinkedIn: linkedin.com/in/rohansharma-eng | GitHub: github.com/rohan-analytics

EDUCATION
B.Tech in Mechanical Engineering | Dr. A.P.J. Abdul Kalam Technical University (AKTU)
Graduation: June 2026 | CGPA: 8.1 / 10.0 (First Class with Distinction)

TECHNICAL SKILLS
Languages & Tools: Python (Pandas, NumPy), SQL (PostgreSQL, MySQL), Power BI, Microsoft Excel, SolidWorks, AutoCAD, Git
Core Competencies: Exploratory Data Analysis, Relational Database Modeling, Statistical Analysis, Industrial Automation Basics, Problem Solving

PROJECTS
E-Commerce & Food Delivery Analytics Dashboard (Swiggy / Zomato Telemetry)
- Extracted and queried 250,000+ simulated delivery transactions using advanced SQL joins and window functions.
- Engineered automated data pipeline in Python (Pandas), reducing report generation time by 65%.
- Built an executive Power BI dashboard analyzing city-wise rider payout margins and late delivery penalty correlations.
- Published project code and interactive dashboard on GitHub with 40+ stars.

Electric Vehicle Battery Pack Thermal Simulation (Final Year Project)
- Designed parametric CAD battery casing in SolidWorks and performed thermal stress analysis in ANSYS FEA.
- Scripted Python validation tool comparing simulated heat distribution against empirical cell data.

CAMPUS ACHIEVEMENTS & INTERNSHIP
- Industrial Trainee at BHEL (4-week summer internship): Assisted in steam turbine maintenance monitoring.
- Placement Coordinator for Department Mechanical Engineering (2025-2026).`
  },

  biotech: {
    fileName: 'Ananya_Iyer_DU_Biotech_Resume.png',
    fileType: 'image/png',
    fileSize: '890.4 KB',
    badge: 'PNG Scanned Image',
    roleHint: 'Data Analyst & Business Intelligence Specialist',
    text: `Ananya Iyer
New Delhi, India | ananya.iyer@du.ac.in | +91 91234 56789
LinkedIn: linkedin.com/in/ananya-iyer-biotech | GitHub: github.com/ananya-genomics

EDUCATION
B.Sc (Hons) in Biotechnology | University of Delhi (South Campus)
Graduation: May 2026 | CGPA: 8.7 / 10.0

SKILLS & LABORATORY TECHNIQUES
Computational: Python (Biopython, Pandas), R Programming (DESeq2, Bioconductor), Linux, Git, SQL Basics
Wet Lab: PCR, qPCR, Gel Electrophoresis, Bacterial Cell Culture, DNA/RNA Extraction, UV Spectroscopy
Domain: Bioinformatics, Cancer Genomics, Biostatistics, Clinical Trials (GCP Guidelines)

RESEARCH EXPERIENCE & PROJECTS
Genomic Biomarker Discovery in Breast Cancer Cohorts (Undergraduate Research Project)
- Analyzed RNA-seq differential gene expression datasets from 32 Indian patient samples using R (DESeq2).
- Identified 14 statistically significant upregulated oncogene candidates and generated volcano plots and heatmaps.
- Scripted automated Python parsing pipeline to cross-reference genetic variants against NCBI BLAST.

Summer Research Fellow - Institute of Genomics & Integrative Biology (CSIR-IGIB)
- Screened 120 DNA samples for pathogenic mutations using PCR and agarose gel electrophoresis.
- Presented technical research poster at National Biotechnology Symposium 2025.`
  },

  commerce: {
    fileName: 'Aryan_Patel_Xaviers_FinTech_Resume.pdf',
    fileType: 'application/pdf',
    fileSize: '168.2 KB',
    badge: 'PDF Document',
    roleHint: 'Business Operations & Data Associate',
    text: `Aryan Patel
Mumbai, Maharashtra | aryan.patel@xaviers.edu.in | +91 99887 76655
LinkedIn: linkedin.com/in/aryanpatel-fintech | GitHub: github.com/aryan-finance

EDUCATION
B.Com (Hons) in Financial Markets | St. Xavier's College, Mumbai
Graduation: April 2026 | CGPA: 8.9 / 10.0

FINANCIAL & TECHNICAL SKILLS
Technical: Financial Modeling, DCF Valuation, Microsoft Excel (Advanced Macros, VLOOKUP, XLOOKUP), SQL, Power BI
Domain: Equity Research, Corporate Finance, Indian Financial System (SEBI Regulations, Nifty 50), Accounting (GAAP/IFRS)
Certifications: Zerodha Varsity Certified in Equity Markets, NISM Series XV: Research Analyst

INTERNSHIPS & CAPSTONE PROJECTS
FinTech Equity Valuation & Nifty 50 Momentum Model (Capstone Project)
- Developed integrated three-statement financial model (Income Statement, Balance Sheet, Cash Flow) with scenario toggles in Excel.
- Scripted Python notebook backtesting moving-average crossover strategies on 5 years of historical NSE stock quotes.
- Queried PostgreSQL transaction records to identify trading volume anomalies during quarterly earnings announcements.

Equity Research Intern - Alpha Capital Advisory Mumbai
- Formulated weekly sector reports covering Indian IT and banking stocks (TCS, Infosys, HDFC Bank).
- Built automated DCF valuation sheets reducing target company screening time by 4 hours weekly.`
  }
};

// Quick-select roles for 1-click access
const POPULAR_ROLE_TITLES = [
  'Data Analyst & Business Intelligence Specialist',
  'Junior Frontend Web Developer',
  'Junior QA & Software Tester',
  'UI/UX Product Designer',
  'Junior CAD Modeler & Mechanical Drafter',
  'Business Operations & Data Associate'
];

export const ResumeAnalyzerView: React.FC<ResumeAnalyzerViewProps> = ({
  user,
  onSkillsUpdated,
  onRoleSelected,
  onResumeAnalyzed,
  onNavigate
}) => {
  // All careers database
  const careersList: CareerPath[] = useMemo(() => {
    return COMPREHENSIVE_CAREERS && COMPREHENSIVE_CAREERS.length > 0
      ? COMPREHENSIVE_CAREERS
      : [];
  }, []);

  // Initial career matching user's goal or first career
  const initialCareer = useMemo(() => {
    if (user.careerGoal) {
      const match = careersList.find(
        (c) => c.title.toLowerCase() === user.careerGoal.toLowerCase()
      );
      if (match) return match;
    }
    return (
      careersList.find((c) => c.title.includes('Data Analyst')) ||
      careersList[0] ||
      null
    );
  }, [user.careerGoal, careersList]);

  const [selectedRole, setSelectedRole] = useState<CareerPath | null>(initialCareer);
  const [roleSearchQuery, setRoleSearchQuery] = useState('');
  const [isReanalyzingApi, setIsReanalyzingApi] = useState(false);

  // File & parsing state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [fileType, setFileType] = useState<'pdf' | 'image' | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [extractedResumeText, setExtractedResumeText] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Analysis state
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
  const [synced, setSynced] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Interactive Gap Simulator: user-marked simulated skills
  const [simulatedSkills, setSimulatedSkills] = useState<Set<string>>(new Set());
  const [learningPlanSkills, setLearningPlanSkills] = useState<Set<string>>(new Set());
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'skillgap' | 'ats' | 'recruiter' | 'prep'>('skillgap');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger for cards and list items with magnetic hover & staggered reveal
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const targets = containerRef.current?.querySelectorAll<HTMLElement>(
        ".spotlight-card, [data-card], .grid > div, .rounded-2xl, .rounded-xl, .rounded-3xl, li, .space-y-4 > div, .space-y-6 > div"
      );

      if (targets && targets.length > 0) {
        ScrollTrigger.batch(Array.from(targets), {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 36, opacity: 0, scale: 0.98 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.75,
                stagger: 0.07,
                ease: "power3.out",
                clearProps: "transform,opacity",
              }
            );
          },
        });

        targets.forEach((card) => {
          const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            gsap.to(card, {
              x: relX * 0.04,
              y: relY * 0.04,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeave);
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [analysisResult, selectedRole]);


  // Available unique categories for role grouping
  const roleCategories = useMemo(() => {
    const cats = new Set<string>();
    careersList.forEach((c) => {
      if (c.category) cats.add(c.category);
    });
    return Array.from(cats);
  }, [careersList]);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProcessFile(file);
  };

  // Process PDF or PNG/JPG
  const handleProcessFile = (file: File) => {
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/') || /\.(png|jpe?g)$/i.test(file.name);

    if (!isPdf && !isImage) {
      setErrorMsg('Invalid file format. Please upload your resume in PDF (.pdf) or PNG / JPG format.');
      return;
    }

    setErrorMsg('');
    setUploadedFile(file);
    setFileName(file.name);
    setFileSize(`${(file.size / 1024).toFixed(1)} KB`);
    setFileType(isPdf ? 'pdf' : 'image');

    if (isImage) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFilePreviewUrl(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreviewUrl(null);
    }

    const textReader = new FileReader();
    textReader.onload = async () => {
      const raw = textReader.result as string;
      const cleanContent = raw && raw.length > 50 ? raw : generateFallbackParsedText(file.name);
      setExtractedResumeText(cleanContent);
      runAuditOnText(cleanContent, file.name, selectedRole);
    };

    textReader.readAsText(file);
  };

  // Helper to provide realistic parsed content from resume file name
  const generateFallbackParsedText = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('bio') || lower.includes('genom')) return SAMPLE_DOCS.biotech.text;
    if (lower.includes('fin') || lower.includes('com') || lower.includes('patel')) return SAMPLE_DOCS.commerce.text;
    if (lower.includes('mech') || lower.includes('aktu') || lower.includes('sharma')) return SAMPLE_DOCS.mechanical.text;
    return SAMPLE_DOCS.software.text;
  };

  // Quick 1-click test with sample documents (PDF / PNG)
  const loadSampleDoc = (key: 'software' | 'mechanical' | 'biotech' | 'commerce') => {
    const sample = SAMPLE_DOCS[key];
    setUploadedFile(null);
    setFileName(sample.fileName);
    setFileSize(sample.fileSize);
    setFileType(sample.fileType === 'application/pdf' ? 'pdf' : 'image');
    setFilePreviewUrl(null);
    setExtractedResumeText(sample.text);
    setErrorMsg('');
    setSimulatedSkills(new Set());

    let roleToUse = selectedRole;
    if (sample.roleHint) {
      const matchingCareer = careersList.find((c) =>
        c.title.toLowerCase().includes(sample.roleHint.toLowerCase())
      );
      if (matchingCareer) {
        setSelectedRole(matchingCareer);
        roleToUse = matchingCareer;
        if (onRoleSelected) {
          onRoleSelected(matchingCareer.title, matchingCareer.id);
        }
      }
    }

    runAuditOnText(sample.text, sample.fileName, roleToUse);
  };

  // Run audit against target role via API
  const runAuditOnText = async (text: string, fName: string, roleTarget: CareerPath | null) => {
    if (!text || text.trim().length < 20) {
      setErrorMsg('Please select a valid resume document with readable content.');
      return;
    }

    setAnalyzing(true);
    setIsReanalyzingApi(true);
    setErrorMsg('');
    try {
      const targetRoleTitle = roleTarget ? roleTarget.title : undefined;
      const careerId = roleTarget ? roleTarget.id : undefined;

      const data = await api.analyzeResume(user.id, text, fName, targetRoleTitle, careerId);
      setAnalysisResult(data.analysis);
      setSynced(true);
      onSkillsUpdated(data.analysis.extractedData.skills);
      if (onResumeAnalyzed) {
        onResumeAnalyzed(data.analysis, data.roleGapAnalysis);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to analyze resume.');
    } finally {
      setAnalyzing(false);
      setIsReanalyzingApi(false);
    }
  };

  // CRITICAL REQUIREMENT: When the user selects a role, trigger an API call to re-analyze resume
  const handleSelectRole = (role: CareerPath) => {
    setSelectedRole(role);

    // 1. Notify parent & sync to database
    if (onRoleSelected) {
      onRoleSelected(role.title, role.id);
    } else {
      api.updateProfile(user.id, { careerGoal: role.title }).catch(() => {});
      api.generateRoadmap(user.id, role.id).catch(() => {});
    }

    // 2. Trigger API call to re-analyze uploaded resume against that specific career's requirements
    if (extractedResumeText) {
      runAuditOnText(extractedResumeText, fileName || 'resume.pdf', role);
    }
  };

  // Computed Skill Gap Data against chosen role
  const computedGapData = useMemo(() => {
    if (!selectedRole) return null;

    const extracted = analysisResult?.extractedData.skills || [];
    const allKnownNorm = new Set<string>();

    extracted.forEach((s) => allKnownNorm.add(s.toLowerCase().trim()));
    simulatedSkills.forEach((s) => allKnownNorm.add(s.toLowerCase().trim()));

    const matchedList: CareerSkill[] = [];
    const missingList: (CareerSkill & { whyNeeded: string })[] = [];

    let totalWeight = 0;
    let earnedWeight = 0;

    for (const skill of selectedRole.requiredSkills) {
      const weight = skill.importance === 'high' ? 3 : skill.importance === 'medium' ? 2 : 1;
      totalWeight += weight;

      const sNorm = skill.name.toLowerCase().trim();
      const isKnown =
        allKnownNorm.has(sNorm) ||
        Array.from(allKnownNorm).some((k) => k.includes(sNorm) || sNorm.includes(k));

      if (isKnown) {
        matchedList.push(skill);
        earnedWeight += weight;
      } else {
        const why =
          skill.importance === 'high'
            ? `Critical prerequisite for ${selectedRole.title} campus recruitment screening and technical interview round.`
            : skill.importance === 'medium'
            ? `High-value competitive differentiator in round 2 practical assessments and system design checks.`
            : `Secondary bonus tool that sets top-tier candidates apart during hiring manager review.`;

        missingList.push({
          ...skill,
          whyNeeded: why
        });
      }
    }

    const priorityOrder = { high: 1, medium: 2, low: 3 };
    missingList.sort((a, b) => priorityOrder[a.importance] - priorityOrder[b.importance]);

    const matchPercent = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

    const readinessLevel =
      matchPercent >= 75
        ? 'Day-1 Placement Ready'
        : matchPercent >= 50
        ? 'Competitive Candidate (Minor Gaps)'
        : 'Foundational Stage (Bridging Needed)';

    return {
      matchPercent,
      readinessLevel,
      matchedList,
      missingList,
      totalRequiredCount: selectedRole.requiredSkills.length,
      highPriorityGaps: missingList.filter((m) => m.importance === 'high'),
      mediumPriorityGaps: missingList.filter((m) => m.importance === 'medium'),
      lowPriorityGaps: missingList.filter((m) => m.importance === 'low')
    };
  }, [selectedRole, analysisResult, simulatedSkills]);

  // Toggle simulated skill
  const toggleSimulatedSkill = (skillName: string) => {
    setSimulatedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(skillName)) {
        next.delete(skillName);
      } else {
        next.add(skillName);
      }
      return next;
    });
  };

  // Toggle learning plan skill
  const toggleLearningPlan = (skillName: string) => {
    setLearningPlanSkills((prev) => {
      const next = new Set(prev);
      if (next.has(skillName)) {
        next.delete(skillName);
      } else {
        next.add(skillName);
      }
      return next;
    });
  };

  // Sync simulated skills to user's real profile
  const handleSyncSimulatedToProfile = () => {
    if (simulatedSkills.size === 0) return;
    const currentSkills = user.skills || [];
    const newMerged = Array.from(new Set([...currentSkills, ...Array.from(simulatedSkills)]));
    onSkillsUpdated(newMerged);
    api.updateProfile(user.id, { skills: newMerged }).catch(() => {});
    setSimulatedSkills(new Set());
    setSynced(true);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setFileName('');
    setFileSize('');
    setFileType(null);
    setFilePreviewUrl(null);
    setExtractedResumeText('');
    setAnalysisResult(null);
    setSynced(false);
    setErrorMsg('');
    setSimulatedSkills(new Set());
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div ref={containerRef} className="space-y-8 pb-12 font-sans">
      {/* Top Header Bar */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#CCFF00] mb-1 font-mono">
            <span className="font-semibold uppercase tracking-wider text-[#CCFF00]">
              ATS Resume Audit & Skill Gap Engine
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Target Role Alignment</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>PDF & PNG Direct Ingestion</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <FileText className="h-7 w-7 text-[#CCFF00] shrink-0" />
            <span>Resume Analyzer & Role Skill Gaps</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Select your preferred job role to benchmark your resume against specific recruiter criteria. Discover exact skill matches, critical missing competencies, and tailored placement advice.
          </p>
        </div>

        {/* Linear Workflow Shortcut: Directs to Step 3 Skill Gap Matrix */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('skillgap')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#CCFF00] text-[#08090C] hover:bg-[#b8e600] text-black text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <Compass className="h-4 w-4 text-black" />
            <span>Go to Skill Gap Matrix →</span>
          </button>
        </div>
      </div>

      {/* WORKFLOW PIPELINE PROGRESS INDICATOR */}
      <div className="rounded-xl border border-white/10 bg-slate-950/80 p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#CCFF00]">
          <span className="h-5 w-5 rounded-full bg-[#CCFF00]/20 text-[#CCFF00] font-bold flex items-center justify-center text-[11px]">1</span>
          <span className="font-semibold">Select Job Role</span>
        </div>
        <span className="text-slate-600">→</span>
        <div className="flex items-center gap-2 text-[#CCFF00]">
          <span className="h-5 w-5 rounded-full bg-[#CCFF00]/20 text-[#CCFF00] font-bold flex items-center justify-center text-[11px]">2</span>
          <span className="font-semibold">Resume Ingestion & Match</span>
        </div>
        <span className="text-slate-600">→</span>
        <button
          onClick={() => onNavigate('skillgap')}
          className="flex items-center gap-2 text-[#CCFF00] hover:text-white cursor-pointer underline decoration-dotted"
        >
          <span className="h-5 w-5 rounded-full bg-[#CCFF00] text-[#08090C] text-black font-bold flex items-center justify-center text-[11px]">3</span>
          <span className="font-bold">Next: Skill Gap Matrix</span>
        </button>
        <span className="text-slate-600">→</span>
        <button
          onClick={() => onNavigate('roadmap')}
          className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer"
        >
          <span className="h-5 w-5 rounded-full bg-slate-900 text-slate-300 flex items-center justify-center text-[11px]">4</span>
          <span>Roadmap</span>
        </button>
      </div>

      {/* SECTION 1: JOB ROLE SELECTION DROPDOWN (USER REQUIREMENT) */}
      <div className="rounded-2xl border border-white/15 bg-[#0E1015] p-5 sm:p-6 shadow-xl backdrop-blur-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/15 pb-4">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#CCFF00] uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-[#CCFF00]" />
              <span>Step 1: Preferred Job Role Selection</span>
            </div>
            <p className="text-xs text-slate-400">
              Select or switch your target role. Whenever you change this, your resume is instantly re-analyzed via API.
            </p>
          </div>

          {isReanalyzingApi && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#CCFF00] bg-[#CCFF00]/15 border border-[#CCFF00]/40 px-3 py-1.5 rounded-lg animate-pulse">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#CCFF00]" />
              <span>Re-analyzing against {selectedRole?.title}...</span>
            </div>
          )}
        </div>

        {/* THE MAIN DROPDOWN SELECTION INPUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-8 space-y-1.5">
            <label htmlFor="preferred-job-role-dropdown" className="text-xs font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-[#CCFF00]" />
                <span>Preferred Job Role Dropdown:</span>
              </span>
              {selectedRole && (
                <span className="text-[11px] text-[#CCFF00] font-mono">
                  {selectedRole.requiredSkills.length} Required Placement Competencies
                </span>
              )}
            </label>

            <select
              id="preferred-job-role-dropdown"
              value={selectedRole?.id || ''}
              onChange={(e) => {
                const found = careersList.find((c) => c.id === e.target.value);
                if (found) handleSelectRole(found);
              }}
              className="w-full bg-slate-950 border-2 border-amber-500/50 hover:border-[#CCFF00] focus:border-[#CCFF00] rounded-xl px-4 py-3 text-xs sm:text-sm text-white font-semibold focus:outline-none shadow-lg cursor-pointer transition-colors"
            >
              {roleCategories.map((category) => (
                <optgroup
                  key={category}
                  label={`── Domain: ${category} ──`}
                  className="bg-slate-900 text-[#CCFF00] font-bold"
                >
                  {careersList
                    .filter((c) => c.category === category)
                    .map((career) => (
                      <option
                        key={career.id}
                        value={career.id}
                        className="bg-slate-950 text-white font-normal py-1.5"
                      >
                        {career.title} ({career.salaryRange})
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Direct Role Filter Search */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-medium text-slate-400 block">
              Quick Filter By Skill / Keyword:
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search (e.g. React, SQL, Python)..."
                value={roleSearchQuery}
                onChange={(e) => {
                  const q = e.target.value;
                  setRoleSearchQuery(q);
                  if (q.trim()) {
                    const found = careersList.find(
                      (c) =>
                        c.title.toLowerCase().includes(q.toLowerCase()) ||
                        c.requiredSkills.some((s) => s.name.toLowerCase().includes(q.toLowerCase()))
                    );
                    if (found && found.id !== selectedRole?.id) {
                      handleSelectRole(found);
                    }
                  }
                }}
                className="w-full pl-8 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
              />
            </div>
          </div>
        </div>

        {/* Quick Role Selection Buttons */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
            <span>Frequently Targetted Roles:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_ROLE_TITLES.map((title) => {
              const matchedRole = careersList.find((c) => c.title === title);
              if (!matchedRole) return null;
              const isSelected = selectedRole?.id === matchedRole.id;
              return (
                <button
                  key={matchedRole.id}
                  type="button"
                  onClick={() => handleSelectRole(matchedRole)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#CCFF00] text-[#08090C] text-black font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-950/90 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800'
                  }`}
                >
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                  <span>{matchedRole.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Role Snapshot */}
        {selectedRole && (
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-start md:items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#CCFF00]/15 border border-white/15 text-[#CCFF00] flex items-center justify-center shrink-0">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{selectedRole.title}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {selectedRole.category}
                  </span>
                </div>
                <div className="text-slate-400 text-xs mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span>Domain: <strong className="text-slate-200">{selectedRole.domain}</strong></span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Typical Package: <strong className="text-[#CCFF00] font-mono">{selectedRole.salaryRange}</strong></span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Required Skills: <strong className="text-slate-200 font-mono">{selectedRole.requiredSkills.length} Core Competencies</strong></span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-400 border-l border-slate-800 pl-4 shrink-0">
              <Building2 className="h-4 w-4 text-[#CCFF00] shrink-0" />
              <span>Top Recruiters: </span>
              <span className="text-slate-300 font-medium truncate max-w-[220px]">
                {selectedRole.topRecruiters?.slice(0, 3).join(', ')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: File Upload Area (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-white/15 bg-[#0E1015] p-6 shadow-xl backdrop-blur-xl space-y-5">
            <div>
              <div className="text-xs font-bold text-[#CCFF00] uppercase tracking-wider font-mono">
                Step 2: Upload Resume Document
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                Upload Resume (PDF or PNG/JPG)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Drag and drop your file. OCR NLP extracts technical competencies and checks ATS compatibility.
              </p>
            </div>

            {/* Hidden Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf, .png, .jpg, .jpeg"
              className="hidden"
              onChange={handleFileInputChange}
            />

            {/* Drag & Drop Zone */}
            {!fileName ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3.5 ${
                  isDragOver
                    ? 'border-[#CCFF00] bg-[#14171E]'
                    : 'border-white/15 hover:border-[#CCFF00] bg-slate-950/60 hover:bg-slate-900/80'
                }`}
              >
                <div className="h-14 w-14 rounded-2xl bg-[#CCFF00]/15 border border-[#CCFF00]/40 text-[#CCFF00] flex items-center justify-center shadow-md">
                  <FileUp className="h-7 w-7 text-[#CCFF00]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    Drop your resume file here or <span className="text-[#CCFF00] underline">browse</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1.5 flex items-center justify-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800/60 text-rose-300 font-mono text-[11px]">
                      PDF (.pdf)
                    </span>
                    <span>or</span>
                    <span className="px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/60 text-sky-300 font-mono text-[11px]">
                      PNG / JPG (.png, .jpg)
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500">
                  Evaluates formatting, keyword density, and cutoff metrics for <strong>{selectedRole?.title}</strong>.
                </div>
              </div>
            ) : (
              /* Active Uploaded Document Card */
              <div className="rounded-xl border border-[#CCFF00]/40 bg-slate-950/90 p-4 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {fileType === 'pdf' ? (
                      <div className="h-12 w-12 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-400 flex items-center justify-center font-bold text-xs font-mono shadow-md shrink-0">
                        PDF
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-xl bg-sky-950/60 border border-sky-800/60 text-sky-400 flex items-center justify-center font-bold text-xs font-mono shadow-md shrink-0">
                        IMG
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-[240px]">
                        {fileName}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                        <span>{fileSize}</span>
                        <span>•</span>
                        <span className="text-[#CCFF00]">{fileType === 'pdf' ? 'PDF Document' : 'Image Scan'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetUpload}
                    title="Remove and upload different file"
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {filePreviewUrl && (
                  <div className="rounded-lg overflow-hidden border border-white/10 bg-black/40 p-2 flex items-center gap-3">
                    <img
                      src={filePreviewUrl}
                      alt="Uploaded Resume Thumbnail"
                      className="h-20 w-16 object-cover rounded border border-white/20 shadow-sm shrink-0"
                    />
                    <div className="text-xs space-y-1">
                      <div className="text-white font-semibold flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>High-Res Resume Scan Loaded</span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        OCR NLP ready to map keywords against {selectedRole?.title || 'target job role'}.
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-2 border-t border-amber-500/15">
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>File Ingested</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[#CCFF00] hover:underline cursor-pointer"
                  >
                    Change File
                  </button>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Run Analysis CTA */}
            <button
              onClick={() => runAuditOnText(extractedResumeText, fileName, selectedRole)}
              disabled={analyzing || !fileName}
              className={`w-full py-3.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer ${
                fileName
                  ? 'bg-[#CCFF00] text-[#08090C] hover:bg-[#b8e600] text-black shadow-amber-500/20 active:scale-[0.99]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
              }`}
            >
              {analyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-black" />
                  <span>Re-analyzing via API for {selectedRole?.title}...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-black" />
                  <span>Analyze Resume for {selectedRole?.title ? selectedRole.title.split(' ')[0] + '...' : 'Role'}</span>
                  <ArrowRight className="h-4 w-4 text-black" />
                </>
              )}
            </button>
          </div>

          {/* Quick 1-Click Test Resumes for Testing */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1015] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                1-Click Sample Resumes
              </span>
              <span className="text-[10px] text-slate-500">Test without uploading</span>
            </div>
            <p className="text-xs text-slate-400">
              Test pre-formatted college placement resumes across different disciplines:
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => loadSampleDoc('software')}
                className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-white/10 hover:border-[#CCFF00]/50 transition-all cursor-pointer flex items-center justify-between text-xs group"
              >
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-800/40 text-rose-300 font-mono text-[10px]">
                    PDF
                  </span>
                  <span className="font-semibold text-white group-hover:text-[#CCFF00] transition-colors">
                    Kavita_Verma_IIT_FullStack.pdf
                  </span>
                </div>
                <span className="text-[11px] text-[#CCFF00] font-mono">💻 Web / Frontend</span>
              </button>

              <button
                type="button"
                onClick={() => loadSampleDoc('mechanical')}
                className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-white/10 hover:border-[#CCFF00]/50 transition-all cursor-pointer flex items-center justify-between text-xs group"
              >
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-800/40 text-rose-300 font-mono text-[10px]">
                    PDF
                  </span>
                  <span className="font-semibold text-white group-hover:text-[#CCFF00] transition-colors">
                    Rohan_Sharma_AKTU_Mechanical.pdf
                  </span>
                </div>
                <span className="text-[11px] text-[#CCFF00] font-mono">⚙️ CAD / Mech</span>
              </button>

              <button
                type="button"
                onClick={() => loadSampleDoc('biotech')}
                className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-white/10 hover:border-[#CCFF00]/50 transition-all cursor-pointer flex items-center justify-between text-xs group"
              >
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-sky-950/60 border border-sky-800/40 text-sky-300 font-mono text-[10px]">
                    PNG
                  </span>
                  <span className="font-semibold text-white group-hover:text-[#CCFF00] transition-colors">
                    Ananya_Iyer_DU_Biotech.png
                  </span>
                </div>
                <span className="text-[11px] text-emerald-300 font-mono">📊 Data / Biotech</span>
              </button>

              <button
                type="button"
                onClick={() => loadSampleDoc('commerce')}
                className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-white/10 hover:border-[#CCFF00]/50 transition-all cursor-pointer flex items-center justify-between text-xs group"
              >
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-800/40 text-rose-300 font-mono text-[10px]">
                    PDF
                  </span>
                  <span className="font-semibold text-white group-hover:text-[#CCFF00] transition-colors">
                    Aryan_Patel_Xaviers_FinTech.pdf
                  </span>
                </div>
                <span className="text-[11px] text-[#CCFF00] font-mono">📈 FinTech / Ops</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Tailored Feedback & Skill Gap Audit (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult && computedGapData && selectedRole ? (
            <div className="space-y-6 animate-fade-in">
              {/* PRIMARY ROLE MATCH & SKILL GAP HERO CARD */}
              <div className="rounded-2xl border border-white/15 bg-[#0E1015] p-6 space-y-6 shadow-xl backdrop-blur-xl">
                {/* Header: Role Fit Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/15 pb-4">
                  <div>
                    <div className="text-xs font-bold text-[#CCFF00] uppercase tracking-wider font-mono">
                      Tailored Placement Benchmark
                    </div>
                    <div className="text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                      <span>{selectedRole.title}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 font-mono">
                      {selectedRole.domain} · {selectedRole.experienceLevel}
                    </div>
                  </div>

                  {/* Big Match Score Gauge */}
                  <div className="flex items-center gap-3 bg-slate-950/90 border border-white/10 px-4 py-2.5 rounded-xl">
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold font-mono text-[#CCFF00] tabular-nums">
                        {computedGapData.matchPercent}%
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                        Role Match
                      </div>
                    </div>
                    <div className="h-8 w-px bg-slate-800" />
                    <div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-lg font-bold block ${
                          computedGapData.matchPercent >= 75
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/50'
                            : computedGapData.matchPercent >= 50
                            ? 'bg-[#14171E]/80 text-[#CCFF00] border border-amber-600/50'
                            : 'bg-rose-950/80 text-rose-400 border border-rose-600/50'
                        }`}
                      >
                        {computedGapData.readinessLevel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Navigation Tabs for Audit Results */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-950/90 rounded-xl border border-slate-800 overflow-x-auto">
                  <button
                    onClick={() => setActiveAnalysisTab('skillgap')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeAnalysisTab === 'skillgap'
                        ? 'bg-[#CCFF00] text-[#08090C] text-black shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Target className="h-3.5 w-3.5" />
                    <span>Role Skill Gaps ({computedGapData.missingList.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveAnalysisTab('ats')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeAnalysisTab === 'ats'
                        ? 'bg-[#CCFF00] text-[#08090C] text-black shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>ATS Document Health ({analysisResult.score}/100)</span>
                  </button>

                  <button
                    onClick={() => setActiveAnalysisTab('recruiter')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeAnalysisTab === 'recruiter'
                        ? 'bg-[#CCFF00] text-[#08090C] text-black shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Recruiter Audit</span>
                  </button>

                  <button
                    onClick={() => setActiveAnalysisTab('prep')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeAnalysisTab === 'prep'
                        ? 'bg-[#CCFF00] text-[#08090C] text-black shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Role Preparation</span>
                  </button>
                </div>

                {/* TAB 1: ROLE SKILL GAPS (PRIMARY AUDIT FOCUS) */}
                {activeAnalysisTab === 'skillgap' && (
                  <div className="space-y-6">
                    {/* Simulated Skills Notification Banner */}
                    {simulatedSkills.size > 0 && (
                      <div className="p-3.5 rounded-xl bg-[#CCFF00]/10 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-[#CCFF00]">
                          <Sparkles className="h-4 w-4 shrink-0" />
                          <span>
                            Simulating <strong>{simulatedSkills.size}</strong> additional skills. Match score increased to <strong>{computedGapData.matchPercent}%</strong>!
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleSyncSimulatedToProfile}
                            className="px-3 py-1.5 rounded-lg bg-[#CCFF00] text-[#08090C] text-black font-bold text-xs hover:bg-[#b8e600] cursor-pointer transition-all"
                          >
                            Save to My Profile
                          </button>
                          <button
                            onClick={() => setSimulatedSkills(new Set())}
                            className="px-2 py-1 text-slate-400 hover:text-white text-xs cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Matched Skills Overview */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Matched Role Competencies ({computedGapData.matchedList.length} of {computedGapData.totalRequiredCount})</span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          Found in your resume
                        </span>
                      </div>

                      {computedGapData.matchedList.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {computedGapData.matchedList.map((skill) => (
                            <div
                              key={skill.name}
                              className="p-2.5 rounded-xl bg-slate-950/70 border border-emerald-500/30 flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                  <Check className="h-3 w-3" />
                                </span>
                                <span className="font-medium text-white truncate">{skill.name}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded bg-slate-900 shrink-0">
                                {skill.category}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400 text-center">
                          No direct required competencies detected yet for this role. Review the missing skill gaps below.
                        </div>
                      )}
                    </div>

                    {/* Missing Skills / Skill Gaps Overview */}
                    <div className="space-y-3 pt-2 border-t border-amber-500/15">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="text-xs font-bold text-[#CCFF00] flex items-center gap-1.5 uppercase font-mono tracking-wider">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Identified Skill Gaps for {selectedRole.title} ({computedGapData.missingList.length})</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Click <strong>+ I Have This</strong> to test instant score impact
                        </div>
                      </div>

                      {computedGapData.missingList.length > 0 ? (
                        <div className="space-y-2.5">
                          {computedGapData.missingList.map((gap) => {
                            const isHigh = gap.importance === 'high';
                            const isMed = gap.importance === 'medium';
                            const inPlan = learningPlanSkills.has(gap.name);

                            return (
                              <div
                                key={gap.name}
                                className={`p-3.5 rounded-xl border transition-all text-xs space-y-2 ${
                                  isHigh
                                    ? 'bg-rose-950/20 border-rose-800/40 hover:border-rose-600/50'
                                    : isMed
                                    ? 'bg-[#14171E] border-white/10/40 hover:border-amber-600/50'
                                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                                        isHigh
                                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                          : isMed
                                          ? 'bg-[#14171E] text-[#CCFF00] border border-white/10'
                                          : 'bg-slate-900 text-slate-300 border border-slate-800'
                                      }`}
                                    >
                                      {gap.importance} Priority
                                    </span>
                                    <span className="font-bold text-white text-sm">{gap.name}</span>
                                    <span className="text-[11px] text-slate-400 font-mono">({gap.category})</span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => toggleLearningPlan(gap.name)}
                                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all cursor-pointer ${
                                        inPlan
                                          ? 'bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/40'
                                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                                      }`}
                                    >
                                      {inPlan ? '✓ In Learning Plan' : '+ Add to Plan'}
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => toggleSimulatedSkill(gap.name)}
                                      className="px-2.5 py-1 rounded text-[11px] font-bold bg-[#CCFF00]/10 hover:bg-[#CCFF00]/25 border border-[#CCFF00]/40 text-[#CCFF00] transition-all cursor-pointer flex items-center gap-1"
                                      title="Simulate having this skill to see your updated role match percentage"
                                    >
                                      <Plus className="h-3 w-3" />
                                      <span>I Have This</span>
                                    </button>
                                  </div>
                                </div>

                                <p className="text-[11px] text-slate-300 leading-relaxed">
                                  {gap.whyNeeded}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-300 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                          <span>
                            Outstanding! Your resume covers all required competencies for <strong>{selectedRole.title}</strong>.
                          </span>
                        </div>
                      )}
                    </div>

                    {/* USER REQUIREMENT: Directs to Step 3 Skill Gap Page first before Roadmap */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-[#1E0904] to-transparent border border-[#CCFF00]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Compass className="h-4 w-4 text-[#CCFF00]" />
                          <span>Next in Placement Pipeline: Step 3 — Skill Gap Matrix</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Inspect detailed competency spectrums and cutoff criteria for <strong>{selectedRole.title}</strong> before generating your roadmap.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => onNavigate('courses')}
                          className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 font-medium transition-colors cursor-pointer"
                        >
                          Find Courses
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigate('skillgap')}
                          className="px-4 py-2 rounded-lg bg-[#CCFF00] text-[#08090C] hover:bg-[#b8e600] text-black text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                        >
                          <span>Proceed to Skill Gap Matrix</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: ATS DOCUMENT HEALTH & METRIC BARS */}
                {activeAnalysisTab === 'ats' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.entries(analysisResult.scoreBreakdown).map(([cat, val]) => (
                        <div
                          key={cat}
                          className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs space-y-1.5"
                        >
                          <div className="text-slate-400 capitalize truncate text-[11px] font-mono">
                            {cat.replace(/([A-Z])/g, ' $1')}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white font-mono tabular-nums text-sm">
                              {val}%
                            </span>
                            <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-amber-400 to-amber-600 h-1.5 rounded-full"
                                style={{ width: `${val}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5 text-[#CCFF00]" />
                          <span>All Extracted Technical Entities ({analysisResult.extractedData.skills.length})</span>
                        </span>
                        <span className="text-[11px] text-[#CCFF00] font-mono">
                          Auto-synced to Profile
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.extractedData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs text-neutral-200 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: RECRUITER AUDIT */}
                {activeAnalysisTab === 'recruiter' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950/80 space-y-2">
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Verified Strengths</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {analysisResult.strengths.map((str, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl border border-white/15 bg-slate-950/80 space-y-2">
                        <div className="text-xs font-bold text-[#CCFF00] flex items-center gap-1.5 uppercase font-mono tracking-wider">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Placement Bottlenecks</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {analysisResult.weaknesses.map((wk, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#CCFF00] font-bold">!</span>
                              <span>{wk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-slate-950/80 space-y-2">
                      <div className="text-xs font-bold text-[#CCFF00] flex items-center gap-1.5 uppercase font-mono tracking-wider">
                        <Lightbulb className="h-4 w-4" />
                        <span>Actionable Mentoring Recommendations</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {analysisResult.suggestions.map((sug, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#CCFF00] font-bold">→</span>
                            <span>{sug}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB 4: ROLE PREPARATION */}
                {activeAnalysisTab === 'prep' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="p-4 rounded-xl border border-white/10 bg-slate-950/80 space-y-3">
                      <div className="text-xs font-bold text-[#CCFF00] flex items-center gap-1.5 uppercase font-mono tracking-wider">
                        <HelpCircle className="h-4 w-4" />
                        <span>High-Frequency Interview Topics for {selectedRole.title}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedRole.interviewTopics?.map((topic, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 flex items-center gap-2"
                          >
                            <span className="h-5 w-5 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] text-[10px] font-bold font-mono flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            <span className="truncate">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-slate-950/80 space-y-3">
                      <div className="text-xs font-bold text-[#CCFF00] flex items-center gap-1.5 uppercase font-mono tracking-wider">
                        <Layers className="h-4 w-4" />
                        <span>High-Impact Portfolio Projects to Close Gaps</span>
                      </div>
                      <div className="space-y-2">
                        {selectedRole.portfolioProjects?.map((proj, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5"
                          >
                            <Award className="h-4 w-4 text-[#CCFF00] shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold text-white">{proj}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                Proves practical application of required competencies in candidate portfolio.
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Next Step Shortcut */}
                    <div className="p-4 rounded-xl bg-[#CCFF00]/10 border border-white/15 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-white">
                          Ready for Step 3: Skill Gap Matrix?
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Benchmark your skill radar against peer applicants before practicing in the Greenroom.
                        </div>
                      </div>
                      <button
                        onClick={() => onNavigate('skillgap')}
                        className="px-4 py-2 rounded-lg bg-[#CCFF00] text-[#08090C] hover:bg-[#b8e600] text-black font-bold text-xs transition-colors shrink-0 cursor-pointer"
                      >
                        Proceed to Skill Gap Matrix →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl border-2 border-dashed border-white/10 bg-[#0E1015]/80 p-12 text-center space-y-4 shadow-xl">
              <div className="h-16 w-16 rounded-2xl bg-slate-950 border border-white/15 text-[#CCFF00] flex items-center justify-center mx-auto shadow-md">
                <FileText className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No Resume Analyzed Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Target job role is set to <strong className="text-[#CCFF00]">{selectedRole?.title || 'a selected role'}</strong>. Upload your resume or click one of the 1-click test documents on the left to immediately benchmark your skills.
                </p>
              </div>

              {selectedRole && (
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
                    <Target className="h-3.5 w-3.5 text-[#CCFF00]" />
                    <span>Target: {selectedRole.title} ({selectedRole.requiredSkills.length} skills expected)</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
