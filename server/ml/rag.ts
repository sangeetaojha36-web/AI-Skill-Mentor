/**
 * RAG Knowledge Base - India Placement & Career Edition
 * Grounding LLM responses in real Indian hiring seasons, campus placement rounds,
 * and Tier-1/2/3 upskilling strategies.
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
    id: 'kb-india-placement-structure',
    category: 'placement',
    title: 'Indian Campus Placement & Off-Campus Hiring Stages',
    content: 'Indian campus and off-campus recruitment across tech and analytics companies follows a structured 4-stage pipeline: 1) Online Assessment (OA) covering Quantitative Aptitude, Logical Reasoning, and 2-3 LeetCode style DSA or SQL coding questions, 2) Technical Round 1 focusing on Core CS fundamentals (DBMS, SQL, OOPs, OS) and deep dive into Resume Projects, 3) Technical Round 2 covering system design or live problem solving, and 4) Managerial & HR Round evaluating cultural fit, willingness to relocate to Bengaluru/Hyderabad/Pune/Noida, and the classic "Why IT/Analytics after your core branch?".',
    tags: ['campus placement', 'online assessment', 'aptitude', 'technical round', 'hr round', 'interview']
  },
  {
    id: 'kb-tier3-to-product-roadmap',
    category: 'career',
    title: 'Tier-2 and Tier-3 College Student Strategy for Product Companies',
    content: 'Students from Tier-3 Indian colleges (AKTU, VTU, Anna Univ affiliates, state universities) can crack high-paying product companies (₹10 - ₹25+ LPA) by executing a 3-pillar strategy: 1) Build 2 distinctive full-stack or analytics projects with live deployed URLs on Vercel/Render rather than generic clone tutorials, 2) Reach out on LinkedIn with concise, customized referral pitches directly to engineering managers and alumni, and 3) Consistently solve Medium difficulty questions on LeetCode/GeeksforGeeks while maintaining college CGPA above 7.5 to satisfy automated cutoff filters.',
    tags: ['tier 3', 'off-campus', 'referral', 'linkedin', 'product companies', 'high lpa']
  },
  {
    id: 'kb-core-to-it-transition',
    category: 'career',
    title: 'Core Engineering (Mechanical, Civil, Electrical, Biotech) to Tech & Data Transition',
    content: 'Indian recruiters from companies like TCS Digital, Mu Sigma, Fractal, and Cognizant actively hire non-CS students who can demonstrate mathematical problem solving. Mechanical and Civil students have strong calculus and linear algebra foundations that translate seamlessly into Data Analytics and EV automation. In interviews, frame your core branch as a strength: highlight your ability to model complex physical systems and explain that programming is your chosen tool to scale analytical impact.',
    tags: ['core to it', 'mechanical', 'civil', 'data science', 'switch career', 'analytics']
  },
  {
    id: 'kb-india-ats-resume-standards',
    category: 'skill',
    title: 'ATS Resume Best Practices for Indian Recruiters',
    content: 'Indian recruiters spend less than 8 seconds per resume during high-volume campus drives. Best practices: 1) Keep strictly to 1 page, 2) Include GitHub and LinkedIn hyperlinks at the top, 3) State your Degree, College, and CGPA clearly, 4) Under Projects, use the XYZ formula (Accomplished [X], as measured by [Y], by doing [Z]), e.g., "Accelerated SQL query speeds by 38% for a food delivery dataset using indexed joins", 5) Avoid multi-column graphical designs or photo tables that choke Indian corporate ATS software.',
    tags: ['resume', 'ats score', 'indian resume', 'cgpa', 'projects', 'github']
  },
  {
    id: 'kb-bioinformatics-india-industry',
    category: 'career',
    title: 'Bioinformatics & Computational Biology in the Indian Pharma Ecosystem',
    content: 'India is known as the pharmacy of the world. With hubs in Bengaluru (Biocon, Strand Life Sciences), Hyderabad (Dr. Reddy\'s, Bharat Biotech), and Pune (Serum Institute), there is immense demand for students who can bridge molecular biology with Python and R pipelines. Students with B.Sc/B.Tech Biotech degrees who learn Python, Biopython, and RNA-seq analysis command ₹6 LPA to ₹14 LPA entry packages.',
    tags: ['bioinformatics', 'biotechnology', 'biocon', 'genomics', 'pharma', 'dr reddy']
  },
  {
    id: 'kb-ev-robotics-india',
    category: 'career',
    title: 'Electric Vehicles (EV) & Industrial Robotics Revolution in India',
    content: 'With the rapid expansion of companies like Tata Motors, Ola Electric, Ather Energy, and L&T, mechanical and electrical engineering students are in high demand for EV Powertrain telemetry, battery management systems (BMS), PLC automation, and ROS programming. Starting packages range from ₹6 LPA to ₹16 LPA with high upward trajectory.',
    tags: ['ev', 'robotics', 'tata motors', 'ola electric', 'mechanical', 'automation']
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
