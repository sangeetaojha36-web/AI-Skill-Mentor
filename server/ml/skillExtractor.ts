/**
 * Machine Learning & NLP Skill Extraction Module
 * Implements tokenization, n-gram extraction, stopword filtering,
 * taxonomy dictionary mapping, and TF-IDF relevance scoring.
 */

export interface ExtractedSkillResult {
  name: string;
  category: 'technical' | 'soft' | 'tool' | 'domain';
  confidence: number;
  frequency: number;
  tfidfScore: number;
}

// Master skill taxonomy across multi-disciplinary fields
export const SKILL_TAXONOMY: Record<string, { category: 'technical' | 'soft' | 'tool' | 'domain'; domain: string; aliases?: string[] }> = {
  // Software / Data / AI
  'python': { category: 'technical', domain: 'Data Science & Software' },
  'sql': { category: 'technical', domain: 'Data & Databases', aliases: ['postgresql', 'mysql', 'sqlite', 't-sql'] },
  'pandas': { category: 'tool', domain: 'Data Science' },
  'numpy': { category: 'tool', domain: 'Data Science' },
  'scikit-learn': { category: 'tool', domain: 'Machine Learning', aliases: ['sklearn'] },
  'machine learning': { category: 'domain', domain: 'AI & Data Science', aliases: ['ml'] },
  'deep learning': { category: 'domain', domain: 'AI & Data Science' },
  'tableau': { category: 'tool', domain: 'Business Intelligence' },
  'power bi': { category: 'tool', domain: 'Business Intelligence', aliases: ['powerbi'] },
  'excel': { category: 'tool', domain: 'Business & Analytics', aliases: ['ms excel', 'microsoft excel', 'spreadsheets'] },
  'statistics': { category: 'domain', domain: 'Mathematics & Data', aliases: ['statistical modeling', 'hypothesis testing'] },
  'r programming': { category: 'technical', domain: 'Data Science', aliases: ['r language', ' r '] },
  'javascript': { category: 'technical', domain: 'Software Engineering', aliases: ['js', 'es6'] },
  'typescript': { category: 'technical', domain: 'Software Engineering', aliases: ['ts'] },
  'react': { category: 'tool', domain: 'Software Engineering', aliases: ['reactjs', 'react.js'] },
  'node.js': { category: 'tool', domain: 'Software Engineering', aliases: ['nodejs', 'node'] },
  'git': { category: 'tool', domain: 'Software Engineering', aliases: ['github', 'version control', 'gitlab'] },
  'docker': { category: 'tool', domain: 'DevOps & Cloud' },
  'kubernetes': { category: 'tool', domain: 'DevOps & Cloud', aliases: ['k8s'] },
  'aws': { category: 'tool', domain: 'Cloud Computing', aliases: ['amazon web services'] },
  'azure': { category: 'tool', domain: 'Cloud Computing' },
  'c++': { category: 'technical', domain: 'Systems Engineering', aliases: ['cpp'] },
  'java': { category: 'technical', domain: 'Software Engineering' },

  // Mechanical / Automation / Robotics
  'solidworks': { category: 'tool', domain: 'Mechanical & Design' },
  'autocad': { category: 'tool', domain: 'Engineering CAD' },
  'ansys': { category: 'tool', domain: 'Mechanical Simulation', aliases: ['fea', 'finite element analysis'] },
  'matlab': { category: 'tool', domain: 'Engineering Computation' },
  'simulink': { category: 'tool', domain: 'Control Systems' },
  'robotics': { category: 'domain', domain: 'Robotics & Automation' },
  'ros': { category: 'tool', domain: 'Robotics', aliases: ['robot operating system'] },
  'thermodynamics': { category: 'domain', domain: 'Mechanical Engineering' },
  'fluid mechanics': { category: 'domain', domain: 'Mechanical Engineering', aliases: ['cfd', 'computational fluid dynamics'] },
  'plc programming': { category: 'technical', domain: 'Industrial Automation', aliases: ['ladder logic', 'scada'] },
  'cnc machining': { category: 'technical', domain: 'Manufacturing' },
  'geometric dimensioning and tolerancing': { category: 'technical', domain: 'Mechanical Engineering', aliases: ['gd&t'] },

  // Civil & Structural & Architecture
  'revit': { category: 'tool', domain: 'Civil & Architecture', aliases: ['bim', 'building information modeling'] },
  'staad pro': { category: 'tool', domain: 'Structural Engineering', aliases: ['staad.pro', 'staad'] },
  'etabs': { category: 'tool', domain: 'Structural Engineering' },
  'structural analysis': { category: 'domain', domain: 'Civil Engineering' },
  'gis': { category: 'tool', domain: 'Geotechnical & Planning', aliases: ['arcgis', 'qgis'] },
  'geotechnical engineering': { category: 'domain', domain: 'Civil Engineering' },
  'surveying': { category: 'technical', domain: 'Civil Engineering', aliases: ['total station'] },
  'construction management': { category: 'domain', domain: 'Civil Engineering', aliases: ['primavera', 'project scheduling'] },

  // Electrical & Electronics
  'embedded systems': { category: 'domain', domain: 'Electronics & Firmware' },
  'pcb design': { category: 'technical', domain: 'Hardware Engineering', aliases: ['altium', 'eagle pcb', 'kicad'] },
  'verilog': { category: 'technical', domain: 'VLSI & Hardware', aliases: ['vhdl', 'fpga'] },
  'microcontrollers': { category: 'technical', domain: 'Embedded Systems', aliases: ['arduino', 'esp32', 'stm32', 'arm cortex'] },
  'iot': { category: 'domain', domain: 'Internet of Things' },
  'signal processing': { category: 'domain', domain: 'Electrical Engineering', aliases: ['dsp'] },

  // Biotech & Biomedical & Healthcare
  'bioinformatics': { category: 'domain', domain: 'Biotechnology' },
  'pcr': { category: 'technical', domain: 'Molecular Biology', aliases: ['qpcr', 'polymerase chain reaction'] },
  'genomics': { category: 'domain', domain: 'Life Sciences', aliases: ['next generation sequencing', 'ngs'] },
  'biostatistics': { category: 'domain', domain: 'Healthcare & Life Sciences' },
  'clinical trials': { category: 'domain', domain: 'Biomedical & Pharma', aliases: ['gcp', 'good clinical practice'] },
  'molecular cloning': { category: 'technical', domain: 'Biotechnology' },
  'medical imaging': { category: 'domain', domain: 'Biomedical Engineering', aliases: ['dicom', 'mri analysis'] },
  'biomaterials': { category: 'domain', domain: 'Biomedical Engineering' },
  'health informatics': { category: 'domain', domain: 'Healthcare Technology', aliases: ['ehr', 'hl7', 'fhir'] },

  // Business, Finance, Commerce & Product
  'financial modeling': { category: 'technical', domain: 'Finance' },
  'corporate finance': { category: 'domain', domain: 'Finance' },
  'accounting': { category: 'technical', domain: 'Commerce & Finance', aliases: ['gaap', 'ifrs', 'general ledger'] },
  'business analysis': { category: 'domain', domain: 'Business & Operations', aliases: ['requirements gathering', 'gap analysis'] },
  'product management': { category: 'domain', domain: 'Product & Tech', aliases: ['roadmapping', 'user stories', 'agile', 'scrum'] },
  'digital marketing': { category: 'domain', domain: 'Marketing & Media', aliases: ['seo', 'sem', 'google analytics'] },
  'market research': { category: 'domain', domain: 'Business & Strategy' },
  'supply chain management': { category: 'domain', domain: 'Operations', aliases: ['logistics', 'inventory management'] },
  'risk management': { category: 'domain', domain: 'Finance & Governance' },

  // Design, UX & Humanities
  'ui/ux design': { category: 'domain', domain: 'Design', aliases: ['ux design', 'ui design', 'user experience'] },
  'figma': { category: 'tool', domain: 'Design', aliases: ['figma design'] },
  'user research': { category: 'technical', domain: 'Design & Human Factors', aliases: ['usability testing', 'user interviews'] },
  'wireframing': { category: 'technical', domain: 'Design', aliases: ['prototyping'] },
  'content strategy': { category: 'domain', domain: 'Communications & Media', aliases: ['copywriting', 'editorial'] },
  'public speaking': { category: 'soft', domain: 'Interpersonal' },
  'communication': { category: 'soft', domain: 'Core Skills', aliases: ['written communication', 'verbal communication'] },
  'problem solving': { category: 'soft', domain: 'Core Skills', aliases: ['analytical thinking', 'critical thinking'] },
  'teamwork': { category: 'soft', domain: 'Core Skills', aliases: ['collaboration', 'cross-functional collaboration'] },
  'leadership': { category: 'soft', domain: 'Core Skills', aliases: ['mentorship', 'team leadership'] },
  'time management': { category: 'soft', domain: 'Core Skills', aliases: ['prioritization', 'agile execution'] }
};

// English Stopwords for NLP filtering
const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'cannot', 'could',
  'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have',
  'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is',
  'it', 'its', 'itself', 'let', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so',
  'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when',
  'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves'
]);

/**
 * Clean & tokenize raw text into lowercase tokens
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s\+\#\.\-]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOPWORDS.has(token));
}

/**
 * Extract 1-gram, 2-gram, and 3-gram candidate phrases
 */
export function generateNGrams(tokens: string[], maxN = 3): string[] {
  const ngrams: string[] = [];
  for (let n = 1; n <= maxN; n++) {
    for (let i = 0; i <= tokens.length - n; i++) {
      ngrams.push(tokens.slice(i, i + n).join(' '));
    }
  }
  return ngrams;
}

/**
 * Compute Term Frequency (TF) for candidates
 */
export function computeTF(terms: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const term of terms) {
    counts[term] = (counts[term] || 0) + 1;
  }
  const total = terms.length || 1;
  const tf: Record<string, number> = {};
  for (const [term, count] of Object.entries(counts)) {
    tf[term] = count / total;
  }
  return tf;
}

/**
 * Main ML NLP Skill Extractor
 * Matches input text against canonical skill taxonomy using exact, alias, and n-gram matching,
 * calculates TF-IDF approximations and assigns confidence scores.
 */
export function extractSkillsNLP(rawText: string): ExtractedSkillResult[] {
  if (!rawText || typeof rawText !== 'string') return [];

  const lower = rawText.toLowerCase();
  const tokens = tokenize(rawText);
  const ngrams = generateNGrams(tokens, 3);
  const tf = computeTF(ngrams);

  const matchedSkills = new Map<string, ExtractedSkillResult>();

  // Iterate over taxonomy entries
  for (const [canonicalName, meta] of Object.entries(SKILL_TAXONOMY)) {
    const candidates = [canonicalName, ...(meta.aliases || [])];
    let foundFrequency = 0;

    for (const cand of candidates) {
      // Word boundary regex for accurate matching (e.g. avoid matching "r" inside "bar")
      const escaped = cand.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(?:^|[^a-zA-Z0-9_#+])${escaped}(?:$|[^a-zA-Z0-9_#+])`, 'gi');
      const matches = lower.match(regex);
      if (matches) {
        foundFrequency += matches.length;
      }
    }

    if (foundFrequency > 0) {
      // Calculate confidence based on frequency, specificity (length of term), and category
      const specificity = Math.min(1.0, 0.6 + (canonicalName.length / 30));
      const freqBonus = Math.min(0.3, foundFrequency * 0.08);
      const confidence = Math.min(0.99, Number((specificity + freqBonus).toFixed(2)));

      // Estimate TF-IDF score: TF * log(N / DF)
      const termTf = tf[canonicalName.toLowerCase()] || (foundFrequency / (tokens.length || 1));
      const pseudoIdf = Math.log(100 / (canonicalName.length < 4 ? 20 : 5));
      const tfidf = Number((termTf * pseudoIdf * 100).toFixed(3));

      // Capitalize display name
      const displayName = canonicalName
        .split(' ')
        .map(w => w === 'ai' || w === 'sql' || w === 'plc' || w === 'bim' || w === 'pcb' || w === 'iot' || w === 'gis' || w === 'cad' || w === 'ros' ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      matchedSkills.set(canonicalName, {
        name: displayName,
        category: meta.category,
        confidence,
        frequency: foundFrequency,
        tfidfScore: tfidf
      });
    }
  }

  // Sort by confidence and frequency
  return Array.from(matchedSkills.values()).sort((a, b) => b.confidence - a.confidence || b.frequency - a.frequency);
}
