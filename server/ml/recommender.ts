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
export function evaluateDisciplineSynergy(userBranch: string, careerDomain: string, userInterests: string[]): number {
  const branch = userBranch.toLowerCase();
  const domain = careerDomain.toLowerCase();
  const interests = userInterests.map(i => i.toLowerCase());

  // Direct branch affinity
  if (branch && domain.includes(branch.slice(0, 5))) return 0.95;

  // Cross-discipline bridge heuristics
  // 1. Engineering / Math -> Tech / Data / AI
  if ((branch.includes('mechanical') || branch.includes('civil') || branch.includes('electrical') || branch.includes('chemical') || branch.includes('physics')) &&
      (domain.includes('data') || domain.includes('software') || domain.includes('automation') || domain.includes('ai'))) {
    return 0.85;
  }

  // 2. Life Sciences / Biology -> Bioinformatics / Health Tech
  if ((branch.includes('bio') || branch.includes('medic') || branch.includes('health') || branch.includes('chem')) &&
      (domain.includes('bio') || domain.includes('health') || domain.includes('data') || domain.includes('clinical'))) {
    return 0.90;
  }

  // 3. Commerce / Economics -> Fintech / Product / Analytics
  if ((branch.includes('commerce') || branch.includes('business') || branch.includes('finance') || branch.includes('econ')) &&
      (domain.includes('finance') || domain.includes('product') || domain.includes('consulting') || domain.includes('business'))) {
    return 0.90;
  }

  // Check interest bridges
  let interestScore = 0.4;
  for (const interest of interests) {
    if (domain.includes(interest) || interest.includes(domain.slice(0, 4))) {
      interestScore = Math.max(interestScore, 0.85);
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
    const eduSynergy = evaluateDisciplineSynergy(userBranch, career.domain, user.interests || []);
    const educationRelevanceScore = Math.round(eduSynergy * 100);

    // 4. Preferred goal bonus
    const isDirectGoal = preferredGoal && (normalize(career.title).includes(normalize(preferredGoal)) || normalize(preferredGoal).includes(normalize(career.title)));
    const preferenceBonus = isDirectGoal ? 15 : 0;

    // Weighted composite overall score
    // 45% Skill match + 25% Interest + 20% Education transferability + 10% preference bonus
    let overallScore = Math.round(
      (skillMatchPercent * 0.45) +
      (interestAlignmentScore * 0.25) +
      (educationRelevanceScore * 0.20) +
      preferenceBonus
    );
    overallScore = Math.max(15, Math.min(99, overallScore));

    const isCrossDiscipline = userBranch ? !career.recommendedDisciplines.some(d => d.toLowerCase().includes(userBranch.toLowerCase())) : false;

    // Generate personalized human-readable explanation
    let matchExplanation = '';
    if (isDirectGoal) {
      matchExplanation = `Matches your explicitly stated target career goal. You already possess ${matchedSkills.length} key foundational competencies with clear runway to close ${missingSkills.length} skill gaps.`;
    } else if (isCrossDiscipline) {
      matchExplanation = `High-potential interdisciplinary bridge: your ${userBranch || 'academic'} foundation and interests in ${user.interests?.slice(0, 2).join(' & ') || 'modern industry'} provide strong analytical transferability to ${career.title}.`;
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

  // Sort descending by overall match score
  return results.sort((a, b) => b.overallScore - a.overallScore);
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
