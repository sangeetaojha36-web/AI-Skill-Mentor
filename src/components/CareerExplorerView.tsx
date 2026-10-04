import React, { useState, useEffect, useMemo } from 'react';
import { User, Career, CareerMatchScore } from '../types.ts';
import { api } from '../services/api.ts';
import {
  COMPREHENSIVE_CAREERS,
  CAREER_DOMAINS,
  CareerPath,
  SalaryTier,
  MAJOR_BRANCH_DEFINITIONS,
  MajorBranchKey,
  detectUserBranchKey
} from '../data/careersData.ts';
import {
  Compass,
  Target,
  Sparkles,
  TrendingUp,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  Building2,
  Briefcase,
  DollarSign,
  Layers,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Award,
  Plus,
  X,
  Check,
  Eye,
  SlidersHorizontal,
  Flame,
  Zap,
  Star,
  GraduationCap,
  ShieldCheck,
  Coins,
  CheckCheck
} from 'lucide-react';

export interface BranchAffinity {
  matchTier: 'core' | 'synergy' | 'cross';
  isDirect: boolean;
  isSecondary: boolean;
  badgeLabel: string;
  reason: string;
  relevanceScore: number;
}

/**
 * Checks if a career role belongs to a specific major discipline
 */
export function isCareerInBranch(career: CareerPath, branchKey: MajorBranchKey): boolean {
  const cTitle = (career.title || '').toLowerCase();
  const cCat = (career.category || '').toLowerCase();
  const cDom = (career.domain || '').toLowerCase();
  const cDisc = (career.recommendedDisciplines || []).map((d) => d.toLowerCase());

  switch (branchKey) {
    case 'mechanical':
      return (
        cDisc.some((d) => d.includes('mech') || d.includes('auto') || d.includes('production') || d.includes('industrial') || d.includes('plant')) ||
        cCat.includes('hardware & robotics') ||
        cDom.includes('manufacturing') ||
        cDom.includes('mechanical') ||
        cDom.includes('electric vehicles') ||
        cTitle.includes('cad') ||
        cTitle.includes('plant') ||
        cTitle.includes('ev powertrain') ||
        cTitle.includes('robotics') ||
        cTitle.includes('industrial automation')
      );
    case 'civil':
      return (
        cDisc.some((d) => d.includes('civil') || d.includes('struct') || d.includes('construction') || d.includes('bim') || d.includes('arch')) ||
        cCat.includes('smart infrastructure') ||
        cDom.includes('civil') ||
        cDom.includes('infrastructure') ||
        cDom.includes('bim') ||
        cTitle.includes('civil') ||
        cTitle.includes('structural') ||
        cTitle.includes('cad')
      );
    case 'electrical_electronics':
      return (
        cDisc.some((d) => d.includes('elect') || d.includes('ece') || d.includes('eee') || d.includes('embedded') || d.includes('vlsi') || d.includes('telecom') || d.includes('instrument')) ||
        cDom.includes('embedded') ||
        cDom.includes('semiconductor') ||
        cDom.includes('microcontroller') ||
        cTitle.includes('embedded') ||
        cTitle.includes('firmware') ||
        cTitle.includes('vlsi') ||
        cTitle.includes('plc') ||
        cTitle.includes('robotics') ||
        cTitle.includes('desktop support')
      );
    case 'biotechnology':
      return (
        cDisc.some((d) => d.includes('bio') || d.includes('life science') || d.includes('pharma') || d.includes('medic') || d.includes('genom')) ||
        cCat.includes('biotechnology') ||
        cDom.includes('genomics') ||
        cDom.includes('pharmaceutical') ||
        cTitle.includes('bioinformatics') ||
        cTitle.includes('genomics') ||
        cTitle.includes('qc lab')
      );
    case 'commerce_finance':
      return (
        cDisc.some((d) => d.includes('comm') || d.includes('b.com') || d.includes('bba') || d.includes('mba') || d.includes('finan') || d.includes('econ') || d.includes('business')) ||
        cCat.includes('finance') ||
        cCat.includes('operations & business') ||
        cDom.includes('finance') ||
        cDom.includes('spreadsheet') ||
        cDom.includes('sales') ||
        cTitle.includes('financial') ||
        cTitle.includes('operations & data associate') ||
        cTitle.includes('product manager') ||
        cTitle.includes('quant') ||
        cTitle.includes('sales') ||
        cTitle.includes('customer support')
      );
    case 'computer_science':
      return (
        cDisc.some((d) => d.includes('comput') || d.includes('it') || d.includes('software') || d.includes('bca') || d.includes('mca') || d.includes('cse')) ||
        cCat.includes('software & cloud') ||
        cCat.includes('ai & data science') ||
        cCat.includes('cybersecurity') ||
        cTitle.includes('full stack') ||
        cTitle.includes('ai & machine learning') ||
        cTitle.includes('cloud') ||
        cTitle.includes('qa') ||
        cTitle.includes('frontend') ||
        cTitle.includes('systems') ||
        cTitle.includes('data analyst') ||
        cTitle.includes('blockchain')
      );
    case 'design_creative':
      return (
        cDisc.some((d) => d.includes('design') || d.includes('art') || d.includes('graphic') || d.includes('media') || d.includes('communic')) ||
        cCat.includes('product & design') ||
        cTitle.includes('designer') ||
        cTitle.includes('ui/ux') ||
        cTitle.includes('graphic') ||
        cTitle.includes('marketing') ||
        cTitle.includes('technical content')
      );
    default:
      return true;
  }
}

/**
 * Evaluates precise branch compatibility for a specific student persona
 */
export function evaluateBranchAffinity(
  userBranch: string,
  userDegree: string,
  career: CareerPath
): BranchAffinity {
  const branch = (userBranch || '').toLowerCase().trim();
  const degree = (userDegree || '').toLowerCase().trim();
  const disciplines = (career.recommendedDisciplines || []).map((d) => d.toLowerCase());
  const category = (career.category || '').toLowerCase();
  const domain = (career.domain || '').toLowerCase();
  const title = (career.title || '').toLowerCase();

  if (!branch) {
    return {
      matchTier: 'synergy',
      isDirect: false,
      isSecondary: true,
      badgeLabel: 'Universal Pathway',
      reason: 'Open to ambitious graduates from all fields with comprehensive recruitment training.',
      relevanceScore: 70
    };
  }

  // 1. Core Discipline Match
  let isCore = false;
  let coreReason = '';

  // Mechanical, Automotive & Manufacturing
  if (branch.includes('mech') || branch.includes('auto') || branch.includes('production') || branch.includes('manufacturing') || branch.includes('plant')) {
    if (
      title.includes('cad') ||
      title.includes('drafter') ||
      title.includes('plant') ||
      title.includes('graduate engineer trainee') ||
      title.includes('industrial automation') ||
      title.includes('powertrain') ||
      title.includes('ev systems') ||
      title.includes('robotics') ||
      category.includes('hardware & robotics') ||
      domain.includes('manufacturing') ||
      domain.includes('mechanical') ||
      domain.includes('electric vehicles')
    ) {
      isCore = true;
      coreReason = `Direct match for your ${userDegree ? userDegree + ' ' : ''}${userBranch} syllabus: builds on thermodynamics, CAD modeling, machine design, and manufacturing systems.`;
    }
  }
  // Civil & Structural
  else if (branch.includes('civil') || branch.includes('struct') || branch.includes('construction') || branch.includes('infrastructure')) {
    if (
      title.includes('civil') ||
      title.includes('cad') ||
      title.includes('bim') ||
      title.includes('structural') ||
      category.includes('smart infrastructure') ||
      domain.includes('civil') ||
      domain.includes('bim') ||
      domain.includes('structural')
    ) {
      isCore = true;
      coreReason = `Direct match for your ${userDegree ? userDegree + ' ' : ''}${userBranch} training: leverages structural analysis, surveying, BIM drafting, and site supervision.`;
    }
  }
  // Electrical, Electronics, ECE, EEE, Instrumentation
  else if (branch.includes('elec') || branch.includes('ece') || branch.includes('eee') || branch.includes('telecom') || branch.includes('instrument') || branch.includes('vlsi') || branch.includes('embedded')) {
    if (
      title.includes('embedded') ||
      title.includes('firmware') ||
      title.includes('vlsi') ||
      title.includes('silicon') ||
      title.includes('plc') ||
      title.includes('industrial automation') ||
      title.includes('robotics') ||
      title.includes('graduate engineer trainee') ||
      title.includes('desktop support') ||
      domain.includes('embedded') ||
      domain.includes('semiconductor') ||
      domain.includes('automation')
    ) {
      isCore = true;
      coreReason = `Direct match for your ${userDegree ? userDegree + ' ' : ''}${userBranch} coursework: leverages digital electronics, microcontrollers, signal analysis, and circuit design.`;
    }
  }
  // Biotechnology & Life Sciences
  else if (branch.includes('bio') || branch.includes('life science') || branch.includes('pharma') || branch.includes('medic') || branch.includes('genom') || branch.includes('biomed')) {
    if (
      title.includes('bioinformatics') ||
      title.includes('genomics') ||
      title.includes('qc lab') ||
      title.includes('quality associate') ||
      category.includes('biotechnology & health') ||
      domain.includes('genomics') ||
      domain.includes('pharmaceutical')
    ) {
      isCore = true;
      coreReason = `Direct core match for your ${userDegree ? userDegree + ' ' : ''}${userBranch} background: applies molecular biology, genomics, assays, and GLP quality control protocols.`;
    }
  }
  // Commerce & Finance
  else if (branch.includes('comm') || branch.includes('b.com') || branch.includes('bba') || branch.includes('mba') || branch.includes('finan') || branch.includes('econ') || branch.includes('account') || branch.includes('business')) {
    if (
      title.includes('fintech') ||
      title.includes('financial') ||
      title.includes('operations & data associate') ||
      title.includes('quantitative') ||
      title.includes('product manager') ||
      title.includes('business development') ||
      title.includes('customer support') ||
      category.includes('finance & fintech') ||
      category.includes('operations & business') ||
      domain.includes('spreadsheet') ||
      domain.includes('sales')
    ) {
      isCore = true;
      coreReason = `Direct match for your ${userDegree ? userDegree + ' ' : ''}${userBranch} curriculum: translates corporate finance, valuation, spreadsheet analysis, and business operations into hiring readiness.`;
    }
  }
  // Computer Science & IT
  else if (branch.includes('comput') || branch.includes('it') || branch.includes('cse') || branch.includes('software') || branch.includes('bca') || branch.includes('mca') || branch.includes('data science') || branch.includes('ai')) {
    if (
      category.includes('software & cloud') ||
      category.includes('ai & data science') ||
      category.includes('cybersecurity') ||
      title.includes('full stack') ||
      title.includes('ai') ||
      title.includes('web') ||
      title.includes('qa') ||
      title.includes('cloud') ||
      title.includes('data analyst') ||
      title.includes('systems')
    ) {
      isCore = true;
      coreReason = `Core technical match for your ${userDegree ? userDegree + ' ' : ''}${userBranch} degree: directly utilizes DSA, database systems, networking, and software engineering principles.`;
    }
  }
  // Design & Media
  else if (branch.includes('des') || branch.includes('art') || branch.includes('media') || branch.includes('creat')) {
    if (
      title.includes('designer') ||
      title.includes('graphic') ||
      title.includes('ui/ux') ||
      title.includes('digital marketing') ||
      title.includes('technical content') ||
      category.includes('product & design')
    ) {
      isCore = true;
      coreReason = `Core creative match for your ${userDegree ? userDegree + ' ' : ''}${userBranch} education: applies visual aesthetics, user research, wireframing, and design tooling.`;
    }
  }

  if (isCore) {
    return {
      matchTier: 'core',
      isDirect: true,
      isSecondary: false,
      badgeLabel: `Core Match for ${userBranch}`,
      reason: coreReason,
      relevanceScore: 98
    };
  }

  // 2. High Synergy Interdisciplinary Bridges
  let isSecondary = false;
  let secondaryReason = '';

  // Core Engineering (Mech / Civil / Elec) -> Data Analyst, QA, Product, Cloud, Automation
  if (
    (branch.includes('mech') || branch.includes('civil') || branch.includes('elec') || branch.includes('chem')) &&
    (category.includes('software & cloud') || category.includes('ai & data science') || title.includes('data analyst') || title.includes('product manager') || title.includes('qa'))
  ) {
    isSecondary = true;
    secondaryReason = `High-synergy transition: your strong mathematical and analytical problem-solving foundation in ${userBranch} allows fast upskilling into ${career.title}.`;
  }
  // Computing -> Quant, Fintech, Product
  else if (
    (branch.includes('comput') || branch.includes('it') || branch.includes('cse') || branch.includes('bca') || branch.includes('mca')) &&
    (category.includes('finance & fintech') || category.includes('hardware & robotics') || category.includes('product & design'))
  ) {
    isSecondary = true;
    secondaryReason = `Strong computational and algorithm foundation from ${userBranch} translates directly into ${career.title}.`;
  }
  // Commerce / Economics -> Data Analytics, Product, Operations
  else if (
    (branch.includes('comm') || branch.includes('bba') || branch.includes('econ') || branch.includes('finan')) &&
    (title.includes('data analyst') || title.includes('product') || category.includes('ai & data science') || title.includes('digital marketing'))
  ) {
    isSecondary = true;
    secondaryReason = `High-synergy business bridge: combines commercial acumen in ${userBranch} with analytical reporting and data insights.`;
  }
  // Biotech -> Data Analytics, Health Tech
  else if (
    branch.includes('bio') &&
    (title.includes('data analyst') || title.includes('product') || category.includes('ai & data science') || title.includes('operations'))
  ) {
    isSecondary = true;
    secondaryReason = `Analytical synergy: applies statistical rigor and biological domain context from ${userBranch} to ${career.title}.`;
  }
  // Universal entry-level roles open to all graduates
  else if (
    disciplines.some((d) => d.includes('any graduate') || d.includes('any engineering') || d.includes('any degree') || d.includes('any major'))
  ) {
    isSecondary = true;
    secondaryReason = `Fresher-friendly entry gate with structured corporate training open to all ${userBranch} graduates.`;
  }

  if (isSecondary) {
    return {
      matchTier: 'synergy',
      isDirect: false,
      isSecondary: true,
      badgeLabel: `High Synergy for ${userBranch}`,
      reason: secondaryReason || `Your ${userBranch} foundation provides transferable skills for ${career.title}.`,
      relevanceScore: 82
    };
  }

  return {
    matchTier: 'cross',
    isDirect: false,
    isSecondary: false,
    badgeLabel: 'Cross-Discipline Track',
    reason: `Requires acquiring prerequisite technical fundamentals outside your standard ${userBranch} curriculum.`,
    relevanceScore: 45
  };
}

interface CareerExplorerViewProps {
  user: User;
  onSelectCareer: (careerId: string, careerTitle: string) => void;
  onNavigate: (tab: string) => void;
}

export const CareerExplorerView: React.FC<CareerExplorerViewProps> = ({
  user,
  onSelectCareer,
  onNavigate
}) => {
  const [recommendations, setRecommendations] = useState<CareerMatchScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedSalaryTier, setSelectedSalaryTier] = useState<'All' | SalaryTier>('All');
  const [selectedBranchKey, setSelectedBranchKey] = useState<MajorBranchKey>('my_branch');
  const [branchOnlyCore, setBranchOnlyCore] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'match' | 'salary_high' | 'salary_low' | 'growth'>('match');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [inspectingCareer, setInspectingCareer] = useState<CareerPath | null>(null);
  const [customCareers, setCustomCareers] = useState<CareerPath[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [goalSavedNotification, setGoalSavedNotification] = useState<string | null>(null);

  // Form state for adding custom career
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState('Software & Cloud');
  const [newSalaryTier, setNewSalaryTier] = useState<SalaryTier>('growth');
  const [newDescription, setNewDescription] = useState('');
  const [newSalary, setNewSalary] = useState('₹6.0 LPA - ₹12.0 LPA');
  const [newGrowth, setNewGrowth] = useState('+22% High Demand');
  const [newSkills, setNewSkills] = useState('Problem Solving, Communication, MS Office');
  const [newRecruiters, setNewRecruiters] = useState('TCS, Infosys, Wipro, Accenture');

  useEffect(() => {
    loadRecommendations();
  }, [user.id, user.skills, user.education.branch]);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      const data = await api.getCareerRecommendations(user.id);
      if (data && data.recommendations && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      console.warn('API recommendations loading failed, falling back to local dataset:', err);
    } finally {
      setLoading(false);
    }
  };

  // Combine default library with any user-added custom careers
  const allCareerLibrary = useMemo(() => {
    return [...COMPREHENSIVE_CAREERS, ...customCareers];
  }, [customCareers]);

  // Calculate local match score if not provided by backend
  const normalizedUserSkills = useMemo(() => {
    return (user.skills || []).map((s) => s.toLowerCase().trim());
  }, [user.skills]);

  const enrichedCareerCards = useMemo(() => {
    return allCareerLibrary.map((career) => {
      // Find server match if exists
      const serverMatch = recommendations.find(
        (r) =>
          r.career.id === career.id ||
          r.career.title.toLowerCase() === career.title.toLowerCase()
      );

      // Compute matched skills
      const matched = career.requiredSkills
        .map((s) => s.name)
        .filter((skillName) =>
          normalizedUserSkills.some((us) => us.includes(skillName.toLowerCase()) || skillName.toLowerCase().includes(us))
        );

      const skillMatchPercent = Math.min(
        100,
        Math.max(25, Math.round((matched.length / Math.max(1, career.requiredSkills.length)) * 100))
      );

      // Branch & Field affinity
      const affinity = evaluateBranchAffinity(
        user.education?.branch || '',
        user.education?.degree || '',
        career
      );

      // Calculate composite score prioritizing branch match
      const calculatedScore = serverMatch
        ? serverMatch.overallScore
        : Math.min(
            99,
            Math.max(
              30,
              Math.round(
                skillMatchPercent * 0.40 +
                affinity.relevanceScore * 0.45 +
                (affinity.isDirect ? 15 : affinity.isSecondary ? 8 : 0) +
                (user.careerGoal && career.title.toLowerCase().trim() === user.careerGoal.toLowerCase().trim() ? 10 : 0)
              )
            )
          );

      return {
        career,
        affinity,
        matchScore: calculatedScore,
        matchedSkills: serverMatch ? serverMatch.matchedSkills : matched,
        missingSkills: career.requiredSkills.filter(
          (req) => !matched.some((m) => m.toLowerCase() === req.name.toLowerCase())
        ),
        isTarget:
          user.careerGoal &&
          career.title.toLowerCase().trim() === user.careerGoal.toLowerCase().trim()
      };
    });
  }, [allCareerLibrary, recommendations, normalizedUserSkills, user.education?.branch, user.education?.degree, user.careerGoal]);

  // Global counts for salary tiers
  const tierCounts = useMemo(() => {
    return {
      all: allCareerLibrary.length,
      foundation: allCareerLibrary.filter((c) => c.salaryTier === 'foundation').length,
      growth: allCareerLibrary.filter((c) => c.salaryTier === 'growth').length,
      premium: allCareerLibrary.filter((c) => c.salaryTier === 'premium').length
    };
  }, [allCareerLibrary]);

  // Branch-specific stats (for the user's branch or selected branch)
  const branchStats = useMemo(() => {
    const userBranch = user.education?.branch || '';
    const myBranchRoles = enrichedCareerCards.filter(
      (c) => c.affinity.isDirect || c.affinity.isSecondary
    );
    const myCoreRoles = enrichedCareerCards.filter((c) => c.affinity.isDirect);
    const mySynergyRoles = enrichedCareerCards.filter((c) => c.affinity.isSecondary);

    const activeRoles = selectedBranchKey === 'my_branch'
      ? (branchOnlyCore ? myCoreRoles : myBranchRoles)
      : selectedBranchKey === 'all'
      ? enrichedCareerCards
      : enrichedCareerCards.filter((c) => isCareerInBranch(c.career, selectedBranchKey));

    return {
      userBranch,
      myBranchTotal: myBranchRoles.length,
      myCoreCount: myCoreRoles.length,
      mySynergyCount: mySynergyRoles.length,
      activeCount: activeRoles.length,
      activeLowCount: activeRoles.filter((c) => c.career.salaryTier === 'foundation').length,
      activeMidCount: activeRoles.filter((c) => c.career.salaryTier === 'growth').length,
      activeHighCount: activeRoles.filter((c) => c.career.salaryTier === 'premium').length
    };
  }, [enrichedCareerCards, selectedBranchKey, branchOnlyCore, user.education?.branch]);

  // Filter and search
  const filteredAndSorted = useMemo(() => {
    return enrichedCareerCards
      .filter((item) => {
        // 1. Branch & Discipline Filter
        let matchesBranch = true;
        if (selectedBranchKey === 'my_branch') {
          if (user.education?.branch) {
            matchesBranch = branchOnlyCore
              ? item.affinity.isDirect
              : item.affinity.isDirect || item.affinity.isSecondary;
          }
        } else if (selectedBranchKey === 'all') {
          matchesBranch = true;
        } else {
          matchesBranch = isCareerInBranch(item.career, selectedBranchKey);
        }

        // 2. Domain Filter
        const matchesDomain =
          selectedDomain === 'All' ||
          item.career.category.toLowerCase().includes(selectedDomain.toLowerCase()) ||
          item.career.domain.toLowerCase().includes(selectedDomain.toLowerCase());

        // 3. Salary Bracket Filter (Low / Mid / High)
        const matchesTier =
          selectedSalaryTier === 'All' || item.career.salaryTier === selectedSalaryTier;

        // 4. Text Search
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.career.title.toLowerCase().includes(query) ||
          item.career.description.toLowerCase().includes(query) ||
          item.career.domain.toLowerCase().includes(query) ||
          item.career.topRecruiters.some((r) => r.toLowerCase().includes(query)) ||
          item.career.requiredSkills.some((s) => s.name.toLowerCase().includes(query));

        return matchesBranch && matchesDomain && matchesTier && matchesSearch;
      })
      .sort((a, b) => {
        // Target career always pinned first
        if (a.isTarget && !b.isTarget) return -1;
        if (!a.isTarget && b.isTarget) return 1;

        if (sortBy === 'match') {
          // Direct core branch matches come first!
          if (a.affinity.isDirect && !b.affinity.isDirect) return -1;
          if (!a.affinity.isDirect && b.affinity.isDirect) return 1;
          // Secondary synergy matches come next
          if (a.affinity.isSecondary && !b.affinity.isSecondary && !b.affinity.isDirect) return -1;
          if (!a.affinity.isSecondary && b.affinity.isSecondary && !a.affinity.isDirect) return 1;
          return b.matchScore - a.matchScore;
        }
        if (sortBy === 'growth') {
          return b.career.growthOutlook.localeCompare(a.career.growthOutlook);
        }
        if (sortBy === 'salary_high') {
          // Sort by salary upper bound (highest paying roles first)
          const getHighNum = (str: string) => {
            const matches = [...str.matchAll(/([0-9]+(?:\.[0-9]+)?)/g)];
            if (!matches || matches.length === 0) return 0;
            const nums = matches.map((m) => parseFloat(m[1])).filter((n) => !isNaN(n));
            return nums.length > 0 ? Math.max(...nums) : 0;
          };
          return getHighNum(b.career.salaryRange) - getHighNum(a.career.salaryRange);
        }
        if (sortBy === 'salary_low') {
          // Sort by salary lower bound (accessible, fresher-friendly entry packages first)
          const getLowNum = (str: string) => {
            const matches = [...str.matchAll(/([0-9]+(?:\.[0-9]+)?)/g)];
            if (!matches || matches.length === 0) return 0;
            const nums = matches.map((m) => parseFloat(m[1])).filter((n) => !isNaN(n));
            return nums.length > 0 ? Math.min(...nums) : 0;
          };
          return getLowNum(a.career.salaryRange) - getLowNum(b.career.salaryRange);
        }
        return b.matchScore - a.matchScore;
      });
  }, [enrichedCareerCards, selectedBranchKey, branchOnlyCore, selectedDomain, selectedSalaryTier, searchQuery, sortBy, user.education?.branch]);

  // Handle setting active target goal
  const handleSetTarget = async (careerTitle: string, careerId: string) => {
    try {
      await api.updateProfile(user.id, { careerGoal: careerTitle });
      onSelectCareer(careerId, careerTitle);
      setGoalSavedNotification(`"${careerTitle}" is now your active target career!`);
      setTimeout(() => setGoalSavedNotification(null), 4000);
    } catch (err) {
      console.error('Failed to update target goal:', err);
    }
  };

  // Handle adding custom career
  const handleAddCustomCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const skillList = newSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ name, importance: 'high' as const, category: 'Technical' }));

    const recruiterList = newRecruiters
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);

    const created: CareerPath = {
      id: `custom-career-${Date.now()}`,
      title: newTitle.trim(),
      domain: newDomain,
      category: newDomain as any,
      salaryTier: newSalaryTier,
      description: newDescription.trim() || 'Practical career pathway aligned with modern recruitment standards.',
      whyExciting: 'Clear entry requirements with fast-track promotional milestones.',
      salaryRange: newSalary.trim() || '₹4.5 LPA - ₹8.0 LPA',
      averageSalaryIndia: newSalary.trim() || '₹4.5 LPA - ₹8.0 LPA',
      growthOutlook: newGrowth.trim() || '+20% Growing Demand',
      experienceLevel: 'Entry-Level / Graduate',
      requiredSkills: skillList.length > 0 ? skillList : [{ name: 'Problem Solving', importance: 'high', category: 'General' }],
      recommendedDisciplines: [user.education?.branch || 'Engineering', 'Commerce', 'Science'],
      topRecruiters: recruiterList.length > 0 ? recruiterList : ['Leading Recruiters', 'Service & Product Firms'],
      topRecruitersIndia: recruiterList.length > 0 ? recruiterList : ['Leading Recruiters'],
      keyResponsibilities: [
        'Deliver reliable project tasks and team deliverables on schedule',
        'Learn tools and frameworks under the mentorship of senior team leads',
        'Execute daily responsibilities maintaining quality and accuracy'
      ],
      sampleJobTitles: [newTitle.trim(), `Junior ${newTitle.trim()}`, `Associate ${newTitle.trim()}`],
      interviewTopics: ['Core Problem Solving', 'Basic Technical Assessment', 'Communication & Team Alignment'],
      portfolioProjects: [`Academic / Personal Project demonstrating skills in ${newTitle.trim()}`],
      dayInTheLife: 'Participate in team check-ins, execute daily assignments, troubleshoot issues, and report progress.'
    };

    setCustomCareers([created, ...customCareers]);
    setNewTitle('');
    setNewDescription('');
    setShowAddModal(false);
  };

  // Helper for tier badge styling
  const renderTierBadge = (tier: SalaryTier) => {
    switch (tier) {
      case 'foundation':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 shadow-sm">
            <span>🌱</span>
            <span>Entry / Fresher (₹2.5 - 6.5 LPA)</span>
          </span>
        );
      case 'growth':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 shadow-sm">
            <span>⚡</span>
            <span>Growth (₹6.5 - 14 LPA)</span>
          </span>
        );
      case 'premium':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#350F05] border border-[#DE4313]/60 text-[#FEC163] shadow-sm">
            <span>👑</span>
            <span>High Earner (₹14+ - 50+ LPA)</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-16 font-sans">
      {/* =========================================================================
         1. HERO HEADER: CLEAN, INSPIRING, REALISTIC SPECTRUM
         ========================================================================= */}
      <div className="border-b border-[#FEC163]/20 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#FEC163] font-mono mb-1.5 flex-wrap">
            <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-[#DE4313] animate-pulse"></span>
              Comprehensive Placement Spectrum
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Foundation to High-CTC Tracks</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>INR (₹ LPA) Benchmarks</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-[#FEC163] to-[#DE4313] bg-clip-text text-transparent flex items-center gap-3">
            <Compass className="h-7 w-7 text-[#FEC163]" />
            <span>Career Explorer & Placement Pathways</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Explore diverse career opportunities spanning entry-level graduate trainees (₹3.5 - 7 LPA), mid-growth roles (₹7 - 15 LPA), and high-paying premium tech roles (₹15+ to ₹45+ LPA) tailored to your background in{' '}
            <span className="text-[#FEC163] font-semibold">
              {user.education?.degree} {user.education?.branch}
            </span>.
          </p>
        </div>

        {/* Quick Stats Bento & Action */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          <div className="px-3.5 py-2 rounded-xl bg-[#0F0804] border border-[#FEC163]/30 text-right">
            <div className="text-[10px] text-slate-400 font-mono uppercase">Indexed Tracks</div>
            <div className="text-base font-bold text-[#FEC163] font-mono">
              {allCareerLibrary.length} Career Roles
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold text-xs hover:brightness-110 transition-all shadow-md cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Career Track</span>
          </button>
        </div>
      </div>

      {/* Goal Notification Toast */}
      {goalSavedNotification && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-3 animate-fade-in shadow-lg">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{goalSavedNotification}</span>
        </div>
      )}

      {/* =========================================================================
         2. DISCIPLINE & BRANCH SELECTOR TABS
         ========================================================================= */}
      <div className="space-y-4">
        {/* Branch / Field Horizontal Scrollable Tab Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              <GraduationCap className="h-4 w-4 text-[#FEC163]" />
              <span>Select Engineering & Career Discipline:</span>
            </div>
            {user.education?.branch && (
              <span className="text-[11px] text-[#FEC163] font-mono bg-[#200A04] border border-[#FEC163]/30 px-2 py-0.5 rounded-lg flex items-center gap-1">
                <span>Active Profile:</span>
                <strong className="text-white">{user.education?.degree} {user.education?.branch}</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {MAJOR_BRANCH_DEFINITIONS.map((bDef) => {
              const isSelected = selectedBranchKey === bDef.key;
              const isMyBranchTab = bDef.key === 'my_branch';
              return (
                <button
                  key={bDef.key}
                  type="button"
                  onClick={() => setSelectedBranchKey(bDef.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-extrabold shadow-md shadow-[#DE4313]/30 ring-1 ring-[#FEC163]'
                      : isMyBranchTab
                      ? 'bg-[#220D05] border border-[#FEC163]/50 text-[#FEC163] hover:bg-[#301207]'
                      : 'bg-[#0E0603] text-slate-300 hover:text-white hover:bg-[#1A0A05] border border-[#FEC163]/20'
                  }`}
                >
                  <span className="text-sm">{bDef.icon}</span>
                  <span>{isMyBranchTab && user.education?.branch ? `My Branch (${user.education.branch})` : bDef.label}</span>
                  {isMyBranchTab && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${isSelected ? 'bg-black text-[#FEC163]' : 'bg-[#3A1408] text-white'}`}>
                      {branchStats.myBranchTotal}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
           BRANCH INTELLIGENCE BANNER: Tailored specifically to student profile
           ========================================================================= */}
        <div className="rounded-2xl border border-[#FEC163]/30 bg-gradient-to-br from-[#180A04] via-[#0E0502] to-[#080201] p-4 sm:p-5 shadow-2xl relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FEC163] mb-1">
                <Target className="h-4 w-4" />
                <span>
                  {selectedBranchKey === 'my_branch'
                    ? `TARGETED FOR YOUR MAJOR: ${user.education?.degree ? user.education.degree.toUpperCase() + ' ' : ''}${user.education?.branch?.toUpperCase() || 'GENERAL STUDIES'}`
                    : `EXPLORING: ${MAJOR_BRANCH_DEFINITIONS.find((b) => b.key === selectedBranchKey)?.label.toUpperCase()}`}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {selectedBranchKey === 'my_branch'
                  ? `Job Roles Aligned with ${user.education?.branch || 'Your Discipline'}`
                  : `${MAJOR_BRANCH_DEFINITIONS.find((b) => b.key === selectedBranchKey)?.description}`}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                {selectedBranchKey === 'my_branch' ? (
                  <>
                    We identified <strong className="text-emerald-300 font-bold">{branchStats.myCoreCount} Core Field Roles</strong> directly aligned with your curriculum, plus <strong className="text-blue-300 font-bold">{branchStats.mySynergyCount} High-Synergy Bridges</strong>. Both entry packages (₹2.5 - ₹6.5 LPA) and elite packages (₹15+ - ₹50+ LPA) are displayed below.
                  </>
                ) : (
                  <>
                    Reviewing roles across low, mid, and high salary brackets for this specialization.
                  </>
                )}
              </p>
            </div>

            {/* Toggle: Core Only vs Core + Synergy */}
            {selectedBranchKey === 'my_branch' && user.education?.branch && (
              <div className="shrink-0 flex items-center gap-2 bg-[#0A0402] border border-[#FEC163]/20 p-1.5 rounded-xl self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setBranchOnlyCore(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !branchOnlyCore
                      ? 'bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({branchStats.myBranchTotal})
                </button>
                <button
                  type="button"
                  onClick={() => setBranchOnlyCore(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    branchOnlyCore
                      ? 'bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Core Only ({branchStats.myCoreCount})
                </button>
              </div>
            )}
          </div>

          {/* Quick Salary Filter Shortcuts within this Branch */}
          <div className="pt-3 border-t border-[#FEC163]/15 flex flex-wrap items-center justify-between gap-3 text-xs relative z-10">
            <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
              <Coins className="h-3.5 w-3.5 text-[#FEC163]" />
              <span>Salary Brackets in this Track:</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* All Tiers */}
              <button
                type="button"
                onClick={() => setSelectedSalaryTier('All')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedSalaryTier === 'All'
                    ? 'bg-[#FEC163] text-black font-bold shadow-sm'
                    : 'bg-[#120603] text-slate-300 hover:text-white border border-[#FEC163]/25'
                }`}
              >
                ✨ All Brackets ({branchStats.activeCount})
              </button>

              {/* Low / Entry Tier */}
              <button
                type="button"
                onClick={() => setSelectedSalaryTier('foundation')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedSalaryTier === 'foundation'
                    ? 'bg-emerald-950 border border-emerald-500 text-emerald-200 font-bold shadow-sm'
                    : 'bg-[#120603] text-emerald-300 hover:text-emerald-100 border border-emerald-800/40'
                }`}
              >
                <span>🌱</span>
                <span>Low / Entry (₹2.5 - 6.5 LPA · {branchStats.activeLowCount})</span>
              </button>

              {/* Mid / Growth Tier */}
              <button
                type="button"
                onClick={() => setSelectedSalaryTier('growth')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedSalaryTier === 'growth'
                    ? 'bg-amber-950 border border-amber-500 text-amber-200 font-bold shadow-sm'
                    : 'bg-[#120603] text-amber-300 hover:text-amber-100 border border-amber-800/40'
                }`}
              >
                <span>⚡</span>
                <span>Mid / Growth (₹6.5 - 14 LPA · {branchStats.activeMidCount})</span>
              </button>

              {/* High / Elite Tier */}
              <button
                type="button"
                onClick={() => setSelectedSalaryTier('premium')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedSalaryTier === 'premium'
                    ? 'bg-[#350F05] border border-[#DE4313] text-[#FEC163] font-bold shadow-sm'
                    : 'bg-[#120603] text-[#FEC163] hover:text-white border border-[#DE4313]/40'
                }`}
              >
                <span>👑</span>
                <span>High-Paying (₹15+ - 50+ LPA · {branchStats.activeHighCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar & Sorters */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#FEC163]/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role title, skill (Excel, Python, CAD), or company..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#0F0804] border border-[#FEC163]/25 text-white placeholder-slate-500 focus:border-[#FEC163] focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Sort & View Options */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F0804] border border-[#FEC163]/25 text-xs">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#FEC163]" />
              <span className="text-slate-400 text-[11px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="match" className="bg-[#1A0A04] text-white">Best Profile Fit (Core First)</option>
                <option value="salary_low" className="bg-[#1A0A04] text-white">Entry / Low Package First</option>
                <option value="salary_high" className="bg-[#1A0A04] text-white">Highest Package First</option>
                <option value="growth" className="bg-[#1A0A04] text-white">Industry Growth</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="inline-flex rounded-xl bg-[#0F0804] border border-[#FEC163]/25 p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-[#FEC163] text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-[#FEC163] text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
         3. CAREER CARDS GRID / LIST
         ========================================================================= */}
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#FEC163] border-t-transparent"></div>
          <p className="text-xs text-[#FEC163] font-mono">
            Evaluating career match suitability across all salary brackets...
          </p>
        </div>
      ) : filteredAndSorted.length === 0 ? (
        <div className="rounded-2xl border border-[#FEC163]/20 bg-[#0A0402]/90 p-12 text-center space-y-3">
          <Compass className="h-8 w-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Career Tracks Found for this Filter</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try resetting your branch filter or salary bracket to view all available roles.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedBranchKey('my_branch');
              setBranchOnlyCore(false);
              setSelectedSalaryTier('All');
            }}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#1A0A04] border border-[#FEC163]/40 text-[#FEC163] hover:text-white hover:bg-[#250C05] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAndSorted.map(({ career, matchScore, matchedSkills, missingSkills, isTarget, affinity }) => {
            return (
              <div
                key={career.id}
                className={`relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_15px_35px_rgba(222,67,19,0.18)] ${
                  isTarget
                    ? 'border-[#FEC163] bg-gradient-to-b from-[#1C0D05] to-[#0A0402] shadow-[0_0_25px_rgba(254,193,99,0.15)] ring-1 ring-[#FEC163]/40'
                    : 'border-[#FEC163]/25 bg-[#0C0603]/95 hover:border-[#FEC163]/60 hover:bg-[#120704]'
                }`}
              >
                {/* Active Goal Ribbon */}
                {isTarget && (
                  <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-extrabold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1 z-10">
                    <Star className="h-3 w-3 fill-black text-black" />
                    <span>Active Goal</span>
                  </div>
                )}

                <div className="space-y-3.5">
                  {/* Branch Match Pill & Tier Badge */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    {affinity.isDirect ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        <Target className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Core {user.education?.branch ? user.education.branch.split(' ')[0] : 'Major'} Role</span>
                      </span>
                    ) : affinity.isSecondary ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30">
                        <Zap className="h-3.5 w-3.5 text-blue-400" />
                        <span>High-Synergy Bridge</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-lg bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                        <Compass className="h-3.5 w-3.5 text-zinc-500" />
                        <span>Cross-Discipline</span>
                      </span>
                    )}

                    {renderTierBadge(career.salaryTier)}
                  </div>

                  {/* Title & Domain */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#FEC163] transition-colors leading-snug">
                      {career.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      {career.domain}
                    </p>
                  </div>

                  {/* Branch Alignment Reasoning Box */}
                  <div className="p-2.5 rounded-xl bg-black/45 border border-white/[0.06] text-[11px] text-zinc-300 flex items-start gap-2">
                    <GraduationCap className="h-3.5 w-3.5 text-[#FEC163] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {affinity.reason}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {career.description}
                  </p>

                  {/* Key Highlights Micro-Bento */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#060302] border border-[#FEC163]/15 text-xs font-mono">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tight">Compensation</div>
                      <div className="text-xs font-bold text-amber-200 truncate">
                        {career.salaryRange}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tight">Profile Fit Score</div>
                      <div className="text-xs font-bold text-emerald-400 truncate">
                        {matchScore}% Match
                      </div>
                    </div>
                  </div>

                  {/* Skills Snapshot */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Key Prerequisites</span>
                      <span className="font-mono text-[#FEC163]">
                        {matchedSkills.length} / {career.requiredSkills.length} Acquired
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {career.requiredSkills.slice(0, 5).map((sk) => {
                        const hasSkill = matchedSkills.some(
                          (m) => m.toLowerCase() === sk.name.toLowerCase()
                        );
                        return (
                          <span
                            key={sk.name}
                            className={`text-[10px] px-2 py-0.5 rounded-md font-mono transition-colors ${
                              hasSkill
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 font-bold'
                                : 'bg-[#180803] text-slate-400 border border-[#FEC163]/20'
                            }`}
                          >
                            {hasSkill ? '✓ ' : ''}{sk.name}
                          </span>
                        );
                      })}
                      {career.requiredSkills.length > 5 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-slate-500 font-mono">
                          +{career.requiredSkills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Top Recruiters */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 flex-wrap">
                    <Building2 className="h-3.5 w-3.5 text-[#FEC163]/70 shrink-0" />
                    <span className="text-slate-500 text-[10px]">Hiring Leaders:</span>
                    <span className="text-slate-300 truncate font-medium">
                      {career.topRecruiters.slice(0, 3).join(', ')}
                    </span>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 mt-4 border-t border-[#FEC163]/15 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setInspectingCareer(career)}
                    className="inline-flex items-center gap-1 text-xs text-[#FEC163] hover:text-white font-semibold transition-colors cursor-pointer group/btn"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View Blueprint</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {isTarget ? (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-600/50 text-emerald-300 text-xs font-bold flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        <span>Active Goal</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetTarget(career.title, career.id)}
                        className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black text-xs font-bold hover:brightness-110 transition-all shadow-sm cursor-pointer"
                      >
                        Set as Goal
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        onSelectCareer(career.id, career.title);
                        onNavigate('skillgap');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#140603] hover:bg-[#200A05] border border-[#FEC163]/30 text-amber-200 text-xs font-medium transition-colors cursor-pointer"
                      title="Run Skill Gap Analysis"
                    >
                      Gap Analysis →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredAndSorted.map(({ career, matchScore, matchedSkills, isTarget, affinity }) => (
            <div
              key={career.id}
              className={`rounded-2xl border p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                isTarget
                  ? 'border-[#FEC163] bg-[#160A04]'
                  : 'border-[#FEC163]/20 bg-[#0C0603] hover:border-[#FEC163]/50'
              }`}
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  {affinity.isDirect ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Core Match
                    </span>
                  ) : affinity.isSecondary ? (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                      Synergy Bridge
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      Cross-Track
                    </span>
                  )}
                  {renderTierBadge(career.salaryTier)}
                  <h3 className="text-base font-bold text-white">{career.title}</h3>
                  {isTarget && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600 text-emerald-300 font-bold">
                      Active Goal
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 line-clamp-1">{career.description}</p>
                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-3 flex-wrap">
                  <span>Compensation: <strong className="text-amber-200">{career.salaryRange}</strong></span>
                  <span>·</span>
                  <span>Branch Rationale: <strong className="text-slate-300">{affinity.reason}</strong></span>
                  <span>·</span>
                  <span>Recruiters: <strong className="text-slate-300">{career.topRecruiters.slice(0, 3).join(', ')}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                <div className="text-right">
                  <div className="text-base font-black text-emerald-400 font-mono">{matchScore}%</div>
                  <div className="text-[10px] text-slate-500">Profile Fit</div>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectingCareer(career)}
                  className="px-3 py-1.5 rounded-xl bg-[#1A0A04] border border-[#FEC163]/30 text-amber-200 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Blueprint
                </button>

                {!isTarget && (
                  <button
                    type="button"
                    onClick={() => handleSetTarget(career.title, career.id)}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black text-xs font-bold hover:brightness-110 cursor-pointer"
                  >
                    Set Goal
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
         4. DETAILED CAREER BLUEPRINT MODAL
         ========================================================================= */}
      {inspectingCareer && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-[#FEC163]/40 bg-[#0E0704] text-white font-sans shadow-2xl my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#FEC163]/20 flex items-start justify-between gap-4 bg-[#140804]">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-mono font-bold text-[#FEC163] uppercase tracking-wider">
                    {inspectingCareer.category}
                  </span>
                  <span className="text-slate-600">·</span>
                  {renderTierBadge(inspectingCareer.salaryTier)}
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-slate-400">
                    {inspectingCareer.experienceLevel}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {inspectingCareer.title}
                </h2>
                <p className="text-xs text-amber-200/90 mt-1 max-w-xl">
                  {inspectingCareer.whyExciting}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInspectingCareer(null)}
                className="p-1.5 rounded-xl bg-[#220D05] border border-[#FEC163]/30 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
              {/* Compensation & Growth Bento */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#080302] border border-[#FEC163]/20">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Compensation Range (INR)</div>
                  <div className="text-sm font-bold text-amber-200 mt-0.5">{inspectingCareer.salaryRange}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#080302] border border-[#FEC163]/20">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Market Demand</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">{inspectingCareer.growthOutlook}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#080302] border border-[#FEC163]/20">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Recommended Majors</div>
                  <div className="text-xs font-medium text-slate-300 mt-0.5 truncate">
                    {inspectingCareer.recommendedDisciplines.slice(0, 2).join(', ')}
                  </div>
                </div>
              </div>

              {/* Day in the Life */}
              <div className="p-4 rounded-xl bg-[#1A0A04]/80 border border-[#FEC163]/25 space-y-1.5">
                <div className="text-xs font-bold text-[#FEC163] uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  <span>A Day in the Life</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {inspectingCareer.dayInTheLife}
                </p>
              </div>

              {/* Core Responsibilities */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Core Responsibilities & Deliverables
                </h4>
                <ul className="space-y-1.5">
                  {inspectingCareer.keyResponsibilities.map((resp, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 text-[#FEC163] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisite Skills Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Required Technical & Professional Skills
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {inspectingCareer.requiredSkills.map((sk) => {
                    const hasSkill = normalizedUserSkills.some((us) =>
                      us.includes(sk.name.toLowerCase()) || sk.name.toLowerCase().includes(us)
                    );
                    return (
                      <div
                        key={sk.name}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                          hasSkill
                            ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                            : 'bg-[#120603] border-[#FEC163]/20 text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{sk.name}</div>
                          <div className="text-[10px] text-slate-500">{sk.category}</div>
                        </div>
                        {hasSkill && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Standout Portfolio Projects */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Recommended Portfolio Projects to Stand Out
                </h4>
                <div className="space-y-1.5">
                  {inspectingCareer.portfolioProjects.map((proj, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3 rounded-xl bg-[#080302] border border-[#FEC163]/20 text-xs flex items-center gap-2.5 text-slate-200"
                    >
                      <Briefcase className="h-4 w-4 text-[#FEC163] shrink-0" />
                      <span>{proj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Interview Topics */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Key Technical Interview Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {inspectingCareer.interviewTopics.map((topic, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-[#180A04] border border-[#FEC163]/25 text-amber-200 text-xs font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Recruiting Companies */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Leading Employers Actively Hiring
                </h4>
                <div className="flex flex-wrap gap-2">
                  {inspectingCareer.topRecruiters.map((rec, rIdx) => (
                    <span
                      key={rIdx}
                      className="px-3 py-1 rounded-xl bg-[#0D0502] border border-[#FEC163]/30 text-white text-xs font-medium"
                    >
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA Bar */}
            <div className="p-4 sm:p-5 border-t border-[#FEC163]/20 bg-[#120603] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Ready to prepare for <strong className="text-white">{inspectingCareer.title}</strong>?
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    handleSetTarget(inspectingCareer.title, inspectingCareer.id);
                    setInspectingCareer(null);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black text-xs font-bold hover:brightness-110 transition-all shadow-md cursor-pointer"
                >
                  Set as My Goal
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectCareer(inspectingCareer.id, inspectingCareer.title);
                    setInspectingCareer(null);
                    onNavigate('skillgap');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#220D05] hover:bg-[#301207] border border-[#FEC163]/40 text-amber-200 text-xs font-semibold cursor-pointer"
                >
                  Skill Gap Audit →
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectCareer(inspectingCareer.id, inspectingCareer.title);
                    setInspectingCareer(null);
                    onNavigate('interview');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#2A0E06] hover:bg-[#3C1408] border border-[#DE4313]/60 text-white text-xs font-bold cursor-pointer"
                >
                  Mock Studio →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         5. ADD CUSTOM CAREER TRACK MODAL
         ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative mx-auto w-full max-w-lg rounded-2xl border border-[#FEC163]/40 bg-[#0E0704] text-white font-sans shadow-2xl p-6 space-y-5 my-auto">
            <div className="flex items-center justify-between border-b border-[#FEC163]/20 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Add New Career Pathway</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Input custom job tracks to evaluate against your skill profile.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomCareer} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Career Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Junior QA Engineer, Cloud Security Trainee"
                  className="w-full px-3 py-2 rounded-xl bg-[#1A0A04] border border-[#FEC163]/30 text-white placeholder-slate-500 focus:border-[#FEC163] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Domain Category</label>
                  <select
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1A0A04] border border-[#FEC163]/30 text-white focus:outline-none"
                  >
                    {CAREER_DOMAINS.filter((d) => d !== 'All').map((d) => (
                      <option key={d} value={d} className="bg-[#1A0A04]">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Salary Bracket</label>
                  <select
                    value={newSalaryTier}
                    onChange={(e) => setNewSalaryTier(e.target.value as SalaryTier)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1A0A04] border border-[#FEC163]/30 text-white focus:outline-none"
                  >
                    <option value="foundation" className="bg-[#1A0A04]">🌱 Foundation (₹3.5 - ₹7 LPA)</option>
                    <option value="growth" className="bg-[#1A0A04]">⚡ Growth (₹7 - ₹15 LPA)</option>
                    <option value="premium" className="bg-[#1A0A04]">👑 Premium (₹15+ LPA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Salary Range (INR)</label>
                <input
                  type="text"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  placeholder="e.g., ₹4.5 LPA - ₹7.5 LPA"
                  className="w-full px-3 py-2 rounded-xl bg-[#1A0A04] border border-[#FEC163]/30 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe the core mission and day-to-day value of this career..."
                  className="w-full px-3 py-2 rounded-xl bg-[#1A0A04] border border-[#FEC163]/30 text-white placeholder-slate-500 focus:border-[#FEC163] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Required Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="e.g., Excel, Manual Testing, SQL, Problem Solving"
                  className="w-full px-3 py-2 rounded-xl bg-[#1A0A04] border border-[#FEC163]/30 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Top Hiring Companies (Comma-separated)</label>
                <input
                  type="text"
                  value={newRecruiters}
                  onChange={(e) => setNewRecruiters(e.target.value)}
                  placeholder="e.g., TCS, Infosys, Wipro, Capgemini"
                  className="w-full px-3 py-2 rounded-xl bg-[#1A0A04] border border-[#FEC163]/30 text-white focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#FEC163]/20 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#1A0A04] border border-slate-700 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-black font-bold hover:brightness-110 transition-all cursor-pointer"
                >
                  Save Career Pathway
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
