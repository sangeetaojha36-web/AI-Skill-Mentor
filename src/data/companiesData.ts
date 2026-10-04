export interface CompanyRole {
  id: string;
  title: string;
  category: 'Software Engineering' | 'Data & AI' | 'Product & Analytics' | 'Core Engineering' | 'Cloud & DevOps';
  requiredSkills: string[];
  preferredDegree: string[];
  rounds: string[];
  ctcLpa: string;
}

export interface PastQuestion {
  id: string;
  question: string;
  round: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  tips: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  badgeLetter: string;
  badgeColor: string;
  competencySubtitle: string;
  category: 'Tech Giants' | 'High-Growth Tech' | 'FinTech' | 'Core & Automotive' | 'IT Services & Consulting' | 'BioTech & Healthcare';
  headquarters: string;
  ctcRange: string;
  hiringTiers: ('Tier 1' | 'Tier 2' | 'Tier 3')[];
  interviewFocus: string;
  roundFormats: string[];
  roles: CompanyRole[];
  cultureBrief: {
    coreValues: string[];
    whatTheyLookFor: string;
    redFlags: string[];
    hiringPhilosophy: string;
  };
  callSheet: PastQuestion[];
}

export const COMPANIES_DATABASE: Company[] = [
  {
    id: 'google-india',
    name: 'Google',
    logo: '🔍',
    badgeLetter: 'G',
    badgeColor: '#4285F4',
    competencySubtitle: 'DSA • System Design • Googleyness',
    category: 'Tech Giants',
    headquarters: 'Bengaluru / Hyderabad',
    ctcRange: '₹28 - 45 LPA',
    hiringTiers: ['Tier 1', 'Tier 2'],
    interviewFocus: 'Data structures, distributed systems, clean code, and Googliness leadership principles.',
    roundFormats: ['Online Assessment', 'Technical Phone Screen', 'Onsite (4-5 rounds)', 'Googleyness & Leadership'],
    cultureBrief: {
      coreValues: ['Thriving in Ambiguity', 'Doing the Right Thing', 'Intellectual Humility & Team First', 'Customer & User Obsession'],
      whatTheyLookFor: 'Interviewers look for sound logical reasoning out loud, handling complexity with modular design, receptive to hints, and writing syntactically clean code without libraries doing the work.',
      redFlags: ['Arrogance or ignoring interviewer hints', 'Jumping straight into code without clarifying constraints', 'Blaming previous teammates for failures'],
      hiringPhilosophy: 'Hire for potential and fundamental problem-solving agility over knowledge of specific frameworks.'
    },
    callSheet: [
      {
        id: 'g-q1',
        question: 'Find the median from a continuous streaming data flow with millions of integers.',
        round: 'Technical Phone Screen',
        difficulty: 'Hard',
        topic: 'Two Heaps / PriorityQueue',
        tips: 'Maintain max-heap for lower half and min-heap for upper half to achieve O(1) median lookup and O(log n) insertion.'
      },
      {
        id: 'g-q2',
        question: 'Design a distributed rate limiter that handles 500,000 requests per second across multiple regional data centers.',
        round: 'Onsite (Round 2)',
        difficulty: 'Medium',
        topic: 'System Design',
        tips: 'Discuss Token Bucket vs Leaky Bucket algorithms, Redis with Lua scripts, and handling clock synchronization drifts.'
      },
      {
        id: 'g-q3',
        question: 'Tell me about a time you navigated severe ambiguity when a project requirement changed midway.',
        round: 'Googleyness & Leadership',
        difficulty: 'Medium',
        topic: 'Behavioral',
        tips: 'Use the STAR format. Emphasize proactive communication with stakeholders and iterative MVP testing.'
      }
    ],
    roles: [
      {
        id: 'google-swe',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Algorithms', 'Data Structures', 'C++', 'Java', 'System Design'],
        preferredDegree: ['B.Tech CSE', 'B.Tech IT', 'Dual Degree'],
        rounds: ['DSA Coding Round (Graph/DP)', 'System Architecture & Concurrency', 'Googleyness & Leadership'],
        ctcLpa: '₹32 - 42 LPA'
      },
      {
        id: 'google-da',
        title: 'Data Analyst',
        category: 'Data & AI',
        requiredSkills: ['SQL', 'Python', 'Statistics', 'BigQuery', 'A/B Testing'],
        preferredDegree: ['B.Tech', 'B.Sc Statistics', 'B.Sc Data Science'],
        rounds: ['Advanced SQL Modeling', 'Product Metrics Case Study', 'Stakeholder Communication'],
        ctcLpa: '₹24 - 32 LPA'
      },
      {
        id: 'google-ds',
        title: 'Data Scientist',
        category: 'Data & AI',
        requiredSkills: ['Machine Learning', 'Python', 'Mathematics', 'Deep Learning', 'Experimentation'],
        preferredDegree: ['M.Tech', 'B.Tech', 'M.Sc Data Science'],
        rounds: ['ML Modeling & Statistics', 'Applied Problem Solving', 'Googleyness'],
        ctcLpa: '₹30 - 45 LPA'
      }
    ]
  },
  {
    id: 'amazon-india',
    name: 'Amazon',
    logo: '📦',
    badgeLetter: 'A',
    badgeColor: '#FF9900',
    competencySubtitle: '16 Leadership Principles • DSA • Scaling',
    category: 'Tech Giants',
    headquarters: 'Bengaluru / Hyderabad / Chennai',
    ctcRange: '₹24 - 40 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'Customer Obsession, Ownership, Bias for Action, scalable microservices, and Bar Raiser rounds.',
    roundFormats: ['Online Assessment (OA)', 'Technical Round 1 (DSA)', 'Technical Round 2 (LLD/OOP)', 'Bar Raiser Round'],
    cultureBrief: {
      coreValues: ['Customer Obsession', 'Ownership', 'Bias for Action', 'Frugality & Dive Deep'],
      whatTheyLookFor: 'Amazon heavily weighs the 16 Leadership Principles. Every technical question also evaluates LP metrics with real metrics and outcomes.',
      redFlags: ['Not having quantifiable data (e.g. Saying "I improved latency" without numbers)', 'Saying "We did this" instead of "My role was..."'],
      hiringPhilosophy: 'Each new hire must raise the performance bar of the existing team.'
    },
    callSheet: [
      {
        id: 'amz-q1',
        question: 'Design an in-memory Cache with LRU eviction and thread-safe concurrent reads/writes.',
        round: 'Technical Round 2',
        difficulty: 'Medium',
        topic: 'LLD & Concurrency',
        tips: 'Combine HashMap with Doubly Linked List. Explain ReentrantReadWriteLock vs ConcurrentHashMap.'
      },
      {
        id: 'amz-q2',
        question: 'Describe a situation where you had to make a high-stakes decision without complete data (Bias for Action).',
        round: 'Bar Raiser Round',
        difficulty: 'Hard',
        topic: 'Leadership Principles',
        tips: 'Highlight two-way door decisions, risk mitigation steps, and how you tracked outcome metrics post-launch.'
      }
    ],
    roles: [
      {
        id: 'amazon-sde1',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['DSA', 'Java', 'Python', 'Database Management', 'Object-Oriented Design'],
        preferredDegree: ['B.Tech', 'B.E.', 'MCA'],
        rounds: ['Online Assessment (OA)', 'DSA & Problem Solving (Trees/DP)', 'LLD & Leadership Principles'],
        ctcLpa: '₹28 - 36 LPA'
      },
      {
        id: 'amazon-da',
        title: 'Data Analyst',
        category: 'Product & Analytics',
        requiredSkills: ['SQL Window Functions', 'Excel VBA', 'Tableau', 'Business Case Analysis'],
        preferredDegree: ['B.Tech', 'B.Sc', 'B.Com', 'BBA'],
        rounds: ['SQL Live Querying', 'Business Guesstimates', 'Bar Raiser Round'],
        ctcLpa: '₹18 - 25 LPA'
      },
      {
        id: 'amazon-ds',
        title: 'Data Scientist',
        category: 'Data & AI',
        requiredSkills: ['Machine Learning', 'Predictive Modeling', 'Python', 'SQL', 'Forecasting'],
        preferredDegree: ['B.Tech', 'M.Sc Statistics'],
        rounds: ['Applied Machine Learning', 'Coding Assessment', 'Leadership Principles'],
        ctcLpa: '₹26 - 38 LPA'
      }
    ]
  },
  {
    id: 'microsoft-india',
    name: 'Microsoft',
    logo: '🪟',
    badgeLetter: 'M',
    badgeColor: '#00A4EF',
    competencySubtitle: 'Data Structures • OOP • Growth Mindset',
    category: 'Tech Giants',
    headquarters: 'Hyderabad / Bengaluru / Noida',
    ctcRange: '₹26 - 42 LPA',
    hiringTiers: ['Tier 1', 'Tier 2'],
    interviewFocus: 'Low-level design, algorithmic problem solving, Azure cloud fundamentals, and continuous learning.',
    roundFormats: ['Online Coding Test', 'Technical Round 1', 'System Design & Architecture', 'AA Round (Alternative Advisor)'],
    cultureBrief: {
      coreValues: ['Growth Mindset', 'Customer-Centric Innovation', 'Diversity & Inclusion', 'One Microsoft'],
      whatTheyLookFor: 'Microsoft looks for humility, curiosity to learn new tech stacks, and solid understanding of operating system concepts and memory management.',
      redFlags: ['Dogmatic defense of bad code', 'Lack of edge-case testing (null pointers, boundary cases)'],
      hiringPhilosophy: 'Value the ability to learn and adapt over static knowledge.'
    },
    callSheet: [
      {
        id: 'ms-q1',
        question: 'Serialize and Deserialize a Binary Tree with minimal memory footprint.',
        round: 'Technical Round 1',
        difficulty: 'Medium',
        topic: 'Trees / String Parsing',
        tips: 'Use preorder traversal with delimiter for null nodes. Discuss space-time complexity trade-offs.'
      },
      {
        id: 'ms-q2',
        question: 'Tell me about a time you failed to meet a project deliverable. What did you learn and change?',
        round: 'AA Round',
        difficulty: 'Medium',
        topic: 'Growth Mindset',
        tips: 'Emphasize ownership, root cause analysis (RCA), and systemic process improvements implemented afterwards.'
      }
    ],
    roles: [
      {
        id: 'ms-sde',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Data Structures', 'OOP', 'C#', 'Java', 'System Design'],
        preferredDegree: ['B.Tech/B.E.'],
        rounds: ['Data Structures Coding', 'Object-Oriented Design', 'Values & Core Cultural Fit'],
        ctcLpa: '₹28 - 38 LPA'
      },
      {
        id: 'ms-cloud',
        title: 'Cloud Solutions Associate',
        category: 'Cloud & DevOps',
        requiredSkills: ['Cloud Fundamentals', 'Networking', 'Python', 'Linux', 'Docker'],
        preferredDegree: ['B.Tech CSE/ECE/EE'],
        rounds: ['Cloud Infrastructure Basics', 'Hands-on Scripting', 'Scenario Troubleshooting'],
        ctcLpa: '₹20 - 28 LPA'
      },
      {
        id: 'ms-ds',
        title: 'Data Scientist',
        category: 'Data & AI',
        requiredSkills: ['Deep Learning', 'NLP', 'Python', 'Azure AI', 'Statistics'],
        preferredDegree: ['B.Tech', 'M.Tech'],
        rounds: ['Machine Learning Theory', 'Coding Round', 'Managerial Round'],
        ctcLpa: '₹26 - 36 LPA'
      }
    ]
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    logo: '🛍️',
    badgeLetter: 'F',
    badgeColor: '#2874F0',
    competencySubtitle: 'Machine Coding • Java • High Concurrency',
    category: 'High-Growth Tech',
    headquarters: 'Bengaluru, Karnataka',
    ctcRange: '₹18 - 32 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'Machine Coding rounds (writing clean executable code in 90 mins), schema design, and scale.',
    roundFormats: ['Machine Coding Round (90m)', 'DSA & Problem Solving', 'System Design Round', 'Hiring Manager Round'],
    cultureBrief: {
      coreValues: ['Customer First', 'Audacity', 'Bias for Action', 'Integrity'],
      whatTheyLookFor: 'Flipkart invented the famous "Machine Coding Round". Candidates must build an extensible, object-oriented application with clean unit tests on their laptop.',
      redFlags: ['Writing all logic in one monolithic main method', 'Failing to handle invalid inputs gracefully'],
      hiringPhilosophy: 'Engineers must be builders capable of taking architecture from whiteboard to production code.'
    },
    callSheet: [
      {
        id: 'fk-q1',
        question: 'Machine Coding: Implement a simplified Flipkart Ride/Cab Booking System or Flash Sale Inventory Lock.',
        round: 'Machine Coding',
        difficulty: 'Hard',
        topic: 'OOP / Clean Code',
        tips: 'Design clear Entities, Repositories, and Services. Apply Strategy Pattern for pricing/matching logic.'
      }
    ],
    roles: [
      {
        id: 'fk-sde',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Java', 'Microservices', 'Distributed Caching', 'DSA', 'SQL'],
        preferredDegree: ['B.Tech', 'B.E.'],
        rounds: ['Machine Coding Round (2 Hours)', 'DSA & Problem Solving', 'Hiring Manager Round'],
        ctcLpa: '₹22 - 30 LPA'
      },
      {
        id: 'fk-da',
        title: 'Data Analyst',
        category: 'Data & AI',
        requiredSkills: ['Python', 'SQL', 'Predictive Modeling', 'Power BI'],
        preferredDegree: ['B.Tech', 'B.Sc Math/Stats'],
        rounds: ['Analytical Problem Solving', 'Live SQL Case Study', 'Managerial Round'],
        ctcLpa: '₹16 - 24 LPA'
      },
      {
        id: 'fk-ds',
        title: 'Data Scientist',
        category: 'Data & AI',
        requiredSkills: ['Search Ranking', 'Recommendation Systems', 'Python', 'ML'],
        preferredDegree: ['B.Tech', 'M.Tech'],
        rounds: ['Algorithms & ML', 'Domain Case Study', 'Managerial Round'],
        ctcLpa: '₹22 - 32 LPA'
      }
    ]
  },
  {
    id: 'swiggy',
    name: 'Swiggy',
    logo: '🛵',
    badgeLetter: 'S',
    badgeColor: '#FC8019',
    competencySubtitle: 'Hyperlocal Systems • Go/Java • Low Latency',
    category: 'High-Growth Tech',
    headquarters: 'Bengaluru, Karnataka',
    ctcRange: '₹18 - 30 LPA',
    hiringTiers: ['Tier 1', 'Tier 2'],
    interviewFocus: 'Real-time order batching, geospatial indexing (H3), Kafka event pipelines, and product empathy.',
    roundFormats: ['Online Assessment', 'Machine Coding / DSA', 'System Architecture', 'Cultural Fitment'],
    cultureBrief: {
      coreValues: ['Consumer Comes First', 'Always Be Curious', 'Be Humble', 'Do More With Less'],
      whatTheyLookFor: 'High practical engineering capability under latency constraints. Understanding distributed caching, message queues, and geohashing.',
      redFlags: ['Not thinking about scale during peak lunch/dinner traffic spikes', 'Over-engineering simple solutions'],
      hiringPhilosophy: 'Hire pragmatic problem solvers who can ship fast in dynamic operational environments.'
    },
    callSheet: [
      {
        id: 'sw-q1',
        question: 'Design a real-time order dispatch system that matches 10,000 delivery partners with nearby restaurants every second.',
        round: 'System Architecture',
        difficulty: 'Hard',
        topic: 'Geospatial & Concurrency',
        tips: 'Discuss Uber H3 hexagonal spatial indexing, in-memory Redis geo-sets, and fallback greedy assignment.'
      }
    ],
    roles: [
      {
        id: 'swiggy-be',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Go', 'Java', 'Kafka', 'Redis', 'System Design'],
        preferredDegree: ['B.Tech CSE/IT'],
        rounds: ['DSA Coding (Graphs/HashMaps)', 'Machine Coding Round', 'Cultural Fitment'],
        ctcLpa: '₹20 - 28 LPA'
      },
      {
        id: 'swiggy-pa',
        title: 'Data Analyst',
        category: 'Product & Analytics',
        requiredSkills: ['SQL', 'Python', 'A/B Testing', 'Retention Funnels'],
        preferredDegree: ['B.Tech', 'B.Com', 'B.Sc'],
        rounds: ['Funnel Analysis Guesstimate', 'SQL Data Manipulation', 'Product Strategy'],
        ctcLpa: '₹15 - 22 LPA'
      }
    ]
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    logo: '💳',
    badgeLetter: 'R',
    badgeColor: '#0C2340',
    competencySubtitle: 'FinTech Reliability • Zero Downtime • APIs',
    category: 'FinTech',
    headquarters: 'Bengaluru, Karnataka',
    ctcRange: '₹20 - 32 LPA',
    hiringTiers: ['Tier 1', 'Tier 2'],
    interviewFocus: 'Idempotent payments, double-entry ledger architecture, state machines, and concurrency.',
    roundFormats: ['Online Coding Round', 'Machine Coding (Design Patterns)', 'System Architecture', 'Founder / Culture Round'],
    cultureBrief: {
      coreValues: ['Customer Obsession', 'Transparent & Open', 'Do Right by the Customer', 'Ownership'],
      whatTheyLookFor: 'Extreme attention to detail with financial edge cases, idempotency keys, race conditions, and clean REST APIs.',
      redFlags: ['Not thinking about what happens when a network request drops during payment processing'],
      hiringPhilosophy: 'Builders who treat financial reliability and security as table stakes.'
    },
    callSheet: [
      {
        id: 'rzp-q1',
        question: 'How do you design an idempotent payment processing API to prevent duplicate deductions when a student retries payment?',
        round: 'System Architecture',
        difficulty: 'Hard',
        topic: 'FinTech Distributed Systems',
        tips: 'Explain client-generated Idempotency-Keys, distributed locks, database unique constraints, and two-phase commits.'
      }
    ],
    roles: [
      {
        id: 'rzp-backend',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Go', 'PHP/Laravel', 'MySQL', 'Payment Gateways', 'System Design'],
        preferredDegree: ['B.Tech'],
        rounds: ['Concurrency & DSA Coding', 'Database Transaction Isolation', 'Values & Architecture'],
        ctcLpa: '₹22 - 30 LPA'
      },
      {
        id: 'rzp-risk',
        title: 'Data Analyst',
        category: 'Data & AI',
        requiredSkills: ['Python', 'SQL', 'Anomaly Detection', 'Statistics'],
        preferredDegree: ['B.Tech', 'B.Sc Math'],
        rounds: ['Fraud Pattern Detection', 'SQL Analytics', 'Business Risk Round'],
        ctcLpa: '₹16 - 24 LPA'
      }
    ]
  },
  {
    id: 'tata-motors',
    name: 'Tata Motors',
    logo: '🚗',
    badgeLetter: 'T',
    badgeColor: '#1A365D',
    competencySubtitle: 'EV Powertrain • BMS • Automotive Safety',
    category: 'Core & Automotive',
    headquarters: 'Pune / Mumbai, Maharashtra',
    ctcRange: '₹8 - 16 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'EV battery management systems (BMS), thermal runaway prevention, CAN protocol, and CAD.',
    roundFormats: ['Technical Subject Exam', 'Core Technical Interview', 'Automotive Case Study', 'HR & Values Round'],
    cultureBrief: {
      coreValues: ['Engineering Integrity', 'Safety First', 'Pioneering Spirit', 'Customer Delight'],
      whatTheyLookFor: 'Strong grasp of core mechanical/electrical engineering fundamentals. Practical knowledge of vehicle dynamics and EV electronics.',
      redFlags: ['Lack of basic knowledge of thermodynamics or circuit analysis', 'Disregard for safety protocols'],
      hiringPhilosophy: 'Passionate engineers eager to drive India’s electric mobility revolution.'
    },
    callSheet: [
      {
        id: 'tm-q1',
        question: 'Explain how a Battery Management System (BMS) balances individual lithium-ion cells during high-voltage charging.',
        round: 'Core Technical Round',
        difficulty: 'Medium',
        topic: 'EV Systems Engineering',
        tips: 'Differentiate between Passive Cell Balancing (shunt resistors) vs Active Balancing (capacitive/inductive energy transfer).'
      }
    ],
    roles: [
      {
        id: 'tm-ev',
        title: 'EV Systems Engineer',
        category: 'Core Engineering',
        requiredSkills: ['Battery Management Systems', 'MATLAB/Simulink', 'CAN Protocol', 'Embedded C'],
        preferredDegree: ['B.Tech Mechanical', 'B.Tech Electrical', 'B.Tech Automobile'],
        rounds: ['Core Engineering Fundamentals', 'EV Architecture Case Study', 'Managerial Technical Round'],
        ctcLpa: '₹9 - 15 LPA'
      },
      {
        id: 'tm-robotics',
        title: 'Robotics & Automation Engineer',
        category: 'Core Engineering',
        requiredSkills: ['PLC Programming', 'SCADA', 'Industrial Robotics', 'Hydraulics & Pneumatics'],
        preferredDegree: ['B.Tech Mechanical', 'B.Tech Mechatronics', 'B.Tech Production'],
        rounds: ['Assembly Line Troubleshooting', 'Ladder Logic Design', 'Plant Operations HR'],
        ctcLpa: '₹8 - 14 LPA'
      }
    ]
  },
  {
    id: 'tcs',
    name: 'TCS (Tata Consultancy Services)',
    logo: '🏢',
    badgeLetter: 'T',
    badgeColor: '#1F2937',
    competencySubtitle: 'TCS NQT • Prime / Digital • Enterprise Systems',
    category: 'IT Services & Consulting',
    headquarters: 'Mumbai / Pan India',
    ctcRange: '₹3.6 - 11.5 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'TCS National Qualifier Test (NQT), Prime & Digital cadries, core OOP concepts, and adaptability.',
    roundFormats: ['TCS NQT Advanced Cognitive & Coding', 'Technical Panel (DSA & Projects)', 'Managerial & HR Round'],
    cultureBrief: {
      coreValues: ['Respect for Individual', 'Integrity', 'Excellence', 'Learning & Sharing'],
      whatTheyLookFor: 'Clear communication, strong foundational knowledge of programming (Java, Python, C++), and willingness to learn enterprise technology.',
      redFlags: ['Cannot explain final year college project code', 'Negative attitude toward relocation or learning new languages'],
      hiringPhilosophy: 'Massive opportunities for merit-driven freshers who demonstrate technical agility.'
    },
    callSheet: [
      {
        id: 'tcs-q1',
        question: 'What is the internal working of Java HashMap, and what happens when two keys hash to the same bucket?',
        round: 'Technical Panel',
        difficulty: 'Easy',
        topic: 'Java & Data Structures',
        tips: 'Explain collision handling using LinkedList (and Red-Black Tree in Java 8+ when bucket length exceeds threshold 8).'
      }
    ],
    roles: [
      {
        id: 'tcs-prime',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Java', 'Python', 'SQL', 'Algorithms', 'Cloud Basics'],
        preferredDegree: ['All Engineering Branches', 'MCA'],
        rounds: ['TCS NQT Advanced Coding', 'Technical Panel (DSA & OOP)', 'Managerial & HR Round'],
        ctcLpa: '₹7.5 - 11.5 LPA'
      },
      {
        id: 'tcs-analytics',
        title: 'Data Analyst',
        category: 'Data & AI',
        requiredSkills: ['SQL', 'Excel', 'Power BI', 'Data Modeling', 'Communication'],
        preferredDegree: ['B.Tech', 'B.Sc', 'B.Com', 'BCA'],
        rounds: ['Aptitude & Verbal Exam', 'Technical Round (SQL & Scenarios)', 'HR Round'],
        ctcLpa: '₹5 - 8.5 LPA'
      }
    ]
  },
  {
    id: 'zomato',
    name: 'Zomato',
    logo: '🍅',
    badgeLetter: 'Z',
    badgeColor: '#E23744',
    competencySubtitle: 'Full Stack • High Velocity • Consumer Tech',
    category: 'High-Growth Tech',
    headquarters: 'Gurugram, Haryana',
    ctcRange: '₹16 - 28 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'Full stack product craft, live feature machine coding, and deep consumer empathy.',
    roundFormats: ['Machine Coding (Live Feature)', 'DSA & System Design', 'Founder / Leadership Round'],
    cultureBrief: {
      coreValues: ['Continuous Improvement', 'High Agency', 'Extreme Ownership', 'Customer Empathy'],
      whatTheyLookFor: 'Engineers who build end-to-end features fast. Clean UI state management, snappy responsive design, and database indexing.',
      redFlags: ['Thinking engineering stops at writing the backend API without caring about the user experience'],
      hiringPhilosophy: 'Give high autonomy and responsibility to young energetic builders.'
    },
    callSheet: [
      {
        id: 'zom-q1',
        question: 'Build a live restaurant food search bar with debounced autocomplete, caching, and handling network race conditions.',
        round: 'Machine Coding',
        difficulty: 'Medium',
        topic: 'Frontend & APIs',
        tips: 'Use custom debounce hook with AbortController to cancel stale in-flight fetch requests.'
      }
    ],
    roles: [
      {
        id: 'zomato-fs',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
        preferredDegree: ['B.Tech', 'BCA/MCA'],
        rounds: ['Live Feature Machine Coding', 'System Design & State Management', 'Founders Round'],
        ctcLpa: '₹18 - 26 LPA'
      },
      {
        id: 'zomato-da',
        title: 'Data Analyst',
        category: 'Data & AI',
        requiredSkills: ['SQL', 'Python', 'Data Visualization', 'Product Analytics'],
        preferredDegree: ['B.Tech', 'B.Sc Statistics'],
        rounds: ['SQL Deep Dive', 'Marketing ROI Case Study', 'HR Round'],
        ctcLpa: '₹14 - 20 LPA'
      }
    ]
  },
  {
    id: 'goldman-sachs',
    name: 'Goldman Sachs',
    logo: '📈',
    badgeLetter: 'GS',
    badgeColor: '#2B547E',
    competencySubtitle: 'Quant • Low Latency • Algorithmic Trading',
    category: 'FinTech',
    headquarters: 'Bengaluru, Karnataka',
    ctcRange: '₹22 - 38 LPA',
    hiringTiers: ['Tier 1', 'Tier 2'],
    interviewFocus: 'Mathematical probability, algorithmic puzzles, C++/Java multithreading, and finance intuition.',
    roundFormats: ['HackerRank Quant & Coding Test', 'DSA & Algorithms Panel', 'Math & Probability Interview', 'VP Senior Leadership Round'],
    cultureBrief: {
      coreValues: ['Client Service', 'Excellence', 'Integrity', 'Partnership'],
      whatTheyLookFor: 'Exceptional mathematical rigor, understanding of memory cache locality, and clear analytical thinking.',
      redFlags: ['Memorizing solutions without understanding the mathematical principles underneath'],
      hiringPhilosophy: 'Analytical problem solvers who excel under high-pressure financial environments.'
    },
    callSheet: [
      {
        id: 'gs-q1',
        question: 'You roll a fair 6-sided die. You can stop and take the dollar value or pay $1 to roll again (up to 3 rolls). What is your optimal strategy?',
        round: 'Math & Probability Interview',
        difficulty: 'Medium',
        topic: 'Dynamic Programming & Expected Value',
        tips: 'Calculate backwards from roll 3 ($3.5 expected value). On roll 2, only roll again if current roll is less than $2.5.'
      }
    ],
    roles: [
      {
        id: 'gs-swe',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Java', 'C++', 'Data Structures', 'Multithreading', 'Database Design'],
        preferredDegree: ['B.Tech (All Branches)'],
        rounds: ['DSA Coding (2 Questions)', 'System Design & Multithreading', 'Senior VP Culture Round'],
        ctcLpa: '₹24 - 35 LPA'
      },
      {
        id: 'gs-quant',
        title: 'Data Scientist',
        category: 'Data & AI',
        requiredSkills: ['Python', 'Stochastic Calculus / Probability', 'SQL', 'C++', 'Data Modeling'],
        preferredDegree: ['B.Tech (Math/CSE/ECE)', 'B.Sc Math/Stats'],
        rounds: ['Math & Probability Test', 'DSA & Algorithmic Round', 'Finance Modeling Case Round'],
        ctcLpa: '₹24 - 38 LPA'
      }
    ]
  },
  {
    id: 'biocon',
    name: 'Biocon Biologics',
    logo: '🧬',
    badgeLetter: 'B',
    badgeColor: '#059669',
    competencySubtitle: 'Bioinformatics • Genomics • Regulatory Compliance',
    category: 'BioTech & Healthcare',
    headquarters: 'Bengaluru, Karnataka',
    ctcRange: '₹6.5 - 13 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'Next-gen sequencing pipelines, biosimilar manufacturing, and clinical trials data.',
    roundFormats: ['Scientific Assessment', 'Genomics Technical Round', 'Bioprocess Case Study', 'HR Panel'],
    cultureBrief: {
      coreValues: ['Patient First', 'Scientific Rigor', 'Affordable Innovation', 'Quality Excellence'],
      whatTheyLookFor: 'Deep understanding of wet-lab and dry-lab intersection, Python/R bioinformatics pipelines, and FDA/CDSCO compliance.',
      redFlags: ['Lack of familiarity with basic molecular biology or sequence alignment tools (BLAST)'],
      hiringPhilosophy: 'Scientists committed to making life-saving biotherapeutics affordable for the world.'
    },
    callSheet: [
      {
        id: 'bio-q1',
        question: 'Explain the algorithmic difference between Global (Needleman-Wunsch) and Local (Smith-Waterman) sequence alignment.',
        round: 'Genomics Technical Round',
        difficulty: 'Medium',
        topic: 'Bioinformatics Algorithms',
        tips: 'Detail how dynamic programming matrices are populated and how zero-reset in Smith-Waterman identifies local motifs.'
      }
    ],
    roles: [
      {
        id: 'biocon-bioinfo',
        title: 'Data Analyst',
        category: 'Data & AI',
        requiredSkills: ['Python/R', 'Next-Gen Sequencing (NGS)', 'BLAST/Biopython', 'Biostatistics'],
        preferredDegree: ['B.Tech Biotechnology', 'B.Sc/M.Sc Bioinformatics'],
        rounds: ['Genomics & Molecular Biology Round', 'Python Data Analysis Test', 'Scientific HR Panel'],
        ctcLpa: '₹7 - 12 LPA'
      },
      {
        id: 'biocon-swe',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Python', 'SQL', 'LIMS Software', 'Cloud Data Pipelines'],
        preferredDegree: ['B.Tech CSE/Biotech'],
        rounds: ['Python Data Pipelines', 'Database Modeling', 'HR Round'],
        ctcLpa: '₹8 - 13 LPA'
      }
    ]
  },
  {
    id: 'cred',
    name: 'CRED',
    logo: '💎',
    badgeLetter: 'CR',
    badgeColor: '#121212',
    competencySubtitle: 'High Agency • Clean Architecture • Microservices',
    category: 'FinTech',
    headquarters: 'Bengaluru, Karnataka',
    ctcRange: '₹22 - 38 LPA',
    hiringTiers: ['Tier 1', 'Tier 2'],
    interviewFocus: 'Extreme code modularity, high agency, transactional reliability, and microservices.',
    roundFormats: ['Machine Coding (Clean Architecture)', 'System Design & Scalability', 'Cultural & Founders Round'],
    cultureBrief: {
      coreValues: ['High Agency', 'Trust and Transparency', 'Audacity & Design Craft', 'Customer Obsession'],
      whatTheyLookFor: 'Self-driven problem solvers who obsess over product aesthetics, atomic database operations, and high-standard design systems.',
      redFlags: ['Waiting for explicit instructions rather than taking initiative', 'Sloppy variable naming or code formatting'],
      hiringPhilosophy: 'Hire high-trust individuals with immense self-discipline and engineering taste.'
    },
    callSheet: [
      {
        id: 'cred-q1',
        question: 'Design a high-frequency rewards processing pipeline where millions of users spin a jackpot wheel simultaneously during IPL.',
        round: 'System Design & Scalability',
        difficulty: 'Hard',
        topic: 'Distributed Locks & Rate Limiting',
        tips: 'Discuss Redis Lua scripts, optimistic locking in PostgreSQL, and decoupling ledger writes with Kafka.'
      },
      {
        id: 'cred-q2',
        question: 'Tell me about a time you refused to ship a substandard product or compromise on engineering standards.',
        round: 'Cultural & Founders Round',
        difficulty: 'Medium',
        topic: 'Engineering Craft',
        tips: 'Emphasize long-term code maintainability, technical debt mitigation, and communication with product managers.'
      }
    ],
    roles: [
      {
        id: 'cred-swe',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Microservices'],
        preferredDegree: ['B.Tech/B.E.'],
        rounds: ['Machine Coding (Design Patterns)', 'DSA Problem Solving', 'System Architecture'],
        ctcLpa: '₹24 - 36 LPA'
      },
      {
        id: 'cred-fe',
        title: 'Frontend Engineer',
        category: 'Software Engineering',
        requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Web Performance', 'Animations'],
        preferredDegree: ['B.Tech/B.E.', 'MCA'],
        rounds: ['Interactive UI Machine Coding', 'Browser Performance & Rendering', 'Culture Fit'],
        ctcLpa: '₹20 - 32 LPA'
      }
    ]
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    logo: '🟣',
    badgeLetter: 'P',
    badgeColor: '#5F259F',
    competencySubtitle: 'UPI Ecosystem • Cassandra • High Throughput',
    category: 'FinTech',
    headquarters: 'Bengaluru, Karnataka',
    ctcRange: '₹20 - 35 LPA',
    hiringTiers: ['Tier 1', 'Tier 2'],
    interviewFocus: 'UPI transactions, distributed consensus, Cassandra schema modeling, and zero packet drop.',
    roundFormats: ['Online Coding Challenge', 'DSA Problem Solving (2 rounds)', 'System Design (Distributed)', 'Hiring Manager Round'],
    cultureBrief: {
      coreValues: ['Integrity', 'Reliability at Scale', 'Continuous Innovation', 'One Team'],
      whatTheyLookFor: 'Engineers who understand distributed databases, low-level network packets, and building fault-tolerant transactional backends.',
      redFlags: ['Overlooking timeout handling and circuit breakers in downstream payment gateway calls'],
      hiringPhilosophy: 'Build infrastructure that billions of Indians rely upon for daily commerce.'
    },
    callSheet: [
      {
        id: 'pp-q1',
        question: 'How would you architect a distributed ledger system handling 7,000 UPI requests per second with 99.999% uptime?',
        round: 'System Design',
        difficulty: 'Hard',
        topic: 'High-Throughput Distributed Systems',
        tips: 'Cover write-ahead logging (WAL), event sourcing, asynchronous ledger replication, and reconciliation jobs.'
      }
    ],
    roles: [
      {
        id: 'phonepe-be',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Java', 'Distributed Systems', 'Cassandra', 'Kafka', 'DSA'],
        preferredDegree: ['B.Tech/B.E. CSE/ECE'],
        rounds: ['Data Structures & Algorithms', 'Machine Coding / LLD', 'System Architecture'],
        ctcLpa: '₹22 - 34 LPA'
      },
      {
        id: 'phonepe-da',
        title: 'Data Analyst',
        category: 'Data & AI',
        requiredSkills: ['SQL', 'Python', 'Merchant Analytics', 'Tableau'],
        preferredDegree: ['B.Tech', 'B.Sc Statistics'],
        rounds: ['SQL Query Optimization', 'Merchant Churn Case Study', 'HR Round'],
        ctcLpa: '₹14 - 22 LPA'
      }
    ]
  },
  {
    id: 'paytm',
    name: 'Paytm',
    logo: '🪙',
    badgeLetter: 'PT',
    badgeColor: '#002E6E',
    competencySubtitle: 'Payment Gateway • Wallet Engine • Scale',
    category: 'FinTech',
    headquarters: 'Noida, Uttar Pradesh',
    ctcRange: '₹12 - 25 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'Payment SDKs, soundbox IoT telemetry, payment gateway routing, and database locks.',
    roundFormats: ['Online Coding Test', 'Technical Round 1 (DSA)', 'Technical Round 2 (OOP & DB)', 'HR Round'],
    cultureBrief: {
      coreValues: ['Speed of Execution', 'Customer First', 'Frugality', 'Meritocracy'],
      whatTheyLookFor: 'Speed and practical problem-solving. Ability to write scalable Java/Node.js microservices quickly.',
      redFlags: ['Slow turnaround time when asked to write simple algorithms during live coding'],
      hiringPhilosophy: 'Empower India’s digital economy from tier-1 metros to rural kirana stores.'
    },
    callSheet: [
      {
        id: 'pt-q1',
        question: 'Design an audio notification system for millions of merchant Soundbox devices acknowledging UPI receipts.',
        round: 'Technical Round 2',
        difficulty: 'Medium',
        topic: 'IoT & Event Streaming',
        tips: 'Discuss MQTT vs WebSocket connections, payload compression, and queue retry semantics.'
      }
    ],
    roles: [
      {
        id: 'paytm-sde',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Java', 'Node.js', 'MySQL', 'Redis', 'DSA'],
        preferredDegree: ['B.Tech/B.E.', 'MCA'],
        rounds: ['DSA Coding (Arrays/Strings/Trees)', 'Database Indexing & Locks', 'Managerial Round'],
        ctcLpa: '₹14 - 24 LPA'
      }
    ]
  },
  {
    id: 'uber-india',
    name: 'Uber',
    logo: '🚗',
    badgeLetter: 'U',
    badgeColor: '#000000',
    competencySubtitle: 'Geospatial Algorithms • Routing • Distributed Concurrency',
    category: 'Tech Giants',
    headquarters: 'Bengaluru / Hyderabad',
    ctcRange: '₹32 - 48 LPA',
    hiringTiers: ['Tier 1', 'Tier 2'],
    interviewFocus: 'Spatial indexing, shortest path algorithms (Dijkstra/A*), Go/Java concurrency, and large-scale streaming.',
    roundFormats: ['Coding Screen (DSA)', 'Algorithmic Problem Solving', 'Distributed Systems Design', 'Values & Bar Raiser'],
    cultureBrief: {
      coreValues: ['Go Get It', 'Trip Obsessed', 'Build with Heart', 'Stand for Safety'],
      whatTheyLookFor: 'World-class computational problem solving, graph theory, real-time spatial calculations, and clean concurrency primitives.',
      redFlags: ['Inability to analyze worst-case time complexity of graph traversals', 'Weak understanding of deadlock conditions'],
      hiringPhilosophy: 'Hire top-tier engineers capable of moving people and things across cities with zero latency.'
    },
    callSheet: [
      {
        id: 'ub-q1',
        question: 'Implement a dynamic ride-sharing route matching algorithm that pairs two passengers taking overlapping routes.',
        round: 'Algorithmic Problem Solving',
        difficulty: 'Hard',
        topic: 'Graph Algorithms & Geometry',
        tips: 'Use spatial k-d trees and detour tolerance factors to optimize matched mileage.'
      }
    ],
    roles: [
      {
        id: 'uber-sde',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Go', 'Java', 'Algorithms', 'Distributed Systems', 'Kafka'],
        preferredDegree: ['B.Tech CSE/IT'],
        rounds: ['Advanced DSA (Graphs & DP)', 'Low Level & High Level Design', 'Bar Raiser'],
        ctcLpa: '₹34 - 48 LPA'
      }
    ]
  },
  {
    id: 'adobe-india',
    name: 'Adobe',
    logo: '🎨',
    badgeLetter: 'AD',
    badgeColor: '#FF0000',
    competencySubtitle: 'C++ Systems • Computer Graphics • Creative Cloud',
    category: 'Tech Giants',
    headquarters: 'Noida / Bengaluru',
    ctcRange: '₹25 - 42 LPA',
    hiringTiers: ['Tier 1', 'Tier 2'],
    interviewFocus: 'Memory management, computer graphics, linear algebra, C++ pointers, and deep learning for creative tools.',
    roundFormats: ['Online Coding Test', 'Technical Round 1 (C++/DSA)', 'Technical Round 2 (Systems/OS)', 'HR & Cultural Round'],
    cultureBrief: {
      coreValues: ['Genuine', 'Exceptional', 'Innovative', 'Involved'],
      whatTheyLookFor: 'Deep fluency in C++ memory models, cache locality, operating system internals, and creative product passion.',
      redFlags: ['Memory leaks, dangling pointers, or lack of knowledge about RAII and smart pointers in C++'],
      hiringPhilosophy: 'Create technologies that empower anyone anywhere to create and communicate.'
    },
    callSheet: [
      {
        id: 'ad-q1',
        question: 'Design a multi-layer undo/redo command stack for a graphics canvas with limited memory bounds.',
        round: 'Technical Round 1',
        difficulty: 'Medium',
        topic: 'Design Patterns & Memory Management',
        tips: 'Apply the Command Pattern combined with differential delta snapshots instead of full image cloning.'
      }
    ],
    roles: [
      {
        id: 'adobe-swe',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['C++', 'Data Structures', 'Operating Systems', 'OOP', 'Algorithms'],
        preferredDegree: ['B.Tech/B.E.'],
        rounds: ['C++ Systems Coding', 'Object-Oriented Design', 'Managerial Round'],
        ctcLpa: '₹26 - 40 LPA'
      },
      {
        id: 'adobe-ds',
        title: 'Data Scientist',
        category: 'Data & AI',
        requiredSkills: ['Computer Vision', 'Deep Learning', 'PyTorch', 'Python'],
        preferredDegree: ['B.Tech', 'M.Tech'],
        rounds: ['Computer Vision Fundamentals', 'Coding Test', 'Cultural Fit'],
        ctcLpa: '₹28 - 42 LPA'
      }
    ]
  },
  {
    id: 'cisco-india',
    name: 'Cisco Systems',
    logo: '🌐',
    badgeLetter: 'CS',
    badgeColor: '#049FD9',
    competencySubtitle: 'Networking • Linux Kernel • Cloud Security',
    category: 'Tech Giants',
    headquarters: 'Bengaluru, Karnataka',
    ctcRange: '₹18 - 30 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'TCP/IP socket programming, packet routing, Linux kernel fundamentals, and cloud security.',
    roundFormats: ['Aptitude & Technical OA', 'Technical Round 1 (Networking/DSA)', 'Technical Round 2 (OS/Architecture)', 'Managerial & HR'],
    cultureBrief: {
      coreValues: ['Connect Everything', 'Innovate Everywhere', 'Benefit Everyone', 'Inclusive Collaboration'],
      whatTheyLookFor: 'Rock solid networking fundamentals (OSI layers, TCP handshake, DNS), Linux system calls, and clean C/Python code.',
      redFlags: ['Not understanding the difference between TCP and UDP or ARP protocol'],
      hiringPhilosophy: 'Power an inclusive future for all through resilient global networking.'
    },
    callSheet: [
      {
        id: 'cisco-q1',
        question: 'Explain what happens at the network layer when you type "https://google.com" in a web browser from DNS query to TCP TLS handshake.',
        round: 'Technical Round 1',
        difficulty: 'Medium',
        topic: 'Networking & Protocols',
        tips: 'Trace ARP resolution, DNS recursive lookup, TCP 3-way handshake (SYN, SYN-ACK, ACK), and TLS key exchange.'
      }
    ],
    roles: [
      {
        id: 'cisco-net-eng',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['C', 'Python', 'TCP/IP', 'Linux', 'Data Structures'],
        preferredDegree: ['B.Tech CSE/ECE/EE'],
        rounds: ['Networking & Coding Round', 'Operating Systems & Linux', 'HR Round'],
        ctcLpa: '₹18 - 28 LPA'
      }
    ]
  },
  {
    id: 'atlassian-india',
    name: 'Atlassian',
    logo: '🔷',
    badgeLetter: 'AT',
    badgeColor: '#0052CC',
    competencySubtitle: 'Open Work • Global Scale • Values Driven',
    category: 'High-Growth Tech',
    headquarters: 'Bengaluru, Karnataka',
    ctcRange: '₹26 - 44 LPA',
    hiringTiers: ['Tier 1', 'Tier 2'],
    interviewFocus: 'Clean code craftsmanship, collaborative problem solving, distributed cloud microservices, and unique core values.',
    roundFormats: ['Codility Coding Screen', 'DSA & Algorithmic Round', 'System Architecture & Design', 'Values Interview (Don’t #@!% the customer)'],
    cultureBrief: {
      coreValues: ['Open Company, No Bullshit', 'Build with Heart & Balance', 'Don’t #@!% the Customer', 'Play, as a Team', 'Be the Change You Seek'],
      whatTheyLookFor: 'Collaborative communicators who write self-documenting code, test edge cases proactively, and genuinely embrace team-first culture.',
      redFlags: ['Ego, dismissing team input, or failing the dedicated Values interview round'],
      hiringPhilosophy: 'Unleash the potential of every team with open and ethical engineering practices.'
    },
    callSheet: [
      {
        id: 'atl-q1',
        question: 'Design a collaborative live rich-text document editing system where multiple teammates can type concurrently (like Confluence).',
        round: 'System Architecture',
        difficulty: 'Hard',
        topic: 'Operational Transformation & CRDT',
        tips: 'Discuss Conflict-free Replicated Data Types (CRDTs), operational transforms, and WebSocket diff sync.'
      }
    ],
    roles: [
      {
        id: 'atl-sde',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Java', 'Kotlin', 'React', 'Distributed Systems', 'System Design'],
        preferredDegree: ['B.Tech/B.E.'],
        rounds: ['DSA Coding Assessment', 'Architecture & Concurrency', 'Atlassian Values Round'],
        ctcLpa: '₹28 - 42 LPA'
      }
    ]
  },
  {
    id: 'reliance-jio',
    name: 'Reliance Jio',
    logo: '📶',
    badgeLetter: 'RJ',
    badgeColor: '#0A2540',
    competencySubtitle: '5G Core • Telecom Cloud • Large Scale AI',
    category: 'High-Growth Tech',
    headquarters: 'Navi Mumbai / Bengaluru',
    ctcRange: '₹8 - 18 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'Cloud-native telecom stacks, Kubernetes, Python/Go backend services, and high-volume subscriber analytics.',
    roundFormats: ['Jio Talent Assessment (Coding)', 'Technical Panel (DSA & DB)', 'Cloud/Domain Round', 'HR Round'],
    cultureBrief: {
      coreValues: ['Growth is Life', 'Customer Value Creation', 'Integrity', 'Youth Leadership'],
      whatTheyLookFor: 'Willingness to build massive-scale national digital infrastructure serving 450+ million subscribers.',
      redFlags: ['Lack of interest in cloud and containerization basics'],
      hiringPhilosophy: 'Deliver affordable digital life to every Indian.'
    },
    callSheet: [
      {
        id: 'jio-q1',
        question: 'How do you process and index real-time call detail records (CDR) generating 100,000 events per second for fraud detection?',
        round: 'Cloud/Domain Round',
        difficulty: 'Medium',
        topic: 'Stream Processing',
        tips: 'Discuss Apache Spark Streaming / Flink with sliding time windows and distributed state checkpoints.'
      }
    ],
    roles: [
      {
        id: 'jio-sde',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Java', 'Python', 'Docker', 'Kubernetes', 'SQL'],
        preferredDegree: ['B.Tech (All Branches)', 'MCA'],
        rounds: ['Online Coding Test', 'Technical Panel Interview', 'HR Interview'],
        ctcLpa: '₹9 - 16 LPA'
      },
      {
        id: 'jio-da',
        title: 'Data Analyst',
        category: 'Data & AI',
        requiredSkills: ['Python', 'SQL', 'Big Data', 'Data Visualization'],
        preferredDegree: ['B.Tech', 'B.Sc Statistics/Math'],
        rounds: ['Data Modeling Test', 'Analytics Case Study', 'HR Round'],
        ctcLpa: '₹8 - 14 LPA'
      }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logo: '🏢',
    badgeLetter: 'INF',
    badgeColor: '#007CC3',
    competencySubtitle: 'InfyTQ • Specialist Programmer (SP/SES) • Cloud',
    category: 'IT Services & Consulting',
    headquarters: 'Bengaluru / Pune / Hyderabad',
    ctcRange: '₹4 - 11 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'InfyTQ certification, HackWithInfy coding, Specialist Programmer (₹9.5 LPA) DSA algorithms, and DBMS.',
    roundFormats: ['InfyTQ / HackWithInfy Coding Exam', 'Technical Interview (DSA, OOP, Projects)', 'HR Interview'],
    cultureBrief: {
      coreValues: ['Client Value', 'Leadership by Example', 'Integrity & Transparency', 'Excellence'],
      whatTheyLookFor: 'Strong algorithmic competence for the Specialist Programmer track (Graphs, Dynamic Programming) and excellent professional communication.',
      redFlags: ['Inability to debug logic errors when test cases fail during interview'],
      hiringPhilosophy: 'Nurture technical talent through world-renowned global training facilities (Mysore Campus).'
    },
    callSheet: [
      {
        id: 'inf-q1',
        question: 'Given an array representing daily stock prices, find the maximum profit possible with at most two transactions allowed.',
        round: 'Specialist Programmer Round',
        difficulty: 'Medium',
        topic: 'Dynamic Programming',
        tips: 'Maintain left-to-right maximum single profit and right-to-left maximum single profit arrays to compute overall maximum in O(n).'
      }
    ],
    roles: [
      {
        id: 'inf-sp',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Java', 'Python', 'Algorithms', 'Data Structures', 'SQL'],
        preferredDegree: ['All Engineering Degrees', 'MCA'],
        rounds: ['HackWithInfy / SP Coding Round', 'Technical Problem Solving Panel', 'HR Round'],
        ctcLpa: '₹6.5 - 11 LPA'
      }
    ]
  },
  {
    id: 'wipro',
    name: 'Wipro',
    logo: '🏢',
    badgeLetter: 'W',
    badgeColor: '#5B2C6F',
    competencySubtitle: 'Elite NTH • Turbo Cadre • Full Stack',
    category: 'IT Services & Consulting',
    headquarters: 'Bengaluru / Pan India',
    ctcRange: '₹3.8 - 10 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'Elite National Talent Hunt (NTH), Turbo upgrades, Java/Python programming, and enterprise software.',
    roundFormats: ['Aptitude & Coding Exam', 'Technical Panel (DSA & DBMS)', 'HR Round'],
    cultureBrief: {
      coreValues: ['Be passionate about clients’ success', 'Treat each person with respect', 'Be global and responsible', 'Unyielding integrity'],
      whatTheyLookFor: 'Clear logical problem solving, foundational database concepts, and enthusiastic professional attitude.',
      redFlags: ['Copying code or inability to explain written syntax'],
      hiringPhilosophy: 'Invest in potential and build long-term career roadmaps.'
    },
    callSheet: [
      {
        id: 'wip-q1',
        question: 'Differentiate between Method Overloading and Method Overriding in Java with real-world examples.',
        round: 'Technical Panel',
        difficulty: 'Easy',
        topic: 'Object Oriented Programming',
        tips: 'Highlight compile-time vs runtime polymorphism, signature rules, and use of the @Override annotation.'
      }
    ],
    roles: [
      {
        id: 'wipro-turbo',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Java', 'C++', 'Python', 'SQL', 'Web Technologies'],
        preferredDegree: ['All Engineering Disciplines'],
        rounds: ['Turbo Coding Exam', 'Technical Assessment', 'HR Round'],
        ctcLpa: '₹6.5 - 10 LPA'
      }
    ]
  },
  {
    id: 'lt-engineering',
    name: 'Larsen & Toubro (L&T)',
    logo: '🏗️',
    badgeLetter: 'LT',
    badgeColor: '#004B87',
    competencySubtitle: 'Heavy Engineering • Infrastructure • SCADA & Automation',
    category: 'Core & Automotive',
    headquarters: 'Mumbai / Chennai',
    ctcRange: '₹7 - 15 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'Structural design, thermodynamic cycles, PLC/SCADA industrial controllers, and engineering project execution.',
    roundFormats: ['Subject Knowledge Assessment', 'Core Engineering Technical Panel', 'Site Safety & Case Study', 'HR Round'],
    cultureBrief: {
      coreValues: ['Discipline', 'Nation Building', 'Quality First', 'Safety Standards'],
      whatTheyLookFor: 'Robust understanding of engineering fundamentals, ability to read industrial schematics, and passion for physical infrastructure.',
      redFlags: ['Disregard for safety norms and industrial standards'],
      hiringPhilosophy: 'Pioneer the critical infrastructure that propels India into an industrial superpower.'
    },
    callSheet: [
      {
        id: 'lt-q1',
        question: 'Explain the working principle and failure modes of heavy industrial hydraulic circuits under variable load conditions.',
        round: 'Core Engineering Panel',
        difficulty: 'Medium',
        topic: 'Mechanical Systems',
        tips: 'Detail pressure relief valves, cavitation phenomena, and proactive filtration maintenance.'
      }
    ],
    roles: [
      {
        id: 'lt-grad-eng',
        title: 'Core Systems Engineer',
        category: 'Core Engineering',
        requiredSkills: ['AutoCAD', 'SolidWorks', 'Thermodynamics', 'SCADA', 'Project Management'],
        preferredDegree: ['B.Tech Mechanical', 'B.Tech Civil', 'B.Tech Electrical'],
        rounds: ['Core Engineering Assessment', 'Technical Viva Voce', 'Managerial Round'],
        ctcLpa: '₹7.5 - 14 LPA'
      }
    ]
  },
  {
    id: 'mahindra',
    name: 'Mahindra & Mahindra',
    logo: '🚙',
    badgeLetter: 'M&M',
    badgeColor: '#D32F2F',
    competencySubtitle: 'Automotive R&D • Connected Mobility • Powertrain',
    category: 'Core & Automotive',
    headquarters: 'Chennai (MRV) / Pune / Mumbai',
    ctcRange: '₹7.5 - 16 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'Vehicle dynamics, CAD/CAE simulations, CAN bus protocol, embedded microcontrollers, and ICE/EV transition.',
    roundFormats: ['Online Technical Test', 'Automotive Domain Technical Round', 'Design Thinking Viva', 'HR Round'],
    cultureBrief: {
      coreValues: ['Rise', 'Accepting No Limits', 'Alternative Thinking', 'Driving Positive Change'],
      whatTheyLookFor: 'Innovative engineers passionate about automobiles, vehicle safety crash simulations, and telemetry.',
      redFlags: ['Lack of curiosity about current automotive industry transitions and EV battery trends'],
      hiringPhilosophy: 'Empower people to rise through innovative mobility solutions.'
    },
    callSheet: [
      {
        id: 'mm-q1',
        question: 'Explain how Electronic Stability Program (ESP) intervenes to prevent vehicle understeer and oversteer during high-speed cornering.',
        round: 'Automotive Domain Round',
        difficulty: 'Medium',
        topic: 'Vehicle Dynamics',
        tips: 'Explain yaw rate sensors, steering angle sensors, and selective wheel brake pressure modulation.'
      }
    ],
    roles: [
      {
        id: 'mm-auto-eng',
        title: 'Automotive Systems Engineer',
        category: 'Core Engineering',
        requiredSkills: ['Vehicle Dynamics', 'MATLAB/Simulink', 'SolidWorks/CATIA', 'CAN Protocol'],
        preferredDegree: ['B.Tech Mechanical', 'B.Tech Automobile', 'B.Tech Mechatronics'],
        rounds: ['Core Technical Aptitude', 'Vehicle Systems Viva', 'HR Interview'],
        ctcLpa: '₹8 - 15 LPA'
      }
    ]
  },
  {
    id: 'ola-electric',
    name: 'Ola Electric',
    logo: '⚡',
    badgeLetter: 'OE',
    badgeColor: '#00C853',
    competencySubtitle: 'Gigafactory Battery Tech • Embedded Firmware • BMS',
    category: 'Core & Automotive',
    headquarters: 'Bengaluru / Krishnagiri (FutureFactory)',
    ctcRange: '₹12 - 24 LPA',
    hiringTiers: ['Tier 1', 'Tier 2', 'Tier 3'],
    interviewFocus: 'Battery cell chemistry (4680), embedded C firmware, motor control algorithms (FOC), and automotive electronics.',
    roundFormats: ['Embedded Coding / Circuit Exam', 'Hardware & Firmware Deep Dive', 'EV Architecture Round', 'Leadership Round'],
    cultureBrief: {
      coreValues: ['Urgency & Speed', 'Zero Emissions Mission', 'First Principles Thinking', 'Ownership'],
      whatTheyLookFor: 'Engineers who solve problems from first principles rather than copying legacy automotive conventions.',
      redFlags: ['Sluggish execution mentality or reluctance to work across firmware and hardware boundaries'],
      hiringPhilosophy: 'Accelerate the global transition to clean, sustainable electric mobility.'
    },
    callSheet: [
      {
        id: 'oe-q1',
        question: 'Describe Field Oriented Control (FOC) for Permanent Magnet Synchronous Motors (PMSM) in electric two-wheelers.',
        round: 'Hardware & Firmware Deep Dive',
        difficulty: 'Hard',
        topic: 'Motor Control & Power Electronics',
        tips: 'Cover Clarke and Park transforms converting 3-phase AC into decoupled torque and flux direct/quadrature (d-q) coordinates.'
      }
    ],
    roles: [
      {
        id: 'ola-bms-eng',
        title: 'BMS Firmware Engineer',
        category: 'Core Engineering',
        requiredSkills: ['Embedded C', 'Battery Management Systems', 'RTOS', 'CAN/SPI/I2C', 'Hardware Debugging'],
        preferredDegree: ['B.Tech Electrical', 'B.Tech ECE', 'B.Tech Mechatronics'],
        rounds: ['Embedded C Coding', 'Power Electronics & BMS Architecture', 'Leadership Round'],
        ctcLpa: '₹12 - 22 LPA'
      },
      {
        id: 'ola-swe',
        title: 'Software Engineer',
        category: 'Software Engineering',
        requiredSkills: ['Go', 'Python', 'IoT Telemetry', 'MQTT', 'Microservices'],
        preferredDegree: ['B.Tech CSE/IT'],
        rounds: ['DSA Coding Challenge', 'High Scale IoT Architecture', 'HR Round'],
        ctcLpa: '₹14 - 24 LPA'
      }
    ]
  }
];

export function findMatchingCompanies(skills: string[], textSample?: string): {
  company: Company;
  role: CompanyRole;
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  whyMatch: string;
}[] {
  const normalizedUserSkills = skills.map(s => s.toLowerCase().trim());
  const sample = (textSample || '').toLowerCase();

  const results: {
    company: Company;
    role: CompanyRole;
    matchScore: number;
    matchingSkills: string[];
    missingSkills: string[];
    whyMatch: string;
  }[] = [];

  COMPANIES_DATABASE.forEach(company => {
    company.roles.forEach(role => {
      const matchingSkills: string[] = [];
      const missingSkills: string[] = [];

      role.requiredSkills.forEach(reqSkill => {
        const reqLower = reqSkill.toLowerCase();
        const matches = normalizedUserSkills.some(us => us.includes(reqLower) || reqLower.includes(us)) ||
                        sample.includes(reqLower);
        if (matches) {
          matchingSkills.push(reqSkill);
        } else {
          missingSkills.push(reqSkill);
        }
      });

      const skillScore = role.requiredSkills.length > 0 
        ? Math.round((matchingSkills.length / role.requiredSkills.length) * 100)
        : 60;

      const matchScore = Math.min(98, Math.max(45, skillScore + (matchingSkills.length > 0 ? 10 : 0)));

      let whyMatch = '';
      if (matchingSkills.length > 0) {
        whyMatch = `Your background in ${matchingSkills.slice(0, 3).join(', ')} directly matches ${company.name}'s requirements for ${role.title}.`;
      } else {
        whyMatch = `Great aspirational opportunity for ${company.name}; upskilling in ${missingSkills.slice(0, 2).join(' & ')} will qualify you for placements.`;
      }

      results.push({
        company,
        role,
        matchScore,
        matchingSkills,
        missingSkills,
        whyMatch
      });
    });
  });

  return results.sort((a, b) => b.matchScore - a.matchScore);
}
