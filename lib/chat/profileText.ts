export interface Profile {
  meta: {
    location: string;
    workPreference: string;
  };
  identity: {
    name: string;
    description: string;
    footerDescription: string;
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
  lookingFor: string;
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
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
  coursesList: {
    title: string;
    instructor: string;
    description: string;
    bullets: string[];
    tags: string[];
    link: string;
  }[];
  featuredProjects: {
    name: string;
    origin: string;
    rank: number;
    oneLine: string;
  }[];
  repoNotes: Record<string, { origin: string; note: string }>;
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
    coreStack: string[];
    skillsByEvidence: {
      atWork: string[];
      builtProjects: string[];
      studied: string[];
    };
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

// The model copies the characters it reads, so strip anything the system prompt
// forbids (em/en dashes, middots, arrows, curly quotes) before the text goes in.
export const plain = (s: string): string =>
  s
    .replace(/(\d{4}|Present)\s*[—–]\s*/g, "$1 to ")
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s*·\s*/g, ", ")
    .replace(/\s*→\s*/g, " to ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[ \t]{2,}/g, " ");

export function buildProfileText(p: Profile): string {
  const projects = p.projects
    .map(
      (prj) =>
        `- **${prj.name}**: ${prj.description} (Tech: ${prj.stack.join(", ")})` +
        (prj.display?.impact ? ` Result: ${prj.display.impact}.` : "")
    )
    .join("\n");

  const featured = [...p.featuredProjects]
    .sort((a, b) => a.rank - b.rank)
    .map((f) => `- ${f.rank}. **${f.name}** (${f.origin}): ${f.oneLine}`)
    .join("\n");

  const repoNotes = Object.entries(p.repoNotes)
    .map(([repo, n]) => `- **${repo}** (${n.origin}): ${n.note}`)
    .join("\n");

  const text = `
NAME: ${p.identity.name}. ${p.identity.description}
LOCATION: ${p.meta.location}. ${p.meta.workPreference}.
AVAILABILITY: ${p.availability}
LOOKING FOR: ${p.lookingFor}
LANGUAGES: ${p.languages}
WORKING STYLE: ${p.workingStyle}
HOBBIES: ${p.hobbies}

CONTACT
- Email: ${p.contact.email}
- Contact form: ${p.contact.contactForm}
- Website: ${p.contact.website}
- LinkedIn: ${p.socials.linkedin}
- GitHub: ${p.socials.github}
- X: ${p.socials.x}

CURRENT ROLE
${p.currentRole}

PREVIOUS WORK
${p.previousWork}

EDUCATION
${p.education.description}

ORIGIN LABELS (used in the lists below)
- work: paid job at a company
- original: he designed and built it himself
- tutorial: built while following a tutorial or course, not his own design
- academic: university or course assignment

FEATURED PROJECTS (recommend in this order)
${featured}

PROJECTS
${projects}

GITHUB REPOSITORY NOTES (these override anything guessed from a repo name)
${repoNotes}

SKILLS
CORE STACK: ${p.skills.coreStack.join(", ")}.
At work: ${p.skills.skillsByEvidence.atWork.join(", ")}
Built personal projects with: ${p.skills.skillsByEvidence.builtProjects.join(", ")}
Studied (courses, not production use): ${p.skills.skillsByEvidence.studied.join(", ")}

COURSES AND PROFESSIONAL TRAINING (course material, not his own designs)
${p.courses}

LEADERSHIP AND VOLUNTEERING
${p.leadershipText}
`;

  return plain(text).trim();
}