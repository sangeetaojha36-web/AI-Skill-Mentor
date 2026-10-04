import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Course } from '../types.ts';
import { api } from '../services/api.ts';
import {
  BookOpen,
  Search,
  ExternalLink,
  Star,
  Award,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
  Check,
  GraduationCap,
  Play,
  X,
  Share2,
  Layers,
  ChevronDown,
  Building2,
  TrendingUp,
} from 'lucide-react';

interface CoursesViewProps {
  user: User;
  onNavigate: (tab: string) => void;
}

// Fallback high-impact placement courses if DB is empty
const DEFAULT_COURSES: Course[] = [
  {
    id: 'course-sql-gfg',
    title: 'SQL & Relational Databases for Tech & Analytics Placements',
    provider: 'GeeksforGeeks / Striver Sheet',
    skill: 'SQL & Window Functions',
    difficulty: 'Beginner',
    duration: '3 Weeks (15 Hours)',
    rating: 4.9,
    url: 'https://geeksforgeeks.org',
    type: 'Interactive',
    domain: 'Data Science & Analytics',
  },
  {
    id: 'course-stats-nptel',
    title: 'Data Analytics with Python & Applied Statistics',
    provider: 'NPTEL / IIT Madras',
    skill: 'Python & Statistics',
    difficulty: 'Intermediate',
    duration: '8 Weeks (Self-Paced)',
    rating: 4.8,
    url: 'https://nptel.ac.in',
    type: 'Course',
    domain: 'Data Science & Analytics',
  },
  {
    id: 'course-powerbi-microsoft',
    title: 'Microsoft Power BI Data Analyst Associate (PL-300)',
    provider: 'Microsoft Learn',
    skill: 'Power BI & DAX',
    difficulty: 'Beginner',
    duration: '4 Weeks (12 Hours)',
    rating: 4.85,
    url: 'https://learn.microsoft.com',
    type: 'Certification',
    domain: 'Data Science & Analytics',
  },
  {
    id: 'course-system-design',
    title: 'Distributed Systems & High-Level System Architecture',
    provider: 'freeCodeCamp / MIT OCW',
    skill: 'System Design & APIs',
    difficulty: 'Advanced',
    duration: '6 Weeks (24 Hours)',
    rating: 4.92,
    url: 'https://freecodecamp.org',
    type: 'Course',
    domain: 'Full Stack & Software',
  },
  {
    id: 'course-ros-robotics-iit',
    title: 'ROS 2 & Industrial Robotics for Smart Manufacturing',
    provider: 'NPTEL / Robotics Lab',
    skill: 'ROS & Embedded Robotics',
    difficulty: 'Intermediate',
    duration: '6 Weeks (18 Hours)',
    rating: 4.9,
    url: 'https://nptel.ac.in',
    type: 'Course',
    domain: 'Robotics, EV & Mechatronics',
  },
  {
    id: 'course-fintech-zerodha-varsity',
    title: 'Financial Modeling, DCF Valuation & Equity Markets',
    provider: 'Zerodha Varsity',
    skill: 'Financial Modeling & Excel',
    difficulty: 'Intermediate',
    duration: '4 Weeks (Comprehensive)',
    rating: 4.95,
    url: 'https://zerodha.com/varsity',
    type: 'Tutorial',
    domain: 'Commerce, Finance & FinTech',
  },
  {
    id: 'course-revit-bim-autodesk',
    title: 'Autodesk Revit BIM & Structural Drafting Certification',
    provider: 'Autodesk Learning Academy',
    skill: 'Revit & Structural BIM',
    difficulty: 'Beginner',
    duration: '5 Weeks (16 Hours)',
    rating: 4.8,
    url: 'https://autodesk.com',
    type: 'Certification',
    domain: 'Civil Engineering & Smart Cities',
  },
  {
    id: 'course-embedded-c-arm',
    title: 'Embedded Systems & Bare-Metal C for Semiconductor Placements',
    provider: 'FastBit Embedded / Udemy',
    skill: 'Embedded C & Firmware',
    difficulty: 'Intermediate',
    duration: '8 Weeks (30 Hours)',
    rating: 4.9,
    url: 'https://udemy.com',
    type: 'Course',
    domain: 'Electronics & Semiconductors',
  },
];

// Curated high-fidelity course covers with responsive fallbacks
const COURSE_IMAGES: Record<string, string> = {
  'course-sql-gfg': 'https://assets.watermelon.sh/components/demostack-tip-2.webp',
  'course-stats-nptel': 'https://assets.watermelon.sh/components/demostack-tip-1.webp',
  'course-powerbi-microsoft': 'https://assets.watermelon.sh/components/demostack-tip-4.webp',
  'course-system-design': 'https://assets.watermelon.sh/components/bg-element-neon.webp',
  'course-ros-robotics-iit': 'https://assets.watermelon.sh/components/demostack-tip-3.webp',
  'course-fintech-zerodha-varsity': 'https://assets.watermelon.sh/components/bg-element-wave.webp',
  'course-revit-bim-autodesk': 'https://assets.watermelon.sh/components/bg-element-sky.webp',
  'course-embedded-c-arm': 'https://assets.watermelon.sh/components/demostack-tip-2.webp',
};

// Curated syllabus breakdowns for in-depth card expansion
const COURSE_SYLLABUS: Record<string, string[]> = {
  'course-sql-gfg': [
    'Relational Algebra, ER Modeling & Database Schema Design',
    'Advanced Filtering, Subqueries & Multi-Table Complex Joins',
    'Window Functions: RANK, DENSE_RANK, NTILE, LAG, LEAD & Running Totals',
    'Performance Tuning: Index Structures, Query Execution Plans & Partitioning',
  ],
  'course-stats-nptel': [
    'NumPy Vectorized Operations & Pandas Data Preprocessing',
    'Exploratory Data Analysis, Skewness, Outlier Detection & Imputation',
    'Hypothesis Testing: T-Tests, Chi-Square, ANOVA & p-value Interpretation',
    'Placement Capstone: Practical E-Commerce A/B Testing Evaluation',
  ],
  'course-powerbi-microsoft': [
    'Enterprise Data Ingestion, Power Query ETL & Data Shaping',
    'Star Schema Dimensional Modeling & Relationship Cardinality',
    'DAX Formulas: CALCULATE, Time Intelligence, Measures vs Columns',
    'Executive KPI Dashboards, Row-Level Security (RLS) & PL-300 Mock Test',
  ],
  'course-system-design': [
    'Horizontal vs Vertical Scaling, Load Balancers & Consistent Hashing',
    'Caching Architectures: Redis Cache Invalidation & Write-Through Strategies',
    'Message Queues & Event Streaming: Kafka vs RabbitMQ Asynchronous Flows',
    'CAP Theorem Trade-Offs, High Availability & Database Sharding Models',
  ],
  'course-ros-robotics-iit': [
    'ROS 2 Architecture, Nodes, Topics, Publishers & Subscribers in C++',
    'Custom ROS Interfaces, Services, Actions & Parameter Management',
    'URDF Robot Modeling, TF2 Coordinate Transforms & Gazebo Physics Simulation',
    'LiDAR SLAM Navigation & Autonomous Mobile Robot (AMR) Waypoints',
  ],
  'course-fintech-zerodha-varsity': [
    'Corporate Financial Statements: Income Statement, Balance Sheet & Cash Flows',
    'Three-Statement Financial Forecasting & Working Capital Modeling in Excel',
    'Discounted Cash Flow (DCF) Valuation & Weighted Average Cost of Capital (WACC)',
    'Comparable Company Analysis (Comps), Trading Multiples & Sensitivity Tables',
  ],
};

const DEFAULT_SYLLABUS = [
  'Module 1: Foundations, Tooling Environment & Core Syntax',
  'Module 2: Practical Problem Solving & Industry Design Patterns',
  'Module 3: Advanced Optimization & Production Edge-Cases',
  'Module 4: Placement Capstone Project & Technical Interview Rubric',
];

/* ---------- Expandable Course Card (Inspired by user's ExpandableEventCard) ---------- */
function ExpandableCourseCard({
  course,
  isEnrolled,
  onToggleEnroll,
  onOpenModal,
}: {
  course: Course;
  isEnrolled: boolean;
  onToggleEnroll: (id: string, e: React.MouseEvent) => void;
  onOpenModal: (course: Course) => void;
}) {
  const layoutId = `expandable-course-card-${course.id}`;
  const imageSrc =
    COURSE_IMAGES[course.id] ||
    (course.domain.toLowerCase().includes('data')
      ? 'https://assets.watermelon.sh/components/demostack-tip-2.webp'
      : 'https://assets.watermelon.sh/components/demostack-tip-1.webp');

  return (
    <motion.div
      layoutId={layoutId}
      onClick={() => onOpenModal(course)}
      className="cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-[#140603] hover:bg-[#1a0804] hover:border-[#FEC163]/50 transition-all duration-300 group shadow-md flex flex-col justify-between select-none"
    >
      <div>
        {/* Cover Image Banner with shared layoutId */}
        <motion.div
          layoutId={`image-container-${layoutId}`}
          className="relative h-44 w-full overflow-hidden shrink-0 bg-black/40"
        >
          <motion.img
            layoutId={`image-${layoutId}`}
            src={imageSrc}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140603] via-black/30 to-transparent" />

          {/* Provider Pill on Image */}
          <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/15 text-[10px] font-mono font-semibold text-[#FEC163]">
            {course.provider.split('/')[0]}
          </div>

          {/* Rating Chip */}
          <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/15 text-[10px] font-mono font-bold text-amber-300 flex items-center gap-1">
            <Star className="size-3 fill-amber-400 text-amber-400" />
            <span>{course.rating}</span>
          </div>

          {/* Enrollment Tag */}
          {isEnrolled && (
            <div className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-emerald-950/85 border border-emerald-500/40 text-[9px] font-mono font-bold text-emerald-300 flex items-center gap-1">
              <Check className="size-2.5" />
              <span>In Study Plan</span>
            </div>
          )}
        </motion.div>

        {/* Card Content with shared layoutId */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <span className="text-[#FEC163] font-semibold uppercase">{course.type}</span>
            <span>·</span>
            <span>{course.difficulty}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="size-2.5" />
              {course.duration}
            </span>
          </div>

          <motion.h3
            layoutId={`title-${layoutId}`}
            className="text-sm font-bold tracking-tight text-white leading-snug group-hover:text-[#FEC163] transition-colors line-clamp-2"
          >
            {course.title}
          </motion.h3>

          <motion.p
            layoutId={`desc-${layoutId}`}
            className="text-zinc-400 text-xs tracking-wide line-clamp-2 leading-relaxed"
          >
            Master {course.skill} for campus and off-campus technical placement drives.
          </motion.p>
        </div>
      </div>

      {/* Card Action Row */}
      <div className="p-4 sm:p-5 pt-0 mt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={(e) => onToggleEnroll(course.id, e)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
            isEnrolled
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              : 'border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:border-white/20'
          }`}
        >
          <Bookmark className={`size-3 ${isEnrolled ? 'fill-current' : ''}`} />
          <span>{isEnrolled ? 'Saved' : 'Save Plan'}</span>
        </button>

        <span className="text-xs font-semibold text-[#FEC163] group-hover:text-white transition-colors flex items-center gap-1">
          <span>Inspect Curriculum</span>
          <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </motion.div>
  );
}

/* ---------- Main CoursesView Component ---------- */
export const CoursesView: React.FC<CoursesViewProps> = ({ user, onNavigate }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All Disciplines');
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'enrolled'>('all');

  // Currently opened expandable course in full morphing modal
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  // Student study plan bookmarks (persisted in localStorage)
  const [enrolledIds, setEnrolledIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('student_enrolled_courses');
      return saved ? JSON.parse(saved) : ['course-sql-gfg', 'course-powerbi-microsoft'];
    } catch {
      return ['course-sql-gfg', 'course-powerbi-microsoft'];
    }
  });

  const [copiedShareNotice, setCopiedShareNotice] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await api.getCourses();
      if (data?.courses && data.courses.length > 0) {
        setCourses(data.courses);
      } else {
        setCourses(DEFAULT_COURSES);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setCourses(DEFAULT_COURSES);
    } finally {
      setLoading(false);
    }
  };

  const toggleEnroll = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEnrolledIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('student_enrolled_courses', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleShareCourse = (course: Course) => {
    const text = `Check out this course: ${course.title} by ${course.provider} (${course.url})`;
    navigator.clipboard.writeText(text);
    setCopiedShareNotice(true);
    setTimeout(() => setCopiedShareNotice(false), 2000);
  };

  // Filter Logic
  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (activeTabFilter === 'enrolled' && !enrolledIds.includes(c.id)) {
        return false;
      }
      const matchesDiff = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
      const matchesDomain =
        selectedDomain === 'All Disciplines' ||
        c.domain.toLowerCase().includes(selectedDomain.toLowerCase());
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.provider.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDiff && matchesDomain && matchesSearch;
    });
  }, [courses, activeTabFilter, enrolledIds, selectedDifficulty, selectedDomain, searchQuery]);

  const activeCourseLayoutId = activeCourse ? `expandable-course-card-${activeCourse.id}` : '';
  const activeCourseImage = activeCourse
    ? COURSE_IMAGES[activeCourse.id] || 'https://assets.watermelon.sh/components/demostack-tip-2.webp'
    : '';
  const activeCourseSyllabus = activeCourse
    ? COURSE_SYLLABUS[activeCourse.id] || DEFAULT_SYLLABUS
    : DEFAULT_SYLLABUS;

  return (
    <div className="space-y-8 pb-16 animate-fade-in max-w-6xl mx-auto w-full px-2 sm:px-4">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FEC163] mb-1 flex-wrap font-mono">
            <span className="uppercase">Learning Academy</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Placement Mapped Modules</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Verified Curricula</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Course & Certification Academy</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Targeted tutorials, interactive coding sandboxes, and certifications directly matched to missing competencies in your target role.
          </p>
        </div>

        {/* Stats Pill Ribbon */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
            <span className="text-zinc-400 block text-[10px] font-mono uppercase">Catalog</span>
            <span className="font-bold text-white font-mono">{courses.length} Modules</span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
            <span className="text-zinc-400 block text-[10px] font-mono uppercase">My Study Plan</span>
            <span className="font-bold text-[#FEC163] font-mono">{enrolledIds.length} Saved</span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('roadmap')}
            className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-[#FEC163] hover:bg-[#ffcd7d] rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            View Career Roadmap
          </button>
        </div>
      </div>

      {/* Filter, Domain Tabs & Search Bar */}
      <div className="flex flex-col gap-4">
        {/* Domain Category Filter Tabs */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar flex-wrap">
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTabFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTabFilter === 'all'
                  ? 'bg-[#FEC163] text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Modules ({courses.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTabFilter('enrolled')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTabFilter === 'enrolled'
                  ? 'bg-[#FEC163] text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Bookmark className={`size-3 ${activeTabFilter === 'enrolled' ? 'fill-current' : ''}`} />
              <span>My Study Plan ({enrolledIds.length})</span>
            </button>
          </div>

          {/* Difficulty Filter Buttons */}
          <div className="flex items-center gap-1 text-xs">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-white text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white bg-white/[0.04] border border-white/[0.06]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar + Domain Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill, topic or provider (e.g. SQL, System Design, Power BI)..."
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
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="px-3.5 py-2.5 text-xs rounded-xl bg-[#140603] border border-white/10 text-zinc-300 focus:border-[#FEC163] focus:outline-none cursor-pointer"
            >
              <option value="All Disciplines">All Career Disciplines</option>
              <option value="Data">Data Science & Analytics</option>
              <option value="Software">Software & Full Stack</option>
              <option value="Robotics">Robotics & Hardware</option>
              <option value="Finance">Finance & Quant Tech</option>
              <option value="Civil">Civil & Infrastructure</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid with Expandable Cards */}
      {loading ? (
        <div className="py-20 text-center text-zinc-500 text-xs">Loading verified academy modules...</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-[#140603]/60 p-12 text-center text-xs text-zinc-400 space-y-2">
          <p className="text-sm font-semibold text-white">No courses match your criteria</p>
          <p>Try clearing filters or adjusting your search keyword.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedDifficulty('All');
              setSelectedDomain('All Disciplines');
              setActiveTabFilter('all');
            }}
            className="mt-2 text-xs font-semibold text-[#FEC163] hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <ExpandableCourseCard
              key={course.id}
              course={course}
              isEnrolled={enrolledIds.includes(course.id)}
              onToggleEnroll={toggleEnroll}
              onOpenModal={(c) => setActiveCourse(c)}
            />
          ))}
        </div>
      )}

      {/* =========================================================================
         FULL-SCREEN MORPHING MODAL (Direct Inspiration from ExpandableEventCard)
         ========================================================================= */}
      <AnimatePresence>
        {activeCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCourse(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Morphing Container with shared layoutId */}
            <motion.div
              layoutId={activeCourseLayoutId}
              className="relative w-full max-w-2xl bg-[#140603] rounded-3xl overflow-hidden border border-white/[0.15] z-10 flex flex-col shadow-2xl max-h-[90vh] my-auto"
            >
              {/* Close Button with backdrop-blur */}
              <button
                type="button"
                onClick={() => setActiveCourse(null)}
                className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center bg-black/60 hover:bg-black/90 rounded-full border border-white/20 text-white transition-colors backdrop-blur-sm cursor-pointer shadow-lg"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>

              {/* Morphing Image Banner with shared layoutId */}
              <motion.div
                layoutId={`image-container-${activeCourseLayoutId}`}
                className="relative h-56 sm:h-72 w-full overflow-hidden shrink-0 bg-black/60"
              >
                <motion.img
                  layoutId={`image-${activeCourseLayoutId}`}
                  src={activeCourseImage}
                  alt={activeCourse.title}
                  className="w-full h-full object-cover"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#140603] via-black/40 to-transparent" />

                {/* Floating Chips on Banner */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-white/20 text-xs font-mono font-semibold text-[#FEC163]">
                      {activeCourse.provider}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-950/85 backdrop-blur-md border border-emerald-500/30 text-xs font-mono font-bold text-emerald-300">
                      {activeCourse.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-amber-300">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span>{activeCourse.rating} / 5.0</span>
                  </div>
                </div>
              </motion.div>

              {/* Morphing Content Area */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm no-scrollbar">
                <div>
                  <motion.h3
                    layoutId={`title-${activeCourseLayoutId}`}
                    className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5 leading-snug"
                  >
                    {activeCourse.title}
                  </motion.h3>

                  <motion.p
                    layoutId={`desc-${activeCourseLayoutId}`}
                    className="text-[#FEC163] text-xs font-mono font-semibold tracking-wider uppercase mb-3"
                  >
                    {activeCourse.domain} · {activeCourse.difficulty} Level · {activeCourse.duration}
                  </motion.p>
                </div>

                {/* Spring Animated In-Depth Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  transition={{ type: 'spring', duration: 0.35, bounce: 0, delay: 0.1 }}
                  className="space-y-6 text-zinc-300 leading-relaxed text-xs"
                >
                  {/* Overview Card */}
                  <div className="p-4 rounded-xl border border-white/[0.08] bg-black/40 space-y-2">
                    <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                      <GraduationCap className="size-4 text-[#FEC163]" />
                      <span>Placement Syllabus & Competency Goals</span>
                    </h4>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      This curriculum is structured around high-yield competencies tested during corporate campus drives and off-campus tech screenings.
                    </p>
                  </div>

                  {/* 4-Part Syllabus Breakdown */}
                  <div className="space-y-2.5">
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      Curriculum Modules Breakdown
                    </h5>
                    <div className="space-y-2">
                      {activeCourseSyllabus.map((module, mIdx) => (
                        <div
                          key={mIdx}
                          className="flex items-start gap-3 p-3 rounded-lg border border-white/[0.06] bg-black/30"
                        >
                          <div className="size-5 rounded-full bg-[#FEC163]/10 border border-[#FEC163]/30 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono text-[#FEC163] font-bold">
                            {mIdx + 1}
                          </div>
                          <div>
                            <span className="text-white font-medium block">{module}</span>
                            <span className="text-[10px] text-zinc-500 font-mono">Includes interactive tests & solution code</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recruiter Alignment Note */}
                  <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 flex items-start gap-3">
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold text-xs block">
                        Verified Recruiter Alignment
                      </span>
                      <p className="text-zinc-300 text-[11px] mt-0.5">
                        Covers critical skills demanded by top employers like Google, Amazon, Microsoft, Swiggy, and TCS Digital.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Buttons Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => toggleEnroll(activeCourse.id)}
                        className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          enrolledIds.includes(activeCourse.id)
                            ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                            : 'border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12]'
                        }`}
                      >
                        <Bookmark className={`size-3.5 ${enrolledIds.includes(activeCourse.id) ? 'fill-current' : ''}`} />
                        <span>
                          {enrolledIds.includes(activeCourse.id)
                            ? 'Enrolled in Study Plan'
                            : 'Save to My Study Plan'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShareCourse(activeCourse)}
                        className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        title="Copy Course Link"
                      >
                        <Share2 className="size-4" />
                      </button>
                    </div>

                    <a
                      href={activeCourse.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#FEC163] hover:bg-[#ffcd7d] text-zinc-950 font-bold rounded-xl shadow-lg shadow-amber-950/40 transition-colors flex items-center justify-center gap-2 text-xs"
                    >
                      <span>Start Learning on {activeCourse.provider.split('/')[0]}</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>

                  {copiedShareNotice && (
                    <div className="text-center text-[11px] text-emerald-400 font-mono animate-fade-in">
                      Course details copied to clipboard!
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
