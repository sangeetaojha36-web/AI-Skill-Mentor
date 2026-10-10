// api/index.ts
import express from "express";

// server/apiRouter.ts
import { Router } from "express";

// server/db.ts
var DB = {
  users: [],
  careers: [],
  courses: [],
  projects: [],
  resumes: [],
  roadmaps: [],
  interviews: [],
  chatHistory: [],
  analytics: {
    totalStudentsIndexed: 4820,
    placedInCurrentDrive: 1240,
    averageCTCJump: "68% Average LPA Hike",
    mockInterviewsCompleted: 3120,
    topHiringCities: ["Bengaluru", "Hyderabad", "Pune", "Noida / Gurgaon", "Mumbai", "Chennai"]
  }
};
var SEED_USERS = [
  {
    id: "user-rohan-mechanical",
    name: "Rohan Sharma",
    email: "rohan.sharma22@aktu.ac.in",
    passwordHash: "rohan123",
    role: "student",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    country: "India",
    stateOrCity: "Noida, Uttar Pradesh",
    languages: ["Hindi", "English"],
    education: {
      degree: "B.Tech",
      branch: "Mechanical Engineering",
      college: "Dr. A.P.J. Abdul Kalam Technical University (AKTU Affiliated)",
      collegeTier: "Tier 3",
      currentYear: "Final Year (8th Semester - 2026 Batch)",
      cgpa: "8.1 / 10.0"
    },
    skills: ["Python", "AutoCAD", "SolidWorks", "Excel", "Problem Solving", "Basics of SQL"],
    interests: ["Data Science & Analytics", "Robotics & Automation", "Electric Vehicles (EV)"],
    careerGoal: "Data Analyst",
    targetCompanies: ["Flipkart", "TCS Digital", "Tata Motors", "Fractal Analytics", "Mu Sigma"],
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "user-ananya-biotech",
    name: "Ananya Iyer",
    email: "ananya.iyer@du.ac.in",
    passwordHash: "ananya123",
    role: "student",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
    country: "India",
    stateOrCity: "New Delhi",
    languages: ["English", "Hindi", "Tamil"],
    education: {
      degree: "B.Sc (Hons)",
      branch: "Biotechnology & Life Sciences",
      college: "University of Delhi (South Campus)",
      collegeTier: "Tier 1",
      currentYear: "Final Year (6th Semester - 2026 Batch)",
      cgpa: "8.7 / 10.0"
    },
    skills: ["PCR", "Genomics", "Python", "Biostatistics", "Molecular Biology", "Excel"],
    interests: ["Bioinformatics", "Pharmaceutical Analytics", "Healthcare AI"],
    careerGoal: "Bioinformatics Analyst",
    targetCompanies: ["Biocon", "Strand Life Sciences", "Dr. Reddy's Laboratories", "Serum Institute"],
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "user-aryan-commerce",
    name: "Aryan Patel",
    email: "aryan.patel@xaviers.edu.in",
    passwordHash: "aryan123",
    role: "student",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    country: "India",
    stateOrCity: "Mumbai, Maharashtra",
    languages: ["English", "Hindi", "Gujarati"],
    education: {
      degree: "B.Com (Hons)",
      branch: "Commerce & Financial Markets",
      college: "St. Xavier's College, Mumbai",
      collegeTier: "Tier 1",
      currentYear: "3rd Year (Final - 2026 Batch)",
      cgpa: "8.9 / 10.0"
    },
    skills: ["Financial Modeling", "Excel", "Corporate Accounting", "Communication", "SQL"],
    interests: ["FinTech & FinTech Startups", "Equity Research", "Product Analytics"],
    careerGoal: "Financial & FinTech Analyst",
    targetCompanies: ["Zerodha", "Goldman Sachs Bengaluru", "HDFC Bank", "Deloitte India"],
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "user-admin-placement",
    name: "Prof. R. K. Mukherjee",
    email: "tnp.head@nit.ac.in",
    passwordHash: "admin123",
    role: "admin",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250",
    country: "India",
    stateOrCity: "Bengaluru, Karnataka",
    languages: ["English", "Hindi", "Bengali"],
    education: {
      degree: "Ph.D. in Systems Engineering (IIT Kharagpur)",
      branch: "Training & Placement Directorate",
      college: "National Institute of Technology",
      collegeTier: "Tier 1",
      currentYear: "Head of T&P Cell"
    },
    skills: ["Placement Training", "Curriculum Industry Alignment", "Corporate Relations", "Analytics"],
    interests: ["Campus Placements", "Tier 2/3 Upskilling", "Industry-Academia Bridge"],
    careerGoal: "Director of Career Services",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  }
];
var SEED_CAREERS = [
  // --- FOUNDATION / ENTRY TIER (₹3.2 LPA - ₹7.0 LPA) ---
  {
    id: "career-qa-manual-tester",
    title: "Junior QA & Software Tester",
    domain: "Software Quality & Testing",
    description: "Ensure software quality by writing detailed test scenarios, executing regression test suites, and discovering edge-case bugs before product releases.",
    requiredSkills: [
      { name: "Manual Testing", importance: "high", category: "Testing" },
      { name: "Test Case Writing", importance: "high", category: "Documentation" },
      { name: "Jira / Bug Tracking", importance: "high", category: "Tools" },
      { name: "Postman (API Testing Basics)", importance: "medium", category: "API" },
      { name: "SQL Basics", importance: "medium", category: "Databases" },
      { name: "Attention to Detail", importance: "high", category: "Soft Skills" }
    ],
    recommendedDisciplines: ["Any Engineering Branch", "BCA / B.Sc Computer Science", "MCA", "Commerce with IT interest"],
    averageSalaryIndia: "\u20B93.5 LPA - \u20B96.5 LPA (Fresher Friendly)",
    topRecruitersIndia: ["Cognizant", "Wipro", "TCS", "Infosys", "Capgemini", "Accenture"],
    growthOutlook: "+18% Steady Industry Demand for Quality Assurance",
    keyResponsibilities: [
      "Author test cases covering functional, boundary value, and negative user scenarios",
      "Log detailed bug reports in Jira with reproduction steps, screenshots, and system logs",
      "Verify REST API endpoints and payload responses using Postman"
    ],
    sampleJobTitles: ["QA Trainee", "Software Test Engineer", "Manual Tester", "Associate QA Analyst"]
  },
  {
    id: "career-graduate-engineer-trainee",
    title: "Graduate Engineer Trainee (GET - Core & Plant)",
    domain: "Core Manufacturing, Operations & Plant Tech",
    description: "Lead shopfloor machinery operations, oversee component assembly lines, inspect component tolerances, and implement lean manufacturing practices.",
    requiredSkills: [
      { name: "Engineering Drawing & GD&T", importance: "high", category: "Core Mechanical" },
      { name: "Quality Control (7 QC Tools)", importance: "high", category: "Quality" },
      { name: "AutoCAD Basics", importance: "medium", category: "CAD" },
      { name: "Production Planning", importance: "medium", category: "Operations" },
      { name: "MS Excel for Operations", importance: "medium", category: "Analytics" }
    ],
    recommendedDisciplines: ["Mechanical Engineering", "Production & Industrial", "Electrical Engineering", "Automobile Engineering"],
    averageSalaryIndia: "\u20B93.6 LPA - \u20B96.8 LPA (Core Campus Standard)",
    topRecruitersIndia: ["Tata Motors", "L&T", "Mahindra", "Hero MotoCorp", "Ashok Leyland"],
    growthOutlook: "+19% Driven by Industrial Expansion and Heavy Manufacturing",
    keyResponsibilities: [
      "Monitor production line efficiency, cycle times, and machine downtime metrics",
      "Perform dimensional tolerance checks using vernier calipers, micrometers, and CMM machines",
      "Implement 5S, Kaizen, and safety compliance protocols across the factory floor"
    ],
    sampleJobTitles: ["Graduate Engineer Trainee", "Assistant Production Engineer", "Quality Control Inspector", "Plant Maintenance Trainee"]
  },
  {
    id: "career-cad-drafter",
    title: "Junior CAD Modeler & Drafting Drafter",
    domain: "Mechanical & Structural CAD Design",
    description: "Produce high-precision 2D engineering drawings, mechanical part models, and Bills of Materials (BOM) for manufacturing fabrication.",
    requiredSkills: [
      { name: "AutoCAD", importance: "high", category: "CAD" },
      { name: "SolidWorks Basics", importance: "high", category: "3D CAD" },
      { name: "GD&T Tolerancing", importance: "medium", category: "Standards" },
      { name: "Bill of Materials (BOM)", importance: "medium", category: "Documentation" },
      { name: "Orthographic Projections", importance: "high", category: "Drafting" }
    ],
    recommendedDisciplines: ["Mechanical Engineering", "Civil Engineering", "Automobile", "Diploma in Engineering"],
    averageSalaryIndia: "\u20B93.4 LPA - \u20B95.8 LPA",
    topRecruitersIndia: ["L&T Tech", "Tata Tech", "Cyient", "Quest Global"],
    growthOutlook: "+16% High Demand in Fabrication and Engineering Services",
    keyResponsibilities: [
      "Draft isometric and orthographic assembly drawings in AutoCAD and SolidWorks",
      "Calculate surface finishes, welding callouts, and geometric tolerances for sheet metal parts",
      "Maintain version-controlled CAD archives and export STEP/DWG files for CNC machinists"
    ],
    sampleJobTitles: ["CAD Drafter", "Junior Design Engineer", "Mechanical Drafter", "Detailing Engineer"]
  },
  {
    id: "career-junior-web-dev",
    title: "Junior Frontend Web Developer (HTML/CSS/JS)",
    domain: "Frontend & Web Development",
    description: "Build fast, responsive web pages, implement UI interactive components, and convert design wireframes into clean, accessible code.",
    requiredSkills: [
      { name: "HTML5 & CSS3", importance: "high", category: "Frontend" },
      { name: "JavaScript Basics", importance: "high", category: "Programming" },
      { name: "Tailwind CSS / Bootstrap", importance: "medium", category: "Styling" },
      { name: "Git & GitHub", importance: "high", category: "Version Control" },
      { name: "Responsive Web Design", importance: "high", category: "Layout" }
    ],
    recommendedDisciplines: ["Computer Science", "BCA / MCA", "Information Technology", "Any Engineering Major"],
    averageSalaryIndia: "\u20B94.0 LPA - \u20B97.0 LPA",
    topRecruitersIndia: ["Cognizant", "HCLTech", "Zoho", "Wipro", "Tech Mahindra"],
    growthOutlook: "+22% Strong Entry-Level Web Demand",
    keyResponsibilities: [
      "Translate Figma mockups into responsive, cross-browser compatible HTML/CSS/JS code",
      "Optimize web page asset load speeds, image compression, and mobile navigation layouts",
      "Fix styling glitches and coordinate with backend engineers to integrate REST API data"
    ],
    sampleJobTitles: ["Junior Web Developer", "Associate Frontend Engineer", "UI Developer", "Web Integrator"]
  },
  {
    id: "career-tech-support-systems",
    title: "IT Systems & Technical Support Specialist",
    domain: "IT Infrastructure & Support",
    description: "Diagnose network connectivity, resolve hardware and software workstation tickets, configure cloud emails, and maintain enterprise IT assets.",
    requiredSkills: [
      { name: "Windows & Linux Admin Basics", importance: "high", category: "OS" },
      { name: "Computer Networking (DNS, DHCP, IP)", importance: "high", category: "Networking" },
      { name: "Hardware Troubleshooting", importance: "high", category: "Hardware" },
      { name: "ServiceNow / Helpdesk Ticketing", importance: "medium", category: "Tools" },
      { name: "Customer Communication", importance: "high", category: "Soft Skills" }
    ],
    recommendedDisciplines: ["Computer Science", "BCA", "Information Technology", "Electronics & Telecom", "Any Graduate"],
    averageSalaryIndia: "\u20B93.5 LPA - \u20B96.2 LPA",
    topRecruitersIndia: ["Dell", "Wipro", "HCLTech", "Cognizant", "Infosys"],
    growthOutlook: "+15% Stable Year-on-Year Demand in IT Companies",
    keyResponsibilities: [
      "Troubleshoot hardware, OS, VPN, and peripheral issues for enterprise employees",
      "Provision laptop accounts, assign Active Directory group policies, and manage software licenses",
      "Configure office network routers, Wi-Fi access points, and network printers"
    ],
    sampleJobTitles: ["Technical Support Engineer", "IT Helpdesk Specialist", "Desktop Support Associate", "Systems Support Trainee"]
  },
  {
    id: "career-operations-data-entry",
    title: "Operations & Business Data Associate",
    domain: "Business Operations & Reporting",
    description: "Organize transactional data, build automated spreadsheet formulas, reconcile vendor billing records, and maintain accurate enterprise databases.",
    requiredSkills: [
      { name: "MS Excel (VLOOKUP, Pivot Tables)", importance: "high", category: "Spreadsheets" },
      { name: "Data Cleansing & Auditing", importance: "high", category: "Data" },
      { name: "Google Sheets", importance: "medium", category: "Tools" },
      { name: "Typing Speed & Accuracy", importance: "high", category: "Productivity" },
      { name: "Basic SQL Knowledge", importance: "medium", category: "Databases" }
    ],
    recommendedDisciplines: ["Commerce (B.Com)", "BBA", "B.Sc", "Any Graduate"],
    averageSalaryIndia: "\u20B93.2 LPA - \u20B95.5 LPA",
    topRecruitersIndia: ["Genpact", "WNS", "Accenture Ops", "TCS BPS"],
    growthOutlook: "+14% Steady Operational Need in Every Industry",
    keyResponsibilities: [
      "Consolidate multi-departmental sales and expense spreadsheets into clean master reports",
      "Perform data validation checks to prevent duplicate entries and formatting errors",
      "Generate weekly operational KPI summaries for management review"
    ],
    sampleJobTitles: ["Operations Executive", "MIS Executive", "Data Operations Associate", "Reporting Analyst"]
  },
  // --- CORE & GROWTH TIER (₹7.0 LPA - ₹15.0 LPA) ---
  {
    id: "career-data-analyst",
    title: "Data Analyst & Business Intelligence Specialist",
    domain: "Data Analytics & Business Intelligence",
    description: "Transform complex enterprise data into clear actionable visual stories, executive dashboards, and statistical insights that drive smart business decisions.",
    requiredSkills: [
      { name: "SQL", importance: "high", category: "Databases" },
      { name: "Excel", importance: "high", category: "Analytics" },
      { name: "Python", importance: "high", category: "Programming" },
      { name: "Power BI", importance: "high", category: "BI Tools" },
      { name: "Tableau", importance: "medium", category: "Visualization" },
      { name: "Statistics", importance: "high", category: "Mathematics" },
      { name: "Communication", importance: "medium", category: "Soft Skills" }
    ],
    recommendedDisciplines: ["Mechanical Engineering", "Computer Science", "Commerce", "Mathematics", "Civil Engineering", "Electrical"],
    averageSalaryIndia: "\u20B98 LPA - \u20B918 LPA (Senior: \u20B926+ LPA)",
    topRecruitersIndia: ["Deloitte", "McKinsey & Co", "Amazon", "Spotify", "Uber", "Salesforce"],
    growthOutlook: "+24% Steady Growth Across All Modern Industries",
    keyResponsibilities: [
      "Write optimized SQL queries on cloud data warehouses like Snowflake, BigQuery, and PostgreSQL",
      "Build executive dashboards in Power BI tracking GMV, user acquisition, and churn rates",
      "Conduct statistical cohort analysis to improve product margins and supply chain throughput"
    ],
    sampleJobTitles: ["Data Analyst I", "Business Analyst", "Decision Analytics Associate", "Growth Data Analyst"]
  },
  {
    id: "career-automation-qa-engineer",
    title: "QA Automation Engineer (Selenium & Cypress)",
    domain: "Automated Quality Engineering",
    description: "Write robust automation test suites, configure headless browser tests in CI/CD, and eliminate manual regression testing through automated frameworks.",
    requiredSkills: [
      { name: "Java / Python / JavaScript", importance: "high", category: "Programming" },
      { name: "Selenium WebDriver", importance: "high", category: "Automation" },
      { name: "Cypress / Playwright", importance: "high", category: "Modern Testing" },
      { name: "TestNG / PyTest", importance: "medium", category: "Test Runners" },
      { name: "CI/CD Pipeline Integration", importance: "medium", category: "DevOps" }
    ],
    recommendedDisciplines: ["Computer Science", "Information Technology", "Electronics", "Any Engineering Branch"],
    averageSalaryIndia: "\u20B97.5 LPA - \u20B915.0 LPA (Senior: \u20B922+ LPA)",
    topRecruitersIndia: ["Epam", "Capgemini", "Sapient", "Oracle", "Thoughtworks"],
    growthOutlook: "+26% Heavy Industry Transition to Automated Testing",
    keyResponsibilities: [
      "Design Page Object Model (POM) test architecture using Playwright or Selenium",
      "Integrate test suites into GitHub Actions so every PR runs automated smoke tests",
      "Identify flaky tests and improve test execution speed through parallelization"
    ],
    sampleJobTitles: ["Automation QA Engineer", "Software Development Engineer in Test (SDET-1)", "Test Automation Specialist"]
  },
  {
    id: "career-uiux-designer",
    title: "UI/UX Product Designer",
    domain: "Product Design & User Experience",
    description: "Craft intuitive, accessible, and visually stunning digital products that delight millions of users across mobile and web interfaces.",
    requiredSkills: [
      { name: "Figma", importance: "high", category: "Design Tools" },
      { name: "Design Systems & Tokens", importance: "high", category: "Architecture" },
      { name: "User Research & Personas", importance: "high", category: "Discovery" },
      { name: "Interaction Design & Prototyping", importance: "high", category: "Prototyping" },
      { name: "Information Architecture", importance: "medium", category: "UX" },
      { name: "HTML & CSS Basics", importance: "medium", category: "Engineering Empathy" }
    ],
    recommendedDisciplines: ["Design (B.Des)", "Computer Science", "HCI / Architecture", "Any Branch with Design Passion"],
    averageSalaryIndia: "\u20B99 LPA - \u20B922 LPA (Senior: \u20B930+ LPA)",
    topRecruitersIndia: ["Apple", "Airbnb", "Figma", "Spotify", "Google", "Notion"],
    growthOutlook: "+23% Steady Demand for High-Taste Designers",
    keyResponsibilities: [
      "Design modular component libraries and interactive design systems in Figma",
      "Conduct usability interviews and translate user feedback into high-fidelity wireframes",
      "Collaborate closely with frontend developers to ensure pixel-perfect design implementation"
    ],
    sampleJobTitles: ["Product Designer I", "UI/UX Designer", "Interaction Designer", "Visual Experience Designer"]
  },
  {
    id: "career-bioinformatics",
    title: "Bioinformatics & Computational Health Scientist",
    domain: "Biotechnology, Healthcare & Genomics",
    description: "Harness high-performance computing, Python, and genomic datasets to decode biological systems and accelerate drug discovery.",
    requiredSkills: [
      { name: "Bioinformatics", importance: "high", category: "Domain" },
      { name: "Python", importance: "high", category: "Data Analysis" },
      { name: "R Programming", importance: "high", category: "Biostatistics" },
      { name: "Genomics", importance: "high", category: "Molecular Biology" },
      { name: "Statistics", importance: "medium", category: "Mathematics" },
      { name: "Git", importance: "medium", category: "Version Control" }
    ],
    recommendedDisciplines: ["Biotechnology", "Biomedical Engineering", "Life Sciences", "Bioinformatics", "Computer Science"],
    averageSalaryIndia: "\u20B99 LPA - \u20B922 LPA (Senior: \u20B930+ LPA)",
    topRecruitersIndia: ["Illumina", "Genentech", "Pfizer", "Novartis", "AstraZeneca", "Broad Institute"],
    growthOutlook: "+26% Strong Expansion in Modern Biotech & Personalized Medicine",
    keyResponsibilities: [
      "Execute RNA-seq differential gene expression pipelines using DESeq2 and Python",
      "Perform variant calling (GATK) and genomic structural annotation on NGS datasets",
      "Collaborate with molecular wet-lab teams to translate computational markers into clinical assays"
    ],
    sampleJobTitles: ["Bioinformatics Associate", "Genomic Data Analyst", "Computational Biology Specialist"]
  },
  {
    id: "career-civil-bim",
    title: "Smart Infrastructure & BIM Structural Coordinator",
    domain: "Civil Infrastructure, Smart Cities & Construction Tech",
    description: "Leads digital 3D Building Information Modeling (BIM), clash detection, and structural analysis for modern expressway, metro, and airport projects.",
    requiredSkills: [
      { name: "Revit", importance: "high", category: "BIM" },
      { name: "AutoCAD", importance: "high", category: "Drafting" },
      { name: "STAAD Pro", importance: "high", category: "Structural Engineering" },
      { name: "Structural Analysis", importance: "high", category: "Core Civil" },
      { name: "Construction Management", importance: "medium", category: "Management" },
      { name: "GIS", importance: "medium", category: "Geospatial" }
    ],
    recommendedDisciplines: ["Civil Engineering", "Structural Engineering", "Architecture (B.Arch)", "Construction Technology"],
    averageSalaryIndia: "\u20B98 LPA - \u20B920 LPA (Senior: \u20B928+ LPA)",
    topRecruitersIndia: ["AECOM", "Arup", "Bechtel", "Jacobs Engineering", "WSP", "Turner Construction"],
    growthOutlook: "+22% Significant Demand Driven by Global Infrastructure Expansion",
    keyResponsibilities: [
      "Build and coordinate 3D parametric BIM structural models in Autodesk Revit",
      "Execute multi-story structural load calculations in STAAD.Pro conforming to international codes",
      "Run clash detection between architectural, structural, and MEP piping systems"
    ],
    sampleJobTitles: ["BIM Engineer", "Structural Design Engineer", "Digital Project Coordinator"]
  },
  // --- HIGH & PREMIUM TIER (₹15.0 LPA - ₹45+ LPA) ---
  {
    id: "career-fullstack-dev",
    title: "Full Stack Software Engineer",
    domain: "Software Engineering & Cloud",
    description: "Build modern responsive web applications and high-performance backend microservices that power global platforms and seamless digital experiences.",
    requiredSkills: [
      { name: "JavaScript", importance: "high", category: "Programming" },
      { name: "React", importance: "high", category: "Frontend" },
      { name: "Node.js", importance: "high", category: "Backend" },
      { name: "TypeScript", importance: "high", category: "Frontend" },
      { name: "SQL", importance: "high", category: "Databases" },
      { name: "Git", importance: "high", category: "Tooling" },
      { name: "REST APIs", importance: "medium", category: "Backend" },
      { name: "Docker", importance: "medium", category: "DevOps" }
    ],
    recommendedDisciplines: ["Computer Science", "Information Technology", "Electronics", "Mathematics", "Any Engineering Branch"],
    averageSalaryIndia: "\u20B910 LPA - \u20B924 LPA (Senior: \u20B935+ LPA)",
    topRecruitersIndia: ["Google", "Microsoft", "Amazon", "Meta", "Stripe", "Atlassian"],
    growthOutlook: "+26% Strong Annual Growth (High Global Demand)",
    keyResponsibilities: [
      "Architect fast, intuitive user experiences using React, TypeScript, and modern component systems",
      "Design reliable backend APIs, GraphQL services, and scalable serverless or microservice architectures",
      "Optimize database queries, configure distributed caching with Redis, and monitor system performance"
    ],
    sampleJobTitles: ["Software Development Engineer I", "Associate Full Stack Developer", "Frontend Engineer", "Backend Engineer"]
  },
  {
    id: "career-ai-ml-engineer",
    title: "AI & Machine Learning Engineer",
    domain: "Artificial Intelligence & Machine Learning",
    description: "Design and deploy intelligent neural networks, large language models (LLMs), and automated inference pipelines that solve complex real-world challenges.",
    requiredSkills: [
      { name: "Python", importance: "high", category: "Programming" },
      { name: "PyTorch", importance: "high", category: "Deep Learning" },
      { name: "Machine Learning", importance: "high", category: "Algorithms" },
      { name: "TensorFlow", importance: "medium", category: "Deep Learning" },
      { name: "Data Structures & Algorithms", importance: "high", category: "Core CS" },
      { name: "Linear Algebra & Statistics", importance: "high", category: "Mathematics" },
      { name: "LLM Prompt Engineering & RAG", importance: "high", category: "Generative AI" },
      { name: "Docker", importance: "medium", category: "Deployment" }
    ],
    recommendedDisciplines: ["Computer Science", "Data Science", "Mathematics", "Electrical Engineering", "Mechanical Engineering"],
    averageSalaryIndia: "\u20B915 LPA - \u20B935 LPA (Senior: \u20B948+ LPA)",
    topRecruitersIndia: ["OpenAI", "Google DeepMind", "NVIDIA", "Anthropic", "Microsoft", "Amazon"],
    growthOutlook: "+38% Explosive Industry Growth (Top Tech Priority)",
    keyResponsibilities: [
      "Fine-tune state-of-the-art transformer models and build Retrieval-Augmented Generation (RAG) vector pipelines",
      "Train deep neural networks for computer vision, natural language understanding, or predictive modeling",
      "Optimize AI model latency using quantization, TensorRT, and efficient GPU batching"
    ],
    sampleJobTitles: ["Machine Learning Engineer", "AI Research Associate", "Generative AI Developer", "NLP Specialist"]
  },
  {
    id: "career-devops-cloud",
    title: "Cloud Solutions & DevOps Architect",
    domain: "Cloud Architecture & DevOps",
    description: "Design bulletproof cloud infrastructure, automated CI/CD deployment pipelines, and scalable Kubernetes clusters that keep global apps running 24/7.",
    requiredSkills: [
      { name: "Linux", importance: "high", category: "Operating Systems" },
      { name: "Docker", importance: "high", category: "Containers" },
      { name: "Kubernetes", importance: "high", category: "Orchestration" },
      { name: "AWS / Cloud Platforms", importance: "high", category: "Cloud Infrastructure" },
      { name: "CI/CD Pipelines (GitHub Actions)", importance: "high", category: "Automation" },
      { name: "Terraform (IaC)", importance: "medium", category: "Infrastructure as Code" },
      { name: "Python / Bash Scripting", importance: "medium", category: "Automation" }
    ],
    recommendedDisciplines: ["Computer Science", "Information Technology", "Electronics & Communication", "Electrical"],
    averageSalaryIndia: "\u20B914 LPA - \u20B932 LPA (Senior: \u20B945+ LPA)",
    topRecruitersIndia: ["Amazon Web Services", "Microsoft Azure", "Google Cloud", "Netflix", "HashiCorp"],
    growthOutlook: "+29% High Growth (Accelerating Cloud Adoption)",
    keyResponsibilities: [
      "Automate zero-downtime application deployments with GitHub Actions and Docker",
      "Provision scalable multi-region cloud resources using Terraform Infrastructure as Code",
      "Set up observability dashboards using Prometheus, Grafana, and Datadog for 99.99% uptime"
    ],
    sampleJobTitles: ["Cloud Engineer", "DevOps Specialist", "Site Reliability Engineer (SRE)", "Infrastructure Architect"]
  },
  {
    id: "career-product-manager",
    title: "Associate Product Manager (APM)",
    domain: "Product Strategy & Technology",
    description: "Lead the vision, user research, and strategic roadmap of consumer and enterprise products, collaborating closely with design and engineering teams.",
    requiredSkills: [
      { name: "Product Strategy & PRDs", importance: "high", category: "Strategy" },
      { name: "User Research & Empathy", importance: "high", category: "Discovery" },
      { name: "Data & Metric Analysis", importance: "high", category: "Analytics" },
      { name: "Figma & Wireframing", importance: "medium", category: "Design" },
      { name: "Agile & Scrum Delivery", importance: "medium", category: "Execution" },
      { name: "Communication", importance: "high", category: "Leadership" }
    ],
    recommendedDisciplines: ["Any Engineering Branch", "Design & HCI", "Business Administration", "Economics", "Computer Science"],
    averageSalaryIndia: "\u20B914 LPA - \u20B930 LPA (Senior: \u20B942+ LPA)",
    topRecruitersIndia: ["Google APM Program", "Uber", "Meta", "Airbnb", "Stripe", "Atlassian"],
    growthOutlook: "+27% Very Prestigious Fast-Track Career Path",
    keyResponsibilities: [
      "Author Product Requirement Documents (PRDs) with user stories and acceptance criteria",
      "Analyze funnel drop-offs and retention cohorts using SQL and analytics dashboards",
      "Collaborate with engineering squads and design teams in fast-paced two-week Agile sprints"
    ],
    sampleJobTitles: ["Associate Product Manager (APM)", "Product Analyst", "Technical Product Specialist", "Growth Product Manager"]
  },
  {
    id: "career-cybersecurity",
    title: "Cybersecurity & Ethical Hacking Specialist",
    domain: "Information Security & Trust",
    description: "Safeguard vital networks, financial transactions, and proprietary data against cyber threats, vulnerabilities, and malicious attacks.",
    requiredSkills: [
      { name: "Network Security (TCP/IP, Firewalls)", importance: "high", category: "Networking" },
      { name: "Vulnerability Assessment & PenTesting", importance: "high", category: "Offensive Security" },
      { name: "Linux Administration", importance: "high", category: "Systems" },
      { name: "Python / Bash Scripting", importance: "medium", category: "Automation" },
      { name: "SIEM Tools (Splunk, Elastic)", importance: "medium", category: "Monitoring" },
      { name: "Cryptography Basics", importance: "medium", category: "Security" }
    ],
    recommendedDisciplines: ["Computer Science", "Information Security", "Electronics & Communication", "Information Technology"],
    averageSalaryIndia: "\u20B912 LPA - \u20B928 LPA (Senior: \u20B938+ LPA)",
    topRecruitersIndia: ["Palo Alto Networks", "CrowdStrike", "Cisco", "Cloudflare", "Microsoft Security"],
    growthOutlook: "+33% Critical Shortage of Qualified Security Talent",
    keyResponsibilities: [
      "Conduct automated vulnerability scans and manual penetration testing on web applications",
      "Monitor Security Information and Event Management (SIEM) consoles for suspicious anomaly spikes",
      "Establish enterprise zero-trust access policies, SSL/TLS certificates, and identity guardrails"
    ],
    sampleJobTitles: ["Cybersecurity Analyst", "Security Operations Center (SOC) Specialist", "Junior Penetration Tester", "Cloud Security Associate"]
  },
  {
    id: "career-robotics-automation",
    title: "Robotics & Autonomous Systems Engineer",
    domain: "Robotics, Mechatronics & Autonomous Hardware",
    description: "Engineer intelligent physical machines, autonomous mobile robots (AMRs), industrial robotic arms, and self-navigating vehicles.",
    requiredSkills: [
      { name: "C++", importance: "high", category: "Low-Level Programming" },
      { name: "Python", importance: "high", category: "Programming" },
      { name: "Robot Operating System (ROS / ROS2)", importance: "high", category: "Robotics OS" },
      { name: "Computer Vision (OpenCV)", importance: "medium", category: "Perception" },
      { name: "Kinematics & Control Systems", importance: "high", category: "Dynamics" },
      { name: "SolidWorks / CAD", importance: "medium", category: "Mechanical Design" }
    ],
    recommendedDisciplines: ["Mechanical Engineering", "Mechatronics", "Electrical Engineering", "Computer Science"],
    averageSalaryIndia: "\u20B912 LPA - \u20B928 LPA (Senior: \u20B940+ LPA)",
    topRecruitersIndia: ["Boston Dynamics", "Tesla Automation", "ABB Robotics", "KUKA", "Amazon Robotics"],
    growthOutlook: "+31% Huge Growth in Robotics & Warehouse Automation",
    keyResponsibilities: [
      "Program trajectory planning, inverse kinematics, and obstacle avoidance algorithms in ROS2 and C++",
      "Integrate LiDAR, stereo cameras, and IMU sensor fusion using Kalman filters",
      "Test robot prototypes in Gazebo physics simulators before physical hardware deployment"
    ],
    sampleJobTitles: ["Robotics Engineer", "Autonomous Navigation Specialist", "Mechatronics System Engineer", "Controls Engineer"]
  },
  {
    id: "career-fintech-analyst",
    title: "Financial Modeling & FinTech Specialist",
    domain: "Finance, Banking & Quantitative Tech",
    description: "Applies dynamic financial modeling, accounting valuation, and data querying to optimize retail trading, wealth tech, and risk underwriting in the booming FinTech sector.",
    requiredSkills: [
      { name: "Financial Modeling", importance: "high", category: "Finance" },
      { name: "Excel", importance: "high", category: "Spreadsheets" },
      { name: "Accounting", importance: "high", category: "Financial Statements" },
      { name: "SQL", importance: "high", category: "Data Analysis" },
      { name: "Python", importance: "medium", category: "Automation" },
      { name: "Risk Management", importance: "medium", category: "Compliance" }
    ],
    recommendedDisciplines: ["Commerce (B.Com)", "Economics", "BBA / Finance", "Mathematics", "MBA Finance"],
    averageSalaryIndia: "\u20B912 LPA - \u20B930 LPA (Senior: \u20B945+ LPA)",
    topRecruitersIndia: ["Goldman Sachs", "J.P. Morgan", "Morgan Stanley", "BlackRock", "Stripe", "Bloomberg"],
    growthOutlook: "+25% Rapid Growth in Digital Banking & Investment Tech",
    keyResponsibilities: [
      "Build dynamic Discounted Cash Flow (DCF) and three-statement financial forecast models",
      "Audit trading volumes, merchant margins, and loan default risks using SQL and Excel",
      "Create monthly investor presentation memorandums and regulatory compliance summaries"
    ],
    sampleJobTitles: ["Equity Research Associate", "FinTech Risk Analyst", "Financial Planning & Analysis (FP&A) Analyst"]
  },
  {
    id: "career-embedded-vlsi",
    title: "Embedded Systems & Semiconductor Firmware Engineer",
    domain: "Semiconductors, Hardware & IoT",
    description: "Write ultra-efficient low-level firmware for microcontrollers, microprocessors, and smart IoT connected devices.",
    requiredSkills: [
      { name: "Embedded Systems", importance: "high", category: "Firmware" },
      { name: "C++", importance: "high", category: "Low-Level Code" },
      { name: "Microcontrollers", importance: "high", category: "Hardware" },
      { name: "PCB Design", importance: "medium", category: "Electronics" },
      { name: "IoT", importance: "medium", category: "Connectivity" },
      { name: "Verilog", importance: "medium", category: "VLSI" }
    ],
    recommendedDisciplines: ["Electronics & Communication (ECE)", "Electrical Engineering (EEE)", "Instrumentation"],
    averageSalaryIndia: "\u20B912 LPA - \u20B928 LPA (Senior: \u20B938+ LPA)",
    topRecruitersIndia: ["Qualcomm", "Texas Instruments", "Intel", "Apple Hardware", "NXP Semiconductors"],
    growthOutlook: "+28% Booming Global Semiconductor Demand",
    keyResponsibilities: [
      "Write low-level device drivers in Embedded C/C++ on ARM Cortex-M microcontrollers",
      "Debug bus protocols (UART, SPI, I2C, CAN) using digital storage oscilloscopes and logic analyzers",
      "Design multi-layer schematics and PCB layouts in Altium or KiCad"
    ],
    sampleJobTitles: ["Firmware Engineer", "Embedded Software Engineer I", "Silicon Validation Engineer"]
  },
  {
    id: "career-quant-trader",
    title: "Quantitative Analyst & Algorithmic Trading Associate",
    domain: "Quantitative Finance & Market Making",
    description: "Design statistical arbitrage models, high-frequency execution pipelines, and mathematical pricing algorithms on global stock and derivative exchanges.",
    requiredSkills: [
      { name: "Python / C++", importance: "high", category: "High-Performance Code" },
      { name: "Probability & Stochastic Calculus", importance: "high", category: "Mathematics" },
      { name: "Statistical Arbitrage & Backtesting", importance: "high", category: "Quant" },
      { name: "Data Structures & Algorithms", importance: "high", category: "Core CS" },
      { name: "Financial Derivatives & Options Pricing", importance: "medium", category: "Finance" }
    ],
    recommendedDisciplines: ["Computer Science", "Mathematics & Computing", "Electrical Engineering", "Physics", "Quantitative Economics"],
    averageSalaryIndia: "\u20B918 LPA - \u20B945 LPA (Senior: \u20B965+ LPA)",
    topRecruitersIndia: ["Jane Street", "Citadel Securities", "Tower Research Capital", "Optiver", "WorldQuant"],
    growthOutlook: "+30% Immense Demand for Mathematical and Computational Talent",
    keyResponsibilities: [
      "Backtest statistical trading alphas across historical tick and order-book data",
      "Optimize sub-millisecond execution algorithms in modern C++",
      "Monitor portfolio value-at-risk (VaR) and dynamic Greeks exposure under volatile market swings"
    ],
    sampleJobTitles: ["Quantitative Trader", "Quantitative Researcher", "Algorithmic Execution Developer"]
  },
  {
    id: "career-biotech-lab-qc",
    title: "Junior QC Lab & Clinical Quality Associate",
    domain: "Pharmaceutical QC, Clinical Trials & Quality Assurance",
    description: "Perform standardized pharmaceutical quality control testing, sample assays, and document regulatory compliance under Good Laboratory Practices (GLP).",
    requiredSkills: [
      { name: "Good Laboratory Practices (GLP) & SOPs", importance: "high", category: "Compliance" },
      { name: "HPLC & Spectrophotometry", importance: "high", category: "Instrumentation" },
      { name: "Microbiology & Sample Preparation", importance: "medium", category: "Lab" },
      { name: "Documentation & Regulatory Audit Prep", importance: "high", category: "Documentation" },
      { name: "Quality Control Standards (ISO 9001 / cGMP)", importance: "medium", category: "Quality" }
    ],
    recommendedDisciplines: ["Biotechnology", "Biochemistry", "Microbiology", "B.Pharm", "Life Sciences", "Chemistry"],
    averageSalaryIndia: "\u20B93.0 LPA - \u20B95.4 LPA (Entry Tier)",
    topRecruitersIndia: ["Biocon", "Dr. Reddy's", "Sun Pharma", "Cipla", "Serum Institute"],
    growthOutlook: "+18% Steady Industry Growth",
    keyResponsibilities: [
      "Conduct routine analytical testing of active pharmaceutical ingredients using HPLC and spectrophotometry",
      "Prepare certificate of analysis (COA) documents ensuring strict compliance with cGMP guidelines",
      "Maintain lab calibration logs and participate in internal quality audits"
    ],
    sampleJobTitles: ["Quality Control Chemist", "QC Associate", "Clinical Research Coordinator", "Lab Analyst"]
  },
  {
    id: "career-computational-genomics-lead",
    title: "Senior Computational Genomics & Biopharma Scientist",
    domain: "Genomics, Next-Gen Sequencing & Precision Medicine",
    description: "Lead computational analysis of high-throughput sequencing datasets, biomarker discovery, and clinical variant calling for personalized precision therapeutics.",
    requiredSkills: [
      { name: "Next-Gen Sequencing (NGS) Pipelines (WGS / RNA-Seq)", importance: "high", category: "Genomics" },
      { name: "Bioinformatics in Python & R (Bioconductor / DESeq2)", importance: "high", category: "Analysis" },
      { name: "Variant Calling & Annotation (GATK, VEP, Annovar)", importance: "high", category: "Genomics" },
      { name: "Cloud Genomics (AWS BioBuilds / Nextflow / Snakemake)", importance: "high", category: "Pipelines" },
      { name: "Population Genetics & Statistical Modeling", importance: "medium", category: "Statistics" }
    ],
    recommendedDisciplines: ["Biotechnology", "Bioinformatics", "Computational Biology", "Biomedical Engineering", "Computer Science with Biotech Focus"],
    averageSalaryIndia: "\u20B916.0 LPA - \u20B936.0 LPA (High Premium)",
    topRecruitersIndia: ["Strand Life Sciences", "MedGenome", "AstraZeneca", "Biocon", "Novartis"],
    growthOutlook: "+28% High Demand Precision Medicine",
    keyResponsibilities: [
      "Architect scalable Nextflow pipelines to process terabytes of Whole Exome and RNA-seq sequencing data",
      "Perform statistical differential gene expression analysis and clinical pathway enrichment modeling",
      "Collaborate with molecular oncologists to annotate rare somatic variants and pinpoint therapeutic drug targets"
    ],
    sampleJobTitles: ["Senior Bioinformatician", "Genomic Data Scientist", "Precision Medicine Lead", "NGS Pipeline Architect"]
  },
  {
    id: "career-ev-powertrain-architect",
    title: "Automotive EV Systems & Thermal Powertrain Architect",
    domain: "Electric Vehicles, Battery Packs & Thermal Management",
    description: "Design next-generation EV battery packs, liquid cooling systems, motor drive integration, and vehicle dynamics for clean electric mobility.",
    requiredSkills: [
      { name: "Lithium-Ion Battery Pack Design & BMS Integration", importance: "high", category: "Battery" },
      { name: "CFD & Thermal Management (Ansys Fluent / Star-CCM+)", importance: "high", category: "Simulation" },
      { name: "Automotive CAD (CATIA V5 / Siemens NX)", importance: "high", category: "Design" },
      { name: "Powertrain Modeling & MATLAB / Simulink", importance: "high", category: "Modeling" },
      { name: "Automotive Standards (ISO 26262, AIS-038 / AIS-156)", importance: "medium", category: "Standards" }
    ],
    recommendedDisciplines: ["Mechanical Engineering", "Automobile Engineering", "Mechatronics", "Electrical Engineering"],
    averageSalaryIndia: "\u20B916.0 LPA - \u20B938.0 LPA (High Premium)",
    topRecruitersIndia: ["Tata Motors Electric", "Mahindra Electric", "Ola Electric", "Ather Energy", "Bosch"],
    growthOutlook: "+34% Booming EV Revolution",
    keyResponsibilities: [
      "Design liquid-cooled battery enclosure structures conforming to AIS-156 crash and thermal runaway safety standards",
      "Conduct 3D transient computational fluid dynamics (CFD) simulations to optimize cell-to-cell thermal uniformity",
      "Develop Simulink vehicle drive cycle simulations to optimize regenerative braking and energy efficiency"
    ],
    sampleJobTitles: ["EV Powertrain Engineer", "Battery Systems Architect", "Thermal Systems Lead", "Vehicle Dynamics Specialist"]
  },
  {
    id: "career-vlsi-silicon-specialist",
    title: "VLSI Silicon Design & Microarchitecture Specialist",
    domain: "Semiconductor Chips, ASIC Design & FPGA Synthesis",
    description: "Design cutting-edge ASIC chips, write Verilog/SystemVerilog RTL code, verify timing constraints, and synthesize silicon architectures for modern computing.",
    requiredSkills: [
      { name: "SystemVerilog & Verilog RTL Design", importance: "high", category: "Hardware" },
      { name: "UVM (Universal Verification Methodology)", importance: "high", category: "Verification" },
      { name: "Static Timing Analysis (STA) & Synthesis", importance: "high", category: "Timing" },
      { name: "Digital Electronics & Computer Architecture (RISC-V)", importance: "high", category: "Architecture" },
      { name: "EDA Tooling (Synopsys / Cadence / Vivado)", importance: "medium", category: "Tools" }
    ],
    recommendedDisciplines: ["Electronics & Communication (ECE)", "Electrical Engineering (EEE)", "Microelectronics", "Computer Engineering"],
    averageSalaryIndia: "\u20B918.0 LPA - \u20B945.0 LPA (High Premium)",
    topRecruitersIndia: ["Qualcomm", "Intel", "Texas Instruments", "NVIDIA", "AMD"],
    growthOutlook: "+30% National Semiconductor Mission Demand",
    keyResponsibilities: [
      "Write modular, synthesizable SystemVerilog RTL models for multi-core processors and cache controllers",
      "Build comprehensive UVM verification testbenches with constrained-random stimulus and functional coverage",
      "Perform static timing analysis (STA) setup/hold closure across multi-corner operating temperatures"
    ],
    sampleJobTitles: ["ASIC Design Engineer", "RTL Design Engineer", "Design Verification (DV) Engineer", "Physical Design Lead"]
  },
  {
    id: "career-structural-lead-specialist",
    title: "Lead Structural & Smart Infrastructure Project Specialist",
    domain: "Structural Dynamics, High-Rise Engineering & Infrastructure",
    description: "Lead structural engineering analysis for high-rise towers, seismic retrofits, highway bridges, and large-scale smart urban infrastructure.",
    requiredSkills: [
      { name: "Structural Analysis (ETABS / STAAD.Pro / SAP2000)", importance: "high", category: "Analysis" },
      { name: "Reinforced Concrete & Steel Design Codes", importance: "high", category: "Codes" },
      { name: "Seismic & Wind Dynamic Load Modeling", importance: "high", category: "Dynamics" },
      { name: "BIM Integration (Autodesk Revit Structure)", importance: "medium", category: "BIM" },
      { name: "Geotechnical & Deep Foundation Systems", importance: "medium", category: "Foundations" }
    ],
    recommendedDisciplines: ["Civil Engineering", "Structural Engineering", "Infrastructure Engineering", "Architecture (M.Arch)"],
    averageSalaryIndia: "\u20B915.0 LPA - \u20B935.0 LPA (High Premium)",
    topRecruitersIndia: ["L&T Construction", "Tata Projects", "Afcons Infrastructure", "AECOM"],
    growthOutlook: "+22% Rapid Urbanization & Mega-Projects",
    keyResponsibilities: [
      "Model 40+ story high-rise structural frames in ETABS evaluating dynamic seismic shear and wind drift",
      "Optimize structural steel and reinforced concrete member dimensions reducing overall material consumption by 15%",
      "Review foundation geotechnical borehole reports and design pile caps for heavy transit viaducts"
    ],
    sampleJobTitles: ["Senior Structural Engineer", "Structural Project Lead", "Bridge Design Specialist", "BIM Structural Manager"]
  }
];
var SEED_COURSES = [
  {
    id: "course-sql-gfg",
    title: "SQL & Relational Databases for Tech & Analytics Placements",
    provider: "GeeksforGeeks / Striver Sheet",
    skill: "SQL",
    difficulty: "Beginner",
    duration: "3 Weeks (15 Hours)",
    rating: 4.9,
    url: "https://geeksforgeeks.org",
    type: "Interactive",
    domain: "Data Science & Analytics"
  },
  {
    id: "course-stats-nptel",
    title: "Data Analytics with Python & Applied Statistics",
    provider: "NPTEL / IIT Madras",
    skill: "Statistics",
    difficulty: "Intermediate",
    duration: "8 Weeks (Self-Paced)",
    rating: 4.8,
    url: "https://nptel.ac.in",
    type: "Course",
    domain: "Data Science & Analytics"
  },
  {
    id: "course-powerbi-microsoft",
    title: "Microsoft Power BI Data Analyst Associate (PL-300)",
    provider: "Microsoft Learn",
    skill: "Power BI",
    difficulty: "Beginner",
    duration: "4 Weeks (12 Hours)",
    rating: 4.8,
    url: "https://learn.microsoft.com",
    type: "Certification",
    domain: "Data Science & Analytics"
  },
  {
    id: "course-ros-robotics-iit",
    title: "ROS 2 & Industrial Robotics for Smart Manufacturing",
    provider: "NPTEL / Robotics Lab",
    skill: "ROS",
    difficulty: "Intermediate",
    duration: "6 Weeks (18 Hours)",
    rating: 4.9,
    url: "https://nptel.ac.in",
    type: "Course",
    domain: "Robotics, EV & Mechatronics"
  },
  {
    id: "course-revit-bim-autodesk",
    title: "Autodesk Revit BIM & Structural Drafting Certification",
    provider: "Autodesk Learning Academy",
    skill: "Revit",
    difficulty: "Beginner",
    duration: "5 Weeks (16 Hours)",
    rating: 4.8,
    url: "https://autodesk.com",
    type: "Certification",
    domain: "Civil Engineering & Smart Cities"
  },
  {
    id: "course-bioinformatics-ibab",
    title: "Genomics & Computational Biology Pipeline Programming",
    provider: "Genomics Academy / Coursera",
    skill: "Bioinformatics",
    difficulty: "Intermediate",
    duration: "6 Weeks (20 Hours)",
    rating: 4.9,
    url: "https://coursera.org",
    type: "Course",
    domain: "Biotechnology & Pharma Analytics"
  },
  {
    id: "course-fintech-zerodha-varsity",
    title: "Financial Modeling, DCF Valuation & Equity Markets",
    provider: "Zerodha Varsity",
    skill: "Financial Modeling",
    difficulty: "Intermediate",
    duration: "4 Weeks (Comprehensive)",
    rating: 4.95,
    url: "https://zerodha.com/varsity",
    type: "Tutorial",
    domain: "Commerce, Finance & FinTech"
  },
  {
    id: "course-embedded-c-arm",
    title: "Embedded Systems & Bare-Metal C for Semiconductor Placements",
    provider: "FastBit Embedded / Udemy",
    skill: "Embedded Systems",
    difficulty: "Intermediate",
    duration: "8 Weeks (30 Hours)",
    rating: 4.9,
    url: "https://udemy.com",
    type: "Course",
    domain: "Electronics, Semiconductors & Hardware"
  }
];
var SEED_PROJECTS = [
  {
    id: "proj-swiggy-zomato-analytics",
    title: "Quick-Commerce & Food Delivery Unit Economics Analytics Dashboard",
    domain: "Data Science & Analytics",
    targetCareer: "Data Analyst & Business Insights",
    difficulty: "Intermediate",
    description: "Process 500,000+ simulated delivery records in SQL & Python, calculate city-wise rider payout margins and late delivery penalties, and build an interactive Power BI dashboard.",
    keySkills: ["SQL", "Python", "Power BI", "Statistics"],
    deliverables: ["SQL analytical query script", "Jupyter exploratory data analysis notebook", "Live interactive Power BI dashboard with executive KPIs"],
    estimatedHours: 25
  },
  {
    id: "proj-tata-motors-ev-telemetry",
    title: "EV Battery Temperature Telemetry & Predictive Failure Model",
    domain: "Robotics, EV & Mechatronics",
    targetCareer: "Robotics & Industrial Automation Engineer",
    difficulty: "Advanced",
    description: "Build a Python & ROS node simulator capturing battery pack cell thermal data, identifying anomalous temperature spikes, and triggering automated safety shutdown loops.",
    keySkills: ["Python", "Robotics", "ROS", "Microcontrollers"],
    deliverables: ["ROS 2 package with publisher/subscriber nodes", "Thermal anomaly prediction script", "Architecture schematic documentation"],
    estimatedHours: 35
  },
  {
    id: "proj-lnt-metro-bim",
    title: "Metro Station Structural Framing & BIM Clash Detection in Autodesk Revit",
    domain: "Civil Engineering & Smart Cities",
    targetCareer: "BIM & Smart Infrastructure Coordinator",
    difficulty: "Intermediate",
    description: "Model elevated metro station viaduct piers in Autodesk Revit, execute load checks in STAAD.Pro per structural engineering standards (IS 456 / Eurocode), and resolve 3D pipeline clashes.",
    keySkills: ["Revit", "STAAD Pro", "Structural Analysis", "AutoCAD"],
    deliverables: ["Revit 3D structural model (.rvt)", "STAAD.Pro load analysis calculation sheet", "Bill of Quantities (BOQ) concrete estimation spreadsheet"],
    estimatedHours: 30
  },
  {
    id: "proj-biocon-rna-seq",
    title: "Biocon Breast Cancer RNA-Sequencing Biomarker Discovery Pipeline",
    domain: "Biotechnology & Pharma Analytics",
    targetCareer: "Bioinformatics & Genomic Data Scientist",
    difficulty: "Advanced",
    description: "Process patient cohort genomic sequencing FASTQ reads in Python and R (DESeq2), discovering 14 statistically significant drug target markers.",
    keySkills: ["Bioinformatics", "R Programming", "Genomics", "Python"],
    deliverables: ["R markdown reproducible analysis notebook", "Volcano plots and gene ontology heatmaps", "Placement portfolio summary report"],
    estimatedHours: 28
  },
  {
    id: "proj-zerodha-algo-backtest",
    title: "Nifty 50 Algorithmic Momentum Trading & Risk Model in Python",
    domain: "Commerce, Finance & FinTech",
    targetCareer: "Financial & FinTech Analytics Specialist",
    difficulty: "Intermediate",
    description: "Pull 5 years of historical stock quotes, calculate Moving Average Convergence Divergence (MACD) and Value at Risk (VaR), and build a dynamic DCF financial valuation model in Excel.",
    keySkills: ["Financial Modeling", "Excel", "Python", "SQL"],
    deliverables: ["Excel three-statement DCF valuation model with scenario toggles", "Python backtesting notebook with Sharpe ratio metrics"],
    estimatedHours: 24
  }
];
var SEED_ROADMAPS = [
  {
    id: "roadmap-rohan-mechanical",
    userId: "user-rohan-mechanical",
    careerId: "career-data-analyst",
    careerTitle: "Data Analyst & Business Insights",
    progressPercent: 40,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    steps: [
      {
        id: "step-1",
        phase: 1,
        title: "Phase 1: Leverage Engineering Math for Business Statistics",
        description: "Bridge your mechanical engineering calculus and probability background into business hypothesis testing, variance, and p-value decision analysis.",
        skillsCovered: ["Statistics", "Excel"],
        estimatedWeeks: 3,
        completed: true,
        recommendedResources: [
          { title: "NPTEL Data Analytics with Python (IIT Madras)", type: "Course" },
          { title: "Excel Advanced Power Query & Pivot Formulas", type: "Tutorial" }
        ]
      },
      {
        id: "step-2",
        phase: 2,
        title: "Phase 2: Relational Databases & SQL for Campus Placement Tests",
        description: "Master medium-to-hard SQL queries (JOINs, Window Functions: RANK, DENSE_RANK, LEAD, LAG, and CTEs) frequently asked in technical placement rounds.",
        skillsCovered: ["SQL"],
        estimatedWeeks: 3,
        completed: true,
        recommendedResources: [
          { title: "GeeksforGeeks Top 50 SQL Placement Questions", type: "Interactive" },
          { title: "LeetCode Database Practice Problems", type: "Interactive" }
        ]
      },
      {
        id: "step-3",
        phase: 3,
        title: "Phase 3: Executive BI Dashboards (Power BI / Tableau)",
        description: "Learn DAX formulas, star schema data modeling, and build interactive KPI dashboards demonstrating business acumen for modern e-commerce / manufacturing use cases.",
        skillsCovered: ["Power BI", "Tableau"],
        estimatedWeeks: 3,
        completed: false,
        recommendedResources: [
          { title: "Microsoft Power BI Certified Associate (PL-300)", type: "Certification" }
        ]
      },
      {
        id: "step-4",
        phase: 4,
        title: "Phase 4: Python for Automated Data Wrangling (Pandas & NumPy)",
        description: "Clean messy real-world datasets, handle missing values, and automate scheduled data extraction scripts.",
        skillsCovered: ["Python", "Pandas"],
        estimatedWeeks: 3,
        completed: false,
        recommendedResources: [
          { title: "Kaggle Python Data Analysis Micro-Courses", type: "Interactive" }
        ]
      },
      {
        id: "step-5",
        phase: 5,
        title: "Phase 5: High-Growth E-Commerce / EV Capstone Project Artifact",
        description: "Publish an end-to-end GitHub project repository with live dashboard link. Add bullet points with measurable % impact to your ATS resume.",
        skillsCovered: ["SQL", "Power BI", "Git"],
        estimatedWeeks: 4,
        completed: false,
        recommendedResources: [
          { title: "Swiggy / Zomato Unit Economics Capstone", type: "Project" }
        ]
      },
      {
        id: "step-6",
        phase: 6,
        title: "Phase 6: Campus Technical, Managerial & HR Round Preparation",
        description: 'Master the classic "Why IT/Analytics after Mechanical?" question, communicate project trade-offs with confidence, and practice guesstimate and puzzle rounds.',
        skillsCovered: ["Communication", "Problem Solving"],
        estimatedWeeks: 2,
        completed: false,
        recommendedResources: [
          { title: "AI Skill Mentor Placement Mock Studio", type: "Interactive" }
        ]
      }
    ]
  }
];
var INTERVIEW_QUESTIONS_BANK = {
  "Data Analyst & Business Insights": [
    {
      question: "Explain the difference between WHERE and HAVING in SQL with a practical example from an e-commerce order table.",
      type: "Technical",
      expectedKeyPoints: ["WHERE filters rows before aggregation", "HAVING filters grouped records after GROUP BY", "Example with SUM(order_amount) > 10000"]
    },
    {
      question: "You are from a core branch (Mechanical/Civil/Electrical). Why do you want to join an Analytics/Software company instead of core engineering?",
      type: "HR",
      expectedKeyPoints: ["Highlight strong mathematical and analytical problem-solving foundation", "Explain how engineering coursework involved data modeling and quantitative reasoning", "Show passion through self-learned projects, certifications, and GitHub portfolio"]
    },
    {
      question: "Guesstimate: Estimate the daily number of food orders placed on Swiggy/Zomato in Bengaluru.",
      type: "Aptitude & Core",
      expectedKeyPoints: ["Top-down or bottom-up population breakdown (1.3 crore population)", "Working professional demographic filter (25-35 age bracket)", "Meal frequency assumption (lunch vs dinner) and market share split"]
    },
    {
      question: "Describe a situation during your college final year project where team members had conflicting ideas. How did you resolve it and deliver on time?",
      type: "Managerial",
      expectedKeyPoints: ["Objectively evaluated technical trade-offs with data", "Divided modular responsibilities based on individual strengths", "Delivered final project before university submission deadline"]
    }
  ],
  "Bioinformatics & Genomic Data Scientist": [
    {
      question: "How do you perform quality check (QC) on raw sequencing data in a modern genomics lab, and what tool do you use?",
      type: "Technical",
      expectedKeyPoints: ["FastQC metrics and Phred quality scores (> Q30)", "Trimming adapters using Cutadapt / Trimmomatic", "Evaluating GC bias and sequence duplication"]
    },
    {
      question: "Why do you want to join Biocon or Dr. Reddy's over academic PhD research at this stage of your career?",
      type: "HR",
      expectedKeyPoints: ["Desire to see research translated into real clinical therapeutics for millions of patients worldwide", "Excited by high-throughput enterprise bioinformatics infrastructure", "Long-term goal of driving global biopharma innovation"]
    }
  ],
  "Robotics & Industrial Automation Engineer": [
    {
      question: "Can you explain the difference between a microcontroller (like STM32 / Arduino) and an industrial PLC used on modern plant assembly lines?",
      type: "Technical",
      expectedKeyPoints: ["PLCs designed for harsh industrial electromagnetic environments, 24V I/O, and safety fail-safes", "Ladder logic / Structured Text programming vs bare-metal C/C++", "Deterministic cycle scan times and modular expansion racks"]
    },
    {
      question: "How would you troubleshoot an unexpected emergency stop triggered on an automated EV battery pack welding line?",
      type: "Aptitude & Core",
      expectedKeyPoints: ["Check safety relay and light curtain interlocks first", "Inspect PLC diagnostic alarms and error codes on HMI screen", "Test sensor signals with multimeter before resetting"]
    }
  ],
  "Default": [
    {
      question: "Introduce yourself, your academic college background, and why you are targeting this specific role.",
      type: "HR",
      expectedKeyPoints: ["Brief academic summary and college name", "Key practical projects built outside college syllabus", "Genuine enthusiasm for this industry"]
    },
    {
      question: "Tell me about a challenging technical roadblock you encountered in your projects and how you solved it.",
      type: "Technical",
      expectedKeyPoints: ["STAR format (Situation, Task, Action, Result)", "Exact technical steps you took", "Measurable outcome and learning"]
    },
    {
      question: "Are you comfortable with relocating or working in a hybrid environment if required by the company?",
      type: "HR",
      expectedKeyPoints: ["Positive openness to relocation and working in top tech hubs", "Excitement about working in dynamic collaborative teams"]
    }
  ]
};
function initDB() {
  if (DB.users.length === 0) {
    DB.users = [...SEED_USERS];
    DB.careers = [...SEED_CAREERS];
    DB.courses = [...SEED_COURSES];
    DB.projects = [...SEED_PROJECTS];
    DB.roadmaps = [...SEED_ROADMAPS];
  }
}
initDB();

// server/ml/skillExtractor.ts
var SKILL_TAXONOMY = {
  // Software / Data / AI
  "python": { category: "technical", domain: "Data Science & Software" },
  "sql": { category: "technical", domain: "Data & Databases", aliases: ["postgresql", "mysql", "sqlite", "t-sql"] },
  "pandas": { category: "tool", domain: "Data Science" },
  "numpy": { category: "tool", domain: "Data Science" },
  "scikit-learn": { category: "tool", domain: "Machine Learning", aliases: ["sklearn"] },
  "machine learning": { category: "domain", domain: "AI & Data Science", aliases: ["ml"] },
  "deep learning": { category: "domain", domain: "AI & Data Science" },
  "tableau": { category: "tool", domain: "Business Intelligence" },
  "power bi": { category: "tool", domain: "Business Intelligence", aliases: ["powerbi"] },
  "excel": { category: "tool", domain: "Business & Analytics", aliases: ["ms excel", "microsoft excel", "spreadsheets"] },
  "statistics": { category: "domain", domain: "Mathematics & Data", aliases: ["statistical modeling", "hypothesis testing"] },
  "r programming": { category: "technical", domain: "Data Science", aliases: ["r language", " r "] },
  "javascript": { category: "technical", domain: "Software Engineering", aliases: ["js", "es6"] },
  "typescript": { category: "technical", domain: "Software Engineering", aliases: ["ts"] },
  "react": { category: "tool", domain: "Software Engineering", aliases: ["reactjs", "react.js"] },
  "node.js": { category: "tool", domain: "Software Engineering", aliases: ["nodejs", "node"] },
  "git": { category: "tool", domain: "Software Engineering", aliases: ["github", "version control", "gitlab"] },
  "docker": { category: "tool", domain: "DevOps & Cloud" },
  "kubernetes": { category: "tool", domain: "DevOps & Cloud", aliases: ["k8s"] },
  "aws": { category: "tool", domain: "Cloud Computing", aliases: ["amazon web services"] },
  "azure": { category: "tool", domain: "Cloud Computing" },
  "c++": { category: "technical", domain: "Systems Engineering", aliases: ["cpp"] },
  "java": { category: "technical", domain: "Software Engineering" },
  // Mechanical / Automation / Robotics
  "solidworks": { category: "tool", domain: "Mechanical & Design" },
  "autocad": { category: "tool", domain: "Engineering CAD" },
  "ansys": { category: "tool", domain: "Mechanical Simulation", aliases: ["fea", "finite element analysis"] },
  "matlab": { category: "tool", domain: "Engineering Computation" },
  "simulink": { category: "tool", domain: "Control Systems" },
  "robotics": { category: "domain", domain: "Robotics & Automation" },
  "ros": { category: "tool", domain: "Robotics", aliases: ["robot operating system"] },
  "thermodynamics": { category: "domain", domain: "Mechanical Engineering" },
  "fluid mechanics": { category: "domain", domain: "Mechanical Engineering", aliases: ["cfd", "computational fluid dynamics"] },
  "plc programming": { category: "technical", domain: "Industrial Automation", aliases: ["ladder logic", "scada"] },
  "cnc machining": { category: "technical", domain: "Manufacturing" },
  "geometric dimensioning and tolerancing": { category: "technical", domain: "Mechanical Engineering", aliases: ["gd&t"] },
  // Civil & Structural & Architecture
  "revit": { category: "tool", domain: "Civil & Architecture", aliases: ["bim", "building information modeling"] },
  "staad pro": { category: "tool", domain: "Structural Engineering", aliases: ["staad.pro", "staad"] },
  "etabs": { category: "tool", domain: "Structural Engineering" },
  "structural analysis": { category: "domain", domain: "Civil Engineering" },
  "gis": { category: "tool", domain: "Geotechnical & Planning", aliases: ["arcgis", "qgis"] },
  "geotechnical engineering": { category: "domain", domain: "Civil Engineering" },
  "surveying": { category: "technical", domain: "Civil Engineering", aliases: ["total station"] },
  "construction management": { category: "domain", domain: "Civil Engineering", aliases: ["primavera", "project scheduling"] },
  // Electrical & Electronics
  "embedded systems": { category: "domain", domain: "Electronics & Firmware" },
  "pcb design": { category: "technical", domain: "Hardware Engineering", aliases: ["altium", "eagle pcb", "kicad"] },
  "verilog": { category: "technical", domain: "VLSI & Hardware", aliases: ["vhdl", "fpga"] },
  "microcontrollers": { category: "technical", domain: "Embedded Systems", aliases: ["arduino", "esp32", "stm32", "arm cortex"] },
  "iot": { category: "domain", domain: "Internet of Things" },
  "signal processing": { category: "domain", domain: "Electrical Engineering", aliases: ["dsp"] },
  // Biotech & Biomedical & Healthcare
  "bioinformatics": { category: "domain", domain: "Biotechnology" },
  "pcr": { category: "technical", domain: "Molecular Biology", aliases: ["qpcr", "polymerase chain reaction"] },
  "genomics": { category: "domain", domain: "Life Sciences", aliases: ["next generation sequencing", "ngs"] },
  "biostatistics": { category: "domain", domain: "Healthcare & Life Sciences" },
  "clinical trials": { category: "domain", domain: "Biomedical & Pharma", aliases: ["gcp", "good clinical practice"] },
  "molecular cloning": { category: "technical", domain: "Biotechnology" },
  "medical imaging": { category: "domain", domain: "Biomedical Engineering", aliases: ["dicom", "mri analysis"] },
  "biomaterials": { category: "domain", domain: "Biomedical Engineering" },
  "health informatics": { category: "domain", domain: "Healthcare Technology", aliases: ["ehr", "hl7", "fhir"] },
  // Business, Finance, Commerce & Product
  "financial modeling": { category: "technical", domain: "Finance" },
  "corporate finance": { category: "domain", domain: "Finance" },
  "accounting": { category: "technical", domain: "Commerce & Finance", aliases: ["gaap", "ifrs", "general ledger"] },
  "business analysis": { category: "domain", domain: "Business & Operations", aliases: ["requirements gathering", "gap analysis"] },
  "product management": { category: "domain", domain: "Product & Tech", aliases: ["roadmapping", "user stories", "agile", "scrum"] },
  "digital marketing": { category: "domain", domain: "Marketing & Media", aliases: ["seo", "sem", "google analytics"] },
  "market research": { category: "domain", domain: "Business & Strategy" },
  "supply chain management": { category: "domain", domain: "Operations", aliases: ["logistics", "inventory management"] },
  "risk management": { category: "domain", domain: "Finance & Governance" },
  // Design, UX & Humanities
  "ui/ux design": { category: "domain", domain: "Design", aliases: ["ux design", "ui design", "user experience"] },
  "figma": { category: "tool", domain: "Design", aliases: ["figma design"] },
  "user research": { category: "technical", domain: "Design & Human Factors", aliases: ["usability testing", "user interviews"] },
  "wireframing": { category: "technical", domain: "Design", aliases: ["prototyping"] },
  "content strategy": { category: "domain", domain: "Communications & Media", aliases: ["copywriting", "editorial"] },
  "public speaking": { category: "soft", domain: "Interpersonal" },
  "communication": { category: "soft", domain: "Core Skills", aliases: ["written communication", "verbal communication"] },
  "problem solving": { category: "soft", domain: "Core Skills", aliases: ["analytical thinking", "critical thinking"] },
  "teamwork": { category: "soft", domain: "Core Skills", aliases: ["collaboration", "cross-functional collaboration"] },
  "leadership": { category: "soft", domain: "Core Skills", aliases: ["mentorship", "team leadership"] },
  "time management": { category: "soft", domain: "Core Skills", aliases: ["prioritization", "agile execution"] }
};
var STOPWORDS = /* @__PURE__ */ new Set([
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "aren't",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "can",
  "cannot",
  "could",
  "did",
  "do",
  "does",
  "doing",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "has",
  "have",
  "having",
  "he",
  "her",
  "here",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "itself",
  "let",
  "me",
  "more",
  "most",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "she",
  "should",
  "so",
  "some",
  "such",
  "than",
  "that",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "with",
  "would",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves"
]);
function tokenize(text) {
  return text.toLowerCase().replace(/[^\w\s\+\#\.\-]/g, " ").split(/\s+/).filter((token) => token.length > 1 && !STOPWORDS.has(token));
}
function generateNGrams(tokens, maxN = 3) {
  const ngrams = [];
  for (let n = 1; n <= maxN; n++) {
    for (let i = 0; i <= tokens.length - n; i++) {
      ngrams.push(tokens.slice(i, i + n).join(" "));
    }
  }
  return ngrams;
}
function computeTF(terms) {
  const counts = {};
  for (const term of terms) {
    counts[term] = (counts[term] || 0) + 1;
  }
  const total = terms.length || 1;
  const tf = {};
  for (const [term, count] of Object.entries(counts)) {
    tf[term] = count / total;
  }
  return tf;
}
function extractSkillsNLP(rawText) {
  if (!rawText || typeof rawText !== "string") return [];
  const lower = rawText.toLowerCase();
  const tokens = tokenize(rawText);
  const ngrams = generateNGrams(tokens, 3);
  const tf = computeTF(ngrams);
  const matchedSkills = /* @__PURE__ */ new Map();
  for (const [canonicalName, meta] of Object.entries(SKILL_TAXONOMY)) {
    const candidates = [canonicalName, ...meta.aliases || []];
    let foundFrequency = 0;
    for (const cand of candidates) {
      const escaped = cand.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(`(?:^|[^a-zA-Z0-9_#+])${escaped}(?:$|[^a-zA-Z0-9_#+])`, "gi");
      const matches = lower.match(regex);
      if (matches) {
        foundFrequency += matches.length;
      }
    }
    if (foundFrequency > 0) {
      const specificity = Math.min(1, 0.6 + canonicalName.length / 30);
      const freqBonus = Math.min(0.3, foundFrequency * 0.08);
      const confidence = Math.min(0.99, Number((specificity + freqBonus).toFixed(2)));
      const termTf = tf[canonicalName.toLowerCase()] || foundFrequency / (tokens.length || 1);
      const pseudoIdf = Math.log(100 / (canonicalName.length < 4 ? 20 : 5));
      const tfidf = Number((termTf * pseudoIdf * 100).toFixed(3));
      const displayName = canonicalName.split(" ").map((w) => w === "ai" || w === "sql" || w === "plc" || w === "bim" || w === "pcb" || w === "iot" || w === "gis" || w === "cad" || w === "ros" ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      matchedSkills.set(canonicalName, {
        name: displayName,
        category: meta.category,
        confidence,
        frequency: foundFrequency,
        tfidfScore: tfidf
      });
    }
  }
  return Array.from(matchedSkills.values()).sort((a, b) => b.confidence - a.confidence || b.frequency - a.frequency);
}

// server/ml/recommender.ts
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}
function calculateCosineSimilarity(userVector, targetVector) {
  if (userVector.length !== targetVector.length || userVector.length === 0) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < userVector.length; i++) {
    dotProduct += userVector[i] * targetVector[i];
    normA += userVector[i] * userVector[i];
    normB += targetVector[i] * targetVector[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
function evaluateDisciplineSynergy(userBranch, userDegree = "", careerDomain, recommendedDisciplines = [], userInterests = []) {
  const branch = (userBranch || "").toLowerCase();
  const degree = (userDegree || "").toLowerCase();
  const domain = (careerDomain || "").toLowerCase();
  const disciplines = (recommendedDisciplines || []).map((d) => d.toLowerCase());
  const interests = (userInterests || []).map((i) => i.toLowerCase());
  if (branch) {
    const isDirectDiscipline = disciplines.some(
      (d) => d.includes(branch) || branch.includes(d) || branch.includes("mech") && (d.includes("mech") || d.includes("auto") || d.includes("production")) || branch.includes("civil") && (d.includes("civil") || d.includes("struct") || d.includes("construction")) || (branch.includes("comput") || branch.includes("it") || branch.includes("software")) && (d.includes("comput") || d.includes("bca") || d.includes("it") || d.includes("software")) || (branch.includes("elect") || branch.includes("ece") || branch.includes("eee")) && (d.includes("elect") || d.includes("ece") || d.includes("hardware")) || branch.includes("bio") && (d.includes("bio") || d.includes("life science")) || (branch.includes("comm") || branch.includes("bba") || branch.includes("mba") || branch.includes("econ")) && (d.includes("comm") || d.includes("bba") || d.includes("business") || d.includes("finance"))
    );
    if (isDirectDiscipline) return 0.98;
  }
  if (disciplines.some((d) => d.includes("any engineering") || d.includes("any major") || d.includes("any graduate"))) {
    if (degree.includes("b.tech") || degree.includes("b.e") || degree.includes("diploma") || branch.includes("eng")) {
      return 0.92;
    }
    return 0.85;
  }
  if (branch && domain.includes(branch.slice(0, 5))) return 0.95;
  if ((branch.includes("mechanical") || branch.includes("civil") || branch.includes("electrical") || branch.includes("chemical") || branch.includes("physics")) && (domain.includes("data") || domain.includes("software") || domain.includes("automation") || domain.includes("ai") || domain.includes("operations"))) {
    return 0.85;
  }
  if ((branch.includes("bio") || branch.includes("medic") || branch.includes("health") || branch.includes("chem")) && (domain.includes("bio") || domain.includes("health") || domain.includes("data") || domain.includes("clinical"))) {
    return 0.9;
  }
  if ((branch.includes("commerce") || branch.includes("business") || branch.includes("finance") || branch.includes("econ")) && (domain.includes("finance") || domain.includes("product") || domain.includes("consulting") || domain.includes("business") || domain.includes("operations") || domain.includes("marketing"))) {
    return 0.9;
  }
  let interestScore = 0.45;
  for (const interest of interests) {
    if (domain.includes(interest) || interest.includes(domain.slice(0, 4))) {
      interestScore = Math.max(interestScore, 0.82);
    }
  }
  return interestScore;
}
function rankCareersForUser(user, allCareers) {
  const userSkills = (user.skills || []).map(normalize);
  const userInterests = (user.interests || []).map(normalize);
  const userBranch = user.education?.branch || "";
  const userDegree = user.education?.degree || "";
  const preferredGoal = (user.careerGoal || "").toLowerCase();
  const results = allCareers.map((career) => {
    const required = career.requiredSkills || [];
    const matchedSkills = [];
    const missingSkills = [];
    const targetVector = [];
    const userVector = [];
    required.forEach((skill) => {
      const weight = skill.importance === "high" ? 3 : skill.importance === "medium" ? 2 : 1;
      targetVector.push(weight);
      const normSkill = normalize(skill.name);
      const isMatched = userSkills.some((us) => us.includes(normSkill) || normSkill.includes(us));
      if (isMatched) {
        userVector.push(weight);
        matchedSkills.push(skill.name);
      } else {
        userVector.push(0);
        missingSkills.push({
          name: skill.name,
          importance: skill.importance,
          reason: `Crucial for ${career.title} workflows in ${skill.category}.`
        });
      }
    });
    const cosine = calculateCosineSimilarity(userVector, targetVector);
    const skillMatchPercent = Math.round(cosine * 100);
    const careerText = `${career.title} ${career.domain} ${career.description}`.toLowerCase();
    let interestHits = 0;
    userInterests.forEach((interest) => {
      if (careerText.includes(interest)) interestHits++;
    });
    const interestAlignmentScore = userInterests.length > 0 ? Math.min(100, Math.round(interestHits / Math.max(1, userInterests.length) * 100 + 40)) : 60;
    const eduSynergy = evaluateDisciplineSynergy(
      userBranch,
      userDegree,
      career.domain,
      career.recommendedDisciplines,
      user.interests || []
    );
    const educationRelevanceScore = Math.round(eduSynergy * 100);
    const isDirectGoal = preferredGoal && (normalize(career.title).includes(normalize(preferredGoal)) || normalize(preferredGoal).includes(normalize(career.title)));
    const preferenceBonus = isDirectGoal ? 15 : 0;
    let branchPriorityBonus = 0;
    if (userBranch) {
      if (educationRelevanceScore >= 95) {
        branchPriorityBonus = 22;
      } else if (educationRelevanceScore >= 80) {
        branchPriorityBonus = 8;
      }
    }
    let overallScore = Math.round(
      skillMatchPercent * 0.35 + educationRelevanceScore * 0.35 + interestAlignmentScore * 0.15 + preferenceBonus + branchPriorityBonus
    );
    overallScore = Math.max(25, Math.min(99, overallScore));
    const isCrossDiscipline = userBranch ? !career.recommendedDisciplines.some((d) => d.toLowerCase().includes(userBranch.toLowerCase())) : false;
    let matchExplanation = "";
    if (isDirectGoal) {
      matchExplanation = `Direct match for your stated career goal. You already possess ${matchedSkills.length} key foundational competencies with clear runway to close ${missingSkills.length} skill gaps.`;
    } else if (educationRelevanceScore >= 95) {
      matchExplanation = `Core discipline match for your ${userBranch || "field"} background. Your coursework gives you an immediate competitive advantage for ${career.title}.`;
    } else if (isCrossDiscipline) {
      matchExplanation = `High-potential interdisciplinary bridge: your ${userBranch || "academic"} foundation and quantitative problem solving provide strong transferability to ${career.title}.`;
    } else {
      matchExplanation = `Natural progression from your ${userBranch || "field"} studies. Your existing skills in ${matchedSkills.slice(0, 3).join(", ") || "core principles"} establish strong foundational momentum.`;
    }
    return {
      career,
      overallScore,
      skillMatchPercent,
      interestAlignmentScore,
      educationRelevanceScore,
      matchedSkills,
      missingSkills,
      matchExplanation,
      isCrossDiscipline
    };
  });
  return results.sort((a, b) => {
    const aIsGoal = preferredGoal && (normalize(a.career.title).includes(normalize(preferredGoal)) || normalize(preferredGoal).includes(normalize(a.career.title)));
    const bIsGoal = preferredGoal && (normalize(b.career.title).includes(normalize(preferredGoal)) || normalize(preferredGoal).includes(normalize(b.career.title)));
    if (aIsGoal && !bIsGoal) return -1;
    if (!aIsGoal && bIsGoal) return 1;
    if (a.educationRelevanceScore >= 95 && b.educationRelevanceScore < 95) return -1;
    if (a.educationRelevanceScore < 95 && b.educationRelevanceScore >= 95) return 1;
    return b.overallScore - a.overallScore;
  });
}
function performSkillGapAnalysis(userSkills, targetCareer) {
  const normUserSkills = userSkills.map(normalize);
  const matched = [];
  const missing = [];
  let totalWeight = 0;
  let earnedWeight = 0;
  for (const skill of targetCareer.requiredSkills) {
    const w = skill.importance === "high" ? 3 : skill.importance === "medium" ? 2 : 1;
    totalWeight += w;
    const normSkill = normalize(skill.name);
    const hasSkill = normUserSkills.some((us) => us.includes(normSkill) || normSkill.includes(us));
    if (hasSkill) {
      matched.push(skill.name);
      earnedWeight += w;
    } else {
      missing.push({
        name: skill.name,
        importance: skill.importance,
        category: skill.category,
        whyNeeded: skill.importance === "high" ? `Primary technical requirement for day-to-day ${targetCareer.title} responsibilities.` : `High-leverage differentiator in candidate selection and workplace execution.`
      });
    }
  }
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  missing.sort((a, b) => priorityOrder[a.importance] - priorityOrder[b.importance]);
  const matchPercent = totalWeight > 0 ? Math.round(earnedWeight / totalWeight * 100) : 0;
  return {
    careerTitle: targetCareer.title,
    domain: targetCareer.domain,
    skillMatchPercentage: matchPercent,
    matchedSkills: matched,
    missingSkills: missing,
    readinessLevel: matchPercent >= 75 ? "Job Ready / Advanced" : matchPercent >= 45 ? "Intermediate / Strong Foundation" : "Early Stage / Foundational Growth"
  };
}

// server/ml/rag.ts
var KNOWLEDGE_BASE = [
  {
    id: "kb-placement-structure",
    category: "placement",
    title: "Modern Campus Placement & Hiring Pipeline Stages",
    content: 'Recruitment across tech and analytics companies follows a structured 4-stage pipeline: 1) Online Assessment (OA) covering Quantitative Aptitude, Logical Reasoning, and 2-3 LeetCode style DSA or SQL coding questions, 2) Technical Round 1 focusing on Core CS fundamentals (DBMS, SQL, OOPs, OS) and deep dive into Resume Projects, 3) Technical Round 2 covering system design or live problem solving, and 4) Managerial & HR Round evaluating cultural fit, willingness to relocate to major tech hubs, and the classic "Why IT/Analytics after your core branch?".',
    tags: ["campus placement", "online assessment", "aptitude", "technical round", "hr round", "interview"]
  },
  {
    id: "kb-tier3-to-product-roadmap",
    category: "career",
    title: "Proven Strategy to Secure High-Paying Product Company Offers",
    content: "Students from all college backgrounds can secure high-paying product company roles (\u20B910 - \u20B925+ LPA) by executing a 3-pillar strategy: 1) Build 2 distinctive full-stack or analytics projects with live deployed URLs on Vercel/Render rather than generic clone tutorials, 2) Reach out on professional networks with concise, customized referral pitches directly to engineering managers and alumni, and 3) Consistently solve Medium difficulty questions on LeetCode/GeeksforGeeks while maintaining college CGPA above 7.5 to satisfy automated cutoff filters.",
    tags: ["off-campus", "referral", "linkedin", "product companies", "high lpa"]
  },
  {
    id: "kb-core-to-it-transition",
    category: "career",
    title: "Core Engineering (Mechanical, Civil, Electrical, Biotech) to Tech & Data Transition",
    content: "Leading employers actively hire non-CS students who can demonstrate mathematical problem solving. Mechanical and Civil students have strong calculus and linear algebra foundations that translate seamlessly into Data Analytics and EV automation. In interviews, frame your core branch as a strength: highlight your ability to model complex physical systems and explain that programming is your chosen tool to scale analytical impact.",
    tags: ["core to it", "mechanical", "civil", "data science", "switch career", "analytics"]
  },
  {
    id: "kb-ats-resume-standards",
    category: "skill",
    title: "ATS Resume Best Practices for Fast Candidate Screening",
    content: 'Corporate recruiters spend less than 8 seconds per resume during high-volume recruitment drives. Best practices: 1) Keep strictly to 1 page, 2) Include GitHub and LinkedIn hyperlinks at the top, 3) State your Degree, College, and CGPA clearly, 4) Under Projects, use the XYZ formula (Accomplished [X], as measured by [Y], by doing [Z]), e.g., "Accelerated SQL query speeds by 38% for a food delivery dataset using indexed joins", 5) Avoid multi-column graphical designs or photo tables that choke corporate ATS software.',
    tags: ["resume", "ats score", "cgpa", "projects", "github"]
  },
  {
    id: "kb-bioinformatics-industry",
    category: "career",
    title: "Bioinformatics & Computational Biology in the Healthcare & Pharma Ecosystem",
    content: "With rapidly growing biopharma and genome centers, there is immense demand for students who can bridge molecular biology with Python and R pipelines. Students with B.Sc/B.Tech Biotech degrees who learn Python, Biopython, and RNA-seq analysis command \u20B96 LPA to \u20B914 LPA entry packages.",
    tags: ["bioinformatics", "biotechnology", "genomics", "pharma"]
  },
  {
    id: "kb-ev-robotics-industry",
    category: "career",
    title: "Electric Vehicles (EV) & Industrial Robotics Revolution",
    content: "With the rapid expansion of EV and robotics companies, mechanical and electrical engineering students are in high demand for EV Powertrain telemetry, battery management systems (BMS), PLC automation, and ROS programming. Starting packages range from \u20B96 LPA to \u20B916 LPA with high upward trajectory.",
    tags: ["ev", "robotics", "mechanical", "automation"]
  }
];
function createVocabulary(docs) {
  const vocabSet = /* @__PURE__ */ new Set();
  for (const doc of docs) {
    const text = `${doc.title} ${doc.content} ${doc.tags.join(" ")}`;
    tokenize(text).forEach((t) => vocabSet.add(t));
  }
  return Array.from(vocabSet);
}
var GLOBAL_VOCABULARY = createVocabulary(KNOWLEDGE_BASE);
function vectorizeText(text, vocabulary) {
  const tokens = tokenize(text);
  const tf = computeTF(tokens);
  return vocabulary.map((term) => tf[term] || 0);
}
var DOCUMENT_VECTORS = KNOWLEDGE_BASE.map((doc) => {
  const fullText = `${doc.title} ${doc.content} ${doc.tags.join(" ")}`;
  return {
    doc,
    vector: vectorizeText(fullText, GLOBAL_VOCABULARY)
  };
});
function retrieveRelevantKnowledge(query, topK = 3) {
  const queryVector = vectorizeText(query, GLOBAL_VOCABULARY);
  const scored = DOCUMENT_VECTORS.map((item) => {
    const similarity = calculateCosineSimilarity(queryVector, item.vector);
    return {
      document: item.doc,
      similarityScore: Number(similarity.toFixed(4))
    };
  });
  scored.sort((a, b) => b.similarityScore - a.similarityScore);
  return scored.slice(0, topK);
}

// server/gemini.ts
import { GoogleGenAI, Type } from "@google/genai";
var apiKey = process.env.GEMINI_API_KEY || "";
var ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
var MODEL_NAME = "gemini-3.8-flash";
async function generateChatResponse(userMessage, userProfileSummary, ragContext) {
  if (!apiKey) {
    return `Hello! Based on your profile (${userProfileSummary}):

${ragContext ? `Referenced Industry Insights:
${ragContext}

` : ""}For successful career placements and recruitment drives, prioritize: 1) Strong problem-solving foundations (SQL/Python/Data Structures), 2) Building 2 polished capstone projects with live deployed links, and 3) Preparing structured STAR-format answers for managerial and HR rounds. You can achieve strong compensation packages (\u20B96 - \u20B920+ LPA) with steady and consistent preparation.`;
  }
  try {
    const prompt = `You are "AI Skill Mentor", an elite Career Advisor & Placement Mentor for ambitious students and freshers.
You understand modern university education and industry hiring standards:
- Degree backgrounds: Engineering (Mechanical, Civil, Biotech, ECE, CSE), BCA/MCA, B.Sc, B.Com, BBA, etc.
- Top hiring employers: Product tech firms, Analytics agencies, Core engineering giants, and Global enterprise consulting firms.
- Compensation benchmarks: Always speak in terms of INR Lakhs Per Annum (LPA, e.g. \u20B96 LPA - \u20B918 LPA).

Student Profile:
${userProfileSummary}

Grounding Knowledge Base (Retrieved Facts):
${ragContext}

Student's Question:
"${userMessage}"

Instructions:
1. Provide a sharp, highly encouraging, and actionable answer tailored specifically to career placement drives and competitive hiring.
2. If they are from a core branch (Mechanical, Civil, Biotech, Commerce) asking to transition to Software/Data, explain how to leverage transferable analytical strengths and articulate them convincingly.
3. Recommend specific practical learning resources (GeeksforGeeks, LeetCode, Coursera, freeCodeCamp) and hands-on project ideas.
4. Keep the tone empathetic, practical, and structured (2-3 concise paragraphs with bullet points). Avoid generic fluff.`;
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: "You are AI Skill Mentor, a premier career and campus placement advisor. Provide realistic, strategic guidance aligned with modern hiring standards and competitive compensation benchmarks.",
        temperature: 0.7
      }
    });
    return response.text || "Prepare structured projects with measurable metrics, master SQL/Python fundamentals, and practice technical communication for your placement rounds.";
  } catch (error) {
    console.error("Gemini chat generation error:", error);
    return `Regarding your career query: With your background in ${userProfileSummary}, focus on building 1 solid capstone project and mastering core domain fundamentals. In technical recruitment drives, demonstrating practical curiosity and structured problem-solving is what distinguishes top candidates.`;
  }
}
async function evaluateInterviewAnswer(career, question, questionType, expectedPoints, userAnswer) {
  if (!apiKey) {
    const wordCount = userAnswer.trim().split(/\s+/).length;
    const baseScore = Math.min(88, Math.max(65, 60 + Math.round(wordCount * 0.4)));
    return {
      score: baseScore,
      feedback: `Good attempt for this ${questionType} round question. You addressed the core premise well.`,
      strengths: ["Directly answered the question", "Clear communication"],
      improvements: ["Include specific technical metrics or project references", "Follow the STAR format (Situation, Task, Action, Result)"]
    };
  }
  try {
    const prompt = `You are a Senior Technical Interviewer & Hiring Manager conducting a ${questionType} interview for a "${career}" role at a top firm.

Interview Question:
"${question}"

Expected Benchmark Points:
${expectedPoints.join(", ")}

Candidate's Answer:
"${userAnswer}"

Evaluate the candidate's answer based on industry standards (depth, clarity, confidence, relevance). Return a JSON object with:
- score: integer from 0 to 100.
- feedback: 2-3 sentence constructive critique.
- strengths: array of 2 key strengths.
- improvements: array of 2 actionable areas to refine for placement rounds.`;
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "feedback", "strengths", "improvements"]
        }
      }
    });
    const parsed = JSON.parse(response.text || "{}");
    return {
      score: parsed.score || 75,
      feedback: parsed.feedback || "Good structured response with relevant points.",
      strengths: parsed.strengths || ["Clear problem articulation"],
      improvements: parsed.improvements || ["Add quantifiable impact metrics"]
    };
  } catch (error) {
    console.error("Gemini interview evaluation error:", error);
    return {
      score: 75,
      feedback: "Solid attempt. For competitive placement drives, make sure to link your answer to practical project work or real data.",
      strengths: ["Understood the question premise", "Polite and professional tone"],
      improvements: ["Structure with STAR method", "Mention concrete tools and outcomes"]
    };
  }
}
async function generateAdaptiveRoadmap(careerTitle, userCurrentSkills, userBranch) {
  if (!apiKey) return null;
  try {
    const prompt = `Create an adaptive 6-phase learning roadmap for a college student with background in "${userBranch}" aiming to crack a "${careerTitle}" role (target CTC: \u20B97-18 LPA).
The student ALREADY knows: [${userCurrentSkills.join(", ")}].
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
        responseMimeType: "application/json",
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
                  required: ["title", "type"]
                }
              }
            },
            required: ["phase", "title", "description", "skillsCovered", "estimatedWeeks", "recommendedResources"]
          }
        }
      }
    });
    const parsed = JSON.parse(response.text || "[]");
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch (error) {
    console.error("Gemini roadmap generation error:", error);
    return null;
  }
}
async function analyzeStudentProject(projectData) {
  const titleLower = (projectData.title + " " + projectData.description + " " + projectData.techStack.join(" ")).toLowerCase();
  let fallbackPreview = "saas";
  if (titleLower.includes("telemetry") || titleLower.includes("analytics") || titleLower.includes("chart") || titleLower.includes("data")) {
    fallbackPreview = "analytics";
  } else if (titleLower.includes("mobile") || titleLower.includes("react native") || titleLower.includes("flutter") || titleLower.includes("android")) {
    fallbackPreview = "mobile";
  } else if (titleLower.includes("api") || titleLower.includes("backend") || titleLower.includes("fastapi") || titleLower.includes("express") || titleLower.includes("spring")) {
    fallbackPreview = "code";
  } else if (titleLower.includes("portal") || titleLower.includes("dashboard") || titleLower.includes("admin") || titleLower.includes("management")) {
    fallbackPreview = "dashboard";
  }
  const defaultFallback = {
    recruiterScore: Math.min(96, Math.max(78, 80 + projectData.techStack.length * 3 + (projectData.liveUrl ? 5 : 0) + (projectData.githubUrl ? 4 : 0))),
    impactSummary: `Demonstrates practical full-stack software craftsmanship using ${projectData.techStack.join(", ") || "modern frameworks"}. Strong evidence of production problem solving suitable for campus placement technical rounds.`,
    verifiedSkills: projectData.techStack.length > 0 ? projectData.techStack : ["REST APIs", "System Design", "Git Version Control"],
    suggestedResumeBullets: [
      `Architected and deployed "${projectData.title}" utilizing ${projectData.techStack.slice(0, 3).join(", ") || "full-stack stack"}, delivering responsive workflows and robust error handling.`,
      `Engineered RESTful architecture and schema structures, reducing end-to-end data processing latency across key user transactions.`,
      `Integrated continuous version control, modular code standards, and production cloud hosting${projectData.liveUrl ? " with live deployment" : ""}.`
    ],
    interviewQuestions: [
      `How did you architect the state management and data flow between your components in ${projectData.title}?`,
      `If 10,000 concurrent users accessed this application at once, what would be the first performance bottleneck and how would you optimize it?`
    ],
    previewType: fallbackPreview,
    analyzedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (!apiKey) {
    return defaultFallback;
  }
  try {
    const prompt = `Analyze this student technical project submitted for campus placement technical evaluation:
Project Title: "${projectData.title}"
Description: "${projectData.description}"
Tech Stack: [${projectData.techStack.join(", ")}]
GitHub URL: "${projectData.githubUrl || "Not provided"}"
Live App URL: "${projectData.liveUrl || "Not provided"}"

Evaluate as a Senior Engineering Hiring Manager / Technical Placement Recruiter:
1. recruiterScore: integer between 75 and 98 based on technical depth, recruiter appeal, and live deployment.
2. impactSummary: concise 2-sentence summary of the candidate's engineering capability demonstrated in this project.
3. verifiedSkills: array of 3 to 6 verified technical competencies demonstrated.
4. suggestedResumeBullets: array of exactly 3 impactful resume bullet points following Google's X-Y-Z formula ("Accomplished [X] as measured by [Y], by doing [Z]").
5. interviewQuestions: array of 2 realistic technical questions interviewers will ask the candidate regarding this project.

Return strictly JSON matching the required schema.`;
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recruiterScore: { type: Type.INTEGER },
            impactSummary: { type: Type.STRING },
            verifiedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedResumeBullets: { type: Type.ARRAY, items: { type: Type.STRING } },
            interviewQuestions: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["recruiterScore", "impactSummary", "verifiedSkills", "suggestedResumeBullets", "interviewQuestions"]
        }
      }
    });
    const parsed = JSON.parse(response.text || "{}");
    if (parsed.recruiterScore && Array.isArray(parsed.suggestedResumeBullets)) {
      return {
        recruiterScore: parsed.recruiterScore,
        impactSummary: parsed.impactSummary || defaultFallback.impactSummary,
        verifiedSkills: parsed.verifiedSkills || defaultFallback.verifiedSkills,
        suggestedResumeBullets: parsed.suggestedResumeBullets,
        interviewQuestions: parsed.interviewQuestions || defaultFallback.interviewQuestions,
        analyzedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    return defaultFallback;
  } catch (err) {
    console.error("Project analysis Gemini error:", err);
    return defaultFallback;
  }
}

// server/apiRouter.ts
var apiRouter = Router();
apiRouter.use((req, _res, next) => {
  next();
});
function getCurrentUser(req) {
  const userId = req.headers["x-user-id"] || req.query.userId;
  if (userId) {
    const found = DB.users.find((u) => u.id === userId);
    if (found) return found;
  }
  return DB.users[0];
}
apiRouter.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: "Name and email are required." });
  }
  const existing = DB.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: "An account with this email already exists. Please log in." });
  }
  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password: password || "password123",
    passwordHash: password || "password123",
    role: "student",
    country: "India",
    location: "",
    languages: ["English", "Hindi"],
    schoolEducation: {
      tenthMarks: "",
      tenthBoard: "CBSE",
      twelfthMarks: "",
      twelfthBoard: "CBSE",
      twelfthStream: "Science (PCM)"
    },
    education: {
      degree: "B.Tech",
      branch: "Computer Science & Engineering",
      college: "",
      currentYear: "1st Year",
      passingYear: "2028",
      cgpa: ""
    },
    skills: [],
    interests: [],
    careerGoal: "Software Engineer",
    targetCompanies: [],
    experience: [],
    achievements: [],
    studentProjects: [],
    studentCourses: [],
    isProfileComplete: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  DB.users.push(newUser);
  return res.status(201).json({ user: newUser, token: `token-${newUser.id}` });
});
apiRouter.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Please enter your email." });
  }
  const user = DB.users.find((u) => u.email.toLowerCase() === (email || "").toLowerCase().trim());
  if (!user) {
    return res.status(401).json({ error: "Account not found with this email. Please sign up." });
  }
  if (password && user.password && user.password !== password && user.passwordHash !== password) {
    return res.status(401).json({ error: "Incorrect password. Please try again." });
  }
  return res.json({ user, token: `token-${user.id}` });
});
apiRouter.get("/user/profile", (req, res) => {
  const user = getCurrentUser(req);
  return res.json({ user });
});
apiRouter.put("/user/profile", (req, res) => {
  const user = getCurrentUser(req);
  const updates = req.body;
  if (updates.name !== void 0) user.name = updates.name;
  if (updates.age !== void 0) user.age = updates.age;
  if (updates.location !== void 0) user.location = updates.location;
  if (updates.stateOrCity !== void 0) user.stateOrCity = updates.stateOrCity;
  if (updates.country !== void 0) user.country = updates.country;
  if (updates.languages !== void 0) user.languages = updates.languages;
  if (updates.schoolEducation !== void 0) {
    user.schoolEducation = { ...user.schoolEducation, ...updates.schoolEducation };
  }
  if (updates.education !== void 0) {
    user.education = { ...user.education, ...updates.education };
  }
  if (updates.skills !== void 0) user.skills = updates.skills;
  if (updates.interests !== void 0) user.interests = updates.interests;
  if (updates.careerGoal !== void 0) user.careerGoal = updates.careerGoal;
  if (updates.targetCompanies !== void 0) user.targetCompanies = updates.targetCompanies;
  if (updates.experience !== void 0) user.experience = updates.experience;
  if (updates.achievements !== void 0) user.achievements = updates.achievements;
  if (updates.studentProjects !== void 0) user.studentProjects = updates.studentProjects;
  if (updates.studentCourses !== void 0) user.studentCourses = updates.studentCourses;
  if (updates.isProfileComplete !== void 0) user.isProfileComplete = updates.isProfileComplete;
  return res.json({ success: true, user });
});
apiRouter.post("/resume/analyze", (req, res) => {
  const user = getCurrentUser(req);
  const { resumeText, fileName = "resume.txt" } = req.body;
  if (!resumeText || typeof resumeText !== "string" || resumeText.trim().length < 20) {
    return res.status(400).json({ error: "Please provide valid resume text to analyze." });
  }
  const nlpSkills = extractSkillsNLP(resumeText);
  const extractedSkillNames = nlpSkills.map((s) => s.name);
  const lower = resumeText.toLowerCase();
  const hasEducation = lower.includes("education") || lower.includes("university") || lower.includes("bachelor") || lower.includes("degree") || lower.includes("master");
  const hasExperience = lower.includes("experience") || lower.includes("intern") || lower.includes("work") || lower.includes("employment");
  const hasProjects = lower.includes("project") || lower.includes("capstone") || lower.includes("portfolio");
  const hasCertifications = lower.includes("certificat") || lower.includes("license") || lower.includes("credential");
  const metricMatches = resumeText.match(/(\d+%\s*|\$\d+|\d+\s*hours|\d+\s*users|\d+\s*x)/gi) || [];
  const metricsCount = metricMatches.length;
  const skillsScore = Math.min(95, Math.max(50, 45 + extractedSkillNames.length * 4));
  const educationScore = hasEducation ? 90 : 40;
  const experienceScore = hasExperience ? Math.min(92, 60 + metricsCount * 5) : 45;
  const projectsScore = hasProjects ? 88 : 50;
  const achievementsScore = Math.min(90, Math.max(40, 40 + metricsCount * 8));
  const formattingScore = resumeText.length > 500 && (hasEducation && hasExperience) ? 88 : 65;
  const atsCompatibility = Math.round((skillsScore + educationScore + formattingScore) / 3);
  const totalScore = Math.round(
    skillsScore * 0.25 + experienceScore * 0.2 + projectsScore * 0.15 + educationScore * 0.15 + achievementsScore * 0.1 + atsCompatibility * 0.15
  );
  const strengths = [];
  const weaknesses = [];
  const suggestions = [];
  if (extractedSkillNames.length >= 6) {
    strengths.push(`Identified strong skill inventory including ${extractedSkillNames.slice(0, 3).join(", ")}.`);
  } else {
    weaknesses.push("Limited specialized technical and domain skills detected.");
    suggestions.push("Add specific tools, frameworks, and domain competencies to your Skills section.");
  }
  if (metricsCount >= 3) {
    strengths.push(`Excellent use of quantified impact metrics (${metricsCount} measurable outcomes found).`);
  } else {
    weaknesses.push("Bullet points lack quantifiable metrics (e.g. percentage gains, time saved).");
    suggestions.push('Quantify your project outcomes (e.g., "Accelerated query response by 35%").');
  }
  if (hasProjects) {
    strengths.push("Good academic and practical project descriptions highlighting problem solving.");
  } else {
    weaknesses.push('No dedicated "Projects" section found.');
    suggestions.push("Create a dedicated Projects section showcasing 2-3 applied artifacts.");
  }
  if (!hasCertifications) {
    suggestions.push("Consider acquiring recognized industry certifications (e.g. AWS, Coursera, CFI, or Revit BIM).");
  }
  const mergedSkills = Array.from(/* @__PURE__ */ new Set([...user.skills, ...extractedSkillNames]));
  user.skills = mergedSkills;
  const analysisRecord = {
    id: `resume-${Date.now()}`,
    userId: user.id,
    fileName,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    score: totalScore,
    scoreBreakdown: {
      skills: skillsScore,
      education: educationScore,
      experience: experienceScore,
      projects: projectsScore,
      achievements: achievementsScore,
      formatting: formattingScore,
      atsCompatibility
    },
    extractedData: {
      skills: extractedSkillNames,
      education: hasEducation ? [user.education.degree || "Degree Mentioned"] : [],
      experience: hasExperience ? ["Practical Experience & Roles detected"] : [],
      projects: hasProjects ? ["Project Portfolios detected"] : [],
      certifications: hasCertifications ? ["Certifications detected"] : [],
      languages: user.languages || ["English"],
      softSkills: nlpSkills.filter((s) => s.category === "soft").map((s) => s.name)
    },
    strengths,
    weaknesses,
    suggestions
  };
  DB.resumes.unshift(analysisRecord);
  return res.json({ analysis: analysisRecord, nlpDetails: nlpSkills });
});
apiRouter.get("/resume/history", (req, res) => {
  const user = getCurrentUser(req);
  const userResumes = DB.resumes.filter((r) => r.userId === user.id);
  return res.json({ resumes: userResumes });
});
apiRouter.get("/careers", (_req, res) => {
  return res.json({ careers: DB.careers });
});
apiRouter.post("/careers/recommend", (req, res) => {
  const user = getCurrentUser(req);
  const recommendations = rankCareersForUser(user, DB.careers);
  return res.json({ recommendations });
});
apiRouter.post("/skills/gap-analysis", (req, res) => {
  const user = getCurrentUser(req);
  const { careerId } = req.body;
  let targetCareer = DB.careers.find((c) => c.id === careerId);
  if (!targetCareer) {
    targetCareer = DB.careers.find((c) => c.title.toLowerCase() === (user.careerGoal || "").toLowerCase()) || DB.careers[0];
  }
  const gapAnalysis = performSkillGapAnalysis(user.skills, targetCareer);
  return res.json({ gapAnalysis, career: targetCareer });
});
apiRouter.get("/roadmaps/current", (req, res) => {
  const user = getCurrentUser(req);
  let roadmap = DB.roadmaps.find((r) => r.userId === user.id);
  if (!roadmap) {
    roadmap = DB.roadmaps[0];
  }
  return res.json({ roadmap });
});
apiRouter.post("/roadmaps/generate", async (req, res) => {
  const user = getCurrentUser(req);
  const { careerId } = req.body;
  const targetCareer = DB.careers.find((c) => c.id === careerId) || DB.careers[0];
  const aiSteps = await generateAdaptiveRoadmap(targetCareer.title, user.skills, user.education.branch);
  const steps = aiSteps || [
    {
      phase: 1,
      title: `Phase 1: Foundational Prerequisites for ${targetCareer.title}`,
      description: `Bridge core domain concepts while building on your background in ${user.education.branch}.`,
      skillsCovered: targetCareer.requiredSkills.slice(0, 2).map((s) => s.name),
      estimatedWeeks: 3,
      completed: true,
      recommendedResources: [{ title: `${targetCareer.title} Fundamentals Primer`, type: "Course" }]
    },
    {
      phase: 2,
      title: `Phase 2: Intermediate Tools & Workflows`,
      description: `Deep dive into industry-standard tooling and hands-on laboratory exercises.`,
      skillsCovered: targetCareer.requiredSkills.slice(2, 4).map((s) => s.name),
      estimatedWeeks: 4,
      completed: false,
      recommendedResources: [{ title: `Practical Tooling Masterclass`, type: "Interactive" }]
    },
    {
      phase: 3,
      title: `Phase 3: Applied Real-World Artifacts & Capstone`,
      description: `Build a production-grade portfolio project that demonstrates your capability to hiring managers.`,
      skillsCovered: targetCareer.requiredSkills.slice(4).map((s) => s.name),
      estimatedWeeks: 4,
      completed: false,
      recommendedResources: [{ title: `End-to-End Capstone Project`, type: "Project" }]
    },
    {
      phase: 4,
      title: `Phase 4: Interview Preparation & Industry Polish`,
      description: `Mock interviews, resume refinement with STAR metrics, and technical challenge drills.`,
      skillsCovered: ["Communication", "Problem Solving"],
      estimatedWeeks: 2,
      completed: false,
      recommendedResources: [{ title: `Technical & Behavioral Interview Rubric`, type: "Interactive" }]
    }
  ];
  const newRoadmap = {
    id: `roadmap-${Date.now()}`,
    userId: user.id,
    careerId: targetCareer.id,
    careerTitle: targetCareer.title,
    steps: steps.map((s, idx) => ({
      id: `step-${idx + 1}-${Date.now()}`,
      phase: s.phase || idx + 1,
      title: s.title,
      description: s.description,
      skillsCovered: s.skillsCovered || [],
      estimatedWeeks: s.estimatedWeeks || 3,
      completed: s.completed || false,
      recommendedResources: s.recommendedResources || []
    })),
    progressPercent: 25,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  const existingIdx = DB.roadmaps.findIndex((r) => r.userId === user.id);
  if (existingIdx >= 0) {
    DB.roadmaps[existingIdx] = newRoadmap;
  } else {
    DB.roadmaps.push(newRoadmap);
  }
  return res.json({ roadmap: newRoadmap });
});
apiRouter.post("/roadmaps/toggle-step", (req, res) => {
  const user = getCurrentUser(req);
  const { stepId } = req.body;
  const roadmap = DB.roadmaps.find((r) => r.userId === user.id) || DB.roadmaps[0];
  if (!roadmap) {
    return res.status(404).json({ error: "Roadmap not found." });
  }
  const step = roadmap.steps.find((s) => s.id === stepId);
  if (step) {
    step.completed = !step.completed;
  }
  const completedCount = roadmap.steps.filter((s) => s.completed).length;
  roadmap.progressPercent = Math.round(completedCount / (roadmap.steps.length || 1) * 100);
  roadmap.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  return res.json({ roadmap });
});
apiRouter.get("/courses", (_req, res) => {
  return res.json({ courses: DB.courses });
});
apiRouter.post("/courses/recommend", (req, res) => {
  const user = getCurrentUser(req);
  const { skill, difficulty } = req.body;
  let filtered = [...DB.courses];
  if (skill) {
    filtered = filtered.filter((c) => c.skill.toLowerCase().includes(skill.toLowerCase()));
  }
  if (difficulty) {
    filtered = filtered.filter((c) => c.difficulty.toLowerCase() === difficulty.toLowerCase());
  }
  const targetCareer = DB.careers.find((c) => c.title.toLowerCase() === (user.careerGoal || "").toLowerCase());
  const missingSkillNames = targetCareer ? targetCareer.requiredSkills.filter((rs) => !user.skills.map((s) => s.toLowerCase()).includes(rs.name.toLowerCase())).map((rs) => rs.name) : [];
  return res.json({ courses: filtered, targetMissingSkills: missingSkillNames });
});
apiRouter.get("/projects", (_req, res) => {
  return res.json({ projects: DB.projects });
});
apiRouter.post("/projects/recommend", (req, res) => {
  const user = getCurrentUser(req);
  const { targetCareer, difficulty } = req.body;
  let filtered = [...DB.projects];
  if (targetCareer) {
    filtered = filtered.filter((p) => p.targetCareer.toLowerCase().includes(targetCareer.toLowerCase()));
  }
  if (difficulty) {
    filtered = filtered.filter((p) => p.difficulty.toLowerCase() === difficulty.toLowerCase());
  }
  return res.json({ projects: filtered, userGoal: user.careerGoal });
});
apiRouter.post("/projects/analyze", async (req, res) => {
  const { title, description, techStack, githubUrl, liveUrl } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Project title is required." });
  }
  const analysis = await analyzeStudentProject({
    title,
    description: description || "Student engineering portfolio project",
    techStack: Array.isArray(techStack) ? techStack : [],
    githubUrl,
    liveUrl
  });
  return res.json({ analysis });
});
apiRouter.get("/chat/history", (req, res) => {
  const user = getCurrentUser(req);
  const history = DB.chatHistory.filter((c) => c.userId === user.id);
  return res.json({ history });
});
apiRouter.post("/chat", async (req, res) => {
  const user = getCurrentUser(req);
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message cannot be empty." });
  }
  const retrievedDocs = retrieveRelevantKnowledge(message, 3);
  const ragContext = retrievedDocs.map((r) => `[${r.document.title}]: ${r.document.content}`).join("\n\n");
  const ragSources = retrievedDocs.map((r) => r.document.title);
  const profileSummary = `Degree: ${user.education.degree} in ${user.education.branch} (${user.education.college} - ${user.education.collegeTier || "College"}). Current Skills: ${user.skills.join(", ")}. Career Goal: ${user.careerGoal}. Interests: ${user.interests.join(", ")}. Target Companies: ${(user.targetCompanies || []).join(", ")}.`;
  const aiAnswer = await generateChatResponse(message, profileSummary, ragContext);
  const userMsg = {
    id: `msg-${Date.now()}-user`,
    userId: user.id,
    sender: "user",
    text: message,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  const botMsg = {
    id: `msg-${Date.now()}-bot`,
    userId: user.id,
    sender: "assistant",
    text: aiAnswer,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    ragSources
  };
  DB.chatHistory.push(userMsg, botMsg);
  return res.json({ response: aiAnswer, ragSources, userMessage: userMsg, botMessage: botMsg });
});
apiRouter.post("/interview/match-companies", (req, res) => {
  const user = getCurrentUser(req);
  const { resumeText, linkedInUrl, skills } = req.body;
  let candidateSkills = Array.isArray(skills) ? [...skills] : [...user.skills];
  if (resumeText && typeof resumeText === "string") {
    const extracted = extractSkillsNLP(resumeText).map((s) => s.name);
    candidateSkills = Array.from(/* @__PURE__ */ new Set([...candidateSkills, ...extracted]));
  }
  if (linkedInUrl && typeof linkedInUrl === "string") {
    if (linkedInUrl.toLowerCase().includes("data") || linkedInUrl.toLowerCase().includes("analytics")) {
      candidateSkills.push("Python", "SQL", "Data Analytics", "Power BI");
    } else if (linkedInUrl.toLowerCase().includes("mech") || linkedInUrl.toLowerCase().includes("auto")) {
      candidateSkills.push("CAD", "SolidWorks", "MATLAB", "Robotics");
    } else {
      candidateSkills.push("Algorithms", "Java", "Problem Solving", "Git");
    }
    candidateSkills = Array.from(new Set(candidateSkills));
  }
  return res.json({
    extractedSkills: candidateSkills,
    analyzedSource: resumeText ? "Resume Document" : linkedInUrl ? "LinkedIn Profile" : "Student Account Profile"
  });
});
apiRouter.post("/interview/start", (req, res) => {
  const user = getCurrentUser(req);
  const { career, interviewType = "Technical", difficulty = "Intermediate", companyName, targetRole } = req.body;
  const targetCareer = career || targetRole || user.careerGoal || "Data Analyst";
  const pool = INTERVIEW_QUESTIONS_BANK[targetCareer] || INTERVIEW_QUESTIONS_BANK["Default"];
  const selectedQuestions = pool.map((q, idx) => {
    let questionText = q.question;
    if (companyName && idx === 0 && q.type === "HR") {
      questionText = `Welcome to your campus interview for ${companyName}. To start off, introduce yourself and explain what specifically draws you to ${companyName} over other industry peers.`;
    }
    return {
      id: `q-${idx + 1}-${Date.now()}`,
      question: questionText,
      type: q.type,
      expectedKeyPoints: q.expectedKeyPoints
    };
  });
  const session = {
    id: `interview-${Date.now()}`,
    userId: user.id,
    career: companyName ? `${companyName} \xB7 ${targetRole || targetCareer}` : targetCareer,
    interviewType,
    difficulty,
    questions: selectedQuestions,
    currentQuestionIndex: 0,
    completed: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  DB.interviews.unshift(session);
  return res.json({ session });
});
apiRouter.post("/interview/answer", async (req, res) => {
  const { sessionId, questionIndex, answer } = req.body;
  const session = DB.interviews.find((s) => s.id === sessionId);
  if (!session) {
    return res.status(404).json({ error: "Interview session not found." });
  }
  const q = session.questions[questionIndex];
  if (!q) {
    return res.status(400).json({ error: "Question index invalid." });
  }
  q.userAnswer = answer;
  const evalResult = await evaluateInterviewAnswer(session.career, q.question, q.type, q.expectedKeyPoints, answer);
  q.score = evalResult.score;
  q.feedback = evalResult.feedback;
  session.currentQuestionIndex = questionIndex + 1;
  if (session.currentQuestionIndex >= session.questions.length) {
    session.completed = true;
    const scores = session.questions.map((item) => item.score || 70);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    session.overallScore = avg;
    session.breakdown = {
      technicalKnowledge: Math.min(95, Math.max(60, avg + 3)),
      communication: Math.min(92, Math.max(65, avg - 2)),
      problemSolving: Math.min(96, Math.max(62, avg + 1)),
      questionCoverage: 100
    };
    session.summaryFeedback = `Interview finished with an overall score of ${avg}/100. Demonstrated clear conceptual fluency with actionable opportunities to incorporate STAR framework quantitative results.`;
    session.areasToImprove = evalResult.improvements;
    DB.analytics.mockInterviewsCompleted++;
  }
  return res.json({ session, questionResult: q });
});
apiRouter.get("/interview/history", (req, res) => {
  const user = getCurrentUser(req);
  const userInterviews = DB.interviews.filter((i) => i.userId === user.id);
  return res.json({ interviews: userInterviews });
});
apiRouter.get("/dashboard", (req, res) => {
  const user = getCurrentUser(req);
  const careerRecommendations = rankCareersForUser(user, DB.careers).slice(0, 4);
  const topCareer = careerRecommendations[0]?.career || DB.careers[0];
  const gapAnalysis = performSkillGapAnalysis(user.skills, topCareer);
  const roadmap = DB.roadmaps.find((r) => r.userId === user.id) || DB.roadmaps[0];
  const latestResume = DB.resumes.find((r) => r.userId === user.id);
  const latestInterview = DB.interviews.find((i) => i.userId === user.id && i.completed);
  const recommendedCourses = DB.courses.filter((c) => gapAnalysis.missingSkills.some((ms) => ms.name.toLowerCase() === c.skill.toLowerCase())).slice(0, 3);
  const recommendedProjects = DB.projects.filter((p) => p.targetCareer.toLowerCase().includes(topCareer.title.toLowerCase())).slice(0, 2);
  let completeness = 30;
  if (user.education.branch) completeness += 20;
  if (user.skills.length >= 3) completeness += 20;
  if (user.interests.length >= 2) completeness += 15;
  if (latestResume) completeness += 15;
  return res.json({
    user,
    profileCompleteness: Math.min(100, completeness),
    topCareer,
    gapAnalysis,
    roadmap,
    latestResume,
    latestInterview,
    recommendedCourses,
    recommendedProjects,
    careerRecommendations
  });
});
apiRouter.get("/admin/stats", (_req, res) => {
  return res.json({
    totalUsers: DB.users.length,
    activeLearners: DB.analytics.totalStudentsIndexed,
    totalCareers: DB.careers.length,
    totalCourses: DB.courses.length,
    totalProjects: DB.projects.length,
    totalAssessments: DB.analytics.mockInterviewsCompleted,
    interviewCompletions: DB.analytics.mockInterviewsCompleted,
    placedInCurrentDrive: DB.analytics.placedInCurrentDrive,
    averageCTCJump: DB.analytics.averageCTCJump,
    popularCareers: [
      { name: "Data Analyst & Business Insights", learners: 520 },
      { name: "Full Stack Web Developer (MERN / Java)", learners: 480 },
      { name: "Robotics & Industrial Automation Engineer", learners: 340 },
      { name: "Bioinformatics & Genomic Data Scientist", learners: 280 },
      { name: "Financial & FinTech Analytics Specialist", learners: 250 }
    ],
    topSkillsInDemand: [
      { skill: "Python", demandScore: 98 },
      { skill: "SQL", demandScore: 95 },
      { skill: "Power BI", demandScore: 89 },
      { skill: "DSA (Data Structures)", demandScore: 92 },
      { skill: "ROS / Robotics", demandScore: 81 }
    ]
  });
});
apiRouter.post("/admin/careers", (req, res) => {
  const newCareer = {
    id: `career-${Date.now()}`,
    ...req.body
  };
  DB.careers.push(newCareer);
  return res.status(201).json({ career: newCareer });
});
apiRouter.put("/admin/careers/:id", (req, res) => {
  const { id } = req.params;
  const idx = DB.careers.findIndex((c) => c.id === id);
  if (idx < 0) return res.status(404).json({ error: "Career not found." });
  DB.careers[idx] = { ...DB.careers[idx], ...req.body };
  return res.json({ career: DB.careers[idx] });
});
apiRouter.delete("/admin/careers/:id", (req, res) => {
  const { id } = req.params;
  DB.careers = DB.careers.filter((c) => c.id !== id);
  return res.json({ success: true });
});
apiRouter.post("/admin/courses", (req, res) => {
  const newCourse = {
    id: `course-${Date.now()}`,
    ...req.body
  };
  DB.courses.push(newCourse);
  return res.status(201).json({ course: newCourse });
});
apiRouter.post("/admin/projects", (req, res) => {
  const newProject = {
    id: `proj-${Date.now()}`,
    ...req.body
  };
  DB.projects.push(newProject);
  return res.status(201).json({ project: newProject });
});
apiRouter.get("/admin/users", (_req, res) => {
  return res.json({ users: DB.users });
});

// api/index.ts
var app = express();
app.use(express.json({ limit: "10mb" }));
app.use("/api", apiRouter);
app.use("/", apiRouter);
var index_default = app;
export {
  index_default as default
};
