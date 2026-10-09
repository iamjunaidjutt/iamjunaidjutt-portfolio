const fs = require('fs');

let dp = fs.readFileSync('data/profile.ts', 'utf8');

// The training array in the UI needs to be added into coursesList:
dp = dp.replace(/coursesList: \[\],/, `coursesList: [
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
  ],`);

fs.writeFileSync('data/profile.ts', dp);

let pt = fs.readFileSync('lib/chat/profileText.ts', 'utf8');

pt = pt.replace(/coursesList: \{[\s\S]*?\}\[];/, `coursesList: {
    title: string;
    instructor: string;
    description: string;
    bullets: string[];
    tags: string[];
    link: string;
  }[];`);

fs.writeFileSync('lib/chat/profileText.ts', pt);
