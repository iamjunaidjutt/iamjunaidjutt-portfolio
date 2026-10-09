export interface Profile {
  meta: {
    location: string;
    workPreference: string;
  };
  identity: {
    name: string;
    description: string;
    display?: {
      category?: string;
      bullets?: string[];
      impact?: string;
      image?: string;
      link?: string;
      githubUrl?: string;
    };
  };
  about: {
    heading: string;
    paragraphs: string[];
  };
  contact: {
    email: string;
    phone: string;
    whatsappLink: string;
    contactForm: string;
    website: string;
  };
  socials: {
    linkedin: string;
    github: string;
    x: string;
  };
  availability: string;
  languages: string;
  workingStyle: string;
  hobbies: string;
  currentRole: string;
  previousWork: string;
  experience: {
    period: string;
    title: string;
    company: string;
    bullets: string[];
    stack: string[];
    link: string;
    linkLabel: string;
  }[];
  education: {
    degree: {
      title: string;
      institution: string;
      period: string;
    };
    description: string;
  };
  courses: string;
  coursesList: {
    title: string;
    instructor: string;
    description: string;
    bullets: string[];
    tags: string[];
    link: string;
  }[];
  projects: {
    name: string;
    stack: string[];
    description: string;
    display?: {
      category?: string;
      bullets?: string[];
      impact?: string;
      image?: string;
      link?: string;
      githubUrl?: string;
    };
  }[];
  skills: {
    languages: string;
    web: string;
    ai: string;
    cloud: string;
    databases: string;
    uiFrontend: string[];
    uiBackend: string[];
    uiPlatforms: string[];
    uiAi: string[];
    uiLanguages: string[];
  };
  leadershipText: string;
  leadership: {
    period: string;
    title: string;
    org: string;
    bullets: string[];
    tags: string[];
    link: string;
    linkLabel: string;
  }[];
  volunteering: {
    period: string;
    title: string;
    org: string;
    bullets: string[];
    tags: string[];
    link: string;
    linkLabel: string;
  }[];
}

export function buildProfileText(p: Profile): string {
  return `
NAME: \${p.identity.name}. \${p.identity.description}
CONTACT
- Email: \${p.contact.email}
- Phone and WhatsApp: \${p.contact.phone} (WhatsApp link: \${p.contact.whatsappLink})
- Contact form: \${p.contact.contactForm}
- Website: \${p.contact.website}
SOCIAL MEDIA
- LinkedIn: \${p.socials.linkedin}
- GitHub: \${p.socials.github}
- X: \${p.socials.x}
AVAILABILITY: \${p.availability}
LANGUAGES: \${p.languages}
WORKING STYLE: \${p.workingStyle}
HOBBIES: \${p.hobbies}

CURRENT ROLE
\${p.currentRole}

PREVIOUS WORK
\${p.previousWork}

EDUCATION
\${p.education.description}

COURSES & PROFESSIONAL TRAINING
\${p.courses}

PROJECTS
\${p.projects}

SKILLS
Languages: \${p.skills.languages}
Web and backend: \${p.skills.web}
AI and LLMs: \${p.skills.ai}
Cloud and DevOps: \${p.skills.cloud}
Databases: \${p.skills.databases}

LEADERSHIP AND VOLUNTEERING
\${p.leadershipText}
`;
}
