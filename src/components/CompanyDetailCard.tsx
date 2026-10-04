import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RotateCw,
  Maximize2,
  Minimize2,
  X,
  Share2,
  Check,
  ExternalLink,
  Calendar,
  Clock,
  Building2,
  Globe,
  GitBranch,
  GitCommit,
  Box,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Terminal,
  Search,
  Video,
  Mic,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Play,
  Copy,
  History,
  ShieldCheck,
  Settings,
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Company, CompanyRole } from '../data/companiesData.ts';

// --- SegmentedProgress Component ---
export const SegmentedProgress = ({
  progress,
  status,
  count = 20,
}: {
  progress: number;
  status: string;
  count?: number;
}) => {
  const activeSegments = Math.floor(progress * count);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i < activeSegments;
        let color = 'bg-neutral-800';
        if (isActive) {
          color =
            status === 'error'
              ? 'bg-red-500'
              : status === 'warning'
                ? 'bg-amber-500'
                : 'bg-[#22c55e]';
        }
        return (
          <div
            key={i}
            className={`h-2.5 w-1 rounded-[1px] transition-colors duration-150 ${color}`}
          />
        );
      })}
    </div>
  );
};

// --- MetricTag Component ---
export const MetricTag = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-1.5 rounded-md border border-[#2a2a2c] bg-[#161617] px-2 py-0.5">
    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border border-[#333] text-[9px] font-black text-[#888] uppercase">
      {label}
    </span>
    <span className="text-[10px] font-bold text-slate-300">
      {value}
    </span>
  </div>
);

interface CompanyDetailCardProps {
  company: Company;
  onClose: () => void;
  // Rehearsal Configuration State
  selectedRoundFormat: string;
  onSelectRoundFormat: (format: string) => void;
  selectedRoleTitle: string;
  onSelectRoleTitle: (title: string) => void;
  experienceLevel: string;
  onSelectExperienceLevel: (lvl: any) => void;
  interviewerPersona: string;
  onSelectInterviewerPersona: (persona: any) => void;
  interviewFormat: string;
  onSelectInterviewFormat: (fmt: any) => void;
  interviewLanguage: string;
  onSelectInterviewLanguage: (lang: any) => void;
  anxietyResetBreathing: boolean;
  onToggleAnxietyReset: (val: boolean) => void;
  numberOfQuestions: number;
  onChangeNumberOfQuestions: (val: number) => void;
  // Webcam & Mic
  cameraActive: boolean;
  cameraError: string | null;
  modalVideoRef: React.RefObject<HTMLVideoElement | null>;
  audioLevel: number;
  onRequestCameraAccess: () => void;
  onSetupSimulatedCamera: () => void;
  onBeginRehearsal: () => void;
  starting: boolean;
}

export const CompanyDetailCard: React.FC<CompanyDetailCardProps> = ({
  company,
  onClose,
  selectedRoundFormat,
  onSelectRoundFormat,
  selectedRoleTitle,
  onSelectRoleTitle,
  experienceLevel,
  onSelectExperienceLevel,
  interviewerPersona,
  onSelectInterviewerPersona,
  interviewFormat,
  onSelectInterviewFormat,
  interviewLanguage,
  onSelectInterviewLanguage,
  anxietyResetBreathing,
  onToggleAnxietyReset,
  numberOfQuestions,
  onChangeNumberOfQuestions,
  cameraActive,
  cameraError,
  modalVideoRef,
  audioLevel,
  onRequestCameraAccess,
  onSetupSimulatedCamera,
  onBeginRehearsal,
  starting,
}) => {
  const [activeTab, setActiveTab] = useState<'rehearsal' | 'culture' | 'callsheet' | 'roles'>('rehearsal');
  const [isCopied, setIsCopied] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activePopover, setActivePopover] = useState<'more' | 'terminal' | 'search' | null>(null);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [investigateSuccess, setInvestigateSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const moreRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideMore = moreRef.current && !moreRef.current.contains(event.target as Node);
      const isOutsideTerminal = terminalRef.current && !terminalRef.current.contains(event.target as Node);
      const isOutsideSearch = searchRef.current && !searchRef.current.contains(event.target as Node);

      if (isOutsideMore && isOutsideTerminal && isOutsideSearch) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/#interview?company=${company.id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const handleVisit = () => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(company.name + ' campus hiring placements')}`, '_blank');
  };

  const handleInvestigate = () => {
    setIsInvestigating(true);
    setInvestigateSuccess(false);
    setTimeout(() => {
      setIsInvestigating(false);
      setInvestigateSuccess(true);
    }, 2500);
  };

  const handleResetSimulation = () => {
    onSelectRoundFormat(company.roundFormats[0] || 'Technical Round');
    onSelectRoleTitle(company.roles[0]?.title || 'Software Engineer');
    onSelectExperienceLevel('Fresher (0-1 yrs)');
    onChangeNumberOfQuestions(5);
    setInvestigateSuccess(false);
  };

  // Find currently selected role
  const selectedRoleObj = company.roles.find((r) => r.title === selectedRoleTitle) || company.roles[0];

  // Visual Banner based on company category
  const getBannerImage = (cat: string) => {
    switch (cat) {
      case 'Tech Giants':
        return 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600';
      case 'FinTech':
        return 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600';
      case 'Core & Automotive':
        return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600';
      case 'BioTech & Healthcare':
        return 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600';
      case 'IT Services & Consulting':
        return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600';
      default:
        return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600';
    }
  };

  // Filter questions if user uses search
  const filteredQuestions = searchQuery.trim()
    ? company.callSheet.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.round.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : company.callSheet;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-2 sm:p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        className={`relative mx-auto w-full overflow-hidden rounded-[24px] border border-[#FEC163]/30 bg-[#0E0C10] font-sans antialiased shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(222,67,19,0.3)] my-auto max-h-[94vh] flex flex-col transition-all duration-300 ${
          isMaximized ? 'max-w-5xl' : 'max-w-3xl'
        }`}
      >
        {/* =========================================================================
           1. TOP HEADER (With Controls: Reset, Maximize, Close)
           ========================================================================= */}
        <div className="flex items-center justify-between border-b border-[#222] bg-[#141217] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span
              className="h-5 w-5 rounded-md flex items-center justify-center font-bold text-white text-[11px] shadow-sm shrink-0"
              style={{ backgroundColor: company.badgeColor }}
            >
              {company.badgeLetter}
            </span>
            <span className="text-[11px] font-bold tracking-tight text-neutral-400 uppercase font-mono">
              CAMPUS HIRING SPECIFICATION · {company.category}
            </span>
          </div>

          <div className="flex items-center gap-3 text-neutral-400">
            <button
              type="button"
              onClick={handleResetSimulation}
              title="Reset Rehearsal Setup"
              className="cursor-pointer transition-colors duration-300 hover:text-white active:rotate-180"
            >
              <RotateCw size={14} />
            </button>
            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              title={isMaximized ? 'Compact View' : 'Maximize Window'}
              className="cursor-pointer transition-colors hover:text-white"
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close Specification"
              className="cursor-pointer transition-colors hover:text-rose-400 p-0.5 rounded-md hover:bg-white/5"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto space-y-6 p-4 sm:p-6 text-slate-200">
          {/* =========================================================================
             2. TITLE & ACTION BUTTONS
             ========================================================================= */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>{company.name}</span>
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1F0C05] border border-[#FEC163]/40 text-[#FEC163] text-xs font-mono font-bold">
                  {company.ctcRange}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                {company.competencySubtitle}
              </p>
            </div>

            <div className="flex w-full gap-2 sm:w-auto">
              {/* Share Button with Animated Checkmark */}
              <button
                type="button"
                onClick={handleShare}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#2a2a2c] bg-[#161617] px-3.5 py-2 text-[12px] font-medium text-slate-300 transition-all hover:bg-neutral-800 hover:text-white active:scale-95 sm:flex-none cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 size={14} />
                    <span>Share</span>
                  </>
                )}
              </button>

              {/* Visit Official Careers Portal */}
              <button
                type="button"
                onClick={handleVisit}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#FEC163] via-[#FA8C28] to-[#DE4313] hover:from-[#FFE19C] hover:to-[#DE4313] px-4 py-2 text-[12px] font-bold text-black shadow-md transition-transform active:scale-95 sm:flex-none cursor-pointer"
              >
                <span>Visit Portal</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>

          {/* =========================================================================
             3. INFO GRID: PREVIEW CARD + METADATA TABLE
             ========================================================================= */}
          <div className="flex flex-col gap-5 sm:gap-6 md:flex-row">
            {/* Visual Aspect Preview Card */}
            <div className="group relative aspect-16/10 w-full overflow-hidden rounded-xl border border-[#2a2a2c] bg-black md:w-64 shrink-0 shadow-lg">
              <img
                src={getBannerImage(company.category)}
                alt={company.name}
                className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
                <div className="mb-1.5 h-1 w-8 rounded-full bg-[#22c55e] transition-colors" />
                <div className="text-sm font-bold text-white leading-tight">
                  {company.name} India
                </div>
                <div className="text-[10px] text-amber-200/90 font-mono mt-0.5 line-clamp-1">
                  {company.interviewFocus}
                </div>
              </div>
            </div>

            {/* Clean Key-Value Metadata Grid */}
            <div className="grid flex-1 grid-cols-[90px_1fr] items-center gap-y-2.5 text-[11px] sm:grid-cols-[110px_1fr] bg-[#121115] p-3.5 rounded-xl border border-[#222]">
              <span className="flex items-center gap-1.5 text-[12px] font-medium tracking-wider text-[#888]">
                <Building2 size={13} className="text-[#FEC163]" /> Category
              </span>
              <span className="font-semibold text-white ml-2">
                {company.category}
              </span>

              <span className="flex items-center gap-1.5 text-[12px] font-medium tracking-wider text-[#888]">
                <ShieldCheck size={13} className="text-emerald-400" /> Hiring Status
              </span>
              <div className="ml-2 flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full border border-[#16A821]/30 bg-[#162C19] px-2.5 py-0.5 font-bold text-emerald-400 text-[10px]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Active Placement Drive
                </span>
              </div>

              <span className="flex items-center gap-1.5 text-[12px] font-medium tracking-wider text-[#888]">
                <Globe size={13} className="text-sky-400" /> Headquarters
              </span>
              <span className="ml-2 text-slate-300 font-mono">
                {company.headquarters}
              </span>

              <span className="flex items-center gap-1.5 text-[12px] font-medium tracking-wider text-[#888]">
                <TrendingUp size={13} className="text-[#DE4313]" /> CTC Package
              </span>
              <div className="ml-2 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[#FEC163] font-bold">
                  {company.ctcRange}
                </span>
                <span className="rounded-full border border-[#5C5C5C] bg-[#1A1A1C] px-1.5 py-0.5 text-[9px] font-black text-amber-200 uppercase font-mono">
                  {company.hiringTiers.join(' • ')}
                </span>
              </div>

              <span className="flex items-center gap-1.5 text-[12px] font-medium tracking-wider text-[#888]">
                <Clock size={13} className="text-amber-400" /> Structure
              </span>
              <div className="ml-2 flex flex-wrap items-center gap-2">
                <span className="font-mono text-slate-300">
                  {company.roundFormats.length} Selection Rounds
                </span>
                <span className="rounded-full border border-[#333] bg-[#1A1A1C] px-1.5 py-0.5 text-[9px] font-mono text-slate-400">
                  ~45m / Round
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
             4. DASHED BORDER DIVIDER
             ========================================================================= */}
          <div className="my-2 border-t-[1.6px] border-dashed border-[#2a2a2c]" />

          {/* =========================================================================
             5. DOMAIN & SOURCE SECTION
             ========================================================================= */}
          <div className="grid grid-cols-1 gap-3 text-[11px]">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-16 shrink-0 font-bold text-neutral-400 uppercase font-mono">
                  Domains
                </span>
                <div
                  onClick={() => window.open(`https://${company.id}.com`, '_blank')}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[#2a2a2c] bg-[#161617] px-3 py-1 text-slate-300 transition-colors hover:bg-[#1f1f20] active:scale-95"
                >
                  <Globe size={12} className="text-[#FEC163]" />
                  <span>careers.{company.id}.com</span>
                  <span className="text-neutral-500 font-mono">+Pan India</span>
                </div>
                <div className="hidden rounded-full border border-[#2a2a2c] bg-[#161617] px-2.5 py-1 font-mono text-slate-400 sm:block text-[10px]">
                  Campus Pool 2026-27
                </div>
              </div>
              <CheckCircle2 size={16} className="text-[#22c55e] shrink-0" />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-16 shrink-0 font-bold text-neutral-400 uppercase font-mono">
                  Source
                </span>
                <div className="flex items-center gap-1.5 rounded border border-[#2a2a2c] bg-[#161617] px-2 py-0.5 text-[10px] font-bold text-amber-200">
                  <GitBranch size={12} className="text-[#FEC163]" />
                  <span>{selectedRoleObj.category}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400 sm:ml-2 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-slate-300">
                    <GitCommit size={13} className="text-slate-500" />
                    <span>{company.callSheet.length} Real Questions</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Box size={13} className="text-slate-500" />
                    <span>{company.roles.length} Open Roles</span>
                  </span>
                </div>
              </div>
              <CheckCircle2 size={16} className="text-[#22c55e] shrink-0" />
            </div>
          </div>

          {/* =========================================================================
             6. ROUND BREAKDOWN STATUS LIST (With SegmentedProgress & MetricTags)
             ========================================================================= */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Selection Process & Round Sequence
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                Proctored Benchmarks
              </span>
            </div>

            <div className="space-y-2">
              {company.roundFormats.map((fmt, idx) => {
                const isSelected = selectedRoundFormat === fmt;
                const progressVal = (idx + 1) / company.roundFormats.length;
                return (
                  <div
                    key={fmt}
                    onClick={() => {
                      onSelectRoundFormat(fmt);
                      setActiveTab('rehearsal');
                    }}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 rounded-xl border p-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#FEC163]/60 bg-[#1A130C]'
                        : 'border-[#1e1e1f] bg-[#121213] hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono text-[#FEC163] font-bold">
                        R{idx + 1}
                      </span>
                      <span className="text-[12px] font-medium text-white truncate max-w-[200px]">
                        {fmt}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <SegmentedProgress
                        progress={progressVal}
                        status={isSelected ? 'success' : 'loading'}
                        count={18}
                      />
                      <div className="flex items-center gap-1.5">
                        <MetricTag label="F" value={fmt.includes('HR') ? 'Behavioral' : 'Technical'} />
                        <MetricTag label="Q" value={numberOfQuestions} />
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                        <span>~40m</span>
                        <CheckCircle2
                          size={15}
                          className={isSelected ? 'text-[#22c55e]' : 'text-slate-600'}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
             7. INTERACTIVE TABS (Set Up Rehearsal / Culture Brief / Call Sheet / Roles)
             ========================================================================= */}
          <div className="pt-2">
            <div className="flex items-center gap-3 sm:gap-5 border-b border-[#222] text-xs font-semibold overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setActiveTab('rehearsal')}
                className={`pb-2.5 transition-all relative cursor-pointer whitespace-nowrap ${
                  activeTab === 'rehearsal' ? 'text-[#FEC163] font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Set Up Rehearsal</span>
                {activeTab === 'rehearsal' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FEC163]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('culture')}
                className={`pb-2.5 transition-all relative cursor-pointer whitespace-nowrap ${
                  activeTab === 'culture' ? 'text-[#FEC163] font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Culture Brief <span className="text-[10px] text-slate-400">(what they value)</span></span>
                {activeTab === 'culture' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FEC163]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('callsheet')}
                className={`pb-2.5 transition-all relative cursor-pointer whitespace-nowrap ${
                  activeTab === 'callsheet' ? 'text-[#FEC163] font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Call Sheet <span className="text-[10px] text-slate-400">({company.callSheet.length} questions)</span></span>
                {activeTab === 'callsheet' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FEC163]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('roles')}
                className={`pb-2.5 transition-all relative cursor-pointer whitespace-nowrap ${
                  activeTab === 'roles' ? 'text-[#FEC163] font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Roles & Compensation <span className="text-[10px] text-slate-400">({company.roles.length} tracks)</span></span>
                {activeTab === 'roles' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FEC163]" />
                )}
              </button>
            </div>

            {/* TAB CONTENT 1: SET UP REHEARSAL */}
            {activeTab === 'rehearsal' && (
              <div className="pt-4 space-y-5 text-xs">
                {/* 1. Choose Role */}
                <div className="space-y-2">
                  <div className="font-mono text-slate-400 text-[11px] flex justify-between">
                    <span>Target Role:</span>
                    <span className="text-[#FEC163] font-bold">{selectedRoleObj.title} ({selectedRoleObj.ctcLpa})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {company.roles.map((r) => {
                      const isActive = selectedRoleTitle === r.title;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => onSelectRoleTitle(r.title)}
                          className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer font-medium ${
                            isActive
                              ? 'bg-[#FEC163] text-black border-transparent shadow-[0_0_12px_rgba(254,193,99,0.4)] font-bold'
                              : 'bg-[#121213] border-white/10 text-slate-300 hover:border-white/25'
                          }`}
                        >
                          {r.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Role Card Details */}
                <div className="p-3.5 rounded-xl bg-[#121115] border border-[#FEC163]/25 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                    <div className="text-white font-semibold flex items-center gap-1.5">
                      <Cpu size={13} className="text-[#FEC163]" />
                      <span>{selectedRoleObj.title} · {selectedRoleObj.category}</span>
                    </div>
                    <div className="text-slate-400">
                      Degrees: <span className="text-amber-200">{selectedRoleObj.preferredDegree.join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 items-center pt-1 border-t border-white/[0.06]">
                    <span className="text-slate-400 text-[10px] font-mono">Skills Evaluated:</span>
                    {selectedRoleObj.requiredSkills.map((sk) => (
                      <span key={sk} className="px-2 py-0.5 rounded bg-black/50 text-[#FFD799] border border-[#FEC163]/20 text-[10px]">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Round Format Selector */}
                <div className="space-y-2">
                  <div className="font-mono text-slate-400 text-[11px]">Round Format:</div>
                  <div className="flex flex-wrap gap-2">
                    {company.roundFormats.map((rnd) => (
                      <button
                        key={rnd}
                        type="button"
                        onClick={() => onSelectRoundFormat(rnd)}
                        className={`px-3 py-1.5 rounded-full border text-[11px] transition-all cursor-pointer ${
                          selectedRoundFormat === rnd
                            ? 'bg-[#1C2538] border-[#FEC163] text-white font-semibold'
                            : 'bg-[#121213] border-white/10 text-slate-300 hover:border-white/25'
                        }`}
                      >
                        {rnd}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Experience Level & Interviewer Persona */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="font-mono text-slate-400 text-[11px]">Experience Level:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {(['Fresher (0-1 yrs)', 'Intermediate (1-3 yrs)', 'Senior (3+ yrs)'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => onSelectExperienceLevel(lvl)}
                          className={`px-2.5 py-1 rounded-lg border text-[10px] transition-all cursor-pointer ${
                            experienceLevel === lvl
                              ? 'bg-[#FEC163] text-black border-transparent font-bold'
                              : 'bg-[#121213] border-white/10 text-slate-300'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-mono text-slate-400 text-[11px]">Interviewer Persona:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {(['Friendly HR Recruiter', 'Technical Architect', 'Bar-Raiser Leader'] as const).map((persona) => (
                        <button
                          key={persona}
                          type="button"
                          onClick={() => onSelectInterviewerPersona(persona)}
                          className={`px-2.5 py-1 rounded-lg border text-[10px] transition-all cursor-pointer ${
                            interviewerPersona === persona
                              ? 'bg-[#DE4313] text-white border-transparent font-bold'
                              : 'bg-[#121213] border-white/10 text-slate-300'
                          }`}
                        >
                          {persona}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Language & Anxiety Reset & Questions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <div className="font-mono text-slate-400 text-[11px]">Rehearsal Language:</div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectInterviewLanguage('English')}
                        className={`flex-1 py-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer ${
                          interviewLanguage === 'English'
                            ? 'bg-[#FEC163] text-black border-transparent'
                            : 'bg-[#121213] border-white/10 text-slate-300'
                        }`}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectInterviewLanguage('Hinglish')}
                        className={`flex-1 py-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer ${
                          interviewLanguage === 'Hinglish'
                            ? 'bg-[#48D1CC] text-black border-transparent'
                            : 'bg-[#121213] border-white/10 text-slate-300'
                        }`}
                      >
                        Hinglish
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-mono text-slate-400 text-[11px] flex justify-between">
                      <span>Questions Count:</span>
                      <strong className="text-white">{numberOfQuestions}</strong>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="10"
                      value={numberOfQuestions}
                      onChange={(e) => onChangeNumberOfQuestions(Number(e.target.value))}
                      className="w-full accent-[#FEC163] bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Anxiety Reset Card */}
                <div
                  onClick={() => onToggleAnxietyReset(!anxietyResetBreathing)}
                  className="p-3 rounded-xl bg-[#121213] border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20 transition-all"
                >
                  <span className="font-mono text-slate-300 text-[11px]">
                    Anxiety Reset Micro-Break (10s guided breathing between technical questions)
                  </span>
                  <div className={`h-4 w-4 rounded flex items-center justify-center border transition-all ${
                    anxietyResetBreathing ? 'bg-[#FEC163] border-[#FEC163] text-black' : 'border-white/30'
                  }`}>
                    {anxietyResetBreathing && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>

                {/* 5. Mandatory Candidate Webcam Check */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-slate-400">Candidate Webcam Verification</span>
                    <span className="px-2 py-0.5 rounded border border-rose-500/40 bg-rose-950/30 text-rose-400 text-[10px] tracking-wider uppercase font-bold">
                      MANDATORY TO START
                    </span>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#080B12] overflow-hidden flex flex-col items-center justify-center p-4 space-y-3 relative">
                    {cameraActive ? (
                      <div className="w-full aspect-video max-h-52 bg-black rounded-lg overflow-hidden relative border border-white/15">
                        <video
                          ref={modalVideoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover transform -scale-x-100"
                        />
                        <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 border border-emerald-400/50 text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>WEBCAM VERIFIED & ACTIVE</span>
                        </div>

                        {/* Mic Audio Meter Overlay */}
                        <div className="absolute bottom-2 left-2 right-2 px-3 py-1 rounded bg-black/75 border border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-300">
                          <div className="flex items-center gap-1.5">
                            <Mic size={12} className="text-emerald-400" />
                            <span>Mic Input Level:</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[15, 30, 45, 60, 75, 90].map((t) => (
                              <span
                                key={t}
                                className={`h-2.5 w-1 rounded-sm transition-all ${
                                  audioLevel >= t ? 'bg-emerald-400' : 'bg-slate-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center space-y-2.5 py-2">
                        <div className="h-11 w-11 rounded-full bg-rose-950/50 border border-rose-600/40 flex items-center justify-center text-rose-400">
                          <Video size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">Camera access required</div>
                          <div className="text-slate-400 text-[11px] mt-0.5">Live proctoring will evaluate your focus and eye contact.</div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={onRequestCameraAccess}
                            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold text-xs shadow-md hover:brightness-110 transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Video size={13} />
                            <span>Enable Hardware Webcam</span>
                          </button>
                          <button
                            type="button"
                            onClick={onSetupSimulatedCamera}
                            className="px-3 py-1.5 rounded-xl bg-[#1A2338] hover:bg-[#232F4C] border border-white/15 text-slate-200 text-xs transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Sparkles size={13} className="text-[#FEC163]" />
                            <span>Use Studio Simulation</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {cameraError && (
                      <div className="w-full p-2 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-[11px] flex items-center justify-between gap-2">
                        <span>{cameraError}</span>
                        <button
                          type="button"
                          onClick={onSetupSimulatedCamera}
                          className="px-2 py-0.5 rounded bg-[#FEC163] text-black font-bold text-[10px] shrink-0"
                        >
                          Use Simulation
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Primary CTA: Begin Rehearsal with Camera */}
                <button
                  type="button"
                  onClick={onBeginRehearsal}
                  disabled={!cameraActive || starting}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    cameraActive
                      ? 'bg-gradient-to-r from-[#FEC163] via-[#FA8C28] to-[#DE4313] text-black shadow-[0_0_25px_rgba(222,67,19,0.6)] hover:brightness-110 active:scale-[0.99]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700 opacity-60'
                  }`}
                >
                  {starting ? (
                    <>
                      <RefreshCw size={14} className="animate-spin text-black" />
                      <span>Launching Live Rehearsal Studio...</span>
                    </>
                  ) : (
                    <>
                      <Video size={14} className="text-black" />
                      <span>Begin Rehearsal with Camera</span>
                      <ArrowRight size={14} className="text-black" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* TAB CONTENT 2: CULTURE BRIEF */}
            {activeTab === 'culture' && (
              <div className="pt-4 space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-[#141217] border border-[#FEC163]/25 space-y-1.5">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <Sparkles size={14} className="text-[#FEC163]" />
                    <span>Hiring Philosophy at {company.name}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {company.cultureBrief.hiringPhilosophy}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                    Core Values & Key Behavioral Pillars:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {company.cultureBrief.coreValues.map((val) => (
                      <div key={val} className="p-2.5 rounded-xl bg-[#121213] border border-white/10 flex items-start gap-2">
                        <Check size={14} className="text-[#FEC163] shrink-0 mt-0.5" />
                        <span className="text-slate-200 font-semibold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121213] border border-white/10 space-y-1">
                  <div className="font-bold text-white text-xs">What Interviewers Listen For:</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {company.cultureBrief.whatTheyLookFor}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-1.5">
                  <div className="font-bold text-rose-300 text-xs flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-rose-400" />
                    <span>Instant Red Flags at {company.name}:</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                    {company.cultureBrief.redFlags.map((flag) => (
                      <li key={flag}>{flag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: CALL SHEET (PAST QUESTIONS) */}
            {activeTab === 'callsheet' && (
              <div className="pt-4 space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Past recruitment questions asked at <strong className="text-white">{company.name}</strong>:</span>
                  <span className="font-mono text-[#FEC163]">{filteredQuestions.length} recorded</span>
                </div>

                <div className="space-y-3">
                  {filteredQuestions.map((item) => (
                    <div key={item.id} className="p-3.5 rounded-xl bg-[#121213] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[#FEC163] font-semibold text-[11px]">
                          Round: {item.round} · {item.topic}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white">
                          {item.difficulty}
                        </span>
                      </div>

                      <div className="text-white font-bold text-xs sm:text-sm">
                        "{item.question}"
                      </div>

                      <div className="p-2 rounded-lg bg-black/50 border border-white/5 text-slate-300 text-[11px]">
                        <strong className="text-amber-200">How to Crack: </strong>
                        <span>{item.tips}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: ROLES & COMPENSATION */}
            {activeTab === 'roles' && (
              <div className="pt-4 space-y-3 text-xs">
                <div className="text-slate-400 text-[11px]">
                  Available career tracks and engineering roles at <strong className="text-white">{company.name}</strong> with CTC packages:
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {company.roles.map((r) => (
                    <div key={r.id} className="p-3.5 rounded-xl bg-[#121213] border border-white/10 space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                            <span>{r.title}</span>
                            <span className="px-2 py-0.5 rounded bg-black/40 text-[10px] font-mono text-slate-400 border border-white/10">
                              {r.category}
                            </span>
                          </div>
                          <div className="text-slate-400 text-[11px] mt-0.5">
                            Degrees: {r.preferredDegree.join(' • ')}
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <span className="text-[#FEC163] font-mono font-bold text-xs bg-[#1F0C05] px-2.5 py-1 rounded-lg border border-[#FEC163]/30">
                            {r.ctcLpa}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              onSelectRoleTitle(r.title);
                              setActiveTab('rehearsal');
                            }}
                            className="px-3 py-1 rounded-lg bg-[#FEC163] text-black font-bold text-[11px] hover:brightness-110 cursor-pointer transition-all"
                          >
                            Select Role
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/[0.06] space-y-1.5 text-[11px]">
                        <div className="flex flex-wrap gap-1 items-center">
                          <span className="text-slate-400">Required Skills:</span>
                          {r.requiredSkills.map((sk) => (
                            <span key={sk} className="px-1.5 py-0.5 rounded bg-[#1C2538] text-slate-200 border border-white/10 text-[10px]">
                              {sk}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1 items-center text-slate-400">
                          <span className="text-[#FEC163]">Rounds:</span>
                          {r.rounds.map((rnd, i) => (
                            <span key={rnd} className="text-slate-300">
                              {i + 1}. {rnd} {i < r.rounds.length - 1 ? '→' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
           8. CARD FOOTER (With Popovers: More, Terminal/Logs, Search + Investigate CTA)
           ========================================================================= */}
        <div className="relative flex flex-col items-center justify-between gap-3 border-t border-[#222] bg-[#100E13] px-4 py-3 sm:flex-row sm:px-6 mt-auto">
          {/* Popover Icons Left */}
          <div className="flex w-full justify-center gap-4 text-neutral-400 sm:w-auto sm:justify-start">
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === 'more' ? null : 'more')}
              className={`cursor-pointer transition-colors hover:text-white p-1 rounded-md ${
                activePopover === 'more' ? 'text-[#FA692E]' : ''
              }`}
              title="More specifications"
            >
              <MoreVertical size={16} />
            </button>
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === 'terminal' ? null : 'terminal')}
              className={`cursor-pointer transition-colors hover:text-white p-1 rounded-md ${
                activePopover === 'terminal' ? 'text-[#FA692E]' : ''
              }`}
              title="Live AI Telemetry Logs"
            >
              <Terminal size={15} />
            </button>
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === 'search' ? null : 'search')}
              className={`cursor-pointer transition-colors hover:text-white p-1 rounded-md ${
                activePopover === 'search' ? 'text-[#FA692E]' : ''
              }`}
              title="Search Questions & Notes"
            >
              <Search size={15} />
            </button>
          </div>

          {/* Right Status Indicator & Investigate Button */}
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
              <span className="text-emerald-400 font-bold">{company.roundFormats.length} Rounds</span>
              <span>·</span>
              <span>{company.roles.length} Open Roles</span>
              <AlertCircle size={11} className="text-[#FEC163]" />
            </div>

            <button
              type="button"
              onClick={handleInvestigate}
              disabled={isInvestigating}
              className="relative w-full overflow-hidden rounded-full border border-[#333] bg-[#161617] px-4 py-1.5 text-[11px] font-bold text-slate-200 transition-all hover:bg-neutral-800 hover:text-white active:scale-95 disabled:opacity-70 sm:w-auto cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {isInvestigating ? (
                  <motion.div
                    key="inv"
                    initial={{ y: 15 }}
                    animate={{ y: 0 }}
                    exit={{ y: -15 }}
                    className="flex items-center gap-1.5 text-amber-300"
                  >
                    <RotateCw size={12} className="animate-spin" />
                    <span>Analyzing Rubric...</span>
                  </motion.div>
                ) : investigateSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ y: 15 }}
                    animate={{ y: 0 }}
                    exit={{ y: -15 }}
                    className="flex items-center gap-1.5 text-emerald-400"
                  >
                    <Check size={12} />
                    <span>94% Match Verified</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="invest"
                    initial={{ y: 15 }}
                    animate={{ y: 0 }}
                    exit={{ y: -15 }}
                  >
                    Investigate Hiring Rubric
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Popovers */}
          <AnimatePresence>
            {/* Popover 1: More Details */}
            {activePopover === 'more' && (
              <motion.div
                ref={moreRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-4 bottom-full left-4 z-50 mb-2 w-auto overflow-hidden rounded-2xl border border-[#333] bg-[#121214] p-1 shadow-2xl sm:right-auto sm:left-6 sm:w-56"
              >
                {[
                  {
                    icon: Copy,
                    label: `Copy ID: ${company.id}`,
                    action: () => {
                      navigator.clipboard.writeText(company.id);
                    },
                  },
                  {
                    icon: History,
                    label: 'Campus Placement History',
                    action: () => {
                      window.open(`https://www.google.com/search?q=${encodeURIComponent(company.name + ' placements stats')}`, '_blank');
                    },
                  },
                  {
                    icon: ShieldCheck,
                    label: 'AI Proctoring Vision Audit',
                    action: () => {
                      onRequestCameraAccess();
                    },
                  },
                  {
                    icon: Settings,
                    label: 'Reset Rehearsal Setup',
                    action: handleResetSimulation,
                  },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      item.action();
                      setActivePopover(null);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[11px] text-slate-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    <item.icon size={13} className="text-[#FEC163]" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Popover 2: Terminal / Live Build & Proctoring Logs */}
            {activePopover === 'terminal' && (
              <motion.div
                ref={terminalRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-4 bottom-full left-4 z-50 mb-2 w-auto overflow-hidden rounded-2xl border border-white/15 bg-[#0D0D0E] shadow-2xl transition-colors sm:right-auto sm:left-6 sm:w-84"
              >
                <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2">
                  <span className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">
                    <Play size={10} className="fill-[#FA692E]/20 text-[#FA692E]" />
                    Live AI Proctoring Logs
                  </span>
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <div className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  </div>
                </div>
                <div className="h-40 space-y-1.5 overflow-y-auto p-3 font-mono text-[10px]">
                  <p className="text-neutral-500">[{new Date().toLocaleTimeString()}] Initializing Greenroom Rehearsal...</p>
                  <p className="font-medium text-emerald-400">✔ Loaded company dossier: {company.name}</p>
                  <p className="font-medium text-emerald-400">✔ Evaluated {company.roles.length} roles and {company.callSheet.length} questions</p>
                  <p className="text-slate-400">Camera Telemetry: {cameraActive ? 'Active 30 FPS Stream' : 'Awaiting candidate consent'}</p>
                  <p className="text-amber-300">Auditing STAR rubric against Indian Tier 1-3 benchmarks</p>
                  <p className="font-bold text-[#FEC163]">Ready for live speech-to-text & facial focus tracking</p>
                </div>
              </motion.div>
            )}

            {/* Popover 3: Search Questions & Rubric */}
            {activePopover === 'search' && (
              <motion.div
                ref={searchRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-4 bottom-full left-4 z-50 mb-2 flex w-auto items-center gap-2 rounded-2xl border border-[#333] bg-[#141217] p-2 shadow-2xl sm:right-auto sm:left-20 sm:w-72"
              >
                <div className="p-1 text-slate-400">
                  <Search size={14} />
                </div>
                <input
                  type="text"
                  autoFocus
                  placeholder={`Search ${company.name} questions...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-none bg-transparent pr-3 text-[11px] text-white outline-none placeholder:text-neutral-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setActiveTab('callsheet');
                      setActivePopover(null);
                    }
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    <X size={12} />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
