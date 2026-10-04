/**
 * Database Module for AI Skill Mentor
 * Dedicated to students across engineering, computing, commerce, and science programs.
 * Featuring top hiring companies, modern INR LPA compensation brackets, and placement dynamics.
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

// Seed student personas and Training & Placement (T&P) Cell Admin
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

// Comprehensive Modern High-Growth Careers (Spanning Foundation, Growth, and Premium Tiers)
export const SEED_CAREERS: Career[] = [
  // --- FOUNDATION / ENTRY TIER (₹3.2 LPA - ₹7.0 LPA) ---
  {
    id: 'career-qa-manual-tester',
    title: 'Junior QA & Software Tester',
    domain: 'Software Quality & Testing',
    description: 'Ensure software quality by writing detailed test scenarios, executing regression test suites, and discovering edge-case bugs before product releases.',
    requiredSkills: [
      { name: 'Manual Testing', importance: 'high', category: 'Testing' },
      { name: 'Test Case Writing', importance: 'high', category: 'Documentation' },
      { name: 'Jira / Bug Tracking', importance: 'high', category: 'Tools' },
      { name: 'Postman (API Testing Basics)', importance: 'medium', category: 'API' },
      { name: 'SQL Basics', importance: 'medium', category: 'Databases' },
      { name: 'Attention to Detail', importance: 'high', category: 'Soft Skills' }
    ],
    recommendedDisciplines: ['Any Engineering Branch', 'BCA / B.Sc Computer Science', 'MCA', 'Commerce with IT interest'],
    averageSalaryIndia: '₹3.5 LPA - ₹6.5 LPA (Fresher Friendly)',
    topRecruitersIndia: ['Cognizant', 'Wipro', 'TCS', 'Infosys', 'Capgemini', 'Accenture'],
    growthOutlook: '+18% Steady Industry Demand for Quality Assurance',
    keyResponsibilities: [
      'Author test cases covering functional, boundary value, and negative user scenarios',
      'Log detailed bug reports in Jira with reproduction steps, screenshots, and system logs',
      'Verify REST API endpoints and payload responses using Postman'
    ],
    sampleJobTitles: ['QA Trainee', 'Software Test Engineer', 'Manual Tester', 'Associate QA Analyst']
  },
  {
    id: 'career-graduate-engineer-trainee',
    title: 'Graduate Engineer Trainee (GET - Core & Plant)',
    domain: 'Core Manufacturing, Operations & Plant Tech',
    description: 'Lead shopfloor machinery operations, oversee component assembly lines, inspect component tolerances, and implement lean manufacturing practices.',
    requiredSkills: [
      { name: 'Engineering Drawing & GD&T', importance: 'high', category: 'Core Mechanical' },
      { name: 'Quality Control (7 QC Tools)', importance: 'high', category: 'Quality' },
      { name: 'AutoCAD Basics', importance: 'medium', category: 'CAD' },
      { name: 'Production Planning', importance: 'medium', category: 'Operations' },
      { name: 'MS Excel for Operations', importance: 'medium', category: 'Analytics' }
    ],
    recommendedDisciplines: ['Mechanical Engineering', 'Production & Industrial', 'Electrical Engineering', 'Automobile Engineering'],
    averageSalaryIndia: '₹3.6 LPA - ₹6.8 LPA (Core Campus Standard)',
    topRecruitersIndia: ['Tata Motors', 'L&T', 'Mahindra', 'Hero MotoCorp', 'Ashok Leyland'],
    growthOutlook: '+19% Driven by Industrial Expansion and Heavy Manufacturing',
    keyResponsibilities: [
      'Monitor production line efficiency, cycle times, and machine downtime metrics',
      'Perform dimensional tolerance checks using vernier calipers, micrometers, and CMM machines',
      'Implement 5S, Kaizen, and safety compliance protocols across the factory floor'
    ],
    sampleJobTitles: ['Graduate Engineer Trainee', 'Assistant Production Engineer', 'Quality Control Inspector', 'Plant Maintenance Trainee']
  },
  {
    id: 'career-cad-drafter',
    title: 'Junior CAD Modeler & Drafting Drafter',
    domain: 'Mechanical & Structural CAD Design',
    description: 'Produce high-precision 2D engineering drawings, mechanical part models, and Bills of Materials (BOM) for manufacturing fabrication.',
    requiredSkills: [
      { name: 'AutoCAD', importance: 'high', category: 'CAD' },
      { name: 'SolidWorks Basics', importance: 'high', category: '3D CAD' },
      { name: 'GD&T Tolerancing', importance: 'medium', category: 'Standards' },
      { name: 'Bill of Materials (BOM)', importance: 'medium', category: 'Documentation' },
      { name: 'Orthographic Projections', importance: 'high', category: 'Drafting' }
    ],
    recommendedDisciplines: ['Mechanical Engineering', 'Civil Engineering', 'Automobile', 'Diploma in Engineering'],
    averageSalaryIndia: '₹3.4 LPA - ₹5.8 LPA',
    topRecruitersIndia: ['L&T Tech', 'Tata Tech', 'Cyient', 'Quest Global'],
    growthOutlook: '+16% High Demand in Fabrication and Engineering Services',
    keyResponsibilities: [
      'Draft isometric and orthographic assembly drawings in AutoCAD and SolidWorks',
      'Calculate surface finishes, welding callouts, and geometric tolerances for sheet metal parts',
      'Maintain version-controlled CAD archives and export STEP/DWG files for CNC machinists'
    ],
    sampleJobTitles: ['CAD Drafter', 'Junior Design Engineer', 'Mechanical Drafter', 'Detailing Engineer']
  },
  {
    id: 'career-junior-web-dev',
    title: 'Junior Frontend Web Developer (HTML/CSS/JS)',
    domain: 'Frontend & Web Development',
    description: 'Build fast, responsive web pages, implement UI interactive components, and convert design wireframes into clean, accessible code.',
    requiredSkills: [
      { name: 'HTML5 & CSS3', importance: 'high', category: 'Frontend' },
      { name: 'JavaScript Basics', importance: 'high', category: 'Programming' },
      { name: 'Tailwind CSS / Bootstrap', importance: 'medium', category: 'Styling' },
      { name: 'Git & GitHub', importance: 'high', category: 'Version Control' },
      { name: 'Responsive Web Design', importance: 'high', category: 'Layout' }
    ],
    recommendedDisciplines: ['Computer Science', 'BCA / MCA', 'Information Technology', 'Any Engineering Major'],
    averageSalaryIndia: '₹4.0 LPA - ₹7.0 LPA',
    topRecruitersIndia: ['Cognizant', 'HCLTech', 'Zoho', 'Wipro', 'Tech Mahindra'],
    growthOutlook: '+22% Strong Entry-Level Web Demand',
    keyResponsibilities: [
      'Translate Figma mockups into responsive, cross-browser compatible HTML/CSS/JS code',
      'Optimize web page asset load speeds, image compression, and mobile navigation layouts',
      'Fix styling glitches and coordinate with backend engineers to integrate REST API data'
    ],
    sampleJobTitles: ['Junior Web Developer', 'Associate Frontend Engineer', 'UI Developer', 'Web Integrator']
  },
  {
    id: 'career-tech-support-systems',
    title: 'IT Systems & Technical Support Specialist',
    domain: 'IT Infrastructure & Support',
    description: 'Diagnose network connectivity, resolve hardware and software workstation tickets, configure cloud emails, and maintain enterprise IT assets.',
    requiredSkills: [
      { name: 'Windows & Linux Admin Basics', importance: 'high', category: 'OS' },
      { name: 'Computer Networking (DNS, DHCP, IP)', importance: 'high', category: 'Networking' },
      { name: 'Hardware Troubleshooting', importance: 'high', category: 'Hardware' },
      { name: 'ServiceNow / Helpdesk Ticketing', importance: 'medium', category: 'Tools' },
      { name: 'Customer Communication', importance: 'high', category: 'Soft Skills' }
    ],
    recommendedDisciplines: ['Computer Science', 'BCA', 'Information Technology', 'Electronics & Telecom', 'Any Graduate'],
    averageSalaryIndia: '₹3.5 LPA - ₹6.2 LPA',
    topRecruitersIndia: ['Dell', 'Wipro', 'HCLTech', 'Cognizant', 'Infosys'],
    growthOutlook: '+15% Stable Year-on-Year Demand in IT Companies',
    keyResponsibilities: [
      'Troubleshoot hardware, OS, VPN, and peripheral issues for enterprise employees',
      'Provision laptop accounts, assign Active Directory group policies, and manage software licenses',
      'Configure office network routers, Wi-Fi access points, and network printers'
    ],
    sampleJobTitles: ['Technical Support Engineer', 'IT Helpdesk Specialist', 'Desktop Support Associate', 'Systems Support Trainee']
  },
  {
    id: 'career-operations-data-entry',
    title: 'Operations & Business Data Associate',
    domain: 'Business Operations & Reporting',
    description: 'Organize transactional data, build automated spreadsheet formulas, reconcile vendor billing records, and maintain accurate enterprise databases.',
    requiredSkills: [
      { name: 'MS Excel (VLOOKUP, Pivot Tables)', importance: 'high', category: 'Spreadsheets' },
      { name: 'Data Cleansing & Auditing', importance: 'high', category: 'Data' },
      { name: 'Google Sheets', importance: 'medium', category: 'Tools' },
      { name: 'Typing Speed & Accuracy', importance: 'high', category: 'Productivity' },
      { name: 'Basic SQL Knowledge', importance: 'medium', category: 'Databases' }
    ],
    recommendedDisciplines: ['Commerce (B.Com)', 'BBA', 'B.Sc', 'Any Graduate'],
    averageSalaryIndia: '₹3.2 LPA - ₹5.5 LPA',
    topRecruitersIndia: ['Genpact', 'WNS', 'Accenture Ops', 'TCS BPS'],
    growthOutlook: '+14% Steady Operational Need in Every Industry',
    keyResponsibilities: [
      'Consolidate multi-departmental sales and expense spreadsheets into clean master reports',
      'Perform data validation checks to prevent duplicate entries and formatting errors',
      'Generate weekly operational KPI summaries for management review'
    ],
    sampleJobTitles: ['Operations Executive', 'MIS Executive', 'Data Operations Associate', 'Reporting Analyst']
  },
  // --- CORE & GROWTH TIER (₹7.0 LPA - ₹15.0 LPA) ---
  {
    id: 'career-data-analyst',
    title: 'Data Analyst & Business Intelligence Specialist',
    domain: 'Data Analytics & Business Intelligence',
    description: 'Transform complex enterprise data into clear actionable visual stories, executive dashboards, and statistical insights that drive smart business decisions.',
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
    averageSalaryIndia: '₹8 LPA - ₹18 LPA (Senior: ₹26+ LPA)',
    topRecruitersIndia: ['Deloitte', 'McKinsey & Co', 'Amazon', 'Spotify', 'Uber', 'Salesforce'],
    growthOutlook: '+24% Steady Growth Across All Modern Industries',
    keyResponsibilities: [
      'Write optimized SQL queries on cloud data warehouses like Snowflake, BigQuery, and PostgreSQL',
      'Build executive dashboards in Power BI tracking GMV, user acquisition, and churn rates',
      'Conduct statistical cohort analysis to improve product margins and supply chain throughput'
    ],
    sampleJobTitles: ['Data Analyst I', 'Business Analyst', 'Decision Analytics Associate', 'Growth Data Analyst']
  },
  {
    id: 'career-automation-qa-engineer',
    title: 'QA Automation Engineer (Selenium & Cypress)',
    domain: 'Automated Quality Engineering',
    description: 'Write robust automation test suites, configure headless browser tests in CI/CD, and eliminate manual regression testing through automated frameworks.',
    requiredSkills: [
      { name: 'Java / Python / JavaScript', importance: 'high', category: 'Programming' },
      { name: 'Selenium WebDriver', importance: 'high', category: 'Automation' },
      { name: 'Cypress / Playwright', importance: 'high', category: 'Modern Testing' },
      { name: 'TestNG / PyTest', importance: 'medium', category: 'Test Runners' },
      { name: 'CI/CD Pipeline Integration', importance: 'medium', category: 'DevOps' }
    ],
    recommendedDisciplines: ['Computer Science', 'Information Technology', 'Electronics', 'Any Engineering Branch'],
    averageSalaryIndia: '₹7.5 LPA - ₹15.0 LPA (Senior: ₹22+ LPA)',
    topRecruitersIndia: ['Epam', 'Capgemini', 'Sapient', 'Oracle', 'Thoughtworks'],
    growthOutlook: '+26% Heavy Industry Transition to Automated Testing',
    keyResponsibilities: [
      'Design Page Object Model (POM) test architecture using Playwright or Selenium',
      'Integrate test suites into GitHub Actions so every PR runs automated smoke tests',
      'Identify flaky tests and improve test execution speed through parallelization'
    ],
    sampleJobTitles: ['Automation QA Engineer', 'Software Development Engineer in Test (SDET-1)', 'Test Automation Specialist']
  },
  {
    id: 'career-uiux-designer',
    title: 'UI/UX Product Designer',
    domain: 'Product Design & User Experience',
    description: 'Craft intuitive, accessible, and visually stunning digital products that delight millions of users across mobile and web interfaces.',
    requiredSkills: [
      { name: 'Figma', importance: 'high', category: 'Design Tools' },
      { name: 'Design Systems & Tokens', importance: 'high', category: 'Architecture' },
      { name: 'User Research & Personas', importance: 'high', category: 'Discovery' },
      { name: 'Interaction Design & Prototyping', importance: 'high', category: 'Prototyping' },
      { name: 'Information Architecture', importance: 'medium', category: 'UX' },
      { name: 'HTML & CSS Basics', importance: 'medium', category: 'Engineering Empathy' }
    ],
    recommendedDisciplines: ['Design (B.Des)', 'Computer Science', 'HCI / Architecture', 'Any Branch with Design Passion'],
    averageSalaryIndia: '₹9 LPA - ₹22 LPA (Senior: ₹30+ LPA)',
    topRecruitersIndia: ['Apple', 'Airbnb', 'Figma', 'Spotify', 'Google', 'Notion'],
    growthOutlook: '+23% Steady Demand for High-Taste Designers',
    keyResponsibilities: [
      'Design modular component libraries and interactive design systems in Figma',
      'Conduct usability interviews and translate user feedback into high-fidelity wireframes',
      'Collaborate closely with frontend developers to ensure pixel-perfect design implementation'
    ],
    sampleJobTitles: ['Product Designer I', 'UI/UX Designer', 'Interaction Designer', 'Visual Experience Designer']
  },
  {
    id: 'career-bioinformatics',
    title: 'Bioinformatics & Computational Health Scientist',
    domain: 'Biotechnology, Healthcare & Genomics',
    description: 'Harness high-performance computing, Python, and genomic datasets to decode biological systems and accelerate drug discovery.',
    requiredSkills: [
      { name: 'Bioinformatics', importance: 'high', category: 'Domain' },
      { name: 'Python', importance: 'high', category: 'Data Analysis' },
      { name: 'R Programming', importance: 'high', category: 'Biostatistics' },
      { name: 'Genomics', importance: 'high', category: 'Molecular Biology' },
      { name: 'Statistics', importance: 'medium', category: 'Mathematics' },
      { name: 'Git', importance: 'medium', category: 'Version Control' }
    ],
    recommendedDisciplines: ['Biotechnology', 'Biomedical Engineering', 'Life Sciences', 'Bioinformatics', 'Computer Science'],
    averageSalaryIndia: '₹9 LPA - ₹22 LPA (Senior: ₹30+ LPA)',
    topRecruitersIndia: ['Illumina', 'Genentech', 'Pfizer', 'Novartis', 'AstraZeneca', 'Broad Institute'],
    growthOutlook: '+26% Strong Expansion in Modern Biotech & Personalized Medicine',
    keyResponsibilities: [
      'Execute RNA-seq differential gene expression pipelines using DESeq2 and Python',
      'Perform variant calling (GATK) and genomic structural annotation on NGS datasets',
      'Collaborate with molecular wet-lab teams to translate computational markers into clinical assays'
    ],
    sampleJobTitles: ['Bioinformatics Associate', 'Genomic Data Analyst', 'Computational Biology Specialist']
  },
  {
    id: 'career-civil-bim',
    title: 'Smart Infrastructure & BIM Structural Coordinator',
    domain: 'Civil Infrastructure, Smart Cities & Construction Tech',
    description: 'Leads digital 3D Building Information Modeling (BIM), clash detection, and structural analysis for modern expressway, metro, and airport projects.',
    requiredSkills: [
      { name: 'Revit', importance: 'high', category: 'BIM' },
      { name: 'AutoCAD', importance: 'high', category: 'Drafting' },
      { name: 'STAAD Pro', importance: 'high', category: 'Structural Engineering' },
      { name: 'Structural Analysis', importance: 'high', category: 'Core Civil' },
      { name: 'Construction Management', importance: 'medium', category: 'Management' },
      { name: 'GIS', importance: 'medium', category: 'Geospatial' }
    ],
    recommendedDisciplines: ['Civil Engineering', 'Structural Engineering', 'Architecture (B.Arch)', 'Construction Technology'],
    averageSalaryIndia: '₹8 LPA - ₹20 LPA (Senior: ₹28+ LPA)',
    topRecruitersIndia: ['AECOM', 'Arup', 'Bechtel', 'Jacobs Engineering', 'WSP', 'Turner Construction'],
    growthOutlook: '+22% Significant Demand Driven by Global Infrastructure Expansion',
    keyResponsibilities: [
      'Build and coordinate 3D parametric BIM structural models in Autodesk Revit',
      'Execute multi-story structural load calculations in STAAD.Pro conforming to international codes',
      'Run clash detection between architectural, structural, and MEP piping systems'
    ],
    sampleJobTitles: ['BIM Engineer', 'Structural Design Engineer', 'Digital Project Coordinator']
  },
  // --- HIGH & PREMIUM TIER (₹15.0 LPA - ₹45+ LPA) ---
  {
    id: 'career-fullstack-dev',
    title: 'Full Stack Software Engineer',
    domain: 'Software Engineering & Cloud',
    description: 'Build modern responsive web applications and high-performance backend microservices that power global platforms and seamless digital experiences.',
    requiredSkills: [
      { name: 'JavaScript', importance: 'high', category: 'Programming' },
      { name: 'React', importance: 'high', category: 'Frontend' },
      { name: 'Node.js', importance: 'high', category: 'Backend' },
      { name: 'TypeScript', importance: 'high', category: 'Frontend' },
      { name: 'SQL', importance: 'high', category: 'Databases' },
      { name: 'Git', importance: 'high', category: 'Tooling' },
      { name: 'REST APIs', importance: 'medium', category: 'Backend' },
      { name: 'Docker', importance: 'medium', category: 'DevOps' }
    ],
    recommendedDisciplines: ['Computer Science', 'Information Technology', 'Electronics', 'Mathematics', 'Any Engineering Branch'],
    averageSalaryIndia: '₹10 LPA - ₹24 LPA (Senior: ₹35+ LPA)',
    topRecruitersIndia: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Stripe', 'Atlassian'],
    growthOutlook: '+26% Strong Annual Growth (High Global Demand)',
    keyResponsibilities: [
      'Architect fast, intuitive user experiences using React, TypeScript, and modern component systems',
      'Design reliable backend APIs, GraphQL services, and scalable serverless or microservice architectures',
      'Optimize database queries, configure distributed caching with Redis, and monitor system performance'
    ],
    sampleJobTitles: ['Software Development Engineer I', 'Associate Full Stack Developer', 'Frontend Engineer', 'Backend Engineer']
  },
  {
    id: 'career-ai-ml-engineer',
    title: 'AI & Machine Learning Engineer',
    domain: 'Artificial Intelligence & Machine Learning',
    description: 'Design and deploy intelligent neural networks, large language models (LLMs), and automated inference pipelines that solve complex real-world challenges.',
    requiredSkills: [
      { name: 'Python', importance: 'high', category: 'Programming' },
      { name: 'PyTorch', importance: 'high', category: 'Deep Learning' },
      { name: 'Machine Learning', importance: 'high', category: 'Algorithms' },
      { name: 'TensorFlow', importance: 'medium', category: 'Deep Learning' },
      { name: 'Data Structures & Algorithms', importance: 'high', category: 'Core CS' },
      { name: 'Linear Algebra & Statistics', importance: 'high', category: 'Mathematics' },
      { name: 'LLM Prompt Engineering & RAG', importance: 'high', category: 'Generative AI' },
      { name: 'Docker', importance: 'medium', category: 'Deployment' }
    ],
    recommendedDisciplines: ['Computer Science', 'Data Science', 'Mathematics', 'Electrical Engineering', 'Mechanical Engineering'],
    averageSalaryIndia: '₹15 LPA - ₹35 LPA (Senior: ₹48+ LPA)',
    topRecruitersIndia: ['OpenAI', 'Google DeepMind', 'NVIDIA', 'Anthropic', 'Microsoft', 'Amazon'],
    growthOutlook: '+38% Explosive Industry Growth (Top Tech Priority)',
    keyResponsibilities: [
      'Fine-tune state-of-the-art transformer models and build Retrieval-Augmented Generation (RAG) vector pipelines',
      'Train deep neural networks for computer vision, natural language understanding, or predictive modeling',
      'Optimize AI model latency using quantization, TensorRT, and efficient GPU batching'
    ],
    sampleJobTitles: ['Machine Learning Engineer', 'AI Research Associate', 'Generative AI Developer', 'NLP Specialist']
  },
  {
    id: 'career-devops-cloud',
    title: 'Cloud Solutions & DevOps Architect',
    domain: 'Cloud Architecture & DevOps',
    description: 'Design bulletproof cloud infrastructure, automated CI/CD deployment pipelines, and scalable Kubernetes clusters that keep global apps running 24/7.',
    requiredSkills: [
      { name: 'Linux', importance: 'high', category: 'Operating Systems' },
      { name: 'Docker', importance: 'high', category: 'Containers' },
      { name: 'Kubernetes', importance: 'high', category: 'Orchestration' },
      { name: 'AWS / Cloud Platforms', importance: 'high', category: 'Cloud Infrastructure' },
      { name: 'CI/CD Pipelines (GitHub Actions)', importance: 'high', category: 'Automation' },
      { name: 'Terraform (IaC)', importance: 'medium', category: 'Infrastructure as Code' },
      { name: 'Python / Bash Scripting', importance: 'medium', category: 'Automation' }
    ],
    recommendedDisciplines: ['Computer Science', 'Information Technology', 'Electronics & Communication', 'Electrical'],
    averageSalaryIndia: '₹14 LPA - ₹32 LPA (Senior: ₹45+ LPA)',
    topRecruitersIndia: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud', 'Netflix', 'HashiCorp'],
    growthOutlook: '+29% High Growth (Accelerating Cloud Adoption)',
    keyResponsibilities: [
      'Automate zero-downtime application deployments with GitHub Actions and Docker',
      'Provision scalable multi-region cloud resources using Terraform Infrastructure as Code',
      'Set up observability dashboards using Prometheus, Grafana, and Datadog for 99.99% uptime'
    ],
    sampleJobTitles: ['Cloud Engineer', 'DevOps Specialist', 'Site Reliability Engineer (SRE)', 'Infrastructure Architect']
  },
  {
    id: 'career-product-manager',
    title: 'Associate Product Manager (APM)',
    domain: 'Product Strategy & Technology',
    description: 'Lead the vision, user research, and strategic roadmap of consumer and enterprise products, collaborating closely with design and engineering teams.',
    requiredSkills: [
      { name: 'Product Strategy & PRDs', importance: 'high', category: 'Strategy' },
      { name: 'User Research & Empathy', importance: 'high', category: 'Discovery' },
      { name: 'Data & Metric Analysis', importance: 'high', category: 'Analytics' },
      { name: 'Figma & Wireframing', importance: 'medium', category: 'Design' },
      { name: 'Agile & Scrum Delivery', importance: 'medium', category: 'Execution' },
      { name: 'Communication', importance: 'high', category: 'Leadership' }
    ],
    recommendedDisciplines: ['Any Engineering Branch', 'Design & HCI', 'Business Administration', 'Economics', 'Computer Science'],
    averageSalaryIndia: '₹14 LPA - ₹30 LPA (Senior: ₹42+ LPA)',
    topRecruitersIndia: ['Google APM Program', 'Uber', 'Meta', 'Airbnb', 'Stripe', 'Atlassian'],
    growthOutlook: '+27% Very Prestigious Fast-Track Career Path',
    keyResponsibilities: [
      'Author Product Requirement Documents (PRDs) with user stories and acceptance criteria',
      'Analyze funnel drop-offs and retention cohorts using SQL and analytics dashboards',
      'Collaborate with engineering squads and design teams in fast-paced two-week Agile sprints'
    ],
    sampleJobTitles: ['Associate Product Manager (APM)', 'Product Analyst', 'Technical Product Specialist', 'Growth Product Manager']
  },
  {
    id: 'career-cybersecurity',
    title: 'Cybersecurity & Ethical Hacking Specialist',
    domain: 'Information Security & Trust',
    description: 'Safeguard vital networks, financial transactions, and proprietary data against cyber threats, vulnerabilities, and malicious attacks.',
    requiredSkills: [
      { name: 'Network Security (TCP/IP, Firewalls)', importance: 'high', category: 'Networking' },
      { name: 'Vulnerability Assessment & PenTesting', importance: 'high', category: 'Offensive Security' },
      { name: 'Linux Administration', importance: 'high', category: 'Systems' },
      { name: 'Python / Bash Scripting', importance: 'medium', category: 'Automation' },
      { name: 'SIEM Tools (Splunk, Elastic)', importance: 'medium', category: 'Monitoring' },
      { name: 'Cryptography Basics', importance: 'medium', category: 'Security' }
    ],
    recommendedDisciplines: ['Computer Science', 'Information Security', 'Electronics & Communication', 'Information Technology'],
    averageSalaryIndia: '₹12 LPA - ₹28 LPA (Senior: ₹38+ LPA)',
    topRecruitersIndia: ['Palo Alto Networks', 'CrowdStrike', 'Cisco', 'Cloudflare', 'Microsoft Security'],
    growthOutlook: '+33% Critical Shortage of Qualified Security Talent',
    keyResponsibilities: [
      'Conduct automated vulnerability scans and manual penetration testing on web applications',
      'Monitor Security Information and Event Management (SIEM) consoles for suspicious anomaly spikes',
      'Establish enterprise zero-trust access policies, SSL/TLS certificates, and identity guardrails'
    ],
    sampleJobTitles: ['Cybersecurity Analyst', 'Security Operations Center (SOC) Specialist', 'Junior Penetration Tester', 'Cloud Security Associate']
  },
  {
    id: 'career-robotics-automation',
    title: 'Robotics & Autonomous Systems Engineer',
    domain: 'Robotics, Mechatronics & Autonomous Hardware',
    description: 'Engineer intelligent physical machines, autonomous mobile robots (AMRs), industrial robotic arms, and self-navigating vehicles.',
    requiredSkills: [
      { name: 'C++', importance: 'high', category: 'Low-Level Programming' },
      { name: 'Python', importance: 'high', category: 'Programming' },
      { name: 'Robot Operating System (ROS / ROS2)', importance: 'high', category: 'Robotics OS' },
      { name: 'Computer Vision (OpenCV)', importance: 'medium', category: 'Perception' },
      { name: 'Kinematics & Control Systems', importance: 'high', category: 'Dynamics' },
      { name: 'SolidWorks / CAD', importance: 'medium', category: 'Mechanical Design' }
    ],
    recommendedDisciplines: ['Mechanical Engineering', 'Mechatronics', 'Electrical Engineering', 'Computer Science'],
    averageSalaryIndia: '₹12 LPA - ₹28 LPA (Senior: ₹40+ LPA)',
    topRecruitersIndia: ['Boston Dynamics', 'Tesla Automation', 'ABB Robotics', 'KUKA', 'Amazon Robotics'],
    growthOutlook: '+31% Huge Growth in Robotics & Warehouse Automation',
    keyResponsibilities: [
      'Program trajectory planning, inverse kinematics, and obstacle avoidance algorithms in ROS2 and C++',
      'Integrate LiDAR, stereo cameras, and IMU sensor fusion using Kalman filters',
      'Test robot prototypes in Gazebo physics simulators before physical hardware deployment'
    ],
    sampleJobTitles: ['Robotics Engineer', 'Autonomous Navigation Specialist', 'Mechatronics System Engineer', 'Controls Engineer']
  },
  {
    id: 'career-fintech-analyst',
    title: 'Financial Modeling & FinTech Specialist',
    domain: 'Finance, Banking & Quantitative Tech',
    description: 'Applies dynamic financial modeling, accounting valuation, and data querying to optimize retail trading, wealth tech, and risk underwriting in the booming FinTech sector.',
    requiredSkills: [
      { name: 'Financial Modeling', importance: 'high', category: 'Finance' },
      { name: 'Excel', importance: 'high', category: 'Spreadsheets' },
      { name: 'Accounting', importance: 'high', category: 'Financial Statements' },
      { name: 'SQL', importance: 'high', category: 'Data Analysis' },
      { name: 'Python', importance: 'medium', category: 'Automation' },
      { name: 'Risk Management', importance: 'medium', category: 'Compliance' }
    ],
    recommendedDisciplines: ['Commerce (B.Com)', 'Economics', 'BBA / Finance', 'Mathematics', 'MBA Finance'],
    averageSalaryIndia: '₹12 LPA - ₹30 LPA (Senior: ₹45+ LPA)',
    topRecruitersIndia: ['Goldman Sachs', 'J.P. Morgan', 'Morgan Stanley', 'BlackRock', 'Stripe', 'Bloomberg'],
    growthOutlook: '+25% Rapid Growth in Digital Banking & Investment Tech',
    keyResponsibilities: [
      'Build dynamic Discounted Cash Flow (DCF) and three-statement financial forecast models',
      'Audit trading volumes, merchant margins, and loan default risks using SQL and Excel',
      'Create monthly investor presentation memorandums and regulatory compliance summaries'
    ],
    sampleJobTitles: ['Equity Research Associate', 'FinTech Risk Analyst', 'Financial Planning & Analysis (FP&A) Analyst']
  },
  {
    id: 'career-embedded-vlsi',
    title: 'Embedded Systems & Semiconductor Firmware Engineer',
    domain: 'Semiconductors, Hardware & IoT',
    description: 'Write ultra-efficient low-level firmware for microcontrollers, microprocessors, and smart IoT connected devices.',
    requiredSkills: [
      { name: 'Embedded Systems', importance: 'high', category: 'Firmware' },
      { name: 'C++', importance: 'high', category: 'Low-Level Code' },
      { name: 'Microcontrollers', importance: 'high', category: 'Hardware' },
      { name: 'PCB Design', importance: 'medium', category: 'Electronics' },
      { name: 'IoT', importance: 'medium', category: 'Connectivity' },
      { name: 'Verilog', importance: 'medium', category: 'VLSI' }
    ],
    recommendedDisciplines: ['Electronics & Communication (ECE)', 'Electrical Engineering (EEE)', 'Instrumentation'],
    averageSalaryIndia: '₹12 LPA - ₹28 LPA (Senior: ₹38+ LPA)',
    topRecruitersIndia: ['Qualcomm', 'Texas Instruments', 'Intel', 'Apple Hardware', 'NXP Semiconductors'],
    growthOutlook: '+28% Booming Global Semiconductor Demand',
    keyResponsibilities: [
      'Write low-level device drivers in Embedded C/C++ on ARM Cortex-M microcontrollers',
      'Debug bus protocols (UART, SPI, I2C, CAN) using digital storage oscilloscopes and logic analyzers',
      'Design multi-layer schematics and PCB layouts in Altium or KiCad'
    ],
    sampleJobTitles: ['Firmware Engineer', 'Embedded Software Engineer I', 'Silicon Validation Engineer']
  },
  {
    id: 'career-quant-trader',
    title: 'Quantitative Analyst & Algorithmic Trading Associate',
    domain: 'Quantitative Finance & Market Making',
    description: 'Design statistical arbitrage models, high-frequency execution pipelines, and mathematical pricing algorithms on global stock and derivative exchanges.',
    requiredSkills: [
      { name: 'Python / C++', importance: 'high', category: 'High-Performance Code' },
      { name: 'Probability & Stochastic Calculus', importance: 'high', category: 'Mathematics' },
      { name: 'Statistical Arbitrage & Backtesting', importance: 'high', category: 'Quant' },
      { name: 'Data Structures & Algorithms', importance: 'high', category: 'Core CS' },
      { name: 'Financial Derivatives & Options Pricing', importance: 'medium', category: 'Finance' }
    ],
    recommendedDisciplines: ['Computer Science', 'Mathematics & Computing', 'Electrical Engineering', 'Physics', 'Quantitative Economics'],
    averageSalaryIndia: '₹18 LPA - ₹45 LPA (Senior: ₹65+ LPA)',
    topRecruitersIndia: ['Jane Street', 'Citadel Securities', 'Tower Research Capital', 'Optiver', 'WorldQuant'],
    growthOutlook: '+30% Immense Demand for Mathematical and Computational Talent',
    keyResponsibilities: [
      'Backtest statistical trading alphas across historical tick and order-book data',
      'Optimize sub-millisecond execution algorithms in modern C++',
      'Monitor portfolio value-at-risk (VaR) and dynamic Greeks exposure under volatile market swings'
    ],
    sampleJobTitles: ['Quantitative Trader', 'Quantitative Researcher', 'Algorithmic Execution Developer']
  },
  {
    id: 'career-biotech-lab-qc',
    title: 'Junior QC Lab & Clinical Quality Associate',
    domain: 'Pharmaceutical QC, Clinical Trials & Quality Assurance',
    description: 'Perform standardized pharmaceutical quality control testing, sample assays, and document regulatory compliance under Good Laboratory Practices (GLP).',
    requiredSkills: [
      { name: 'Good Laboratory Practices (GLP) & SOPs', importance: 'high', category: 'Compliance' },
      { name: 'HPLC & Spectrophotometry', importance: 'high', category: 'Instrumentation' },
      { name: 'Microbiology & Sample Preparation', importance: 'medium', category: 'Lab' },
      { name: 'Documentation & Regulatory Audit Prep', importance: 'high', category: 'Documentation' },
      { name: 'Quality Control Standards (ISO 9001 / cGMP)', importance: 'medium', category: 'Quality' }
    ],
    recommendedDisciplines: ['Biotechnology', 'Biochemistry', 'Microbiology', 'B.Pharm', 'Life Sciences', 'Chemistry'],
    averageSalaryIndia: '₹3.0 LPA - ₹5.4 LPA (Entry Tier)',
    topRecruitersIndia: ['Biocon', 'Dr. Reddy\'s', 'Sun Pharma', 'Cipla', 'Serum Institute'],
    growthOutlook: '+18% Steady Industry Growth',
    keyResponsibilities: [
      'Conduct routine analytical testing of active pharmaceutical ingredients using HPLC and spectrophotometry',
      'Prepare certificate of analysis (COA) documents ensuring strict compliance with cGMP guidelines',
      'Maintain lab calibration logs and participate in internal quality audits'
    ],
    sampleJobTitles: ['Quality Control Chemist', 'QC Associate', 'Clinical Research Coordinator', 'Lab Analyst']
  },
  {
    id: 'career-computational-genomics-lead',
    title: 'Senior Computational Genomics & Biopharma Scientist',
    domain: 'Genomics, Next-Gen Sequencing & Precision Medicine',
    description: 'Lead computational analysis of high-throughput sequencing datasets, biomarker discovery, and clinical variant calling for personalized precision therapeutics.',
    requiredSkills: [
      { name: 'Next-Gen Sequencing (NGS) Pipelines (WGS / RNA-Seq)', importance: 'high', category: 'Genomics' },
      { name: 'Bioinformatics in Python & R (Bioconductor / DESeq2)', importance: 'high', category: 'Analysis' },
      { name: 'Variant Calling & Annotation (GATK, VEP, Annovar)', importance: 'high', category: 'Genomics' },
      { name: 'Cloud Genomics (AWS BioBuilds / Nextflow / Snakemake)', importance: 'high', category: 'Pipelines' },
      { name: 'Population Genetics & Statistical Modeling', importance: 'medium', category: 'Statistics' }
    ],
    recommendedDisciplines: ['Biotechnology', 'Bioinformatics', 'Computational Biology', 'Biomedical Engineering', 'Computer Science with Biotech Focus'],
    averageSalaryIndia: '₹16.0 LPA - ₹36.0 LPA (High Premium)',
    topRecruitersIndia: ['Strand Life Sciences', 'MedGenome', 'AstraZeneca', 'Biocon', 'Novartis'],
    growthOutlook: '+28% High Demand Precision Medicine',
    keyResponsibilities: [
      'Architect scalable Nextflow pipelines to process terabytes of Whole Exome and RNA-seq sequencing data',
      'Perform statistical differential gene expression analysis and clinical pathway enrichment modeling',
      'Collaborate with molecular oncologists to annotate rare somatic variants and pinpoint therapeutic drug targets'
    ],
    sampleJobTitles: ['Senior Bioinformatician', 'Genomic Data Scientist', 'Precision Medicine Lead', 'NGS Pipeline Architect']
  },
  {
    id: 'career-ev-powertrain-architect',
    title: 'Automotive EV Systems & Thermal Powertrain Architect',
    domain: 'Electric Vehicles, Battery Packs & Thermal Management',
    description: 'Design next-generation EV battery packs, liquid cooling systems, motor drive integration, and vehicle dynamics for clean electric mobility.',
    requiredSkills: [
      { name: 'Lithium-Ion Battery Pack Design & BMS Integration', importance: 'high', category: 'Battery' },
      { name: 'CFD & Thermal Management (Ansys Fluent / Star-CCM+)', importance: 'high', category: 'Simulation' },
      { name: 'Automotive CAD (CATIA V5 / Siemens NX)', importance: 'high', category: 'Design' },
      { name: 'Powertrain Modeling & MATLAB / Simulink', importance: 'high', category: 'Modeling' },
      { name: 'Automotive Standards (ISO 26262, AIS-038 / AIS-156)', importance: 'medium', category: 'Standards' }
    ],
    recommendedDisciplines: ['Mechanical Engineering', 'Automobile Engineering', 'Mechatronics', 'Electrical Engineering'],
    averageSalaryIndia: '₹16.0 LPA - ₹38.0 LPA (High Premium)',
    topRecruitersIndia: ['Tata Motors Electric', 'Mahindra Electric', 'Ola Electric', 'Ather Energy', 'Bosch'],
    growthOutlook: '+34% Booming EV Revolution',
    keyResponsibilities: [
      'Design liquid-cooled battery enclosure structures conforming to AIS-156 crash and thermal runaway safety standards',
      'Conduct 3D transient computational fluid dynamics (CFD) simulations to optimize cell-to-cell thermal uniformity',
      'Develop Simulink vehicle drive cycle simulations to optimize regenerative braking and energy efficiency'
    ],
    sampleJobTitles: ['EV Powertrain Engineer', 'Battery Systems Architect', 'Thermal Systems Lead', 'Vehicle Dynamics Specialist']
  },
  {
    id: 'career-vlsi-silicon-specialist',
    title: 'VLSI Silicon Design & Microarchitecture Specialist',
    domain: 'Semiconductor Chips, ASIC Design & FPGA Synthesis',
    description: 'Design cutting-edge ASIC chips, write Verilog/SystemVerilog RTL code, verify timing constraints, and synthesize silicon architectures for modern computing.',
    requiredSkills: [
      { name: 'SystemVerilog & Verilog RTL Design', importance: 'high', category: 'Hardware' },
      { name: 'UVM (Universal Verification Methodology)', importance: 'high', category: 'Verification' },
      { name: 'Static Timing Analysis (STA) & Synthesis', importance: 'high', category: 'Timing' },
      { name: 'Digital Electronics & Computer Architecture (RISC-V)', importance: 'high', category: 'Architecture' },
      { name: 'EDA Tooling (Synopsys / Cadence / Vivado)', importance: 'medium', category: 'Tools' }
    ],
    recommendedDisciplines: ['Electronics & Communication (ECE)', 'Electrical Engineering (EEE)', 'Microelectronics', 'Computer Engineering'],
    averageSalaryIndia: '₹18.0 LPA - ₹45.0 LPA (High Premium)',
    topRecruitersIndia: ['Qualcomm', 'Intel', 'Texas Instruments', 'NVIDIA', 'AMD'],
    growthOutlook: '+30% National Semiconductor Mission Demand',
    keyResponsibilities: [
      'Write modular, synthesizable SystemVerilog RTL models for multi-core processors and cache controllers',
      'Build comprehensive UVM verification testbenches with constrained-random stimulus and functional coverage',
      'Perform static timing analysis (STA) setup/hold closure across multi-corner operating temperatures'
    ],
    sampleJobTitles: ['ASIC Design Engineer', 'RTL Design Engineer', 'Design Verification (DV) Engineer', 'Physical Design Lead']
  },
  {
    id: 'career-structural-lead-specialist',
    title: 'Lead Structural & Smart Infrastructure Project Specialist',
    domain: 'Structural Dynamics, High-Rise Engineering & Infrastructure',
    description: 'Lead structural engineering analysis for high-rise towers, seismic retrofits, highway bridges, and large-scale smart urban infrastructure.',
    requiredSkills: [
      { name: 'Structural Analysis (ETABS / STAAD.Pro / SAP2000)', importance: 'high', category: 'Analysis' },
      { name: 'Reinforced Concrete & Steel Design Codes', importance: 'high', category: 'Codes' },
      { name: 'Seismic & Wind Dynamic Load Modeling', importance: 'high', category: 'Dynamics' },
      { name: 'BIM Integration (Autodesk Revit Structure)', importance: 'medium', category: 'BIM' },
      { name: 'Geotechnical & Deep Foundation Systems', importance: 'medium', category: 'Foundations' }
    ],
    recommendedDisciplines: ['Civil Engineering', 'Structural Engineering', 'Infrastructure Engineering', 'Architecture (M.Arch)'],
    averageSalaryIndia: '₹15.0 LPA - ₹35.0 LPA (High Premium)',
    topRecruitersIndia: ['L&T Construction', 'Tata Projects', 'Afcons Infrastructure', 'AECOM'],
    growthOutlook: '+22% Rapid Urbanization & Mega-Projects',
    keyResponsibilities: [
      'Model 40+ story high-rise structural frames in ETABS evaluating dynamic seismic shear and wind drift',
      'Optimize structural steel and reinforced concrete member dimensions reducing overall material consumption by 15%',
      'Review foundation geotechnical borehole reports and design pile caps for heavy transit viaducts'
    ],
    sampleJobTitles: ['Senior Structural Engineer', 'Structural Project Lead', 'Bridge Design Specialist', 'BIM Structural Manager']
  }
];

// Curated Online Learning Resources (NPTEL, GeeksforGeeks, Coursera, freeCodeCamp, etc.)
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
    provider: 'Microsoft Learn',
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
    provider: 'NPTEL / Robotics Lab',
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
    provider: 'Autodesk Learning Academy',
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
    provider: 'Genomics Academy / Coursera',
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
    provider: 'FastBit Embedded / Udemy',
    skill: 'Embedded Systems',
    difficulty: 'Intermediate',
    duration: '8 Weeks (30 Hours)',
    rating: 4.9,
    url: 'https://udemy.com',
    type: 'Course',
    domain: 'Electronics, Semiconductors & Hardware'
  }
];

// Real-World Capstone Projects tailored for Placement Interviews
export const SEED_PROJECTS: Project[] = [
  {
    id: 'proj-swiggy-zomato-analytics',
    title: 'Quick-Commerce & Food Delivery Unit Economics Analytics Dashboard',
    domain: 'Data Science & Analytics',
    targetCareer: 'Data Analyst & Business Insights',
    difficulty: 'Intermediate',
    description: 'Process 500,000+ simulated delivery records in SQL & Python, calculate city-wise rider payout margins and late delivery penalties, and build an interactive Power BI dashboard.',
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
    description: 'Model elevated metro station viaduct piers in Autodesk Revit, execute load checks in STAAD.Pro per structural engineering standards (IS 456 / Eurocode), and resolve 3D pipeline clashes.',
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
    description: 'Process patient cohort genomic sequencing FASTQ reads in Python and R (DESeq2), discovering 14 statistically significant drug target markers.',
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
    description: 'Pull 5 years of historical stock quotes, calculate Moving Average Convergence Divergence (MACD) and Value at Risk (VaR), and build a dynamic DCF financial valuation model in Excel.',
    keySkills: ['Financial Modeling', 'Excel', 'Python', 'SQL'],
    deliverables: ['Excel three-statement DCF valuation model with scenario toggles', 'Python backtesting notebook with Sharpe ratio metrics'],
    estimatedHours: 24
  }
];

// Seed Career Transition Roadmap for Rohan Sharma (Mechanical student pivoting to Data Analyst)
export const SEED_ROADMAPS: Roadmap[] = [
  {
    id: 'roadmap-rohan-mechanical',
    userId: 'user-rohan-mechanical',
    careerId: 'career-data-analyst',
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
        description: 'Master medium-to-hard SQL queries (JOINs, Window Functions: RANK, DENSE_RANK, LEAD, LAG, and CTEs) frequently asked in technical placement rounds.',
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
        description: 'Learn DAX formulas, star schema data modeling, and build interactive KPI dashboards demonstrating business acumen for modern e-commerce / manufacturing use cases.',
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
        title: 'Phase 5: High-Growth E-Commerce / EV Capstone Project Artifact',
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
        description: 'Master the classic "Why IT/Analytics after Mechanical?" question, communicate project trade-offs with confidence, and practice guesstimate and puzzle rounds.',
        skillsCovered: ['Communication', 'Problem Solving'],
        estimatedWeeks: 2,
        completed: false,
        recommendedResources: [
          { title: 'AI Skill Mentor Placement Mock Studio', type: 'Interactive' }
        ]
      }
    ]
  }
];

// Comprehensive Campus Placement Interview Question Banks
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
      question: 'How do you perform quality check (QC) on raw sequencing data in a modern genomics lab, and what tool do you use?',
      type: 'Technical',
      expectedKeyPoints: ['FastQC metrics and Phred quality scores (> Q30)', 'Trimming adapters using Cutadapt / Trimmomatic', 'Evaluating GC bias and sequence duplication']
    },
    {
      question: 'Why do you want to join Biocon or Dr. Reddy\'s over academic PhD research at this stage of your career?',
      type: 'HR',
      expectedKeyPoints: ['Desire to see research translated into real clinical therapeutics for millions of patients worldwide', 'Excited by high-throughput enterprise bioinformatics infrastructure', 'Long-term goal of driving global biopharma innovation']
    }
  ],
  'Robotics & Industrial Automation Engineer': [
    {
      question: 'Can you explain the difference between a microcontroller (like STM32 / Arduino) and an industrial PLC used on modern plant assembly lines?',
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
      question: 'Are you comfortable with relocating or working in a hybrid environment if required by the company?',
      type: 'HR',
      expectedKeyPoints: ['Positive openness to relocation and working in top tech hubs', 'Excitement about working in dynamic collaborative teams']
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
