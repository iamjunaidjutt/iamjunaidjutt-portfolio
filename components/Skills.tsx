"use client";

import { motion } from "framer-motion";

const groups = [
	[
		"AI & data",
		"LLMs",
		"RAG",
		"Agentic AI",
		"OpenAI Agents SDK",
		"OpenAI API",
		"CrewAI",
		"LangGraph",
		"AutoGen",
		"MCP",
		"Prompt Engineering",
		"LangChain",
		"Hugging Face",
		"Fine-tuning",
		"Vector Search",
		"Vector Databases/Stores",
		"NLP",
		"TensorFlow",
		"Keras",
		"Scikit-learn",
		"Pandas",
		"NumPy",
		"Matplotlib",
		"Seaborn",
		"OpenCV",
	],
	[
		"Backend & APIs",
		"FastAPI",
		"Django / Django REST Framework",
		"Flask",
		"Node.js",
		"Express",
		"ASP.NET Core",
		"REST APIs",
	],
	[
		"Frontend",
		"Next.js",
		"React",
		"Tailwind CSS",
		"Redux / Redux Toolkit",
		"React Native",
		"GSAP",
		"Lenis",
		"Framer Motion",
		"HTML",
		"CSS",
		"Android Studio",
	],
	[
		"Platforms & storage",
		"AWS",
		"AWS ECS",
		"AWS EKS",
		"AWS S3",
		"AWS Lambda",
		"AWS API Gateway",
		"AWS Serverless",
		"Microsoft Azure",
		"Google Cloud Platform",
		"Vercel",
		"Linux",
		"Docker",
		"Kubernetes",
		"Terraform",
		// "Ansible",
		// "Helm",
		// "ArgoCD",
		"Grafana",
		"Prometheus",
		"Loki",
		"PostgreSQL",
		"MySQL",
		"MS SQL Server",
		"MongoDB",
		"NoSQL",
		"Firebase",
		"Supabase",
	],
	[
		"Languages & delivery",
		"Python",
		"JavaScript",
		"TypeScript",
		"Java",
		"C#",
		"C++",
		"SQL",
		"Git/GitHub",
		"CI/CD",
		"GitHub Actions",
		"Jenkins",
		"GitLab / GitLab CI/CD",
		// "Helm",
		// "ArgoCD",
		"RabbitMQ",
		// "Kafka",
	],
];

const Skills = () => {
	return (
		<section className="section-band section-cream" id="stack">
			<div className="page-width">
				<motion.div
					className="section-heading-row"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
				>
					<div>
						<p className="eyebrow">03 / Stack</p>
						<h2 className="section-title">What I work with.</h2>
					</div>
					<p className="section-intro">
						The tools I use, from the interface to the infrastructure
						underneath it.
					</p>
				</motion.div>
				<div className="stack-grid">
					{groups.map(([name, ...items], index) => (
						<motion.div
							className="stack-group"
							key={name}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-60px" }}
							transition={{
								duration: 0.45,
								delay: index * 0.07,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<h3>{name}</h3>
							<div className="tag-row">
								{items.map((item) => (
									<span className="stack-tag" key={item}>
										{item}
									</span>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Skills;
