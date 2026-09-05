const basePath =
  process.env.NODE_ENV === "production"
    ? "/developer-portfolio"
    : "";

import type { Profile } from "@/types/profile";
    
export const profile: Profile = {
  name: "Sharan Naganuri",
  firstName: "Sharan",
  initials: "SN",
  role: "Java Full Stack Engineer",
  location: "Bengaluru, Karnataka",
  email: "naganurisharan@gmail.com",
  linkedIn: "https://www.linkedin.com/in/smn13",
  resumeHref: `{basePath}/Sharan-Naganuri-Resume.pdf`,
  photo: {
    src: `${basePath}/sharan-naganuri.jpg`,
    alt: "Portrait of Sharan Naganuri",
    width: 767,
    height: 1024,
  },
  eyebrow: "HELLO, I'M SHARAN NAGANURI",
  headline: "Building scalable, secure, AI-driven software.",
  shortBio:
    "Java Full Stack Engineer with 2.5+ years building enterprise-grade applications — secure REST APIs, cloud-native services on GCP, and Generative AI woven into real workflow automation.",
  availability: "Open to Java / Full Stack Engineer roles with a Generative AI focus — Bengaluru.",
  seo: {
    title: "Sharan Naganuri — Java Full Stack Engineer",
    description:
      "Java Full Stack Engineer specializing in Spring Boot, Angular, cloud-native GCP services, distributed systems, and Generative AI workflow automation.",
    twitterHandle: undefined,
  },
  exploring: [
    { id: "genai", label: "Generative AI", note: "Embedding LLMs into enterprise workflows, not demos." },
    { id: "agentic", label: "Agentic AI", note: "Tool-using agents and Model Context Protocol." },
    { id: "distributed", label: "Distributed Systems", note: "Kafka, Redis, and honest failure modes." },
    { id: "systems", label: "System Design", note: "Clear service boundaries and sensible trade-offs." },
    { id: "cloud", label: "Cloud Native", note: "Containerized delivery on GCP Cloud Run." },
  ],
  about: {
    introduction:
      "I like software that earns its keep — systems that hold under load, interfaces that do not fight the person using them, and AI that removes a real step from someone's day instead of adding a demo.",
    enjoyBuilding:
      "The work I enjoy most is when the front and the back feel like one idea. Give me a messy workflow and I look for the thin slice that ships, then the boring reliability that keeps it there.",
    approach:
      "Start with the problem, secure it by default, ship a thin slice, then iterate with evidence. Prefer boring, reliable technology for the core and precision where it counts.",
    interests:
      "I keep a running curiosity about where language models belong in production systems — and where they should stay out.",
    cards: [
      {
        id: "roots",
        icon: "roots",
        label: "Plot twist",
        title: "Yes, my degree says Electronics",
        body: "Four years of circuits and signals in Belagavi, then I worked out that I would much rather debug code than a breadboard. Java, Spring Boot and Angular have been the day job ever since — judge me on the commits, not the syllabus.",
      },
      {
        id: "adapt",
        icon: "adapt",
        label: "Drop me in anywhere",
        title: "New squad, same energy",
        body: "New stack, new domain, new team — I find the rhythm fast and start contributing early. I would rather unblock a teammate than sit polishing my own commit.",
      },
      {
        id: "play",
        icon: "play",
        label: "After the last commit",
        title: "Competitive gamer, cricket on weekends",
        body: "I play to win — ranked ladders on screen, cricket on the field. Both drill the same instincts: read the situation, stay calm when it is tight, and know exactly when to pass.",
      },
      {
        id: "ideas",
        icon: "ideas",
        label: "Give me the brief",
        title: "Hand me the problem, not the steps",
        body: "I run well on my own — give me the goal and I come back with options instead of a status update. A fair number of features I have shipped started as a \"what if we just…\" in a sprint call.",
      },
    ],
  },
  experience: [
    {
      id: "tcs",
      company: "Tata Consultancy Services (TCS)",
      role: "Java Full Stack Engineer",
      monogram: "TCS",
      logo: {
        src: `${basePath}/logos/tcs.png`,
        alt: "Tata Consultancy Services logo",
        width: 420,
        height: 121,
      },
      startYear: "2024",
      duration: "Mar 2024 — Present",
      location: "Bengaluru, India",
      description:
        "I own features from design through deployment across multiple business modules — REST APIs, Angular UIs, and the security, messaging, and cloud delivery around them.",
      responsibilities: [
        "Engineered and maintained 20+ RESTful APIs using Spring Boot and JPA/Hibernate across multiple business modules.",
        "Designed authentication and authorization with Spring Security, OAuth2, and JWT using role-based access control.",
        "Built responsive, reusable UI components with Angular and JavaScript, improving cross-browser compatibility.",
        "Containerized applications with Docker and deployed them on GCP Cloud Run with auto-scaling.",
        "Integrated Kafka-based asynchronous messaging and Redis caching for high-frequency requests.",
        "Owned end-to-end feature development using Git, Maven, Postman, and Bitbucket.",
        "Collaborated with cross-functional Agile teams through sprint planning, backlog refinement, and code reviews.",
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "Angular",
        "Spring Security",
        "OAuth2",
        "JWT",
        "Kafka",
        "Redis",
        "Docker",
        "GCP Cloud Run",
      ],
      achievements: [
        "Secured 20+ APIs with role-based access control using Spring Security, OAuth2, and JWT.",
        "Increased user engagement by ~15% through reusable, cross-browser Angular components.",
        "Maintained 99.9% application availability with containerized deployments on GCP Cloud Run.",
        "Reduced API response time by ~25% via Kafka messaging and Redis caching.",
      ],
    },
  ],
  education: [
    {
      id: "kle",
      institution: "KLE Dr. M. S. Sheshgiri College of Engineering and Technology, Belagavi",
      degree: "Bachelor of Engineering — Electronics & Communication Engineering",
      duration: "2019 — 2023",
      detail: "CGPA 7.58",
    },
  ],
  skills: [
    { id: "java", name: "Java", category: "Languages", usage: "Primary language for backend services and domain logic.", relatedProjectIds: ["vendorhub", "reporting-platform"] },
    { id: "typescript", name: "TypeScript", category: "Languages", usage: "Typed application code across Angular front ends.", relatedProjectIds: ["vendorhub", "reporting-platform"] },
    { id: "javascript", name: "JavaScript", category: "Languages", usage: "Interactive UI behavior on the web runtime.", relatedProjectIds: ["vendorhub"] },
    { id: "sql", name: "SQL", category: "Languages", usage: "Query design and data access; core to the Text-to-SQL engine.", relatedProjectIds: ["reporting-platform", "vendorhub"] },

    { id: "angular", name: "Angular", category: "Frontend", usage: "Component-driven enterprise interfaces and structured client apps.", relatedProjectIds: ["vendorhub", "reporting-platform"] },
    { id: "html", name: "HTML", category: "Frontend", usage: "Semantic structure and accessible markup.", relatedProjectIds: ["vendorhub"] },
    { id: "css", name: "CSS", category: "Frontend", usage: "Layout, theming, and responsive styling.", relatedProjectIds: ["vendorhub"] },
    { id: "angular-material", name: "Angular Material", category: "Frontend", usage: "Consistent component library for enterprise UIs.", relatedProjectIds: ["vendorhub"] },
    { id: "bootstrap", name: "Bootstrap", category: "Frontend", usage: "Responsive grid and utility styling.", relatedProjectIds: ["vendorhub"] },

    { id: "spring", name: "Spring Boot", category: "Backend", usage: "Production APIs, configuration, and service composition.", relatedProjectIds: ["vendorhub", "reporting-platform"] },
    { id: "rest", name: "REST APIs", category: "Backend", usage: "Resource design, consistent errors, and contract-first thinking.", relatedProjectIds: ["vendorhub", "reporting-platform"] },
    { id: "spring-security", name: "Spring Security", category: "Backend", usage: "Authentication and role-based authorization.", relatedProjectIds: ["vendorhub"] },
    { id: "jpa", name: "JPA / Hibernate", category: "Backend", usage: "ORM and persistence across business modules.", relatedProjectIds: ["vendorhub", "reporting-platform"] },
    { id: "jwt", name: "JWT / OAuth2", category: "Backend", usage: "Token-based auth securing 20+ APIs.", relatedProjectIds: ["vendorhub"] },
    { id: "kafka", name: "Kafka", category: "Backend", usage: "Asynchronous messaging for high-frequency requests.", relatedProjectIds: ["vendorhub"] },
    { id: "redis", name: "Redis", category: "Backend", usage: "Caching layer that cut response times.", relatedProjectIds: ["vendorhub"] },
    { id: "microservices", name: "Microservices", category: "Backend", usage: "Service boundaries and independent deployability.", relatedProjectIds: ["vendorhub"] },

    { id: "oracle", name: "Oracle", category: "Database", usage: "Relational modeling for enterprise data.", relatedProjectIds: ["vendorhub"] },
    { id: "mysql", name: "MySQL", category: "Database", usage: "Application storage and schema-driven SQL generation.", relatedProjectIds: ["reporting-platform"] },

    { id: "gcp", name: "GCP / Cloud Run", category: "Cloud / DevOps", usage: "Cloud-native deployment with auto-scaling.", relatedProjectIds: ["vendorhub"] },
    { id: "docker", name: "Docker", category: "Cloud / DevOps", usage: "Containerizing services for consistent delivery.", relatedProjectIds: ["vendorhub"] },
    { id: "git", name: "Git", category: "Cloud / DevOps", usage: "Version control with small, reviewable commits.", relatedProjectIds: ["vendorhub", "reporting-platform"] },
    { id: "maven", name: "Maven", category: "Cloud / DevOps", usage: "Build and dependency management for Java projects.", relatedProjectIds: ["vendorhub", "reporting-platform"] },
    { id: "postman", name: "Postman", category: "Cloud / DevOps", usage: "API design, testing, and documentation.", relatedProjectIds: ["vendorhub"] },
    { id: "bitbucket", name: "Bitbucket", category: "Cloud / DevOps", usage: "Source hosting and pull-request review.", relatedProjectIds: ["vendorhub"] },

    { id: "genai", name: "Generative AI", category: "AI / Automation", usage: "Summarization and automation inside enterprise workflows.", relatedProjectIds: ["vendorhub", "reporting-platform"] },
    { id: "prompt", name: "Prompt Engineering", category: "AI / Automation", usage: "Reliable prompts for structured LLM output.", relatedProjectIds: ["reporting-platform"] },
    { id: "gemini", name: "Gemini / OpenAI API", category: "AI / Automation", usage: "LLM API integration for text-to-SQL and summaries.", relatedProjectIds: ["reporting-platform"] },
    { id: "agentic", name: "Agentic AI", category: "AI / Automation", usage: "Tool-using agents for workflow automation.", relatedProjectIds: ["reporting-platform"] },
    { id: "mcp", name: "Model Context Protocol", category: "AI / Automation", usage: "Standardized context and tool access for LLMs.", relatedProjectIds: ["reporting-platform"] },
    { id: "llm", name: "LLM Integration", category: "AI / Automation", usage: "Wiring language models into production features.", relatedProjectIds: ["vendorhub", "reporting-platform"] },
  ],
  projects: [
    {
      id: "vendorhub",
      name: "VendorHub",
      category: "Full Stack",
      year: "2024 — Present",
      shortDescription:
        "A vendor onboarding platform with role-based approvals, background-verification tracking, and operational reporting.",
      problem:
        "Vendor onboarding involved manual approvals and scattered verification tracking, making operational reporting and audits slow and error-prone.",
      solution:
        "Designed an end-to-end onboarding workflow with role-based approvals and verification tracking, plus advanced search, filtering, and Excel export — and used Generative AI to summarize audit logs and automate Jira tasks.",
      overview:
        "A client project built at TCS on Java, Spring Boot, and Angular, backed by Oracle, Kafka, and Redis, deployed on GCP.",
      architecture: [
        { id: "fe", label: "Frontend", detail: "Angular UI for onboarding, approvals, search/filter, and Excel export." },
        { id: "api", label: "API", detail: "REST APIs secured with JWT and role-based access control." },
        { id: "be", label: "Backend", detail: "Spring Boot services with Kafka async messaging, Redis caching, and GenAI audit-log summarization." },
        { id: "db", label: "Database", detail: "Oracle for vendor, approval, and verification data." },
      ],
      technologies: ["Java", "Spring Boot", "Angular", "Oracle", "Kafka", "Redis", "JWT", "GCP"],
      metrics: [
        { id: "latency", value: "~25%", label: "Faster API responses" },
        { id: "uptime", value: "99.9%", label: "Availability" },
        { id: "engagement", value: "~15%", label: "Engagement lift" },
      ],
      challenges: [
        "Modeling multi-stage, role-based approval flows with background-verification tracking.",
        "Keeping operational reporting fast over large vendor datasets.",
      ],
      results: [
        "Reduced manual effort in operational analysis by using GenAI to summarize audit logs and automate Jira tasks.",
        "Delivered advanced search, filtering, and Excel export for operational reporting.",
      ],
      visual: { accent: "var(--c1)", motif: "approvals" },
    },
    {
      id: "reporting-platform",
      name: "Queryline",
      category: "AI",
      year: "Feb 2026 — Jun 2026",
      shortDescription:
        "Ask a database a question in plain English. It discovers the schema, writes the SQL, validates it, runs it, and hands back an Excel report with an AI summary.",
      problem:
        "Business reporting expects the person asking to understand the schema and write SQL by hand, which turns every ad-hoc question into a ticket for a developer or analyst.",
      solution:
        "Built a Text-to-SQL pipeline that reads live schema from INFORMATION_SCHEMA — tables, columns, types, primary and foreign keys — and passes it to Gemini 1.5 Flash, so generated MySQL reflects the real database and its relationships instead of a hardcoded model. Generated SQL surfaces in a preview panel and clears a read-only validation layer before it reaches the database; results render as a dynamic table with row count and execution time, exportable to Excel via Apache POI alongside a summary written from the rows returned.",
      overview:
        "A reporting platform on Java, Spring Boot, and Angular over MySQL, using the Gemini 1.5 Flash API for SQL generation and summaries and Apache POI for Excel export.",
      architecture: [
        {
          id: "fe",
          label: "Frontend",
          detail: "Angular UI for the question input, generated-SQL preview, and dynamic result table.",
        },
        {
          id: "api",
          label: "API",
          detail: "Spring Boot REST endpoints that orchestrate the pipeline end to end.",
        },
        {
          id: "schema",
          label: "Schema discovery",
          detail:
            "Reads tables, columns, data types, primary keys, and foreign keys from MySQL INFORMATION_SCHEMA at runtime.",
        },
        {
          id: "generate",
          label: "SQL generation",
          detail:
            "Gemini 1.5 Flash turns the question plus discovered schema into MySQL, using foreign-key relationships to join across tables.",
        },
        {
          id: "validate",
          label: "Validation",
          detail:
            "Schema-aware, read-only checks gate the generated SQL so unsafe or unsupported queries never execute.",
        },
        {
          id: "db",
          label: "MySQL",
          detail: "The approved query runs; rows, row count, and execution time come back to the UI.",
        },
        {
          id: "excel",
          label: "Excel export",
          detail: "Apache POI writes the result set to a downloadable .xlsx report.",
        },
        {
          id: "summary",
          label: "AI summary",
          detail: "Gemini summarizes the returned rows in plain business language — description, not prediction.",
        },
      ],
      // Schema discovery and SQL generation run in parallel off the API; the
      // result fans out to an Excel export and an AI summary at the end.
      architectureFlow: [["fe"], ["api"], ["schema", "generate"], ["validate"], ["db"], ["excel", "summary"]],
      technologies: [
        "Java",
        "Spring Boot",
        "Angular",
        "MySQL",
        "Gemini 1.5 Flash API",
        "Apache POI",
        "REST APIs",
        "INFORMATION_SCHEMA",
        "SQL",
        "Generative AI",
        "Prompt Engineering",
      ],
      highlights: ["Schema read at runtime", "Read-only SQL validation", "Excel + AI summary"],
      challenges: [
        "Getting multi-table JOINs right from free-form questions — solved by feeding discovered foreign-key relationships into the prompt instead of a flat schema dump.",
        "Making model-written SQL safe to execute, which is what the read-only validation layer between generation and the database exists for.",
        "Keeping summaries anchored to the rows actually returned, so the model describes the dataset rather than speculating past it.",
      ],
      results: [
        "Non-technical users self-serve ad-hoc reports in plain English, without waiting on a developer or analyst.",
        "Point it at a different MySQL database and it adapts — schema, columns, and relationships are read at runtime, not configured.",
        "Every query returns two artifacts: a downloadable .xlsx and a plain-language summary of the result set.",
        "The generated SQL stays visible in a preview panel, so users can see exactly what ran against the database.",
      ],
      visual: { accent: "var(--c5)", motif: "query" },
    },
    {
      id: "portfolio",
      name: "This Portfolio",
      category: "Personal",
      year: "2026",
      shortDescription:
        "The site you are reading — built from an empty Next.js app with its own design system, no template and no UI kit.",
      problem:
        "A resume PDF can list what I have built, but it cannot show how I think about interfaces, motion, accessibility or performance. I wanted the artifact itself to be the evidence.",
      solution:
        "Built a token-driven theme with dark and light modes, scroll and reveal motion that backs off under prefers-reduced-motion, and a content layer where every section renders from one typed file. Brand logos are vendored at build time so the icon package never reaches the browser.",
      overview:
        "Next.js 16 on the App Router with React 19 and TypeScript in strict mode, styled with Tailwind 4 and animated with Motion.",
      architecture: [
        {
          id: "content",
          label: "Content",
          detail: "A single typed profile.ts drives every section — copy, skills, experience, projects.",
        },
        {
          id: "components",
          label: "Components",
          detail: "Composable section and UI primitives instead of one large page component.",
        },
        {
          id: "theme",
          label: "Theme & motion",
          detail: "CSS custom properties for the six-hue palette; Motion for reveals and shared-layout transitions.",
        },
        {
          id: "build",
          label: "Build",
          detail: "Statically prerendered, with generated sitemap, robots, Open Graph image and Person JSON-LD.",
        },
      ],
      technologies: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Motion"],
      metrics: [
        { id: "static", value: "100%", label: "Statically prerendered" },
        { id: "deps", value: "2", label: "UI dependencies" },
      ],
      challenges: [
        "Keeping brand marks legible in both themes — black logos invert on the dark background, near-white ones darken on the cream.",
        "Making motion optional without leaving holes in the layout when it is switched off.",
      ],
      results: [
        "Every route prerenders as static content; the 3,400-icon logo package stays a devDependency.",
        "Editing the site means editing one data file, not hunting through components.",
      ],
      visual: { accent: "var(--c3)", motif: "canvas" },
    },
  ],
  achievements: [
    {
      id: "award-tcs-gems-on-spot",
      kind: "Award",
      title: "TCS GEMS On Spot Award",
      issuer: "Tata Consultancy Services",
      year: "2025",
      summary:
        "For taking a new idea from a blank page to something clients used and called out — outstanding work, caught on the spot.",
    },
    {
      id: "cert-java-backend",
      kind: "Course",
      title: "Java Backend Development — Live",
      issuer: "GeeksforGeeks",
      year: "2023",
      summary: "Hands-on backend development with Java, covering APIs, persistence, and server-side design.",
    },
    {
      id: "cert-java-programming",
      kind: "Certification",
      title: "Java Programming",
      issuer: "Engineer's Academy",
      year: "2022",
      summary: "Core Java programming — language fundamentals, OOP, and problem solving.",
    },
  ],
  nav: [
    { id: "about", label: "About", href: "#about" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "achievements", label: "Recognition", href: "#achievements" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],
  socials: [
    { id: "email", label: "Email", href: "mailto:naganurisharan@gmail.com" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/smn13" },
  ],
};

export const skillCategories = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "Cloud / DevOps",
  "AI / Automation",
] as const;
