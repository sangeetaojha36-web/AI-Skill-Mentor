import React from 'react';
import { motion } from 'motion/react';
import {
  Lock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  Target,
  Compass,
  Video,
  GraduationCap,
  FolderPlus,
  Bot,
  UserCheck,
} from 'lucide-react';

interface LockedFeatureGateViewProps {
  featureKey: string;
  onOpenAuth: (isLogin: boolean) => void;
  onBackToAllowed: () => void;
}

const FEATURE_DESCRIPTIONS: Record<
  string,
  {
    title: string;
    tagline: string;
    description: string;
    benefits: string[];
    previewMetric: string;
  }
> = {
  roadmap: {
    title: 'Personalized Week-by-Week Roadmap',
    tagline: 'Custom placement milestones tuned to your target company cutoffs',
    description:
      'Unlock dynamic sprint schedules that adapt to your graduation timeline, prioritizing the highest-ROI gatekeeper skills first.',
    benefits: [
      'Tailored 4-to-12 week sprint curriculum',
      'Dynamic prerequisite unlock system',
      'Curated free learning resources from NPTEL, Coursera & GFG',
      'Progress analytics calibrated for Day-1 placements',
    ],
    previewMetric: 'Average 3.4x faster placement readiness',
  },
  courses: {
    title: 'AI Learning Academy',
    tagline: 'Targeted course modules addressing your diagnosed skill gaps',
    description:
      'Directly links missing competencies to verified video lectures, interactive coding sandboxes, and recruiter-approved certifications.',
    benefits: [
      'Zero-fluff modules focused purely on recruitment cutoffs',
      'Track module completions and verified hours',
      'Skill assessments with immediate score validation',
      'Syncs directly with your personalized roadmap',
    ],
    previewMetric: '140+ Curated modules across 6 engineering disciplines',
  },
  projects: {
    title: 'Portfolio Capstone Blueprint Vault',
    tagline: 'Recruiter-grade GitHub project architectures with live demos',
    description:
      'Stop building toy apps. Access production blueprints with system architecture diagrams, database schemas, and live deployment checklists.',
    benefits: [
      'Production Docker, PostgreSQL & Next.js architectures',
      'Embedded robotics, VLSI, and FinTech quant project repos',
      'Step-by-step implementation blueprints and STAR bullet points',
      'Recruiter verification checklist for campus interviews',
    ],
    previewMetric: '180+ Concrete proof-of-work project repositories',
  },
  interview: {
    title: 'Greenroom Mock Interview Studio',
    tagline: 'Real-time speech AI, gaze detection & STAR behavioral coaching',
    description:
      'Rehearse technical and HR rounds under simulated pressure. The AI evaluates your verbal pacing (WPM), filler words, and answer structure.',
    benefits: [
      'Real-time microphone speech pacing (WPM) & filler word count',
      'Webcam eye-contact and posture confidence tracking',
      'Instant STAR behavioral structure scoring and transcript rewrites',
      'Company-specific interview question banks (Tata, Amazon, Infosys)',
    ],
    previewMetric: '92% Average interview confidence increase',
  },
  progress: {
    title: 'Placement Readiness & Progress Tracker',
    tagline: 'Comprehensive placement probability telemetry & historical metrics',
    description:
      'Track your composite placement readiness index over time across ATS health, technical skill benchmarks, and interview performance.',
    benefits: [
      'Live Day-1 campus placement readiness score',
      'Historical trajectory graphs and milestone velocity',
      'Exportable placement performance reports for college T&P cells',
      'Early alert warnings for upcoming campus drive deadlines',
    ],
    previewMetric: 'Real-time composite placement analytics',
  },
  dashboard: {
    title: 'Full Placement Intelligence Dashboard',
    tagline: 'Your complete campus placement control center',
    description:
      'Access your unified student profile, milestone tracking, recruiter cutoffs, and AI action items in one place.',
    benefits: [
      'Unified overview of your 6-step placement pipeline',
      'Real-time alerts for identified skill gaps and roadmap tasks',
      'Quick-launch access to Greenroom AI mock rounds',
      'Synced across your resume, projects, and target careers',
    ],
    previewMetric: 'Full student workspace control center',
  },
  careers: {
    title: 'Career Explorer & Branch Matches',
    tagline: 'Deep dive into 24+ engineering and technology tracks',
    description:
      'Explore salary distributions, hiring volumes, and core competencies for roles in Autonomous Robotics, VLSI, Full Stack, and FinTech.',
    benefits: [
      'Median starting CTC benchmarks from ₹8.5 to ₹32 LPA',
      'Branch-specific transition pathways for non-CS students',
      'Corporate recruiters currently hiring for each track',
      '1-Click roadmap alignment to any career track',
    ],
    previewMetric: '24+ Industry disciplines with verified salary data',
  },
  setup: {
    title: 'Student Profile & Academic Calibration',
    tagline: 'Personalize your credentials and academic history',
    description:
      'Input your college, degree, CGPA, and career goals to calibrate AI algorithms specifically to your placement tier.',
    benefits: [
      'Accurate campus placement eligibility checks',
      'Persistent resume storage and versioning',
      'Tailored recruiter cutoffs based on college tier',
      'Customized AI mentor responses',
    ],
    previewMetric: 'Persistent personalized profile storage',
  },
};

export const LockedFeatureGateView: React.FC<LockedFeatureGateViewProps> = ({
  featureKey,
  onOpenAuth,
  onBackToAllowed,
}) => {
  const meta = FEATURE_DESCRIPTIONS[featureKey] || {
    title: 'Advanced Placement Feature',
    tagline: 'Unlock full application access with a free account',
    description:
      'This feature is reserved for registered students. Create a free account or sign in to access the full placement engine.',
    benefits: [
      'Full access to all 6 steps of the placement pipeline',
      'Personalized roadmaps and capstone project blueprints',
      'Greenroom speech AI mock interview practice',
      'Persistent progress tracking and analytics',
    ],
    previewMetric: 'Unlock 100% of the platform',
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-[#FEC163]/30 bg-gradient-to-b from-[#180703]/95 via-[#0F0402]/98 to-[#070201] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(222,67,19,0.2)] text-left relative overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 size-72 bg-[#DE4313]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Lock Icon & Kicker */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-gradient-to-br from-[#FEC163] to-[#DE4313] p-0.5 shadow-lg shadow-amber-950/40">
              <div className="size-full bg-[#120502] rounded-[14px] flex items-center justify-center text-[#FEC163]">
                <Lock className="size-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#FEC163] uppercase tracking-wider">
                  Free Preview Restriction
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-400 border border-white/10">
                  Step Locked
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                {meta.title}
              </h2>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-amber-950/40 border border-[#FEC163]/30 text-xs font-mono text-[#FEC163]">
            {meta.previewMetric}
          </div>
        </div>

        {/* Description & Value Proposition */}
        <div className="space-y-3 mb-8">
          <p className="text-sm sm:text-base font-semibold text-zinc-200">
            {meta.tagline}
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
            {meta.description} In free preview mode, you have access to the{' '}
            <span className="text-[#FEC163] font-semibold">AI Resume Analyzer</span> and{' '}
            <span className="text-[#FEC163] font-semibold">Skill Gap Matrix</span>. To unlock this
            feature and the rest of the application, please create your free student account.
          </p>
        </div>

        {/* Unlocked Benefits Checklist */}
        <div className="mb-8 p-5 rounded-2xl bg-[#090302] border border-white/[0.08] space-y-3">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
            What you unlock with a free account:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {meta.benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-2 text-zinc-300">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={onBackToAllowed}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Resume & Skill Gap Preview</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onOpenAuth(true)}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/[0.06] text-xs font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer text-center"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth(false)}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FEC163] via-[#FA8C28] to-[#DE4313] hover:brightness-110 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-950/40 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Sign Up to Unlock</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LockedFeatureGateView;
