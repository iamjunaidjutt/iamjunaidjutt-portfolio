import { Profile, buildProfileText } from "@/lib/chat/profileText";

export const PROFILE_DATA: Profile = {
  meta: {
    location: "Lahore, Pakistan",
    workPreference: "Remote is fine"
  },
  identity: {
    name: "Muhammad Junaid",
    description: "Software engineer in Lahore, Pakistan."
  },
  about: {
    heading: "I mostly build backend systems, and lately that means working\n\t\t\t\t\t\twith LLMs.",
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
  languages: "Urdu and Punjabi (mother tongues), English B2, German A1.",
  workingStyle: "Likes to understand what people need before writing code, and wants his work to still run after the demo is over.",
  hobbies: "Reading books, learning new technologies, exploring AI, and watching movies on Netflix.",
  currentRole: `Associate Software Engineer (AI/ML) at Devsinc, Lahore, since 16 Dec 2025.
He joined as a Software Engineer Intern on 9 Oct 2025 and moved into this role.
He works on LawPractice.ai, a platform used by plaintiff law firms in the
United States. More than 300 law firms use it.
- Built backend features using ASP.NET Core, LLMs, RAG and MCP for processing legal demands and case summaries. His work helped cut document preparation time by 70% and made demand letters about 7x faster to turn around.
- Helped build APIs, AI agents, custom tools, and RAG pipelines that read, extract, process and generate documents, and improved their prompts. Together these helped cut documentation errors by about 90%.
- Maintains OCR, document reading and document writing pipelines for different document types, including large medical records of more than 1000 pages, adds new ones when needed, and fixes issues clients report
  in production.
- Tools used: OpenCV, Azure Document Intelligence, Azure AI Foundry, Azure AI Search, Azure SQL
  Database, Azure Cosmos DB, RabbitMQ background workers.`,
  previousWork: `Software Engineer Intern at Kryptomind LLC, Lahore (19 Aug 2024 to 19 Nov 2024).
- Built interfaces with animations and 3D models using GSAP and React Three Fiber, and used Lenis for smooth scrolling.
- Connected Next.js, TypeScript and React frontends to REST APIs. Server-side rendering and code splitting took one project's Lighthouse score from 55 to 90.
- Worked on an NFT marketplace and learned Web3 basics: blockchain, smart contracts and wallet integration.`,
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
  courses: `- AI Engineer Agentic Track: The Complete Agent & MCP Course / Master AI Agents in 30 Days
  (Instructors: Ed Donner — repeat AI startup founder/CTO, ex-MD at JPMorgan Chase, Oxford MA in Physics; and Ligency Team):
  6-week deep dive into autonomous AI agents across OpenAI Agents SDK, CrewAI,
  LangGraph, AutoGen, and Model Context Protocol (MCP).
  * Project 1: Career Digital Twin — autonomous personal agent representing professional
    experience and fielding recruiter queries.
  * Project 2: Automated SDR Agent — sales agent researching prospects and drafting
    tailored outbound business emails.
  * Project 3: Deep Research Agent Team — multi-agent collaborative research system
    conducting deep web extraction, analysis, and synthesis.
  * Project 4: Autonomous Stock Picker — CrewAI investment agent scanning market data
    and surfacing high-potential opportunities.
  * Project 5: 4-Agent Software Engineering Team — CrewAI multi-agent software engineering
    squad with containerized coder agents building and testing inside Docker.
  * Project 6: Browser-Based Sidekick (Operator Agent) — LangGraph web assistant navigating
    and executing workflows directly inside the browser.
  * Project 7: Meta Agent Creator — self-orchestrating AutoGen agent that configures,
    builds, and launches new domain-specific agents.
  * Project 8 (Capstone): Autonomous Trading Floor — 4 collaborative agents executing live
    trades powered by 6 MCP servers and 44 integrated tools.

- Mastering Generative AI and LLMs: An 8-Week Hands-On Journey / AI Engineer Core Track
  (Instructors: Ed Donner and Ligency Team):
  8-week intensive path building production GenAI applications across 20+ frontier
  and open-source models, LangChain, Hugging Face, vector stores, and Gradio.
  * Project 1: Intelligent Company Brochure Generator — web-navigating scraper and decision pipeline.
  * Project 2: Multi-Modal Airline Customer Support Agent — text, audio, and image assistant with function calling.
  * Project 3: Audio Meeting Minutes & Action Items Tool — speech-to-text pipeline using open and closed models.
  * Project 4: High-Performance Code Optimizer — LLM system converting Python to optimized C++ with up to 60,000x speedups.
  * Project 5: Enterprise Knowledge Worker (RAG) — vector-indexed company intelligence retrieval engine.
  * Project 6 (Capstone Part A): Product Price Estimator — zero/few-shot pricing model using frontier LLMs.
  * Project 7 (Capstone Part B): QLoRA Fine-Tuning — fine-tuned open-source LLM outperforming frontier baselines on regression tasks.
  * Project 8 (Capstone Part C): Autonomous Multi-Agent Deal Hunter — multi-agent deal detector with automated alerts.

- [In Progress] AI Engineer Production Track: Deploy LLMs & Agents at Scale 
  (Instructors: Ed Donner and Ligency Team):
  Deploying scalable, secure, and observable AI systems across AWS, GCP, Azure, and Vercel.
  * Week 1 Project: SaaS Healthcare App — production SaaS deployed on Vercel and AWS App Runner with Clerk auth and subscriptions.
  * Week 2 Project: Digital Twin Mk II — serverless AWS platform with Bedrock, Lambda, API Gateway, S3, CloudFront, Route 53, Terraform IaC, and GitHub Actions CI/CD.
  * Week 3 Project: Cybersecurity Analyst & Researcher Agent — MCP agent deployed to Azure & GCP, SageMaker inference, S3 vectors, and open-source models on Bedrock.
  * Week 4 (Capstone): SaaS Financial Planner — multi-agent AWS system using Aurora Serverless, Lambda, SQS, CloudFront, Bedrock AgentCore, and Langfuse observability.

- Decoding DevOps: Complete DevOps Learning Path
  (Instructor: Imran Teli — Founder & CEO HKH Infotech, DevOps Consultant & Cloud Architect):
  Hands-on cloud engineering, IaC, CI/CD, container orchestration, GitOps, observability, and AI automation.
  * VProfile Multi-VM Setup: local automated multi-tier architecture using Linux, Bash, and Vagrant.
  * AWS Lift & Shift and Re-Architecture: migrated on-prem apps to AWS; re-architected via EC2, S3, RDS, ELB, Route 53, and Auto Scaling.
  * AWS VPC Automation with Terraform: modular, repeatable infrastructure with remote backends.
  * CI/CD Quality Gate Pipeline: automated builds and test gates with Jenkins, Git, Maven, Nexus, and SonarQube.
  * Multi-Tier Deployment on GCP: Managed Instance Groups, HTTPS Load Balancers, Cloud SQL, Memorystore, and Cloud DNS.
  * Kubernetes Production Workloads: containerized multi-tier apps with Docker, Helm charts, and Lens management.
  * End-to-End GitOps Pipeline: continuous delivery platform using GitHub Actions (CI), automated registry builds, Helm, and ArgoCD (CD).
  * Centralized Observability Stack: metric and log telemetry using Prometheus, Grafana, Loki, PromQL, Alertmanager, Slack alerts, and Alloy.
  * AI-Assisted Workflows: integrated GitHub Copilot and Amazon Q for scripting, cloud automation, and Helm templating.

- React - The Complete Guide (incl. Next.js, Redux)
  (Instructor: Maximilian Schwarzmüller — Academind):
  71-hour comprehensive mastery of modern React (up to React 19), full-stack Next.js, and state management.
  * Core Architecture & Internals: component lifecycles, dynamic data binding, virtual DOM reconciliation, Fragments, Portals, and Error Boundaries.
  * React Hooks: in-depth built-in Hooks (useState, useEffect, useReducer, useCallback, useMemo, useRef) and custom Hook abstraction.
  * State Management: complex global state handling using Context API and Redux Toolkit with sliced reducers and async thunks.
  * Full-Stack Next.js (14+): React Server Components (RSC), App Router, server-side data fetching, Form Actions, server actions, and caching strategies.
  * Routing & Data Loading: client-side routing, loaders, actions, and dynamic route parameters using React Router.
  * Forms & Validation: user inputs, stateful form validation, custom input components, and React Form Actions.
  * TypeScript & Testing: type-safe component authoring with React + TypeScript; automated unit and component testing with React Testing Library and Jest.
  * Authentication & Deployment: JWT/session client-side authentication flows and production application deployment.

- Supervised Machine Learning: Regression and Classification — Machine Learning Specialization
  (Instructors: Andrew Ng — Co-founder of Coursera, Founder of DeepLearning.AI, Adjunct Professor at Stanford University; Eddy Shyu, Aarti Bagul, Geoff Ladwig; DeepLearning.AI & Stanford Online):
  Foundational 3-week curriculum covering supervised machine learning, mathematical intuition, and implementation in Python from scratch using NumPy and scikit-learn.
  * Week 1 (Linear Regression with One Variable): implemented univariate linear regression, cost function formulation (squared error loss), and batch gradient descent optimization.
  * Week 2 (Multiple Linear Regression & Optimization): expanded to multivariate regression using NumPy vectorization; applied feature scaling (normalization, z-score standardization), polynomial feature engineering, learning rate tuning, and compared gradient descent against the normal equation using scikit-learn.
  * Week 3 (Classification & Regularization): built binary classification models using logistic regression and the sigmoid activation function; implemented logistic loss/cross-entropy cost functions, decision boundary formulation, gradient descent for classification, and addressed overfitting using L2 regularization for linear and logistic models.

- Roadmap to Learn Generative AI / End-to-End GenAI Engineering Masterclass
  (Instructors: Krish Naik — Co-founder of iNeuron / CIO, leading AI educator; and Sunny Savita):
  Comprehensive, industry-aligned roadmap taking generative AI applications from foundational NLP and deep learning to production cloud deployments across Azure, AWS, and modern orchestration frameworks.
  * Module 1 (Python, APIs & Microservices Foundation): backend engineering for AI workloads; built modular microservices with Flask and FastAPI, managing async endpoints, dependency injection, and RESTful API architectures.
  * Module 2 (Classical NLP & Vector Semantics): text pre-processing pipelines, vocabulary representations (Bag of Words, TF-IDF), and dense vector semantics using Word2Vec and Average Word2Vec.
  * Module 3 (Deep Learning Foundations): multilayer perceptron (ANN) architecture from scratch, forward and backpropagation dynamics, activation functions, loss surface behaviors, and optimization algorithms (SGD, Adam, RMSProp).
  * Module 4 (Sequence Models & Transformers): sequential modeling using RNNs, LSTMs, Bidirectional LSTMs, and GRUs; sequence-to-sequence encoder-decoder mechanics, scaled dot-product self-attention ("Attention Is All You Need"), and modern Transformer foundations.
  * Module 5 (Modern Generative AI, LLMs & Multi-Cloud):
    - Google Gemini Suite: engineered multimodal applications using Google Generative AI SDK, Gemini Pro, and Gemini Pro Vision.
      • Project: Multimodal Q&A and Large Vision Analyzer — interactive Streamlit app processing complex image inputs and zero-shot contextual reasoning.
      • Project: End-to-End ATS Resume Tracking System — evaluated candidate resumes against technical job descriptions using Gemini Pro Vision, generating percentage match, skill gaps, and missing keywords.
      • Project: Multi-Language Invoice Extractor — zero-shot multimodal pipeline parsing structured metadata from multilingual invoice documents and receipts.
      • Project: Nutritionist AI Doctor — analyzed food/meal images to break down items, compute macronutrients, and estimate total calories.
      • Project: Text-to-SQL Querying Engine — translated natural language questions into executable SQL queries against relational databases with automated data retrieval.
      • Project: Chat with Multiple PDF Documents — multi-document RAG pipeline using LangChain, Google Palm/Gemini embeddings, and FAISS vector search.
      • Project: YouTube Video Transcribe & Summarizer — automated transcript extraction via YouTube API paired with extractive-abstractive summarization prompts.
    - Azure OpenAI Services & Azure AI Studio:
      • Infrastructure & Security: deployed Azure OpenAI resources, configured RBAC, managed private networking, rotated primary/secondary API keys, and enforced Responsible AI content filtering.
      • Custom Model Deployment & APIs: provisioned GPT-3.5 Turbo, GPT-4, GPT-4o, and DALL-E 3 deployments via the Azure OpenAI Python SDK.
      • Audio-to-Action Pipeline: processed audio files with the Whisper model to generate text transcripts and fed the parsed output into chat models for structured task execution.
      • Dynamic Tool/Function Calling: configured schema-based tool calling to bind user queries, extract parameter payloads, and trigger live third-party endpoints (e.g., OpenWeatherMap API).
      • Azure RAG with Prompt Flow: built an end-to-end RAG architecture in Azure AI Studio integrating Azure Blob Storage, Azure AI Search (formerly Cognitive Search) hybrid indexing, and deployed managed HTTP endpoints consumed by a custom Flask frontend.
      • Fine-Tuning Workflows: prepared structured JSONL datasets and ran fine-tuning compute jobs on custom domain models in supported Azure regions.
    - AWS Generative AI & SageMaker: foundational model orchestration on AWS, exploring SageMaker JumpStart, managed endpoint hosting, and Bedrock foundation model pipelines.
    - Open-Source LLMs & Fine-Tuning: worked with open weights (LLaMA, Mistral 7B, Gemma) via Hugging Face Transformers and optimized fine-tuning strategies.
  * Module 6 (Vector Databases & Hybrid Search): similarity search mechanics, HNSW indexing, and persistent embedding storage implemented across ChromaDB, FAISS, LanceDB (columnar format), and Apache Cassandra.
  * Module 7 (Production Deployment & Observability): containerized and deployed GenAI applications across AWS and Azure; instrumented tracing, chain evaluation, and latency profiling using LangSmith, and packaged production LLM runtimes with LangServe and Hugging Face Spaces.

- [In Progress / Planned] Perfect Roadmap to Learn Data Science & Production MLOps
  (Instructors: Krish Naik — Co-founder of iNeuron / CIO, leading AI educator; Bappy Ahmed, and HKH / iNeuron Team):
  Production-oriented engineering roadmap taking statistical modeling, machine learning, and deep learning into production-grade systems using modular software architecture, automated CI/CD pipelines, container orchestration, experiment tracking, and cloud deployments.
  * Core Technical Modules:
    - Module 1 (Python, EDA & Feature Engineering): Advanced data manipulation with NumPy, Pandas, Matplotlib, and Seaborn; systematic exploratory data analysis (EDA), handling missing values, categorical encoding, outlier treatment, and feature scaling.
    - Module 2 (Inferential & Descriptive Statistics for ML): Probability distributions (Normal, Binomial, Poisson), Central Limit Theorem, hypothesis testing (Z-test, t-test, ANOVA, Chi-Square), p-values, confidence intervals, covariance, and Pearson/Spearman correlation.
    - Module 3 (Databases & Big Data Management): Relational querying and schema design with MySQL; document-oriented modeling with MongoDB; distributed NoSQL columnar storage and querying using Apache Cassandra.
    - Module 4 (Classical Machine Learning Algorithms): Supervised and unsupervised algorithms from scratch: Linear/Logistic Regression, Ridge/Lasso, Decision Trees, Random Forests, Gradient Boosting (XGBoost, LightGBM, CatBoost), SVM, K-Means Clustering, and PCA.
    - Module 5 (Deep Learning & Computer Vision Foundations): Artificial Neural Networks (ANN), Convolutional Neural Networks (CNN), transfer learning, backpropagation dynamics, optimizers, and object detection/segmentation architectures.
    - Module 6 (NLP Pipelines): Tokenization, TF-IDF, Word2Vec embeddings, RNNs, LSTMs, GRUs, Bidirectional LSTMs, and Hugging Face Transformer pipelines.
    - Module 7 (Production Frameworks & MLOps Tooling): Microservices with Flask/FastAPI; MLflow and DagsHub for experiment tracking and model registry; DVC (Data Version Control) for dataset/pipeline versioning; BentoML for model serving; Evidently AI for data drift and model monitoring; Apache Airflow for DAG scheduling; and Kubeflow for Kubernetes-native ML workflows.
  * Key End-to-End Production Projects:
    - End-to-End Text Summarization with Transformers & GitHub Actions: Modular NLP pipeline (Data Ingestion, Validation, Transformation, Model Trainer, Evaluation) using Hugging Face Transformers (Pegasus/BART); containerized with Docker, automated CI/CD via GitHub Actions self-hosted runners, and deployed live to AWS EC2 via Amazon ECR.
    - Student Performance Prediction (Production ML Pipeline): End-to-end regression system with custom exception handling, logging, automated data transformation pipelines, model hyperparameter tuning, and web interface serving predictions.
    - End-to-End ML Pipeline with MLflow & DVC: Production pipeline tracking experiment runs, metrics, and model artifacts with MLflow and DagsHub; automated pipeline execution DAGs using DVC.
    - Chicken Disease Classification (Deep Learning & DVC): Transfer learning CNN image classification pipeline with DVC pipeline stages, evaluation metrics logging, Docker containerization, and automated cloud deployment.
    - Kidney Disease Classification: Deep learning classification pipeline using MLflow experiment tracking and cloud deployment with continuous retraining triggers.
    - Cell Segmentation with YOLOv8: Computer vision instance segmentation model fine-tuned on custom microscopic cell datasets, utilizing YOLOv8 and deployed with real-time inference.
    - Production Deployment on AWS SageMaker: Custom model training, tuning, and real-time HTTPS inference endpoint deployment using AWS SageMaker SDK, S3 artifacts, and IAM policies.`,
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
    languages: "Python, JavaScript, TypeScript, Java, C#, C++, SQL.",
    web: "ASP.NET Core, FastAPI, Flask, Django, Node.js, Express, Next.js, React, Redux Toolkit, Tailwind CSS.",
    ai: "LLMs, RAG, agentic AI, MCP, prompt engineering, Generative AI, Embeddings, Vector databases/stores (Pinecone, Chroma, Qdrant, FAISS), LangChain, LangGraph, OpenAI Agents SDK, CrewAI, AutoGen, Hugging Face, TensorFlow, Keras, scikit-learn, OpenCV.",
    cloud: "Azure, AWS, GCP, Docker, Kubernetes, Terraform, Ansible, Jenkins, GitHub Actions, GitLab CI, Grafana, Prometheus, Loki.",
    databases: "MS SQL Server, MySQL, MongoDB, Firebase, Supabase."
  },
  leadershipText: `- Deputy Head of Marketing, SOFTEC 2023: helped lead a marketing team of about
  40, worked with company executives to close three sponsorship deals and raised
  over PKR 1,000,000, which was 25% above the target.
- Operations Volunteer, Future Fest 2023.
- Volunteer in Marketing, Software House Enclosure and Infrastructure, SOFTEC 2022.`
};

export const PROFILE = buildProfileText(PROFILE_DATA);
