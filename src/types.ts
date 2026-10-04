export interface SchoolEducation {
  tenthMarks?: string;
  tenthBoard?: string;
  twelfthMarks?: string;
  twelfthBoard?: string;
  twelfthStream?: string;
}

export interface CollegeEducation {
  degree: string;
  branch: string;
  college: string;
  collegeTier?: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Autonomous / State Univ';
  currentYear: string;
  passingYear?: string;
  cgpa?: string;
}

export interface StudentExperience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface StudentAchievement {
  id: string;
  title: string;
  eventOrIssuer: string;
  year: string;
  description: string;
}

export interface ProjectAiAnalysis {
  recruiterScore: number;
  impactSummary: string;
  verifiedSkills: string[];
  suggestedResumeBullets: string[];
  interviewQuestions: string[];
  analyzedAt: string;
}

export interface StudentProject {
  id: string;
  title: string;
  techStack: string[];
  description: string;
  link?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  previewType?: 'analytics' | 'saas' | 'code' | 'dashboard' | 'mobile' | 'custom';
  author?: string;
  createdAt?: string;
  isShared?: boolean;
  aiAnalysis?: ProjectAiAnalysis;
}

export interface StudentCourse {
  id: string;
  title: string;
  provider: string;
  year: string;
  certificateUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'admin';
  avatarUrl?: string;
  age?: number | string;
  country: string;
  location?: string;
  stateOrCity?: string;
  languages: string[];
  schoolEducation?: SchoolEducation;
  education: CollegeEducation;
  skills: string[];
  interests: string[];
  careerGoal: string;
  targetCompanies?: string[];
  experience?: StudentExperience[];
  achievements?: StudentAchievement[];
  studentProjects?: StudentProject[];
  studentCourses?: StudentCourse[];
  isProfileComplete?: boolean;
  createdAt: string;
}

export interface Career {
  id: string;
  title: string;
  domain: string;
  description: string;
  requiredSkills: { name: string; importance: 'high' | 'medium' | 'low'; category: string }[];
  recommendedDisciplines: string[];
  averageSalaryIndia: string;
  topRecruitersIndia: string[];
  growthOutlook: string;
  keyResponsibilities: string[];
  sampleJobTitles: string[];
}

export interface CareerMatchScore {
  career: Career;
  overallScore: number;
  skillMatchPercent: number;
  interestAlignmentScore: number;
  educationRelevanceScore: number;
  matchedSkills: string[];
  missingSkills: { name: string; importance: 'high' | 'medium' | 'low'; reason: string }[];
  matchExplanation: string;
  isCrossDiscipline: boolean;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  skill: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  url: string;
  type: 'Course' | 'Tutorial' | 'Interactive' | 'Certification';
  domain: string;
}

export interface Project {
  id: string;
  title: string;
  domain: string;
  targetCareer: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  keySkills: string[];
  deliverables: string[];
  estimatedHours: number;
}

export interface ResumeAnalysis {
  id: string;
  userId: string;
  fileName: string;
  createdAt: string;
  score: number;
  scoreBreakdown: {
    skills: number;
    education: number;
    experience: number;
    projects: number;
    achievements: number;
    formatting: number;
    atsCompatibility: number;
  };
  extractedData: {
    skills: string[];
    education: string[];
    experience: string[];
    projects: string[];
    certifications: string[];
    languages: string[];
    softSkills: string[];
  };
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface RoadmapStep {
  id: string;
  phase: number;
  title: string;
  description: string;
  skillsCovered: string[];
  estimatedWeeks: number;
  completed: boolean;
  recommendedResources: { title: string; type: string; url?: string }[];
}

export interface Roadmap {
  id: string;
  userId: string;
  careerId: string;
  careerTitle: string;
  steps: RoadmapStep[];
  progressPercent: number;
  updatedAt: string;
}

export interface MockInterviewQuestion {
  id: string;
  question: string;
  type: 'Technical' | 'HR' | 'Managerial' | 'Aptitude & Core' | 'Behavioral';
  expectedKeyPoints: string[];
  userAnswer?: string;
  score?: number;
  feedback?: string;
}

export interface MockInterviewSession {
  id: string;
  userId: string;
  career: string;
  interviewType: 'Technical' | 'HR' | 'Managerial' | 'Aptitude & Core' | 'Comprehensive Campus Drive';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: MockInterviewQuestion[];
  currentQuestionIndex: number;
  completed: boolean;
  overallScore?: number;
  breakdown?: {
    technicalKnowledge: number;
    communication: number;
    problemSolving: number;
    questionCoverage: number;
  };
  summaryFeedback?: string;
  areasToImprove?: string[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  ragSources?: string[];
}
