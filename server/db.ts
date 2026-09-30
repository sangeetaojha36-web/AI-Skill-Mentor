/**
 * Database Module for AI Skill Mentor - India Edition
 * Dedicated to Indian students across B.Tech, B.E., B.Sc, B.Com, BCA, MCA, etc.
 * Featuring Indian hiring companies, LPA compensation brackets, and campus placement dynamics.
 */

import { User, Career, Course, Project, ResumeAnalysis, Roadmap, MockInterviewSession, ChatMessage } from './types.ts';

export const DB = {
  users: [] as User[],
  careers: [] as Career[],
  courses: [] as Course[],
  projects: [] as Project[],
  resumes: [] as ResumeAnalysis[],
  roadmaps: [] as Roadmap[],
  interviews: [] as MockInterviewSession[],
  chatHistory: [] as ChatMessage[],
  analytics: {
    totalStudentsIndexed: 4820,
    placedInCurrentDrive: 1240,
    averageCTCJump: '68% Average LPA Hike',
    mockInterviewsCompleted: 3120,
    topHiringCities: ['Bengaluru', 'Hyderabad', 'Pune', 'Noida / Gurgaon', 'Mumbai', 'Chennai']
  }
};

// Seed Indian student personas and Training & Placement (T&P) Cell Admin
export const SEED_USERS: User[] = [
  {
    id: 'user-rohan-mechanical',
    name: 'Rohan Sharma',
    email: 'rohan.sharma22@aktu.ac.in',
    passwordHash: 'rohan123',
    role: 'student',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    country: 'India',
    stateOrCity: 'Noida, Uttar Pradesh',
    languages: ['Hindi', 'English'],
    education: {
      degree: 'B.Tech',
      branch: 'Mechanical Engineering',
      college: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU Affiliated)',
      collegeTier: 'Tier 3',
      currentYear: 'Final Year (8th Semester - 2026 Batch)',
      cgpa: '8.1 / 10.0'
    },
    skills: ['Python', 'AutoCAD', 'SolidWorks', 'Excel', 'Problem Solving', 'Basics of SQL'],
    interests: ['Data Science & Analytics', 'Robotics & Automation', 'Electric Vehicles (EV)'],
    careerGoal: 'Data Analyst',
    targetCompanies: ['Flipkart', 'TCS Digital', 'Tata Motors', 'Fractal Analytics', 'Mu Sigma'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-ananya-biotech',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@du.ac.in',
    passwordHash: 'ananya123',
    role: 'student',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    country: 'India',
    stateOrCity: 'New Delhi',
    languages: ['English', 'Hindi', 'Tamil'],
    education: {
      degree: 'B.Sc (Hons)',
      branch: 'Biotechnology & Life Sciences',
      college: 'University of Delhi (South Campus)',
      collegeTier: 'Tier 1',
      currentYear: 'Final Year (6th Semester - 2026 Batch)',
      cgpa: '8.7 / 10.0'
    },
    skills: ['PCR', 'Genomics', 'Python', 'Biostatistics', 'Molecular Biology', 'Excel'],
    interests: ['Bioinformatics', 'Pharmaceutical Analytics', 'Healthcare AI'],
    careerGoal: 'Bioinformatics Analyst',
    targetCompanies: ['Biocon', 'Strand Life Sciences', 'Dr. Reddy\'s Laboratories', 'Serum Institute'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-aryan-commerce',
    name: 'Aryan Patel',
    email: 'aryan.patel@xaviers.edu.in',
    passwordHash: 'aryan123',
    role: 'student',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    country: 'India',
    stateOrCity: 'Mumbai, Maharashtra',
    languages: ['English', 'Hindi', 'Gujarati'],
    education: {
      degree: 'B.Com (Hons)',
      branch: 'Commerce & Financial Markets',
      college: 'St. Xavier\'s College, Mumbai',
      collegeTier: 'Tier 1',
      currentYear: '3rd Year (Final - 2026 Batch)',
      cgpa: '8.9 / 10.0'
    },
    skills: ['Financial Modeling', 'Excel', 'Corporate Accounting', 'Communication', 'SQL'],
    interests: ['FinTech & FinTech Startups', 'Equity Research', 'Product Analytics'],
    careerGoal: 'Financial & FinTech Analyst',
    targetCompanies: ['Zerodha', 'Goldman Sachs Bengaluru', 'HDFC Bank', 'Deloitte India'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-admin-placement',
    name: 'Prof. R. K. Mukherjee',
    email: 'tnp.head@nit.ac.in',
    passwordHash: 'admin123',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
    country: 'India',
    stateOrCity: 'Bengaluru, Karnataka',
    languages: ['English', 'Hindi', 'Bengali'],
    education: {
      degree: 'Ph.D. in Systems Engineering (IIT Kharagpur)',
      branch: 'Training & Placement Directorate',
      college: 'National Institute of Technology',
      collegeTier: 'Tier 1',
      currentYear: 'Head of T&P Cell'
    },
    skills: ['Placement Training', 'Curriculum Industry Alignment', 'Corporate Relations', 'Analytics'],
    interests: ['Campus Placements', 'Tier 2/3 Upskilling', 'Industry-Academia Bridge'],
    careerGoal: 'Director of Career Services',
    createdAt: new Date().toISOString()
  }
];

// Indian High-Growth Careers with CTC in Lakhs Per Annum (LPA)
export const SEED_CAREERS: Career[] = [
  {
    id: 'career-data-analyst-india',
    title: 'Data Analyst & Business Insights',
    domain: 'Data Science & Analytics',
    description: 'Converts corporate raw data into executive business intelligence for high-growth Indian enterprises, startups, and MNC capability centers (GCCs).',
    requiredSkills: [
      { name: 'SQL', importance: 'high', category: 'Databases' },
      { name: 'Excel', importance: 'high', category: 'Analytics' },
      { name: 'Python', importance: 'high', category: 'Programming' },
      { name: 'Power BI', importance: 'high', category: 'BI Tools' },
      { name: 'Tableau', importance: 'medium', category: 'Visualization' },
      { name: 'Statistics', importance: 'high', category: 'Mathematics' },
      { name: 'Communication', importance: 'medium', category: 'Soft Skills' }
    ],
    recommendedDisciplines: ['Mechanical Engineering', 'Computer Science', 'Commerce', 'Mathematics', 'Civil Engineering', 'Electrical'],
    averageSalaryIndia: '₹6.5 LPA - ₹15.5 LPA (Senior: ₹24+ LPA)',
    topRecruitersIndia: ['Flipkart', 'Swiggy', 'TCS Digital', 'Fractal Analytics', 'Mu Sigma', 'Deloitte India', 'Zomato'],
    growthOutlook: '+28% (Massive demand in Indian GCCs & Product Startups)',
    keyResponsibilities: [
      'Write optimized SQL queries on data warehouses like Snowflake, BigQuery, and PostgreSQL',
      'Build executive dashboards in Power BI tracking GMV, user acquisition, and churn rates',
      'Conduct statistical cohort analysis to improve product margins and supply chain throughput'
    ],
    sampleJobTitles: ['Data Analyst I', 'Business Analyst', 'Decision Analytics Associate', 'Growth Data Analyst']
  },
  {
    id: 'career-fullstack-dev-india',
    title: 'Full Stack Web Developer (MERN / Java)',
    domain: 'Software Engineering & IT',
    description: 'Engineers resilient client interfaces and robust backend microservices powering India\'s fintech, e-commerce, and SaaS ecosystems.',
    requiredSkills: [
      { name: 'JavaScript', importance: 'high', category: 'Programming' },
      { name: 'React', importance: 'high', category: 'Frontend' },
      { name: 'Node.js', importance: 'high', category: 'Backend' },
      { name: 'SQL', importance: 'high', category: 'Databases' },
      { name: 'Git', importance: 'high', category: 'Version Control' },
      { name: 'Docker', importance: 'medium', category: 'DevOps' },
      { name: 'Problem Solving', importance: 'high', category: 'Data Structures' }
    ],
    recommendedDisciplines: ['Computer Science', 'Information Technology', 'Electronics & Communication', 'Mechanical', 'BCA/MCA'],
    averageSalaryIndia: '₹7.0 LPA - ₹22.0 LPA (Product Tier: ₹30+ LPA)',
    topRecruitersIndia: ['Amazon India', 'Razorpay', 'PhonePe', 'Flipkart', 'Infosys Springboard', 'CRED', 'Jio'],
    growthOutlook: '+25% (High volume of off-campus & on-campus hiring)',
    keyResponsibilities: [
      'Build performant responsive web apps with React and TypeScript',
      'Architect RESTful / GraphQL microservice APIs in Node.js or Spring Boot',
      'Optimize database queries and implement Redis caching for high-concurrency traffic'
    ],
    sampleJobTitles: ['SDE-1 (Software Development Engineer)', 'Associate Full Stack Developer', 'Frontend Engineer']
  },
  {
    id: 'career-robotics-automation-india',
    title: 'Robotics & Industrial Automation Engineer',
    domain: 'Robotics, EV & Mechatronics',
    description: 'Integrates automated robotic cells, programmable logic controllers (PLCs), and robotic operating systems (ROS) for Indian EV manufacturing and automotive giants.',
    requiredSkills: [
      { name: 'Robotics', importance: 'high', category: 'Automation' },
      { name: 'PLC Programming', importance: 'high', category: 'Industrial Controls' },
      { name: 'Python', importance: 'high', category: 'Programming' },
      { name: 'ROS', importance: 'high', category: 'Robotics OS' },
      { name: 'SolidWorks', importance: 'medium', category: 'CAD & Design' },
      { name: 'Microcontrollers', importance: 'medium', category: 'Embedded' },
      { name: 'IoT', importance: 'medium', category: 'Connected Hardware' }
    ],
    recommendedDisciplines: ['Mechanical Engineering', 'Mechatronics', 'Electrical Engineering', 'Electronics & Instrumentation'],
    averageSalaryIndia: '₹6.0 LPA - ₹16.0 LPA (EV Sector: ₹20+ LPA)',
    topRecruitersIndia: ['Tata Motors', 'Ola Electric', 'L&T Technology Services', 'Bajaj Auto', 'Fanuc India', 'ISRO / DRDO'],
    growthOutlook: '+22% (Driven by India\'s Make in India & EV revolution)',
    keyResponsibilities: [
      'Program industrial articulated robots (KUKA/ABB/Fanuc) for spot welding and battery assembly',
      'Design Siemens / Allen-Bradley PLC logic for automated material handling conveyor systems',
      'Interface hardware sensors with cloud telemetry dashboards via MQTT / IoT protocols'
    ],
    sampleJobTitles: ['Automation Engineer', 'Robotics Systems Specialist', 'EV Powertrain Automation Lead']
  },
  {
    id: 'career-bioinformatics-india',
    title: 'Bioinformatics & Genomic Data Scientist',
    domain: 'Biotechnology & Pharma Analytics',
    description: 'Blends computational algorithms with molecular biology datasets to accelerate vaccine development, precision oncology, and agri-genomics across Indian biotech leaders.',
    requiredSkills: [
      { name: 'Bioinformatics', importance: 'high', category: 'Domain' },
      { name: 'Python', importance: 'high', category: 'Data Analysis' },
      { name: 'R Programming', importance: 'high', category: 'Biostatistics' },
      { name: 'Genomics', importance: 'high', category: 'Molecular Biology' },
      { name: 'Statistics', importance: 'medium', category: 'Mathematics' },
      { name: 'Git', importance: 'medium', category: 'Version Control' }
    ],
    recommendedDisciplines: ['Biotechnology', 'Biomedical Engineering', 'B.Sc/M.Sc Life Sciences', 'Bioinformatics', 'Computer Science'],
    averageSalaryIndia: '₹5.5 LPA - ₹14.0 LPA (R&D Labs: ₹18+ LPA)',
    topRecruitersIndia: ['Biocon Biologics', 'Strand Life Sciences', 'Dr. Reddy\'s Laboratories', 'Serum Institute of India', 'Syngene International'],
    growthOutlook: '+20% (Rapid expansion in Indian biopharma hub: Bengaluru & Hyderabad)',
    keyResponsibilities: [
      'Execute RNA-seq differential gene expression pipelines using DESeq2 and Python',
      'Perform variant calling (GATK) and genomic structural annotation on NGS datasets',
      'Collaborate with molecular wet-lab teams to translate computational markers into clinical assays'
    ],
    sampleJobTitles: ['Bioinformatics Associate', 'Genomic Data Analyst', 'Computational Biology Specialist']
  },
  {
    id: 'career-civil-bim-india',
    title: 'BIM & Smart Infrastructure Coordinator',
    domain: 'Civil Engineering & Smart Cities',
    description: 'Leads digital 3D Building Information Modeling (BIM), clash detection, and structural analysis for India\'s monumental expressway, metro, and airport projects.',
    requiredSkills: [
      { name: 'Revit', importance: 'high', category: 'BIM' },
      { name: 'AutoCAD', importance: 'high', category: 'Drafting' },
      { name: 'STAAD Pro', importance: 'high', category: 'Structural Engineering' },
      { name: 'Structural Analysis', importance: 'high', category: 'Core Civil' },
      { name: 'Construction Management', importance: 'medium', category: 'Management' },
      { name: 'GIS', importance: 'medium', category: 'Geospatial' }
    ],
    recommendedDisciplines: ['Civil Engineering', 'Structural Engineering', 'Architecture (B.Arch)', 'Construction Technology'],
    averageSalaryIndia: '₹5.0 LPA - ₹13.5 LPA (Major EPCs: ₹18+ LPA)',
    topRecruitersIndia: ['L&T Construction', 'Shapoorji Pallonji', 'Tata Projects', 'Afcons Infrastructure', 'NHAI Contractors', 'Godrej Properties'],
    growthOutlook: '+19% (Gati Shakti & National Infrastructure Pipeline mandates)',
    keyResponsibilities: [
      'Build and coordinate 3D parametric BIM structural models in Autodesk Revit',
      'Execute multi-story structural load calculations in STAAD.Pro conforming to IS Codes (IS 456, IS 1893)',
      'Run clash detection between architectural, structural, and MEP piping systems'
    ],
    sampleJobTitles: ['BIM Engineer', 'Structural Design Engineer', 'Digital Project Coordinator']
  },
  {
    id: 'career-fintech-analyst-india',
    title: 'Financial & FinTech Analytics Specialist',
    domain: 'Commerce, Finance & FinTech',
    description: 'Applies dynamic financial modeling, accounting valuation, and data querying to optimize retail trading, wealth tech, and risk underwriting in India\'s booming FinTech sector.',
    requiredSkills: [
      { name: 'Financial Modeling', importance: 'high', category: 'Finance' },
      { name: 'Excel', importance: 'high', category: 'Spreadsheets' },
      { name: 'Accounting', importance: 'high', category: 'Financial Statements' },
      { name: 'SQL', importance: 'high', category: 'Data Analysis' },
      { name: 'Python', importance: 'medium', category: 'Automation' },
      { name: 'Risk Management', importance: 'medium', category: 'Compliance' }
    ],
    recommendedDisciplines: ['Commerce (B.Com)', 'Economics', 'BBA / Finance', 'Chartered Accountancy Inter', 'MBA Finance'],
    averageSalaryIndia: '₹6.5 LPA - ₹18.0 LPA (Investment Banking GCC: ₹26+ LPA)',
    topRecruitersIndia: ['Zerodha', 'Groww', 'Goldman Sachs Bengaluru', 'J.P. Morgan Chase Mumbai', 'HDFC Bank', 'Deloitte India'],
    growthOutlook: '+24% (India is the global leader in digital UPI and FinTech adoption)',
    keyResponsibilities: [
      'Build dynamic Discounted Cash Flow (DCF) and three-statement financial forecast models',
      'Audit trading volumes, merchant margins, and loan default risks using SQL and Excel',
      'Create monthly investor presentation memorandums and regulatory compliance summaries'
    ],
    sampleJobTitles: ['Equity Research Associate', 'FinTech Risk Analyst', 'Financial Planning & Analysis (FP&A) Analyst']
  },
  {
    id: 'career-product-manager-india',
    title: 'Associate Product Manager (APM)',
    domain: 'Product Strategy & Technology',
    description: 'Shapes consumer tech product roadmaps, conducts customer discovery across Tier 1 to Tier 3 Indian user demographics, and coordinates engineering delivery sprints.',
    requiredSkills: [
      { name: 'Product Management', importance: 'high', category: 'Strategy' },
      { name: 'Business Analysis', importance: 'high', category: 'Problem Solving' },
      { name: 'UI/UX Design', importance: 'medium', category: 'Wireframing' },
      { name: 'SQL', importance: 'high', category: 'Product Metrics' },
      { name: 'Figma', importance: 'medium', category: 'Prototyping' },
      { name: 'Communication', importance: 'high', category: 'Stakeholder Alignment' }
    ],
    recommendedDisciplines: ['Engineering (Any Branch)', 'BBA / Commerce', 'Computer Science', 'Design', 'Economics'],
    averageSalaryIndia: '₹12.0 LPA - ₹28.0 LPA (Unicorns: ₹35+ LPA)',
    topRecruitersIndia: ['Flipkart', 'Swiggy', 'Zomato', 'Razorpay', 'CRED', 'Meesho', 'Urban Company'],
    growthOutlook: '+30% (High prestige APM cohorts across Indian startups)',
    keyResponsibilities: [
      'Author Product Requirement Documents (PRDs) with user stories and acceptance criteria',
      'Analyze funnel drop-offs and retention cohorts using SQL and analytics dashboards',
      'Collaborate with engineering squads and design teams in fast-paced two-week Agile sprints'
    ],
    sampleJobTitles: ['Associate Product Manager (APM)', 'Product Analyst', 'Technical Product Specialist']
  },
  {
    id: 'career-embedded-vlsi-india',
    title: 'Embedded Systems & VLSI Firmware Engineer',
    domain: 'Electronics, Semiconductors & Hardware',
    description: 'Designs semiconductor firmware, microcontrollers, and wireless IoT hardware powering India\'s semiconductor mission and consumer hardware hubs.',
    requiredSkills: [
      { name: 'Embedded Systems', importance: 'high', category: 'Firmware' },
      { name: 'C++', importance: 'high', category: 'Low-Level Code' },
      { name: 'Microcontrollers', importance: 'high', category: 'Hardware' },
      { name: 'PCB Design', importance: 'medium', category: 'Electronics' },
      { name: 'IoT', importance: 'medium', category: 'Connectivity' },
      { name: 'Verilog', importance: 'medium', category: 'VLSI' }
    ],
    recommendedDisciplines: ['Electronics & Communication (ECE)', 'Electrical Engineering (EEE)', 'Instrumentation'],
    averageSalaryIndia: '₹8.0 LPA - ₹24.0 LPA (Chip Makers: ₹32+ LPA)',
    topRecruitersIndia: ['Qualcomm India', 'Texas Instruments Bengaluru', 'Intel India', 'MediaTek Noida', 'NXP Semiconductors', 'Tata Electronics'],
    growthOutlook: '+26% (Massive government semiconductor incentives & fab investments)',
    keyResponsibilities: [
      'Write low-level device drivers in Embedded C/C++ on ARM Cortex-M microcontrollers',
      'Debug bus protocols (UART, SPI, I2C, CAN) using digital storage oscilloscopes and logic analyzers',
      'Design multi-layer schematics and PCB layouts in Altium or KiCad'
    ],
    sampleJobTitles: ['Firmware Engineer', 'Embedded Software Engineer I', 'Silicon Validation Engineer']
  }
];

// Indian Platform Learning Resources (NPTEL, SWAYAM, GeeksforGeeks, Scaler, freeCodeCamp, etc.)
export const SEED_COURSES: Course[] = [
  {
    id: 'course-sql-gfg',
    title: 'SQL & Relational Databases for Tech & Analytics Placements',
    provider: 'GeeksforGeeks / Striver Sheet',
    skill: 'SQL',
    difficulty: 'Beginner',
    duration: '3 Weeks (15 Hours)',
    rating: 4.9,
    url: 'https://geeksforgeeks.org',
    type: 'Interactive',
    domain: 'Data Science & Analytics'
  },
  {
    id: 'course-stats-nptel',
    title: 'Data Analytics with Python & Applied Statistics',
    provider: 'NPTEL / IIT Madras',
    skill: 'Statistics',
    difficulty: 'Intermediate',
    duration: '8 Weeks (Self-Paced)',
    rating: 4.8,
    url: 'https://nptel.ac.in',
    type: 'Course',
    domain: 'Data Science & Analytics'
  },
  {
    id: 'course-powerbi-microsoft',
    title: 'Microsoft Power BI Data Analyst Associate (PL-300)',
    provider: 'Microsoft Learn India',
    skill: 'Power BI',
    difficulty: 'Beginner',
    duration: '4 Weeks (12 Hours)',
    rating: 4.8,
    url: 'https://learn.microsoft.com',
    type: 'Certification',
    domain: 'Data Science & Analytics'
  },
  {
    id: 'course-ros-robotics-iit',
    title: 'ROS 2 & Industrial Robotics for Smart Manufacturing',
    provider: 'NPTEL / IIT Kharagpur',
    skill: 'ROS',
    difficulty: 'Intermediate',
    duration: '6 Weeks (18 Hours)',
    rating: 4.9,
    url: 'https://nptel.ac.in',
    type: 'Course',
    domain: 'Robotics, EV & Mechatronics'
  },
  {
    id: 'course-revit-bim-autodesk',
    title: 'Autodesk Revit BIM & Structural Drafting Certification',
    provider: 'Autodesk India Academy',
    skill: 'Revit',
    difficulty: 'Beginner',
    duration: '5 Weeks (16 Hours)',
    rating: 4.8,
    url: 'https://autodesk.com',
    type: 'Certification',
    domain: 'Civil Engineering & Smart Cities'
  },
  {
    id: 'course-bioinformatics-ibab',
    title: 'Genomics & Computational Biology Pipeline Programming',
    provider: 'IBAB Bengaluru / Coursera India',
    skill: 'Bioinformatics',
    difficulty: 'Intermediate',
    duration: '6 Weeks (20 Hours)',
    rating: 4.9,
    url: 'https://coursera.org',
    type: 'Course',
    domain: 'Biotechnology & Pharma Analytics'
  },
  {
    id: 'course-fintech-zerodha-varsity',
    title: 'Financial Modeling, DCF Valuation & Equity Markets',
    provider: 'Zerodha Varsity',
    skill: 'Financial Modeling',
    difficulty: 'Intermediate',
    duration: '4 Weeks (Comprehensive)',
    rating: 4.95,
    url: 'https://zerodha.com/varsity',
    type: 'Tutorial',
    domain: 'Commerce, Finance & FinTech'
  },
  {
    id: 'course-embedded-c-arm',
    title: 'Embedded Systems & Bare-Metal C for Semiconductor Placements',
    provider: 'FastBit Embedded / Udemy India',
    skill: 'Embedded Systems',
    difficulty: 'Intermediate',
    duration: '8 Weeks (30 Hours)',
    rating: 4.9,
    url: 'https://udemy.com',
    type: 'Course',
    domain: 'Electronics, Semiconductors & Hardware'
  }
];

// Indian Real-World Capstone Projects tailored for Indian Placement Interviews
export const SEED_PROJECTS: Project[] = [
  {
    id: 'proj-swiggy-zomato-analytics',
    title: 'Quick-Commerce & Food Delivery Unit Economics Analytics Dashboard',
    domain: 'Data Science & Analytics',
    targetCareer: 'Data Analyst & Business Insights',
    difficulty: 'Intermediate',
    description: 'Process 500,000+ simulated Swiggy/Zomato delivery records in SQL & Python, calculate city-wise rider payout margins and late delivery penalties, and build an interactive Power BI dashboard.',
    keySkills: ['SQL', 'Python', 'Power BI', 'Statistics'],
    deliverables: ['SQL analytical query script', 'Jupyter exploratory data analysis notebook', 'Live interactive Power BI dashboard with executive KPIs'],
    estimatedHours: 25
  },
  {
    id: 'proj-tata-motors-ev-telemetry',
    title: 'EV Battery Temperature Telemetry & Predictive Failure Model',
    domain: 'Robotics, EV & Mechatronics',
    targetCareer: 'Robotics & Industrial Automation Engineer',
    difficulty: 'Advanced',
    description: 'Build a Python & ROS node simulator capturing battery pack cell thermal data, identifying anomalous temperature spikes, and triggering automated safety shutdown loops.',
    keySkills: ['Python', 'Robotics', 'ROS', 'Microcontrollers'],
    deliverables: ['ROS 2 package with publisher/subscriber nodes', 'Thermal anomaly prediction script', 'Architecture schematic documentation'],
    estimatedHours: 35
  },
  {
    id: 'proj-lnt-metro-bim',
    title: 'Metro Station Structural Framing & BIM Clash Detection in Autodesk Revit',
    domain: 'Civil Engineering & Smart Cities',
    targetCareer: 'BIM & Smart Infrastructure Coordinator',
    difficulty: 'Intermediate',
    description: 'Model elevated metro station viaduct piers in Autodesk Revit, execute load checks in STAAD.Pro per Indian Standard Codes (IS 456 / IRC 112), and resolve 3D pipeline clashes.',
    keySkills: ['Revit', 'STAAD Pro', 'Structural Analysis', 'AutoCAD'],
    deliverables: ['Revit 3D structural model (.rvt)', 'STAAD.Pro load analysis calculation sheet', 'Bill of Quantities (BOQ) concrete estimation spreadsheet'],
    estimatedHours: 30
  },
  {
    id: 'proj-biocon-rna-seq',
    title: 'Biocon Breast Cancer RNA-Sequencing Biomarker Discovery Pipeline',
    domain: 'Biotechnology & Pharma Analytics',
    targetCareer: 'Bioinformatics & Genomic Data Scientist',
    difficulty: 'Advanced',
    description: 'Process public Indian patient cohort genomic sequencing FASTQ reads in Python and R (DESeq2), discovering 14 statistically significant drug target markers.',
    keySkills: ['Bioinformatics', 'R Programming', 'Genomics', 'Python'],
    deliverables: ['R markdown reproducible analysis notebook', 'Volcano plots and gene ontology heatmaps', 'Placement portfolio summary report'],
    estimatedHours: 28
  },
  {
    id: 'proj-zerodha-algo-backtest',
    title: 'Nifty 50 Algorithmic Momentum Trading & Risk Model in Python',
    domain: 'Commerce, Finance & FinTech',
    targetCareer: 'Financial & FinTech Analytics Specialist',
    difficulty: 'Intermediate',
    description: 'Pull 5 years of historical NSE stock quotes, calculate Moving Average Convergence Divergence (MACD) and Value at Risk (VaR), and build a dynamic DCF financial valuation model in Excel.',
    keySkills: ['Financial Modeling', 'Excel', 'Python', 'SQL'],
    deliverables: ['Excel three-statement DCF valuation model with scenario toggles', 'Python backtesting notebook with Sharpe ratio metrics'],
    estimatedHours: 24
  }
];

// Seed Indian Roadmap for Rohan Sharma (Mechanical student pivoting to Data Analyst)
export const SEED_ROADMAPS: Roadmap[] = [
  {
    id: 'roadmap-rohan-mechanical',
    userId: 'user-rohan-mechanical',
    careerId: 'career-data-analyst-india',
    careerTitle: 'Data Analyst & Business Insights',
    progressPercent: 40,
    updatedAt: new Date().toISOString(),
    steps: [
      {
        id: 'step-1',
        phase: 1,
        title: 'Phase 1: Leverage Engineering Math for Business Statistics',
        description: 'Bridge your mechanical engineering calculus and probability background into business hypothesis testing, variance, and p-value decision analysis.',
        skillsCovered: ['Statistics', 'Excel'],
        estimatedWeeks: 3,
        completed: true,
        recommendedResources: [
          { title: 'NPTEL Data Analytics with Python (IIT Madras)', type: 'Course' },
          { title: 'Excel Advanced Power Query & Pivot Formulas', type: 'Tutorial' }
        ]
      },
      {
        id: 'step-2',
        phase: 2,
        title: 'Phase 2: Relational Databases & SQL for Campus Placement Tests',
        description: 'Master medium-to-hard SQL queries (JOINs, Window Functions: RANK, DENSE_RANK, LEAD, LAG, and CTEs) frequently asked in TCS Digital, Flipkart, and Mu Sigma placement rounds.',
        skillsCovered: ['SQL'],
        estimatedWeeks: 3,
        completed: true,
        recommendedResources: [
          { title: 'GeeksforGeeks Top 50 SQL Placement Questions', type: 'Interactive' },
          { title: 'LeetCode Database Practice Problems', type: 'Interactive' }
        ]
      },
      {
        id: 'step-3',
        phase: 3,
        title: 'Phase 3: Executive BI Dashboards (Power BI / Tableau)',
        description: 'Learn DAX formulas, star schema data modeling, and build interactive KPI dashboards demonstrating business acumen for Indian e-commerce / manufacturing use cases.',
        skillsCovered: ['Power BI', 'Tableau'],
        estimatedWeeks: 3,
        completed: false,
        recommendedResources: [
          { title: 'Microsoft Power BI Certified Associate (PL-300)', type: 'Certification' }
        ]
      },
      {
        id: 'step-4',
        phase: 4,
        title: 'Phase 4: Python for Automated Data Wrangling (Pandas & NumPy)',
        description: 'Clean messy real-world datasets, handle missing values, and automate scheduled data extraction scripts.',
        skillsCovered: ['Python', 'Pandas'],
        estimatedWeeks: 3,
        completed: false,
        recommendedResources: [
          { title: 'Kaggle Python Data Analysis Micro-Courses', type: 'Interactive' }
        ]
      },
      {
        id: 'step-5',
        phase: 5,
        title: 'Phase 5: Indian E-Commerce / EV Capstone Project Artifact',
        description: 'Publish an end-to-end GitHub project repository with live dashboard link. Add bullet points with measurable % impact to your ATS resume.',
        skillsCovered: ['SQL', 'Power BI', 'Git'],
        estimatedWeeks: 4,
        completed: false,
        recommendedResources: [
          { title: 'Swiggy / Zomato Unit Economics Capstone', type: 'Project' }
        ]
      },
      {
        id: 'step-6',
        phase: 6,
        title: 'Phase 6: Campus Technical, Managerial & HR Round Preparation',
        description: 'Master the classic "Why IT/Analytics after Mechanical?" question, communicate project trade-offs in English/Hindi, and practice guesstimate and puzzle rounds.',
        skillsCovered: ['Communication', 'Problem Solving'],
        estimatedWeeks: 2,
        completed: false,
        recommendedResources: [
          { title: 'AI Skill Mentor Indian Placement Mock Studio', type: 'Interactive' }
        ]
      }
    ]
  }
];

// Indian Campus Placement Interview Question Banks
export const INTERVIEW_QUESTIONS_BANK: Record<string, { question: string; type: 'Technical' | 'HR' | 'Managerial' | 'Aptitude & Core' | 'Behavioral'; expectedKeyPoints: string[] }[]> = {
  'Data Analyst & Business Insights': [
    {
      question: 'Explain the difference between WHERE and HAVING in SQL with a practical example from an e-commerce order table.',
      type: 'Technical',
      expectedKeyPoints: ['WHERE filters rows before aggregation', 'HAVING filters grouped records after GROUP BY', 'Example with SUM(order_amount) > 10000']
    },
    {
      question: 'You are from a core branch (Mechanical/Civil/Electrical). Why do you want to join an Analytics/Software company instead of core engineering?',
      type: 'HR',
      expectedKeyPoints: ['Highlight strong mathematical and analytical problem-solving foundation', 'Explain how engineering coursework involved data modeling and quantitative reasoning', 'Show passion through self-learned projects, certifications, and GitHub portfolio']
    },
    {
      question: 'Guesstimate: Estimate the daily number of food orders placed on Swiggy/Zomato in Bengaluru.',
      type: 'Aptitude & Core',
      expectedKeyPoints: ['Top-down or bottom-up population breakdown (1.3 crore population)', 'Working professional demographic filter (25-35 age bracket)', 'Meal frequency assumption (lunch vs dinner) and market share split']
    },
    {
      question: 'Describe a situation during your college final year project where team members had conflicting ideas. How did you resolve it and deliver on time?',
      type: 'Managerial',
      expectedKeyPoints: ['Objectively evaluated technical trade-offs with data', 'Divided modular responsibilities based on individual strengths', 'Delivered final project before university submission deadline']
    }
  ],
  'Bioinformatics & Genomic Data Scientist': [
    {
      question: 'How do you perform quality check (QC) on raw sequencing data in an Indian genomics lab, and what tool do you use?',
      type: 'Technical',
      expectedKeyPoints: ['FastQC metrics and Phred quality scores (> Q30)', 'Trimming adapters using Cutadapt / Trimmomatic', 'Evaluating GC bias and sequence duplication']
    },
    {
      question: 'Why do you want to join Biocon or Dr. Reddy\'s over academic PhD research at this stage of your career?',
      type: 'HR',
      expectedKeyPoints: ['Desire to see research translated into real clinical therapeutics for millions of Indian patients', 'Excited by high-throughput enterprise bioinformatics infrastructure', 'Long-term goal of driving Indian biopharma innovation']
    }
  ],
  'Robotics & Industrial Automation Engineer': [
    {
      question: 'Can you explain the difference between a microcontroller (like STM32 / Arduino) and an industrial PLC used on Tata Motors or L&T assembly lines?',
      type: 'Technical',
      expectedKeyPoints: ['PLCs designed for harsh industrial electromagnetic environments, 24V I/O, and safety fail-safes', 'Ladder logic / Structured Text programming vs bare-metal C/C++', 'Deterministic cycle scan times and modular expansion racks']
    },
    {
      question: 'How would you troubleshoot an unexpected emergency stop triggered on an automated EV battery pack welding line?',
      type: 'Aptitude & Core',
      expectedKeyPoints: ['Check safety relay and light curtain interlocks first', 'Inspect PLC diagnostic alarms and error codes on HMI screen', 'Test sensor signals with multimeter before resetting']
    }
  ],
  'Default': [
    {
      question: 'Introduce yourself, your academic college background, and why you are targeting this specific role.',
      type: 'HR',
      expectedKeyPoints: ['Brief academic summary and college name', 'Key practical projects built outside college syllabus', 'Genuine enthusiasm for this industry']
    },
    {
      question: 'Tell me about a challenging technical roadblock you encountered in your projects and how you solved it.',
      type: 'Technical',
      expectedKeyPoints: ['STAR format (Situation, Task, Action, Result)', 'Exact technical steps you took', 'Measurable outcome and learning']
    },
    {
      question: 'Are you comfortable with relocating to Bengaluru, Pune, Hyderabad, or Gurgaon if required by the company?',
      type: 'HR',
      expectedKeyPoints: ['Positive openness to relocation and working in major Indian tech hubs', 'Excitement about working in dynamic collaborative teams']
    }
  ]
};

// Initialize DB
export function initDB() {
  if (DB.users.length === 0) {
    DB.users = [...SEED_USERS];
    DB.careers = [...SEED_CAREERS];
    DB.courses = [...SEED_COURSES];
    DB.projects = [...SEED_PROJECTS];
    DB.roadmaps = [...SEED_ROADMAPS];
  }
}

initDB();
