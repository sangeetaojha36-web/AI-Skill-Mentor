import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Project } from '../types.ts';
import { api } from '../services/api.ts';
import {
  Layers,
  Clock,
  CheckSquare,
  Search,
  ArrowRight,
  Sparkles,
  Code2,
  Terminal,
  Cpu,
  TrendingUp,
  Compass,
  Target,
  ExternalLink,
  Play,
  X,
  Check,
  CheckCircle2,
  ChevronRight,
  Github,
  FileText,
  Bot,
  Bookmark,
  Star,
  ArrowUpRight,
  Copy,
  Share2,
  ShieldCheck,
  Building2,
  Flame,
  Info,
} from 'lucide-react';

interface ProjectsViewProps {
  user: User;
  onNavigate: (tab: string) => void;
  onOpenChat?: () => void;
}

// Fallback high-impact capstone blueprints if API is loading or empty
const DEFAULT_PROJECT_BLUEPRINTS: Project[] = [
  {
    id: 'proj-swiggy-zomato-analytics',
    title: 'Quick-Commerce & Food Delivery Unit Economics Analytics Dashboard',
    domain: 'Data Science & Analytics',
    targetCareer: 'Data Analyst & Business Insights',
    difficulty: 'Intermediate',
    description:
      'Process 500,000+ simulated delivery records in SQL & Python, calculate city-wise rider payout margins and late delivery penalties, and build an interactive Power BI telemetry dashboard.',
    keySkills: ['SQL', 'Python', 'Power BI', 'Statistics', 'ETL Pipelines'],
    deliverables: [
      'SQL analytical query script with window functions',
      'Jupyter exploratory data analysis (EDA) notebook',
      'Live interactive Power BI executive KPI dashboard',
      'Automated payout margin calculation model',
    ],
    estimatedHours: 25,
  },
  {
    id: 'proj-tata-motors-ev-telemetry',
    title: 'EV Battery Temperature Telemetry & Predictive Failure Alert Model',
    domain: 'Robotics, EV & Mechatronics',
    targetCareer: 'Robotics & Industrial Automation Engineer',
    difficulty: 'Advanced',
    description:
      'Build a Python & ROS 2 node simulator capturing battery pack cell thermal data, identifying anomalous temperature spikes, and triggering automated safety shutdown loops.',
    keySkills: ['Python', 'Robotics', 'ROS 2', 'Microcontrollers', 'CAN Bus'],
    deliverables: [
      'ROS 2 package with publisher/subscriber nodes',
      'Thermal anomaly prediction & alerting script',
      'Architecture schematic & system wiring diagram',
      'Gazebo simulation test recordings',
    ],
    estimatedHours: 35,
  },
  {
    id: 'proj-microservices-telemetry',
    title: 'Distributed Telemetry Engine, Rate Limiter & API Gateway',
    domain: 'Software & Systems',
    targetCareer: 'Full Stack & Backend Software Engineer',
    difficulty: 'Advanced',
    description:
      'Architect a high-throughput microservices gateway in Node.js/Go with Redis sliding-window rate limiting, JWT authentication, and Prometheus/Grafana latency metrics.',
    keySkills: ['Node.js', 'Redis', 'Docker', 'REST APIs', 'System Design'],
    deliverables: [
      'Docker Compose multi-service container setup',
      'Redis token-bucket rate limiting middleware',
      'Comprehensive OpenAPI / Swagger specification',
      'Grafana latency & error-rate telemetry dashboard',
    ],
    estimatedHours: 30,
  },
  {
    id: 'proj-zerodha-algo-backtest',
    title: 'Nifty 50 Algorithmic Momentum Trading & Financial Risk Model',
    domain: 'Commerce, Finance & FinTech',
    targetCareer: 'Financial & FinTech Analytics Specialist',
    difficulty: 'Intermediate',
    description:
      'Ingest 5 years of historical stock quotes, calculate MACD and Value at Risk (VaR), and build a dynamic three-statement DCF financial valuation model in Excel and Python.',
    keySkills: ['Financial Modeling', 'Excel', 'Python', 'SQL', 'Risk Analysis'],
    deliverables: [
      'Excel three-statement DCF valuation model with scenario toggles',
      'Python backtesting notebook with Sharpe & Sortino ratios',
      'Automated equity research investment memo',
    ],
    estimatedHours: 24,
  },
  {
    id: 'proj-lnt-metro-bim',
    title: 'Metro Station Structural Framing & BIM Clash Detection in Revit',
    domain: 'Civil Engineering & Smart Cities',
    targetCareer: 'BIM & Smart Infrastructure Coordinator',
    difficulty: 'Intermediate',
    description:
      'Model elevated metro station viaduct piers in Autodesk Revit, execute structural load checks in STAAD.Pro per IS 456 codes, and resolve 3D HVAC/piping spatial clashes.',
    keySkills: ['Revit', 'STAAD Pro', 'Structural Analysis', 'AutoCAD', 'BIM'],
    deliverables: [
      'Revit 3D structural model (.rvt)',
      'STAAD.Pro load analysis calculation sheet',
      'Bill of Quantities (BOQ) concrete estimation spreadsheet',
      'Clash detection matrix report',
    ],
    estimatedHours: 30,
  },
  {
    id: 'proj-biocon-rna-seq',
    title: 'Biocon Breast Cancer RNA-Sequencing Biomarker Discovery Pipeline',
    domain: 'Biotechnology & Pharma Analytics',
    targetCareer: 'Bioinformatics & Genomic Data Scientist',
    difficulty: 'Advanced',
    description:
      'Process patient cohort genomic sequencing FASTQ reads in Python and R (DESeq2), discovering 14 statistically significant drug target markers with volcano plots.',
    keySkills: ['Bioinformatics', 'R Programming', 'Genomics', 'Python', 'Statistics'],
    deliverables: [
      'R markdown reproducible analysis notebook',
      'Volcano plots & gene ontology cluster heatmaps',
      'Placement portfolio summary report with drug targets',
    ],
    estimatedHours: 28,
  },
];

// Curated 4-phase implementation steps for each project
const PROJECT_BUILD_STEPS: Record<
  string,
  { phase: string; title: string; tasks: string[] }[]
> = {
  'proj-swiggy-zomato-analytics': [
    {
      phase: 'Phase 1: Database Setup & Data Ingestion',
      title: 'PostgreSQL Schema & Simulated Order Generation',
      tasks: [
        'Setup local PostgreSQL database and define orders, riders, restaurants, and payout tables.',
        'Generate or ingest 500,000+ realistic delivery transactions with lat/long and timestamps.',
        'Index foreign keys and order_created_at for high-performance query execution.',
      ],
    },
    {
      phase: 'Phase 2: Business Logic & Unit Economics',
      title: 'SQL Window Functions & Margin Calculations',
      tasks: [
        'Write SQL queries calculating rider payout incentives per delivery kilometer.',
        'Use RANK() and DENSE_RANK() to identify top-performing delivery hubs.',
        'Calculate customer refund impact and late delivery penalties on restaurant commissions.',
      ],
    },
    {
      phase: 'Phase 3: Interactive Dashboard Development',
      title: 'Power BI / React KPI Visualizations',
      tasks: [
        'Connect Power BI / Python Streamlit to the analytical SQL view.',
        'Build executive KPI tiles: Net Take Rate, Average Order Value (AOV), and Fleet Utilization.',
        'Implement dynamic date range slicers and city-wise geographical heatmaps.',
      ],
    },
    {
      phase: 'Phase 4: Deployment & Portfolio Polish',
      title: 'GitHub Documentation & Recruiter Video Demo',
      tasks: [
        'Write a professional README with architectural diagrams and SQL optimization benchmarks.',
        'Record a 60-second Loom walkthrough demonstrating executive dashboard insights.',
        'Publish clean SQL script files and Jupyter notebooks with reproducible markdown comments.',
      ],
    },
  ],
  'proj-microservices-telemetry': [
    {
      phase: 'Phase 1: Service Architecture & API Contracts',
      title: 'Gateway Setup & Docker Networking',
      tasks: [
        'Define OpenAPI contracts for authentication, order processing, and telemetry events.',
        'Setup Docker Compose network connecting Gateway, Redis cache, and Postgres.',
        'Implement structured JSON logging with request tracing IDs (UUIDv4).',
      ],
    },
    {
      phase: 'Phase 2: Redis Sliding-Window Rate Limiting',
      title: 'High-Concurrency Middleware Development',
      tasks: [
        'Write Redis Lua script implementing sliding-window rate limit (e.g. 100 req/min per IP).',
        'Handle 429 Too Many Requests responses with Retry-After HTTP headers.',
        'Simulate concurrent load using autocannon or k6 to prove non-blocking throughput.',
      ],
    },
    {
      phase: 'Phase 3: Prometheus Metrics & Grafana Dashboards',
      title: 'Real-Time Observability & Monitoring',
      tasks: [
        'Expose /metrics endpoint recording HTTP duration histograms and error rates.',
        'Configure Prometheus scraper and create a Grafana executive dashboard.',
        'Setup automated alerting threshold when p99 latency exceeds 250ms.',
      ],
    },
    {
      phase: 'Phase 4: Cloud Deployment & GitHub Artifact',
      title: 'Live Deployment on Render / Cloud Run',
      tasks: [
        'Setup GitHub Actions CI/CD to run automated tests on pull requests.',
        'Deploy gateway and Redis instances to a live cloud provider.',
        'Document latency benchmarks comparing rate-limited vs un-throttled routes in README.',
      ],
    },
  ],
};

const DEFAULT_BUILD_STEPS = [
  {
    phase: 'Phase 1: Environment & Architecture Setup',
    title: 'Repository Structure & Tooling Configuration',
    tasks: [
      'Initialize Git repository with standard modular directory layout (src/, tests/, docs/).',
      'Configure environment variables and dependency management (package.json / requirements.txt).',
      'Document system design diagram and data flow specifications.',
    ],
  },
  {
    phase: 'Phase 2: Core Engineering & Algorithmic Logic',
    title: 'Business Engine & Core Implementation',
    tasks: [
      'Develop core processing logic handling critical domain algorithms and edge cases.',
      'Write unit tests verifying input edge-cases and error handling.',
      'Optimize data queries or memory utilization for high-volume execution.',
    ],
  },
  {
    phase: 'Phase 3: Client Interface & User Experience',
    title: 'Interactive Frontend or Telemetry Console',
    tasks: [
      'Build responsive UI client or analytical dashboard visualizing key outputs.',
      'Implement real-time error states, loading skeletons, and interactive filters.',
      'Validate cross-browser compatibility and responsive viewport scaling.',
    ],
  },
  {
    phase: 'Phase 4: Production Deployment & Recruiter Showcase',
    title: 'Live Hosting, Documentation & Resume Bullets',
    tasks: [
      'Deploy application or model to a live cloud service (Render, Vercel, or AWS).',
      'Draft recruiter-grade README with architecture diagram, live URL, and quantifiable outcomes.',
      'Practice answering 5 technical deep-dive questions about your design trade-offs.',
    ],
  },
];

// Sample quantified resume bullets to show HOW building this project elevates their resume
const RESUME_BULLETS_PREVIEW: Record<string, string[]> = {
  'proj-swiggy-zomato-analytics': [
    'Engineered end-to-end unit economics analytics pipeline in SQL & Python querying 500,000+ simulated food delivery records, reducing report calculation latency by 35%.',
    'Built interactive Power BI telemetry dashboard with dynamic rider payout models, enabling real-time margin visibility across 14 metropolitan delivery hubs.',
  ],
  'proj-tata-motors-ev-telemetry': [
    'Developed ROS 2 thermal monitoring package in C++ and Python simulating battery pack cell data, detecting temperature anomalies with 99.4% accuracy.',
    'Implemented automated CAN bus safety shutdown routines triggering failsafe cutoffs in under 45ms, verified via Gazebo physics simulation.',
  ],
  'proj-microservices-telemetry': [
    'Architected high-throughput API gateway in Node.js with Redis sliding-window rate limiting, sustaining 2,500 req/sec under simulated concurrent load.',
    'Integrated Prometheus & Grafana observability pipeline monitoring p95/p99 latencies, reducing debugging turnaround time during service regressions.',
  ],
  'proj-zerodha-algo-backtest': [
    'Built quantitative algorithmic backtesting engine in Python evaluating 5 years of Nifty 50 historical ticks, achieving 1.84 Sharpe ratio on momentum strategies.',
    'Created dynamic three-statement DCF valuation model in Excel with Monte Carlo simulation toggles for institutional equity research analysis.',
  ],
};

const DEFAULT_RESUME_BULLETS = [
  'Architected and deployed full-stack application utilizing modular architecture, ensuring clean separation of concerns and 99%+ uptime on live cloud hosting.',
  'Authored comprehensive unit and integration test suites, optimizing critical pipeline bottlenecks and documenting system trade-offs for recruiter review.',
];

/* ---------- Project Recommendation Card (Inspired by user's JobCard) ---------- */
function ProjectRecommendationCard({
  project,
  isTargetCareer,
  isInProgress,
  onOpenGuide,
  onToggleInProgress,
}: {
  project: Project;
  isTargetCareer: boolean;
  isInProgress: boolean;
  onOpenGuide: (proj: Project) => void;
  onToggleInProgress: (id: string, e: React.MouseEvent) => void;
}) {
  const getDomainIcon = () => {
    const d = project.domain.toLowerCase();
    if (d.includes('data') || d.includes('analytics')) return <TrendingUp className="size-4.5 text-amber-400" />;
    if (d.includes('software') || d.includes('systems')) return <Terminal className="size-4.5 text-indigo-400" />;
    if (d.includes('robotics') || d.includes('hardware')) return <Cpu className="size-4.5 text-emerald-400" />;
    if (d.includes('finance') || d.includes('fintech')) return <Flame className="size-4.5 text-rose-400" />;
    return <Layers className="size-4.5 text-cyan-400" />;
  };

  return (
    <div
      onClick={() => onOpenGuide(project)}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#120502]/90 hover:border-[#FEC163]/50 transition-all duration-300 shadow-md hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20 cursor-pointer select-none justify-between"
    >
      {/* Top Inset Card Section */}
      <div className="flex flex-1 flex-col gap-4 rounded-3xl p-5 bg-[#170703]/90 border-b border-white/[0.06] transition-colors group-hover:bg-[#1f0904]">
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 text-xs font-mono font-medium text-zinc-300">
              {project.difficulty}
            </span>

            {isTargetCareer && (
              <span className="rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#FEC163] uppercase tracking-wider">
                Target Role Match
              </span>
            )}

            {isInProgress && (
              <span className="rounded-full border border-emerald-500/40 bg-emerald-950/60 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Build In Progress</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => onToggleInProgress(project.id, e)}
            className="text-zinc-500 hover:text-[#FEC163] transition-colors p-1"
            title={isInProgress ? 'Remove from active builds' : 'Save to my active build list'}
          >
            <Bookmark className={`size-3.5 ${isInProgress ? 'fill-[#FEC163] text-[#FEC163]' : ''}`} />
          </button>
        </div>

        {/* Icon & Title Row */}
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 text-white group-hover:scale-105 transition-transform shadow-inner mt-0.5">
            {getDomainIcon()}
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white group-hover:text-[#FEC163] transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
              {project.targetCareer} · {project.domain.split('&')[0]}
            </p>
          </div>
        </div>

        {/* Problem Statement Description */}
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.keySkills.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Metadata & Action Row */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-black/30">
        <div>
          <p className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
            <Clock className="size-3 text-[#FEC163]" />
            <span>~{project.estimatedHours} Hours Build Time</span>
          </p>
          <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5 font-mono">
            <CheckSquare className="size-3 text-emerald-400 shrink-0" />
            <span>{project.deliverables.length} Deliverable Artifacts</span>
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenGuide(project);
          }}
          className="rounded-xl bg-[#FEC163] hover:bg-[#ffcd7d] px-3.5 py-2 text-xs font-bold text-zinc-950 transition-colors shadow-sm cursor-pointer flex items-center gap-1"
        >
          <span>Build Guide</span>
          <ArrowRight className="size-3" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Main ProjectsView Component ---------- */
export const ProjectsView: React.FC<ProjectsViewProps> = ({ user, onNavigate, onOpenChat }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [activeDepartment, setActiveDepartment] = useState<string>('All Disciplines');

  // Currently opened project blueprint modal
  const [activeBlueprint, setActiveBlueprint] = useState<Project | null>(null);

  // Active build list (persisted in localStorage)
  const [inProgressIds, setInProgressIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('student_active_build_projects');
      return saved ? JSON.parse(saved) : ['proj-swiggy-zomato-analytics'];
    } catch {
      return ['proj-swiggy-zomato-analytics'];
    }
  });

  // Checklist of completed deliverables inside the active blueprint
  const [completedDeliverables, setCompletedDeliverables] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('project_deliverables_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await api.getProjects();
      if (data?.projects && data.projects.length > 0) {
        setProjects(data.projects);
      } else {
        setProjects(DEFAULT_PROJECT_BLUEPRINTS);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setProjects(DEFAULT_PROJECT_BLUEPRINTS);
    } finally {
      setLoading(false);
    }
  };

  const toggleInProgress = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setInProgressIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('student_active_build_projects', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleDeliverable = (delKey: string) => {
    setCompletedDeliverables((prev) => {
      const next = { ...prev, [delKey]: !prev[delKey] };
      try {
        localStorage.setItem('project_deliverables_progress', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotice(label);
    setTimeout(() => setCopiedNotice(null), 2500);
  };

  // Departments / Domains list inspired by Career3
  const departments = [
    'All Disciplines',
    'Data Science & Analytics',
    'Software & Systems',
    'Robotics & Embedded',
    'Commerce & FinTech',
    'Civil & Smart Cities',
    'My Active Builds',
  ];

  // Filter Logic
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (activeDepartment === 'My Active Builds' && !inProgressIds.includes(p.id)) {
        return false;
      }
      const matchesDept =
        activeDepartment === 'All Disciplines' ||
        activeDepartment === 'My Active Builds' ||
        p.domain.toLowerCase().includes(activeDepartment.toLowerCase());
      const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.targetCareer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.keySkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDept && matchesDiff && matchesSearch;
    });
  }, [projects, activeDepartment, inProgressIds, selectedDifficulty, searchQuery]);

  const activeSteps = activeBlueprint
    ? PROJECT_BUILD_STEPS[activeBlueprint.id] || DEFAULT_BUILD_STEPS
    : DEFAULT_BUILD_STEPS;

  const activeResumeBullets = activeBlueprint
    ? RESUME_BULLETS_PREVIEW[activeBlueprint.id] || DEFAULT_RESUME_BULLETS
    : DEFAULT_RESUME_BULLETS;

  return (
    <section className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-6 lg:px-8 space-y-10 animate-fade-in pb-20">
      {/* 1. Hero Header (Direct Inspiration from Career3) */}
      <div className="flex flex-col items-center text-center space-y-3">
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-mono font-semibold tracking-wide text-[#FEC163] uppercase">
          Portfolio Capstone Engine · Proof of Work
        </span>

        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
          Recommended Projects to Elevate Your Resume
        </h1>

        <p className="max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed">
          Recruiters reject theoretical claims. Our application helps you architect, code, and deploy concrete engineering artifacts so you can genuinely prove your capabilities and elevate your resume.
        </p>

        {/* Clear Notice clarifying that projects must be BUILT, not directly pasted into a resume */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300 mt-2">
          <Info className="size-3.5 text-[#FEC163] shrink-0" />
          <span>
            These projects are recommended for you to <strong>build and deploy</strong>. Use our step-by-step guides to create real GitHub proof of work.
          </span>
        </div>
      </div>

      {/* 2. Segmented Track / Discipline Navigation Bar (Inspired by Career3) */}
      <div className="flex justify-center">
        <div className="no-scrollbar inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 overflow-x-auto max-w-full">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setActiveDepartment(dept)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeDepartment === dept
                  ? 'bg-[#FEC163] text-zinc-950 shadow-md font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {dept} {dept === 'My Active Builds' && `(${inProgressIds.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Search and Difficulty Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 max-w-4xl mx-auto w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blueprints by skill (e.g. SQL, Python, ROS, Revit, Docker)..."
            className="w-full pl-10 pr-9 py-2.5 text-xs rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 focus:border-[#FEC163]/60 focus:outline-none focus:ring-1 focus:ring-[#FEC163]/30"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white bg-white/[0.04] border border-white/[0.06]'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Projects Grid (Inspired by Career3 Grid & JobCard) */}
      <div className="mt-8">
        {loading ? (
          <div className="py-20 text-center text-zinc-500 text-xs">Loading capstone recommendations...</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-[#120502]/60 p-12 text-center text-xs text-zinc-400 space-y-2">
            <p className="text-sm font-semibold text-white">No project blueprints found for this filter</p>
            <p>Try clearing filters or switching disciplines.</p>
            <button
              type="button"
              onClick={() => {
                setActiveDepartment('All Disciplines');
                setSelectedDifficulty('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-semibold text-[#FEC163] hover:underline cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((proj) => {
              const isTargetCareer = Boolean(
                user.careerGoal &&
                  (proj.targetCareer.toLowerCase().includes(user.careerGoal.toLowerCase()) ||
                    user.careerGoal.toLowerCase().includes(proj.targetCareer.toLowerCase()))
              );
              const isInProgress = inProgressIds.includes(proj.id);

              return (
                <ProjectRecommendationCard
                  key={proj.id}
                  project={proj}
                  isTargetCareer={isTargetCareer}
                  isInProgress={isInProgress}
                  onOpenGuide={(p) => setActiveBlueprint(p)}
                  onToggleInProgress={toggleInProgress}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* 5. "Looking for More Guidance?" Footer (Direct Inspiration from Career3) */}
      <div className="mt-16 flex flex-col items-center gap-3 border-t border-white/[0.08] pt-8 text-center">
        <p className="text-sm text-zinc-400">
          Looking for a custom project tailored to a specific company or domain?
        </p>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button
            type="button"
            onClick={() => {
              if (onOpenChat) onOpenChat();
              else onNavigate('interview');
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer shadow-sm"
          >
            <Bot className="size-4 text-[#FEC163]" />
            <span>Brainstorm with AI Placement Mentor</span>
            <ArrowRight className="size-3 text-zinc-400" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('careers')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#FEC163] hover:text-white transition-colors cursor-pointer"
          >
            <span>Explore All 24+ Career Paths</span>
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* =========================================================================
         INTERACTIVE STEP-BY-STEP PROJECT IMPLEMENTATION BLUEPRINT MODAL
         ========================================================================= */}
      <AnimatePresence>
        {activeBlueprint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBlueprint(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl bg-[#140603] rounded-3xl overflow-hidden border border-white/[0.15] z-10 flex flex-col shadow-2xl max-h-[90vh] my-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/[0.08] bg-black/40 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#FEC163]/10 border border-[#FEC163]/30 text-[#FEC163]">
                    <Code2 className="size-5.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#FEC163] font-bold">
                        Implementation Blueprint & Guide
                      </span>
                      <span className="text-zinc-500">·</span>
                      <span className="text-[10px] font-mono text-zinc-400">~{activeBlueprint.estimatedHours} Hours</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 leading-snug">
                      {activeBlueprint.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveBlueprint(null)}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-zinc-300 leading-relaxed no-scrollbar flex-1">
                {/* 1. WHY BUILD THIS: Recruiter Alignment & Value */}
                <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-950/20 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                    <ShieldCheck className="size-4 text-[#FEC163]" />
                    <span>Why This Project Elevates Your Resume</span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    Recruiters in Indian & global tech hiring look for evidence of end-to-end execution. Building this concrete capstone demonstrates practical mastery over{' '}
                    <strong className="text-white">{activeBlueprint.keySkills.join(', ')}</strong>, giving interviewers a tangible codebase to discuss in Technical Round 2.
                  </p>
                </div>

                {/* 2. System Architecture Blueprint Flow */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    System Architecture Pipeline
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <div className="p-3 rounded-xl border border-white/[0.08] bg-black/40 text-center space-y-1">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Layer 1</span>
                      <span className="font-semibold text-white block text-[11px]">Data / Input Source</span>
                      <span className="text-[10px] text-zinc-400 block">Raw Streams & Tables</span>
                    </div>
                    <div className="p-3 rounded-xl border border-white/[0.08] bg-black/40 text-center space-y-1">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Layer 2</span>
                      <span className="font-semibold text-amber-400 block text-[11px]">Core Processing</span>
                      <span className="text-[10px] text-zinc-400 block">SQL / Python Engine</span>
                    </div>
                    <div className="p-3 rounded-xl border border-white/[0.08] bg-black/40 text-center space-y-1">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Layer 3</span>
                      <span className="font-semibold text-indigo-400 block text-[11px]">Visual Client</span>
                      <span className="text-[10px] text-zinc-400 block">BI / Web Dashboard</span>
                    </div>
                    <div className="p-3 rounded-xl border border-white/[0.08] bg-black/40 text-center space-y-1">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Layer 4</span>
                      <span className="font-semibold text-emerald-400 block text-[11px]">Live Hosting</span>
                      <span className="text-[10px] text-zinc-400 block">GitHub & Cloud Link</span>
                    </div>
                  </div>
                </div>

                {/* 3. 4-Phase Step-by-Step Implementation Guide */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    Step-by-Step Build Roadmap (4 Phases)
                  </h4>
                  <div className="space-y-3">
                    {activeSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-white/[0.08] bg-black/40 space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="size-5 rounded-full bg-[#FEC163]/15 border border-[#FEC163]/30 text-[#FEC163] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-[11px] font-mono text-[#FEC163] uppercase font-semibold">
                            {step.phase}
                          </span>
                        </div>
                        <h5 className="font-bold text-white text-xs">{step.title}</h5>
                        <ul className="space-y-1.5 pl-2 text-zinc-300">
                          {step.tasks.map((task, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2">
                              <span className="size-1 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Expected Deliverables Checklist with Interactive Tracking */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      Deliverables Checklist (Track as you build)
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500">Click to track progress</span>
                  </div>
                  <div className="space-y-2">
                    {activeBlueprint.deliverables.map((del, dIdx) => {
                      const delKey = `${activeBlueprint.id}-del-${dIdx}`;
                      const isDone = Boolean(completedDeliverables[delKey]);

                      return (
                        <div
                          key={dIdx}
                          onClick={() => toggleDeliverable(delKey)}
                          className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                            isDone
                              ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200'
                              : 'border-white/[0.08] bg-black/30 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`size-4.5 rounded-md border flex items-center justify-center transition-colors ${
                                isDone
                                  ? 'border-emerald-500 bg-emerald-500 text-zinc-950'
                                  : 'border-white/20 bg-white/[0.04]'
                              }`}
                            >
                              {isDone && <Check className="size-3 stroke-[3]" />}
                            </div>
                            <span className={`text-xs ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                              {del}
                            </span>
                          </div>

                          <span className="text-[10px] font-mono uppercase text-zinc-500">
                            {isDone ? 'Verified' : 'To Build'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. HOW THIS ELEVATES YOUR RESUME (Quantified Bullets Preview) */}
                <div className="p-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
                      <FileText className="size-4 text-indigo-400" />
                      <span>Resume Impact Preview (Once Built)</span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          activeResumeBullets.map((b) => `• ${b}`).join('\n\n'),
                          'Resume bullets template copied!'
                        )
                      }
                      className="text-[11px] font-semibold text-indigo-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="size-3" />
                      <span>Copy Template</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-400">
                    After you build and deploy this project, add these quantified proof-of-work bullet points to your resume:
                  </p>

                  <div className="space-y-2 bg-black/40 p-3 rounded-xl border border-white/[0.06] font-mono text-[11px] text-zinc-300">
                    {activeResumeBullets.map((bullet, bIdx) => (
                      <p key={bIdx} className="leading-relaxed">
                        • {bullet}
                      </p>
                    ))}
                  </div>
                </div>

                {copiedNotice && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-center font-mono text-[11px] animate-fade-in">
                    {copiedNotice}
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="px-6 py-4 border-t border-white/[0.08] bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleInProgress(activeBlueprint.id)}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    inProgressIds.includes(activeBlueprint.id)
                      ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                      : 'border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12]'
                  }`}
                >
                  <Bookmark className={`size-3.5 ${inProgressIds.includes(activeBlueprint.id) ? 'fill-current' : ''}`} />
                  <span>
                    {inProgressIds.includes(activeBlueprint.id)
                      ? 'Saved in Active Builds'
                      : 'Mark as Active Build'}
                  </span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenChat) {
                        setActiveBlueprint(null);
                        onOpenChat();
                      } else {
                        onNavigate('interview');
                      }
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Bot className="size-3.5" />
                    <span>Ask AI Mentor to Help Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveBlueprint(null)}
                    className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 text-zinc-300 text-xs transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
