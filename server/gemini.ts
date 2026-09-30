/**
 * Server-Side Gemini API Client - India Placement & Career Edition
 * Using @google/genai TypeScript SDK with gemini-3.8-flash
 */

import { GoogleGenAI, Type } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || '';
export const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export const MODEL_NAME = 'gemini-3.8-flash';

/**
 * Generates an AI-powered conversational response tailored to Indian students & placements
 */
export async function generateChatResponse(userMessage: string, userProfileSummary: string, ragContext: string): Promise<string> {
  if (!apiKey) {
    return `Namaste! Based on your student profile (${userProfileSummary}):\n\n${ragContext ? `Referenced Campus & Industry Insights:\n${ragContext}\n\n` : ''}For campus placements and off-campus drives in India, prioritize: 1) Strong problem-solving foundations (SQL/Python/DSA), 2) Building 2 capstone projects with live deployed links, and 3) Preparing structured STAR-format answers for managerial and HR rounds. You can achieve strong CTC packages (₹8-16+ LPA) regardless of your college tier with consistent preparation.`;
  }

  try {
    const prompt = `You are "AI Skill Mentor", an elite Career Advisor & Placement Mentor specifically for students and freshers across India.
You understand the realities of the Indian education system and job market:
- Engineering & degree branches: B.Tech/B.E. (Mechanical, Civil, Biotech, ECE, CSE), BCA/MCA, B.Sc, B.Com, BBA, etc.
- College tiers: Tier-1 (IITs, NITs, BITS), Tier-2, and Tier-3 colleges (AKTU, VTU, Anna Univ, state colleges).
- Indian recruiters: Product tech (Flipkart, Swiggy, Amazon India, Razorpay, CRED), Analytics (Fractal, Mu Sigma, Deloitte India), Core giants (Tata Motors, L&T, Biocon, Dr. Reddy's), and IT services (TCS Digital, Infosys, Wipro).
- Compensation metrics: Always speak in terms of Indian CTC Lakhs Per Annum (LPA, e.g. ₹6 LPA - ₹18 LPA).

Student Profile:
${userProfileSummary}

Grounding Knowledge Base (Retrieved Facts):
${ragContext}

Student's Question:
"${userMessage}"

Instructions:
1. Provide a sharp, highly encouraging, and actionable answer tailored specifically to Indian campus placements or off-campus jobs.
2. If they are from a core branch (Mechanical, Civil, Biotech, Commerce) asking to switch to IT/Data, explain how to leverage transferable skills and articulate it convincingly in interviews.
3. Recommend specific Indian learning resources (NPTEL, GeeksforGeeks, Striver's SDE sheet, Coursera India) and practical project ideas.
4. Keep the tone empathetic, practical, and structured (2-3 concise paragraphs with bullet points). Avoid generic fluff.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: 'You are AI Skill Mentor, a premier career and campus placement mentor for Indian college students. Give realistic, strategic advice aligned with Indian hiring standards and CTC benchmarks.',
        temperature: 0.7,
      },
    });

    return response.text || 'Prepare structured projects with measurable metrics, master SQL/Python fundamentals, and practice technical communication for your placement rounds.';
  } catch (error) {
    console.error('Gemini chat generation error:', error);
    return `Regarding your career query: With your background in ${userProfileSummary}, focus on building 1 solid capstone project and mastering SQL & Python fundamentals. In Indian campus drives, demonstrating practical curiosity and structured problem-solving is what distinguishes top candidates.`;
  }
}

/**
 * Evaluates mock interview answers based on Indian campus recruitment rubrics
 */
export async function evaluateInterviewAnswer(
  career: string,
  question: string,
  questionType: string,
  expectedPoints: string[],
  userAnswer: string
): Promise<{ score: number; feedback: string; strengths: string[]; improvements: string[] }> {
  if (!apiKey) {
    const wordCount = userAnswer.trim().split(/\s+/).length;
    const baseScore = Math.min(88, Math.max(65, 60 + Math.round(wordCount * 0.4)));
    return {
      score: baseScore,
      feedback: `Good attempt for this ${questionType} round question. You addressed the core premise well.`,
      strengths: ['Directly answered the question', 'Clear communication'],
      improvements: ['Include specific technical metrics or project references', 'Follow the STAR format (Situation, Task, Action, Result)']
    };
  }

  try {
    const prompt = `You are a Senior Technical Interviewer & Hiring Manager conducting a ${questionType} campus interview for a "${career}" role at a top firm in India.

Interview Question:
"${question}"

Expected Benchmark Points:
${expectedPoints.join(', ')}

Candidate's Answer:
"${userAnswer}"

Evaluate the candidate's answer based on Indian tech and core company standards (depth, clarity, confidence, relevance). Return a JSON object with:
- score: integer from 0 to 100.
- feedback: 2-3 sentence constructive critique.
- strengths: array of 2 key strengths.
- improvements: array of 2 actionable areas to refine for Indian placement rounds.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['score', 'feedback', 'strengths', 'improvements']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return {
      score: parsed.score || 75,
      feedback: parsed.feedback || 'Good structured response with relevant points.',
      strengths: parsed.strengths || ['Clear problem articulation'],
      improvements: parsed.improvements || ['Add quantifiable impact metrics']
    };
  } catch (error) {
    console.error('Gemini interview evaluation error:', error);
    return {
      score: 75,
      feedback: 'Solid attempt. For Indian placement drives, make sure to link your answer to practical project work or real data.',
      strengths: ['Understood the question premise', 'Polite and professional tone'],
      improvements: ['Structure with STAR method', 'Mention concrete tools and outcomes']
    };
  }
}

/**
 * Generates an adaptive learning roadmap tailored for Indian students
 */
export async function generateAdaptiveRoadmap(
  careerTitle: string,
  userCurrentSkills: string[],
  userBranch: string
) {
  if (!apiKey) return null;

  try {
    const prompt = `Create an adaptive 6-phase learning roadmap for an Indian college student with background in "${userBranch}" aiming to crack a "${careerTitle}" role (target CTC: ₹7-18 LPA).
The student ALREADY knows: [${userCurrentSkills.join(', ')}].
DO NOT make them relearn beginner concepts of what they already know. Bridge their core background into industry placement readiness.

Return a JSON array of roadmap steps:
Each step object must have:
- phase: integer (1, 2, 3...)
- title: string (e.g. "Phase 1: Advanced Relational SQL for Placement Drives")
- description: string (2 sentences describing the learning objective)
- skillsCovered: string[] (skills to acquire)
- estimatedWeeks: integer (number of weeks)
- recommendedResources: array of objects { title: string, type: string, url: string } (prefer NPTEL, GeeksforGeeks, LeetCode, Coursera)`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              phase: { type: Type.INTEGER },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              skillsCovered: { type: Type.ARRAY, items: { type: Type.STRING } },
              estimatedWeeks: { type: Type.INTEGER },
              recommendedResources: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    type: { type: Type.STRING },
                    url: { type: Type.STRING }
                  },
                  required: ['title', 'type']
                }
              }
            },
            required: ['phase', 'title', 'description', 'skillsCovered', 'estimatedWeeks', 'recommendedResources']
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || '[]');
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch (error) {
    console.error('Gemini roadmap generation error:', error);
    return null;
  }
}
