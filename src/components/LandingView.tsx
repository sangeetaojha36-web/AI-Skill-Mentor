import React, { useState } from 'react';
import { ArrowRight, Sparkles, Target, Award, BrainCircuit, Users, Building2, CheckCircle2 } from 'lucide-react';

interface LandingViewProps {
  onGetStarted: () => void;
  onExploreCareers: () => void;
  onAnalyzeResume: () => void;
}

const DISCIPLINES_INDIA = [
  { name: 'B.Tech Mechanical / Automobile', icon: '⚙️', bridge: 'Data Analytics (₹7-15 LPA) or EV Automation at Tata Motors / Ola' },
  { name: 'B.Sc / B.Tech Biotechnology', icon: '🧬', bridge: 'Bioinformatics & Pharma Data at Biocon / Dr. Reddy\'s (₹6-14 LPA)' },
  { name: 'B.Tech Civil Engineering', icon: '🏗️', bridge: 'BIM & Smart Infrastructure at L&T / Tata Projects (₹5-12 LPA)' },
  { name: 'B.Com / BBA / Economics', icon: '📈', bridge: 'FinTech & Equity Research at Zerodha / Goldman Sachs (₹7-18 LPA)' },
  { name: 'B.Tech ECE / Electrical', icon: '⚡', bridge: 'VLSI & Embedded Firmware at Qualcomm / Texas Instruments (₹8-24 LPA)' },
  { name: 'B.Tech CSE / IT / BCA / MCA', icon: '💻', bridge: 'Full Stack & AI Systems at Flipkart / Razorpay (₹8-28 LPA)' },
];

export const LandingView: React.FC<LandingViewProps> = ({
  onGetStarted,
  onExploreCareers,
  onAnalyzeResume,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState(DISCIPLINES_INDIA[0]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-orange-400">
                <span>India Placement & Career Engine</span>
                <span aria-hidden="true">·</span>
                <span>Tier 1, 2 & 3 College Focus</span>
                <span aria-hidden="true">·</span>
                <span>Non-CS to Tech Bridges</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight text-balance">
                Crack high-package careers from any college & degree.
              </h1>

              <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                Whether you study Mechanical Engineering at a technical university, Biotechnology, or Commerce, AI Skill Mentor bridges your syllabus into in-demand skills, high-scoring ATS resumes, and placements at top product & core enterprises.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onGetStarted}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
                >
                  <span>Launch Student Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={onAnalyzeResume}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Analyze Indian ATS Resume</span>
                </button>
              </div>

              {/* Quantified Metrics */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">₹12.5 LPA</div>
                  <div className="text-xs text-slate-400 mt-0.5">Average Target CTC</div>
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">4,800+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Indian Students Mentored</div>
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">92%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Interview Shortlist Rate</div>
                </div>
              </div>
            </div>

            {/* Interactive Degree-to-Career Bridge Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2 flex items-center justify-between">
                  <span>Indian Degree Transition Matrix</span>
                  <span className="font-mono text-[10px] text-slate-500">2026 Batch Ready</span>
                </div>
                <h3 className="text-sm font-medium text-slate-300 mb-4">
                  Select your current degree to view high-CTC pathways:
                </h3>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {DISCIPLINES_INDIA.map((disc) => {
                    const isSelected = selectedDiscipline.name === disc.name;
                    return (
                      <button
                        key={disc.name}
                        onClick={() => setSelectedDiscipline(disc)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-950/40 text-white font-medium shadow-sm'
                            : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <span className="mr-1.5">{disc.icon}</span>
                        <span className="truncate">{disc.name.split(' ')[1] || disc.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Current Academic Branch</span>
                    <span className="text-white font-medium">{selectedDiscipline.name}</span>
                  </div>
                  <div className="flex items-start justify-between text-xs pt-2 border-t border-slate-800">
                    <span className="text-slate-400">High-Package Transition</span>
                    <span className="text-orange-300 font-medium text-right max-w-[220px]">
                      {selectedDiscipline.bridge}
                    </span>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={onExploreCareers}
                      className="w-full py-2 px-3 text-xs font-medium text-orange-300 bg-orange-900/40 hover:bg-orange-900/60 border border-orange-700/50 rounded-md transition-colors text-center"
                    >
                      Inspect Indian Recruiters & Skill Gap →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Recruiters Bar */}
      <section className="py-8 border-b border-slate-800/80 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span className="font-semibold uppercase text-slate-400 tracking-wider">
              Targeted by Students Placed at:
            </span>
            <div className="flex flex-wrap items-center gap-6 text-slate-300 font-medium">
              <span>Flipkart</span>
              <span>Tata Motors</span>
              <span>Biocon</span>
              <span>Swiggy</span>
              <span>L&T Construction</span>
              <span>TCS Digital</span>
              <span>Razorpay</span>
              <span>Goldman Sachs Bengaluru</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="py-20 border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Built for the Realities of Indian Campus & Off-Campus Hiring
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Solve the exact problems Indian students face when transitioning from college theory to industry offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
              <div className="h-10 w-10 rounded-lg bg-orange-950 border border-orange-800/60 flex items-center justify-center text-orange-400">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white">NLP Resume & Keyword Tuning</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Scan your resume against Indian corporate ATS parsers (TCS, Infosys, Amazon India). Optimize for CGPA, measurable project metrics, and technical keywords.
              </p>
              <div className="text-xs text-orange-400 font-medium">Single-page standard · High ATS pass rate</div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
              <div className="h-10 w-10 rounded-lg bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Tier-2/3 Placement Roadmaps</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Stop wasting time on generic courses. Master the high-frequency SQL, Python, and DSA questions asked in Indian placement drives and build live portfolio capstones.
              </p>
              <div className="text-xs text-orange-400 font-medium">Bypasses known college syllabus</div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
              <div className="h-10 w-10 rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Campus Mock Interview Studio</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Practice technical coding, project defense, and the classic "Why IT after core?" managerial questions with AI providing quantitative scores and improvement tips.
              </p>
              <div className="text-xs text-orange-400 font-medium">Technical, Managerial & HR rounds</div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Indian Student Stories */}
      <section className="py-20 border-b border-slate-800/80 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
              Indian Placement Success Stories
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Students breaking branch barriers across Indian universities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/30 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "I was in B.Tech Mechanical at an AKTU college with zero core companies visiting campus. AI Skill Mentor mapped my calculus skills into Data Analytics, guided my Swiggy telemetry capstone, and helped me crack ₹9.5 LPA."
              </p>
              <div className="pt-3 border-t border-slate-800/80 text-xs">
                <div className="font-semibold text-white">Rohan Sharma</div>
                <div className="text-slate-400">AKTU B.Tech Mech → Data Analyst (Fractal Analytics)</div>
                <div className="text-orange-400 mt-1 font-mono tabular-nums">Package: ₹9.5 LPA</div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/30 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "Everyone told me B.Sc Biotech has no high-paying jobs in India without a foreign PhD. The platform adapted my roadmap to Python genomics and Biocon hiring rubrics. I landed an R&D role in Bengaluru."
              </p>
              <div className="pt-3 border-t border-slate-800/80 text-xs">
                <div className="font-semibold text-white">Ananya Iyer</div>
                <div className="text-slate-400">Delhi University B.Sc Biotech → Bioinformatics Scientist</div>
                <div className="text-orange-400 mt-1 font-mono tabular-nums">Package: ₹8.2 LPA at Biocon Hub</div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/30 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "Coming from a B.Com degree, tech companies usually filter you out. The ATS analyzer helped me highlight my SQL and Nifty 50 algorithmic model. I cracked an off-campus role at Zerodha."
              </p>
              <div className="pt-3 border-t border-slate-800/80 text-xs">
                <div className="font-semibold text-white">Aryan Patel</div>
                <div className="text-slate-400">St. Xavier's Mumbai B.Com → FinTech Analyst</div>
                <div className="text-orange-400 mt-1 font-mono tabular-nums">Package: ₹11.0 LPA at Zerodha Partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800/80 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">AI Skill Mentor India</span>
            <span>·</span>
            <span>Empowering College Students Across Engineering, Sciences & Commerce</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={onGetStarted} className="hover:text-white transition-colors">Dashboard</button>
            <button onClick={onExploreCareers} className="hover:text-white transition-colors">Careers (LPA)</button>
            <button onClick={onAnalyzeResume} className="hover:text-white transition-colors">ATS Resume</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
