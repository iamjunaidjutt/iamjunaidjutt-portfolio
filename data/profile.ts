import { Profile, buildProfileText } from "@/lib/chat/profileText";

export const PROFILE_DATA: Profile = {
  meta: {
    location: "Lahore, Pakistan",
    workPreference: "Remote is fine"
  },
  identity: {
    name: "Muhammad Junaid",
    description: "Software engineer in Lahore, Pakistan.",
    footerDescription: "I build backend systems and web apps, usually with some AI in them."
  },
  about: {
    heading: "I mostly build backend systems, and lately that means working with LLMs.",
    paragraphs: [
      "I'm a software engineer at Devsinc in Lahore. I work on LawPractice.ai, a tool that law firms in the United States use. More than 300 firms use it now.",
      "Most of my work is backend. Law firms send us messy files. Our system reads them, finds the important details, and writes new documents, like demand letters. I help build and fix these parts. I also work on the prompts we give the AI. Better prompts helped cut mistakes in the documents by about 90%.",
      "I started with frontend work. At Kryptomind I built web pages with Next.js and made one project load much faster. Later I led a team of three on a CRM called ResQ. I also built projects on my own, like Mawaddah, a matchmaking website.",
      "I studied software engineering at FAST-NUCES. I also helped lead the marketing team at SOFTEC, where we raised more than PKR 1,000,000 from sponsors.",
      "I like to understand what people need before I write any code. I want my work to still run after the demo is over."
    ]
  },
  contact: {
    email: "info.iamjunaidjutt@gmail.com",
    phone: "+92 307 4254648",
    whatsappLink: "https://wa.me/923074254648",
    contactForm: "https://iamjunaidjutt.vercel.app/contact",
    website: "https://iamjunaidjutt.vercel.app"
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/iamjunaidjutt",
    github: "https://github.com/iamjunaidjutt",
    x: "https://x.com/iamjunaidjutt_"
  },
  availability: "Open to full-time roles, in Lahore or remote.",
  lookingFor: "Backend or full-stack roles working with AI/LLMs, ideally in product companies or startups.",
  languages: "Urdu and Punjabi (mother tongues), English B2, German A1.",
  workingStyle: "Likes to understand what people need before writing code, and wants his work to still run after the demo is over.",
  hobbies: "Reading books, learning new technologies, exploring AI, and watching movies on Netflix.",
  currentRole: `Associate Software Engineer (AI/ML) at Devsinc, Lahore, since 16 Dec 2025.
He joined as a Software Engineer Intern on 9 Oct 2025 and moved into this role.
He works on LawPractice.ai, a platform used by plaintiff law firms in the United States. More than 300 law firms use it.
- Work: Built backend features for processing legal demands and case summaries using ASP.NET Core, LLMs, RAG, and MCP.
  Result: helped cut document preparation time by 70%, and made demand letter turnaround about 7x faster.
- Work: Helped build APIs, AI agents, custom tools, and RAG pipelines that read, extract, process and generate documents, and improved their prompts.
  Result: together these helped cut documentation errors by about 90%.
- Work: Maintains OCR, document reading and document writing pipelines for different document types, including large medical records of more than 1000 pages, adds new ones when needed, and fixes issues clients report in production.
- Tools used: OpenCV, Azure Document Intelligence, Azure AI Foundry, Azure AI Search, Azure SQL Database, Azure Cosmos DB, RabbitMQ background workers.`,
  previousWork: `Software Engineer Intern at Kryptomind LLC, Lahore (19 Aug 2024 to 19 Nov 2024).
- Work: Built interfaces with animations and 3D models using GSAP and React Three Fiber, and used Lenis for smooth scrolling.
- Work: Connected Next.js, TypeScript and React frontends to REST APIs. Implemented server-side rendering and code splitting.
  Result: took one project's Lighthouse score from 55 to 90.
- Work: Worked on an NFT marketplace and learned Web3 basics: blockchain, smart contracts and wallet integration.`,
  education: {
    degree: {
      title: "BS Software Engineering",
      institution: "FAST-NUCES",
      period: "2021 — 2025"
    },
    description: `BS in Software Engineering, FAST-NUCES, Lahore (2021 to 2025).\nAspire Leaders Program, Aspire Institute (Dec 2023 to Mar 2024).`
  },
  experience: [
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
  coursesList: [
    {
      title: "AI Engineer · Agentic Track",
      instructor: "Udemy",
      description: "BookOpen", // icon mapping
      bullets: [
        "Built eight AI agent projects using OpenAI Agents SDK, CrewAI, LangGraph, AutoGen, and MCP.",
        "The final project was a simulated trading floor where four agents work together, make trades on their own, and use tools through MCP servers.",
      ],
      tags: ["Agents", "MCP", "CrewAI", "LangGraph", "AutoGen"],
      link: "https://www.udemy.com/certificate/UC-834f64a1-cba5-401e-b922-f5e48c950421/",
    },
    {
      title: "AI Engineer · Core Track",
      instructor: "Udemy",
      description: "BookOpen",
      bullets: [
        "Built eight LLM apps in eight weeks, using Hugging Face, LangChain, RAG with vector search, and QLoRA fine-tuning.",
        "Also built multi-agent systems and compared open-source and commercial models on coding and business tasks.",
      ],
      tags: ["LLM engineering", "RAG", "QLoRA", "Fine-tuning", "HuggingFace"],
      link: "https://www.udemy.com/certificate/UC-84a36fb6-5a17-4d21-8b97-e570d737727e/",
    },
    {
      title: "Decoding DevOps",
      instructor: "Udemy",
      description: "Cloud",
      bullets: [
        "Learned DevOps through hands-on projects with AWS, Linux, Docker, Kubernetes, Terraform, Ansible, Jenkins, GitHub Actions, GitLab CI, Helm, and ArgoCD.",
        "Also covered monitoring, and used GitHub Copilot and Amazon Q to help write scripts and automate things.",
      ],
      tags: [
        "AWS",
        "GCP",
        "Docker",
        "Kubernetes",
        "Terraform",
        "GitOps",
        "Observability",
      ],
      link: "https://www.udemy.com/certificate/UC-b9e48ed9-3b33-41ec-8576-ebf33cdcc014/",
    },
    {
      title: "Supervised Machine Learning",
      instructor: "DeepLearning.AI · Coursera",
      description: "Network",
      bullets: [
        "Learned to build and train regression and classification models in Python with NumPy and scikit-learn.",
        "Covered linear and logistic regression, models with several input features, and regularization.",
      ],
      tags: ["Machine learning", "Regression", "Classification", "Python"],
      link: "https://www.coursera.org/account/accomplishments/verify/EZ65K9HN6F86",
    },
    {
      title: "React · The Complete Guide",
      instructor: "Udemy",
      description: "BookOpen",
      bullets: [
        "Learned React components, hooks, forms, routing, Context API, and Redux Toolkit.",
        "Also covered an intro to Next.js and how to deploy React apps.",
      ],
      tags: ["React", "Next.js", "Redux", "Frontend"],
      link: "https://www.udemy.com/certificate/UC-9f0a3caf-cfcf-4a6e-8f7f-2d9ef8c35286/",
    }
  ],
  leadership: [
    {
      period: "Dec 2023 — Mar 2024",
      title: "Aspire Leaders Program",
      org: "Aspire Institute · Remote",
      bullets: [
        "Completed 30 hours of coursework, including three full modules and a culminating project.",
        "Final project: \"Empowering Minds - Education Outreach for Needy Children in Pakistan\", a plan to help children in need get a better education.",
      ],
      tags: ["Leadership", "Community work", "Education outreach", "Teamwork"],
      link: "https://drive.google.com/file/d/13RdRi2w56hCt0Dt1Wxnzlk1aQKRu6aPO/view?usp=sharing",
      linkLabel: "View certificate",
    },
    {
      period: "Aug 2022 — May 2023",
      title: "Deputy Head of Marketing",
      org: "SOFTEC'23 · FAST-NUCES, Lahore, Pakistan",
      bullets: [
        "Helped lead a marketing team of about 40 people, before and during the event.",
        "Worked with company executives to close three sponsorship deals. We raised over PKR 1,000,000, which was 25% above the target.",
      ],
      tags: ["Team leadership", "Sponsorships", "Partnerships", "Marketing"],
      link: "https://drive.google.com/file/d/1gPtFvc7lbRl_uWWfl82TZ6HQd14IWLCz/view?usp=sharing",
      linkLabel: "View certificate",
    },
  ],
  volunteering: [
    {
      period: "Nov 2022 — Jan 2023",
      title: "Volunteer · Operations",
      org: "Future Fest'23 · Lahore, Pakistan",
      bullets: [
        "Checked billboards, banners, and other promotional materials.",
        "Looked after security at the auditorium and VIP areas while working with senior police officers, including the District Police Officer.",
        "Helped set up and pack up the event, and stayed in touch with teams and vendors.",
      ],
      tags: ["Event operations", "Logistics", "Security"],
      link: "https://drive.google.com/file/d/1EFlcRZoIpfwwjiB9TjlKzMBtu00niuLk/view?usp=sharing",
      linkLabel: "View certificate",
    },
    {
      period: "Oct 2021 — Aug 2022",
      title: "Volunteer · Marketing, Software House Enclosure & Infrastructure",
      org: "SOFTEC'22 · FAST-NUCES, Lahore, Pakistan",
      bullets: [
        "Called HR managers and CEOs to set up sponsorship meetings, and joined those meetings with the marketing head.",
        "Worked with the setup team to run the Software House Enclosure.",
        "Looked after company exhibits and talked with visitors to keep things running smoothly.",
      ],
      tags: ["Marketing", "Sponsorships", "Sponsor outreach", "Event management"],
      link: "https://drive.google.com/file/d/1m5YY44z8DmlIh-26BHSFRG47CkuriCpd/view?usp=sharing",
      linkLabel: "View certificate",
    },
  ],
  services: [
    {
      title: "AI features",
      description: "Adding LLMs, RAG, and agents to a product: reading and writing documents, answering questions from your own data, and automating routine steps.",
      icon: "BrainCircuit"
    },
    {
      title: "Full-stack web apps",
      description: "Websites and web apps from the interface down to the API and database, including login and role-based access. Mostly Next.js, React, Node.js, Python, and ASP.NET Core.",
      icon: "Code2"
    },
    {
      title: "Platform engineering",
      description: "Setting up the infrastructure apps run on: Docker and Kubernetes, Terraform and Ansible, and monitoring with Grafana, Prometheus, and Loki.",
      icon: "DatabaseZap"
    },
    {
      title: "Cloud and deployment",
      description: "Deploying to Azure, AWS, or Vercel with CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI), so a release is routine instead of a big event.",
      icon: "CloudCog"
    }
  ],
  courses: `- AI Engineer Agentic Track (Udemy): 6-week course building autonomous AI agents with OpenAI Agents SDK, CrewAI, LangGraph, AutoGen, and MCP.
- AI Engineer Core Track (Udemy): 8-week course building GenAI applications using LangChain, Hugging Face, vector stores, and Gradio.
- [In Progress] AI Engineer Production Track (Udemy): Course on deploying scalable AI systems across AWS, GCP, Azure, and Vercel.
- Decoding DevOps (Udemy): Hands-on course covering AWS, Docker, Kubernetes, Terraform, CI/CD, and observability.
- React - The Complete Guide (Udemy): Comprehensive course on React 19, full-stack Next.js, and Redux Toolkit.
- Supervised Machine Learning (Coursera): Foundational course covering regression and classification from scratch in Python.
- Roadmap to Learn Generative AI (iNeuron): Comprehensive path covering classical NLP, deep learning, sequence models, and multi-cloud GenAI deployments.`,
  featuredProjects: [
    { name: "LawPractice.ai", origin: "work", rank: 1, oneLine: "A legal tech platform used by 300+ law firms where he built AI features." },
    { name: "ResQ CRM", origin: "original", rank: 2, oneLine: "A full-stack CRM with live rider tracking via Firebase." },
    { name: "Mawaddah", origin: "original", rank: 3, oneLine: "A matchmaking website with tuned database queries." },
  ],
  repoNotes: {
    "patient-management-system": { origin: "tutorial", note: "Built while following a tutorial/course." },
    "promptopia": { origin: "tutorial", note: "Built while following a tutorial/course." },
    "Buxom-Cosmetics": { origin: "academic", note: "An academic or learning project." },
    "Boston-House-Price-Prediction": { origin: "academic", note: "An academic or learning project." },
    "pos": { origin: "academic", note: "An academic or learning project." },
    "Fake-News-Detector": { origin: "academic", note: "An academic or learning project." }
  },
  projects: [
    {
      name: "ResQ CRM",
      description: "A CRM for managing leads, tracking riders, and keeping staff in touch.",
      stack: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
      display: {
        category: "Web app",
        bullets: [
          "Led a frontend team of three and built role-based login, lead dashboards, forms, popups, chat, and advanced filters for about 25 staff members in the United States.",
          "Added Google Maps so staff can see riders' live locations, with Firebase Cloud Storage updating them every few seconds.",
          "Moved the app from client-side to server-side rendering with caching. The main dashboard now loads in about 1.8 seconds instead of 3.5.",
        ],
        impact: "Live rider tracking · 1.8s dashboard load",
      }
    },
    {
      name: "Mawaddah",
      description: "A marriage matchmaking site, built from requirements gathering through deployment.",
      stack: ["Next.js", "Node.js", "Supabase", "Vercel"],
      display: {
        category: "Web app",
        bullets: [
          "Built login with tokens and Google, role-based access, multi-step forms, matching by age, city, and preferences, paid subscriptions, and dashboards with filters.",
          "Designed the Supabase database and added indexes for matching and filtering. The main matching query went from about 350 ms to 120 ms on test data.",
          "Deployed on Vercel. Main pages load in under 2 seconds, with a mobile Lighthouse performance score of 86.",
        ],
        impact: "350ms → 120ms matching query",
      }
    },
    {
      name: "Gold Investment Estimations Assistant",
      description: "A chat assistant that answers questions about gold investing, using the live gold price.",
      stack: ["Python", "Gemini", "Whisper", "Gradio"],
      display: {
        category: "AI app",
        bullets: [
          "Connected MetalPriceAPI to Google Gemini 2.0 so answers use the current gold price.",
          "Added voice input with OpenAI Whisper so you can speak your question, and built the interface with Gradio.",
          "Handled API errors and missing data. If the price isn't available, it uses the last saved price or says so instead of guessing.",
        ],
        impact: "Live gold prices · Voice input",
      }
    },
    {
      name: "Promptopia",
      description: "A site for finding and sharing AI prompts.",
      stack: ["Next.js", "React", "MongoDB", "Tailwind CSS"],
      display: {
        category: "Web app",
        bullets: [
          "Built Google sign-in, prompt creation and editing, searchable tags, and user profile pages with Next.js and MongoDB.",
        ],
        impact: "Live demo · Source on GitHub",
        image: "/projects/promptopia.png",
        link: "https://promptopia-chi-ten.vercel.app/",
        githubUrl: "https://github.com/iamjunaidjutt/promptopia",
      }
    },
    {
      name: "Fake News Detector",
      description: "A model that tells fake news articles from real ones.",
      stack: ["Python", "TensorFlow", "BiLSTM", "Flask"],
      display: {
        category: "Machine learning",
        bullets: [
          "Built a BiLSTM model in TensorFlow. On a test set of 14,308 articles from the WELFake dataset it reached 96.2% accuracy and a ROC-AUC of 0.993.",
          "Cleaned the text with NLTK, stopped training early when scores stopped improving, and weighted the classes. Precision and recall were both 0.96.",
          "Put it in a Flask app where you paste an article and get a label (real or fake) with a confidence score.",
        ],
        impact: "96.2% accuracy · 0.993 ROC-AUC",
        githubUrl: "https://github.com/iamjunaidjutt/Fake-News-Detector",
      }
    },
    {
      name: "Emotion Recognition",
      description: "A CNN that picks one of seven emotions from a face photo.",
      stack: ["Python", "TensorFlow", "Keras", "OpenCV"],
      display: {
        category: "Computer vision",
        bullets: [
          "Used OpenCV to find and crop the face, resize it, and convert it to grayscale.",
          "Trained on 144 photos of 18 people, split by person so the same person is never in both the training and test sets.",
          "Added flips and small rotations to the training photos, which raised accuracy from 72% to 84% (27 of 32 test photos correct).",
        ],
        impact: "84% accuracy · 7 emotions",
      }
    },
    {
      name: "Boston House Price Prediction",
      description: "A web app that predicts Boston house prices from 13 features.",
      stack: ["Python", "Scikit-learn", "Pandas", "Flask", "Docker", "GitHub Actions", "Heroku"],
      display: {
        category: "Machine learning",
        bullets: [
          "Built a linear regression model with scikit-learn. On 167 test houses it got an R² of 0.73, with predictions off by about $3,100 on average.",
          "Put it in a Flask app with a form, and clear errors when the input is missing or wrong.",
          "Set up GitHub Actions to deploy to Heroku on every push to main, and added a Dockerfile.",
        ],
        impact: "R² 0.73 · $3,100 average error",
        githubUrl: "https://github.com/iamjunaidjutt/Boston-House-Price-Prediction",
      }
    },
    {
      name: "Buxom Cosmetics",
      description: "An online store with a shopping cart and an admin panel.",
      stack: ["React.js", "Node.js", "Express.js", "MySQL", "Prisma ORM", "Redux Toolkit", "Stripe"],
      display: {
        category: "Web app",
        bullets: [
          "Built JWT login, a product catalogue with pagination and filters, and a shopping cart.",
          "Added an admin panel to add, edit, and remove products, using Prisma with MySQL.",
          "Used Redux Toolkit for state and Stripe (test mode) for payments.",
        ],
        impact: "Catalog · Admin CMS · Payments",
        githubUrl: "https://github.com/iamjunaidjutt/Buxom-Cosmetics",
      }
    },
    {
      name: "POS Pharmacy",
      description: "A desktop point-of-sale app for a pharmacy: sales, stock, and reports.",
      stack: ["Java", "Java Swing", "Hibernate", "MySQL", "JUnit", "JasperReports"],
      display: {
        category: "Desktop application",
        bullets: [
          "Built product management, stock tracking, sales records, and login with hashed passwords and user roles.",
          "Added daily sales and low-stock reports with JasperReports.",
          "Wrote JUnit tests in 16 test classes, covering the database classes, login and register, inventory, and the cart.",
        ],
        impact: "Inventory · Sales · 16 JUnit test classes",
        githubUrl: "https://github.com/iamjunaidjutt/pos",
      }
    }
  ],
  skills: {
    uiAi: [
      "LLMs", "RAG", "Agentic AI", "OpenAI Agents SDK", "OpenAI API", "CrewAI", "LangGraph",
      "AutoGen", "MCP", "Prompt Engineering", "LangChain", "Hugging Face", "Fine-tuning",
      "Vector Search", "Vector Databases/Stores", "NLP", "TensorFlow", "Keras", "Scikit-learn",
      "Pandas", "NumPy", "Matplotlib", "Seaborn", "OpenCV"
    ],
    uiLanguages: [
      "Python", "JavaScript", "TypeScript", "Java", "C#", "C++", "SQL", "Git/GitHub", "CI/CD",
      "GitHub Actions", "Jenkins", "GitLab / GitLab CI/CD", "RabbitMQ"
    ],
    uiFrontend: [
      "Next.js", "React", "Tailwind CSS", "Redux / Redux Toolkit",
      "React Native", "GSAP", "Lenis", "Framer Motion", "HTML", "CSS", "Android Studio"
    ],
    uiBackend: [
      "FastAPI", "Django / Django REST Framework", "Flask", "Node.js", "Express",
      "ASP.NET Core", "REST APIs"
    ],
    uiPlatforms: [
      "AWS", "AWS ECS", "AWS EKS", "AWS S3", "AWS Lambda", "AWS API Gateway", "AWS Serverless",
      "Microsoft Azure", "Google Cloud Platform", "Vercel", "Linux", "Docker", "Kubernetes",
      "Terraform", "Grafana", "Prometheus", "Loki", "PostgreSQL", "MySQL", "MS SQL Server",
      "MongoDB", "NoSQL", "Firebase", "Supabase"
    ],
    coreStack: ["C# and ASP.NET Core", "Python", "TypeScript and Next.js", "Azure", "LLMs, RAG and MCP"],
    skillsByEvidence: {
      atWork: ["ASP.NET Core", "C#", "Azure", "LLMs", "RAG", "MCP", "RabbitMQ"],
      builtProjects: ["Next.js", "TypeScript", "Firebase", "Supabase", "Flask", "TensorFlow"],
      studied: ["Kubernetes", "Terraform", "Ansible", "LangGraph", "CrewAI"]
    }
  },
  leadershipText: `- Deputy Head of Marketing, SOFTEC 2023: helped lead a marketing team of about
  40, worked with company executives to close three sponsorship deals and raised
  over PKR 1,000,000, which was 25% above the target.
- Operations Volunteer, Future Fest 2023.
- Volunteer in Marketing, Software House Enclosure and Infrastructure, SOFTEC 2022.`
};

export const PROFILE = buildProfileText(PROFILE_DATA);
