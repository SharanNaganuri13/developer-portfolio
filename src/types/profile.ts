export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
};

export type ExploringItem = {
  id: string;
  label: string;
  note: string;
};

export type AboutCardIcon = "roots" | "adapt" | "play" | "ideas";

export type AboutCard = {
  id: string;
  icon: AboutCardIcon;
  /** Small kicker above the title. */
  label: string;
  title: string;
  body: string;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  detail: string;
};

export type ProjectMetric = {
  id: string;
  /** Short figure, e.g. "~25%" or "99.9%". */
  value: string;
  label: string;
};

export type ProjectCategory =
  | "Full Stack"
  | "Frontend"
  | "Backend"
  | "AI"
  | "Data"
  | "Personal";

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  shortDescription: string;
  problem: string;
  solution: string;
  overview: string;
  architecture: ArchitectureNode[];
  /**
   * Optional parallel layout for the case-study diagram: each row holds one or
   * two architecture node ids. Two ids render side by side (parallel stages).
   * When omitted, the diagram falls back to the linear node order.
   */
  architectureFlow?: string[][];
  technologies: string[];
  challenges: string[];
  results: string[];
  /** Headline figures shown on the card. Omit when there is nothing measured. */
  metrics?: ProjectMetric[];
  /** Qualitative chips shown when there are no measured metrics yet. */
  highlights?: string[];
  liveDemo?: string;
  year: string;
  visual: {
    accent: string;
    motif: "approvals" | "query" | "canvas";
  };
};

export type CompanyLogo = {
  src: string;
  alt: string;
  /** Intrinsic pixel size of the asset, used to reserve layout space. */
  width: number;
  height: number;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  /** Shown when no `logo` asset is supplied. Keep it to 2–4 characters. */
  monogram: string;
  logo?: CompanyLogo;
  /** Shown as the marker on the timeline rail, e.g. "2024". */
  startYear: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
};

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Cloud / DevOps"
  | "AI / Automation";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  usage: string;
  relatedProjectIds: string[];
};

export type AchievementKind = "Certification" | "Award" | "Course";

export type Achievement = {
  id: string;
  kind: AchievementKind;
  title: string;
  issuer: string;
  year: string;
  summary: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  detail: string;
};

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Profile = {
  name: string;
  firstName: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  phone?: string;
  linkedIn: string;
  resumeHref: string;
  photo: Photo;
  eyebrow: string;
  headline: string;
  shortBio: string;
  /** One-line intent shown in the hero and contact. */
  availability: string;
  seo: {
    title: string;
    description: string;
    twitterHandle?: string;
  };
  exploring: ExploringItem[];
  about: {
    introduction: string;
    enjoyBuilding: string;
    approach: string;
    interests: string;
    cards: AboutCard[];
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  nav: NavItem[];
  socials: SocialLink[];
};
