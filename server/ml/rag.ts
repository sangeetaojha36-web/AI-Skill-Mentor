/**
 * RAG Knowledge Base - Placement & Career Edition
 * Grounding LLM responses in real hiring seasons, recruitment rounds,
 * and actionable upskilling strategies.
 */

import { KnowledgeDocument } from '../types.ts';
import { tokenize, computeTF } from './skillExtractor.ts';
import { calculateCosineSimilarity } from './recommender.ts';

export interface RetrievedChunk {
  document: KnowledgeDocument;
  similarityScore: number;
}

export const KNOWLEDGE_BASE: KnowledgeDocument[] = [
  {
    id: 'kb-placement-structure',
    category: 'placement',
    title: 'Modern Campus Placement & Hiring Pipeline Stages',
    content: 'Recruitment across tech and analytics companies follows a structured 4-stage pipeline: 1) Online Assessment (OA) covering Quantitative Aptitude, Logical Reasoning, and 2-3 LeetCode style DSA or SQL coding questions, 2) Technical Round 1 focusing on Core CS fundamentals (DBMS, SQL, OOPs, OS) and deep dive into Resume Projects, 3) Technical Round 2 covering system design or live problem solving, and 4) Managerial & HR Round evaluating cultural fit, willingness to relocate to major tech hubs, and the classic "Why IT/Analytics after your core branch?".',
    tags: ['campus placement', 'online assessment', 'aptitude', 'technical round', 'hr round', 'interview']
  },
  {
    id: 'kb-tier3-to-product-roadmap',
    category: 'career',
    title: 'Proven Strategy to Secure High-Paying Product Company Offers',
    content: 'Students from all college backgrounds can secure high-paying product company roles (₹10 - ₹25+ LPA) by executing a 3-pillar strategy: 1) Build 2 distinctive full-stack or analytics projects with live deployed URLs on Vercel/Render rather than generic clone tutorials, 2) Reach out on professional networks with concise, customized referral pitches directly to engineering managers and alumni, and 3) Consistently solve Medium difficulty questions on LeetCode/GeeksforGeeks while maintaining college CGPA above 7.5 to satisfy automated cutoff filters.',
    tags: ['off-campus', 'referral', 'linkedin', 'product companies', 'high lpa']
  },
  {
    id: 'kb-core-to-it-transition',
    category: 'career',
    title: 'Core Engineering (Mechanical, Civil, Electrical, Biotech) to Tech & Data Transition',
    content: 'Leading employers actively hire non-CS students who can demonstrate mathematical problem solving. Mechanical and Civil students have strong calculus and linear algebra foundations that translate seamlessly into Data Analytics and EV automation. In interviews, frame your core branch as a strength: highlight your ability to model complex physical systems and explain that programming is your chosen tool to scale analytical impact.',
    tags: ['core to it', 'mechanical', 'civil', 'data science', 'switch career', 'analytics']
  },
  {
    id: 'kb-ats-resume-standards',
    category: 'skill',
    title: 'ATS Resume Best Practices for Fast Candidate Screening',
    content: 'Corporate recruiters spend less than 8 seconds per resume during high-volume recruitment drives. Best practices: 1) Keep strictly to 1 page, 2) Include GitHub and LinkedIn hyperlinks at the top, 3) State your Degree, College, and CGPA clearly, 4) Under Projects, use the XYZ formula (Accomplished [X], as measured by [Y], by doing [Z]), e.g., "Accelerated SQL query speeds by 38% for a food delivery dataset using indexed joins", 5) Avoid multi-column graphical designs or photo tables that choke corporate ATS software.',
    tags: ['resume', 'ats score', 'cgpa', 'projects', 'github']
  },
  {
    id: 'kb-bioinformatics-industry',
    category: 'career',
    title: 'Bioinformatics & Computational Biology in the Healthcare & Pharma Ecosystem',
    content: 'With rapidly growing biopharma and genome centers, there is immense demand for students who can bridge molecular biology with Python and R pipelines. Students with B.Sc/B.Tech Biotech degrees who learn Python, Biopython, and RNA-seq analysis command ₹6 LPA to ₹14 LPA entry packages.',
    tags: ['bioinformatics', 'biotechnology', 'genomics', 'pharma']
  },
  {
    id: 'kb-ev-robotics-industry',
    category: 'career',
    title: 'Electric Vehicles (EV) & Industrial Robotics Revolution',
    content: 'With the rapid expansion of EV and robotics companies, mechanical and electrical engineering students are in high demand for EV Powertrain telemetry, battery management systems (BMS), PLC automation, and ROS programming. Starting packages range from ₹6 LPA to ₹16 LPA with high upward trajectory.',
    tags: ['ev', 'robotics', 'mechanical', 'automation']
  }
];

function createVocabulary(docs: KnowledgeDocument[]): string[] {
  const vocabSet = new Set<string>();
  for (const doc of docs) {
    const text = `${doc.title} ${doc.content} ${doc.tags.join(' ')}`;
    tokenize(text).forEach(t => vocabSet.add(t));
  }
  return Array.from(vocabSet);
}

const GLOBAL_VOCABULARY = createVocabulary(KNOWLEDGE_BASE);

function vectorizeText(text: string, vocabulary: string[]): number[] {
  const tokens = tokenize(text);
  const tf = computeTF(tokens);
  return vocabulary.map(term => tf[term] || 0);
}

const DOCUMENT_VECTORS = KNOWLEDGE_BASE.map(doc => {
  const fullText = `${doc.title} ${doc.content} ${doc.tags.join(' ')}`;
  return {
    doc,
    vector: vectorizeText(fullText, GLOBAL_VOCABULARY)
  };
});

export function retrieveRelevantKnowledge(query: string, topK = 3): RetrievedChunk[] {
  const queryVector = vectorizeText(query, GLOBAL_VOCABULARY);

  const scored = DOCUMENT_VECTORS.map(item => {
    const similarity = calculateCosineSimilarity(queryVector, item.vector);
    return {
      document: item.doc,
      similarityScore: Number(similarity.toFixed(4))
    };
  });

  scored.sort((a, b) => b.similarityScore - a.similarityScore);
  return scored.slice(0, topK);
}
