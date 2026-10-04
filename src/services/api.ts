/**
 * Centralized API Client for AI Skill Mentor
 */

import { User, Career, Course, Project, ResumeAnalysis, Roadmap, MockInterviewSession, ChatMessage, CareerMatchScore } from '../types.ts';

const API_BASE = '/api';

function getHeaders(userId?: string): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (userId) {
    headers['x-user-id'] = userId;
  }
  return headers;
}

export const api = {
  // Auth & Profile
  async login(email: string, password?: string): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
    return res.json();
  },

  async register(data: Partial<User>): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Registration failed');
    return res.json();
  },

  async getProfile(userId: string): Promise<{ user: User }> {
    const res = await fetch(`${API_BASE}/user/profile`, {
      headers: getHeaders(userId),
    });
    return res.json();
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<{ user: User }> {
    const res = await fetch(`${API_BASE}/user/profile`, {
      method: 'PUT',
      headers: getHeaders(userId),
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  // Dashboard
  async getDashboard(userId: string) {
    const res = await fetch(`${API_BASE}/dashboard`, {
      headers: getHeaders(userId),
    });
    return res.json();
  },

  // Careers & Recommendations
  async getCareers(): Promise<{ careers: Career[] }> {
    const res = await fetch(`${API_BASE}/careers`);
    return res.json();
  },

  async getCareerRecommendations(userId: string): Promise<{ recommendations: CareerMatchScore[] }> {
    const res = await fetch(`${API_BASE}/careers/recommend`, {
      method: 'POST',
      headers: getHeaders(userId),
    });
    return res.json();
  },

  async getSkillGapAnalysis(userId: string, careerId?: string) {
    const res = await fetch(`${API_BASE}/skills/gap-analysis`, {
      method: 'POST',
      headers: getHeaders(userId),
      body: JSON.stringify({ careerId }),
    });
    return res.json();
  },

  // Resume
  async analyzeResume(userId: string, resumeText: string, fileName?: string): Promise<{ analysis: ResumeAnalysis; nlpDetails: any[] }> {
    const res = await fetch(`${API_BASE}/resume/analyze`, {
      method: 'POST',
      headers: getHeaders(userId),
      body: JSON.stringify({ resumeText, fileName }),
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Analysis failed');
    return res.json();
  },

  async getResumeHistory(userId: string): Promise<{ resumes: ResumeAnalysis[] }> {
    const res = await fetch(`${API_BASE}/resume/history`, {
      headers: getHeaders(userId),
    });
    return res.json();
  },

  // Roadmaps
  async getCurrentRoadmap(userId: string): Promise<{ roadmap: Roadmap }> {
    const res = await fetch(`${API_BASE}/roadmaps/current`, {
      headers: getHeaders(userId),
    });
    return res.json();
  },

  async generateRoadmap(userId: string, careerId: string): Promise<{ roadmap: Roadmap }> {
    const res = await fetch(`${API_BASE}/roadmaps/generate`, {
      method: 'POST',
      headers: getHeaders(userId),
      body: JSON.stringify({ careerId }),
    });
    return res.json();
  },

  async toggleRoadmapStep(userId: string, stepId: string): Promise<{ roadmap: Roadmap }> {
    const res = await fetch(`${API_BASE}/roadmaps/toggle-step`, {
      method: 'POST',
      headers: getHeaders(userId),
      body: JSON.stringify({ stepId }),
    });
    return res.json();
  },

  // Courses & Projects
  async getCourses(): Promise<{ courses: Course[] }> {
    const res = await fetch(`${API_BASE}/courses`);
    return res.json();
  },

  async getProjects(): Promise<{ projects: Project[] }> {
    const res = await fetch(`${API_BASE}/projects`);
    return res.json();
  },

  // AI Chatbot
  async sendMessage(userId: string, message: string): Promise<{ response: string; ragSources: string[]; userMessage: ChatMessage; botMessage: ChatMessage }> {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: getHeaders(userId),
      body: JSON.stringify({ message }),
    });
    return res.json();
  },

  async getChatHistory(userId: string): Promise<{ history: ChatMessage[] }> {
    const res = await fetch(`${API_BASE}/chat/history`, {
      headers: getHeaders(userId),
    });
    return res.json();
  },

  // Mock Interview
  async matchCompaniesForInterview(userId: string, data: { resumeText?: string; linkedInUrl?: string; skills?: string[] }): Promise<{ extractedSkills: string[]; analyzedSource: string }> {
    const res = await fetch(`${API_BASE}/interview/match-companies`, {
      method: 'POST',
      headers: getHeaders(userId),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async startInterview(userId: string, career: string, interviewType?: string, difficulty?: string, companyName?: string, targetRole?: string): Promise<{ session: MockInterviewSession }> {
    const res = await fetch(`${API_BASE}/interview/start`, {
      method: 'POST',
      headers: getHeaders(userId),
      body: JSON.stringify({ career, interviewType, difficulty, companyName, targetRole }),
    });
    return res.json();
  },

  async submitInterviewAnswer(userId: string, sessionId: string, questionIndex: number, answer: string): Promise<{ session: MockInterviewSession }> {
    const res = await fetch(`${API_BASE}/interview/answer`, {
      method: 'POST',
      headers: getHeaders(userId),
      body: JSON.stringify({ sessionId, questionIndex, answer }),
    });
    return res.json();
  },

  async getInterviewHistory(userId: string): Promise<{ interviews: MockInterviewSession[] }> {
    const res = await fetch(`${API_BASE}/interview/history`, {
      headers: getHeaders(userId),
    });
    return res.json();
  },

  // Admin
  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`);
    return res.json();
  },

  async addAdminCareer(careerData: Partial<Career>) {
    const res = await fetch(`${API_BASE}/admin/careers`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(careerData),
    });
    return res.json();
  },

  async deleteAdminCareer(id: string) {
    const res = await fetch(`${API_BASE}/admin/careers/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  }
};
