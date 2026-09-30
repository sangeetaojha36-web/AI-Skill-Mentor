import React, { useState } from 'react';
import { User, ResumeAnalysis } from '../types.ts';
import { api } from '../services/api.ts';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Award
} from 'lucide-react';

interface ResumeAnalyzerViewProps {
  user: User;
  onSkillsUpdated: (newSkills: string[]) => void;
  onNavigate: (tab: string) => void;
}

const SAMPLE_RESUMES_INDIA = {
  mechanical: `Rohan Sharma
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
- Placement Coordinator for Department Mechanical Engineering (2025-2026).`,

  biotech: `Ananya Iyer
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
- Presented technical research poster at National Biotechnology Symposium 2025.`,

  commerce: `Aryan Patel
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
};

export const ResumeAnalyzerView: React.FC<ResumeAnalyzerViewProps> = ({
  user,
  onSkillsUpdated,
  onNavigate
}) => {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES_INDIA.mechanical);
  const [fileName, setFileName] = useState('Rohan_Sharma_AKTU_Resume.txt');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
  const [synced, setSynced] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRunAnalysis = async () => {
    if (!resumeText.trim()) {
      setErrorMsg('Please enter or paste resume text.');
      return;
    }
    setAnalyzing(true);
    setErrorMsg('');
    try {
      const data = await api.analyzeResume(user.id, resumeText, fileName);
      setAnalysisResult(data.analysis);
      setSynced(true);
      onSkillsUpdated(data.analysis.extractedData.skills);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to analyze resume.');
    } finally {
      setAnalyzing(false);
    }
  };

  const loadSample = (type: 'mechanical' | 'biotech' | 'commerce') => {
    setResumeText(SAMPLE_RESUMES_INDIA[type]);
    setFileName(`${type}_indian_student_resume.txt`);
    setAnalysisResult(null);
    setSynced(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setResumeText(content);
      setAnalysisResult(null);
      setSynced(false);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-orange-400 mb-1">
          <span>Indian Corporate ATS Parser</span>
          <span aria-hidden="true">·</span>
          <span>Placement Cell Benchmark</span>
          <span aria-hidden="true">·</span>
          <span>Single-Page Formatting</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Indian ATS Resume Analyzer & Skill Extractor
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Evaluate your resume against hiring filters used by Indian recruiters (TCS Digital, Flipkart, Infosys, Tata Motors, Biocon). Checks for CGPA clarity, project metrics, and technical keyword density.
        </p>
      </div>

      {/* Quick Indian Sample Selector */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 mr-1">Load Indian College Sample:</span>
        <button
          onClick={() => loadSample('mechanical')}
          className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
        >
          ⚙️ AKTU B.Tech Mech Sample
        </button>
        <button
          onClick={() => loadSample('biotech')}
          className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
        >
          🧬 DU B.Sc Biotech Sample
        </button>
        <button
          onClick={() => loadSample('commerce')}
          className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
        >
          📈 Mumbai B.Com FinTech Sample
        </button>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Editor (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-white">
                Resume Text ({fileName})
              </label>
              <label className="cursor-pointer text-[11px] text-orange-400 hover:text-orange-300 flex items-center gap-1">
                <Upload className="h-3 w-3" />
                <span>Upload TXT/MD</span>
                <input
                  type="file"
                  accept=".txt,.md,.rtf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={18}
              placeholder="Paste plain text resume here..."
              className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs text-slate-200 font-mono focus:border-orange-500 focus:outline-none resize-none leading-relaxed"
            />

            {errorMsg && (
              <div className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/60 p-2 rounded">
                {errorMsg}
              </div>
            )}

            <button
              onClick={handleRunAnalysis}
              disabled={analyzing}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Extracting Skills with NLP...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Run Indian Placement ATS Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Results Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult ? (
            <div className="space-y-6 animate-fade-in">
              {/* ATS Score Header Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                      Campus Placement ATS Compatibility
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-bold text-white font-mono tabular-nums">
                        {analysisResult.score}
                      </span>
                      <span className="text-sm text-slate-400 font-mono">/ 100</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-medium ${
                          analysisResult.score >= 80
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                            : analysisResult.score >= 60
                            ? 'bg-orange-950/60 text-orange-300 border border-orange-800/60'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                        }`}
                      >
                        {analysisResult.score >= 80
                          ? 'Day 1 Placement Ready'
                          : analysisResult.score >= 60
                          ? 'Competitive for Placements'
                          : 'Needs Metric Tuning'}
                      </span>
                    </div>
                  </div>

                  {synced && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded-lg">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{analysisResult.extractedData.skills.length} skills synced to student profile</span>
                    </div>
                  )}
                </div>

                {/* Score Breakdown Bar Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(analysisResult.scoreBreakdown).map(([cat, val]) => (
                    <div
                      key={cat}
                      className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs"
                    >
                      <div className="text-slate-400 capitalize truncate mb-1">
                        {cat.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white font-mono tabular-nums">
                          {val}%
                        </span>
                        <div className="w-16 bg-slate-800 rounded-full h-1 overflow-hidden">
                          <div
                            className="bg-orange-500 h-1 rounded-full"
                            style={{ width: `${val}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extracted Skills Inventory */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-orange-400" />
                    <span>Verified Skill Entities Extracted by NLP</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {analysisResult.extractedData.skills.length} identified
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {analysisResult.extractedData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Indian Recruiter Strengths</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {analysisResult.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">·</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
                  <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Placement Bottlenecks</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {analysisResult.weaknesses.map((wk, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">·</span>
                        <span>{wk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actionable Suggestions */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
                <div className="text-xs font-semibold text-orange-400 flex items-center gap-1.5">
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>Strategic Advice from Placement Mentor</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {analysisResult.suggestions.map((sug, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">→</span>
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onNavigate('careers')}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-sm transition-colors"
                >
                  <span>Explore High-LPA Careers →</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/20 p-12 text-center space-y-3">
              <FileText className="h-8 w-8 text-slate-600 mx-auto" />
              <h3 className="text-sm font-semibold text-white">No Resume Analyzed Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Paste your resume or pick an Indian college student sample on the left, then click "Run Indian Placement ATS Audit".
              </p>
              <button
                onClick={handleRunAnalysis}
                className="px-4 py-2 text-xs font-medium text-orange-300 bg-orange-950/60 hover:bg-orange-900/60 border border-orange-800/60 rounded-lg transition-colors"
              >
                Audit Selected Resume Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
