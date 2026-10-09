const fs = require('fs');

let dp = fs.readFileSync('data/profile.ts', 'utf8');
dp = dp.replace(
    /courses: `- AI Engineer Agentic Track/,
    `experience: [
    {
      period: "Dec 2025 — Present",
      title: "Associate Software Engineer",
      company: "Devsinc · Lahore, Pakistan",
      bullets: [
        "Built backend features for LawPractice.ai using ASP.NET Core, LLMs, RAG, and MCP. My work on processing legal demands and case summaries helped cut document preparation time by 70% and made demand letters about 7x faster to turn around.",
        "Helped build the APIs, AI agents, custom tools, and RAG pipelines that read, extract, process, and generate documents, and improved their prompts. Together these helped cut documentation errors by about 90%.",
        "Kept the OCR, document reading, and document writing pipelines running across different document types, including large medical records of more than 1000 pages, added new ones when needed, and fixed issues clients reported in production. The platform is now used by 300+ law firms.",
        "Day to day: OpenCV, Azure Document Intelligence, AI Foundry, and AI Search, Azure SQL and Cosmos DB, and RabbitMQ background workers.",
      ],
      stack: [
        "ASP.NET Core",
        "Microsoft Azure",
        "Azure OpenAI",
        "Vector Databases/Stores",
        "LLMs",
        "RAG",
        "Agentic AI",
        "MCP",
        "RabbitMQ",
      ],
      link: "https://drive.google.com/file/d/155bk8op7Qvs3U1AmrA6ELnfrDXBdWmhB/view?usp=sharing",
      linkLabel: "View offer letter",
    },
    {
      period: "Oct 2025 — Dec 2025",
      title: "Software Engineer Intern",
      company: "Devsinc · Lahore, Pakistan",
      bullets: [
        "Worked on backend development, bug fixes, and AI features for LawPractice.ai.",
        "That work led to my current full-time role.",
      ],
      stack: ["Backend", "AI/ML", "Client collaboration"],
      link: "https://drive.google.com/file/d/1kbY3Bnu1EXWsCYwJMx6Knzlx5xFwLyaX/view?usp=sharing",
      linkLabel: "View offer letter",
    },
    {
      period: "Aug 2024 — Nov 2024",
      title: "Software Engineer Intern",
      company: "Kryptomind LLC · Lahore, Pakistan",
      bullets: [
        "Built interfaces with animations and 3D models using GSAP and React Three Fiber across several projects, and used Lenis for smooth scrolling.",
        "Connected Next.js, TypeScript, and React frontends to REST APIs. Server-side rendering and code splitting took one project's Lighthouse score from 55 to 90.",
        "Worked on an NFT marketplace and learned Web3 basics: blockchain, smart contracts, and wallet integration.",
      ],
      stack: ["Next.js", "TypeScript", "React", "GSAP", "Lenis", "Firebase", "Web3"],
      link: "https://drive.google.com/file/d/1V97WzynXJDH4v_e7pidoIxPf9BKlb3Dk/view?usp=sharing",
      linkLabel: "View experience letter",
    },
  ],
  coursesList: [],
  leadershipList: [
    {
      title: "Director Marketing",
      organization: "SOFTEC (FAST-NUCES)",
      period: "Jan 2024 — May 2024",
      points: [
        "Directed a cross-functional marketing team for one of Pakistan's largest student-run tech events.",
        "Executed multi-channel digital campaigns that boosted participant registrations by 25%.",
        "Secured over PKR 1,000,000 in sponsorships by pitching technology firms and managing corporate relations.",
      ],
    },
    {
      title: "Executive Marketing",
      organization: "SOFTEC",
      period: "Feb 2023 — Jun 2023",
      points: [
        "Secured PKR 200,000+ in sponsorships by pitching to companies.",
        "Conducted market research to optimize sponsorship packages and outreach strategies.",
        "Led promotional activities across 15+ universities, boosting event attendance.",
      ],
    },
    {
      title: "Executive Developer",
      organization: "Developers Student Club (GDSC)",
      period: "Oct 2022 — Jun 2023",
      points: [
        "Developed and maintained landing pages for Google Developer Group (GDG) events.",
        "Mentored junior members in frontend basics (HTML, CSS, JavaScript).",
      ],
    },
  ],
  courses: \`- AI Engineer Agentic Track`
);

let skills_str = `skills: {
    frontend: [
        "Next.js", "React", "Tailwind CSS", "Redux / Redux Toolkit",
        "React Native", "GSAP", "Lenis", "Framer Motion", "HTML", "CSS", "Android Studio"
    ],
    backend: [
        "FastAPI", "Django / Django REST Framework", "Flask", "Node.js", "Express",
        "ASP.NET Core", "REST APIs"
    ],
    platforms: [
        "AWS", "AWS ECS", "AWS EKS", "AWS S3", "AWS Lambda", "AWS API Gateway", "AWS Serverless",
        "Microsoft Azure", "Google Cloud Platform", "Vercel", "Linux", "Docker", "Kubernetes",
        "Terraform", "Grafana", "Prometheus", "Loki", "PostgreSQL", "MySQL", "MS SQL Server",
        "MongoDB", "NoSQL", "Firebase", "Supabase"
    ],`;
dp = dp.replace(/skills: \{/, skills_str);
fs.writeFileSync('data/profile.ts', dp);
