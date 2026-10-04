export interface CareerSkill {
  name: string;
  importance: 'high' | 'medium' | 'low';
  category: string;
}

export type SalaryTier = 'foundation' | 'growth' | 'premium';

export interface CareerPath {
  id: string;
  title: string;
  domain: string;
  category:
    | 'Software & Cloud'
    | 'AI & Data Science'
    | 'Product & Design'
    | 'Cybersecurity & Systems'
    | 'Hardware & Robotics'
    | 'Finance & FinTech'
    | 'Biotechnology & Health'
    | 'Smart Infrastructure'
    | 'Operations & Business';
  salaryTier: SalaryTier; // 'foundation' (₹2.5 - ₹6.5 LPA) | 'growth' (₹6.5 - ₹14 LPA) | 'premium' (₹14+ - ₹50+ LPA)
  description: string;
  whyExciting: string;
  salaryRange: string;
  averageSalaryIndia: string; // kept for backwards compatibility with any existing components
  growthOutlook: string;
  experienceLevel: 'Entry-Level / Graduate' | 'Mid-Level' | 'All Levels';
  requiredSkills: CareerSkill[];
  recommendedDisciplines: string[];
  topRecruiters: string[];
  topRecruitersIndia: string[]; // backwards compatibility
  keyResponsibilities: string[];
  sampleJobTitles: string[];
  interviewTopics: string[];
  portfolioProjects: string[];
  dayInTheLife: string;
}

export const COMPREHENSIVE_CAREERS: CareerPath[] = [
  // =========================================================================
  // SECTION 1: LOW / ENTRY-LEVEL SALARY TIER (₹2.5 LPA - ₹6.5 LPA)
  // Fresher-friendly, highly accessible, core engineering & tech entry gates
  // =========================================================================
  {
    id: 'career-qa-manual-tester',
    title: 'Junior QA & Software Tester',
    domain: 'Software Quality & Testing',
    category: 'Software & Cloud',
    salaryTier: 'foundation',
    description: 'Ensure digital apps work smoothly by running user test cases, finding hidden software bugs, and verifying features before updates launch.',
    whyExciting: 'The most accessible doorway into technology with direct pathways into automation engineering and software development.',
    salaryRange: '₹3.2 LPA - ₹5.8 LPA',
    averageSalaryIndia: '₹3.2 LPA - ₹5.8 LPA',
    growthOutlook: '+18% Steady Hiring for Quality Teams',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'Manual Testing', importance: 'high', category: 'Testing' },
      { name: 'Test Case Writing', importance: 'high', category: 'Documentation' },
      { name: 'Jira Bug Tracking', importance: 'high', category: 'Tools' },
      { name: 'Postman API Basics', importance: 'medium', category: 'API' },
      { name: 'SQL Query Basics', importance: 'medium', category: 'Databases' },
      { name: 'Attention to Detail', importance: 'high', category: 'Soft Skills' }
    ],
    recommendedDisciplines: ['Computer Science', 'BCA / B.Sc IT', 'MCA', 'Mechanical / Civil / Electrical', 'Commerce with Tech Interest'],
    topRecruiters: ['Cognizant', 'Wipro', 'TCS', 'Infosys', 'Capgemini', 'Accenture', 'Tech Mahindra'],
    topRecruitersIndia: ['Cognizant', 'Wipro', 'TCS', 'Infosys', 'Capgemini'],
    keyResponsibilities: [
      'Write clear step-by-step test scenarios to uncover software glitches and visual bugs',
      'Log detailed bug reports with screenshots and exact reproduction steps in Jira',
      'Verify mobile responsiveness and form inputs across browsers'
    ],
    sampleJobTitles: ['QA Trainee', 'Software Test Associate', 'Manual Tester', 'Quality Analyst'],
    interviewTopics: ['Software Testing Lifecycle (STLC)', 'Difference Between Severity & Priority', 'Writing Boundary Value Test Cases', 'Basic SQL SELECT Queries'],
    portfolioProjects: ['Complete Bug Audit & Test Suite for a Modern E-Commerce Store', 'Postman API Test Collection with Status Assertions'],
    dayInTheLife: 'Start with morning standup, test the latest app build for resolved issues, record unexpected behaviors in Jira, and approve release candidates.'
  },
  {
    id: 'career-graduate-engineer-trainee',
    title: 'Graduate Engineer Trainee (GET - Plant & Operations)',
    domain: 'Manufacturing, Production & Plant Tech',
    category: 'Hardware & Robotics',
    salaryTier: 'foundation',
    description: 'Oversee factory machines, monitor assembly line output, check component measurements, and keep production running safely and efficiently.',
    whyExciting: 'Hands-on practical engineering where you work directly on industrial machinery, vehicles, and precision assembly lines.',
    salaryRange: '₹3.5 LPA - ₹6.2 LPA',
    averageSalaryIndia: '₹3.5 LPA - ₹6.2 LPA',
    growthOutlook: '+19% Strong Industrial & Manufacturing Growth',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'Engineering Drawing & GD&T', importance: 'high', category: 'Core Mechanical' },
      { name: 'Quality Inspection (7 QC Tools)', importance: 'high', category: 'Quality' },
      { name: 'AutoCAD Basics', importance: 'medium', category: 'CAD' },
      { name: 'Production Planning', importance: 'medium', category: 'Operations' },
      { name: 'MS Excel for Operations', importance: 'medium', category: 'Spreadsheets' }
    ],
    recommendedDisciplines: ['Mechanical Engineering', 'Production & Industrial', 'Electrical Engineering', 'Automobile Engineering'],
    topRecruiters: ['Tata Motors', 'L&T', 'Mahindra Group', 'Hero MotoCorp', 'Maruti Suzuki', 'Ashok Leyland'],
    topRecruitersIndia: ['Tata Motors', 'L&T', 'Mahindra', 'Hero MotoCorp'],
    keyResponsibilities: [
      'Track assembly line efficiency and keep machine downtime to a minimum',
      'Inspect machined parts using vernier calipers, micrometers, and gauge blocks',
      'Enforce workplace safety, 5S workplace organization, and standard operating procedures'
    ],
    sampleJobTitles: ['Graduate Engineer Trainee', 'Assistant Production Engineer', 'Quality Control Inspector', 'Plant Maintenance Trainee'],
    interviewTopics: ['Stress-Strain Curve & Material Properties', 'Types of Fits & Tolerances', 'Common Manufacturing Processes', 'Root Cause Analysis for Defects'],
    portfolioProjects: ['Shopfloor Assembly Cycle Time Optimization Study', 'Mechanical Component Tolerance Blueprint in AutoCAD'],
    dayInTheLife: 'Inspect the morning factory shift, verify part dimensions against design blueprints, log operational efficiency in Excel, and collaborate with shop floor technicians.'
  },
  {
    id: 'career-cad-drafter',
    title: 'Junior CAD Modeler & Mechanical Drafter',
    domain: 'Mechanical & Structural CAD Design',
    category: 'Hardware & Robotics',
    salaryTier: 'foundation',
    description: 'Transform rough concepts and sketches into clean 2D engineering blueprints and 3D computer models used by fabrication teams.',
    whyExciting: 'Turn creative mechanical concepts into exact millimeter-accurate blueprints that factories use to build real-world products.',
    salaryRange: '₹3.0 LPA - ₹5.4 LPA',
    averageSalaryIndia: '₹3.0 LPA - ₹5.4 LPA',
    growthOutlook: '+16% High Demand Across Engineering Services',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'AutoCAD 2D & 3D', importance: 'high', category: 'CAD' },
      { name: 'SolidWorks Part Modeling', importance: 'high', category: '3D CAD' },
      { name: 'Geometric Dimensioning & Tolerancing (GD&T)', importance: 'medium', category: 'Standards' },
      { name: 'Bill of Materials (BOM)', importance: 'medium', category: 'Documentation' },
      { name: 'Orthographic Projections', importance: 'high', category: 'Drafting' }
    ],
    recommendedDisciplines: ['Mechanical Engineering', 'Civil Engineering', 'Automobile', 'Diploma in Mechanical'],
    topRecruiters: ['L&T Technology Services', 'Tata Technologies', 'Cyient', 'Quest Global', 'Kirloskar'],
    topRecruitersIndia: ['L&T Tech', 'Tata Tech', 'Cyient', 'Quest Global'],
    keyResponsibilities: [
      'Create 2D manufacturing drawings with detailed dimensioning and sectional views',
      'Model 3D parametric components in SolidWorks according to engineering specifications',
      'Generate Bills of Materials (BOM) specifying part counts, materials, and hardware'
    ],
    sampleJobTitles: ['CAD Drafter', 'Junior Design Engineer', 'Mechanical Detailer', 'Drafting Associate'],
    interviewTopics: ['First Angle vs Third Angle Projection', 'Symbols for Surface Finish & Welds', 'Sheet Metal Bending Allowances', 'Parametric Sketch Constraints'],
    portfolioProjects: ['3D Modeling & Complete 2D Drawing Package for a Gearbox Housing', 'Sheet Metal Enclosure Blueprint with DXF Cut-Files'],
    dayInTheLife: 'Receive markups from the senior design engineer, update 3D models in SolidWorks, export dimensioned PDF drawings for machinists, and check bill of material tables.'
  },
  {
    id: 'career-junior-web-dev',
    title: 'Junior Frontend Web Developer',
    domain: 'Frontend & Web Development',
    category: 'Software & Cloud',
    salaryTier: 'foundation',
    description: 'Build attractive, easy-to-use web pages, style interactive buttons, and ensure websites look fantastic on both phones and laptops.',
    whyExciting: 'Instant creative reward—every line of code you write turns into interactive visuals on the screen that people touch and use.',
    salaryRange: '₹3.8 LPA - ₹6.5 LPA',
    averageSalaryIndia: '₹3.8 LPA - ₹6.5 LPA',
    growthOutlook: '+22% Strong Entry Demand in Software Companies',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'HTML5 & Responsive CSS', importance: 'high', category: 'Frontend' },
      { name: 'JavaScript ES6+', importance: 'high', category: 'Programming' },
      { name: 'Tailwind CSS / Bootstrap', importance: 'medium', category: 'Styling' },
      { name: 'Git & GitHub', importance: 'high', category: 'Version Control' },
      { name: 'Figma to Code', importance: 'medium', category: 'UI Design' }
    ],
    recommendedDisciplines: ['Computer Science', 'BCA / B.Sc IT', 'Information Technology', 'Any Engineering Branch'],
    topRecruiters: ['Cognizant', 'HCLTech', 'Tech Mahindra', 'Mindtree', 'Zoho', 'Thoughtworks'],
    topRecruitersIndia: ['Cognizant', 'HCLTech', 'Zoho', 'Mindtree'],
    keyResponsibilities: [
      'Turn Figma wireframes into responsive, accessible web pages using HTML, CSS, and modern JavaScript',
      'Optimize web pages for smooth animations and fast loading times on mobile devices',
      'Connect frontend web forms to backend APIs to display real-time user data'
    ],
    sampleJobTitles: ['Junior Web Developer', 'Associate Frontend Engineer', 'UI Developer', 'Web Integrator'],
    interviewTopics: ['CSS Flexbox & CSS Grid Mechanics', 'DOM Manipulation & Event Listeners', 'Promises & Fetch API', 'Semantic HTML Best Practices'],
    portfolioProjects: ['Responsive SaaS Product Landing Page with Dark Mode', 'Interactive Portfolio Website with Dynamic Filtering'],
    dayInTheLife: 'Inspect responsive layout on mobile screens, write clean Tailwind CSS components, push code to GitHub, and collaborate with backend developers.'
  },
  {
    id: 'career-tech-support-systems',
    title: 'IT Systems & Desktop Support Specialist',
    domain: 'IT Infrastructure & Support',
    category: 'Cybersecurity & Systems',
    salaryTier: 'foundation',
    description: 'Help team members solve computer glitches, configure office Wi-Fi and VPNs, set up workstations, and keep corporate networks running reliably.',
    whyExciting: 'The practical problem-solvers of every modern organization who master computer hardware, operating systems, and network connections.',
    salaryRange: '₹2.8 LPA - ₹5.2 LPA',
    averageSalaryIndia: '₹2.8 LPA - ₹5.2 LPA',
    growthOutlook: '+15% Stable Requirement Across All Industries',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'Windows & Linux Workstations', importance: 'high', category: 'Operating Systems' },
      { name: 'Computer Networking (IP, DNS, DHCP)', importance: 'high', category: 'Networking' },
      { name: 'Hardware Diagnostics & Repair', importance: 'high', category: 'Hardware' },
      { name: 'Helpdesk Ticketing (Jira / ServiceNow)', importance: 'medium', category: 'Tools' },
      { name: 'Customer Communication', importance: 'high', category: 'Soft Skills' }
    ],
    recommendedDisciplines: ['Computer Science', 'BCA / B.Sc IT', 'Electronics & Telecom', 'Any Degree Graduate'],
    topRecruiters: ['Dell Technologies', 'Wipro', 'HCLTech', 'Cognizant', 'Amazon Operations', 'Infosys'],
    topRecruitersIndia: ['Dell', 'Wipro', 'HCLTech', 'Cognizant'],
    keyResponsibilities: [
      'Resolve software installation, printer connectivity, and OS crash issues for employees',
      'Configure employee laptops with secure accounts, VPNs, and required software',
      'Diagnose network issues and keep office internet routers and switches functioning smoothly'
    ],
    sampleJobTitles: ['IT Support Engineer', 'Helpdesk Specialist', 'Desktop Support Associate', 'Systems Support Trainee'],
    interviewTopics: ['OSI Model & IP Addressing', 'Active Directory Basics', 'Troubleshooting Boot Errors & BSOD', 'DNS Resolution Steps'],
    portfolioProjects: ['Home Lab Network Setup with Virtual Machines', 'PowerShell Script to Automate Employee PC Setup'],
    dayInTheLife: 'Check the morning ticket queue, configure two new team laptops, troubleshoot a VPN issue for a remote employee, and update equipment inventory.'
  },
  {
    id: 'career-junior-site-civil',
    title: 'Junior Site Civil Engineer & Construction Supervisor',
    domain: 'Civil Construction & Quality Supervision',
    category: 'Smart Infrastructure',
    salaryTier: 'foundation',
    description: 'Inspect building construction sites, check steel reinforcement rods, supervise concrete pouring, and ensure structures match engineering drawings.',
    whyExciting: 'Watch massive physical buildings and bridges rise from the ground through your daily inspections and supervision.',
    salaryRange: '₹3.2 LPA - ₹5.8 LPA',
    averageSalaryIndia: '₹3.2 LPA - ₹5.8 LPA',
    growthOutlook: '+17% High Real Estate and Infrastructure Growth',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'Site Supervision & Layout', importance: 'high', category: 'Civil' },
      { name: 'Bar Bending Schedule (BBS)', importance: 'high', category: 'Structural' },
      { name: 'Concrete Quality Testing (Slump/Cube)', importance: 'high', category: 'Testing' },
      { name: 'AutoCAD Blueprint Reading', importance: 'medium', category: 'Drawings' },
      { name: 'Contractor Coordination', importance: 'medium', category: 'Soft Skills' }
    ],
    recommendedDisciplines: ['Civil Engineering', 'Construction Technology', 'Diploma in Civil Engineering'],
    topRecruiters: ['L&T Construction', 'Shapoorji Pallonji', 'Tata Projects', 'Godrej Properties', 'Sobha Developers'],
    topRecruitersIndia: ['L&T Construction', 'Shapoorji Pallonji', 'Tata Projects'],
    keyResponsibilities: [
      'Verify steel rod spacing, concrete cover, and shuttering before structural slab casting',
      'Perform slump cone tests and cast concrete test cubes for strength testing',
      'Prepare daily site progress reports covering materials used and construction milestones'
    ],
    sampleJobTitles: ['Junior Site Engineer', 'Construction Supervisor', 'Civil Site Trainee', 'QA/QC Civil Associate'],
    interviewTopics: ['Water-Cement Ratio and Concrete Strength', 'Slump Test Values for Beams & Columns', 'Reading Structural Working Drawings', 'Common Construction Defects & Curing'],
    portfolioProjects: ['Complete Bar Bending Schedule (BBS) Calculation Sheet', 'Concrete Quality Audit Protocol Document for Building Foundation'],
    dayInTheLife: 'Walk the construction site with the contractor, inspect reinforcement steel on the third floor, supervise the afternoon concrete mix, and submit the daily progress log.'
  },
  {
    id: 'career-operations-data-entry',
    title: 'Business Operations & Data Associate',
    domain: 'Operations & Spreadsheet Analytics',
    category: 'Operations & Business',
    salaryTier: 'foundation',
    description: 'Manage company data spreadsheets, clean customer records, organize inventory tables, and generate weekly business summary reports.',
    whyExciting: 'Master Excel and business operations to understand how companies make money, serving as the best launchpad into Business Analyst careers.',
    salaryRange: '₹2.8 LPA - ₹5.0 LPA',
    averageSalaryIndia: '₹2.8 LPA - ₹5.0 LPA',
    growthOutlook: '+14% Needed Across Every Business Sector',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'Advanced Excel (VLOOKUP, Pivot)', importance: 'high', category: 'Spreadsheets' },
      { name: 'Data Cleansing & Validation', importance: 'high', category: 'Data' },
      { name: 'Google Sheets & Forms', importance: 'medium', category: 'Tools' },
      { name: 'Typing & Data Accuracy', importance: 'high', category: 'Productivity' },
      { name: 'Basic SQL Knowledge', importance: 'medium', category: 'Databases' }
    ],
    recommendedDisciplines: ['Commerce (B.Com)', 'BBA', 'B.Sc / BCA', 'Any Graduate'],
    topRecruiters: ['Genpact', 'WNS', 'Teleperformance', 'Accenture Operations', 'Amazon Operations'],
    topRecruitersIndia: ['Genpact', 'WNS', 'Accenture Ops'],
    keyResponsibilities: [
      'Consolidate daily sales and delivery spreadsheets into clean master reports',
      'Identify and remove duplicate entries, typos, and formatting errors in customer records',
      'Build automated formula templates to generate weekly performance charts'
    ],
    sampleJobTitles: ['Operations Associate', 'MIS Executive', 'Data Processing Executive', 'Reporting Associate'],
    interviewTopics: ['Excel Lookup Formulas (VLOOKUP, XLOOKUP, INDEX-MATCH)', 'Creating Interactive Pivot Tables', 'Techniques for Cleaning Messy Data', 'Data Accuracy & Quality Checks'],
    portfolioProjects: ['Multi-Branch Sales Performance Dashboard in Excel', 'Automated Inventory Tracker with Reorder Alerts in Google Sheets'],
    dayInTheLife: 'Download weekly store reports, run spreadsheet cleanup formulas to standardize column formats, build the weekly sales chart, and email the management summary.'
  },
  {
    id: 'career-digital-marketing-seo',
    title: 'Digital Marketing & SEO Associate',
    domain: 'Digital Growth & Social Media',
    category: 'Operations & Business',
    salaryTier: 'foundation',
    description: 'Grow online audiences by publishing social media content, optimizing web articles for Google search rankings, and tracking marketing performance.',
    whyExciting: 'A dynamic blend of creativity and data where you craft messages that reach thousands of people every day.',
    salaryRange: '₹3.0 LPA - ₹5.5 LPA',
    averageSalaryIndia: '₹3.0 LPA - ₹5.5 LPA',
    growthOutlook: '+21% Fast Growing Across Consumer Brands',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'Search Engine Optimization (SEO)', importance: 'high', category: 'Marketing' },
      { name: 'Social Media Management', importance: 'high', category: 'Social Media' },
      { name: 'Google Analytics & Search Console', importance: 'medium', category: 'Analytics' },
      { name: 'Content Writing & Copywriting', importance: 'high', category: 'Creative' },
      { name: 'Canva & Graphic Basics', importance: 'medium', category: 'Design' }
    ],
    recommendedDisciplines: ['Mass Communication', 'BBA / Marketing', 'English / Literature', 'Any Creative Graduate'],
    topRecruiters: ['Dentsu', 'Publicis Groupe', 'GroupM', 'Nykaa', 'Zomato', 'Freshworks'],
    topRecruitersIndia: ['Dentsu', 'GroupM', 'Nykaa'],
    keyResponsibilities: [
      'Research high-ranking search keywords and optimize blog posts to increase web traffic',
      'Create and schedule engaging weekly social media posts across LinkedIn and Instagram',
      'Track page views, click rates, and visitor conversion metrics using Google Analytics'
    ],
    sampleJobTitles: ['SEO Executive', 'Digital Marketing Trainee', 'Social Media Coordinator', 'Content Marketing Associate'],
    interviewTopics: ['On-Page vs Off-Page SEO Techniques', 'How Google Crawls and Indexes Pages', 'Key Social Media Engagement Metrics', 'Writing Catchy Headlines That Convert'],
    portfolioProjects: ['SEO Growth Audit & Keyword Strategy for an E-Commerce Brand', '30-Day Social Media Campaign Plan with Visual Banners'],
    dayInTheLife: 'Check daily website traffic trends in Google Analytics, write two keyword-optimized articles, schedule weekly LinkedIn updates, and review campaign click rates.'
  },
  {
    id: 'career-junior-graphic-designer',
    title: 'Junior Graphic & Visual Designer',
    domain: 'Visual Design & Brand Creatives',
    category: 'Product & Design',
    salaryTier: 'foundation',
    description: 'Design eye-catching social media banners, website visuals, brand logos, and promotional graphics that engage modern customers.',
    whyExciting: 'Express your artistic creativity while mastering industry design tools to give brands a memorable visual personality.',
    salaryRange: '₹2.8 LPA - ₹5.2 LPA',
    averageSalaryIndia: '₹2.8 LPA - ₹5.2 LPA',
    growthOutlook: '+18% High Creative Need in Startups & Agencies',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'Figma & UI Mockups', importance: 'high', category: 'Design' },
      { name: 'Adobe Photoshop', importance: 'high', category: 'Graphics' },
      { name: 'Adobe Illustrator', importance: 'high', category: 'Vector Art' },
      { name: 'Color Theory & Typography', importance: 'high', category: 'Visual Arts' },
      { name: 'Canva for Quick Graphics', importance: 'medium', category: 'Social' }
    ],
    recommendedDisciplines: ['B.Des / Graphic Design', 'Fine Arts', 'BCA / B.Sc', 'Any Creative Mind'],
    topRecruiters: ['Ogilvy', 'Schbang', 'Licious', 'Swiggy', 'Dentsu Creative', 'Zomato'],
    topRecruitersIndia: ['Ogilvy', 'Schbang', 'Swiggy'],
    keyResponsibilities: [
      'Design attractive promotional banners, flyers, and social media carousels',
      'Prepare vector logos, icons, and illustrations using Adobe Illustrator and Figma',
      'Ensure brand colors, fonts, and styling stay consistent across all marketing materials'
    ],
    sampleJobTitles: ['Junior Graphic Designer', 'Visual Design Associate', 'Brand Designer Trainee', 'Creative Associate'],
    interviewTopics: ['Typography Pairing & Visual Hierarchy', 'RGB vs CMYK Color Modes', 'Working with Vector Paths & Bezier Curves', 'Exporting Crisp Assets for Web & Print'],
    portfolioProjects: ['Brand Identity Redesign Package with Logo, Colors & Mockups', 'Set of 10 Social Media Promotional Carousels in Figma'],
    dayInTheLife: 'Brainstorm design concepts for the weekend product launch, create promotional banners in Photoshop, export optimized web images, and present drafts to the marketing lead.'
  },
  {
    id: 'career-inside-sales-bdr',
    title: 'Business Development & Sales Associate (BDR)',
    domain: 'Sales & Client Partnerships',
    category: 'Operations & Business',
    salaryTier: 'foundation',
    description: 'Connect with prospective business clients, qualify customer needs, pitch software and service offerings, and book product demonstrations.',
    whyExciting: 'Rapid promotions and lucrative monthly performance bonuses for energetic communicators who enjoy building relationships.',
    salaryRange: '₹3.0 LPA - ₹6.0 LPA (+ Incentives)',
    averageSalaryIndia: '₹3.0 LPA - ₹6.0 LPA (+ Incentives)',
    growthOutlook: '+24% In-Demand Across All SaaS Companies',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'Client Communication & Pitching', importance: 'high', category: 'Communication' },
      { name: 'CRM Management (Salesforce / HubSpot)', importance: 'medium', category: 'Tools' },
      { name: 'Lead Research & Outreach', importance: 'high', category: 'Sales' },
      { name: 'Active Listening & Objection Handling', importance: 'high', category: 'Soft Skills' },
      { name: 'Email Prospecting', importance: 'high', category: 'Outreach' }
    ],
    recommendedDisciplines: ['BBA / MBA', 'Commerce', 'Engineering Graduate with People Skills', 'Any Graduate'],
    topRecruiters: ['Zoho', 'Freshworks', 'BYJU\'S', 'Scaler', 'Unacademy', 'Dell Technologies'],
    topRecruitersIndia: ['Zoho', 'Freshworks', 'Scaler'],
    keyResponsibilities: [
      'Reach out to prospective business leads through personalized emails, LinkedIn, and calls',
      'Understand client requirements and explain how company products address their challenges',
      'Schedule qualified sales discovery calls and product demonstrations for senior account executives'
    ],
    sampleJobTitles: ['Business Development Associate', 'Sales Development Rep (SDR)', 'Inside Sales Executive', 'Client Outreach Associate'],
    interviewTopics: ['How to Handle Customer Objections', 'The BANT Qualification Framework', 'Writing Engaging Outreach Emails', 'Demonstrating Product Value Clearly'],
    portfolioProjects: ['Mock SaaS Cold Outreach Strategy and Email Sequence', 'B2B Client Persona Research and Pitch Deck'],
    dayInTheLife: 'Send personalized outreach messages on LinkedIn, conduct 10 discovery calls with prospective clients, log call notes in HubSpot, and schedule two product demos.'
  },
  {
    id: 'career-tech-writer-documentation',
    title: 'Technical Content & Documentation Specialist',
    domain: 'Technical Writing & User Guides',
    category: 'Operations & Business',
    salaryTier: 'foundation',
    description: 'Write simple, easy-to-understand guides, software manuals, FAQs, and product articles that explain complex tech to regular users.',
    whyExciting: 'Perfect blend of technology and writing where you turn confusing tech jargon into crystal-clear instructions everyone understands.',
    salaryRange: '₹3.2 LPA - ₹5.8 LPA',
    averageSalaryIndia: '₹3.2 LPA - ₹5.8 LPA',
    growthOutlook: '+16% High Demand in Software Product Firms',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'Clear Technical Writing', importance: 'high', category: 'Writing' },
      { name: 'Markdown & GitHub Basics', importance: 'medium', category: 'Tools' },
      { name: 'API Documentation Basics', importance: 'medium', category: 'Technical' },
      { name: 'User Empathy & Simplification', importance: 'high', category: 'Soft Skills' },
      { name: 'Screenshot & Diagram Tools', importance: 'medium', category: 'Visuals' }
    ],
    recommendedDisciplines: ['English / Literature', 'BCA / B.Tech', 'Mass Communication', 'Any Graduate who Loves Writing'],
    topRecruiters: ['Zoho', 'Postman', 'Freshworks', 'Infosys', 'Wipro', 'Mindtree'],
    topRecruitersIndia: ['Zoho', 'Postman', 'Freshworks'],
    keyResponsibilities: [
      'Write step-by-step help guides and FAQs for new software feature releases',
      'Interview software engineers to understand product features and document them clearly',
      'Keep knowledge base articles organized, up-to-date, and easy to navigate'
    ],
    sampleJobTitles: ['Junior Technical Writer', 'Documentation Associate', 'Content Developer', 'Knowledge Base Specialist'],
    interviewTopics: ['Explaining a Complex Concept to a Beginner', 'Structuring a Software User Guide', 'Active Voice vs Passive Voice in Manuals', 'API Reference Formatting'],
    portfolioProjects: ['Complete Beginner Guide & Tutorial for an Open-Source Tool', 'Sample REST API Documentation Guide with Code Examples'],
    dayInTheLife: 'Test a newly released software feature, write an illustrated step-by-step guide in Markdown, collaborate with the developer to verify accuracy, and publish to the help center.'
  },
  {
    id: 'career-customer-support-success',
    title: 'Customer Support & Client Success Specialist',
    domain: 'Client Relations & Customer Support',
    category: 'Operations & Business',
    salaryTier: 'foundation',
    description: 'Assist customers with questions via live chat and email, resolve account issues, and guide users on getting the most value from products.',
    whyExciting: 'Develop strong interpersonal and communication skills while serving as the helpful face of the company to happy users.',
    salaryRange: '₹2.6 LPA - ₹4.8 LPA',
    averageSalaryIndia: '₹2.6 LPA - ₹4.8 LPA',
    growthOutlook: '+15% Steady Year-Round Hiring',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'Empathetic Communication', importance: 'high', category: 'Soft Skills' },
      { name: 'Helpdesk Software (Zendesk / Freshdesk)', importance: 'medium', category: 'Tools' },
      { name: 'Problem Solving & Troubleshooting', importance: 'high', category: 'Support' },
      { name: 'Multi-Tasking & Organization', importance: 'high', category: 'Productivity' },
      { name: 'Patience & Calm Demeanor', importance: 'high', category: 'Soft Skills' }
    ],
    recommendedDisciplines: ['Any Graduate', 'B.A.', 'B.Com', 'B.Sc', 'BBA'],
    topRecruiters: ['Amazon Customer Care', 'Freshworks', 'Swiggy', 'Concentrix', 'Teleperformance', 'Flipkart'],
    topRecruitersIndia: ['Amazon', 'Freshworks', 'Concentrix'],
    keyResponsibilities: [
      'Answer customer support inquiries through live chat, email tickets, and calls with warmth and speed',
      'Identify recurring user difficulties and report them to the engineering product team',
      'Maintain top customer satisfaction scores by resolving problems on first contact'
    ],
    sampleJobTitles: ['Customer Support Associate', 'Client Success Specialist', 'User Experience Associate', 'Support Executive'],
    interviewTopics: ['How to Handle an Upset Customer with Empathy', 'Steps to Troubleshoot an Unclear Issue', 'Prioritizing Urgent Support Tickets', 'Clear & Friendly Email Etiquette'],
    portfolioProjects: ['Customer Support Onboarding Guide & FAQ Framework', 'Simulated Customer De-Escalation Chat Scripts'],
    dayInTheLife: 'Log in to the Zendesk dashboard, respond to customer live chats, help an account owner reset credentials, report an app bug to engineers, and check satisfaction scores.'
  },

  // =========================================================================
  // SECTION 2: MID / GROWTH SALARY TIER (₹6.5 LPA - ₹14.0 LPA)
  // High career acceleration, modern skills, strong corporate demand
  // =========================================================================
  {
    id: 'career-data-analyst',
    title: 'Data Analyst & Business Intelligence Specialist',
    domain: 'Data Analytics & Business Intelligence',
    category: 'AI & Data Science',
    salaryTier: 'growth',
    description: 'Analyze business numbers, write SQL queries to discover trends, and build interactive Power BI charts that help business leaders make smart decisions.',
    whyExciting: 'Every company wants data-driven answers. You become the go-to person who translates raw numbers into strategic growth insights.',
    salaryRange: '₹6.5 LPA - ₹13.0 LPA',
    averageSalaryIndia: '₹6.5 LPA - ₹13.0 LPA',
    growthOutlook: '+26% Extremely High Industry Demand',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Advanced SQL (Joins, Window Functions)', importance: 'high', category: 'Databases' },
      { name: 'Power BI & Tableau Dashboards', importance: 'high', category: 'BI Tools' },
      { name: 'Python for Data Analysis (Pandas)', importance: 'high', category: 'Programming' },
      { name: 'Business Statistics & Probability', importance: 'medium', category: 'Analytics' },
      { name: 'Executive Storytelling with Data', importance: 'medium', category: 'Soft Skills' }
    ],
    recommendedDisciplines: ['Computer Science', 'Data Science', 'Mathematics / Statistics', 'Mechanical / Civil / Electrical', 'Commerce / Economics'],
    topRecruiters: ['Deloitte', 'Mu Sigma', 'Fractal Analytics', 'LatentView', 'EY', 'PwC', 'Accenture'],
    topRecruitersIndia: ['Deloitte', 'Mu Sigma', 'Fractal', 'LatentView'],
    keyResponsibilities: [
      'Query relational databases using SQL to extract customer retention, revenue, and churn metrics',
      'Build automated live dashboards in Power BI and Tableau with interactive slicers and KPI cards',
      'Conduct statistical data exploration in Python (Pandas/NumPy) to reveal sales trends'
    ],
    sampleJobTitles: ['Data Analyst', 'BI Developer', 'Business Intelligence Associate', 'Decision Analytics Specialist'],
    interviewTopics: ['SQL Window Functions (ROW_NUMBER, DENSE_RANK)', 'Star Schema Data Modeling vs Snowflake', 'DAX Measures in Power BI', 'Pandas GroupBy & Merge Operations'],
    portfolioProjects: ['E-Commerce Profitability Dashboard in Power BI', 'Customer Churn Analysis & Segmentation using Python & SQL'],
    dayInTheLife: 'Run morning SQL queries to refresh key metrics, design a new visual report in Power BI, present weekly sales findings to team leaders, and explore churn patterns.'
  },
  {
    id: 'career-qa-automation',
    title: 'QA Automation Engineer (Selenium & Playwright)',
    domain: 'Automated Testing & Software Quality',
    category: 'Software & Cloud',
    salaryTier: 'growth',
    description: 'Write automated code scripts that test web and mobile apps continuously, catching bugs automatically before code hits production.',
    whyExciting: 'Bridge testing and software development—replace repetitive manual clicking with blazing-fast automated code scripts.',
    salaryRange: '₹6.0 LPA - ₹12.5 LPA',
    averageSalaryIndia: '₹6.0 LPA - ₹12.5 LPA',
    growthOutlook: '+24% High Acceleration Over Manual QA',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Selenium / Playwright / Cypress', importance: 'high', category: 'Automation' },
      { name: 'Java / Python / TypeScript', importance: 'high', category: 'Programming' },
      { name: 'TestNG / PyTest Frameworks', importance: 'high', category: 'Frameworks' },
      { name: 'CI/CD Pipelines (GitHub Actions / Jenkins)', importance: 'medium', category: 'DevOps' },
      { name: 'REST API Automation (RestAssured / Postman)', importance: 'high', category: 'API' }
    ],
    recommendedDisciplines: ['Computer Science', 'Information Technology', 'BCA / MCA', 'Any Engineering Branch'],
    topRecruiters: ['Thoughtworks', 'QualiTest', 'Accenture', 'Capgemini', 'Wipro', 'EPAM'],
    topRecruitersIndia: ['Thoughtworks', 'Accenture', 'Capgemini'],
    keyResponsibilities: [
      'Design modular Page Object Model (POM) test automation frameworks in Java or Python',
      'Automate end-to-end user checkout and authentication journeys across browsers',
      'Integrate automated test runs into CI/CD pipelines to run on every code commit'
    ],
    sampleJobTitles: ['Automation Test Engineer', 'SDET (Software Development Engineer in Test)', 'QA Automation Specialist'],
    interviewTopics: ['Page Object Model Architecture', 'Handling Dynamic Web Elements & Waits', 'API Test Automation Assertions', 'CI/CD Integration for Nightly Test Runs'],
    portfolioProjects: ['Full-Stack E-Commerce Test Automation Suite in Playwright & TypeScript', 'Automated REST API Testing Framework in RestAssured'],
    dayInTheLife: 'Check results of overnight automated test runs, write automated scripts for three newly deployed features, and debug a flaky test script.'
  },
  {
    id: 'career-uiux-designer',
    title: 'UI/UX Product Designer',
    domain: 'User Experience & Product Interface',
    category: 'Product & Design',
    salaryTier: 'growth',
    description: 'Research user needs, design sleek wireframes, build clickable Figma prototypes, and create joyful app experiences people love using.',
    whyExciting: 'Shape how millions interact with digital technology through intuitive, beautiful, and effortless app layouts.',
    salaryRange: '₹7.0 LPA - ₹14.0 LPA',
    averageSalaryIndia: '₹7.0 LPA - ₹14.0 LPA',
    growthOutlook: '+28% Fast Growth Across Tech Startups',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Figma Component Systems & Auto Layout', importance: 'high', category: 'Design Tools' },
      { name: 'User Research & Journey Mapping', importance: 'high', category: 'UX Research' },
      { name: 'Interactive Prototyping', importance: 'high', category: 'Prototyping' },
      { name: 'Usability Testing', importance: 'medium', category: 'Testing' },
      { name: 'Design Tokens & Design Systems', importance: 'medium', category: 'Systems' }
    ],
    recommendedDisciplines: ['Design (B.Des)', 'Computer Science / Human Computer Interaction', 'Architecture', 'Any Passionate Designer'],
    topRecruiters: ['Swiggy', 'Zomato', 'CRED', 'Razorpay', 'Flipkart', 'MakeMyTrip'],
    topRecruitersIndia: ['Swiggy', 'Zomato', 'CRED', 'Razorpay'],
    keyResponsibilities: [
      'Conduct customer interviews and usability audits to identify user frustrations',
      'Design clean wireframes and interactive prototypes in Figma with Auto Layout',
      'Build scalable design systems with reusable buttons, form fields, and color tokens'
    ],
    sampleJobTitles: ['Product Designer', 'UI/UX Designer', 'Interaction Designer', 'User Experience Associate'],
    interviewTopics: ['Design Thinking Process & User Journey Mapping', 'Information Architecture & Wireframing', 'Color Contrast & Accessibility (WCAG)', 'Handling Developer Handoff in Figma'],
    portfolioProjects: ['Mobile Banking App Redesign with Complete Usability Case Study', 'Design System with Tokens, Dark Mode, and 40+ Interactive Components'],
    dayInTheLife: 'Review user feedback on the checkout flow, craft high-fidelity Figma screens with Auto Layout, test a prototype with three users, and hand off specs to engineers.'
  },
  {
    id: 'career-bioinformatics-scientist',
    title: 'Bioinformatics & Computational Health Specialist',
    domain: 'Genomics, Computational Biology & Healthcare Tech',
    category: 'Biotechnology & Health',
    salaryTier: 'growth',
    description: 'Use Python and algorithmic tools to analyze human DNA sequences, discover disease biomarkers, and support new medical breakthroughs.',
    whyExciting: 'Pioneer the future of personalized medicine by decoding human genomics with cutting-edge computational power.',
    salaryRange: '₹7.0 LPA - ₹14.0 LPA',
    averageSalaryIndia: '₹7.0 LPA - ₹14.0 LPA',
    growthOutlook: '+25% Expanding Fast in Healthcare & Pharma',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Next-Generation Sequencing (NGS) Analysis', importance: 'high', category: 'Genomics' },
      { name: 'Python for Bioinformatics (Biopython)', importance: 'high', category: 'Programming' },
      { name: 'R / Bioconductor for Biostatistics', importance: 'high', category: 'Data Analysis' },
      { name: 'Linux Command Line & Bash Scripting', importance: 'high', category: 'Systems' },
      { name: 'Molecular Docking & Biomarker Analysis', importance: 'medium', category: 'Bioinformatics' }
    ],
    recommendedDisciplines: ['Biotechnology', 'Bioinformatics', 'Biomedical Engineering', 'Computer Science with Biology Interest'],
    topRecruiters: ['Biocon', 'Strand Life Sciences', 'Dr. Reddy\'s', 'Bharat Biotech', 'Syngene', 'Thermo Fisher'],
    topRecruitersIndia: ['Biocon', 'Strand Life Sciences', 'Dr. Reddy\'s'],
    keyResponsibilities: [
      'Process raw genomic sequencing data (FASTQ/BAM/VCF) using quality filters and alignment pipelines',
      'Perform statistical differential gene expression analysis using R and Bioconductor packages',
      'Build automated Python scripts to identify therapeutic targets and cancer biomarkers'
    ],
    sampleJobTitles: ['Bioinformatician', 'Computational Biologist', 'Genomic Data Analyst', 'Bioinformatics Scientist'],
    interviewTopics: ['Variant Calling Pipelines (GATK / BWA)', 'FASTQ Quality Metrics (FastQC)', 'RNA-Seq Differential Expression (DESeq2)', 'Phylogenetic Trees and Sequence Alignment (BLAST)'],
    portfolioProjects: ['Cancer RNA-Seq Biomarker Discovery Pipeline in Python & R', 'Automated Genomic Variant Annotation Script in Bash & Python'],
    dayInTheLife: 'Run alignment jobs on the Linux cluster, check sequencing quality scores, generate statistical volcano plots in R, and discuss findings with the clinical research team.'
  },
  {
    id: 'career-smart-infrastructure-bim',
    title: 'Smart Infrastructure & BIM Structural Coordinator',
    domain: 'BIM Modeling & Smart Infrastructure',
    category: 'Smart Infrastructure',
    salaryTier: 'growth',
    description: 'Build detailed 3D digital building models, detect structural pipe clashes before building begins, and coordinate large metro and airport projects.',
    whyExciting: 'Combine civil engineering with 3D digital twins to construct massive infrastructure without costly site errors.',
    salaryRange: '₹6.5 LPA - ₹13.5 LPA',
    averageSalaryIndia: '₹6.5 LPA - ₹13.5 LPA',
    growthOutlook: '+23% High Requirement for Modern Megaprojects',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Autodesk Revit (Architecture & Structure)', importance: 'high', category: 'BIM' },
      { name: 'Navisworks Clash Detection', importance: 'high', category: 'Clash Coordination' },
      { name: 'BIM 360 / Autodesk Construction Cloud', importance: 'medium', category: 'Cloud Collaboration' },
      { name: 'STAAD.Pro / ETABS Analysis', importance: 'medium', category: 'Structural' },
      { name: 'Structural Working Details', importance: 'high', category: 'Drafting' }
    ],
    recommendedDisciplines: ['Civil Engineering', 'Structural Engineering', 'Architecture (B.Arch)'],
    topRecruiters: ['L&T Construction', 'Tata Projects', 'AtkinsRealis', 'WSP', 'Afcons Infrastructure', 'AECOM'],
    topRecruitersIndia: ['L&T Construction', 'Tata Projects', 'AtkinsRealis'],
    keyResponsibilities: [
      'Develop parametric 3D structural building models in Autodesk Revit from structural calculations',
      'Run automated clash tests in Navisworks between structural beams and electrical/plumbing ducts',
      'Coordinate weekly clash resolution meetings with project architects and site managers'
    ],
    sampleJobTitles: ['BIM Coordinator', 'Structural BIM Modeler', 'BIM Engineer', 'Smart Infrastructure Specialist'],
    interviewTopics: ['BIM Dimensions (3D, 4D Scheduling, 5D Costing)', 'Hard Clashes vs Soft Clashes in Navisworks', 'Levels of Detail (LOD 200 vs LOD 400)', 'Revit Family Creation & Shared Parameters'],
    portfolioProjects: ['Metro Station Structural Framing & BIM Clash Detection in Revit & Navisworks', 'Multi-Story Reinforced Concrete Building Analysis in ETABS'],
    dayInTheLife: 'Open the updated Revit model, run Navisworks clash reports against mechanical plumbing layouts, document resolutions in BIM 360, and share reports with structural leads.'
  },
  {
    id: 'career-industrial-automation-plc',
    title: 'Industrial Automation & PLC Controls Engineer',
    domain: 'Industrial Automation & Smart Manufacturing',
    category: 'Hardware & Robotics',
    salaryTier: 'growth',
    description: 'Program PLC controllers, configure factory sensors and robotics, and build SCADA dashboards that run modern automated assembly lines.',
    whyExciting: 'Bring factory machines to life—you write the logic that coordinates conveyor belts, robotic arms, and industrial sensors in real time.',
    salaryRange: '₹6.0 LPA - ₹12.0 LPA',
    averageSalaryIndia: '₹6.0 LPA - ₹12.0 LPA',
    growthOutlook: '+22% Rapid Industrial Modernization',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'PLC Programming (Siemens / Allen-Bradley / Delta)', importance: 'high', category: 'PLC' },
      { name: 'SCADA & HMI Design', importance: 'high', category: 'SCADA' },
      { name: 'Industrial Protocols (Modbus, Profinet)', importance: 'high', category: 'Networking' },
      { name: 'Sensor & Actuator Interfacing', importance: 'high', category: 'Hardware' },
      { name: 'Electrical Panel Schematics', importance: 'medium', category: 'Electrical' }
    ],
    recommendedDisciplines: ['Electrical Engineering', 'Electronics & Instrumentation', 'Mechanical Engineering', 'Mechatronics'],
    topRecruiters: ['Siemens', 'Schneider Electric', 'ABB', 'Rockwell Automation', 'Honeywell', 'Tata Motors'],
    topRecruitersIndia: ['Siemens', 'Schneider Electric', 'ABB'],
    keyResponsibilities: [
      'Write Ladder Logic and Structured Text programs for Siemens and Rockwell PLC controllers',
      'Design user-friendly HMI touchscreens for factory operators to control plant machinery safely',
      'Commission electrical panels and industrial communication networks on the factory floor'
    ],
    sampleJobTitles: ['Automation Engineer', 'PLC Programmer', 'Controls Engineer', 'SCADA Specialist'],
    interviewTopics: ['Ladder Logic Instructions & Timers/Counters', 'Analog Input Scaling (4-20mA / 0-10V)', 'Difference Between Modbus RTU and Modbus TCP', 'Emergency Stop Safety Interlocks'],
    portfolioProjects: ['Bottle Filling & Capping Plant Automation Logic in Siemens TIA Portal', 'Factory SCADA Dashboard with Real-Time Alarm Monitoring'],
    dayInTheLife: 'Upload new ladder logic to the assembly PLC, calibrate temperature and pressure sensors, test safety emergency stops, and monitor live motor currents on the HMI screen.'
  },
  {
    id: 'career-associate-product-manager',
    title: 'Associate Product Manager (APM)',
    domain: 'Product Strategy & Tech Management',
    category: 'Product & Design',
    salaryTier: 'growth',
    description: 'Coordinate between software engineers, designers, and business leaders to define feature requirements and guide new apps from idea to launch.',
    whyExciting: 'Be the mini-CEO of a software feature—decide what gets built next, why it matters to users, and how to measure product success.',
    salaryRange: '₹8.0 LPA - ₹14.5 LPA',
    averageSalaryIndia: '₹8.0 LPA - ₹14.5 LPA',
    growthOutlook: '+27% Highly Coveted Fast-Track Career',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Product Requirement Documents (PRDs)', importance: 'high', category: 'Documentation' },
      { name: 'Agile & Scrum Sprint Planning', importance: 'high', category: 'Methodology' },
      { name: 'Product Analytics (Mixpanel / Amplitude)', importance: 'high', category: 'Analytics' },
      { name: 'User Empathy & Prioritization', importance: 'high', category: 'Strategy' },
      { name: 'Wireframing & User Stories', importance: 'medium', category: 'Design' }
    ],
    recommendedDisciplines: ['Computer Science / IT', 'Engineering + Management Interest', 'Economics / Commerce', 'Any Analytical Mind'],
    topRecruiters: ['Swiggy', 'Zomato', 'CRED', 'Flipkart', 'MakeMyTrip', 'Razorpay', 'Jio'],
    topRecruitersIndia: ['Swiggy', 'Zomato', 'CRED', 'Razorpay'],
    keyResponsibilities: [
      'Author detailed Product Requirement Documents (PRDs) outlining feature specs and success metrics',
      'Lead daily standups and sprint planning sessions with development and design teams',
      'Analyze customer funnel drop-offs using analytics tools to identify product improvements'
    ],
    sampleJobTitles: ['Associate Product Manager', 'Product Analyst', 'Junior Product Manager', 'Technical Product Associate'],
    interviewTopics: ['Feature Prioritization Frameworks (RICE / MoSCoW)', 'Root Cause Analysis for Drop in Daily Active Users', 'Designing a Product for a Specific User Persona', 'Writing Clear Acceptance Criteria'],
    portfolioProjects: ['End-to-End PRD for a Quick-Commerce Loyalty Feature', 'User Onboarding Funnel Analysis & Optimization Case Study'],
    dayInTheLife: 'Review product analytics metrics from yesterday, lead the sprint backlog grooming with developers, test the prototype of a new checkout feature, and finalize the PRD for next month.'
  },
  {
    id: 'career-embedded-firmware-engineer',
    title: 'Embedded Systems & Firmware Engineer',
    domain: 'Embedded Systems, Microcontrollers & IoT',
    category: 'Hardware & Robotics',
    salaryTier: 'growth',
    description: 'Write ultra-efficient C/C++ code that runs inside microcontrollers, smart gadgets, electric vehicles, and IoT sensor devices.',
    whyExciting: 'Bridge software with physical electronics—your code directly controls motors, batteries, screens, and wireless Bluetooth chips.',
    salaryRange: '₹7.0 LPA - ₹14.0 LPA',
    averageSalaryIndia: '₹7.0 LPA - ₹14.0 LPA',
    growthOutlook: '+25% Booming Demand in EV, IoT & Hardware',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Embedded C / C++', importance: 'high', category: 'Programming' },
      { name: 'Microcontrollers (ARM Cortex-M / STM32 / ESP32)', importance: 'high', category: 'Hardware' },
      { name: 'Communication Protocols (I2C, SPI, UART, CAN)', importance: 'high', category: 'Protocols' },
      { name: 'FreeRTOS Multitasking', importance: 'high', category: 'RTOS' },
      { name: 'Oscilloscope & Logic Analyzer Debugging', importance: 'medium', category: 'Tools' }
    ],
    recommendedDisciplines: ['Electronics & Communication (ECE)', 'Electrical & Electronics (EEE)', 'Computer Engineering', 'Instrumentation'],
    topRecruiters: ['Qualcomm', 'Texas Instruments', 'Bosch', 'Continental', 'Ather Energy', 'Ola Electric'],
    topRecruitersIndia: ['Qualcomm', 'Bosch', 'Ather Energy'],
    keyResponsibilities: [
      'Develop bare-metal driver code and FreeRTOS firmware tasks in Embedded C',
      'Interface hardware sensors, displays, and wireless transceivers over I2C, SPI, and UART',
      'Debug real-time timing issues, memory leaks, and signal integrity using logic analyzers'
    ],
    sampleJobTitles: ['Embedded Software Engineer', 'Firmware Engineer', 'IoT Systems Developer', 'Microcontroller Specialist'],
    interviewTopics: ['Pointers & Volatile Keyword in Embedded C', 'Interrupt Service Routine (ISR) Best Practices', 'I2C vs SPI Protocol Comparison', 'FreeRTOS Semaphores, Mutexes & Queues'],
    portfolioProjects: ['STM32 IoT Environmental Weather Node with FreeRTOS & MQTT', 'CAN-Bus Telemetry Node for Electric Vehicle Battery Monitoring'],
    dayInTheLife: 'Connect the logic analyzer to the sensor bus, debug an intermittent I2C communication timeout, write driver routines for a new display, and measure battery power consumption.'
  },

  // =========================================================================
  // SECTION 3: HIGH / PREMIUM SALARY TIER (₹14.0 LPA - ₹50.0+ LPA)
  // Elite technology, cutting-edge AI, quant algorithms, massive compensation
  // =========================================================================
  {
    id: 'career-fullstack-dev',
    title: 'Full Stack Software Engineer',
    domain: 'Software Engineering & Cloud Architecture',
    category: 'Software & Cloud',
    salaryTier: 'premium',
    description: 'Design and build high-performance web applications from front to back, crafting responsive React UIs, Node.js microservices, and database architectures.',
    whyExciting: 'The versatile powerhouse of technology—you can build an entire digital product from scratch and scale it to millions of happy users.',
    salaryRange: '₹12.0 LPA - ₹24.0 LPA (High Growth)',
    averageSalaryIndia: '₹12.0 LPA - ₹24.0 LPA',
    growthOutlook: '+28% Consistently High Demand Worldwide',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'React.js & Next.js', importance: 'high', category: 'Frontend' },
      { name: 'Node.js & TypeScript', importance: 'high', category: 'Backend' },
      { name: 'PostgreSQL & MongoDB', importance: 'high', category: 'Databases' },
      { name: 'REST APIs & GraphQL', importance: 'high', category: 'API' },
      { name: 'Docker & Cloud Deployment', importance: 'medium', category: 'DevOps' },
      { name: 'Data Structures & Algorithms', importance: 'high', category: 'CS Fundamentals' }
    ],
    recommendedDisciplines: ['Computer Science', 'Information Technology', 'Electronics & Comm', 'Any Major with Strong Coding Portfolio'],
    topRecruiters: ['Microsoft', 'Google', 'Amazon', 'Flipkart', 'Swiggy', 'CRED', 'Razorpay'],
    topRecruitersIndia: ['Microsoft', 'Amazon', 'Flipkart', 'CRED'],
    keyResponsibilities: [
      'Architect robust web applications using React, Next.js, Node.js, and TypeScript',
      'Design efficient SQL database schemas, write indexed queries, and manage caching with Redis',
      'Deploy containerized microservices to cloud platforms with CI/CD automated pipelines'
    ],
    sampleJobTitles: ['Software Development Engineer (SDE)', 'Full Stack Developer', 'Backend Engineer', 'Product Engineer'],
    interviewTopics: ['Data Structures & Algorithms (Trees, Graphs, DP)', 'System Design & Scalability Patterns', 'Database Indexing & ACID Transactions', 'Asynchronous Event Loop in Node.js'],
    portfolioProjects: ['Collaborative Real-Time Workspace with WebSockets and PostgreSQL', 'Production SaaS Web App with Authentication, Billing & Cloud Storage'],
    dayInTheLife: 'Review pull requests from the team, write clean backend APIs for new feature flows, profile slow database queries to boost speed, and deploy code to production.'
  },
  {
    id: 'career-ai-ml-engineer',
    title: 'AI & Machine Learning Engineer',
    domain: 'Artificial Intelligence & Deep Learning',
    category: 'AI & Data Science',
    salaryTier: 'premium',
    description: 'Build and deploy intelligent AI systems, train machine learning models, implement generative AI tools, and power smart automation.',
    whyExciting: 'Work at the bleeding edge of the AI revolution—train algorithms that can see, read, generate content, and solve intricate problems.',
    salaryRange: '₹16.0 LPA - ₹34.0 LPA (High Premium)',
    averageSalaryIndia: '₹16.0 LPA - ₹34.0 LPA',
    growthOutlook: '+35% Fastest Growing High-Tech Field',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Python & PyTorch / TensorFlow', importance: 'high', category: 'AI/ML' },
      { name: 'Generative AI & LLMs (RAG, Fine-Tuning)', importance: 'high', category: 'GenAI' },
      { name: 'Machine Learning Algorithms', importance: 'high', category: 'Core ML' },
      { name: 'Vector Databases (Pinecone, Chroma)', importance: 'medium', category: 'AI Tools' },
      { name: 'Model Deployment (FastAPI, Docker, ONNX)', importance: 'high', category: 'MLOps' }
    ],
    recommendedDisciplines: ['Computer Science', 'AI & Data Science', 'Mathematics & Computing', 'Electrical Engineering'],
    topRecruiters: ['Google DeepMind', 'Microsoft Research', 'Amazon AWS', 'Adobe', 'NVIDIA', 'Flipkart AI'],
    topRecruitersIndia: ['Google', 'Microsoft', 'NVIDIA', 'Adobe'],
    keyResponsibilities: [
      'Train, fine-tune, and evaluate deep learning models using PyTorch on GPU clusters',
      'Build Retrieval-Augmented Generation (RAG) pipelines for enterprise knowledge assistants',
      'Optimize AI model inference speed using quantization and ONNX runtime for production serving'
    ],
    sampleJobTitles: ['AI Engineer', 'Machine Learning Engineer', 'Deep Learning Specialist', 'Applied AI Scientist'],
    interviewTopics: ['Transformers Architecture & Self-Attention', 'Overfitting Prevention & Regularization Techniques', 'Evaluating Models (Precision, Recall, ROC-AUC, F1)', 'Vector Search & Embedding Spaces'],
    portfolioProjects: ['Production RAG AI Document Assistant with Semantic Search & Citations', 'Computer Vision Defect Detection Model Deployed via FastAPI & Docker'],
    dayInTheLife: 'Analyze training loss curves on the cloud GPU cluster, fine-tune an embedding model for better document search, evaluate hallucinations, and optimize API latency.'
  },
  {
    id: 'career-cloud-devops-architect',
    title: 'Cloud Solutions & DevOps Architect',
    domain: 'Cloud Infrastructure, DevOps & Reliability',
    category: 'Software & Cloud',
    salaryTier: 'premium',
    description: 'Design resilient cloud systems on AWS and GCP, automate server deployments with Kubernetes, and ensure digital services stay online 24/7.',
    whyExciting: 'Hold the master keys to global digital infrastructure—ensure apps handling millions of requests never go down.',
    salaryRange: '₹18.0 LPA - ₹38.0 LPA (High Premium)',
    averageSalaryIndia: '₹18.0 LPA - ₹38.0 LPA',
    growthOutlook: '+30% Immense Corporate Cloud Migration',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'AWS / Google Cloud (GCP)', importance: 'high', category: 'Cloud' },
      { name: 'Kubernetes (K8s) & Container Orchestration', importance: 'high', category: 'Containers' },
      { name: 'Docker & Microservices', importance: 'high', category: 'Containers' },
      { name: 'Terraform (Infrastructure as Code)', importance: 'high', category: 'IaC' },
      { name: 'CI/CD Pipelines & Monitoring (Prometheus/Grafana)', importance: 'high', category: 'DevOps' }
    ],
    recommendedDisciplines: ['Computer Science', 'Information Technology', 'Electronics & Comm', 'Any Tech Major'],
    topRecruiters: ['Amazon Web Services', 'Google Cloud', 'Microsoft Azure', 'Salesforce', 'Cisco', 'Red Hat'],
    topRecruitersIndia: ['AWS', 'Google Cloud', 'Salesforce', 'Cisco'],
    keyResponsibilities: [
      'Provision scalable, secure multi-region cloud infrastructure using Terraform',
      'Manage production Kubernetes clusters with auto-scaling, ingress controllers, and zero-downtime rollouts',
      'Implement real-time system monitoring, distributed tracing, and automated alert systems'
    ],
    sampleJobTitles: ['Cloud Architect', 'DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Platform Engineer'],
    interviewTopics: ['Kubernetes Pod Lifecycle & Scheduling', 'Terraform State Management & Drift Detection', 'High Availability, Multi-AZ Architectures & Disaster Recovery', 'Zero-Downtime Blue-Green & Canary Deployments'],
    portfolioProjects: ['Multi-Tier Kubernetes Cluster Deployment with Terraform & ArgoCD', 'Automated CI/CD Pipeline with Security Scanning and Slack Notifications'],
    dayInTheLife: 'Inspect cloud cost metrics, update Terraform infrastructure files for a new microservice cluster, test canary deployment rollouts, and review automated system health monitors.'
  },
  {
    id: 'career-cybersecurity-specialist',
    title: 'Cybersecurity & Ethical Hacking Specialist',
    domain: 'Cyber Defense & Information Security',
    category: 'Cybersecurity & Systems',
    salaryTier: 'premium',
    description: 'Defend enterprise networks from cyber threats, uncover hidden vulnerabilities through ethical hacking, and protect sensitive consumer data.',
    whyExciting: 'Digital guardians—use elite hacking skills for good to protect critical banks, businesses, and infrastructure from malicious attackers.',
    salaryRange: '₹15.0 LPA - ₹32.0 LPA (High Premium)',
    averageSalaryIndia: '₹15.0 LPA - ₹32.0 LPA',
    growthOutlook: '+32% High Priority for Financial & Tech Giants',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Penetration Testing & Ethical Hacking', importance: 'high', category: 'Security' },
      { name: 'Network Security & Firewalls', importance: 'high', category: 'Networks' },
      { name: 'OWASP Top 10 Web Security', importance: 'high', category: 'Web Security' },
      { name: 'Security Information & Event Management (SIEM)', importance: 'medium', category: 'Monitoring' },
      { name: 'Cryptography & Identity Management', importance: 'high', category: 'Security' }
    ],
    recommendedDisciplines: ['Computer Science', 'Cybersecurity', 'Information Technology', 'Electronics & Comm'],
    topRecruiters: ['Palo Alto Networks', 'CrowdStrike', 'Cisco Security', 'KPMG', 'EY Security', 'Goldman Sachs'],
    topRecruitersIndia: ['Palo Alto Networks', 'Cisco', 'Goldman Sachs'],
    keyResponsibilities: [
      'Conduct authorized web application and network vulnerability assessments and penetration tests',
      'Investigate security alerts, detect malicious network traffic, and coordinate incident response',
      'Review software architecture for secure coding practices and cryptographic protection'
    ],
    sampleJobTitles: ['Security Analyst', 'Penetration Tester', 'SOC Analyst', 'Information Security Engineer'],
    interviewTopics: ['OWASP Top 10 Vulnerabilities (SQL Injection, XSS, SSRF)', 'Public Key Cryptography & TLS Handshake', 'Threat Hunting & Incident Response Playbooks', 'Network Packet Analysis in Wireshark'],
    portfolioProjects: ['Comprehensive Vulnerability Assessment & Pen-Test Report for a Web Portal', 'Automated Network Threat Detection Script in Python & Wireshark'],
    dayInTheLife: 'Review overnight security alerts in the SIEM dashboard, perform an authorized penetration test on a newly created API, and document remediations for the engineering team.'
  },
  {
    id: 'career-robotics-autonomous-engineer',
    title: 'Robotics & Autonomous Systems Engineer',
    domain: 'Robotics, Computer Vision & Autonomous Systems',
    category: 'Hardware & Robotics',
    salaryTier: 'premium',
    description: 'Design intelligent robots and self-driving systems, combining computer vision, lidar mapping, kinematics, and real-time motion controllers.',
    whyExciting: 'Build the machines of the future—create physical robots that can see, navigate, and perform smart tasks completely on their own.',
    salaryRange: '₹16.0 LPA - ₹36.0 LPA (High Premium)',
    averageSalaryIndia: '₹16.0 LPA - ₹36.0 LPA',
    growthOutlook: '+31% Rapid Expansion in Autonomous Vehicles & Drones',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'ROS 2 (Robot Operating System)', importance: 'high', category: 'Robotics' },
      { name: 'Computer Vision & OpenCV', importance: 'high', category: 'Vision' },
      { name: 'C++ & Python for Robotics', importance: 'high', category: 'Programming' },
      { name: 'SLAM & Navigation (LiDAR / IMU)', importance: 'high', category: 'Navigation' },
      { name: 'Robotics Kinematics & Motion Control', importance: 'medium', category: 'Kinematics' }
    ],
    recommendedDisciplines: ['Robotics & Mechatronics', 'Mechanical Engineering', 'Electronics & Comm', 'Computer Science'],
    topRecruiters: ['Ather Energy', 'Ola Electric', 'GreyOrange', 'Addverb Technologies', 'Bosch', 'Tesla'],
    topRecruitersIndia: ['Ather Energy', 'GreyOrange', 'Addverb'],
    keyResponsibilities: [
      'Develop robotic navigation, obstacle avoidance, and path-planning algorithms using ROS 2',
      'Integrate LiDAR, stereo cameras, and IMU sensors for real-time Simultaneous Localization and Mapping (SLAM)',
      'Design robotic arm kinematics and test autonomous mobile robots (AMRs) in simulated and warehouse environments'
    ],
    sampleJobTitles: ['Robotics Engineer', 'Autonomous Systems Developer', 'Perception Engineer', 'Robotics Software Engineer'],
    interviewTopics: ['Forward and Inverse Kinematics', 'Kalman Filters & Sensor Fusion', 'SLAM Algorithms & Point Cloud Processing', 'Real-Time ROS 2 Publisher/Subscriber Architecture'],
    portfolioProjects: ['Autonomous Mobile Robot (AMR) Simulation with LiDAR SLAM in Gazebo & ROS 2', 'Real-Time Object Detection & Visual Servoing Robot in OpenCV & Python'],
    dayInTheLife: 'Test path-planning algorithms in Gazebo simulator, calibrate camera and LiDAR sensors on the prototype robot, and test obstacle avoidance on the indoor obstacle track.'
  },
  {
    id: 'career-fintech-financial-analyst',
    title: 'Financial Modeling & FinTech Specialist',
    domain: 'Quantitative Finance, Valuation & FinTech',
    category: 'Finance & FinTech',
    salaryTier: 'premium',
    description: 'Build mathematical financial valuation models, analyze stock and bond markets, and design modern FinTech payment and credit systems.',
    whyExciting: 'Combine finance smarts with modern software to understand multi-billion-dollar deals and shape next-generation digital banking.',
    salaryRange: '₹15.0 LPA - ₹30.0 LPA (High Premium)',
    averageSalaryIndia: '₹15.0 LPA - ₹30.0 LPA',
    growthOutlook: '+26% Strong Inflow into FinTech & Investment',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Discounted Cash Flow (DCF) & LBO Valuation', importance: 'high', category: 'Valuation' },
      { name: 'Financial Modeling in Excel', importance: 'high', category: 'Finance' },
      { name: 'Python for Financial Analysis', importance: 'high', category: 'Programming' },
      { name: 'Corporate Finance & Capital Markets', importance: 'high', category: 'Finance' },
      { name: 'SQL for Financial Data', importance: 'medium', category: 'Databases' }
    ],
    recommendedDisciplines: ['Finance & Commerce', 'Economics', 'Engineering + CFA / MBA Aspirant', 'Mathematics / Statistics'],
    topRecruiters: ['Goldman Sachs', 'Morgan Stanley', 'J.P. Morgan', 'Nomura', 'Razorpay', 'CRED', 'Zerodha'],
    topRecruitersIndia: ['Goldman Sachs', 'Morgan Stanley', 'Zerodha', 'Razorpay'],
    keyResponsibilities: [
      'Build complex 3-statement integrated financial forecast and corporate valuation models',
      'Analyze transaction multiples, equity market trends, and venture investment opportunities',
      'Develop automated Python scripts to analyze portfolio risk and asset price movements'
    ],
    sampleJobTitles: ['Financial Analyst', 'FinTech Specialist', 'Investment Banking Associate', 'Valuation Analyst'],
    interviewTopics: ['Walking Through the 3 Financial Statements & Linking Them', 'Discounted Cash Flow (DCF) Mechanics & WACC Calculation', 'Enterprise Value vs Equity Value', 'Financial Ratios (ROIC, EBITDA Margin, Current Ratio)'],
    portfolioProjects: ['Comprehensive 3-Statement Financial Valuation Model for a Tech Company', 'Automated Portfolio Risk Analysis & Efficient Frontier Tool in Python'],
    dayInTheLife: 'Update company financial forecasts in Excel, conduct sensitivity analysis on revenue growth scenarios, build an investment presentation deck, and examine FinTech credit models.'
  },
  {
    id: 'career-quant-analyst',
    title: 'Quantitative Analyst & Algorithmic Trading Associate',
    domain: 'Quantitative Finance, Algorithms & High-Frequency Trading',
    category: 'Finance & FinTech',
    salaryTier: 'premium',
    description: 'Use advanced mathematical statistics, probability models, and ultra-fast C++ algorithms to forecast market price movements and execute trades.',
    whyExciting: 'The absolute pinnacle of financial engineering and compensation—where elite math and programming meet global capital markets.',
    salaryRange: '₹20.0 LPA - ₹50.0+ LPA (Elite Tier)',
    averageSalaryIndia: '₹20.0 LPA - ₹50.0+ LPA',
    growthOutlook: '+29% Skyrocketing Demand for Elite Mathematical Minds',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Advanced Probability & Statistics', importance: 'high', category: 'Math' },
      { name: 'High-Performance C++ & Python', importance: 'high', category: 'Programming' },
      { name: 'Algorithmic Trading & Backtesting', importance: 'high', category: 'Quant' },
      { name: 'Time-Series Analysis & Stochastic Calculus', importance: 'high', category: 'Analytics' },
      { name: 'Low-Latency Systems Design', importance: 'medium', category: 'Systems' }
    ],
    recommendedDisciplines: ['Mathematics & Computing', 'Computer Science', 'Electrical Engineering', 'Physics / Statistics'],
    topRecruiters: ['Jane Street', 'Tower Research Capital', 'Optiver', 'WorldQuant', 'Graviton Research', 'D.E. Shaw'],
    topRecruitersIndia: ['Tower Research', 'Graviton', 'WorldQuant', 'D.E. Shaw'],
    keyResponsibilities: [
      'Develop mathematical alpha trading signals across equities, futures, and currency markets',
      'Build robust statistical backtesting engines in Python to evaluate strategy Sharpe ratios and drawdowns',
      'Implement low-latency trade execution code in modern C++ with microsecond efficiency'
    ],
    sampleJobTitles: ['Quantitative Analyst (Quant)', 'Quantitative Trader', 'Algorithmic Strategist', 'Quantitative Developer'],
    interviewTopics: ['Probability Brainteasers & Expected Value Puzzles', 'Linear Regression & Time-Series Stationarity Tests', 'Modern C++ Memory Management & Cache Friendliness', 'The Black-Scholes Model & Option Greeks'],
    portfolioProjects: ['Multi-Asset Algorithmic Momentum Trading Strategy Backtested in Python', 'High-Speed Order Book Matching Engine Simulator in Modern C++'],
    dayInTheLife: 'Analyze statistical market anomalies from yesterday\'s market close, calibrate predictive trading signals in Python, backtest across 5 years of tick data, and monitor live trading algorithms.'
  },
  {
    id: 'career-blockchain-distributed-systems',
    title: 'Staff Distributed Systems & Web3 Architect',
    domain: 'Distributed Systems, Consensus Protocols & Cryptography',
    category: 'Software & Cloud',
    salaryTier: 'premium',
    description: 'Architect decentralized ledgers, design smart contracts, implement consensus protocols, and build tamper-proof cryptographic applications.',
    whyExciting: 'Design the trustless systems of tomorrow—build decentralized applications and consensus engines where cryptography replaces central servers.',
    salaryRange: '₹18.0 LPA - ₹42.0 LPA (High Premium)',
    averageSalaryIndia: '₹18.0 LPA - ₹42.0 LPA',
    growthOutlook: '+27% Strong High-Value Global Demand',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Rust / Go / Solidity', importance: 'high', category: 'Programming' },
      { name: 'Distributed Systems & Consensus (Raft / BFT)', importance: 'high', category: 'Systems' },
      { name: 'Cryptography (Zero-Knowledge, Hashes, Signatures)', importance: 'high', category: 'Security' },
      { name: 'Smart Contract Auditing & Security', importance: 'high', category: 'Auditing' },
      { name: 'P2P Networking & State Synchronization', importance: 'medium', category: 'Networking' }
    ],
    recommendedDisciplines: ['Computer Science', 'Mathematics & Computing', 'Information Technology'],
    topRecruiters: ['Polygon Labs', 'Consensys', 'Chainlink', 'Coinbase', 'Solana Labs', 'Binance'],
    topRecruitersIndia: ['Polygon Labs', 'Coinbase', 'Chainlink'],
    keyResponsibilities: [
      'Develop secure smart contracts and verify code against reentrancy and integer overflow attacks',
      'Architect distributed consensus mechanisms and high-throughput transaction pipelines in Rust and Go',
      'Implement zero-knowledge proof verification algorithms and decentralized identity systems'
    ],
    sampleJobTitles: ['Blockchain Architect', 'Distributed Systems Engineer', 'Smart Contract Engineer', 'Web3 Core Developer'],
    interviewTopics: ['Byzantine Fault Tolerance & Consensus Protocols', 'Zero-Knowledge Proofs & Merkle Trees', 'Smart Contract Security Pitfalls & Gas Optimization', 'P2P Gossip Protocols & State Pruning'],
    portfolioProjects: ['Decentralized Escrow Smart Contract Suite with Formal Auditing Suite in Foundry', 'Distributed Raft Consensus Key-Value Store Implemented in Go'],
    dayInTheLife: 'Review smart contract security audits, optimize bytecode gas consumption, run distributed node tests across multiple simulated cloud zones, and deploy updates to testnets.'
  },
  // --- ADDITIONAL COMPLEMENTARY ROLES FOR COMPLETE BRANCH SPECTRUM ---
  {
    id: 'career-biotech-lab-qc',
    title: 'Junior QC Lab & Clinical Quality Associate',
    domain: 'Pharmaceutical QC, Clinical Trials & Quality Assurance',
    category: 'Biotechnology & Health',
    salaryTier: 'foundation',
    description: 'Perform standardized pharmaceutical quality control testing, sample assays, and document regulatory compliance under Good Laboratory Practices (GLP).',
    whyExciting: 'Direct stepping-stone into the booming biopharmaceutical manufacturing and clinical research industry with hands-on lab work.',
    salaryRange: '₹3.0 LPA - ₹5.4 LPA (Entry / Low Tier)',
    averageSalaryIndia: '₹3.0 LPA - ₹5.4 LPA',
    growthOutlook: '+18% Steady Industry Growth',
    experienceLevel: 'Entry-Level / Graduate',
    requiredSkills: [
      { name: 'Good Laboratory Practices (GLP) & SOPs', importance: 'high', category: 'Compliance' },
      { name: 'HPLC & Spectrophotometry', importance: 'high', category: 'Instrumentation' },
      { name: 'Microbiology & Sample Preparation', importance: 'medium', category: 'Lab' },
      { name: 'Documentation & Regulatory Audit Prep', importance: 'high', category: 'Documentation' },
      { name: 'Quality Control Standards (ISO 9001 / cGMP)', importance: 'medium', category: 'Quality' }
    ],
    recommendedDisciplines: ['Biotechnology', 'Biochemistry', 'Microbiology', 'B.Pharm', 'Life Sciences', 'Chemistry'],
    topRecruiters: ['Biocon', 'Dr. Reddy\'s', 'Sun Pharma', 'Cipla', 'Serum Institute', 'Syngene'],
    topRecruitersIndia: ['Biocon', 'Sun Pharma', 'Dr. Reddy\'s', 'Cipla'],
    keyResponsibilities: [
      'Conduct routine analytical testing of active pharmaceutical ingredients using HPLC and spectrophotometry',
      'Prepare certificate of analysis (COA) documents ensuring strict compliance with cGMP guidelines',
      'Maintain lab calibration logs, sterile media records, and participate in internal quality audits'
    ],
    sampleJobTitles: ['Quality Control Chemist', 'QC Associate', 'Clinical Research Coordinator', 'Lab Analyst'],
    interviewTopics: ['Principles of Chromatography (HPLC/GC)', 'Difference between QA and QC in Pharma', 'Handling Out of Specification (OOS) Results', 'Standard Operating Procedures & Good Documentation Practices'],
    portfolioProjects: ['Stability Testing Documentation & Protocol for Generic Formulations', 'HPLC Validation Assay Dataset and Recovery Report'],
    dayInTheLife: 'Calibrate analytical instruments, run chromatographic tests on daily production batches, calculate purity percentages, and log results into the Laboratory Information Management System (LIMS).'
  },
  {
    id: 'career-computational-genomics-lead',
    title: 'Senior Computational Genomics & Biopharma Scientist',
    domain: 'Genomics, Next-Gen Sequencing & Precision Medicine',
    category: 'Biotechnology & Health',
    salaryTier: 'premium',
    description: 'Lead computational analysis of high-throughput sequencing datasets, biomarker discovery, and clinical variant calling for personalized precision therapeutics.',
    whyExciting: 'Sit at the cutting-edge intersection of genomics, oncology, and deep tech to help pharmaceutical pioneers discover life-saving targeted therapies.',
    salaryRange: '₹16.0 LPA - ₹36.0 LPA (High Premium)',
    averageSalaryIndia: '₹16.0 LPA - ₹36.0 LPA',
    growthOutlook: '+28% High Demand Precision Medicine',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Next-Gen Sequencing (NGS) Pipelines (WGS / RNA-Seq)', importance: 'high', category: 'Genomics' },
      { name: 'Bioinformatics in Python & R (Bioconductor / DESeq2)', importance: 'high', category: 'Analysis' },
      { name: 'Variant Calling & Annotation (GATK, VEP, Annovar)', importance: 'high', category: 'Genomics' },
      { name: 'Cloud Genomics (AWS BioBuilds / Nextflow / Snakemake)', importance: 'high', category: 'Pipelines' },
      { name: 'Population Genetics & Statistical Modeling', importance: 'medium', category: 'Statistics' }
    ],
    recommendedDisciplines: ['Biotechnology', 'Bioinformatics', 'Computational Biology', 'Biomedical Engineering', 'Computer Science with Biotech Focus'],
    topRecruiters: ['Strand Life Sciences', 'MedGenome', 'Illumina', 'AstraZeneca', 'Novartis', 'Biocon Biologics'],
    topRecruitersIndia: ['Strand Life Sciences', 'MedGenome', 'AstraZeneca', 'Biocon'],
    keyResponsibilities: [
      'Architect scalable Nextflow pipelines to process terabytes of Whole Exome and RNA-seq sequencing data',
      'Perform statistical differential gene expression analysis and clinical pathway enrichment modeling',
      'Collaborate with molecular oncologists to annotate rare somatic variants and pinpoint therapeutic drug targets'
    ],
    sampleJobTitles: ['Senior Bioinformatician', 'Genomic Data Scientist', 'Precision Medicine Lead', 'NGS Pipeline Architect'],
    interviewTopics: ['GATK Best Practices for Germline vs Somatic Variant Calling', 'RNA-Seq Normalization: TPM, FPKM vs DESeq2 Size Factors', 'Building Scalable Workflows with Nextflow / Docker', 'Interpreting ClinVar & ACMG Variant Classifications'],
    portfolioProjects: ['Cancer Transcriptome RNA-Seq Differential Expression Pipeline with Volcano & Pathway Plots', 'Automated Clinical NGS Variant Annotation & Report Generator Container'],
    dayInTheLife: 'Launch Nextflow pipelines on cloud clusters, review statistical clustering of single-cell RNA-seq libraries, validate candidate genetic markers, and deliver findings to the clinical development committee.'
  },
  {
    id: 'career-ev-powertrain-architect',
    title: 'Automotive EV Systems & Thermal Powertrain Architect',
    domain: 'Electric Vehicles, Battery Packs & Thermal Management',
    category: 'Hardware & Robotics',
    salaryTier: 'premium',
    description: 'Design next-generation EV battery packs, liquid cooling systems, motor drive integration, and vehicle dynamics for clean electric mobility.',
    whyExciting: 'Pioneer the green mobility transformation—engineer high-density battery architectures and high-torque electric powertrains for leading EV manufacturers.',
    salaryRange: '₹16.0 LPA - ₹38.0 LPA (High Premium)',
    averageSalaryIndia: '₹16.0 LPA - ₹38.0 LPA',
    growthOutlook: '+34% Booming EV Revolution',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Lithium-Ion Battery Pack Design & BMS Integration', importance: 'high', category: 'Battery' },
      { name: 'CFD & Thermal Management (Ansys Fluent / Star-CCM+)', importance: 'high', category: 'Simulation' },
      { name: 'Automotive CAD (CATIA V5 / Siemens NX)', importance: 'high', category: 'Design' },
      { name: 'Powertrain Modeling & MATLAB / Simulink', importance: 'high', category: 'Modeling' },
      { name: 'Automotive Standards (ISO 26262, AIS-038 / AIS-156)', importance: 'medium', category: 'Standards' }
    ],
    recommendedDisciplines: ['Mechanical Engineering', 'Automobile Engineering', 'Mechatronics', 'Electrical Engineering'],
    topRecruiters: ['Tata Motors Electric Mobility', 'Mahindra Electric', 'Ola Electric', 'Ather Energy', 'Tesla', 'Bosch Automotive'],
    topRecruitersIndia: ['Tata Motors', 'Mahindra Electric', 'Ola Electric', 'Ather Energy', 'Bosch'],
    keyResponsibilities: [
      'Design liquid-cooled battery enclosure structures conforming to AIS-156 crash and thermal runaway safety standards',
      'Conduct 3D transient computational fluid dynamics (CFD) simulations to optimize cell-to-cell thermal uniformity',
      'Develop Simulink vehicle drive cycle simulations to optimize regenerative braking and energy efficiency'
    ],
    sampleJobTitles: ['EV Powertrain Engineer', 'Battery Systems Architect', 'Thermal Systems Lead', 'Vehicle Dynamics Specialist'],
    interviewTopics: ['Lithium-Ion Cell Thermal Runaway Propagation & Mitigation', 'Coolant Flow Uniformity in Cold-Plate Design', 'Regenerative Braking Torque Split Algorithms', 'Structural Integrity of Under-Floor Battery Packs under Crash Loads'],
    portfolioProjects: ['400V 60kWh Battery Enclosure Structural & CFD Conjugate Heat Transfer Simulation', 'Simulink Longitudinal EV Dynamics Simulator under Real City Drive Cycles'],
    dayInTheLife: 'Inspect prototype liquid cold-plate samples, analyze thermal gradient contours from overnight 100-minute CFD simulation runs, tune cell balancing parameters, and conduct road-test dyno validations.'
  },
  {
    id: 'career-vlsi-silicon-specialist',
    title: 'VLSI Silicon Design & Microarchitecture Specialist',
    domain: 'Semiconductor Chips, ASIC Design & FPGA Synthesis',
    category: 'Hardware & Robotics',
    salaryTier: 'premium',
    description: 'Design cutting-edge ASIC chips, write Verilog/SystemVerilog RTL code, verify timing constraints, and synthesize silicon architectures for modern computing.',
    whyExciting: 'Create the physical silicon hearts powering AI accelerators, smart devices, and high-performance computing at nanoscale precision.',
    salaryRange: '₹18.0 LPA - ₹45.0 LPA (High Premium)',
    averageSalaryIndia: '₹18.0 LPA - ₹45.0 LPA',
    growthOutlook: '+30% National Semiconductor Mission Demand',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'SystemVerilog & Verilog RTL Design', importance: 'high', category: 'Hardware' },
      { name: 'UVM (Universal Verification Methodology)', importance: 'high', category: 'Verification' },
      { name: 'Static Timing Analysis (STA) & Synthesis', importance: 'high', category: 'Timing' },
      { name: 'Digital Electronics & Computer Architecture (RISC-V)', importance: 'high', category: 'Architecture' },
      { name: 'EDA Tooling (Synopsys / Cadence / Vivado)', importance: 'medium', category: 'Tools' }
    ],
    recommendedDisciplines: ['Electronics & Communication (ECE)', 'Electrical Engineering (EEE)', 'Microelectronics', 'Computer Engineering'],
    topRecruiters: ['Qualcomm', 'Intel', 'NVIDIA', 'Texas Instruments', 'Broadcom', 'AMD', 'MediaTek'],
    topRecruitersIndia: ['Qualcomm', 'Intel', 'Texas Instruments', 'NVIDIA', 'AMD'],
    keyResponsibilities: [
      'Write modular, synthesizable SystemVerilog RTL models for multi-core processors and cache controllers',
      'Build comprehensive UVM verification testbenches with constrained-random stimulus and functional coverage',
      'Perform static timing analysis (STA) setup/hold closure across multi-corner operating temperatures'
    ],
    sampleJobTitles: ['ASIC Design Engineer', 'RTL Design Engineer', 'Design Verification (DV) Engineer', 'Physical Design Lead'],
    interviewTopics: ['Setup & Hold Time Violations & Metastability Mitigation', 'Building a UVM Testbench (Sequencer, Driver, Monitor, Scoreboard)', 'FSM State Encoding: One-Hot vs Gray Code tradeoffs', 'Clock Domain Crossing (CDC) Synchronizers'],
    portfolioProjects: ['Pipelined 5-Stage RISC-V RV32I Processor Core in SystemVerilog with Hazard Unit', 'AXI4-Lite Bus Controller with UVM Constrained-Random Verification Testbench'],
    dayInTheLife: 'Simulate RTL regressions on multi-core EDA servers, debug timing slack violations in synthesis reports, write coverage assertions for memory controller interfaces, and review architectural specifications.'
  },
  {
    id: 'career-structural-lead-specialist',
    title: 'Lead Structural & Smart Infrastructure Project Specialist',
    domain: 'Structural Dynamics, High-Rise Engineering & Infrastructure',
    category: 'Smart Infrastructure',
    salaryTier: 'premium',
    description: 'Lead structural engineering analysis for high-rise towers, seismic retrofits, highway bridges, and large-scale smart urban infrastructure.',
    whyExciting: 'Shape the modern skyline—engineer iconic bridges, transit hubs, and earthquake-resilient structures that stand for generations.',
    salaryRange: '₹15.0 LPA - ₹35.0 LPA (High Premium)',
    averageSalaryIndia: '₹15.0 LPA - ₹35.0 LPA',
    growthOutlook: '+22% Rapid Urbanization & Mega-Projects',
    experienceLevel: 'All Levels',
    requiredSkills: [
      { name: 'Structural Analysis (ETABS / STAAD.Pro / SAP2000)', importance: 'high', category: 'Analysis' },
      { name: 'Reinforced Concrete & Steel Design Codes', importance: 'high', category: 'Codes' },
      { name: 'Seismic & Wind Dynamic Load Modeling', importance: 'high', category: 'Dynamics' },
      { name: 'BIM Integration (Autodesk Revit Structure)', importance: 'medium', category: 'BIM' },
      { name: 'Geotechnical & Deep Foundation Systems', importance: 'medium', category: 'Foundations' }
    ],
    recommendedDisciplines: ['Civil Engineering', 'Structural Engineering', 'Infrastructure Engineering', 'Architecture (M.Arch)'],
    topRecruiters: ['L&T Construction', 'Tata Projects', 'Afcons Infrastructure', 'Shapoorji Pallonji', 'AECOM', 'WSP'],
    topRecruitersIndia: ['L&T Construction', 'Tata Projects', 'Afcons', 'AECOM'],
    keyResponsibilities: [
      'Model 40+ story high-rise structural frames in ETABS evaluating dynamic seismic shear and wind drift',
      'Optimize structural steel and reinforced concrete member dimensions reducing overall material consumption by 15%',
      'Review foundation geotechnical borehole reports and design pile caps for heavy transit viaducts'
    ],
    sampleJobTitles: ['Senior Structural Engineer', 'Structural Project Lead', 'Bridge Design Specialist', 'BIM Structural Manager'],
    interviewTopics: ['Response Spectrum Analysis vs Equivalent Static Method for Earthquakes', 'Design of Ductile Shear Walls in High-Rise Buildings', 'P-Delta Effects in Slender Reinforced Concrete Columns', 'Crack Width Calculations & Serviceability Limit States'],
    portfolioProjects: ['ETABS 3D Seismic Dynamic Analysis of a 35-Story Residential Tower', 'Prestressed Concrete Box-Girder Flyover Structural Calculation Report'],
    dayInTheLife: 'Inspect 3D displacement vectors from ETABS finite element model, review foundation pile load test results with geotechnical consultants, sign off on reinforcement fabrication drawings, and coordinate BIM clash detection.'
  }
];

export type MajorBranchKey =
  | 'all'
  | 'my_branch'
  | 'computer_science'
  | 'mechanical'
  | 'civil'
  | 'electrical_electronics'
  | 'biotechnology'
  | 'commerce_finance'
  | 'design_creative';

export interface BranchDefinition {
  key: MajorBranchKey;
  label: string;
  icon: string;
  description: string;
}

export const MAJOR_BRANCH_DEFINITIONS: BranchDefinition[] = [
  {
    key: 'my_branch',
    label: 'My Branch & Field',
    icon: '🎯',
    description: 'Personalized matches for your exact degree and academic branch'
  },
  {
    key: 'computer_science',
    label: 'Computer Science & IT',
    icon: '💻',
    description: 'Software, Web, Cloud, AI/ML, DevOps, QA, and Cybersecurity tracks'
  },
  {
    key: 'mechanical',
    label: 'Mechanical & Automotive',
    icon: '⚙️',
    description: 'Plant operations, CAD modeling, EV powertrains, robotics, and industrial automation'
  },
  {
    key: 'civil',
    label: 'Civil & Infrastructure',
    icon: '🏗️',
    description: 'Site engineering, BIM modeling, structural design, and smart infrastructure'
  },
  {
    key: 'electrical_electronics',
    label: 'Electrical & Electronics',
    icon: '⚡',
    description: 'Embedded systems, VLSI silicon design, IoT, substation operations, and PLC controls'
  },
  {
    key: 'biotechnology',
    label: 'Biotechnology & Health',
    icon: '🧬',
    description: 'Genomics, bioinformatics, biopharma research, and clinical laboratory quality'
  },
  {
    key: 'commerce_finance',
    label: 'Commerce, Finance & Business',
    icon: '📊',
    description: 'Financial modeling, FinTech, quantitative trading, business operations, and analytics'
  },
  {
    key: 'design_creative',
    label: 'Design & Media',
    icon: '🎨',
    description: 'UI/UX product design, brand visual design, technical communication, and growth marketing'
  },
  {
    key: 'all',
    label: 'All Disciplines',
    icon: '🌐',
    description: 'Complete directory of 33 career roles across low, mid, and high salary ranges'
  }
];

export function detectUserBranchKey(userBranch: string): MajorBranchKey {
  const b = (userBranch || '').toLowerCase().trim();
  if (!b) return 'all';
  if (b.includes('mech') || b.includes('auto') || b.includes('production') || b.includes('plant')) return 'mechanical';
  if (b.includes('civil') || b.includes('struct') || b.includes('construction')) return 'civil';
  if (b.includes('elec') || b.includes('ece') || b.includes('eee') || b.includes('instrument') || b.includes('hardware')) return 'electrical_electronics';
  if (b.includes('bio') || b.includes('life science') || b.includes('pharma') || b.includes('medic')) return 'biotechnology';
  if (b.includes('comm') || b.includes('b.com') || b.includes('bba') || b.includes('mba') || b.includes('finan') || b.includes('econ') || b.includes('business')) return 'commerce_finance';
  if (b.includes('comput') || b.includes('cse') || b.includes('it') || b.includes('software') || b.includes('bca') || b.includes('mca')) return 'computer_science';
  if (b.includes('des') || b.includes('art') || b.includes('media') || b.includes('creat')) return 'design_creative';
  return 'my_branch';
}

export const CAREER_DOMAINS = [
  'All',
  'Software & Cloud',
  'AI & Data Science',
  'Hardware & Robotics',
  'Product & Design',
  'Operations & Business',
  'Finance & FinTech',
  'Biotechnology & Health',
  'Smart Infrastructure'
];
