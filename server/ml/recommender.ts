/**
 * Recommendation Engine & Skill Gap Analyzer
 * Implements vector feature representation, cosine similarity scoring,
 * cross-discipline transferability scoring, and gap prioritization.
 */

import { Career, User } from '../types.ts';

export interface CareerMatchScore {
  career: Career;
  overallScore: number; // 0 - 100
  skillMatchPercent: number; // 0 - 100
  interestAlignmentScore: number; // 0 - 100
  educationRelevanceScore: number; // 0 - 100
  matchedSkills: string[];
  missingSkills: { name: string; importance: 'high' | 'medium' | 'low'; reason: string }[];
  matchExplanation: string;
  isCrossDiscipline: boolean;
}

/**
 * Normalizes text string for token comparison
 */
function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Calculates Cosine Similarity between two binary/weighted term frequency vectors
 */
export function calculateCosineSimilarity(userVector: number[], targetVector: number[]): number {
  if (userVector.length !== targetVector.length || userVector.length === 0) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < userVector.length; i++) {
    dotProduct += userVector[i] * targetVector[i];
    normA += userVector[i] * userVector[i];
    normB += targetVector[i] * targetVector[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Determines transferability / interest alignment between student background & career
 */
export function evaluateDisciplineSynergy(
  userBranch: string,
  userDegree: string = '',
  careerDomain: string,
  recommendedDisciplines: string[] = [],
  userInterests: string[] = []
): number {
  const branch = (userBranch || '').toLowerCase();
  const degree = (userDegree || '').toLowerCase();
  const domain = (careerDomain || '').toLowerCase();
  const disciplines = (recommendedDisciplines || []).map(d => d.toLowerCase());
  const interests = (userInterests || []).map(i => i.toLowerCase());

  // 1. Direct discipline match against career's recommended disciplines
  if (branch) {
    const isDirectDiscipline = disciplines.some(d =>
      d.includes(branch) || branch.includes(d) ||
      (branch.includes('mech') && (d.includes('mech') || d.includes('auto') || d.includes('production'))) ||
      (branch.includes('civil') && (d.includes('civil') || d.includes('struct') || d.includes('construction'))) ||
      ((branch.includes('comput') || branch.includes('it') || branch.includes('software')) && (d.includes('comput') || d.includes('bca') || d.includes('it') || d.includes('software'))) ||
      ((branch.includes('elect') || branch.includes('ece') || branch.includes('eee')) && (d.includes('elect') || d.includes('ece') || d.includes('hardware'))) ||
      (branch.includes('bio') && (d.includes('bio') || d.includes('life science'))) ||
      ((branch.includes('comm') || branch.includes('bba') || branch.includes('mba') || branch.includes('econ')) && (d.includes('comm') || d.includes('bba') || d.includes('business') || d.includes('finance')))
    );
    if (isDirectDiscipline) return 0.98;
  }

  // 2. Open to any engineering major or any graduate
  if (disciplines.some(d => d.includes('any engineering') || d.includes('any major') || d.includes('any graduate'))) {
    if (degree.includes('b.tech') || degree.includes('b.e') || degree.includes('diploma') || branch.includes('eng')) {
      return 0.92;
    }
    return 0.85;
  }

  // 3. Direct domain text affinity
  if (branch && domain.includes(branch.slice(0, 5))) return 0.95;

  // 4. Cross-discipline bridge heuristics
  // Engineering / Math -> Tech / Data / Automation
  if ((branch.includes('mechanical') || branch.includes('civil') || branch.includes('electrical') || branch.includes('chemical') || branch.includes('physics')) &&
      (domain.includes('data') || domain.includes('software') || domain.includes('automation') || domain.includes('ai') || domain.includes('operations'))) {
    return 0.85;
  }

  // Life Sciences / Biology -> Bioinformatics / Health Tech
  if ((branch.includes('bio') || branch.includes('medic') || branch.includes('health') || branch.includes('chem')) &&
      (domain.includes('bio') || domain.includes('health') || domain.includes('data') || domain.includes('clinical'))) {
    return 0.90;
  }

  // Commerce / Economics -> Fintech / Product / Analytics
  if ((branch.includes('commerce') || branch.includes('business') || branch.includes('finance') || branch.includes('econ')) &&
      (domain.includes('finance') || domain.includes('product') || domain.includes('consulting') || domain.includes('business') || domain.includes('operations') || domain.includes('marketing'))) {
    return 0.90;
  }

  // Check interest bridges
  let interestScore = 0.45;
  for (const interest of interests) {
    if (domain.includes(interest) || interest.includes(domain.slice(0, 4))) {
      interestScore = Math.max(interestScore, 0.82);
    }
  }

  return interestScore;
}

/**
 * Recommends ranked careers based on user skills, interests, branch, and preferences
 */
export function rankCareersForUser(user: Partial<User>, allCareers: Career[]): CareerMatchScore[] {
  const userSkills = (user.skills || []).map(normalize);
  const userInterests = (user.interests || []).map(normalize);
  const userBranch = user.education?.branch || '';
  const userDegree = user.education?.degree || '';
  const preferredGoal = (user.careerGoal || '').toLowerCase();

  const results: CareerMatchScore[] = allCareers.map(career => {
    // 1. Build skill universe vector for this career
    const required = career.requiredSkills || [];
    const matchedSkills: string[] = [];
    const missingSkills: { name: string; importance: 'high' | 'medium' | 'low'; reason: string }[] = [];

    // Weights: high = 3, medium = 2, low = 1
    const targetVector: number[] = [];
    const userVector: number[] = [];

    required.forEach(skill => {
      const weight = skill.importance === 'high' ? 3 : skill.importance === 'medium' ? 2 : 1;
      targetVector.push(weight);

      const normSkill = normalize(skill.name);
      const isMatched = userSkills.some(us => us.includes(normSkill) || normSkill.includes(us));

      if (isMatched) {
        userVector.push(weight);
        matchedSkills.push(skill.name);
      } else {
        userVector.push(0);
        missingSkills.push({
          name: skill.name,
          importance: skill.importance,
          reason: `Crucial for ${career.title} workflows in ${skill.category}.`
        });
      }
    });

    const cosine = calculateCosineSimilarity(userVector, targetVector);
    const skillMatchPercent = Math.round(cosine * 100);

    // 2. Interest alignment score
    const careerText = `${career.title} ${career.domain} ${career.description}`.toLowerCase();
    let interestHits = 0;
    userInterests.forEach(interest => {
      if (careerText.includes(interest)) interestHits++;
    });
    const interestAlignmentScore = userInterests.length > 0
      ? Math.min(100, Math.round((interestHits / Math.max(1, userInterests.length)) * 100 + 40))
      : 60;

    // 3. Education synergy / Transferability score
    const eduSynergy = evaluateDisciplineSynergy(
      userBranch,
      userDegree,
      career.domain,
      career.recommendedDisciplines,
      user.interests || []
    );
    const educationRelevanceScore = Math.round(eduSynergy * 100);

    // 4. Preferred goal bonus & branch prioritization
    const isDirectGoal = preferredGoal && (normalize(career.title).includes(normalize(preferredGoal)) || normalize(preferredGoal).includes(normalize(career.title)));
    const preferenceBonus = isDirectGoal ? 15 : 0;

    // Strong branch relevance weighting for student profiles
    let branchPriorityBonus = 0;
    if (userBranch) {
      if (educationRelevanceScore >= 95) {
        branchPriorityBonus = 22; // Core major match
      } else if (educationRelevanceScore >= 80) {
        branchPriorityBonus = 8; // High synergy interdisciplinary bridge
      }
    }

    // Weighted composite overall score:
    // 35% Skill match + 35% Education/Branch alignment + 15% Interest + preference & branch boosts
    let overallScore = Math.round(
      (skillMatchPercent * 0.35) +
      (educationRelevanceScore * 0.35) +
      (interestAlignmentScore * 0.15) +
      preferenceBonus +
      branchPriorityBonus
    );
    overallScore = Math.max(25, Math.min(99, overallScore));

    const isCrossDiscipline = userBranch
      ? !career.recommendedDisciplines.some(d => d.toLowerCase().includes(userBranch.toLowerCase()))
      : false;

    // Generate personalized human-readable explanation
    let matchExplanation = '';
    if (isDirectGoal) {
      matchExplanation = `Direct match for your stated career goal. You already possess ${matchedSkills.length} key foundational competencies with clear runway to close ${missingSkills.length} skill gaps.`;
    } else if (educationRelevanceScore >= 95) {
      matchExplanation = `Core discipline match for your ${userBranch || 'field'} background. Your coursework gives you an immediate competitive advantage for ${career.title}.`;
    } else if (isCrossDiscipline) {
      matchExplanation = `High-potential interdisciplinary bridge: your ${userBranch || 'academic'} foundation and quantitative problem solving provide strong transferability to ${career.title}.`;
    } else {
      matchExplanation = `Natural progression from your ${userBranch || 'field'} studies. Your existing skills in ${matchedSkills.slice(0, 3).join(', ') || 'core principles'} establish strong foundational momentum.`;
    }

    return {
      career,
      overallScore,
      skillMatchPercent,
      interestAlignmentScore,
      educationRelevanceScore,
      matchedSkills,
      missingSkills,
      matchExplanation,
      isCrossDiscipline
    };
  });

  // Sort descending by goal preference, direct branch synergy, and overall match score
  return results.sort((a, b) => {
    // 1. Target career goal
    const aIsGoal = preferredGoal && (normalize(a.career.title).includes(normalize(preferredGoal)) || normalize(preferredGoal).includes(normalize(a.career.title)));
    const bIsGoal = preferredGoal && (normalize(b.career.title).includes(normalize(preferredGoal)) || normalize(preferredGoal).includes(normalize(b.career.title)));
    if (aIsGoal && !bIsGoal) return -1;
    if (!aIsGoal && bIsGoal) return 1;

    // 2. Direct branch match priority (core field matches come first for the student's profile)
    if (a.educationRelevanceScore >= 95 && b.educationRelevanceScore < 95) return -1;
    if (a.educationRelevanceScore < 95 && b.educationRelevanceScore >= 95) return 1;

    // 3. Overall composite score
    return b.overallScore - a.overallScore;
  });
}

/**
 * Detailed Skill Gap Analysis for a chosen target career
 */
export function performSkillGapAnalysis(userSkills: string[], targetCareer: Career) {
  const normUserSkills = userSkills.map(normalize);
  const matched: string[] = [];
  const missing: { name: string; importance: 'high' | 'medium' | 'low'; category: string; whyNeeded: string }[] = [];

  let totalWeight = 0;
  let earnedWeight = 0;

  for (const skill of targetCareer.requiredSkills) {
    const w = skill.importance === 'high' ? 3 : skill.importance === 'medium' ? 2 : 1;
    totalWeight += w;

    const normSkill = normalize(skill.name);
    const hasSkill = normUserSkills.some(us => us.includes(normSkill) || normSkill.includes(us));

    if (hasSkill) {
      matched.push(skill.name);
      earnedWeight += w;
    } else {
      missing.push({
        name: skill.name,
        importance: skill.importance,
        category: skill.category,
        whyNeeded: skill.importance === 'high'
          ? `Primary technical requirement for day-to-day ${targetCareer.title} responsibilities.`
          : `High-leverage differentiator in candidate selection and workplace execution.`
      });
    }
  }

  // Sort missing skills: high first, then medium, then low
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  missing.sort((a, b) => priorityOrder[a.importance] - priorityOrder[b.importance]);

  const matchPercent = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

  return {
    careerTitle: targetCareer.title,
    domain: targetCareer.domain,
    skillMatchPercentage: matchPercent,
    matchedSkills: matched,
    missingSkills: missing,
    readinessLevel: matchPercent >= 75 ? 'Job Ready / Advanced' : matchPercent >= 45 ? 'Intermediate / Strong Foundation' : 'Early Stage / Foundational Growth'
  };
}
