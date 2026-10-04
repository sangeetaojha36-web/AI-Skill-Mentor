/**
 * Express REST API Router for AI Skill Mentor
 * Implements complete REST endpoints for Auth, Profile, Resume NLP, Career Matching,
 * Skill Gap, Roadmaps, Courses, Projects, RAG Chat, Mock Interview, and Admin.
 */

import { Router, Request, Response } from 'express';
import { DB, INTERVIEW_QUESTIONS_BANK } from './db.ts';
import { extractSkillsNLP } from './ml/skillExtractor.ts';
import { rankCareersForUser, performSkillGapAnalysis } from './ml/recommender.ts';
import { retrieveRelevantKnowledge } from './ml/rag.ts';
import { generateChatResponse, evaluateInterviewAnswer, generateAdaptiveRoadmap } from './gemini.ts';
import { User, Career, Course, Project, ResumeAnalysis, Roadmap, MockInterviewSession, ChatMessage } from './types.ts';

export const apiRouter = Router();

// Middleware to parse JSON
apiRouter.use((req, _res, next) => {
  next();
});

// Helper: Extract current user from mock auth header or default to demo student
function getCurrentUser(req: Request): User {
  const userId = (req.headers['x-user-id'] as string) || req.query.userId as string;
  if (userId) {
    const found = DB.users.find(u => u.id === userId);
    if (found) return found;
  }
  return DB.users[0]; // Alex Rivera by default
}

/* ==========================================================================
   1. AUTH & PROFILE ROUTES
   ========================================================================== */

apiRouter.post('/auth/register', (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const existing = DB.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists. Please log in.' });
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    password: password || 'password123',
    passwordHash: password || 'password123',
    role: 'student',
    country: 'India',
    location: '',
    languages: ['English', 'Hindi'],
    schoolEducation: {
      tenthMarks: '',
      tenthBoard: 'CBSE',
      twelfthMarks: '',
      twelfthBoard: 'CBSE',
      twelfthStream: 'Science (PCM)'
    },
    education: {
      degree: 'B.Tech',
      branch: 'Computer Science & Engineering',
      college: '',
      currentYear: '1st Year',
      passingYear: '2028',
      cgpa: ''
    },
    skills: [],
    interests: [],
    careerGoal: 'Software Engineer',
    targetCompanies: [],
    experience: [],
    achievements: [],
    studentProjects: [],
    studentCourses: [],
    isProfileComplete: false,
    createdAt: new Date().toISOString()
  };

  DB.users.push(newUser);
  return res.status(201).json({ user: newUser, token: `token-${newUser.id}` });
});

apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Please enter your email.' });
  }

  const user = DB.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase().trim());
  if (!user) {
    return res.status(401).json({ error: 'Account not found with this email. Please sign up.' });
  }

  if (password && user.password && user.password !== password && user.passwordHash !== password) {
    return res.status(401).json({ error: 'Incorrect password. Please try again.' });
  }

  return res.json({ user, token: `token-${user.id}` });
});

apiRouter.get('/user/profile', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  return res.json({ user });
});

apiRouter.put('/user/profile', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const updates = req.body;

  if (updates.name !== undefined) user.name = updates.name;
  if (updates.age !== undefined) user.age = updates.age;
  if (updates.location !== undefined) user.location = updates.location;
  if (updates.stateOrCity !== undefined) user.stateOrCity = updates.stateOrCity;
  if (updates.country !== undefined) user.country = updates.country;
  if (updates.languages !== undefined) user.languages = updates.languages;
  
  if (updates.schoolEducation !== undefined) {
    user.schoolEducation = { ...user.schoolEducation, ...updates.schoolEducation };
  }
  
  if (updates.education !== undefined) {
    user.education = { ...user.education, ...updates.education };
  }

  if (updates.skills !== undefined) user.skills = updates.skills;
  if (updates.interests !== undefined) user.interests = updates.interests;
  if (updates.careerGoal !== undefined) user.careerGoal = updates.careerGoal;
  if (updates.targetCompanies !== undefined) user.targetCompanies = updates.targetCompanies;

  if (updates.experience !== undefined) user.experience = updates.experience;
  if (updates.achievements !== undefined) user.achievements = updates.achievements;
  if (updates.studentProjects !== undefined) user.studentProjects = updates.studentProjects;
  if (updates.studentCourses !== undefined) user.studentCourses = updates.studentCourses;
  if (updates.isProfileComplete !== undefined) user.isProfileComplete = updates.isProfileComplete;

  return res.json({ success: true, user });
});

/* ==========================================================================
   2. RESUME ANALYZER & NLP SKILL EXTRACTION
   ========================================================================== */

apiRouter.post('/resume/analyze', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { resumeText, fileName = 'resume.txt' } = req.body;

  if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length < 20) {
    return res.status(400).json({ error: 'Please provide valid resume text to analyze.' });
  }

  // 1. ML NLP Skill Extraction
  const nlpSkills = extractSkillsNLP(resumeText);
  const extractedSkillNames = nlpSkills.map(s => s.name);

  // 2. Extract sections using regex heuristics
  const lower = resumeText.toLowerCase();
  const hasEducation = lower.includes('education') || lower.includes('university') || lower.includes('bachelor') || lower.includes('degree') || lower.includes('master');
  const hasExperience = lower.includes('experience') || lower.includes('intern') || lower.includes('work') || lower.includes('employment');
  const hasProjects = lower.includes('project') || lower.includes('capstone') || lower.includes('portfolio');
  const hasCertifications = lower.includes('certificat') || lower.includes('license') || lower.includes('credential');

  // Metrics detection (e.g. %, $, numbers indicating achievements)
  const metricMatches = resumeText.match(/(\d+%\s*|\$\d+|\d+\s*hours|\d+\s*users|\d+\s*x)/gi) || [];
  const metricsCount = metricMatches.length;

  // 3. Compute Granular ATS Scores
  const skillsScore = Math.min(95, Math.max(50, 45 + extractedSkillNames.length * 4));
  const educationScore = hasEducation ? 90 : 40;
  const experienceScore = hasExperience ? Math.min(92, 60 + metricsCount * 5) : 45;
  const projectsScore = hasProjects ? 88 : 50;
  const achievementsScore = Math.min(90, Math.max(40, 40 + metricsCount * 8));
  const formattingScore = resumeText.length > 500 && (hasEducation && hasExperience) ? 88 : 65;
  const atsCompatibility = Math.round((skillsScore + educationScore + formattingScore) / 3);

  const totalScore = Math.round(
    (skillsScore * 0.25) +
    (experienceScore * 0.20) +
    (projectsScore * 0.15) +
    (educationScore * 0.15) +
    (achievementsScore * 0.10) +
    (atsCompatibility * 0.15)
  );

  // 4. Generate Strengths, Weaknesses, and Suggestions
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  if (extractedSkillNames.length >= 6) {
    strengths.push(`Identified strong skill inventory including ${extractedSkillNames.slice(0, 3).join(', ')}.`);
  } else {
    weaknesses.push('Limited specialized technical and domain skills detected.');
    suggestions.push('Add specific tools, frameworks, and domain competencies to your Skills section.');
  }

  if (metricsCount >= 3) {
    strengths.push(`Excellent use of quantified impact metrics (${metricsCount} measurable outcomes found).`);
  } else {
    weaknesses.push('Bullet points lack quantifiable metrics (e.g. percentage gains, time saved).');
    suggestions.push('Quantify your project outcomes (e.g., "Accelerated query response by 35%").');
  }

  if (hasProjects) {
    strengths.push('Good academic and practical project descriptions highlighting problem solving.');
  } else {
    weaknesses.push('No dedicated "Projects" section found.');
    suggestions.push('Create a dedicated Projects section showcasing 2-3 applied artifacts.');
  }

  if (!hasCertifications) {
    suggestions.push('Consider acquiring recognized industry certifications (e.g. AWS, Coursera, CFI, or Revit BIM).');
  }

  // 5. Update user's profile with newly extracted skills
  const mergedSkills = Array.from(new Set([...user.skills, ...extractedSkillNames]));
  user.skills = mergedSkills;

  const analysisRecord: ResumeAnalysis = {
    id: `resume-${Date.now()}`,
    userId: user.id,
    fileName,
    createdAt: new Date().toISOString(),
    score: totalScore,
    scoreBreakdown: {
      skills: skillsScore,
      education: educationScore,
      experience: experienceScore,
      projects: projectsScore,
      achievements: achievementsScore,
      formatting: formattingScore,
      atsCompatibility
    },
    extractedData: {
      skills: extractedSkillNames,
      education: hasEducation ? [user.education.degree || 'Degree Mentioned'] : [],
      experience: hasExperience ? ['Practical Experience & Roles detected'] : [],
      projects: hasProjects ? ['Project Portfolios detected'] : [],
      certifications: hasCertifications ? ['Certifications detected'] : [],
      languages: user.languages || ['English'],
      softSkills: nlpSkills.filter(s => s.category === 'soft').map(s => s.name)
    },
    strengths,
    weaknesses,
    suggestions
  };

  DB.resumes.unshift(analysisRecord);

  return res.json({ analysis: analysisRecord, nlpDetails: nlpSkills });
});

apiRouter.get('/resume/history', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const userResumes = DB.resumes.filter(r => r.userId === user.id);
  return res.json({ resumes: userResumes });
});

/* ==========================================================================
   3. CAREER RECOMMENDATION & SKILL GAP ANALYSIS
   ========================================================================== */

apiRouter.get('/careers', (_req: Request, res: Response) => {
  return res.json({ careers: DB.careers });
});

apiRouter.post('/careers/recommend', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const recommendations = rankCareersForUser(user, DB.careers);
  return res.json({ recommendations });
});

apiRouter.post('/skills/gap-analysis', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { careerId } = req.body;

  let targetCareer = DB.careers.find(c => c.id === careerId);
  if (!targetCareer) {
    targetCareer = DB.careers.find(c => c.title.toLowerCase() === (user.careerGoal || '').toLowerCase()) || DB.careers[0];
  }

  const gapAnalysis = performSkillGapAnalysis(user.skills, targetCareer);
  return res.json({ gapAnalysis, career: targetCareer });
});

/* ==========================================================================
   4. LEARNING ROADMAPS
   ========================================================================== */

apiRouter.get('/roadmaps/current', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  let roadmap = DB.roadmaps.find(r => r.userId === user.id);

  if (!roadmap) {
    // Return sample roadmap
    roadmap = DB.roadmaps[0];
  }
  return res.json({ roadmap });
});

apiRouter.post('/roadmaps/generate', async (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { careerId } = req.body;

  const targetCareer = DB.careers.find(c => c.id === careerId) || DB.careers[0];

  // Try adaptive roadmap generation via Gemini or fallback
  const aiSteps = await generateAdaptiveRoadmap(targetCareer.title, user.skills, user.education.branch);

  const steps = aiSteps || [
    {
      phase: 1,
      title: `Phase 1: Foundational Prerequisites for ${targetCareer.title}`,
      description: `Bridge core domain concepts while building on your background in ${user.education.branch}.`,
      skillsCovered: targetCareer.requiredSkills.slice(0, 2).map(s => s.name),
      estimatedWeeks: 3,
      completed: true,
      recommendedResources: [{ title: `${targetCareer.title} Fundamentals Primer`, type: 'Course' }]
    },
    {
      phase: 2,
      title: `Phase 2: Intermediate Tools & Workflows`,
      description: `Deep dive into industry-standard tooling and hands-on laboratory exercises.`,
      skillsCovered: targetCareer.requiredSkills.slice(2, 4).map(s => s.name),
      estimatedWeeks: 4,
      completed: false,
      recommendedResources: [{ title: `Practical Tooling Masterclass`, type: 'Interactive' }]
    },
    {
      phase: 3,
      title: `Phase 3: Applied Real-World Artifacts & Capstone`,
      description: `Build a production-grade portfolio project that demonstrates your capability to hiring managers.`,
      skillsCovered: targetCareer.requiredSkills.slice(4).map(s => s.name),
      estimatedWeeks: 4,
      completed: false,
      recommendedResources: [{ title: `End-to-End Capstone Project`, type: 'Project' }]
    },
    {
      phase: 4,
      title: `Phase 4: Interview Preparation & Industry Polish`,
      description: `Mock interviews, resume refinement with STAR metrics, and technical challenge drills.`,
      skillsCovered: ['Communication', 'Problem Solving'],
      estimatedWeeks: 2,
      completed: false,
      recommendedResources: [{ title: `Technical & Behavioral Interview Rubric`, type: 'Interactive' }]
    }
  ];

  const newRoadmap: Roadmap = {
    id: `roadmap-${Date.now()}`,
    userId: user.id,
    careerId: targetCareer.id,
    careerTitle: targetCareer.title,
    steps: steps.map((s: any, idx: number) => ({
      id: `step-${idx + 1}-${Date.now()}`,
      phase: s.phase || idx + 1,
      title: s.title,
      description: s.description,
      skillsCovered: s.skillsCovered || [],
      estimatedWeeks: s.estimatedWeeks || 3,
      completed: s.completed || false,
      recommendedResources: s.recommendedResources || []
    })),
    progressPercent: 25,
    updatedAt: new Date().toISOString()
  };

  // Replace or push
  const existingIdx = DB.roadmaps.findIndex(r => r.userId === user.id);
  if (existingIdx >= 0) {
    DB.roadmaps[existingIdx] = newRoadmap;
  } else {
    DB.roadmaps.push(newRoadmap);
  }

  return res.json({ roadmap: newRoadmap });
});

apiRouter.post('/roadmaps/toggle-step', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { stepId } = req.body;

  const roadmap = DB.roadmaps.find(r => r.userId === user.id) || DB.roadmaps[0];
  if (!roadmap) {
    return res.status(404).json({ error: 'Roadmap not found.' });
  }

  const step = roadmap.steps.find(s => s.id === stepId);
  if (step) {
    step.completed = !step.completed;
  }

  // Recalculate progress percentage
  const completedCount = roadmap.steps.filter(s => s.completed).length;
  roadmap.progressPercent = Math.round((completedCount / (roadmap.steps.length || 1)) * 100);
  roadmap.updatedAt = new Date().toISOString();

  return res.json({ roadmap });
});

/* ==========================================================================
   5. COURSES & PROJECTS RECOMMENDATION
   ========================================================================== */

apiRouter.get('/courses', (_req: Request, res: Response) => {
  return res.json({ courses: DB.courses });
});

apiRouter.post('/courses/recommend', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { skill, difficulty } = req.body;

  let filtered = [...DB.courses];
  if (skill) {
    filtered = filtered.filter(c => c.skill.toLowerCase().includes(skill.toLowerCase()));
  }
  if (difficulty) {
    filtered = filtered.filter(c => c.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  // Match missing skills from user's target career
  const targetCareer = DB.careers.find(c => c.title.toLowerCase() === (user.careerGoal || '').toLowerCase());
  const missingSkillNames = targetCareer
    ? targetCareer.requiredSkills.filter(rs => !user.skills.map(s => s.toLowerCase()).includes(rs.name.toLowerCase())).map(rs => rs.name)
    : [];

  return res.json({ courses: filtered, targetMissingSkills: missingSkillNames });
});

apiRouter.get('/projects', (_req: Request, res: Response) => {
  return res.json({ projects: DB.projects });
});

apiRouter.post('/projects/recommend', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { targetCareer, difficulty } = req.body;

  let filtered = [...DB.projects];
  if (targetCareer) {
    filtered = filtered.filter(p => p.targetCareer.toLowerCase().includes(targetCareer.toLowerCase()));
  }
  if (difficulty) {
    filtered = filtered.filter(p => p.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  return res.json({ projects: filtered, userGoal: user.careerGoal });
});

/* ==========================================================================
   6. RAG-BASED AI CAREER CHATBOT
   ========================================================================== */

apiRouter.get('/chat/history', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const history = DB.chatHistory.filter(c => c.userId === user.id);
  return res.json({ history });
});

apiRouter.post('/chat', async (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  // 1. RAG Vector search retrieval
  const retrievedDocs = retrieveRelevantKnowledge(message, 3);
  const ragContext = retrievedDocs.map(r => `[${r.document.title}]: ${r.document.content}`).join('\n\n');
  const ragSources = retrievedDocs.map(r => r.document.title);

  // 2. Profile summary string
  const profileSummary = `Degree: ${user.education.degree} in ${user.education.branch} (${user.education.college} - ${user.education.collegeTier || 'College'}). Current Skills: ${user.skills.join(', ')}. Career Goal: ${user.careerGoal}. Interests: ${user.interests.join(', ')}. Target Companies: ${(user.targetCompanies || []).join(', ')}.`;

  // 3. Generate Gemini response
  const aiAnswer = await generateChatResponse(message, profileSummary, ragContext);

  // 4. Save history
  const userMsg: ChatMessage = {
    id: `msg-${Date.now()}-user`,
    userId: user.id,
    sender: 'user',
    text: message,
    timestamp: new Date().toISOString()
  };

  const botMsg: ChatMessage = {
    id: `msg-${Date.now()}-bot`,
    userId: user.id,
    sender: 'assistant',
    text: aiAnswer,
    timestamp: new Date().toISOString(),
    ragSources
  };

  DB.chatHistory.push(userMsg, botMsg);

  return res.json({ response: aiAnswer, ragSources, userMessage: userMsg, botMessage: botMsg });
});

/* ==========================================================================
   7. AI MOCK INTERVIEW
   ========================================================================== */

apiRouter.post('/interview/match-companies', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { resumeText, linkedInUrl, skills } = req.body;

  let candidateSkills: string[] = Array.isArray(skills) ? [...skills] : [...user.skills];

  // If resume text provided, run NLP extraction
  if (resumeText && typeof resumeText === 'string') {
    const extracted = extractSkillsNLP(resumeText).map((s: any) => s.name);
    candidateSkills = Array.from(new Set([...candidateSkills, ...extracted]));
  }

  // If LinkedIn profile URL provided, infer typical skills based on handle or degree
  if (linkedInUrl && typeof linkedInUrl === 'string') {
    if (linkedInUrl.toLowerCase().includes('data') || linkedInUrl.toLowerCase().includes('analytics')) {
      candidateSkills.push('Python', 'SQL', 'Data Analytics', 'Power BI');
    } else if (linkedInUrl.toLowerCase().includes('mech') || linkedInUrl.toLowerCase().includes('auto')) {
      candidateSkills.push('CAD', 'SolidWorks', 'MATLAB', 'Robotics');
    } else {
      candidateSkills.push('Algorithms', 'Java', 'Problem Solving', 'Git');
    }
    candidateSkills = Array.from(new Set(candidateSkills));
  }

  return res.json({
    extractedSkills: candidateSkills,
    analyzedSource: resumeText ? 'Resume Document' : linkedInUrl ? 'LinkedIn Profile' : 'Student Account Profile'
  });
});

apiRouter.post('/interview/start', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const { career, interviewType = 'Technical', difficulty = 'Intermediate', companyName, targetRole } = req.body;

  const targetCareer = career || targetRole || user.careerGoal || 'Data Analyst';
  const pool = INTERVIEW_QUESTIONS_BANK[targetCareer] || INTERVIEW_QUESTIONS_BANK['Default'];

  // Select questions, customizing for company if provided
  const selectedQuestions = pool.map((q, idx) => {
    let questionText = q.question;
    if (companyName && idx === 0 && q.type === 'HR') {
      questionText = `Welcome to your campus interview for ${companyName}. To start off, introduce yourself and explain what specifically draws you to ${companyName} over other industry peers.`;
    }
    return {
      id: `q-${idx + 1}-${Date.now()}`,
      question: questionText,
      type: q.type,
      expectedKeyPoints: q.expectedKeyPoints
    };
  });

  const session: MockInterviewSession = {
    id: `interview-${Date.now()}`,
    userId: user.id,
    career: companyName ? `${companyName} · ${targetRole || targetCareer}` : targetCareer,
    interviewType,
    difficulty,
    questions: selectedQuestions,
    currentQuestionIndex: 0,
    completed: false,
    createdAt: new Date().toISOString()
  };

  DB.interviews.unshift(session);

  return res.json({ session });
});

apiRouter.post('/interview/answer', async (req: Request, res: Response) => {
  const { sessionId, questionIndex, answer } = req.body;

  const session = DB.interviews.find(s => s.id === sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Interview session not found.' });
  }

  const q = session.questions[questionIndex];
  if (!q) {
    return res.status(400).json({ error: 'Question index invalid.' });
  }

  q.userAnswer = answer;

  // AI Evaluation via Gemini
  const evalResult = await evaluateInterviewAnswer(session.career, q.question, q.type, q.expectedKeyPoints, answer);
  q.score = evalResult.score;
  q.feedback = evalResult.feedback;

  // Advance index
  session.currentQuestionIndex = questionIndex + 1;
  if (session.currentQuestionIndex >= session.questions.length) {
    session.completed = true;

    // Calculate aggregated overall score
    const scores = session.questions.map(item => item.score || 70);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    session.overallScore = avg;

    session.breakdown = {
      technicalKnowledge: Math.min(95, Math.max(60, avg + 3)),
      communication: Math.min(92, Math.max(65, avg - 2)),
      problemSolving: Math.min(96, Math.max(62, avg + 1)),
      questionCoverage: 100
    };

    session.summaryFeedback = `Interview finished with an overall score of ${avg}/100. Demonstrated clear conceptual fluency with actionable opportunities to incorporate STAR framework quantitative results.`;
    session.areasToImprove = evalResult.improvements;
    DB.analytics.mockInterviewsCompleted++;
  }

  return res.json({ session, questionResult: q });
});

apiRouter.get('/interview/history', (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const userInterviews = DB.interviews.filter(i => i.userId === user.id);
  return res.json({ interviews: userInterviews });
});

/* ==========================================================================
   8. PERSONALIZED DASHBOARD & PROGRESS
   ========================================================================== */

apiRouter.get('/dashboard', (req: Request, res: Response) => {
  const user = getCurrentUser(req);

  // 1. Recommended careers
  const careerRecommendations = rankCareersForUser(user, DB.careers).slice(0, 4);

  // 2. Target career match & gap
  const topCareer = careerRecommendations[0]?.career || DB.careers[0];
  const gapAnalysis = performSkillGapAnalysis(user.skills, topCareer);

  // 3. User's roadmap
  const roadmap = DB.roadmaps.find(r => r.userId === user.id) || DB.roadmaps[0];

  // 4. Latest resume analysis
  const latestResume = DB.resumes.find(r => r.userId === user.id);

  // 5. Latest mock interview
  const latestInterview = DB.interviews.find(i => i.userId === user.id && i.completed);

  // 6. Recommended courses & projects for top career
  const recommendedCourses = DB.courses
    .filter(c => gapAnalysis.missingSkills.some(ms => ms.name.toLowerCase() === c.skill.toLowerCase()))
    .slice(0, 3);

  const recommendedProjects = DB.projects
    .filter(p => p.targetCareer.toLowerCase().includes(topCareer.title.toLowerCase()))
    .slice(0, 2);

  // 7. Profile completeness percentage
  let completeness = 30;
  if (user.education.branch) completeness += 20;
  if (user.skills.length >= 3) completeness += 20;
  if (user.interests.length >= 2) completeness += 15;
  if (latestResume) completeness += 15;

  return res.json({
    user,
    profileCompleteness: Math.min(100, completeness),
    topCareer,
    gapAnalysis,
    roadmap,
    latestResume,
    latestInterview,
    recommendedCourses,
    recommendedProjects,
    careerRecommendations
  });
});

/* ==========================================================================
   9. ADMIN DASHBOARD & CRUD
   ========================================================================== */

apiRouter.get('/admin/stats', (_req: Request, res: Response) => {
  return res.json({
    totalUsers: DB.users.length,
    activeLearners: DB.analytics.totalStudentsIndexed,
    totalCareers: DB.careers.length,
    totalCourses: DB.courses.length,
    totalProjects: DB.projects.length,
    totalAssessments: DB.analytics.mockInterviewsCompleted,
    interviewCompletions: DB.analytics.mockInterviewsCompleted,
    placedInCurrentDrive: DB.analytics.placedInCurrentDrive,
    averageCTCJump: DB.analytics.averageCTCJump,
    popularCareers: [
      { name: 'Data Analyst & Business Insights', learners: 520 },
      { name: 'Full Stack Web Developer (MERN / Java)', learners: 480 },
      { name: 'Robotics & Industrial Automation Engineer', learners: 340 },
      { name: 'Bioinformatics & Genomic Data Scientist', learners: 280 },
      { name: 'Financial & FinTech Analytics Specialist', learners: 250 }
    ],
    topSkillsInDemand: [
      { skill: 'Python', demandScore: 98 },
      { skill: 'SQL', demandScore: 95 },
      { skill: 'Power BI', demandScore: 89 },
      { skill: 'DSA (Data Structures)', demandScore: 92 },
      { skill: 'ROS / Robotics', demandScore: 81 }
    ]
  });
});

apiRouter.post('/admin/careers', (req: Request, res: Response) => {
  const newCareer: Career = {
    id: `career-${Date.now()}`,
    ...req.body
  };
  DB.careers.push(newCareer);
  return res.status(201).json({ career: newCareer });
});

apiRouter.put('/admin/careers/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = DB.careers.findIndex(c => c.id === id);
  if (idx < 0) return res.status(404).json({ error: 'Career not found.' });

  DB.careers[idx] = { ...DB.careers[idx], ...req.body };
  return res.json({ career: DB.careers[idx] });
});

apiRouter.delete('/admin/careers/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  DB.careers = DB.careers.filter(c => c.id !== id);
  return res.json({ success: true });
});

apiRouter.post('/admin/courses', (req: Request, res: Response) => {
  const newCourse: Course = {
    id: `course-${Date.now()}`,
    ...req.body
  };
  DB.courses.push(newCourse);
  return res.status(201).json({ course: newCourse });
});

apiRouter.post('/admin/projects', (req: Request, res: Response) => {
  const newProject: Project = {
    id: `proj-${Date.now()}`,
    ...req.body
  };
  DB.projects.push(newProject);
  return res.status(201).json({ project: newProject });
});

apiRouter.get('/admin/users', (_req: Request, res: Response) => {
  return res.json({ users: DB.users });
});
