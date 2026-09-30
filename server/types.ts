export interface SchoolEducation {
  tenthMarks?: string; // e.g. "92% or 9.4 CGPA"
  tenthBoard?: string; // e.g. "CBSE", "ICSE", "State Board"
  twelfthMarks?: string; // e.g. "88% or 9.0 CGPA"
  twelfthBoard?: string; // e.g. "CBSE", "State Board"
  twelfthStream?: string; // e.g. "Science (PCM)", "Science (PCB)", "Commerce", "Arts"
}

export interface CollegeEducation {
  degree: string; // e.g. B.Tech, B.E., B.Sc, B.Com, BCA, MCA, MBA
  branch: string; // e.g. Mechanical Engineering, Computer Science, Biotechnology
  college: string; // e.g. AKTU College, Delhi University, IIT, NIT, St. Xavier's
  collegeTier?: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Autonomous / State Univ';
  currentYear: string; // e.g. "1st Year", "2nd Year", "3rd Year", "Final Year"
  passingYear?: string; // e.g. "2026", "2027", "2028"
  cgpa?: string; // e.g. "8.2 / 10.0"
}

export interface StudentExperience {
  id: string;
  role: string;
  company: string;
  duration: string; // e.g. "May 2025 - July 2025 (3 Months)"
  description: string;
}

export interface StudentAchievement {
  id: string;
  title: string;
  eventOrIssuer: string;
  year: string;
  description: string;
}

export interface StudentProject {
  id: string;
  title: string;
  techStack: string[];
  link?: string;
  description: string;
}

export interface StudentCourse {
  id: string;
  title: string;
  provider: string; // e.g. "NPTEL / Swayam", "Coursera", "Udemy", "GeeksforGeeks"
  year: string;
  certificateUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  passwordHash?: string;
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

export interface SkillItem {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'tool' | 'domain';
  domain: string;
  description: string;
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

export interface KnowledgeDocument {
  id: string;
  category: 'placement' | 'career' | 'skill' | 'roadmap' | 'interview';
  title: string;
  content: string;
  tags: string[];
}
